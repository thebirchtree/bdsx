"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdbCache = void 0;
const fs = require("fs");
const path = require("path");
const core_1 = require("../core");
const dbghelp_1 = require("../dbghelp");
const dll_1 = require("../dll");
const pdblegacy_1 = require("../pdblegacy");
const cachepath = path.join(__dirname, "pdbcachedata.bin");
const VERSION = 1;
function makePdbCache() {
    if (fs.existsSync(cachepath)) {
        const fd = fs.openSync(cachepath, "r");
        const buffer = new Int32Array(1);
        fs.readSync(fd, buffer, 0, 4, null);
        if (buffer[0] === VERSION)
            return fd;
        fs.closeSync(fd);
    }
    let no = 0;
    const filtered = [];
    const fd = fs.openSync(cachepath, "w");
    const old = core_1.pdb.setOptions(dbghelp_1.SYMOPT_PUBLICS_ONLY);
    pdblegacy_1.pdblegacy.getAllEx(symbols => {
        for (const info of symbols) {
            let item = info.name;
            no++;
            if (item.length > 2000) {
                console.log(`skipped ${no}, too long (deco_length == ${item.length})`);
                continue; // too long
            }
            if (item.startsWith("__imp_?")) {
                // ?
                item = item.substr(6);
            }
            item = core_1.pdb.undecorate(item, dbghelp_1.UNDNAME_COMPLETE);
            if (item.startsWith("?")) {
                console.log(`unresolved symbol: ${item}`);
                continue;
            }
            if (item.length > 4050) {
                console.log(`skipped ${no}, too long (undeo_length == ${item.length})`);
                continue; // too long
            }
            if (item.startsWith("__IMPORT_DESCRIPTOR_api-")) {
                // ?
                continue;
            }
            if (item.startsWith("_CT??")) {
                // ?
                continue;
            }
            if (item.startsWith("__@@_")) {
                // ?
                continue;
            }
            if (item.startsWith("\x7f")) {
                // ?
                continue;
            }
            if (/^_CTA\d\?/.test(item)) {
                // ?
                continue;
            }
            if (/^_TI\d\?/.test(item)) {
                // ?
                continue;
            }
            if (item.startsWith("_TI5?")) {
                // ?
                continue;
            }
            if (item.startsWith("TSS0<`template-parameter-2',")) {
                // ?
                continue;
            }
            if (/^__real@[0-9a-z]+$/.test(item)) {
                // constant values
                continue;
            }
            if (/^__xmm@[0-9a-z]+$/.test(item)) {
                // constant values
                continue;
            }
            if (/^__sse2_sinf4@@[0-9a-z]+$/.test(item)) {
                // constant values
                continue;
            }
            if (/^__sse4_sinf4@@[0-9a-z]+$/.test(item)) {
                // constant values
                continue;
            }
            const undeco = core_1.pdb.undecorate(item, dbghelp_1.UNDNAME_NAME_ONLY);
            const address = info.address.subptr(dll_1.dll.current);
            filtered.push([address, undeco]);
        }
    });
    core_1.pdb.setOptions(old);
    const intv = new Int32Array(3);
    const NULL = Buffer.alloc(1);
    NULL[0] = 0;
    intv[0] = VERSION;
    intv[1] = filtered.length;
    fs.writeSync(fd, intv.subarray(0, 2));
    for (const [address, name] of filtered) {
        intv[0] = address;
        fs.writeSync(fd, intv, 0, 4);
        fs.writeSync(fd, name);
        fs.writeSync(fd, NULL);
    }
    fs.closeSync(fd);
    const rfd = fs.openSync(cachepath, "r");
    fs.readSync(rfd, intv, 0, 4, null);
    return rfd;
}
const BUFFER_SIZE = 1024 * 16;
class PdbCache {
    constructor() {
        this.buffer = Buffer.alloc(BUFFER_SIZE);
        this.offset = 0;
        this.bufsize = 0;
        this.fd = makePdbCache();
        this.total = this._readInt();
    }
    static clearCache() {
        try {
            fs.unlinkSync(cachepath);
        }
        catch (err) { }
    }
    close() {
        fs.closeSync(this.fd);
    }
    _readMore() {
        const remained = this.bufsize - this.offset;
        this.buffer.set(this.buffer.subarray(this.offset));
        this.bufsize = fs.readSync(this.fd, this.buffer, remained, BUFFER_SIZE - remained, null) + remained;
        this.offset = 0;
    }
    _readInt() {
        if (this.bufsize - this.offset < 4)
            this._readMore();
        const n = this.buffer.readInt32LE(this.offset);
        this.offset += 4;
        return n;
    }
    _readString() {
        let nullend = this.buffer.indexOf(0, this.offset);
        if (nullend === -1) {
            this._readMore();
            nullend = this.buffer.indexOf(0, this.offset);
            if (nullend === -1)
                throw Error(`Null character not found`);
        }
        const str = this.buffer.subarray(this.offset, nullend).toString("utf8");
        this.offset = nullend + 1;
        return str;
    }
    *[Symbol.iterator]() {
        for (;;) {
            const address = this._readInt();
            const tag = this._readInt();
            const flags = this._readInt();
            const name = this._readString();
            yield { address, tag, flags, name };
        }
    }
}
exports.PdbCache = PdbCache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRiY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwZGJjYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLGtDQUE4QjtBQUM5Qix3Q0FBc0Y7QUFDdEYsZ0NBQTZCO0FBQzdCLDRDQUF5QztBQUV6QyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0FBQzNELE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQztBQUVsQixTQUFTLFlBQVk7SUFDakIsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQzFCLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLE9BQU87WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUNyQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3BCO0lBQ0QsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1gsTUFBTSxRQUFRLEdBQXVCLEVBQUUsQ0FBQztJQUN4QyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN2QyxNQUFNLEdBQUcsR0FBRyxVQUFHLENBQUMsVUFBVSxDQUFDLDZCQUFtQixDQUFDLENBQUM7SUFDaEQscUJBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDekIsS0FBSyxNQUFNLElBQUksSUFBSSxP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