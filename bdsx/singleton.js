"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Singleton = void 0;
const singleton = Symbol("singleton-manager");
class Singleton extends WeakMap {
    newInstance(param, allocator) {
        let instance = this.get(param);
        if (instance)
            return instance;
        instance = allocator();
        return instance;
    }
    static newInstance(base, param, mapper) {
        let map = base[singleton];
        if (map == null)
            base[singleton] = map = new Singleton();
        return map.newInstance(param, mapper);
    }
}
exports.Singleton = Singleton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xldG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2luZ2xldG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBRTlDLE1BQWEsU0FBYSxTQUFRLE9BQWU7SUFDN0MsV0FBVyxDQUFJLEtBQVEsRUFBRSxTQUFrQjtRQUN2QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksUUFBUTtZQUFFLE9BQU8sUUFBUSxDQUFDO1FBQzlCLFFBQVEsR0FBRyxTQUFTLEVBQUUsQ0FBQztRQUN2QixPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBSSxJQUFzRCxFQUFFLEtBQWMsRUFBRSxNQUFlO1FBQ3pHLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQixJQUFJLEdBQUcsSUFBSSxJQUFJO1lBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQ3pELE9BQU8sR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDMUMsQ0FBQztDQUNKO0FBYkQsOEJBYUMifQ==