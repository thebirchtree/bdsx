"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("bdsx/event");
const tester_1 = require("bdsx/tester");
event_1.events.playerJoin.on(ev => {
    if (tester_1.Tester.errored)
        return; // skip if tester failed
    const inv = ev.player.getInventory();
    const slots = inv.container.getSlots();
    const size = slots.size();
    console.log(`[Inventory] Begin`);
    for (let i = 0; i < size; i++) {
        const item = slots.get(i);
        if (item === null)
            continue;
        console.log(`item ${i}: ${item.getName()}`);
    }
    console.log(`[Inventory] End`);
    slots.destruct();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZW50b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW52ZW50b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW9DO0FBQ3BDLHdDQUFxQztBQUVyQyxjQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUN0QixJQUFJLGVBQU0sQ0FBQyxPQUFPO1FBQUUsT0FBTyxDQUFDLHdCQUF3QjtJQUNwRCxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3JDLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDdkMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUNqQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzNCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxJQUFJLEtBQUssSUFBSTtZQUFFLFNBQVM7UUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQy9DO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQy9CLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNyQixDQUFDLENBQUMsQ0FBQyJ9