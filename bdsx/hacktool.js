"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hacktool = void 0;
const assembler_1 = require("./assembler");
const dll_1 = require("./dll");
var hacktool;
(function (hacktool) {
    /**
     * @param keepRegister
     * @param keepFloatRegister
     * @param tempRegister
     */
    function hookWithCallOriginal(from, to, originalCodeSize, keepRegister, keepFloatRegister, tempRegister) {
        const newcode = (0, assembler_1.asm)();
        newcode.saveAndCall(to, keepRegister, keepFloatRegister);
        newcode.write(...from.getBuffer(originalCodeSize));
        if (tempRegister != null)
            newcode.jmp64(from, tempRegister);
        else
            newcode.jmp64_notemp(from.add(originalCodeSize));
        const jumper = (0, assembler_1.asm)().jmp64(newcode.alloc(), assembler_1.Register.rax).buffer();
        if (jumper.length > originalCodeSize)
            throw Error(`Too small area to hook, needs=${jumper.length}, originalCodeSize=${originalCodeSize}`);
        from.setBuffer(jumper);
        dll_1.dll.vcruntime140.memset(from.add(jumper.length), 0xcc, originalCodeSize - jumper.length); // fill int3 at remained
    }
    hacktool.hookWithCallOriginal = hookWithCallOriginal;
    function patch(from, to, tmpRegister, originalCodeSize, call) {
        let jumper;
        if (call) {
            jumper = (0, assembler_1.asm)().call64(to, tmpRegister).buffer();
        }
        else {
            jumper = (0, assembler_1.asm)().jmp64(to, tmpRegister).buffer();
        }
        if (jumper.length > originalCodeSize)
            throw Error(`Too small area to patch, require=${jumper.length}, actual=${originalCodeSize}`);
        from.setBuffer(jumper);
        dll_1.dll.vcruntime140.memset(from.add(jumper.length), 0x90, originalCodeSize - jumper.length); // fill nop at remained
    }
    hacktool.patch = patch;
    function jump(from, to, tmpRegister, originalCodeSize) {
        const jumper = (0, assembler_1.asm)().jmp64(to, tmpRegister).buffer();
        if (jumper.length > originalCodeSize)
            throw Error(`Too small area to patch, require=${jumper.length}, actual=${originalCodeSize}`);
        from.setBuffer(jumper);
        dll_1.dll.vcruntime140.memset(from.add(jumper.length), 0x90, originalCodeSize - jumper.length); // fill nop at remained
    }
    hacktool.jump = jump;
})(hacktool = exports.hacktool || (exports.hacktool = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFja3Rvb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoYWNrdG9vbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBMkQ7QUFFM0QsK0JBQTRCO0FBRTVCLElBQWlCLFFBQVEsQ0FnRHhCO0FBaERELFdBQWlCLFFBQVE7SUFDckI7Ozs7T0FJRztJQUNILFNBQWdCLG9CQUFvQixDQUNoQyxJQUFtQixFQUNuQixFQUFlLEVBQ2YsZ0JBQXdCLEVBQ3hCLFlBQXdCLEVBQ3hCLGlCQUFrQyxFQUNsQyxZQUE4QjtRQUU5QixNQUFNLE9BQU8sR0FBRyxJQUFBLGVBQUcsR0FBRSxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3pELE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUVuRCxJQUFJLFlBQVksSUFBSSxJQUFJO1lBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7O1lBQ3ZELE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFFdEQsTUFBTSxNQUFNLEdBQUcsSUFBQSxlQUFHLEdBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLG9CQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbkUsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLGdCQUFnQjtZQUFFLE1BQU0sS0FBSyxDQUFDLGlDQUFpQyxNQUFNLENBQUMsTUFBTSxzQkFBc0IsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1FBRTFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsU0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLHdCQUF3QjtJQUN0SCxDQUFDO0lBcEJlLDZCQUFvQix1QkFvQm5DLENBQUE7SUFFRCxTQUFnQixLQUFLLENBQUMsSUFBbUIsRUFBRSxFQUFlLEVBQUUsV0FBcUIsRUFBRSxnQkFBd0IsRUFBRSxJQUFhO1FBQ3RILElBQUksTUFBa0IsQ0FBQztRQUN2QixJQUFJLElBQUksRUFBRTtZQUNOLE1BQU0sR0FBRyxJQUFBLGVBQUcsR0FBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDbkQ7YUFBTTtZQUNILE1BQU0sR0FBRyxJQUFBLGVBQUcsR0FBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDbEQ7UUFFRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCO1lBQUUsTUFBTSxLQUFLLENBQUMsb0NBQW9DLE1BQU0sQ0FBQyxNQUFNLFlBQVksZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1FBRW5JLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsU0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLHVCQUF1QjtJQUNySCxDQUFDO0lBWmUsY0FBSyxRQVlwQixDQUFBO0lBRUQsU0FBZ0IsSUFBSSxDQUFDLElBQW1CLEVBQUUsRUFBZSxFQUFFLFdBQXFCLEVBQUUsZ0JBQXdCO1FBQ3RHLE1BQU0sTUFBTSxHQUFHLElBQUEsZUFBRyxHQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNyRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCO1lBQUUsTUFBTSxLQUFLLENBQUMsb0NBQW9DLE1BQU0sQ0FBQyxNQUFNLFlBQVksZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1FBQ25JLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsU0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLHVCQUF1QjtJQUNySCxDQUFDO0lBTGUsYUFBSSxPQUtuQixDQUFBO0FBQ0wsQ0FBQyxFQWhEZ0IsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFnRHhCIn0=