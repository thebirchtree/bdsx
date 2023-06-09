"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_1 = require("bdsx/bds/packet");
const packetids_1 = require("bdsx/bds/packetids");
const event_1 = require("bdsx/event");
const nativetype_1 = require("bdsx/nativetype");
const tester_1 = require("bdsx/tester");
const util_1 = require("bdsx/util");
// Network Hooking: Print all packets
const tooLoudFilter = new Set([
    packetids_1.MinecraftPacketIds.UpdateBlock,
    packetids_1.MinecraftPacketIds.ClientCacheBlobStatus,
    packetids_1.MinecraftPacketIds.LevelChunk,
    packetids_1.MinecraftPacketIds.ClientCacheMissResponse,
    packetids_1.MinecraftPacketIds.MoveActorDelta,
    packetids_1.MinecraftPacketIds.SetActorMotion,
    packetids_1.MinecraftPacketIds.SetActorData,
    packetids_1.MinecraftPacketIds.NetworkChunkPublisherUpdate,
    packetids_1.MinecraftPacketIds.ActorEvent,
    packetids_1.MinecraftPacketIds.UpdateSoftEnum,
    packetids_1.MinecraftPacketIds.PlayerAuthInput,
    packetids_1.MinecraftPacketIds.UpdateAttributes,
    0xae,
    0xaf,
]);
for (let i = 0; i <= 0xff; i++) {
    if (tooLoudFilter.has(i))
        continue;
    // events.packetRaw uses serialized packets
    event_1.events.packetRaw(i).on((ptr, size, networkIdentifier, packetId) => {
        if (!tester_1.Tester.isPassed())
            return; // logging if test is passed
        const packetName = packetids_1.MinecraftPacketIds[packetId] || "0x" + packetId.toString(16);
        console.log(`RECV ${packetName}: ${(0, util_1.hex)(ptr.readBuffer(Math.min(16, size)))}`);
    });
    // events.packetSend uses C++ packets
    event_1.events.packetSend(i).on((ptr, networkIdentifier, packetId) => {
        if (!tester_1.Tester.isPassed())
            return; // logging if test is passed
        const packetName = packetids_1.MinecraftPacketIds[packetId] || "0x" + packetId.toString(16);
        const COMMON_AREA_SIZE = packet_1.Packet[nativetype_1.NativeType.size]; // skip common area of the C++ packet
        console.log(`SEND ${packetName}: ${(0, util_1.hex)(ptr.getBuffer(16, COMMON_AREA_SIZE))}`);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0LXByaW50YWxsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV0LXByaW50YWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQXlDO0FBQ3pDLGtEQUF3RDtBQUN4RCxzQ0FBb0M7QUFDcEMsZ0RBQTZDO0FBQzdDLHdDQUFxQztBQUNyQyxvQ0FBZ0M7QUFFaEMscUNBQXFDO0FBQ3JDLE1BQU0sYUFBYSxHQUFHLElBQUksR0FBRyxDQUFDO0lBQzFCLDhCQUFrQixDQUFDLFdBQVc7SUFDOUIsOEJBQWtCLENBQUMscUJBQXFCO0lBQ3hDLDhCQUFrQixDQUFDLFVBQVU7SUFDN0IsOEJBQWtCLENBQUMsdUJBQXVCO0lBQzFDLDhCQUFrQixDQUFDLGNBQWM7SUFDakMsOEJBQWtCLENBQUMsY0FBYztJQUNqQyw4QkFBa0IsQ0FBQyxZQUFZO0lBQy9CLDhCQUFrQixDQUFDLDJCQUEyQjtJQUM5Qyw4QkFBa0IsQ0FBQyxVQUFVO0lBQzdCLDhCQUFrQixDQUFDLGNBQWM7SUFDakMsOEJBQWtCLENBQUMsZUFBZTtJQUNsQyw4QkFBa0IsQ0FBQyxnQkFBZ0I7SUFDbkMsSUFBSTtJQUNKLElBQUk7Q0FDUCxDQUFDLENBQUM7QUFDSCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzVCLElBQUksYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFBRSxTQUFTO0lBRW5DLDJDQUEyQztJQUMzQyxjQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLEVBQUU7UUFDOUQsSUFBSSxDQUFDLGVBQU0sQ0FBQyxRQUFRLEVBQUU7WUFBRSxPQUFPLENBQUMsNEJBQTRCO1FBQzVELE1BQU0sVUFBVSxHQUFHLDhCQUFrQixDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hGLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxVQUFVLEtBQUssSUFBQSxVQUFHLEVBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2xGLENBQUMsQ0FBQyxDQUFDO0lBRUgscUNBQXFDO0lBQ3JDLGNBQU0sQ0FBQyxVQUFVLENBQXFCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsRUFBRTtRQUM3RSxJQUFJLENBQUMsZUFBTSxDQUFDLFFBQVEsRUFBRTtZQUFFLE9BQU8sQ0FBQyw0QkFBNEI7UUFDNUQsTUFBTSxVQUFVLEdBQUcsOEJBQWtCLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEYsTUFBTSxnQkFBZ0IsR0FBRyxlQUFNLENBQUMsdUJBQVUsQ0FBQyxJQUFJLENBQUUsQ0FBQyxDQUFDLHFDQUFxQztRQUN4RixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsVUFBVSxLQUFLLElBQUEsVUFBRyxFQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLGdCQUFnQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkYsQ0FBQyxDQUFDLENBQUM7Q0FDTiJ9