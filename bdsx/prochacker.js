"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.procHacker = exports.ProcHacker = void 0;
const colors = require("colors");
const assembler_1 = require("./assembler");
const symbols_1 = require("./bds/symbols");
const common_1 = require("./common");
const disassembler_1 = require("./disassembler");
const dll_1 = require("./dll");
const hacktool_1 = require("./hacktool");
const makefunc_1 = require("./makefunc");
const pdblegacy_1 = require("./pdblegacy");
const source_map_support_1 = require("./source-map-support");
const unlocker_1 = require("./unlocker");
const util_1 = require("./util");
function increaseStack(ignoreAreaOrOpts) {
    if (ignoreAreaOrOpts === undefined) {
        ignoreAreaOrOpts = {};
    }
    else if (ignoreAreaOrOpts instanceof Array) {
        ignoreAreaOrOpts = { ignoreArea: ignoreAreaOrOpts };
    }
    ignoreAreaOrOpts.stackOffset = (ignoreAreaOrOpts.stackOffset | 0) + 1;
    return ignoreAreaOrOpts;
}
const FREE_REGS = [assembler_1.Register.rax, assembler_1.Register.r10, assembler_1.Register.r11];
class AsmMover extends assembler_1.X64Assembler {
    constructor(origin, codesize) {
        super(new Uint8Array(32), 0);
        this.origin = origin;
        this.codesize = codesize;
        this.freeregs = new Set(FREE_REGS);
        this.inpos = 0;
    }
    getUnusing() {
        for (const r of this.freeregs.values()) {
            return r;
        }
        return null;
    }
    asmFromOrigin(oper) {
        const splits = oper.splits;
        const basename = splits[0];
        let ripDependedParam = null;
        const params = oper.parameters();
        for (const info of params) {
            switch (info.type) {
                case "r":
                    this.freeregs.delete(info.register);
                    break;
                case "rp":
                case "fp":
                    this.freeregs.delete(info.register);
                    if (info.register === assembler_1.Register.rip) {
                        ripDependedParam = info;
                    }
                    break;
                case "rrp":
                    this.freeregs.delete(info.register);
                    this.freeregs.delete(info.register2);
                    break;
            }
        }
        if ((basename.startsWith("j") || basename === "call") && splits.length === 2 && splits[1] === "c") {
            // jump
            const offset = this.inpos + oper.args[0] + oper.size;
            if (offset < 0 || offset > this.codesize) {
                const tmpreg = this.getUnusing();
                if (tmpreg === null)
                    throw Error(`Not enough free registers`);
                const jmp_r = assembler_1.asm.code[`${basename}_r`];
                if (jmp_r) {
                    this.mov_r_c(tmpreg, this.origin.add(offset));
                    jmp_r.call(this, tmpreg);
                }
                else {
                    const reversed = oper.reverseJump();
                    this[`${reversed}_label`]("!");
                    this.jmp64(this.origin.add(offset), tmpreg);
                    this.close_label("!");
                }
                this.inpos += oper.size;
                return;
            }
            else {
                // TOFIX: remap offset if the code size is changed when rewriting.
            }
        }
        else {
            if (ripDependedParam !== null) {
                const tmpreg = this.getUnusing();
                if (tmpreg === null)
                    throw Error(`Not enough free registers`);
                oper.args[ripDependedParam.argi] = tmpreg;
                oper.args[ripDependedParam.argi + 2] = 0;
                this.mov_r_c(tmpreg, this.origin.add(this.inpos + oper.size + ripDependedParam.offset));
                this[oper.splits.join("_")](...oper.args);
                this.inpos += oper.size;
                return;
            }
        }
        oper.code.apply(this, oper.args);
        this.inpos += oper.size;
    }
    moveCode(codes, key, required) {
        let ended = false;
        for (const oper of codes.operations) {
            const basename = oper.splits[0];
            if (ended) {
                if (oper.code === assembler_1.asm.code.nop || oper.code === assembler_1.asm.code.int3) {
                    continue;
                }
                throw Error(`Failed to hook ${String(key)}, Too small area to patch, require=${required}, actual=${this.inpos}`);
            }
            if (basename === "ret" || basename === "jmp" || basename === "call") {
                ended = true;
            }
            this.asmFromOrigin(oper);
        }
    }
    static checkSpace(codes, key, required) {
        let ended = false;
        let inpos = 0;
        for (const oper of codes.operations) {
            const basename = oper.splits[0];
            if (ended) {
                if (oper.code === assembler_1.asm.code.nop || oper.code === assembler_1.asm.code.int3) {
                    continue;
                }
                throw Error(`Failed to hook ${String(key)}, Too small area to patch, require=${required}, actual=${inpos}`);
            }
            if (basename === "ret" || basename === "jmp" || basename === "call") {
                ended = true;
            }
            inpos += oper.size;
        }
    }
    end() {
        const tmpreg = this.getUnusing();
        const originend = this.origin.add(this.codesize);
        if (tmpreg != null)
            this.jmp64(originend, tmpreg);
        else
            this.jmp64_notemp(originend);
    }
}
class SavedCode {
    constructor(buffer, ptr) {
        this.buffer = buffer;
        this.ptr = ptr;
    }
    restore() {
        const unlock = new unlocker_1.MemoryUnlocker(this.ptr, this.buffer.length);
        const oribuf = this.ptr.getBuffer(this.buffer.length);
        this.ptr.setBuffer(this.buffer);
        this.buffer = oribuf;
        unlock.done();
    }
}
/**
 * Procedure hacker
 */
