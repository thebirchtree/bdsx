"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("bdsx/event");
event_1.events.playerJump.on(ev => {
    ev.player.sendMessage(ev.player.getName() + ' jumped');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtanVtcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV2ZW50LWp1bXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzQ0FBb0M7QUFFcEMsY0FBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFBLEVBQUU7SUFDcEIsRUFBRSxDQUFDLE1BQXVCLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUMsU0FBUyxDQUFDLENBQUM7QUFDM0UsQ0FBQyxDQUFDLENBQUMifQ==