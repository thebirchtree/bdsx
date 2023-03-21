"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wineCompatible = void 0;
const tslib_1 = require("tslib");
const child_process = require("child_process");
const fs = require("fs");
const path = require("path");
const config_1 = require("./config");
const core_1 = require("./core");
const dll_1 = require("./dll");
const dllraw_1 = require("./dllraw");
const fsutil_1 = require("./fsutil");
const makefunc_1 = require("./makefunc");
const nativeclass_1 = require("./nativeclass");
const nativetype_1 = require("./nativetype");
const pointer_1 = require("./pointer");
function initWineExec() {
    var STARTUPINFO_1, PROCESS_INFORMATION_1;
    let STARTUPINFO = STARTUPINFO_1 = class STARTUPINFO extends nativeclass_1.NativeStruct {
        clear() {
            this.fill(0, STARTUPINFO_1[nativetype_1.NativeType.size]);
            this.cb = PROCESS_INFORMATION[nativetype_1.NativeType.size];
        }
    };
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
    ], STARTUPINFO.prototype, "cb", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(core_1.VoidPointer)
    ], STARTUPINFO.prototype, "lpReserved", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(core_1.VoidPointer)
    ], STARTUPINFO.prototype, "lpDesktop", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(core_1.VoidPointer)
    ], STARTUPINFO.prototype, "lpTitle", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
    ], STARTUPINFO.prototype, "dwX", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
    ], STARTUPINFO.prototype, "dwY", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
    ], STARTUPINFO.prototype, "dwXSize", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
    ], STARTUPINFO.prototype, "dwYSize", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
    ], STARTUPINFO.prototype, "dwXCountChars", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
    ], STARTUPINFO.prototype, "dwYCountChars", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
    ], STARTUPINFO.prototype, "dwFillAttribute", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
    ], STARTUPINFO.prototype, "dwFlags", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.uint16_t)
    ], STARTUPINFO.prototype, "wShowWindow", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.uint16_t)
    ], STARTUPINFO.prototype, "cbReserved2", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(core_1.VoidPointer)
    ], STARTUPINFO.prototype, "lpReserved2", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(core_1.VoidPointer)
    ], STARTUPINFO.prototype, "hStdInput", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(core_1.VoidPointer)
    ], STARTUPINFO.prototype, "hStdOutput", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(core_1.VoidPointer)
    ], STARTUPINFO.prototype, "hStdError", void 0);
    STARTUPINFO = STARTUPINFO_1 = tslib_1.__decorate([
        (0, nativeclass_1.nativeClass)()
    ], STARTUPINFO);
    let PROCESS_INFORMATION = PROCESS_INFORMATION_1 = class PROCESS_INFORMATION extends nativeclass_1.NativeStruct {
        clear() {
            this.fill(0, PROCESS_INFORMATION_1[nativetype_1.NativeType.size]);
        }
    };
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(core_1.VoidPointer)
    ], PROCESS_INFORMATION.prototype, "hProcess", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(core_1.VoidPointer)
    ], PROCESS_INFORMATION.prototype, "hThread", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
    ], PROCESS_INFORMATION.prototype, "dwProcessId", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
    ], PROCESS_INFORMATION.prototype, "dwThreadId", void 0);
    PROCESS_INFORMATION = PROCESS_INFORMATION_1 = tslib_1.__decorate([
        (0, nativeclass_1.nativeClass)()
    ], PROCESS_INFORMATION);
    const CreateProcess = makefunc_1.makefunc.js(core_1.cgate.GetProcAddress(dllraw_1.dllraw.kernel32.module, "CreateProcessW"), nativetype_1.bool_t, null, makefunc_1.makefunc.Utf16, makefunc_1.makefunc.Utf16, core_1.VoidPointer, core_1.VoidPointer, nativetype_1.bool_t, nativetype_1.int32_t, core_1.VoidPointer, makefunc_1.makefunc.Utf16, STARTUPINFO, PROCESS_INFORMATION);
    const Int32Wrapper = pointer_1.Wrapper.make(nativetype_1.int32_t);
    const GetExitCodeProcess = makefunc_1.makefunc.js(core_1.cgate.GetProcAddress(dllraw_1.dllraw.kernel32.module, "GetExitCodeProcess"), nativetype_1.bool_t, null, core_1.VoidPointer, Int32Wrapper);
    /**
     * call kernel32.dll!CreateProcess
     * @param cwd default is the project root.
     */
    function createSync(exePath, parameters, cwd = fsutil_1.fsutil.projectPath) {
        const INFINITE = -1;
        const si = new STARTUPINFO(true);
        const pi = new PROCESS_INFORMATION(true);
        si.clear();
        pi.clear();
        const res = CreateProcess(exePath, parameters, null, null, false, 0, null, cwd, si, pi);
        if (!res) {
            throw Error(`CreateProcess failed with ${dll_1.dll.kernel32.GetLastError()} error`);
        }
        dll_1.dll.kernel32.WaitForSingleObject(pi.hProcess, INFINITE);
        const out = new Int32Wrapper(true);
        GetExitCodeProcess(pi.hProcess, out);
        dll_1.dll.kernel32.CloseHandle(pi.hProcess);
        dll_1.dll.kernel32.CloseHandle(pi.hThread);
        return out.value;
    }
    return (commandLine, cwd) => {
        // XXX: wine bdsx cannot access process.env.compsec
        createSync("C:\\windows\\system32\\cmd.exe", `/c /bin/sh -c "${commandLine}"`, cwd);
    };
}
var wineCompatible;
(function (wineCompatible) {
})(wineCompatible = exports.wineCompatible || (exports.wineCompatible = {}));
if (config_1.Config.WINE) {
    wineCompatible.execSync = initWineExec();
    wineCompatible.removeRecursiveSync = function (filepath) {
        if (!filepath.startsWith("Z:"))
            throw Error(`${filepath}: no linux path`);
        wineCompatible.execSync("rm -rf " + filepath.substr(2).replace(/\\/g, "/"), process.cwd());
    };
}
else {
    wineCompatible.execSync = (commandLine, cwd) => {
        child_process.execSync(commandLine, {
            stdio: "inherit",
            cwd: cwd != null ? cwd : fsutil_1.fsutil.projectPath,
        });
    };
    wineCompatible.removeRecursiveSync = function (filepath) {
        const s = fs.statSync(filepath);
        if (s.isDirectory()) {
            const files = fs.readdirSync(filepath);
            for (const file of files) {
                wineCompatible.removeRecursiveSync(path.join(filepath, file));
            }
            fs.rmdirSync(filepath);
        }
        else {
            fs.unlinkSync(filepath);
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZWNvbXBhdGlibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aW5lY29tcGF0aWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsK0NBQStDO0FBQy9DLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFDN0IscUNBQWtDO0FBQ2xDLGlDQUE0QztBQUM1QywrQkFBNEI7QUFDNUIscUNBQWtDO0FBQ2xDLHFDQUFrQztBQUNsQyx5Q0FBc0M7QUFDdEMsK0NBQXVFO0FBQ3ZFLDZDQUFxRTtBQUNyRSx1Q0FBb0M7QUFFcEMsU0FBUyxZQUFZOztJQUVqQixJQUFNLFdBQVcsbUJBQWpCLE1BQU0sV0FBWSxTQUFRLDBCQUFZO1FBc0NsQyxLQUFLO1lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsYUFBVyxDQUFDLHVCQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsRUFBRSxHQUFHLG1CQUFtQixDQUFDLHVCQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsQ0FBQztLQUNKLENBQUE7SUF4Q0c7UUFEQyxJQUFBLHlCQUFXLEVBQUMsb0JBQU8sQ0FBQzsyQ0FDVDtJQUVaO1FBREMsSUFBQSx5QkFBVyxFQUFDLGtCQUFXLENBQUM7bURBQ0Q7SUFFeEI7UUFEQyxJQUFBLHlCQUFXLEVBQUMsa0JBQVcsQ0FBQztrREFDRjtJQUV2QjtRQURDLElBQUEseUJBQVcsRUFBQyxrQkFBVyxDQUFDO2dEQUNKO0lBRXJCO1FBREMsSUFBQSx5QkFBVyxFQUFDLG9CQUFPLENBQUM7NENBQ1I7SUFFYjtRQURDLElBQUEseUJBQVcsRUFBQyxvQkFBTyxDQUFDOzRDQUNSO0lBRWI7UUFEQyxJQUFBLHlCQUFXLEVBQUMsb0JBQU8sQ0FBQztnREFDSjtJQUVqQjtRQURDLElBQUEseUJBQVcsRUFBQyxvQkFBTyxDQUFDO2dEQUNKO0lBRWpCO1FBREMsSUFBQSx5QkFBVyxFQUFDLG9CQUFPLENBQUM7c0RBQ0U7SUFF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