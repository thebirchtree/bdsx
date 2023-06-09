"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryUnlocker = void 0;
const dll_1 = require("./dll");
const windows_h_1 = require("./windows_h");
const int32buffer = new Int32Array(1);
class MemoryUnlocker {
    constructor(ptr, size) {
        this.ptr = ptr;
        this.size = size;
        if (!dll_1.dll.kernel32.VirtualProtect(ptr, size, windows_h_1.PAGE_EXECUTE_WRITECOPY, int32buffer))
            throw Error(`${ptr}: ${size} bytes, Failed to unprotect memory`);
        this.oldprotect = int32buffer[0];
    }
    done() {
        if (!dll_1.dll.kernel32.VirtualProtect(this.ptr, this.size, this.oldprotect, int32buffer))
            throw Error(`${this.ptr}: ${this.size} bytes, Failed to re-protect memory`);
    }
}
exports.MemoryUnlocker = MemoryUnlocker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5sb2NrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1bmxvY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwrQkFBNEI7QUFDNUIsMkNBQXFEO0FBRXJELE1BQU0sV0FBVyxHQUFHLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRXRDLE1BQWEsY0FBYztJQUd2QixZQUE2QixHQUFnQixFQUFtQixJQUFZO1FBQS9DLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFBbUIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUN4RSxJQUFJLENBQUMsU0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxrQ0FBc0IsRUFBRSxXQUFXLENBQUM7WUFBRSxNQUFNLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxJQUFJLG9DQUFvQyxDQUFDLENBQUM7UUFDbkosSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsU0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDO1lBQy9FLE1BQU0sS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsSUFBSSxxQ0FBcUMsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7Q0FDSjtBQVpELHdDQVlDIn0=