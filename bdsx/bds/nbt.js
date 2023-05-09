"use strict";
var ByteTag_1, ShortTag_1, IntTag_1, Int64Tag_1, FloatTag_1, DoubleTag_1, ByteArrayTag_1, StringTag_1, ListTag_1, CompoundTag_1, IntArrayTag_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NBT = exports.IntArrayTag = exports.CompoundTag = exports.CompoundTagVariant = exports.ListTag = exports.StringTag = exports.ByteArrayTag = exports.DoubleTag = exports.FloatTag = exports.Int64Tag = exports.IntTag = exports.ShortTag = exports.ByteTag = exports.EndTag = exports.TagPointer = exports.Tag = exports.TagMemoryChunk = void 0;
const tslib_1 = require("tslib");
const util = require("util");
const bin_1 = require("../bin");
const capi_1 = require("../capi");
const common_1 = require("../common");
const core_1 = require("../core");
const cxxmap_1 = require("../cxxmap");
const cxxvector_1 = require("../cxxvector");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const pointer_1 = require("../pointer");
const util_1 = require("../util");
const symbols_1 = require("./symbols");
let TagMemoryChunk = class TagMemoryChunk extends nativeclass_1.NativeClass {
    [nativetype_1.NativeType.ctor]() {
        this.elements = 0;
        this.size = 0;
        this.buffer = null;
    }
    [nativetype_1.NativeType.dtor]() {
        const buf = this.buffer;
        if (buf !== null)
            capi_1.capi.free(buf);
    }
    [nativetype_1.NativeType.ctor_copy](v) {
        this.elements = v.elements;
        const size = (this.size = v.size);
        const buffer = v.buffer;
        if (buffer !== null) {
            (this.buffer = capi_1.capi.malloc(size)).copyFrom(buffer, size);
        }
        else {
            this.buffer = null;
        }
    }
    getComponentSize() {
        return this.size / this.elements;
    }
    getAs(type) {
        const buf = this.buffer;
        const n = this.elements;
        const out = new type(n);
        if (buf !== null)
            buf.copyTo(out, out.byteLength);
        return out;
    }
    set(buffer) {
        const count = buffer.length;
        const bytes = buffer.byteLength;
        this.elements = count;
        this.size = bytes;
        const oldbuf = this.buffer;
        if (oldbuf !== null)
            capi_1.capi.free(oldbuf);
        const newbuf = capi_1.capi.malloc(bytes);
        this.buffer = newbuf;
        newbuf.setBuffer(buffer);
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int64_as_float_t)
], TagMemoryChunk.prototype, "elements", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int64_as_float_t)
], TagMemoryChunk.prototype, "size", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.StaticPointer)
], TagMemoryChunk.prototype, "buffer", void 0);
TagMemoryChunk = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], TagMemoryChunk);
exports.TagMemoryChunk = TagMemoryChunk;
let Tag = class Tag extends nativeclass_1.NativeClass {
    toString() {
        (0, common_1.abstract)();
    }
    getId() {
        (0, common_1.abstract)();
    }
    equals(tag) {
        (0, common_1.abstract)();
    }
    value() {
        (0, common_1.abstract)();
    }
    dispose() {
        this.destruct();
        capi_1.capi.free(this);
    }
    allocateClone() {
        const TagType = this.constructor;
        return TagType.allocate(this);
    }
    stringify(indent) {
        const writer = indent != null ? new IndentedNBTWriter(indent) : new NBTWriter();
        this.writeTo(writer);
        return writer.data;
    }
    writeTo(writer) {
        // empty
    }
    [util.inspect.custom](depth, options) {
        return `${this.constructor.name} ${util.inspect(this.data, options)}`;
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], Tag.prototype, "vftable", void 0);
Tag = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], Tag);
exports.Tag = Tag;
(function (Tag) {
    let Type;
    (function (Type) {
        Type[Type["End"] = 0] = "End";
        Type[Type["Byte"] = 1] = "Byte";
        Type[Type["Short"] = 2] = "Short";
        Type[Type["Int"] = 3] = "Int";
        Type[Type["Int64"] = 4] = "Int64";
        Type[Type["Float"] = 5] = "Float";
        Type[Type["Double"] = 6] = "Double";
        Type[Type["ByteArray"] = 7] = "ByteArray";
        Type[Type["String"] = 8] = "String";
        Type[Type["List"] = 9] = "List";
        Type[Type["Compound"] = 10] = "Compound";
        Type[Type["IntArray"] = 11] = "IntArray";
    })(Type = Tag.Type || (Tag.Type = {}));
})(Tag = exports.Tag || (exports.Tag = {}));
exports.Tag = Tag;
exports.TagPointer = pointer_1.Wrapper.make(Tag.ref());
let EndTag = class EndTag extends Tag {
    value() {
        return null;
    }
};
EndTag = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], EndTag);
exports.EndTag = EndTag;
let ByteTag = ByteTag_1 = class ByteTag extends Tag {
    value() {
        return NBT.byte(this.data);
    }
    constructWith(data) {
        this.construct();
        this.data = data;
    }
    stringify(indent) {
        return this.data + "b";
    }
    writeTo(writer) {
        writer.data += this.data;
        writer.data += "b";
    }
    static constructWith(data) {
        const tag = new ByteTag_1(true);
        tag.constructWith(data);
        return tag;
    }
    /**
     * @return should be deleted with tag.delete()
     */
    static allocateWith(data) {
        const tag = ByteTag_1.allocate();
        tag.data = data;
        return tag;
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], ByteTag.prototype, "data", void 0);
ByteTag = ByteTag_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], ByteTag);
exports.ByteTag = ByteTag;
let ShortTag = ShortTag_1 = class ShortTag extends Tag {
    value() {
        return NBT.short(this.data);
    }
    constructWith(data) {
        this.construct();
        this.data = data;
    }
    stringify(indent) {
        return this.data + "s";
    }
    writeTo(writer) {
        writer.data += this.data;
        writer.data += "s";
    }
    static constructWith(data) {
        const tag = new ShortTag_1(true);
        tag.constructWith(data);
        return tag;
    }
    /**
     * @return should be deleted with tag.delete()
     */
    static allocateWith(data) {
        const tag = ShortTag_1.allocate();
        tag.data = data;
        return tag;
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int16_t)
], ShortTag.prototype, "data", void 0);
ShortTag = ShortTag_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], ShortTag);
exports.ShortTag = ShortTag;
let IntTag = IntTag_1 = class IntTag extends Tag {
    value() {
        return new NBT.Int(this.data);
    }
    constructWith(data) {
        this.construct();
        this.data = data;
    }
    stringify(indent) {
        return this.data + "";
    }
    writeTo(writer) {
        writer.data += this.data;
    }
    static constructWith(data) {
        const tag = new IntTag_1(true);
        tag.constructWith(data);
        return tag;
    }
    /**
     * @return should be deleted with IntTag.delete(x)
     */
    static allocateWith(data) {
        const tag = IntTag_1.allocate();
        tag.data = data;
        return tag;
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], IntTag.prototype, "data", void 0);
IntTag = IntTag_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], IntTag);
exports.IntTag = IntTag;
// Notice that in bedrock_server.exe, LongTag is called Int64Tag. However, in Tag::getTagName, Int64Tag returns TAG_Long.
let Int64Tag = Int64Tag_1 = class Int64Tag extends Tag {
    get dataAsString() {
        return bin_1.bin.toString(this.data);
    }
    set dataAsString(data) {
        this.data = bin_1.bin.parse(data, 10, 4);
    }
    value() {
        return new NBT.Int64(this.data);
    }
    constructWith(data) {
        this.construct();
        this.data = data;
    }
    constructWithString(data) {
        this.construct();
        this.dataAsString = data;
    }
    stringify(indent) {
        return bin_1.bin.toString(this.data) + "l";
    }
    writeTo(writer) {
        writer.data += bin_1.bin.toString(this.data);
        writer.data += "l";
    }
    static constructWith(data) {
        const tag = new Int64Tag_1(true);
        tag.constructWith(data);
        return tag;
    }
    static constructWithString(data) {
        const tag = new Int64Tag_1(true);
        tag.constructWithString(data);
        return tag;
    }
    static allocateWith(data) {
        const tag = Int64Tag_1.allocate();
        tag.data = data;
        return tag;
    }
    static allocateWithString(data) {
        const tag = Int64Tag_1.allocate();
        tag.dataAsString = data;
        return tag;
    }
    [util.inspect.custom](depth, options) {
        return `LongTag ${this.dataAsString.yellow}`;
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bin64_t)
], Int64Tag.prototype, "data", void 0);
Int64Tag = Int64Tag_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], Int64Tag);
exports.Int64Tag = Int64Tag;
let FloatTag = FloatTag_1 = class FloatTag extends Tag {
    value() {
        return NBT.float(this.data);
    }
    constructWith(data) {
        this.construct();
        this.data = data;
    }
    stringify(indent) {
        return this.data + "f";
    }
    writeTo(writer) {
        writer.data += this.data;
        writer.data += "f";
    }
    static constructWith(data) {
        const tag = new FloatTag_1(true);
        tag.constructWith(data);
        return tag;
    }
    static allocateWith(data) {
        const tag = FloatTag_1.allocate();
        tag.data = data;
        return tag;
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], FloatTag.prototype, "data", void 0);
FloatTag = FloatTag_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], FloatTag);
exports.FloatTag = FloatTag;
let DoubleTag = DoubleTag_1 = class DoubleTag extends Tag {
    value() {
        return NBT.double(this.data);
    }
    constructWith(data) {
        this.construct();
        this.data = data;
    }
    stringify(indent) {
        return this.data + "d";
    }
    writeTo(writer) {
        writer.data += this.data;
        writer.data += "d";
    }
    static constructWith(data) {
        const tag = new DoubleTag_1(true);
        tag.constructWith(data);
        return tag;
    }
    static allocateWith(data) {
        const tag = DoubleTag_1.allocate();
        tag.data = data;
        return tag;
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float64_t)
], DoubleTag.prototype, "data", void 0);
DoubleTag = DoubleTag_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], DoubleTag);
exports.DoubleTag = DoubleTag;
let ByteArrayTag = ByteArrayTag_1 = class ByteArrayTag extends Tag {
    value() {
        return this.data.getAs(Uint8Array);
    }
    constructWith(data) {
        (0, common_1.abstract)();
    }
    set(array) {
        if (array instanceof Array)
            array = new Uint8Array(array);
        this.data.set(array);
    }
    get(idx) {
        const data = this.data;
        if (idx < 0 || idx >= data.size)
            return undefined;
        const buffer = data.buffer; // it must be not null
        return buffer.getUint8(idx);
    }
    size() {
        return this.data.size;
    }
    toUint8Array() {
        return this.data.getAs(Uint8Array);
    }
    writeTo(writer) {
        writer.byteArray(this.toUint8Array());
    }
    static constructWith(data) {
        const tag = new ByteArrayTag_1(true);
        tag.constructWith(data);
        return tag;
    }
    static allocateWith(data) {
        const v = ByteArrayTag_1.allocate();
        v.set(data);
        return v;
    }
    [util.inspect.custom](depth, options) {
        return `ByteArrayTag ${util.inspect(this.data.getAs(Uint8Array), options)}`;
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(TagMemoryChunk)
], ByteArrayTag.prototype, "data", void 0);
ByteArrayTag = ByteArrayTag_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], ByteArrayTag);
exports.ByteArrayTag = ByteArrayTag;
let StringTag = StringTag_1 = class StringTag extends Tag {
    value() {
        return this.data;
    }
    constructWith(data) {
        this.construct();
        this.data = data;
    }
    stringify(indent) {
        return '"' + (0, util_1.addSlashes)(this.data) + '"';
    }
    writeTo(writer) {
        writer.data += '"';
        writer.data += (0, util_1.addSlashes)(this.data);
        writer.data += '"';
    }
    static constructWith(data) {
        const tag = new StringTag_1(true);
        tag.constructWith(data);
        return tag;
    }
    static allocateWith(data) {
        const v = StringTag_1.allocate();
        v.data = data;
        return v;
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], StringTag.prototype, "data", void 0);
StringTag = StringTag_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], StringTag);
exports.StringTag = StringTag;
let ListTag = ListTag_1 = class ListTag extends Tag {
    value() {
        return this.data.toArray().map(tag => tag.value());
    }
    [nativetype_1.NativeType.ctor_copy](list) {
        this.construct();
        const src = list.data;
        const dst = this.data;
        const size = src.size();
        dst.resize(size);
        for (let i = 0; i < size; i++) {
            dst.set(i, src.get(i).allocateClone());
        }
    }
    get(idx) {
        return this.data.get(idx);
    }
    set(idx, tag) {
        this.type = tag.getId();
        return this.data.set(idx, tag);
    }
    push(tag) {
        this.pushAllocated(tag.allocateClone());
    }
    /**
     * @param tag it should be allocated by `Tag.allocate()`. it will be destructed inside of the function
     */
    pushAllocated(tag) {
        (0, common_1.abstract)();
    }
    /**
     * @return should be deleted by tag.delete()
     */
    pop() {
        const back = this.data.back();
        this.data.pop();
        return back;
    }
    size() {
        (0, common_1.abstract)();
    }
    constructWith(data) {
        this.construct();
        for (const e of data) {
            this.push(e);
        }
    }
    writeTo(writer) {
        writer.list(this.data);
    }
    static constructWith(data) {
        const tag = new ListTag_1(true);
        if (data != null)
            tag.constructWith(data);
        return tag;
    }
    static allocateWith(data) {
        const tag = ListTag_1.allocate();
        if (data != null) {
            for (const e of data) {
                tag.push(e);
            }
        }
        return tag;
    }
    [util.inspect.custom](depth, options) {
        return `ListTag ${util.inspect(this.data.toArray(), options)}`;
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(Tag.ref()))
], ListTag.prototype, "data", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t, 0x20)
], ListTag.prototype, "type", void 0);
ListTag = ListTag_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], ListTag);
exports.ListTag = ListTag;
let CompoundTagVariant = class CompoundTagVariant extends nativeclass_1.AbstractClass {
    get() {
        return Tag.from(this);
    }
    set(tag) {
        const v = tag.allocateClone();
        this.emplace(v);
        v.dispose();
    }
    emplace(tag) {
        (0, common_1.abstract)();
    }
};
CompoundTagVariant = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x30)
], CompoundTagVariant);
exports.CompoundTagVariant = CompoundTagVariant;
let CompoundTag = CompoundTag_1 = class CompoundTag extends Tag {
    value() {
        const out = {};
        for (const [key, value] of this.data.entries()) {
            out[key] = value.get().value();
        }
        return out;
    }
    size() {
        return this.data.size();
    }
    constructWith(data) {
        this.construct();
        for (const [k, v] of Object.entries(data)) {
            this.set(k, v);
        }
    }
    get(key) {
        (0, common_1.abstract)();
    }
    /**
     * @param tag it should be allocated by `Tag.allocate()`. it will be destructed inside of the function
     */
    setAllocated(key, tag) {
        (0, common_1.abstract)();
    }
    set(key, tag) {
        this.setAllocated(key, tag.allocateClone());
    }
    has(key) {
        (0, common_1.abstract)();
    }
    delete(key) {
        (0, common_1.abstract)();
    }
    clear() {
        (0, common_1.abstract)();
    }
    writeTo(writer) {
        writer.compound(this.data.entries());
    }
    static allocateWith(data) {
        const tag = CompoundTag_1.allocate();
        for (const [k, v] of Object.entries(data)) {
            tag.set(k, v);
        }
        return tag;
    }
    [nativetype_1.NativeType.ctor_copy](from) {
        this.construct();
        for (const [k, v] of from.data.entries()) {
            this.set(k, v.get());
        }
    }
    [nativetype_1.NativeType.ctor_move](from) {
        this.construct();
        for (const [k, v] of from.data.entries()) {
            this.set(k, v.get());
        }
    }
    [util.inspect.custom](depth, options) {
        const map = new Map();
        for (const [key, variant] of this.data.entries()) {
            map.set(key, variant.get());
        }
        return `CompoundTag ${util.inspect(map, options).substr(4)}`;
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxmap_1.CxxMap.make(nativetype_1.CxxString, CompoundTagVariant))
], CompoundTag.prototype, "data", void 0);
CompoundTag = CompoundTag_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], CompoundTag);
exports.CompoundTag = CompoundTag;
let IntArrayTag = IntArrayTag_1 = class IntArrayTag extends Tag {
    [nativetype_1.NativeType.ctor]() {
        this.vftable = IntArrayTag_1.vftable;
    }
    value() {
        return this.data.getAs(Int32Array);
    }
    constructWith(data) {
        this.construct();
        this.data.set(data);
    }
    set(array) {
        if (!(array instanceof Int32Array))
            array = new Int32Array(array);
        this.data.set(array);
    }
    get(idx) {
        const data = this.data;
        if (idx < 0 || idx >= data.elements)
            return undefined;
        const buffer = data.buffer; // it must be not null
        return buffer.getInt32(idx * 4);
    }
    size() {
        return this.data.elements;
    }
    toInt32Array() {
        return this.data.getAs(Int32Array);
    }
    writeTo(writer) {
        writer.intArray(this.toInt32Array());
    }
    static allocateWith(data) {
        const tag = IntArrayTag_1.allocate();
        tag.set(data);
        return tag;
    }
    [util.inspect.custom](depth, options) {
        return `IntArrayTag ${util.inspect(this.data.getAs(Int32Array), options)}`;
    }
};
IntArrayTag.vftable = symbols_1.proc["??_7IntArrayTag@@6B@"];
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(TagMemoryChunk)
], IntArrayTag.prototype, "data", void 0);
IntArrayTag = IntArrayTag_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], IntArrayTag);
exports.IntArrayTag = IntArrayTag;
var NBT;
(function (NBT) {
    class Primitive {
        stringify(indent) {
            const writer = indent != null ? new IndentedNBTWriter(indent) : new NBTWriter();
            this.writeTo(writer);
            return writer.data;
        }
        writeTo(writer) {
            // empty
        }
    }
    NBT.Primitive = Primitive;
    class Numeric extends Primitive {
        constructor(_value) {
            super();
            this._value = _value;
        }
        toExponential(fractionDigits) {
            return this._value.toExponential(fractionDigits);
        }
        toFixed(fractionDigits) {
            return this._value.toFixed(fractionDigits);
        }
        toLocaleString(locales, options) {
            return this._value.toLocaleString(locales, options);
        }
        toPrecision(precision) {
            return this._value.toPrecision(precision);
        }
        toString(radix) {
            return this._value.toString(radix);
        }
        valueOf() {
            return this._value;
        }
    }
    NBT.Numeric = Numeric;
    class Byte extends Numeric {
        constructor(n) {
            super(n & 0xff);
        }
        get value() {
            return this._value;
        }
        set value(n) {
            this._value = n & 0xff;
        }
        allocate() {
            return ByteTag.allocateWith(this._value);
        }
        stringify(indent) {
            return this._value + "b";
        }
        writeTo(writer) {
            writer.data += this._value;
            writer.data += "b";
        }
        [util.inspect.custom](depth, options) {
            return options.stylize("NBT.byte(", "special") + options.stylize(this._value, "number") + options.stylize(")", "special");
        }
    }
    NBT.Byte = Byte;
    class Short extends Numeric {
        constructor(n) {
            super((n << 16) >> 16);
        }
        get value() {
            return this._value;
        }
        set value(n) {
            this._value = (n << 16) >> 16;
        }
        allocate() {
            return ShortTag.allocateWith(this._value);
        }
        stringify(indent) {
            return this._value + "s";
        }
        writeTo(writer) {
            writer.data += this._value;
            writer.data += "s";
        }
        [util.inspect.custom](depth, options) {
            return options.stylize("NBT.short(", "special") + options.stylize(this._value, "number") + options.stylize(")", "special");
        }
    }
    NBT.Short = Short;
    class Int extends Numeric {
        constructor(n) {
            super(n | 0);
        }
        get value() {
            return this._value;
        }
        set value(n) {
            this._value = n | 0;
        }
        allocate() {
            return IntTag.allocateWith(this._value);
        }
        stringify(indent) {
            return this._value + "";
        }
        writeTo(writer) {
            writer.data += this._value;
        }
        [util.inspect.custom](depth, options) {
            return options.stylize("NBT.int(", "special") + options.stylize(this._value, "number") + options.stylize(")", "special");
        }
    }
    NBT.Int = Int;
    const INT64_AS_STR_THRESHOLD = bin_1.bin.make(0x1000000000000, 4);
    class Int64 extends Primitive {
        constructor(n) {
            super();
            this._value = n.length < 4 ? n + "\0".repeat(4 - n.length) : n.substr(0, 4);
        }
        get value() {
            return this._value;
        }
        set value(n) {
            this._value = n.length < 4 ? n + "\0".repeat(4 - n.length) : n.substr(0, 4);
        }
        allocate() {
            return Int64Tag.allocateWith(this._value);
        }
        stringify(indent) {
            return bin_1.bin.toString(this._value) + "l";
        }
        writeTo(writer) {
            writer.data += bin_1.bin.toString(this._value);
            writer.data += "l";
        }
        [util.inspect.custom](depth, options) {
            let param;
            if (bin_1.bin.compare(this._value, INT64_AS_STR_THRESHOLD) > 0) {
                const v = this._value;
                const bin64 = `"\\u${(0, util_1.hexn)(v.charCodeAt(0), 4)}\\u${(0, util_1.hexn)(v.charCodeAt(1), 4)}\\u${(0, util_1.hexn)(v.charCodeAt(2), 4)}\\u${(0, util_1.hexn)(v.charCodeAt(3), 4)}"`;
                param = options.stylize(bin64, "string");
            }
            else {
                param = options.stylize(bin_1.bin.toString(this._value), "number");
            }
            return options.stylize("NBT.int64(", "special") + param + options.stylize(")", "special");
        }
    }
    NBT.Int64 = Int64;
    class Float extends Numeric {
        constructor(n) {
            super(Math.fround(n));
        }
        get value() {
            return this._value;
        }
        set value(n) {
            this._value = Math.fround(n);
        }
        allocate() {
            return FloatTag.allocateWith(this._value);
        }
        stringify(indent) {
            return this._value + "f";
        }
        writeTo(writer) {
            writer.data += this._value;
            writer.data += "f";
        }
        [util.inspect.custom](depth, options) {
            return options.stylize("NBT.float(", "special") + options.stylize(this._value, "number") + options.stylize(")", "special");
        }
    }
    NBT.Float = Float;
    class Double extends Numeric {
        set value(n) {
            this._value = n;
        }
        get value() {
            return this._value;
        }
        allocate() {
            return DoubleTag.allocateWith(this._value);
        }
        writeTo(writer) {
            writer.data += this._value;
            writer.data += "d";
        }
        [util.inspect.custom](depth, options) {
            return options.stylize("NBT.double(", "special") + options.stylize(this._value, "number") + options.stylize(")", "special");
        }
    }
    NBT.Double = Double;
    function byte(n) {
        return new Byte(n);
    }
    NBT.byte = byte;
    function short(n) {
        return new Short(n);
    }
    NBT.short = short;
    function int(n) {
        return new Int(n);
    }
    NBT.int = int;
    function int64(n) {
        return new Int64(typeof n === "number" ? bin_1.bin.make(n, 4) : n);
    }
    NBT.int64 = int64;
    function float(n) {
        return new Float(n);
    }
    NBT.float = float;
    function double(n) {
        return new Double(n);
    }
    NBT.double = double;
    function byteArray(values) {
        return new Uint8Array(values);
    }
    NBT.byteArray = byteArray;
    function intArray(values) {
        return new Int32Array(values);
    }
    NBT.intArray = intArray;
    function end() {
        return null;
    }
    NBT.end = end;
    function isCompound(nbt) {
        if (typeof nbt !== "object")
            return false;
        if (nbt === null)
            return false;
        if (nbt instanceof Tag)
            throw TypeError("Tag instance is not allowed");
        if (nbt instanceof Int32Array)
            return false;
        if (nbt instanceof Uint8Array)
            return false;
        if (nbt instanceof Array)
            return false;
        if (nbt instanceof Primitive)
            return false;
        return true;
    }
    NBT.isCompound = isCompound;
    /**
     * it will allocate the native NBT from the JS NBT.
     * boolean -> ByteTag
     * number -> IntTag
     * null -> end
     */
    function allocate(nbt) {
        switch (typeof nbt) {
            case "boolean":
                return ByteTag.allocateWith(+nbt);
            case "number":
                return IntTag.allocateWith(nbt);
            case "string":
                return StringTag.allocateWith(nbt);
            case "object": {
                if (nbt === null) {
                    return EndTag.allocate();
                }
                if (nbt instanceof Int32Array) {
                    return IntArrayTag.allocateWith(nbt);
                }
                if (nbt instanceof Uint8Array) {
                    return ByteArrayTag.allocateWith(nbt);
                }
                if (nbt instanceof Array) {
                    const list = ListTag.allocate();
                    for (const v of nbt) {
                        list.pushAllocated(allocate(v));
                    }
                    return list;
                }
                if (nbt instanceof Primitive) {
                    return nbt.allocate();
                }
                if (nbt instanceof Tag) {
                    return nbt.allocateClone();
                }
                const allocated = CompoundTag.allocate();
                for (const [key, value] of Object.entries(nbt)) {
                    allocated.setAllocated(key, allocate(value));
                }
                return allocated;
            }
            default:
                throw TypeError(`invalid type of NBT. ${typeof nbt}`);
        }
    }
    NBT.allocate = allocate;
    /** Converts a Stringified Named Binary Tag (SNBT) string into a Named Binary Tag (NBT) tag. */
    function parse(text) {
        let p = 0;
        let lastNumberIsDecimal = false;
        function unexpectedToken() {
            if (p === text.length) {
                throw SyntaxError("Unexpected end of SNBT input");
            }
            else {
                throw SyntaxError(`Unexpected token ${text.charAt(p)} in SNBT at position ${p}`);
            }
        }
        function skipSpace() {
            nonSpaceExp.lastIndex = p;
            const res = nonSpaceExp.exec(text);
            if (res !== null) {
                p = res.index;
            }
            else {
                p = text.length;
            }
        }
        function readStringContinue(endchr) {
            let i = p;
            let next;
            for (;;) {
                next = text.indexOf(endchr, i);
                if (next === -1)
                    throw SyntaxError("Unexpected end of SNBT input");
                i = next + 1;
                const backslash = getBackslashCount(text, next);
                if ((backslash & 1) === 0) {
                    // even
                    break;
                }
            }
            const value = (0, util_1.stripSlashes)(text.substring(p, next));
            p = i;
            return value;
        }
        function readNameContinue() {
            const prev = p;
            nonVariableCharacter.lastIndex = p + 1;
            const res = nonVariableCharacter.exec(text);
            if (res !== null) {
                p = res.index;
            }
            else {
                p = text.length;
            }
            return text.substring(prev, p);
        }
        function checkToken(keyCode) {
            skipSpace();
            if (text.charCodeAt(p) !== keyCode) {
                unexpectedToken();
            }
        }
        function passToken(keyCode) {
            checkToken(keyCode);
            p++;
        }
        function passChar(keyCode) {
            if (text.charCodeAt(p) !== keyCode) {
                unexpectedToken();
            }
            p++;
        }
        function readNumberString() {
            skipSpace();
            const prev = p;
            let chr = text.charCodeAt(p);
            if (chr === 0x2d) {
                p++;
                chr = text.charCodeAt(p);
            }
            if (chr < 0x30 || chr > 0x39) {
                unexpectedToken();
            }
            p++;
            _notNumber: {
                lastNumberIsDecimal = false;
                let exponential = false;
                for (;;) {
                    const chr = text.charCodeAt(p);
                    if (0x30 <= chr && chr <= 0x39) {
                        p++;
                    }
                    else if (chr === 0x2e) {
                        // .
                        if (lastNumberIsDecimal)
                            break;
                        if (exponential)
                            break;
                        lastNumberIsDecimal = true;
                        p++;
                    }
                    else if (chr === 0x45 || chr === 0x65) {
                        // E e
                        if (exponential)
                            break;
                        exponential = true;
                        p++;
                        const next = text.charCodeAt(p);
                        if (next === 0x2b || next === 0x2d) {
                            // +-
                            p++;
                        }
                    }
                    else {
                        break _notNumber;
                    }
                }
                for (;;) {
                    const chr = text.charCodeAt(p);
                    if (0x30 <= chr && chr <= 0x39) {
                        p++;
                    }
                    else {
                        break _notNumber;
                    }
                }
            }
            return text.substring(prev, p);
        }
        function readNumberStringSuffix(suffix1, suffix2) {
            const num = readNumberString();
            switch (text.charCodeAt(p)) {
                case suffix1:
                case suffix2:
                    p++;
                    return num;
                default:
                    unexpectedToken();
            }
        }
        function readArrayContinue(reader) {
            skipSpace();
            const chr = text.charCodeAt(p);
            if (chr === 0x5d) {
                // ]
                p++;
                return [];
            }
            const array = [];
            array.push(reader());
            for (;;) {
                skipSpace();
                const chr = text.charCodeAt(p);
                switch (chr) {
                    case 0x5d: // ]
                        p++;
                        return array;
                    case 0x2c: {
                        // ,
                        p++;
                        array.push(reader());
                        break;
                    }
                    default:
                        unexpectedToken();
                }
            }
        }
        function readKeyContinue() {
            const chr = text.charCodeAt(p);
            let key;
            if (chr === 0x22) {
                // "
                p++;
                key = readStringContinue('"');
            }
            else if (chr === 0x27) {
                // '
                p++;
                key = readStringContinue("'");
            }
            else if (chr >= 0x80 || (0x41 <= chr && chr <= 0x5a) || (0x61 <= chr && chr <= 0x7a) || chr === 0x24 || chr === 0x5f) {
                // variable format
                key = readNameContinue();
            }
            else {
                unexpectedToken();
            }
            passToken(0x3a); // :
            return key;
        }
        function readValue() {
            skipSpace();
            const chr = text.charCodeAt(p);
            switch (chr) {
                case 0x22: // "
                    p++;
                    return readStringContinue('"');
                case 0x27: // '
                    p++;
                    return readStringContinue("'");
                case 0x5b: {
                    // [
                    p++;
                    skipSpace();
                    const firstchr = text.charCodeAt(p);
                    switch (firstchr) {
                        case 0x5d: // ]
                            p++;
                            return [];
                        case 0x42: // B
                            p++;
                            passToken(0x3b);
                            return new Uint8Array(readArrayContinue(() => +readNumberStringSuffix(0x42, 0x62) & 0xff));
                        case 0x49: // I
                            p++;
                            passToken(0x3b);
                            return new Int32Array(readArrayContinue(() => +readNumberString() | 0));
                        case 0x4c: // L, long array, not available, convert to List
                            p++;
                            passToken(0x3b);
                            return readArrayContinue(() => new NBT.Int64(bin_1.bin.parse(readNumberStringSuffix(0x4c, 0x6c), 10, 4)));
                        default:
                            return readArrayContinue(readValue);
                    }
                    break;
                }
                case 0x7b: {
                    // {
                    const obj = {};
                    p++;
                    skipSpace();
                    if (text.charCodeAt(p) === 0x7d) {
                        p++;
                        return obj;
                    }
                    const key = readKeyContinue();
                    obj[key] = readValue();
                    for (;;) {
                        skipSpace();
                        switch (text.charCodeAt(p)) {
                            case 0x7d: // }
                                p++;
                                return obj;
                            case 0x2c: {
                                // ,
                                p++;
                                skipSpace();
                                const key = readKeyContinue();
                                obj[key] = readValue();
                                break;
                            }
                            default:
                                unexpectedToken();
                        }
                    }
                    break;
                }
                case 0x74: // t
                    p++;
                    passChar(0x72); // r
                    passChar(0x75); // u
                    passChar(0x65); // e
                    return new NBT.Byte(1);
                case 0x66: // f
                    p++;
                    passChar(0x61); // a
                    passChar(0x6c); // l
                    passChar(0x73); // s
                    passChar(0x65); // e
                    return new NBT.Byte(0);
                default: {
                    const num = readNumberString();
                    switch (text.charCodeAt(p)) {
                        case 0x42:
                        case 0x62: // B b
                            p++;
                            return new NBT.Byte(+num);
                        case 0x53:
                        case 0x73: // S s
                            p++;
                            return new NBT.Short(+num);
                        case 0x4c:
                        case 0x6c: // L l
                            p++;
                            return new NBT.Int64(bin_1.bin.parse(num, 10, 4));
                        case 0x46:
                        case 0x66: // F f
                            p++;
                            return new NBT.Float(+num);
                        case 0x44:
                        case 0x64: // D d
                            p++;
                            return new NBT.Double(+num);
                        default: {
                            const dblValue = +num;
                            const intValue = dblValue | 0;
                            if (lastNumberIsDecimal || dblValue !== intValue)
                                return new NBT.Double(dblValue);
                            return new NBT.Int(intValue);
                        }
                    }
                }
            }
        }
        const value = readValue();
        skipSpace();
        if (text.length !== p) {
            unexpectedToken();
        }
        return value;
    }
    NBT.parse = parse;
    /** Converts a Named Binary Tag (NBT) tag to a Stringified Named Binary Tag (SNBT) string. */
    function stringify(tag, indent) {
        if (tag instanceof Tag) {
            return tag.stringify(indent);
        }
        else {
            const writer = indent != null ? new IndentedNBTWriter(indent) : new NBTWriter();
            writer.any(tag);
            return writer.data;
        }
    }
    NBT.stringify = stringify;
})(NBT = exports.NBT || (exports.NBT = {}));
const nonSpaceExp = /[^ \n\r\t]/g;
const nonVariableCharacter = /[^a-zA-Z0-9_$\u0080-\uffff]/g;
const validVariableCharacter = /^[a-zA-Z$_$\u0080-\uffff][a-zA-Z0-9_$\u0080-\uffff]*$/;
function getBackslashCount(data, i) {
    let backslashCount = -1;
    do {
        i--;
        backslashCount++;
    } while (data.charCodeAt(i) === 0x5c); // \\
    return backslashCount;
}
class NBTWriter {
    constructor() {
        this.data = "";
    }
    byteArray(array) {
        if (array.length !== 0) {
            this.data += "[B;";
            this.data += array.join("b,");
            this.data += "b]";
        }
        else {
            this.data += "[B;]";
        }
    }
    intArray(array) {
        if (array.length !== 0) {
            this.data += "[I;";
            this.data += array.join(",");
            this.data += "]";
        }
        else {
            this.data += "[I;]";
        }
    }
    list(array) {
        this.data += "[";
        let first = true;
        for (const e of array) {
            if (first)
                first = false;
            else
                this.data += ",";
            this.any(e);
        }
        this.data += "]";
    }
    compound(map) {
        this.data += "{";
        let first = true;
        for (const [k, _v] of map) {
            if (first)
                first = false;
            else
                this.data += ",";
            if (validVariableCharacter.test(k)) {
                this.data += k;
                this.data += ":";
            }
            else {
                this.data += '"';
                this.data += (0, util_1.addSlashes)(k);
                this.data += '":';
            }
            this.any(_v);
        }
        this.data += "}";
    }
    any(nbt) {
        switch (typeof nbt) {
            case "number":
                this.data += nbt;
                break;
            case "string":
                this.data += '"';
                this.data += (0, util_1.addSlashes)(nbt);
                this.data += '"';
                break;
            case "boolean":
                this.data += +nbt;
                this.data += "b";
                break;
            case "object": {
                if (nbt === null) {
                    break;
                }
                if (nbt instanceof Int32Array) {
                    this.intArray(nbt);
                }
                else if (nbt instanceof Uint8Array) {
                    this.byteArray(nbt);
                }
                else if (nbt instanceof Array) {
                    this.list(nbt);
                }
                else if (nbt instanceof NBT.Primitive) {
                    nbt.writeTo(this);
                }
                else if (nbt instanceof Tag) {
                    nbt.writeTo(this);
                }
                else if (nbt instanceof CompoundTagVariant) {
                    nbt.get().writeTo(this);
                }
                else {
                    this.compound(Object.entries(nbt));
                }
                break;
            }
            default:
                throw TypeError(`invalid type of NBT. ${typeof nbt}`);
        }
    }
}
class IndentedNBTWriter extends NBTWriter {
    constructor(indent) {
        super();
        this.data = "";
        if (typeof indent === "string") {
            this.indentOne = indent;
        }
        else {
            this.indentOne = " ".repeat(indent);
        }
        this.indentLine = "\n";
    }
    byteArray(array) {
        if (array.length !== 0) {
            this.data += "[B;";
            const indentLine = this.indentLine + this.indentOne;
            this.data += indentLine;
            this.data += array.join("b," + indentLine);
            this.data += "b";
            this.data += this.indentLine;
            this.data += "]";
        }
        else {
            this.data += "[B;]";
        }
    }
    intArray(array) {
        if (array.length !== 0) {
            this.data += "[I;";
            const indentLine = this.indentLine + this.indentOne;
            this.data += indentLine;
            this.data += array.join("," + indentLine);
            this.data += this.indentLine;
            this.data += "]";
        }
        else {
            this.data += "[I;]";
        }
    }
    list(array) {
        this.data += "[";
        const parentLine = this.indentLine;
        this.indentLine += this.indentOne;
        let first = true;
        for (const e of array) {
            if (first)
                first = false;
            else
                this.data += ",";
            this.data += this.indentLine;
            this.any(e);
        }
        this.indentLine = parentLine;
        if (!first)
            this.data += parentLine;
        this.data += "]";
    }
    compound(map) {
        this.data += "{";
        const parentLine = this.indentLine;
        this.indentLine += this.indentOne;
        let first = true;
        for (const [k, _v] of map) {
            if (first)
                first = false;
            else
                this.data += ",";
            this.data += this.indentLine;
            if (validVariableCharacter.test(k)) {
                this.data += k;
                this.data += ": ";
            }
            else {
                this.data += '"';
                this.data += (0, util_1.addSlashes)(k);
                this.data += '": ';
            }
            this.any(_v);
        }
        this.indentLine = parentLine;
        if (!first)
            this.data += parentLine;
        this.data += "}";
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTZCO0FBQzdCLGdDQUE2QjtBQUM3QixrQ0FBK0I7QUFDL0Isc0NBQXVEO0FBQ3ZELGtDQUFxRDtBQUNyRCxzQ0FBbUM7QUFDbkMsNENBQXlDO0FBQ3pDLGdEQUF1RztBQUN2Ryw4Q0FBMEk7QUFDMUksd0NBQXFDO0FBQ3JDLGtDQUF5RDtBQUN6RCx1Q0FBaUM7QUFRMUIsSUFBTSxjQUFjLEdBQXBCLE1BQU0sY0FBZSxTQUFRLHlCQUFXO0lBVTNDLENBQUMsdUJBQVUsQ0FBQyxJQUFJLENBQUM7UUFDYixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxDQUFDLHVCQUFVLENBQUMsSUFBSSxDQUFDO1FBQ2IsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN4QixJQUFJLEdBQUcsS0FBSyxJQUFJO1lBQUUsV0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsQ0FBQyx1QkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQWlCO1FBQ3BDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUMzQixNQUFNLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDeEIsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ2pCLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFD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