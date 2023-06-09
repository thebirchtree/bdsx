"use strict";
/**
 * util for managing the async tasks
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcurrencyQueue = void 0;
const os = require("os");
const EMPTY = Symbol(); // it don't use description because it's not used as a property key.
const cpuCount = os.cpus().length;
const concurrencyCount = Math.min(Math.max(cpuCount * 2, 8), cpuCount);
class ConcurrencyQueue {
    constructor(concurrency = concurrencyCount) {
        this.concurrency = concurrency;
        this.reserved = [];
        this.endResolve = null;
        this.endReject = null;
        this.endPromise = null;
        this.idleResolve = null;
        this.idleReject = null;
        this.idlePromise = null;
        this._ref = 0;
        this._error = EMPTY;
        this.verbose = false;
        this._next = () => {
            if (this.verbose)
                console.log(`Task - ${"*".repeat(this.getTaskCount())}`);
            if (this.reserved.length === 0) {
                if (this.idles === 0 && this.idleResolve !== null) {
                    this.idleResolve();
                    this.idleResolve = null;
                    this.idleReject = null;
                    this.idlePromise = null;
                }
                this.idles++;
                this._fireEnd();
                return;
            }
            const task = this.reserved.shift();
            return task().then(this._next, err => this.error(err));
        };
        this.idles = this.concurrency;
    }
    _fireEnd() {
        if (this._ref === 0 && this.idles === this.concurrency) {
            if (this.verbose)
                console.log("Task - End");
            if (this.endResolve !== null) {
                this.endResolve();
                this.endResolve = null;
                this.endReject = null;
                this.endPromise = null;
            }
        }
    }
    error(err) {
        this._error = err;
        if (this.endReject !== null) {
            this.endReject(err);
            this.endResolve = null;
            this.endReject = null;
        }
        if (this.idleReject !== null) {
            this.idleReject(err);
            this.idleResolve = null;
            this.idleReject = null;
        }
        this.idlePromise = this.endPromise = Promise.reject(this._error);
    }
    ref() {
        this._ref++;
    }
    unref() {
        this._ref--;
        this._fireEnd();
    }
    onceHasIdle() {
        if (this.idlePromise !== null)
            return this.idlePromise;
        if (this.idles !== 0)
            return Promise.resolve();
        return (this.idlePromise = new Promise((resolve, reject) => {
            this.idleResolve = resolve;
            this.idleReject = reject;
        }));
    }
    onceEnd() {
        if (this.endPromise !== null)
            return this.endPromise;
        if (this.idles === this.concurrency)
            return Promise.resolve();
        return (this.endPromise = new Promise((resolve, reject) => {
            this.endResolve = resolve;
            this.endReject = reject;
        }));
    }
    run(task) {
        this.reserved.push(task);
        if (this.idles === 0) {
            if (this.verbose)
                console.log(`Task - ${"*".repeat(this.getTaskCount())}`);
            if (this.reserved.length > this.concurrency >> 1) {
                if (this.verbose)
                    console.log("Task - Drain");
                return this.onceHasIdle();
            }
            return Promise.resolve();
        }
        this.idles--;
        this._next();
        return Promise.resolve();
    }
    getTaskCount() {
        return this.reserved.length + this.concurrency - this.idles;
    }
}
exports.ConcurrencyQueue = ConcurrencyQueue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uY3VycmVuY3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25jdXJyZW5jeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7OztBQUVILHlCQUF5QjtBQUV6QixNQUFNLEtBQUssR0FBRyxNQUFNLEVBQUUsQ0FBQyxDQUFDLG9FQUFvRTtBQUU1RixNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDO0FBQ2xDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFFdkUsTUFBYSxnQkFBZ0I7SUFhekIsWUFBNkIsY0FBYyxnQkFBZ0I7UUFBOUIsZ0JBQVcsR0FBWCxXQUFXLENBQW1CO1FBWDFDLGFBQVEsR0FBNEIsRUFBRSxDQUFDO1FBQ2hELGVBQVUsR0FBd0IsSUFBSSxDQUFDO1FBQ3ZDLGNBQVMsR0FBZ0MsSUFBSSxDQUFDO1FBQzlDLGVBQVUsR0FBeUIsSUFBSSxDQUFDO1FBQ3hDLGdCQUFXLEdBQXdCLElBQUksQ0FBQztRQUN4QyxlQUFVLEdBQWdDLElBQUksQ0FBQztRQUMvQyxnQkFBVyxHQUF5QixJQUFJLENBQUM7UUFDekMsU0FBSSxHQUFHLENBQUMsQ0FBQztRQUNULFdBQU0sR0FBUSxLQUFLLENBQUM7UUFDckIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQU1OLFVBQUssR0FBK0IsR0FBRyxFQUFFO1lBQ3RELElBQUksSUFBSSxDQUFDLE9BQU87Z0JBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRTNFLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUM1QixJQUFJLElBQUksQ0FB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