"use strict";
/**
 * These are unit tests for bdsx
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assembler_1 = require("bdsx/assembler");
const abilities_1 = require("bdsx/bds/abilities");
const actor_1 = require("bdsx/bds/actor");
const attribute_1 = require("bdsx/bds/attribute");
const block_1 = require("bdsx/bds/block");
const blockpos_1 = require("bdsx/bds/blockpos");
const command_1 = require("bdsx/bds/command");
const connreq_1 = require("bdsx/bds/connreq");
const cxxoptional_1 = require("bdsx/bds/cxxoptional");
const hashedstring_1 = require("bdsx/bds/hashedstring");
const inventory_1 = require("bdsx/bds/inventory");
const nbt_1 = require("bdsx/bds/nbt");
const packetids_1 = require("bdsx/bds/packetids");
const packets_1 = require("bdsx/bds/packets");
const player_1 = require("bdsx/bds/player");
const symbols_1 = require("bdsx/bds/symbols");
const bin_1 = require("bdsx/bin");
const capi_1 = require("bdsx/capi");
const command_2 = require("bdsx/command");
const commandresult_1 = require("bdsx/commandresult");
const common_1 = require("bdsx/common");
const core_1 = require("bdsx/core");
const cxxmap_1 = require("bdsx/cxxmap");
const cxxvector_1 = require("bdsx/cxxvector");
const disassembler_1 = require("bdsx/disassembler");
const dll_1 = require("bdsx/dll");
const event_1 = require("bdsx/event");
const hashset_1 = require("bdsx/hashset");
const launcher_1 = require("bdsx/launcher");
const makefunc_1 = require("bdsx/makefunc");
const mce_1 = require("bdsx/mce");
const nativeclass_1 = require("bdsx/nativeclass");
const nativetype_1 = require("bdsx/nativetype");
const pointer_1 = require("bdsx/pointer");
const prochacker_1 = require("bdsx/prochacker");
const pseudorandom_1 = require("bdsx/pseudorandom");
const jsdata_1 = require("bdsx/storage/jsdata");
const tester_1 = require("bdsx/tester");
const util_1 = require("bdsx/util");
const net_rawpacket_1 = require("./net-rawpacket");
let sendidcheck = 0;
let chatCancelCounter = 0;
const dimensionVFTables = new Set([symbols_1.proc["??_7OverworldDimension@@6BIDimension@@@"], symbols_1.proc["??_7NetherDimension@@6BIDimension@@@"], symbols_1.proc["??_7TheEndDimension@@6BIDimension@@@"]].map(addr => addr.getAddressBin()));
function isDimensionClass(dimension) {
    return dimensionVFTables.has(dimension.vftable.getAddressBin());
}
const dimensions = new Set([actor_1.DimensionId.Overworld, actor_1.DimensionId.Nether, actor_1.DimensionId.TheEnd]);
const INT32_MIN = 0x80000000;
const INT32_MAX = 0x7fffffff;
const FLOAT32_MIN = -3.40282347e38;
const FLOAT32_MAX = 3.40282347e38;
function checkCommandRegister(tester, testname, testcases, opts = {}) {
    const paramsobj = {};
    const n = testcases.length;
    for (let i = 0; i < n; i++) {
        paramsobj["arg" + i] = testcases[i][0];
    }
    const cmdname = "testcommand_" + testname;
    let cmdline = cmdname;
    for (const testcase of testcases) {
        const strparam = testcase[1];
        if (strparam === null)
            continue;
        cmdline += " ";
        cmdline += strparam;
    }
    command_2.command.register(cmdname, "command for test").overload((param, origin, output) => {
        for (let i = 0; i < n; i++) {
            const [opts, name, expected] = testcases[i];
            const actual = param["arg" + i];
            if (expected !== actual) {
                output.error(`failed`);
                const type = opts instanceof Array ? opts[0] : opts;
                tester.equals(actual, expected, `type=${type.name}, value=${name} mismatched`);
                return;
            }
        }
        output.success("passed");
    }, paramsobj);
    function run() {
        return new Promise((resolve, reject) => {
            const outputcb = (output) => {
                if (output === "passed") {
                    event_1.events.commandOutput.remove(outputcb);
                    resolve(run);
                    return common_1.CANCEL;
                }
                if (output === "failed") {
                    event_1.events.commandOutput.remove(outputcb);
                    reject(Error(`${cmdname} failed`));
                    return common_1.CANCEL;
                }
            };
            event_1.events.commandOutput.on(outputcb);
            if (opts.throughConsole) {
                launcher_1.bedrockServer.executeCommandOnConsole(cmdline);
            }
            else {
                const res = launcher_1.bedrockServer.executeCommand(cmdline, commandresult_1.CommandResultType.OutputAndData);
                if (!res.isSuccess()) {
                    tester.error(`${cmdname} failed`, 5);
                }
                else {
                    tester.equals(res.data.statusMessage, "passed", `${cmdname}, unexpected statusMessage`);
                    tester.equals(res.data.statusCode, res.getFullCode(), `${cmdname}, unexpected statusCode`);
                }
            }
        });
    }
    if (opts.noRun)
        return Promise.resolve(run);
    return run();
}
let VectorClass = class VectorClass extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(nativetype_1.CxxString))
], VectorClass.prototype, "vector", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(pointer_1.CxxStringWrapper))
], VectorClass.prototype, "vector2", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(cxxvector_1.CxxVector.make(nativetype_1.CxxString)))
], VectorClass.prototype, "vector3", void 0);
VectorClass = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], VectorClass);
/**
 * too many packets to hook. skip them.
 */
