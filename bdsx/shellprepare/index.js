"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors = require("colors");
const fs = require("fs");
const glob = require("glob");
const ts = require("typescript");
const data_1 = require("./data");
const exitcode_1 = require("./exitcode");
const BDSX_PERMANENT = process.env.BDSX_PERMANENT === "true";
const RESTART_TIME_THRESHOLD = 30000;
const data = data_1.shellPrepareData.load();
var ExitCode;
(function (ExitCode) {
    ExitCode[ExitCode["Invalid"] = -1] = "Invalid";
    ExitCode[ExitCode["Quit"] = 0] = "Quit";
    ExitCode[ExitCode["RunBDSX"] = 1] = "RunBDSX";
    ExitCode[ExitCode["InstallNpm"] = 2] = "InstallNpm";
})(ExitCode || (ExitCode = {}));
function errorlog(message) {
    console.error(colors.red("[BDSX] " + message));
}
function unsupportedNodeJs() {
    errorlog(`Unsupported node.js version`);
    errorlog(`current: ${process.version}`);
    errorlog(`required: v8.1`);
    throw Error(`Unsupported node.js version ${process.version}`);
}
function getModifiedFiles(files) {
    const newFiles = [];
    for (const ts of files) {
        if (!ts.endsWith(".ts"))
            continue;
        if (ts.endsWith(".d.ts"))
            continue;
        const js = ts.substr(0, ts.length - 2) + "js";
        const ts_stat = fs.statSync(ts);
        if (ts_stat.mtimeMs === undefined) {
            unsupportedNodeJs();
        }
        try {
            const js_stat = fs.statSync(js);
            if (ts_stat.mtimeMs >= js_stat.mtimeMs) {
                newFiles.push(ts);
            }
        }
        catch (err) {
            if (err.code === "ENOENT") {
                newFiles.push(ts);
            }
            else {
                throw err;
            }
        }
    }
    return newFiles;
}
function checkProjectState() {
    try {
        const actual = fs.realpathSync("node_modules/bdsx");
        const expected = fs.realpathSync("bdsx");
        if (actual !== expected) {
            errorlog("Invalid module link");
            errorlog(`Expected: ${expected}`);
            errorlog(`Actual: ${actual}`);
            return false;
        }
    }
    catch (err) {
        errorlog(err.message);
        return false;
    }
    return true;
}
function checkJsFiles() {
    if (!fs.existsSync("./bdsx/init.js"))
        return false;
    if (!fs.existsSync("./index.js"))
        return false;
    return true;
}
function build() {
    if (!checkProjectState()) {
        errorlog("Invalid project state");
        exit(ExitCode.InstallNpm);
    }
    function getTsConfig() {
        const curdir = process.cwd();
        const configPath = ts.findConfigFile(curdir, ts.sys.fileExists);
        if (configPath == null) {
            return {
                options: ts.getDefaultCompilerOptions(),
                fileNames: glob.sync("**/*.ts", {
                    ignore: ["node_modules/**/*", "**/*.d.ts"],
                }),
                errors: [],
            };
        }
        const configFileJson = ts.readConfigFile(configPath, ts.sys.readFile);
        return ts.parseJsonConfigFileContent(configFileJson.config, ts.sys, curdir);
    }
    try {
        const config = getTsConfig();
        let files;
        if (config.options.outDir == null && config.options.outFile == null && config.options.out == null) {
            files = getModifiedFiles(config.fileNames);
        }
        else {
            files = config.fileNames;
        }
        if (files.length !== 0) {
            const res = ts.createProgram(files, config.options).emit();
            if (res.diagnostics.length !== 0) {
                if (!checkJsFiles() || getModifiedFiles(files).length !== 0) {
                    // some files are not emitted
                    const compilerHost = ts.createCompilerHost(config.options);
                    console.error(ts.formatDiagnosticsWithColorAndContext(res.diagnostics, compilerHost));
                    exit(ExitCode.Invalid);
                }
                else {
                    // ignore errors if it's emitted anyway.
                }
            }
        }
    }
    catch (err) {
        console.error(err.stack);
        exit(ExitCode.Invalid);
    }
}
function exit(exitCode) {
    if (exitCode === ExitCode.RunBDSX) {
        delete data.exit;
        data_1.shellPrepareData.save(data);
    }
    else {
        data_1.shellPrepareData.clear();
    }
    process.exit(exitCode);
}
function firstLaunch() {
    build();
    data.startAt = Date.now() + "";
    exit(ExitCode.RunBDSX);
}
function relaunch(buildTs) {
    console.log(`It will restart after 3 seconds.`);
    setTimeout(() => {
        if (buildTs)
            build();
        exit(ExitCode.RunBDSX);
    }, 3000);
}
function repeatedLaunch() {
    const exitCode = +data.exit;
    switch (exitCode) {
        case exitcode_1.BdsxExitCode.Quit:
            if (data.relaunch === "1") {
                relaunch(false);
                return;
            }
            if (BDSX_PERMANENT) {
                relaunch(true);
                return;
            }
            break;
        case exitcode_1.BdsxExitCode.InstallNpm:
            console.error(`[BDSX] Requesting 'npm i'`);
            exit(ExitCode.InstallNpm);
            break;
        default: {
            console.log(`Exited with code ${exitCode < 0 || exitCode > 0x1000000 ? "0x" + (exitCode >>> 0).toString(16) : exitCode}`);
            const startTime = +data.startAt;
            const passed = Date.now() - startTime;
            if (passed > RESTART_TIME_THRESHOLD) {
                // re-launch
                relaunch(false);
                return;
            }
            break;
        }
    }
    exit(ExitCode.Quit);
}
if (data.exit == null) {
    firstLaunch();
}
else {
    repeatedLaunch();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUFpQztBQUNqQyx5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLGlDQUFpQztBQUNqQyxpQ0FBMEM7QUFDMUMseUNBQTBDO0FBRTFDLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxLQUFLLE1BQU0sQ0FBQztBQUM3RCxNQUFNLHNCQUFzQixHQUFHLEtBQUssQ0FBQztBQUVyQyxNQUFNLElBQUksR0FBRyx1QkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNyQyxJQUFLLFFBS0o7QUFMRCxXQUFLLFFBQVE7SUFDVCw4Q0FBWSxDQUFBO0lBQ1osdUNBQVEsQ0FBQTtJQUNSLDZDQUFXLENBQUE7SUFDWCxtREFBYyxDQUFBO0FBQ2xCLENBQUMsRUFMSSxRQUFRLEtBQVIsUUFBUSxRQUtaO0FBRUQsU0FBUyxRQUFRLENBQUMsT0FBZTtJQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDbkQsQ0FBQztBQUVELFNBQVMsaUJBQWlCO0lBQ3RCLFFBQVEsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ3hDLFFBQVEsQ0FBQyxZQUFZLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzNCLE1BQU0sS0FBSyxDQUFDLCtCQUErQixPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUNsRSxDQUFDO0FBRUQsU0FBUyxnQkFBZ0IsQ0FBQyxLQUFlO0lBQ3JDLE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQztJQUM5QixLQUFLLE1BQU0sRUFBRSxJQUFJLEtBQUssRUFBRTtRQUNwQixJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7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