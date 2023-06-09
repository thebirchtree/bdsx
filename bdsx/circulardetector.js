"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircularDetector = void 0;
const bin_1 = require("./bin");
const core_1 = require("./core");
let detector = null;
let ref = 0;
class CircularDetector {
    constructor() {
        this.map = new Map();
        this.keyCounter = 0;
    }
    static decreaseDepth(options) {
        return Object.assign({}, options, {
            depth: options.depth === null ? null : options.depth - 1,
        });
    }
    static makeTemporalClass(name, instance, options) {
        if (options.seen.length === 0) {
            name += `<${options.stylize(instance.toString(), "number")}>`;
        }
        class Class {
        }
        Object.defineProperty(Class, "name", { value: name });
        return Class;
    }
    check(instance, allocator, cb) {
        let key;
        if (instance instanceof core_1.VoidPointer) {
            let ctorKey = this.map.get(instance.constructor);
            if (ctorKey == null) {
                ctorKey = bin_1.bin.makeVar(this.keyCounter++);
                this.map.set(instance.constructor, ctorKey);
            }
            key = instance.getAddressBin() + ctorKey;
        }
        else {
            key = instance;
        }
        const res = this.map.get(key);
        if (res != null)
            return res;
        const value = allocator();
        this.map.set(key, value);
        if (cb !== undefined)
            cb(value);
        return value;
    }
    release() {
        if (--ref === 0) {
            process.nextTick(() => {
                if (ref === 0)
                    detector = null;
            });
        }
    }
    static getInstance() {
        if (ref++ === 0 && detector === null) {
            detector = new CircularDetector();
        }
        return detector;
    }
    static check(instance, allocator, cb) {
        const detector = CircularDetector.getInstance();
        const res = detector.check(instance, allocator, cb);
        detector.release();
        return res;
    }
}
exports.CircularDetector = CircularDetector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY3VsYXJkZXRlY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNpcmN1bGFyZGV0ZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQTRCO0FBQzVCLGlDQUFxQztBQUVyQyxJQUFJLFFBQVEsR0FBNEIsSUFBSSxDQUFDO0FBQzdDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztBQUVaLE1BQWEsZ0JBQWdCO0lBQTdCO1FBQ3FCLFFBQUcsR0FBRyxJQUFJLEdBQUcsRUFBb0IsQ0FBQztRQUMzQyxlQUFVLEdBQUcsQ0FBQyxDQUFDO0lBdUQzQixDQUFDO0lBckRHLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBNEI7UUFDN0MsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUU7WUFDOUIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFFLE9BQWUsQ0FBQyxLQUFLLEdBQUcsQ0FBQztTQUNwRSxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQVksRUFBRSxRQUFxQixFQUFFLE9BQTRCO1FBQ3RGLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzNCLElBQUksSUFBSSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUM7U0FDakU7UUFDRCxNQUFNLEtBQUs7U0FBRztRQUNkLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxLQUFLLENBQUksUUFBaUIsRUFBRSxTQUFrQixFQUFFLEVBQXVCO1FBQ25FLElBQUksR0FBWSxDQUFDO1FBQ2pCLElBQUksUUFBUSxZQUFZLGtCQUFXLEVBQUU7WUFDakMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBdUIsQ0FBQztZQUN2RSxJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7Z0JBQ2pCLE9BQU8sR0FBRyxTQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQy9DO1lBQ0QsR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLEVBQUUsR0FBRyxPQUFPLENBQUM7U0FDNUM7YUFBTTtZQUNILEdBQUcsR0FBRyxRQUFRLENBQUM7U0FDbEI7UUFDRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixJQUFJLEdBQUcsSUFBSSxJQUFJO1lBQUUsT0FBTyxHQUFRLENBQUM7UUFDakMsTUFBTSxLQUFLLEdBQUcsU0FBUyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLElBQUksRUFBRSxLQUFLLFNBQVM7WUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELE9BQU87UUFDSCxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRTtZQUNiLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFO2dCQUNsQixJQUFJLEdBQUcsS0FBSyxDQUFDO29CQUFFLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDbkMsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFDRCxNQUFNLENBQUMsV0FBVztRQUNkLElBQUksR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7WUFDbEMsUUFBUSxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztTQUNyQztRQUNELE9BQU8sUUFBUyxDQUFDO0lBQ3JCLENBQUM7SUFDRCxNQUFNLENBQUMsS0FBSyxDQUFJLFFBQWlCLEVBQUUsU0FBa0IsRUFBRSxFQUF1QjtRQUMxRSxNQUFNLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNoRCxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDcEQsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25CLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztDQUNKO0FBekRELDRDQXlEQyJ9