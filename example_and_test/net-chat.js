"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Chat Listening
const packetids_1 = require("bdsx/bds/packetids");
const common_1 = require("bdsx/common");
const event_1 = require("bdsx/event");
event_1.events.packetBefore(packetids_1.MinecraftPacketIds.Text).on(ev => {
    if (ev.message === "nochat") {
        return common_1.CANCEL; // canceling
    }
    ev.message = ev.message.toUpperCase() + " YEY!";
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0LWNoYXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZXQtY2hhdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlCQUFpQjtBQUNqQixrREFBd0Q7QUFDeEQsd0NBQXFDO0FBQ3JDLHNDQUFvQztBQUVwQyxjQUFNLENBQUMsWUFBWSxDQUFDLDhCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtJQUNqRCxJQUFJLEVBQUUsQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO1FBQ3pCLE9BQU8sZUFBTSxDQUFDLENBQUMsWUFBWTtLQUM5QjtJQUNELEVBQUUsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsR0FBRyxPQUFPLENBQUM7QUFDcEQsQ0FBQyxDQUFDLENBQUMifQ==