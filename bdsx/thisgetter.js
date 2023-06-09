"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThisGetter = void 0;
const assembler_1 = require("./assembler");
const core_1 = require("./core");
const prochacker_1 = require("./prochacker");
class ThisGetter {
    constructor(dest) {
        this.dest = dest;
        this.items = [];
    }
    register(type, symbol, key) {
        const buffer = new core_1.AllocatedPointer(8);
        this.items.push({ type: type, key, buffer });
        const code = (0, assembler_1.asm)().stack_c(0x28).mov_r_c(assembler_1.Register.r10, buffer).mov_rp_r(assembler_1.Register.r10, 1, 0, assembler_1.Register.rcx).alloc();
        prochacker_1.procHacker.hookingRawWithCallOriginal(symbol, code, [], []);
    }
    finish() {
        const items = this.items;
        this.items = [];
        for (const item of items) {
            this.dest[item.key] = item.buffer.getPointerAs(item.type);
        }
    }
}
exports.ThisGetter = ThisGetter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhpc2dldHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRoaXNnZXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQTRDO0FBQzVDLGlDQUEwQztBQUUxQyw2Q0FBMEM7QUFRMUMsTUFBYSxVQUFVO0lBR25CLFlBQTZCLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBRi9CLFVBQUssR0FBMkIsRUFBRSxDQUFDO0lBRUQsQ0FBQztJQUUzQyxRQUFRLENBQXdCLElBQWlCLEVBQUUsTUFBYyxFQUFFLEdBQWU7UUFDOUUsTUFBTSxNQUFNLEdBQUcsSUFBSSx1QkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxJQUEwQixFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLE1BQU0sSUFBSSxHQUFHLElBQUEsZUFBRyxHQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxvQkFBUSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsb0JBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxvQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2xILHVCQUFVLENBQUMsMEJBQTBCLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELE1BQU07UUFDRixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3RDtJQUNMLENBQUM7Q0FDSjtBQW5CRCxnQ0FtQkMifQ==