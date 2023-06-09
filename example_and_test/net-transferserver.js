"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferServer = void 0;
const packets_1 = require("bdsx/bds/packets");
const command_1 = require("bdsx/command");
const nativetype_1 = require("bdsx/nativetype");
command_1.command.register("transferserver", "Transfer servers").overload((params, origin, output) => {
    const actor = origin.getEntity();
    if (actor === null || actor === void 0 ? void 0 : actor.isPlayer())
        actor.transferServer(params.address, params.port);
}, {
    address: nativetype_1.CxxString,
    port: nativetype_1.int32_t,
});
function transferServer(networkIdentifier, address, port) {
    const transferPacket = packets_1.TransferPacket.allocate();
    transferPacket.address = address;
    transferPacket.port = port;
    transferPacket.sendTo(networkIdentifier);
    transferPacket.dispose();
}
exports.transferServer = transferServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0LXRyYW5zZmVyc2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV0LXRyYW5zZmVyc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLDhDQUFrRDtBQUNsRCwwQ0FBdUM7QUFDdkMsZ0RBQXFEO0FBRXJELGlCQUFPLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLGtCQUFrQixDQUFDLENBQUMsUUFBUSxDQUMzRCxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDdkIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2pDLElBQUksS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLFFBQVEsRUFBRTtRQUFFLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0UsQ0FBQyxFQUNEO0lBQ0ksT0FBTyxFQUFFLHNCQUFTO0lBQ2xCLElBQUksRUFBRSxvQkFBTztDQUNoQixDQUNKLENBQUM7QUFFRixTQUFnQixjQUFjLENBQUMsaUJBQW9DLEVBQUUsT0FBZSxFQUFFLElBQVk7SUFDOUYsTUFBTSxjQUFjLEdBQUcsd0JBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqRCxjQUFjLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUNqQyxjQUFjLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUMzQixjQUFjLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDekMsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzdCLENBQUM7QUFORCx3Q0FNQyJ9