"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMemoryLeak = void 0;
const colors = require("colors");
/**
 * check the memory leak of the input function.
 * @return the promise will be resolved when it succeeded. it does not finish if it leaked.
 */
async function checkMemoryLeak(cb, opts = {}) {
    return new Promise(resolve => {
        const loopIteration = opts.iterationForTask || 1000;
        const passIteration = opts.iterationForPass || 100;
        const sleep = opts.sleepForCollect || 500;
        let deltaSmooth = 0;
        let leakExpected = 0;
        let max = 0;
        let min = Infinity;
        let skipFront = 10;
        function printUsage(usage, message) {
            process.stdout.cursorTo(0);
            const n = usage / (1024 * 1024);
            process.stdout.write(`Memory Usage: ${n.toFixed(1)}MiB ${message}`);
            process.stdout.clearLine(1);
        }
        let maxUpdated = false;
        function checkUsage() {
            const now = process.memoryUsage().rss;
            const delta = now - usage;
            usage = now;
            deltaSmooth *= 0.9;
            deltaSmooth += delta * 0.1;
            if (skipFront > 0) {
                skipFront--;
            }
            else {
                pass++;
                maxUpdated = now > max;
                if (maxUpdated)
                    max = now;
                if (now < min)
                    min = now;
                if (maxUpdated)
                    pass = 0;
            }
            let message = "";
            let color;
            if (delta < 0) {
                message = "▼";
                color = colors.yellow;
            }
            else if (delta > 0) {
                message = "▲";
                color = maxUpdated ? colors.red : colors.yellow;
            }
            else {
                message = "■";
                color = colors.green;
            }
            if (skipFront === 0) {
                message += ` (${pass}/${passIteration})`;
                if (maxUpdated) {
                    if (leakExpected < 400)
                        leakExpected += 20;
                }
                else {
                    if (leakExpected > 0)
                        leakExpected--;
                }
                if (leakExpected > 200) {
                    warn = 10;
                }
                else if (warn > 0) {
                    warn--;
                }
                if (warn !== 0) {
                    message += colors.red(` - It seems it has a memory leak issue (Increase per iteration: ${(deltaSmooth / loopIteration).toFixed(1)}Bytes)`);
                }
                else {
                    if (max !== 0)
                        message += colors.white(` Max=${(max / (1024 * 1024)).toFixed(1)}MiB`);
                }
            }
            printUsage(usage, color(message));
            return pass >= passIteration;
        }
        let usage = process.memoryUsage().rss;
        printUsage(usage, "");
        let pass = 0;
        let warn = 0;
        const interval = setInterval(() => {
            for (let i = 0; i < loopIteration; i++) {
                cb();
            }
            if (checkUsage()) {
                clearInterval(interval);
                resolve();
                console.log();
                console.error(colors.green(`memory check passed`));
            }
        }, sleep);
    });
}
exports.checkMemoryLeak = checkMemoryLeak;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tsZWFrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hlY2tsZWFrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUFpQztBQUVqQzs7O0dBR0c7QUFDSSxLQUFLLFVBQVUsZUFBZSxDQUFDLEVBQWMsRUFBRSxPQUEwQixFQUFFO0lBQzlFLE9BQU8sSUFBSSxPQUFPLENBQU8sT0FBTyxDQUFDLEVBQUU7UUFDL0IsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQztRQUNwRCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLElBQUksR0FBRyxDQUFDO1FBQ25ELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLElBQUksR0FBRyxDQUFDO1FBQzFDLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDO1FBQ25CLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUVuQixTQUFTLFVBQVUsQ0FBQyxLQUFhLEVBQUUsT0FBZTtZQUM5QyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDaEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sT0FBTyxFQUFFLENBQUMsQ0FBQztZQUNwRSxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBQ0QsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLFNBQVMsVUFBVTtZQUNmLE1BQU0sR0FBRyxHQUFH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