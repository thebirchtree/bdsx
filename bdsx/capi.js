"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capi = void 0;
const asmcode_1 = require("./asm/asmcode");
const config_1 = require("./config");
const core_1 = require("./core");
const dll_1 = require("./dll");
const makefunc_1 = require("./makefunc");
const nativetype_1 = require("./nativetype");
var capi;
(function (capi) {
    capi.nodeThreadId = dll_1.dll.kernel32.GetCurrentThreadId();
    capi.debugBreak = makefunc_1.makefunc.js(asmcode_1.asmcode.debugBreak, nativetype_1.void_t);
    asmcode_1.asmcode.nodeThreadId = capi.nodeThreadId;
    function createThread(functionPointer, param = null, stackSize = 0) {
        const out = new Uint32Array(1);
        const handle = dll_1.dll.kernel32.CreateThread(null, stackSize, functionPointer, param, 0, out);
        return [handle, out[0]];
    }
    capi.createThread = createThread;
    function beginThreadEx(functionPointer, param = null) {
        const out = new Uint32Array(1);
        const handle = dll_1.dll.ucrtbase._beginthreadex(null, 0, functionPointer, param, 0, out);
        return [handle, out[0]];
    }
    capi.beginThreadEx = beginThreadEx;
    /**
     * memory allocate by native c
     */
    capi.malloc = dll_1.dll.ucrtbase.malloc;
    /**
     * memory release by native c
     */
    capi.free = dll_1.dll.ucrtbase.free;
    /**
     * @deprecated use Config.IS_WINE
     */
    function isRunningOnWine() {
        return config_1.Config.WINE;
    }
    capi.isRunningOnWine = isRunningOnWine;
    /**
     * Keep the object from GC
     */
    function permanent(v) {
        core_1.chakraUtil.JsAddRef(v);
        return v;
    }
    capi.permanent = permanent;
    function permaUtf8(str) {
        const ptr = core_1.AllocatedPointer.fromString(str);
        core_1.chakraUtil.JsAddRef(ptr);
        return ptr;
    }
    capi.permaUtf8 = permaUtf8;
})(capi = exports.capi || (exports.capi = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQXdDO0FBQ3hDLHFDQUFrQztBQUNsQyxpQ0FBaUc7QUFDakcsK0JBQTBDO0FBQzFDLHlDQUFzQztBQUN0Qyw2Q0FBc0M7QUFFdEMsSUFBaUIsSUFBSSxDQWdEcEI7QUFoREQsV0FBaUIsSUFBSTtJQUNKLGlCQUFZLEdBQUcsU0FBRyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBRWpELGVBQVUsR0FBRyxtQkFBUSxDQUFDLEVBQUUsQ0FBQyxpQkFBTyxDQUFDLFVBQVUsRUFBRSxtQkFBTSxDQUFDLENBQUM7SUFFbEUsaUJBQU8sQ0FBQyxZQUFZLEdBQUcsS0FBQSxZQUFZLENBQUM7SUFFcEMsU0FBZ0IsWUFBWSxDQUFDLGVBQTRCLEVBQUUsUUFBNEIsSUFBSSxFQUFFLFlBQW9CLENBQUM7UUFDOUcsTUFBTSxHQUFHLEdBQUcsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsTUFBTSxNQUFNLEdBQUcsU0FBRyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMxRixPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFKZSxpQkFBWSxlQUkzQixDQUFBO0lBRUQsU0FBZ0IsYUFBYSxDQUFDLGVBQTRCLEVBQUUsUUFBNEIsSUFBSTtRQUN4RixNQUFNLEdBQUcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixNQUFNLE1BQU0sR0FBRyxTQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BGLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUplLGtCQUFhLGdCQUk1QixDQUFBO0lBRUQ7O09BRUc7SUFDVSxXQUFNLEdBQW9DLFNBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQzNFOztPQUVHO0lBQ1UsU0FBSSxHQUErQixTQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztJQUVsRTs7T0FFRztJQUNILFNBQWdCLGVBQWU7UUFDM0IsT0FBTyxlQUFNLENBQUMsSUFBSSxDQUFDO0lBQ3ZCLENBQUM7SUFGZSxvQkFBZSxrQkFFOUIsQ0FBQTtJQUVEOztPQUVHO0lBQ0gsU0FBZ0IsU0FBUyxDQUFJLENBQUk7UUFDN0IsaUJBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBSGUsY0FBUyxZQUd4QixDQUFBO0lBRUQsU0FBZ0IsU0FBUyxDQUFDLEdBQVc7UUFDakMsTUFBTSxHQUFHLEdBQUcsdUJBQWdCLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLGlCQUFVLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUplLGNBQVMsWUFJeEIsQ0FBQTtBQUNMLENBQUMsRUFoRGdCLElBQUksR0FBSixZQUFJLEtBQUosWUFBSSxRQWdEcEIifQ==