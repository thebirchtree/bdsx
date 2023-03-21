"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Call Native Functions
const core_1 = require("bdsx/core");
const dll_1 = require("bdsx/dll");
const makefunc_1 = require("bdsx/makefunc");
const nativetype_1 = require("bdsx/nativetype");
const kernel32 = dll_1.NativeModule.load("Kernel32.dll");
const user32 = dll_1.NativeModule.load("User32.dll");
const GetConsoleWindow = kernel32.getFunction("GetConsoleWindow", core_1.VoidPointer);
const SetWindowText = user32.getFunction("SetWindowTextW", nativetype_1.void_t, null, core_1.VoidPointer, makefunc_1.makefunc.Utf16);
const wnd = GetConsoleWindow();
SetWindowText(wnd, "BDSX Window!!!");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG93bGV2ZWwtZGxsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG93bGV2ZWwtZGxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0JBQXdCO0FBQ3hCLG9DQUF3QztBQUN4QyxrQ0FBd0M7QUFDeEMsNENBQXlDO0FBQ3pDLGdEQUF5QztBQUV6QyxNQUFNLFFBQVEsR0FBRyxrQkFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNuRCxNQUFNLE1BQU0sR0FBRyxrQkFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMvQyxNQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEVBQUUsa0JBQVcsQ0FBQyxDQUFDO0FBQy9FLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsbUJBQU0sRUFBRSxJQUFJLEVBQUUsa0JBQVcsRUFBRSxtQkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3RHLE1BQU0sR0FBRyxHQUFHLGdCQUFnQixFQUFFLENBQUM7QUFDL0IsYUFBYSxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDIn0=