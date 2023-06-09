"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsingErrorContainer = exports.ParsingError = exports.ErrorPosition = exports.TextLineParser = exports.LanguageParser = exports.TextParser = void 0;
const colors = require("colors");
const util_1 = require("./util");
const SPACE_REG = /^([\s\uFEFF\xA0]*)(.*[^\s\uFEFF\xA0])[\s\uFEFF\xA0]*$/;
const DEFAULT_SEPARATOR = (0, util_1.str2set)("!@#%^&*()+-=`~[]{};':\",./<>?");
const SPACES = (0, util_1.str2set)(" \t\r\n\uFEFF\xa0");
class TextParser {
    constructor(context) {
        this.context = context;
        this.i = 0;
    }
    readLine() {
        const idx = this.context.indexOf("\n", this.i);
        if (idx === -1) {
            if (this.i === this.context.length)
                return null;
            const out = this.context.substr(this.i);
            this.i = this.context.length;
            return out;
        }
        else {
            let end = idx;
            if (this.context.charCodeAt(idx - 1) === 0x0d) {
                // \r
                end--;
            }
            const out = this.context.substring(this.i, end);
            this.i = idx + 1;
            return out;
        }
    }
    getFrom(from) {
        return this.context.substring(from, this.i);
    }
    eof() {
        return this.i >= this.context.length;
    }
    peek() {
        return this.context.charAt(this.i);
    }
    endsWith(str) {
        return this.context.endsWith(str, this.i);
    }
    nextIf(str) {
        if (!this.context.startsWith(str, this.i))
            return false;
        this.i += str.length;
        return true;
    }
    skipSpaces() {
        const nonspace = /[^\s\uFEFF\xA0]/g;
        nonspace.lastIndex = this.i;
        const res = nonspace.exec(this.context);
        if (res === null) {
            this.i = this.context.length;
            return;
        }
        this.i = res.index;
    }
}
exports.TextParser = TextParser;
class LanguageParser extends TextParser {
    constructor(context, seperators = DEFAULT_SEPARATOR) {
        super(context);
        this.seperators = seperators;
        for (const chr of SPACES) {
            this.seperators.add(chr);
        }
    }
    unget(str) {
        this.i = this.context.lastIndexOf(str, this.i - 1);
        if (this.i === -1)
            throw Error(`${str} not found in '${this.context}'`);
    }
    readIdentifier() {
        this.skipSpaces();
        const from = this.i;
        for (;;) {
            if (this.i >= this.context.length)
                break;
            const code = this.context.charCodeAt(this.i);
            if (this.seperators.has(code))
                break;
            this.i++;
        }
        if (from === this.i)
            return null;
        return this.context.substring(from, this.i);
    }
    readOperator(operators) {
        this.skipSpaces();
        const from = this.i;
        if (from >= this.context.length)
            return null;
        let out = "";
        for (;;) {
            const code = this.context.charCodeAt(this.i);
            if (!this.seperators.has(code))
                break;
            out += String.fromCharCode(code);
            if (out.length !== 1 && !operators.has(out))
                break;
            this.i++;
        }
        return this.context.substring(from, this.i);
    }
    readTo(needle) {
        const context = this.context;
        const idx = context.indexOf(needle, this.i);
        const matched = (idx === -1 ? context.substr(this.i) : context.substring(this.i, idx)).trim();
        this.i = idx === -1 ? context.length : idx + 1;
        return matched;
    }
    readAll() {
        return this.context.substr(this.i).trim();
    }
}
exports.LanguageParser = LanguageParser;
class TextLineParser extends TextParser {
    constructor(context, lineNumber, offset = 0) {
        super(context);
        this.lineNumber = lineNumber;
        this.offset = offset;
        this.matchedIndex = 0;
        this.matchedWidth = context.length;
    }
    static prespace(text) {
        return text.match(/^[\s\uFEFF\xA0]*/)[0].length;
    }
    static trim(context) {
        const matched = SPACE_REG.exec(context);
        if (matched === null)
            return ["", 0, context.length];
        const res = matched[2];
        return [res, matched[1].length, res.length];
    }
    readQuotedStringTo(chr) {
        let p = this.i + 1;
        for (;;) {
            const np = this.context.indexOf(chr, p);
            if (np === -1) {
                this.matchedIndex = this.i + this.offset;
                this.matchedWidth = 1;
                throw this.error("qouted string does not end");
            }
            let count = 0;
            p = np;
            for (;;) {
                const chr = this.context.charAt(--p);
                if (chr === "\\") {
                    count++;
                    continue;
                }
                break;
            }
            if ((count & 1) === 0) {
                const out = this.context.substring(this.i - 1, np + 1);
                this.matchedIndex = this.i + this.offset;
                this.matchedWidth = out.length;
                this.i = np + 1;
                try {
                    return JSON.parse(out);
                }
                catch (err) {
                    throw this.error(err.message);
                }
            }
            p = np + 1;
        }
    }
    readQuotedString() {
        this.skipSpaces();
        const chr = this.context.charAt(this.i);
        if (chr !== '"' && chr !== "'")
            return null;
        return this.readQuotedStringTo(chr);
    }
    readToSpace() {
        const context = this.context;
        const spaceMatch = /[\s\uFEFF\xA0]+/g;
        spaceMatch.lastIndex = this.i;
        for (;;) {
            const res = spaceMatch.exec(context);
            let content;
            this.matchedIndex = this.i + this.offset;
            if (res === null) {
                content = context.substr(this.i);
                this.matchedWidth = content.length;
                this.i = this.context.length;
            }
            else {
                if (res.index === 0) {
                    this.i = spaceMatch.lastIndex;
                    continue;
                }
                content = context.substring(this.i, res.index);
                this.matchedWidth = content.length;
                this.i = spaceMatch.lastIndex;
            }
            return content;
        }
    }
    *splitWithSpaces() {
        const context = this.context;
        if (this.i >= context.length)
            return;
        const oriindex = this.matchedIndex;
        const offset = this.offset;
        const spaceMatch = /[\s\uFEFF\xA0]+/g;
        spaceMatch.lastIndex = this.i;
        for (;;) {
            const res = spaceMatch.exec(context);
            let content;
            if (res === null) {
                if (this.i === context.length)
                    break;
                content = context.substr(this.i);
            }
            else {
                if (res.index === 0) {
                    this.i = spaceMatch.lastIndex;
                    continue;
                }
                content = context.substring(this.i, res.index);
            }
            this.offset = this.matchedIndex = this.i + offset;
            this.matchedWidth = content.length;
            this.i = 0;
            yield (this.context = content);
            if (res === null)
                break;
            this.i = spaceMatch.lastIndex;
        }
        this.offset = offset;
        this.context = context;
        this.i = context.length;
        this.matchedWidth = this.matchedIndex + this.matchedWidth - oriindex;
        this.matchedIndex = oriindex;
    }
    readTo(needle) {
        const context = this.context;
        const idx = context.indexOf(needle, this.i);
        const [matched, prespace, width] = TextLineParser.trim(idx === -1 ? context.substr(this.i) : context.substring(this.i, idx));
        this.matchedIndex = this.offset + this.i + prespace;
        this.matchedWidth = width;
        this.i = idx === -1 ? context.length : idx + 1;
        return matched;
    }
    readAll() {
        const [matched, prespace, width] = TextLineParser.trim(this.context.substr(this.i));
        this.matchedIndex = this.i + prespace;
        this.matchedWidth = width;
        this.i = this.context.length;
        return matched;
    }
    *split(needle) {
        const context = this.context;
        if (this.i >= context.length)
            return;
        const oriindex = this.matchedIndex;
        const offset = this.offset;
        for (;;) {
            const idx = context.indexOf(needle, this.i);
            const [matched, prespace, width] = TextLineParser.trim(idx === -1 ? context.substr(this.i) : context.substring(this.i, idx));
            this.offset = this.matchedIndex = this.i + prespace + offset;
            this.matchedWidth = width;
            this.i = 0;
            yield (this.context = matched);
            if (idx === -1)
                break;
            this.i = idx + 1;
        }
        this.offset = offset;
        this.context = context;
        this.i = context.length;
        this.matchedWidth = this.matchedIndex + this.matchedWidth - oriindex;
        this.matchedIndex = oriindex;
    }
    error(message) {
        return new ParsingError(message, {
            column: this.matchedIndex,
            width: this.matchedWidth,
            line: this.lineNumber,
        });
    }
    getPosition() {
        return {
            line: this.lineNumber,
            column: this.matchedIndex,
            width: this.matchedWidth,
        };
    }
}
exports.TextLineParser = TextLineParser;
class ErrorPosition {
    constructor(message, severity, pos) {
        this.message = message;
        this.severity = severity;
        this.pos = pos;
    }
    report(sourcePath, lineText) {
        console.error();
        const pos = this.pos;
        if (pos !== null) {
            console.error(`${colors.cyan(sourcePath)}:${colors.yellow(pos.line + "")}:${colors.yellow(pos.column + "")} - ${colors.red(this.severity)}: ${this.message}`);
            if (lineText !== null) {
                const linestr = pos.line + "";
                console.error(`${colors.black(colors.bgWhite(linestr))} ${lineText}`);
                console.error(colors.bgWhite(" ".repeat(linestr.length)) + " ".repeat(pos.column + 1) + colors.red("~".repeat(Math.max(pos.width, 1))));
            }
        }
        else {
            console.error(`${colors.cyan(sourcePath)} - ${colors.red(this.severity)}: ${this.message}`);
            if (lineText !== null) {
                console.error(`${colors.bgWhite(" ")} ${lineText}`);
            }
        }
    }
}
exports.ErrorPosition = ErrorPosition;
class ParsingError extends Error {
    constructor(message, pos) {
        super(pos !== null ? `${message}, line:${pos.line}` : message);
        this.pos = pos;
        this.errors = [];
        this.errors.push(new ErrorPosition(message, "error", pos));
    }
    report(sourcePath, lineText) {
        this.errors[0].report(sourcePath, lineText);
    }
    reportAll(sourcePath, sourceText) {
        for (const err of this.errors) {
            err.report(sourcePath, sourceText);
        }
    }
}
exports.ParsingError = ParsingError;
class ParsingErrorContainer {
    constructor() {
        this.error = null;
    }
    add(error) {
        if (this.error !== null) {
            this.error.errors.push(...error.errors);
        }
        else {
            this.error = error;
        }
    }
}
exports.ParsingErrorContainer = ParsingErrorContainer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dHBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRleHRwYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQWlDO0FBQ2pDLGlDQUFpQztBQUVqQyxNQUFNLFNBQVMsR0FBRyx1REFBdUQsQ0FBQztBQUMxRSxNQUFNLGlCQUFpQixHQUFHLElBQUEsY0FBTyxFQUFDLCtCQUErQixDQUFDLENBQUM7QUFFbkUsTUFBTSxNQUFNLEdBQUcsSUFBQSxjQUFPLEVBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUU1QyxNQUFhLFVBQVU7SUFFbkIsWUFBbUIsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFEM0IsTUFBQyxHQUFHLENBQUMsQ0FBQztJQUN3QixDQUFDO0lBRXRDLFFBQVE7UUFDSixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ1osSUFBSSxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtnQkFBRSxPQUFPLElBQUksQ0FBQztZQUNoRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUM3QixPQUFPLEdBQUcsQ0FBQztTQUNkO2FBQU07WUFDSCxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDZCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0JBQzNDLEtBQUs7Z0JBQ0wsR0FBRyxFQUFFLENBQUM7YUFDVDtZQUNELE1BQU0sR0FBRyxHQUFH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