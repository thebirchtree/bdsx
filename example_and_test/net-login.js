"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionList = void 0;
const packetids_1 = require("bdsx/bds/packetids");
const common_1 = require("bdsx/common");
const event_1 = require("bdsx/event");
exports.connectionList = new Map();
event_1.events.packetAfter(packetids_1.MinecraftPacketIds.Login).on((ptr, networkIdentifier, packetId) => {
    const ip = networkIdentifier.getAddress();
    const connreq = ptr.connreq;
    if (connreq === null)
        return; // wrong client
    const cert = connreq.getCertificate();
    if (cert === null)
        return; // wrong client ?
    const xuid = cert.getXuid();
    const username = cert.getId();
    // sendLog
    console.log(`Connection: ${username}> IP=${ip}, XUID=${xuid}, PLATFORM=${common_1.BuildPlatform[connreq.getDeviceOS()] || "UNKNOWN"}`);
    if (username)
        exports.connectionList.set(networkIdentifier, username);
});
event_1.events.playerJoin.on(ev => {
    ev.player.sendMessage("[message packet from bdsx]");
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0LWxvZ2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV0LWxvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLGtEQUF3RDtBQUN4RCx3Q0FBNEM7QUFDNUMsc0NBQW9DO0FBRXZCLFFBQUEsY0FBYyxHQUFHLElBQUksR0FBRyxFQUE2QixDQUFDO0FBRW5FLGNBQU0sQ0FBQyxXQUFXLENBQUMsOEJBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxFQUFFO0lBQ2pGLE1BQU0sRUFBRSxHQUFHLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzFDLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7SUFDNUIsSUFBSSxPQUFPLEtBQUssSUFBSTtRQUFFLE9BQU8sQ0FBQyxlQUFlO0lBQzdDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN0QyxJQUFJLElBQUksS0FBSyxJQUFJO1FBQUUsT0FBTyxDQUFDLGlCQUFpQjtJQUM1QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDNUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBRTlCLFVBQVU7SUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsUUFBUSxRQUFRLEVBQUUsVUFBVSxJQUFJLGNBQWMsc0JBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQzlILElBQUksUUFBUTtRQUFFLHNCQUFjLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2xFLENBQUMsQ0FBQyxDQUFDO0FBRUgsY0FBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDdEIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsNEJBQTRCLENBQUMsQ0FBQztBQUN4RCxDQUFDLENBQUMsQ0FBQyJ9