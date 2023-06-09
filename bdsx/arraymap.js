"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayMap = void 0;
class ArrayMap {
    constructor() {
        this.map = new Map();
    }
    has(key) {
        const arr = this.map.get(key);
        if (arr == null)
            return false;
        return arr.length !== 0;
    }
    count(key) {
        const arr = this.map.get(key);
        if (arr == null)
            return 0;
        return arr.length;
    }
    push(key, value) {
        const array = this.map.get(key);
        if (array != null)
            array.push(value);
        else
            this.map.set(key, [value]);
    }
    pop(key) {
        const array = this.map.get(key);
        if (array == null)
            return undefined;
        const out = array.pop();
        if (array.length === 0) {
            this.map.delete(key);
        }
        return out;
    }
    delete(key) {
        return this.map.delete(key);
    }
    clear() {
        this.map.clear();
    }
    keys() {
        return this.map.keys();
    }
    values() {
        return this.map.values();
    }
    /**
     * @deprecated Typo!
     */
    entires() {
        return this.map.entries();
    }
    entries() {
        return this.map.entries();
    }
    [Symbol.iterator]() {
        return this.map.entries();
    }
}
exports.ArrayMap = ArrayMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXltYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcnJheW1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLFFBQVE7SUFBckI7UUFDcUIsUUFBRyxHQUFHLElBQUksR0FBRyxFQUFZLENBQUM7SUE0RC9DLENBQUM7SUExREcsR0FBRyxDQUFDLEdBQVE7UUFDUixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixJQUFJLEdBQUcsSUFBSSxJQUFJO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDOUIsT0FBTyxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQVE7UUFDVixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixJQUFJLEdBQUcsSUFBSSxJQUFJO1lBQUUsT0FBTyxDQUFDLENBQUM7UUFDMUIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLENBQUMsR0FBUSxFQUFFLEtBQVE7UUFDbkIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEMsSUFBSSxLQUFLLElBQUksSUFBSTtZQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O1lBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELEdBQUcsQ0FBQyxHQUFRO1FBQ1IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEMsSUFBSSxLQUFLLElBQUksSUFBSTtZQUFFLE9BQU8sU0FBUyxDQUFDO1FBQ3BDLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQVE7UUFDWCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsTUFBTTtRQUNGLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxPQUFPO1FBQ0gsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxPQUFPO1FBQ0gsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDYixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDOUIsQ0FBQztDQUNKO0FBN0RELDRCQTZEQyJ9