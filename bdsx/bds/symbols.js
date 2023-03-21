"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proc2 = exports.proc = void 0;
const fs = require("fs");
const path = require("path");
const config_1 = require("../config");
const core_1 = require("../core");
const dllraw_1 = require("../dllraw");
const fsutil_1 = require("../fsutil");
const pdbcache_1 = require("../pdbcache");
const source_map_support_1 = require("../source-map-support");
const textparser_1 = require("../textparser");
const util_1 = require("../util");
var procNamespace;
(function (procNamespace) {
    procNamespace.vftable = {};
})(procNamespace || (procNamespace = {}));
/**
 * @remark Backward compatibility cannot be guaranteed. The symbol name can be changed by BDS updating.
 */
exports.proc = procNamespace;
exports.proc.__proto__ = new Proxy({}, {
    get(target, key) {
        if (typeof key !== "string") {
            return target[key];
        }
        else {
            const rva = pdbcache_1.pdbcache.search(key);
            if (rva === -1)
                (0, source_map_support_1.destackThrow)(Error(`Symbol not found: ${key}`), 1);
            PdbCacheL2.addRva(key, rva);
            const value = dllraw_1.dllraw.current.add(rva);
            Object.defineProperty(exports.proc, key, { value });
            return value;
        }
    },
    has(target, key) {
        if (typeof key !== "string") {
            return key in target;
        }
        const rva = pdbcache_1.pdbcache.search(key);
        if (rva !== -1) {
            PdbCacheL2.addRva(key, rva);
            const value = dllraw_1.dllraw.current.add(rva);
            Object.defineProperty(exports.proc, key, { value });
            return true;
        }
        else {
            return false;
        }
    },
});
function getVftableOffset(key) {
    const [from, target] = key.split("\\", 2);
    const vftableSearch = exports.proc[from].add();
    const targetptr = exports.proc[target];
    const base = dllraw_1.dllraw.current.getAddressBin();
    let offset = 0;
    while (offset < 4096) {
        let ptr;
        try {
            ptr = vftableSearch.readPointer();
        }
        catch (err) {
            // access violation expected
            break;
        }
        const diff = ptr.subBin(base);
        const rva_high = diff.getAddressHigh();
        const rva = diff.getAddressLow();
        if (rva_high !== 0) {
            break; // invalid
        }
        if (rva < 0x1000) {
            break; // too low
        }
        if (rva >= 0x1000000000) {
            break; // too big
        }
        if (ptr.equalsptr(targetptr)) {
            PdbCacheL2.addVftableOffset(key, offset);
            const value = [offset];
            Object.freeze(value);
            Object.defineProperty(exports.proc.vftable, key, { value });
            return value;
        }
        offset += 8;
    }
    return null;
}
exports.proc.vftable.__proto__ = new Proxy({}, {
    get(target, key) {
        if (typeof key !== "string") {
            return target[key];
        }
        else {
            const offset = getVftableOffset(key);
            if (offset === null) {
                throw Error(`vftable offset not found: ${key}`);
            }
            return offset;
        }
    },
    has(target, key) {
        if (typeof key !== "string") {
            return key in target;
        }
        return getVftableOffset(key) !== null;
    },
});
/** @deprecated use proc */
exports.proc2 = exports.proc;
const cachePath = path.join(config_1.Config.BDS_PATH, "pdbcache.l2");
class PdbCacheL2 {
    constructor(appendMode) {
        this.appendMode = appendMode;
        this.saving = false;
        this.saveRequestedAgain = false;
        this.contents = "";
        if (!this.appendMode) {
            this.contents = `${core_1.bedrock_server_exe.md5}\n`;
        }
    }
    static load() {
        let content;
        try {
            content = fs.readFileSync(cachePath, "utf8");
        }
        catch (err) {
            // file not found
            PdbCacheL2.instance = new PdbCacheL2(false);
            return;
        }
        const reader = new textparser_1.TextParser(content);
        const line = reader.readLine();
        if (line !== core_1.bedrock_server_exe.md5) {
            // md5 mismatch
            PdbCacheL2.instance = new PdbCacheL2(false);
            return;
        }
        const procProperties = {};
        const vftableProperties = {};
        for (;;) {
            const line = reader.readLine();
            if (line == null)
                break;
            const values = line.split("|");
            const first = values[0];
            switch (first) {
                case "v": {
                    // vftable offset
                    const key = values[1];
                    const offset = parseInt(values[2], 16);
                    const value = [offset];
                    Object.freeze(value);
                    vftableProperties[key] = { value };
                    break;
                }
                default: {
                    // rva
                    const rva = parseInt(values[1], 16);
                    const value = dllraw_1.dllraw.current.add(rva);
                    procProperties[first] = { value };
                    break;
                }
            }
        }
        Object.defineProperties(exports.proc.vftable, vftableProperties);
        Object.defineProperties(exports.proc, procProperties);
    }
    static addRva(symbol, rva) {
        if (PdbCacheL2.instance === null) {
            PdbCacheL2.instance = new PdbCacheL2(true);
        }
        const cache = PdbCacheL2.instance;
        cache.contents += symbol;
        cache.contents += "|";
        cache.contents += rva.toString(16);
        cache.contents += "\n";
        cache._save();
    }
    static addVftableOffset(symbol, offset) {
        if (PdbCacheL2.instance === null) {
            PdbCacheL2.instance = new PdbCacheL2(true);
        }
        const cache = PdbCacheL2.instance;
        cache.contents += "v|";
        cache.contents += symbol;
        cache.contents += "|";
        cache.contents += offset.toString(16);
        cache.contents += "\n";
        cache._save();
    }
    async _save() {
        if (this.saving) {
            this.saveRequestedAgain = true;
            return;
        }
        this.saving = true;
        await (0, util_1.timeout)(10);
        try {
            for (;;) {
                const contents = this.contents;
                this.contents = "";
                if (this.appendMode) {
                    await fsutil_1.fsutil.appendFile(cachePath, contents);
                }
                else {
                    await fsutil_1.fsutil.writeFile(cachePath, contents);
                    this.appendMode = true;
                }
                if (!this.saveRequestedAgain)
                    break;
                this.saveRequestedAgain = false;
            }
        }
        finally {
            this.saving = false;
        }
    }
}
PdbCacheL2.instance = null;
PdbCacheL2.load();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ltYm9scy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN5bWJvbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QixzQ0FBbUM7QUFDbkMsa0NBQXlFO0FBQ3pFLHNDQUFtQztBQUNuQyxzQ0FBbUM7QUFDbkMsMENBQXVDO0FBQ3ZDLDhEQUFxRDtBQUNyRCw4Q0FBMkM7QUFDM0Msa0NBQWtDO0FBRWxDLElBQVUsYUFBYSxDQUV0QjtBQUZELFdBQVUsYUFBYTtJQUNOLHFCQUFPLEdBQWtELEVBQUUsQ0FBQztBQUM3RSxDQUFDLEVBRlMsYUFBYSxLQUFiLGFBQWEsUUFFdEI7QUFFRDs7R0FFRztBQUNVLFFBQUEsSUFBSSxHQUFHLGFBRUksQ0FBQztBQUV4QixZQUFZLENBQUMsU0FBUyxHQUFHLElBQUksS0FBSyxDQUMvQixFQUFFLEVBQ0Y7SUFDSSxHQUFHLENBQUMsTUFBb0MsRUFBRSxHQUFHO1FBQ3pDLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQ3pCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3RCO2FBQU07WUFDSCxNQUFNLEdBQUcsR0FBRyxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7Z0JBQUUsSUFBQSxpQ0FBWSxFQUFDLEtBQUssQ0FBQyxxQkFBcUIsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuRSxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM1QixNQUFNLEtBQUssR0FBRyxlQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUMsY0FBYyxDQUFDLFlBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQzVDLE9BQU8sS0FB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