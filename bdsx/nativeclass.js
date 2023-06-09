"use strict";
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.vectorDeletingDestructor = exports.AbstractMantleClass = exports.AbstractClass = exports.nativeClassUtil = exports.NativeArray = exports.nativeClass = exports.nativeField = exports.NativeStruct = exports.NativeClass = void 0;
const util = require("util");
const capi_1 = require("./capi");
const circulardetector_1 = require("./circulardetector");
const common_1 = require("./common");
const core_1 = require("./core");
const makefunc_1 = require("./makefunc");
const mangle_1 = require("./mangle");
const nativetype_1 = require("./nativetype");
const singleton_1 = require("./singleton");
const source_map_support_1 = require("./source-map-support");
const util_1 = require("./util");
const isNativeClass = Symbol("isNativeClass");
const isSealed = Symbol("isSealed");
const fieldmap = Symbol("fieldmap");
const resolver = Symbol("NativeClass.resolver");
function accessor(key) {
    if (typeof key === "number")
        return `[${key}]`;
    if (/^[a-zA-Z_$][a-zA-Z_$]*$/.test(key))
        return `.${key}`;
    return `[${JSON.stringify(key)}]`;
}
function generateFunction(builder, clazz, superproto) {
    function override(ctx, type, fnname) {
        const superfn = superproto[type];
        const manualfn = clazz.prototype[type];
        if (superfn === abstractClassError) {
            ctx.used = false;
        }
        else if (ctx.used) {
            if (superproto[type] !== common_1.emptyFunc) {
                ctx.code = `superproto[NativeType.${fnname}].call(this);\n` + ctx.code;
            }
            if (superfn !== manualfn) {
                const funcname = builder.import(manualfn);
                ctx.code += `${funcname}.call(this);\n`;
            }
            let prefix = "\nfunction(){\n";
            if (ctx.ptrUsed)
                prefix += "const ptr=this.add();\n";
            ctx.code = prefix + ctx.code;
        }
        else if (clazz.prototype.hasOwnProperty(type)) {
            clazz.prototype[type] = function () {
                superfn.call(this);
                manualfn.call(this);
            };
        }
    }
    override(builder.ctor, nativetype_1.NativeType.ctor, "ctor");
    override(builder.dtor, nativetype_1.NativeType.dtor, "dtor");
    const hasCtorCopy = clazz.prototype.hasOwnProperty(nativetype_1.NativeType.ctor_copy);
    if (builder.ctor_copy.used) {
        if (hasCtorCopy) {
            builder.ctor_copy.used = false;
        }
        else {
            let code = "\nfunction(o){\n";
            if (builder.ctor_copy.ptrUsed)
                code += "const ptr=this.add();\nconst optr=o.add();\n";
            if (superproto[nativetype_1.NativeType.ctor_copy] !== common_1.emptyFunc) {
                code += `superproto[NativeType.ctor_copy].call(this,o);\n`;
            }
            code += builder.ctor_copy.code;
            builder.ctor_copy.code = code;
        }
    }
    if (builder.ctor_move.used) {
        if (clazz.prototype.hasOwnProperty(nativetype_1.NativeType.ctor_move)) {
            builder.ctor_move.used = false;
        }
        else if (hasCtorCopy) {
            clazz.prototype[nativetype_1.NativeType.ctor_move] = clazz.prototype[nativetype_1.NativeType.ctor_copy];
            builder.ctor_move.used = false;
        }
        else {
            let code = "\nfunction(o){\n";
            if (builder.ctor_move.ptrUsed)
                code += "const ptr=this.add();\nconst optr=o.add();\n";
            if (superproto[nativetype_1.NativeType.ctor_move] !== common_1.emptyFunc) {
                code += `superproto[NativeType.ctor_move].call(this,o);\n`;
            }
            code += builder.ctor_move.code;
            builder.ctor_move.code = code;
        }
    }
    const list = [builder.ctor, builder.dtor, builder.ctor_copy, builder.ctor_move];
    let out = "\nconst [";
    for (const imp of builder.imports.values()) {
        out += imp;
        out += ",";
    }
    out += "NativeType,superproto] = imp;\nreturn [";
    for (const item of list) {
        if (item.used) {
            out += item.code;
            out += "},";
        }
        else {
            out += "null,";
        }
    }
    out += "];";
    const imports = [...builder.imports.keys(), nativetype_1.NativeType, superproto];
    return new Function("imp", out)(imports);
}
class StructureDefinition {
    constructor(supercls) {
        this.bitoffset = 0;
        this.bitTargetSize = 0;
        this.fields = {};
        this.eof = supercls[nativetype_1.NativeType.size];
        this.align = supercls[nativetype_1.NativeType.align];
    }
    static defaultDefine(clazz, opts) {
        mangle_1.mangle.update(clazz, opts);
        const superclass = clazz.__proto__;
        clazz[core_1.StructurePointer.contentSize] =
            clazz.prototype[nativetype_1.NativeType.size] =
                clazz[nativetype_1.NativeType.size] =
                    opts.size === undefined ? superclass[nativetype_1.NativeType.size] : opts.size;
        let align = opts.align == null ? superclass[nativetype_1.NativeType.align] : opts.align;
        if (opts.minimalAlign != null && opts.minimalAlign > align)
            align = opts.minimalAlign;
        clazz[nativetype_1.NativeType.align] = align;
        sealClass(clazz);
    }
    define(clazz, opts) {
        if (opts.size == null) {
            if (opts.size === null) {
                this.eof = null;
            }
            else {
                opts.size = this.eof !== null ? (((this.eof + this.align - 1) / this.align) | 0) * this.align : null;
            }
        }
        else {
            if (this.eof !== null) {
                if (this.eof > opts.size)
                    throw Error(`field offsets are bigger than the class size. fields_end=${this.eof}, size=${opts.size}`);
            }
            this.eof = opts.size;
        }
        if (opts.align != null)
            this.align = opts.align;
        else
            opts.align = this.align;
        StructureDefinition.defaultDefine(clazz, opts);
        clazz[fieldmap] = this.fields;
        const propmap = new nativetype_1.NativeDescriptorBuilder();
        for (const [key, info] of Object.entries(this.fields)) {
            info.type[nativetype_1.NativeType.descriptor](propmap, key, info);
        }
        const supercls = clazz.__proto__;
        const superproto = supercls.prototype;
        const superfield = supercls[fieldmap];
        Object.setPrototypeOf(this.fields, superfield || null);
        Object.freeze(this.fields);
        const clazzproto = clazz.prototype;
        if (!(clazzproto instanceof NativeStruct)) {
            const [ctor, dtor, ctor_copy, ctor_move] = generateFunction(propmap, clazz, superproto);
            if (ctor !== null && clazzproto[nativetype_1.NativeType.ctor] !== abstractClassError) {
                clazzproto[nativetype_1.NativeType.ctor] = ctor;
            }
            if (dtor !== null && clazzproto[nativetype_1.NativeType.dtor] !== abstractClassError) {
                clazzproto[nativetype_1.NativeType.dtor] = dtor;
            }
            if (ctor_copy !== null && clazzproto[nativetype_1.NativeType.ctor_copy] !== abstractClassError) {
                clazzproto[nativetype_1.NativeType.ctor_copy] = ctor_copy;
            }
            if (clazzproto[nativetype_1.NativeType.ctor_copy] !== callCtorCopyForAbstractClass) {
                if (ctor_move !== null) {
                    clazzproto[nativetype_1.NativeType.ctor_move] = ctor_move;
                }
                else {
                    clazzproto[nativetype_1.NativeType.ctor_move] = callCtorCopy;
                }
            }
        }
        Object.defineProperties(clazzproto, propmap.desc);
    }
    field(key, type, fieldOffset, bitField) {
        if ((0, util_1.isBaseOf)(type, NativeClass)) {
            sealClass(type);
        }
        const alignofType = type[nativetype_1.NativeType.align];
        if (alignofType > this.align)
            this.align = alignofType;
        let offset;
        let relative;
        let ghost = false;
        let noInitialize = false;
        let constValue = false;
        if (fieldOffset != null) {
            if (typeof fieldOffset === "number") {
                offset = fieldOffset;
            }
            else {
                const opts = fieldOffset;
                if (opts.relative) {
                    relative = opts.offset;
                }
                else {
                    offset = opts.offset;
                }
                bitField = opts.bitMask;
                ghost = opts.ghost || false;
                constValue = opts.const || false;
                if (ghost)
                    noInitialize = true;
                else
                    noInitialize = opts.noInitialize || false;
            }
        }
        if (offset == null) {
            if (this.eof === null) {
                throw Error("Cannot set a field without the offset, if the sizeof previous field or super class is unknown");
            }
            offset = (((this.eof + alignofType - 1) / alignofType) | 0) * alignofType;
        }
        if (relative != null) {
            offset += relative;
        }
        const sizeofType = type[nativetype_1.NativeType.size];
        if (sizeofType === null) {
            if (bitField != null) {
                throw Error(`${type.name} does not support the bit mask`);
            }
            this.fields[key] = {
                type,
                offset,
                ghost,
                noInitialize,
                bitmask: null,
                const: constValue,
            };
            if (!ghost)
                this.eof = null;
        }
        else {
            let bitmask = null;
            let nextOffset = offset;
            if (bitField != null) {
                if (!(type instanceof nativetype_1.NativeType) || !type.supportsBitMask()) {
                    throw Error(`${type.name} does not support the bit mask`);
                }
                const maxBits = sizeofType * 8;
                if (bitField >= maxBits)
                    throw Error(`Too big bit mask, ${type.name} maximum is ${maxBits}`);
                const nextBitOffset = this.bitoffset + bitField;
                let shift = 0;
                if (this.bitoffset === 0 || this.bitTargetSize !== sizeofType || nextBitOffset > maxBits) {
                    // next bit field
                    if (!ghost)
                        this.bitoffset = bitField;
                    nextOffset = offset + sizeofType;
                }
                else {
                    offset -= sizeofType;
                    shift = this.bitoffset;
                    if (!ghost)
                        this.bitoffset = nextBitOffset;
                }
                if (!ghost)
                    this.bitTargetSize = sizeofType;
                const mask = ((1 << bitField) - 1) << shift;
                bitmask = [shift, mask];
            }
            else {
                if (!ghost) {
                    this.bitoffset = 0;
                    this.bitTargetSize = 0;
                }
                nextOffset = offset + sizeofType;
            }
            this.fields[key] = {
                type,
                offset,
                ghost,
                noInitialize,
                bitmask,
                const: constValue,
            };
            if (!ghost && this.eof !== null && nextOffset > this.eof) {
                this.eof = nextOffset;
            }
        }
    }
}
const structures = new WeakMap();
function ptrAs(ptr, type) {
    return ptr instanceof type ? ptr : ptr.as(type);
}
class NativeClass extends core_1.StructurePointer {
    static isNativeClassType(type) {
        return isNativeClass in type;
    }
    [(_a = nativetype_1.NativeType.size, _b = nativetype_1.NativeType.align, _c = core_1.StructurePointer.contentSize, _d = isNativeClass, _e = isSealed, nativetype_1.NativeType.size, nativetype_1.NativeType.ctor)]() {
        // empty
    }
    [nativetype_1.NativeType.dtor]() {
        // empty
    }
    [nativetype_1.NativeType.ctor_copy](from) {
        // empty
    }
    [nativetype_1.NativeType.ctor_move](from) {
        // empty
    }
    [nativetype_1.NativeType.setter](from) {
        if (this.equalsptr(from))
            return; // self setting
        this[nativetype_1.NativeType.dtor]();
        this[nativetype_1.NativeType.ctor_copy](from);
    }
    static [nativetype_1.NativeType.ctor](ptr) {
        ptrAs(ptr, this)[nativetype_1.NativeType.ctor]();
    }
    static [nativetype_1.NativeType.dtor](ptr) {
        ptrAs(ptr, this)[nativetype_1.NativeType.dtor]();
    }
    static [nativetype_1.NativeType.ctor_copy](to, from) {
        ptrAs(to, this)[nativetype_1.NativeType.ctor_copy](ptrAs(from, this));
    }
    static [nativetype_1.NativeType.ctor_move](to, from) {
        ptrAs(to, this)[nativetype_1.NativeType.ctor_move](ptrAs(from, this));
    }
    static [nativetype_1.NativeType.setter](ptr, value, offset) {
        const nptr = ptr.addAs(this, offset);
        nptr[nativetype_1.NativeType.setter](value);
    }
    static [nativetype_1.NativeType.getter](ptr, offset) {
        return ptr.addAs(this, offset);
    }
    static [nativetype_1.NativeType.descriptor](builder, key, info) {
        const { offset, noInitialize } = info;
        const type = this;
        builder.desc[key] = {
            configurable: true,
            get() {
                const value = type[nativetype_1.NativeType.getter](this, offset);
                Object.defineProperty(this, key, { value });
                return value;
            },
        };
        if (noInitialize)
            return;
        if (type[nativetype_1.NativeType.ctor] !== common_1.emptyFunc) {
            builder.ctor.used = true;
            builder.ctor.code += `this${accessor(key)}[NativeType.ctor]();\n`;
        }
        if (type[nativetype_1.NativeType.dtor] !== common_1.emptyFunc) {
            builder.dtor.used = true;
            builder.dtor.code += `this${accessor(key)}[NativeType.dtor]();\n`;
        }
        builder.ctor_copy.used = true;
        builder.ctor_copy.code += `this${accessor(key)}[NativeType.ctor_copy](o${accessor(key)});\n`;
        builder.ctor_move.used = true;
        builder.ctor_move.code += `this${accessor(key)}[NativeType.ctor_move](o${accessor(key)});\n`;
    }
    /**
     * call the constructor.
     * alias of \[NativeType.ctor]() and \[Native.ctor_copy]();
     */
    construct(copyFrom) {
        if (copyFrom == null) {
            this[nativetype_1.NativeType.ctor]();
        }
        else {
            this[nativetype_1.NativeType.ctor_copy](copyFrom);
        }
    }
    /**
     * call the destructor.
     * alias of \[NativeType.dtor]();
     */
    destruct() {
        this[nativetype_1.NativeType.dtor]();
    }
    /**
     * Combination of allocating and constructing.
     *
     * const inst = new Class(true);
     * inst.construct();
     */
    static construct(copyFrom) {
        const inst = new this(true);
        inst.construct(copyFrom);
        return inst;
    }
    /**
     * allocating with malloc and constructing.
     *
     * const inst = capi.malloc(size).as(Class);
     * inst.construct();
     */
    static allocate(copyFrom) {
        const clazz = this;
        const inst = capi_1.capi.malloc(clazz[nativetype_1.NativeType.size]).as(clazz);
        inst.construct(copyFrom);
        return inst;
    }
    static next(ptr, count) {
        const clazz = this;
        const size = clazz[core_1.StructurePointer.contentSize];
        if (size === null) {
            throw Error("Cannot call the next with the unknown sized structure");
        }
        return ptr.addAs(this, count * size);
    }
    /**
     * Cannot construct & Unknown size
     */
    static abstract(fields, defineSize, defineAlign) {
        const clazz = this;
        clazz.define(fields, defineSize, defineAlign, true);
    }
    static define(fields, defineSize, defineAlign = null, abstract = false) {
        const clazz = this;
        if (clazz.hasOwnProperty(isSealed)) {
            throw Error("Cannot define the structure of the already used");
        }
        const superclass = clazz.__proto__;
        sealClass(superclass);
        const def = new StructureDefinition(superclass);
        structures.set(clazz, def);
        for (const [key, type] of Object.entries(fields)) {
            if (type instanceof Array) {
                def.field(key, type[0], type[1]);
            }
            else {
                def.field(key, type);
            }
        }
        let opts;
        if (defineSize === undefined) {
            opts = {};
        }
        else if (typeof defineSize === "number" || defineSize === null) {
            opts = { size: defineSize };
        }
        else {
            opts = defineSize;
        }
        if (abstract) {
            def.eof = null;
            if (opts.size === undefined)
                opts.size = null;
        }
        if (defineAlign !== null)
            def.align = defineAlign;
        def.define(clazz, opts);
    }
    static defineAsUnion(fields, abstract = false) {
        const clazz = this;
        for (const [key, item] of Object.entries(fields)) {
            if (!(item instanceof Array)) {
                fields[key] = [item, 0];
            }
        }
        return clazz.define(fields, undefined, undefined, abstract);
    }
    static ref() {
        return singleton_1.Singleton.newInstance(NativeClass, this, () => makeReference(this));
    }
    static offsetOf(field) {
        return this[fieldmap][field].offset;
    }
    static typeOf(field) {
        return this[fieldmap][field].type;
    }
    static keys() {
        return Object.keys(this[fieldmap]);
    }
    /**
     * call the destructor and capi.free
     *
     * inst.destruct();
     * capi.free(inst);
     */
    static delete(item) {
        item.destruct();
        capi_1.capi.free(item);
    }
    static from(ptr) {
        if (ptr == null)
            return null;
        return ptr.as(this);
    }
    static setResolver(fn) {
        const cls = this;
        cls[makefunc_1.makefunc.getter] = resolverGetter;
        cls[makefunc_1.makefunc.getFromParam] = resolverGetFromParam;
        cls[resolver] = fn;
        cls.from = fn;
    }
    /**
     * @deprecated
     */
    _toJsonOnce(allocator) {
        return circulardetector_1.CircularDetector.check(this, allocator, obj => this[nativeClassUtil.inspectFields](obj));
    }
    toJSON() {
        const obj = circulardetector_1.CircularDetector.check(this, () => ({}), obj => {
            if (this[nativeClassUtil.inspectFields] !== inspectNativeFields)
                this[nativeClassUtil.inspectFields](obj);
            inspectNativeFields.call(this, obj);
        });
        for (const [key, v] of Object.entries(obj)) {
            if (v != null)
                obj[key] = v.toJSON != null ? v.toJSON() : v;
        }
        return obj;
    }
    [util.inspect.custom](depth, options) {
        try {
            return circulardetector_1.CircularDetector.check(this, () => new (circulardetector_1.CircularDetector.makeTemporalClass(this.constructor.name, this, options))(), obj => this[nativeClassUtil.inspectFields](obj));
        }
        catch (err) {
            (0, source_map_support_1.remapAndPrintError)(err);
            return "Error: " + err.message;
        }
    }
}
exports.NativeClass = NativeClass;
NativeClass[_a] = 0;
NativeClass[_b] = 1;
NativeClass[_c] = 0;
NativeClass[_d] = true;
NativeClass[_e] = true;
function inspectNativeFields(obj) {
    const fields = this.constructor[fieldmap];
    for (const field in fields) {
        let value;
        try {
            value = this[field];
        }
        catch (err) {
            value = "Error: " + err.message;
        }
        obj[field] = value;
    }
}
/**
 * the class that does not need a constructor or destructor
 */
class NativeStruct extends NativeClass {
    /**
     * @deprecated no need to use
     */
    [nativetype_1.NativeType.ctor]() {
        // empty
    }
    /**
     * @deprecated no need to use
     */
    [nativetype_1.NativeType.dtor]() {
        // empty
    }
    [nativetype_1.NativeType.ctor_copy](from) {
        this.copyFrom(from, this[nativetype_1.NativeType.size]);
    }
    [nativetype_1.NativeType.ctor_move](from) {
        this.copyFrom(from, this[nativetype_1.NativeType.size]);
    }
    [nativetype_1.NativeType.setter](from) {
        this.copyFrom(from, this[nativetype_1.NativeType.size]);
    }
    /**
     * call the constructor.
     * alias of \[NativeType.ctor]() and \[Native.ctor_copy]();
     */
    construct(copyFrom) {
        if (copyFrom == null)
            return;
        this[nativetype_1.NativeType.ctor_copy](copyFrom);
    }
    /**
     * @deprecated no need to use
     */
    destruct() {
        // empty
    }
    static [nativetype_1.NativeType.ctor_copy](to, from) {
        to.copyFrom(from, this[nativetype_1.NativeType.size]);
    }
    static [nativetype_1.NativeType.ctor_move](to, from) {
        to.copyFrom(from, this[nativetype_1.NativeType.size]);
    }
    static [nativetype_1.NativeType.setter](ptr, value, offset) {
        ptr.copyFrom(value, this[nativetype_1.NativeType.size], offset);
    }
    static [nativetype_1.NativeType.getter](ptr, offset) {
        return ptr.addAs(this, offset);
    }
}
exports.NativeStruct = NativeStruct;
function resolverGetter(ptr, offset) {
    return this[resolver](ptr.add(offset), this);
}
function resolverGetFromParam(stackptr, offset) {
    return this[resolver](stackptr.getNullablePointer(offset), this);
}
function genCallCtorCopy() {
    function callCtorCopy(other) {
        this[nativetype_1.NativeType.ctor_copy](other);
    }
    return callCtorCopy;
}
const callCtorCopy = genCallCtorCopy();
const callCtorCopyForAbstractClass = genCallCtorCopy();
NativeClass.prototype[nativetype_1.NativeType.size] = 0;
NativeClass.prototype[nativetype_1.NativeType.ctor] = common_1.emptyFunc;
NativeClass.prototype[nativetype_1.NativeType.dtor] = common_1.emptyFunc;
NativeClass.prototype[nativetype_1.NativeType.ctor_copy] = common_1.emptyFunc;
NativeClass.prototype[nativetype_1.NativeType.ctor_move] = common_1.emptyFunc;
function sealClass(cls) {
    let node = cls;
    while (!node.hasOwnProperty(isSealed)) {
        node[isSealed] = true;
        node = node.__proto__;
    }
}
function nativeField(type, fieldOffset, bitMask) {
    return (obj, key) => {
        const clazz = obj.constructor;
        let def = structures.get(clazz);
        if (def == null)
            structures.set(clazz, (def = new StructureDefinition(clazz.__proto__)));
        def.field(key, type, fieldOffset, bitMask);
    };
}
exports.nativeField = nativeField;
function nativeClass(size, align = null) {
    return (clazz) => {
        const def = structures.get(clazz);
        if (typeof size === "number" || size == null) {
            size = { size, align };
        }
        else if (align != null) {
            size.align = align;
        }
        if (def == null) {
            StructureDefinition.defaultDefine(clazz, size);
        }
        else {
            structures.delete(clazz);
            def.define(clazz, size);
        }
    };
}
exports.nativeClass = nativeClass;
class NativeArray extends core_1.PrivatePointer {
    static [nativetype_1.NativeType.getter](ptr, offset) {
        return ptr.addAs(this, offset);
    }
    static [nativetype_1.NativeType.setter](ptr, value, offset) {
        throw Error("non assignable");
    }
    static [nativetype_1.NativeType.descriptor](builder, key, info) {
        const { offset, noInitialize } = info;
        const type = this;
        builder.desc[key] = {
            configurable: true,
            get() {
                const value = this.addAs(type, offset);
                Object.defineProperty(this, key, { value });
                return value;
            },
        };
        if (noInitialize)
            return;
        if (type[nativetype_1.NativeType.ctor] !== common_1.emptyFunc) {
            builder.ctor.used = true;
            builder.ctor.code += `this${accessor(key)}[NativeType.ctor]();\n`;
        }
        if (type[nativetype_1.NativeType.dtor] !== common_1.emptyFunc) {
            builder.dtor.used = true;
            builder.dtor.code += `this${accessor(key)}[NativeType.dtor]();\n`;
        }
        builder.ctor_copy.used = true;
        builder.ctor_copy.code += `this${accessor(key)}[NativeType.ctor_copy](o${accessor(key)});\n`;
        builder.ctor_move.used = true;
        builder.ctor_move.code += `this${accessor(key)}[NativeType.ctor_move](o${accessor(key)});\n`;
    }
    get(i) {
        const offset = i * this.componentType[nativetype_1.NativeType.size];
        return this.componentType[nativetype_1.NativeType.getter](this, offset);
    }
    toArray() {
        const n = this.length;
        const out = new Array(n);
        for (let i = 0; i < n; i++) {
            out[i] = this.get(i);
        }
        return out;
    }
    *[(_f = nativetype_1.NativeType.align, Symbol.iterator)]() {
        const n = this.length;
        for (let i = 0; i < n; i++) {
            yield this.get(i);
        }
    }
    static make(itemType, count) {
        var _g, _h, _j;
        const itemSize = itemType[nativetype_1.NativeType.size];
        if (itemSize === null)
            throw Error("Unknown size of item. NativeArray needs item size");
        const propmap = new nativetype_1.NativeDescriptorBuilder();
        propmap.desc.length = { value: count };
        let off = 0;
        for (let i = 0; i < count; i++) {
            itemType[nativetype_1.NativeType.descriptor](propmap, i, {
                offset: off,
                bitmask: null,
                ghost: false,
                noInitialize: false,
                const: false,
            });
            off += itemSize;
        }
        class NativeArrayImpl extends NativeArray {
            static isTypeOf(v) {
                return v === null || v instanceof NativeArrayImpl;
            }
        }
        _g = nativetype_1.NativeType.size, _h = core_1.StructurePointer.contentSize, _j = nativetype_1.NativeType.align, nativetype_1.NativeType.size;
        NativeArrayImpl[_g] = off;
        NativeArrayImpl[_h] = off;
        NativeArrayImpl[_j] = itemType[nativetype_1.NativeType.align];
        NativeArrayImpl.prototype[nativetype_1.NativeType.size] = off;
        NativeArrayImpl.prototype.length = count;
        NativeArrayImpl.prototype.componentType = itemType;
        Object.defineProperties(NativeArrayImpl.prototype, propmap.desc);
        return NativeArrayImpl;
    }
}
exports.NativeArray = NativeArray;
NativeArray[_f] = 1;
exports.MantleClass = NativeClass;
function makeReference(type) {
    const clazz = type;
    return new nativetype_1.NativeType(mangle_1.mangle.pointer(clazz.symbol), type.name + "*", 8, 8, clazz.isTypeOf, clazz.isTypeOfWeak, (stackptr, offset) => clazz[makefunc_1.makefunc.getFromParam](stackptr, offset), (stackptr, v, offset) => stackptr.setPointer(v, offset));
}
var nativeClassUtil;
(function (nativeClassUtil) {
    function bindump(object) {
        const size = object[nativetype_1.NativeType.size];
        const ptr = object.as(core_1.NativePointer);
        for (let i = 0; i < size; i += 8) {
            const remaining = Math.min(size - i, 8);
            let str = "";
            for (let i = 0; i < remaining; i++) {
                let b = ptr.readUint8().toString(16);
                if (b.length === 1)
                    b = "0" + b;
                str = b + str;
            }
            console.log(str);
        }
    }
    nativeClassUtil.bindump = bindump;
    nativeClassUtil.inspectFields = Symbol("inspect-fields");
})(nativeClassUtil = exports.nativeClassUtil || (exports.nativeClassUtil = {}));
NativeClass.prototype[nativeClassUtil.inspectFields] = inspectNativeFields;
/**
 * this class is not constructible.
 * if the NativeClass does not have full fields. Please inherit it instead of NativeClass.
 */
