"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GslSpanToArray = exports.CxxStringWith8Bytes = exports.bin128_t = exports.bin64_t = exports.CxxStringView = exports.GslStringSpan = exports.CxxString = exports.float64_t = exports.float32_t = exports.int64_as_float_t = exports.long_t = exports.int32_t = exports.int16_t = exports.int8_t = exports.uint64_as_float_t = exports.ulong_t = exports.uint32_t = exports.uint16_t = exports.uint8_t = exports.bool_t = exports.void_t = exports.CommandParameterNativeType = exports.NativeType = exports.NativeDescriptorBuilder = void 0;
const symbols_1 = require("./bds/symbols");
const commandparam_1 = require("./commandparam");
const common_1 = require("./common");
const core_1 = require("./core");
const makefunc_1 = require("./makefunc");
const mangle_1 = require("./mangle");
const singleton_1 = require("./singleton");
var NativeTypeFn;
(function (NativeTypeFn) {
    NativeTypeFn.ctor_copy = Symbol("ctor_copy");
    NativeTypeFn.isNativeClass = Symbol("isNativeClass");
    NativeTypeFn.descriptor = Symbol("descriptor");
    NativeTypeFn.bitGetter = Symbol("bitGetter");
    NativeTypeFn.bitSetter = Symbol("bitSetter");
})(NativeTypeFn || (NativeTypeFn = {}));
function defaultCopy(size) {
    return (to, from) => {
        to.copyFrom(from, size);
    };
}
class NativeDescriptorBuilder {
    constructor() {
        this.desc = {};
        this.params = [];
        this.imports = new Map();
        this.ctor = new NativeDescriptorBuilder.UseContextCtor();
        this.dtor = new NativeDescriptorBuilder.UseContextDtor();
        this.ctor_copy = new NativeDescriptorBuilder.UseContextCtorCopy();
        this.ctor_move = new NativeDescriptorBuilder.UseContextCtorCopy();
        this.nameCounter = 0;
    }
    /**
     * @deprecated dummy
     */
    importType(type) {
        return this.import(type);
    }
    import(type) {
        const oname = this.imports.get(type);
        if (oname != null)
            return oname;
        const name = "_" + (this.nameCounter++).toString(36);
        this.imports.set(type, name);
        return name;
    }
}
exports.NativeDescriptorBuilder = NativeDescriptorBuilder;
(function (NativeDescriptorBuilder) {
    class UseContext {
        constructor() {
            this.code = "";
            this.used = false;
            this.offset = 0;
            this.ptrUsed = false;
        }
        setPtrOffset(offset) {
            this.used = true;
            const delta = offset - this.offset;
            if (delta !== 0)
                this.code += `ptr.move(${delta});\n`;
            this.offset = offset;
        }
    }
    NativeDescriptorBuilder.UseContext = UseContext;
    class UseContextCtor extends UseContext {
    }
    NativeDescriptorBuilder.UseContextCtor = UseContextCtor;
    class UseContextDtor extends UseContext {
    }
    NativeDescriptorBuilder.UseContextDtor = UseContextDtor;
    class UseContextCtorCopy extends UseContext {
        setPtrOffset(offset) {
            this.used = true;
            const delta = offset - this.offset;
            if (delta !== 0)
                this.code += `ptr.move(${delta});\noptr.move(${delta});\n`;
            this.offset = offset;
        }
    }
    NativeDescriptorBuilder.UseContextCtorCopy = UseContextCtorCopy;
})(NativeDescriptorBuilder = exports.NativeDescriptorBuilder || (exports.NativeDescriptorBuilder = {}));
function numericBitGetter(ptr, shift, mask, offset) {
    const value = this[makefunc_1.makefunc.getter](ptr, offset);
    return (value & mask) >> shift;
}
function numericBitSetter(ptr, value, shift, mask, offset) {
    value = ((value << shift) & mask) | (this[NativeType.getter](ptr, offset) & ~mask);
    this[NativeType.setter](ptr, value, offset);
}
class NativeType extends makefunc_1.makefunc.ParamableT {
    constructor(
    /**
     * pdb symbol name. it's used by type_id.pdbimport
     */
    symbol, 
    /**
     * name for displaying
     */
    name, size, align, 
    /**
     * js type checker for overloaded functions
     * and parameter checking
     */
    isTypeOf, 
    /**
     * isTypeOf but allow downcasting
     */
    isTypeOfWeak, 
    /**
     * getter with the pointer
     */
    get, 
    /**
     * setter with the pointer
     */
    set, 
    /**
     * assembly for casting the native value to the js value
     */
    getFromParam = get, 
    /**
     * assembly for casting the js value to the native value
     */
    setToParam = set, 
    /**
     * constructor
     */
    ctor = common_1.emptyFunc, 
    /**
     * destructor
     */
    dtor = common_1.emptyFunc, 
    /**
     * copy constructor, https://en.cppreference.com/w/cpp/language/copy_constructor
     */
    ctor_copy = defaultCopy(size), 
    /**
     * move constructor, https://en.cppreference.com/w/cpp/language/move_constructor
     * it uses the copy constructor by default
     */
    ctor_move = ctor_copy) {
        super(name, getFromParam, setToParam, isTypeOf, isTypeOfWeak);
        this.symbol = symbol;
        this[_a] = common_1.abstract;
        this[_b] = common_1.abstract;
        this[NativeType.size] = size;
        this[NativeType.align] = align;
        this[NativeType.getter] = get;
        this[NativeType.setter] = set;
        this[NativeType.ctor] = ctor;
        this[NativeType.dtor] = dtor;
        this[NativeType.ctor_copy] = ctor_copy;
        this[NativeType.ctor_move] = ctor_move;
    }
    supportsBitMask() {
        return this[NativeTypeFn.bitGetter] !== common_1.abstract;
    }
    extends(fields, symbol, name) {
        const type = this;
        const ntype = new NativeType(symbol !== null && symbol !== void 0 ? symbol : this.symbol, name !== null && name !== void 0 ? name : this.name, type[NativeType.size], type[NativeType.align], type.isTypeOf, type.isTypeOfWeak, type[NativeType.getter], type[NativeType.setter], type[makefunc_1.makefunc.getFromParam], type[makefunc_1.makefunc.setToParam], type[NativeType.ctor], type[NativeType.dtor], type[NativeType.ctor_copy], type[NativeType.ctor_move]);
        if (fields != null) {
            for (const [field, value] of Object.entries(fields)) {
                ntype[field] = value;
            }
        }
        return ntype;
    }
    ref() {
        return singleton_1.Singleton.newInstance(NativeType, this, () => makeReference(this));
    }
    [(makefunc_1.makefunc.getter, makefunc_1.makefunc.setter, makefunc_1.makefunc.ctor, makefunc_1.makefunc.dtor, makefunc_1.makefunc.ctor_move, NativeTypeFn.ctor_copy, _a = NativeTypeFn.bitGetter, _b = NativeTypeFn.bitSetter, NativeTypeFn.descriptor)](builder, key, info) {
        (0, common_1.abstract)();
    }
    static defaultDescriptor(builder, key, info) {
        const { offset, bitmask, noInitialize, const: constValue } = info;
        const type = this;
        if (bitmask !== null) {
            if (!(type instanceof NativeType))
                throw Error(`${this.name} does not support the bit mask`);
            if (constValue) {
                builder.desc[key] = {
                    configurable: true,
                    get() {
                        const value = type[NativeTypeFn.bitGetter](this, bitmask[0], bitmask[1], offset);
                        Object.defineProperty(this, key, { value });
                        return value;
                    },
                };
            }
            else {
                builder.desc[key] = {
                    get() {
                        return type[NativeTypeFn.bitGetter](this, bitmask[0], bitmask[1], offset);
                    },
                    set(value) {
                        return type[NativeTypeFn.bitSetter](this, value, bitmask[0], bitmask[1], offset);
                    },
                };
            }
        }
        else {
            if (constValue) {
                builder.desc[key] = {
                    configurable: true,
                    get() {
                        const value = type[NativeType.getter](this, offset);
                        Object.defineProperty(this, key, { value });
                        return value;
                    },
                };
            }
            else {
                builder.desc[key] = {
                    get() {
                        return type[NativeType.getter](this, offset);
                    },
                    set(value) {
                        return type[NativeType.setter](this, value, offset);
                    },
                };
            }
        }
        if (noInitialize)
            return;
        let ctorbase = type.prototype;
        if (!ctorbase || !(NativeType.ctor in ctorbase))
            ctorbase = type;
        const name = builder.importType(type);
        if (ctorbase[NativeType.ctor] !== common_1.emptyFunc) {
            builder.ctor.ptrUsed = true;
            builder.ctor.setPtrOffset(offset);
            builder.ctor.code += `${name}[NativeType.ctor](ptr);\n`;
        }
        if (ctorbase[NativeType.dtor] !== common_1.emptyFunc) {
            builder.dtor.ptrUsed = true;
            builder.dtor.setPtrOffset(offset);
            builder.dtor.code += `${name}[NativeType.dtor](ptr);\n`;
        }
        builder.ctor_copy.ptrUsed = true;
        builder.ctor_copy.setPtrOffset(offset);
        builder.ctor_copy.code += `${name}[NativeType.ctor_copy](ptr, optr);\n`;
        builder.ctor_move.ptrUsed = true;
        builder.ctor_move.setPtrOffset(offset);
        builder.ctor_move.code += `${name}[NativeType.ctor_move](ptr, optr);\n`;
    }
    static definePointedProperty(target, key, pointer, type) {
        Object.defineProperty(target, key, {
            get() {
                return type[NativeType.getter](pointer);
            },
            set(value) {
                return type[NativeType.setter](pointer, value);
            },
        });
    }
}
exports.NativeType = NativeType;
NativeType.getter = makefunc_1.makefunc.getter;
NativeType.setter = makefunc_1.makefunc.setter;
NativeType.ctor = makefunc_1.makefunc.ctor;
NativeType.dtor = makefunc_1.makefunc.dtor;
NativeType.registerDirect = makefunc_1.makefunc.registerDirect;
NativeType.ctor_copy = NativeTypeFn.ctor_copy;
NativeType.ctor_move = makefunc_1.makefunc.ctor_move;
NativeType.size = makefunc_1.makefunc.size;
NativeType.align = makefunc_1.makefunc.align;
NativeType.descriptor = NativeTypeFn.descriptor;
NativeType.prototype[NativeTypeFn.descriptor] = NativeType.defaultDescriptor;
class CommandParameterNativeType extends NativeType {
}
exports.CommandParameterNativeType = CommandParameterNativeType;
commandparam_1.CommandParameterType.symbol;
function makeReference(type) {
    return new NativeType(mangle_1.mangle.pointer(type.symbol), `${type.name}*`, 8, 8, type.isTypeOf, type.isTypeOfWeak, (ptr, offset) => type[NativeType.getter](ptr.getPointer(offset)), (ptr, v, offset) => type[NativeType.setter](ptr.getPointer(), v, offset), undefined, // same with getter
    (stackptr, param, offset) => stackptr.setPointer(makefunc_1.makefunc.tempValue(type, param), offset));
}
core_1.VoidPointer.symbol = "PEAX";
core_1.VoidPointer[NativeType.align] = 8;
core_1.VoidPointer[NativeType.ctor] = common_1.emptyFunc;
core_1.VoidPointer[NativeType.dtor] = common_1.emptyFunc;
core_1.VoidPointer[NativeType.ctor_copy] = function (to, from) {
    to.copyFrom(from, 8);
};
core_1.VoidPointer[NativeType.ctor_move] = function (to, from) {
    this[NativeType.ctor_copy](to, from);
};
core_1.VoidPointer[NativeType.descriptor] = NativeType.defaultDescriptor;
core_1.VoidPointer.ref = function () {
    return singleton_1.Singleton.newInstance(NativeType, this, () => makeReference(this));
};
function isNumber(v) {
    return typeof v === "number";
}
function int32To64(ptr, v, offset) {
    ptr.setInt32To64WithZero(v, offset);
}
exports.void_t = new NativeType(mangle_1.mangle.void, "void_t", 0, 1, v => v === undefined, undefined, common_1.emptyFunc, common_1.emptyFunc, common_1.emptyFunc, common_1.emptyFunc, common_1.emptyFunc);
exports.bool_t = new CommandParameterNativeType(mangle_1.mangle.bool, "bool_t", 1, 1, v => typeof v === "boolean" || v === undefined, undefined, (ptr, offset) => ptr.getBoolean(offset), (ptr, v, offset) => ptr.setBoolean(v, offset), undefined, int32To64);
exports.bool_t[NativeTypeFn.bitGetter] = (ptr, shift, mask, offset) => {
    const value = ptr.getUint8(offset);
    return (value & mask) !== 0;
};
exports.bool_t[NativeTypeFn.bitSetter] = (ptr, value, shift, mask, offset) => {
    const nvalue = (+value << shift) | (ptr.getUint8(offset) & ~mask);
    ptr.setUint8(nvalue, offset);
};
exports.uint8_t = new NativeType(mangle_1.mangle.unsignedChar, "uint8_t", 1, 1, v => typeof v === "number" && (v | 0) === v && 0 <= v && v <= 0xff, isNumber, (ptr, offset) => ptr.getUint8(offset), (ptr, v, offset) => ptr.setUint8(v, offset), undefined, int32To64);
exports.uint8_t[NativeTypeFn.bitGetter] = numericBitGetter;
exports.uint8_t[NativeTypeFn.bitSetter] = numericBitSetter;
exports.uint16_t = new NativeType(mangle_1.mangle.unsignedShort, "uint16_t", 2, 2, v => typeof v === "number" && (v | 0) === v && 0 <= v && v <= 0xffff, isNumber, (ptr, offset) => ptr.getUint16(offset), (ptr, v, offset) => ptr.setUint16(v, offset), undefined, int32To64);
exports.uint16_t[NativeTypeFn.bitGetter] = numericBitGetter;
exports.uint16_t[NativeTypeFn.bitSetter] = numericBitSetter;
exports.uint32_t = new NativeType(mangle_1.mangle.unsignedInt, "uint32_t", 4, 4, v => typeof v === "number" && v >>> 0 === v, isNumber, (ptr, offset) => ptr.getUint32(offset), (ptr, v, offset) => ptr.setUint32(v, offset), undefined, int32To64);
exports.uint32_t[NativeTypeFn.bitGetter] = numericBitGetter;
exports.uint32_t[NativeTypeFn.bitSetter] = numericBitSetter;
exports.ulong_t = new NativeType(mangle_1.mangle.unsignedLong, "ulong_t", 4, 4, v => typeof v === "number" && v >>> 0 === v, isNumber, (ptr, offset) => ptr.getUint32(offset), (ptr, v, offset) => ptr.setUint32(v, offset), undefined, int32To64);
exports.ulong_t[NativeTypeFn.bitGetter] = numericBitGetter;
exports.ulong_t[NativeTypeFn.bitSetter] = numericBitSetter;
exports.uint64_as_float_t = new NativeType(mangle_1.mangle.unsignedLongLong, "uint64_as_float_t", 8, 8, v => typeof v === "number" && Math.round(v) === v && 0 <= v && v < 0x10000000000000000, isNumber, (ptr, offset) => ptr.getUint64AsFloat(offset), (ptr, v, offset) => ptr.setUint64WithFloat(v, offset));
exports.int8_t = new NativeType(mangle_1.mangle.char, "int8_t", 1, 1, v => typeof v === "number" && (v | 0) === v && -0x80 <= v && v <= 0x7f, isNumber, (ptr, offset) => ptr.getInt8(offset), (ptr, v, offset) => ptr.setInt8(v, offset), undefined, int32To64);
exports.int8_t[NativeTypeFn.bitGetter] = numericBitGetter;
exports.int8_t[NativeTypeFn.bitSetter] = numericBitSetter;
exports.int16_t = new NativeType(mangle_1.mangle.short, "int16_t", 2, 2, v => typeof v === "number" && (v | 0) === v && -0x8000 <= v && v <= 0x7fff, isNumber, (ptr, offset) => ptr.getInt16(offset), (ptr, v, offset) => ptr.setInt16(v, offset), undefined, int32To64);
exports.int16_t[NativeTypeFn.bitGetter] = numericBitGetter;
exports.int16_t[NativeTypeFn.bitSetter] = numericBitSetter;
exports.int32_t = new CommandParameterNativeType(mangle_1.mangle.int, "int32_t", 4, 4, v => typeof v === "number" && (v | 0) === v, isNumber, (ptr, offset) => ptr.getInt32(offset), (ptr, v, offset) => ptr.setInt32(v, offset), undefined, int32To64);
exports.int32_t[NativeTypeFn.bitGetter] = numericBitGetter;
exports.int32_t[NativeTypeFn.bitSetter] = numericBitSetter;
exports.long_t = new NativeType(mangle_1.mangle.long, "long_t", 4, 4, v => typeof v === "number" && (v | 0) === v, isNumber, (ptr, offset) => ptr.getInt32(offset), (ptr, v, offset) => ptr.setInt32(v, offset), undefined, int32To64);
exports.long_t[NativeTypeFn.bitGetter] = numericBitGetter;
exports.long_t[NativeTypeFn.bitSetter] = numericBitSetter;
exports.int64_as_float_t = new NativeType(mangle_1.mangle.longlong, "int64_as_float_t", 8, 8, v => typeof v === "number" && Math.round(v) === v && -0x8000000000000000 <= v && v < 0x8000000000000000, isNumber, (ptr, offset) => ptr.getInt64AsFloat(offset), (ptr, v, offset) => ptr.setInt64WithFloat(v, offset), undefined, int32To64);
exports.float32_t = new CommandParameterNativeType(mangle_1.mangle.float, "float32_t", 4, 4, isNumber, isNumber, (ptr, offset) => ptr.getFloat32(offset), (ptr, v, offset) => ptr.setFloat32(v, offset), undefined, (stackptr, param, offset) => stackptr.setFloat32To64WithZero(param, offset));
exports.float32_t[makefunc_1.makefunc.useXmmRegister] = true;
exports.float64_t = new NativeType(mangle_1.mangle.double, "float64_t", 8, 8, isNumber, isNumber, (ptr, offset) => ptr.getFloat64(offset), (ptr, v, offset) => ptr.setFloat64(v, offset));
exports.float64_t[makefunc_1.makefunc.useXmmRegister] = true;
const string_ctor = makefunc_1.makefunc.js(symbols_1.proc["??0?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@QEAA@XZ"], exports.void_t, null, core_1.VoidPointer);
const string_dtor = makefunc_1.makefunc.js(symbols_1.proc["?_Tidy_deallocate@?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@QEAAXXZ"], exports.void_t, null, core_1.VoidPointer);
exports.CxxString = new CommandParameterNativeType("V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@", "CxxString", 0x20, 8, v => typeof v === "string", undefined, (ptr, offset) => ptr.getCxxString(offset), (ptr, v, offset) => ptr.setCxxString(v, offset), (stackptr, offset) => stackptr.getPointer(offset).getCxxString(), undefined, string_ctor, string_dtor, (to, from) => {
    string_ctor(to);
    to.setCxxString(from.getCxxString());
}, (to, from) => {
    to.copyFrom(from, 0x20);
    string_ctor(from);
});
exports.CxxString[makefunc_1.makefunc.paramHasSpace] = true;
function impossible() {
    throw Error(`Impossible to set`);
}
exports.GslStringSpan = new NativeType(mangle_1.mangle.templateClass(["gsl", "basic_string_span"], mangle_1.mangle.constChar, -1), "GslStringSpan", 0x10, 8, v => typeof v === "string", undefined, (ptr, offset) => {
    const length = ptr.getInt64AsFloat(offset);
    return ptr.getPointer((offset || 0) + 8).getString(length);
}, impossible, (stackptr, offset) => {
    const strptr = stackptr.getPointer(offset);
    const length = strptr.getInt64AsFloat(0);
    return strptr.getPointer(8).getString(length);
}, (stackptr, param, offset) => {
    const str = Buffer.from(param, "utf8");
    const buf = new core_1.AllocatedPointer(0x10);
    buf.setPointer(core_1.VoidPointer.fromAddressBuffer(str), 8);
    buf.setInt64WithFloat(str.length, 0);
    makefunc_1.makefunc.temporalKeeper.push(buf, str);
    stackptr.setPointer(buf, offset);
});
exports.CxxStringView = new NativeType("V?$basic_string_view@DU?$char_traits@D@std@@@std@@", "CxxStringView", 0x10, 8, v => typeof v === "string", undefined, (ptr, offset) => {
    const length = ptr.getInt64AsFloat((offset || 0) + 8);
    return ptr.getPointer(offset).getString(length);
}, impossible, (stackptr, offset) => {
    const strptr = stackptr.getPointer(offset);
    const length = strptr.getInt64AsFloat(8);
    return strptr.getPointer(0).getString(length);
}, (stackptr, param, offset) => {
    const str = Buffer.from(param, "utf8");
    const buf = new core_1.AllocatedPointer(0x10);
    buf.setPointer(core_1.VoidPointer.fromAddressBuffer(str), 0);
    buf.setInt64WithFloat(str.length, 8);
    makefunc_1.makefunc.temporalKeeper.push(buf, str);
    stackptr.setPointer(buf, offset);
});
exports.bin64_t = new NativeType("unsigned __int64", "bin64_t", 8, 8, v => typeof v === "string" && v.length === 4, undefined, (ptr, offset) => ptr.getBin64(offset), (ptr, v, offset) => ptr.setBin(v, offset)).extends({
    one: "\u0001\0\0\0",
    zero: "\0\0\0\0",
    minus_one: "\uffff\uffff\uffff\uffff",
});
function bin128CannotBeUsedAsTheParameterType() {
    throw Error("bin128_t cannot be used as the parameter type");
}
exports.bin128_t = new NativeType(mangle_1.mangle.unsignedInt128, "bin128_t", 16, 8, v => typeof v === "string" && v.length === 8, undefined, (ptr, offset) => ptr.getBin(8, offset), (ptr, v, offset) => ptr.setBin(v, offset), bin128CannotBeUsedAsTheParameterType, bin128CannotBeUsedAsTheParameterType).extends({
    one: "\u0001\0\0\0",
    zero: "\0\0\0\0",
    minus_one: "\uffff\uffff\uffff\uffff",
});
/** @deprecated for legacy support */
exports.CxxStringWith8Bytes = exports.CxxString.extends();
exports.CxxStringWith8Bytes[NativeType.size] = 0x28;
function getSpanSymbol(type) {
    return mangle_1.mangle.templateClass(["gsl", "span"], type, "-1");
}
class GslSpanToArray extends NativeType {
    constructor(compType) {
        super(getSpanSymbol(compType), `GslSpanToArray<${compType.name}>`, 0x10, 8, v => v instanceof Array, undefined, (ptr, offset) => {
            const length = ptr.getInt64AsFloat(offset);
            const out = new Array(length);
            const compptr = ptr.getPointer(offset == null ? 8 : offset + 8);
            const compsize = this.compType[makefunc_1.makefunc.size];
            for (let i = 0, compoffset = 0; i !== length; i++, compoffset += compsize) {
                out[i] = this.compType[makefunc_1.makefunc.getter](compptr, compoffset);
            }
            return out;
        }, impossible, (stackptr, offset) => this[NativeType.getter](stackptr.getPointer(offset)), (stackptr, array, offset) => {
            const compsize = this.compType[makefunc_1.makefunc.size];
            const buf = new core_1.AllocatedPointer(array.length * compsize);
            makefunc_1.makefunc.temporalKeeper.push(buf);
            let compoffset = 0;
            for (const comp of array) {
                this.compType[makefunc_1.makefunc.setter](buf, comp, compoffset);
                compoffset += compsize;
            }
            stackptr.setPointer(buf, offset);
        }, ptr => ptr.fill(0, 0x10));
        this.compType = compType;
    }
    static make(compType) {
        return singleton_1.Singleton.newInstance(GslSpanToArray, compType, () => new GslSpanToArray(compType));
    }
}
exports.GslSpanToArray = GslSpanToArray;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZldHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5hdGl2ZXR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDJDQUFxQztBQUNyQyxpREFBc0Q7QUFDdEQscUNBQStDO0FBQy9DLGlDQUFzRTtBQUN0RSx5Q0FBc0M7QUFDdEMscUNBQWtDO0FBQ2xDLDJDQUF3QztBQUV4QyxJQUFVLFlBQVksQ0FNckI7QUFORCxXQUFVLFlBQVk7SUFDTCxzQkFBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNoQywwQkFBYSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN4Qyx1QkFBVSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNsQyxzQkFBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNoQyxzQkFBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNqRCxDQUFDLEVBTlMsWUFBWSxLQUFaLFlBQVksUUFNckI7QUFvQ0QsU0FBUyxXQUFXLENBQUMsSUFBWTtJQUM3QixPQUFPLENBQUMsRUFBaUIsRUFBRSxJQUFtQixFQUFFLEVBQUU7UUFDOUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUVELE1BQWEsdUJBQXVCO0lBQXBDO1FBQ29CLFNBQUksR0FBMEIsRUFBRSxDQUFDO1FBQ2pDLFdBQU0sR0FBYyxFQUFFLENBQUM7UUFFdkIsWUFBTyxHQUFHLElBQUksR0FBRyxFQUFtQixDQUFDO1FBRXJDLFNBQUksR0FBRyxJQUFJLHVCQUF1QixDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3BELFNBQUksR0FBRyxJQUFJLHVCQUF1QixDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3BELGNBQVMsR0FBRyxJQUFJLHVCQUF1QixDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDN0QsY0FBUyxHQUFH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