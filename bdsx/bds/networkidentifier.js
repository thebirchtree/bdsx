"use strict";
var NetworkIdentifier_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.networkSystem = exports.NetworkIdentifier = exports.ServerNetworkHandler = exports.NetworkConnection = exports.NetworkHandler = exports.NetworkSystem = void 0;
const tslib_1 = require("tslib");
const assembler_1 = require("../assembler");
const common_1 = require("../common");
const core_1 = require("../core");
const dll_1 = require("../dll");
const event_1 = require("../event");
const hashset_1 = require("../hashset");
const makefunc_1 = require("../makefunc");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const pointer_1 = require("../pointer");
const prochacker_1 = require("../prochacker");
const source_map_support_1 = require("../source-map-support");
const raknet_1 = require("./raknet");
// TODO: fill
var SubClientId;
(function (SubClientId) {
})(SubClientId || (SubClientId = {}));
class NetworkSystem extends nativeclass_1.AbstractClass {
    send(ni, packet, senderSubClientId) {
        (0, common_1.abstract)();
    }
    sendInternal(ni, packet, data) {
        (0, common_1.abstract)();
    }
    getConnectionFromId(ni) {
        (0, common_1.abstract)();
    }
}
exports.NetworkSystem = NetworkSystem;
exports.NetworkHandler = NetworkSystem;
class NetworkConnection extends nativeclass_1.AbstractClass {
    disconnect() {
        (0, common_1.abstract)();
    }
}
exports.NetworkConnection = NetworkConnection;
(function (NetworkSystem) {
    /** @deprecated renamed to NetworkConnection */
    NetworkSystem.Connection = NetworkConnection;
})(NetworkSystem = exports.NetworkSystem || (exports.NetworkSystem = {}));
let ServerNetworkHandler$Client = class ServerNetworkHandler$Client extends nativeclass_1.AbstractClass {
};
ServerNetworkHandler$Client = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ServerNetworkHandler$Client);
let ServerNetworkHandler = class ServerNetworkHandler extends nativeclass_1.AbstractClass {
    disconnectClient(client, message = "disconnectionScreen.disconnected", skipMessage = false) {
        (0, common_1.abstract)();
    }
    /**
     * @alias allowIncomingConnections
     */
    setMotd(motd) {
        this.allowIncomingConnections(motd, true);
    }
    /**
     * @deprecated use setMaxNumPlayers
     */
    setMaxPlayers(count) {
        this.setMaxNumPlayers(count);
    }
    allowIncomingConnections(motd, b) {
        (0, common_1.abstract)();
    }
    updateServerAnnouncement() {
        (0, common_1.abstract)();
    }
    setMaxNumPlayers(n) {
        (0, common_1.abstract)();
    }
    _getServerPlayer(client, clientSubId) {
        (0, common_1.abstract)();
    }
    fetchConnectionRequest(target) {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], ServerNetworkHandler.prototype, "vftable", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString, 0x288) // accessed in ServerNetworkHandler::allowIncomingConnections
], ServerNetworkHandler.prototype, "motd", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t, 0x300) // accessed in ServerNetworkHandler::setMaxNumPlayers
], ServerNetworkHandler.prototype, "maxPlayers", void 0);
ServerNetworkHandler = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ServerNetworkHandler);
exports.ServerNetworkHandler = ServerNetworkHandler;
const identifiers = new hashset_1.HashSet();
let NetworkIdentifier = NetworkIdentifier_1 = class NetworkIdentifier extends nativeclass_1.NativeStruct {
    assignTo(target) {
        dll_1.dll.vcruntime140.memcpy(target, this, networkIdentifierSize);
    }
    equals(other) {
        (0, common_1.abstract)();
    }
    hash() {
        (0, common_1.abstract)();
    }
    getActor() {
        (0, common_1.abstract)();
    }
    getAddress() {
        (0, common_1.abstract)();
    }
    toString() {
        return this.getAddress();
    }
    static fromPointer(ptr) {
        return identifiers.get(ptr.as(NetworkIdentifier_1));
    }
    static all() {
        return identifiers.values();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bin64_t)
], NetworkIdentifier.prototype, "unknown", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(raknet_1.RakNet.AddressOrGUID)
], NetworkIdentifier.prototype, "address", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t, { ghost: true, offset: 0x98 })
], NetworkIdentifier.prototype, "type", void 0);
NetworkIdentifier = NetworkIdentifier_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], NetworkIdentifier);
exports.NetworkIdentifier = NetworkIdentifier;
const networkIdentifierSize = NetworkIdentifier[nativeclass_1.NativeClass.contentSize];
NetworkIdentifier.setResolver(ptr => {
    if (ptr === null)
        return null;
    let ni = identifiers.get(ptr.as(NetworkIdentifier));
    if (ni != null)
        return ni;
    ni = new NetworkIdentifier(true);
    ni.copyFrom(ptr, NetworkIdentifier[nativetype_1.NativeType.size]);
    identifiers.add(ni);
    return ni;
});
prochacker_1.procHacker.hookingRawWithCallOriginal("?onConnectionClosed@NetworkSystem@@EEAAXAEBVNetworkIdentifier@@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@_N@Z", makefunc_1.makefunc.np((handler, ni, msg) => {
    try {
        event_1.events.networkDisconnected.fire(ni);
    }
    catch (err) {
        (0, source_map_support_1.remapAndPrintError)(err);
    }
    // ni is used after onConnectionClosed. on some message processings.
    // timeout for avoiding the re-allocation
    setTimeout(() => {
        identifiers.delete(ni);
    }, 3000);
}, nativetype_1.void_t, { name: "hook of NetworkIdentifier dtor" }, NetworkSystem, NetworkIdentifier, pointer_1.CxxStringWrapper), [assembler_1.Register.rcx, assembler_1.Register.rdx, assembler_1.Register.r8, assembler_1.Register.r9], []);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29ya2lkZW50aWZpZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZXR3b3JraWRlbnRpZmllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDRDQUF3QztBQUN4QyxzQ0FBcUM7QUFDckMsa0NBQXFEO0FBQ3JELGdDQUE2QjtBQUM3QixvQ0FBa0M7QUFDbEMsd0NBQStDO0FBQy9DLDBDQUF1QztBQUN2QyxnREFBb0c7QUFDcEcsOENBQWdGO0FBQ2hGLHdDQUE4QztBQUM5Qyw4Q0FBMkM7QUFDM0MsOERBQTJEO0FBSTNELHFDQUFrQztBQUdsQyxhQUFhO0FBQ2IsSUFBSyxXQUFjO0FBQW5CLFdBQUssV0FBVztBQUFFLENBQUMsRUFBZCxXQUFXLEtBQVgsV0FBVyxRQUFHO0FBRW5CLE1BQWEsYUFBYyxTQUFRLDJCQUFhO0lBUTVDLElBQUksQ0FBQyxFQUFxQixFQUFFLE1BQWMsRUFBRSxpQkFBeUI7UUFDakUsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsWUFBWSxDQUFDLEVBQXFCLEVBQUUsTUFBYyxFQUFFLElBQXNCO1FBQ3RFLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELG1CQUFtQixDQUFDLEVBQXFCO1FBQ3JDLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztDQUNKO0FBbkJELHNDQW1CQztBQUNhLFFBQUEsY0FBYyxHQUFHLGFBQWEsQ0FBQztBQUU3QyxNQUFhLGlCQUFrQixTQUFRLDJCQUFhO0lBR2hELFVBQVU7UUFDTixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7Q0FDSjtBQU5ELDhDQU1DO0FBRUQsV0FBaUIsYUFBYTtJQUMxQiwrQ0FBK0M7SUFDbEMsd0JBQVUsR0FBRyxpQkFBaUIsQ0FBQztBQUdoRCxDQUFDLEVBTGdCLGFBQWEsR0FBYixxQkFBYSxLQUFiLHFCQUFhLFFBSzdCO0FBR0QsSUFBTSwyQkFBMkIsR0FBakMsTUFBTSwyQkFBNEIsU0FB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