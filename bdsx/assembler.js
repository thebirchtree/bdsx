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
    _polynominal(text, offset, lineNumber) {
        let res = polynominal_1.polynominal.parse(text, lineNumber, offset);
        for (const [name, value] of this.ids) {
            if (!(value instanceof Constant))
                continue;
            res = res.defineVariable(name, value.value);
        }
        return res;
    }
    _polynominalToAddress(text, offset, lineNumber) {
        const poly = this._polynominal(text, offset, lineNumber).asAdditive();
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
        function parseType(type) {
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
                const res = polynominal_1.polynominal.parseToNumber(braceInner);
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
        }
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
                    const value = this._polynominal(text, parser.lineNumber, parser.matchedIndex);
                    if (!(value instanceof polynominal_1.polynominal.Constant)) {
                        throw parser.error(`polynominal is not constant '${text}'`);
                    }
                    let valueNum = value.value;
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
                const constval = polynominal_1.polynominal.parseToNumber(param);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZW1ibGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXNzZW1ibGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUFpQztBQUNqQywrQkFBNEI7QUFDNUIscUNBQWtDO0FBQ2xDLCtDQUE0QztBQUM1Qyw2REFBMEQ7QUFDMUQsNkNBQW1HO0FBQ25HLGlDQUFnRDtBQUNoRCx3REFBbUU7QUFDbkUsd0RBQXFEO0FBRXJELElBQVksUUFtQlg7QUFuQkQsV0FBWSxRQUFRO0lBQ2hCLGdEQUFhLENBQUE7SUFDYixzQ0FBUSxDQUFBO0lBQ1IscUNBQUcsQ0FBQTtJQUNILHFDQUFHLENBQUE7SUFDSCxxQ0FBRyxDQUFBO0lBQ0gscUNBQUcsQ0FBQTtJQUNILHFDQUFHLENBQUE7SUFDSCxxQ0FBRyxDQUFBO0lBQ0gscUNBQUcsQ0FBQTtJQUNILHFDQUFHLENBQUE7SUFDSCxtQ0FBRSxDQUFBO0lBQ0YsbUNBQUUsQ0FBQTtJQUNGLHNDQUFHLENBQUE7SUFDSCxzQ0FBRyxDQUFBO0lBQ0gsc0NBQUcsQ0FBQTtJQUNILHNDQUFHLENBQUE7SUFDSCxzQ0FBRyxDQUFBO0lBQ0gsc0NBQUcsQ0FBQTtBQUNQLENBQUMsRUFuQlcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFtQm5CO0FBRUQsSUFBWSxhQWlCWDtBQWpCRCxXQUFZLGFBQWE7SUFDckIsaURBQUksQ0FBQTtJQUNKLGlEQUFJLENBQUE7SUFDSixpREFBSSxDQUFBO0lBQ0osaURBQUksQ0FBQTtJQUNKLGlEQUFJLENBQUE7SUFDSixpREFBSSxDQUFBO0lBQ0osaURBQUksQ0FBQTtJQUNKLGlEQUFJLENBQUE7SUFDSixpREFBSSxDQUFBO0lBQ0osaURBQUksQ0FBQTtJQUNKLG9EQUFLLENBQUE7SUFDTCxvREFBSyxDQUFBO0lBQ0wsb0RBQUssQ0FBQTtJQUNMLG9EQUFLLENBQUE7SUFDTCxvREFBSyxDQUFBO0lBQ0wsb0RBQUssQ0FBQTtBQUNULENBQUMsRUFqQlcsYUFB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RSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFDRCxRQUFRLENBQUMsQ0FBVyxFQUFFLFFBQTZCLEVBQUUsTUFBYztRQUMvRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFDRCxPQUFPLENBQUMsQ0FBVyxFQUFFLFFBQTZCLEVBQUUsTUFBYztRQUM5RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFDRCxRQUFRLENBQUMsQ0FBVyxFQUFFLFFBQTZCLEVBQUUsTUFBYztRQUMvRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFDRCxPQUFPLENBQUMsQ0FBVyxFQUFFLFFBQTZCLEVBQUUsTUFBYztRQUM5RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFDRCxRQUFRLENBQUMsQ0FBVyxFQUFFLFFBQTZCLEVBQUUsTUFBYztRQUMvRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFDRCxRQUFRLENBQUMsQ0FBVyxFQUFFLFFBQTZCLEVBQUUsTUFBYztRQUMvRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFDRCxPQUFPLENBQUMsQ0FBVyxFQUFFLFFBQTZCLEVBQUUsTUFBYztRQUM5RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFDRCxPQUFPLENBQUMsQ0FBVyxFQUFFLFFBQTZCLEVBQUUsTUFBYztRQUM5RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFDRCxRQUFRLENBQUMsQ0FBVyxFQUFFLFFBQTZCLEVBQUUsTUFBYztRQUMvRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFDRCxPQUFPLENBQUMsQ0FBVyxFQUFFLFFBQTZCLEVBQUUsTUFBYztRQUM5RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFDRCxRQUFRLENBQUMsQ0FBVyxFQUFFLFFBQTZCLEVBQUUsTUFBYztR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QUMsQ0FBQztRQUMxRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsUUFBUSxDQUFDLEVBQVksRUFBRSxFQUFZLEVBQUUsT0FBc0IsYUFBYSxDQUFDLEtBQUs7UUFDMUUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxTQUFTLENBQUMsRUFBWSxFQUFFLEVBQVksRUFBRSxRQUE2QixFQUFFLE1BQWMsRUFBRSxPQUFzQixhQUFhLENBQUMsS0FBSztRQUMxSCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVPLEtBQUssQ0FBQyxFQUFZLEVBQUUsRUFBWSxFQUFFLFFBQTZCLEVBQUUsTUFBYyxFQUFFLElBQW1CLEVBQUUsSUFBYTtRQUN2SCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlCLElBQUksSUFBSSxLQUFLLGFBQWEsQ0FBQyxJQUFJO1lBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7WUFDM0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsUUFBUSxDQUFDLEVBQVksRUFBRSxFQUFZLEVBQUUsT0FBc0IsYUFBYSxDQUFDLEtBQUs7UUFDMUUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEVB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TyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFDRCxRQUFRLENBQUMsSUFBYyxFQUFFLFFBQTZCLEVBQUUsTUFBYyxFQUFFLEdBQVcsRUFBRSxJQUFJLEdBQUcsYUFBYSxDQUFDLEtBQUs7UUFDM0csT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFDRCxRQUFRLENBQUMsSUFBYyxFQUFFLFFBQTZCLEVBQUUsTUFBYyxFQUFFLEdBQVcsRUFBRSxJQUFJLEdBQUcsYUFBYSxDQUFDLEtBQUs7UUFDM0csT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFDRCxRQUFRLENBQUMsSUFBYyxFQUFFLFFBQTZCLEVBQUUsTUFBYyxFQUFFLEdBQVcsRUFBRSxJQUFJLEdBQUcsYUFBYSxDQUFDLEtBQUs7UUFDM0csT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFDRCxRQUFRLENBQUMsSUFBYyxFQUFFLFFBQTZCLEVBQUUsTUFBYyxFQUFFLEdBQVcsRUFBRSxJQUFJLEdBQUcsYUFBYSxDQUFDLEtB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RyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1RCxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUQsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFOUQsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0QsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvRCxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0QsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9ELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvRCxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0QsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRS9ELENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUQsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5RCxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUQsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUU5RCxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5RCxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUQsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlELENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5RCxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFOUQsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDaEUsQ0FBQyxDQUFDO0FBRUgsTUFBTSxVQUFVLEdBQWEsRUFBRSxDQUFDO0FBQ2hDLEtBQUssTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxNQUFNLEVBQUU7SUFDNUMsSUFBSSxJQUFJLEtBQUssSUFBSTtRQUFFLFNBQVM7SUFDNUIsVUFBVSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztDQUN4QztBQUVELE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxPQUFPLEVBQTBDLENBQUM7QUFFbkYsV0FBaUIsR0FBRztJQUNILFFBQUksR0FBUyxZQUFZLENBQUMsU0FBUyxDQUFDO0lBQ2pELG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVELG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNELG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9ELG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9ELG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9ELG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9ELG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pFLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xFLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pFLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xFLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xFLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxjQUFjLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25FLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pFLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xFLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pFLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xFLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxJQUFBLElBQUksQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xFLG9CQUFvQixDQUFDLEdBQUcsQ0FB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