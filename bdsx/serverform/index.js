"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerForm = void 0;
const asmcode_1 = require("../asm/asmcode");
const assembler_1 = require("../assembler");
const common_1 = require("../common");
const core_1 = require("../core");
const dll_1 = require("../dll");
const makefunc_1 = require("../makefunc");
const nativetype_1 = require("../nativetype");
const source_map_support_1 = require("../source-map-support");
const windows_h_1 = require("../windows_h");
const messageloop_1 = require("./messageloop");
const user32 = messageloop_1.messageLoop.user32;
const CreateWindowEx = user32.getFunction("CreateWindowExW", windows_h_1.HWND, null, nativetype_1.int32_t, core_1.VoidPointer, makefunc_1.makefunc.Utf16, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.int32_t, windows_h_1.HWND, core_1.VoidPointer, core_1.VoidPointer, core_1.VoidPointer);
const RegisterClass = user32.getFunction("RegisterClassExW", windows_h_1.ATOM, null, windows_h_1.WNDCLASSEXW);
const LoadCursor = user32.getFunction("LoadCursorW", core_1.VoidPointer, null, core_1.VoidPointer, core_1.VoidPointer);
const GetSysColorBrush = user32.getFunction("GetSysColorBrush", core_1.VoidPointer, null, nativetype_1.int32_t);
const DefWindowProc = user32.getFunction("DefWindowProcW", core_1.VoidPointer, null, windows_h_1.HWND, nativetype_1.int32_t, core_1.VoidPointer, core_1.VoidPointer);
const CloseWindow = user32.getFunction("CloseWindow", nativetype_1.bool_t, null, windows_h_1.HWND);
const GetWindowLongPtr = user32.getFunction("GetWindowLongPtrW", core_1.VoidPointer, null, windows_h_1.HWND, nativetype_1.int32_t);
const SetWindowLongPtr = user32.getFunction("SetWindowLongPtrW", core_1.VoidPointer, null, windows_h_1.HWND, nativetype_1.int32_t, core_1.VoidPointer);
const WM_NCCREATE = 0x0081;
const WM_DESTROY = 0x0002;
const WM_COMMAND = 0x0111;
const GWLP_WNDPROC = -4;
const GWLP_HINSTANCE = -6;
const GWLP_HWNDPARENT = -8;
const GWLP_USERDATA = -21;
const GWLP_ID = -12;
const ITEM_ID_START = 100;
let classRegistered = false;
const CLASS_NAME = "bdsx_server_ui";
const CLASS_NAME_PTR = assembler_1.asm.const_str(CLASS_NAME, common_1.Encoding.Utf16);
const CLASS_BUTTON = assembler_1.asm.const_str("BUTTON", common_1.Encoding.Utf16);
const arrowCursor = LoadCursor(null, windows_h_1.IDC_ARROW);
const bgBrush = GetSysColorBrush(windows_h_1.COLOR_WINDOW);
const fromJsValue = makefunc_1.makefunc.js(asmcode_1.asmcode.returnRcx, makefunc_1.makefunc.JsValueRef, null, core_1.VoidPointer);
const wndProc = makefunc_1.makefunc.np((window, msg, wParam, lParam) => {
    try {
        let serverUi;
        if (msg === WM_NCCREATE) {
            const param = lParam.as(windows_h_1.CREATESTRUCT).lpCreateParams;
            SetWindowLongPtr(window, GWLP_USERDATA, param);
            serverUi = fromJsValue(param);
        }
        else {
            const value = GetWindowLongPtr(window, GWLP_USERDATA);
            serverUi = fromJsValue(value);
        }
        if (serverUi instanceof ServerForm) {
            serverUi.onMessage(msg, wParam, lParam);
        }
    }
    catch (err) {
        (0, source_map_support_1.remapAndPrintError)(err);
    }
    return DefWindowProc(window, msg, wParam, lParam);
}, core_1.VoidPointer, null, windows_h_1.HWND, nativetype_1.int32_t, core_1.VoidPointer, core_1.VoidPointer);
class ServerForm {
    constructor(title, width, height) {
        this.alive = true;
        this.buttonCbs = [];
        if (!classRegistered) {
            classRegistered = true;
            const cls = new windows_h_1.WNDCLASSEXW(true);
            cls.cbSize = windows_h_1.WNDCLASSEXW[nativetype_1.NativeType.size];
            cls.style = windows_h_1.CS_HREDRAW | windows_h_1.CS_VREDRAW;
            cls.lpfnWndProc = wndProc;
            cls.cbClsExtra = 0;
            cls.cbWndExtra = 0;
            cls.hInstance = dll_1.dll.current;
            cls.hIcon = null;
            cls.hCursor = arrowCursor;
            cls.hbrBackground = bgBrush;
            cls.lpszMenuName = null;
            cls.lpszClassName = CLASS_NAME_PTR;
            cls.hIconSm = null;
            RegisterClass(cls);
        }
        messageloop_1.messageLoop.ref();
        core_1.chakraUtil.JsAddRef(this);
        this.handle = CreateWindowEx(0, CLASS_NAME_PTR, title, windows_h_1.WS_VISIBLE | windows_h_1.WS_CAPTION | windows_h_1.WS_SYSMENU, windows_h_1.CW_USEDEFAULT, windows_h_1.CW_USEDEFAULT, width, height, null, null, dll_1.dll.current, core_1.chakraUtil.asJsValueRef(this));
    }
    button(name, x, y, width, height, cb) {
        const id = this.buttonCbs.push(cb) - 1;
        CreateWindowEx(0, CLASS_BUTTON, name, windows_h_1.WS_VISIBLE | windows_h_1.WS_CHILD | windows_h_1.WS_TABSTOP | windows_h_1.BS_DEFPUSHBUTTON, x, y, width, height, this.handle, core_1.VoidPointer.fromAddress(ITEM_ID_START + id, 0), dll_1.dll.current, null);
    }
    onMessage(msg, wParam, lParam) {
        switch (msg) {
            case WM_DESTROY:
                if (this.alive) {
                    this.alive = false;
                    messageloop_1.messageLoop.unref();
                    core_1.chakraUtil.JsRelease(this);
                }
                break;
            case WM_COMMAND: {
                const id = wParam.getAddressLow() & 0xffff;
                if (id >= ITEM_ID_START) {
                    const cb = this.buttonCbs[id - ITEM_ID_START];
                    if (cb != null)
                        cb();
                }
                break;
            }
        }
    }
    close() {
        CloseWindow(this.handle);
    }
}
exports.ServerForm = ServerForm;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0Q0FBeUM7QUFDekMsNENBQW1DO0FBQ25DLHNDQUFxQztBQUNyQyxrQ0FBa0Q7QUFDbEQsZ0NBQTZCO0FBQzdCLDBDQUF1QztBQUN2Qyw4Q0FBNEQ7QUFDNUQsOERBQTJEO0FBQzNELDRDQWdCc0I7QUFDdEIsK0NBQTRDO0FBRTVDLE1BQU0sTUFBTSxHQUFHLHlCQUFXLENBQUMsTUFBTSxDQUFDO0FBQ2xDLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQ3JDLGlCQUFpQixFQUNqQixnQkFBSSxFQUNKLElBQUksRUFDSixvQkFBTyxFQUNQLGtCQUFXLEVBQ1gsbUJBQVEsQ0FBQyxLQUFLLEVBQ2Qsb0JBQU8sRUFDUCxvQkFBTyxFQUNQLG9CQUFPLEVBQ1Asb0JBQU8sRUFDUCxvQkFBTyxFQUNQLGdCQUFJLEVBQ0osa0JBQVcsRUFDWCxrQkFBVyxFQUNYLGtCQUFXLENBQ2QsQ0FBQztBQUNGLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEVBQUUsZ0JBQUksRUFBRSxJQUFJLEVBQUUsdUJBQVcsQ0FBQyxDQUFDO0FBQ3RGLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLGtCQUFXLEVBQUUsSUFBSSxFQUFFLGtCQUFXLEVBQUUsa0JBQVcsQ0FBQyxDQUFDO0FBQ2xHLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxrQkFBVyxFQUFFLElBQUksRUFBRSxvQkFBTyxDQUFDLENBQUM7QUFDNUYsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxrQkFBVyxFQUFFLElBQUksRUFBRSxnQkFBSSxFQUFFLG9CQUFPLEVBQUUsa0JBQVcsRUFBRSxrQkFBVyxDQUFDLENBQUM7QUFDdkgs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