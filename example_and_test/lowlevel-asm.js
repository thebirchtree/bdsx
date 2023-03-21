"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assembler_1 = require("bdsx/assembler");
const symbols_1 = require("bdsx/bds/symbols");
const makefunc_1 = require("bdsx/makefunc");
const nativetype_1 = require("bdsx/nativetype");
// https://docs.microsoft.com/en-us/cpp/build/x64-calling-convention?view=msvc-160
// According to the calling convension
// rax = return value
// rcx = 1st parameter
// rdx = 2nd parameter
// r8 = 3rd parameter
// r9 = 4th parameter
// XMM0 = 1st parameter for float
// XMM1 = 2nd parameter for float
// XMM2 = 3nd parameter for float
// XMM3 = 4nd parameter for float
// stack frame must be aligned with 16 bytes
const printf = symbols_1.proc.printf;
// return value
// int func_return_1()
const func_return_1_raw = (0, assembler_1.asm)()
    .mov_r_c(assembler_1.Register.rax, 1) // mov rax, 1;   set rax to 1. it's treated as a return value
    .alloc("func_return_1_new");
const func_return_1_js = makefunc_1.makefunc.js(func_return_1_raw, nativetype_1.int32_t); // make it as js
console.assert(func_return_1_js() === 1);
// call printf
// void func_call_printf(char*)
const func_call_printf = (0, assembler_1.asm)()
    .stack_c(0x28) // sub rsp, 0x28; make a stack frame, 0x20 for the parameters space and 8 for the alignment, stack will unwind at the end
    .mov_r_r(assembler_1.Register.r8, assembler_1.Register.rdx) // mov rdx, rcx; set the 3rd parameter from the 2nd parameter
    .mov_r_r(assembler_1.Register.rdx, assembler_1.Register.rcx) // mov rdx, rcx; set the 2nd parameter from the 1st parameter
    .mov_r_c(assembler_1.Register.rcx, assembler_1.asm.const_str("[example/lowlevel-asm] %s, %s!\n")) // mov rcx, '...'; set the 1st parameter
    .call64(printf, assembler_1.Register.rax) // mov rax, printf; call rax;
    .alloc("func_call_printf");
const func_call_printf_js = makefunc_1.makefunc.js(func_call_printf, nativetype_1.void_t, null, makefunc_1.makefunc.Ansi, makefunc_1.makefunc.Ansi); // make it as js
func_call_printf_js("Hello", "World");
// 0xffff as short = -1
// short of makefunc.js
const ffff_as_short_js = (0, assembler_1.asm)()
    .mov_r_c(assembler_1.Register.rax, 0xffff) // mov rax, 0xffff
    .make(nativetype_1.int16_t, { name: "ffff_as_short" });
console.assert(ffff_as_short_js() === -1);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG93bGV2ZWwtYXNtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG93bGV2ZWwtYXNtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQStDO0FBQy9DLDhDQUF3QztBQUN4Qyw0Q0FBeUM7QUFDekMsZ0RBQTJEO0FBRTNELGtGQUFrRjtBQUNsRixzQ0FBc0M7QUFDdEMscUJBQXFCO0FBQ3JCLHNCQUFzQjtBQUN0QixzQkFBc0I7QUFDdEIscUJBQXFCO0FBQ3JCLHFCQUFxQjtBQUNyQixpQ0FBaUM7QUFDakMsaUNBQWlDO0FBQ2pDLGlDQUFpQztBQUNqQyxpQ0FBaUM7QUFDakMsNENBQTRDO0FBRTVDLE1BQU0sTUFBTSxHQUFHLGNBQUksQ0FBQyxNQUFNLENBQUM7QUFFM0IsZUFBZTtBQUNmLHNCQUFzQjtBQUN0QixNQUFNLGlCQUFpQixHQUFHLElBQUEsZUFBRyxHQUFFO0tBQzFCLE9BQU8sQ0FBQyxvQkFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyw2REFBNkQ7S0FDdEYsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFFaEMsTUFBTSxnQkFBZ0IsR0FBRyxtQkFBUSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxvQkFBTyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0I7QUFDbEYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBRXpDLGNBQWM7QUFDZCwrQkFBK0I7QUFDL0IsTUFBTSxnQkFBZ0IsR0FBRyxJQUFBLGVBQUcsR0FBRTtLQUN6QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMseUhBQXlIO0tBQ3ZJLE9BQU8sQ0FBQyxvQkFBUSxDQUFDLEVBQUUsRUFBRSxvQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLDZEQUE2RDtLQUNoRyxPQUFPLENBQUMsb0JBQVEsQ0FBQyxHQUFHLEVBQUUsb0JBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyw2REFBNkQ7S0FDakcsT0FBTyxDQUFDLG9CQUFRLENBQUMsR0FBRyxFQUFFLGVBQUcsQ0FBQyxTQUFTLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxDQUFDLHdDQUF3QztLQUNqSCxNQUFNLENBQUMsTUFBTSxFQUFFLG9CQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsNkJBQTZCO0tBQzFELEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRS9CLE1BQU0sbUJBQW1CLEdBQUcsbUJBQVEsQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsbUJBQU0sRUFBRSxJQUFJLEVBQUUsbUJBQVEsQ0FBQyxJQUFJLEVBQUUsbUJBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGdCQUFnQjtBQUN2SCxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFdEMsdUJBQXVCO0FBQ3ZCLHVCQUF1QjtBQUN2QixNQUFNLGdCQUFnQixHQUFHLElBQUEsZUFBRyxHQUFFO0tBQ3pCLE9BQU8sQ0FBQyxvQkFBUSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxrQkFBa0I7S0FDaEQsSUFBSSxDQUFDLG9CQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQztBQUU5QyxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyJ9