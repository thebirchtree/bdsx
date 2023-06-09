"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staticResult = void 0;
/**
 * static the function returning for optimizing
 */
function staticResult(cls, fnname, fn) {
    function pipe() {
        const result = fn.apply(this, arguments);
        cls.prototype[fnname] = (() => result);
        return result;
    }
    cls.prototype[fnname] = pipe;
}
exports.staticResult = staticResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljcmVzdWx0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RhdGljcmVzdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOztHQUVHO0FBQ0gsU0FBZ0IsWUFBWSxDQUE4QixHQUF1QixFQUFFLE1BQVksRUFBRSxFQUFhO0lBQzFHLFNBQVMsSUFBSTtRQUNULE1BQU0sTUFBTSxHQUFJLEVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQVEsQ0FBQztRQUM5QyxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBQ0QsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFXLENBQUM7QUFDeEMsQ0FBQztBQVBELG9DQU9DIn0=