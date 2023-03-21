"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("bdsx/bds/effects");
const event_1 = require("bdsx/event");
const launcher_1 = require("bdsx/launcher");
const regenId = 10;
const strengthId = 5;
let doingRegen = true;
const interval = setInterval(() => {
    for (const player of launcher_1.bedrockServer.serverInstance.getPlayers()) {
        doingRegen = !doingRegen;
        let effect;
        if (doingRegen)
            effect = effects_1.MobEffectInstance.create(strengthId, 20, 1, false, false, false);
        else
            effect = effects_1.MobEffectInstance.create(regenId, 20, 1, false, true, false);
        player.addEffect(effect);
    }
}, 1000);
event_1.events.serverStop.on(() => {
    clearInterval(interval);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0b3ItZWZmZWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFjdG9yLWVmZmVjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBcUQ7QUFDckQsc0NBQW9DO0FBQ3BDLDRDQUE4QztBQUU5QyxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDbkIsTUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBRXJCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQztBQUV0QixNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO0lBQzlCLEtBQUssTUFBTSxNQUFNLElBQUksd0JBQWEsQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLEVBQUU7UUFDNUQsVUFBVSxHQUFHLENBQUMsVUFBVSxDQUFDO1FBQ3pCLElBQUksTUFBTSxDQUFDO1FBQ1gsSUFBSSxVQUFVO1lBQUUsTUFBTSxHQUFHLDJCQUFpQixDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDOztZQUNyRixNQUFNLEdBQUcsMkJBQWlCLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0UsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUM1QjtBQUNMLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNULGNBQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRTtJQUN0QixhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDNUIsQ0FBQyxDQUFDLENBQUMifQ==