"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("bdsx/event");
event_1.events.entityKnockback.on(event => {
    var _a, _b;
    console.log(`[event-knockback] target: ${event.target.getIdentifier()}, source: ${(_b = (_a = event.source) === null || _a === void 0 ? void 0 : _a.getIdentifier()) !== null && _b !== void 0 ? _b : "none"}`);
    // Increasing height of knockback
    event.height *= 2;
    event.heightCap *= 2;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQta25vY2tiYWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXZlbnQta25vY2tiYWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW9DO0FBRXBDLGNBQU0sQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFOztJQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixLQUFLLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxhQUFhLE1BQUEsTUFBQSxLQUFLLENBQUMsTUFBTSwwQ0FBRSxhQUFhLEVBQUUsbUNBQUksTUFBTSxFQUFFLENBQUMsQ0FBQztJQUM3SCxpQ0FBaUM7SUFDakMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7SUFDbEIsS0FBSyxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFDLENBQUMifQ==