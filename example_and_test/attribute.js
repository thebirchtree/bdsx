"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attribute_1 = require("bdsx/bds/attribute");
const event_1 = require("bdsx/event");
const launcher_1 = require("bdsx/launcher");
// Change attributes
let healthCounter = 5;
const interval = setInterval(() => {
    for (const player of launcher_1.bedrockServer.serverInstance.getPlayers()) {
        player.setAttribute(attribute_1.AttributeId.Health, healthCounter);
    }
    healthCounter++;
    if (healthCounter > 20)
        healthCounter = 5;
}, 100);
// without this code, bdsx does not end even after BDS closed
event_1.events.serverStop.on(() => {
    clearInterval(interval);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXR0cmlidXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0RBQWlEO0FBQ2pELHNDQUFvQztBQUNwQyw0Q0FBOEM7QUFFOUMsb0JBQW9CO0FBQ3BCLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztBQUN0QixNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO0lBQzlCLEtBQUssTUFBTSxNQUFNLElBQUksd0JBQWEsQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLEVBQUU7UUFDNUQsTUFBTSxDQUFDLFlBQVksQ0FBQyx1QkFBVyxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztLQUMxRDtJQUVELGFBQWEsRUFBRSxDQUFDO0lBQ2hCLElBQUksYUFBYSxHQUFHLEVBQUU7UUFBRSxhQUFhLEdBQUcsQ0FBQyxDQUFDO0FBQzlDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUVSLDZEQUE2RDtBQUM3RCxjQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUU7SUFDdEIsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzVCLENBQUMsQ0FBQyxDQUFDIn0=