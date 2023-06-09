"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packets_1 = require("bdsx/bds/packets");
const command_1 = require("bdsx/command");
command_1.command.register("example_score", "score packet example").overload((params, origin, output) => {
    const actor = origin.getEntity();
    if (actor === null || actor === void 0 ? void 0 : actor.isPlayer()) {
        // SetDisplayObjectivePacket
        const displaypacket = packets_1.SetDisplayObjectivePacket.allocate();
        displaypacket.displaySlot = "sidebar";
        displaypacket.objectiveName = "objective";
        displaypacket.displayName = "name";
        displaypacket.criteriaName = "dummy";
        displaypacket.sendTo(actor.getNetworkIdentifier());
        displaypacket.dispose();
        // SetScorePacket
        const entry = packets_1.ScorePacketInfo.construct();
        entry.scoreboardId.idAsNumber = 1;
        entry.objectiveName = "objective";
        entry.customName = "custom";
        entry.type = packets_1.ScorePacketInfo.Type.PLAYER;
        entry.playerEntityUniqueId = actor.getUniqueIdBin();
        entry.score = 1000;
        const packet = packets_1.SetScorePacket.allocate();
        packet.type = packets_1.SetScorePacket.Type.CHANGE;
        packet.entries.push(entry);
        packet.sendTo(actor.getNetworkIdentifier());
        packet.dispose();
        entry.destruct();
    }
}, {});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0LXNjb3JlcGFja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV0LXNjb3JlcGFja2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQThGO0FBQzlGLDBDQUF1QztBQUV2QyxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsc0JBQXNCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQzFGLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNqQyxJQUFJLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxRQUFRLEVBQUUsRUFBRTtRQUNuQiw0QkFBNEI7UUFDNUIsTUFBTSxhQUFhLEdBQUcsbUNBQXlCLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0QsYUFBYSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7UUFDdEMsYUFBYSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUM7UUFDMUMsYUFBYSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7UUFDbkMsYUFBYSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7UUFDckMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO1FBQ25ELGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUV4QixpQkFBaUI7UUFDakIsTUFBTSxLQUFLLEdBQUcseUJBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMxQyxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDbEMsS0FBSyxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUM7UUFDbEMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7UUFDNUIsS0FBSyxDQUFDLElBQUksR0FBRyx5QkFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDekMsS0FBSyxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNwRCxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUVuQixNQUFNLE1BQU0sR0FBRyx3QkFBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsd0JBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFakIsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ3BCO0FBQ0wsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDIn0=