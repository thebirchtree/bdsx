"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLine = void 0;
const asmcode_1 = require("./asm/asmcode");
const symbols_1 = require("./bds/symbols");
const capi_1 = require("./capi");
const common_1 = require("./common");
const core_1 = require("./core");
const dll_1 = require("./dll");
const makefunc_1 = require("./makefunc");
const nativetype_1 = require("./nativetype");
const pointer_1 = require("./pointer");
const getline = symbols_1.proc["??$getline@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@YAAEAV?$basic_istream@DU?$char_traits@D@std@@@0@$$QEAV10@AEAV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@0@D@Z"];
const string_ctor = nativetype_1.CxxString[nativetype_1.NativeType.ctor].pointer;
const string_dtor = nativetype_1.CxxString[nativetype_1.NativeType.dtor].pointer;
const string_size = nativetype_1.CxxString[nativetype_1.NativeType.size];
if (!string_ctor || !string_dtor) {
    throw Error("cannot find the constructor and the destructor of std::string");
}
let inputEncoding = common_1.Encoding.Ansi;
asmcode_1.asmcode.std_cin = dll_1.dll.msvcp140.std_cin;
asmcode_1.asmcode.getLineProcessTask = makefunc_1.makefunc.np((asyncTask) => {
    const str = asyncTask.addAs(pointer_1.CxxStringWrapper, core_1.uv_async.sizeOfTask);
    const value = str.valueAs(inputEncoding);
    str[nativetype_1.NativeType.dtor]();
    const cb = asyncTask.getJsValueRef(core_1.uv_async.sizeOfTask + string_size);
    cb(value);
}, nativetype_1.void_t, { name: "getLineProcessTask" }, core_1.StaticPointer);
asmcode_1.asmcode.std_getline = getline;
asmcode_1.asmcode.std_string_ctor = string_ctor;
// const endTask = makefunc.np((asyncTask:StaticPointer)=>{
//     const cb:GetLineCallback = asyncTask.getJsValueRef(uv_async.sizeOfTask);
//     cb(null);
// }, void_t, null, StaticPointer);
class GetLine {
    constructor(online) {
        this.online = online;
        core_1.chakraUtil.JsAddRef(this.online);
        core_1.uv_async.open();
        const [handle] = capi_1.capi.createThread(asmcode_1.asmcode.getline, makefunc_1.makefunc.asJsValueRef(this.online));
        this.thread = handle;
    }
    static setEncoding(encoding) {
        if (encoding < common_1.Encoding.Utf8)
            throw TypeError(`${common_1.Encoding[encoding]} is not supported for GetLine.setEncoding`);
        inputEncoding = encoding;
    }
    close() {
        dll_1.dll.kernel32.TerminateThread(this.thread, 0);
        core_1.chakraUtil.JsRelease(this.online);
        core_1.uv_async.close();
    }
}
exports.GetLine = GetLine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0bGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldGxpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQXdDO0FBQ3hDLDJDQUFxQztBQUNyQyxpQ0FBOEI7QUFDOUIscUNBQW9DO0FBQ3BDLGlDQUEwRTtBQUMxRSwrQkFBMEM7QUFDMUMseUNBQXNDO0FBQ3RDLDZDQUE2RDtBQUM3RCx1Q0FBNkM7QUFJN0MsTUFBTSxPQUFPLEdBQ1QsY0FBSSxDQUNBLHFMQUFxTCxDQUN4TCxDQUFDO0FBQ04sTUFBTSxXQUFXLEdBQWlCLHNCQUFTLENBQUMsdUJBQVUsQ0FBQyxJQUFJLENBQVMsQ0FBQyxPQUFPLENBQUM7QUFDN0UsTUFBTSxXQUFXLEdBQWlCLHNCQUFTLENBQUMsdUJBQVUsQ0FBQyxJQUFJLENBQVMsQ0FBQyxPQUFPLENBQUM7QUFDN0UsTUFBTSxXQUFXLEdBQUcsc0JBQVMsQ0FBQyx1QkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRS9DLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxXQUFXLEVBQUU7SUFDOUIsTUFBTSxLQUFLLENBQUMsK0RBQStELENBQUMsQ0FBQztDQUNoRjtBQUVELElBQUksYUFBYSxHQUFHLGlCQUFRLENBQUMsSUFBSSxDQUFDO0FBRWxDLGlCQUFPLENBQUMsT0FBTyxHQUFHLFNBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO0FBQ3ZDLGlCQUFPLENBQUMsa0JBQWtCLEdBQUcsbUJBQVEsQ0FBQyxFQUFFLENBQ3BDLENBQUMsU0FBd0IsRUFBRSxFQUFFO0lBQ3pCLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsMEJBQWdCLEVBQUUsZUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ25FLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFXLENBQUM7SUFDbkQsR0FBRyxDQUFDLHVCQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUN2QixNQUFNLEVBQUUsR0FBb0IsU0FBUyxDQUFDLGFBQWEsQ0FBQyxlQUFRLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxDQUFDO0lBQ3ZGLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNkLENBQUMsRUFDRCxtQkFBTSxFQUNOLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixFQUFFLEVBQzlCLG9CQUFhLENBQ2hCLENBQUM7QUFDRixpQkFBTyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7QUFDOUIsaUJBQU8sQ0FBQyxlQUFlLEdBQUcsV0FBVyxDQUFDO0FBRXRDLDJEQUEyRDtBQUMzRCwrRUFBK0U7QUFDL0UsZ0JBQWdCO0FBQ2hCLG1DQUFtQztBQUVuQyxNQUFhLE9BQU87SUFFaEIsWUFBNkIsTUFBOEI7UUFBOUIsV0FBTSxHQUFOLE1BQU0sQ0FBd0I7UUFDdkQsaUJBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWpDLGVBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsV0FBSSxDQUFDLFlBQVksQ0FBQyxpQkFBTyxDQUFDLE9BQU8sRUFBRSxtQkFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFrQjtRQUNqQyxJQUFJLFFBQVEsR0FBRyxpQkFBUSxDQUFDLElBQUk7WUFBRSxNQUFNLFNBQVMsQ0FBQyxHQUFHLGlCQUFRLENBQUMsUUFBUSxDQUFDLDJDQUEyQyxDQUFDLENBQUM7UUFDaEgsYUFBYSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDO0lBRUQsS0FBSztRQUNELFNBQUcsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0MsaUJBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLGVBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNyQixDQUFDO0NBQ0o7QUFwQkQsMEJBb0JDIn0=