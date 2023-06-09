"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("bdsx/common");
const event_1 = require("bdsx/event");
let lastHit = false;
event_1.events.playerDropItem.on(({ player, itemStack, inContainer, hotbarSlot }) => {
    var _a;
    console.log(`[event-playerdropitem] player: ${player.getNameTag()}, itemStack: ${(_a = itemStack
        .getItem()) === null || _a === void 0 ? void 0 : _a.getCommandName()}, inContainer: ${inContainer}, hotbarSlot: ${hotbarSlot}`);
    if ((lastHit = !lastHit))
        return common_1.CANCEL;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtcGxheWVyZHJvcGl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJldmVudC1wbGF5ZXJkcm9waXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUFxQztBQUNyQyxzQ0FBb0M7QUFFcEMsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO0FBRXBCLGNBQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFOztJQUN4RSxPQUFPLENBQUMsR0FBRyxDQUNQLGtDQUFrQyxNQUFNLENBQUMsVUFBVSxFQUFFLGdCQUFnQixNQUFBLFNBQVM7U0FDekUsT0FBTyxFQUFFLDBDQUNSLGNBQWMsRUFBRSxrQkFBa0IsV0FBVyxpQkFBaUIsVUFBVSxFQUFFLENBQ25GLENBQUM7SUFDRixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQUUsT0FBTyxlQUFNLENBQUM7QUFDNUMsQ0FBQyxDQUFDLENBQUMifQ==