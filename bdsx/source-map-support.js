"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destackThrow = exports.getCurrentStackLine = exports.partialTrace = exports.getCurrentFrameInfo = exports.install = exports.getErrorSource = exports.remapAndPrintError = exports.remapStackLine = exports.remapStack = exports.remapError = exports.mapSourcePosition = exports.retrieveSourceMap = void 0;
const colors = require("colors");
const fs = require("fs");
const path = require("path");
const source_map_1 = require("source-map");
const util = require("util");
const util_1 = require("./util");
const HIDE_UNDERSCOPE = true;
// Only install once if called multiple times
let uncaughtShimInstalled = false;
// Maps a file path to a string containing the file contents
const fileContentsCache = {};
// Maps a file path to a source map for that file
const sourceMapCache = {};
// Regex for detecting source maps
const reSourceMap = /^data:application\/json[^,]+base64,/;
// Priority list of retrieve handlers
const retrieveFileHandlers = [];
const retrieveMapHandlers = [];
function handlerExec(list) {
    return function (arg) {
        for (let i = 0; i < list.length; i++) {
            const ret = list[i](arg);
            if (ret) {
                return ret;
            }
        }
        return null;
    };
}
const retrieveFile = handlerExec(retrieveFileHandlers);
retrieveFileHandlers.push(path => {
    // Trim the path to make sure there is no extra whitespace.
    path = path.trim();
    if (/^file:/.test(path)) {
        // existsSync/readFileSync can't handle file protocol, but once stripped, it works
        path = path.replace(/file:\/\/\/(\w:)?/, (protocol, drive) => drive
            ? "" // file:///C:/dir/file -> C:/dir/file
            : "/");
    }
    if (path in fileContentsCache) {
        return fileContentsCache[path];
    }
    let contents = "";
    try {
        if (fs.existsSync(path)) {
            // Otherwise, use the filesystem
            contents = fs.readFileSync(path, "utf8");
        }
    }
    catch (er) {
        /* ignore any errors */
    }
    return (fileContentsCache[path] = contents);
});
// Support URLs relative to a directory, but be careful about a protocol prefix
// in case we are in the browser (i.e. directories may start with "http://" or "file:///")
function supportRelativeURL(file, url) {
    if (!file)
        return url;
    const dir = path.dirname(file);
    const match = /^\w+:\/\/[^/]*/.exec(dir);
    let protocol = match ? match[0] : "";
    const startPath = dir.slice(protocol.length);
    if (protocol && /^\/\w:/.test(startPath)) {
        // handle file:///C:/ paths
        protocol += "/";
        return protocol + path.resolve(dir.slice(protocol.length), url).replace(/\\/g, "/");
    }
    return protocol + path.resolve(dir.slice(protocol.length), url);
}
function retrieveSourceMapURL(source) {
    // Get the URL of the source map
    const fileData = retrieveFile(source);
    const re = /(?:\/\/[@#][\s]*sourceMappingURL=([^\s'"]+)[\s]*$)|(?:\/\*[@#][\s]*sourceMappingURL=([^\s*'"]+)[\s]*(?:\*\/)[\s]*$)/gm;
    // Keep executing the search to find the *last* sourceMappingURL to avoid
    // picking up sourceMappingURLs from comments, strings, etc.
    let lastMatch = null;
    let match;
    while ((match = re.exec(fileData)) !== null)
        lastMatch = match;
    if (!lastMatch)
        return null;
    return lastMatch[1];
}
// Can be overridden by the retrieveSourceMap option to install. Takes a
// generated source filename; returns a {map, optional url} object, or null if
// there is no source map.  The map field may be either a string or the parsed
// JSON object (ie, it must be a valid argument to the SourceMapConsumer
// constructor).
exports.retrieveSourceMap = handlerExec(retrieveMapHandlers);
retrieveMapHandlers.push(source => {
    let sourceMappingURL = retrieveSourceMapURL(source);
    if (!sourceMappingURL)
        return null;
    // Read the contents of the source map
    let sourceMapData;
    if (reSourceMap.test(sourceMappingURL)) {
        // Support source map URL as a data url
        const rawData = sourceMappingURL.slice(sourceMappingURL.indexOf(",") + 1);
        sourceMapData = Buffer.from(rawData, "base64").toString();
        sourceMappingURL = source;
    }
    else {
        // Support source map URLs relative to the source URL
        sourceMappingURL = supportRelativeURL(source, sourceMappingURL);
        sourceMapData = retrieveFile(sourceMappingURL);
    }
    if (!sourceMapData) {
        return null;
    }
    return {
        url: sourceMappingURL,
        map: sourceMapData,
    };
});
function mapSourcePosition(position) {
    let sourceMap = sourceMapCache[position.source];
    if (!sourceMap) {
        // Call the (overridable) retrieveSourceMap function to get the source map.
        const urlAndMap = (0, exports.retrieveSourceMap)(position.source);
        if (urlAndMap) {
            sourceMap = sourceMapCache[position.source] = {
                url: urlAndMap.url,
                map: new source_map_1.SourceMapConsumer(urlAndMap.map),
            };
            // Load all sources stored inline with the source map into the file cache
            // to pretend like they are already loaded. They may not exist on disk.
            if (sourceMap.map) {
                for (const source of sourceMap.map.sources) {
                    const contents = sourceMap.map.sourceContentFor(source);
                    if (contents) {
                        const url = supportRelativeURL(sourceMap.url, source);
                        fileContentsCache[url] = contents;
                    }
                }
            }
        }
        else {
            sourceMap = sourceMapCache[position.source] = {
                url: null,
                map: null,
            };
        }
    }
    // Resolve the source URL relative to the URL of the source map
    if (sourceMap && sourceMap.map) {
        const originalPosition = sourceMap.map.originalPositionFor(position);
        // Only return the original position if a matching line was found. If no
        // matching line is found then we return position instead, which will cause
        // the stack trace to print the path and line for the compiled file. It is
        // better to give a precise location in the compiled file than a vague
        // location in the original file.
        if (originalPosition.source !== null) {
            originalPosition.source = supportRelativeURL(sourceMap.url, originalPosition.source);
            return originalPosition;
        }
    }
    return position;
}
exports.mapSourcePosition = mapSourcePosition;
function remapError(err) {
    err.stack = remapStack(err.stack, err[destack]);
    return err;
}
exports.remapError = remapError;
function frameToString(frame) {
    const pos = frame.position;
    if (pos !== null) {
        return `${colors.cyan(pos.source)}:${colors.brightYellow(pos.line + "")}:${colors.brightYellow(pos.column + "")}`;
    }
    else {
        return colors.cyan(frame.stackLine);
    }
}
/**
 * remap filepath to original filepath
 */
function remapStack(stack, destack) {
    if (stack === undefined)
        return undefined;
    const state = { nextPosition: null, curPosition: null };
    const frames = stack.split("\n");
    const nframes = [];
    if (destack !== undefined) {
        frames.splice(1, destack);
    }
    let i = frames.length - 1;
    for (; i >= 1; i--) {
        const frame = remapStackLine(frames[i], state);
        if (HIDE_UNDERSCOPE && frame.hidden)
            continue;
        if (frame.internal)
            continue;
        nframes.push(frame.stackLine);
        state.nextPosition = state.curPosition;
        i--;
        break;
    }
    let showFirstInternal = true;
    for (; i >= 1; i--) {
        const frame = remapStackLine(frames[i], state);
        if (HIDE_UNDERSCOPE && frame.hidden)
            continue;
        if (frame.internal) {
            if (showFirstInternal) {
                showFirstInternal = false;
            }
            else {
                continue;
            }
        }
        else {
            showFirstInternal = true;
        }
        nframes.push(frame.stackLine);
        state.nextPosition = state.curPosition;
    }
    nframes.push(frames[0]);
    // hide the RuntimeError constructor
    const runtimeErrorIdx = nframes.findIndex(line => line.startsWith("   at RuntimeError ("));
    if (runtimeErrorIdx !== -1) {
        nframes.length = runtimeErrorIdx - 1;
    }
    return nframes.reverse().join("\n");
}
exports.remapStack = remapStack;
const stackLineMatcher = /^ +at (.+) \(([^(]+)\)$/;
/**
 * remap filepath to original filepath for one line
 */
function remapStackLine(stackLine, state = { nextPosition: null, curPosition: null }) {
    const matched = stackLineMatcher.exec(stackLine);
    if (matched === null)
        return { hidden: false, stackLine, internal: false, position: null };
    const fnname = matched[1];
    const source = matched[2];
    // provides interface backward compatibility
    if (source === "native code" || source === "native code:0:0") {
        state.curPosition = null;
        return { hidden: false, stackLine, internal: false, position: null };
    }
    const srcmatched = /^(.+):(\d+):(\d+)$/.exec(source);
    if (!srcmatched)
        return { hidden: false, stackLine, internal: false, position: null };
    const isEval = fnname === "eval code";
    if (isEval) {
        return { hidden: false, stackLine, internal: false, position: null };
    }
    const file = srcmatched[1];
    const line = +srcmatched[2];
    const column = +srcmatched[3] - 1;
    const position = mapSourcePosition({
        source: file,
        line: line,
        column: column,
    });
    state.curPosition = position;
    return {
        hidden: fnname === "_",
        stackLine: `   at ${fnname} (${position.source}:${position.line}:${position.column + 1})`,
        internal: position.source.startsWith("internal/"),
        position,
    };
}
exports.remapStackLine = remapStackLine;
/**
 * remap stack and print
 */
function remapAndPrintError(err, color) {
    let message;
    if (err != null && typeof err.stack === "string") {
        message = remapStack(err.stack, err[destack]);
        if (color !== undefined) {
            message = color(message);
        }
        else {
            message = colors.red(message);
        }
    }
    else {
        message = err;
        if (color !== undefined) {
            message = color(message + "");
        }
    }
    console.error(message);
}
exports.remapAndPrintError = remapAndPrintError;
// Generate position and snippet of original source with pointer
function getErrorSource(error) {
    const match = /\n {3}at [^(]+ \((.*):(\d+):(\d+)\)/.exec(error.stack);
    if (match) {
        const source = match[1];
        const line = +match[2];
        const column = +match[3];
        // Support the inline sourceContents inside the source map
        let contents = fileContentsCache[source];
        // Support files on disk
        if (!contents && fs && fs.existsSync(source)) {
            try {
                contents = fs.readFileSync(source, "utf8");
            }
            catch (er) {
                contents = "";
            }
        }
        // Format the line from the original source code like node does
        if (contents) {
            const code = contents.split(/(?:\r\n|\r|\n)/)[line - 1];
            if (code) {
                return `${source}:${line}\n${code}\n${new Array(column).join(" ")}^`;
            }
        }
    }
    return null;
}
exports.getErrorSource = getErrorSource;
function printErrorAndExit(error) {
    const source = getErrorSource(error);
    // Ensure error is printed synchronously and not truncated
    const handle = process.stderr._handle;
    if (handle && handle.setBlocking) {
        handle.setBlocking(true);
    }
    if (source) {
        console.error();
        console.error(source);
    }
    console.error(error.stack);
    process.exit(1);
}
function install() {
    if (uncaughtShimInstalled)
        return;
    uncaughtShimInstalled = true;
    const origEmit = process.emit;
    process.emit = function (type, ...args) {
        if (type === "uncaughtException") {
            const err = args[0];
            if (err && err.stack) {
                remapError(err);
                const hasListeners = this.listeners(type).length > 0;
                if (!hasListeners) {
                    return printErrorAndExit(err);
                }
            }
        }
        else if (type === "unhandledRejection") {
            const err = args[0];
            if (err && err.stack)
                remapError(err);
        }
        return origEmit.apply(this, arguments);
    };
    console.trace = function (...messages) {
        const err = remapStack((0, util_1.removeLine)(Error(messages.map(msg => (typeof msg === "string" ? msg : util.inspect(msg, false, 2, true))).join(" ")).stack || "", 1, 2));
        console.error(`Trace${err.substr(5)}`);
    };
}
exports.install = install;
function getCurrentFrameInfo(stackOffset = 0) {
    return remapStackLine((0, util_1.getLineAt)(Error().stack, stackOffset + 2));
}
exports.getCurrentFrameInfo = getCurrentFrameInfo;
function partialTrace(message, offset = 0) {
    const stack = remapStack(new Error().stack);
    const idx = (0, util_1.indexOfLine)(stack, 2 + offset);
    if (idx === -1) {
        console.error(message);
    }
    else {
        console.error("Trace: " + message);
        console.error(stack.substr(idx));
    }
}
exports.partialTrace = partialTrace;
function getCurrentStackLine(stackOffset = 0) {
    return getCurrentFrameInfo(stackOffset + 1).stackLine;
}
exports.getCurrentStackLine = getCurrentStackLine;
function destackThrow(err, removeStack) {
    err[destack] = removeStack;
    throw err;
}
exports.destackThrow = destackThrow;
const destack = Symbol("destack");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlLW1hcC1zdXBwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic291cmNlLW1hcC1zdXBwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUFpQztBQUNqQyx5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLDJDQUErQztBQUMvQyw2QkFBNkI7QUFDN0IsaUNBQTREO0FBRTVELE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQztBQXVCN0IsNkNBQTZDO0FBQzdDLElBQUkscUJBQXFCLEdBQUcsS0FBSyxDQUFDO0FBRWxDLDREQUE0RDtBQUM1RCxNQUFNLGlCQUFpQixHQUEyQixFQUFFLENBQUM7QUFFckQsaURBQWlEO0FBQ2pELE1BQU0sY0FBYyxHQUFxRCxFQUFFLENBQUM7QUFFNUUsa0NBQWtDO0FBQ2xDLE1BQU0sV0FBVyxHQUFHLHFDQUFxQyxDQUFDO0FBRTFELHFDQUFxQztBQUNyQyxNQUFNLG9CQUFvQixHQUFpQyxFQUFFLENBQUM7QUFDOUQsTUFBTSxtQkFBbUIsR0FBMkMsRUFBRSxDQUFDO0FBRXZFLFNBQVMsV0FBVyxDQUFPLElBQXVCO0lBQzlDLE9BQU8sVUFBVSxHQUFHO1FBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QixJQUFJLEdBQUcsRUFBRTtnQkFDTCxPQUFPLEdBQUcsQ0FBQzthQUNkO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDLENBQUM7QUFDTixDQUFDO0FBRUQsTUFBTSxZQUFZLEdBQUcsV0FBVyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFdkQsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0lBQzdCLDJEQUEyRDtJQUMzRCxJQUFJLEdB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