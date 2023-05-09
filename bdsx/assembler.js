"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asm = exports.X64Assembler = exports.FFOperation = exports.JumpOperation = exports.Operator = exports.OperationSize = exports.FloatRegister = exports.Register = void 0;
const colors = require("colors");
const bin_1 = require("./bin");
const fsutil_1 = require("./fsutil");
const polynominal_1 = require("./polynominal");
const source_map_support_1 = require("./source-map-support");
const textparser_1 = require("./textparser");
const util_1 = require("./util");
const bufferstream_1 = require("./writer/bufferstream");
const scriptwriter_1 = require("./writer/scriptwriter");
var Register;
(function (Register) {
    Register[Register["absolute"] = -2] = "absolute";
    Register[Register["rip"] = -1] = "rip";
    Register[Register["rax"] = 0] = "rax";
    Register[Register["rcx"] = 1] = "rcx";
    Register[Register["rdx"] = 2] = "rdx";
    Register[Register["rbx"] = 3] = "rbx";
    Register[Register["rsp"] = 4] = "rsp";
    Register[Register["rbp"] = 5] = "rbp";
    Register[Register["rsi"] = 6] = "rsi";
    Register[Register["rdi"] = 7] = "rdi";
    Register[Register["r8"] = 8] = "r8";
    Register[Register["r9"] = 9] = "r9";
    Register[Register["r10"] = 10] = "r10";
    Register[Register["r11"] = 11] = "r11";
    Register[Register["r12"] = 12] = "r12";
    Register[Register["r13"] = 13] = "r13";
    Register[Register["r14"] = 14] = "r14";
    Register[Register["r15"] = 15] = "r15";
})(Register = exports.Register || (exports.Register = {}));
var FloatRegister;
(function (FloatRegister) {
    FloatRegister[FloatRegister["xmm0"] = 0] = "xmm0";
    FloatRegister[FloatRegister["xmm1"] = 1] = "xmm1";
    FloatRegister[FloatRegister["xmm2"] = 2] = "xmm2";
    FloatRegister[FloatRegister["xmm3"] = 3] = "xmm3";
    FloatRegister[FloatRegister["xmm4"] = 4] = "xmm4";
    FloatRegister[FloatRegister["xmm5"] = 5] = "xmm5";
    FloatRegister[FloatRegister["xmm6"] = 6] = "xmm6";
    FloatRegister[FloatRegister["xmm7"] = 7] = "xmm7";
    FloatRegister[FloatRegister["xmm8"] = 8] = "xmm8";
    FloatRegister[FloatRegister["xmm9"] = 9] = "xmm9";
    FloatRegister[FloatRegister["xmm10"] = 10] = "xmm10";
    FloatRegister[FloatRegister["xmm11"] = 11] = "xmm11";
    FloatRegister[FloatRegister["xmm12"] = 12] = "xmm12";
    FloatRegister[FloatRegister["xmm13"] = 13] = "xmm13";
    FloatRegister[FloatRegister["xmm14"] = 14] = "xmm14";
    FloatRegister[FloatRegister["xmm15"] = 15] = "xmm15";
})(FloatRegister = exports.FloatRegister || (exports.FloatRegister = {}));
var MovOper;
(function (MovOper) {
    MovOper[MovOper["Register"] = 0] = "Register";
    MovOper[MovOper["Const"] = 1] = "Const";
    MovOper[MovOper["Read"] = 2] = "Read";
    MovOper[MovOper["Write"] = 3] = "Write";
    MovOper[MovOper["WriteConst"] = 4] = "WriteConst";
    MovOper[MovOper["Lea"] = 5] = "Lea";
})(MovOper || (MovOper = {}));
var FloatOper;
(function (FloatOper) {
    FloatOper[FloatOper["None"] = 0] = "None";
    FloatOper[FloatOper["Convert_f2i"] = 1] = "Convert_f2i";
    FloatOper[FloatOper["Convert_i2f"] = 2] = "Convert_i2f";
    FloatOper[FloatOper["ConvertTruncated_f2i"] = 3] = "ConvertTruncated_f2i";
    FloatOper[FloatOper["ConvertPrecision"] = 4] = "ConvertPrecision";
})(FloatOper || (FloatOper = {}));
var FloatOperSize;
(function (FloatOperSize) {
    FloatOperSize[FloatOperSize["xmmword"] = 0] = "xmmword";
    FloatOperSize[FloatOperSize["singlePrecision"] = 1] = "singlePrecision";
    FloatOperSize[FloatOperSize["doublePrecision"] = 2] = "doublePrecision";
})(FloatOperSize || (FloatOperSize = {}));
var OperationSize;
(function (OperationSize) {
    OperationSize[OperationSize["void"] = 0] = "void";
    OperationSize[OperationSize["byte"] = 1] = "byte";
    OperationSize[OperationSize["word"] = 2] = "word";
    OperationSize[OperationSize["dword"] = 3] = "dword";
    OperationSize[OperationSize["qword"] = 4] = "qword";
    OperationSize[OperationSize["mmword"] = 5] = "mmword";
    OperationSize[OperationSize["xmmword"] = 6] = "xmmword";
})(OperationSize = exports.OperationSize || (exports.OperationSize = {}));
const sizemap = new Map([
    ["void", { bytes: 0, size: OperationSize.void }],
    ["byte", { bytes: 1, size: OperationSize.byte }],
    ["word", { bytes: 2, size: OperationSize.word }],
    ["dword", { bytes: 4, size: OperationSize.dword }],
    ["qword", { bytes: 8, size: OperationSize.qword }],
    ["xmmword", { bytes: 16, size: OperationSize.xmmword }],
]);
var Operator;
(function (Operator) {
    Operator[Operator["add"] = 0] = "add";
    Operator[Operator["or"] = 1] = "or";
    Operator[Operator["adc"] = 2] = "adc";
    Operator[Operator["sbb"] = 3] = "sbb";
    Operator[Operator["and"] = 4] = "and";
    Operator[Operator["sub"] = 5] = "sub";
    Operator[Operator["xor"] = 6] = "xor";
    Operator[Operator["cmp"] = 7] = "cmp";
})(Operator = exports.Operator || (exports.Operator = {}));
var JumpOperation;
(function (JumpOperation) {
    JumpOperation[JumpOperation["jo"] = 0] = "jo";
    JumpOperation[JumpOperation["jno"] = 1] = "jno";
    JumpOperation[JumpOperation["jb"] = 2] = "jb";
    JumpOperation[JumpOperation["jae"] = 3] = "jae";
    JumpOperation[JumpOperation["je"] = 4] = "je";
    JumpOperation[JumpOperation["jne"] = 5] = "jne";
    JumpOperation[JumpOperation["jbe"] = 6] = "jbe";
    JumpOperation[JumpOperation["ja"] = 7] = "ja";
    JumpOperation[JumpOperation["js"] = 8] = "js";
    JumpOperation[JumpOperation["jns"] = 9] = "jns";
    JumpOperation[JumpOperation["jp"] = 10] = "jp";
    JumpOperation[JumpOperation["jnp"] = 11] = "jnp";
    JumpOperation[JumpOperation["jl"] = 12] = "jl";
    JumpOperation[JumpOperation["jge"] = 13] = "jge";
    JumpOperation[JumpOperation["jle"] = 14] = "jle";
    JumpOperation[JumpOperation["jg"] = 15] = "jg";
})(JumpOperation = exports.JumpOperation || (exports.JumpOperation = {}));
const INT8_MIN = -0x80;
const INT8_MAX = 0x7f;
const INT16_MAX = 0x7fff;
const INT32_MIN = -0x80000000;
const INT32_MAX = 0x7fffffff;
const COMMENT_REGEXP = /[;#]/;
const sizeInfo = new Map();
sizeInfo.set(OperationSize.byte, {
    fnname: "Uint8",
    jstype: "number",
    size: 1,
});
sizeInfo.set(OperationSize.word, {
    fnname: "Uint16",
    jstype: "number",
    size: 2,
});
sizeInfo.set(OperationSize.dword, {
    fnname: "Int32",
    jstype: "number",
    size: 4,
});
sizeInfo.set(OperationSize.qword, {
    fnname: "Pointer",
    jstype: "VoidPointer",
    size: 8,
});
function isZero(value) {
    switch (typeof value) {
        case "string":
            return bin_1.bin.isZero(value);
        case "object": {
            const v = value[asm.splitTwo32Bits]();
            return v[0] === 0 && v[1] === 0;
        }
        case "number":
            return value === 0;
        default:
            throw Error(`invalid constant value: ${value}`);
    }
}
function split64bits(value) {
    switch (typeof value) {
        case "string":
            return bin_1.bin.int32_2(value);
        case "object":
            return value[asm.splitTwo32Bits]();
        case "number": {
            const lowbits = value | 0;
            let highbits = (value - lowbits) / 0x100000000;
            highbits = highbits >= 0 ? Math.floor(highbits) : Math.ceil(highbits);
            return [lowbits, highbits];
        }
        default:
            throw Error(`invalid constant value: ${value}`);
    }
}
function is32Bits(value) {
    switch (typeof value) {
        case "string": {
            const [low, high] = bin_1.bin.int32_2(value);
            return high === low >> 31;
        }
        case "object": {
            const [low, high] = value[asm.splitTwo32Bits]();
            return high === low >> 31;
        }
        case "number":
            return value === (value | 0);
        default:
            throw Error(`invalid constant value: ${value}`);
    }
}
class SplitedJump {
    constructor(info, label, args, pos) {
        this.info = info;
        this.label = label;
        this.args = args;
        this.pos = pos;
    }
}
class AsmChunk extends bufferstream_1.BufferWriter {
    constructor(array, size, align) {
        super(array, size);
        this.align = align;
        this.prev = null;
        this.next = null;
        this.jump = null;
        this.ids = [];
        this.unresolved = [];
    }
    setInt32(n, offset) {
        if (this.size + 4 < offset)
            throw RangeError("Out of range");
        n |= 0;
        this.array[n] = offset;
        this.array[n + 1] = offset >> 8;
        this.array[n + 2] = offset >> 16;
        this.array[n + 3] = offset >> 24;
    }
    connect(next) {
        if (this.next !== null)
            throw Error("Already connected chunk");
        if (next.prev !== null)
            throw Error("Already connected chunk");
        this.next = next;
        next.prev = this;
    }
    removeNext() {
        const chunk = this.next;
        if (chunk === null)
            return false;
        this.jump = chunk.jump;
        chunk.jump = null;
        for (const label of chunk.ids) {
            label.chunk = this;
            label.offset = (label.offset + this.size) | 0;
        }
        this.ids.push(...chunk.ids);
        for (const jump of chunk.unresolved) {
            jump.offset = (jump.offset + this.size) | 0;
        }
        this.unresolved.push(...chunk.unresolved);
        this.write(chunk.buffer());
        const next = chunk.next;
        this.next = next;
        if (next !== null)
            next.prev = this;
        chunk.unresolved.length = 0;
        chunk.ids.length = 0;
        chunk.next = null;
        chunk.prev = null;
        return true;
    }
    resolveAll() {
        for (const unresolved of this.unresolved) {
            const addr = unresolved.address;
            const size = unresolved.bytes;
            let offset = (addr.offset - unresolved.offset - size) | 0;
            if (addr.chunk === MEMORY_INDICATE_CHUNK) {
                offset = (offset + this.size) | 0;
            }
            else if (addr.chunk === null) {
                throw new textparser_1.ParsingError(`${addr.name}: Label not found`, unresolved.pos);
            }
            else if (addr.chunk !== this) {
                throw Error("Different chunk. internal problem.");
            }
            const arr = this.array;
            let i = unresolved.offset;
            const to = (i + size) | 0;
            for (; i !== to; i++) {
                arr[i] = offset;
                offset >>= 8;
            }
        }
        this.unresolved.length = 0;
    }
}
class Identifier {
    constructor(name) {
        this.name = name;
    }
}
class Constant extends Identifier {
    constructor(name, value) {
        super(name);
        this.value = value;
    }
}
class AddressIdentifier extends Identifier {
    constructor(name, chunk, offset) {
        super(name);
        this.chunk = chunk;
        this.offset = offset;
    }
    sameAddressWith(other) {
        return this.chunk === other.chunk && this.offset === other.offset;
    }
}
class Label extends AddressIdentifier {
    isProc() {
        return this.UnwindCodes !== null;
    }
    constructor(name) {
        super(name, null, 0);
        this.UnwindCodes = null;
        this.frameRegisterOffset = 0;
        this.frameRegister = Register.rax;
        this.exceptionHandler = null;
    }
    setStackFrame(label, r, offset) {
        if (this.frameRegister !== Register.rax)
            throw Error(`already set`);
        if (this.UnwindCodes === null)
            throw Error(`${this.name} is not proc`);
        if (offset < 0 || offset > 240)
            throw TypeError(`offset out of range (offset=${offset}, not in 0~240)`);
        const qcount = offset >> 4;
        if (qcount << 4 !== offset)
            throw TypeError(`is not 16 bytes aligned (offset=${offset})`);
        this.frameRegisterOffset = qcount;
        if (r <= Register.rax || r > Register.r15)
            throw TypeError(`register out of range (register=${r}, not in 1~15)`);
        this.frameRegister = r;
        this.UnwindCodes.push(new UNWIND_CODE(label, UWOP_SET_FPREG, 0));
    }
    allocStack(label, bytes) {
        if (this.UnwindCodes === null)
            throw Error(`${this.name} is not proc`);
        if (bytes <= 0)
            throw TypeError(`too small (bytes=${bytes})`);
        const qcount = bytes >> 3;
        if (qcount << 3 !== bytes)
            throw TypeError(`is not 8 bytes aligned (bytes=${bytes})`);
        if (qcount <= 0xf) {
            this.UnwindCodes.push(new UNWIND_CODE(label, UWOP_ALLOC_SMALL, qcount - 1));
        }
        else {
            if (qcount <= 0xffff) {
                this.UnwindCodes.push(qcount);
                this.UnwindCodes.push(new UNWIND_CODE(label, UWOP_ALLOC_LARGE, 0));
            }
            else {
                this.UnwindCodes.push(bytes >>> 16);
                this.UnwindCodes.push(bytes & 0xffff);
                this.UnwindCodes.push(new UNWIND_CODE(label, UWOP_ALLOC_LARGE, 1));
            }
        }
    }
    pushRegister(label, register) {
        if (this.UnwindCodes === null)
            throw Error(`${this.name} is not proc`);
        this.UnwindCodes.push(new UNWIND_CODE(label, UWOP_PUSH_NONVOL, register));
    }
    _getLastUnwindCode() {
        if (this.UnwindCodes === null)
            throw Error(`${this.name} is not proc`);
        for (let i = this.UnwindCodes.length - 1; i >= 0; i--) {
            const code = this.UnwindCodes[i];
            if (typeof code === "number")
                continue;
            return code;
        }
        return null;
    }
    getUnwindInfoSize() {
        if (this.UnwindCodes === null)
            throw Error(`${this.name} is not proc`);
        const unwindCodeSize = (((this.UnwindCodes.length + 1) & ~1) - 1) * 2;
        return unwindCodeSize + 8;
    }
    writeUnwindInfoTo(chunk, functionBegin) {
        if (this.UnwindCodes === null)
            throw Error(`${this.name} is not proc`);
        const flags = this.exceptionHandler !== null ? UNW_FLAG_EHANDLER : UNW_FLAG_NHANDLER;
        chunk.writeUint8(UNW_VERSION | (flags << 3)); // Version 3 bits, Flags 5 bits
        const last = this._getLastUnwindCode();
        const SizeOfProlog = last === null ? 0 : last.label.offset - functionBegin;
        chunk.writeUint8(SizeOfProlog); // SizeOfProlog
        chunk.writeUint8(this.UnwindCodes.length); // CountOfUnwindCodes
        if (this.frameRegister === Register.rax) {
            chunk.writeUint8(0);
        }
        else {
            chunk.writeUint8(this.frameRegister | (this.frameRegisterOffset << 4)); // FrameRegister 4 bits, FrameRegisterOffset 4 bits
        }
        for (let i = this.UnwindCodes.length - 1; i >= 0; i--) {
            const code = this.UnwindCodes[i];
            if (typeof code === "number") {
                chunk.writeUint16(code);
            }
            else {
                code.writeTo(functionBegin, chunk);
            }
        }
        if ((this.UnwindCodes.length & 1) !== 0) {
            chunk.writeInt16(0);
        }
        // Exception Handler or Chained Unwind Info
        if (this.exceptionHandler !== null) {
            chunk.writeInt32(this.exceptionHandler.offset); // ExceptionHandler
        }
    }
}
class Defination extends AddressIdentifier {
    constructor(name, chunk, offset, arraySize, size) {
        super(name, chunk, offset);
        this.arraySize = arraySize;
        this.size = size;
    }
}
class JumpInfo {
    constructor(byteSize, dwordSize, addrSize, func) {
        this.byteSize = byteSize;
        this.dwordSize = dwordSize;
        this.addrSize = addrSize;
        this.func = func;
    }
}
class UnresolvedConstant {
    constructor(offset, bytes, address, pos) {
        this.offset = offset;
        this.bytes = bytes;
        this.address = address;
        this.pos = pos;
    }
}
const MEMORY_INDICATE_CHUNK = new AsmChunk(new Uint8Array(0), 0, 1);
const UNW_VERSION = 0x01;
const UNW_FLAG_NHANDLER = 0x0;
const UNW_FLAG_EHANDLER = 0x1; // The function has an exception handler that should be called when looking for functions that need to examine exceptions.
const UNW_FLAG_UHANDLER = 0x2; // The function has a termination handler that should be called when unwinding an exception.
const UNW_FLAG_CHAININFO = 0x4;
const UWOP_PUSH_NONVOL = 0; /* info == register number */
const UWOP_ALLOC_LARGE = 1; /* no info, alloc size in next 2 slots */
const UWOP_ALLOC_SMALL = 2; /* info == size of allocation / 8 - 1 */
const UWOP_SET_FPREG = 3; /* no info, FP = RSP + UNWIND_INFO.FPRegOffset*16 */
const UWOP_SAVE_NONVOL = 4; /* info == register number, offset in next slot */
const UWOP_SAVE_NONVOL_FAR = 5; /* info == register number, offset in next 2 slots */
const UWOP_SAVE_XMM128 = 8; /* info == XMM reg number, offset in next slot */
const UWOP_SAVE_XMM128_FAR = 9; /* info == XMM reg number, offset in next 2 slots */
const UWOP_PUSH_MACHFRAME = 10; /* info == 0: no error-code, 1: error-code */
class UNWIND_CODE {
    constructor(label, UnwindOp, OpInfo) {
        this.label = label;
        this.UnwindOp = UnwindOp;
        this.OpInfo = OpInfo;
        if (this.OpInfo < 0)
            throw TypeError(`Too small (OpInfo=${OpInfo})`);
        if (this.OpInfo > 0xf)
            throw TypeError(`Too large (OpInfo=${OpInfo})`);
        if (this.UnwindOp < 0)
            throw TypeError(`Too small (UnwindOp=${UnwindOp})`);
        if (this.UnwindOp > 0xf)
            throw TypeError(`Too large (UnwindOp=${UnwindOp})`);
    }
    writeTo(functionBegin, buf) {
        buf.writeUint8(this.label.offset - functionBegin); // CodeOffset
        buf.writeUint8(this.UnwindOp | (this.OpInfo << 4)); // UnwindOp 4 bits, OpInfo 4 bits
    }
}
var FFOperation;
(function (FFOperation) {
    FFOperation[FFOperation["inc"] = 0] = "inc";
    FFOperation[FFOperation["dec"] = 1] = "dec";
    FFOperation[FFOperation["call"] = 2] = "call";
    FFOperation[FFOperation["call_far"] = 3] = "call_far";
    FFOperation[FFOperation["jmp"] = 4] = "jmp";
    FFOperation[FFOperation["jmp_far"] = 5] = "jmp_far";
    FFOperation[FFOperation["push"] = 6] = "push";
})(FFOperation = exports.FFOperation || (exports.FFOperation = {}));
class X64Assembler {
    _polynominal(text, lineNumber, offset) {
        let res = polynominal_1.polynominal.parse(text, lineNumber, offset);
        for (const [name, value] of this.ids) {
            if (!(value instanceof Constant))
                continue;
            res = res.defineVariable(name, value.value);
        }
        return res;
    }
    _polynominalConstant(text, lineNumber, offset) {
        const value = this._polynominal(text, lineNumber, offset);
        if (!(value instanceof polynominal_1.polynominal.Constant))
            return null;
        return value.value;
    }
    _polynominalToAddress(text, offset, lineNumber) {
        const poly = this._polynominal(text, lineNumber, offset).asAdditive();
        let varcount = 0;
        function error(message, column = 0, width = text.length) {
            throw new textparser_1.ParsingError(message, {
                column: offset + column,
                width: width,
                line: lineNumber,
            });
        }
        const regs = [];
        let mult = 1;
        for (const term of poly.terms) {
            if (term.variables.length > 1) {
                error(`polynominal is too complex, variables are multiplying`);
            }
            const v = term.variables[0];
            if (!v.degree.equalsConstant(1))
                error(`polynominal is too complex, degree is not 1`);
            if (!(v.term instanceof polynominal_1.polynominal.Name))
                error("polynominal is too complex, complex term");
            switch (term.constant) {
                case 1:
                case 2:
                case 4:
                case 8:
                    break;
                default:
                    error("unexpected constant for multiplying. only possible with 1,2,4,8");
            }
            const type = regmap.get(v.term.name.toLowerCase());
            if (type) {
                const [argname, reg, size] = type;
                if (argname.short !== "r")
                    error(`unexpected identifier: ${v.term.name}`, v.term.column, v.term.length);
                if (size !== OperationSize.qword)
                    error(`unexpected register: ${v.term.name}`);
                varcount++;
                if (varcount >= 3)
                    error(`polynominal has too many variables`);
                if (term.constant !== 1) {
                    if (mult !== 1)
                        error("too many multiplying.");
                    mult = term.constant;
                    regs.unshift(reg);
                }
                else {
                    regs.push(reg);
                }
            }
            else {
                const identifier = this.ids.get(v.term.name);
                if (!identifier) {
                    error(`identifier not found: ${v.term.name}`, v.term.column, v.term.length);
                }
                error(`Invalid identifier: ${v.term.name}`, v.term.column, v.term.length);
            }
        }
        if (regs.length > 3)
            error("Too many registers");
        while (regs.length < 2)
            regs.push(null);
        return {
            r1: regs[0],
            r2: regs[1],
            multiply: mult,
            offset: poly.constant,
        };
    }
    constructor(buffer, size, align = 1) {
        this.memoryChunkSize = 0;
        this.memoryChunkAlign = 1;
        this.codeAlign = 1;
        this.constChunk = null;
        this.ids = new Map();
        this.scopeStack = [];
        this.scope = new Set();
        this.currentProc = null;
        this.unwinded = false;
        this.normalized = false;
        this.prologueAnchor = null;
        this.pos = null;
        this.chunk = new AsmChunk(buffer, size, align);
        this.currentProc = this.headProc = this.makeLabel("#head", false, true);
        this.scopeStack.push(this.scope);
        this.scope = new Set();
        this.prologueAnchor = this.makeLabel(null);
    }
    _checkPrologue() {
        if (this.currentProc === null) {
            throw Error(`not in proc`);
        }
        if (this.prologueAnchor === null || this.prologueAnchor.chunk !== this.chunk || this.prologueAnchor.offset !== this.chunk.size) {
            throw Error(`not in prologue`);
        }
        return this.currentProc;
    }
    /**
     * push with unwind info
     */
    keep_r(register) {
        const proc = this._checkPrologue();
        this.push_r(register);
        this.prologueAnchor = this.makeLabel(null);
        proc.pushRegister(this.prologueAnchor, register);
        return this;
    }
    /**
     * push with unwind info
     */
    stack_c(size) {
        const proc = this._checkPrologue();
        this.sub_r_c(Register.rsp, size);
        this.prologueAnchor = this.makeLabel(null);
        proc.allocStack(this.prologueAnchor, size);
        return this;
    }
    setframe_r_c(r, offset) {
        const proc = this._checkPrologue();
        this.lea_r_rp(r, Register.rsp, 1, offset);
        this.prologueAnchor = this.makeLabel(null);
        proc.setStackFrame(this.prologueAnchor, r, offset);
        return this;
    }
    getDefAreaSize() {
        return this.memoryChunkSize;
    }
    getDefAreaAlign() {
        return this.memoryChunkAlign;
    }
    setDefArea(size, align) {
        (0, util_1.checkPowOf2)(align);
        this.memoryChunkSize = size;
        this.memoryChunkAlign = align;
        if (align > this.codeAlign)
            this.codeAlign = align;
    }
    connect(cb) {
        return cb(this);
    }
    put(value) {
        this.chunk.put(value);
        return this;
    }
    write(...values) {
        this.chunk.write(values);
        return this;
    }
    writeBuffer(buffer) {
        this.chunk.write(buffer);
        return this;
    }
    writeUint8(value) {
        this.chunk.writeUint8(value);
        return this;
    }
    writeInt16(value) {
        this.chunk.writeInt16(value);
        return this;
    }
    writeInt32(value) {
        this.chunk.writeInt32(value);
        return this;
    }
    getLabelOffset(name) {
        if (!this.normalized)
            throw Error(`asm is not built, need to call build()`);
        const label = this.ids.get(name);
        if (!(label instanceof AddressIdentifier))
            return -1;
        return label.offset;
    }
    labels(skipPrivate) {
        if (!this.normalized)
            throw Error(`asm is not built, need to call build()`);
        const labels = Object.create(null);
        for (const [name, label] of this.ids) {
            if (skipPrivate && name.startsWith("#"))
                continue;
            if (label instanceof Label) {
                labels[name] = label.offset;
            }
        }
        return labels;
    }
    defs() {
        if (!this.normalized)
            throw Error(`asm is not built, need to call build()`);
        const labels = Object.create(null);
        for (const [name, label] of this.ids) {
            if (label instanceof Defination) {
                labels[name] = label;
            }
        }
        return labels;
    }
    buffer(makeRuntimeFunctionTable = false) {
        this._normalize(makeRuntimeFunctionTable);
        return this.chunk.buffer();
    }
    ret() {
        return this.put(0xc3);
    }
    ret_c(n) {
        this.put(0xc2);
        return this.writeInt16(n);
    }
    retf() {
        return this.put(0xcb);
    }
    retf_c(n) {
        this.put(0xca);
        return this.writeInt16(n);
    }
    nop() {
        return this.put(0x90);
    }
    debugBreak() {
        return this.int3();
    }
    int3() {
        return this.put(0xcc);
    }
    int_c(n) {
        if (n === 3)
            return this.int3();
        return this.write(0xcd, n & 0xff);
    }
    cbw() {
        return this.write(0x66, 0x98);
    }
    cwde() {
        return this.write(0x98);
    }
    cdqe() {
        return this.write(0x48, 0x98);
    }
    gs() {
        return this.put(0x65);
    }
    fs() {
        return this.put(0x64);
    }
    ds() {
        return this;
    }
    cs() {
        return this.put(0x2e);
    }
    es() {
        return this.put(0x26);
    }
    ss() {
        return this.put(0x36);
    }
    repz() {
        return this.write(0xf3);
    }
    repnz() {
        return this.write(0xf2);
    }
    _target(opcode, r1, r2, r3, targetRegister, multiplying, offset, oper) {
        if (r2 !== null) {
            opcode |= (r2 & 7) << 3;
        }
        if (oper === MovOper.Register || oper === MovOper.Const) {
            if (offset !== 0)
                throw Error("Register operation with offset");
            return this.put(opcode | (r1 & 7) | 0xc0);
        }
        if (offset !== (offset | 0))
            throw Error(`need int32 offset, offset=${offset}`);
        if (r1 === Register.absolute) {
            if (r3 !== null) {
                throw Error("Invalid opcode");
            }
            this.put(opcode | 0x04);
            this.put(0x25);
            this.writeInt32(offset);
            return this;
        }
        else if (r1 === Register.rip) {
            if (r3 !== null) {
                throw Error("Invalid opcode");
            }
            this.put(opcode | 0x05);
            this.writeInt32(offset);
            return this;
        }
        if (offset === 0 && r1 !== Register.rbp) {
            // empty
        }
        else if (INT8_MIN <= offset && offset <= INT8_MAX) {
            opcode |= 0x40;
        }
        else {
            opcode |= 0x80;
        }
        if (r3 !== null) {
            if (r3 === Register.rsp) {
                throw Error(`Invalid operation r3=rsp, r1=${Register[r1]}`);
            }
            this.put(opcode | 0x04);
            let second = (r1 & 7) | ((r3 & 7) << 3);
            switch (multiplying) {
                case 1:
                    break;
                case 2:
                    second |= 0x40;
                    break;
                case 4:
                    second |= 0x80;
                    break;
                case 8:
                    second |= 0xc0;
                    break;
                default:
                    throw Error(`Invalid multiplying ${multiplying}`);
            }
            this.put(second);
        }
        else {
            if (multiplying !== 1) {
                this.put(opcode | 0x04);
                let second = ((r1 & 7) << 3) | 0x05;
                switch (multiplying) {
                    case 2:
                        second |= 0x40;
                        break;
                    case 4:
                        second |= 0x80;
                        break;
                    case 8:
                        second |= 0xc0;
                        break;
                    default:
                        throw Error(`Invalid multiplying ${multiplying}`);
                }
                this.put(second);
            }
            else {
                this.put((r1 & 7) | opcode);
                if (targetRegister === Register.rsp) {
                    this.put(0x24);
                }
            }
        }
        if (opcode & 0x40)
            this.put(offset);
        else if (opcode & 0x80) {
            this.writeInt32(offset);
        }
        return this;
    }
    _rex(r1, r2, r3, size) {
        if (size === OperationSize.word)
            this.put(0x66);
        let rex = 0x40;
        if (size === OperationSize.qword)
            rex |= 0x08;
        if (r1 >= Register.r8)
            rex |= 0x01;
        if (r2 !== null && r2 >= Register.r8)
            rex |= 0x04;
        if (r3 !== null && r3 >= Register.r8)
            rex |= 0x02;
        if (rex !== 0x40)
            this.put(rex);
    }
    _const(v, size) {
        const [low32, high32] = split64bits(v);
        if (size === OperationSize.byte) {
            this.put(low32 & 0xff);
        }
        else if (size === OperationSize.word) {
            this.writeInt16(low32 & 0xffff);
        }
        else if (size === OperationSize.qword) {
            this.writeInt32(low32);
            this.writeInt32(high32);
        }
        else {
            this.writeInt32(low32);
        }
        return this;
    }
    _mov(r1, r2, r3, multiply, offset, value, oper, size) {
        this._rex(r1, r2, r3, size);
        let opcode = 0;
        if (size === OperationSize.byte) {
            if (oper === MovOper.WriteConst) {
                this.put(0xc6);
            }
            else if (oper === MovOper.Const) {
                opcode |= 0xb0;
            }
        }
        else {
            if (oper === MovOper.WriteConst) {
                this.put(0xc7);
            }
            else if (oper === MovOper.Const) {
                if (size === OperationSize.qword && is32Bits(value)) {
                    size = OperationSize.dword;
                    this.put(0xc7);
                    opcode |= 0xc0;
                }
                else {
                    opcode |= 0xb8;
                }
            }
        }
        if (oper !== MovOper.Const && oper !== MovOper.WriteConst) {
            if (oper === MovOper.Lea && size !== OperationSize.dword && size !== OperationSize.qword) {
                throw Error("Invalid operation");
            }
            let memorytype = 0x88;
            if (oper === MovOper.Lea)
                memorytype |= 0x05;
            else if (oper === MovOper.Read)
                memorytype |= 0x02;
            if (size !== OperationSize.byte)
                memorytype |= 0x01;
            this.put(memorytype);
        }
        if (oper === MovOper.Const) {
            this.put(opcode | (r1 & 7));
        }
        else {
            this._target(opcode, r1, r2, r3, r1, multiply, offset, oper);
        }
        if (oper === MovOper.WriteConst) {
            this._const(value, size === OperationSize.qword ? OperationSize.dword : size);
        }
        else if (oper === MovOper.Const) {
            this._const(value, size);
        }
        return this;
    }
    movabs_r_c(dest, value, size = OperationSize.qword) {
        if (size !== OperationSize.qword)
            throw Error(`Invalid operation size ${OperationSize[size]}`);
        return this.mov_r_c(dest, value, size);
    }
    _movabs_rax_mem(address, writeBit, size) {
        if (size === OperationSize.word) {
            this.write(0x66);
        }
        else if (size === OperationSize.qword) {
            this.write(0x48);
        }
        const dwordBit = +(size !== OperationSize.byte);
        this.write((writeBit << 1) | dwordBit | 0xa0);
        const [low32, high32] = split64bits(address);
        this.writeInt32(low32);
        this.writeInt32(high32);
        return this;
    }
    movabs_r_cp(dest, address, size = OperationSize.qword) {
        if (dest !== Register.rax)
            throw Error(`Invalid operand ${Register[dest]}`);
        return this._movabs_rax_mem(address, 0, size);
    }
    movabs_cp_r(address, src, size = OperationSize.qword) {
        if (src !== Register.rax)
            throw Error(`Invalid operand ${Register[src]}`);
        return this._movabs_rax_mem(address, 1, size);
    }
    def(name, size, bytes, align, arraySize = null, exportDef = false) {
        if (align < 1)
            align = 1;
        (0, util_1.checkPowOf2)(align);
        if (align > this.memoryChunkAlign) {
            this.memoryChunkAlign = align;
        }
        const memSize = this.memoryChunkSize;
        const offset = (memSize + align - 1) & ~(align - 1);
        this.memoryChunkSize = offset + bytes;
        if (name === "")
            return this;
        if (this.ids.has(name))
            throw Error(`${name} is already defined`);
        this.ids.set(name, new Defination(name, MEMORY_INDICATE_CHUNK, offset, arraySize, size));
        if (!exportDef)
            this.scope.add(name);
        return this;
    }
    lea_r_cp(dest, offset, size = OperationSize.qword) {
        return this.mov_r_c(dest, offset, size);
    }
    lea_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        if (offset === 0 && src !== Register.rip) {
            if (dest === src)
                return this;
            return this.mov_r_r(dest, src, size);
        }
        return this._mov(src, dest, null, multiply, offset, 0, MovOper.Lea, size);
    }
    lea_r_rrp(dest, src1, src2, multiply, offset, size = OperationSize.qword) {
        return this._mov(src1, dest, src2, multiply, offset, 0, MovOper.Lea, size);
    }
    /**
     * move register to register
     */
    mov_r_r(dest, src, size = OperationSize.qword) {
        return this._mov(dest, src, null, 1, 0, 0, MovOper.Register, size);
    }
    /**
     * move const to register
     */
    mov_r_c(dest, value, size = OperationSize.qword) {
        if (size === OperationSize.qword || size === OperationSize.dword) {
            const [low, high] = split64bits(value);
            if (low === 0 && high === 0)
                return this.xor_r_r(dest, dest);
        }
        return this._mov(dest, 0, null, 1, 0, value, MovOper.Const, size);
    }
    /**
     * move const to register pointer
     */
    mov_rp_c(dest, multiply, offset, value, size = OperationSize.qword) {
        return this._mov(dest, null, null, multiply, offset, value, MovOper.WriteConst, size);
    }
    /**
     * move register to register pointer
     */
    mov_rp_r(dest, multiply, offset, src, size = OperationSize.qword) {
        return this._mov(dest, src, null, multiply, offset, 0, MovOper.Write, size);
    }
    mov_rrp_r(dest1, dest2, multiply, offset, src, size = OperationSize.qword) {
        return this._mov(dest1, src, dest2, multiply, offset, 0, MovOper.Write, size);
    }
    /**
     * move register pointer to register
     */
    mov_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._mov(src, dest, null, multiply, offset, 0, MovOper.Read, size);
    }
    mov_r_rrp(dest, src1, src2, multiply, offset, size = OperationSize.qword) {
        return this._mov(src1, dest, src2, multiply, offset, 0, MovOper.Read, size);
    }
    _imul(r1, r2, multiply, offset, size, oper) {
        if (size !== OperationSize.dword && size !== OperationSize.qword && size !== OperationSize.word)
            throw Error("unsupported");
        this._rex(r1, r2, null, size);
        this.write(0x0f, 0xaf);
        this._target(0x00, r1, r2, null, r1, multiply, offset, oper);
        return this;
    }
    imul_r_r(dest, src, size = OperationSize.qword) {
        return this._imul(src, dest, 1, 0, size, MovOper.Register);
    }
    imul_rp_r(dest, multiply, offset, src, size = OperationSize.qword) {
        return this._imul(src, dest, multiply, offset, size, MovOper.Write);
    }
    imul_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._imul(src, dest, multiply, offset, size, MovOper.Read);
    }
    idiv_r(src, size = OperationSize.qword) {
        this._rex(src, null, null, size);
        return this.write(0xf7, 0xf8 | src);
    }
    /**
     * jump with register
     */
    jmp_r(register) {
        return this._ffoper_r(FFOperation.jmp, register, OperationSize.dword);
    }
    _ffoper(ffoper, r, multiply, offset, size, oper) {
        this._rex(r, null, null, size);
        this.put(0xff);
        this._target(ffoper << 3, r, null, null, r, multiply, offset, oper);
        return this;
    }
    _ffoper_r(ffoper, r, size) {
        return this._ffoper(ffoper, r, 1, 0, size, MovOper.Register);
    }
    inc_r(r, size = OperationSize.qword) {
        return this._ffoper_r(FFOperation.inc, r, size);
    }
    inc_rp(r, multiply, offset, size = OperationSize.qword) {
        return this._ffoper(FFOperation.inc, r, multiply, offset, size, MovOper.Write);
    }
    dec_r(r, size = OperationSize.qword) {
        return this._ffoper_r(FFOperation.dec, r, size);
    }
    dec_rp(r, multiply, offset, size = OperationSize.qword) {
        return this._ffoper(FFOperation.dec, r, multiply, offset, size, MovOper.Write);
    }
    /**
     * call with register
     */
    call_r(register) {
        return this._ffoper_r(FFOperation.call, register, OperationSize.dword);
    }
    /**
     * jump with register pointer
     */
    jmp_rp(register, multiply, offset) {
        return this._ffoper(FFOperation.jmp, register, multiply, offset, OperationSize.dword, MovOper.Read);
    }
    /**
     * call with register pointer
     */
    call_rp(register, multiply, offset) {
        return this._ffoper(FFOperation.call, register, multiply, offset, OperationSize.dword, MovOper.Read);
    }
    /**
     * jump far pointer
     */
    jmp_fp(register, multiply, offset) {
        return this._ffoper(FFOperation.jmp_far, register, multiply, offset, OperationSize.dword, MovOper.Read);
    }
    /**
     * call far pointer
     */
    call_fp(register, multiply, offset) {
        return this._ffoper(FFOperation.call_far, register, multiply, offset, OperationSize.dword, MovOper.Read);
    }
    /**
     * just combine of 'mov' and 'call'.
     * mov tmpreg, value;
     * call tmpreg;
     */
    call64(value, tempRegister) {
        if (isZero(value))
            throw Error(`Invalid jmp destination: ${value}`);
        this.mov_r_c(tempRegister, value);
        this.call_r(tempRegister);
        return this;
    }
    saveAndCall(target, keepRegister, keepFloatRegister) {
        const fullsize = keepRegister.length * 8 + keepFloatRegister.length * 0x10;
        const stackSize = ((0x20 + fullsize - 8 + 0xf) & ~0xf) + 8;
        this.stack_c(stackSize);
        let offset = 0x20;
        for (const r of keepFloatRegister) {
            this.movdqa_rp_f(Register.rsp, 1, offset, r);
            offset += 0x10;
        }
        for (const r of keepRegister) {
            this.mov_rp_r(Register.rsp, 1, offset, r);
            offset += 0x8;
        }
        this.call64(target, Register.rax);
        offset = 0x20;
        for (const r of keepFloatRegister) {
            this.movdqa_f_rp(r, Register.rsp, 1, offset);
            offset += 0x10;
        }
        for (const r of keepRegister) {
            this.mov_r_rp(r, Register.rsp, 1, offset);
            offset += 0x8;
        }
        this.unwind();
        return this;
    }
    /**
     * mov tmpreg, 64bits
     * jmp tmpreg
     */
    jmp64(value, tempRegister) {
        if (isZero(value))
            throw Error(`Invalid jmp destination: ${value}`);
        this.mov_r_c(tempRegister, value);
        this.jmp_r(tempRegister);
        return this;
    }
    /**
     * mov [rsp-4], high32(v)
     * mov [rsp-8],  low32(v)
     * jmp [rsp-8]
     */
    jmp64_notemp(value) {
        if (isZero(value))
            throw Error(`Invalid jmp destination: ${value}`);
        const [low32, high32] = split64bits(value);
        this.mov_rp_c(Register.rsp, 1, -8, low32, OperationSize.dword);
        this.mov_rp_c(Register.rsp, 1, -4, high32, OperationSize.dword);
        this.jmp_rp(Register.rsp, 1, -8);
        return this;
    }
    jmp_c(offset) {
        if (offset === 0)
            return this;
        if (INT8_MIN <= offset && offset <= INT8_MAX) {
            return this.write(0xeb, offset);
        }
        else {
            this.put(0xe9);
            this.writeInt32(offset);
            return this;
        }
    }
    call_c(offset) {
        this.put(0xe8);
        this.writeInt32(offset);
        return this;
    }
    _movaps(r1, r2, oper, multiply, offset) {
        this._rex(r1, r2, null, OperationSize.dword);
        this.put(0x0f);
        let v = 0x28;
        if (oper === MovOper.Write)
            v |= 1;
        this.put(v);
        this._target(0, r1, r2, null, r1, multiply, offset, oper);
        return this;
    }
    movaps_f_f(dest, src) {
        return this._movaps(src, dest, MovOper.Register, 1, 0);
    }
    movaps_f_rp(dest, src, multiply, offset) {
        return this._movaps(src, dest, MovOper.Read, multiply, offset);
    }
    movaps_rp_f(dest, multiply, offset, src) {
        return this._movaps(dest, src, MovOper.Write, multiply, offset);
    }
    movdqa_rp_f(dest, multiply, offset, src) {
        this.write(0x66, 0x0f, 0x7f);
        this._target(0, dest, src, null, dest, multiply, offset, MovOper.Write);
        return this;
    }
    movdqa_f_rp(dest, src, multiply, offset) {
        this.write(0x66, 0x0f, 0x7f);
        this._target(0, src, dest, null, src, multiply, offset, MovOper.Read);
        return this;
    }
    _jmp_o(oper, offset) {
        if (INT8_MIN <= offset && offset <= INT8_MAX) {
            return this.write(0x70 | oper, offset);
        }
        else {
            this.put(0x0f);
            this.put(0x80 | oper);
            this.writeInt32(offset);
        }
        return this;
    }
    jz_c(offset) {
        return this._jmp_o(JumpOperation.je, offset);
    }
    jnz_c(offset) {
        return this._jmp_o(JumpOperation.jne, offset);
    }
    jo_c(offset) {
        return this._jmp_o(JumpOperation.jo, offset);
    }
    jno_c(offset) {
        return this._jmp_o(JumpOperation.jno, offset);
    }
    jb_c(offset) {
        return this._jmp_o(JumpOperation.jb, offset);
    }
    jae_c(offset) {
        return this._jmp_o(JumpOperation.jae, offset);
    }
    je_c(offset) {
        return this._jmp_o(JumpOperation.je, offset);
    }
    jne_c(offset) {
        return this._jmp_o(JumpOperation.jne, offset);
    }
    jbe_c(offset) {
        return this._jmp_o(JumpOperation.jbe, offset);
    }
    ja_c(offset) {
        return this._jmp_o(JumpOperation.ja, offset);
    }
    js_c(offset) {
        return this._jmp_o(JumpOperation.js, offset);
    }
    jns_c(offset) {
        return this._jmp_o(JumpOperation.jns, offset);
    }
    jp_c(offset) {
        return this._jmp_o(JumpOperation.jp, offset);
    }
    jnp_c(offset) {
        return this._jmp_o(JumpOperation.jnp, offset);
    }
    jl_c(offset) {
        return this._jmp_o(JumpOperation.jl, offset);
    }
    jge_c(offset) {
        return this._jmp_o(JumpOperation.jge, offset);
    }
    jle_c(offset) {
        return this._jmp_o(JumpOperation.jle, offset);
    }
    jg_c(offset) {
        return this._jmp_o(JumpOperation.jg, offset);
    }
    _cmov_o(jmpoper, r1, r2, r3, multiply, offset, oper, size) {
        this._rex(r1, r2, r3, size);
        this.put(0x0f);
        this.put(0x40 | jmpoper);
        this._target(0, r1, r2, r3, r2, multiply, offset, oper);
        return this;
    }
    cmovz_r_r(dest, src, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.je, src, dest, null, 1, 0, MovOper.Register, size);
    }
    cmovnz_r_r(dest, src, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jne, src, dest, null, 1, 0, MovOper.Register, size);
    }
    cmovo_r_r(dest, src, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jo, src, dest, null, 1, 0, MovOper.Register, size);
    }
    cmovno_r_r(dest, src, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jno, src, dest, null, 1, 0, MovOper.Register, size);
    }
    cmovb_r_r(dest, src, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jb, src, dest, null, 1, 0, MovOper.Register, size);
    }
    cmovae_r_r(dest, src, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jae, src, dest, null, 1, 0, MovOper.Register, size);
    }
    cmove_r_r(dest, src, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.je, src, dest, null, 1, 0, MovOper.Register, size);
    }
    cmovne_r_r(dest, src, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jne, src, dest, null, 1, 0, MovOper.Register, size);
    }
    cmovbe_r_r(dest, src, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jbe, src, dest, null, 1, 0, MovOper.Register, size);
    }
    cmova_r_r(dest, src, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.ja, src, dest, null, 1, 0, MovOper.Register, size);
    }
    cmovs_r_r(dest, src, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.js, src, dest, null, 1, 0, MovOper.Register, size);
    }
    cmovns_r_r(dest, src, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jns, src, dest, null, 1, 0, MovOper.Register, size);
    }
    cmovp_r_r(dest, src, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jp, src, dest, null, 1, 0, MovOper.Register, size);
    }
    cmovnp_r_r(dest, src, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jnp, src, dest, null, 1, 0, MovOper.Register, size);
    }
    cmovl_r_r(dest, src, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jl, src, dest, null, 1, 0, MovOper.Register, size);
    }
    cmovge_r_r(dest, src, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jge, src, dest, null, 1, 0, MovOper.Register, size);
    }
    cmovle_r_r(dest, src, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jle, src, dest, null, 1, 0, MovOper.Register, size);
    }
    cmovg_r_r(dest, src, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jg, src, dest, null, 1, 0, MovOper.Register, size);
    }
    cmovz_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.je, src, dest, null, multiply, offset, MovOper.Read, size);
    }
    cmovnz_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jne, src, dest, null, multiply, offset, MovOper.Read, size);
    }
    cmovo_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jo, src, dest, null, multiply, offset, MovOper.Read, size);
    }
    cmovno_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jno, src, dest, null, multiply, offset, MovOper.Read, size);
    }
    cmovb_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jb, src, dest, null, multiply, offset, MovOper.Read, size);
    }
    cmovae_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jae, src, dest, null, multiply, offset, MovOper.Read, size);
    }
    cmove_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.je, src, dest, null, multiply, offset, MovOper.Read, size);
    }
    cmovne_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jne, src, dest, null, multiply, offset, MovOper.Read, size);
    }
    cmovbe_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jbe, src, dest, null, multiply, offset, MovOper.Read, size);
    }
    cmova_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.ja, src, dest, null, multiply, offset, MovOper.Read, size);
    }
    cmovs_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.js, src, dest, null, multiply, offset, MovOper.Read, size);
    }
    cmovns_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jns, src, dest, null, multiply, offset, MovOper.Read, size);
    }
    cmovp_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jp, src, dest, null, multiply, offset, MovOper.Read, size);
    }
    cmovnp_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jnp, src, dest, null, multiply, offset, MovOper.Read, size);
    }
    cmovl_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jl, src, dest, null, multiply, offset, MovOper.Read, size);
    }
    cmovge_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jge, src, dest, null, multiply, offset, MovOper.Read, size);
    }
    cmovle_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jle, src, dest, null, multiply, offset, MovOper.Read, size);
    }
    cmovg_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._cmov_o(JumpOperation.jg, src, dest, null, multiply, offset, MovOper.Read, size);
    }
    _set_o(jmpoper, r1, r3, multiply, offset, oper) {
        this.put(0x0f);
        this.put(0x90 | jmpoper);
        this._target(0, r1, null, r3, r1, multiply, offset, oper);
        return this;
    }
    seto_r(r) {
        return this._set_o(JumpOperation.jo, r, null, 1, 0, MovOper.Register);
    }
    setno_r(r) {
        return this._set_o(JumpOperation.jno, r, null, 1, 0, MovOper.Register);
    }
    setb_r(r) {
        return this._set_o(JumpOperation.jb, r, null, 1, 0, MovOper.Register);
    }
    setae_r(r) {
        return this._set_o(JumpOperation.jae, r, null, 1, 0, MovOper.Register);
    }
    sete_r(r) {
        return this._set_o(JumpOperation.je, r, null, 1, 0, MovOper.Register);
    }
    setne_r(r) {
        return this._set_o(JumpOperation.jne, r, null, 1, 0, MovOper.Register);
    }
    setbe_r(r) {
        return this._set_o(JumpOperation.jbe, r, null, 1, 0, MovOper.Register);
    }
    seta_r(r) {
        return this._set_o(JumpOperation.ja, r, null, 1, 0, MovOper.Register);
    }
    sets_r(r) {
        return this._set_o(JumpOperation.js, r, null, 1, 0, MovOper.Register);
    }
    setns_r(r) {
        return this._set_o(JumpOperation.jns, r, null, 1, 0, MovOper.Register);
    }
    setp_r(r) {
        return this._set_o(JumpOperation.jp, r, null, 1, 0, MovOper.Register);
    }
    setnp_r(r) {
        return this._set_o(JumpOperation.jnp, r, null, 1, 0, MovOper.Register);
    }
    setl_r(r) {
        return this._set_o(JumpOperation.jl, r, null, 1, 0, MovOper.Register);
    }
    setge_r(r) {
        return this._set_o(JumpOperation.jge, r, null, 1, 0, MovOper.Register);
    }
    setle_r(r) {
        return this._set_o(JumpOperation.jle, r, null, 1, 0, MovOper.Register);
    }
    setg_r(r) {
        return this._set_o(JumpOperation.jg, r, null, 1, 0, MovOper.Register);
    }
    seto_rp(r, multiply, offset) {
        return this._set_o(JumpOperation.jo, r, null, multiply, offset, MovOper.Read);
    }
    setno_rp(r, multiply, offset) {
        return this._set_o(JumpOperation.jno, r, null, multiply, offset, MovOper.Read);
    }
    setb_rp(r, multiply, offset) {
        return this._set_o(JumpOperation.jb, r, null, multiply, offset, MovOper.Read);
    }
    setae_rp(r, multiply, offset) {
        return this._set_o(JumpOperation.jae, r, null, multiply, offset, MovOper.Read);
    }
    sete_rp(r, multiply, offset) {
        return this._set_o(JumpOperation.je, r, null, multiply, offset, MovOper.Read);
    }
    setne_rp(r, multiply, offset) {
        return this._set_o(JumpOperation.jne, r, null, multiply, offset, MovOper.Read);
    }
    setbe_rp(r, multiply, offset) {
        return this._set_o(JumpOperation.jbe, r, null, multiply, offset, MovOper.Read);
    }
    seta_rp(r, multiply, offset) {
        return this._set_o(JumpOperation.ja, r, null, multiply, offset, MovOper.Read);
    }
    sets_rp(r, multiply, offset) {
        return this._set_o(JumpOperation.js, r, null, multiply, offset, MovOper.Read);
    }
    setns_rp(r, multiply, offset) {
        return this._set_o(JumpOperation.jns, r, null, multiply, offset, MovOper.Read);
    }
    setp_rp(r, multiply, offset) {
        return this._set_o(JumpOperation.jp, r, null, multiply, offset, MovOper.Read);
    }
    setnp_rp(r, multiply, offset) {
        return this._set_o(JumpOperation.jnp, r, null, multiply, offset, MovOper.Read);
    }
    setl_rp(r, multiply, offset) {
        return this._set_o(JumpOperation.jl, r, null, multiply, offset, MovOper.Read);
    }
    setge_rp(r, multiply, offset) {
        return this._set_o(JumpOperation.jge, r, null, multiply, offset, MovOper.Read);
    }
    setle_rp(r, multiply, offset) {
        return this._set_o(JumpOperation.jle, r, null, multiply, offset, MovOper.Read);
    }
    setg_rp(r, multiply, offset) {
        return this._set_o(JumpOperation.jg, r, null, multiply, offset, MovOper.Read);
    }
    /**
     * push register
     */
    push_r(register, size = OperationSize.qword) {
        if (size === OperationSize.word) {
            this.put(0x66);
        }
        else {
            if (size !== OperationSize.qword)
                throw Error(`Operand size mismatch for push: ${OperationSize[size]}`);
        }
        if (register >= Register.r8)
            this.put(0x41);
        this.put(0x50 | (register & 7));
        return this;
    }
    /**
     * push const
     */
    push_c(value) {
        if (value !== (value | 0))
            throw Error("need int32 integer");
        if (INT8_MIN <= value && value <= INT8_MAX) {
            this.put(0x6a);
            this.put(value);
        }
        else {
            this.put(0x68);
            this.writeInt32(value);
        }
        return this;
    }
    push_rp(r, multiply, offset) {
        if (r >= Register.r8)
            this.put(0x41);
        this.put(0xff);
        this._target(0x30, r, null, null, r, multiply, offset, MovOper.Write);
        return this;
    }
    pop_r(r, size = OperationSize.qword) {
        if (size === OperationSize.word) {
            this.put(0x66);
        }
        else {
            if (size !== OperationSize.qword)
                throw Error(`Operand size mismatch for push: ${OperationSize[size]}`);
        }
        if (r >= Register.r8)
            this.put(0x41);
        this.put(0x58 | (r & 7));
        return this;
    }
    _test(r1, r2, multiply, offset, size, oper) {
        this._rex(r1, r2, null, size);
        if (size === OperationSize.byte)
            this.put(0x84);
        else
            this.put(0x85);
        this._target(0, r1, r2, null, r1, multiply, offset, oper);
        return this;
    }
    test_r_r(r1, r2, size = OperationSize.qword) {
        return this._test(r1, r2, 1, 0, size, MovOper.Register);
    }
    test_r_rp(r1, r2, multiply, offset, size = OperationSize.qword) {
        return this._test(r1, r2, multiply, offset, size, MovOper.Read);
    }
    _xchg(r1, r2, multiply, offset, size, oper) {
        this._rex(r1, r2, null, size);
        if (size === OperationSize.byte)
            this.put(0x86);
        else
            this.put(0x87);
        this._target(0, r1, r2, null, r1, multiply, offset, oper);
        return this;
    }
    xchg_r_r(r1, r2, size = OperationSize.qword) {
        return this._xchg(r1, r2, 1, 0, size, MovOper.Register);
    }
    xchg_r_rp(r1, r2, multiply, offset, size = OperationSize.qword) {
        return this._xchg(r1, r2, multiply, offset, size, MovOper.Read);
    }
    _oper(movoper, oper, r1, r2, multiply, offset, chr, size) {
        if (chr !== (chr | 0) && chr >>> 0 !== chr) {
            throw Error("need 32bits integer");
        }
        this._rex(r1, r2, null, size);
        let lowflag = size === OperationSize.byte ? 0 : 1;
        if (movoper === MovOper.Read)
            lowflag |= 0x02;
        if (movoper === MovOper.WriteConst || movoper === MovOper.Const) {
            const is8bits = INT8_MIN <= chr && chr <= INT8_MAX;
            if (!is8bits && size === OperationSize.byte)
                throw Error("need 8bits integer");
            if (!is8bits && r1 === Register.rax && movoper === MovOper.Const) {
                this.put(0x04 | lowflag | (oper << 3));
                this.writeInt32(chr);
            }
            else {
                if (is8bits) {
                    if (lowflag !== 0)
                        lowflag = 3;
                }
                this.put(0x80 | lowflag);
                this._target(0, r1, oper, null, r1, multiply, offset, movoper);
                if (is8bits)
                    this.put(chr);
                else
                    this.writeInt32(chr);
            }
        }
        else {
            this.put(lowflag | (oper << 3));
            this._target(0, r1, r2, null, r1, multiply, offset, movoper);
        }
        return this;
    }
    cmp_r_r(dest, src, size = OperationSize.qword) {
        return this._oper(MovOper.Register, Operator.cmp, dest, src, 1, 0, 0, size);
    }
    sub_r_r(dest, src, size = OperationSize.qword) {
        return this._oper(MovOper.Register, Operator.sub, dest, src, 1, 0, 0, size);
    }
    add_r_r(dest, src, size = OperationSize.qword) {
        return this._oper(MovOper.Register, Operator.add, dest, src, 1, 0, 0, size);
    }
    sbb_r_r(dest, src, size = OperationSize.qword) {
        return this._oper(MovOper.Register, Operator.sbb, dest, src, 1, 0, 0, size);
    }
    adc_r_r(dest, src, size = OperationSize.qword) {
        return this._oper(MovOper.Register, Operator.adc, dest, src, 1, 0, 0, size);
    }
    xor_r_r(dest, src, size = OperationSize.qword) {
        if (dest === src && size === OperationSize.qword)
            size = OperationSize.dword;
        return this._oper(MovOper.Register, Operator.xor, dest, src, 1, 0, 0, size);
    }
    or_r_r(dest, src, size = OperationSize.qword) {
        return this._oper(MovOper.Register, Operator.or, dest, src, 1, 0, 0, size);
    }
    and_r_r(dest, src, size = OperationSize.qword) {
        return this._oper(MovOper.Register, Operator.and, dest, src, 1, 0, 0, size);
    }
    cmp_r_c(dest, chr, size = OperationSize.qword) {
        return this._oper(MovOper.Const, Operator.cmp, dest, null, 1, 0, chr, size);
    }
    sub_r_c(dest, chr, size = OperationSize.qword) {
        return this._oper(MovOper.Const, Operator.sub, dest, null, 1, 0, chr, size);
    }
    add_r_c(dest, chr, size = OperationSize.qword) {
        return this._oper(MovOper.Const, Operator.add, dest, null, 1, 0, chr, size);
    }
    sbb_r_c(dest, chr, size = OperationSize.qword) {
        return this._oper(MovOper.Const, Operator.sbb, dest, null, 1, 0, chr, size);
    }
    adc_r_c(dest, chr, size = OperationSize.qword) {
        return this._oper(MovOper.Const, Operator.adc, dest, null, 1, 0, chr, size);
    }
    xor_r_c(dest, chr, size = OperationSize.qword) {
        return this._oper(MovOper.Const, Operator.xor, dest, null, 1, 0, chr, size);
    }
    or_r_c(dest, chr, size = OperationSize.qword) {
        return this._oper(MovOper.Const, Operator.or, dest, null, 1, 0, chr, size);
    }
    and_r_c(dest, chr, size = OperationSize.qword) {
        return this._oper(MovOper.Const, Operator.and, dest, null, 1, 0, chr, size);
    }
    cmp_rp_c(dest, multiply, offset, chr, size = OperationSize.qword) {
        return this._oper(MovOper.WriteConst, Operator.cmp, dest, 0, multiply, offset, chr, size);
    }
    sub_rp_c(dest, multiply, offset, chr, size = OperationSize.qword) {
        return this._oper(MovOper.WriteConst, Operator.sub, dest, 0, multiply, offset, chr, size);
    }
    add_rp_c(dest, multiply, offset, chr, size = OperationSize.qword) {
        return this._oper(MovOper.WriteConst, Operator.add, dest, 0, multiply, offset, chr, size);
    }
    sbb_rp_c(dest, multiply, offset, chr, size = OperationSize.qword) {
        return this._oper(MovOper.WriteConst, Operator.sbb, dest, 0, multiply, offset, chr, size);
    }
    adc_rp_c(dest, multiply, offset, chr, size = OperationSize.qword) {
        return this._oper(MovOper.WriteConst, Operator.adc, dest, 0, multiply, offset, chr, size);
    }
    xor_rp_c(dest, multiply, offset, chr, size = OperationSize.qword) {
        return this._oper(MovOper.WriteConst, Operator.xor, dest, 0, multiply, offset, chr, size);
    }
    or_rp_c(dest, multiply, offset, chr, size = OperationSize.qword) {
        return this._oper(MovOper.WriteConst, Operator.or, dest, 0, multiply, offset, chr, size);
    }
    and_rp_c(dest, multiply, offset, chr, size = OperationSize.qword) {
        return this._oper(MovOper.WriteConst, Operator.and, dest, 0, multiply, offset, chr, size);
    }
    cmp_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._oper(MovOper.Read, Operator.cmp, src, dest, multiply, offset, 0, size);
    }
    sub_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._oper(MovOper.Read, Operator.sub, src, dest, multiply, offset, 0, size);
    }
    add_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._oper(MovOper.Read, Operator.add, src, dest, multiply, offset, 0, size);
    }
    sbb_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._oper(MovOper.Read, Operator.sbb, src, dest, multiply, offset, 0, size);
    }
    adc_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._oper(MovOper.Read, Operator.adc, src, dest, multiply, offset, 0, size);
    }
    xor_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._oper(MovOper.Read, Operator.xor, src, dest, multiply, offset, 0, size);
    }
    or_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._oper(MovOper.Read, Operator.or, src, dest, multiply, offset, 0, size);
    }
    and_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._oper(MovOper.Read, Operator.and, src, dest, multiply, offset, 0, size);
    }
    cmp_rp_r(dest, multiply, offset, src, size = OperationSize.qword) {
        return this._oper(MovOper.Write, Operator.cmp, dest, src, multiply, offset, 0, size);
    }
    sub_rp_r(dest, multiply, offset, src, size = OperationSize.qword) {
        return this._oper(MovOper.Write, Operator.sub, dest, src, multiply, offset, 0, size);
    }
    add_rp_r(dest, multiply, offset, src, size = OperationSize.qword) {
        return this._oper(MovOper.Write, Operator.add, dest, src, multiply, offset, 0, size);
    }
    sbb_rp_r(dest, multiply, offset, src, size = OperationSize.qword) {
        return this._oper(MovOper.Write, Operator.sbb, dest, src, multiply, offset, 0, size);
    }
    adc_rp_r(dest, multiply, offset, src, size = OperationSize.qword) {
        return this._oper(MovOper.Write, Operator.adc, dest, src, multiply, offset, 0, size);
    }
    xor_rp_r(dest, multiply, offset, src, size = OperationSize.qword) {
        return this._oper(MovOper.Write, Operator.xor, dest, src, multiply, offset, 0, size);
    }
    or_rp_r(dest, multiply, offset, src, size = OperationSize.qword) {
        return this._oper(MovOper.Write, Operator.or, dest, src, multiply, offset, 0, size);
    }
    and_rp_r(dest, multiply, offset, src, size = OperationSize.qword) {
        return this._oper(MovOper.Write, Operator.and, dest, src, multiply, offset, 0, size);
    }
    _shift_r_c(dest, signed, right, chr, size = OperationSize.qword) {
        this._rex(dest, 0, null, size);
        let operbit = 0xe0;
        if (right) {
            operbit |= 0x08;
            if (signed)
                operbit |= 0x10;
        }
        if (chr === 1) {
            this.put(0xd1);
            this.put(operbit | dest);
        }
        else {
            this.put(0xc1);
            this.put(operbit | dest);
            this.put(chr % 128);
        }
        return this;
    }
    shr_r_c(dest, chr, size = OperationSize.qword) {
        return this._shift_r_c(dest, false, true, chr, size);
    }
    shl_r_c(dest, chr, size = OperationSize.qword) {
        return this._shift_r_c(dest, false, false, chr, size);
    }
    sar_r_c(dest, chr, size = OperationSize.qword) {
        return this._shift_r_c(dest, true, true, chr, size);
    }
    sal_r_c(dest, chr, size = OperationSize.qword) {
        return this._shift_r_c(dest, true, false, chr, size);
    }
    _movsx(dest, src, multiply, offset, destsize, srcsize, oper) {
        if (destsize == null || srcsize == null)
            throw Error(`Need operand size`);
        if (srcsize > OperationSize.dword)
            throw Error(`Unexpected source operand size, ${OperationSize[destsize] || destsize}`);
        if (destsize <= srcsize)
            throw Error(`Unexpected operand size, ${OperationSize[srcsize] || srcsize} to ${OperationSize[destsize] || destsize}`);
        this._rex(src, dest, null, destsize);
        switch (srcsize) {
            case OperationSize.byte:
                this.put(0x0f);
                this.put(0xbe);
                break;
            case OperationSize.word:
                this.put(0x0f);
                this.put(0xbf);
                break;
            case OperationSize.dword:
                this.put(0x63);
                break;
            default:
                throw Error(`Invalid destination operand size, ${OperationSize[srcsize] || srcsize}`);
        }
        return this._target(0, src, dest, null, src, multiply, offset, oper);
    }
    movsx_r_rp(dest, src, multiply, offset, destsize, srcsize) {
        return this._movsx(dest, src, multiply, offset, destsize, srcsize, MovOper.Read);
    }
    movsxd_r_rp(dest, src, multiply, offset) {
        return this.movsx_r_rp(dest, src, multiply, offset, OperationSize.qword, OperationSize.dword);
    }
    movsx_r_r(dest, src, destsize, srcsize) {
        return this._movsx(dest, src, 1, 0, destsize, srcsize, MovOper.Register);
    }
    movsxd_r_r(dest, src) {
        return this.movsx_r_r(dest, src, OperationSize.qword, OperationSize.dword);
    }
    _movzx(r1, r2, r3, multiply, offset, destsize, srcsize, oper) {
        if (destsize == null || srcsize == null)
            throw Error(`Need operand size`);
        if (srcsize >= OperationSize.dword)
            throw Error(`Unexpected source operand size, ${OperationSize[destsize]}`);
        if (destsize <= srcsize)
            throw Error(`Unexpected operand size, ${OperationSize[srcsize]} to ${OperationSize[destsize]}`);
        this._rex(r1, r2, r3, destsize);
        this.put(0x0f);
        let opcode = 0xb6;
        if (srcsize === OperationSize.word)
            opcode |= 1;
        this.put(opcode);
        return this._target(0, r1, r2, r3, r1, multiply, offset, oper);
    }
    movzx_r_r(dest, src, destsize, srcsize) {
        return this._movzx(src, dest, null, 1, 0, destsize, srcsize, MovOper.Register);
    }
    movzx_r_rp(dest, src, multiply, offset, destsize, srcsize) {
        return this._movzx(src, dest, null, multiply, offset, destsize, srcsize, MovOper.Read);
    }
    movzx_r_rrp(dest, src1, src2, multiply, offset, destsize, srcsize) {
        return this._movzx(src1, dest, src2, multiply, offset, destsize, srcsize, MovOper.Read);
    }
    _movsf(r1, r2, r3, multiply, offset, fsize, oper, foper, size) {
        switch (fsize) {
            case FloatOperSize.doublePrecision:
                this.put(0xf2);
                break;
            case FloatOperSize.singlePrecision:
                this.put(0xf3);
                break;
            case FloatOperSize.xmmword:
                break;
        }
        this._rex(r1, r2, null, size);
        this.put(0x0f);
        switch (foper) {
            case FloatOper.ConvertPrecision:
                this.put(0x5a);
                break;
            case FloatOper.ConvertTruncated_f2i:
                this.put(0x2c);
                break;
            case FloatOper.Convert_f2i:
                this.put(0x2d);
                break;
            case FloatOper.Convert_i2f:
                this.put(0x2a);
                break;
            default:
                if (oper === MovOper.Write)
                    this.put(0x11);
                else
                    this.put(0x10);
                break;
        }
        return this._target(0, r1, r2, r3, r1, multiply, offset, oper);
    }
    movups_rp_f(dest, multiply, offset, src) {
        return this._movsf(dest, src, null, multiply, offset, FloatOperSize.xmmword, MovOper.Write, FloatOper.None, OperationSize.dword);
    }
    movups_f_rp(dest, src, multiply, offset) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.xmmword, MovOper.Read, FloatOper.None, OperationSize.dword);
    }
    movups_f_f(dest, src) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.xmmword, MovOper.Register, FloatOper.None, OperationSize.dword);
    }
    movsd_rp_f(dest, multiply, offset, src) {
        return this._movsf(dest, src, null, multiply, offset, FloatOperSize.doublePrecision, MovOper.Write, FloatOper.None, OperationSize.dword);
    }
    movsd_f_rp(dest, src, multiply, offset) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.doublePrecision, MovOper.Read, FloatOper.None, OperationSize.dword);
    }
    movsd_f_f(dest, src) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.doublePrecision, MovOper.Register, FloatOper.None, OperationSize.dword);
    }
    movss_rp_f(dest, multiply, offset, src) {
        return this._movsf(dest, src, null, multiply, offset, FloatOperSize.singlePrecision, MovOper.Write, FloatOper.None, OperationSize.dword);
    }
    movss_f_rp(dest, src, multiply, offset) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.singlePrecision, MovOper.Read, FloatOper.None, OperationSize.dword);
    }
    movss_f_f(dest, src) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.singlePrecision, MovOper.Register, FloatOper.None, OperationSize.dword);
    }
    cvtsi2sd_f_r(dest, src, size = OperationSize.qword) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.doublePrecision, MovOper.Register, FloatOper.Convert_i2f, size);
    }
    cvtsi2sd_f_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.doublePrecision, MovOper.Read, FloatOper.Convert_i2f, size);
    }
    cvtpi2ps_f_r(dest, src, size = OperationSize.qword) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.xmmword, MovOper.Register, FloatOper.Convert_i2f, size);
    }
    cvtpi2ps_f_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.xmmword, MovOper.Read, FloatOper.Convert_i2f, size);
    }
    cvtpi2pd_f_r(dest, src, size = OperationSize.qword) {
        this.write(0x66);
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.xmmword, MovOper.Register, FloatOper.Convert_i2f, size);
    }
    cvtpi2pd_f_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        this.write(0x66);
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.xmmword, MovOper.Read, FloatOper.Convert_i2f, size);
    }
    cvtsd2si_r_f(dest, src, size = OperationSize.qword) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.doublePrecision, MovOper.Register, FloatOper.Convert_f2i, size);
    }
    cvtsd2si_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.doublePrecision, MovOper.Read, FloatOper.Convert_f2i, size);
    }
    cvtpd2pi_r_f(dest, src, size = OperationSize.qword) {
        this.write(0x66);
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.xmmword, MovOper.Register, FloatOper.Convert_f2i, size);
    }
    cvtpd2pi_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        this.write(0x66);
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.xmmword, MovOper.Read, FloatOper.Convert_f2i, size);
    }
    cvtps2pi_r_f(dest, src, size = OperationSize.qword) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.xmmword, MovOper.Register, FloatOper.Convert_f2i, size);
    }
    cvtps2pi_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.xmmword, MovOper.Read, FloatOper.Convert_f2i, size);
    }
    cvttsd2si_r_f(dest, src, size = OperationSize.qword) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.doublePrecision, MovOper.Register, FloatOper.ConvertTruncated_f2i, size);
    }
    cvttsd2si_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.doublePrecision, MovOper.Read, FloatOper.ConvertTruncated_f2i, size);
    }
    cvttps2pi_r_f(dest, src, size = OperationSize.qword) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.xmmword, MovOper.Register, FloatOper.ConvertTruncated_f2i, size);
    }
    cvttps2pi_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.xmmword, MovOper.Read, FloatOper.ConvertTruncated_f2i, size);
    }
    cvttpd2pi_r_f(dest, src, size = OperationSize.qword) {
        this.write(0x66);
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.xmmword, MovOper.Register, FloatOper.ConvertTruncated_f2i, size);
    }
    cvttpd2pi_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        this.write(0x66);
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.xmmword, MovOper.Read, FloatOper.ConvertTruncated_f2i, size);
    }
    cvtsi2ss_f_r(dest, src, size = OperationSize.qword) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.singlePrecision, MovOper.Register, FloatOper.Convert_i2f, size);
    }
    cvtsi2ss_f_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.singlePrecision, MovOper.Read, FloatOper.Convert_i2f, size);
    }
    cvttss2si_r_f(dest, src, size = OperationSize.qword) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.singlePrecision, MovOper.Register, FloatOper.ConvertTruncated_f2i, size);
    }
    cvttss2si_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.singlePrecision, MovOper.Read, FloatOper.ConvertTruncated_f2i, size);
    }
    cvtss2si_r_f(dest, src, size = OperationSize.qword) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.singlePrecision, MovOper.Register, FloatOper.Convert_f2i, size);
    }
    cvtss2si_r_rp(dest, src, multiply, offset, size = OperationSize.qword) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.singlePrecision, MovOper.Read, FloatOper.Convert_f2i, size);
    }
    cvtsd2ss_f_f(dest, src) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.doublePrecision, MovOper.Register, FloatOper.ConvertPrecision, OperationSize.dword);
    }
    cvtsd2ss_f_rp(dest, src, multiply, offset) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.doublePrecision, MovOper.Read, FloatOper.ConvertPrecision, OperationSize.dword);
    }
    cvtss2sd_f_f(dest, src) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.singlePrecision, MovOper.Register, FloatOper.ConvertPrecision, OperationSize.dword);
    }
    cvtss2sd_f_rp(dest, src, multiply, offset) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.singlePrecision, MovOper.Read, FloatOper.ConvertPrecision, OperationSize.dword);
    }
    cvtps2pd_f_f(dest, src) {
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.xmmword, MovOper.Register, FloatOper.ConvertPrecision, OperationSize.dword);
    }
    cvtps2pd_f_rp(dest, src, multiply, offset) {
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.xmmword, MovOper.Read, FloatOper.ConvertPrecision, OperationSize.dword);
    }
    cvtpd2ps_f_f(dest, src) {
        this.write(0x66);
        return this._movsf(src, dest, null, 1, 0, FloatOperSize.xmmword, MovOper.Register, FloatOper.ConvertPrecision, OperationSize.dword);
    }
    cvtpd2ps_f_rp(dest, src, multiply, offset) {
        this.write(0x66);
        return this._movsf(src, dest, null, multiply, offset, FloatOperSize.xmmword, MovOper.Read, FloatOper.ConvertPrecision, OperationSize.dword);
    }
    makeLabel(labelName, exportDef = false, isProc = false) {
        let label;
        if (labelName !== null) {
            const exists = this.ids.get(labelName);
            if (exists != null) {
                if (exists instanceof Defination) {
                    throw Error(`${labelName} is already defined`);
                }
                if (!(exists instanceof Label))
                    throw Error(`${labelName} is not label`);
                if (exists.chunk !== null) {
                    throw Error(`${labelName} is already defined`);
                }
                label = exists;
            }
            else {
                label = new Label(labelName);
                this.ids.set(labelName, label);
            }
        }
        else {
            label = new Label(labelName);
        }
        if (isProc)
            label.UnwindCodes = [];
        label.chunk = this.chunk;
        label.offset = this.chunk.size;
        this.chunk.ids.push(label);
        if (labelName !== null) {
            if (!exportDef)
                this.scope.add(labelName);
            let now = this.chunk;
            let prev = now.prev;
            while (prev !== null && prev.jump.label === label) {
                this._resolveLabelSizeForward(prev, prev.jump);
                now = prev;
                prev = now.prev;
            }
        }
        return label;
    }
    label(labelName, exportDef = false) {
        this.makeLabel(labelName, exportDef);
        return this;
    }
    remove_label(name) {
        const label = this.ids.get(name);
        if (!label)
            return this;
        if (!(label instanceof Label))
            throw Error(`${name} is not label`);
        this.ids.delete(name);
        label.name = "";
        return this;
    }
    close_label(labelName) {
        const label = this.ids.get(labelName);
        if (!(label instanceof Label))
            throw Error(`${labelName} is not label`);
        if (label.chunk !== null)
            throw Error(`${label} is already defined`);
        label.chunk = this.chunk;
        label.offset = this.chunk.size;
        let now = this.chunk;
        let prev = now.prev;
        while (prev !== null && prev.jump.label === label) {
            this._resolveLabelSizeForward(prev, prev.jump);
            now = prev;
            prev = now.prev;
        }
        this.ids.delete(labelName);
        return this;
    }
    _getJumpTarget(labelName) {
        if (labelName !== null) {
            const id = this.ids.get(labelName);
            if (id) {
                if (id instanceof Defination) {
                    if (id.size !== OperationSize.qword)
                        throw Error(`${labelName} size unmatched`);
                    return id;
                }
                if (!(id instanceof Label))
                    throw Error(`${labelName} is not label`);
                return id;
            }
        }
        const label = new Label(labelName);
        if (labelName !== null) {
            this.ids.set(labelName, label);
        }
        return label;
    }
    jmp_label(labelName) {
        const label = this._getJumpTarget(labelName);
        if (label instanceof Defination) {
            this.jmp_rp(Register.rip, 1, 0);
            this._registerUnresolvedConstant(label, 4);
            return this;
        }
        if (label.chunk === null) {
            return this._genChunk(X64Assembler.jmp_c_info, label, []);
        }
        this._resolveLabelSizeBackward(this.chunk, new SplitedJump(X64Assembler.jmp_c_info, label, [], this.pos));
        return this;
    }
    call_label(labelName) {
        const label = this._getJumpTarget(labelName);
        if (label instanceof Defination) {
            this.call_rp(Register.rip, 1, 0);
            this._registerUnresolvedConstant(label, 4);
            return this;
        }
        if (label.chunk === null) {
            this.call_c(0);
            this._registerUnresolvedConstant(label, 4);
            return this;
        }
        this._resolveLabelSizeBackward(this.chunk, new SplitedJump(X64Assembler.call_c_info, label, [], this.pos), true);
        return this;
    }
    _jmp_o_label(oper, labelName) {
        const label = this._getJumpTarget(labelName);
        if (!(label instanceof Label))
            throw Error(`Unexpected identifier ${labelName}`);
        if (label.chunk === null) {
            return this._genChunk(X64Assembler.jmp_o_info, label, [oper]);
        }
        this._resolveLabelSizeBackward(this.chunk, new SplitedJump(X64Assembler.jmp_o_info, label, [oper], this.pos));
        return this;
    }
    _registerUnresolvedConstant(id, bytes) {
        this.chunk.unresolved.push(new UnresolvedConstant(this.chunk.size - bytes, bytes, id, this.pos));
        this.pos = null;
    }
    _resolveLabelSize(chunk, jump, dwordSize) {
        const orichunk = this.chunk;
        this.chunk = chunk;
        if (dwordSize) {
            jump.info.func.call(this, ...jump.args, INT32_MAX);
            chunk.unresolved.push(new UnresolvedConstant(chunk.size - 4, 4, jump.label, jump.pos));
        }
        else {
            jump.info.func.call(this, ...jump.args, 0);
            chunk.unresolved.push(new UnresolvedConstant(chunk.size - 1, 1, jump.label, jump.pos));
        }
        chunk.removeNext();
        if (chunk.next === null)
            this.chunk = chunk;
        else
            this.chunk = orichunk;
    }
    _resolveLabelSizeBackward(jumpChunk, jump, dwordSize = null) {
        if (jump.label.chunk === jumpChunk) {
            let offset = jump.label.offset - jumpChunk.size;
            offset -= jump.info.byteSize;
            if (offset < INT8_MIN || offset > INT8_MAX) {
                offset = offset - jump.info.dwordSize + jump.info.byteSize;
            }
            jump.info.func.call(this, ...jump.args, offset);
            return;
        }
        if (dwordSize === null) {
            let offset = 0;
            offset -= jumpChunk.size;
            offset -= jump.info.dwordSize;
            let chunk = jumpChunk.prev;
            for (;;) {
                if (chunk === null) {
                    throw Error(`${jump.label.name}: failed to find label chunk`);
                }
                offset -= chunk.size;
                offset -= chunk.jump.info.dwordSize;
                if (chunk === jump.label.chunk) {
                    offset += jump.label.offset;
                    break;
                }
                chunk = chunk.prev;
            }
            dwordSize = offset < INT8_MIN || offset > INT8_MAX;
        }
        this._resolveLabelSize(jumpChunk, jump, dwordSize);
    }
    _resolveLabelSizeForward(jumpChunk, jump, dwordSize = null) {
        if (jump.label.chunk === jumpChunk)
            throw Error(`cannot forward to self chunk`);
        if (dwordSize === null) {
            let chunk = jumpChunk.next;
            if (chunk === jump.label.chunk) {
                const orichunk = this.chunk;
                this.chunk = jumpChunk;
                jump.info.func.call(this, ...jump.args, jump.label.offset);
                jumpChunk.removeNext();
                if (jumpChunk.next === null)
                    this.chunk = jumpChunk;
                else
                    this.chunk = orichunk;
                return;
            }
            let offset = 0;
            for (;;) {
                offset += chunk.size;
                offset += chunk.jump.info.dwordSize;
                chunk = chunk.next;
                if (chunk === jump.label.chunk) {
                    offset += jump.label.offset;
                    break;
                }
            }
            dwordSize = offset < INT8_MIN || offset > INT8_MAX;
        }
        this._resolveLabelSize(jumpChunk, jump, dwordSize);
    }
    _genChunk(info, label, args) {
        let chunk = this.chunk;
        let totalsize = 0;
        for (;;) {
            const prev = chunk.prev;
            if (prev === null)
                break;
            totalsize += chunk.size + info.byteSize;
            chunk = prev;
            if (totalsize >= 127) {
                this._resolveLabelSize(chunk, chunk.jump, true);
            }
        }
        chunk = this.chunk;
        chunk.jump = new SplitedJump(info, label, args, this.pos);
        this.pos = null;
        const nbuf = new AsmChunk(new Uint8Array(64), 0, 1);
        chunk.next = nbuf;
        nbuf.prev = chunk;
        this.chunk = nbuf;
        return this;
    }
    _check(final) {
        const chunks = new WeakSet();
        const ids = new WeakSet();
        chunks.add(MEMORY_INDICATE_CHUNK);
        if (this.constChunk !== null) {
            chunks.add(this.constChunk);
        }
        const errors = new Map();
        function putError(name, message) {
            const arr = errors.get(name);
            if (arr)
                arr.push(message);
            else
                errors.set(name, [message]);
        }
        let chunk = this.chunk;
        if (chunk.next !== null) {
            putError("[main chunk]", "main chunk has the next chunk");
        }
        while (chunk !== null) {
            chunks.add(chunk);
            for (const id of chunk.ids) {
                if (id.chunk !== chunk) {
                    putError(id.name || "[anonymous label]", "Chunk does not match");
                }
                ids.add(id);
            }
            chunk = chunk.prev;
        }
        chunk = this.chunk;
        for (const id of this.ids.values()) {
            if (id instanceof AddressIdentifier) {
                if (id.chunk === null) {
                    if (!final)
                        continue;
                    putError(id.name || "[anonymous label]", "Label is not defined");
                    continue;
                }
                if (!ids.has(id)) {
                    if (id.chunk === MEMORY_INDICATE_CHUNK)
                        continue;
                    putError(id.name || "[anonymous label]", "Unknown identifier");
                }
                if (!chunks.has(id.chunk)) {
                    const jumpTarget = id.chunk.jump;
                    putError(id.name || "[anonymous label]", `Unknown chunk, ${jumpTarget === null ? "[??]" : jumpTarget.label.name}`);
                }
            }
        }
        if (errors.size !== 0) {
            for (const [name, messages] of errors) {
                for (const message of messages) {
                    console.error(colors.red(`${name}: ${message}`));
                }
            }
            process.exit(-1);
        }
    }
    _normalize(makeRuntimeFunctionTable) {
        if (this.normalized)
            return this;
        this.normalized = true;
        if (makeRuntimeFunctionTable && this.currentProc === this.headProc) {
            this.endp();
        }
        else {
            if (this.currentProc !== null) {
                const unwinds = this.currentProc.UnwindCodes;
                if (unwinds !== null && unwinds.length !== 0) {
                    throw Error(`This asm has unwind codes. stack_c or keep_r needs a runtime function table`);
                }
            }
        }
        // resolving labels
        const errors = new textparser_1.ParsingErrorContainer();
        let prev = this.chunk.prev;
        while (prev !== null) {
            const jump = prev.jump;
            const label = jump.label;
            if (label.chunk === null) {
                errors.add(new textparser_1.ParsingError(`${label.name}: Identifier not found`, jump.pos));
            }
            else {
                this._resolveLabelSizeForward(prev, jump);
            }
            prev = prev.prev;
        }
        const chunk = this.chunk;
        if (chunk.next !== null || chunk.prev !== null) {
            throw Error(`All chunks didn't merge. internal problem`);
        }
        // attach const chunk
        if (this.constChunk !== null) {
            chunk.connect(this.constChunk);
            this.constChunk = null;
            chunk.removeNext();
        }
        if (makeRuntimeFunctionTable) {
            // align 4 bytes
            const last = chunk.size;
            const alignto = (this.chunk.size + 4 - 1) & ~3;
            this.chunk.putRepeat(0xcc, alignto - this.chunk.size);
            // write runtime table
            let lastFunction = null;
            const functions = [];
            const procs = [];
            for (const proc of this.ids.values()) {
                if (!(proc instanceof Label))
                    continue;
                procs.push(proc);
            }
            procs.sort((a, b) => a.offset - b.offset);
            let lastProc;
            for (const proc of procs) {
                if (proc.UnwindCodes === null)
                    continue;
                if (lastFunction !== null) {
                    if (proc.offset === lastFunction.BeginAddress)
                        continue;
                    lastFunction.EndAddress = proc.offset;
                    lastFunction.UnwindData = chunk.size;
                    functions.push(lastFunction);
                    lastProc.writeUnwindInfoTo(chunk, lastFunction.BeginAddress);
                }
                lastProc = proc;
                lastFunction = {
                    BeginAddress: proc.offset,
                    EndAddress: 0,
                    UnwindData: 0,
                };
            }
            if (lastFunction !== null) {
                lastFunction.EndAddress = last;
                lastFunction.UnwindData = chunk.size;
                functions.push(lastFunction);
                lastProc.writeUnwindInfoTo(chunk, lastFunction.BeginAddress);
            }
            if (functions.length !== 0) {
                this.label("#runtime_function_table", true);
                for (const func of functions) {
                    chunk.writeInt32(func.BeginAddress);
                    chunk.writeInt32(func.EndAddress);
                    chunk.writeInt32(func.UnwindData);
                }
            }
        }
        if (this.memoryChunkSize !== 0) {
            // align memory area
            const memalign = this.memoryChunkAlign;
            const bufsize = (this.chunk.size + memalign - 1) & ~(memalign - 1);
            this.chunk.putRepeat(0xcc, bufsize - this.chunk.size);
            // resolve def addresses
            try {
                chunk.resolveAll();
            }
            catch (err) {
                if (err instanceof textparser_1.ParsingError) {
                    errors.add(err);
                }
                else {
                    throw err;
                }
            }
            if (errors.error !== null) {
                throw errors.error;
            }
        }
        return this;
    }
    jz_label(label) {
        return this._jmp_o_label(JumpOperation.je, label);
    }
    jnz_label(label) {
        return this._jmp_o_label(JumpOperation.jne, label);
    }
    jo_label(label) {
        return this._jmp_o_label(JumpOperation.jo, label);
    }
    jno_label(label) {
        return this._jmp_o_label(JumpOperation.jno, label);
    }
    jb_label(label) {
        return this._jmp_o_label(JumpOperation.jb, label);
    }
    jae_label(label) {
        return this._jmp_o_label(JumpOperation.jae, label);
    }
    je_label(label) {
        return this._jmp_o_label(JumpOperation.je, label);
    }
    jne_label(label) {
        return this._jmp_o_label(JumpOperation.jne, label);
    }
    jbe_label(label) {
        return this._jmp_o_label(JumpOperation.jbe, label);
    }
    ja_label(label) {
        return this._jmp_o_label(JumpOperation.ja, label);
    }
    js_label(label) {
        return this._jmp_o_label(JumpOperation.js, label);
    }
    jns_label(label) {
        return this._jmp_o_label(JumpOperation.jns, label);
    }
    jp_label(label) {
        return this._jmp_o_label(JumpOperation.jp, label);
    }
    jnp_label(label) {
        return this._jmp_o_label(JumpOperation.jnp, label);
    }
    jl_label(label) {
        return this._jmp_o_label(JumpOperation.jl, label);
    }
    jge_label(label) {
        return this._jmp_o_label(JumpOperation.jge, label);
    }
    jle_label(label) {
        return this._jmp_o_label(JumpOperation.jle, label);
    }
    jg_label(label) {
        return this._jmp_o_label(JumpOperation.jg, label);
    }
    proc(name, exportDef = false) {
        this.currentProc = this.makeLabel(name, exportDef, true);
        this.scopeStack.push(this.scope);
        this.scope = new Set();
        this.prologueAnchor = this.makeLabel(null);
        return this;
    }
    runtime_error_handler() {
        if (this.currentProc === null) {
            throw Error(`not in proc`);
        }
        if (!this.unwinded) {
            this.label("_eof");
            this.unwind();
            this.ret();
        }
        this.currentProc.exceptionHandler = this.makeLabel(null);
        return this;
    }
    unwind() {
        if (this.currentProc === null)
            throw Error(`not in proc`);
        const codes = this.currentProc.UnwindCodes;
        if (codes === null)
            throw Error(`currentProc is not proc`);
        for (let i = codes.length - 1; i >= 0; i--) {
            const code = codes[i];
            if (typeof code === "number")
                continue;
            switch (code.UnwindOp) {
                case UWOP_PUSH_NONVOL:
                    this.pop_r(code.OpInfo);
                    break;
                case UWOP_ALLOC_SMALL:
                    this.add_r_c(Register.rsp, code.OpInfo * 8 + 8);
                    break;
                case UWOP_ALLOC_LARGE:
                    if (code.OpInfo === 0) {
                        const n = codes[--i];
                        if (typeof n !== "number")
                            throw Error(`number expected after UWOP_ALLOC_LARGE`);
                        this.add_r_c(Register.rsp, n * 8);
                    }
                    else if (code.OpInfo === 1) {
                        const n = codes[--i];
                        if (typeof n !== "number")
                            throw Error(`number expected after UWOP_ALLOC_LARGE`);
                        const n2 = codes[--i];
                        if (typeof n2 !== "number")
                            throw Error(`number expected after UWOP_ALLOC_LARGE`);
                        this.add_r_c(Register.rsp, (n2 << 16) | n);
                    }
                    else {
                        throw Error(`Unexpected OpInfo of UWOP_ALLOC_LARGE (${code.OpInfo})`);
                    }
                    break;
                case UWOP_SET_FPREG:
                    if (this.currentProc.frameRegister === null)
                        throw Error(`Frame register is not set`);
                    this.lea_r_rp(Register.rsp, this.currentProc.frameRegister, 1, -this.currentProc.frameRegisterOffset * 16);
                    break;
                default:
                    throw Error(`Unexpected unwindop (${code.UnwindOp})`);
            }
        }
        this.unwinded = true;
        return this;
    }
    endp() {
        if (this.scopeStack.length === 0) {
            throw Error(`end of scope`);
        }
        if (this.currentProc === null) {
            throw Error(`not in proc`);
        }
        if (!this.unwinded) {
            this.label("_eof");
            this.unwind();
            this.ret();
        }
        const scope = this.scope;
        this.scope = this.scopeStack.pop();
        for (const name of scope) {
            this.ids.delete(name);
        }
        this.prologueAnchor = null;
        this.currentProc = null;
        this.unwinded = false;
        return this;
    }
    const(name, value, exportDef = false) {
        if (this.ids.has(name))
            throw Error(`${name} is already defined`);
        this.ids.set(name, new Constant(name, value));
        if (!exportDef)
            this.scope.add(name);
        return this;
    }
    compileLine(lineText, lineNumber) {
        const commentIdx = lineText.search(COMMENT_REGEXP);
        const parser = new textparser_1.TextLineParser(commentIdx === -1 ? lineText : lineText.substr(0, commentIdx), lineNumber);
        let paramIdx = -1;
        const sizes = [null, null];
        let extendingCommand = false;
        function setSize(nsize) {
            if (nsize === null)
                return;
            let idx = 0;
            if (extendingCommand) {
                idx = paramIdx;
                if (idx >= 2) {
                    throw parser.error(`Too many operand`);
                }
            }
            const osize = sizes[idx];
            if (osize === null) {
                sizes[idx] = nsize;
                return;
            }
            if (osize !== nsize) {
                throw parser.error(`Operation size unmatched (${OperationSize[osize]} != ${OperationSize[nsize]})`);
            }
        }
        const parseType = (type) => {
            let arraySize = null;
            let brace = type.indexOf("[");
            let type_base = type;
            if (brace !== -1) {
                type_base = type_base.substr(0, brace).trim();
                brace++;
                const braceEnd = type.indexOf("]", brace);
                if (braceEnd === -1)
                    throw parser.error(`brace end not found: '${type}'`);
                const braceInner = type.substring(brace, braceEnd).trim();
                const trails = type.substr(braceEnd + 1).trim();
                if (trails !== "")
                    throw parser.error(`Unexpected characters '${trails}'`);
                const res = this._polynominalConstant(braceInner, parser.lineNumber, parser.matchedIndex);
                if (res === null)
                    throw parser.error(`Unexpected array length '${braceInner}'`);
                arraySize = res;
            }
            const size = sizemap.get(type_base);
            if (size == null)
                throw parser.error(`Unexpected type name '${type}'`);
            let bytes = size.bytes;
            if (arraySize !== null)
                bytes *= arraySize;
            return { bytes, size: size.size, align: size.bytes, arraySize };
        };
        const readConstString = (addressCommand, encoding) => {
            const quotedString = parser.readQuotedStringTo('"');
            if (quotedString === null)
                throw parser.error("Invalid quoted string");
            if (this.constChunk === null)
                this.constChunk = new AsmChunk(new Uint8Array(64), 0, 1);
            const id = new Defination("[const]", this.constChunk, this.constChunk.size, null, OperationSize.void);
            this.constChunk.write(Buffer.from(quotedString + "\0", encoding));
            this.constChunk.ids.push(id);
            command += "_rp";
            callinfo.push("(register pointer)");
            if (addressCommand)
                setSize(OperationSize.qword);
            else
                setSize(id.size);
            args.push(Register.rip);
            args.push(0);
            unresolvedConstant = id;
            unresolvedPos = parser.getPosition();
            parser.skipSpaces();
        };
        const defining = (command, exportDef) => {
            switch (command) {
                case "const": {
                    const [name, type] = parser.readToSpace().split(":");
                    let size = null;
                    if (type != null) {
                        size = sizemap.get(type);
                        if (size == null)
                            throw parser.error(`Unexpected type syntax '${type}'`);
                    }
                    const text = parser.readAll();
                    let valueNum = this._polynominalConstant(text, parser.lineNumber, parser.matchedIndex);
                    if (valueNum === null) {
                        throw parser.error(`polynominal is not constant '${text}'`);
                    }
                    if (size !== null) {
                        switch (size.size) {
                            case OperationSize.byte:
                                valueNum = (valueNum << 24) >> 24;
                                break;
                            case OperationSize.word:
                                valueNum = (valueNum << 16) >> 16;
                                break;
                            case OperationSize.dword:
                                valueNum = valueNum | 0;
                                break;
                        }
                    }
                    try {
                        this.const(name, valueNum, exportDef);
                    }
                    catch (err) {
                        throw parser.error(err.message);
                    }
                    return true;
                }
                case "def": {
                    const name = parser.readTo(":");
                    const type = parser.readAll();
                    const res = parseType(type);
                    try {
                        this.def(name, res.size, res.bytes, res.align, res.arraySize, exportDef);
                    }
                    catch (err) {
                        throw parser.error(err.message);
                    }
                    return true;
                }
                case "proc":
                    try {
                        const name = parser.readAll().trim();
                        this.proc(name, exportDef);
                    }
                    catch (err) {
                        throw parser.error(err.message);
                    }
                    return true;
                default:
                    return false;
            }
        };
        const command_base = parser.readToSpace();
        if (command_base === "")
            return;
        let command = command_base;
        const callinfo = [command_base];
        const totalIndex = parser.matchedIndex;
        let unresolvedConstant = null;
        let unresolvedPos = null;
        const args = [];
        if (!parser.eof()) {
            let addressCommand = false;
            let jumpOrCall = false;
            switch (command) {
                case "export":
                    if (!defining(parser.readToSpace(), true)) {
                        throw parser.error(`non export-able syntax`);
                    }
                    return;
                case "buildtrace": {
                    const value = this._polynominal(parser.readAll(), parser.lineNumber, parser.matchedIndex);
                    console.log(`buildtrace> ${value}`);
                    return;
                }
                case "movsx":
                case "movzx":
                    extendingCommand = true;
                    break;
                case "lea":
                    addressCommand = true;
                    break;
                default:
                    if (command.startsWith("j") || command === "call") {
                        jumpOrCall = true;
                    }
                    if (defining(command, false))
                        return;
                    break;
            }
            while (!parser.eof()) {
                paramIdx++;
                parser.skipSpaces();
                if (parser.nextIf('"')) {
                    readConstString(addressCommand, "utf8");
                    continue;
                }
                else if (parser.nextIf('u"')) {
                    readConstString(addressCommand, "utf16le");
                    continue;
                }
                const param = parser.readTo(",");
                let constval;
                try {
                    constval = this._polynominalConstant(param, parser.lineNumber, parser.matchedIndex);
                }
                catch (err) {
                    constval = null;
                }
                if (constval !== null) {
                    // number
                    if (isNaN(constval)) {
                        throw parser.error(`Unexpected number syntax ${callinfo.join(" ")}'`);
                    }
                    command += "_c";
                    callinfo.push("(constant)");
                    args.push(constval);
                }
                else if (param.endsWith("]")) {
                    // memory access
                    let end = param.indexOf("[");
                    if (end === null)
                        throw parser.error(`Unexpected bracket syntax ${param}'`);
                    const iparser = new textparser_1.TextLineParser(param.substr(0, end), lineNumber, parser.matchedIndex);
                    end++;
                    const bracketInnerStart = parser.matchedIndex + end + 1;
                    const words = [...iparser.splitWithSpaces()];
                    if (words.length !== 0) {
                        if (words[1] === "ptr") {
                            const sizename = words[0];
                            const size = sizemap.get(sizename);
                            if (size == null || size.size === OperationSize.void) {
                                throw parser.error(`Unexpected size name: ${sizename}`);
                            }
                            if (addressCommand)
                                setSize(OperationSize.qword);
                            else
                                setSize(size.size);
                            words.splice(0, 2);
                        }
                        if (words.length !== 0) {
                            const segment = words.join("");
                            if (!segment.endsWith(":")) {
                                throw parser.error(`Invalid address syntax: ${segment}`);
                            }
                            switch (segment) {
                                case "gs:":
                                    this.gs();
                                    break;
                                case "fs:":
                                    this.fs();
                                    break;
                                case "ss:":
                                    this.ss();
                                    break;
                                case "cs:":
                                    this.cs();
                                    break;
                                case "es:":
                                    this.es();
                                    break;
                                case "ds:":
                                    break;
                                default:
                                    throw parser.error(`Unexpected segment: ${segment}`);
                            }
                        }
                    }
                    const inner = param.substring(end, param.length - 1);
                    const { r1, r2, multiply, offset } = this._polynominalToAddress(inner, bracketInnerStart, lineNumber);
                    if (r1 === null) {
                        args.push(Register.absolute);
                        callinfo.push("(constant pointer)");
                        command += "_rp";
                    }
                    else {
                        args.push(r1);
                        if (r2 === null) {
                            callinfo.push("(register pointer)");
                            command += "_rp";
                        }
                        else {
                            callinfo.push("(2 register pointer)");
                            command += "_rrp";
                            args.push(r2);
                        }
                    }
                    args.push(multiply);
                    args.push(offset);
                }
                else {
                    const type = regmap.get(param.toLowerCase());
                    if (type) {
                        const [name, reg, size] = type;
                        if (size !== null)
                            setSize(size);
                        command += `_${name.short}`;
                        args.push(reg);
                        callinfo.push(`(${name.name})`);
                    }
                    else {
                        const id = this.ids.get(param);
                        if (id instanceof Constant) {
                            command += "_c";
                            callinfo.push("(constant)");
                            args.push(id.value);
                        }
                        else if (id instanceof Defination) {
                            command += "_rp";
                            callinfo.push("(register pointer)");
                            if (id.size === OperationSize.void)
                                throw parser.error(`Invalid operand type`);
                            args.push(Register.rip);
                            args.push(1);
                            args.push(0);
                            unresolvedConstant = id;
                        }
                        else if (jumpOrCall) {
                            command += "_label";
                            args.push(param);
                            callinfo.push("(label)");
                        }
                        else {
                            command += "_rp";
                            callinfo.push("(register pointer)");
                            args.push(Register.rip);
                            args.push(1);
                            args.push(0);
                            if (id instanceof Label) {
                                unresolvedConstant = id;
                            }
                            else if (id != null) {
                                throw parser.error(`Unexpected identifier '${id.name}'`);
                            }
                            else {
                                const label = new Label(param);
                                unresolvedConstant = label;
                                this.ids.set(param, label);
                            }
                        }
                        unresolvedPos = parser.getPosition();
                    }
                }
            }
        }
        parser.matchedIndex = totalIndex;
        parser.matchedWidth = parser.matchedIndex + parser.matchedWidth - totalIndex;
        if (command.endsWith(":")) {
            try {
                this.label(command.substr(0, command.length - 1).trim());
            }
            catch (err) {
                (0, source_map_support_1.remapAndPrintError)(err);
                throw parser.error(err.message);
            }
            return;
        }
        command = command.toLowerCase();
        if (sizes[0] !== null) {
            args.push(sizes[0]);
            if (sizes[1] !== null) {
                args.push(sizes[1]);
            }
        }
        const fn = this[command];
        if (typeof fn !== "function") {
            throw parser.error(`Unexpected command '${callinfo.join(" ")}'`);
        }
        try {
            this.pos = unresolvedPos;
            fn.apply(this, args);
            if (unresolvedConstant !== null) {
                this.chunk.unresolved.push(new UnresolvedConstant(this.chunk.size - 4, 4, unresolvedConstant, unresolvedPos));
            }
        }
        catch (err) {
            (0, source_map_support_1.remapAndPrintError)(err);
            throw parser.error(err.message);
        }
    }
    compile(source, defines, reportDirectWithFileName) {
        let p = 0;
        let lineNumber = 1;
        if (defines != null) {
            for (const name in defines) {
                this.const(name, defines[name]);
            }
        }
        const errs = new textparser_1.ParsingErrorContainer();
        for (;;) {
            const lineidx = source.indexOf("\n", p);
            const lineText = lineidx === -1 ? source.substr(p) : source.substring(p, lineidx);
            try {
                this.compileLine(lineText, lineNumber);
            }
            catch (err) {
                if (err instanceof textparser_1.ParsingError) {
                    errs.add(err);
                    if (reportDirectWithFileName) {
                        err.report(reportDirectWithFileName, lineText);
                    }
                }
                else {
                    throw err;
                }
            }
            if (lineidx === -1)
                break;
            p = lineidx + 1;
            lineNumber++;
        }
        if (errs !== null && errs.error !== null)
            throw errs.error;
        try {
            this._normalize(true);
        }
        catch (err) {
            if (err instanceof textparser_1.ParsingError) {
                if (reportDirectWithFileName) {
                    err.report(reportDirectWithFileName, err.pos !== null ? (0, util_1.getLineAt)(source, err.pos.line - 1) : null);
                }
                errs.add(err);
                throw errs;
            }
            else {
                throw err;
            }
        }
        return this;
    }
    save() {
        function writeArray(array, writer) {
            for (const item of array) {
                writer(item);
            }
            out.put(0);
        }
        function writeAddress(id) {
            out.writeNullTerminatedString(id.name);
            out.writeVarUint(id.offset - address);
            address = id.offset;
        }
        const out = new bufferstream_1.BufferWriter(new Uint8Array(64), 0);
        const labels = [];
        const defs = [];
        for (const id of this.ids.values()) {
            if (this.scope.has(id.name))
                continue;
            if (id instanceof Label) {
                labels.push(id);
            }
            else if (id instanceof Defination) {
                defs.push(id);
            }
        }
        out.writeVarUint(Math.log2(this.memoryChunkAlign));
        let address = 0;
        writeArray(labels, writeAddress);
        address = 0;
        writeArray(defs, writeAddress);
        out.writeVarUint(this.memoryChunkSize - address);
        out.write(this.buffer());
        return out.buffer();
    }
    toScript(bdsxLibPath, exportName) {
        const buffer = this.buffer();
        const labels = [];
        for (const addr of this.ids.values()) {
            if (!(addr instanceof Label))
                continue;
            if (addr === this.headProc)
                continue;
            labels.push(addr);
        }
        labels.sort((a, b) => b.offset - a.offset);
        const rftable = this.ids.get("#runtime_function_table");
        const dts = new scriptwriter_1.ScriptWriter();
        const js = new scriptwriter_1.ScriptWriter();
        let imports = "cgate";
        if (rftable instanceof Label) {
            imports += ", runtimeError";
        }
        js.writeln(`const { ${imports} } = require('${bdsxLibPath}/core');`);
        js.writeln(`const { asm } = require('${bdsxLibPath}/assembler');`);
        js.writeln(`require('${bdsxLibPath}/codealloc');`);
        dts.writeln(`import { VoidPointer, NativePointer } from '${bdsxLibPath}/core';`);
        const n = buffer.length & ~1;
        js.writeln(`const buffer = cgate.allocExecutableMemory(${buffer.length + this.memoryChunkSize}, ${this.memoryChunkAlign});`);
        js.writeln("buffer.setBuffer(new Uint8Array([");
        let nextLabel = labels.pop();
        let script = "";
        for (let i = 0; i < n;) {
            while (nextLabel !== undefined) {
                if (i < nextLabel.offset)
                    break;
                if (script.length !== 0) {
                    js.writeln(script);
                    script = "";
                }
                js.writeln("// " + nextLabel.name);
                nextLabel = labels.pop();
            }
            const byte = buffer[i++] | 0;
            const hex = byte.toString(16);
            script += "0x";
            if (hex.length === 1)
                script += "0";
            script += hex;
            script += ",";
        }
        js.writeln(script);
        js.writeln("]));");
        // script.writeln();
        if (exportName != null) {
            dts.writeln(`export namespace ${exportName} {`);
            js.writeln(`exports.${exportName} = {`);
            dts.tab(4);
        }
        else {
            js.writeln("module.exports = {");
        }
        js.tab(4);
        for (const id of this.ids.values()) {
            if (this.scope.has(id.name))
                continue;
            let name = id.name;
            if (name === null || name.startsWith("#"))
                continue;
            let addrof;
            if (!/^[A-Za-z_$][0-9A-Za-z_$]*$/.test(name)) {
                name = JSON.stringify(name);
                addrof = JSON.stringify("addressof_" + name);
            }
            else {
                addrof = "addressof_" + name;
            }
            if (id instanceof Label) {
                js.writeln(`get ${name}(){`);
                js.writeln(`    return buffer.add(${id.offset});`);
                js.writeln(`},`);
                dts.writeln(`export const ${name}:NativePointer;`);
            }
            else if (id instanceof Defination) {
                const off = buffer.length + id.offset;
                if (id.size != null) {
                    const info = sizeInfo.get(id.size);
                    if (info != null) {
                        if (id.arraySize !== null) {
                            const nameUpper = name.charAt(0).toUpperCase() + name.substr(1);
                            const sizemul = info.size === 1 ? "" : "*" + info.size;
                            js.writeln(`get${nameUpper}(idx){`);
                            js.writeln(`    return buffer.get${info.fnname}(${off}+idx${sizemul});`);
                            js.writeln(`},`);
                            js.writeln(`set${nameUpper}(n, idx){`);
                            js.writeln(`    buffer.set${info.fnname}(n, ${off}+idx${sizemul});`);
                            js.writeln(`},`);
                            dts.writeln(`export function get${nameUpper}(idx:number):${info.jstype};`);
                            dts.writeln(`export function set${nameUpper}(n:${info.jstype}, idx:number):void;`);
                        }
                        else {
                            js.writeln(`get ${name}(){`);
                            js.writeln(`    return buffer.get${info.fnname}(${off});`);
                            js.writeln(`},`);
                            js.writeln(`set ${name}(n){`);
                            js.writeln(`    buffer.set${info.fnname}(n, ${off});`);
                            js.writeln(`},`);
                            dts.writeln(`export let ${name}:${info.jstype};`);
                        }
                    }
                }
                js.writeln(`get ${addrof}(){`);
                js.writeln(`    return buffer.add(${off});`);
                js.writeln(`},`);
                dts.writeln(`export const ${addrof}:NativePointer;`);
            }
        }
        js.tab(-4);
        js.writeln("};");
        if (exportName != null) {
            dts.tab(-4);
            dts.writeln(`}`);
        }
        if (rftable instanceof Label) {
            const SIZE_OF_RF = 4 * 3;
            const size = ((buffer.length - rftable.offset) / SIZE_OF_RF) | 0;
            js.writeln(`runtimeError.addFunctionTable(buffer.add(${rftable.offset}), ${size}, buffer);`);
            const labels = this.labels(true);
            js.writeln(`asm.setFunctionNames(buffer, ${JSON.stringify(labels)});`);
        }
        return { js: js.script, dts: dts.script };
    }
    static load(bin) {
        const reader = new bufferstream_1.BufferReader(bin);
        function readArray(reader) {
            const out = [];
            for (;;) {
                const item = reader();
                if (item === null)
                    return out;
                out.push(item);
            }
        }
        function readAddress() {
            const name = reader.readNullTerminatedString();
            if (name === "")
                return null;
            const size = reader.readVarUint();
            address += size;
            return [name, address];
        }
        const memoryAlignBit = reader.readVarUint();
        let address = 0;
        const labels = readArray(readAddress);
        address = 0;
        const defs = readArray(readAddress);
        const memorySize = reader.readVarUint() + address;
        const buf = reader.remaining();
        const out = new X64Assembler(buf, buf.length);
        out.memoryChunkAlign = 1 << memoryAlignBit;
        out.memoryChunkSize = memorySize;
        for (const [name, offset] of labels) {
            if (out.ids.has(name))
                throw Error(`${name} is already defined`);
            const label = new Label(name);
            label.chunk = out.chunk;
            label.offset = offset;
            out.ids.set(name, label);
            out.chunk.ids.push(label);
        }
        for (const [name, offset] of defs) {
            if (out.ids.has(name))
                throw Error(`${name} is already defined`);
            const def = new Defination(name, MEMORY_INDICATE_CHUNK, offset, null, null);
            out.ids.set(name, def);
        }
        return out;
    }
}
exports.X64Assembler = X64Assembler;
X64Assembler.call_c_info = new JumpInfo(5, 5, 6, X64Assembler.prototype.call_c);
X64Assembler.jmp_c_info = new JumpInfo(2, 5, 6, X64Assembler.prototype.jmp_c);
X64Assembler.jmp_o_info = new JumpInfo(2, 6, -1, X64Assembler.prototype._jmp_o);
function asm() {
    return new X64Assembler(new Uint8Array(64), 0);
}
exports.asm = asm;
function value64ToString16(v) {
    const [low, high] = v[asm.splitTwo32Bits]();
    if (high === 0) {
        return "0x" + low.toString(16);
    }
    const lowstr = low.toString(16);
    return "0x" + high.toString(16) + "0".repeat(16 - lowstr.length) + lowstr;
}
function uhex(v) {
    if (typeof v === "string")
        return `0x${bin_1.bin.toString(v, 16)}`;
    if (typeof v === "number") {
        if (v < 0)
            v = v >>> 0;
        return `0x${v.toString(16)}`;
    }
    return value64ToString16(v);
}
function shex(v) {
    if (typeof v === "string")
        return `0x${bin_1.bin.toString(v, 16)}`;
    if (typeof v === "number") {
        if (v < 0)
            return `-0x${(-v).toString(16)}`;
        else
            return `0x${v.toString(16)}`;
    }
    return value64ToString16(v);
}
function shex_o(v) {
    if (typeof v === "string")
        return `+0x${bin_1.bin.toString(v, 16)}`;
    if (typeof v === "number") {
        if (v < 0)
            return `-0x${(-v).toString(16)}`;
        else
            return `+0x${v.toString(16)}`;
    }
    return "+" + value64ToString16(v);
}
const REVERSE_MAP = {
    jo: "jno",
    jno: "jo",
    jb: "jae",
    jae: "jb",
    je: "jne",
    jne: "je",
    jbe: "ja",
    ja: "jbe",
    js: "jns",
    jns: "js",
    jp: "jnp",
    jnp: "jp",
    jl: "jge",
    jge: "jl",
    jle: "jg",
    jg: "jle",
};
class ArgName {
    constructor(name, short) {
        this.name = name;
        this.short = short;
    }
}
ArgName.Register = new ArgName("register", "r");
ArgName.FloatRegister = new ArgName("xmm register", "f");
ArgName.Const = new ArgName("const", "c");
const regmap = new Map([
    ["rip", [ArgName.Register, Register.rip, OperationSize.qword]],
    ["rax", [ArgName.Register, Register.rax, OperationSize.qword]],
    ["rcx", [ArgName.Register, Register.rcx, OperationSize.qword]],
    ["rdx", [ArgName.Register, Register.rdx, OperationSize.qword]],
    ["rbx", [ArgName.Register, Register.rbx, OperationSize.qword]],
    ["rsp", [ArgName.Register, Register.rsp, OperationSize.qword]],
    ["rbp", [ArgName.Register, Register.rbp, OperationSize.qword]],
    ["rsi", [ArgName.Register, Register.rsi, OperationSize.qword]],
    ["rdi", [ArgName.Register, Register.rdi, OperationSize.qword]],
    ["r8", [ArgName.Register, Register.r8, OperationSize.qword]],
    ["r9", [ArgName.Register, Register.r9, OperationSize.qword]],
    ["r10", [ArgName.Register, Register.r10, OperationSize.qword]],
    ["r11", [ArgName.Register, Register.r11, OperationSize.qword]],
    ["r12", [ArgName.Register, Register.r12, OperationSize.qword]],
    ["r13", [ArgName.Register, Register.r13, OperationSize.qword]],
    ["r14", [ArgName.Register, Register.r14, OperationSize.qword]],
    ["r15", [ArgName.Register, Register.r15, OperationSize.qword]],
    ["eax", [ArgName.Register, Register.rax, OperationSize.dword]],
    ["ecx", [ArgName.Register, Register.rcx, OperationSize.dword]],
    ["edx", [ArgName.Register, Register.rdx, OperationSize.dword]],
    ["ebx", [ArgName.Register, Register.rbx, OperationSize.dword]],
    ["esp", [ArgName.Register, Register.rsp, OperationSize.dword]],
    ["ebp", [ArgName.Register, Register.rbp, OperationSize.dword]],
    ["esi", [ArgName.Register, Register.rsi, OperationSize.dword]],
    ["edi", [ArgName.Register, Register.rdi, OperationSize.dword]],
    ["r8d", [ArgName.Register, Register.r8, OperationSize.dword]],
    ["r9d", [ArgName.Register, Register.r9, OperationSize.dword]],
    ["r10d", [ArgName.Register, Register.r10, OperationSize.dword]],
    ["r11d", [ArgName.Register, Register.r11, OperationSize.dword]],
    ["r12d", [ArgName.Register, Register.r12, OperationSize.dword]],
    ["r13d", [ArgName.Register, Register.r13, OperationSize.dword]],
    ["r14d", [ArgName.Register, Register.r14, OperationSize.dword]],
    ["r15d", [ArgName.Register, Register.r15, OperationSize.dword]],
    ["ax", [ArgName.Register, Register.rax, OperationSize.word]],
    ["cx", [ArgName.Register, Register.rcx, OperationSize.word]],
    ["dx", [ArgName.Register, Register.rdx, OperationSize.word]],
    ["bx", [ArgName.Register, Register.rbx, OperationSize.word]],
    ["sp", [ArgName.Register, Register.rsp, OperationSize.word]],
    ["bp", [ArgName.Register, Register.rbp, OperationSize.word]],
    ["si", [ArgName.Register, Register.rsi, OperationSize.word]],
    ["di", [ArgName.Register, Register.rdi, OperationSize.word]],
    ["r8w", [ArgName.Register, Register.r8, OperationSize.word]],
    ["r9w", [ArgName.Register, Register.r9, OperationSize.word]],
    ["r10w", [ArgName.Register, Register.r10, OperationSize.word]],
    ["r11w", [ArgName.Register, Register.r11, OperationSize.word]],
    ["r12w", [ArgName.Register, Register.r12, OperationSize.word]],
    ["r13w", [ArgName.Register, Register.r13, OperationSize.word]],
    ["r14w", [ArgName.Register, Register.r14, OperationSize.word]],
    ["r15w", [ArgName.Register, Register.r15, OperationSize.word]],
    ["al", [ArgName.Register, Register.rax, OperationSize.byte]],
    ["cl", [ArgName.Register, Register.rcx, OperationSize.byte]],
    ["dl", [ArgName.Register, Register.rdx, OperationSize.byte]],
    ["bl", [ArgName.Register, Register.rbx, OperationSize.byte]],
    ["ah", [ArgName.Register, Register.rsp, OperationSize.byte]],
    ["ch", [ArgName.Register, Register.rbp, OperationSize.byte]],
    ["dh", [ArgName.Register, Register.rsi, OperationSize.byte]],
    ["bh", [ArgName.Register, Register.rdi, OperationSize.byte]],
    ["r8b", [ArgName.Register, Register.r8, OperationSize.byte]],
    ["r9b", [ArgName.Register, Register.r9, OperationSize.byte]],
    ["r10b", [ArgName.Register, Register.r10, OperationSize.byte]],
    ["r11b", [ArgName.Register, Register.r11, OperationSize.byte]],
    ["r12b", [ArgName.Register, Register.r12, OperationSize.byte]],
    ["r13b", [ArgName.Register, Register.r13, OperationSize.byte]],
    ["r14b", [ArgName.Register, Register.r14, OperationSize.byte]],
    ["r15b", [ArgName.Register, Register.r15, OperationSize.byte]],
    ["xmm0", [ArgName.FloatRegister, FloatRegister.xmm0, null]],
    ["xmm1", [ArgName.FloatRegister, FloatRegister.xmm1, null]],
    ["xmm2", [ArgName.FloatRegister, FloatRegister.xmm2, null]],
    ["xmm3", [ArgName.FloatRegister, FloatRegister.xmm3, null]],
    ["xmm4", [ArgName.FloatRegister, FloatRegister.xmm4, null]],
    ["xmm5", [ArgName.FloatRegister, FloatRegister.xmm5, null]],
    ["xmm6", [ArgName.FloatRegister, FloatRegister.xmm6, null]],
    ["xmm7", [ArgName.FloatRegister, FloatRegister.xmm7, null]],
    ["xmm8", [ArgName.FloatRegister, FloatRegister.xmm8, null]],
    ["xmm9", [ArgName.FloatRegister, FloatRegister.xmm9, null]],
    ["xmm10", [ArgName.FloatRegister, FloatRegister.xmm10, null]],
    ["xmm11", [ArgName.FloatRegister, FloatRegister.xmm11, null]],
    ["xmm12", [ArgName.FloatRegister, FloatRegister.xmm12, null]],
    ["xmm13", [ArgName.FloatRegister, FloatRegister.xmm13, null]],
    ["xmm14", [ArgName.FloatRegister, FloatRegister.xmm14, null]],
    ["xmm15", [ArgName.FloatRegister, FloatRegister.xmm15, null]],
]);
const regnamemap = [];
for (const [name, [type, reg, size]] of regmap) {
    if (size === null)
        continue;
    regnamemap[reg | (size << 4)] = name;
}
const defaultOperationSize = new WeakMap();
(function (asm) {
    asm.code = X64Assembler.prototype;
    defaultOperationSize.set(asm.code.call_rp, OperationSize.qword);
    defaultOperationSize.set(asm.code.jmp_rp, OperationSize.qword);
    defaultOperationSize.set(asm.code.movss_f_f, OperationSize.dword);
    defaultOperationSize.set(asm.code.movss_f_rp, OperationSize.dword);
    defaultOperationSize.set(asm.code.movss_rp_f, OperationSize.dword);
    defaultOperationSize.set(asm.code.movsd_f_f, OperationSize.qword);
    defaultOperationSize.set(asm.code.movsd_f_rp, OperationSize.qword);
    defaultOperationSize.set(asm.code.movsd_rp_f, OperationSize.qword);
    defaultOperationSize.set(asm.code.cvtsi2sd_f_r, OperationSize.qword);
    defaultOperationSize.set(asm.code.cvtsi2sd_f_rp, OperationSize.qword);
    defaultOperationSize.set(asm.code.cvtsd2si_r_f, OperationSize.qword);
    defaultOperationSize.set(asm.code.cvtsd2si_r_rp, OperationSize.qword);
    defaultOperationSize.set(asm.code.cvttsd2si_r_f, OperationSize.qword);
    defaultOperationSize.set(asm.code.cvttsd2si_r_rp, OperationSize.qword);
    defaultOperationSize.set(asm.code.cvtsi2ss_f_r, OperationSize.dword);
    defaultOperationSize.set(asm.code.cvtsi2ss_f_rp, OperationSize.dword);
    defaultOperationSize.set(asm.code.cvtss2si_r_f, OperationSize.dword);
    defaultOperationSize.set(asm.code.cvtss2si_r_rp, OperationSize.dword);
    defaultOperationSize.set(asm.code.cvttss2si_r_f, OperationSize.dword);
    defaultOperationSize.set(asm.code.cvttss2si_r_rp, OperationSize.dword);
    defaultOperationSize.set(asm.code.movups_f_f, OperationSize.xmmword);
    defaultOperationSize.set(asm.code.movups_f_rp, OperationSize.xmmword);
    defaultOperationSize.set(asm.code.movups_rp_f, OperationSize.xmmword);
    for (let i = 0; i < 16; i++) {
        const jumpoper = JumpOperation[i].substr(1);
        defaultOperationSize.set(asm.code[`set${jumpoper}_r`], OperationSize.byte);
        defaultOperationSize.set(asm.code[`set${jumpoper}_rp`], OperationSize.byte);
    }
    asm.splitTwo32Bits = Symbol("splitTwo32Bits");
    class Operation {
        constructor(code, args) {
            this.code = code;
            this.args = args;
            this.size = -1;
            this._splits = null;
        }
        get splits() {
            if (this._splits !== null)
                return this._splits;
            const name = this.code.name;
            return (this._splits = name.split("_"));
        }
        reverseJump() {
            return REVERSE_MAP[this.splits[0]] || null;
        }
        parameters() {
            const out = [];
            const splits = this.splits;
            let argi = 0;
            for (let i = 1; i < splits.length; i++) {
                const argi_ori = argi;
                const type = splits[i];
                if (type === "r") {
                    const r = this.args[argi++];
                    if (typeof r !== "number" || r < -1 || r >= 16) {
                        throw Error(`${this.code.name}: Invalid parameter ${r} at ${i}`);
                    }
                    out.push({
                        type,
                        argi: argi_ori,
                        parami: i,
                        register: r,
                    });
                }
                else if (type === "cp") {
                    const r = this.args[argi++];
                    if (typeof r !== "number" || r < -1 || r >= 16) {
                        throw Error(`${this.code.name}: Invalid parameter ${r} at ${i}`);
                    }
                    const address = this.args[argi++];
                    out.push({ type, argi: argi_ori, parami: i, address });
                }
                else if (type === "rp" || type === "fp") {
                    const r = this.args[argi++];
                    if (typeof r !== "number" || r < -1 || r >= 16) {
                        throw Error(`${this.code.name}: Invalid parameter ${r} at ${i}`);
                    }
                    const multiply = this.args[argi++];
                    const offset = this.args[argi++];
                    out.push({
                        type,
                        argi: argi_ori,
                        parami: i,
                        register: r,
                        multiply,
                        offset,
                    });
                }
                else if (type === "c") {
                    const constant = this.args[argi++];
                    out.push({
                        type,
                        argi: argi_ori,
                        parami: i,
                        constant,
                    });
                }
                else if (type === "f") {
                    const freg = this.args[argi++];
                    out.push({
                        type,
                        argi: argi_ori,
                        parami: i,
                        register: freg,
                    });
                }
                else if (type === "label") {
                    const label = this.args[argi++];
                    out.push({
                        type,
                        argi: argi_ori,
                        parami: i,
                        label,
                    });
                }
                else {
                    argi++;
                }
            }
            return out;
        }
        toString() {
            var _a, _b;
            const { code, args } = this;
            const name = code.name;
            const splited = name.split("_");
            const cmd = splited.shift();
            let i = 0;
            for (const item of splited) {
                switch (item) {
                    case "r":
                    case "f":
                    case "c":
                    case "cp":
                        i++;
                        break;
                    case "rp":
                    case "fp":
                        i += 3;
                        break;
                    case "rrp":
                        i += 4;
                        break;
                }
            }
            let sizei = i;
            const size = (_a = defaultOperationSize.get(code)) !== null && _a !== void 0 ? _a : args[sizei];
            i = 0;
            const argstr = [];
            for (const item of splited) {
                const nsize = (_b = args[sizei++]) !== null && _b !== void 0 ? _b : size;
                const v = args[i++];
                switch (item) {
                    case "r":
                        argstr.push(getRegisterName(v, nsize));
                        break;
                    case "f":
                        argstr.push(FloatRegister[v]);
                        break;
                    case "c":
                        argstr.push(shex(v));
                        break;
                    case "cp":
                        argstr.push(uhex(v));
                        break;
                    case "rp":
                    case "fp": {
                        const multiply = args[i++];
                        const offset = args[i++];
                        let str = `[${Register[v]}${multiply !== 1 ? `*${multiply}` : ""}${offset !== 0 ? shex_o(offset) : ""}]`;
                        if (item === "fp") {
                            str = `fword ptr ${str}`;
                        }
                        else if (nsize != null) {
                            str = `${OperationSize[nsize]} ptr ${str}`;
                        }
                        argstr.push(str);
                        break;
                    }
                    case "rrp": {
                        const r2 = args[i++];
                        const multiply = args[i++];
                        const offset = args[i++];
                        let str = `[${Register[v]}+${Register[r2]}${multiply !== 1 ? `*${multiply}` : ""}${offset !== 0 ? shex_o(offset) : ""}]`;
                        if (nsize != null) {
                            str = `${OperationSize[nsize]} ptr ${str}`;
                        }
                        argstr.push(str);
                        break;
                    }
                }
            }
            if (argstr.length === 0)
                return cmd;
            return `${cmd} ${argstr.join(", ")}`;
        }
    }
    asm.Operation = Operation;
    class Operations {
        constructor(operations, size) {
            this.operations = operations;
            this.size = size;
        }
        toString() {
            const out = [];
            for (const oper of this.operations) {
                out.push(oper.toString());
            }
            return out.join("\n");
        }
        asm() {
            const code = asm();
            for (const { code: opcode, args } of this.operations) {
                opcode.apply(code, args);
            }
            return code;
        }
    }
    asm.Operations = Operations;
    function compile(source, defines, reportDirectWithFileName) {
        const code = asm();
        code.compile(source, defines, reportDirectWithFileName);
        return code.save();
    }
    asm.compile = compile;
    function load(bin) {
        return X64Assembler.load(bin);
    }
    asm.load = load;
    async function loadFromFile(src, defines, reportDirect = false) {
        const basename = src.substr(0, src.lastIndexOf(".") + 1);
        const binpath = `${basename}bin`;
        let buffer;
        if (await fsutil_1.fsutil.checkModified(src, binpath)) {
            buffer = asm.compile(await fsutil_1.fsutil.readFile(src), defines, reportDirect ? src : null);
            await fsutil_1.fsutil.writeFile(binpath, buffer);
            console.log(`Please reload it`);
            process.exit(0);
        }
        else {
            buffer = await fsutil_1.fsutil.readFile(binpath, null);
        }
        return asm.load(buffer);
    }
    asm.loadFromFile = loadFromFile;
    function getRegisterName(register, size) {
        if (size == null)
            size = OperationSize.qword;
        return regnamemap[register | (size << 4)] || `invalid_R${register}_S${size}`;
    }
    asm.getRegisterName = getRegisterName;
})(asm = exports.asm || (exports.asm = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZW1ibGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXNzZW1ibGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUFpQztBQUNqQywrQkFBNEI7QUFDNUIscUNBQWtDO0FBQ2xDLCtDQUE0QztBQUM1Qyw2REFBMEQ7QUFDMUQsNkNBQW1HO0FBQ25HLGlDQUFnRDtBQUNoRCx3REFBbUU7QUFDbkUsd0RBQXFEO0FBRXJELElBQVksUUFtQlg7QUFuQkQsV0FBWSxRQUFRO0lBQ2hCLGdEQUFhLENBQUE7SUFDYixzQ0FBUSxDQUFBO0lBQ1IscUNBQUcsQ0FBQTtJQUNILHFDQUFHLENBQUE7SUFDSCxxQ0FBRyxDQUFBO0lBQ0gscUNBQUcsQ0FBQTtJQUNILHFDQUFHLENBQUE7SUFDSCxxQ0FBRyxDQUFBO0lBQ0gscUNBQUcsQ0FBQTtJQUNILHFDQUFHLENBQUE7SUFDSCxtQ0FBRSxDQUFBO0lBQ0YsbUNBQUUsQ0FBQTtJQUNGLHNDQUFHLENBQUE7SUFDSCxzQ0FBRyxDQUFBO0lBQ0gsc0NBQUcsQ0FBQTtJQUNILHNDQUFHLENBQUE7SUFDSCxzQ0FBRyxDQUFBO0lBQ0gsc0NBQUcsQ0FBQTtBQUNQLENBQUMsRUFuQlcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFtQm5CO0FBRUQsSUFBWSxhQWlCWDtBQWpCRCxXQUFZLGFBQWE7SUFDckIsaURBQUksQ0FBQTtJQUNKLGlEQUFJLENBQUE7SUFDSixpREFBSSxDQUFBO0lBQ0osaURBQUksQ0FBQTtJQUNKLGlEQUFJLENBQUE7SUFDSixpREFBSSxDQUFBO0lBQ0osaURBQUksQ0FBQTtJQUNKLGlEQUFJLENBQUE7SUFDSixpREFBSSxDQUFBO0lBQ0osaURBQUksQ0FBQTtJQUNKLG9EQUFLLENBQUE7SUFDTCxvREFBSyxDQUFBO0lBQ0wsb0RBQUssQ0FBQTtJQUNMLG9EQUFLLENBQUE7SUFDTCxvREFBSyxDQUFBO0lBQ0wsb0RBQUssQ0FBQTtBQUNULENBQUMsRUFqQlcsYUFB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RCxNQUFNLENBQUMsQ0FBVztRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELE9BQU8sQ0FBQyxDQUFXLEVBQUUsUUFBNkIsRUFBRSxNQUFjO1FBQzlELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUNELFFBQVEsQ0FBQyxDQUFXLEVBQUUsUUFBNkIsRUFBRSxNQUFjO1FBQy9ELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUNELE9BQU8sQ0FBQyxDQUFXLEVBQUUsUUFBNkIsRUFBRSxNQUFjO1FBQzlELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUNELFFBQVEsQ0FBQyxDQUFXLEVBQUUsUUFBNkIsRUFBRSxNQUFjO1FBQy9ELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUNELE9BQU8sQ0FBQyxDQUFXLEVBQUUsUUFBNkIsRUFBRSxNQUFjO1FBQzlELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUNELFFBQVEsQ0FBQyxDQUFXLEVBQUUsUUFBNkIsRUFBRSxNQUFjO1FBQy9ELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUNELFFBQVEsQ0FBQyxDQUFXLEVBQUUsUUFBNkIsRUFBRSxNQUFjO1FBQy9ELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUNELE9BQU8sQ0FBQyxDQUFXLEVBQUUsUUFBNkIsRUFBRSxNQUFjO1FBQzlELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUNELE9BQU8sQ0FBQyxDQUFXLEVBQUUsUUFBNkIsRUFBRSxNQUFjO1FBQzlELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUNELFFBQVEsQ0FBQyxDQUFXLEVBQUUsUUFBNkIsRUFBRSxNQUFjO1FBQy9ELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUNELE9BQU8sQ0FBQyxDQUFXLEVBQUUsUUFBNkIsRUFBRSxNQUFjO1FBQzlELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUNELFFBQVEsQ0FBQyxDQUFXLEVBQUUsUUFBNkIsRUFBRSxNQUFjO1FBQy9ELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUNELE9BQU8sQ0FBQyxDQUFXLEVBQUUsUUFBNkIsRUFBRSxNQUFjO1FBQzlELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUNELFFBQVEsQ0FBQyxDQUFXLEVBQUUsUUFBNkIsRUFBRSxNQUFjO1FBQy9ELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUNELFFBQVEsQ0FBQyxDQUFXLEVBQUUsUUFBNkIsRUFBRSxNQUFjO1FBQy9ELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUNELE9BQU8sQ0FBQyxDQUFXLEVBQUUsUUFBNkIsRUFBRSxN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RyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUNELFFBQVEsQ0FBQyxJQUFjLEVBQUUsUUFBNkIsRUFBRSxNQUFjLEVBQUUsR0FBVyxFQUFFLElBQUksR0FBRyxhQUFhLENBQUMsS0FBSztRQUMzRyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUNELFFBQVEsQ0FBQyxJQUFjLEVBQUUsUUFBNkIsRUFBRSxNQUFjLEVBQUUsR0FBVyxFQUFFLElBQUksR0FBRyxhQUFhLENBQUMsS0FBSztRQUMzRyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUNELFFBQVEsQ0FBQyxJQUFjLEVBQUUsUUFBNkIsRUFBRSxNQUFjLEVBQUUsR0FBVyxFQUFFLElBQUksR0FBRyxhQUFhLENBQUMsS0FBSztRQUMzRyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUNELFFBQVEsQ0FBQyxJQUFjLEVBQUUsUUFBNkIsRUFBRSxNQUFjLEVBQUUsR0FBVyxFQUFFLElBQUksR0FBRyxhQUFhLENBQUMsS0FBSztRQUMzRyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUNELFFBQVEsQ0FBQyxJQUFjLEVBQUUsUUFBNkIsRUFBRSxNQUFjLEVBQUUsR0FBVyxFQUFFLElBQUksR0FBRyxhQUFhLENBQUMsS0FBSztRQUMzRyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUNELE9BQU8sQ0FBQyxJQUFjLEVBQUUsUUFBNkIsRUFBRSxNQUFjLEVBQUUsR0FBVyxFQUFFLElBQUksR0FBRyxhQUFhLENBQUMsS0FBSztRQUMxRyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUNELFFBQVEsQ0FBQyxJQUFjLEVBQUUsUUFBNkIsRUFBRSxNQUFjLEVBQUUsR0FBVyxFQUFFLElBQUksR0FBRyxhQUFhLENBQUMsS0FBSztRQUMzRyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUVELFFBQVEsQ0FBQyxJQUFjLEVBQUUsR0FBYSxFQUFFLFFBQTZCLEVBQUUsTUFBYyxFQUFFLE9BQXNCLGFBQWEsQ0FBQyxLQUFLO1FBQzVILE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBQ0QsUUFBUSxDQUFDLElBQWMsRUFBRSxHQUFhLEVBQUUsUUFBNkIsRUFBRSxNQUFjLEVBQUUsT0FBc0IsYUFBYSxDQUFDLEtBQUs7UUFDNUgsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFDRCxRQUFRLENBQUMsSUFBYyxFQUFFLEdBQWEsRUFBRSxRQUE2QixFQUFFLE1BQWMsRUFBRSxPQUFzQixhQUFhLENBQUMsS0FBSztRQUM1SCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUNELFFBQVEsQ0FBQyxJQUFjLEVBQUUsR0FBYSxFQUFFLFFBQTZCLEVBQUUsTUFBYyxFQUFFLE9BQXNCLGFBQWEsQ0FBQyxLQUFLO1FBQzVILE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBQ0QsUUFBUSxDQUFDLElBQWMsRUFBRSxHQUFhLEVBQUUsUUFBNkIsRUFBRSxNQUFjLEVBQUUsT0FBc0IsYUFBYSxDQUFDLEtBQUs7UUFDNUgsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFDRCxRQUFRLENBQUMsSUFBYyxFQUFFLEdBQWEsRUFBRSxRQUE2QixFQUFFLE1BQWMsRUFBRSxPQUFzQixhQUFhLENBQUMsS0FBSztRQUM1SCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUNELE9BQU8sQ0FBQyxJQUFjLEVBQUUsR0FBYSxFQUFFLFFBQTZCLEVBQUUsTUFBYyxFQUFFLE9BQXNCLGFBQWEsQ0FBQyxLQUFLO1FBQzNILE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBQ0QsUUFBUSxDQUFDLElBQWMsRUFBRSxHQUFhLEVBQUUsUUFBNkIsRUFBRSxNQUFjLEVBQUUsT0FBc0IsYUFBYSxDQUFDLEtBQUs7UUFDNUgsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFFRCxRQUFRLENBQUMsSUFBYyxFQUFFLFFBQTZCLEVBQUUsTUFBYyxFQUFFLEdBQWEsRUFBRSxPQUFzQixhQUFhLENBQUMsS0FBSztRQUM1SCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekYsQ0FBQztJQUNELFFBQVEsQ0FBQyxJQUFjLEVBQUUsUUFBNkIsRUFBRSxNQUFjLEVBQUUsR0FBYSxFQUFFLE9BQXNCLGFBQWEsQ0FBQyxLQUFLO1FBQzVILE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBQ0QsUUFBUSxDQUFDLElBQWMsRUFBRSxRQUE2QixFQUFFLE1BQWMsRUFBRSxHQUFhLEVBQUUsT0FBc0IsYUFBYSxDQUFDLEtBQUs7UUFDNUgsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFDRCxRQUFRLENBQUMsSUFBYyxFQUFFLFFBQTZCLEVBQUUsTUFBYyxFQUFFLEdBQWEsRUFBRSxPQUFzQixhQUFhLENBQUMsS0FBSztRQUM1SCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekYsQ0FBQztJQUNELFFBQVEsQ0FBQyxJQUFjLEVBQUUsUUFBNkIsRUFBRSxNQUFjLEVBQUUsR0FBYSxFQUFFLE9BQXNCLGFBQWEsQ0FBQyxLQUFLO1FBQzVILE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBQ0QsUUFBUSxDQUFDLElBQWMsRUFBRSxRQUE2QixFQUFFLE1BQWMsRUFBRSxHQUFhLEVBQUUsT0FBc0IsYUFBYSxDQUFDLEtBQUs7UUFDNUgsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFDRCxPQUFPLENBQUMsSUFBYyxFQUFFLFFBQTZCLEVBQUUsTUFBYyxFQUFFLEdBQWEsRUFBRSxPQUFzQixhQUFhLENBQUMsS0FBSztRQUMzSCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUNELFFBQVEsQ0FBQyxJQUFjLEVBQUUsUUFBNkIsRUFBRSxNQUFjLEVBQUUsR0FBYSxFQUFFLE9BQXNCLGFBQWEsQ0FBQyxLQUFLO1FBQzVILE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBRU8sVUFBVSxDQUFDLElBQWMsRUFBRSxNQUFlLEVBQUUsS0FBYyxFQUFFLEdBQVcsRUFBRSxJQUFJLEdBQUcsYUFBYSxDQUFDLEtBQUs7UUFDdkcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxLQUFLLEVBQUU7WUFDUCxPQUFPLElBQUksSUFBSSxDQUFDO1lBQ2hCLElBQUksTUFBTTtnQkFBRSxPQUFPLElBQUksSUFBSSxDQUFDO1NBQy9CO1FBRUQsSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFO1lBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQzVCO2FBQU07WUFDSCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FDdkI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsT0FBTyxDQUFDLElBQWMsRUFBRSxHQUFXLEVBQUUsSUFBSSxHQUFHLGFBQWEsQ0FBQyxLQUFLO1FBQzNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUNELE9BQU8sQ0FBQyxJQUFjLEVBQUUsR0FBVyxFQUFFLElBQUksR0FBRyxhQUFhLENBQUMsS0FBSztRQUMzRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFDRCxPQUFPLENBQUMsSUFBYyxFQUFFLEdBQVcsRUFBRSxJQUFJLEdBQUcsYUFBYSxDQUFDLEtBQUs7UUFDM0QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBQ0QsT0FBTyxDQUFDLElBQWMsRUFBRSxHQUFXLEVBQUUsSUFBSSxHQUFHLGFBQWEsQ0FBQyxLQUFLO1FBQzNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVPLE1BQU0sQ0FDVixJQUFjLEVBQ2QsR0FBYSxFQUNiLFFBQTZCLEVBQzdCLE1BQWMsRUFDZCxRQUF1QixFQUN2QixPQUFzQixFQUN0QixJQUFhO1FBRWIsSUFBSSxRQUFRLElBQUksSUFBSSxJQUFJLE9BQU8sSUFBSSxJQUFJO1lBQUUsTUFBTSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUMxRSxJQUFJLE9BQU8sR0FBRyxhQUFhLENBQUMsS0FBSztZQUFFLE1BQU0sS0FBSyxDQUFDLG1DQUFtQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN6SCxJQUFJLFFBQVEsSUFBSSxPQUFPO1lBQUUsTUFBTSxLQUFLLENBQUMsNEJBQTRCLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLE9BQU8sYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDaEosSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNyQyxRQUFRLE9BQU8sRUFBRTtZQUNiLEtBQUssYUFBYSxDQUFDLElBQUk7Z0JBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDZixNQUFNO1lBQ1YsS0FBSyxhQUFhLENBQUMsSUFBSTtnQkFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNmLE1BQU07WUFDVixLQUFLLGFBQWEsQ0FBQyxLQUFLO2dCQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNmLE1BQU07WUFDVjtnQkFDSSxNQUFNLEtBQUssQ0FBQyxxQ0FBcUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDN0Y7UUFDRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBYyxFQUFFLEdBQWEsRUFBRSxRQUE2QixFQUFFLE1BQWMsRUFBRSxRQUF1QixFQUFFLE9BQXNCO1FBQ3BJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUNELFdBQVcsQ0FBQyxJQUFjLEVBQUUsR0FBYSxFQUFFLFFBQTZCLEVBQUUsTUFBYztRQUNwRixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xHLENBQUM7SUFFRCxTQUFTLENBQUMsSUFBYyxFQUFFLEdBQWEsRUFBRSxRQUF1QixFQUFFLE9BQXNCO1FBQ3BGLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUNELFVBQVUsQ0FBQyxJQUFjLEVBQUUsR0FBYTtRQUNwQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRU8sTUFBTSxDQUNWLEVBQVksRUFDWixFQUFZLEVBQ1osRUFBbUIsRUFDbkIsUUFBNkIsRUFDN0IsTUFBYyxFQUNkLFFBQXVCLEVBQ3ZCLE9BQXNCLEVBQ3RCLElBQWE7UUFFYixJQUFJLFFBQVEsSUFBSSxJQUFJLElBQUksT0FBTyxJQUFJLElBQUk7WUFBRSxNQUFNLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzFFLElBQUksT0FBTyxJQUFJLGFBQWEsQ0FBQyxLQUFLO1lBQUUsTUFBTSxLQUFLLENBQUMsbUNBQW1DLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUcsSUFBSSxRQUFRLElBQUksT0FBTztZQUFFLE1BQU0sS0FBSyxDQUFDLDRCQUE0QixhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6SCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDZixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxPQUFPLEtBQUssYUFBYSxDQUFDLElBQUk7WUFBRSxNQUFNLElBQUksQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBQ0QsU0FBUyxDQUFDLElBQWMsRUFBRSxHQUFhLEVBQUUsUUFBdUIsRUFBRSxPQUFzQjtRQUNwRixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBQ0QsVUFBVSxDQUFDLElBQWMsRUFBRSxHQUFhLEVBQUUsUUFBNkIsRUFBRSxNQUFjLEVBQUUsUUFBdUIsRUFBRSxPQUFzQjtRQUNwSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzRixDQUFDO0lBQ0QsV0FBVyxDQUNQLElBQWMsRUFDZCxJQUFjLEVBQ2QsSUFBYyxFQUNkLFFBQTZCLEVBQzdCLE1BQWMsRUFDZCxRQUF1QixFQUN2QixPQUFzQjtRQUV0QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBRU8sTUFBTSxDQUNWLEVBQTRCLEVBQzVCLEVBQTRCLEVBQzVCLEVBQW1CLEVBQ25CLFFBQTZCLEVBQzdCLE1BQWMsRUFDZCxLQUFvQixFQUNwQixJQUFhLEVBQ2IsS0FBZ0IsRUFDaEIsSUFBbUI7UUFFbkIsUUFBUSxLQUFLLEVBQUU7WUFDWCxLQUFLLGFBQWEsQ0FBQyxlQUFlO2dCQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNmLE1BQU07WUFDVixLQUFLLGFBQWEsQ0FBQyxlQUFlO2dCQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNmLE1BQU07WUFDVixLQUFLLGFBQWEsQ0FBQyxPQUFPO2dCQUN0QixNQUFNO1NBQ2I7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDZixRQUFRLEtBQUssRUFBRTtZQUNYLEtBQUssU0FBUyxDQUFDLGdCQUFnQjtnQkFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDZixNQUFNO1lBQ1YsS0FBSyxTQUFTLENBQUMsb0JBQW9CO2dCQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNmLE1BQU07WUFDVixLQUFLLFNBQVMsQ0FBQyxXQUFXO2dCQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNmLE1BQU07WUFDVixLQUFLLFNBQVMsQ0FBQyxXQUFXO2dCQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNmLE1BQU07WUFDVjtnQkFDSSxJQUFJLElBQUksS0FBSyxPQUFPLENBQUMsS0FBSztvQkFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDOztvQkFDdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEIsTUFBTTtTQUNiO1FBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsV0FBVyxDQUFDLElBQW1CLEVBQUUsUUFBNkIsRUFBRSxNQUFjLEVBQUUsR0FBa0I7UUFDOUYsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JJLENBQUM7SUFDRCxXQUFXLENBQUMsSUFBbUIsRUFBRSxHQUFhLEVBQUUsUUFBNkIsRUFBRSxNQUFjO1FBQ3pGLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwSSxDQUFDO0lBQ0QsVUFBVSxDQUFDLElBQW1CLEVBQUUsR0FBa0I7UUFDOUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsYUFBYSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVILENBQUM7SUFFRCxVQUFVLENBQUMsSUFBYyxFQUFFLFFBQTZCLEVBQUUsTUFBYyxFQUFFLEdBQWtCO1FBQ3hGLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3SSxDQUFDO0lBQ0QsVUFBVSxDQUFDLElBQW1CLEVBQUUsR0FBYSxFQUFFLFFBQTZCLEVBQUUsTUFBYztRQUN4RixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUksQ0FBQztJQUNELFNBQVMsQ0FBQyxJQUFtQixFQUFFLEdBQWtCO1FBQzdDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwSSxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQWMsRUFBRSxRQUE2QixFQUFFLE1BQWMsRUFBRSxHQUFrQjtRQUN4RixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0ksQ0FBQztJQUNELFVBQVUsQ0FBQyxJQUFtQixFQUFFLEdBQWEsRUFBRSxRQUE2QixFQUFFLE1BQWM7UUFDeEYsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVJLENBQUM7SUFDRCxTQUFTLENBQUMsSUFBbUIsRUFBRSxHQUFrQjtRQUM3QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxhQUFhLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEksQ0FBQztJQUVELFlBQVksQ0FBQyxJQUFtQixFQUFFLEdBQWEsRUFBRSxPQUFzQixhQUFhLENBQUMsS0FBSztRQUN0RixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxhQUFhLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1SCxDQUFDO0lBQ0QsYUFBYSxDQUFDLElBQW1CLEVBQUUsR0FBYSxFQUFFLFFBQTZCLEVBQUUsTUFBYyxFQUFFLE9BQXNCLGFBQWEsQ0FBQyxLQUFLO1FBQ3RJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BJLENBQUM7SUFDRCxZQUFZLENBQUMsSUFBbUIsRUFBRSxHQUFhLEVBQUUsT0FBc0IsYUFBYSxDQUFDLEtBQUs7UUFDdEYsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsYUFBYSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEgsQ0FBQztJQUNELGFBQWEsQ0FBQyxJQUFtQixFQUFFLEdBQWEsRUFBRSxRQUE2QixFQUFFLE1BQWMsRUFBRSxPQUFzQixhQUFhLENBQUMsS0FBSztRQUN0SSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1SCxDQUFDO0lBQ0QsWUFBWSxDQUFDLElBQW1CLEVBQUUsR0FBYSxFQUFFLE9BQXNCLGFBQWEsQ0FBQyxLQUFLO1FBQ3RGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsYUFBYSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEgsQ0FBQztJQUNELGFBQWEsQ0FBQyxJQUFtQixFQUFFLEdBQWEsRUFBRSxRQUE2QixFQUFFLE1BQWMsRUFBRSxPQUFzQixhQUFhLENBQUMsS0FBSztRQUN0SSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVILENBQUM7SUFDRCxZQUFZLENBQUMsSUFBYyxFQUFFLEdBQWtCLEVBQUUsT0FBc0IsYUFBYSxDQUFDLEtBQUs7UUFDdEYsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsYUFBYSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUgsQ0FBQztJQUNELGFBQWEsQ0FBQyxJQUFjLEVBQUUsR0FBYSxFQUFFLFFBQTZCLEVBQUUsTUFBYyxFQUFFLE9BQXNCLGFBQWEsQ0FBQyxLQUFLO1FBQ2pJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BJLENBQUM7SUFDRCxZQUFZLENBQUMsSUFBYyxFQUFFLEdBQWtCLEVBQUUsT0FBc0IsYUFBYSxDQUFDLEtBQUs7UUFDdEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxhQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwSCxDQUFDO0lBQ0QsYUFBYSxDQUFDLElBQWMsRUFBRSxHQUFhLEVBQUUsUUFBNkIsRUFBRSxNQUFjLEVBQUUsT0FBc0IsYUFBYSxDQUFDLEtBQUs7UUFDakksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1SCxDQUFDO0lBQ0QsWUFBWSxDQUFDLElBQWMsRUFBRSxHQUFrQixFQUFFLE9BQXNCLGFBQWEsQ0FBQyxLQUFLO1FBQ3RGLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BILENBQUM7SUFDRCxhQUFhLENBQUMsSUFBYyxFQUFFLEdBQWEsRUFBRSxRQUE2QixFQUFFLE1BQWMsRUFBRSxPQUFzQixhQUFhLENBQUMsS0FBSztRQUNqSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1SCxDQUFDO0lBQ0QsYUFBYSxDQUFDLElBQWMsRUFBRSxHQUFrQixFQUFFLE9BQXNCLGFBQWEsQ0FBQyxLQUFLO1FBQ3ZGLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckksQ0FBQztJQUNELGNBQWMsQ0FBQyxJQUFjLEVBQUUsR0FBYSxFQUFFLFFBQTZCLEVBQUUsTUFBYyxFQUFFLE9BQXNCLGFBQWEsQ0FBQyxLQUFLO1FBQ2xJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0ksQ0FBQztJQUNELGFBQWEsQ0FBQyxJQUFjLEVBQUUsR0FBa0IsRUFBRSxPQUFzQixhQUFhLENBQUMsS0FBSztRQUN2RixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxhQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdILENBQUM7SUFDRCxjQUFjLENBQUMsSUFBYyxFQUFFLEdBQWEsRUFBRSxRQUE2QixFQUFFLE1BQWMsRUFBRSxPQUFzQixhQUFhLENBQUMsS0FBSztRQUNsSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JJLENBQUM7SUFDRCxhQUFhLENBQUMsSUFBYyxFQUFFLEdBQWtCLEVBQUUsT0FBc0IsYUFBYSxDQUFDLEtBQUs7UUFDdkYsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxhQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdILENBQUM7SUFDRCxjQUFjLENBQUMsSUFBYyxFQUFFLEdBQWEsRUFBRSxRQUE2QixFQUFFLE1BQWMsRUFBRSxPQUFzQixhQUFhLENBQUMsS0FBSztRQUNsSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckksQ0FBQztJQUVELFlBQVksQ0FBQyxJQUFtQixFQUFFLEdBQWEsRUFBRSxPQUFzQixhQUFhLENBQUMsS0FBSztRQUN0RixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxhQUFhLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1SCxDQUFDO0lBQ0QsYUFBYSxDQUFDLElBQW1CLEVBQUUsR0FBYSxFQUFFLFFBQTZCLEVBQUUsTUFBYyxFQUFFLE9BQXNCLGFBQWEsQ0FBQyxLQUFLO1FBQ3RJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BJLENBQUM7SUFDRCxhQUFhLENBQUMsSUFBYyxFQUFFLEdBQWtCLEVBQUUsT0FBc0IsYUFBYSxDQUFDLEtBQUs7UUFDdkYsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsYUFBYSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNySSxDQUFDO0lBQ0QsY0FBYyxDQUFDLElBQWMsRUFBRSxHQUFhLEVBQUUsUUFBNkIsRUFBRSxNQUFjLEVBQUUsT0FBc0IsYUFBYSxDQUFDLEtBQUs7UUFDbEksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3SSxDQUFDO0lBQ0QsWUFBWSxDQUFDLElBQWMsRUFBRSxHQUFrQixFQUFFLE9BQXNCLGFBQWEsQ0FBQyxLQUFLO1FBQ3RGLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVILENBQUM7SUFDRCxhQUFhLENBQUMsSUFBYyxFQUFFLEdBQWEsRUFBRSxRQUE2QixFQUFFLE1BQWMsRUFBRSxPQUFzQixhQUFhLENBQUMsS0FBSztRQUNqSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwSSxDQUFDO0lBRUQsWUFBWSxDQUFDLElBQW1CLEVBQUUsR0FBa0I7UUFDaEQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsYUFBYSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEosQ0FBQztJQUNELGFBQWEsQ0FBQyxJQUFtQixFQUFFLEdBQWEsRUFBRSxRQUE2QixFQUFFLE1BQWM7UUFDM0YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEosQ0FBQztJQUNELFlBQVksQ0FBQyxJQUFtQixFQUFFLEdBQWtCO1FBQ2hELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hKLENBQUM7SUFDRCxhQUFhLENBQUMsSUFBbUIsRUFBRSxHQUFhLEVBQUUsUUFBNkIsRUFBRSxNQUFjO1FBQzNGLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hKLENBQUM7SUFDRCxZQUFZLENBQUMsSUFBbUIsRUFBRSxHQUFrQjtRQUNoRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxhQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLGdCQUFnQixFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4SSxDQUFDO0lBQ0QsYUFBYSxDQUFDLElBQW1CLEVBQUUsR0FBYSxFQUFFLFFBQTZCLEVBQUUsTUFBYztRQUMzRixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLGdCQUFnQixFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoSixDQUFDO0lBQ0QsWUFBWSxDQUFDLElBQW1CLEVBQUUsR0FBa0I7UUFDaEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxhQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLGdCQUFnQixFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4SSxDQUFDO0lBQ0QsYUFBYSxDQUFDLElBQW1CLEVBQUUsR0FBYSxFQUFFLFFBQTZCLEVBQUUsTUFBYztRQUMzRixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hKLENBQUM7SUFFRCxTQUFTLENBQUMsU0FBd0IsRUFBRSxZQUFxQixLQUFLLEVBQUUsU0FBa0IsS0FBSztRQUNuRixJQUFJLEtBQVksQ0FBQztRQUNqQixJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7WUFDcEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkMsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO2dCQUNoQixJQUFJLE1BQU0sWUFBWSxVQUFVLEVBQUU7b0JBQzlCLE1BQU0sS0FBSyxDQUFDLEdBQUcsU0FBUyxxQkFBcUIsQ0FBQyxDQUFDO2lCQUNsRDtnQkFDRCxJQUFJLENBQUMsQ0FBQyxNQUFNLFlBQVksS0FBSyxDQUFDO29CQUFFLE1BQU0sS0FBSyxDQUFDLEdBQUcsU0FBUyxlQUFlLENBQUMsQ0FBQztnQkFDekUsSUFBSSxNQUFNLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTtvQkFDdkIsTUFBTSxLQUFLLENBQUMsR0FBRyxTQUFTLHFCQUFxQixDQUFDLENBQUM7aUJBQ2xEO2dCQUNELEtBQUssR0FBRyxNQUFNLENBQUM7YUFDbEI7aUJBQU07Z0JBQ0gsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDbEM7U0FDSjthQUFNO1lBQ0gsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ2hDO1FBQ0QsSUFBSSxNQUFNO1lBQUUsS0FBSyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFFbkMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3pCLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTNCLElBQUksU0FBUyxLQUFLLElBQUksRUFBRTtZQUNwQixJQUFJLENBQUMsU0FBUztnQkFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUUxQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3JCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFLLENBQUM7WUFFckIsT0FBTyxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFLLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTtnQkFDaEQsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSyxDQUFDLENBQUM7Z0JBQ2hELEdBQUcsR0FBRyxJQUFJLENBQUM7Z0JBQ1gsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFLLENBQUM7YUFDcEI7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxLQUFLLENBQUMsU0FBaUIsRUFBRSxZQUFxQixLQUFLO1FBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxZQUFZLENBQUMsSUFBWTtRQUNyQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxDQUFDLEtBQUssWUFBWSxLQUFLLENBQUM7WUFBRSxNQUFNLEtBQUssQ0FBQyxHQUFHLElBQUksZUFBZSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDaEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFdBQVcsQ0FBQyxTQUFpQjtRQUN6QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsQ0FBQyxLQUFLLFlBQVksS0FBSyxDQUFDO1lBQUUsTUFBTSxLQUFLLENBQUMsR0FBRyxTQUFTLGVBQWUsQ0FBQyxDQUFDO1FBQ3hFLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxJQUFJO1lBQUUsTUFBTSxLQUFLLENBQUMsR0FBRyxLQUFLLHFCQUFxQixDQUFDLENBQUM7UUFDckUsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3pCLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDL0IsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNyQixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSyxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSyxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUU7WUFDaEQsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSyxDQUFDLENBQUM7WUFDaEQsR0FBRyxHQUFHLElBQUksQ0FBQztZQUNYLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSyxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0IsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVPLGNBQWMsQ0FBQyxTQUF3QjtRQUMzQyxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7WUFDcEIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbkMsSUFBSSxFQUFFLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFlBQVksVUFBVSxFQUFFO29CQUMxQixJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssYUFBYSxDQUFDLEtBQUs7d0JBQUUsTUFBTSxLQUFLLENBQUMsR0FBRyxTQUFTLGlCQUFpQixDQUFDLENBQUM7b0JBQ2hGLE9BQU8sRUFBRSxDQUFDO2lCQUNiO2dCQUNELElBQUksQ0FBQyxDQUFDLEVBQUUsWUFBWSxLQUFLLENBQUM7b0JBQUUsTUFBTSxLQUFLLENBQUMsR0FBRyxTQUFTLGVBQWUsQ0FBQyxDQUFDO2dCQUNyRSxPQUFPLEVBQUUsQ0FBQzthQUNiO1NBQ0o7UUFDRCxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuQyxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7WUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2xDO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELFNBQVMsQ0FBQyxTQUFpQjtRQUN2QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLElBQUksS0FBSyxZQUFZLFVBQVUsRUFBRTtZQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0MsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDdEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzdEO1FBQ0QsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxXQUFXLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzFHLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxVQUFVLENBQUMsU0FBaUI7UUFDeEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QyxJQUFJLEtBQUssWUFBWSxVQUFVLEVBQUU7WUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzNDLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsMkJBQTJCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzNDLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLFdBQVcsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pILE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTyxZQUFZLENBQUMsSUFBbUIsRUFBRSxTQUFpQjtRQUN2RCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxDQUFDLEtBQUssWUFBWSxLQUFLLENBQUM7WUFBRSxNQUFNLEtBQUssQ0FBQyx5QkFBeUIsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUNqRixJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ3RCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDakU7UUFDRCxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLFdBQVcsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlHLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTywyQkFBMkIsQ0FBQyxFQUFxQixFQUFFLEtBQWE7UUFDcEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDakcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDcEIsQ0FBQztJQUVPLGlCQUFpQixDQUFDLEtBQWUsRUFBRSxJQUFpQixFQUFFLFNBQWtCO1FBQzVFLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxTQUFTLEVBQUU7WUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNuRCxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzFGO2FBQU07WUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMzQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzFGO1FBQ0QsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ25CLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJO1lBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7O1lBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO0lBQy9CLENBQUM7SUFFTyx5QkFBeUIsQ0FBQyxTQUFtQixFQUFFLElBQWlCLEVBQUUsWUFBNEIsSUFBSTtRQUN0RyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUNoQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ2hELE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUM3QixJQUFJLE1BQU0sR0FBRyxRQUFRLElBQUksTUFBTSxHQUFHLFFBQVEsRUFBRTtnQkFDeEMsTUFBTSxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUM5RDtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ2hELE9BQU87U0FDVjtRQUVELElBQUksU0FBUyxLQUFLLElBQUksRUFBRTtZQUNwQixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDZixNQUFNLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQztZQUN6QixNQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDOUIsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztZQUMzQixTQUFTO2dCQUNMLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtvQkFDaEIsTUFBTSxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksOEJBQThCLENBQUMsQ0FBQztpQkFDakU7Z0JBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ3JDLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO29CQUM1QixNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7b0JBQzVCLE1BQU07aUJBQ1Q7Z0JBQ0QsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFLLENBQUM7YUFDdkI7WUFDRCxTQUFTLEdBQUcsTUFBTSxHQUFHLFFBQVEsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDO1NBQ3REO1FBRUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVPLHdCQUF3QixDQUFDLFNBQW1CLEVBQUUsSUFBaUIsRUFBRSxZQUE0QixJQUFJO1FBQ3JHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssU0FBUztZQUFFLE1BQU0sS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFFaEYsSUFBSSxTQUFTLEtBQUssSUFBSSxFQUFFO1lBQ3BCLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxJQUFLLENBQUM7WUFDNUIsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7Z0JBQzVCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO2dCQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMzRCxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksU0FBUyxDQUFDLElBQUksS0FBSyxJQUFJO29CQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDOztvQkFDL0MsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7Z0JBQzNCLE9BQU87YUFDVjtZQUVELElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNmLFNBQVM7Z0JBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ3JDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSyxDQUFDO2dCQUNwQixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtvQkFDNUIsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO29CQUM1QixNQUFNO2lCQUNUO2FBQ0o7WUFDRCxTQUFTLEdBQUcsTUFBTSxHQUFHLFFBQVEsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDO1NBQ3REO1FBRUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVPLFNBQVMsQ0FBQyxJQUFjLEVBQUUsS0FBWSxFQUFFLElBQVc7UUFDdkQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN2QixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbEIsU0FBUztZQUNMLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDeEIsSUFBSSxJQUFJLEtBQUssSUFBSTtnQkFBRSxNQUFNO1lBQ3pCLFNBQVMsSUFBSSxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDeEMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNiLElBQUksU0FBUyxJQUFJLEdBQUcsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsSUFBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3BEO1NBQ0o7UUFDRCxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNuQixLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztRQUNoQixNQUFNLElBQUksR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEQsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVPLE1BQU0sQ0FBQyxLQUFjO1FBQ3pCLE1BQU0sTUFBTSxHQUFHLElBQUksT0FBTyxFQUFZLENBQUM7UUFDdkMsTUFBTSxHQUFHLEdBQUcsSUFBSSxPQUFPLEVBQXFCLENBQUM7UUFDN0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ2xDLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7WUFDMUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDL0I7UUFDRCxNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBb0IsQ0FBQztRQUMzQyxTQUFTLFFBQVEsQ0FBQyxJQUFZLEVBQUUsT0FBZTtZQUMzQyxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLElBQUksR0FBRztnQkFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztnQkFDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFFRCxJQUFJLEtBQUssR0FBb0IsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO1lBQ3JCLFFBQVEsQ0FBQyxjQUFjLEVBQUUsK0JBQStCLENBQUMsQ0FBQztTQUM3RDtRQUNELE9BQU8sS0FBSyxLQUFLLElBQUksRUFBRTtZQUNuQixNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xCLEtBQUssTUFBTSxFQUFFLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRTtnQkFDeEIsSUFBSSxFQUFFLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTtvQkFDcEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksbUJBQW1CLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztpQkFDcEU7Z0JBQ0QsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNmO1lBQ0QsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7U0FDdEI7UUFDRCxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNuQixLQUFLLE1BQU0sRUFBRSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDaEMsSUFBSSxFQUFFLFlBQVksaUJBQWlCLEVBQUU7Z0JBQ2pDLElBQUksRUFBRSxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7b0JBQ25CLElBQUksQ0FBQyxLQUFLO3dCQUFFLFNBQVM7b0JBQ3JCLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLG1CQUFtQixFQUFFLHNCQUFzQixDQUFDLENBQUM7b0JBQ2pFLFNBQVM7aUJBQ1o7Z0JBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQ2QsSUFBSSxFQUFFLENBQUMsS0FBSyxLQUFLLHFCQUFxQjt3QkFBRSxTQUFTO29CQUNqRCxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxtQkFBbUIsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO2lCQUNsRTtnQkFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3ZCLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO29CQUNqQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxtQkFBbUIsRUFBRSxrQkFBa0IsVUFBVSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQ3RIO2FBQ0o7U0FDSjtRQUNELElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7WUFDbkIsS0FBSyxNQUFNLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLE1BQU0sRUFBRTtnQkFDbkMsS0FBSyxNQUFNLE9BQU8sSUFBSSxRQUFRLEVBQUU7b0JBQzVCLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksS0FBSyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ3BEO2FBQ0o7WUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEI7SUFDTCxDQUFDO0lBRU8sVUFBVSxDQUFDLHdCQUFpQztRQUNoRCxJQUFJLElBQUksQ0FBQyxVQUFVO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSx3QkFBd0IsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2Y7YUFBTTtZQUNILElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLEVBQUU7Z0JBQzNCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO2dCQUM3QyxJQUFJLE9BQU8sS0FBSyxJQUFJLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQzFDLE1BQU0sS0FBSyxDQUFDLDZFQUE2RSxDQUFDLENBQUM7aUJBQzlGO2FBQ0o7U0FDSjtRQUVELG1CQUFtQjtRQUNuQixNQUFNLE1BQU0sR0FBRyxJQUFJLGtDQUFxQixFQUFFLENBQUM7UUFDM0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDM0IsT0FBTyxJQUFJLEtBQUssSUFBSSxFQUFFO1lBQ2xCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFLLENBQUM7WUFDeEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN6QixJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFO2dCQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUkseUJBQVksQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLHdCQUF3QixFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ2pGO2lCQUFNO2dCQUNILElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDN0M7WUFDRCxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztTQUNwQjtRQUVELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDekIsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtZQUM1QyxNQUFNLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1NBQzVEO1FBRUQscUJBQXFCO1FBQ3JCLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7WUFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdkIsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3RCO1FBRUQsSUFBSSx3QkFBd0IsRUFBRTtZQUMxQixnQkFBZ0I7WUFDaEIsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztZQUN4QixNQUFNLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFdEQsc0JBQXNCO1lBQ3RCLElBQUksWUFBWSxHQUE0QixJQUFJLENBQUM7WUFDakQsTUFBTSxTQUFTLEdBQXVCLEVBQUUsQ0FBQztZQUV6QyxNQUFNLEtBQUssR0FBWSxFQUFFLENBQUM7WUFDMUIsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNsQyxJQUFJLENBQUMsQ0FBQyxJQUFJLFlBQVksS0FBSyxDQUFDO29CQUFFLFNBQVM7Z0JBQ3ZDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDcEI7WUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFMUMsSUFBSSxRQUEyQixDQUFDO1lBRWhDLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFO2dCQUN0QixJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssSUFBSTtvQkFBRSxTQUFTO2dCQUN4QyxJQUFJLFlBQVksS0FBSyxJQUFJLEVBQUU7b0JBQ3ZCLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxZQUFZLENBQUMsWUFBWTt3QkFBRSxTQUFTO29CQUV4RCxZQUFZLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7b0JBQ3RDLFlBQVksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztvQkFDckMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDN0IsUUFBUyxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQ2pFO2dCQUNELFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ2hCLFlBQVksR0FBRztvQkFDWCxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU07b0JBQ3pCLFVBQVUsRUFBRSxDQUFDO29CQUNiLFVBQVUsRUFBRSxDQUFDO2lCQUNoQixDQUFDO2FBQ0w7WUFDRCxJQUFJLFlBQVksS0FBSyxJQUFJLEVBQUU7Z0JBQ3ZCLFlBQVksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUMvQixZQUFZLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ3JDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzdCLFFBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ2pFO1lBRUQsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDNUMsS0FBSyxNQUFNLElBQUksSUFBSSxTQUFTLEVBQUU7b0JBQzFCLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUNwQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDbEMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQ3JDO2FBQ0o7U0FDSjtRQUVELElBQUksSUFBSSxDQUFDLGVBQWUsS0FBSyxDQUFDLEVBQUU7WUFDNUIsb0JBQW9CO1lBQ3BCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztZQUN2QyxNQUFNLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ25FLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV0RCx3QkFBd0I7WUFDeEIsSUFBSTtnQkFDQSxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDdEI7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDVixJQUFJLEdBQUcsWUFBWSx5QkFBWSxFQUFFO29CQUM3QixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNuQjtxQkFBTTtvQkFDSCxNQUFNLEdBQUcsQ0FBQztpQkFDYjthQUNKO1lBQ0QsSUFBSSxNQUFNLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTtnQkFDdkIsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ3RCO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQWE7UUFDbEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUNELFNBQVMsQ0FBQyxLQUFhO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFDRCxRQUFRLENBQUMsS0FBYTtRQUNsQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBQ0QsU0FBUyxDQUFDLEtBQWE7UUFDbkIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUNELFFBQVEsQ0FBQyxLQUFhO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFDRCxTQUFTLENBQUMsS0FBYTtRQUNuQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBQ0QsUUFBUSxDQUFDLEtBQWE7UUFDbEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUNELFNBQVMsQ0FBQyxLQUFhO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFDRCxTQUFTLENBQUMsS0FBYTtRQUNuQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBQ0QsUUFBUSxDQUFDLEtBQWE7UUFDbEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUNELFFBQVEsQ0FBQyxLQUFhO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFDRCxTQUFTLENBQUMsS0FBYTtRQUNuQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBQ0QsUUFBUSxDQUFDLEtBQWE7UUFDbEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUNELFNBQVMsQ0FBQyxLQUFhO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFDRCxRQUFRLENBQUMsS0FBYTtRQUNsQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBQ0QsU0FBUyxDQUFDLEtBQWE7UUFDbkIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUNELFNBQVMsQ0FBQyxLQUFhO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFDRCxRQUFRLENBQUMsS0FBYTtRQUNsQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsSUFBSSxDQUFDLElBQVksRUFBRSxZQUFxQixLQUFLO1FBQ3pDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxxQkFBcUI7UUFDakIsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLElBQUksRUFBRTtZQUMzQixNQUFNLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUM5QjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ2Q7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssSUFBSTtZQUFFLE1BQU0sS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzFELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO1FBQzNDLElBQUksS0FBSyxLQUFLLElBQUk7WUFBRSxNQUFNLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQzNELEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4QyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRO2dCQUFFLFNBQVM7WUFDdkMsUUFBUSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNuQixLQUFLLGdCQUFnQjtvQkFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3hCLE1BQU07Z0JBQ1YsS0FBSyxnQkFBZ0I7b0JBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDaEQsTUFBTTtnQkFDVixLQUFLLGdCQUFnQjtvQkFDakIsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTt3QkFDbkIsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ3JCLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUTs0QkFBRSxNQUFNLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO3dCQUNqRixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3FCQUNyQzt5QkFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO3dCQUMxQixNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDckIsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFROzRCQUFFLE1BQU0sS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7d0JBQ2pGLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUN0QixJQUFJLE9BQU8sRUFBRSxLQUFLLFFBQVE7NEJBQUUsTUFBTSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQzt3QkFDbEYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3FCQUM5Qzt5QkFBTTt3QkFDSCxNQUFNLEtBQUssQ0FBQywwQ0FBMEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7cUJBQ3pFO29CQUNELE1BQU07Z0JBQ1YsS0FBSyxjQUFjO29CQUNmLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEtBQUssSUFBSTt3QkFBRSxNQUFNLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO29CQUN0RixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUMsQ0FBQztvQkFDM0csTUFBTTtnQkFDVjtvQkFDSSxNQUFNLEtBQUssQ0FBQyx3QkFBd0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7YUFDN0Q7U0FDSjtRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDOUIsTUFBTSxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDL0I7UUFDRCxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssSUFBSSxFQUFFO1lBQzNCLE1BQU0sS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzlCO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDZDtRQUVELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRyxDQUFDO1FBQ3BDLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFZLEVBQUUsS0FBYSxFQUFFLFlBQXFCLEtBQUs7UUFDekQsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFBRSxNQUFNLEtBQUssQ0FBQyxHQUFHLElBQUkscUJBQXFCLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFNBQVM7WUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsV0FBVyxDQUFDLFFBQWdCLEVBQUUsVUFBa0I7UUFDNUMsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNuRCxNQUFNLE1BQU0sR0FBRyxJQUFJLDJCQUFjLENBQUMsVUFBVSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRTdHLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLE1BQU0sS0FBSyxHQUE2QixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRCxJQUFJLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUM3QixTQUFTLE9BQU8sQ0FBQyxLQUEyQjtZQUN4QyxJQUFJLEtBQUssS0FBSyxJQUFJO2dCQUFFLE9BQU87WUFFM0IsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ1osSUFBSSxnQkFBZ0IsRUFBRTtnQkFDbEIsR0FBRyxHQUFHLFFBQVEsQ0FBQztnQkFDZixJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7b0JBQ1YsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7aUJBQzFDO2FBQ0o7WUFFRCxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDekIsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO2dCQUNoQixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7WUFDRCxJQUFJLEtBQUssS0FBSyxLQUFLLEVBQUU7Z0JBQ2pCLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdkc7UUFDTCxDQUFDO1FBRUQsTUFBTSxTQUFTLEdBQUcsQ0FBQyxJQUFZLEVBQVksRUFBRTtZQUN6QyxJQUFJLFNBQVMsR0FBa0IsSUFBSSxDQUFDO1lBQ3BDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUNkLFNBQVMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDOUMsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQzFDLElBQUksUUFBUSxLQUFLLENBQUMsQ0FBQztvQkFBRSxNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMseUJBQXlCLElBQUksR0FBRyxDQUFDLENBQUM7Z0JBRTFFLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUMxRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDaEQsSUFBSSxNQUFNLEtBQUssRUFBRTtvQkFBRSxNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQzNFLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzFGLElBQUksR0FBRyxLQUFLLElBQUk7b0JBQUUsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLDRCQUE0QixVQUFVLEdBQUcsQ0FBQyxDQUFDO2dCQUNoRixTQUFTLEdBQUcsR0FBSSxDQUFDO2FBQ3BCO1lBRUQsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNwQyxJQUFJLElBQUksSUFBSSxJQUFJO2dCQUFFLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsSUFBSSxHQUFHLENBQUMsQ0FBQztZQUV2RSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3ZCLElBQUksU0FBUyxLQUFLLElBQUk7Z0JBQUUsS0FBSyxJQUFJLFNBQVMsQ0FBQztZQUMzQyxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDO1FBQ3BFLENBQUMsQ0FBQztRQUVGLE1BQU0sZUFBZSxHQUFHLENBQUMsY0FBdUIsRUFBRSxRQUF3QixFQUFRLEVBQUU7WUFDaEYsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3BELElBQUksWUFBWSxLQUFLLElBQUk7Z0JBQUUsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDdkUsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLElBQUk7Z0JBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdkYsTUFBTSxFQUFFLEdBQUcsSUFBSSxVQUFVLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0RyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDN0IsT0FBTyxJQUFJLEtBQUssQ0FBQztZQUNqQixRQUFRLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDcEMsSUFBSSxjQUFjO2dCQUFFLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7O2dCQUM1QyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDYixrQkFBa0IsR0FBRyxFQUFFLENBQUM7WUFDeEIsYUFBYSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNyQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDeEIsQ0FBQyxDQUFDO1FBRUYsTUFBTSxRQUFRLEdBQUcsQ0FBQyxPQUFlLEVBQUUsU0FBa0IsRUFBVyxFQUFFO1lBQzlELFFBQVEsT0FBTyxFQUFFO2dCQUNiLEtBQUssT0FBTyxDQUFDLENBQUM7b0JBQ1YsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNyRCxJQUFJLElBQUksR0FBZ0MsSUFBSSxDQUFDO29CQUM3QyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7d0JBQ2QsSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3pCLElBQUksSUFBSSxJQUFJLElBQUk7NEJBQUUsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLDJCQUEyQixJQUFJLEdBQUcsQ0FBQyxDQUFDO3FCQUM1RTtvQkFDRCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzlCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ3ZGLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTt3QkFDbkIsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO3FCQUMvRDtvQkFDRCxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7d0JBQ2YsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFOzRCQUNmLEtBQUssYUFBYSxDQUFDLElBQUk7Z0NBQ25CLFFBQVEsR0FBRyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7Z0NBQ2xDLE1BQU07NEJBQ1YsS0FBSyxhQUFhLENBQUMsSUFBSTtnQ0FDbkIsUUFBUSxHQUFHLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQ0FDbEMsTUFBTTs0QkFDVixLQUFLLGFBQWEsQ0FBQyxLQUFLO2dDQUNwQixRQUFRLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQztnQ0FDeEIsTUFBTTt5QkFDYjtxQkFDSjtvQkFDRCxJQUFJO3dCQUNBLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztxQkFDekM7b0JBQUMsT0FBTyxHQUFHLEVBQUU7d0JBQ1YsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDbkM7b0JBQ0QsT0FBTyxJQUFJLENBQUM7aUJBQ2Y7Z0JBQ0QsS0FBSyxLQUFLLENBQUMsQ0FBQztvQkFDUixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzlCLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDNUIsSUFBSTt3QkFDQSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO3FCQUM1RTtvQkFBQyxPQUFPLEdBQUcsRUFBRTt3QkFDVixNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3FCQUNuQztvQkFDRCxPQUFPLElBQUksQ0FBQztpQkFDZjtnQkFDRCxLQUFLLE1BQU07b0JBQ1AsSUFBSTt3QkFDQSxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO3FCQUM5QjtvQkFBQyxPQUFPLEdBQUcsRUFBRTt3QkFDVixNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3FCQUNuQztvQkFDRCxPQUFPLElBQUksQ0FBQztnQkFDaEI7b0JBQ0ksT0FBTyxLQUFLLENBQUM7YUFDcEI7UUFDTCxDQUFDLENBQUM7UUFFRixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUMsSUFBSSxZQUFZLEtBQUssRUFBRTtZQUFFLE9BQU87UUFDaEMsSUFBSSxPQUFPLEdBQUcsWUFBWSxDQUFDO1FBQzNCLE1BQU0sUUFBUSxHQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFMUMsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUV2QyxJQUFJLGtCQUFrQixHQUE2QixJQUFJLENBQUM7UUFDeEQsSUFBSSxhQUFhLEdBQTBCLElBQUksQ0FBQztRQUVoRCxNQUFNLElBQUksR0FBVSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNmLElBQUksY0FBYyxHQUFHLEtBQUssQ0FBQztZQUMzQixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDdkIsUUFBUSxPQUFPLEVBQUU7Z0JBQ2IsS0FBSyxRQUFRO29CQUNULElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFO3dCQUN2QyxNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztxQkFDaEQ7b0JBQ0QsT0FBTztnQkFDWCxLQUFLLFlBQVksQ0FBQyxDQUFDO29CQUNmLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUMxRixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDcEMsT0FBTztpQkFDVjtnQkFDRCxLQUFLLE9BQU8sQ0FBQztnQkFDYixLQUFLLE9BQU87b0JBQ1IsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO29CQUN4QixNQUFNO2dCQUNWLEtBQUssS0FBSztvQkFDTixjQUFjLEdBQUcsSUFBSSxDQUFDO29CQUN0QixNQUFNO2dCQUNWO29CQUNJLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLEtBQUssTUFBTSxFQUFFO3dCQUMvQyxVQUFVLEdBQUcsSUFBSSxDQUFDO3FCQUNyQjtvQkFDRCxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDO3dCQUFFLE9BQU87b0JBQ3JDLE1BQU07YUFDYjtZQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ2xCLFFBQVEsRUFBRSxDQUFDO2dCQUVYLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFFcEIsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNwQixlQUFlLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUN4QyxTQUFTO2lCQUNaO3FCQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDNUIsZUFBZSxDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFDM0MsU0FBUztpQkFDWjtnQkFFRCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUVqQyxJQUFJLFFBQXVCLENBQUM7Z0JBQzVCLElBQUk7b0JBQ0EsUUFBUSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQ3ZGO2dCQUFDLE9BQU8sR0FBRyxFQUFFO29CQUNWLFFBQVEsR0FBRyxJQUFJLENBQUM7aUJBQ25CO2dCQUNELElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtvQkFDbkIsU0FBUztvQkFDVCxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTt3QkFDakIsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLDRCQUE0QixRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDekU7b0JBQ0QsT0FBTyxJQUFJLElBQUksQ0FBQztvQkFDaEIsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDdkI7cUJBQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUM1QixnQkFBZ0I7b0JBQ2hCLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzdCLElBQUksR0FBRyxLQUFLLElBQUk7d0JBQUUsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLDZCQUE2QixLQUFLLEdBQUcsQ0FBQyxDQUFDO29CQUM1RSxNQUFNLE9BQU8sR0FBRyxJQUFJLDJCQUFjLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFFMUYsR0FBRyxFQUFFLENBQUM7b0JBQ04sTUFBTSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsWUFBWSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7b0JBRXhELE1BQU0sS0FBSyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztvQkFDN0MsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTt3QkFDcEIsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFOzRCQUNwQixNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzFCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQ25DLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLGFBQWEsQ0FBQyxJQUFJLEVBQUU7Z0NBQ2xELE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsUUFBUSxFQUFFLENBQUMsQ0FBQzs2QkFDM0Q7NEJBQ0QsSUFBSSxjQUFjO2dDQUFFLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7O2dDQUM1QyxPQUFPLENBQUMsSUFBSyxDQUFDLElBQUssQ0FBQyxDQUFDOzRCQUMxQixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt5QkFDdEI7d0JBQ0QsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTs0QkFDcEIsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0NBQ3hCLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQywyQkFBMkIsT0FBTyxFQUFFLENBQUMsQ0FBQzs2QkFDNUQ7NEJBQ0QsUUFBUSxPQUFPLEVBQUU7Z0NBQ2IsS0FBSyxLQUFLO29DQUNOLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQ0FDVixNQUFNO2dDQUNWLEtBQUssS0FBSztvQ0FDTixJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7b0NBQ1YsTUFBTTtnQ0FDVixLQUFLLEtBQUs7b0NBQ04sSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO29DQUNWLE1BQU07Z0NBQ1YsS0FBSyxLQUFLO29DQUNOLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQ0FDVixNQUFNO2dDQUNWLEtBQUssS0FBSztvQ0FDTixJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7b0NBQ1YsTUFBTTtnQ0FDVixLQUFLLEtBQUs7b0NBQ04sTUFBTTtnQ0FDVjtvQ0FDSSxNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLE9BQU8sRUFBRSxDQUFDLENBQUM7NkJBQzVEO3lCQUNKO3FCQUNKO29CQUVELE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3JELE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxFQUFFLGlCQUFpQixFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUN0RyxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7d0JBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQzdCLFFBQVEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQzt3QkFDcEMsT0FBTyxJQUFJLEtBQUssQ0FBQztxQkFDcEI7eUJBQU07d0JBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDZCxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7NEJBQ2IsUUFBUSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDOzRCQUNwQyxPQUFPLElBQUksS0FBSyxDQUFDO3lCQUNwQjs2QkFBTTs0QkFDSCxRQUFRLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7NEJBQ3RDLE9BQU8sSUFBSSxNQUFNLENBQUM7NEJBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7eUJBQ2pCO3FCQUNKO29CQUNELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3JCO3FCQUFNO29CQUNILE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7b0JBQzdDLElBQUksSUFBSSxFQUFFO3dCQUNOLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQzt3QkFDL0IsSUFBSSxJQUFJLEtBQUssSUFBSTs0QkFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2pDLE9BQU8sSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzt3QkFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDZixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7cUJBQ25DO3lCQUFNO3dCQUNILE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUMvQixJQUFJLEVBQUUsWUFBWSxRQUFRLEVBQUU7NEJBQ3hCLE9BQU8sSUFBSSxJQUFJLENBQUM7NEJBQ2hCLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7NEJBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO3lCQUN2Qjs2QkFBTSxJQUFJLEVBQUUsWUFBWSxVQUFVLEVBQUU7NEJBQ2pDLE9BQU8sSUFBSSxLQUFLLENBQUM7NEJBQ2pCLFFBQVEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQzs0QkFDcEMsSUFBSSxFQUFFLENBQUMsSUFBSSxLQUFLLGFBQWEsQ0FBQyxJQUFJO2dDQUFFLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDOzRCQUMvRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDYixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNiLGtCQUFrQixHQUFHLEVBQUUsQ0FBQzt5QkFDM0I7NkJBQU0sSUFBSSxVQUFVLEVBQUU7NEJBQ25CLE9BQU8sSUFBSSxRQUFRLENBQUM7NEJBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQ2pCLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7eUJBQzVCOzZCQUFNOzRCQUNILE9BQU8sSUFBSSxLQUFLLENBQUM7NEJBQ2pCLFFBQVEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQzs0QkFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDYixJQUFJLEVBQUUsWUFBWSxLQUFLLEVBQUU7Z0NBQ3JCLGtCQUFrQixHQUFHLEVBQUUsQ0FBQzs2QkFDM0I7aUNBQU0sSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFO2dDQUNuQixNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDOzZCQUM1RDtpQ0FBTTtnQ0FDSCxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQ0FDL0Isa0JBQWtCLEdBQUcsS0FBSyxDQUFDO2dDQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7NkJBQzlCO3lCQUNKO3dCQUNELGFBQWEsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7cUJBQ3hDO2lCQUNKO2FBQ0o7U0FDSjtRQUVELE1BQU0sQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQztRQUU3RSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdkIsSUFBSTtnQkFDQSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUM1RDtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNWLElBQUEsdUNBQWtCLEVBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3hCLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDbkM7WUFDRCxPQUFPO1NBQ1Y7UUFFRCxPQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN2QjtTQUNKO1FBRUQsTUFBTSxFQUFFLEdBQUksSUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xDLElBQUksT0FBTyxFQUFFLEtBQUssVUFBVSxFQUFFO1lBQzFCLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDcEU7UUFDRCxJQUFJO1lBQ0EsSUFBSSxDQUFDLEdBQUcsR0FBRyxhQUFhLENBQUM7WUFDekIsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDckIsSUFBSSxrQkFBa0IsS0FBSyxJQUFJLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsa0JBQWtCLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQzthQUNqSDtTQUNKO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDVixJQUFBLHVDQUFrQixFQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDbkM7SUFDTCxDQUFDO0lBRUQsT0FBTyxDQUFDLE1BQWMsRUFBRSxPQUF1QyxFQUFFLHdCQUF3QztRQUNyRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO1lBQ2pCLEtBQUssTUFBTSxJQUFJLElBQUksT0FBTyxFQUFFO2dCQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNuQztTQUNKO1FBRUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxrQ0FBcUIsRUFBRSxDQUFDO1FBRXpDLFNBQVM7WUFDTCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLFFBQVEsR0FBRyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ2xGLElBQUk7Z0JBQ0EsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDMUM7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDVixJQUFJLEdBQUcsWUFBWSx5QkFBWSxFQUFFO29CQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNkLElBQUksd0JBQXdCLEVBQUU7d0JBQzFCLEdBQUcsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLEVBQUUsUUFBUSxDQUFDLENBQUM7cUJBQ2xEO2lCQUNKO3FCQUFNO29CQUNILE1BQU0sR0FBRyxDQUFDO2lCQUNiO2FBQ0o7WUFDRCxJQUFJLE9BQU8sS0FBSyxDQUFDLENBQUM7Z0JBQUUsTUFBTTtZQUMxQixDQUFDLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQztZQUNoQixVQUFVLEVBQUUsQ0FBQztTQUNoQjtRQUVELElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUk7WUFBRSxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFM0QsSUFBSTtZQUNBLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekI7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNWLElBQUksR0FBRyxZQUFZLHlCQUFZLEVBQUU7Z0JBQzdCLElBQUksd0JBQXdCLEVBQUU7b0JBQzFCLEdBQUcsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUEsZ0JBQVMsRUFBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN2RztnQkFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNkLE1BQU0sSUFBSSxDQUFDO2FBQ2Q7aUJBQU07Z0JBQ0gsTUFBTSxHQUFHLENBQUM7YUFDYjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELElBQUk7UUFDQSxTQUFTLFVBQVUsQ0FBSSxLQUFVLEVBQUUsTUFBMEI7WUFDekQsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUU7Z0JBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNoQjtZQUNELEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZixDQUFDO1FBQ0QsU0FBUyxZQUFZLENBQUMsRUFBcUI7WUFDdkMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLEVBQUUsQ0FBQyxJQUFLLENBQUMsQ0FBQztZQUN4QyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUM7WUFDdEMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDeEIsQ0FBQztRQUVELE1BQU0sR0FBRyxHQUFHLElBQUksMkJBQVksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwRCxNQUFNLE1BQU0sR0FBWSxFQUFFLENBQUM7UUFDM0IsTUFBTSxJQUFJLEdBQWlCLEVBQUUsQ0FBQztRQUM5QixLQUFLLE1BQU0sRUFBRSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDaEMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSyxDQUFDO2dCQUFFLFNBQVM7WUFDdkMsSUFBSSxFQUFFLFlBQVksS0FBSyxFQUFFO2dCQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ25CO2lCQUFNLElBQUksRUFBRSxZQUFZLFVBQVUsRUFBRTtnQkFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNqQjtTQUNKO1FBRUQsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDbkQsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLFVBQVUsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDakMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNaLFVBQVUsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDL0IsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDekIsT0FBTyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELFFBQVEsQ0FBQyxXQUFtQixFQUFFLFVBQW1CO1FBQzdDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM3QixNQUFNLE1BQU0sR0FBWSxFQUFFLENBQUM7UUFDM0IsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxDQUFDLElBQUksWUFBWSxLQUFLLENBQUM7Z0JBQUUsU0FBUztZQUN2QyxJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsUUFBUTtnQkFBRSxTQUFTO1lBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDckI7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUV4RCxNQUFNLEdBQUcsR0FBRyxJQUFJLDJCQUFZLEVBQUUsQ0FBQztRQUMvQixNQUFNLEVBQUUsR0FBRyxJQUFJLDJCQUFZLEVBQUUsQ0FBQztRQUU5QixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdEIsSUFBSSxPQUFPLFlBQVksS0FBSyxFQUFFO1lBQzFCLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQztTQUMvQjtRQUNELEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxPQUFPLGlCQUFpQixXQUFXLFVBQVUsQ0FBQyxDQUFDO1FBQ3JFLEVBQUUsQ0FBQyxPQUFPLENBQUMsNEJBQTRCLFdBQVcsZUFBZSxDQUFDLENBQUM7UUFDbkUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLFdBQVcsZUFBZSxDQUFDLENBQUM7UUFDbkQsR0FBRyxDQUFDLE9BQU8sQ0FBQywrQ0FBK0MsV0FBVyxTQUFTLENBQUMsQ0FBQztRQUNqRixNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxPQUFPLENBQUMsOENBQThDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsS0FBSyxJQUFJLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxDQUFDO1FBRTdILEVBQUUsQ0FBQyxPQUFPLENBQUMsbUNBQW1DLENBQUMsQ0FBQztRQUNoRCxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDN0IsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUk7WUFDckIsT0FBTyxTQUFTLEtBQUssU0FBUyxFQUFFO2dCQUM1QixJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTTtvQkFBRSxNQUFNO2dCQUNoQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUNyQixFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNuQixNQUFNLEdBQUcsRUFBRSxDQUFDO2lCQUNmO2dCQUNELEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUM1QjtZQUNELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sSUFBSSxJQUFJLENBQUM7WUFDZixJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQztnQkFBRSxNQUFNLElBQUksR0FBRyxDQUFDO1lBQ3BDLE1BQU0sSUFBSSxHQUFHLENBQUM7WUFDZCxNQUFNLElBQUksR0FBRyxDQUFDO1NBQ2pCO1FBQ0QsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQixFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25CLG9CQUFvQjtRQUNwQixJQUFJLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDcEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsVUFBVSxJQUFJLENBQUMsQ0FBQztZQUNoRCxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsVUFBVSxNQUFNLENBQUMsQ0FBQztZQUN4QyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2Q7YUFBTTtZQUNILEVBQUUsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUNwQztRQUNELEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFVixLQUFLLE1BQU0sRUFBRSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDaEMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSyxDQUFDO2dCQUFFLFNBQVM7WUFDdkMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztZQUNuQixJQUFJLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7Z0JBQUUsU0FBUztZQUNwRCxJQUFJLE1BQWMsQ0FBQztZQUNuQixJQUFJLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUMxQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUIsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDO2FBQ2hEO2lCQUFNO2dCQUNILE1BQU0sR0FBRyxZQUFZLEdBQUcsSUFBSSxDQUFDO2FBQ2hDO1lBRUQsSUFBSSxFQUFFLFlBQVksS0FBSyxFQUFFO2dCQUNyQixFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQztnQkFDN0IsRUFBRSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7Z0JBQ25ELEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2pCLEdBQUcsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLElBQUksaUJBQWlCLENBQUMsQ0FBQzthQUN0RDtpQkFBTSxJQUFJLEVBQUUsWUFBWSxVQUFVLEVBQUU7Z0JBQ2pDLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztnQkFDdEMsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtvQkFDakIsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ25DLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTt3QkFDZCxJQUFJLEVBQUUsQ0FBQyxTQUFTLEtBQUssSUFBSSxFQUFFOzRCQUN2QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2hFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDOzRCQUN2RCxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sU0FBUyxRQUFRLENBQUMsQ0FBQzs0QkFDcEMsRUFBRSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLE9BQU8sT0FBTyxJQUFJLENBQUMsQ0FBQzs0QkFDekUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDakIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLFNBQVMsV0FBVyxDQUFDLENBQUM7NEJBQ3ZDLEVBQUUsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLElBQUksQ0FBQyxNQUFNLE9BQU8sR0FBRyxPQUFPLE9BQU8sSUFBSSxDQUFDLENBQUM7NEJBQ3JFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ2pCLEdBQUcsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLFNBQVMsZ0JBQWdCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDOzRCQUMzRSxHQUFHLENBQUMsT0FBTyxDQUFDLHNCQUFzQixTQUFTLE1BQU0sSUFBSSxDQUFDLE1BQU0scUJBQXFCLENBQUMsQ0FBQzt5QkFDdEY7NkJBQU07NEJBQ0gsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLENBQUM7NEJBQzdCLEVBQUUsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLElBQUksQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQzs0QkFDM0QsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDakIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLENBQUM7NEJBQzlCLEVBQUUsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLElBQUksQ0FBQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQzs0QkFDdkQsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDakIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzt5QkFDckQ7cUJBQ0o7aUJBQ0o7Z0JBQ0QsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLE1BQU0sS0FBSyxDQUFDLENBQUM7Z0JBQy9CLEVBQUUsQ0FBQyxPQUFPLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBQzdDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2pCLEdBQUcsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLE1BQU0saUJBQWlCLENBQUMsQ0FBQzthQUN4RDtTQUNKO1FBQ0QsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1gsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQixJQUFJLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDcEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1osR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNwQjtRQUVELElBQUksT0FBTyxZQUFZLEtBQUssRUFBRTtZQUMxQixNQUFNLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakUsRUFBRSxDQUFDLE9BQU8sQ0FBQyw0Q0FBNEMsT0FBTyxDQUFDLE1BQU0sTUFBTSxJQUFJLFlBQVksQ0FBQyxDQUFDO1lBRTdGLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxnQ0FBZ0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDMUU7UUFFRCxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFlO1FBQ3ZCLE1BQU0sTUFBTSxHQUFHLElBQUksMkJBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVyQyxTQUFTLFNBQVMsQ0FBSSxNQUFzQjtZQUN4QyxNQUFNLEdBQUcsR0FBUSxFQUFFLENBQUM7WUFDcEIsU0FBUztnQkFDTCxNQUFNLElBQUksR0FBRyxNQUFNLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxJQUFJLEtBQUssSUFBSTtvQkFBRSxPQUFPLEdBQUcsQ0FBQztnQkFDOUIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNsQjtRQUNMLENBQUM7UUFFRCxTQUFTLFdBQVc7WUFDaEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixFQUFFLENBQUM7WUFDL0MsSUFBSSxJQUFJLEtBQUssRUFBRTtnQkFBRSxPQUFPLElBQUksQ0FBQztZQUU3QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbEMsT0FBTyxJQUFJLElBQUksQ0FBQztZQUNoQixPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFFRCxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDNUMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0QyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFFbEQsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQy9CLE1BQU0sR0FBRyxHQUFHLElBQUksWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLENBQUMsSUFBSSxjQUFjLENBQUM7UUFDM0MsR0FBRyxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUM7UUFFakMsS0FBSyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLE1BQU0sRUFBRTtZQUNqQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFBRSxNQUFNLEtBQUssQ0FBQyxHQUFHLElBQUkscUJBQXFCLENBQUMsQ0FBQztZQUNqRSxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDeEIsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3pCLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjtRQUNELEtBQUssTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDL0IsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQUUsTUFBTSxLQUFLLENBQUMsR0FBRyxJQUFJLHFCQUFxQixDQUFDLENBQUM7WUFDakUsTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFLHFCQUFxQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDNUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzFCO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDOztBQTV2Rkwsb0NBaXdGQztBQUhrQix3QkFBVyxHQUFHLElBQUksUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbkUsdUJBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2pFLHVCQUFVLEdBQUcsSUFBSSxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBR3RGLFNBQWdCLEdBQUc7SUFDZixPQUFPLElBQUksWUFBWSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ25ELENBQUM7QUFGRCxrQkFFQztBQUVELFNBQVMsaUJBQWlCLENBQUMsQ0FBa0I7SUFDekMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUM7SUFDNUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO1FBQ1osT0FBTyxJQUFJLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNsQztJQUNELE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEMsT0FBTyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQzlFLENBQUM7QUFFRCxTQUFTLElBQUksQ0FBQyxDQUFVO0lBQ3BCLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUTtRQUFFLE9BQU8sS0FBSyxTQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQzdELElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxFQUFFO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLENBQUM7WUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixPQUFPLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0tBQ2hDO0lBQ0QsT0FBTyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBQ0QsU0FBUyxJQUFJLENBQUMsQ0FBVTtJQUNwQixJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVE7UUFBRSxPQUFPLEtBQUssU0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUM3RCxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRTtRQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDO1lBQUUsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQzs7WUFDdkMsT0FBTyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztLQUNyQztJQUNELE9BQU8saUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQUNELFNBQVMsTUFBTSxDQUFDLENBQVU7SUFDdEIsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRO1FBQUUsT0FBTyxNQUFNLFNBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDOUQsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUU7UUFDdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUFFLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7O1lBQ3ZDLE9BQU8sTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7S0FDdEM7SUFDRCxPQUFPLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0QyxDQUFDO0FBRUQsTUFBTSxXQUFXLEdBQTJCO0lBQ3hDLEVBQUUsRUFBRSxLQUFLO0lBQ1QsR0FBRyxFQUFFLElBQUk7SUFDVCxFQUFFLEVBQUUsS0FBSztJQUNULEdBQUcsRUFBRSxJQUFJO0lBQ1QsRUFBRSxFQUFFLEtBQUs7SUFDVCxHQUFHLEVBQUUsSUFBSTtJQUNULEdBQUcsRUFBRSxJQUFJO0lBQ1QsRUFBRSxFQUFFLEtBQUs7SUFDVCxFQUFFLEVBQUUsS0FBSztJQUNULEdBQUcsRUFBRSxJQUFJO0lBQ1QsRUFBRSxFQUFFLEtBQUs7SUFDVCxHQUFHLEVBQUUsSUFBSTtJQUNULEVBQUUsRUFBRSxLQUFLO0lBQ1QsR0FBRyxFQUFFLElBQUk7SUFDVCxHQUFHLEVBQUUsSUFBSTtJQUNULEVBQUUsRUFBRSxLQUFLO0NBQ1osQ0FBQztBQU1GLE1BQU0sT0FBTztJQUNULFlBQTRCLElBQVksRUFBa0IsS0FBYTtRQUEzQyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQWtCLFVBQUssR0FBTCxLQUFLLENBQVE7SUFBRyxDQUFDOztBQUNwRCxnQkFBUSxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN4QyxxQkFBYSxHQUFHLElBQUksT0FBTyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNqRCxhQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBRTdELE1BQU0sTUFBTSxHQUFHLElBQUksR0FBRyxDQUFvRTtJQUN0RixDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUQsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTlELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3RCxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0QsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9ELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvRCxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0QsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9ELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUUvRCxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5RCxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUQsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5RCxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFOUQsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5RCxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUQsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5RCxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUQsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTlELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNELENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ2hFLENBQUMsQ0FBQztBQUVILE1BQU0sVUFBVSxHQUFhLEVBQUUsQ0FBQztBQUNoQyxLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksTUFBTSxFQUFFO0lBQzVDLElBQUksSUFBSSxLQUFLLElBQUk7UUFBRSxTQUFTO0lBQzVCLFVBQVUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7Q0FDeEM7QUFFRCxNQUFNLG9CQUFvQixHQUFHLElBQUksT0FBTyxFQUEwQyxDQUFDO0FBRW5GLFdBQWlCLEdBQUc7SUFDSCxRQUFJLEdBQVMsWUFBWSxDQUFDLFNBQVMsQ0FBQztJQUNqRCxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsSUFBQSxJQUFJLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1RCxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsSUFBQSxJQUFJLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzRCxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsSUFBQSxJQUFJLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsSUFBQSxJQUFJLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvRCxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsSUFBQSxJQUFJLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvRCxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsSUFBQSxJQUFJLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsSUFBQSxJQUFJLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvRCxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsSUFBQSxJQUFJLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvRCxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsSUFBQSxJQUFJLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRSxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsSUFBQSxJQUFJLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRSxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsSUFBQSxJQUFJLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRSxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsSUFBQSxJQUFJLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRSxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsSUFBQSxJQUFJLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRSxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsSUFBQSxJQUFJLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuRSxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsSUFBQSxJQUFJLENBQUMsWUFBWSxFQUFFLGFBQWEs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