class ProcHacker {
    constructor(map) {
        this.map = map;
    }
    _get(subject, key, offset) {
        try {
            const ptr = this.map[key];
            if (ptr == null)
                throw common_1.CANCEL;
            return ptr.add(offset);
        }
        catch (err) {
            console.error(colors.red(`${subject}: skip, symbol "${key}" not found`));
            return null;
        }
    }
    append(nmap) {
        const map = this.map;
        for (const [key, v] of Object.entries(nmap)) {
            map[key] = v;
        }
        return this;
    }
    /**
     * @param subject name of hooking
     * @param key target symbol
     * @param offset offset from target
     * @param ptr target pointer
     * @param originalCode old codes
     * @param ignoreArea pairs of offset, ignores partial bytes.
     */
    check(subject, key, offset, ptr, originalCode, ignoreAreaOrOpts) {
        const buffer = ptr.getBuffer(originalCode.length);
        const diff = (0, util_1.memdiff)(buffer, originalCode);
        const opts = increaseStack(ignoreAreaOrOpts);
        if (!(0, util_1.memdiff_contains)(opts.ignoreArea, diff)) {
            const stackLine = (0, source_map_support_1.getCurrentStackLine)(opts.stackOffset);
            console.error(colors.red(`${subject}: ${key} + 0x${offset.toString(16)}: code does not match`));
            console.error(colors.red(`[${(0, util_1.hex)(buffer)}] != [${(0, util_1.hex)(originalCode)}]`));
            if (diff.length !== 0)
                console.error(colors.red(`diff: ${JSON.stringify(diff)}`));
            console.error(colors.red(`${subject}: skip`));
            console.error(colors.red(stackLine));
            console.error();
            return false;
        }
        else {
            return true;
        }
    }
    /**
     * @param subject for printing on error
     * @param key target symbol name
     * @param offset offset from target
     * @param originalCode bytes comparing before hooking
     * @param ignoreArea pair offsets to ignore of originalCode
     */
    nopping(subject, key, offset, originalCode, ignoreAreaOrOpts) {
        const ptr = this._get(subject, key, offset);
        if (ptr === null)
            return;
        const size = originalCode.length;
        const unlock = new unlocker_1.MemoryUnlocker(ptr, size);
        if (this.check(subject, key, offset, ptr, originalCode, increaseStack(ignoreAreaOrOpts))) {
            dll_1.dll.vcruntime140.memset(ptr, 0x90, size);
        }
        unlock.done();
    }
    /**
     * @param key target symbol name
     * @param to call address
     */
    hookingRaw(key, to, opts) {
        const origin = this.map[key];
        if (origin == null)
            throw Error(`Symbol ${String(key)} not found`);
        const REQUIRE_SIZE = 12;
        const codes = disassembler_1.disasm.process(origin, REQUIRE_SIZE, opts);
        if (codes.size === 0)
            throw Error(`Failed to disassemble`);
        const out = new AsmMover(origin, codes.size);
        out.moveCode(codes, key, REQUIRE_SIZE);
        out.end();
        const original = out.alloc(key + " (moved original)");
        const unlock = new unlocker_1.MemoryUnlocker(origin, codes.size);
        try {
            if (to instanceof Function)
                to = to(original);
            hacktool_1.hacktool.jump(origin, to, assembler_1.Register.rax, codes.size);
        }
        finally {
            unlock.done();
        }
        return original;
    }
    /**
     * @param key target symbol name
     * @param to call address
     */
    hookingRawWithoutOriginal(key, to, opts) {
        const origin = this.map[key];
        if (origin == null)
            throw Error(`Symbol ${String(key)} not found`);
        const REQUIRE_SIZE = 12;
        const codes = disassembler_1.disasm.process(origin, REQUIRE_SIZE, opts);
        if (codes.size === 0)
            throw Error(`Failed to disassemble`);
        AsmMover.checkSpace(codes, key, REQUIRE_SIZE);
        const unlock = new unlocker_1.MemoryUnlocker(origin, codes.size);
        try {
            hacktool_1.hacktool.jump(origin, to, assembler_1.Register.rax, codes.size);
        }
        finally {
            unlock.done();
        }
    }
    /**
     * @param key target symbol name
     */
    hookingRawWithOriginal(key, opts) {
        return callback => this.hookingRaw(key, original => {
            const data = (0, assembler_1.asm)();
            callback(data, original);
            return data.alloc("hook of " + key);
        }, opts);
    }
    /**
     * @param key target symbol name
     * @param to call address
     */
    hookingRawWithCallOriginal(key, to, keepRegister, keepFloatRegister, opts = {}) {
        const origin = this.map[key];
        if (origin == null)
            throw Error(`Symbol ${String(key)} not found`);
        const REQUIRE_SIZE = 12;
        const codes = disassembler_1.disasm.process(origin, REQUIRE_SIZE, opts);
        const out = new AsmMover(origin, codes.size);
        for (const reg of keepRegister) {
            out.freeregs.add(reg);
        }
        out.saveAndCall(to, keepRegister, keepFloatRegister);
        out.moveCode(codes, key, REQUIRE_SIZE);
        out.end();
        const unlock = new unlocker_1.MemoryUnlocker(origin, codes.size);
        hacktool_1.hacktool.jump(origin, out.alloc("hook of " + key), assembler_1.Register.rax, codes.size);
        unlock.done();
    }
    /**
     * @param key target symbol name
     * @param to call address
     */
    hooking(key, returnType, opts, ...params) {
        return callback => {
            if (opts == null) {
                opts = { name: `hook of ${key}` };
            }
            else if (opts.name == null) {
                opts.name = `hook of ${key}`;
            }
            const original = this.hookingRaw(key, original => {
                const nopts = opts || {};
                if (nopts.onError == null)
                    nopts.onError = original;
                return makefunc_1.makefunc.np(callback, returnType, nopts, ...params);
            }, opts);
            return makefunc_1.makefunc.js(original, returnType, opts, ...params);
        };
    }
    /**
     * @param subject for printing on error
     * @param key target symbol name
     * @param offset offset from target
     * @param newCode call address
     * @param tempRegister using register to call
     * @param call true - call, false - jump
     * @param originalCode bytes comparing before hooking
     * @param ignoreArea pair offsets to ignore of originalCode
     */
    patching(subject, key, offset, newCode, tempRegister, call, originalCode, ignoreAreaOrOpts) {
        const ptr = this._get(subject, key, offset);
        if (ptr === null)
            return;
        if (!ptr) {
            console.error(colors.red(`${subject}: skip`));
            return;
        }
        const size = originalCode.length;
        const unlock = new unlocker_1.MemoryUnlocker(ptr, size);
        if (this.check(subject, key, offset, ptr, originalCode, increaseStack(ignoreAreaOrOpts))) {
            hacktool_1.hacktool.patch(ptr, newCode, tempRegister, size, call);
        }
        unlock.done();
    }
    /**
     * @param subject for printing on error
     * @param key target symbol name
     * @param offset offset from target
     * @param jumpTo jump address
     * @param tempRegister using register to jump
     * @param originalCode bytes comparing before hooking
     * @param ignoreArea pair offsets to ignore of originalCode
     */
    jumping(subject, key, offset, jumpTo, tempRegister, originalCode, ignoreAreaOrOpts) {
        const ptr = this._get(subject, key, offset);
        if (ptr === null)
            return;
        const size = originalCode.length;
        const unlock = new unlocker_1.MemoryUnlocker(ptr, size);
        if (this.check(subject, key, offset, ptr, originalCode, increaseStack(ignoreAreaOrOpts))) {
            hacktool_1.hacktool.jump(ptr, jumpTo, tempRegister, size);
        }
        unlock.done();
    }
    write(key, offset, asm, subject, originalCode, ignoreAreaOrOpts) {
        if (subject == null)
            subject = key + "";
        const ptr = this._get(subject, key, offset);
        if (ptr === null)
            return;
        const buffer = asm instanceof Uint8Array ? asm : asm.buffer();
        const unlock = new unlocker_1.MemoryUnlocker(ptr, buffer.length);
        if (originalCode) {
            if (originalCode.length < buffer.length) {
                console.error(colors.red(`${subject}: ${key} +0x${offset.toString(16)}: writing space is too small`));
                unlock.done();
                return;
            }
            if (!this.check(subject, key, offset, ptr, originalCode, increaseStack(ignoreAreaOrOpts))) {
                unlock.done();
                return;
            }
            ptr.writeBuffer(buffer);
            ptr.fill(0x90, originalCode.length - buffer.length); // nop fill
        }
        else {
            ptr.writeBuffer(buffer);
        }
        unlock.done();
    }
    saveAndWrite(key, offset, asm) {
        const buffer = asm instanceof Uint8Array ? asm : asm.buffer();
        const ptr = this.map[key].add(offset);
        const code = new SavedCode(buffer, ptr);
        code.restore();
        return code;
    }
    /**
     * make the native function as a JS function.
     *
     * wrapper codes are not deleted permanently.
     * do not use it dynamically.
     *
     * @param returnType *_t or *Pointer
     * @param params *_t or *Pointer
     */
    js(key, returnType, opts, ...params) {
        return makefunc_1.makefunc.js(this.map[key], returnType, opts, ...params);
    }
    /**
     * make the native function as a JS function.
     * it uses a vftable
     *
     * wrapper codes are not deleted permanently.
     * do not use it dynamically.
     *
     * @param returnType *_t or *Pointer
     * @param params *_t or *Pointer
     */
    jsv(vftable, key, returnType, opts, ...params) {
        const map = this.map.vftable[vftable + "\\" + key];
        return makefunc_1.makefunc.js(map, returnType, opts, ...params);
    }
    /**
     * get symbols from cache.
     * if symbols don't exist in cache. it reads pdb.
     * @deprecated no need to load. use global procHacker
     */
    static load(cacheFilePath, names, undecorate) {
        return new ProcHacker(pdblegacy_1.pdblegacy.getList(cacheFilePath, {}, names, false, undecorate));
    }
}
exports.ProcHacker = ProcHacker;
/**
 * @remark Backward compatibility cannot be guaranteed. The symbol name can be changed by BDS updating.
 */
exports.procHacker = new ProcHacker(symbols_1.proc);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2hhY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2NoYWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQWlDO0FBQ2pDLDJDQUF5RTtBQUN6RSwyQ0FBcUM7QUFDckMscUNBQWtDO0FBRWxDLGlEQUF3QztBQUN4QywrQkFBNEI7QUFDNUIseUNBQXNDO0FBQ3RDLHlDQUE4RztBQUM5RywyQ0FBd0M7QUFDeEMsNkRBQTJEO0FBQzNELHlDQUE0QztBQUM1QyxpQ0FBd0Q7QUFReEQsU0FBUyxhQUFhLENBQUMsZ0JBQW9EO0lBQ3ZFLElBQUksZ0JBQWdCLEtBQUssU0FBUyxFQUFFO1FBQ2hDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztLQUN6QjtTQUFNLElBQUksZ0JBQWdCLFlBQVksS0FBSyxFQUFFO1FBQzFDLGdCQUFnQixHQUFHLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLENBQUM7S0FDdkQ7SUFDRCxnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFZLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZFLE9BQU8sZ0JBQWdCLENBQUM7QUFDNUIsQ0FBQztBQUVELE1BQU0sU0FBUyxHQUFlLENBQUMsb0JBQVEsQ0FBQyxHQUFHLEVBQUUsb0JBQVEsQ0FBQyxHQUFHLEVBQUUsb0JBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUV6RSxNQUFNLFFBQVMsU0FBUSx3QkFBWTtJQUMvQixZQUE0QixNQUFtQixFQUFrQixRQUFnQjtRQUM3RSxLQUFLLENBQUMsSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFETCxXQUFNLEdBQU4sTUFBTSxDQUFhO1FBQWtCLGFBQVEsR0FBUixRQUFRLENBQVE7UUFJakUsYUFBUSxHQUFHLElBQUksR0FBRyxDQUFXLFNBQVMsQ0FBQyxDQUFDO1FBQ2pELFVBQUssR0FBRyxDQUFDLENBQUM7SUFIakIsQ0FB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