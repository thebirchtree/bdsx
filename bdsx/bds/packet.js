"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPacketRaw = exports.PacketSharedPtr = exports.Packet = exports.ExtendedStreamReadResult = exports.StreamReadResult = exports.PacketReadResult = void 0;
const tslib_1 = require("tslib");
const capi_1 = require("../capi");
const common_1 = require("../common");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const prochacker_1 = require("../prochacker");
const sharedpointer_1 = require("../sharedpointer");
// export interface PacketType<T> extends StructureType<T>
// {
//     readonly ID:number;
// }
exports.PacketReadResult = nativetype_1.uint32_t.extends({
    PacketReadNoError: 0,
    PacketReadError: 1,
});
exports.StreamReadResult = nativetype_1.int32_t.extends({
    Disconnect: 0,
    Pass: 1,
    Warning: 2,
    Ignore: 0x7f,
});
let ExtendedStreamReadResult = class ExtendedStreamReadResult extends nativeclass_1.AbstractClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.StreamReadResult)
], ExtendedStreamReadResult.prototype, "streamReadResult", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], ExtendedStreamReadResult.prototype, "dummy", void 0);
ExtendedStreamReadResult = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ExtendedStreamReadResult);
exports.ExtendedStreamReadResult = ExtendedStreamReadResult;
const sharedptr_of_packet = Symbol("sharedptr");
let Packet = class Packet extends nativeclass_1.AbstractMantleClass {
    getId() {
        (0, common_1.abstract)();
    }
    getName() {
        (0, common_1.abstract)();
    }
    write(stream) {
        (0, common_1.abstract)();
    }
    read(stream) {
        (0, common_1.abstract)();
    }
    readExtended(read, stream) {
        (0, common_1.abstract)();
    }
    /**
     * same with target.send
     */
    sendTo(target, senderSubClientId) {
        (0, common_1.abstract)();
    }
    dispose() {
        const sharedptr = this[sharedptr_of_packet];
        if (sharedptr === undefined) {
            // it was allocated with malloc
            this.destruct();
            capi_1.capi.free(this);
        }
        else {
            // it was allocated as sharedptr
            sharedptr.dispose();
            this[sharedptr_of_packet] = null;
        }
    }
    /**
     * @deprecated unintuitive, the returning value need to be `dispose()`
     */
    static create() {
        return this.allocate();
    }
    /**
     * @return the returning value need to be `dispose()`
     */
    static allocate(copyFrom) {
        if (copyFrom != null)
            throw Error(`not implemented, unable to copy the packet class`);
        const packetThis = this;
        const id = this.ID;
        if (id == null)
            throw Error("Packet class is abstract, please use named class instead (ex. LoginPacket)");
        const SharedPacket = sharedpointer_1.CxxSharedPtr.make(packetThis);
        const sharedptr = new SharedPacket(true);
        (0, exports.createPacketRaw)(sharedptr, id);
        const packet = sharedptr.p;
        if (packet === null)
            throw Error(`${this.name} is not created`);
        packet[sharedptr_of_packet] = sharedptr;
        return packet;
    }
};
Packet = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x30, 0x8)
], Packet);
exports.Packet = Packet;
exports.PacketSharedPtr = sharedpointer_1.CxxSharedPtr.make(Packet);
exports.createPacketRaw = prochacker_1.procHacker.js("?createPacket@MinecraftPackets@@SA?AV?$shared_ptr@VPacket@@@std@@W4MinecraftPacketIds@@@Z", exports.PacketSharedPtr, null, exports.PacketSharedPtr, nativetype_1.int32_t);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFja2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxrQ0FBK0I7QUFDL0Isc0NBQXFDO0FBQ3JDLGdEQUE4RjtBQUM5Riw4Q0FBNkQ7QUFDN0QsOENBQTJDO0FBQzNDLG9EQUFnRDtBQUtoRCwwREFBMEQ7QUFDMUQsSUFBSTtBQUNKLDBCQUEwQjtBQUMxQixJQUFJO0FBRVMsUUFBQSxnQkFBZ0IsR0FBRyxxQkFBUSxDQUFDLE9BQU8sQ0FBQztJQUM3QyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3BCLGVBQWUsRUFBRSxDQUFDO0NBQ3JCLENBQUMsQ0FBQztBQUdVLFFBQUEsZ0JBQWdCLEdBQUcsb0JBQU8sQ0FBQyxPQUFPLENBQUM7SUFDNUMsVUFBVSxFQUFFLENBQUM7SUFDYixJQUFJLEVBQUUsQ0FBQztJQUNQLE9BQU8sRUFBRSxDQUFDO0lBQ1YsTUFBTSxFQUFFLElBQUk7Q0FDZixDQUFDLENBQUM7QUFJSSxJQUFNLHdCQUF3QixHQUE5QixNQUFNLHdCQUF5QixTQUFRLDJCQUFhO0NBTTFELENBQUE7QUFKRztJQURDLElBQUEseUJBQVcsRUFBQyx3QkFBZ0IsQ0FBQztrRUFDSztBQUVuQztJQURDLElBQUEseUJBQVcsRUFBQyxvQkFBTyxDQUFDO3VEQUNOO0FBSk4sd0JBQXdCO0lBRHBDLElBQUEseUJBQVcsRUFBQyxJQUFJLENBQUM7R0FDTCx3QkFBd0IsQ0FNcEM7QUFOWSw0REFBd0I7QUFRckMsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7QUFHekMsSUFBTSxNQUFNLEdBQVosTUFBTSxNQUFPLFNBQVEsaUNBQW1CO0lBSTNDLEtBQUs7UUFDRCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxPQUFPO1FBQ0gsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsS0FBSyxDQUFDLE1BQW9CO1FBQ3RCLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELElBQUksQ0FBQyxNQUFvQjtRQUNyQixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxZQUFZLENBQUMsSUFBOEIsRUFBRSxNQUFvQjtRQUM3RCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sQ0FBQyxNQUF5QixFQUFFLGlCQUEwQjtRQUN4RCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxPQUFPO1FBQ0gsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDNUMsSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQ3pCLCtCQUErQjtZQUMvQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsV0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQjthQUFNO1lBQ0gsZ0NBQWdDO1lBQ2hDLFNBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDcEM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNLENBQUMsTUFBTTtRQUNULE9BQVEsSUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sQ0FBQyxRQUFRLENBQXVCLFFBQW1CO1FBQ3JELElBQUksUUFBUSxJQUFJLElBQUk7WUFBRSxNQUFNLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO1FBRXRGLE1BQU0sVUFBVSxHQUFHLElBQWlELENBQUM7UUFDckUsTUFBTSxFQUFFLEdBQUksSUFBWSxDQUFDLEVBQUUsQ0FBQztRQUM1QixJQUFJLEVBQUUsSUFBSSxJQUFJO1lBQUUsTUFBTSxLQUFLLENBQUMsNEVBQTRFLENBQUMsQ0FBQztRQUMxRyxNQUFNLFlBQVksR0FBRyw0QkFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuRCxNQUFNLFNBQVMsR0FBRyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxJQUFBLHVCQUFlLEVBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRS9CLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsSUFBSSxNQUFNLEtBQUssSUFBSTtZQUFFLE1BQU0sS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsQ0FBQztRQUNoRSxNQUFNLENBQUMsbUJBQW1CLENBQUMsR0FBRyxTQUFTLENBQUM7UUFDeEMsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztDQUNKLENBQUE7QUFoRVksTUFBTTtJQURsQixJQUFBLHlCQUFXLEVBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQztHQUNWLE1BQU0sQ0FnRWxCO0FBaEVZLHdCQUFNO0FBa0VOLFFBQUEsZUFBZSxHQUFHLDRCQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRzVDLFFBQUEsZUFBZSxHQUFHLHVCQUFVLENBQUMsRUFBRSxDQUN4QywyRkFBMkYsRUFDM0YsdUJBQWUsRUFDZixJQUFJLEVBQ0osdUJBQWUsRUFDZixvQkFBTyxDQUNWLENBQUMifQ==