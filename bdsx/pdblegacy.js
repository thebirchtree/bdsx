"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdblegacy = void 0;
const colors = require("colors");
const fs = require("fs");
const path = require("path");
const symbols_1 = require("./bds/symbols");
const core_1 = require("./core");
const dllraw_1 = require("./dllraw");
const fsutil_1 = require("./fsutil");
const pdbcache_1 = require("./pdbcache");
const wildcardRemap = {
    "*": ".+",
    "[": "\\[",
    "(": "\\(",
    ".": "\\.",
    "+": "\\+",
    "{": "\\{",
    "^": "\\^",
    $: "\\$",
    "\\": "\\\\",
};
/**
 * @deprecated
 */
var pdblegacy;
(function (pdblegacy) {
    pdblegacy.coreCachePath = path.join(fsutil_1.fsutil.projectPath, "legacy_pdb_cache.ini");
    function close() {
        // does nothing
    }
    pdblegacy.close = close;
    /**
     * get symbols from cache.
     * if symbols don't exist in cache. it reads pdb.
     * @returns 'out' the first parameter.
     */
    function getList(cacheFilePath, out, names, quiet, undecorateFlags) {
        const namesMap = new Set(names);
        let lineEnd = false;
        let newContent = false;
        try {
            const regexp = /^[ \t\0]*(.*[^ \t\0])[ \t\0]*=[ \t\0]*(.+)$/gm;
            const content = fs.readFileSync(cacheFilePath, "utf8");
            const firstLine = content.indexOf("\n");
            if (content.substr(0, firstLine).trim() === core_1.bedrock_server_exe.md5) {
                lineEnd = content.endsWith("\n");
                regexp.lastIndex = firstLine + 1;
                let matched = null;
                while ((matched = regexp.exec(content)) !== null) {
                    const symbol = matched[1];
                    namesMap.delete(symbol);
                    out[symbol] = dllraw_1.dllraw.current.add(+matched[2]);
                }
            }
            else {
                newContent = true;
            }
        }
        catch (err) {
            newContent = true;
        }
        if (namesMap.size !== 0) {
            if (!quiet)
                console.error(colors.yellow(`[pdblegacy] Symbol searching...`));
            let content = newContent ? core_1.bedrock_server_exe.md5 + "\r\n" : lineEnd ? "" : "\r\n";
            if (undecorateFlags == null) {
                for (const name of namesMap) {
                    const addr = symbols_1.proc[name];
                    out[name] = addr;
                    if (addr == null) {
                        if (!quiet)
                            console.error(colors.red(`[pdblegacy] Symbol not found: ${name}`));
                    }
                    else {
                        content += `${name} = 0x${addr.subptr(dllraw_1.dllraw.current).toString(16)}\r\n`;
                    }
                }
            }
            else {
                for (const symbol of pdbcache_1.pdbcache.readKeys()) {
                    const name = core_1.pdb.undecorate(symbol, undecorateFlags);
                    if (namesMap.delete(name)) {
                        const addr = symbols_1.proc[symbol];
                        out[name] = addr;
                        if (addr == null) {
                            if (!quiet)
                                console.error(colors.red(`[pdblegacy] Symbol not found: ${name}`));
                        }
                        else {
                            content += `${name} = 0x${addr.subptr(dllraw_1.dllraw.current).toString(16)}\r\n`;
                        }
                        if (namesMap.size === 0)
                            break;
                    }
                }
            }
            if (newContent) {
                fs.writeFileSync(cacheFilePath, content, "utf8");
            }
            else if (content !== "") {
                fs.appendFileSync(cacheFilePath, content, "utf8");
            }
        }
        return out;
    }
    pdblegacy.getList = getList;
    function search(filter, callback) {
        if (filter == null) {
            for (const key of pdbcache_1.pdbcache.readKeys()) {
                if (!callback(key, symbols_1.proc[key]))
                    break;
            }
        }
        else if (typeof filter === "string") {
            const regexp = new RegExp(filter.replace(/[*[(.+{^$\\]/g, str => wildcardRemap[str]));
            for (const key of pdbcache_1.pdbcache.readKeys()) {
                if (regexp.test(key)) {
                    if (!callback(key, symbols_1.proc[key]))
                        break;
                }
            }
        }
        else if (filter instanceof Array) {
            const names = new Map();
            for (let i = 0; i < filter.length; i++) {
                names.set(filter[i], i);
            }
            for (const key of pdbcache_1.pdbcache.readKeys()) {
                const idx = names.get(key);
                if (idx == null)
                    continue;
                if (!callback(key, symbols_1.proc[key], idx))
                    break;
            }
        }
        else {
            for (const key of pdbcache_1.pdbcache.readKeys()) {
                if (!filter(key, symbols_1.proc[key]))
                    break;
            }
        }
    }
    pdblegacy.search = search;
    function getAll(onprogress) {
        let count = 0;
        let next = Date.now() + 500;
        for (const key of pdbcache_1.pdbcache.readKeys()) {
            symbols_1.proc[key];
            const now = Date.now();
            if (now > next) {
                if (onprogress != null) {
                    onprogress(count);
                }
                next += 500;
            }
            count++;
        }
        return symbols_1.proc;
    }
    pdblegacy.getAll = getAll;
    /**
     * get all symbols.
     * @param read calbacked per 100ms, stop the looping if it returns false
     */
    function getAllEx(read) {
        let count = 0;
        let next = Date.now() + 100;
        const array = [];
        for (const key of pdbcache_1.pdbcache.readKeys()) {
            symbols_1.proc[key];
            const now = Date.now();
            if (now > next) {
                const res = read(array);
                next += 100;
            }
            count++;
        }
    }
    pdblegacy.getAllEx = getAllEx;
})(pdblegacy = exports.pdblegacy || (exports.pdblegacy = {}));
for (const key in pdblegacy) {
    core_1.pdb[key] = pdblegacy[key];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRibGVnYWN5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGRibGVnYWN5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUFpQztBQUNqQyx5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLDJDQUFxQztBQUNyQyxpQ0FBZ0U7QUFDaEUscUNBQWtDO0FBQ2xDLHFDQUFrQztBQUNsQyx5Q0FBc0M7QUFFdEMsTUFBTSxhQUFhLEdBQTJCO0lBQzFDLEdBQUcsRUFBRSxJQUFJO0lBQ1QsR0FBRyxFQUFFLEtBQUs7SUFDVixHQUFHLEVBQUUsS0FBSztJQUNWLEdBQUcsRUFBRSxLQUFLO0lBQ1YsR0FBRyxFQUFFLEtBQUs7SUFDVixHQUFHLEVBQUUsS0FBSztJQUNWLEdBQUcsRUFBRSxLQUFLO0lBQ1YsQ0FBQyxFQUFFLEtBQUs7SUFDUixJQUFJLEVBQUUsTUFBTTtDQUNmLENBQUM7QUFFRjs7R0FFRztBQUNILElBQWlCLFNBQVMsQ0EySnpCO0FBM0pELFdBQWlCLFNBQVM7SUFDVCx1QkFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBTSxDQUFDLFdBQVcsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0lBRW5GLFNBQWdCLEtBQUs7UUFDakIsZUFBZTtJQUNuQixDQUFDO0lBRmUsZUFBSyxRQUVwQixDQUFBO0lBRUQ7Ozs7T0FJRztJQUNILFNBQWdCLE9BQU8sQ0FDbkIsYUFBcUIsRUFDckIsR0FBUSxFQUNSLEtBQVcsRUFDWCxLQUFlLEVBQ2YsZUFBd0I7UUFFeEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLENBQVMsS0FBSyxDQUFDLENBQUM7UUFDeEMsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJO1lBQ0EsTUFBTSxNQUFNLEdBQUcsK0NBQStDLENBQUM7WUFDL0QsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsTUFBTSxD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