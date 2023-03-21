"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bdsxEqualsAssert = exports.bdsxWarningOnce = void 0;
const colors = require("colors");
const core_1 = require("./core");
const source_map_support_1 = require("./source-map-support");
const printed = new Set();
/**
 * print warning once even it multiple
 */
function bdsxWarningOnce(message) {
    const key = (0, source_map_support_1.getCurrentStackLine)(1);
    if (printed.has(key))
        return;
    printed.add(key);
    console.error(colors.yellow("[BDSX] " + message));
}
exports.bdsxWarningOnce = bdsxWarningOnce;
function bdsxEqualsAssert(actual, expected, message) {
    if (expected === actual)
        return;
    if (expected instanceof core_1.VoidPointer && actual instanceof core_1.VoidPointer) {
        if (expected.equalsptr(actual))
            return;
    }
    console.error(colors.red(`[BDSX] Equals assertion failure, ${message}`));
    console.error(colors.red(`[BDSX] Expected: ${expected}`));
    console.error(colors.red(`[BDSX] Actual: ${actual}`));
    console.error(colors.red((0, source_map_support_1.getCurrentStackLine)(1)));
    console.error();
}
exports.bdsxEqualsAssert = bdsxEqualsAssert;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FybmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndhcm5pbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQWlDO0FBQ2pDLGlDQUFxQztBQUNyQyw2REFBMkQ7QUFFM0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztBQUVsQzs7R0FFRztBQUNILFNBQWdCLGVBQWUsQ0FBQyxPQUFlO0lBQzNDLE1BQU0sR0FBRyxHQUFHLElBQUEsd0NBQW1CLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUFFLE9BQU87SUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDdEQsQ0FBQztBQUxELDBDQUtDO0FBRUQsU0FBZ0IsZ0JBQWdCLENBQUMsTUFBZSxFQUFFLFFBQWlCLEVBQUUsT0FBZTtJQUNoRixJQUFJLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUNoQyxJQUFJLFFBQVEsWUFBWSxrQkFBVyxJQUFJLE1BQU0sWUFBWSxrQkFBVyxFQUFFO1FBQ2xFLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFBRSxPQUFPO0tBQzFDO0lBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekUsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLG9CQUFvQixRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDMUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGtCQUFrQixNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUEsd0NBQW1CLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xELE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNwQixDQUFDO0FBVkQsNENBVUMifQ==