class AbstractClass extends NativeClass {
}
exports.AbstractClass = AbstractClass;
exports.AbstractMantleClass = AbstractClass;
function abstractClassError() {
    throw Error(`${this.constructor.name} is not constructible. it needs to provide the constructor or the destructor for using them`);
}
const abstractproto = AbstractClass.prototype;
abstractproto[nativetype_1.NativeType.ctor] = abstractClassError;
abstractproto[nativetype_1.NativeType.dtor] = abstractClassError;
abstractproto[nativetype_1.NativeType.ctor_copy] = abstractClassError;
abstractproto[nativetype_1.NativeType.ctor_move] = callCtorCopyForAbstractClass;
const vectorDeletingDestructorImpl = makefunc_1.makefunc.js([0, 0], nativetype_1.void_t, { this: NativeClass }, nativetype_1.int32_t);
function vectorDeletingDestructor() {
    vectorDeletingDestructorImpl.call(this, 0);
}
exports.vectorDeletingDestructor = vectorDeletingDestructor;
(function (vectorDeletingDestructor) {
    function deleteIt() {
        vectorDeletingDestructorImpl.call(this, 1);
    }
    vectorDeletingDestructor.deleteIt = deleteIt;
})(vectorDeletingDestructor = exports.vectorDeletingDestructor || (exports.vectorDeletingDestructor = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuYXRpdmVjbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsNkJBQTZCO0FBQzdCLGlDQUE4QjtBQUM5Qix5REFBc0Q7QUFDdEQscUNBQTZFO0FBQzdFLGlDQUFxRztBQUNyRyx5Q0FBc0M7QUFDdEMscUNBQWtDO0FBQ2xDLDZDQUEwRjtBQUMxRiwyQ0FBd0M7QUFDeEMsNkRBQTBEO0FBQzFELGlDQUFrQztBQWVsQyxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDOUMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNwQyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUVoRCxTQUFTLFFBQVEsQ0FBQyxHQUFvQjtJQUNsQyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVE7UUFBRSxPQUFPLElBQUksR0FBRyxHQUFHLENBQUM7SUFDL0MsSUFBSSx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUUsT0FBTyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQzFELE9BQU8sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7QUFDdEMsQ0FBQztBQW9CRCxTQUFTLGdCQUFnQixDQUFDLE9BQWdDLEVBQUUsS0FBZ0IsRUFBRSxVQUF1QjtJQUNqRyxTQUFTLFFBQVEsQ0FBQyxHQUF1QyxFQUFFLElBQXFELEVBQUUsTUFBYztRQUM1SCxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxJQUFJLE9BQU8sS0FBSyxrQkFBa0IsRUFBRTtZ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