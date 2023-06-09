"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsdata = void 0;
const bufferstream_1 = require("../writer/bufferstream");
var Opcode;
(function (Opcode) {
    Opcode[Opcode["PositiveInteger"] = 0] = "PositiveInteger";
    Opcode[Opcode["NegativeInteger"] = 1] = "NegativeInteger";
    Opcode[Opcode["String"] = 2] = "String";
    Opcode[Opcode["Object"] = 3] = "Object";
    Opcode[Opcode["Array"] = 4] = "Array";
    Opcode[Opcode["Extra"] = 5] = "Extra";
    Opcode[Opcode["Empty"] = 6] = "Empty";
    Opcode[Opcode["Reserved2"] = 7] = "Reserved2";
})(Opcode || (Opcode = {}));
var ExCode;
(function (ExCode) {
    ExCode[ExCode["Null"] = 0] = "Null";
    ExCode[ExCode["Undefined"] = 16] = "Undefined";
    ExCode[ExCode["True"] = 32] = "True";
    ExCode[ExCode["False"] = 48] = "False";
    ExCode[ExCode["Float32"] = 64] = "Float32";
    ExCode[ExCode["Float64"] = 80] = "Float64";
    ExCode[ExCode["Date"] = 96] = "Date";
    ExCode[ExCode["Reserved2"] = 97] = "Reserved2";
})(ExCode || (ExCode = {}));
class Serializer {
    constructor(writer) {
        this.writer = writer;
    }
    buffer() {
        return this.writer.buffer();
    }
    writeUint(opcode, n) {
        const excode = n % 0x8;
        n = Math.floor(n / 0x8);
        if (n === 0) {
            this.writer.writeUint8((excode << 4) | opcode);
        }
        else {
            this.writer.writeUint8((excode << 4) | opcode | 0x80);
            for (;;) {
                const value = n % 0x80;
                n = Math.floor(n / 0x80);
                if (n === 0) {
                    this.writer.writeUint8(value);
                    break;
                }
                else {
                    this.writer.writeUint8(value | 0x80);
                }
            }
        }
    }
    writeNumber(n) {
        if (Math.round(n) === n && Number.MIN_SAFE_INTEGER <= n && n <= Number.MAX_SAFE_INTEGER) {
            if (n >= 0) {
                this.writeUint(Opcode.PositiveInteger, n);
            }
            else {
                this.writeUint(Opcode.NegativeInteger, -n - 1);
            }
        }
        else {
            if (Math.fround(n) === n) {
                this.writer.writeUint8(Opcode.Extra | ExCode.Float32);
                this.writer.writeFloat32(n);
            }
            else {
                this.writer.writeUint8(Opcode.Extra | ExCode.Float64);
                this.writer.writeFloat64(n);
            }
        }
    }
    writeString(value) {
        this.writeUint(Opcode.String, value.length);
        this.writer.write(Buffer.from(value, "utf8"));
    }
    writeArray(list) {
        const n = list.length;
        this.writeUint(Opcode.Array, n);
        let empty = 0;
        for (let i = 0; i !== n; i = (i + 1) | 0) {
            const v = list[i];
            if (v === undefined && !(i in list)) {
                empty = (empty + 1) | 0;
            }
            else {
                if (empty !== 0) {
                    this.writeUint(Opcode.Empty, empty);
                    empty = 0;
                }
                this.writeValue(v);
            }
        }
        if (empty !== 0) {
            this.writeUint(Opcode.Empty, empty);
            empty = 0;
        }
    }
    writeObject(obj) {
        const entries = Object.entries(obj);
        this.writeUint(Opcode.Object, entries.length);
        for (const [key, value] of entries) {
            this.writer.writeVarString(key);
            this.writeValue(value);
        }
    }
    writeDate(date) {
        let v = date.getTime();
        if (v < 0) {
            v = v * -2 - 1;
        }
        else {
            v *= 2;
        }
        this.writer.put(Opcode.Extra | ExCode.Date);
        this.writer.writeVarUint(v);
    }
    writeValue(value) {
        switch (typeof value) {
            case "number":
                this.writeNumber(value);
                break;
            case "boolean":
                this.writer.writeUint8(Opcode.Extra | (value ? ExCode.True : ExCode.False));
                break;
            case "object":
                if (value instanceof Array) {
                    this.writeArray(value);
                }
                else if (value instanceof Date) {
                    this.writeDate(value);
                }
                else {
                    if (value === null) {
                        this.writer.writeUint8(Opcode.Extra | ExCode.Null);
                    }
                    else {
                        this.writeObject(value);
                    }
                }
                break;
            case "string":
                this.writeString(value);
                break;
            case "undefined":
                this.writer.writeUint8(Opcode.Extra | ExCode.Undefined);
                break;
            default:
                throw Error("not supported yet");
        }
    }
}
class Deserializer {
    constructor(reader, errors = []) {
        this.reader = reader;
        this.errors = errors;
    }
    readUint(head) {
        let value = (head >>= 4);
        if ((value & 0x8) === 0) {
            return value;
        }
        value &= 0x7;
        let mul = 8;
        for (;;) {
            const v = this.reader.readUint8();
            if ((v & 0x80) === 0) {
                return v * mul + value;
            }
            else {
                value += (v & 0x7f) * mul;
            }
            mul *= 0x80;
        }
    }
    readString(head) {
        const len = this.readUint(head);
        return this.reader.getBuffer(len).toString("utf8");
    }
    readObject(head) {
        const len = this.readUint(head);
        const out = {};
        for (let i = 0; i < len; i++) {
            const key = this.reader.readVarString();
            out[key] = this.readValue();
        }
        return out;
    }
    readArray(head) {
        const len = this.readUint(head);
        const out = new Array(len);
        for (let i = 0; i < len;) {
            const v = this.readValue();
            if (v instanceof jsdata.EmptySpace) {
                i = (i + v.length) | 0;
            }
            else {
                out[i] = v;
                i = (i + 1) | 0;
            }
        }
        return out;
    }
    readDate() {
        const n = this.reader.readVarUint();
        if (n % 2 === 1) {
            return new Date(n * -0.5 - 0.5);
        }
        else {
            return new Date(n / 2);
        }
    }
    readValue() {
        try {
            const head = this.reader.readUint8();
            const opcode = head & 0xf;
            switch (opcode) {
                case Opcode.PositiveInteger:
                    return this.readUint(head);
                case Opcode.NegativeInteger:
                    return -this.readUint(head) - 1;
                case Opcode.String:
                    return this.readString(head);
                case Opcode.Object:
                    return this.readObject(head);
                case Opcode.Array:
                    return this.readArray(head);
                case Opcode.Extra:
                    switch (head & 0xf0) {
                        case ExCode.Null:
                            return null;
                        case ExCode.Undefined:
                            return undefined;
                        case ExCode.True:
                            return true;
                        case ExCode.False:
                            return false;
                        case ExCode.Float32:
                            return this.reader.readFloat32();
                        case ExCode.Float64:
                            return this.reader.readFloat64();
                        case ExCode.Date:
                            return this.readDate();
                    }
                    break;
                case Opcode.Empty:
                    return new jsdata.EmptySpace(this.readUint(head));
            }
        }
        catch (err) {
            this.errors.push(err);
        }
        return jsdata.Invalid;
    }
}
var jsdata;
(function (jsdata) {
    function serialize(data, writer = new bufferstream_1.BufferWriter(new Uint8Array(64), 0)) {
        const s = new Serializer(writer);
        s.writeValue(data);
        return s.buffer();
    }
    jsdata.serialize = serialize;
    function deserialize(buffer, errors) {
        const ds = new Deserializer(buffer instanceof bufferstream_1.BufferReader ? buffer : new bufferstream_1.BufferReader(buffer), errors);
        return ds.readValue();
    }
    jsdata.deserialize = deserialize;
    class EmptySpace {
        constructor(length) {
            this.length = length;
        }
    }
    jsdata.EmptySpace = EmptySpace;
    jsdata.Invalid = {
        toString() {
            return "[Invalid]";
        },
    };
})(jsdata = exports.jsdata || (exports.jsdata = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNkYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsianNkYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlEQUFvRTtBQUVwRSxJQUFLLE1BVUo7QUFWRCxXQUFLLE1BQU07SUFDUCx5REFBZSxDQUFBO0lBQ2YseURBQWUsQ0FBQTtJQUNmLHVDQUFNLENBQUE7SUFDTix1Q0FBTSxDQUFBO0lBQ04scUNBQUssQ0FBQTtJQUNMLHFDQUFLLENBQUE7SUFDTCxxQ0FBSyxDQUFBO0lBRUwsNkNBQVMsQ0FBQTtBQUNiLENBQUMsRUFWSSxNQUFNLEtBQU4sTUFBTSxRQVVWO0FBQ0QsSUFBSyxNQVVKO0FBVkQsV0FBSyxNQUFNO0lBQ1AsbUNBQWEsQ0FBQTtJQUNiLDhDQUFrQixDQUFBO0lBQ2xCLG9DQUFhLENBQUE7SUFDYixzQ0FBYyxDQUFBO0lBQ2QsMENBQWdCLENBQUE7SUFDaEIsMENBQWdCLENBQUE7SUFDaEIsb0NBQWEsQ0FBQTtJQUViLDhDQUFTLENBQUE7QUFDYixDQUFDLEVBVkksTUFBTSxLQUFOLE1BQU0sUUFVVjtBQUVELE1BQU0sVUFBVTtJQUNaLFlBQTZCLE1BQW9CO1FBQXBCLFdBQU0sR0FBTixNQUFNLENBQWM7SUFBRyxDQUFDO0lBRXJELE1BQU07UUFDRixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUFjLEVBQUUsQ0FBUztRQUMvQixNQUFNLE1BQU0sR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3ZCLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztTQUNsRDthQUFNO1lBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ3RELFNBQVM7Z0JBQ0wsTUFBTSxLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDdkIsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzlCLE1BQU07aUJBQ1Q7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDO2lCQUN4QzthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBQ0QsV0FBVyxDQUFDLENBQVM7UUFDakIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLEVBQUU7WUFDckYsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNSLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUM3QztpQkFBTTtnQkFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDbEQ7U0FDSjthQUFNO1lBQ0gsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQy9CO2lCQUFNO2dCQUNILElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMvQjtTQUNKO0lBQ0wsQ0FBQztJQUNELFdBQVcsQ0FBQyxLQUFhO1FBQ3JCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ0QsVUFBVSxDQUFDLElBQWU7UUFDdEIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3RDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsS0FBSyxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTtnQkFDakMsS0FBSyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMzQjtpQkFBTTtnQkFDSCxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7b0JBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNwQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2lCQUNiO2dCQUNELElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEI7U0FDSjtRQUNELElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtZQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNwQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQ2I7SUFDTCxDQUFDO0lBQ0QsV0FBVyxDQUFDLEdBQTRCO1FBQ3BDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QyxLQUFLLE1BQU0sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksT0FBTyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBQ0QsU0FBUyxDQUFDLElBQVU7UUFDaEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNQLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2xCO2FBQU07WUFDSCxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ1Y7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0QsVUFBVSxDQUFDLEtBQWM7UUFDckIsUUFBUSxPQUFPLEtBQUssRUFBRTtZQUNsQixLQUFLLFFBQVE7Z0JBQ1QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDeEIsTUFBTTtZQUNWLEtBQUssU0FBUztnQkFDVixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDNUUsTUFBTTtZQUNWLEtBQUssUUFBUTtnQkFDVCxJQUFJLEtBQUssWUFBWSxLQUFLLEVBQUU7b0JBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzFCO3FCQUFNLElBQUksS0FBSyxZQUFZLElBQUksRUFBRTtvQkFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDekI7cUJBQU07b0JBQ0gsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO3dCQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDdEQ7eUJBQU07d0JBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFZLENBQUMsQ0FBQztxQkFDbEM7aUJBQ0o7Z0JBQ0QsTUFBTTtZQUNWLEtBQUssUUFBUTtnQkFDVCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN4QixNQUFNO1lBQ1YsS0FBSyxXQUFXO2dCQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN4RCxNQUFNO1lBQ1Y7Z0JBQ0ksTUFBTSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztTQUN4QztJQUNMLENBQUM7Q0FDSjtBQUVELE1BQU0sWUFBWTtJQUNkLFlBQTZCLE1BQW9CLEVBQWtCLFNBQWtCLEVBQUU7UUFBMUQsV0FBTSxHQUFOLE1BQU0sQ0FBYztRQUFrQixXQUFNLEdBQU4sTUFBTSxDQUFjO0lBQUcsQ0FBQztJQUUzRixRQUFRLENBQUMsSUFBWTtRQUNqQixJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNyQixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELEtBQUssSUFBSSxHQUFHLENBQUM7UUFDYixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixTQUFTO1lBQ0wsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDbEIsT0FBTyxDQUFDLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQzthQUMxQjtpQkFBTTtnQkFDSCxLQUFLLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO2FBQzdCO1lBQ0QsR0FBRyxJQUFJLElBQUksQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFZO1FBQ25CLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFZO1FBQ25CLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsTUFBTSxHQUFHLEdBQXdCLEVBQUUsQ0FBQztRQUNwQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDeEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUMvQjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFZO1FBQ2xCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQU0sR0FBRyxDQUFDLENBQUM7UUFDaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBSTtZQUN2QixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLFlBQVksTUFBTSxDQUFDLFVBQVUsRUFBRTtnQkFDaEMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDMUI7aUJBQU07Z0JBQ0gsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDWCxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ25CO1NBQ0o7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRCxRQUFRO1FBQ0osTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2IsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FDbkM7YUFBTTtZQUNILE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUVELFNBQVM7UUFDTCxJQUFJO1lBQ0EsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNyQyxNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO1lBQzFCLFFBQVEsTUFBTSxFQUFFO2dCQUNaLEtBQUssTUFBTSxDQUFDLGVBQWU7b0JBQ3ZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0IsS0FBSyxNQUFNLENBQUMsZUFBZTtvQkFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNwQyxLQUFLLE1BQU0sQ0FBQyxNQUFNO29CQUNkLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDakMsS0FBSyxNQUFNLENBQUMsTUFBTTtvQkFDZCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2pDLEtBQUssTUFBTSxDQUFDLEtBQUs7b0JBQ2IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoQyxLQUFLLE1BQU0sQ0FBQyxLQUFLO29CQUNiLFFBQVEsSUFBSSxHQUFHLElBQUksRUFBRTt3QkFDakIsS0FBSyxNQUFNLENBQUMsSUFBSTs0QkFDWixPQUFPLElBQUksQ0FBQzt3QkFDaEIsS0FBSyxNQUFNLENBQUMsU0FBUzs0QkFDakIsT0FBTyxTQUFTLENBQUM7d0JBQ3JCLEtBQUssTUFBTSxDQUFDLElBQUk7NEJBQ1osT0FBTyxJQUFJLENBQUM7d0JBQ2hCLEtBQUssTUFBTSxDQUFDLEtBQUs7NEJBQ2IsT0FBTyxLQUFLLENBQUM7d0JBQ2pCLEtBQUssTUFBTSxDQUFDLE9BQU87NEJBQ2YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO3dCQUNyQyxLQUFLLE1BQU0sQ0FBQyxPQUFPOzRCQUNmLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQzt3QkFDckMsS0FBSyxNQUFNLENBQUMsSUFBSTs0QkFDWixPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztxQkFDOUI7b0JBQ0QsTUFBTTtnQkFDVixLQUFLLE1BQU0sQ0FBQyxLQUFLO29CQUNiLE9BQU8sSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUN6RDtTQUNKO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDVixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN6QjtRQUNELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUMxQixDQUFDO0NBQ0o7QUFFRCxJQUFpQixNQUFNLENBcUJ0QjtBQXJCRCxXQUFpQixNQUFNO0lBQ25CLFNBQWdCLFNBQVMsQ0FBQyxJQUFhLEVBQUUsU0FBdUIsSUFBSSwyQkFBWSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuRyxNQUFNLENBQUMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFKZSxnQkFBUyxZQUl4QixDQUFBO0lBRUQsU0FBZ0IsV0FBVyxDQUFDLE1BQWlDLEVBQUUsTUFBZ0I7UUFDM0UsTUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFZLENBQUMsTUFBTSxZQUFZLDJCQUFZLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSwyQkFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3hHLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFIZSxrQkFBVyxjQUcxQixDQUFBO0lBRUQsTUFBYSxVQUFVO1FBQ25CLFlBQTRCLE1BQWM7WUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQUcsQ0FBQztLQUNqRDtJQUZZLGlCQUFVLGFBRXRCLENBQUE7SUFFWSxjQUFPLEdBQUc7UUFDbkIsUUFBUTtZQUNKLE9BQU8sV0FBVyxDQUFDO1FBQ3ZCLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQyxFQXJCZ0IsTUFBTSxHQUFOLGNBQU0sS0FBTixjQUFNLFFBcUJ0QiJ9