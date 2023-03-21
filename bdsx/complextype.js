"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeVarArgs = exports.MemberPointer = exports.NativeFunctionType = exports.NativeTemplateClass = exports.OverloadedFunction = exports.OverloadedEntry = void 0;
const core_1 = require("./core");
const makefunc_1 = require("./makefunc");
const mangle_1 = require("./mangle");
const nativeclass_1 = require("./nativeclass");
const nativetype_1 = require("./nativetype");
class OverloadedEntry {
    constructor(thisType, args, func) {
        this.thisType = thisType;
        this.args = args;
        this.func = func;
    }
    check(thisv, args) {
        if (this.thisType !== null) {
            if (!this.thisType.isTypeOf(thisv))
                return false;
        }
        for (let i = 0; i < args.length; i++) {
            if (!this.args[i].isTypeOf(args[i]))
                return false;
        }
        return true;
    }
    equals(thisv, args) {
        if (this.thisType !== null) {
            if (this.thisType !== thisv)
                return false;
        }
        if (args.length !== this.args.length)
            return false;
        for (let i = 0; i < args.length; i++) {
            if (this.args[i] !== args[i])
                return false;
        }
        return true;
    }
}
exports.OverloadedEntry = OverloadedEntry;
var OverloadedFunction;
(function (OverloadedFunction) {
    function make() {
        const overloads = [];
        const tfunc = function (...args) {
            for (const entry of overloads) {
                if (!entry.check(this, args))
                    continue;
                return entry.func.apply(this, args);
            }
            throw Error(`overload not found`);
        };
        tfunc.overload = function (ptr, returnType, opts, ...args) {
            const fn = makefunc_1.makefunc.js(ptr, returnType, opts, ...args);
            overloads.push(new OverloadedEntry((opts === null || opts === void 0 ? void 0 : opts.this) || null, args, fn));
            return this;
        };
        tfunc.get = function (thisType = null, ...args) {
            for (const overload of overloads) {
                if (overload.equals(thisType, args))
                    return overload;
            }
            return null;
        };
        return tfunc;
    }
    OverloadedFunction.make = make;
})(OverloadedFunction = exports.OverloadedFunction || (exports.OverloadedFunction = {}));
class NativeTemplateClass extends nativeclass_1.NativeClass {
    static make(...items) {
        class SpecializedTemplateClass extends this {
        }
        SpecializedTemplateClass.templates = items;
        Object.defineProperty(SpecializedTemplateClass, "name", {
            value: `${this.name}<${items.map(item => item.name || item.toString()).join(",")}>`,
        });
        return SpecializedTemplateClass;
    }
}
exports.NativeTemplateClass = NativeTemplateClass;
NativeTemplateClass.templates = [];
let warned = false;
function warn() {
    if (warned)
        return;
    warned = true;
    console.log(`NativeFunctionType has potential for memory leaks.`);
}
class NativeFunctionType extends nativetype_1.NativeType {
    static make(returnType, opts, ...params) {
        const makefunc_np = Symbol("[native function]");
        function getNp(func) {
            const ptr = func[makefunc_np];
            if (ptr != null)
                return ptr;
            warn();
            console.log(`a function(${ptr}) is allocated.`);
            return (func[makefunc_np] = makefunc_1.makefunc.np(func, returnType, opts, ...params));
        }
        function getJs(ptr) {
            return makefunc_1.makefunc.js(ptr, returnType, opts, ...params);
        }
        return new NativeFunctionType(`${mangle_1.mangle.funcptr(returnType, params)})`, `${returnType.name}(${params.map(param => param.name).join(",")})`, 8, 8, v => v instanceof Function, undefined, (ptr, offset) => getJs(ptr.add(offset, offset >> 31)), (ptr, value, offset) => {
            const nativeproc = getNp(value);
            ptr.setPointer(nativeproc, offset);
            return nativeproc;
        }, (stackptr, offset) => getJs(stackptr.getPointer(offset)), (stackptr, param, offset) => stackptr.setPointer(getNp(param), offset));
    }
}
exports.NativeFunctionType = NativeFunctionType;
class MemberPointer extends core_1.VoidPointer {
    static make(base, type) {
        class MemberPointerImpl extends MemberPointer {
        }
        MemberPointerImpl.prototype.base = base;
        MemberPointerImpl.prototype.type = type;
        return MemberPointerImpl;
    }
}
exports.MemberPointer = MemberPointer;
function unexpectedUsage() {
    throw Error("unexpected usage");
}
function notImplemented() {
    throw Error("not implemented");
}
exports.NativeVarArgs = new nativetype_1.NativeType("...", "NativeVarArgs", 0, 0, unexpectedUsage, unexpectedUsage, unexpectedUsage, notImplemented, notImplemented, notImplemented, notImplemented, notImplemented, notImplemented);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGxleHR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21wbGV4dHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBNkQ7QUFDN0QseUNBQXdHO0FBQ3hHLHFDQUFrQztBQUNsQywrQ0FBNEM7QUFDNUMsNkNBQWdEO0FBUWhELE1BQWEsZUFBZTtJQUN4QixZQUE0QixRQUEwQixFQUFrQixJQUFpQixFQUFrQixJQUE2QjtRQUE1RyxhQUFRLEdBQVIsUUFBUSxDQUFrQjtRQUFrQixTQUFJLEdBQUosSUFBSSxDQUFhO1FBQWtCLFNBQUksR0FBSixJQUFJLENBQXlCO0lBQUcsQ0FBQztJQUU1SSxLQUFLLENBQUMsS0FBYyxFQUFFLElBQWU7UUFDakMsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtZQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1NBQ3BEO1FBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBRSxPQUFPLEtBQUssQ0FBQztTQUNyRDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxNQUFNLENBQUMsS0FBdUIsRUFBRSxJQUFpQjtRQUM3QyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUFFO1lBQ3hCLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxLQUFLO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1NBQzdDO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU8s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