"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawPacket = void 0;
const packet_1 = require("./bds/packet");
const launcher_1 = require("./launcher");
const pointer_1 = require("./pointer");
const abstractstream_1 = require("./writer/abstractstream");
class RawPacket extends abstractstream_1.AbstractWriter {
    constructor(packetId) {
        super();
        this.data = new pointer_1.CxxStringWrapper(true);
        this.sharedptr = new packet_1.PacketSharedPtr(true);
        this.packet = null;
        this.packetId = 0;
        this.data.construct();
        if (packetId != null) {
            this.reset(packetId);
        }
    }
    getId() {
        return this.packetId;
    }
    put(v) {
        const str = this.data;
        const i = str.length;
        str.resize(i + 1);
        str.valueptr.setUint8(v, i);
    }
    putRepeat(v, count) {
        const str = this.data;
        const i = str.length;
        str.resize(i + count);
        str.valueptr.fill(v, count, i);
    }
    write(n) {
        const str = this.data;
        const i = str.length;
        str.resize(i + n.length);
        str.valueptr.setBuffer(n, i);
    }
    dispose() {
        this.data.destruct();
        if (this.packet !== null) {
            this.packet = null;
            this.sharedptr.dispose();
        }
    }
    reset(packetId, unknownarg = 0) {
        this.packetId = packetId;
        if (this.packet !== null) {
            this.packet = null;
            this.sharedptr.dispose();
        }
        (0, packet_1.createPacketRaw)(this.sharedptr, packetId);
        this.packet = this.sharedptr.p;
        this.data.resize(0);
        const unknown = this.packet.getUint8(0x10) & 3;
        const unknown2 = unknownarg & 3;
        this.writeVarUint((packetId & 0x3ff) | (unknown2 << 10) | (unknown << 12));
    }
    sendTo(target) {
        if (this.packet === null)
            throw Error("packetId is not defined. Please set it on constructor");
        launcher_1.bedrockServer.networkSystem.sendInternal(target, this.packet, this.data);
    }
}
exports.RawPacket = RawPacket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF3cGFja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmF3cGFja2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHlDQUF3RTtBQUN4RSx5Q0FBMkM7QUFDM0MsdUNBQTZDO0FBQzdDLDREQUF5RDtBQUV6RCxNQUFhLFNBQVUsU0FBUSwrQkFBYztJQU16QyxZQUFZLFFBQWlCO1FBQ3pCLEtBQUssRUFBRSxDQUFDO1FBTkssU0FBSSxHQUFHLElBQUksMEJBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsY0FBUyxHQUFHLElBQUksd0JBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxXQUFNLEdBQWtCLElBQUksQ0FBQztRQUM3QixhQUFRLEdBQUcsQ0FBQyxDQUFDO1FBSWpCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFdEIsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQsS0FBSztRQUNELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsR0FBRyxDQUFDLENBQVM7UUFDVCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDckIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDRCxTQUFTLENBQUMsQ0FBUyxFQUFFLEtBQWE7UUFDOUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNELEtBQUssQ0FBQyxDQUFhO1FBQ2YsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QixHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELE9BQU87UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3JCLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsUUFBZ0IsRUFBRSxhQUFxQixDQUFDO1FBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBRXpCLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM1QjtRQUVELElBQUEsd0JBQWUsRUFBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFcEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sUUFBUSxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFRCxNQUFNLENBQUMsTUFBeUI7UUFDNUIsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUk7WUFBRSxNQUFNLEtBQUssQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1FBQy9GLHdCQUFhLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0UsQ0FBQztDQUNKO0FBbkVELDhCQW1FQyJ9