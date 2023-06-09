"use strict";
/**
 * This example is just skip half of movement packets.
 *
 * CAUTION: this example is only works for two players. need to implement it more
 */
Object.defineProperty(exports, "__esModule", { value: true });
const packetids_1 = require("bdsx/bds/packetids");
const common_1 = require("bdsx/common");
const event_1 = require("bdsx/event");
const map = new WeakMap();
event_1.events.packetSendRaw(packetids_1.MinecraftPacketIds.MovePlayer).on((packet, size, ni) => {
    let field = map.get(ni);
    if (field === undefined)
        map.set(ni, (field = { counter: 0 }));
    field.counter++;
    if (field.counter >= 2) {
        field.counter = 0;
        return common_1.CANCEL;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0LWhhbGZtb3ZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV0LWhhbGZtb3ZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOztBQUdILGtEQUF3RDtBQUN4RCx3Q0FBcUM7QUFDckMsc0NBQW9DO0FBS3BDLE1BQU0sR0FBRyxHQUFHLElBQUksT0FBTyxFQUE4QixDQUFDO0FBQ3RELGNBQU0sQ0FBQyxhQUFhLENBQUMsOEJBQWtCLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRTtJQUN4RSxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3hCLElBQUksS0FBSyxLQUFLLFNBQVM7UUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFL0QsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2hCLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUU7UUFDcEIsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDbEIsT0FBTyxlQUFNLENBQUM7S0FDakI7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9