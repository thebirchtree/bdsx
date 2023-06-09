"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decay = void 0;
const core_1 = require("./core");
const decayed = Symbol("[decayedproto]");
core_1.VoidPointer.prototype[decayed] = core_1.VoidPointer.prototype;
function _() {
    throw Error("This object is decayed. Native objects are unusable after it deleted");
}
function getDecayed(v) {
    if (v.hasOwnProperty(decayed)) {
        return v[decayed];
    }
    const obj = Object.create(getDecayed(v.__proto__));
    const properties = {};
    for (const key of Object.getOwnPropertyNames(v)) {
        properties[key] = { get: _ };
    }
    Object.defineProperties(obj, properties);
    obj[decayed] = obj;
    return (v[decayed] = obj);
}
/**
 * make it unusable.
 */
function decay(obj) {
    obj.__proto__ = getDecayed(obj.__proto__);
}
exports.decay = decay;
(function (decay) {
    function isDecayed(obj) {
        return obj[decayed] === obj.__proto__;
    }
    decay.isDecayed = isDecayed;
})(decay = exports.decay || (exports.decay = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZWNheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBcUM7QUFFckMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFPekMsa0JBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsa0JBQVcsQ0FBQyxTQUFTLENBQUM7QUFFdkQsU0FBUyxDQUFDO0lBQ04sTUFBTSxLQUFLLENBQUMsc0VBQXNFLENBQUMsQ0FBQztBQUN4RixDQUFDO0FBRUQsU0FBUyxVQUFVLENBQXdCLENBQUk7SUFDM0MsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzNCLE9BQVEsQ0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzlCO0lBRUQsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUUsQ0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDNUQsTUFBTSxVQUFVLEdBQTBCLEVBQUUsQ0FBQztJQUM3QyxLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUM3QyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7S0FDaEM7SUFDRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3pDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDbkIsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUM5QixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFnQixLQUFLLENBQUMsR0FBZ0I7SUFDakMsR0FBVyxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUUsR0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2hFLENBQUM7QUFGRCxzQkFFQztBQUVELFdBQWlCLEtBQUs7SUFDbEIsU0FBZ0IsU0FBUyxDQUFDLEdBQWdCO1FBQ3RDLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFNLEdBQVcsQ0FBQyxTQUFTLENBQUM7SUFDbkQsQ0FBQztJQUZlLGVBQVMsWUFFeEIsQ0FBQTtBQUNMLENBQUMsRUFKZ0IsS0FBSyxHQUFMLGFBQUssS0FBTCxhQUFLLFFBSXJCIn0=