"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installErrorHandler = void 0;
const path = require("path");
const assembler_1 = require("./assembler");
const core_1 = require("./core");
const dllraw_1 = require("./dllraw");
const event_1 = require("./event");
const makefunc_1 = require("./makefunc");
const nativetype_1 = require("./nativetype");
const source_map_support_1 = require("./source-map-support");
const util_1 = require("./util");
const windows_h_1 = require("./windows_h");
var JsErrorCode;
(function (JsErrorCode) {
    JsErrorCode[JsErrorCode["JsNoError"] = 0] = "JsNoError";
    JsErrorCode[JsErrorCode["JsErrorCategoryUsage"] = 65536] = "JsErrorCategoryUsage";
    JsErrorCode[JsErrorCode["JsErrorInvalidArgument"] = 65537] = "JsErrorInvalidArgument";
    JsErrorCode[JsErrorCode["JsErrorNullArgument"] = 65538] = "JsErrorNullArgument";
    JsErrorCode[JsErrorCode["JsErrorNoCurrentContext"] = 65539] = "JsErrorNoCurrentContext";
    JsErrorCode[JsErrorCode["JsErrorInExceptionState"] = 65540] = "JsErrorInExceptionState";
    JsErrorCode[JsErrorCode["JsErrorNotImplemented"] = 65541] = "JsErrorNotImplemented";
    JsErrorCode[JsErrorCode["JsErrorWrongThread"] = 65542] = "JsErrorWrongThread";
    JsErrorCode[JsErrorCode["JsErrorRuntimeInUse"] = 65543] = "JsErrorRuntimeInUse";
    JsErrorCode[JsErrorCode["JsErrorBadSerializedScript"] = 65544] = "JsErrorBadSerializedScript";
    JsErrorCode[JsErrorCode["JsErrorInDisabledState"] = 65545] = "JsErrorInDisabledState";
    JsErrorCode[JsErrorCode["JsErrorCannotDisableExecution"] = 65546] = "JsErrorCannotDisableExecution";
    JsErrorCode[JsErrorCode["JsErrorHeapEnumInProgress"] = 65547] = "JsErrorHeapEnumInProgress";
    JsErrorCode[JsErrorCode["JsErrorArgumentNotObject"] = 65548] = "JsErrorArgumentNotObject";
    JsErrorCode[JsErrorCode["JsErrorInProfileCallback"] = 65549] = "JsErrorInProfileCallback";
    JsErrorCode[JsErrorCode["JsErrorInThreadServiceCallback"] = 65550] = "JsErrorInThreadServiceCallback";
    JsErrorCode[JsErrorCode["JsErrorCannotSerializeDebugScript"] = 65551] = "JsErrorCannotSerializeDebugScript";
    JsErrorCode[JsErrorCode["JsErrorAlreadyDebuggingContext"] = 65552] = "JsErrorAlreadyDebuggingContext";
    JsErrorCode[JsErrorCode["JsErrorAlreadyProfilingContext"] = 65553] = "JsErrorAlreadyProfilingContext";
    JsErrorCode[JsErrorCode["JsErrorIdleNotEnabled"] = 65554] = "JsErrorIdleNotEnabled";
    JsErrorCode[JsErrorCode["JsCannotSetProjectionEnqueueCallback"] = 65555] = "JsCannotSetProjectionEnqueueCallback";
    JsErrorCode[JsErrorCode["JsErrorCannotStartProjection"] = 65556] = "JsErrorCannotStartProjection";
    JsErrorCode[JsErrorCode["JsErrorInObjectBeforeCollectCallback"] = 65557] = "JsErrorInObjectBeforeCollectCallback";
    JsErrorCode[JsErrorCode["JsErrorObjectNotInspectable"] = 65558] = "JsErrorObjectNotInspectable";
    JsErrorCode[JsErrorCode["JsErrorPropertyNotSymbol"] = 65559] = "JsErrorPropertyNotSymbol";
    JsErrorCode[JsErrorCode["JsErrorPropertyNotString"] = 65560] = "JsErrorPropertyNotString";
    JsErrorCode[JsErrorCode["JsErrorCategoryEngine"] = 131072] = "JsErrorCategoryEngine";
    JsErrorCode[JsErrorCode["JsErrorOutOfMemory"] = 131073] = "JsErrorOutOfMemory";
    JsErrorCode[JsErrorCode["JsErrorCategoryScript"] = 196608] = "JsErrorCategoryScript";
    JsErrorCode[JsErrorCode["JsErrorScriptException"] = 196609] = "JsErrorScriptException";
    JsErrorCode[JsErrorCode["JsErrorScriptCompile"] = 196610] = "JsErrorScriptCompile";
    JsErrorCode[JsErrorCode["JsErrorScriptTerminated"] = 196611] = "JsErrorScriptTerminated";
    JsErrorCode[JsErrorCode["JsErrorScriptEvalDisabled"] = 196612] = "JsErrorScriptEvalDisabled";
    JsErrorCode[JsErrorCode["JsErrorCategoryFatal"] = 262144] = "JsErrorCategoryFatal";
    JsErrorCode[JsErrorCode["JsErrorFatal"] = 262145] = "JsErrorFatal";
    JsErrorCode[JsErrorCode["JsErrorWrongRuntime"] = 262146] = "JsErrorWrongRuntime";
})(JsErrorCode || (JsErrorCode = {}));
let GetModuleFileNameW = null;
function getDllNameFromAddress(addr) {
    if (GetModuleFileNameW === null) {
        GetModuleFileNameW = makefunc_1.makefunc.js(core_1.cgate.GetProcAddress(dllraw_1.dllraw.kernel32.module, "GetModuleFileNameW"), nativetype_1.int32_t, null, core_1.VoidPointer, makefunc_1.makefunc.Buffer, nativetype_1.int32_t);
    }
    const buffer = new Uint16Array(windows_h_1.MAX_PATH);
    const n = GetModuleFileNameW(addr, buffer, windows_h_1.MAX_PATH);
    if (n === 0)
        return null;
    return String.fromCharCode(...buffer.subarray(0, n));
}
function installErrorHandler() {
    core_1.jshook.setOnError(event_1.events.errorFire);
    const origEmit = process.emit;
    process.emit = function (type, ...args) {
        switch (type) {
            case "uncaughtException":
                event_1.events.errorFire(args[0]);
                return true;
            case "unhandledRejection":
                event_1.events.errorFire(args[0]);
                return true;
        }
        return origEmit.apply(this, arguments);
    };
    // default runtime error handler
    core_1.runtimeError.setHandler(err => {
        if (!err) {
            err = Error(`Native crash without error object, (result=${err})`);
        }
        (0, source_map_support_1.remapError)(err);
        function minimizeName(filepath) {
            const deps = filepath.match(/\\node-chakracore\\deps\\(.+)$/);
            if (deps !== null) {
                return "node\\" + deps[1];
            }
            const chakra = filepath.match(/\\node-chakracore\\src\\(.+)$/);
            if (chakra !== null) {
                return "node\\" + chakra[1];
            }
            const core = filepath.match(/\\bdsx-core\\bdsx\\(.+)$/);
            if (core !== null) {
                return "bdsx-core\\" + core[1];
            }
            return filepath;
        }
        if (err.code && err.nativeStack && err.exceptionInfos) {
            const lastSender = core_1.ipfilter.getLastSender();
            console.error("[ Native Crash ]");
            console.error(`Last packet from IP: ${lastSender}`);
            console.error("[ Native Stack ]");
            const chakraErrorNumber = err.code & 0x0fffffff;
            if ((err.code & 0xf0000000) === (0xe0000000 | 0) && JsErrorCode[chakraErrorNumber] != null) {
                console.error(`${JsErrorCode[chakraErrorNumber]}(0x${(0, util_1.numberWithFillZero)(chakraErrorNumber, 8, 16)})`);
            }
            else {
                let errmsg = `${core_1.runtimeError.codeToString(err.code)}(0x${(0, util_1.numberWithFillZero)(err.code, 8, 16)})`;
                switch (err.code) {
                    case windows_h_1.EXCEPTION_ACCESS_VIOLATION: {
                        const info = err.exceptionInfos;
                        errmsg += `, Accessing an invalid memory address at 0x${(0, util_1.numberWithFillZero)(info[1], 16, 16)}`;
                        break;
                    }
                }
                console.error(errmsg);
            }
            let insideChakra = false;
            for (const frame of err.nativeStack) {
                let moduleName = frame.moduleName;
                if (moduleName != null) {
                    moduleName = path.basename(moduleName);
                }
                else if (frame.base === null) {
                    moduleName = "null";
                }
                else {
                    moduleName = getDllNameFromAddress(frame.base);
                    if (moduleName === null) {
                        moduleName = frame.base.toString();
                    }
                    else {
                        moduleName = path.basename(moduleName);
                    }
                }
                const isChakraDll = moduleName.toLowerCase() === "chakracore.dll";
                if (isChakraDll) {
                    if (insideChakra)
                        continue;
                    insideChakra = true;
                    console.error("   at (ChakraCore)");
                    continue;
                }
                let out = `   at ${frame.address} `;
                const info = core_1.runtimeError.lookUpFunctionEntry(frame.address);
                const funcname = frame.functionName;
                let funcinfo = null;
                if (info !== null && info[1] != null) {
                    const address = info[0].add(info[1]);
                    funcinfo = {
                        address,
                        offset: frame.address.subptr(address),
                    };
                }
                if (funcname !== null) {
                    out += `${moduleName}!${frame.functionName}`;
                    if (funcinfo !== null) {
                        out += ` +0x${funcinfo.offset.toString(16)}`;
                    }
                }
                else {
                    let asmname;
                    if (funcinfo !== null && (asmname = assembler_1.asm.getFunctionNameFromEntryAddress(funcinfo.address)) !== null) {
                        out += `(asm) ${asmname} +0x${funcinfo.offset.toString(16)}`;
                    }
                    else {
                        // unknown
                        const addr = frame.address.getAddressAsFloat();
                        if (addr >= 0x1000) {
                            if (insideChakra)
                                continue;
                            out += "(unknown) ";
                        }
                        else {
                            out += "(invalid) ";
                        }
                        if (frame.base == null) {
                            out += frame.address;
                        }
                        else {
                            out += `${moduleName}+0x${frame.address.subptr(frame.base).toString(16)}`;
                        }
                    }
                }
                const filepath = frame.fileName;
                if (filepath !== null) {
                    const pathname = minimizeName(filepath);
                    out += ` (${pathname}:${frame.lineNumber})`;
                }
                console.error(out);
                insideChakra = false;
            }
            console.error("[ JS Stack ]");
        }
        else {
            console.error("[ JS Crash ]");
        }
        try {
            if (err instanceof Error && !err.stack)
                throw err;
        }
        catch (err) { }
        console.error(err.stack || err.message || err);
    });
}
exports.installErrorHandler = installErrorHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JoYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXJyb3JoYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZCQUE2QjtBQUM3QiwyQ0FBa0M7QUFDbEMsaUNBQTRFO0FBQzVFLHFDQUFrQztBQUNsQyxtQ0FBaUM7QUFDakMseUNBQXNDO0FBQ3RDLDZDQUF1QztBQUN2Qyw2REFBa0Q7QUFDbEQsaUNBQTRDO0FBQzVDLDJDQUFtRTtBQUVuRSxJQUFLLFdBeUNKO0FBekNELFdBQUssV0FBVztJQUNaLHVEQUFhLENBQUE7SUFFYixpRkFBOEIsQ0FBQTtJQUM5QixxRkFBc0IsQ0FBQTtJQUN0QiwrRUFBbUIsQ0FBQTtJQUNuQix1RkFBdUIsQ0FBQTtJQUN2Qix1RkFBdUIsQ0FBQTtJQUN2QixtRkFBcUIsQ0FBQTtJQUNyQiw2RUFBa0IsQ0FBQTtJQUNsQiwrRUFBbUIsQ0FBQTtJQUNuQiw2RkFBMEIsQ0FBQTtJQUMxQixxRkFBc0IsQ0FBQTtJQUN0QixtR0FBNkIsQ0FBQTtJQUM3QiwyRkFBeUIsQ0FBQTtJQUN6Qix5RkFBd0IsQ0FBQTtJQUN4Qix5RkFBd0IsQ0FBQTtJQUN4QixxR0FBOEIsQ0FBQTtJQUM5QiwyR0FBaUMsQ0FBQTtJQUNqQyxxR0FBOEIsQ0FBQTtJQUM5QixxR0FBOEIsQ0FBQTtJQUM5QixtRkFBcUIsQ0FBQTtJQUNyQixpSEFBb0MsQ0FBQTtJQUNwQyxpR0FBNEIsQ0FBQTtJQUM1QixpSEFBb0MsQ0FBQTtJQUNwQywrRkFBMkIsQ0FBQTtJQUMzQix5RkFBd0IsQ0FBQTtJQUN4Qix5RkFBd0IsQ0FBQTtJQUV4QixvRkFBK0IsQ0FBQTtJQUMvQiw4RUFBa0IsQ0FBQTtJQUVsQixvRkFBK0IsQ0FBQTtJQUMvQixzRkFBc0IsQ0FBQTtJQUN0QixrRkFBb0IsQ0FBQTtJQUNwQix3RkFBdUIsQ0FBQTtJQUN2Qiw0RkFBeUIsQ0FBQTtJQUV6QixrRkFBOEIsQ0FBQTtJQUM5QixrRUFBWSxDQUFBO0lB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