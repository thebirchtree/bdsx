"use strict";
// fsutil.ts should be compatible with old node.js
// it's used by BDS installer
Object.defineProperty(exports, "__esModule", { value: true });
exports.fsutil = void 0;
const fs = require("fs");
const os = require("os");
const path = require("path");
const bufferstream_1 = require("./writer/bufferstream");
class DirentFromStat extends (fs.Dirent || class {
}) {
    constructor(name, stat) {
        super();
        this.stat = stat;
        this.name = name;
    }
    isFile() {
        return this.stat.isFile();
    }
    isDirectory() {
        return this.stat.isDirectory();
    }
    isBlockDevice() {
        return this.stat.isBlockDevice();
    }
    isCharacterDevice() {
        return this.stat.isCharacterDevice();
    }
    isSymbolicLink() {
        return this.stat.isSymbolicLink();
    }
    isFIFO() {
        return this.stat.isFIFO();
    }
    isSocket() {
        return this.stat.isSocket();
    }
}
function mkdirRaw(path) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, err => {
            if (err !== null) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}
async function mkdirRecursiveWithDirSet(dirpath, dirhas) {
    if (dirhas.has(dirpath))
        return;
    const parent = path.dirname(dirpath);
    if (parent === dirpath)
        return;
    await mkdirRecursiveWithDirSet(parent, dirhas);
    await fsutil.mkdir(dirpath);
}
var fsutil;
(function (fsutil) {
    let dirname = path.dirname(__dirname);
    const dirparsed = path.parse(dirname);
    if (dirparsed.base === "node_modules") {
        // bypass the issue on Wine & BDSX
        // Wine & node cannot resolve the linked module path.
        dirname = dirparsed.dir;
    }
    fsutil.projectPath = dirname;
    /** @deprecated use fsutil.projectPath */
    function getProjectPath() {
        return fsutil.projectPath;
    }
    fsutil.getProjectPath = getProjectPath;
    function isDirectory(filepath) {
        return new Promise((resolve, reject) => {
            fs.stat(filepath, (err, stat) => {
                if (err !== null) {
                    if (err.code === "ENOENT")
                        resolve(false);
                    else
                        reject(err);
                }
                else {
                    resolve(stat.isDirectory());
                }
            });
        });
    }
    fsutil.isDirectory = isDirectory;
    function isFile(filepath) {
        return new Promise((resolve, reject) => {
            fs.stat(filepath, (err, stat) => {
                if (err !== null) {
                    if (err.code === "ENOENT")
                        resolve(false);
                    else
                        reject(err);
                }
                else {
                    resolve(stat.isFile());
                }
            });
        });
    }
    fsutil.isFile = isFile;
    function isDirectorySync(filepath) {
        try {
            return fs.statSync(filepath).isDirectory();
        }
        catch (err) {
            return false;
        }
    }
    fsutil.isDirectorySync = isDirectorySync;
    function isFileSync(filepath) {
        try {
            return fs.statSync(filepath).isFile();
        }
        catch (err) {
            return false;
        }
    }
    fsutil.isFileSync = isFileSync;
    function checkModified(ori, out) {
        return new Promise((resolve, reject) => {
            fs.stat(ori, (err, ostat) => {
                if (err !== null) {
                    reject(err);
                }
                else {
                    fs.stat(out, (err, nstat) => {
                        if (err !== null)
                            resolve(true);
                        else
                            resolve(ostat.mtimeMs >= nstat.mtimeMs);
                    });
                }
            });
        });
    }
    fsutil.checkModified = checkModified;
    function checkModifiedSync(ori, out) {
        const ostat = fs.statSync(ori);
        try {
            const nstat = fs.statSync(out);
            return ostat.mtimeMs >= nstat.mtimeMs;
        }
        catch (err) {
            return true;
        }
    }
    fsutil.checkModifiedSync = checkModifiedSync;
    function readFile(path, encoding) {
        if (encoding === undefined)
            encoding = "utf-8";
        return new Promise((resolve, reject) => {
            fs.readFile(path, encoding, (err, data) => {
                if (err !== null)
                    reject(err);
                else
                    resolve(data);
            });
        });
    }
    fsutil.readFile = readFile;
    function writeFile(path, content) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, content, err => {
                if (err !== null)
                    reject(err);
                else
                    resolve();
            });
        });
    }
    fsutil.writeFile = writeFile;
    function writeStream(path, stream) {
        return new Promise((resolve, reject) => {
            const out = fs.createWriteStream(path);
            stream.pipe(out).on("finish", resolve).on("error", reject);
        });
    }
    fsutil.writeStream = writeStream;
    function appendFile(path, content) {
        return new Promise((resolve, reject) => {
            fs.appendFile(path, content, err => {
                if (err !== null)
                    reject(err);
                else
                    resolve();
            });
        });
    }
    fsutil.appendFile = appendFile;
    /**
     * uses system EOL and add a last line
     */
    function writeJson(path, content) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, JSON.stringify(content, null, 2).replace(/\n/g, os.EOL) + os.EOL, "utf8", err => {
                if (err !== null)
                    reject(err);
                else
                    resolve();
            });
        });
    }
    fsutil.writeJson = writeJson;
    /**
     * uses system EOL and add a last line
     */
    function writeJsonSync(path, content) {
        fs.writeFileSync(path, JSON.stringify(content, null, 2).replace(/\n/g, os.EOL) + os.EOL, "utf8");
    }
    fsutil.writeJsonSync = writeJsonSync;
    function readdir(path) {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, data) => {
                if (err !== null) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    fsutil.readdir = readdir;
    function readdirWithFileTypes(path) {
        return new Promise((resolve, reject) => {
            fs.readdir(path, { withFileTypes: true }, (err, data) => {
                if (err !== null) {
                    if (err.code === "ENOENT")
                        resolve([]);
                    else
                        reject(err);
                }
                else {
                    if (data.length !== 0 && typeof data[0] === "string") {
                        (async () => {
                            const stats = [];
                            for (const d of data) {
                                const stat = await fsutil.stat(d);
                                stats.push(new DirentFromStat(d, stat));
                            }
                            resolve(stats);
                        })();
                    }
                    else {
                        resolve(data);
                    }
                }
            });
        });
    }
    fsutil.readdirWithFileTypes = readdirWithFileTypes;
    function readdirWithFileTypesSync(path) {
        const data = fs.readdirSync(path, { withFileTypes: true });
        if (data.length !== 0 && typeof data[0] === "string") {
            const stats = [];
            for (const d of data) {
                const stat = fs.statSync(d);
                stats.push(new DirentFromStat(d, stat));
            }
            return stats;
        }
        else {
            return data;
        }
    }
    fsutil.readdirWithFileTypesSync = readdirWithFileTypesSync;
    function opendir(path) {
        return new Promise((resolve, reject) => {
            fs.opendir(path, (err, dir) => {
                if (err !== null)
                    reject(err);
                else
                    resolve(dir);
            });
        });
    }
    fsutil.opendir = opendir;
    function mkdir(path) {
        return new Promise((resolve, reject) => {
            fs.mkdir(path, err => {
                if (err !== null) {
                    if (err.code === "EEXIST")
                        resolve();
                    else
                        reject(err);
                }
                else
                    resolve();
            });
        });
    }
    fsutil.mkdir = mkdir;
    async function mkdirRecursive(dirpath, dirhas) {
        if (dirhas == null) {
            await mkdirRecursiveFromBack(dirpath);
            return;
        }
        await mkdirRecursiveWithDirSet(dirpath, dirhas);
    }
    fsutil.mkdirRecursive = mkdirRecursive;
    async function mkdirRecursiveFromBack(dir) {
        try {
            await mkdirRaw(dir);
            return false;
        }
        catch (err) {
            if (err.code === "EEXIST") {
                return true;
            }
            else if (["EACCES", "EPERM", "EISDIR"].indexOf(err.code) !== -1) {
                throw err;
            }
        }
        await mkdirRecursiveFromBack(path.dirname(dir));
        try {
            await mkdirRaw(dir);
        }
        catch (err) {
            if (err.code === "EEXIST") {
                return true;
            }
            else {
                throw err;
            }
        }
        return false;
    }
    fsutil.mkdirRecursiveFromBack = mkdirRecursiveFromBack;
    function rmdir(path) {
        return new Promise((resolve, reject) => {
            fs.rmdir(path, err => {
                if (err !== null)
                    reject(err);
                else
                    resolve();
            });
        });
    }
    fsutil.rmdir = rmdir;
    function stat(path) {
        return new Promise((resolve, reject) => {
            fs.stat(path, (err, data) => {
                if (err !== null)
                    reject(err);
                else
                    resolve(data);
            });
        });
    }
    fsutil.stat = stat;
    function lstat(path) {
        return new Promise((resolve, reject) => {
            fs.lstat(path, (err, data) => {
                if (err !== null)
                    reject(err);
                else
                    resolve(data);
            });
        });
    }
    fsutil.lstat = lstat;
    function utimes(path, atime, mtime) {
        return new Promise((resolve, reject) => {
            fs.utimes(path, atime, mtime, err => {
                if (err !== null)
                    reject(err);
                else
                    resolve();
            });
        });
    }
    fsutil.utimes = utimes;
    function unlink(path) {
        return new Promise((resolve, reject) => {
            fs.unlink(path, err => {
                if (err !== null)
                    reject(err);
                else
                    resolve();
            });
        });
    }
    fsutil.unlink = unlink;
    async function unlinkRecursive(filepath) {
        async function unlinkDir(filepath) {
            const files = await readdirWithFileTypes(filepath);
            for (const stat of files) {
                const childpath = filepath + path.sep + stat.name;
                if (stat.isDirectory()) {
                    await unlinkDir(childpath);
                }
                else {
                    await unlink(childpath);
                }
            }
        }
        async function unlinkAny(stat, childpath) {
            if (stat.isDirectory()) {
                await unlinkDir(childpath);
            }
            else if (stat.isFile()) {
                await unlink(childpath);
            }
        }
        const st = await stat(filepath);
        await unlinkAny(st, filepath);
    }
    fsutil.unlinkRecursive = unlinkRecursive;
    function unlinkRecursiveSync(filepath) {
        function unlinkDir(filepath) {
            const files = readdirWithFileTypesSync(filepath);
            for (const stat of files) {
                const childpath = filepath + path.sep + stat.name;
                if (stat.isDirectory()) {
                    unlinkDir(childpath);
                }
                else {
                    unlink(childpath);
                }
            }
        }
        function unlinkAny(stat, childpath) {
            if (stat.isDirectory()) {
                unlinkDir(childpath);
            }
            else if (stat.isFile()) {
                unlink(childpath);
            }
        }
        const st = fs.statSync(filepath);
        unlinkAny(st, filepath);
    }
    fsutil.unlinkRecursiveSync = unlinkRecursiveSync;
    function copyFile(from, to) {
        if (fs.copyFile != null) {
            return new Promise((resolve, reject) => fs.copyFile(from, to, err => {
                if (err !== null)
                    reject(err);
                else
                    resolve();
            }));
        }
        else {
            return new Promise((resolve, reject) => {
                const rd = fs.createReadStream(from);
                rd.on("error", reject);
                const wr = fs.createWriteStream(to);
                wr.on("error", reject);
                wr.on("close", () => {
                    resolve();
                });
                rd.pipe(wr);
            });
        }
    }
    fsutil.copyFile = copyFile;
    async function exists(path) {
        try {
            await stat(path);
            return true;
        }
        catch (err) {
            return false;
        }
    }
    fsutil.exists = exists;
    async function del(filepath) {
        const s = await stat(filepath);
        if (s.isDirectory()) {
            const files = await readdir(filepath);
            for (const file of files) {
                await del(path.join(filepath, file));
            }
            await rmdir(filepath);
        }
        else {
            await unlink(filepath);
        }
    }
    fsutil.del = del;
    function unlinkQuiet(path) {
        return new Promise(resolve => {
            fs.unlink(path, err => resolve(err !== null));
        });
    }
    fsutil.unlinkQuiet = unlinkQuiet;
    function symlink(target, path, type) {
        return new Promise((resolve, reject) => {
            fs.symlink(target, path, type, err => {
                if (err !== null)
                    reject(err);
                else
                    resolve();
            });
        });
    }
    fsutil.symlink = symlink;
    function readFirstLineSync(path) {
        const fd = fs.openSync(path, "r");
        const BUF_SIZE = 4 * 1024;
        const writer = new bufferstream_1.BufferWriter(new Uint8Array(BUF_SIZE), 0);
        for (;;) {
            const off = writer.size;
            writer.resize(off + BUF_SIZE);
            const readlen = fs.readSync(fd, writer.array, off, BUF_SIZE, null);
            writer.size = off + readlen;
            const buf = writer.buffer();
            let idx;
            if (readlen !== 0) {
                idx = buf.indexOf(0x0a, off); // ASCII of \n
                if (idx === -1)
                    continue;
                if (writer.array[idx - 1] === 0xd) {
                    // ASCII of \r
                    idx--;
                }
            }
            else {
                idx = buf.length;
            }
            fs.closeSync(fd);
            return Buffer.from(buf.buffer, buf.byteOffset, idx).toString();
        }
    }
    fsutil.readFirstLineSync = readFirstLineSync;
    function rename(oldPath, newPath) {
        return new Promise((resolve, reject) => fs.rename(oldPath, newPath, err => {
            if (err !== null)
                reject(err);
            else
                resolve();
        }));
    }
    fsutil.rename = rename;
    class DirectoryMaker {
        constructor() {
            this.dirhas = new Set();
        }
        async make(pathname) {
            const resolved = path.resolve(pathname);
            if (this.dirhas.has(resolved))
                return;
            await mkdirRecursive(resolved, this.dirhas);
            this.dirhas.add(resolved);
        }
        del(pathname) {
            const resolved = path.resolve(pathname);
            for (const dir of this.dirhas) {
                if (dir.startsWith(resolved)) {
                    if (dir.length === resolved.length || dir.charAt(resolved.length) === path.sep) {
                        this.dirhas.delete(dir);
                    }
                }
            }
        }
    }
    fsutil.DirectoryMaker = DirectoryMaker;
})(fsutil = exports.fsutil || (exports.fsutil = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnN1dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnN1dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxrREFBa0Q7QUFDbEQsNkJBQTZCOzs7QUFFN0IseUJBQXlCO0FBQ3pCLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFDN0Isd0RBQXFEO0FBRXJELE1BQU0sY0FBZSxTQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSTtDQUFRLENBQUM7SUFDaEQsWUFBWSxJQUFZLEVBQW1CLElBQWM7UUFDckQsS0FBSyxFQUFFLENBQUM7UUFEK0IsU0FBSSxHQUFKLElBQUksQ0FBVTtRQUVyRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQsTUFBTTtRQUNGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBQ0QsV0FBVztRQUNQLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBQ0QsYUFBYTtRQUNULE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsaUJBQWlCO1FBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDekMsQ0FBQztJQUNELGNBQWM7UUFDVixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUNELE1BQU07UUFDRixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUNELFFBQVE7UUFDSixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDaEMsQ0FBQztDQUNKO0FBRUQsU0FBUyxRQUFRLENBQUMsSUFBWTtJQUMxQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxF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