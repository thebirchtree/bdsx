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
                        break;
                    }
                    else if (chr === 0x45 || chr === 0x65) {
                        // E e
                        if (exponential)
                            break;
                        exponential = true;
                        p++;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNkJBQTZCO0FBQzdCLGdDQUE2QjtBQUM3QixrQ0FBK0I7QUFDL0Isc0NBQXVEO0FBQ3ZELGtDQUFxRDtBQUNyRCxzQ0FBbUM7QUFDbkMsNENBQXlDO0FBQ3pDLGdEQUF1RztBQUN2Ryw4Q0FBMEk7QUFDMUksd0NBQXFDO0FBQ3JDLGtDQUF5RDtBQVFsRCxJQUFNLGNBQWMsR0FBcEIsTUFBTSxjQUFlLFNBQVEseUJBQVc7SUFVM0MsQ0FBQyx1QkFBVSxDQUFDLElBQUksQ0FBQztRQUNiLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUNELENBQUMsdUJBQVUsQ0FBQyxJQUFJLENBQUM7UUFDYixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3hCLElBQUksR0FBRyxLQUFLLElBQUk7WUFBRSxXQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFDRCxDQUFDLHVCQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBaUI7UUFDcEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQzNCLE1BQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUN4QixJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDakIsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLElB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