"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/command");
const launcher_1 = require("bdsx/launcher");
const peer = launcher_1.bedrockServer.rakPeer;
command_1.command.register("ping", "example for getting ping").overload((params, origin, output) => {
    if (origin.isServerCommandOrigin()) {
        output.error(`[EXAMPLE-PING] You are Server`);
        return;
    }
    const actor = origin.getEntity();
    if (!actor) {
        output.error(`[EXAMPLE-PING] the origin is not an Actor`);
        return;
    }
    const name = actor === null || actor === void 0 ? void 0 : actor.getNameTag();
    const address = actor.getNetworkIdentifier().address;
    const out = `[EXAMPLE-PING] ${name}'s average ping is ${peer.GetAveragePing(address)}
[EXAMPLE-PING] ${name}'s last ping is ${peer.GetLastPing(address)}
[EXAMPLE-PING] ${name}'s lowest ping is ${peer.GetLowestPing(address)}`;
    output.success(out);
}, {});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0LXBpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZXQtcGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUF1QztBQUN2Qyw0Q0FBOEM7QUFFOUMsTUFBTSxJQUFJLEdBQUcsd0JBQWEsQ0FBQyxPQUFPLENBQUM7QUFFbkMsaUJBQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLDBCQUEwQixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUNyRixJQUFJLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxFQUFFO1FBQ2hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztRQUM5QyxPQUFPO0tBQ1Y7SUFDRCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDakMsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQztRQUMxRCxPQUFPO0tBQ1Y7SUFDRCxNQUFNLElBQUksR0FBRyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsVUFBVSxFQUFFLENBQUM7SUFDakMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLG9CQUFvQixFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ3JELE1BQU0sR0FBRyxHQUFHLGtCQUFrQixJQUFJLHNCQUFzQixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQztpQkFDdkUsSUFBSSxtQkFBbUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7aUJBQ2hELElBQUkscUJBQXFCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztJQUNwRSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyJ9