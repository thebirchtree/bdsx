"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineObjectKey = void 0;
class CombinedKey {
}
const combinedKeyMap = Symbol("combinedKeyMap");
function combineObjectKey(obj1, obj2) {
    const base = obj1;
    let map = base[combinedKeyMap];
    if (map == null)
        base[combinedKeyMap] = map = new WeakMap();
    let res = map.get(obj2);
    if (res == null) {
        map.set(obj2, (res = new CombinedKey()));
    }
    return res;
}
exports.combineObjectKey = combineObjectKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5Y29tYmluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImtleWNvbWJpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTSxXQUFXO0NBQUc7QUFFcEIsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFFaEQsU0FBZ0IsZ0JBQWdCLENBQUMsSUFBc0IsRUFBRSxJQUFzQjtJQUMzRSxNQUFNLElBQUksR0FBaUUsSUFBVyxDQUFDO0lBQ3ZGLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMvQixJQUFJLEdBQUcsSUFBSSxJQUFJO1FBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTVELElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO1FBQ2IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDNUM7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFWRCw0Q0FVQyJ9