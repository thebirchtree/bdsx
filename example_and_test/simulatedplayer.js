"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/bds/command");
const player_1 = require("bdsx/bds/player");
const command_2 = require("bdsx/command");
const nativetype_1 = require("bdsx/nativetype");
let counter = 0;
command_2.command.register("spawnsimulatedplayer", "spawnsimulatedplayer", command_1.CommandPermissionLevel.Operator).overload((params, origin, output) => {
    const owner = origin.getEntity();
    if (owner && owner.isPlayer()) {
        const name = params.name || "Simulated Player " + ++counter;
        // You can use any BlockPos and supported DimensionId.
        const player = player_1.SimulatedPlayer.create(name, owner.getPosition(), owner.getDimensionId()); // Create SimulatedPlayer
        // player.simulateDisconnect(); // Disconnect SimulatedPlayer
        output.success(`Spawned SimulatedPlayer ${name}`);
    }
}, { name: [nativetype_1.CxxString, true] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltdWxhdGVkcGxheWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2ltdWxhdGVkcGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTBEO0FBQzFELDRDQUFrRDtBQUNsRCwwQ0FBdUM7QUFDdkMsZ0RBQTRDO0FBRTVDLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztBQUVoQixpQkFBTyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxzQkFBc0IsRUFBRSxnQ0FBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQ3RHLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUN2QixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDakMsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQzNCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksbUJBQW1CLEdBQUcsRUFBRSxPQUFPLENBQUM7UUFDNUQsc0RBQXNEO1FBQ3RELE1BQU0sTUFBTSxHQUFHLHdCQUFlLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsV0FBVyxFQUFFLEVBQUUsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyx5QkFBeUI7UUFFbkgsNkRBQTZEO1FBQzdELE1BQU0sQ0FBQyxPQUFPLENBQUMsMkJBQTJCLElBQUksRUFBRSxDQUFDLENBQUM7S0FDckQ7QUFDTCxDQUFDLEVBQ0QsRUFBRSxJQUFJLEVBQUUsQ0FBQyxzQkFBUyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQzlCLENBQUMifQ==