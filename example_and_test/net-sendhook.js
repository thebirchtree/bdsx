"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packetids_1 = require("bdsx/bds/packetids");
const event_1 = require("bdsx/event");
// Network Hooking: hook the sending StartGamePacket and hiding the seed
event_1.events.packetSend(packetids_1.MinecraftPacketIds.StartGame).on(packet => {
    packet.settings.seed = -123;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0LXNlbmRob29rLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV0LXNlbmRob29rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0RBQXdEO0FBQ3hELHNDQUFvQztBQUVwQyx3RUFBd0U7QUFDeEUsY0FBTSxDQUFDLFVBQVUsQ0FBQyw4QkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUU7SUFDeEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7QUFDaEMsQ0FBQyxDQUFDLENBQUMifQ==