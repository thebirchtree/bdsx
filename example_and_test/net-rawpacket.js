"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentSentPacketId = exports.recentSentPacketId = void 0;
// Parse raw packet
const packetids_1 = require("bdsx/bds/packetids");
const bin_1 = require("bdsx/bin");
const event_1 = require("bdsx/event");
const rawpacket_1 = require("bdsx/rawpacket");
const tester_1 = require("bdsx/tester");
exports.recentSentPacketId = null;
function getRecentSentPacketId() {
    const out = exports.recentSentPacketId;
    exports.recentSentPacketId = null;
    return out;
}
exports.getRecentSentPacketId = getRecentSentPacketId;
// referenced from https://github.com/pmmp/PocketMine-MP/blob/stable/src/pocketmine/network/mcpe/protocol/MovePlayerPacket.php
event_1.events.packetRaw(packetids_1.MinecraftPacketIds.MovePlayer).on((ptr, size, ni) => {
    if (!tester_1.Tester.isPassed())
        return; // logging if test is passed
    console.log(`Packet Id: ${ptr.readVarUint() & 0x3ff}`);
    const runtimeId = ptr.readVarBin();
    const x = ptr.readFloat32();
    const y = ptr.readFloat32();
    const z = ptr.readFloat32();
    const pitch = ptr.readFloat32();
    const yaw = ptr.readFloat32();
    const headYaw = ptr.readFloat32();
    const mode = ptr.readUint8();
    const onGround = ptr.readUint8() !== 0;
    console.log(`move: ${bin_1.bin.toString(runtimeId, 16)} ${x.toFixed(1)} ${y.toFixed(1)} ${z.toFixed(1)} ${pitch.toFixed(1)} ${yaw.toFixed(1)} ${headYaw.toFixed(1)} ${mode} ${onGround}`);
    // part of testing
    exports.recentSentPacketId = packetids_1.MinecraftPacketIds.Text;
    // https://github.com/pmmp/PocketMine-MP/blob/stable/src/pocketmine/network/mcpe/protocol/TextPacket.php
    const packet = new rawpacket_1.RawPacket(packetids_1.MinecraftPacketIds.Text);
    packet.writeUint8(0); // type
    packet.writeBoolean(false); // needsTranslation
    packet.writeVarString(`[rawpacket message] move ${x.toFixed(1)} ${y.toFixed()} ${z.toFixed()}`); // message
    packet.writeVarString(""); // xboxUserId
    packet.writeVarString(""); // platformChatId
    packet.sendTo(ni);
});
// referenced from https://github.com/pmmp/PocketMine-MP/blob/stable/src/pocketmine/network/mcpe/protocol/CraftingEventPacket.php
event_1.events.packetRaw(packetids_1.MinecraftPacketIds.CraftingEvent).on((ptr, size, ni) => {
    console.log(`Packet Id: ${ptr.readVarUint() & 0x3ff}`);
    const windowId = ptr.readUint8();
    const type = ptr.readVarInt();
    const uuid1 = ptr.readUint32();
    const uuid2 = ptr.readUint32();
    const uuid3 = ptr.readUint32();
    const uuid4 = ptr.readUint32();
    console.log(`crafting: ${windowId} ${type} ${uuid1} ${uuid2} ${uuid3} ${uuid4}`);
    const size1 = ptr.readVarUint();
    // need to parse more
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0LXJhd3BhY2tldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5ldC1yYXdwYWNrZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUJBQW1CO0FBQ25CLGtEQUF3RDtBQUN4RCxrQ0FBK0I7QUFDL0Isc0NBQW9DO0FBQ3BDLDhDQUEyQztBQUMzQyx3Q0FBcUM7QUFFMUIsUUFBQSxrQkFBa0IsR0FBOEIsSUFBSSxDQUFDO0FBQ2hFLFNBQWdCLHFCQUFxQjtJQUNqQyxNQUFNLEdBQUcsR0FBRywwQkFBa0IsQ0FBQztJQUMvQiwwQkFBa0IsR0FBRyxJQUFJLENBQUM7SUFDMUIsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBSkQsc0RBSUM7QUFFRCw4SEFBOEg7QUFDOUgsY0FBTSxDQUFDLFNBQVMsQ0FBQyw4QkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFO0lBQ2pFLElBQUksQ0FBQyxlQUFNLENBQUMsUUFBUSxFQUFFO1FBQUUsT0FBTyxDQUFDLDRCQUE0QjtJQUM1RCxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxDQUFDLFdBQVcsRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUM7SUFFdkQsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ25DLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM1QixNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDNUIsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzVCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNoQyxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDOUIsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QixNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQ1AsU0FBUyxTQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FDekksQ0FBQyxDQUNKLElBQUksSUFBSSxJQUFJLFFBQVEsRUFBRSxDQUMxQixDQUFDO0lBRUYsa0JBQWtCO0lBQ2xCLDBCQUFrQixHQUFHLDhCQUFrQixDQUFDLElBQUksQ0FBQztJQUU3Qyx3R0FBd0c7SUFDeEcsTUFBTSxNQUFNLEdBQUcsSUFBSSxxQkFBUyxDQUFDLDhCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RELE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPO0lBQzdCLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxtQkFBbUI7SUFDL0MsTUFBTSxDQUFDLGNBQWMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVU7SUFDM0csTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWE7SUFDeEMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGlCQUFpQjtJQUM1QyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3RCLENBQUMsQ0FBQyxDQUFDO0FBQ0gsaUlBQWlJO0FBQ2pJLGNBQU0sQ0FBQyxTQUFTLENBQUMsOEJBQWtCLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRTtJQUNwRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxDQUFDLFdBQVcsRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUM7SUFFdkQsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2pDLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUU5QixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDL0IsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQy9CLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMvQixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUM7SUFFL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLFFBQVEsSUFBSSxJQUFJLElBQUksS0FBSyxJQUFJLEtBQUssSUFBSSxLQUFLLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNqRixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDaEMscUJBQXFCO0FBQ3pCLENBQUMsQ0FBQyxDQUFDIn0=