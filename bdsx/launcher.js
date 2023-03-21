"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bedrockServer = void 0;
const tslib_1 = require("tslib");
const colors = require("colors");
const readline = require("readline");
const abstractobject_1 = require("./abstractobject");
const addoninstaller_1 = require("./addoninstaller");
const asmcode_1 = require("./asm/asmcode");
const assembler_1 = require("./assembler");
const bedrock_1 = require("./bds/bedrock");
const command_1 = require("./bds/command");
const gamerules_1 = require("./bds/gamerules");
const level_1 = require("./bds/level");
const nimodule = require("./bds/networkidentifier");
const raknet_1 = require("./bds/raknet");
const raknetinstance_1 = require("./bds/raknetinstance");
const bd_server = require("./bds/server");
const structure_1 = require("./bds/structure");
const symbols_1 = require("./bds/symbols");
const common_1 = require("./common");
const config_1 = require("./config");
const core_1 = require("./core");
const decay_1 = require("./decay");
const dll_1 = require("./dll");
const event_1 = require("./event");
const getline_1 = require("./getline");
const makefunc_1 = require("./makefunc");
const nativeclass_1 = require("./nativeclass");
const nativetype_1 = require("./nativetype");
const plugins_1 = require("./plugins");
const pointer_1 = require("./pointer");
const prochacker_1 = require("./prochacker");
const source_map_support_1 = require("./source-map-support");
const thisgetter_1 = require("./thisgetter");
const unlocker_1 = require("./unlocker");
const util_1 = require("./util");
const warning_1 = require("./warning");
class Liner {
    constructor() {
        this.remaining = "";
    }
    write(str) {
        const lastidx = str.lastIndexOf("\n");
        if (lastidx === -1) {
            this.remaining += str;
            return null;
        }
        else {
            const out = this.remaining + str.substr(0, lastidx);
            this.remaining = str.substr(lastidx + 1);
            return out;
        }
    }
}
global.server = (0, abstractobject_1.createAbstractObject)("Bedrock scripting API is removed");
let launched = false;
let closed = false;
let nonOwnerPointerStructureManager = null;
const loadingIsFired = util_1.DeferPromise.make();
const openIsFired = util_1.DeferPromise.make();
const bedrockLogLiner = new Liner();
const commandQueue = new core_1.MultiThreadQueue(nativetype_1.CxxString[nativetype_1.NativeType.size]);
const commandQueueBuffer = new pointer_1.CxxStringWrapper(true);
function patchForStdio() {
    // hook bedrock log
    asmcode_1.asmcode.bedrockLogNp = makefunc_1.makefunc.np((severity, msgptr, size) => {
        // void(*callback)(int severity, const char* msg, size_t size)
        let line = bedrockLogLiner.write(msgptr.getString(size, 0, common_1.Encoding.Utf8));
        if (line === null)
            return;
        let color;
        switch (severity) {
            case 1:
                color = colors.white;
                break;
            case 2:
                color = colors.brightWhite;
                break;
            case 4:
                color = colors.brightYellow;
                break;
            default:
                color = colors.brightRed;
                break;
        }
        if (event_1.events.serverLog.fire(line, color) === common_1.CANCEL)
            return;
        line = color(line);
        console.log(line);
    }, nativetype_1.void_t, { onError: asmcode_1.asmcode.jsend_returnZero, name: "bedrockLogNp" }, nativetype_1.int32_t, core_1.StaticPointer, nativetype_1.int64_as_float_t);
    prochacker_1.procHacker.write("?BedrockLogOut@@YAXIPEBDZZ", 0, (0, assembler_1.asm)().jmp64(asmcode_1.asmcode.logHook, assembler_1.Register.rax));
    asmcode_1.asmcode.CommandOutputSenderHookCallback = makefunc_1.makefunc.np(line => {
        // void(*callback)(std::string* line)
        const lines = line.split("\n");
        if (lines[lines.length - 1].length === 0)
            lines.pop();
        for (const line of lines) {
            if (event_1.events.commandOutput.fire(line) !== common_1.CANCEL) {
                console.log(line);
            }
        }
    }, nativetype_1.void_t, {
        onError: asmcode_1.asmcode.jsend_returnZero,
        name: `CommandOutputSenderHookCallback`,
    }, nativetype_1.CxxString);
    prochacker_1.procHacker.patching("hook-command-output", "?send@CommandOutputSender@@UEAAXAEBVCommandOrigin@@AEBVCommandOutput@@@Z", 0x62, asmcode_1.asmcode.CommandOutputSenderHook, assembler_1.Register.rdx, true, 
    // prettier-ignore
    [
        0x4C, 0x8B, 0x40, 0x10,
        0x48, 0x83, 0x78, 0x18, 0x10,
        0x72, 0x03,
        0x48, 0x8B, 0x00,
        0x48, 0x8B, 0xD0,
        0x48, 0x8B, 0xCB,
        0xE8, null, null, null, null, // call <bedrock_server.class std::basic_ostream<char,struct std::char_traits<char> > & __ptr64 __cdecl std::_Insert_string<char,struct std::char_traits<char>,unsigned __int64>(class std::basic
    ]);
    // hook stdin
    asmcode_1.asmcode.commandQueue = commandQueue;
    asmcode_1.asmcode.MultiThreadQueueTryDequeue = core_1.MultiThreadQueue.tryDequeue;
    prochacker_1.procHacker.patching("hook-stdin-command", "?getLine@ConsoleInputReader@@QEAA_NAEAV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", 0, asmcode_1.asmcode.ConsoleInputReader_getLine_hook, assembler_1.Register.rax, false, 
    // prettier-ignore
    [
        0xE9, null, null, null, null,
        0xCC, 0xCC, 0xCC, 0xCC, 0xCC, 0xCC, 0xCC, // int3 ...
    ]);
    // remove original stdin thread
    const justReturn = (0, assembler_1.asm)().ret().buffer();
    prochacker_1.procHacker.write("??0ConsoleInputReader@@QEAA@XZ", 0, justReturn);
    prochacker_1.procHacker.write("??1ConsoleInputReader@@QEAA@XZ", 0, justReturn);
    prochacker_1.procHacker.write("?unblockReading@ConsoleInputReader@@QEAAXXZ", 0, justReturn);
}
function _launch(asyncResolve) {
    // check memory corruption for debug core
    if (core_1.cgate.memcheck != null) {
        const memcheck = setInterval(() => {
            core_1.cgate.memcheck();
        }, 500);
        event_1.events.serverClose.on(() => {
            clearInterval(memcheck);
        });
    }
    core_1.ipfilter.init(ip => {
        console.error(`[BDSX] traffic exceeded threshold for IP: ${ip}`);
    });
    asmcode_1.asmcode.evWaitGameThreadEnd = dll_1.dll.kernel32.CreateEventW(null, 0, 0, null);
    core_1.uv_async.open();
    // uv async callback, when BDS closed perfectly (end of the main function)
    function finishCallback() {
        closed = true; // for if BDS failed to execute the game thread.
        core_1.uv_async.close();
        threadHandle.close();
        event_1.events.serverClose.fire();
        event_1.events.serverClose.clear();
        (0, util_1._tickCallback)();
    }
    // replace unicode encoder
    // int Core::StringConversions::toWide(char const *, int, wchar_t *, int)
    const StringConversions$toWide = "?toWide@StringConversions@Core@@SAHPEBDHPEA_WH@Z";
    // int Core::StringConversions::toUtf8(wchar_t const *, int, char *, int)
    const StringConversions$toUtf8 = "?toUtf8@StringConversions@Core@@SAHPEB_WHPEADH@Z";
    symbols_1.proc[StringConversions$toWide];
    symbols_1.proc[StringConversions$toUtf8];
    if (config_1.Config.REPLACE_UNICODE_ENCODER) {
        prochacker_1.procHacker.write(StringConversions$toWide, 0, (0, assembler_1.asm)().jmp64(core_1.cgate.toWide, assembler_1.Register.rax));
        prochacker_1.procHacker.write(StringConversions$toUtf8, 0, (0, assembler_1.asm)().jmp64(core_1.cgate.toUtf8, assembler_1.Register.rax));
    }
    // events
    asmcode_1.asmcode.SetEvent = dll_1.dll.kernel32.SetEvent.pointer;
    asmcode_1.asmcode.CloseHandle = dll_1.dll.kernel32.CloseHandle.pointer;
    asmcode_1.asmcode.CreateEventW = dll_1.dll.kernel32.CreateEventW.pointer;
    asmcode_1.asmcode.WaitForSingleObject = dll_1.dll.kernel32.WaitForSingleObject.pointer;
    // call game thread entry
    asmcode_1.asmcode.gameThreadStart = makefunc_1.makefunc.np(() => {
        // empty
    }, nativetype_1.void_t);
    asmcode_1.asmcode.gameThreadFinish = makefunc_1.makefunc.np(() => {
        closed = true;
        (0, decay_1.decay)(bedrockServer.serverInstance);
        (0, decay_1.decay)(bedrockServer.networkSystem);
        (0, decay_1.decay)(bedrockServer.minecraft);
        (0, decay_1.decay)(bedrockServer.dedicatedServer);
        (0, decay_1.decay)(bedrockServer.level);
        (0, decay_1.decay)(bedrockServer.serverNetworkHandler);
        (0, decay_1.decay)(bedrockServer.minecraftCommands);
        (0, decay_1.decay)(bedrockServer.commandRegistry);
        (0, decay_1.decay)(bedrockServer.gameRules);
        (0, decay_1.decay)(bedrockServer.connector);
        (0, decay_1.decay)(bedrockServer.rakPeer);
        (0, decay_1.decay)(bedrockServer.commandOutputSender);
        bedrockServer.nonOwnerPointerServerNetworkHandler.dispose();
        (0, decay_1.decay)(bedrockServer.nonOwnerPointerServerNetworkHandler);
        nonOwnerPointerStructureManager.dispose();
        (0, decay_1.decay)(bedrockServer.structureManager);
    }, nativetype_1.void_t);
    asmcode_1.asmcode.gameThreadInner = symbols_1.proc["<lambda_f2e707221d48fb1510572c959b70280b>::operator()"]; // caller of ServerInstance::_update
    asmcode_1.asmcode.free = dll_1.dll.ucrtbase.free.pointer;
    // hook game thread
    asmcode_1.asmcode._Cnd_do_broadcast_at_thread_exit = dll_1.dll.msvcp140._Cnd_do_broadcast_at_thread_exit;
    prochacker_1.procHacker.patching("hook-game-thread", "std::thread::_Invoke<std::tuple<<lambda_f2e707221d48fb1510572c959b70280b> >,0>", // caller of ServerInstance::_update
    6, asmcode_1.asmcode.gameThreadHook, // original depended
    assembler_1.Register.rax, true, 
    // prettier-ignore
    [
        0x48, 0x8B, 0xD9,
        0xE8, 0xFF, 0xFF, 0xFF, 0xFF,
        0xE8, 0xFF, 0xFF, 0xFF, 0xFF, // call <bedrock_server._Cnd_do_broadcast_at_thread_exit>
    ], [4, 8, 9, 13]);
    const instances = {};
    const thisGetter = new thisgetter_1.ThisGetter(instances);
    thisGetter.register(bd_server.ServerInstance, "??0ServerInstance@@QEAA@AEAVIMinecraftApp@@AEBV?$not_null@V?$NonOwnerPointer@VServerInstanceEventCoordinator@@@Bedrock@@@gsl@@@Z", "serverInstance");
    thisGetter.register(nimodule.NetworkSystem, "??0ServerNetworkSystem@@QEAA@AEAVScheduler@@AEBV?$vector@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$allocator@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@2@@std@@AEBUNetworkSystemToggles@@AEBV?$NonOwnerPointer@VNetworkDebugManager@@@Bedrock@@V?$ServiceReference@VServicesManager@@@@@Z", "networkSystem");
    thisGetter.register(bd_server.DedicatedServer, "??0DedicatedServer@@QEAA@XZ", "dedicatedServer");
    thisGetter.register(bd_server.Minecraft, "??0Minecraft@@QEAA@AEAVIMinecraftApp@@AEAVGameCallbacks@@AEAVAllowList@@PEAVPermissionsFile@@AEBV?$not_null@V?$NonOwnerPointer@VFilePathManager@Core@@@Bedrock@@@gsl@@V?$duration@_JU?$ratio@$00$00@std@@@chrono@std@@AEAVIMinecraftEventing@@AEAVNetworkSystem@@AEAVPacketSender@@W4SubClientId@@AEAVTimer@@AEAVTimer@@AEBV?$not_null@V?$NonOwnerPointer@$$CBVIContentTierManager@@@Bedrock@@@6@PEAVServerMetrics@@@Z", "minecraft");
    patchForStdio();
    // seh wrapped main
    core_1.bedrock_server_exe.args.as(core_1.NativePointer).setPointer(null, 8); // remove options
    asmcode_1.asmcode.bedrock_server_exe_args = core_1.bedrock_server_exe.args;
    asmcode_1.asmcode.bedrock_server_exe_argc = 1; // bedrock_server_exe.argc;
    asmcode_1.asmcode.bedrock_server_exe_main = core_1.bedrock_server_exe.main;
    asmcode_1.asmcode.finishCallback = makefunc_1.makefunc.np(finishCallback, nativetype_1.void_t);
    {
        // restore main
        const unlock = new unlocker_1.MemoryUnlocker(core_1.bedrock_server_exe.main, 12);
        core_1.bedrock_server_exe.main.add().copyFrom(core_1.bedrock_server_exe.mainOriginal12Bytes, 12);
        unlock.done();
    }
    // call main as a new thread
    // main will create a game thread.
    // and bdsx will hijack the game thread and run it on the node thread.
    const threadHandle = dll_1.dll.kernel32.CreateThread(null, 0, asmcode_1.asmcode.wrapped_main, null, 0, asmcode_1.asmcode.addressof_bdsMainThreadId);
    require("./bds/implements");
    require("./event_impl");
    loadingIsFired.resolve();
    event_1.events.serverLoading.promiseFire();
    event_1.events.serverLoading.clear();
    // hook on update
    asmcode_1.asmcode.cgateNodeLoop = core_1.cgate.nodeLoop;
    event_1.events.serverUpdate.setInstaller(() => {
        asmcode_1.asmcode.updateEvTargetFire = makefunc_1.makefunc.np(() => {
            event_1.events.serverUpdate.fire();
            (0, util_1._tickCallback)();
        }, nativetype_1.void_t, { name: "events.serverUpdate.fire" });
    });
    prochacker_1.procHacker.patching("update-hook", "<lambda_f2e707221d48fb1510572c959b70280b>::operator()", // caller of ServerInstance::_update
    0x8d9, asmcode_1.asmcode.updateWithSleep, assembler_1.Register.rax, true, 
    // prettier-ignore
    [
        0x48, 0x2B, 0xC8,
        0x48, 0x81, 0xF9, 0x88, 0x13, 0x00, 0x00,
        0x7C, 0x0B,
        0x48, 0x8D, 0x4C, 0x24, 0x20,
        0xE8, null, null, null, null,
        0x90, // nop
    ]);
    // hook on script starting
    prochacker_1.procHacker.hookingRawWithCallOriginal("?sendServerThreadStarted@ServerInstanceEventCoordinator@@QEAAXAEAVServerInstance@@@Z", makefunc_1.makefunc.np(() => {
        try {
            (0, util_1._tickCallback)();
            core_1.cgate.nodeLoopOnce();
            const Minecraft$getLevel = prochacker_1.procHacker.js("?getLevel@Minecraft@@QEBAPEAVLevel@@XZ", level_1.Level, null, bd_server.Minecraft);
            const Minecraft$getCommands = prochacker_1.procHacker.js("?getCommands@Minecraft@@QEAAAEAVMinecraftCommands@@XZ", command_1.MinecraftCommands, null, bd_server.Minecraft);
            const MinecraftCommands$getRegistry = prochacker_1.procHacker.js("?getRegistry@MinecraftCommands@@QEAAAEAVCommandRegistry@@XZ", command_1.CommandRegistry, null, command_1.MinecraftCommands);
            const Level$getGameRules = prochacker_1.procHacker.js("?getGameRules@Level@@UEAAAEAVGameRules@@XZ", gamerules_1.GameRules, null, level_1.Level);
            const RakNetConnector$getPeer = prochacker_1.procHacker.js("?getPeer@RakNetConnector@@UEAAPEAVRakPeerInterface@RakNet@@XZ", raknet_1.RakNet.RakPeer, null, raknetinstance_1.RakNetConnector);
            // All pointer is found from ServerInstance::startServerThread with debug breaking.
            thisGetter.finish();
            const { serverInstance, dedicatedServer, networkSystem, minecraft } = instances;
            // TODO: delete after check
            const level = Minecraft$getLevel(minecraft);
            const nonOwnerPointerServerNetworkHandler = minecraft.getNonOwnerPointerServerNetworkHandler();
            const minecraftCommands = Minecraft$getCommands(minecraft);
            (0, warning_1.bdsxEqualsAssert)(minecraftCommands.vftable, symbols_1.proc["??_7MinecraftCommands@@6B@"], "Invalid minecraftCommands instance");
            const commandRegistry = MinecraftCommands$getRegistry(minecraftCommands);
            const gameRules = Level$getGameRules(level);
            const NetworkSystem$getConnector = prochacker_1.procHacker.js("?getRemoteConnector@NetworkSystem@@QEBA?AV?$NonOwnerPointer@VRemoteConnector@@@Bedrock@@XZ", bedrock_1.Bedrock.NonOwnerPointer.make(raknetinstance_1.RakNetConnector), { structureReturn: true, this: nimodule.NetworkSystem });
            const nonOwnerPointerConnector = NetworkSystem$getConnector.call(networkSystem);
            const connector = nonOwnerPointerConnector.get().subAs(raknetinstance_1.RakNetConnector, 48); // adjust
            (0, warning_1.bdsxEqualsAssert)(connector.vftable, symbols_1.proc["??_7RakNetConnector@@6BConnector@@@"], "Invalid connector");
            const rakPeer = RakNetConnector$getPeer(connector);
            nonOwnerPointerConnector.dispose();
            (0, warning_1.bdsxEqualsAssert)(rakPeer.vftable, symbols_1.proc["??_7RakPeer@RakNet@@6BRakPeerInterface@1@@"], "Invalid rakPeer");
            const commandOutputSender = minecraftCommands.getPointerAs(command_1.CommandOutputSender, 0x8);
            const serverNetworkHandler = nonOwnerPointerServerNetworkHandler.get().subAs(nimodule.ServerNetworkHandler, 0x10); // XXX: unknown state. cut corners.
            (0, warning_1.bdsxEqualsAssert)(serverNetworkHandler.vftable, symbols_1.proc["??_7ServerNetworkHandler@@6BEnableQueueForMainThread@Threading@Bedrock@@@"], "Invalid serverNetworkHandler");
            const Level$getStructureManager = prochacker_1.procHacker.js("?getStructureManager@Level@@UEAA?AV?$not_null@V?$NonOwnerPointer@VStructureManager@@@Bedrock@@@gsl@@XZ", bedrock_1.Bedrock.NonOwnerPointer.make(structure_1.StructureManager), { this: level_1.Level, structureReturn: true });
            nonOwnerPointerStructureManager = Level$getStructureManager.call(level);
            const structureManager = nonOwnerPointerStructureManager.get();
            (0, warning_1.bdsxEqualsAssert)(structureManager.vftable, symbols_1.proc["??_7StructureManager@@6B@"], "level.getStructureManager()");
            Object.defineProperties(bedrockServer, {
                serverInstance: { value: serverInstance },
                networkHandler: { value: networkSystem },
                networkSystem: { value: networkSystem },
                minecraft: { value: minecraft },
                dedicatedServer: { value: dedicatedServer },
                level: { value: level },
                serverNetworkHandler: { value: serverNetworkHandler },
                nonOwnerPointerServerNetworkHandler: {
                    value: nonOwnerPointerServerNetworkHandler,
                },
                minecraftCommands: { value: minecraftCommands },
                commandRegistry: { value: commandRegistry },
                gameRules: { value: gameRules },
                raknetInstance: { value: connector },
                connector: { value: connector },
                rakPeer: { value: rakPeer },
                commandOutputSender: { value: commandOutputSender },
                structureManager: { value: structureManager },
            });
            Object.defineProperty(bd_server, "serverInstance", {
                value: serverInstance,
            });
            Object.defineProperty(nimodule, "networkSystem", {
                value: networkSystem,
            });
            openIsFired.resolve();
            event_1.events.serverOpen.fire();
            event_1.events.serverOpen.clear(); // it will never fire again, clear it
            asyncResolve();
            (0, util_1._tickCallback)();
            core_1.cgate.nodeLoopOnce();
        }
        catch (err) {
            event_1.events.errorFire(err);
        }
    }, nativetype_1.void_t, { name: "hook of ScriptEngine::startScriptLoading", onlyOnce: true }, core_1.VoidPointer), [assembler_1.Register.rcx, assembler_1.Register.rdx], []);
    prochacker_1.procHacker.hookingRawWithCallOriginal("?startLeaveGame@Minecraft@@QEAAX_N@Z", makefunc_1.makefunc.np((mc, b) => {
        event_1.events.serverLeave.fire();
    }, nativetype_1.void_t, { name: "hook of Minecraft::startLeaveGame" }, bd_server.Minecraft, nativetype_1.bool_t), [assembler_1.Register.rcx, assembler_1.Register.rdx], []);
    prochacker_1.procHacker.hooking("?sendEvent@ServerInstanceEventCoordinator@@QEAAXAEBV?$EventRef@U?$ServerInstanceGameplayEvent@X@@@@@Z", nativetype_1.void_t, { name: "hook of shutdown" }, core_1.VoidPointer, EventRef$ServerInstanceGameplayEvent$Void)((_this, ev) => {
        if (!ev.restart) {
            event_1.events.serverStop.fire();
            (0, util_1._tickCallback)();
        }
    });
    // graceful kill for Network port occupied
    // BDS crashes at terminating on `Network port occupied`. it kills the crashing thread and keeps the node thread.
    // and BDSX finishes at the end of the node thread.
    asmcode_1.asmcode.terminate = dll_1.dll.ucrtbase.module.getProcAddress("terminate");
    asmcode_1.asmcode.ExitThread = dll_1.dll.kernel32.module.getProcAddress("ExitThread");
    prochacker_1.procHacker.hookingRawWithoutOriginal("?terminate@details@gsl@@YAXXZ", asmcode_1.asmcode.terminateHook);
    /**
     * send stdin to bedrockServer.executeCommandOnConsole
     * without this, you need to control stdin manually
     */
    bedrockServer.DefaultStdInHandler.install();
}
const stopfunc = prochacker_1.procHacker.js("?stop@DedicatedServer@@UEAA_NXZ", nativetype_1.void_t, null, core_1.VoidPointer);
function sessionIdGrabber(text) {
    const tmp = text.match(/\[\d{4}-\d\d-\d\d \d\d:\d\d:\d\d:\d{3} INFO\] Session ID (.*)$/);
    if (tmp) {
        bedrockServer.sessionId = tmp[1];
        event_1.events.serverLog.remove(sessionIdGrabber);
    }
}
event_1.events.serverLog.on(sessionIdGrabber);
var bedrockServer;
(function (bedrockServer) {
    const abstractobject = (0, abstractobject_1.createAbstractObject)("BDS is not loaded yet");
    // eslint-disable-next-line prefer-const
    bedrockServer.serverInstance = abstractobject;
    // eslint-disable-next-line prefer-const
    bedrockServer.networkHandler = abstractobject;
    // eslint-disable-next-line prefer-const
    bedrockServer.networkSystem = abstractobject;
    // eslint-disable-next-line prefer-const
    bedrockServer.minecraft = abstractobject;
    // eslint-disable-next-line prefer-const
    bedrockServer.level = abstractobject;
    // eslint-disable-next-line prefer-const
    bedrockServer.serverNetworkHandler = abstractobject;
    // eslint-disable-next-line prefer-const
    bedrockServer.dedicatedServer = abstractobject;
    // eslint-disable-next-line prefer-const
    bedrockServer.minecraftCommands = abstractobject;
    // eslint-disable-next-line prefer-const
    bedrockServer.commandRegistry = abstractobject;
    // eslint-disable-next-line prefer-const
    bedrockServer.gameRules = abstractobject;
    /**
     * @alias bedrockServer.connector
     */
    // eslint-disable-next-line prefer-const
    bedrockServer.raknetInstance = abstractobject;
    // eslint-disable-next-line prefer-const
    bedrockServer.connector = abstractobject;
    // eslint-disable-next-line prefer-const
    bedrockServer.rakPeer = abstractobject;
    // eslint-disable-next-line prefer-const
    bedrockServer.commandOutputSender = abstractobject;
    // eslint-disable-next-line prefer-const
    bedrockServer.nonOwnerPointerServerNetworkHandler = abstractobject;
    // eslint-disable-next-line prefer-const
    bedrockServer.structureManager = abstractobject;
    Object.defineProperty(bd_server, "serverInstance", {
        value: abstractobject,
        writable: true,
    });
    Object.defineProperty(nimodule, "networkSystem", {
        value: abstractobject,
        writable: true,
    });
    function withLoading() {
        return loadingIsFired;
    }
    bedrockServer.withLoading = withLoading;
    function afterOpen() {
        return openIsFired;
    }
    bedrockServer.afterOpen = afterOpen;
    /**
     * @remark It does not check BDS is loaded fully. It only checks the launch is called.
     * @deprecated Not intuitive & Useless.
     */
    function isLaunched() {
        return launched;
    }
    bedrockServer.isLaunched = isLaunched;
    function isClosed() {
        return closed;
    }
    bedrockServer.isClosed = isClosed;
    /**
     * stop the BDS
     * It will stop next tick
     */
    function stop() {
        stopfunc(bedrockServer.dedicatedServer.add(8));
    }
    bedrockServer.stop = stop;
    function forceKill(exitCode) {
        core_1.bedrock_server_exe.forceKill(exitCode);
    }
    bedrockServer.forceKill = forceKill;
    async function launch() {
        if (launched) {
            throw (0, source_map_support_1.remapError)(Error("Cannot launch BDS again"));
        }
        launched = true;
        await Promise.all([(0, plugins_1.loadAllPlugins)(), (0, addoninstaller_1.installMinecraftAddons)()]);
        await new Promise(_launch);
    }
    bedrockServer.launch = launch;
    /**
     * pass to stdin
     */
    function executeCommandOnConsole(command) {
        commandQueueBuffer.construct();
        commandQueueBuffer.value = command;
        commandQueue.enqueue(commandQueueBuffer); // assumes the string is moved, and does not have the buffer anymore.
    }
    bedrockServer.executeCommandOnConsole = executeCommandOnConsole;
    let stdInHandler = null;
    class DefaultStdInHandler {
        constructor() {
            this.online = executeCommandOnConsole;
            this.onclose = () => {
                this.close();
            };
            // empty
        }
        static install() {
            if (config_1.Config.USE_NATIVE_STDIN_HANDLER) {
                return NativeStdInHandler.install();
            }
            else {
                return NodeStdInHandler.install();
            }
        }
    }
    bedrockServer.DefaultStdInHandler = DefaultStdInHandler;
    /**
     * this handler has bugs on Linux+Wine
     */
    class NodeStdInHandler extends DefaultStdInHandler {
        constructor() {
            super();
            this.rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            this.rl.on("line", line => this.online(line));
            event_1.events.serverClose.on(this.onclose);
        }
        close() {
            if (stdInHandler === null)
                return;
            console.assert(stdInHandler !== null);
            stdInHandler = null;
            this.rl.close();
            this.rl.removeAllListeners();
            event_1.events.serverClose.remove(this.onclose);
        }
        static install() {
            if (stdInHandler !== null)
                throw (0, source_map_support_1.remapError)(Error("Already opened"));
            return (stdInHandler = new NodeStdInHandler());
        }
    }
    bedrockServer.NodeStdInHandler = NodeStdInHandler;
    class NativeStdInHandler extends DefaultStdInHandler {
        constructor() {
            super();
            this.getline = new getline_1.GetLine(line => this.online(line));
            event_1.events.serverClose.on(this.onclose);
        }
        close() {
            if (stdInHandler === null)
                return;
            console.assert(stdInHandler !== null);
            stdInHandler = null;
            this.getline.close();
        }
        static install() {
            if (stdInHandler !== null)
                throw (0, source_map_support_1.remapError)(Error("Already opened"));
            return (stdInHandler = new NativeStdInHandler());
        }
    }
    bedrockServer.NativeStdInHandler = NativeStdInHandler;
})(bedrockServer = exports.bedrockServer || (exports.bedrockServer = {}));
/**
 * temporal name
 */
let EventRef$ServerInstanceGameplayEvent$Void = class EventRef$ServerInstanceGameplayEvent$Void extends nativeclass_1.AbstractClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int8_t, 0x18)
], EventRef$ServerInstanceGameplayEvent$Void.prototype, "restart", void 0);
EventRef$ServerInstanceGameplayEvent$Void = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], EventRef$ServerInstanceGameplayEvent$Void);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsYXVuY2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsaUNBQWlDO0FBQ2pDLHFDQUFxQztBQUNyQyxxREFBd0Q7QUFDeEQscURBQTBEO0FBQzFELDJDQUF3QztBQUN4QywyQ0FBNEM7QUFDNUMsMkNBQXdDO0FBQ3hDLDJDQUFnSDtBQUVoSCwrQ0FBNEM7QUFDNUMsdUNBQWlEO0FBQ2pELG9EQUFvRDtBQUNwRCx5Q0FBc0M7QUFDdEMseURBQXVEO0FBQ3ZELDBDQUEwQztBQUMxQywrQ0FBbUQ7QUFDbkQsMkNBQXFDO0FBRXJDLHFDQUE0QztBQUM1QyxxQ0FBa0M7QUFDbEMsaUNBQW9JO0FBQ3BJLG1DQUFnQztBQUNoQywrQkFBNEI7QUFDNUIsbUNBQWlDO0FBQ2pDLHVDQUFvQztBQUNwQyx5Q0FBc0M7QUFDdEMsK0NBQXdFO0FBQ3hFLDZDQUF3RztBQUN4Ryx1Q0FBMkM7QUFDM0MsdUNBQTZDO0FBQzdDLDZDQUEwQztBQUMxQyw2REFBa0Q7QUFDbEQsNkNBQTBDO0FBQzFDLHlDQUE0QztBQUM1QyxpQ0FBcUQ7QUFDckQsdUNBQTZDO0FBWTdDLE1BQU0sS0FBSztJQUFYO1FBQ1ksY0FBUyxHQUFHLEVBQUUsQ0FBQztJQVkzQixDQUFDO0lBWEcsS0FBSyxDQUFDLEdBQVc7UUFDYixNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLElBQUksT0FBTyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxTQUFTLElBQUksR0FBRyxDQUFDO1lBQ3RCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7YUFBTTtZQUNILE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMs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