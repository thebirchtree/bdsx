"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dllraw = void 0;
const core_1 = require("./core");
var dllraw;
(function (dllraw) {
    let kernel32;
    (function (kernel32) {
        kernel32.module = core_1.cgate.GetModuleHandleW("kernel32.dll");
        kernel32.GetCurrentThreadId = core_1.cgate.GetProcAddress(kernel32.module, "GetCurrentThreadId");
        kernel32.Sleep = core_1.cgate.GetProcAddress(kernel32.module, "Sleep");
    })(kernel32 = dllraw.kernel32 || (dllraw.kernel32 = {}));
    let vcruntime140;
    (function (vcruntime140) {
        vcruntime140.module = core_1.cgate.GetModuleHandleW("vcruntime140.dll");
        vcruntime140.memcpy = core_1.cgate.GetProcAddress(vcruntime140.module, "memcpy");
    })(vcruntime140 = dllraw.vcruntime140 || (dllraw.vcruntime140 = {}));
    let ucrtbase;
    (function (ucrtbase) {
        ucrtbase.module = core_1.cgate.GetModuleHandleW("ucrtbase.dll");
        ucrtbase.malloc = core_1.cgate.GetProcAddress(ucrtbase.module, "malloc");
    })(ucrtbase = dllraw.ucrtbase || (dllraw.ucrtbase = {}));
    let ntdll;
    (function (ntdll) {
        ntdll.module = core_1.cgate.GetModuleHandleW("ntdll.dll");
        const ptr = core_1.cgate.GetProcAddress(ntdll.module, "wine_get_version");
        ntdll.wine_get_version = ptr.isNull() ? null : ptr;
    })(ntdll = dllraw.ntdll || (dllraw.ntdll = {}));
    dllraw.current = core_1.cgate.GetModuleHandleW(null);
})(dllraw = exports.dllraw || (exports.dllraw = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGxscmF3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGxscmF3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUErQjtBQUUvQixJQUFpQixNQUFNLENBc0J0QjtBQXRCRCxXQUFpQixNQUFNO0lBQ25CLElBQWlCLFFBQVEsQ0FJeEI7SUFKRCxXQUFpQixRQUFRO1FBQ1IsZUFBTSxHQUFHLFlBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNoRCwyQkFBa0IsR0FBRyxZQUFLLENBQUMsY0FBYyxDQUFDLFNBQUEsTUFBTSxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDeEUsY0FBSyxHQUFHLFlBQUssQ0FBQyxjQUFjLENBQUMsU0FBQSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDL0QsQ0FBQyxFQUpnQixRQUFRLEdBQVIsZUFBUSxLQUFSLGVBQVEsUUFJeEI7SUFDRCxJQUFpQixZQUFZLENBRzVCO0lBSEQsV0FBaUIsWUFBWTtRQUNaLG1CQUFNLEdBQUcsWUFBSyxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDcEQsbUJBQU0sR0FBRyxZQUFLLENBQUMsY0FBYyxDQUFDLGFBQUEsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2pFLENBQUMsRUFIZ0IsWUFBWSxHQUFaLG1CQUFZLEtBQVosbUJBQVksUUFHNUI7SUFDRCxJQUFpQixRQUFRLENBR3hCO0lBSEQsV0FBaUIsUUFBUTtRQUNSLGVBQU0sR0FBRyxZQUFLLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDaEQsZUFBTSxHQUFHLFlBQUssQ0FBQyxjQUFjLENBQUMsU0FBQSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDakUsQ0FBQyxFQUhnQixRQUFRLEdBQVIsZUFBUSxLQUFSLGVBQVEsUUFHeEI7SUFDRCxJQUFpQixLQUFLLENBS3JCO0lBTEQsV0FBaUIsS0FBSztRQUNMLFlBQU0sR0FBRyxZQUFLLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFMUQsTUFBTSxHQUFHLEdBQUcsWUFBSyxDQUFDLGNBQWMsQ0FBQyxNQUFBLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2hELHNCQUFnQixHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDOUQsQ0FBQyxFQUxnQixLQUFLLEdBQUwsWUFBSyxLQUFMLFlBQUssUUFLckI7SUFFWSxjQUFPLEdBQUcsWUFBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hELENBQUMsRUF0QmdCLE1BQU0sR0FBTixjQUFNLEtBQU4sY0FBTSxRQXNCdEIifQ==