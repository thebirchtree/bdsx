"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Chat Listening
const packetids_1 = require("bdsx/bds/packetids");
const event_1 = require("bdsx/event");
event_1.events.packetBefore(packetids_1.MinecraftPacketIds.Text).on(ev => {
    console.log(`[Chat] <${ev.name}> ${ev.message}`); //logging to console
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0LWNoYXQtdG8tY29uc29sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5ldC1jaGF0LXRvLWNvbnNvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQkFBaUI7QUFDakIsa0RBQXdEO0FBQ3hELHNDQUFvQztBQUVwQyxjQUFNLENBQUMsWUFBWSxDQUFDLDhCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUNqRCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLG9CQUFvQjtBQUMxRSxDQUFDLENBQUMsQ0FBQyJ9