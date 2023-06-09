"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makefunc = void 0;
const util = require("util");
const asmcode_1 = require("./asm/asmcode");
const assembler_1 = require("./assembler");
const symbols_1 = require("./bds/symbols");
require("./codealloc");
const common_1 = require("./common");
const core_1 = require("./core");
const dllraw_1 = require("./dllraw");
const functiongen_1 = require("./functiongen");
const util_1 = require("./util");
const functionMap = new core_1.AllocatedPointer(0x100);
core_1.chakraUtil.JsAddRef(functionMap);
const callNativeFunction = core_1.chakraUtil.JsCreateFunction(asmcode_1.asmcode.callNativeFunction, null);
const breakBeforeCallNativeFunction = core_1.chakraUtil.JsCreateFunction(asmcode_1.asmcode.breakBeforeCallNativeFunction, null);
const callJsFunction = asmcode_1.asmcode.callJsFunction;
function initFunctionMap() {
    function chakraCoreToDef(funcName) {
        asmcode_1.asmcode[funcName] = core_1.cgate.GetProcAddress(chakraCoreDll, funcName);
    }
    const chakraCoreDll = core_1.cgate.GetModuleHandleW("ChakraCore.dll");
    asmcode_1.asmcode.GetCurrentThreadId = dllraw_1.dllraw.kernel32.GetCurrentThreadId;
    asmcode_1.asmcode.uv_async_alloc = core_1.uv_async.alloc;
    asmcode_1.asmcode.uv_async_post = core_1.uv_async.post;
    asmcode_1.asmcode.uv_async_call = core_1.uv_async.call;
    asmcode_1.asmcode.vsnprintf = symbols_1.proc.vsnprintf;
    asmcode_1.asmcode.js_null = core_1.chakraUtil.asJsValueRef(null);
    asmcode_1.asmcode.js_undefined = core_1.chakraUtil.asJsValueRef(undefined);
    asmcode_1.asmcode.runtimeErrorRaise = core_1.runtimeError.raise;
    chakraCoreToDef("JsNumberToInt");
    chakraCoreToDef("JsCallFunction");
    chakraCoreToDef("JsConstructObject");
    chakraCoreToDef("JsGetAndClearException");
    asmcode_1.asmcode.pointer_js2class = core_1.chakraUtil.pointer_js2class;
    asmcode_1.asmcode.jshook_fireError = core_1.jshook.fireErrorPointer;
    asmcode_1.asmcode.NativePointer = core_1.chakraUtil.asJsValueRef(core_1.NativePointer);
}
initFunctionMap();
const makefuncTypeMap = [];
function remapType(type) {
    if (typeof type === "number") {
        if (makefuncTypeMap.length === 0) {
            const { RawTypeId } = require("./legacy");
            const { bool_t, int32_t, int64_as_float_t, float64_t, float32_t, bin64_t, void_t } = require("./nativetype");
            makefuncTypeMap[RawTypeId.Boolean] = bool_t;
            makefuncTypeMap[RawTypeId.Int32] = int32_t;
            makefuncTypeMap[RawTypeId.FloatAsInt64] = int64_as_float_t;
            makefuncTypeMap[RawTypeId.Float64] = float64_t;
            makefuncTypeMap[RawTypeId.Float32] = float32_t;
            makefuncTypeMap[RawTypeId.StringAnsi] = makefunc.Ansi;
            makefuncTypeMap[RawTypeId.StringUtf8] = makefunc.Utf8;
            makefuncTypeMap[RawTypeId.StringUtf16] = makefunc.Utf16;
            makefuncTypeMap[RawTypeId.Buffer] = makefunc.Buffer;
            makefuncTypeMap[RawTypeId.Bin64] = bin64_t;
            makefuncTypeMap[RawTypeId.JsValueRef] = makefunc.JsValueRef;
            makefuncTypeMap[RawTypeId.Void] = void_t;
        }
        const res = makefuncTypeMap[type];
        if (!res)
            throw Error(`Invalid RawTypeId: ${type}`);
        return res;
    }
    return type;
}
function invalidParameterError(paramName, expected, actual) {
    throw TypeError(`unexpected parameter type (${paramName}, expected=${expected}, actual=${actual != null ? actual.constructor.name : actual})`);
}
var makefunc;
(function (makefunc) {
    makefunc.temporalKeeper = [];
    /**
     * get the value from the pointer.
     */
    makefunc.getter = Symbol("getter");
    /**
     * set the value to the pointer.
     */
    makefunc.setter = Symbol("setter");
    /**
     * set the value from the register.
     * Passed directly to registers via temporary stack memory.
     */
    makefunc.setToParam = Symbol("makefunc.writeToParam");
    /**
     * get the value from the register
     * Passed directly from registers via temporary stack memory.
     */
    makefunc.getFromParam = Symbol("makefunc.readFromParam");
    /**
     * it's a floating point.
     * need to be passed as xmm registers
     */
    makefunc.useXmmRegister = Symbol("makefunc.returnWithXmm0");
    /**
     * the parameter will be passed as a pointer that points to stack space.
     * it cannot be returned on makefunc.np
     *
     * flag for the native type
     */
    makefunc.paramHasSpace = Symbol("makefunc.paramHasSpace");
    /**
     * constructor
     */
    makefunc.ctor = Symbol("makefunc.ctor");
    /**
     * destructor
     */
    makefunc.dtor = Symbol("makefunc.dtor");
    /**
     * move constructor
     */
    makefunc.ctor_move = Symbol("makefunc.ctor_move");
    /**
     * size of the type
     */
    makefunc.size = Symbol("makefunc.size");
    /**
     * alignment of the type
     */
    makefunc.align = Symbol("makefunc.align");
    /**
     * this class is not stored in the stack on function calls.
     * it is just assigned to the register directly.
     *
     * flag for the class
     */
    makefunc.registerDirect = Symbol("makefunc.registerDirect");
    class ParamableT {
        constructor(name, _getFromParam, _setToParam, isTypeOf, isTypeOfWeak = isTypeOf) {
            this.name = name;
            this[makefunc.getFromParam] = _getFromParam;
            this[makefunc.setToParam] = _setToParam;
            this.isTypeOf = isTypeOf;
            this.isTypeOfWeak = isTypeOfWeak;
        }
    }
    makefunc.ParamableT = ParamableT;
    ParamableT.prototype[makefunc.useXmmRegister] = false;
    ParamableT.prototype[makefunc.paramHasSpace] = false;
    /**
     * allocate temporal memory for using in NativeType
     * it will removed at native returning
     */
    function tempAlloc(size) {
        const ptr = new core_1.AllocatedPointer(size);
        makefunc.temporalKeeper.push(ptr);
        return ptr;
    }
    makefunc.tempAlloc = tempAlloc;
    /**
     * allocate temporal memory for using in NativeType
     * it will removed at native returning
     */
    function tempValue(type, value) {
        const ptr = tempAlloc(Math.max(type[makefunc.size], 8)); // XXX: setToParam needs 8 bytes for primitive types
        type[makefunc.setToParam](ptr, value);
        return ptr;
    }
    makefunc.tempValue = tempValue;
    /**
     * allocate temporal string for using in NativeType
     * it will removed at native returning
     */
    function tempString(str, encoding) {
        const ptr = core_1.AllocatedPointer.fromString(str, encoding);
        makefunc.temporalKeeper.push(ptr);
        return ptr;
    }
    makefunc.tempString = tempString;
    function npRaw(func, onError, opts) {
        core_1.chakraUtil.JsAddRef(func);
        const code = (0, assembler_1.asm)();
        if (opts == null)
            opts = {};
        if (opts.nativeDebugBreak)
            code.debugBreak();
        return code
            .mov_r_c(assembler_1.Register.r10, core_1.chakraUtil.asJsValueRef(func))
            .mov_r_c(assembler_1.Register.r11, onError)
            .jmp64(callJsFunction, assembler_1.Register.rax)
            .unwind()
            .alloc(opts.name || func.name || `#np_call`);
    }
    makefunc.npRaw = npRaw;
    /**
     * make the JS function as a native function.
     *
     * wrapper codes are not deleted permanently.
     * do not use it dynamically.
     */
    function np(jsfunction, returnType, opts, ...params) {
        if (typeof jsfunction !== "function")
            invalidParameterError("arg1", "function", jsfunction);
        const options = opts || {};
        if (options.name == null) {
            options.name = jsfunction.name;
        }
        const returnTypeResolved = remapType(returnType);
        const paramsTypeResolved = params.map(remapType);
        const gen = new functiongen_1.FunctionGen(options.name, "stackptr");
        if (options.jsDebugBreak)
            gen.writeln("debugger;");
        gen.import("temporalKeeper", makefunc.temporalKeeper);
        gen.writeln("const keepIdx=temporalKeeper.length;");
        gen.import("getter", makefunc.getter);
        gen.import("getFromParam", makefunc.getFromParam);
        let offset = 0;
        function param(varname, type) {
            args.push(varname);
            nativeParam(varname, type);
        }
        function nativeParam(varname, type) {
            gen.import(`${varname}_t`, type);
            if (offset >= 0x20) {
                // args memory space
                if (type[makefunc.registerDirect]) {
                    gen.writeln(`const ${varname}=${varname}_t[getter](stackptr, ${offset + 0x68});`);
                }
                else {
                    gen.writeln(`const ${varname}=${varname}_t[getFromParam](stackptr, ${offset + 0x68});`);
                }
            }
            else {
                // args register space
                if (type[makefunc.registerDirect]) {
                    gen.writeln(`const ${varname}=${varname}_t[getter](stackptr, ${offset});`);
                }
                else if (type[makefunc.useXmmRegister]) {
                    gen.writeln(`const ${varname}=${varname}_t[getFromParam](stackptr, ${offset + 0x20});`);
                }
                else {
                    gen.writeln(`const ${varname}=${varname}_t[getFromParam](stackptr, ${offset});`);
                }
            }
            offset += 8;
        }
        const args = [];
        if (options.structureReturn) {
            if ((0, util_1.isBaseOf)(returnTypeResolved, core_1.StructurePointer)) {
                nativeParam(`retVar`, returnTypeResolved);
            }
            else {
                nativeParam(`retVar`, core_1.StaticPointer);
            }
        }
        let needThis;
        if ((needThis = options.this != null)) {
            param(`thisVar`, options.this);
        }
        for (let i = 0; i < paramsTypeResolved.length; i++) {
            const type = paramsTypeResolved[i];
            param(`arg${i}`, type);
        }
        gen.import("jsfunction", jsfunction);
        gen.import("returnTypeResolved", returnTypeResolved);
        gen.import("setToParam", makefunc.setToParam);
        if (needThis)
            gen.writeln(`const res=jsfunction.call(${args.join(",")});`);
        else
            gen.writeln(`const res=jsfunction(${args.join(",")});`);
        const resultOffset = returnTypeResolved[makefunc.useXmmRegister] ? 0x50 : 0x48;
        if (options.structureReturn) {
            if ((0, util_1.isBaseOf)(returnTypeResolved, core_1.StructurePointer)) {
                gen.import("ctor_move", makefunc.ctor_move);
                gen.writeln("returnTypeResolved[ctor_move](retVar, res);");
                gen.writeln(`returnTypeResolved[setToParam](stackptr, retVar, ${resultOffset});`); // set address
            }
            else {
                if (returnTypeResolved[makefunc.ctor] !== common_1.emptyFunc) {
                    gen.import("ctor", makefunc.ctor);
                    gen.writeln("returnTypeResolved[ctor](retVar);");
                }
                gen.import("setter", makefunc.setter);
                gen.writeln("returnTypeResolved[setter](retVar, res);");
                gen.writeln(`stackptr.setPointer(retVar, ${resultOffset});`);
            }
        }
        else {
            if (returnTypeResolved[makefunc.paramHasSpace])
                throw Error(`cannot native return with ${returnType.name}`);
            gen.writeln(`returnTypeResolved[setToParam](stackptr, res, ${resultOffset});`);
        }
        gen.writeln("temporalKeeper.length = keepIdx;");
        if (options.onlyOnce) {
            gen.import("chakraRelease", core_1.chakraUtil.JsRelease);
            gen.writeln(`chakraRelease(${gen.functionName});`);
        }
        return npRaw(gen.generate(), options.crossThread ? asmcode_1.asmcode.jsend_crossthread : options.onError || asmcode_1.asmcode.jsend_crash, options);
    }
    makefunc.np = np;
    /**
     * make the native function as a JS function.
     *
     * @param returnType *_t or *Pointer
     * @param params *_t or *Pointer
     */
    function js(functionPointer, returnType, opts, ...params) {
        const options = opts || {};
        const returnTypeResolved = remapType(returnType);
        const paramsTypeResolved = params.map(remapType);
        let countOnCpp = params.length;
        if (options.this != null)
            countOnCpp++;
        const paramsSize = countOnCpp * 8;
        let stackSize = paramsSize;
        if (stackSize < 0x20)
            stackSize = 0x20; // minimum stack for calling
        // param spaces
        const spaceOffsets = [];
        for (const param of params) {
            if (param[makefunc.paramHasSpace]) {
                spaceOffsets.push(stackSize);
                if (param[makefunc.align] == null || param[makefunc.size] == null)
                    throw Error("Invalid parameter size");
                stackSize += param[makefunc.size]; // param has space
                const align = param[makefunc.align] - 1;
                stackSize = (stackSize + align) & ~align;
            }
        }
        // 16 bytes align
        stackSize -= 0x28; // share space
        stackSize = (stackSize + 0xf) & ~0xf;
        const ncall = options.nativeDebugBreak ? breakBeforeCallNativeFunction : callNativeFunction;
        const args = [];
        for (let i = 0; i < paramsTypeResolved.length; i++) {
            args.push("arg" + i);
        }
        const gen = new functiongen_1.FunctionGen(options.name, ...args);
        if (options.jsDebugBreak)
            gen.writeln("debugger;");
        if (functionPointer instanceof Array) {
            // virtual function
            const vfoff = functionPointer[0];
            const thisoff = functionPointer[1] || 0;
            gen.writeln(`const vftable=this.getPointer(${thisoff});`);
            gen.writeln(`const func=vftable.getPointer(${vfoff});`);
        }
        else {
            if (!(functionPointer instanceof core_1.VoidPointer))
                throw TypeError(`arg1, expected=*Pointer, actual=${functionPointer}`);
            gen.import("func", functionPointer);
        }
        const returnTypeIsClass = (0, util_1.isBaseOf)(returnTypeResolved, core_1.StructurePointer);
        const paramPairs = [];
        if (options.this != null) {
            paramPairs.push(["this", options.this]);
        }
        if (options.structureReturn) {
            if (returnTypeIsClass) {
                paramPairs.push([`retVar`, returnTypeResolved]);
            }
            else {
                paramPairs.push([`retVar`, core_1.VoidPointer]);
            }
        }
        gen.import("invalidParameterError", invalidParameterError);
        gen.import("setToParam", makefunc.setToParam);
        gen.import("setter", makefunc.setter);
        gen.import("temporalKeeper", makefunc.temporalKeeper);
        let j = 0;
        for (let i = 0; i < paramsTypeResolved.length; i++) {
            const varname = `arg${i}`;
            const type = paramsTypeResolved[i];
            if (type[makefunc.paramHasSpace])
                paramPairs.push([varname, type, spaceOffsets[j++]]);
            else
                paramPairs.push([varname, type]);
            gen.writeln(`if (!${varname}_t.isTypeOfWeak(${varname})) invalidParameterError("${varname}", "${type.name}", ${varname});`);
        }
        gen.writeln("const keepIdx=temporalKeeper.length;");
        gen.import("dtor", makefunc.dtor);
        gen.import("ctor", makefunc.ctor);
        function writeNcall() {
            gen.writeln(`return ncall(${stackSize},func,stackptr=>{`);
            if (spaceOffsets.length !== 0) {
                gen.writeln("  let space;");
            }
            let offset = 0;
            for (const [varname, type, spaceOffset] of paramPairs) {
                gen.import(`${varname}_t`, type);
                if (spaceOffset != null) {
                    gen.writeln(`  space=stackptr.add(${spaceOffset});`);
                    if (type[makefunc.ctor] !== common_1.emptyFunc) {
                        gen.writeln(`  ${varname}_t[ctor](space);`);
                    }
                    if (type[makefunc.registerDirect]) {
                        gen.writeln(`  ${varname}_t[setter](space, ${varname});`);
                    }
                    else {
                        gen.writeln(`  ${varname}_t[setToParam](space, ${varname});`);
                    }
                    gen.writeln(`  stackptr.setPointer(space, ${offset});`);
                }
                else {
                    if (type[makefunc.registerDirect]) {
                        gen.writeln(`  ${varname}_t[setter](stackptr, ${varname}, ${offset});`);
                    }
                    else {
                        gen.writeln(`  ${varname}_t[setToParam](stackptr, ${varname}, ${offset});`);
                    }
                }
                offset += 8;
            }
            gen.writeln("},stackptr=>{");
        }
        let returnVar = "out";
        gen.import("ncall", ncall);
        if (options.structureReturn) {
            gen.import("returnTypeResolved", returnTypeResolved);
            if (returnTypeIsClass) {
                gen.writeln("const retVar=new returnTypeResolved(true);");
                returnVar = "retVar";
                writeNcall();
            }
            else {
                gen.import("getter", makefunc.getter);
                gen.import("AllocatedPointer", core_1.AllocatedPointer);
                gen.import("returnTypeDtor", returnTypeResolved[makefunc.dtor]);
                gen.import("sizeSymbol", makefunc.size);
                gen.writeln("const retVar=new AllocatedPointer(returnTypeResolved[sizeSymbol]);");
                writeNcall();
                const getterFunc = returnTypeResolved[makefunc.getter];
                if (getterFunc !== common_1.emptyFunc) {
                    gen.writeln("  const out=returnTypeResolved[getter](retVar);");
                }
                else {
                    returnVar = "";
                }
                gen.writeln("  returnTypeDtor(retVar);");
            }
        }
        else {
            const rbpOffset = stackSize + 0x28;
            const raxOffset = rbpOffset + 0x18;
            const xmm0Offset = rbpOffset + 0x20;
            const resultOffset = returnTypeResolved[makefunc.useXmmRegister] ? xmm0Offset : raxOffset;
            gen.import("returnTypeResolved", returnTypeResolved);
            gen.import("getFromParam", makefunc.getFromParam);
            writeNcall();
            if (returnTypeIsClass && returnTypeResolved[makefunc.registerDirect]) {
                gen.import("sizeSymbol", makefunc.size);
                gen.writeln("  const out=new returnTypeResolved(true);");
                gen.writeln(`  stackptr.copyTo(out, returnTypeResolved[sizeSymbol], ${resultOffset});`);
            }
            else {
                const getterFunc = returnTypeResolved[makefunc.getFromParam];
                if (getterFunc !== common_1.emptyFunc) {
                    gen.writeln(`  const out=returnTypeResolved[getFromParam](stackptr, ${resultOffset});`);
                }
                else {
                    returnVar = "";
                }
            }
        }
        // destruct stack
        let irev = paramPairs.length;
        while (irev-- !== 0) {
            const [varname, type, spaceOffset] = paramPairs[irev];
            if (spaceOffset != null) {
                gen.writeln(`  ${varname}_t[dtor](stackptr.add(${spaceOffset}));`);
            }
        }
        gen.writeln("  temporalKeeper.length = keepIdx;");
        if (returnVar !== "")
            gen.writeln(`  return ${returnVar};`);
        gen.writeln("});");
        const funcout = gen.generate();
        funcout.pointer = functionPointer;
        return funcout;
    }
    makefunc.js = js;
    makefunc.asJsValueRef = core_1.chakraUtil.asJsValueRef;
    makefunc.Ansi = new ParamableT("Ansi", (stackptr, offset) => stackptr.getPointer(offset).getString(undefined, 0, common_1.Encoding.Ansi), (stackptr, param, offset) => stackptr.setPointer(param === null ? null : tempString(param, common_1.Encoding.Ansi), offset), v => v === null || typeof v === "string");
    makefunc.Utf8 = new ParamableT("Utf8", (stackptr, offset) => stackptr.getPointer(offset).getString(undefined, 0, common_1.Encoding.Utf8), (stackptr, param, offset) => stackptr.setPointer(param === null ? null : tempString(param), offset), v => v === null || typeof v === "string");
    makefunc.Utf16 = new ParamableT("Utf16", (stackptr, offset) => stackptr.getPointer(offset).getString(undefined, 0, common_1.Encoding.Utf16), (stackptr, param, offset) => stackptr.setPointer(param === null ? null : tempString(param, common_1.Encoding.Utf16), offset), v => v === null || typeof v === "string");
    makefunc.Buffer = new ParamableT("Buffer", (stackptr, offset) => stackptr.getPointer(offset), (stackptr, param, offset) => {
        if (param !== null && !(param instanceof core_1.VoidPointer)) {
            param = core_1.VoidPointer.fromAddressBuffer(param);
        }
        stackptr.setPointer(param, offset);
    }, v => {
        if (v === null)
            return true;
        if (v instanceof core_1.VoidPointer)
            return true;
        if (v instanceof DataView)
            return true;
        if (v instanceof ArrayBuffer)
            return true;
        if (v instanceof Uint8Array)
            return true;
        if (v instanceof Int32Array)
            return true;
        if (v instanceof Uint16Array)
            return true;
        if (v instanceof Uint32Array)
            return true;
        if (v instanceof Int8Array)
            return true;
        if (v instanceof Int16Array)
            return true;
        return false;
    });
    makefunc.JsValueRef = new ParamableT("JsValueRef", (stackptr, offset) => stackptr.getJsValueRef(offset), (stackptr, param, offset) => stackptr.setJsValueRef(param, offset), () => true);
})(makefunc = exports.makefunc || (exports.makefunc = {}));
core_1.VoidPointer.prototype[util.inspect.custom] = function () {
    return `${this.constructor.name} { ${this.toString()} }`;
};
core_1.VoidPointer[makefunc.size] = 8;
core_1.VoidPointer[makefunc.getter] = function (ptr, offset) {
    return ptr.getNullablePointerAs(this, offset);
};
core_1.VoidPointer[makefunc.setter] = function (ptr, value, offset) {
    ptr.setPointer(value, offset);
};
core_1.VoidPointer[makefunc.setToParam] = function (stackptr, param, offset) {
    stackptr.setPointer(param, offset);
};
core_1.VoidPointer[makefunc.getFromParam] = function (stackptr, offset) {
    return stackptr.getNullablePointerAs(this, offset);
};
makefunc.ParamableT.prototype[makefunc.useXmmRegister] = false;
core_1.VoidPointer[makefunc.useXmmRegister] = false;
core_1.VoidPointer.prototype[assembler_1.asm.splitTwo32Bits] = function () {
    return [this.getAddressLow(), this.getAddressHigh()];
};
Uint8Array.prototype[assembler_1.asm.splitTwo32Bits] = function () {
    const ptr = new core_1.NativePointer();
    ptr.setAddressFromBuffer(this);
    return [ptr.getAddressLow(), ptr.getAddressHigh()];
};
core_1.VoidPointer.isTypeOf = function (v) {
    return v === null || v instanceof this;
};
core_1.VoidPointer.isTypeOfWeak = function (v) {
    return v == null || v instanceof core_1.VoidPointer;
};
assembler_1.X64Assembler.prototype.make = function (returnType, opts, ...params) {
    return makefunc.js(this.alloc(opts && opts.name), returnType, opts, ...params);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFrZWZ1bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYWtlZnVuYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBNkI7QUFDN0IsMkNBQXdDO0FBQ3hDLDJDQUEwRDtBQUMxRCwyQ0FBcUM7QUFDckMsdUJBQXFCO0FBQ3JCLHFDQUEyRDtBQUMzRCxpQ0FBMEo7QUFDMUoscUNBQWtDO0FBQ2xDLCtDQUE0QztBQUM1QyxpQ0FBa0M7QUFJbEMsTUFBTSxXQUFXLEdBQUcsSUFBSSx1QkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoRCxpQkFBVSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNqQyxNQUFNLGtCQUFrQixHQUE2RyxpQkFBVSxDQUFDLGdCQUFnQixDQUM1SixpQkFBTyxDQUFDLGtCQUFrQixFQUMxQixJQUFJLENBQ1AsQ0FBQztBQUNGLE1BQU0sNkJBQTZCLEdBQy9CLGlCQUFVLENBQUMsZ0JBQWdCLENBQUMsaUJBQU8sQ0FBQyw2QkFBNkIsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM3RSxNQUFNLGNBQWMsR0FBRyxpQkFBTyxDQUFDLGNBQWMsQ0FBQztBQUU5QyxTQUFTLGVBQWU7SUFDcEIsU0FBUyxlQUFlLENBQUMsUUFBOEI7UUFDbEQsaUJBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxZQUFLLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRUQsTUFBTSxhQUFhLEdBQUcsWUFBSyxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFFL0QsaUJBQU8sQ0FBQyxrQkFBa0IsR0FBRyxlQUFNLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDO0lBQ2hFLGlCQUFPLENBQUMsY0FBYyxHQUFHLGVBQVEsQ0FBQyxLQUFLLENBQUM7SUFDeEMsaUJBQU8sQ0FBQyxhQUFhLEdBQUcsZUFBUSxDQUFDLElBQUksQ0FBQztJQUN0QyxpQkFBTyxDQUFD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