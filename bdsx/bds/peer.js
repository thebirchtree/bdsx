"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchedNetworkPeer = exports.CompressedNetworkPeer = exports.EncryptedNetworkPeer = exports.RaknetNetworkPeer = void 0;
const tslib_1 = require("tslib");
const common_1 = require("../common");
const core_1 = require("../core");
const nativeclass_1 = require("../nativeclass");
const sharedpointer_1 = require("../sharedpointer");
const raknet_1 = require("./raknet");
const stream_1 = require("./stream");
let RaknetNetworkPeer = class RaknetNetworkPeer extends nativeclass_1.AbstractClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], RaknetNetworkPeer.prototype, "vftable", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], RaknetNetworkPeer.prototype, "u1", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], RaknetNetworkPeer.prototype, "u2", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(raknet_1.RakNet.RakPeer.ref())
], RaknetNetworkPeer.prototype, "peer", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(raknet_1.RakNet.AddressOrGUID)
], RaknetNetworkPeer.prototype, "addr", void 0);
RaknetNetworkPeer = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], RaknetNetworkPeer);
exports.RaknetNetworkPeer = RaknetNetworkPeer;
let EncryptedNetworkPeer = class EncryptedNetworkPeer extends nativeclass_1.AbstractClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(sharedpointer_1.CxxSharedPtr.make(RaknetNetworkPeer))
], EncryptedNetworkPeer.prototype, "peer", void 0);
EncryptedNetworkPeer = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], EncryptedNetworkPeer);
exports.EncryptedNetworkPeer = EncryptedNetworkPeer;
let CompressedNetworkPeer = class CompressedNetworkPeer extends nativeclass_1.AbstractClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(EncryptedNetworkPeer.ref(), 0x48)
], CompressedNetworkPeer.prototype, "peer", void 0);
CompressedNetworkPeer = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], CompressedNetworkPeer);
exports.CompressedNetworkPeer = CompressedNetworkPeer;
let BatchedNetworkPeer = class BatchedNetworkPeer extends nativeclass_1.AbstractClass {
    sendPacket(data, reliability, compressibility, oldparam, oldparam2) {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], BatchedNetworkPeer.prototype, "vftable", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(CompressedNetworkPeer.ref())
], BatchedNetworkPeer.prototype, "peer", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(stream_1.BinaryStream)
], BatchedNetworkPeer.prototype, "stream", void 0);
BatchedNetworkPeer = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], BatchedNetworkPeer);
exports.BatchedNetworkPeer = BatchedNetworkPeer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBlZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLHNDQUFxQztBQUNyQyxrQ0FBc0M7QUFDdEMsZ0RBQXlFO0FBRXpFLG9EQUFnRDtBQUNoRCxxQ0FBa0M7QUFDbEMscUNBQXdDO0FBR2pDLElBQU0saUJBQWlCLEdBQXZCLE1BQU0saUJBQWtCLFNBQVEsMkJBQWE7Q0FXbkQsQ0FBQTtBQVRHO0lBREMsSUFBQSx5QkFBVyxFQUFDLGtCQUFXLENBQUM7a0RBQ0o7QUFFckI7SUFEQyxJQUFBLHlCQUFXLEVBQUMsa0JBQVcsQ0FBQzs2Q0FDVDtBQUVoQjtJQURDLElBQUEseUJBQVcsRUFBQyxrQkFBVyxDQUFDOzZDQUNUO0FBRWhCO0lBREMsSUFBQSx5QkFBVyxFQUFDLGVBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7K0NBQ2I7QUFFckI7SUFEQyxJQUFBLHlCQUFXLEVBQUMsZUFBTSxDQUFDLGFBQWEsQ0FBQzsrQ0FDUDtBQVZsQixpQkFBaUI7SUFEN0IsSUFBQSx5QkFBVyxFQUFDLElBQUksQ0FBQztHQUNMLGlCQUFpQixDQVc3QjtBQVhZLDhDQUFpQjtBQWN2QixJQUFNLG9CQUFvQixHQUExQixNQUFNLG9CQUFxQixTQUFRLDJCQUFhO0NBR3RELENBQUE7QUFERztJQURDLElBQUEseUJBQVcsRUFBQyw0QkFBWSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2tEQUNaO0FBRjdCLG9CQUFvQjtJQURoQyxJQUFBLHlCQUFXLEVBQUMsSUFBSSxDQUFDO0dBQ0wsb0JBQW9CLENBR2hDO0FBSFksb0RBQW9CO0FBTTFCLElBQU0scUJBQXFCLEdBQTNCLE1BQU0scUJBQXNCLFNBQVEsMkJBQWE7Q0FHdkQsQ0FBQTtBQURHO0lBREMsSUFBQSx5QkFBVyxFQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQzttREFDbkI7QUFGbEIscUJBQXFCO0lBRGpDLElBQUEseUJBQVcsRUFBQyxJQUFJLENBQUM7R0FDTCxxQkFBcUIsQ0FHakM7QUFIWSxzREFBcUI7QUFNM0IsSUFBTSxrQkFBa0IsR0FBeEIsTUFBTSxrQkFBbUIsU0FBUSwyQkFBYTtJQW9CakQsVUFBVSxDQUFDLElBQWUsRUFBRSxXQUFtQixFQUFFLGVBQXVCLEVBQUUsUUFBaUIsRUFBRSxTQUFrQjtRQUMzRyxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7Q0FDSixDQUFBO0FBckJHO0lBREMsSUFBQSx5QkFBVyxFQUFDLGtCQUFXLENBQUM7bURBQ0o7QUFFckI7SUFEQyxJQUFBLHlCQUFXLEVBQUMscUJBQXFCLENBQUMsR0FBRyxFQUFFLENBQUM7Z0RBQ2I7QUFFNUI7SUFEQyxJQUFBLHlCQUFXLEVBQUMscUJBQVksQ0FBQztrREFDTDtBQU5aLGtCQUFrQjtJQUQ5QixJQUFBLHlCQUFXLEVBQUMsSUFBSSxDQUFDO0dBQ0wsa0JBQWtCLENBdUI5QjtBQXZCWSxnREFBa0IifQ==