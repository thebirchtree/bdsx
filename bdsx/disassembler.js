"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disasm = void 0;
const colors = require("colors");
const assembler_1 = require("./assembler");
const core_1 = require("./core");
const util_1 = require("./util");
function readConstNumber(size, ptr) {
    switch (size) {
        case assembler_1.OperationSize.byte:
            return ptr.readInt8();
        case assembler_1.OperationSize.word:
            return ptr.readInt16();
        case assembler_1.OperationSize.dword:
            return ptr.readInt32();
        default:
            throw Error(`Unexpected operation size: ${size}`);
    }
}
function readConst(size, ptr) {
    switch (size) {
        case assembler_1.OperationSize.void:
            return 0;
        case assembler_1.OperationSize.byte:
            return ptr.readInt8();
        case assembler_1.OperationSize.word:
            return ptr.readInt16();
        case assembler_1.OperationSize.dword:
            return ptr.readInt32();
        case assembler_1.OperationSize.qword:
            return ptr.readBin64();
        default:
            throw Error(`Unexpected operation size: ${size}`);
    }
}
function walk_offset(rex, ptr) {
    const v = ptr.readUint8();
    let r1 = (v & 0x7) | ((rex & 1) << 3);
    const r2 = ((v >> 3) & 0x7) | ((rex & 4) << 1);
    let r3 = null;
    let multiply = 1;
    const v2bits = v & 0xc0;
    if (v2bits !== 0xc0) {
        if (r1 === assembler_1.Register.rsp) {
            const next = ptr.readUint8();
            if (next !== 0x24) {
                r1 = next & 0x7;
                r3 = (next >> 3) & 0x7;
                multiply = (1 << (next >> 6));
            }
        }
    }
    if (v2bits === 0) {
        if (r1 === assembler_1.Register.rbp) {
            if (r3 !== null) {
                return {
                    offset: assembler_1.OperationSize.dword,
                    r1: r3,
                    r2,
                    r3: null,
                    multiply,
                };
            }
            else {
                return {
                    offset: assembler_1.OperationSize.dword,
                    r1: r3 !== null ? r1 : assembler_1.Register.rip,
                    r2,
                    r3,
                    multiply,
                };
            }
        }
    }
    switch (v2bits) {
        case 0x40:
            return {
                offset: assembler_1.OperationSize.byte,
                r1,
                r2,
                r3,
                multiply,
            };
        case 0x80:
            return {
                offset: assembler_1.OperationSize.dword,
                r1,
                r2,
                r3,
                multiply,
            };
        case 0xc0:
            return {
                offset: null,
                r1,
                r2,
                r3,
                multiply,
            };
        default: // 0x00
            return {
                offset: assembler_1.OperationSize.void,
                r1,
                r2,
                r3,
                multiply,
            };
    }
}
function walk_oper_r_c(oper, register, chr, size) {
    return new assembler_1.asm.Operation(assembler_1.asm.code[`${assembler_1.Operator[oper]}_r_c`], [register, chr, size]);
}
function walk_oper_rp_c(oper, register, multiply, offset, chr, size) {
    return new assembler_1.asm.Operation(assembler_1.asm.code[`${assembler_1.Operator[oper]}_rp_c`], [register, multiply, offset, chr, size]);
}
function walk_ojmp(jumpoper, offset) {
    return new assembler_1.asm.Operation(assembler_1.asm.code[`${assembler_1.JumpOperation[jumpoper]}_c`], [offset]);
}
function walk_addr_binary_oper(opername, dwordBit, readBit, info, size, ptr, isFloat) {
    const sig = isFloat ? "f" : "r";
    if (dwordBit === 0)
        size = assembler_1.OperationSize.byte;
    let name;
    let args;
    if (readBit !== 0) {
        // reverse
        if (info.offset === null) {
            // mov_r_r
            name = `${opername}_${sig}_${sig}`;
            args = [info.r2, info.r1];
        }
        else {
            const offset = readConst(info.offset, ptr);
            if (info.r3 !== null) {
                name = `${opername}_${sig}_rrp`;
                args = [info.r2, info.r1, info.r3, 1, offset];
            }
            else {
                name = `${opername}_${sig}_rp`;
                args = [info.r2, info.r1, 1, offset];
            }
        }
    }
    else {
        if (info.offset === null) {
            // mov_r_r
            name = `${opername}_${sig}_${sig}`;
            args = [info.r1, info.r2];
        }
        else {
            const offset = readConst(info.offset, ptr);
            if (info.r3 !== null) {
                name = `${opername}_rrp_${sig}`;
                args = [info.r1, info.r2, 1, offset, info.r2];
            }
            else {
                name = `${opername}_rp_${sig}`;
                args = [info.r1, 1, offset, info.r2];
            }
        }
    }
    if (size !== null)
        args.push(size);
    return new assembler_1.asm.Operation(assembler_1.asm.code[name], args);
}
function walk_addr_unary_oper(opername, dwordBit, info, size, ptr, isFloat) {
    const sig = isFloat ? "f" : "r";
    if (dwordBit === 0)
        size = assembler_1.OperationSize.byte;
    let name;
    let args;
    if (info.offset === null) {
        // mov_r_r
        name = `${opername}_${sig}`;
        args = [info.r1];
    }
    else {
        name = `${opername}_rp`;
        const offset = readConst(info.offset, ptr);
        args = [info.r1, 1, offset];
    }
    if (size !== null)
        args.push(size);
    return new assembler_1.asm.Operation(assembler_1.asm.code[name], args);
}
function walk_raw(ptr) {
    let rex = 0x40;
    let wordoper = false;
    let rexSetted = false;
    let size = assembler_1.OperationSize.dword;
    let foperSize = assembler_1.OperationSize.void;
    for (;;) {
        const v = ptr.readUint8();
        if (rexSetted && (v & 0xf8) === 0xb8) {
            // movabs
            return new assembler_1.asm.Operation(assembler_1.asm.code.movabs_r_c, [((rex & 1) << 3) | (v & 7), readConst(size, ptr)]);
        }
        else if ((v & 0xfe) === 0xf2) {
            // rep
            if (ptr.getUint8() === 0x0f) {
                // double or float operation
                foperSize = (v & 1) !== 0 ? assembler_1.OperationSize.dword : assembler_1.OperationSize.qword;
                continue;
            }
            else {
                // rep
                if ((v & 1) !== 0) {
                    return new assembler_1.asm.Operation(assembler_1.asm.code.repz, []);
                }
                else {
                    return new assembler_1.asm.Operation(assembler_1.asm.code.repnz, []);
                }
            }
        }
        else if (v === 0x63) {
            const info = walk_offset(rex, ptr);
            if (info === null) {
                // bad
            }
            else {
                return walk_addr_binary_oper("movsxd", 1, 1, info, size, ptr, false);
            }
        }
        else if (v === 0x64) {
            return new assembler_1.asm.Operation(assembler_1.asm.code.fs, []);
        }
        else if (v === 0x65) {
            return new assembler_1.asm.Operation(assembler_1.asm.code.gs, []);
        }
        else if (v === 0x66) {
            // data16
            wordoper = true;
            size = assembler_1.OperationSize.word;
            continue;
        }
        else if (v === 0x90) {
            // nop
            return new assembler_1.asm.Operation(assembler_1.asm.code.nop, []);
        }
        else if (v === 0x98) {
            if (wordoper)
                return new assembler_1.asm.Operation(assembler_1.asm.code.cbw, []);
            if (size === assembler_1.OperationSize.qword)
                return new assembler_1.asm.Operation(assembler_1.asm.code.cdqe, []);
            return new assembler_1.asm.Operation(assembler_1.asm.code.cwde, []);
        }
        else if (v === 0xc2) {
            // ret
            const v = ptr.readInt16();
            return new assembler_1.asm.Operation(assembler_1.asm.code.ret_c, [v]);
        }
        else if (v === 0xc3) {
            // ret
            return new assembler_1.asm.Operation(assembler_1.asm.code.ret, []);
        }
        else if (v === 0xca) {
            // retf
            const v = ptr.readInt16();
            return new assembler_1.asm.Operation(assembler_1.asm.code.retf_c, [v]);
        }
        else if (v === 0xcb) {
            // retf
            return new assembler_1.asm.Operation(assembler_1.asm.code.retf, []);
        }
        else if (v === 0xcc) {
            // int3
            return new assembler_1.asm.Operation(assembler_1.asm.code.int3, []);
        }
        else if (v === 0xcd) {
            // int
            const code = ptr.readUint8();
            return new assembler_1.asm.Operation(assembler_1.asm.code.int_c, [code]);
        }
        else if (v === 0xff) {
            const info = walk_offset(rex, ptr);
            if (info === null) {
                // bad
            }
            else {
                switch (info.r2) {
                    case assembler_1.FFOperation.inc:
                        return walk_addr_unary_oper("inc", 1, info, size, ptr, false);
                    case assembler_1.FFOperation.dec:
                        return walk_addr_unary_oper("dec", 1, info, size, ptr, false);
                    case assembler_1.FFOperation.call:
                        return walk_addr_unary_oper("call", 1, info, null, ptr, false);
                    case assembler_1.FFOperation.call_far: {
                        if (info.offset === null) {
                            break; // bad
                        }
                        const offset = readConst(info.offset, ptr);
                        const args = [info.r1, 1, offset];
                        if (size !== null)
                            args.push(size);
                        return new assembler_1.asm.Operation(assembler_1.asm.code.call_fp, args);
                    }
                    case assembler_1.FFOperation.jmp:
                        return walk_addr_unary_oper("jmp", 1, info, null, ptr, false);
                    case assembler_1.FFOperation.jmp_far: {
                        if (info.offset === null) {
                            break; // bad
                        }
                        const offset = readConst(info.offset, ptr);
                        const args = [info.r1, 1, offset];
                        if (size !== null)
                            args.push(size);
                        return new assembler_1.asm.Operation(assembler_1.asm.code.jmp_fp, args);
                    }
                    case assembler_1.FFOperation.push:
                        return walk_addr_unary_oper("push", 1, info, null, ptr, false);
                }
            }
        }
        else if ((v & 0xfe) === 0xe8) {
            // jmp or call dword
            const value = ptr.readInt32();
            if (v & 1) {
                // jmp
                return new assembler_1.asm.Operation(assembler_1.asm.code.jmp_c, [value]);
            }
            else {
                // call
                return new assembler_1.asm.Operation(assembler_1.asm.code.call_c, [value]);
            }
        }
        else if ((v & 0xfe) === 0xc6) {
            // mov rp c
            const info = walk_offset(rex, ptr);
            if (info === null)
                break; // bad
            if (!(v & 0x01))
                size = assembler_1.OperationSize.byte;
            if (info.offset === null) {
                const value = readConst(size, ptr);
                return new assembler_1.asm.Operation(assembler_1.asm.code.mov_r_c, [info.r1, value, size]);
            }
            else {
                const offset = readConst(info.offset, ptr);
                const value = readConst(size === assembler_1.OperationSize.qword ? assembler_1.OperationSize.dword : size, ptr);
                return new assembler_1.asm.Operation(assembler_1.asm.code.mov_rp_c, [info.r1, 1, offset, value, size]);
            }
        }
        else if ((v & 0xfc) === 0x84) {
            // test or xchg
            const info = walk_offset(rex, ptr);
            if (info === null)
                break; // bad
            if ((v & 0x2) !== 0) {
                // xchg
                if (info.offset === null) {
                    return new assembler_1.asm.Operation(assembler_1.asm.code.xchg_r_r, [info.r1, info.r2, size]);
                }
                else {
                    const offset = readConstNumber(info.offset, ptr);
                    return new assembler_1.asm.Operation(assembler_1.asm.code.xchg_r_rp, [info.r1, info.r2, 1, offset, size]);
                }
            }
            else {
                // test
                if (info.offset === null) {
                    return new assembler_1.asm.Operation(assembler_1.asm.code.test_r_r, [info.r1, info.r2, size]);
                }
                else {
                    const offset = readConstNumber(info.offset, ptr);
                    return new assembler_1.asm.Operation(assembler_1.asm.code.test_r_rp, [info.r1, info.r2, 1, offset, size]);
                }
            }
        }
        else if ((v & 0xfc) === 0x80) {
            // const operation
            const lowflag = v & 3;
            if (lowflag === 2)
                break; // bad
            if (lowflag === 0)
                size = assembler_1.OperationSize.byte;
            let constsize = size === assembler_1.OperationSize.qword ? assembler_1.OperationSize.dword : size;
            if (lowflag === 3)
                constsize = assembler_1.OperationSize.byte;
            const info = walk_offset(rex, ptr);
            if (info === null)
                break; // bad
            if (info.offset === null) {
                const chr = readConstNumber(constsize, ptr);
                return walk_oper_r_c(info.r2 & 7, info.r1, chr, size);
            }
            else {
                const offset = readConst(info.offset, ptr);
                const chr = readConstNumber(constsize, ptr);
                return walk_oper_rp_c(info.r2 & 7, info.r1, 1, offset, chr, size);
            }
        }
        else if ((v & 0xf8) === 0x88) {
            // mov variation
            if (v === 0xef)
                break; // bad
            const info = walk_offset(rex, ptr);
            if (info === null)
                break; // bad
            if (v === 0x8d) {
                // lea
                if (info.offset === null)
                    break; // bad
                const offset = readConst(info.offset, ptr);
                if (info.r3 !== null) {
                    return new assembler_1.asm.Operation(assembler_1.asm.code.lea_r_rrp, [info.r2, info.r1, info.r3, info.multiply, offset, size]);
                }
                else {
                    return new assembler_1.asm.Operation(assembler_1.asm.code.lea_r_rp, [info.r2, info.r1, info.multiply, offset, size]);
                }
            }
            if (v & 0x04)
                size = assembler_1.OperationSize.word;
            return walk_addr_binary_oper("mov", v & 1, v & 2, info, size, ptr, false);
        }
        else if ((v & 0xf2) === 0x40) {
            // rex
            rex = v;
            rexSetted = true;
            if (rex & 0x08) {
                size = assembler_1.OperationSize.qword;
            }
            continue;
        }
        else if ((v & 0xf0) === 0x50) {
            // push or pop
            const reg = (v & 0x7) | ((rex & 0x1) << 3);
            if (size === assembler_1.OperationSize.dword)
                size = assembler_1.OperationSize.qword;
            if (v & 0x08)
                return new assembler_1.asm.Operation(assembler_1.asm.code.pop_r, [reg, size]);
            else
                return new assembler_1.asm.Operation(assembler_1.asm.code.push_r, [reg, size]);
        }
        else if ((v & 0xf0) === 0x70) {
            const jumpoper = v & 0xf;
            const offset = ptr.readInt8();
            return walk_ojmp(jumpoper, offset);
        }
        else if ((v & 0xf0) === 0xb0) {
            // mov r c
            const isDword = (v & 0x8) !== 0;
            const reg = (v & 0x7) | ((rex & 1) << 3);
            const value = isDword ? ptr.readUint32() : ptr.readUint8();
            return new assembler_1.asm.Operation(assembler_1.asm.code.mov_r_c, [reg, value, isDword ? assembler_1.OperationSize.dword : assembler_1.OperationSize.byte]);
        }
        else if ((v & 0xc0) === 0x00) {
            // operation
            if ((v & 6) === 6) {
                if (v === 0x2e) {
                    return new assembler_1.asm.Operation(assembler_1.asm.code.cs, []);
                }
                else if (v === 0x26) {
                    return new assembler_1.asm.Operation(assembler_1.asm.code.es, []);
                }
                else if (v === 0x36) {
                    return new assembler_1.asm.Operation(assembler_1.asm.code.ss, []);
                }
                else if (v === 0x0f) {
                    // 0x0f
                    const v2 = ptr.readUint8();
                    if ((v2 & 0xf0) === 0x80) {
                        const jumpoper = v2 & 0xf;
                        const offset = ptr.readInt32();
                        return walk_ojmp(jumpoper, offset);
                    }
                    else if ((v2 & 0xf0) === 0x90) {
                        const jumpoper = v2 & 0xf;
                        const info = walk_offset(rex, ptr);
                        if (info === null) {
                            // xmm operations
                            // bad
                        }
                        else {
                            const opername = "set" + assembler_1.JumpOperation[jumpoper].substr(1);
                            return walk_addr_unary_oper(opername, 1, info, null, ptr, false);
                        }
                    }
                    else {
                        const info = walk_offset(rex, ptr);
                        if (info === null) {
                            // xmm operations
                            // bad
                        }
                        else
                            switch (v2 & 0xfe) {
                                case 0x28: // movaps read
                                    if (foperSize === assembler_1.OperationSize.qword) {
                                        // bad
                                    }
                                    else if (foperSize === assembler_1.OperationSize.dword) {
                                        // bad
                                    }
                                    else {
                                        // packed
                                        return walk_addr_binary_oper("movaps", 1, (v2 & 1) ^ 1, info, assembler_1.OperationSize.xmmword, ptr, true);
                                    }
                                    break;
                                case 0xbe: {
                                    // movsx
                                    const wordbit = v2 & 1;
                                    const oper = walk_addr_binary_oper("movsx", 1, 1, info, size, ptr, false);
                                    oper.args.push(wordbit !== 0 ? assembler_1.OperationSize.word : assembler_1.OperationSize.byte);
                                    return oper;
                                }
                                case 0xb6: {
                                    // movzx
                                    const wordbit = v2 & 1;
                                    const oper = walk_addr_binary_oper("movzx", 1, 1, info, size, ptr, false);
                                    oper.args.push(wordbit !== 0 ? assembler_1.OperationSize.word : assembler_1.OperationSize.byte);
                                    return oper;
                                }
                                case 0x10: {
                                    // read
                                    const readbit = (v2 & 1) ^ 1;
                                    if (foperSize === assembler_1.OperationSize.qword) {
                                        return walk_addr_binary_oper("movsd", 1, readbit, info, assembler_1.OperationSize.qword, ptr, true);
                                    }
                                    else if (foperSize === assembler_1.OperationSize.dword) {
                                        return walk_addr_binary_oper("movss", 1, readbit, info, assembler_1.OperationSize.dword, ptr, true);
                                    }
                                    else {
                                        // packed
                                        return walk_addr_binary_oper("movups", 1, readbit, info, assembler_1.OperationSize.xmmword, ptr, true);
                                    }
                                }
                                default:
                                    if (v2 === 0x5a) {
                                        // convert precision
                                        if (foperSize === assembler_1.OperationSize.qword) {
                                            return walk_addr_binary_oper("cvtsd2ss", 1, 1, info, assembler_1.OperationSize.qword, ptr, true);
                                        }
                                        else if (foperSize === assembler_1.OperationSize.dword) {
                                            return walk_addr_binary_oper("cvtsd2ss", 1, 1, info, assembler_1.OperationSize.dword, ptr, true);
                                        }
                                        else {
                                            if (wordoper) {
                                                return walk_addr_binary_oper("cvtpd2ps", 1, 1, info, assembler_1.OperationSize.xmmword, ptr, true);
                                            }
                                            else {
                                                return walk_addr_binary_oper("cvtps2pd", 1, 1, info, assembler_1.OperationSize.xmmword, ptr, true);
                                            }
                                        }
                                    }
                                    else if (v2 === 0x2c) {
                                        // truncated f2i
                                        if (foperSize === assembler_1.OperationSize.qword) {
                                            return walk_addr_binary_oper("cvttsd2si", 1, 1, info, assembler_1.OperationSize.qword, ptr, true);
                                        }
                                        else if (foperSize === assembler_1.OperationSize.dword) {
                                            return walk_addr_binary_oper("cvttss2si", 1, 1, info, assembler_1.OperationSize.qword, ptr, true);
                                        }
                                        else {
                                            if (wordoper) {
                                                return walk_addr_binary_oper("cvttpd2pi", 1, 1, info, assembler_1.OperationSize.xmmword, ptr, true);
                                            }
                                            else {
                                                return walk_addr_binary_oper("cvttps2pi", 1, 1, info, assembler_1.OperationSize.xmmword, ptr, true);
                                            }
                                        }
                                    }
                                    else if (v2 === 0x2d) {
                                        // f2i
                                        if (foperSize === assembler_1.OperationSize.qword) {
                                            return walk_addr_binary_oper("cvtsd2si", 1, 1, info, assembler_1.OperationSize.qword, ptr, true);
                                        }
                                        else if (foperSize === assembler_1.OperationSize.dword) {
                                            return walk_addr_binary_oper("cvtss2si", 1, 1, info, assembler_1.OperationSize.dword, ptr, true);
                                        }
                                        else {
                                            if (wordoper) {
                                                return walk_addr_binary_oper("cvtpd2pi", 1, 1, info, assembler_1.OperationSize.xmmword, ptr, true);
                                            }
                                            else {
                                                return walk_addr_binary_oper("cvtps2pi", 1, 1, info, assembler_1.OperationSize.xmmword, ptr, true);
                                            }
                                        }
                                    }
                                    else if (v2 === 0x2a) {
                                        // i2f
                                        if (foperSize === assembler_1.OperationSize.qword) {
                                            return walk_addr_binary_oper("cvtsi2sd", 1, 1, info, size, ptr, true);
                                        }
                                        else if (foperSize === assembler_1.OperationSize.dword) {
                                            return walk_addr_binary_oper("cvtsi2ss", 1, 1, info, size, ptr, true);
                                        }
                                        else {
                                            if (wordoper) {
                                                return walk_addr_binary_oper("cvtpi2pd", 1, 1, info, assembler_1.OperationSize.mmword, ptr, true);
                                            }
                                            else {
                                                return walk_addr_binary_oper("cvtpi2ps", 1, 1, info, assembler_1.OperationSize.mmword, ptr, true);
                                            }
                                        }
                                    }
                                    break;
                            }
                    }
                }
            }
            else {
                const oper = (v >> 3) & 7;
                if ((v & 0x04) !== 0) {
                    let chr;
                    if ((v & 1) === 0) {
                        size = assembler_1.OperationSize.byte;
                        chr = ptr.readInt8();
                    }
                    else {
                        chr = ptr.readInt32();
                    }
                    return walk_oper_r_c(oper, assembler_1.Register.rax, chr, size);
                }
                const info = walk_offset(rex, ptr);
                if (info === null)
                    break; // bad
                return walk_addr_binary_oper(assembler_1.Operator[oper], v & 1, v & 2, info, size, ptr, false);
            }
        }
        else if ((v & 0xef) === 0xc1) {
            // bitwise shift
            const code = ptr.readUint8();
            const oper = code & 0xf8;
            const reg = (code & 0x7) | ((rex & 1) << 3);
            const value = (v & 0x10) !== 0 ? 1 : ptr.readInt8();
            if (oper === 0xe0) {
                return new assembler_1.asm.Operation(assembler_1.asm.code.shl_r_c, [reg, value, size]);
            }
            else if (oper === 0xe8) {
                return new assembler_1.asm.Operation(assembler_1.asm.code.shr_r_c, [reg, value, size]);
            }
            else if (oper === 0xf0) {
                // bad
            }
            else if (oper === 0xf8) {
                return new assembler_1.asm.Operation(assembler_1.asm.code.sar_r_c, [reg, value, size]);
            }
            else {
                // not supported yet
            }
        }
        else {
            // not supported yet
        }
        break;
    }
    return null;
}
var disasm;
(function (disasm) {
    function walk(ptr, opts) {
        const low = ptr.getAddressLow();
        const high = ptr.getAddressHigh();
        function getMovedDistance() {
            return (ptr.getAddressHigh() - high) * 0x100000000 + (ptr.getAddressLow() - low);
        }
        const res = walk_raw(ptr);
        if (res !== null) {
            res.size = getMovedDistance();
            return res;
        }
        if (opts == null)
            opts = {};
        ptr.setAddress(low, high);
        if (opts.fallback != null) {
            let res = opts.fallback(ptr);
            if (res === null) {
                // fail
                ptr.setAddress(low, high);
            }
            else {
                if (typeof res === "object") {
                    // size from the ptr distance
                    res.size = getMovedDistance();
                }
                else {
                    const size = res == null ? getMovedDistance() : res;
                    ptr.setAddress(low, high);
                    const buffer = ptr.readBuffer(size);
                    res = new assembler_1.asm.Operation(assembler_1.asm.code.writeBuffer, [buffer]);
                    res.size = size;
                }
                return res;
            }
        }
        let size = 16;
        let opcode = "";
        while (size !== 0) {
            try {
                opcode = (0, util_1.hex)(ptr.getBuffer(size));
                break;
            }
            catch (err) {
                // access violation
                size--;
            }
        }
        if (!opts.quiet) {
            console.error(colors.red("disasm.walk: unimplemented opcode, failed"));
            console.error(colors.red("disasm.walk: Please send rua.kr this error"));
            console.trace(colors.red(`opcode: ${opcode || "[failed to read]"}`));
        }
        return null;
    }
    disasm.walk = walk;
    function process(ptr, size, opts) {
        const operations = [];
        const nptr = ptr.as(core_1.NativePointer);
        let oper = null;
        let ressize = 0;
        while (ressize < size && (oper = disasm.walk(nptr, opts)) !== null) {
            operations.push(oper);
            ressize += oper.size;
        }
        return new assembler_1.asm.Operations(operations, ressize);
    }
    disasm.process = process;
    /**
     * @param opts it's a quiet option if it's boolean,
     */
    function check(hexstr, opts) {
        const buffer = typeof hexstr === "string" ? (0, util_1.unhex)(hexstr) : hexstr;
        const ptr = new core_1.NativePointer();
        ptr.setAddressFromBuffer(buffer);
        let quiet;
        if (typeof opts === "boolean") {
            quiet = opts;
            opts = {
                quiet: opts,
            };
        }
        else {
            quiet = !!(opts && opts.quiet);
        }
        const opers = [];
        if (!quiet)
            console.log();
        let oper = null;
        let pos = 0;
        const size = buffer.length;
        while (pos < size && (oper = disasm.walk(ptr, opts)) !== null) {
            const posend = pos + oper.size;
            if (!quiet)
                console.log(oper + "" + colors.gray(` // ${(0, util_1.hex)(buffer.subarray(pos, posend))}`));
            pos = posend;
            opers.push(oper);
        }
        return new assembler_1.asm.Operations(opers, pos);
    }
    disasm.check = check;
})(disasm = exports.disasm || (exports.disasm = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzYXNzZW1ibGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlzYXNzZW1ibGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUFpQztBQUNqQywyQ0FBc0g7QUFDdEgsaUNBQW9EO0FBRXBELGlDQUFvQztBQVNwQyxTQUFTLGVBQWUsQ0FBQyxJQUFtQixFQUFFLEdBQWtCO0lBQzVELFFBQVEsSUFBSSxFQUFFO1FBQ1YsS0FBSyx5QkFBYSxDQUFDLElBQUk7WUFDbkIsT0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDMUIsS0FBSyx5QkFBYSxDQUFDLElBQUk7WUFDbkIsT0FBTyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDM0IsS0FBSyx5QkFBYSxDQUFDLEtBQUs7WUFDcEIsT0FBTyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDM0I7WUFDSSxNQUFNLEtBQUssQ0FBQyw4QkFBOEIsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUN6RDtBQUNMLENBQUM7QUFDRCxTQUFTLFNBQVMsQ0FBQyxJQUFtQixFQUFFLEdBQWtCO0lBQ3RELFFBQVEsSUFBSSxFQUFFO1FBQ1YsS0FBSyx5QkFBYSxDQUFDLElBQUk7WUFDbkIsT0FBTyxDQUFDLENBQUM7UUFDYixLQUFLLHlCQUFhLENBQUMsSUFBSTtZQUNuQixPQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQixLQUFLLHlCQUFhLENBQUMsSUFBSTtZQUNuQixPQUFPLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMzQixLQUFLLHlCQUFhLENBQUMsS0FBSztZQUNwQixPQUFPLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMzQixLQUFLLHlCQUFhLENBQUMsS0FBSztZQUNwQixPQUFPLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMzQjtZQUNJLE1BQU0sS0FBSyxDQUFDLDhCQUE4QixJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ3pEO0FBQ0wsQ0FBQztBQUNELFNBQVMsV0FBVyxDQUFDLEdBQVcsRUFBRSxHQUFrQjtJQUNoRCxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDMUIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN0QyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDL0MsSUFBSSxFQUFFLEdBQW9CLElBQUksQ0FBQztJQUMvQixJQUFJLFFBQVEsR0FBd0IsQ0FBQyxDQUFDO0lBRXRDLE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDeEIsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO1FBQ2pCLElBQUksRUFBRSxLQUFLLG9CQUFRLENBQUMsR0FBRyxFQUFFO1lBQ3JCLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUM3QixJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQ2YsRUFBRSxHQUFHLElBQUksR0FBRyxHQUFHLENBQUM7Z0JBQ2hCLEVBQUUsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQ3ZCLFFBQVEsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBd0IsQ0FBQzthQUN4RDtTQUNKO0tBQ0o7SUFDRCxJQUFJLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDZCxJQUFJLEVBQUUsS0FBSyxvQkFBUSxDQUFDLEdBQUcsRUFBRTtZQUNyQixJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7Z0JBQ2IsT0FBTztvQkFDSCxNQUFNLEVBQUUseUJBQWEsQ0FBQyxLQUFLO29CQUMzQixFQUFFLEVBQUUsRUFBRTtvQkFDTixFQUFFO29CQUNGLEVBQUUsRUFBRSxJQUFJO29CQUNSLFFBQVE7aUJBQ1gsQ0FBQzthQUNMO2lCQUFNO2dCQUNILE9BQU87b0JBQ0gsTUFBTSxFQUFFLHlCQUFhLENBQUMsS0FBSztvQkFDM0IsRUFBRSxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsb0JBQVEsQ0FBQyxHQUFHO29CQUNuQyxFQUFFO29CQUNGLEVBQUU7b0JBQ0YsUUFBUTtpQkFDWCxDQUFDO2FBQ0w7U0FDSjtLQUNKO0lBRUQsUUFBUSxNQUFNLEVBQUU7UUFDWixLQUFLLElBQUk7WUFDTCxPQUFPO2dCQUNILE1BQU0sRUFBRSx5QkFBYSxDQUFDLElBQUk7Z0JBQzFCLEVBQUU7Z0JBQ0YsRUFBRTtnQkFDRixFQUFFO2dCQUNGLFFBQVE7YUFDWCxDQUFDO1FBQ04sS0FBSyxJQUFJO1lBQ0wsT0FBTztnQkFDSCxNQUFNLEVBQUUseUJBQWEsQ0FBQyxLQUFLO2dCQUMzQixFQUFFO2dCQUNGLEVBQUU7Z0JBQ0YsRUFBRTtnQkFDRixRQUFRO2FBQ1gsQ0FBQztRQUNOLEtBQUssSUFBSTtZQUNMLE9BQU87Z0JBQ0gsTUFBTSxFQUFFLElBQUk7Z0JBQ1osRUFBRTtnQkFDRixFQUFFO2dCQUNGLEVBQUU7Z0JBQ0YsUUFBUTthQUNYLENBQUM7UUFDTixTQUFTLE9BQU87WUFDWixPQUFPO2dCQUNILE1BQU0sRUFBRSx5QkFBYSxDQUFDLElBQUk7Z0JBQzFCLEVBQUU7Z0JBQ0YsRUFBRTtnQkFDRixFQUFFO2dCQUNGLFFBQVE7YUFDWCxDQUFDO0tBQ1Q7QUFDTCxDQUFDO0FBQ0QsU0FBUyxhQUFhLENBQUMsSUFBYyxFQUFFLFFBQWtCLEVBQUUsR0FBVyxFQUFFLElBQW1CO0lBQ3ZGLE9BQU8sSUFBSSxlQUFHLENBQUMsU0FBUyxDQUFDLGVBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxvQkFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUN2RixDQUFDO0FBQ0QsU0FBUyxjQUFjLENBQ25CLElBQWMsRUFDZCxRQUFrQixFQUNsQixRQUE2QixFQUM3QixNQUF3QixFQUN4QixHQUFXLEVBQ1gsSUFBbUI7SUFFbkIsT0FBTyxJQUFJLGVBQUcsQ0FBQyxTQUFTLENBQUMsZUFBRyxDQUFDLElBQUksQ0FBQyxHQUFHLG9CQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDMUcsQ0FBQztBQUNELFNBQVMsU0FBUyxDQUFDLFFBQXVCLEVBQUUsTUFBYztJQUN0RCxPQUFPLElBQUksZUFBRyxDQUFDLFNBQVMsQ0FBQyxlQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcseUJBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ2pGLENBQUM7QUFDRCxTQUFTLHFCQUFxQixDQUMxQixRQUFnQixFQUNoQixRQUFnQixFQUNoQixPQUFlLEVBQ2YsSUFBZ0IsRUFDaEIsSUFBbUIsRUFDbkIsR0FBa0IsRUFDbEIsT0FBZ0I7SUFFaEIsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUNoQyxJQUFJLFFBQVEsS0FBSyxDQUFDO1FBQUUsSUFBSSxHQUFHLHlCQUFhLENBQUMsSUFBSSxDQUFDO0lBQzlDLElBQUksSUFBWSxDQUFDO0lBQ2pCLElBQUksSUFBVyxDQUFDO0lBQ2hCLElBQUksT0FBTyxLQUFLLENBQUMsRUFBRTtRQUNmLFVBQVU7UUFDVixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ3RCLFVBQVU7WUFDVixJQUFJLEdBQUcsR0FBRyxRQUFRLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ25DLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzdCO2FBQU07WUFDSCxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMzQyxJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssSUFBSSxFQUFFO2dCQUNsQixJQUFJLEdBQUcsR0FBRyxRQUFRLElBQUksR0FBRyxNQUFNLENBQUM7Z0JBQ2hDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUNqRDtpQkFBTTtnQkFDSCxJQUFJLEdBQUcsR0FBRyxRQUFRLElBQUksR0FBRyxLQUFLLENBQUM7Z0JBQy9CLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDeEM7U0FDSjtLQUNKO1NBQU07UUFDSCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQ3RCLFVBQVU7WUFDVixJQUFJLEdBQUcsR0FBRyxRQUFRLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ25DLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzdCO2FBQU07WUFDSCxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMzQyxJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssSUFBSSxFQUFFO2dCQUNsQixJQUFJLEdBQUcsR0FBRyxRQUFRLFFBQVEsR0FBRyxFQUFFLENBQUM7Z0JBQ2hDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNqRDtpQkFBTTtnQkFDSCxJQUFJLEdBQUcsR0FBRyxRQUFRLE9BQU8sR0FBRyxFQUFFLENBQUM7Z0JBQy9CLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDeEM7U0FDSjtLQUNKO0lBQ0QsSUFBSSxJQUFJLEtBQUssSUFBSTtRQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsT0FBTyxJQUFJLGVBQUcsQ0FBQyxTQUFTLENBQUMsZUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBQ0QsU0FBUyxvQkFBb0IsQ0FDekIsUUFBZ0IsRUFDaEIsUUFBZ0IsRUFDaEIsSUFBZ0IsRUFDaEIsSUFBMEIsRUFDMUIsR0FBa0IsRUFDbEIsT0FBZ0I7SUFFaEIsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUNoQyxJQUFJLFFBQVEsS0FBSyxDQUFDO1FBQUUsSUFBSSxHQUFHLHlCQUFhLENBQUMsSUFBSSxDQUFDO0lBQzlDLElBQUksSUFBWSxDQUFDO0lBQ2pCLElBQUksSUFBVyxDQUFDO0lBQ2hCLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUU7UUFDdEIsVUFBVTtRQUNWLElBQUksR0FBRyxHQUFHLFFBQVEsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUM1QixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDcEI7U0FBTTtRQUNILElBQUksR0FBRyxHQUFHLFFBQVEsS0FBSyxDQUFDO1FBQ3hCLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQy9CO0lBQ0QsSUFBSSxJQUFJLEtBQUssSUFBSTtRQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsT0FBTyxJQUFJLGVBQUcsQ0FBQyxTQUFTLENBQUMsZUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBRUQsU0FBUyxRQUFRLENBQUMsR0FBa0I7SUFDaEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO0lBQ2YsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN0QixJQUFJLElBQUksR0FBa0IseUJBQWEsQ0FBQyxLQUFLLENBQUM7SUFDOUMsSUFBSSxTQUFTLEdBQWtCLHlCQUFhLENBQUMsSUFBSSxDQUFDO0lBQ2xELFNBQVM7UUFDTCxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDMUIsSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ2xDLFNBQVM7WUFDVCxPQUFPLElBQUksZUFBRyxDQUFDLFNBQVMsQ0FBQyxlQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDckc7YUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUM1QixNQUFNO1lBQ04sSUFBSSxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssSUFBSSxFQUFFO2dCQUN6Qiw0QkFBNEI7Z0JBQzVCLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLHlCQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyx5QkFBYSxDQUFDLEtBQUssQ0FBQztnQkFDdEUsU0FBUzthQUNaO2lCQUFNO2dCQUNILE1BQU07Z0JBQ04sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ2YsT0FBTyxJQUFJLGVBQUcsQ0FBQyxTQUFTLENBQUMsZUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQy9DO3FCQUFNO29CQUNILE9BQU8sSUFBSSxlQUFHLENBQUMsU0FBUyxDQUFDLGVBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUNoRDthQUNKO1NBQ0o7YUFBTSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDbkIsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNuQyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQ2YsTUFBTTthQUNUO2lCQUFNO2dCQUNILE9BQU8scUJBQXFCLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDeEU7U0FDSjthQUFNLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNuQixPQUFPLElBQUksZUFBRyxDQUFDLFNBQVMsQ0FBQyxlQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUM3QzthQUFNLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNuQixPQUFPLElBQUksZUFBRyxDQUFDLFNBQVMsQ0FBQyxlQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUM3QzthQUFNLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNuQixTQUFTO1lBQ1QsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNoQixJQUFJLEdBQUcseUJBQWEsQ0FBQyxJQUFJLENBQUM7WUFDMUIsU0FBUztTQUNaO2FBQU0sSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ25CLE1BQU07WUFDTixPQUFPLElBQUksZUFBRyxDQUFDLFNBQVMsQ0FBQyxlQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUM5QzthQUFNLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNuQixJQUFJLFFBQVE7Z0JBQUUsT0FBTyxJQUFJLGVBQUcsQ0FBQyxTQUFTLENBQUMsZUFBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDekQsSUFBSSxJQUFJLEtBQUsseUJBQWEsQ0FBQyxLQUFLO2dCQUFFLE9BQU8sSUFBSSxlQUFHLENBQUMsU0FBUyxDQUFDLGVBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzlFLE9BQU8sSUFBSSxlQUFHLENBQUMsU0FBUyxDQUFDLGVBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQy9DO2FBQU0sSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ25CLE1BQU07WUFDTixNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDMUIsT0FBTyxJQUFJLGVBQUcsQ0FBQyxTQUFTLENBQUMsZUFBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pEO2FBQU0sSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ25CLE1BQU07WUFDTixPQUFPLElBQUksZUFBRyxDQUFDLFNBQVMsQ0FBQyxlQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUM5QzthQUFNLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNuQixPQUFPO1lBQ1AsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzFCLE9BQU8sSUFBSSxlQUFHLENBQUMsU0FBUyxDQUFDLGVBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsRDthQUFNLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNuQixPQUFPO1lBQ1AsT0FBTyxJQUFJLGVBQUcsQ0FBQyxTQUFTLENBQUMsZUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDL0M7YUFBTSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDbkIsT0FBTztZQUNQLE9BQU8sSUFBSSxlQUFHLENBQUMsU0FBUyxDQUFDLGVBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQy9DO2FBQU0sSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ25CLE1BQU07WUFDTixNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDN0IsT0FBTyxJQUFJLGVBQUcsQ0FBQyxTQUFTLENBQUMsZUFBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3BEO2FBQU0sSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ25CLE1BQU0sSUFBSSxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDbkMsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO2dCQUNmLE1BQU07YUFDVDtpQkFBTTtnQkFDSCxRQUFRLElBQUksQ0FBQyxFQUFZLEVBQUU7b0JBQ3ZCLEtBQUssdUJBQVcsQ0FBQyxHQUFHO3dCQUNoQixPQUFPLG9CQUFvQixDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ2xFLEtBQUssdUJBQVcsQ0FBQyxHQUFHO3dCQUNoQixPQUFPLG9CQUFvQixDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ2xFLEtBQUssdUJBQVcsQ0FBQyxJQUFJO3dCQUNqQixPQUFPLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ25FLEtBQUssdUJBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDdkIsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTs0QkFDdEIsTUFBTSxDQUFDLE1BQU07eUJBQ2hCO3dCQUNELE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUMzQyxNQUFNLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO3dCQUNsQyxJQUFJLElBQUksS0FBSyxJQUFJOzRCQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ25DLE9BQU8sSUFBSSxlQUFHLENBQUMsU0FBUyxDQUFDLGVBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO3FCQUNwRDtvQkFDRCxLQUFLLHVCQUFXLENBQUMsR0FBRzt3QkFDaEIsT0FBTyxvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNsRSxLQUFLLHVCQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3RCLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUU7NEJBQ3RCLE1BQU0sQ0FBQyxNQUFNO3lCQUNoQjt3QkFDRCxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQzt3QkFDM0MsTUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDbEMsSUFBSSxJQUFJLEtBQUssSUFBSTs0QkFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNuQyxPQUFPLElBQUksZUFBRyxDQUFDLFNBQVMsQ0FBQyxlQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztxQkFDbkQ7b0JBQ0QsS0FBSyx1QkFBVyxDQUFDLElBQUk7d0JBQ2pCLE9BQU8sb0JBQW9CLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDdEU7YUFDSjtTQUNKO2FBQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDNUIsb0JBQW9CO1lBQ3BCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ1AsTUFBTTtnQkFDTixPQUFPLElBQUksZUFBRyxDQUFDLFNBQVMsQ0FBQyxlQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDckQ7aUJBQU07Z0JBQ0gsT0FBTztnQkFDUCxPQUFPLElBQUksZUFBRyxDQUFDLFNBQVMsQ0FBQyxlQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDdEQ7U0FDSjthQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQzVCLFdBQVc7WUFDWCxNQUFNLElBQUksR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLElBQUksSUFBSSxLQUFLLElBQUk7Z0JBQUUsTUFBTSxDQUFDLE1BQU07WUFDaEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFBRSxJQUFJLEdBQUcseUJBQWEsQ0FBQyxJQUFJLENBQUM7WUFDM0MsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtnQkFDdEIsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDbkMsT0FBTyxJQUFJLGVBQUcsQ0FBQyxTQUFTLENBQUMsZUFBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ3RFO2lCQUFNO2dCQUNILE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsSUFBSSxLQUFLLHlCQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyx5QkFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUN4RixPQUFPLElBQUksZUFBRyxDQUFDLFNBQVMsQ0FBQyxlQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNsRjtTQUNKO2FBQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDNUIsZUFBZTtZQUNmLE1BQU0sSUFBSSxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDbkMsSUFBSSxJQUFJLEtBQUssSUFBSTtnQkFBRSxNQUFNLENBQUMsTUFBTTtZQUNoQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDakIsT0FBTztnQkFDUCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO29CQUN0QixPQUFPLElBQUksZUFBRyxDQUFDLFNBQVMsQ0FBQyxlQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUN6RTtxQkFBTTtvQkFDSCxNQUFNLE1BQU0sR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDakQsT0FBTyxJQUFJLGVBQUcsQ0FBQyxTQUFTLENBQUMsZUFBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUNyRjthQUNKO2lCQUFNO2dCQUNILE9BQU87Z0JBQ1AsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtvQkFDdEIsT0FBTyxJQUFJLGVBQUcsQ0FBQyxTQUFTLENBQUMsZUFBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDekU7cUJBQU07b0JBQ0gsTUFBTSxNQUFNLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ2pELE9BQU8sSUFBSSxlQUFHLENBQUMsU0FBUyxDQUFDLGVBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDckY7YUFDSjtTQUNKO2FBQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDNUIsa0JBQWtCO1lBQ2xCLE1BQU0sT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEIsSUFBSSxPQUFPLEtBQUssQ0FBQztnQkFBRSxNQUFNLENBQUMsTUFBTTtZQUNoQyxJQUFJLE9BQU8sS0FBSyxDQUFDO2dCQUFFLElBQUksR0FBRyx5QkFBYSxDQUFDLElBQUksQ0FBQztZQUM3QyxJQUFJLFNBQVMsR0FBRyxJQUFJLEtBQUsseUJBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLHlCQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDMUUsSUFBSSxPQUFPLEtBQUssQ0FBQztnQkFBRSxTQUFTLEdBQUcseUJBQWEsQ0FBQyxJQUFJLENBQUM7WUFFbEQsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNuQyxJQUFJLElBQUksS0FBSyxJQUFJO2dCQUFFLE1BQU0sQ0FBQyxNQUFNO1lBRWhDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUU7Z0JBQ3RCLE1BQU0sR0FBRyxHQUFHLGVBQWUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQzVDLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3pEO2lCQUFNO2dCQUNILE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLEdBQUcsR0FBRyxlQUFlLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QyxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3JFO1NBQ0o7YUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUM1QixnQkFBZ0I7WUFDaEIsSUFBSSxDQUFDLEtBQUssSUFBSTtnQkFBRSxNQUFNLENBQUMsTUFBTTtZQUU3QixNQUFNLElBQUksR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLElBQUksSUFBSSxLQUFLLElBQUk7Z0JBQUUsTUFBTSxDQUFDLE1BQU07WUFDaEMsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUNaLE1BQU07Z0JBQ04sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUk7b0JBQUUsTUFBTSxDQUFDLE1BQU07Z0JBQ3ZDLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssSUFBSSxFQUFFO29CQUNsQixPQUFPLElBQUksZUFBRyxDQUFDLFNBQVMsQ0FBQyxlQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQzFHO3FCQUFNO29CQUNILE9BQU8sSUFBSSxlQUFHLENBQUMsU0FBUyxDQUFDLGVBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQ2hHO2FBQ0o7WUFDRCxJQUFJLENBQUMsR0FBRyxJQUFJO2dCQUFFLElBQUksR0FBRyx5QkFBYSxDQUFDLElBQUksQ0FBQztZQUN4QyxPQUFPLHFCQUFxQixDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDN0U7YUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUM1QixNQUFNO1lBQ04sR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNSLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxHQUFHLEdBQUcsSUFBSSxFQUFFO2dCQUNaLElBQUksR0FBRyx5QkFBYSxDQUFDLEtBQUssQ0FBQzthQUM5QjtZQUNELFNBQVM7U0FDWjthQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQzVCLGNBQWM7WUFDZCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzNDLElBQUksSUFBSSxLQUFLLHlCQUFhLENBQUMsS0FBSztnQkFBRSxJQUFJLEdBQUcseUJBQWEsQ0FBQyxLQUFLLENBQUM7WUFDN0QsSUFBSSxDQUFDLEdBQUcsSUFBSTtnQkFBRSxPQUFPLElBQUksZUFBRyxDQUFDLFNBQVMsQ0FBQyxlQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDOztnQkFDL0QsT0FBTyxJQUFJLGVBQUcsQ0FBQyxTQUFTLENBQUMsZUFBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUMvRDthQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQzVCLE1BQU0sUUFBUSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDekIsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzlCLE9BQU8sU0FBUyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN0QzthQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQzVCLFVBQVU7WUFDVixNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN6QyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzNELE9BQU8sSUFBSSxlQUFHLENBQUMsU0FBUyxDQUFDLGVBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLHlCQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyx5QkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDaEg7YUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUM1QixZQUFZO1lBQ1osSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO29CQUNaLE9BQU8sSUFBSSxlQUFHLENBQUMsU0FBUyxDQUFDLGVBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUM3QztxQkFBTSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7b0JBQ25CLE9BQU8sSUFBSSxlQUFHLENBQUMsU0FBUyxDQUFDLGVBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUM3QztxQkFBTSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7b0JBQ25CLE9BQU8sSUFBSSxlQUFHLENBQUMsU0FBUyxDQUFDLGVBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUM3QztxQkFBTSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7b0JBQ25CLE9BQU87b0JBQ1AsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUMzQixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTt3QkFDdEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQzt3QkFDMUIsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO3dCQUMvQixPQUFPLFNBQVMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7cUJBQ3RDO3lCQUFNLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO3dCQUM3QixNQUFNLFFBQVEsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO3dCQUMxQixNQUFNLElBQUksR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUNuQyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7NEJBQ2YsaUJBQWlCOzRCQUNqQixNQUFNO3lCQUNUOzZCQUFNOzRCQUNILE1BQU0sUUFBUSxHQUFHLEtBQUssR0FBRyx5QkFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDM0QsT0FBTyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO3lCQUNwRTtxQkFDSjt5QkFBTTt3QkFDSCxNQUFNLElBQUksR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUNuQyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7NEJBQ2YsaUJBQWlCOzRCQUNqQixNQUFNO3lCQUNUOzs0QkFDRyxRQUFRLEVBQUUsR0FBRyxJQUFJLEVBQUU7Z0NBQ2YsS0FBSyxJQUFJLEVBQUUsY0FBYztvQ0FDckIsSUFBSSxTQUFTLEtBQUsseUJBQWEsQ0FBQyxLQUFLLEVBQUU7d0NBQ25DLE1BQU07cUNBQ1Q7eUNBQU0sSUFBSSxTQUFTLEtBQUsseUJBQWEsQ0FBQyxLQUFLLEVBQUU7d0NBQzFDLE1BQU07cUNBQ1Q7eUNBQU07d0NBQ0gsU0FBUzt3Q0FDVCxPQUFPLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSx5QkFBYSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7cUNBQ25HO29DQUNELE1BQU07Z0NBQ1YsS0FBSyxJQUFJLENBQUMsQ0FBQztvQ0FDUCxRQUFRO29DQUNSLE1BQU0sT0FBTyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7b0NBQ3ZCLE1BQU0sSUFBSSxHQUFHLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO29DQUMxRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyx5QkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMseUJBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQ0FDeEUsT0FBTyxJQUFJLENBQUM7aUNBQ2Y7Z0NBQ0QsS0FBSyxJQUFJLENBQUMsQ0FBQztvQ0FDUCxRQUFRO29DQUNSLE1BQU0sT0FBTyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7b0NBQ3ZCLE1BQU0sSUFBSSxHQUFHLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO29DQUMxRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyx5QkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMseUJBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQ0FDeEUsT0FBTyxJQUFJLENBQUM7aUNBQ2Y7Z0NBQ0QsS0FBSyxJQUFJLENBQUMsQ0FBQztvQ0FDUCxPQUFPO29DQUNQLE1BQU0sT0FBTyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQ0FDN0IsSUFBSSxTQUFTLEtBQUsseUJBQWEsQ0FBQyxLQUFLLEVBQUU7d0NBQ25DLE9BQU8scUJBQXFCLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLHlCQUFhLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztxQ0FDM0Y7eUNBQU0sSUFBSSxTQUFTLEtBQUsseUJBQWEsQ0FBQyxLQUFLLEVBQUU7d0NBQzFDLE9BQU8scUJBQXFCLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLHlCQUFhLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztxQ0FDM0Y7eUNBQU07d0NBQ0gsU0FBUzt3Q0FDVCxPQUFPLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSx5QkFBYSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7cUNBQzlGO2lDQUNKO2dDQUNEO29DQUNJLElBQUksRUFBRSxLQUFLLElBQUksRUFBRTt3Q0FDYixvQkFBb0I7d0NBQ3BCLElBQUksU0FBUyxLQUFLLHlCQUFhLENBQUMsS0FBSyxFQUFFOzRDQUNuQyxPQUFPLHFCQUFxQixDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSx5QkFBYSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7eUNBQ3hGOzZDQUFNLElBQUksU0FBUyxLQUFLLHlCQUFhLENBQUMsS0FBSyxFQUFFOzRDQUMxQyxPQUFPLHFCQUFxQixDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSx5QkFBYSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7eUNBQ3hGOzZDQUFNOzRDQUNILElBQUksUUFBUSxFQUFFO2dEQUNWLE9BQU8scUJBQXFCLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLHlCQUFhLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzs2Q0FDMUY7aURBQU07Z0RBQ0gsT0FBTyxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUseUJBQWEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDOzZDQUMxRjt5Q0FDSjtxQ0FDSjt5Q0FBTSxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7d0NBQ3BCLGdCQUFnQjt3Q0FDaEIsSUFBSSxTQUFTLEtBQUsseUJBQWEsQ0FBQyxLQUFLLEVBQUU7NENBQ25DLE9BQU8scUJBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLHlCQUFhLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzt5Q0FDekY7NkNBQU0sSUFBSSxTQUFTLEtBQUsseUJBQWEsQ0FBQyxLQUFLLEVBQUU7NENBQzFDLE9BQU8scUJBQXFCLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLHlCQUFhLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzt5Q0FDekY7NkNBQU07NENBQ0gsSUFBSSxRQUFRLEVBQUU7Z0RBQ1YsT0FBTyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUseUJBQWEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDOzZDQUMzRjtpREFBTTtnREFDSCxPQUFPLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSx5QkFBYSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7NkNBQzNGO3lDQUNKO3FDQUNKO3lDQUFNLElBQUksRUFBRSxLQUFLLElBQUksRUFBRTt3Q0FDcEIsTUFBTTt3Q0FDTixJQUFJLFNBQVMsS0FBSyx5QkFBYSxDQUFDLEtBQUssRUFBRTs0Q0FDbkMsT0FBTyxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUseUJBQWEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO3lDQUN4Rjs2Q0FBTSxJQUFJLFNBQVMsS0FBSyx5QkFBYSxDQUFDLEtBQUssRUFBRTs0Q0FDMUMsT0FBTyxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUseUJBQWEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO3lDQUN4Rjs2Q0FBTTs0Q0FDSCxJQUFJLFFBQVEsRUFBRTtnREFDVixPQUFPLHFCQUFxQixDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSx5QkFBYSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7NkNBQzFGO2lEQUFNO2dEQUNILE9BQU8scUJBQXFCLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLHlCQUFhLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzs2Q0FDMUY7eUNBQ0o7cUNBQ0o7eUNBQU0sSUFBSSxFQUFFLEtBQUssSUFBSSxFQUFFO3dDQUNwQixNQUFNO3dDQUNOLElBQUksU0FBUyxLQUFLLHlCQUFhLENBQUMsS0FBSyxFQUFFOzRDQUNuQyxPQUFPLHFCQUFxQixDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO3lDQUN6RTs2Q0FBTSxJQUFJLFNBQVMsS0FBSyx5QkFBYSxDQUFDLEtBQUssRUFBRTs0Q0FDMUMsT0FBTyxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzt5Q0FDekU7NkNBQU07NENBQ0gsSUFBSSxRQUFRLEVBQUU7Z0RBQ1YsT0FBTyxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUseUJBQWEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDOzZDQUN6RjtpREFBTTtnREFDSCxPQUFPLHFCQUFxQixDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSx5QkFBYSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7NkNBQ3pGO3lDQUNKO3FDQUNKO29DQUNELE1BQU07NkJBQ2I7cUJBQ1I7aUJBQ0o7YUFDSjtpQkFBTTtnQkFDSCxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNsQixJQUFJLEdBQVcsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7d0JBQ2YsSUFBSSxHQUFHLHlCQUFhLENBQUMsSUFBSSxDQUFDO3dCQUMxQixHQUFHLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO3FCQUN4Qjt5QkFBTTt3QkFDSCxHQUFHLEdBQUcsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO3FCQUN6QjtvQkFDRCxPQUFPLGFBQWEsQ0FBQyxJQUFJLEVBQUUsb0JBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUN2RDtnQkFDRCxNQUFNLElBQUksR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLElBQUksS0FBSyxJQUFJO29CQUFFLE1BQU0sQ0FBQyxNQUFNO2dCQUVoQyxPQUFPLHFCQUFxQixDQUFDLG9CQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3RGO1NBQ0o7YUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtZQUM1QixnQkFBZ0I7WUFDaEIsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzdCLE1BQU0sSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7WUFDekIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM1QyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3BELElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDZixPQUFPLElBQUksZUFBRyxDQUFDLFNBQVMsQ0FBQyxlQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNsRTtpQkFBTSxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQ3RCLE9BQU8sSUFBSSxlQUFHLENBQUMsU0FBUyxDQUFDLGVBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ2xFO2lCQUFNLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDdEIsTUFBTTthQUNUO2lCQUFNLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDdEIsT0FBTyxJQUFJLGVBQUcsQ0FBQyxTQUFTLENBQUMsZUFBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDbEU7aUJBQU07Z0JBQ0gsb0JBQW9CO2FBQ3ZCO1NBQ0o7YUFBTTtZQUNILG9CQUFvQjtTQUN2QjtRQUNELE1BQU07S0FDVDtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFFRCxJQUFpQixNQUFNLENBNEd0QjtBQTVHRCxXQUFpQixNQUFNO0lBV25CLFNBQWdCLElBQUksQ0FBQyxHQUFrQixFQUFFLElBQXFCO1FBQzFELE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNoQyxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFbEMsU0FBUyxnQkFBZ0I7WUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxXQUFXLEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDckYsQ0FBQztRQUVELE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7WUFDZCxHQUFHLENBQUMsSUFBSSxHQUFHLGdCQUFnQixFQUFFLENBQUM7WUFDOUIsT0FBTyxHQUFHLENBQUM7U0FDZDtRQUVELElBQUksSUFBSSxJQUFJLElBQUk7WUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFCLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUU7WUFDdkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QixJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7Z0JBQ2QsT0FBTztnQkFDUCxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUM3QjtpQkFBTTtnQkFDSCxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtvQkFDekIsNkJBQTZCO29CQUM3QixHQUFHLENBQUMsSUFBSSxHQUFHLGdCQUFnQixFQUFFLENBQUM7aUJBQ2pDO3FCQUFNO29CQUNILE1BQU0sSUFBSSxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztvQkFDcEQsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQzFCLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3BDLEdBQUcsR0FBRyxJQUFJLGVBQUcsQ0FBQyxTQUFTLENBQUMsZUFBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUN4RCxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztpQkFDbkI7Z0JBQ0QsT0FBTyxHQUFHLENBQUM7YUFDZDtTQUNKO1FBQ0QsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLE9BQU8sSUFBSSxLQUFLLENBQUMsRUFBRTtZQUNmLElBQUk7Z0JBQ0EsTUFBTSxHQUFHLElBQUEsVUFBRyxFQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbEMsTUFBTTthQUNUO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1YsbUJBQW1CO2dCQUNuQixJQUFJLEVBQUUsQ0FBQzthQUNWO1NBQ0o7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDLENBQUM7WUFDdkUsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLDRDQUE0QyxDQUFDLENBQUMsQ0FBQztZQUN4RSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxNQUFNLElBQUksa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDeEU7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBcERlLFdBQUksT0FvRG5CLENBQUE7SUFDRCxTQUFnQixPQUFPLENBQUMsR0FBZ0IsRUFBRSxJQUFZLEVBQUUsSUFBcUI7UUFDekUsTUFBTSxVQUFVLEdBQW9CLEVBQUUsQ0FBQztRQUN2QyxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLG9CQUFhLENBQUMsQ0FBQztRQUNuQyxJQUFJLElBQUksR0FBeUIsSUFBSSxDQUFDO1FBQ3RDLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNoQixPQUFPLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDaEUsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQztTQUN4QjtRQUNELE9BQU8sSUFBSSxlQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBVmUsY0FBTyxVQVV0QixDQUFBO0lBRUQ7O09BRUc7SUFDSCxTQUFnQixLQUFLLENBQUMsTUFBMkIsRUFBRSxJQUErQjtRQUM5RSxNQUFNLE1BQU0sR0FBRyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUEsWUFBSyxFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDbkUsTUFBTSxHQUFHLEdBQUcsSUFBSSxvQkFBYSxFQUFFLENBQUM7UUFDaEMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWpDLElBQUksS0FBYyxDQUFDO1FBQ25CLElBQUksT0FBTyxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQzNCLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDYixJQUFJLEdBQUc7Z0JBQ0gsS0FBSyxFQUFFLElBQUk7YUFDZCxDQUFDO1NBQ0w7YUFBTTtZQUNILEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xDO1FBRUQsTUFBTSxLQUFLLEdBQW9CLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLElBQUksR0FBeUIsSUFBSSxDQUFDO1FBQ3RDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDM0IsT0FBTyxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQzNELE1BQU0sTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQy9CLElBQUksQ0FBQyxLQUFLO2dCQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBQSxVQUFHLEVBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM3RixHQUFHLEdBQUcsTUFBTSxDQUFDO1lBQ2IsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwQjtRQUVELE9BQU8sSUFBSSxlQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBNUJlLFlBQUssUUE0QnBCLENBQUE7QUFDTCxDQUFDLEVBNUdnQixNQUFNLEdBQU4sY0FBTSxLQUFOLGNBQU0sUUE0R3RCIn0=