"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tester = void 0;
const colors = require("colors");
const launcher_1 = require("./launcher");
const source_map_support_1 = require("./source-map-support");
const util_1 = require("./util");
const core_1 = require("./core");
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
        let res;
        if (actual instanceof core_1.VoidPointer) {
            res = actual.equalsptr(expected);
        }
        else {
            res = actual === expected;
        }
        if (!res) {
            if (message == null)
                message = "";
            else
                message = ", " + message;
            const nopts = resolveOpts(opts, 1, 3);
            this.error(`Expected: ${nopts.stringify(expected)}, Actual: ${nopts.stringify(actual)}${message}`, nopts);
        }
    }
    notEquals(actual, expected, message, opts) {
        let res;
        if (actual instanceof core_1.VoidPointer) {
            res = actual.equalsptr(expected);
        }
        else {
            res = actual === expected;
        }
        if (res) {
            if (message == null)
                message = "";
            else
                message = ", " + message;
            const nopts = resolveOpts(opts, 1, 3);
            this.error(`NotExpected: ${nopts.stringify(expected)}, Actual: ${nopts.stringify(actual)}${message}`, nopts);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGVzdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUFpQztBQUNqQyx5Q0FBMkM7QUFDM0MsNkRBQXVFO0FBQ3ZFLGlDQUFpQztBQUNqQyxpQ0FBcUM7QUFFckMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQ2hCLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztBQUNsQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7QUFDYixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFFdkIsTUFBTSxLQUFLLEdBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUVyQyxTQUFTLFFBQVEsQ0FBQyxPQUFlO0lBQzdCLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBQ0QsU0FBUyxVQUFVLENBQUMsT0FBZTtJQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekQsQ0FBQztBQUNELFNBQVMsVUFBVSxDQUFDLENBQVUsRUFBRSxDQUFVO0lBQ3RDLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxFQUFFO1FBQ3ZCLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLFlBQVksS0FBSyxFQUFFO1lBQzFDLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsTUFBTTtnQkFBRSxPQUFPLEtBQUssQ0FBQztZQUN4QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFB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