"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Network Hooking: disconnected
const command_1 = require("bdsx/bds/command");
const command_2 = require("bdsx/command");
const event_1 = require("bdsx/event");
const launcher_1 = require("bdsx/launcher");
const net_login_1 = require("./net-login");
event_1.events.networkDisconnected.on(networkIdentifier => {
    const id = net_login_1.connectionList.get(networkIdentifier);
    net_login_1.connectionList.delete(networkIdentifier);
    console.log(`${id}> disconnected`);
});
command_2.command.register("disconnect", "disconnect player").overload((p, o, op) => {
    for (const player of p.target.newResults(o)) {
        // disconnect player from server
        launcher_1.bedrockServer.serverInstance.disconnectClient(player.getNetworkIdentifier());
    }
}, {
    target: command_1.PlayerCommandSelector,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0LWRpc2Nvbm5lY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZXQtZGlzY29ubmVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGdDQUFnQztBQUNoQyw4Q0FBeUQ7QUFDekQsMENBQXVDO0FBQ3ZDLHNDQUFvQztBQUNwQyw0Q0FBOEM7QUFDOUMsMkNBQTZDO0FBRTdDLGNBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsRUFBRTtJQUM5QyxNQUFNLEVBQUUsR0FBRywwQkFBYyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ2pELDBCQUFjLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUN2QyxDQUFDLENBQUMsQ0FBQztBQUVILGlCQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLFFBQVEsQ0FDeEQsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFO0lBQ1QsS0FBSyxNQUFNLE1BQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUN6QyxnQ0FBZ0M7UUFDaEMsd0JBQWEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztLQUNoRjtBQUNMLENBQUMsRUFDRDtJQUNJLE1BQU0sRUFBRSwrQkFBcUI7Q0FDaEMsQ0FDSixDQUFDIn0=