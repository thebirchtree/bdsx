"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.progressBar = void 0;
const ProgressBar = require("progress");
let bar = null;
var progressBar;
(function (progressBar) {
    function start(name, total) {
        finish();
        bar = new ProgressBar(`${name} [:bar] :current/:total`, total);
    }
    progressBar.start = start;
    function setTotal(total) {
        if (bar === null)
            return;
        bar.total = total;
    }
    progressBar.setTotal = setTotal;
    function finish() {
        if (bar === null)
            return;
        if (!bar.complete) {
            bar.update(1);
        }
        bar = null;
    }
    progressBar.finish = finish;
    function terminate() {
        if (bar === null)
            return;
        bar.terminate();
        bar = null;
    }
    progressBar.terminate = terminate;
    function tick(count) {
        if (bar === null)
            return;
        bar.tick(count);
    }
    progressBar.tick = tick;
    function printOnProgress(message) {
        process.stdout.cursorTo(0);
        process.stdout.write(message);
        process.stdout.clearLine(1);
        console.log();
    }
    progressBar.printOnProgress = printOnProgress;
})(progressBar = exports.progressBar || (exports.progressBar = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9ncmVzc2Jhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBeUM7QUFFekMsSUFBSSxHQUFHLEdBQXVCLElBQUksQ0FBQztBQUVuQyxJQUFpQixXQUFXLENBK0IzQjtBQS9CRCxXQUFpQixXQUFXO0lBQ3hCLFNBQWdCLEtBQUssQ0FBQyxJQUFZLEVBQUUsS0FBOEM7UUFDOUUsTUFBTSxFQUFFLENBQUM7UUFDVCxHQUFHLEdBQUcsSUFBSSxXQUFXLENBQUMsR0FBRyxJQUFJLHlCQUF5QixFQUFFLEtBQVksQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFIZSxpQkFBSyxRQUdwQixDQUFBO0lBQ0QsU0FBZ0IsUUFBUSxDQUFDLEtBQWE7UUFDbEMsSUFBSSxHQUFHLEtBQUssSUFBSTtZQUFFLE9BQU87UUFDekIsR0FBRyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUhlLG9CQUFRLFdBR3ZCLENBQUE7SUFDRCxTQUFnQixNQUFNO1FBQ2xCLElBQUksR0FBRyxLQUFLLElBQUk7WUFBRSxPQUFPO1FBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO1lBQ2YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNqQjtRQUNELEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDZixDQUFDO0lBTmUsa0JBQU0sU0FNckIsQ0FBQTtJQUNELFNBQWdCLFNBQVM7UUFDckIsSUFBSSxHQUFHLEtBQUssSUFBSTtZQUFFLE9BQU87UUFDekIsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDZixDQUFDO0lBSmUscUJBQVMsWUFJeEIsQ0FBQTtJQUNELFNBQWdCLElBQUksQ0FBQyxLQUFjO1FBQy9CLElBQUksR0FBRyxLQUFLLElBQUk7WUFBRSxPQUFPO1FBQ3pCLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUhlLGdCQUFJLE9BR25CLENBQUE7SUFDRCxTQUFnQixlQUFlLENBQUMsT0FBZTtRQUMzQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QixPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUxlLDJCQUFlLGtCQUs5QixDQUFBO0FBQ0wsQ0FBQyxFQS9CZ0IsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUErQjNCIn0=