const tooHeavy = new Set();
tooHeavy.add(0xae); // SubChunkPacket
tooHeavy.add(0xaf); // SubChunkRequestPacket
tester_1.Tester.concurrency({
    async nexttick() {
        let timer;
        for (let i = 0; i < 2; i++) {
            await Promise.race([
                new Promise(resolve => process.nextTick(() => {
                    clearTimeout(timer);
                    resolve(true);
                })),
                new Promise(resolve => {
                    timer = setTimeout(() => {
                        this.fail();
                        resolve(false);
                    }, 1000);
                }),
            ]);
        }
    },
}, {
    async globals() {
        var _a;
        const serverInstance = launcher_1.bedrockServer.serverInstance;
        this.assert(!!serverInstance && serverInstance.isNotNull(), "serverInstance not found");
        this.assert(serverInstance.vftable.equalsptr(symbols_1.proc["??_7ServerInstance@@6BEnableNonOwnerReferences@Bedrock@@@"]), "serverInstance is not ServerInstance");
        const networkHandler = launcher_1.bedrockServer.networkHandler;
        this.assert(!!networkHandler && networkHandler.isNotNull(), "networkHandler not found");
        this.assert(launcher_1.bedrockServer.commandOutputSender.vftable.equalsptr(symbols_1.proc["??_7CommandOutputSender@@6B@"]), "sender is not CommandOutputSender");
        const shandle = launcher_1.bedrockServer.serverNetworkHandler;
        shandle.setMotd("TestMotd");
        this.equals(shandle.motd, "TestMotd", "unexpected motd");
        serverInstance.setMaxPlayers(10);
        this.equals(shandle.maxPlayers, 10, "unexpected maxPlayers");
        [...launcher_1.bedrockServer.commandRegistry.enumValues];
        [...launcher_1.bedrockServer.commandRegistry.enums].map(v => v.name);
        [...launcher_1.bedrockServer.commandRegistry.enumLookup.keys()];
        [...launcher_1.bedrockServer.commandRegistry.enumValueLookup.keys()];
        [...launcher_1.bedrockServer.commandRegistry.commandSymbols].map(v => v.value);
        [...launcher_1.bedrockServer.commandRegistry.softEnums].map(v => v.name);
        [...launcher_1.bedrockServer.commandRegistry.softEnumLookup.keys()];
        for (const dim of [actor_1.DimensionId.Overworld, actor_1.DimensionId.Nether, actor_1.DimensionId.TheEnd]) {
            this.equals(launcher_1.bedrockServer.level.createDimension(dim).getDimensionId(), dim);
            this.equals((_a = launcher_1.bedrockServer.level.getDimension(dim)) === null || _a === void 0 ? void 0 : _a.getDimensionId(), dim);
        }
    },
}, {
    disasm() {
        const assert = (hexcode, asmcode, nonsamehex = false) => {
            const opers = disassembler_1.disasm.check(hexcode, true);
            const disasem = opers.toString().replace(/\n/g, ";");
            this.equals(disasem, asmcode, ``);
            if (!nonsamehex)
                this.equals((0, util_1.hex)(opers.asm().buffer()), hexcode.toUpperCase());
        };
        assert("83 39 00", "cmp dword ptr [rcx], 0x0");
        assert("8b 0c 31", "mov ecx, dword ptr [rcx+rsi]");
        assert("f3 0f 11 89 a4 03 00 00", "movss dword ptr [rcx+0x3a4], xmm1");
        assert("0F 84 7A 06 00 00 55 56 57 41 54 41 55 41 56", "je 0x67a;push rbp;push rsi;push rdi;push r12;push r13;push r14");
        assert("80 79 48 00 74 18 48 83 C1 38", "cmp byte ptr [rcx+0x48], 0x0;je 0x18;add rcx, 0x38");
        assert("48 8B D9", "mov rbx, rcx", true);
        assert("0F 29 74 24 20 E8 8D 0D FE FF", "movaps xmmword ptr [rsp+0x20], xmm6;call -0x1f273");
        assert("49 8B D8", "mov rbx, r8", true);
        assert("48 8d 40 01", "lea rax, qword ptr [rax+0x1]");
        assert("0F 10 02 48 8D 59 08 48 8D 54 24 20", "movups xmm0, xmmword ptr [rdx];lea rbx, qword ptr [rcx+0x8];lea rdx, qword ptr [rsp+0x20]");
        assert("48 8B CB", "mov rcx, rbx", true);
        assert("0F 10 02", "movups xmm0, xmmword ptr [rdx]");
        assert("48 0f b6 c1", "movzx rax, cl");
        assert("0f b6 c1", "movzx eax, cl");
        assert("0f b7 c0", "movzx eax, ax");
        assert("0f b6 c0", "movzx eax, al");
        assert("0f bf c0", "movsx eax, ax");
        assert("0f be 00", "movsx eax, byte ptr [rax]");
        assert("44 0F B6 C1 49 BA B3 01 00 00 00 01 00 00", "movzx r8d, cl;movabs r10, 0x100000001b3");
        assert("48 8D 04 40", "lea rax, qword ptr [rax+rax*2]");
        assert("48 8D 14 59", "lea rdx, qword ptr [rcx+rbx*2]");
        assert("0f 90 c0 0f 90 c1 0f 91 c0 0f 91 c1 0f 91 00", "seto al;seto cl;setno al;setno cl;setno byte ptr [rax]");
        assert("ff 81 c0 07 00 00 48 ff c0 48 ff 00 48 ff 08 48 ff c0 ff 18 ff 10 ff 28 ff e0", "inc dword ptr [rcx+0x7c0];inc rax;inc qword ptr [rax];dec qword ptr [rax];inc rax;call fword ptr [rax];call qword ptr [rax];jmp fword ptr [rax];jmp rax");
        assert("41 b0 01 ba 38 00 00 00 48 89 CB e8 aa 6c fb ff", "mov r8b, 0x1;mov edx, 0x38;mov rbx, rcx;call -0x49356");
        assert("d1 e8 c1 e8 00 c1 e0 00 d1 e0 d1 f8 c1 f8 00", "shr eax, 0x1;shr eax, 0x0;shl eax, 0x0;shl eax, 0x1;sar eax, 0x1;sar eax, 0x0");
        this.assert(disassembler_1.disasm.check("82", true).size === 0, "asm bad");
        const opers = disassembler_1.disasm.check("82", {
            fallback(asm) {
                if (asm.readUint8() === 0x82) {
                    return 1; // opcode size
                }
                else {
                    return null; // failed
                }
            },
            quiet: true,
        });
        this.assert(opers.size === 1, "fallback");
    },
    bin() {
        this.equals(bin_1.bin.parse("0"), "", 'bin.parse("0")');
        this.equals(bin_1.bin.make64(1, 0), nativetype_1.bin64_t.one, "bin.make64(1, 0)", bin_1.bin.toString);
        this.equals(bin_1.bin.make64(0, 0), nativetype_1.bin64_t.zero, "bin.make64(0, 0)", bin_1.bin.toString);
        this.equals(bin_1.bin.make64(-1, -1), nativetype_1.bin64_t.minus_one, "bin.make64(-1, -1)", bin_1.bin.toString);
        const small = bin_1.bin.make64(0x100, 0);
        this.equals(small, "\u0100\0\0\0", "bin.make64(0x100, 0)", bin_1.bin.toString);
        const big = bin_1.bin.make64(0x10002, 0);
        this.equals(big, "\u0002\u0001\0\0", "bin.make64(0x10002, 0)", bin_1.bin.toString);
        this.equals(bin_1.bin.sub(big, small), "\uff02\0\0\0", "bin.sub()", bin_1.bin.toString);
        const big2 = bin_1.bin.add(big, bin_1.bin.add(big, small));
        this.equals(big2, "\u0104\u0002\0\0", "bin.add()", bin_1.bin.toString);
        const bigbig = bin_1.bin.add(bin_1.bin.add(bin_1.bin.muln(big2, 0x100000000), small), nativetype_1.bin64_t.one);
        this.equals(bigbig, "\u0101\u0000\u0104\u0002", "bin.muln()", bin_1.bin.toString);
        const dived = bin_1.bin.divn(bigbig, 2);
        this.equals(dived[0], "\u0080\u0000\u0082\u0001", "bin.divn()", bin_1.bin.toString);
        this.equals(dived[1], 1, "bin.divn()");
        this.equals(bin_1.bin.toString(dived[0], 16), "1008200000080", "bin.toString()");
        const ptr = capi_1.capi.malloc(10);
        try {
            const bignum = bin_1.bin.makeVar(123456789012345);
            ptr.add().writeVarBin(bignum);
            this.equals(ptr.add().readVarBin(), bignum, "writevarbin / readvarbin", bin_1.bin.toString);
        }
        finally {
            capi_1.capi.free(ptr);
        }
        this.equals(bin_1.bin.bitshl("\u1000\u0100\u0010\u1001", 0), "\u1000\u0100\u0010\u1001", "bin.bitshl(0)", v => bin_1.bin.toString(v, 16));
        this.equals(bin_1.bin.bitshr("\u1001\u0100\u0010\u0001", 0), "\u1001\u0100\u0010\u0001", "bin.bitshr(0)", v => bin_1.bin.toString(v, 16));
        this.equals(bin_1.bin.bitshl("\u1000\u0100\u0010\u1001", 4), "\u0000\u1001\u0100\u0010", "bin.bitshl(4)", v => bin_1.bin.toString(v, 16));
        this.equals(bin_1.bin.bitshr("\u1001\u0100\u0010\u0001", 4), "\u0100\u0010\u1001\u0000", "bin.bitshr(4)", v => bin_1.bin.toString(v, 16));
        this.equals(bin_1.bin.bitshl("\u1000\u0100\u0010\u1001", 16), "\u0000\u1000\u0100\u0010", "bin.bitshl(16)", v => bin_1.bin.toString(v, 16));
        this.equals(bin_1.bin.bitshr("\u1001\u0100\u0010\u0001", 16), "\u0100\u0010\u0001\u0000", "bin.bitshr(16)", v => bin_1.bin.toString(v, 16));
        this.equals(bin_1.bin.bitshl("\u1000\u0100\u0010\u1001", 20), "\u0000\u0000\u1001\u0100", "bin.bitshl(20)", v => bin_1.bin.toString(v, 16));
        this.equals(bin_1.bin.bitshr("\u1001\u0100\u0010\u0001", 20), "\u0010\u1001\u0000\u0000", "bin.bitshr(20)", v => bin_1.bin.toString(v, 16));
        this.equals(bin_1.bin.toString(bin_1.bin.parse("18446744069414584321")), "18446744069414584321", "bin.parse");
        this.equals(bin_1.bin.toString(bin_1.bin.parse("0x123456789", null, 2), 16), "23456789", "bin.parse, limit count");
        const longnumber = "123123123123123123123123123123123123123123123123123123123123123";
        this.equals(bin_1.bin.toString(bin_1.bin.parse(longnumber)), longnumber, "bin.parse");
    },
    hashset() {
        class HashItem {
            constructor(value) {
                this.value = value;
            }
            hash() {
                return this.value;
            }
            equals(other) {
                return this.value === other.value;
            }
        }
        const TEST_COUNT = 200;
        const values = [];
        const n = new pseudorandom_1.PseudoRandom(12345);
        const hashset = new hashset_1.HashSet();
        let count = 0;
        for (const v of hashset.values()) {
            count++;
        }
        if (count !== 0)
            this.error(`empty hashset is not empty`);
        for (let i = 0; i < TEST_COUNT;) {
            const v = n.rand() % 100;
            values.push(v);
            hashset.add(new HashItem(v));
            i++;
        }
        for (const v of values) {
            if (!hashset.has(new HashItem(v))) {
                this.error(`hashset.has failed, item not found ${v}`);
                continue;
            }
            if (!hashset.delete(new HashItem(v))) {
                this.error(`hashset.delete failed ${v}`);
                continue;
            }
        }
        if (hashset.size !== 0) {
            this.error(`cleared hashset is not cleared: ${hashset.size}`);
        }
        for (let i = 0; i < 200; i++) {
            const v = n.rand() % 100;
            if (hashset.has(new HashItem(v))) {
                this.error("hashset.has failed, found on empty");
            }
        }
    },
    jsdata() {
        const test = (value) => {
            const converted = jsdata_1.jsdata.deserialize(jsdata_1.jsdata.serialize(value));
            this.deepEquals(converted, value, `${typeof value} jsdata mismatched`, v => JSON.stringify(v));
        };
        test(1);
        test(-1);
        test(1234567890123);
        test(-1234567890123);
        test("2");
        test("very very long text");
        test(true);
        test(false);
        test(null);
        test(undefined);
        test([1, "2"]);
        test({ a: 1, b: "2" });
        test(new Date());
        test([1, ["2", 3], { a: 4, b: 5 }, true, false, null, undefined]);
    },
    memset() {
        const dest = new Uint8Array(12);
        const ptr = new core_1.NativePointer();
        ptr.setAddressFromBuffer(dest);
        dll_1.dll.vcruntime140.memset(ptr, 1, 12);
        for (const v of dest) {
            this.equals(v, 1, "wrong value: " + v);
        }
    },
    cxxstring() {
        const str = pointer_1.CxxStringWrapper.construct();
        this.equals(str.length, 0, "std::string invalid constructor");
        this.equals(str.capacity, 15, "std::string invalid constructor");
        const shortcase = "111";
        const longcase = "123123123123123123123123";
        str.value = shortcase;
        this.equals(str.value, shortcase, "failed with short text");
        str.value = longcase;
        this.equals(str.value, longcase, "failed with long text");
        str.destruct();
        const hstr = hashedstring_1.HashedString.construct();
        this.equals(hstr.str, "", "Invalid string");
        hstr.destruct();
        const data = packets_1.AttributeData.construct();
        this.equals(data.name.str, "", "Invalid string");
        data.destruct();
    },
    makefunc() {
        const structureReturn = (0, assembler_1.asm)().mov_rp_c(assembler_1.Register.rcx, 1, 0, 1, assembler_1.OperationSize.dword).mov_r_r(assembler_1.Register.rax, assembler_1.Register.rcx).make(nativetype_1.int32_t, {
            structureReturn: true,
            name: "test, structureReturn",
        });
        this.equals(structureReturn(), 1, "structureReturn int32_t");
        const floatToDouble = (0, assembler_1.asm)().cvtss2sd_f_f(assembler_1.FloatRegister.xmm0, assembler_1.FloatRegister.xmm0).make(nativetype_1.float64_t, { name: "test, floatToDouble" }, nativetype_1.float32_t);
        this.equals(floatToDouble(123), 123, "float to double");
        const doubleToFloat = (0, assembler_1.asm)().cvtsd2ss_f_f(assembler_1.FloatRegister.xmm0, assembler_1.FloatRegister.xmm0).make(nativetype_1.float32_t, { name: "test, doubleToFloat" }, nativetype_1.float64_t);
        this.equals(doubleToFloat(123), 123, "double to float");
        const getbool = (0, assembler_1.asm)().mov_r_c(assembler_1.Register.rax, 0x100).make(nativetype_1.bool_t, { name: "test, return 100" });
        const sum = makefunc_1.makefunc.js(makefunc_1.makefunc.np((a, b, c, d) => a + b + c + d, nativetype_1.int32_t, null, nativetype_1.int8_t, nativetype_1.int16_t, nativetype_1.int32_t, nativetype_1.int64_as_float_t), nativetype_1.int32_t, null, nativetype_1.int8_t, nativetype_1.int16_t, nativetype_1.int32_t, nativetype_1.int64_as_float_t);
        this.equals(sum(1, 2, 3, 4), 10, "4 parameters");
        this.equals(getbool(), false, "bool return");
        const bool2int = (0, assembler_1.asm)().mov_r_r(assembler_1.Register.rax, assembler_1.Register.rcx).make(nativetype_1.int32_t, { name: "test, return param" }, nativetype_1.bool_t);
        this.equals(bool2int(true), 1, "bool to int");
        this.equals(bool2int(false), 0, "bool to int");
        const int2bool = (0, assembler_1.asm)().mov_r_r(assembler_1.Register.rax, assembler_1.Register.rcx).make(nativetype_1.bool_t, { name: "test, return param" }, nativetype_1.int32_t);
        this.equals(int2bool(1), true, "int to bool");
        this.equals(int2bool(0), false, "int to bool");
        const int2short_as_int = (0, assembler_1.asm)()
            .movzx_r_r(assembler_1.Register.rax, assembler_1.Register.rcx, assembler_1.OperationSize.dword, assembler_1.OperationSize.word)
            .make(nativetype_1.int32_t, { name: "test, int2short_as_int" }, nativetype_1.int32_t);
        this.equals(int2short_as_int(-1), 0xffff, "int to short old");
        const int2short = (0, assembler_1.asm)()
            .movzx_r_r(assembler_1.Register.rax, assembler_1.Register.rcx, assembler_1.OperationSize.dword, assembler_1.OperationSize.word)
            .make(nativetype_1.int16_t, { name: "test, int2short" }, nativetype_1.int32_t);
        this.equals(int2short(-1), -1, "int to short");
        this.equals(int2short(0xffff), -1, "int to short");
        const int2ushort = (0, assembler_1.asm)()
            .movzx_r_r(assembler_1.Register.rax, assembler_1.Register.rcx, assembler_1.OperationSize.dword, assembler_1.OperationSize.word)
            .make(nativetype_1.uint16_t, { name: "test, int2ushort" }, nativetype_1.int32_t);
        this.equals(int2ushort(-1), 0xffff, "int to ushort");
        this.equals(int2ushort(0xffff), 0xffff, "int to ushort");
        const string2string = (0, assembler_1.asm)().mov_r_r(assembler_1.Register.rax, assembler_1.Register.rcx).make(nativetype_1.CxxString, { name: "test, string2string" }, nativetype_1.CxxString);
        this.equals(string2string("test"), "test", "string to string");
        this.equals(string2string("testtesta"), "testtesta", "test string over 8 bytes");
        this.equals(string2string("test string over 15 bytes"), "test string over 15 bytes", "string to string");
        const nullreturn = (0, assembler_1.asm)().xor_r_r(assembler_1.Register.rax, assembler_1.Register.rax).make(core_1.NativePointer, { name: "test, nullreturn" });
        this.equals(nullreturn(), null, "nullreturn does not return null");
        const returning = (0, assembler_1.asm)().mov_r_r(assembler_1.Register.rax, assembler_1.Register.rcx).make(nativetype_1.int32_t, { name: "test, returning" }, nativetype_1.int32_t);
        this.equals(returning(1), 1, "makefunc.js, returning failed");
        const returningNative = makefunc_1.makefunc.np(returning, nativetype_1.int32_t, { name: "test, overTheFiveNative" }, nativetype_1.int32_t);
        const returningRewrap = makefunc_1.makefunc.js(returningNative, nativetype_1.int32_t, { name: "test, overTheFiveRewrap" }, nativetype_1.int32_t);
        this.equals(returningRewrap(1), 1, "makefunc.np, returning failed");
        const overTheFour = (0, assembler_1.asm)()
            .mov_r_rp(assembler_1.Register.rax, assembler_1.Register.rsp, 1, 0x28)
            .make(nativetype_1.int32_t, { name: "test, overTheFour" }, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.int32_t);
        this.equals(overTheFour(0, 0, 0, 0, 1234), 1234, "makefunc.js, overTheFour failed");
        const overTheFiveNative = makefunc_1.makefunc.np(overTheFour, nativetype_1.int32_t, { name: "test, overTheFiveNative" }, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.int32_t);
        const overTheFiveRewrap = makefunc_1.makefunc.js(overTheFiveNative, nativetype_1.int32_t, { name: "test, overTheFiveRewrap" }, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.int32_t);
        this.equals(overTheFiveRewrap(0, 0, 0, 0, 1234), 1234, "makefunc.np, overTheFour failed");
        const CxxStringVectorToArray = cxxvector_1.CxxVectorToArray.make(nativetype_1.CxxString);
        const CxxStringVector = cxxvector_1.CxxVector.make(nativetype_1.CxxString);
        const class_to_array = (0, assembler_1.asm)().mov_r_r(assembler_1.Register.rax, assembler_1.Register.rcx).make(CxxStringVectorToArray, { name: "test, class_to_array" }, CxxStringVector);
        const clsvector = CxxStringVector.construct();
        clsvector.push("a", "b", "c", "d");
        this.equals(class_to_array(clsvector).join(","), "a,b,c,d", "CxxVectorToArray, class_to_array");
        clsvector.destruct();
        const array_to_array = (0, assembler_1.asm)().mov_r_r(assembler_1.Register.rax, assembler_1.Register.rcx).make(CxxStringVectorToArray, { name: "test, array_to_array" }, CxxStringVectorToArray);
        this.equals(array_to_array(["a", "b", "c", "d"]).join(","), "a,b,c,d", "CxxVectorToArray, array_to_array");
        const rfloat_to_bin = (0, assembler_1.asm)().mov_r_r(assembler_1.Register.rax, assembler_1.Register.rcx).make(nativetype_1.bin64_t, { name: "test, rfloat_to_bin" }, blockpos_1.RelativeFloat);
        const value = blockpos_1.RelativeFloat.create(123, true);
        this.equals(rfloat_to_bin(value), value.bin_value, "rfloat_to_bin");
        const strStructureReturn = makefunc_1.makefunc.js(makefunc_1.makefunc.np(str => str, nativetype_1.CxxString, { structureReturn: true }, nativetype_1.CxxString), nativetype_1.CxxString, { structureReturn: true }, nativetype_1.CxxString);
        this.equals(strStructureReturn("test"), "test", "CxxString structureReturn failed");
    },
    vectorcopy() {
        const a = new VectorClass(true);
        a.construct();
        a.vector.push("test");
        const str = new pointer_1.CxxStringWrapper(true);
        str.construct();
        str.value = "test2";
        a.vector2.push(str);
        this.equals(a.vector.size(), 1, "a.vector, invalid size");
        this.equals(a.vector2.size(), 1, "a.vector2, invalid size");
        this.equals(a.vector.get(0), "test", `a.vector, invalid value ${a.vector.get(0)}`);
        this.equals(a.vector2.get(0).value, "test2", `a.vector2, invalid value ${a.vector2.get(0).value}`);
        const b = new VectorClass(true);
        b.construct(a);
        this.equals(b.vector.size(), 1, "b.vector, invalid size");
        this.equals(b.vector2.size(), 1, "b.vector2, invalid size");
        this.equals(b.vector.get(0), "test", `b.vector, invalid value ${b.vector.get(0)}`);
        this.equals(b.vector2.get(0).value, "test2", `b.vector2, invalid value ${b.vector2.get(0).value}`);
        b.vector.get(0);
        b.destruct();
        a.vector.push("test1", "test2", "test3");
        this.equals(a.vector.size(), 4, "a.vector, invalid size");
        this.equals([...a.vector].join(","), "test,test1,test2,test3", "a.vector, invalid size");
        a.destruct();
        for (let i = 0; i < 2; i++) {
            const vec = cxxvector_1.CxxVector.make(nativetype_1.CxxString).construct();
            vec.push("1111111122222222");
            this.equals(vec.toArray().join(","), "1111111122222222", "vector push 1");
            vec.push("2");
            this.equals(vec.toArray().join(","), "1111111122222222,2", "vector push 2");
            vec.push("3");
            this.equals(vec.toArray().join(","), "1111111122222222,2,3", "vector push 3");
            vec.push("4");
            this.equals(vec.toArray().join(","), "1111111122222222,2,3,4", "vector push 4");
            vec.set(4, "5");
            this.equals(vec.toArray().join(","), "1111111122222222,2,3,4,5", "vector set");
            vec.setFromArray(["1", "2", "3", "4"]);
            this.equals(vec.toArray().join(","), "1,2,3,4", ", setFromArray smaller");
            vec.setFromArray(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
            this.equals(vec.toArray().join(","), "1,2,3,4,5,6,7,8,9", "setFromArray larger");
            vec.resize(6);
            this.equals(vec.toArray().join(","), "1,2,3,4,5,6", "resize smaller");
            vec.resize(32);
            this.equals(vec.toArray().join(","), "1,2,3,4,5,6,,,,,,,,,,,,,,,,,,,,,,,,,,", "resize larger");
            vec.destruct();
            vec.construct();
            vec.splice(0, 0, "1", "2", "3", "4");
            this.equals(vec.toArray().join(","), "1,2,3,4", "splice to empty");
            vec.splice(1, 2, "3", "4");
            this.equals(vec.toArray().join(","), "1,3,4,4", "splice same size");
            vec.splice(1, 2, "5");
            this.equals(vec.toArray().join(","), "1,5,4", "splice smaller");
            vec.splice(1, 1, "1", "2", "3", "4");
            this.equals(vec.toArray().join(","), "1,1,2,3,4,4", "splice larger");
            vec.destruct();
        }
        str.destruct();
    },
    classvectorcopy() {
        const vec = cxxvector_1.CxxVector.make(nativetype_1.CxxString).construct();
        vec.resize(5);
        vec.set(0, "t1");
        vec.set(1, "t2");
        const str = new pointer_1.CxxStringWrapper(true);
        str.construct();
        str.value = "test2";
        const clsvector = cxxvector_1.CxxVector.make(VectorClass).construct();
        const cls = VectorClass.construct();
        cls.vector.push("test1");
        cls.vector.push("test2");
        cls.vector2.push(str);
        cls.vector3.push(vec);
        cls.vector3.push(vec);
        clsvector.push(cls);
        clsvector.push(cls);
        cls.destruct();
        const cloned = cxxvector_1.CxxVector.make(VectorClass).construct(clsvector);
        this.equals(cloned.get(0).vector.toArray().join(","), "test1,test2", "class, string vector");
        this.equals(cloned.get(1).vector.toArray().join(","), "test1,test2", "cloned class, string vector");
        this.equals(cloned
            .get(0)
            .vector2.toArray()
            .map(v => v.value)
            .join(","), "test2", "class, string vector");
        this.equals(cloned
            .get(1)
            .vector2.toArray()
            .map(v => v.value)
            .join(","), "test2", "cloned class, string vector");
        this.equals(cloned
            .get(0)
            .vector3.toArray()
            .map(v => v.toArray().join(","))
            .join(","), "t1,t2,,,,t1,t2,,,", "class, string vector");
        this.equals(cloned
            .get(1)
            .vector3.toArray()
            .map(v => v.toArray().join(","))
            .join(","), "t1,t2,,,,t1,t2,,,", "cloned class, string vector");
        cloned.destruct();
        clsvector.destruct();
    },
    optional() {
        const optionalInt = cxxoptional_1.CxxOptionalToUndefUnion.make(nativetype_1.int32_t);
        const optionalJs = (0, assembler_1.asm)()
            .mov_r_rp(assembler_1.Register.rax, assembler_1.Register.rdx, 1, 0)
            .mov_rp_r(assembler_1.Register.rcx, 1, 0, assembler_1.Register.rax)
            .mov_r_r(assembler_1.Register.rax, assembler_1.Register.rcx)
            .make(optionalInt, { structureReturn: true }, optionalInt);
        const optionalNp = makefunc_1.makefunc.js(makefunc_1.makefunc.np(v => v, optionalInt, { structureReturn: true }, optionalInt), optionalInt, { structureReturn: true }, optionalInt);
        this.equals(optionalJs(32), 32, "optionalJs fail");
        this.equals(optionalJs(undefined), undefined, "optionalJs fail");
        this.equals(optionalNp(32), 32, "optionalNp fail");
        this.equals(optionalNp(undefined), undefined, "optionalNp fail");
    },
    map() {
        const map = cxxmap_1.CxxMap.make(nativetype_1.CxxString, nativetype_1.int32_t).construct();
        map.set("a", 4);
        map.set("b", 5.5);
        map.set("abcdefg12345678910", 6);
        this.equals(map.get("a"), 4, "map get a");
        this.equals(map.get("b"), 5, "map get b");
        this.equals(map.get("abcdefg12345678910"), 6, "cxxmap get long text");
        this.equals(map.size(), 3, "map size");
        map.destruct();
        const map2 = cxxmap_1.CxxMap.make(nativetype_1.CxxString, cxxvector_1.CxxVector.make(nativetype_1.CxxString)).construct();
        const a = cxxvector_1.CxxVector.make(nativetype_1.CxxString).construct();
        a.push("a");
        map2.set("1", a);
        a.push("b");
        map2.set("2", a);
        a.destruct();
        this.equals(map2
            .toArray()
            .map(([a, b]) => [a, b.toArray().join("-")].join("-"))
            .join(","), "1-a,2-a-b", "cxxmap set with vector");
        map2.destruct();
    },
    json() {
        const v = new connreq_1.JsonValue(true);
        v.constructWith({ test: 0, test2: "a", test3: true });
        this.equals(v.get("test").value(), 0, "json int");
        this.equals(v.get("test2").value(), "a", "json string");
        this.equals(v.get("test3").value(), true, "json boolean");
        v.destruct();
    },
    async command() {
        // command hook test, error test, parameter type test
        let passed = false;
        const cb = (cmd, origin, ctx) => {
            if (cmd === "/__dummy_command") {
                passed = origin === "Server";
                this.assert(ctx.origin.vftable.equalsptr(symbols_1.proc["??_7ServerCommandOrigin@@6B@"]), "invalid origin");
                const dimension = ctx.origin.getDimension();
                this.assert(isDimensionClass(dimension), "invalid dimension");
                this.equals(dimension.getDefaultBiomeString(), "ocean", "invalid getDefaultBiomeString");
                const pos = ctx.origin.getWorldPosition();
                this.assert(pos.x === 0 && pos.y === 0 && pos.z === 0, "world pos is not zero");
                const actor = ctx.origin.getEntity();
                this.assert(actor === null, `origin.getEntity() is not null. result = ${actor}`);
                const level = ctx.origin.getLevel();
                this.assert(level.vftable.equalsptr(symbols_1.proc["??_7ServerLevel@@6BILevel@@@"]), "origin.getLevel() is not ServerLevel");
                const players = level.getPlayers();
                const size = players.length;
                this.equals(size, 0, "origin.getLevel().players.size is not zero");
                this.assert(players.length < 64, "origin.getLevel().players has too big capacity");
                this.equals(ctx.origin.getRequestId(), "00000000-0000-0000-0000-000000000000", "unexpected id");
                event_1.events.command.remove(cb);
            }
        };
        event_1.events.command.on(cb);
        await new Promise(resolve => {
            const outputcb = (output) => {
                if (output.startsWith("Unknown command: __dummy_command")) {
                    event_1.events.commandOutput.remove(outputcb);
                    if (passed)
                        resolve();
                    else
                        this.fail();
                    return common_1.CANCEL;
                }
            };
            event_1.events.commandOutput.on(outputcb);
            launcher_1.bedrockServer.executeCommandOnConsole("__dummy_command");
        });
    },
    async commandregister() {
        // command register test, parameter test
        await checkCommandRegister(this, "cmdtest", [], {
            throughConsole: true,
        });
        await checkCommandRegister(this, "cmdtest2", []);
        await checkCommandRegister(this, "cmdtest3", [[nativetype_1.CxxString, "a", "a"]]);
        await checkCommandRegister(this, "cmdtest4", [
            [nativetype_1.CxxString, "a", "a"],
            [[nativetype_1.CxxString, true], null, undefined],
        ]);
        const tests = [];
        for (let i = 0; i < 100; i++) {
            tests.push(await checkCommandRegister(this, "repeat" + i, [[nativetype_1.CxxString, "a", "a"]], { noRun: true }));
        }
        for (const test of tests) {
            await test();
        }
    },
    async commandenum() {
        const enumtype = command_2.command.enum("EnumType", "enum1", "Enum2", "ENUM3");
        command_2.command.enum("EnumType", "enum4"); // duplicate check
        const ts_enum = command_2.command.enum("DimensionId", actor_1.DimensionId);
        await checkCommandRegister(this, "mappercheck", [[enumtype, "enum1", "enum1"]]);
        await checkCommandRegister(this, "mappers", [
            // Tests for enums with strings and the string mapper
            [enumtype, "ENUM1", "enum1"],
            [enumtype, "enum3", "ENUM3"],
            [enumtype, "enum4", undefined],
            [command_2.command.enum("EnumType2", ["test"]), "test", "test"],
            // Tests for enums with numeric values
            [ts_enum, "overworld", 0],
            [ts_enum, "Nether", 1],
            [ts_enum, "THEEND", 2],
        ]);
    },
    async commandrawenum() {
        const gameModeEnum = command_2.command.rawEnum("GameMode");
        this.arrayEquals(gameModeEnum.getValues(), ["default", "creative", "spectator", "survival", "adventure", "d", "c", "s", "a"]);
        for (let i = 0; i < 2; i++) {
            await checkCommandRegister(this, "raw" + i, [
                [command_2.command.rawEnum("GameMode"), "default", 5],
                [command_2.command.rawEnum("IntGameRule"), "maxcommandchainlength", "maxcommandchainlength"],
                [command_2.command.rawEnum("EntityType"), "minecraft:zombie", "minecraft:zombie"],
                [command_2.command.rawEnum("Enchant"), "fire_protection", "fire_protection"],
            ]);
        }
        // await checkCommandRegister('extends', [
        //     [command.enum('EntityType', {a: 0}), 'a', 0], // Test for built-in enums with custom type (ActorDefinitionIdentifier for this case, but maps to number) and the new value 'a' as 0
        //     [command.enum('EntityType', 'custom'), 'custom', 'custom'], // Test for built-in enums with custom type (ActorDefinitionIdentifier for this case, but maps to string) and the new value 'custom'
        //     [command.enum('Difficulty', 'aaa'), 'aaa', 'aaa'], // Test for built-in enums and the new value 'aaa'
        // ]);
    },
    async commandsoftenum() {
        await checkCommandRegister(this, "soft", [
            [command_2.command.softEnum("Soft1", "softenum"), "anything", "anything"],
            [command_2.command.softEnum("Soft2", "first", "Second!!", "THI R D"), '"thi r d"', "thi r d"],
            [command_2.command.softEnum("Tool", "Override", "another"), "Override", "Override"], // Test for built-in soft enums with new values
        ]);
    },
    async checkPacketNames() {
        const wrongNames = new Map([
            ["UpdateTradePacket", ""],
            ["UpdateEquipPacket", ""],
            ["ModalFormRequestPacket", "ShowModalFormPacket"],
            ["SpawnParticleEffectPacket", "SpawnParticleEffect"],
            ["ResourcePackStackPacket", "ResourcePacksStackPacket"],
            ["PositionTrackingDBServerBroadcastPacket", "PositionTrackingDBServerBroadcast"],
            ["PositionTrackingDBClientRequestPacket", "PositionTrackingDBClientRequest"],
            ["NpcDialoguePacket", "NPCDialoguePacket"],
            ["AddEntity", "AddEntityPacket"],
            ["ItemStackRequestPacket", "ItemStackRequest"],
            ["ItemStackResponsePacket", "ItemStackResponse"],
            ["ClientboundMapItemData", "MapItemDataPacket"],
            ["AdventureSettingsPacket", null],
            ["EventPacket", "TelemetryEventPacket"],
            ["AutomationClientConnectPacket", "WSConnectPacket"],
            ["StructureTemplateDataResponsePacket", "StructureTemplateDataExportPacket"],
        ]);
        for (const id in packets_1.PacketIdToType) {
            try {
                const Packet = packets_1.PacketIdToType[+id];
                let expected = wrongNames.get(Packet.name);
                let packet;
                try {
                    packet = Packet.allocate();
                }
                catch (err) {
                    if (err.message.endsWith(" is not created")) {
                        this.equals(expected, null, err.message);
                        continue;
                    }
                    else {
                        throw err;
                    }
                }
                let getNameResult = packet.getName();
                if (expected === undefined)
                    expected = Packet.name;
                this.equals(getNameResult, expected);
                this.equals(packet.getId(), Packet.ID);
                let name = Packet.name;
                const idx = name.lastIndexOf("Packet");
                if (idx !== -1)
                    name = name.substr(0, idx) + name.substr(idx + 6);
                this.equals(packetids_1.MinecraftPacketIds[Packet.ID], name);
                packet.dispose();
            }
            catch (err) {
                this.error(err.message);
            }
        }
        for (const id in packetids_1.MinecraftPacketIds) {
            if (!/^\d+$/.test(id))
                continue;
            const Packet = packets_1.PacketIdToType[+id];
            this.assert(!!Packet, `MinecraftPacketIds.${packetids_1.MinecraftPacketIds[id]}: class not found`);
        }
    },
    classFields() {
        {
            const packet = packets_1.ModalFormResponsePacket.allocate();
            this.equals(packet.id, 0);
            this.equals(packet.response.value(), undefined);
            packet.id = 10;
            packet.response.initValue();
            packet.response.value().setValue("test");
            packet.dispose();
        }
        {
            const itemStack = inventory_1.ItemStack.constructWith("minecraft:dirt", 12, 1);
            this.assert(itemStack.block.equalsptr(block_1.Block.create("minecraft:dirt", 1)), "itemStack.block");
            this.equals(itemStack.valid, true, "itemStack.vaild");
            this.equals(itemStack.showPickup, true, "itemStack.showPickup");
            this.equals(itemStack.canPlaceOn.size(), 0, "itemStack.canPlaceOn");
            this.equals(itemStack.canDestroy.size(), 0, "itemStack.canDestroy");
            this.equals(itemStack.amount, 12, "itemStack.amount");
            const itemDesc = inventory_1.NetworkItemStackDescriptor.constructWith(itemStack);
            this.equals(itemDesc._unknown, "\0\0\0\0\0\0\0\0\0\0", "itemDesc._unknown");
            itemDesc._unknown = "over 15 bytes string";
            itemDesc.destruct();
            itemStack.destruct();
        }
    },
    packetEvents() {
        let idcheck = 0;
        let sendpacket = 0;
        let ignoreEndingPacketsAfter = 0; // ignore ni check of send for the avoiding disconnected ni.
        for (let i = 0; i < 255; i++) {
            if (tooHeavy.has(i))
                continue;
            event_1.events.packetRaw(i).on(this.wrap((ptr, size, ni, packetId) => {
                this.assert(ni.getAddress() !== "UNASSIGNED_SYSTEM_ADDRESS", "packetRaw, Invalid ni, id=" + packetId);
                idcheck = packetId;
                this.assert(size > 0, `packetRaw, packet is too small (size = ${size})`);
                this.equals(packetId, ptr.readVarUint() & 0x3ff, `packetRaw, different packetId in buffer. id=${packetId}`);
            }, 0));
            event_1.events.packetBefore(i).on(this.wrap((ptr, ni, packetId) => {
                this.assert(ni.getAddress() !== "UNASSIGNED_SYSTEM_ADDRESS", "packetBefore, Invalid ni, id=" + packetId);
                this.equals(packetId, idcheck, `packetBefore, different packetId on before. id=${packetId}`);
                this.equals(ptr.getId(), idcheck, `packetBefore, different class.packetId on before. id=${packetId}`);
            }, 0));
            event_1.events.packetAfter(i).on(this.wrap((ptr, ni, packetId) => {
                this.assert(ni.getAddress() !== "UNASSIGNED_SYSTEM_ADDRESS", "packetAfter, Invalid ni, id=" + packetId);
                this.equals(packetId, idcheck, `packetAfter, different packetId on after. id=${packetId}`);
                this.equals(ptr.getId(), idcheck, `packetAfter, different class.packetId on after. id=${packetId}`);
            }, 0));
            event_1.events.packetSend(i).on(this.wrap((ptr, ni, packetId) => {
                if (Date.now() < ignoreEndingPacketsAfter) {
                    this.assert(ni.getAddress() !== "UNASSIGNED_SYSTEM_ADDRESS", "packetSend, Invalid ni, id=" + packetId);
                }
                sendidcheck = packetId;
                this.equals(ptr.getId(), packetId, `packetSend, different class.packetId on send. id=${packetId}`);
                sendpacket++;
            }, 0));
            event_1.events.packetSendRaw(i).on(this.wrap((ptr, size, ni, packetId) => {
                const recentSent = (0, net_rawpacket_1.getRecentSentPacketId)();
                if (recentSent !== null) {
                    sendidcheck = recentSent;
                }
                if (Date.now() < ignoreEndingPacketsAfter) {
                    this.assert(ni.getAddress() !== "UNASSIGNED_SYSTEM_ADDRESS", "packetSendRaw, Invalid ni, id=" + packetId);
                }
                this.assert(size > 0, `packetSendRaw, packet size is too little`);
                if (chatCancelCounter === 0 && packetId !== packetids_1.MinecraftPacketIds.PacketViolationWarning) {
                    this.equals(packetId, sendidcheck, `packetSendRaw, different packetId on sendRaw. id=${packetId}`);
                }
                this.equals(packetId, ptr.readVarUint() & 0x3ff, `packetSendRaw, different packetId in buffer. id=${packetId}`);
                sendpacket++;
            }, 0));
        }
        const conns = new Set();
        event_1.events.packetAfter(packetids_1.MinecraftPacketIds.Login).on(this.wrap((ptr, ni) => {
            ignoreEndingPacketsAfter = Date.now() + 2000;
            this.assert(!conns.has(ni), "[test] login without connection");
            conns.add(ni);
            const connreq = ptr.connreq;
            this.assert(connreq !== null, "no ConnectionRequest, client version mismatched?");
            if (connreq !== null) {
                const cert = connreq.getCertificate();
                let uuid = cert.json.value()["extraData"]["identity"];
                this.equals(cert.getIdentityString(), uuid, "getIdentityString() !== extraData.identity");
            }
            setTimeout(() => {
                if (sendpacket === 0) {
                    this.error("[test] no packet was sent");
                }
            }, 1000);
        }));
        event_1.events.networkDisconnected.on(this.wrap(ni => {
            this.assert(conns.delete(ni), "[test] disconnection without connection");
        }, 0));
        event_1.events.packetSend(packetids_1.MinecraftPacketIds.AvailableCommands).on(this.wrap(p => {
            const commandArray = p.commands.toArray();
            for (let i = 0; i < commandArray.length; i++) {
                if (commandArray[i].name === "teleport") {
                    commandArray.splice(i, 1);
                    i--;
                }
            }
            p.commands.setFromArray(commandArray);
        }, 1));
    },
    actor() {
        event_1.events.entityCreated.on(this.wrap(ev => {
            const level = launcher_1.bedrockServer.level;
            try {
                const actor = ev.entity;
                const identifier = actor.getIdentifier();
                this.assert(identifier.startsWith("minecraft:"), "Invalid identifier");
                if (identifier === "minecraft:player") {
                    this.equals(level.getPlayers().length, launcher_1.bedrockServer.serverInstance.getActivePlayerCount(), "Unexpected player size");
                    this.assert(actor !== null, "Actor.fromEntity of player is null");
                }
                if (actor !== null) {
                    const dim = actor.getDimension();
                    this.assert(isDimensionClass(dim), "getDimension() is invalid");
                    this.equals(actor.getDimensionId(), dim.getDimensionId(), "getDimensionId() is invalid");
                    if (actor instanceof player_1.Player) {
                        const abilities = actor.getAbilities();
                        const cmdlevel = abilities.getCommandPermissions();
                        this.assert(command_1.CommandPermissionLevel.Normal <= cmdlevel && cmdlevel <= command_1.CommandPermissionLevel.Internal, "invalid actor.abilities");
                        this.equals(actor.getCommandPermissionLevel(), cmdlevel, "Invalid command permission level");
                        const playerlevel = abilities.getPlayerPermissions();
                        this.assert(player_1.PlayerPermission.VISITOR <= playerlevel && playerlevel <= player_1.PlayerPermission.CUSTOM, "invalid actor.abilities");
                        this.equals(actor.getPermissionLevel(), playerlevel, "Invalid player permission level");
                        if (!(actor instanceof player_1.SimulatedPlayer)) {
                            this.equals(actor.getCertificate().getXuid(), connectedXuid, "xuid mismatch");
                        }
                        const pos = actor.getSpawnPosition();
                        const dim = actor.getSpawnDimension();
                        this.equals(dim, actor_1.DimensionId.Undefined, "respawn dimension mismatch");
                        actor.setRespawnPosition(blockpos_1.BlockPos.create(1, 2, 3), actor_1.DimensionId.TheEnd);
                        const newPos = actor.getSpawnPosition();
                        const respawnpointCheck = newPos.x === 1 && newPos.y === 2 && newPos.z === 3 && actor.getSpawnDimension() === actor_1.DimensionId.TheEnd;
                        this.assert(respawnpointCheck, "respawn position/dimension mismatch");
                        if (!respawnpointCheck)
                            process.exit(-1); // terminate it for not saving it.
                        actor.setRespawnPosition(pos, dim);
                        const item = inventory_1.ItemStack.constructWith("minecraft:cobblestone");
                        const cloned = item.clone();
                        actor.addItem(item);
                        item.destruct();
                        actor.addItem(cloned);
                        cloned.destruct();
                        // test for hasFamily
                        this.assert(actor.hasFamily("player") === true, "the actor must be a Player");
                        this.assert(actor.hasFamily("undead") === false, "the actor must be not a Undead Mob");
                        const ROUND_UP_AXIS = 0x10000;
                        const checkAbility = (index, expected) => {
                            const abil = abilities.getAbility(index);
                            let actual = abil.getValue();
                            if (typeof actual === "number")
                                actual = Math.round(actual * ROUND_UP_AXIS) / ROUND_UP_AXIS;
                            if (typeof expected === "number")
                                expected = Math.round(expected * ROUND_UP_AXIS) / ROUND_UP_AXIS;
                            this.equals(actual, expected, `unexpected ${abilities_1.AbilitiesIndex[index]} value`, { stackOffset: 1 });
                        };
                        checkAbility(abilities_1.AbilitiesIndex.Build, true);
                        checkAbility(abilities_1.AbilitiesIndex.Mine, true);
                        checkAbility(abilities_1.AbilitiesIndex.DoorsAndSwitches, true);
                        checkAbility(abilities_1.AbilitiesIndex.OpenContainers, true);
                        checkAbility(abilities_1.AbilitiesIndex.AttackMobs, true);
                        // checkAbility(AbilitiesIndex.Invulnerable, false); // skip for creative
                        // checkAbility(AbilitiesIndex.Flying, false); // skip for creative
                        // checkAbility(AbilitiesIndex.MayFly, false); // skip for creative
                        // checkAbility(AbilitiesIndex.Instabuild, false); // skip for creative
                        checkAbility(abilities_1.AbilitiesIndex.Lightning, false);
                        checkAbility(abilities_1.AbilitiesIndex.FlySpeed, 0.05);
                        checkAbility(abilities_1.AbilitiesIndex.WalkSpeed, 0.1);
                        checkAbility(abilities_1.AbilitiesIndex.Muted, false);
                        checkAbility(abilities_1.AbilitiesIndex.WorldBuilder, false);
                        checkAbility(abilities_1.AbilitiesIndex.NoClip, false);
                    }
                    if (identifier === "minecraft:player") {
                        const players = level.getPlayers();
                        const last = players[players.length - 1];
                        this.assert(last === actor, "the joined player is not a last player");
                        const name = actor.getNameTag();
                        if (!(actor instanceof player_1.SimulatedPlayer)) {
                            this.equals(name, connectedId, "id does not match");
                            this.equals(actor.getNetworkIdentifier(), connectedNi, "the network identifier does not match");
                            this.assert(actor === connectedNi.getActor(), "ni.getActor() is not actor");
                            actor.setName("test");
                            this.equals(actor.getNameTag(), "test", "name is not set");
                            actor.setName(name);
                        }
                        this.equals(actor.getEntityTypeId(), actor_1.ActorType.Player, "player type does not match");
                        this.assert(actor.isPlayer(), "player is not the player");
                        this.assert(actor_1.Actor.fromEntity(actor.getEntity()) === actor, "actor.getEntity is not entity");
                    }
                    else {
                        this.assert(!actor.isPlayer(), `an entity that is not a player is a player (identifier:${identifier})`);
                    }
                }
            }
            catch (err) {
                this.processError(err);
            }
        }, 5));
        event_1.events.playerJoin.on(this.wrap(ev => {
            const player = ev.player;
            try {
                const netId = player.getNetworkIdentifier();
                this.equals(player.deviceId, launcher_1.bedrockServer.serverNetworkHandler.fetchConnectionRequest(netId).getDeviceId(), "player.deviceId is broken");
                const region = player.getRegion();
                const levelChunk = region.getChunkAt(blockpos_1.BlockPos.create(player.getPosition()));
                if (levelChunk) {
                    const entityRefs = levelChunk.getChunkEntities();
                    for (const entityRef of entityRefs) {
                        const entityFromRef = entityRef.tryUnwrapActor();
                        if (entityFromRef) {
                            const actorId = entityFromRef.getUniqueIdBin();
                            const entityFromChunk = levelChunk.getEntity(actorId);
                            this.assert(entityFromRef === entityFromChunk, "fetched entity is wrong");
                        }
                        else {
                            this.error("failed to get entity from WeakEntityRef");
                        }
                    }
                }
            }
            catch (err) {
                this.processError(err);
            }
        }));
    },
    chat() {
        const MAX_CHAT = 6;
        event_1.events.packetSend(packetids_1.MinecraftPacketIds.Text).on(ev => {
            if (chatCancelCounter >= 2)
                return;
            if (ev.message === "TEST YEY!") {
                chatCancelCounter++;
                this.log(`test (${chatCancelCounter}/${MAX_CHAT})`);
                if (chatCancelCounter === 2)
                    return common_1.CANCEL; // canceling
            }
        });
        event_1.events.packetBefore(packetids_1.MinecraftPacketIds.Text).on((packet, ni) => {
            if (chatCancelCounter < 2)
                return;
            if (packet.message == "TEST YEY!") {
                chatCancelCounter++;
                this.log(`test (${chatCancelCounter}/${MAX_CHAT})`);
                this.equals(connectedNi, ni, "the network identifier does not match");
                if (chatCancelCounter === MAX_CHAT) {
                    this.log("> tested and stopping...");
                    setTimeout(() => launcher_1.bedrockServer.stop(), 1000);
                }
                return common_1.CANCEL;
            }
        });
    },
    attributeNames() {
        let Attribute = class Attribute extends nativeclass_1.AbstractClass {
        };
        tslib_1.__decorate([
            (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
        ], Attribute.prototype, "u", void 0);
        tslib_1.__decorate([
            (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
        ], Attribute.prototype, "id", void 0);
        tslib_1.__decorate([
            (0, nativeclass_1.nativeField)(hashedstring_1.HashedString)
        ], Attribute.prototype, "name", void 0);
        Attribute = tslib_1.__decorate([
            (0, nativeclass_1.nativeClass)(null)
        ], Attribute);
        const getByName = prochacker_1.procHacker.js("?getByName@Attribute@@SAAEAV1@AEBVHashedString@@@Z", Attribute, null, hashedstring_1.HashedString);
        for (const key of (0, util_1.getEnumKeys)(attribute_1.AttributeId)) {
            const name = common_1.AttributeName[key];
            const hashname = hashedstring_1.HashedString.construct();
            hashname.set(name);
            const attr = getByName(hashname);
            this.equals(attr.id, attribute_1.AttributeId[key], `AttributeId(${name}) mismatch`);
            hashname.destruct();
        }
    },
    testPlayerCount() {
        event_1.events.queryRegenerate.once(this.wrap(v => {
            this.equals(v.currentPlayers, 0, "player count mismatch");
            this.equals(v.maxPlayers, launcher_1.bedrockServer.serverInstance.getMaxPlayers(), "max player mismatch");
        }));
        launcher_1.bedrockServer.serverNetworkHandler.updateServerAnnouncement();
        event_1.events.packetAfter(packetids_1.MinecraftPacketIds.Login).once(this.wrap((packet, ni) => {
            setTimeout(this.wrap(() => {
                event_1.events.queryRegenerate.once(v => {
                    this.equals(v.currentPlayers, 1, "player count mismatch");
                });
            }), 1000);
        }));
    },
    etc() {
        const item = inventory_1.ItemStack.constructWith("minecraft:acacia_boat");
        item.destruct();
    },
    nbt() {
        const tagTypes = [
            nbt_1.EndTag,
            nbt_1.ByteTag,
            nbt_1.ShortTag,
            nbt_1.IntTag,
            nbt_1.Int64Tag,
            nbt_1.FloatTag,
            nbt_1.DoubleTag,
            nbt_1.ByteArrayTag,
            nbt_1.StringTag,
            nbt_1.ListTag,
            nbt_1.CompoundTag,
            nbt_1.IntArrayTag,
        ];
        for (let i = 0; i < 10; i++) {
            for (const tagType of tagTypes) {
                const allocated = tagType.allocate();
                allocated.dispose();
            }
            const barray = nbt_1.ByteArrayTag.allocateWith([1, 2, 3, 4, 5]);
            const iarray = nbt_1.IntArrayTag.allocateWith([1, 2, 3, 4]);
            const str = nbt_1.StringTag.allocateWith("12345678901234567890");
            const map = nbt_1.CompoundTag.allocate();
            const list = nbt_1.ListTag.allocate();
            list.push(str);
            this.assert(list.equals(list), "list.equals");
            const mapLoop = 20;
            const mapItemCount = 4;
            for (let j = 0; j < mapLoop; j++) {
                map.set("barray" + j, barray);
                map.set("iarray" + j, iarray);
                map.set("str" + j, str);
                map.set("list" + j, list);
            }
            this.equals(map.size(), mapLoop * mapItemCount, "Compound key count check");
            const cloned = iarray.allocateClone();
            barray.dispose();
            iarray.dispose();
            str.dispose();
            list.dispose();
            this.assert((0, util_1.arrayEquals)(cloned.toInt32Array(), [1, 2, 3, 4]), "IntArrayTag check");
            cloned.dispose();
            const mapvalue = map.value();
            for (let j = 0; j < mapLoop; j++) {
                this.assert(mapvalue['barray' + j] instanceof Uint8Array && (0, util_1.arrayEquals)([1, 2, 3, 4, 5], mapvalue['barray' + j]), "ByteArrayTag check");
                this.assert(mapvalue['iarray' + j] instanceof Int32Array && (0, util_1.arrayEquals)([1, 2, 3, 4], mapvalue['iarray' + j]), "IntArrayTag check");
                this.equals(mapvalue['str' + j], "12345678901234567890", "StringTag check");
                this.assert(mapvalue['list' + j] instanceof Array && (0, util_1.arrayEquals)(["12345678901234567890"], mapvalue['list' + j]), "ListTag check");
            }
            this.equals(Object.keys(mapvalue).length, mapLoop * mapItemCount, "Compound key count check");
            map.dispose();
        }
        const nbtSample = {
            int: 123,
            true: true,
            false: false,
            byte: nbt_1.NBT.byte(1),
            short: nbt_1.NBT.short(2),
            int2: nbt_1.NBT.int(3),
            int64: nbt_1.NBT.int64(4),
            string: "string",
            list: [1, 2, 3, 4, "1", "2", "3", "4", [], {}],
            emptyList: [],
            byteArray: nbt_1.NBT.byteArray([1, 2, 3]),
            emptyByteArray: nbt_1.NBT.byteArray([]),
            intArray: nbt_1.NBT.intArray([1]),
            emptyIntArray: nbt_1.NBT.intArray([]),
            compound: {
                compound: { a: "a", b: "b", c: "c" },
                0: 0,
                1: 1,
                2: 2,
            },
            emptyCompound: {},
            "\\": "backslash test\\",
            "\\\\": "backslash test\\\\",
            "\\\\\\": "backslash test\\\\\\",
            '\\"\\\\\\': 'backslash test\\\\\\"\\',
        };
        const snbt = nbt_1.NBT.stringify(nbtSample, 4);
        const oldone = nbt_1.NBT.allocate(nbtSample);
        const newone = nbt_1.NBT.allocate(nbt_1.NBT.parse(snbt));
        if (!oldone.equals(newone)) {
            this.error("SNBT converting mismatch");
        }
        this.equals((0, util_1.stripSlashes)("\\\\\\\"\\n\\r\\b\\v\\f\\t\\'\\u0031\\x31"), "\\\"\n\r\b\v\f\t'11", "stripSlashes");
        this.equals(nbt_1.NBT.stringify(nbt_1.NBT.parse("{\"true\":true,false:false,'string':'string',\"longArray\":[L;1l,2l,3l,4l]}")), '{true:1b,false:0b,string:"string",longArray:[1l,2l,3l,4l]}', "SNBT parse only feature");
    },
    itemActor() {
        event_1.events.playerJoin.once(this.wrap(ev => {
            const pos = ev.player.getPosition();
            const region = ev.player.getRegion();
            const actor = actor_1.Actor.summonAt(region, pos, actor_1.ActorType.Item, -1);
            this.assert(actor instanceof actor_1.ItemActor, "ItemActor summoning");
            this.assert(actor.itemStack.vftable.equalsptr(symbols_1.proc["??_7ItemStack@@6B@"]), "ItemActor.itemStack is not ItemStack");
            actor.despawn();
        }));
    },
    actorRunCommand() {
        event_1.events.playerJoin.once(this.wrap(ev => {
            this.assert(ev.player.runCommand("testcommand_cmdtest").isSuccess(), "Actor.runCommand failed");
        }));
    },
    block() {
        var _a, _b, _c, _d;
        this.equals((_a = block_1.Block.create("dirt")) === null || _a === void 0 ? void 0 : _a.getName(), "minecraft:dirt");
        this.equals((_b = block_1.Block.create("minecraft:dirt")) === null || _b === void 0 ? void 0 : _b.getName(), "minecraft:dirt");
        this.equals((_c = block_1.Block.create("minecraft:air")) === null || _c === void 0 ? void 0 : _c.getName(), "minecraft:air");
        this.equals((_d = block_1.Block.create("minecraft:element_111")) === null || _d === void 0 ? void 0 : _d.getName(), "minecraft:element_111");
        this.equals(block_1.Block.create("minecraft:_no_block_"), null, "minecraft:_no_block_ is not null");
        this.assert(block_1.Block.create("dirt").equalsptr(block_1.Block.create("dirt")), "dirt is not dirt");
        this.assert(!block_1.Block.create("planks", 0).equalsptr(block_1.Block.create("planks", 1)), "planks#0 is planks#1");
    },
    blockPos() {
        this.assert(blockpos_1.BlockPos.MIN.equal(blockpos_1.BlockPos.create(INT32_MIN, INT32_MIN, INT32_MIN)), "Broken BlockPos.MIN");
        this.assert(blockpos_1.BlockPos.MAX.equal(blockpos_1.BlockPos.create(INT32_MAX, INT32_MAX, INT32_MAX)), "Broken BlockPos.MAX");
        this.assert(blockpos_1.BlockPos.ZERO.equal(blockpos_1.BlockPos.create(0, 0, 0)), "Broken BlockPos.ZERO");
        this.assert(blockpos_1.BlockPos.ONE.equal(blockpos_1.BlockPos.create(1, 1, 1)), "Broken BlockPos.ONE");
        this.assert(blockpos_1.Vec3.MIN.equal(blockpos_1.Vec3.create(FLOAT32_MIN, FLOAT32_MIN, FLOAT32_MIN)), "Broken Vec3.MIN");
        this.assert(blockpos_1.Vec3.MAX.equal(blockpos_1.Vec3.create(FLOAT32_MAX, FLOAT32_MAX, FLOAT32_MAX)), "Broken Vec3.MAX");
        this.assert(blockpos_1.Vec3.ZERO.equal(blockpos_1.Vec3.create(0, 0, 0)), "Broken Vec3.ZERO");
        this.assert(blockpos_1.Vec3.HALF.equal(blockpos_1.Vec3.create(0.5, 0.5, 0.5)), "Broken Vec3.HALF");
        this.assert(blockpos_1.Vec3.ONE.equal(blockpos_1.Vec3.create(1, 1, 1)), "Broken Vec3.ONE");
        this.assert(blockpos_1.Vec3.TWO.equal(blockpos_1.Vec3.create(2, 2, 2)), "Broken Vec3.TWO");
        this.assert(blockpos_1.Vec3.UNIT_X.equal(blockpos_1.Vec3.create(1, 0, 0)), "Broken Vec3.UNIT_X");
        this.assert(blockpos_1.Vec3.NEG_UNIT_X.equal(blockpos_1.Vec3.create(-1, 0, 0)), "Broken Vec3.NEG_UNIT_X");
        this.assert(blockpos_1.Vec3.UNIT_Y.equal(blockpos_1.Vec3.create(0, 1, 0)), "Broken Vec3.UNIT_Y");
        this.assert(blockpos_1.Vec3.NEG_UNIT_Y.equal(blockpos_1.Vec3.create(0, -1, 0)), "Broken Vec3.NEG_UNIT_Y");
        this.assert(blockpos_1.Vec3.UNIT_Z.equal(blockpos_1.Vec3.create(0, 0, 1)), "Broken Vec3.UNIT_Z");
        this.assert(blockpos_1.Vec3.NEG_UNIT_Z.equal(blockpos_1.Vec3.create(0, 0, -1)), "Broken BlockPos.NEG_UNIT_Z");
    },
    blob() {
        const blob = mce_1.mce.Blob.construct();
        blob.setFromArray([1, 2, 3, 4]);
        this.arrayEquals(blob.toArray(), [1, 2, 3, 4]);
        blob.setFromBuffer(new Uint8Array([1, 2, 3, 4, 5, 6]));
        this.arrayEquals(blob.toBuffer(), [1, 2, 3, 4, 5, 6]);
        blob.destruct();
    },
});
let connectedNi;
let connectedId;
let connectedXuid;
event_1.events.packetRaw(packetids_1.MinecraftPacketIds.Login).on((ptr, size, ni) => {
    connectedNi = ni;
});
event_1.events.packetAfter(packetids_1.MinecraftPacketIds.Login).on(ptr => {
    const connreq = ptr.connreq;
    if (connreq === null)
        return;
    const cert = connreq.getCertificate();
    connectedId = cert.getId();
    connectedXuid = cert.getXuid();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOzs7QUFFSCw4Q0FBNkU7QUFDN0Usa0RBQW9EO0FBQ3BELDBDQUEwRTtBQUMxRSxrREFBaUQ7QUFDakQsMENBQXVDO0FBQ3ZDLGdEQUFrRTtBQUNsRSw4Q0FBMEU7QUFDMUUsOENBQTZDO0FBQzdDLHNEQUErRDtBQUUvRCx3REFBcUQ7QUFDckQsa0RBQTJFO0FBQzNFLHNDQWVzQjtBQUd0QixrREFBd0Q7QUFDeEQsOENBQTBGO0FBQzFGLDRDQUE0RTtBQUM1RSw4Q0FBd0M7QUFDeEMsa0NBQStCO0FBQy9CLG9DQUFpQztBQUNqQywwQ0FBNEQ7QUFFNUQsc0RBQXVEO0FBQ3ZELHdDQUFvRDtBQUNwRCxvQ0FBMEM7QUFDMUMsd0NBQXFDO0FBQ3JDLDhDQUE2RDtBQUM3RCxvREFBMkM7QUFDM0Msa0NBQStCO0FBQy9CLHNDQUFvQztBQUNwQywwQ0FBdUM7QUFDdkMsNENBQThDO0FBQzlDLDRDQUF5QztBQUN6QyxrQ0FBK0I7QUFDL0Isa0RBQXdGO0FBQ3hGLGdEQUF5STtBQUN6SSwwQ0FBZ0Q7QUFDaEQsZ0RBQTZDO0FBQzdDLG9EQUFpRDtBQUNqRCxnREFBNkM7QUFDN0Msd0NBQXFDO0FBQ3JDLG9DQUF3RTtBQUN4RSxtREFBd0Q7QUFFeEQsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLElBQUksaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO0FBRTFCLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxHQUFHLENBQzdCLENBQUMsY0FBSSxDQUFDLHlDQUF5QyxDQUFDLEVBQUUsY0FBSSxDQUFDLHNDQUFzQyxDQUFDLEVBQUUsY0FBSSxDQUFDLHNDQUFzQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDckosSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUN2QixDQUNKLENBQUM7QUFDRixTQUFTLGdCQUFnQixDQUFDLFNBQW9CO0lBQzFDLE9BQU8saUJBQWlCLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztBQUNwRSxDQUFDO0FBQ0QsTUFBTSxVQUFVLEdBQUcsSUFBSSxHQUFHLENBQWMsQ0FBQyxtQkFBVyxDQUFDLFNBQVMsRUFBRSxtQkFBVyxDQUFDLE1BQU0sRUFBRSxtQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFJekcsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDO0FBQzdCLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQztBQUU3QixNQUFNLFdBQVcsR0FBRyxDQUFDLGFBQWEsQ0FBQztBQUNuQyxNQUFNLFdBQVcsR0FBRyxhQUFhLENBQUM7QUFFbEMsU0FBUyxvQkFBb0IsQ0FDekIsTUFBYyxFQUNkLFFBQWdCLEVBQ2hCLFNBQXlILEVBQ3pILE9BQXNELEVBQUU7SUFFeEQsTUFBTSxTQUFTLEdBQTJHLEVBQUUsQ0FBQztJQUM3SCxNQUFNLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO0lBQzNCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDeEIsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDMUM7SUFFRCxNQUFNLE9BQU8sR0FBRyxjQUFjLEdBQUcsUUFBUSxDQUFDO0lBQzFDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN0QixLQUFLLE1BQU0sUUFBUSxJQUFJLFNBQVMsRUFBRTtRQUM5QixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBSSxRQUFRLEtBQUssSUFBSTtZQUFFLFNBQVM7UUFDaEMsT0FBTyxJQUFJLEdBQUcsQ0FBQztRQUNmLE9BQU8sSUFBSSxRQUFRLENBQUM7S0FDdkI7SUFFRCxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQzdFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEIsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxRQUFRLEtBQUssTUFBTSxFQUFFO2dCQUNyQixNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN2QixNQUFNLElBQUksR0FBRyxJQUFJLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDcEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsSUFBSSxDQUFDLElBQUksV0FBVyxJQUFJLGFBQWEsQ0FBQyxDQUFDO2dCQUMvRSxPQUFPO2FBQ1Y7U0FDSjtRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0IsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBRWQsU0FBUyxHQUFHO1FBQ1IsT0FBTyxJQUFJLE9BQU8sQ0FBYyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNoRCxNQUFNLFFBQVEsR0FBRyxDQUFDLE1BQWMsRUFBRSxFQUFFO2dCQUNoQyxJQUFJLE1BQU0sS0FBSyxRQUFRLEVBQUU7b0JBQ3JCLGNBQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2IsT0FBTyxlQUFNLENBQUM7aUJBQ2pCO2dCQUNELElBQUksTUFBTSxLQUFLLFFBQVEsRUFBRTtvQkFDckIsY0FBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3RDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ25DLE9BQU8sZUFBTSxDQUFDO2lCQUNqQjtZQUNMLENBQUMsQ0FBQztZQUNGLGNBQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRWxDLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDckIsd0JBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNsRDtpQkFBTTtnQkFDSCxNQUFNLEdBQUcsR0FBRyx3QkFBYSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsaUNBQWlCLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ25GLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUU7b0JBQ2xCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDeEM7cUJBQU07b0JBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsR0FBRyxPQUFPLDRCQUE0QixDQUFDLENBQUM7b0JBQ3hGLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFFLEdBQUcsT0FBTyx5QkFBeUIsQ0FBQyxDQUFDO2lCQUM5RjthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSztRQUFFLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QyxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLENBQUM7QUFHRCxJQUFNLFdBQVcsR0FBakIsTUFBTSxXQUFZLFNBQVEseUJBQVc7Q0FPcEMsQ0FBQTtBQUxHO0lBREMsSUFBQSx5QkFBVyxFQUFDLHFCQUFTLENBQUMsSUFBSSxDQUFDLHNCQUFTLENBQUMsQ0FBQzsyQ0FDVjtBQUU3QjtJQURDLElBQUEseUJBQVcsRUFBQyxxQkFBUyxDQUFDLElBQUksQ0FBQywwQkFBZ0IsQ0FBQyxDQUFDOzRDQUNUO0FBRXJDO0lBREMsSUFBQSx5QkFBVyxFQUFDLHFCQUFTLENBQUMsSUFBSSxDQUFDLHFCQUFTLENBQUMsSUFBSSxDQUFDLHNCQUFTLENBQUMsQ0FBQyxDQUFDOzRDQUNkO0FBTnZDLFdBQVc7SUFEaEIsSUFBQSx5QkFBVyxHQUFFO0dBQ1IsV0FBVyxDQU9oQjtBQUVEOztHQUVHO0FBQ0gsTUFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztBQUNuQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsaUJBQWlCO0FBQ3JDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyx3QkFBd0I7QUFFNUMsZUFBTSxDQUFDLFdBQVcsQ0FDZDtJQUNJLEtBQUssQ0FBQyxRQUFRO1FBQ1YsSUFBSSxLQUFtQixDQUFDO1FBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEIsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNmLElBQUksT0FBTyxDQUFVLE9BQU8sQ0FBQyxFQUFFLENBQzNCLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFO29CQUNsQixZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3BCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLENBQ0w7Z0JBQ0QsSUFBSSxPQUFPLENBQVUsT0FBTyxDQUFDLEVBQUU7b0JBQzNCLEtBQUssR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO3dCQUNwQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNuQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2IsQ0FBQyxDQUFDO2FBQ0wsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0NBQ0osRUFDRDtJQUNJLEtBQUssQ0FBQyxPQUFPOztRQUNULE1BQU0sY0FBYyxHQUFHLHdCQUFhLENBQUMsY0FBYyxDQUFDO1FBQ3BELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGNBQWMsSUFBSSxjQUFjLENBQUMsU0FBUyxFQUFFLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGNBQUksQ0FBQywyREFBMkQsQ0FBQyxDQUFDLEVBQUUsc0NBQXNDLENBQUMsQ0FBQztRQUN6SixNQUFNLGNBQWMsR0FBRyx3QkFBYSxDQUFDLGNBQWMsQ0FBQztRQUNwRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxjQUFjLElBQUksY0FBYyxDQUFDLFNBQVMsRUFBRSxFQUFFLDBCQUEwQixDQUFDLENBQUM7UUFDeEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyx3QkFBYSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsY0FBSSxDQUFDLDhCQUE4QixDQUFDLENBQUMsRUFBRSxtQ0FBbUMsQ0FBQyxDQUFDO1FBRTVJLE1BQU0sT0FBTyxHQUFHLHdCQUFhLENBQUMsb0JBQW9CLENBQUM7UUFDbkQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFFekQsY0FBYyxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxFQUFFLHVCQUF1QixDQUFDLENBQUM7UUFDN0QsQ0FBQyxHQUFHLHdCQUFhLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUMsR0FBRyx3QkFBYSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUQsQ0FBQyxHQUFHLHdCQUFhLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELENBQUMsR0FBRyx3QkFBYSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMxRCxDQUFDLEdBQUcsd0JBQWEsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLENBQUMsR0FBRyx3QkFBYSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUQsQ0FBQyxHQUFHLHdCQUFhLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELEtBQUssTUFBTSxHQUFHLElBQUksQ0FBQyxtQkFBVyxDQUFDLFNBQVMsRUFBRSxtQkFBVyxDQUFDLE1BQU0sRUFBRSxtQkFBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQy9FLElBQUksQ0FBQyxNQUFNLENBQUMsd0JBQWEsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzVFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBQSx3QkFBYSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLDBDQUFFLGNBQWMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzdFO0lBQ0wsQ0FBQztDQUNKLEVBQ0Q7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