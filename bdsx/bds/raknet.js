"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RakNet = void 0;
const tslib_1 = require("tslib");
const common_1 = require("../common");
const core_1 = require("../core");
const makefunc_1 = require("../makefunc");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const prochacker_1 = require("../prochacker");
const portDelineator = "|".charCodeAt(0);
var RakNet;
(function (RakNet) {
    var RakNetGUID_1;
    let SystemAddress = class SystemAddress extends nativeclass_1.AbstractClass {
        // void SystemAddress::ToString(bool writePort, char *dest, char portDelineator) const
        ToString(writePort, dest, portDelineator) {
            (0, common_1.abstract)();
        }
        toString() {
            const dest = Buffer.alloc(128);
            this.ToString(true, dest, portDelineator);
            const len = dest.indexOf(0);
            if (len === -1)
                throw Error("SystemAddress.ToString failed, null character not found");
            return dest.subarray(0, len).toString();
        }
    };
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.uint16_t, 0x80)
    ], SystemAddress.prototype, "debugPort", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.uint16_t, 0x82)
    ], SystemAddress.prototype, "systemIndex", void 0);
    SystemAddress = tslib_1.__decorate([
        (0, nativeclass_1.nativeClass)(0x88)
    ], SystemAddress);
    RakNet.SystemAddress = SystemAddress;
    let RakNetGUID = RakNetGUID_1 = class RakNetGUID extends nativeclass_1.NativeStruct {
        equals(other) {
            if (other instanceof RakNetGUID_1) {
                return this.g === other.g;
            }
            return false;
        }
    };
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.bin64_t)
    ], RakNetGUID.prototype, "g", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.uint16_t)
    ], RakNetGUID.prototype, "systemIndex", void 0);
    RakNetGUID = RakNetGUID_1 = tslib_1.__decorate([
        (0, nativeclass_1.nativeClass)()
    ], RakNetGUID);
    RakNet.RakNetGUID = RakNetGUID;
    let RakPeer = class RakPeer extends nativeclass_1.AbstractClass {
        GetSystemAddressFromIndex(idx) {
            (0, common_1.abstract)();
        }
        GetAveragePing(address) {
            (0, common_1.abstract)();
        }
        GetLastPing(address) {
            (0, common_1.abstract)();
        }
        GetLowestPing(address) {
            (0, common_1.abstract)();
        }
    };
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(core_1.VoidPointer)
    ], RakPeer.prototype, "vftable", void 0);
    RakPeer = tslib_1.__decorate([
        (0, nativeclass_1.nativeClass)()
    ], RakPeer);
    RakNet.RakPeer = RakPeer;
    RakNet.UNASSIGNED_RAKNET_GUID = new RakNetGUID(true);
    RakNet.UNASSIGNED_RAKNET_GUID.g = nativetype_1.bin64_t.minus_one;
    RakNet.UNASSIGNED_RAKNET_GUID.systemIndex = -1;
    let AddressOrGUID = class AddressOrGUID extends nativeclass_1.NativeClass {
        GetSystemIndex() {
            const rakNetGuid = this.rakNetGuid;
            if (rakNetGuid.g !== RakNet.UNASSIGNED_RAKNET_GUID.g) {
                return rakNetGuid.systemIndex;
            }
            else {
                return this.systemAddress.systemIndex;
            }
        }
    };
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(RakNetGUID)
    ], AddressOrGUID.prototype, "rakNetGuid", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(SystemAddress)
    ], AddressOrGUID.prototype, "systemAddress", void 0);
    AddressOrGUID = tslib_1.__decorate([
        (0, nativeclass_1.nativeClass)()
    ], AddressOrGUID);
    RakNet.AddressOrGUID = AddressOrGUID;
    SystemAddress.prototype.ToString = prochacker_1.procHacker.js("?ToString@SystemAddress@RakNet@@QEBAX_NPEADD@Z", nativetype_1.void_t, { this: RakNet.SystemAddress }, nativetype_1.bool_t, makefunc_1.makefunc.Buffer, nativetype_1.int32_t);
    RakPeer.prototype.GetSystemAddressFromIndex = prochacker_1.procHacker.jsv("??_7RakPeer@RakNet@@6BRakPeerInterface@1@@", "?GetSystemAddressFromIndex@RakPeer@RakNet@@UEAA?AUSystemAddress@2@I@Z", RakNet.SystemAddress, { this: RakNet.RakPeer, structureReturn: true }, nativetype_1.int32_t);
})(RakNet = exports.RakNet || (exports.RakNet = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFrbmV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmFrbmV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxzQ0FBcUM7QUFDckMsa0NBQXNDO0FBQ3RDLDBDQUF1QztBQUN2QyxnREFBb0c7QUFDcEcsOENBQTJFO0FBQzNFLDhDQUEyQztBQUUzQyxNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRXpDLElBQWlCLE1BQU0sQ0E0RnRCO0FBNUZELFdBQWlCLE1BQU07O0lBRW5CLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSwyQkFBYTtRQU01QyxzRkFBc0Y7UUFDdEYsUUFBUSxDQUFDLFNBQWtCLEVBQUUsSUFBZ0IsRUFBRSxjQUFzQjtZQUNqRSxJQUFBLGlCQUFRLEdBQUUsQ0FBQztRQUNmLENBQUM7UUFFRCxRQUFRO1lBQ0osTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDMUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7Z0JBQUUsTUFBTSxLQUFLLENBQUMseURBQXlELENBQUMsQ0FBQztZQUN2RixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVDLENBQUM7S0FDSixDQUFBO0lBaEJHO1FBREMsSUFBQSx5QkFBVyxFQUFDLHFCQUFRLEVBQUUsSUFBSSxDQUFDO29EQUNSO0lBRXBCO1FBREMsSUFBQSx5QkFBVyxFQUFDLHFCQUFRLEVBQUUsSUFBSSxDQUFDO3NEQUNOO0lBSmIsYUFBYTtRQUR6QixJQUFBLHlCQUFXLEVBQUMsSUFBSSxD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