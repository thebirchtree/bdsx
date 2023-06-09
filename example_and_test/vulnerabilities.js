"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const networkidentifier_1 = require("bdsx/bds/networkidentifier");
const packetids_1 = require("bdsx/bds/packetids");
const common_1 = require("bdsx/common");
const core_1 = require("bdsx/core");
const event_1 = require("bdsx/event");
const nativetype_1 = require("bdsx/nativetype");
const pointer_1 = require("bdsx/pointer");
const prochacker_1 = require("bdsx/prochacker");
// https://github.com/nt1dr/CVE-2021-45383 (Removed)
event_1.events.packetRaw(packetids_1.MinecraftPacketIds.ClientCacheBlobStatus).on((ptr, size, netId) => {
    var _a;
    if (ptr.readVarUint() >= 0xfff || ptr.readVarUint() >= 0xfff) {
        console.log("DOS detected from " + netId);
        (_a = netId.getActor()) === null || _a === void 0 ? void 0 : _a.sendMessage("DOS (ClientCacheBlobStatus) detected");
        return common_1.CANCEL;
    }
});
event_1.events.packetBefore(packetids_1.MinecraftPacketIds.Disconnect).on((ptr, ni) => {
    if (ni.getActor() == null)
        return common_1.CANCEL;
});
// https://github.com/LuckyDogDog/CVE-2022-23884
const Warns = {};
const receivePacket = prochacker_1.procHacker.hooking("?receivePacket@NetworkConnection@@QEAA?AW4DataStatus@NetworkPeer@@AEAV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEAVNetworkHandler@@AEBV?$shared_ptr@V?$time_point@Usteady_clock@chrono@std@@V?$duration@_JU?$ratio@$00$0DLJKMKAA@@std@@@23@@chrono@std@@@5@@Z", nativetype_1.int32_t, // DataStatus
null, networkidentifier_1.NetworkConnection, pointer_1.CxxStringWrapper, networkidentifier_1.NetworkHandler, core_1.VoidPointer)((conn, data, networkHandler, time_point) => {
    const address = conn.networkIdentifier.getAddress();
    const id = data.valueptr.getUint8();
    if (Warns[address] > 1 || id === packetids_1.MinecraftPacketIds.PurchaseReceipt) {
        conn.disconnect();
        return 1;
    }
    if (id === 0) {
        Warns[address] = Warns[address] ? Warns[address] + 1 : 1;
    }
    return receivePacket(conn, data, networkHandler, time_point);
});
event_1.events.networkDisconnected.on(ni => {
    Warns[ni.getAddress()] = 0;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnVsbmVyYWJpbGl0aWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidnVsbmVyYWJpbGl0aWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0VBQStFO0FBQy9FLGtEQUF3RDtBQUN4RCx3Q0FBcUM7QUFDckMsb0NBQXdDO0FBQ3hDLHNDQUFvQztBQUNwQyxnREFBMEM7QUFDMUMsMENBQWdEO0FBQ2hELGdEQUE2QztBQUU3QyxvREFBb0Q7QUFFcEQsY0FBTSxDQUFDLFNBQVMsQ0FBQyw4QkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7O0lBQy9FLElBQUksR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLEtBQUssSUFBSSxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksS0FBSyxFQUFFO1FBQzFELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDMUMsTUFBQSxLQUFLLENBQUMsUUFBUSxFQUFFLDBDQUFFLFdBQVcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1FBQ3RFLE9BQU8sZUFBTSxDQUFDO0tBQ2pCO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCxjQUFNLENBQUMsWUFBWSxDQUFDLDhCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRTtJQUM5RCxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxJQUFJO1FBQUUsT0FBTyxlQUFNLENBQUM7QUFDN0MsQ0FBQyxDQUFDLENBQUM7QUFFSCxnREFBZ0Q7QUFFaEQsTUFBTSxLQUFLLEdBQTJCLEVBQUUsQ0FBQztBQUN6QyxNQUFNLGFBQWEsR0FBRyx1QkFBVSxDQUFDLE9BQU8sQ0FDcEMsbVJBQW1SLEVBQ25SLG9CQUFPLEVBQUUsYUFBYTtBQUN0QixJQUFJLEVBQ0oscUNBQWlCLEVBQ2pCLDBCQUFnQixFQUNoQixrQ0FBYyxFQUNkLGtCQUFXLENBQ2QsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxFQUFFO0lBQ3pDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwRCxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssOEJBQWtCLENBQUMsZUFBZSxFQUFFO1FBQ2pFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixPQUFPLENBQUMsQ0FBQztLQUNaO0lBQ0QsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFO1FBQ1YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzVEO0lBQ0QsT0FBTyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDakUsQ0FBQyxDQUFDLENBQUM7QUFDSCxjQUFNLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQy9CLEtBQUssQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDLENBQUMifQ==