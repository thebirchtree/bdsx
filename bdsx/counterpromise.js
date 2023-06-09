"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounterPromise = void 0;
class CounterPromise {
    constructor() {
        this.resolve = null;
        this.counter = 0;
        this.prom = Promise.resolve();
    }
    increase() {
        if (this.counter === Number.MAX_SAFE_INTEGER)
            throw Error("counter overflow");
        if (this.counter === 0) {
            this.prom = new Promise(resolve => {
                this.resolve = resolve;
            });
        }
        this.counter++;
    }
    decrease() {
        if (this.counter === 0)
            throw Error("counter overflow");
        this.counter--;
        if (this.counter === 0) {
            this.resolve();
            this.resolve = null;
        }
    }
    /**
     * wait till the counter is zero.
     */
    wait() {
        return this.prom;
    }
}
exports.CounterPromise = CounterPromise;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnRlcnByb21pc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb3VudGVycHJvbWlzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLGNBQWM7SUFBM0I7UUFDWSxZQUFPLEdBQXdCLElBQUksQ0FBQztRQUNwQyxZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osU0FBSSxHQUFrQixPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUEyQnBELENBQUM7SUF6QkcsUUFBUTtRQUNKLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxNQUFNLENBQUMsZ0JBQWdCO1lBQUUsTUFBTSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM5RSxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQU8sT0FBTyxDQUFDLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFDRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQztZQUFFLE1BQU0sS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLENBQUMsRUFBRTtZQUNwQixJQUFJLENBQUMsT0FBUSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJO1FBQ0EsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7Q0FDSjtBQTlCRCx3Q0E4QkMifQ==