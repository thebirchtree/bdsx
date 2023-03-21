"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tester = void 0;
const colors = require("colors");
const launcher_1 = require("./launcher");
const source_map_support_1 = require("./source-map-support");
const util_1 = require("./util");
let testnum = 1;
let testcount = 0;
let done = 0;
let testIsDone = false;
const total = [0, 0, 0, 0];
function logError(message) {
    console.error(colors.red(`[test] ${message}`));
}
function logMessage(message) {
    console.log(colors.brightGreen(`[test] ${message}`));
}
function deepEquals(a, b) {
    if (typeof a === "object") {
        if (typeof b !== "object")
            return false;
        if (a instanceof Array && b instanceof Array) {
            if (a.length !== b.length)
                return false;
            for (let i = 0; i < a.length; i++) {
                if (!deepEquals(a[i], b[i]))
                    return false;
            }
            return true;
        }
        else {
            if (a === null) {
                if (b === null)
                    return true;
                return false;
            }
            else if (b === null) {
                return false;
            }
            return deepEquals(Object.entries(a), Object.entries(b));
        }
    }
    return a === b;
}
const defaultOpts = {
    stringify: (val) => val + "",
};
function resolveOpts(opts, additionalStackOffset, fullStackOffset) {
    if (opts == null)
        return {
            stackOffset: additionalStackOffset,
            stringify: defaultOpts.stringify,
        };
    switch (typeof opts) {
        case "number": {
            return {
                stackOffset: opts + additionalStackOffset - fullStackOffset,
                stringify: defaultOpts.stringify,
            };
        }
        case "function": {
            return {
                stackOffset: additionalStackOffset,
                stringify: opts,
            };
        }
    }
    if (opts.stackOffset == null) {
        opts.stackOffset = additionalStackOffset;
    }
    else {
        opts.stackOffset += additionalStackOffset;
    }
    if (opts.stringify == null) {
        opts.stringify = defaultOpts.stringify;
    }
    return opts;
}
class Tester {
    constructor(subject = "") {
        this.subject = subject;
        this.state = Tester.State.Pending;
        this.pending = 0;
        this.errors = [];
        this.firstFlush = false;
    }
    static isPassed() {
        return testIsDone && !Tester.errored;
    }
    _done(state) {
        this._flush();
        if (state <= this.state)
            return;
        if (this.pending !== 0 && state === Tester.State.Passed) {
            this.log(`Pending ${this.pending} tasks`);
            return;
        }
        total[this.state]--;
        total[state]++;
        if (this.state === Tester.State.Pending)
            done++;
        if (state === Tester.State.Failed) {
            logError(`FAILED (${total[Tester.State.Passed]}/${testcount})`);
            Tester.errored = true;
        }
        this.state = state;
        if (done === testcount) {
            const error = total[Tester.State.Failed] !== 0;
            const message = `TEST ${error ? "FAILED" : "PASSED"} (${total[Tester.State.Passed]}/${testcount - total[Tester.State.Skipped]})`;
            (error ? logError : logMessage)(message);
            testIsDone = true;
            if (error) {
                logError("Unit tests can fail If other user scripts are running.");
            }
        }
    }
    _flush() {
        if (!this.firstFlush) {
            this.firstFlush = true;
            logMessage(`(${testnum++}/${testcount}) ${this.subject}`);
        }
        for (const err of this.errors) {
            this.log(err, true);
        }
        this.errors.length = 0;
    }
    log(message, error) {
        const msg = `[test/${this.subject}] ${message}`;
        if (error)
            console.error(colors.red(msg));
        else
            console.log(colors.brightGreen(msg));
    }
    _error(message, errorpos) {
        this.errors.push(`failed. ${message}`);
        this.errors.push(colors.red(errorpos));
        this._done(Tester.State.Failed);
    }
    error(message, opts) {
        const nopts = resolveOpts(opts, 1, 2);
        this._error(message, (0, source_map_support_1.getCurrentStackLine)(nopts.stackOffset));
    }
    processError(err) {
        const stack = ((0, source_map_support_1.remapError)(err).stack || "").split("\n");
        this._error(err.message, stack[1]);
        console.error(stack.slice(2).join("\n"));
    }
    fail(opts) {
        this.error("", resolveOpts(opts, 1, 3));
    }
    assert(cond, message, opts) {
        if (!cond) {
            this.error(message, resolveOpts(opts, 1, 3));
        }
    }
    equals(actual, expected, message, opts) {
        if (actual !== expected) {
            if (message == null)
                message = "";
            else
                message = ", " + message;
            const nopts = resolveOpts(opts, 1, 3);
            this.error(`Expected: ${nopts.stringify(expected)}, Actual: ${nopts.stringify(actual)}${message}`, nopts);
        }
    }
    deepEquals(actual, expected, message, opts) {
        if (!deepEquals(actual, expected)) {
            if (message == null)
                message = "";
            else
                message = ", " + message;
            const nopts = resolveOpts(opts, 1, 3);
            this.error(`Expected: ${nopts.stringify(expected)}, Actual: ${nopts.stringify(actual)}${message}`, nopts);
        }
    }
    arrayEquals(actual, expected, message, opts) {
        if (message == null)
            message = "";
        else
            message = ", " + message;
        let n = actual.length;
        const expectedLen = expected.length;
        if (n !== expectedLen) {
            const nopts = resolveOpts(opts, 1, 3);
            this.error(`Expected: length=${expectedLen}, Actual: length=${n}${message}`, nopts);
            if (expectedLen < n) {
                n = expectedLen;
            }
        }
        for (let i = 0; i < n; i++) {
            const a = actual[i];
            const e = expected[i];
            if (a !== e) {
                const nopts = resolveOpts(opts, 1, 3);
                this.error(`Expected: [${i}]=${nopts.stringify(e)}, Actual: [${i}]=${nopts.stringify(a)}${message}`, nopts);
            }
        }
    }
    skip(message) {
        this.log(message);
        this._done(Tester.State.Skipped);
    }
    wrap(run, count = 1) {
        if (count !== 0)
            this.pending++;
        return async (...args) => {
            try {
                await run(...args);
            }
            catch (err) {
                this.processError(err);
            }
            if (count !== 0) {
                if (--count === 0) {
                    this.pending--;
                    if (this.pending === 0) {
                        this.log(`Pending done`);
                    }
                    this._done(Tester.State.Passed);
                }
            }
        };
    }
    static async test(tests, waitOneTick) {
        await (0, util_1.timeout)(100); // run after examples
        // pass one tick, wait until result of the list command example
        if (waitOneTick) {
            await launcher_1.bedrockServer.serverInstance.nextTick();
        }
        logMessage(`node version: ${process.versions.node}`);
        if (process.jsEngine != null) {
            logMessage(`engine version: ${process.jsEngine}@${process.versions[process.jsEngine]}`);
        }
        const testlist = Object.entries(tests);
        testcount += testlist.length;
        for (const [subject, test] of testlist) {
            const tester = new Tester(subject);
            try {
                await test.call(tester);
                tester._done(Tester.State.Passed);
            }
            catch (err) {
                tester.processError(err);
            }
        }
    }
    static async consecutive(...tests) {
        await (0, util_1.timeout)(100); // run after examples
        logMessage(`node version: ${process.versions.node}`);
        if (process.jsEngine != null) {
            logMessage(`engine version: ${process.jsEngine}@${process.versions[process.jsEngine]}`);
        }
        const allTests = tests.map(test => {
            const list = Object.entries(test);
            testcount += list.length;
            return list;
        });
        for (const tests of allTests) {
            for (const [subject, test] of tests) {
                const tester = new Tester(subject);
                try {
                    await test.call(tester);
                    tester._done(Tester.State.Passed);
                }
                catch (err) {
                    tester.processError(err);
                }
            }
        }
    }
    static async concurrency(...tests) {
        await (0, util_1.timeout)(100); // run after examples
        logMessage(`node version: ${process.versions.node}`);
        if (process.jsEngine != null) {
            logMessage(`engine version: ${process.jsEngine}@${process.versions[process.jsEngine]}`);
        }
        const allTests = tests.map(test => {
            const list = Object.entries(test);
            testcount += list.length;
            return list;
        });
        for (const testlist of allTests) {
            const proms = [];
            for (const [subject, test] of testlist) {
                const tester = new Tester(subject);
                proms.push((async () => {
                    try {
                        await test.call(tester);
                        tester._done(Tester.State.Passed);
                    }
                    catch (err) {
                        tester.processError(err);
                    }
                })());
            }
            await Promise.all(proms);
        }
    }
}
exports.Tester = Tester;
Tester.errored = false;
(function (Tester) {
    let State;
    (function (State) {
        State[State["Pending"] = 0] = "Pending";
        State[State["Passed"] = 1] = "Passed";
        State[State["Skipped"] = 2] = "Skipped";
        State[State["Failed"] = 3] = "Failed";
    })(State = Tester.State || (Tester.State = {}));
})(Tester = exports.Tester || (exports.Tester = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGVzdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUFpQztBQUNqQyx5Q0FBMkM7QUFDM0MsNkRBQXVFO0FBQ3ZFLGlDQUFpQztBQUVqQyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDaEIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0FBQ2xCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztBQUNiLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztBQUV2QixNQUFNLEtBQUssR0FBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRXJDLFNBQVMsUUFBUSxDQUFDLE9BQWU7SUFDN0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ25ELENBQUM7QUFDRCxTQUFTLFVBQVUsQ0FBQyxPQUFlO0lBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBQ0QsU0FBUyxVQUFVLENBQUMsQ0FBVSxFQUFFLENBQVU7SUFDdEMsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUU7UUFDdkIsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDeEMsSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsWUFBWSxLQUFLLEVBQUU7WUFDMUMsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxNQUFNO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1lBQ3hDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMvQixJQUFJ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