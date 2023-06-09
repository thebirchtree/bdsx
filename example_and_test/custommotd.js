"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("bdsx/event");
const launcher_1 = require("bdsx/launcher");
const name = "Valeria Alion";
let rainbowOffset = 0;
const rainbow = ["§c", "§6", "§e", "§a", "§9", "§b", "§d"];
const interval = setInterval(() => {
    let i = rainbowOffset;
    rainbowOffset = (rainbowOffset + 1) & rainbow.length;
    const coloredName = name.replace(/./g, v => rainbow[i++ % rainbow.length] + v);
    launcher_1.bedrockServer.serverInstance.setMotd(coloredName);
}, 5000);
// without this code, bdsx does not end even after BDS closed
event_1.events.serverStop.on(() => {
    clearInterval(interval);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tbW90ZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImN1c3RvbW1vdGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0M7QUFDcEMsNENBQThDO0FBRTlDLE1BQU0sSUFBSSxHQUFHLGVBQWUsQ0FBQztBQUU3QixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7QUFDdEIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMzRCxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO0lBQzlCLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQztJQUN0QixhQUFhLEdBQUcsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUVyRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0Usd0JBQWEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3RELENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUVULDZEQUE2RDtBQUM3RCxjQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUU7SUFDdEIsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzVCLENBQUMsQ0FBQyxDQUFDIn0=