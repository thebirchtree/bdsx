"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const asmcode_1 = require("../asm/asmcode");
const assembler_1 = require("../assembler");
const networkidentifier_1 = require("../bds/networkidentifier");
const packet_1 = require("../bds/packet");
const packets_1 = require("../bds/packets");
const symbols_1 = require("../bds/symbols");
const common_1 = require("../common");
const core_1 = require("../core");
const decay_1 = require("../decay");
const event_1 = require("../event");
const launcher_1 = require("../launcher");
const makefunc_1 = require("../makefunc");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const nethook_1 = require("../nethook");
const pointer_1 = require("../pointer");
const prochacker_1 = require("../prochacker");
const sharedpointer_1 = require("../sharedpointer");
const source_map_support_1 = require("../source-map-support");
let ReadOnlyBinaryStream = class ReadOnlyBinaryStream extends nativeclass_1.AbstractClass {
    read(dest, size) {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(pointer_1.CxxStringWrapper.ref(), 0x38)
], ReadOnlyBinaryStream.prototype, "data", void 0);
ReadOnlyBinaryStream = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ReadOnlyBinaryStream);
ReadOnlyBinaryStream.prototype.read = prochacker_1.procHacker.jsv("??_7ReadOnlyBinaryStream@@6B@", "?read@ReadOnlyBinaryStream@@EEAA_NPEAX_K@Z", nativetype_1.bool_t, { this: ReadOnlyBinaryStream }, core_1.VoidPointer, nativetype_1.int64_as_float_t);
let OnPacketRBP = class OnPacketRBP extends nativeclass_1.AbstractClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(sharedpointer_1.CxxSharedPtr.make(packet_1.Packet), -0x28)
], OnPacketRBP.prototype, "packet", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(ReadOnlyBinaryStream, 0x50)
], OnPacketRBP.prototype, "stream", void 0);
OnPacketRBP = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], OnPacketRBP);
asmcode_1.asmcode.createPacketRaw = symbols_1.proc["?createPacket@MinecraftPackets@@SA?AV?$shared_ptr@VPacket@@@std@@W4MinecraftPacketIds@@@Z"];
function onPacketRaw(rbp, packetId, conn) {
    try {
        const target = event_1.events.packetRaw(packetId);
        const ni = conn.networkIdentifier;
        nethook_1.nethook.lastSender = ni;
        if (target !== null && !target.isEmpty()) {
            const s = rbp.stream;
            const data = s.data;
            const rawpacketptr = data.valueptr;
            for (const listener of target.allListeners()) {
                const ptr = rawpacketptr.add();
                try {
                    if (listener(ptr, data.length, ni, packetId) === common_1.CANCEL) {
                        return null;
                    }
                }
                catch (err) {
                    event_1.events.errorFire(err);
                }
                finally {
                    (0, decay_1.decay)(ptr);
                }
            }
        }
    }
    catch (err) {
        (0, source_map_support_1.remapAndPrintError)(err);
    }
    return (0, packet_1.createPacketRaw)(rbp.packet, packetId);
}
function onPacketBefore(packet, result) {
    try {
        if (result.streamReadResult !== packet_1.StreamReadResult.Pass)
            return false;
        const packetId = packet.getId();
        const target = event_1.events.packetBefore(packetId);
        if (target !== null && !target.isEmpty()) {
            const ni = nethook_1.nethook.lastSender;
            const TypedPacket = packets_1.PacketIdToType[packetId] || packet_1.Packet;
            const typedPacket = packet.as(TypedPacket);
            try {
                for (const listener of target.allListeners()) {
                    try {
                        if (listener(typedPacket, ni, packetId) === common_1.CANCEL) {
                            result.streamReadResult = packet_1.StreamReadResult.Ignore;
                            return false;
                        }
                    }
                    catch (err) {
                        event_1.events.errorFire(err);
                    }
                }
            }
            finally {
                (0, decay_1.decay)(typedPacket);
            }
        }
    }
    catch (err) {
        (0, source_map_support_1.remapAndPrintError)(err);
    }
    return true;
}
function onPacketAfter(packet, ni) {
    try {
        const packetId = packet.getId();
        const target = event_1.events.packetAfter(packetId);
        if (target !== null && !target.isEmpty()) {
            const TypedPacket = packets_1.PacketIdToType[packetId] || packet_1.Packet;
            const typedPacket = packet.as(TypedPacket);
            try {
                for (const listener of target.allListeners()) {
                    try {
                        if (listener(typedPacket, ni, packetId) === common_1.CANCEL) {
                            break;
                        }
                    }
                    catch (err) {
                        event_1.events.errorFire(err);
                    }
                }
            }
            finally {
                (0, decay_1.decay)(typedPacket);
            }
        }
    }
    catch (err) {
        (0, source_map_support_1.remapAndPrintError)(err);
    }
}
function onPacketSend(_, ni, packet) {
    try {
        const packetId = packet.getId();
        const target = event_1.events.packetSend(packetId);
        if (target !== null && !target.isEmpty()) {
            const TypedPacket = packets_1.PacketIdToType[packetId] || packet_1.Packet;
            const typedPacket = packet.as(TypedPacket);
            try {
                for (const listener of target.allListeners()) {
                    try {
                        if (listener(typedPacket, ni, packetId) === common_1.CANCEL) {
                            return 1;
                        }
                    }
                    catch (err) {
                        event_1.events.errorFire(err);
                    }
                }
            }
            finally {
                (0, decay_1.decay)(typedPacket);
            }
        }
    }
    catch (err) {
        (0, source_map_support_1.remapAndPrintError)(err);
    }
    return 0;
}
function onPacketSendInternal(handler, ni, packet, data) {
    try {
        const packetId = packet.getId();
        const target = event_1.events.packetSendRaw(packetId);
        if (target !== null && !target.isEmpty()) {
            const dataptr = data.valueptr;
            try {
                for (const listener of target.allListeners()) {
                    try {
                        if (listener(dataptr, data.length, ni, packetId) === common_1.CANCEL) {
                            return 1;
                        }
                    }
                    catch (err) {
                        event_1.events.errorFire(err);
                    }
                }
            }
            finally {
                (0, decay_1.decay)(dataptr);
            }
        }
    }
    catch (err) {
        (0, source_map_support_1.remapAndPrintError)(err);
    }
    return 0;
}
launcher_1.bedrockServer.withLoading().then(() => {
    const handleViolationSymbol = "?_handleViolation@PacketViolationHandler@@AEAA?AW4PacketViolationResponse@@W4MinecraftPacketIds@@W4StreamReadResult@@AEBVNetworkIdentifier@@PEA_N@Z";
    const packetHandleSymbol = "?handle@Packet@@QEAAXAEBVNetworkIdentifier@@AEAVNetEventCallback@@AEAV?$shared_ptr@VPacket@@@std@@@Z";
    const sendToMultipleSymbol = "?sendToMultiple@NetworkSystem@@QEAAXAEBV?$vector@UNetworkIdentifierWithSubId@@V?$allocator@UNetworkIdentifierWithSubId@@@std@@@std@@AEBVPacket@@@Z";
    const packetizeSymbol = "?_sortAndPacketizeEvents@NetworkSystem@@AEAA_NAEAVNetworkConnection@@V?$time_point@Usteady_clock@chrono@std@@V?$duration@_JU?$ratio@$00$0DLJKMKAA@@std@@@23@@chrono@std@@@Z";
    // hook raw
    asmcode_1.asmcode.onPacketRaw = makefunc_1.makefunc.np(onPacketRaw, packet_1.PacketSharedPtr, null, OnPacketRBP, nativetype_1.int32_t, networkidentifier_1.NetworkConnection);
    prochacker_1.procHacker.patching("hook-packet-raw", packetizeSymbol, 0x282, asmcode_1.asmcode.packetRawHook, // original code depended
    assembler_1.Register.rax, true, [
        0x41,
        0x8b,
        0xd7,
        0x48,
        0x8d,
        0x4d,
        0xd8,
        0xe8,
        null,
        null,
        null,
        null,
        0x90, // nop
    ]);
    // hook before
    asmcode_1.asmcode.onPacketBefore = makefunc_1.makefunc.np(onPacketBefore, nativetype_1.bool_t, { name: "onPacketBefore" }, packet_1.Packet, packet_1.ExtendedStreamReadResult);
    asmcode_1.asmcode.packetBeforeOriginal = prochacker_1.procHacker.hookingRaw("?readNoHeader@Packet@@QEAA_NAEAVReadOnlyBinaryStream@@AEBW4SubClientId@@AEAUExtendedStreamReadResult@@@Z", asmcode_1.asmcode.packetBeforeHook);
    // skip packet when result code is 0x7f
    const packetViolationOriginalCode = [
        0x48,
        0x89,
        0x5c,
        0x24,
        0x10,
        0x55,
        0x56,
        0x57,
        0x41,
        0x54,
        0x41,
        0x55,
        0x41,
        0x56, // push r14
    ];
    asmcode_1.asmcode.PacketViolationHandlerHandleViolationAfter = symbols_1.proc[handleViolationSymbol].add(packetViolationOriginalCode.length);
    prochacker_1.procHacker.patching("hook-packet-before-skip", handleViolationSymbol, 0, asmcode_1.asmcode.packetBeforeCancelHandling, assembler_1.Register.rax, false, packetViolationOriginalCode);
    // hook after
    asmcode_1.asmcode.onPacketAfter = makefunc_1.makefunc.np(onPacketAfter, nativetype_1.void_t, null, packet_1.Packet, networkidentifier_1.NetworkIdentifier);
    asmcode_1.asmcode.handlePacket = symbols_1.proc[packetHandleSymbol];
    prochacker_1.procHacker.patching("hook-packet-after", packetizeSymbol, 0x508, asmcode_1.asmcode.packetAfterHook, // original code depended
    assembler_1.Register.rax, true, [
        0x49,
        0x8b,
        0xd5,
        0x48,
        0x8b,
        0x4d,
        0xd8,
        0xe8,
        null,
        null,
        null,
        null, // call <bedrock_server.public: void __cdecl Packet::handle(class NetworkIdentifier const & __ptr64,class NetEventCallback & __ptr64,class std::shared_ptr<class Packet>
    ]);
    // hook send
    asmcode_1.asmcode.onPacketSend = makefunc_1.makefunc.np(onPacketSend, nativetype_1.int32_t, null, nativetype_1.void_t, networkidentifier_1.NetworkIdentifier, packet_1.Packet);
    asmcode_1.asmcode.sendOriginal = prochacker_1.procHacker.hookingRaw("?send@NetworkSystem@@QEAAXAEBVNetworkIdentifier@@AEBVPacket@@W4SubClientId@@@Z", asmcode_1.asmcode.packetSendHook);
    // hook send all
    const sendToMultiple = symbols_1.proc[sendToMultipleSymbol];
    asmcode_1.asmcode.packetSendAllCancelPoint = sendToMultiple.add(0x148);
    asmcode_1.asmcode.packetSendAllJumpPoint = sendToMultiple.add(0x4c);
    prochacker_1.procHacker.patching("hook-packet-send-all", sendToMultipleSymbol, 0x37, asmcode_1.asmcode.packetSendAllHook, // original code depended
    assembler_1.Register.rax, true, [
        // loop begin point
        0x4d,
        0x85,
        0xf6,
        0x74,
        0x10,
        0x41,
        0x0f,
        0xb6,
        0x86,
        0xa0,
        0x00,
        0x00,
        0x00, // movzx eax,byte ptr ds:[r14+A0]
    ]);
    // hook send raw
    asmcode_1.asmcode.onPacketSendInternal = makefunc_1.makefunc.np(onPacketSendInternal, nativetype_1.int32_t, null, networkidentifier_1.NetworkSystem, networkidentifier_1.NetworkIdentifier, packet_1.Packet, pointer_1.CxxStringWrapper);
    asmcode_1.asmcode.sendInternalOriginal = prochacker_1.procHacker.hookingRaw("?_sendInternal@NetworkSystem@@AEAAXAEBVNetworkIdentifier@@AEBVPacket@@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", asmcode_1.asmcode.packetSendInternalHook);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2V0ZXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWNrZXRldmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0Q0FBeUM7QUFDekMsNENBQXdDO0FBQ3hDLGdFQUErRjtBQUMvRiwwQ0FBcUg7QUFFckgsNENBQWdEO0FBQ2hELDRDQUFzQztBQUN0QyxzQ0FBNkM7QUFDN0Msa0NBQXNDO0FBQ3RDLG9DQUFpQztBQUNqQyxvQ0FBa0M7QUFDbEMsMENBQTRDO0FBQzVDLDBDQUF1QztBQUN2QyxnREFBeUU7QUFDekUsOENBQTBFO0FBQzFFLHdDQUFxQztBQUNyQyx3Q0FBOEM7QUFDOUMsOENBQTJDO0FBQzNDLG9EQUFnRDtBQUNoRCw4REFBMkQ7QUFHM0QsSUFBTSxvQkFBb0IsR0FBMUIsTUFBTSxvQkFBcUIsU0FBUSwyQkFBYTtJQUk1QyxJQUFJLENBQUMsSUFBaUIsRUFBRSxJQUFZO1FBQ2hDLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztDQUNKLENBQUE7QUFMRztJQURDLElBQUEseUJBQVcsRUFBQywwQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUM7a0RBQ25CO0FBRnJCLG9CQUFvQjtJQUR6QixJQUFBLHlCQUFXLEVBQUMsSUFBSSxDQUFDO0dBQ1osb0JBQW9CLENBT3pCO0FBRUQsb0JBQW9CLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyx1QkFBVSxDQUFDLEdBQUcsQ0FDaEQsK0JBQStCLEVBQy9CLDRDQUE0QyxFQUM1QyxtQkFBTSxFQUNOLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixFQUFFLEVBQzlCLGtCQUFXLEVBQ1gsNkJBQWdCLENBQ25CLENBQUM7QUFHRixJQUFNLFdBQVcsR0FBakIsTUFBTSxXQUFZLFNBQVEsMkJBQWE7Q0FNdEMsQ0FBQTtBQUhHO0lBREMsSUFBQSx5QkFBVyxFQUFDLDRCQUFZLENBQUMsSUFBSSxDQUFDLGVBQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFD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