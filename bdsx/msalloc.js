"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.msAlloc = void 0;
const capi_1 = require("./capi");
const core_1 = require("./core");
const nativetype_1 = require("./nativetype");
const prochacker_1 = require("./prochacker");
const _Big_allocation_threshold = 4096;
const _Big_allocation_alignment = 32;
var msAlloc;
(function (msAlloc) {
    msAlloc.allocate = prochacker_1.procHacker.js("??$_Allocate@$0BA@U_Default_allocate_traits@std@@$0A@@std@@YAPEAX_K@Z", core_1.NativePointer, null, nativetype_1.uint64_as_float_t);
    function deallocate(ptr, bytes) {
        if (bytes >= _Big_allocation_threshold) {
            ptr = ptr.getPointer(-8);
        }
        capi_1.capi.free(ptr);
    }
    msAlloc.deallocate = deallocate;
})(msAlloc = exports.msAlloc || (exports.msAlloc = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXNhbGxvYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1zYWxsb2MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQThCO0FBQzlCLGlDQUFzRDtBQUN0RCw2Q0FBaUQ7QUFDakQsNkNBQTBDO0FBRTFDLE1BQU0seUJBQXlCLEdBQUcsSUFBSSxDQUFDO0FBQ3ZDLE1BQU0seUJBQXlCLEdBQUcsRUFBRSxDQUFDO0FBRXJDLElBQWlCLE9BQU8sQ0FhdkI7QUFiRCxXQUFpQixPQUFPO0lBQ1AsZ0JBQVEsR0FBcUMsdUJBQVUsQ0FBQyxFQUFFLENBQ25FLHVFQUF1RSxFQUN2RSxvQkFBYSxFQUNiLElBQUksRUFDSiw4QkFBaUIsQ0FDcEIsQ0FBQztJQUNGLFNBQWdCLFVBQVUsQ0FBQyxHQUFrQixFQUFFLEtBQWE7UUFDeEQsSUFBSSxLQUFLLElBQUkseUJBQXlCLEVBQUU7WUFDcEMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1QjtRQUNELFdBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUxlLGtCQUFVLGFBS3pCLENBQUE7QUFDTCxDQUFDLEVBYmdCLE9BQU8sR0FBUCxlQUFPLEtBQVAsZUFBTyxRQWF2QiJ9