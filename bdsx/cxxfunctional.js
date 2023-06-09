"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CxxLess = void 0;
const dll_1 = require("./dll");
const nativetype_1 = require("./nativetype");
const pointer_1 = require("./pointer");
const lesses = new WeakMap();
/**
 * std::less
 */
exports.CxxLess = {
    /**
     * get defined std::less<type>
     *
     * it's just a kind of getter but uses 'make' for consistency.
     */
    make(type) {
        const fn = lesses.get(type);
        if (fn == null)
            throw Error(`std::less<${type.name}> not found`);
        return fn;
    },
    /**
     * define std::less<type>
     */
    define(type, less) {
        const fn = lesses.get(type);
        if (fn != null)
            throw Error(`std::less<${type.name}> is already defined`);
        lesses.set(type, less);
    },
};
function compare(a, alen, b, blen) {
    const diff = dll_1.dll.vcruntime140.memcmp(a, b, Math.min(alen, blen));
    if (diff !== 0)
        return diff;
    if (alen < blen)
        return -1;
    if (alen > blen)
        return 1;
    return 0;
}
exports.CxxLess.define(pointer_1.CxxStringWrapper, (a, b) => compare(a, a.length, b, b.length) < 0);
exports.CxxLess.define(nativetype_1.CxxString, (a, b) => a < b);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3h4ZnVuY3Rpb25hbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImN4eGZ1bmN0aW9uYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0JBQTRCO0FBQzVCLDZDQUErQztBQUMvQyx1Q0FBNkM7QUFFN0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxPQUFPLEVBQTBDLENBQUM7QUFFckU7O0dBRUc7QUFDVSxRQUFBLE9BQU8sR0FBRztJQUNuQjs7OztPQUlHO0lBQ0gsSUFBSSxDQUFJLElBQWE7UUFDakIsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixJQUFJLEVBQUUsSUFBSSxJQUFJO1lBQUUsTUFBTSxLQUFLLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxhQUFhLENBQUMsQ0FBQztRQUNqRSxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sQ0FBSSxJQUFhLEVBQUUsSUFBNkI7UUFDbEQsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixJQUFJLEVBQUUsSUFBSSxJQUFJO1lBQUUsTUFBTSxLQUFLLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxzQkFBc0IsQ0FBQyxDQUFDO1FBQzFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7Q0FDSixDQUFDO0FBSUYsU0FBUyxPQUFPLENBQUMsQ0FBYyxFQUFFLElBQVksRUFBRSxDQUFjLEVBQUUsSUFBWTtJQUN2RSxNQUFNLElBQUksR0FBRyxTQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDakUsSUFBSSxJQUFJLEtBQUssQ0FBQztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQzVCLElBQUksSUFBSSxHQUFHLElBQUk7UUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzNCLElBQUksSUFBSSxHQUFHLElBQUk7UUFBRSxPQUFPLENBQUMsQ0FBQztJQUMxQixPQUFPLENBQUMsQ0FBQztBQUNiLENBQUM7QUFFRCxlQUFPLENBQUMsTUFBTSxDQUFDLDBCQUFnQixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbEYsZUFBTyxDQUFDLE1BQU0sQ0FBQyxzQkFBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDIn0=