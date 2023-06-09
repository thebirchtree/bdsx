"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("bdsx/event");
let halfMiss = false;
event_1.events.blockDestroy.on(ev => {
    const blockPos = ev.blockPos;
    ev.player.sendMessage(`${halfMiss ? "missed" : "destroyed"}: ${blockPos.x} ${blockPos.y} ${blockPos.z}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtYmxvY2tkZXN0cm95LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXZlbnQtYmxvY2tkZXN0cm95LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW9DO0FBRXBDLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztBQUNyQixjQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUEsRUFBRTtJQUN2QixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDO0lBQzdCLEVBQUUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFdBQVcsS0FBSyxRQUFRLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDN0csQ0FBQyxDQUFDLENBQUMifQ==