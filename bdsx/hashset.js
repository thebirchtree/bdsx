"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashSet = void 0;
const hashkey = Symbol("hash");
const nextlink = Symbol("hash_next");
const INITIAL_CAP = 16;
class HashSet {
    constructor() {
        this.array = new Array(INITIAL_CAP);
        this.size = 0;
        for (let i = 0; i < INITIAL_CAP; i++) {
            this.array[i] = null;
        }
    }
    _resetCap(n) {
        const narray = new Array(n);
        for (let i = 0; i < n; i++) {
            narray[i] = null;
        }
        for (let item of this.array) {
            for (;;) {
                if (item === null)
                    break;
                const next = item[nextlink];
                const idx = item[hashkey] % narray.length;
                item[nextlink] = narray[idx];
                narray[idx] = item;
                item = next;
            }
        }
        this.array.length = 0;
        this.array = narray;
    }
    [Symbol.iterator]() {
        return this.keys();
    }
    keys() {
        return this.values();
    }
    *values() {
        for (let item of this.array) {
            for (;;) {
                if (item === null)
                    break;
                yield item;
                item = item[nextlink];
            }
        }
    }
    get(item) {
        let hash = item[hashkey];
        if (hash == null)
            hash = item[hashkey] = item.hash();
        const idx = (hash >>> 0) % this.array.length;
        let found = this.array[idx];
        for (;;) {
            if (found === null)
                return null;
            if (found[hashkey] === hash && item.equals(found))
                return found;
            found = found[nextlink];
        }
    }
    has(item) {
        let hash = item[hashkey];
        if (hash == null)
            hash = item[hashkey] = item.hash();
        const idx = (hash >>> 0) % this.array.length;
        let found = this.array[idx];
        for (;;) {
            if (found === null)
                return false;
            if (found[hashkey] === hash && item.equals(found))
                return true;
            found = found[nextlink];
        }
    }
    delete(item) {
        let hash = item[hashkey];
        if (hash == null)
            hash = item[hashkey] = item.hash();
        const idx = (hash >>> 0) % this.array.length;
        let found = this.array[idx];
        if (found === null)
            return false;
        if (found[hashkey] === hash && item.equals(found)) {
            this.array[idx] = found[nextlink];
            found[nextlink] = null;
            this.size--;
            return true;
        }
        for (;;) {
            const next = found[nextlink];
            if (next === null)
                return false;
            if (next[hashkey] === hash && next.equals(found)) {
                found[nextlink] = next[nextlink];
                next[nextlink] = null;
                this.size--;
                return true;
            }
            found = next;
        }
    }
    add(item) {
        this.size++;
        const cap = this.array.length;
        if (this.size > (cap * 3) >> 2) {
            this._resetCap((cap * 3) >> 1);
        }
        let hash = item[hashkey];
        if (hash == null)
            hash = item[hashkey] = item.hash();
        const idx = (hash >>> 0) % cap;
        item[nextlink] = this.array[idx];
        this.array[idx] = item;
        return this;
    }
}
exports.HashSet = HashSet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzaHNldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhhc2hzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQy9CLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQVNyQyxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFFdkIsTUFBYSxPQUFPO0lBSWhCO1FBSFEsVUFBSyxHQUFpQixJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5QyxTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBR1osS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUN4QjtJQUNMLENBQUM7SUFFTyxTQUFTLENBQUMsQ0FBUztRQUN2QixNQUFNLE1BQU0sR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDcEI7UUFFRCxLQUFLLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDekIsU0FBUztnQkFDTCxJQUFJLElBQUksS0FBSyxJQUFJO29CQUFFLE1BQU07Z0JBQ3pCLE1BQU0sSUFBSSxHQUFhLElBQUksQ0FBQyxRQUFRLENBQU0sQ0FBQztnQkFFM0MsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzdCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBRW5CLElBQUksR0FBRyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDYixPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxDQUFDLE1BQU07UUFDSCxLQUFLLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDekIsU0FBUztnQkFDTCxJQUFJLElBQUksS0FBSyxJQUFJO29CQUFFLE1BQU07Z0JBQ3pCLE1BQU0sSUFBSSxDQUFDO2dCQUNYLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFNLENBQUM7YUFDOUI7U0FDSjtJQUNMLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBTztRQUNQLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QixJQUFJLElBQUksSUFBSSxJQUFJO1lBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFckQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDN0MsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixTQUFTO1lBQ0wsSUFBSSxLQUFLLEtBQUssSUFBSTtnQkFBRSxPQUFPLElBQUksQ0FBQztZQUNoQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFDaEUsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQU0sQ0FBQztTQUNoQztJQUNMLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBTztRQUNQLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QixJQUFJLElBQUksSUFBSSxJQUFJO1lBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFckQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDN0MsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixTQUFTO1lBQ0wsSUFBSSxLQUFLLEtBQUssSUFBSTtnQkFBRSxPQUFPLEtBQUssQ0FBQztZQUNqQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQUUsT0FBTyxJQUFJLENBQUM7WUFDL0QsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQU0sQ0FBQztTQUNoQztJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBTztRQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QixJQUFJLElBQUksSUFBSSxJQUFJO1lBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFckQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDN0MsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixJQUFJLEtBQUssS0FBSyxJQUFJO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDakMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFNLENBQUM7WUFDdkMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWixPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsU0FBUztZQUNMLE1BQU0sSUFBSSxHQUFHLEtBQU0sQ0FBQyxRQUFRLENBQU0sQ0FBQztZQUNuQyxJQUFJLElBQUksS0FBSyxJQUFJO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1lBRWhDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUM5QyxLQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUN0QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ1osT0FBTyxJQUFJLENBQUM7YUFDZjtZQUNELEtBQUssR0FBRyxJQUFJLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBRUQsR0FBRyxDQUFDLElBQU87UUFDUCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUM5QixJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDbEM7UUFFRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekIsSUFBSSxJQUFJLElBQUksSUFBSTtZQUFFLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXJELE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN2QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUF0SEQsMEJBc0hDIn0=