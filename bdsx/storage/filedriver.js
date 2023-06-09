"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorageDriver = void 0;
const tslib_1 = require("tslib");
const fs = require("fs");
const path = require("path");
const _1 = require(".");
const fsutil_1 = require("../fsutil");
const source_map_support_1 = require("../source-map-support");
const util_1 = require("../util");
const bufferstream_1 = require("../writer/bufferstream");
const jsdata_1 = require("./jsdata");
const globalClassId = "#global";
const FILE_DB_VERSION_0 = 0;
const WRITING_EXT = ".writing";
const DB_EXT = ".db";
const ALIAS_EXT = ".alias";
function toFileName(name) {
    return name.replace(/[\x00-\x1f\\/?<>:*|%$"#]/g, chr => {
        if (chr === "/")
            return "$";
        return "%" + (0, util_1.hexn)(chr.charCodeAt(0), 2);
    });
}
function fromFileName(name) {
    return name.replace(/(?:%[0-9A-F]{2}|\$)/g, matched => {
        if (matched === "$")
            return "/";
        else
            return String.fromCharCode(parseInt(matched.substr(1), 16));
    });
}
function ignoreFileNotFound(err) {
    if (err.code !== "ENOENT")
        throw err;
}
/**
 * rough driver for bdsx storage
 */
class FileStorageDriver extends _1.StorageDriver {
    constructor(basePath) {
        super();
        this.basePath = path.join(basePath);
        this.loading = this._load();
    }
    async _load() {
        await fsutil_1.fsutil.mkdirRecursive(this.basePath);
    }
    _getClassPath(classId) {
        return path.join(this.basePath, classId === null ? globalClassId : toFileName(classId));
    }
    async write(classId, mainId, aliasId, data) {
        await this.loading;
        const classPath = this._getClassPath(classId);
        await fsutil_1.fsutil.mkdir(classPath);
        const classPathSep = classPath + path.sep;
        const linkBuffer = Buffer.from(mainId, "utf8");
        async function checkOldFile(oldFilePath) {
            try {
                const content = await fsutil_1.fsutil.readFile(oldFilePath, null);
                return content.equals(linkBuffer);
            }
            catch (err) {
                if (err.code !== "ENOENT")
                    throw err;
                return false;
            }
        }
        async function writeAliasFile(oldId, newId) {
            if (oldId != null) {
                const oldFilePath = classPathSep + toFileName(oldId) + ALIAS_EXT;
                if (await checkOldFile(oldFilePath)) {
                    if (newId === oldId)
                        return;
                    if (newId !== null) {
                        await fsutil_1.fsutil.rename(oldFilePath, classPathSep + toFileName(newId) + ALIAS_EXT);
                    }
                    else {
                        await fsutil_1.fsutil.unlinkQuiet(oldFilePath);
                    }
                    return;
                }
            }
            if (newId === null)
                return;
            proms.push(fsutil_1.fsutil.writeFile(classPathSep + toFileName(newId) + ALIAS_EXT, linkBuffer));
        }
        async function writeMainFile(data) {
            const filePathBase = classPathSep + toFileName(mainId);
            const filePathWriting = filePathBase + WRITING_EXT;
            const writer = new bufferstream_1.BufferWriter();
            writer.writeVarUint(FILE_DB_VERSION_0);
            jsdata_1.jsdata.serialize(data, writer);
            jsdata_1.jsdata.serialize(aliasId, writer);
            const buffer = writer.buffer();
            await fsutil_1.fsutil.writeFile(filePathWriting, buffer);
            await fsutil_1.fsutil.rename(filePathWriting, filePathBase + DB_EXT);
        }
        const proms = [];
        if (data.data !== undefined) {
            proms.push(writeMainFile(data.data));
        }
        if (data.mainId !== null) {
            if (mainId !== data.mainId || data.data === undefined) {
                proms.push(fsutil_1.fsutil.unlinkQuiet(classPathSep + toFileName(data.mainId) + DB_EXT));
            }
        }
        proms.push(writeAliasFile(data.aliasId, aliasId));
        await Promise.all(proms);
    }
    _parse(id, dataBuffer) {
        const reader = new bufferstream_1.BufferReader(dataBuffer);
        const version = reader.readVarUint();
        switch (version) {
            case FILE_DB_VERSION_0: {
                const errors = [];
                const data = jsdata_1.jsdata.deserialize(reader, errors);
                const aliasId = jsdata_1.jsdata.deserialize(reader, errors);
                for (const error of errors) {
                    (0, source_map_support_1.remapAndPrintError)(error);
                }
                return { mainId: id, aliasId, data };
            }
            default:
                throw Error(`Unsupported File DB, version=${version}`);
        }
    }
    async read(classId, id) {
        const classPath = this._getClassPath(classId);
        for (;;) {
            const filePathBase = classPath + path.sep + toFileName(id);
            const [dataBuffer, linkTo] = await Promise.all([
                fsutil_1.fsutil.readFile(filePathBase + DB_EXT, null).catch(ignoreFileNotFound),
                fsutil_1.fsutil.readFile(filePathBase + ALIAS_EXT).catch(ignoreFileNotFound),
            ]);
            if (dataBuffer != null) {
                return this._parse(id, dataBuffer);
            }
            if (linkTo != null) {
                id = linkTo;
                continue;
            }
            return null;
        }
    }
    readSync(classId, id) {
        const classPath = this._getClassPath(classId);
        for (;;) {
            const filePathBase = classPath + path.sep + toFileName(id);
            try {
                const dataBuffer = fs.readFileSync(filePathBase + DB_EXT, null);
                return this._parse(id, dataBuffer);
            }
            catch (err) {
                if (err.code !== "ENOENT")
                    throw err;
            }
            try {
                id = fs.readFileSync(filePathBase + ALIAS_EXT, "utf8");
                continue;
            }
            catch (err) {
                if (err.code !== "ENOENT")
                    throw err;
            }
            return null;
        }
    }
    createIndex(classId, indexKey) {
        throw Error("not implemented yet");
    }
    deleteIndex(classId, indexKey) {
        throw Error("not implemented yet");
    }
    search(classId, indexKey, value) {
        throw Error("not implemented yet");
    }
    list(classId) {
        return tslib_1.__asyncGenerator(this, arguments, function* list_1() {
            const classPath = this._getClassPath(classId);
            const dir = yield tslib_1.__await(fsutil_1.fsutil.opendir(classPath));
            for (;;) {
                const res = yield tslib_1.__await(dir.read());
                if (res === null) {
                    yield tslib_1.__await(dir.close());
                    return yield tslib_1.__await(void 0);
                }
                if (res.name.endsWith(ALIAS_EXT))
                    continue;
                yield yield tslib_1.__await(fromFileName(res.name.substr(0, res.name.length - ALIAS_EXT.length)));
                dir.close();
            }
        });
    }
    listClass() {
        return tslib_1.__asyncGenerator(this, arguments, function* listClass_1() {
            const dir = yield tslib_1.__await(fsutil_1.fsutil.opendir(this.basePath));
            for (;;) {
                const res = yield tslib_1.__await(dir.read());
                if (res === null) {
                    yield tslib_1.__await(dir.close());
                    return yield tslib_1.__await(void 0);
                }
                yield yield tslib_1.__await(fromFileName(res.name));
                dir.close();
            }
        });
    }
}
exports.FileStorageDriver = FileStorageDriver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZWRyaXZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGVkcml2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFDN0Isd0JBQStDO0FBQy9DLHNDQUFtQztBQUNuQyw4REFBMkQ7QUFDM0Qsa0NBQStCO0FBQy9CLHlEQUFvRTtBQUNwRSxxQ0FBa0M7QUFFbEMsTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDO0FBRWhDLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxDQUFDO0FBRTVCLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQztBQUMvQixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDckIsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDO0FBRTNCLFNBQVMsVUFBVSxDQUFDLElBQVk7SUFDNUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLDJCQUEyQixFQUFFLEdBQUcsQ0FBQyxFQUFFO1FBQ25ELElBQUksR0FBRyxLQUFLLEdBQUc7WUFBRSxPQUFPLEdBQUcsQ0FBQztRQUM1QixPQUFPLEdBQUcsR0FBRyxJQUFBLFdBQUksRUFBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELFNBQVMsWUFBWSxDQUFDLElBQVk7SUFDOUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFFLE9BQU8sQ0FBQyxFQUFFO1FBQ2xELElBQUksT0FBTyxLQUFLLEdBQUc7WUFBRSxPQUFPLEdBQUcsQ0FBQzs7WUFDM0IsT0FBTyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsU0FBUyxrQkFBa0IsQ0FBQyxHQUEwQjtJQUNsRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssUUFBUTtRQUFFLE1BQU0sR0FBRyxDQUFDO0FBQ3pDLENBQUM7QUFFRDs7R0FFRztBQUNILE1BQWEsaUJBQWtCLFNBQVEsZ0JBQWE7SUFJaEQsWUFBWSxRQUFnQjtRQUN4QixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBQ08sS0FBSyxDQUFDLEtBQUs7UUFDZixNQUFNLGVBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFDTyxhQUFhLENBQUMsT0FBc0I7UUFDeEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBRUQsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFzQixFQUFFLE1BQWMsRUFBRSxPQUFzQixFQUFFLElBQWlCO1FBQ3pGLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUVuQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLE1BQU0sZUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUU5QixNQUFNLFlBQVksR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUMxQyxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUUvQyxLQUFLLFVBQVUsWUFBWSxDQUFDLFdBQW1CO1lBQzNDLElBQUk7Z0JBQ0EsTUFBTSxPQUFPLEdBQUcsTUFBTSxlQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDekQsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3JDO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1YsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLFFBQVE7b0JBQUUsTUFBTSxHQUFHLENBQUM7Z0JBQ3JDLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1FBQ0wsQ0FBQztRQUVELEtBQUssVUFBVSxjQUFjLENBQUMsS0FBb0IsRUFBRSxLQUFvQjtZQUNwRSxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7Z0JBQ2YsTUFBTSxXQUFXLEdBQUcsWUFBWSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxTQUFTLENBQUM7Z0JBQ2pFLElBQUksTUFBTSxZQUFZLENBQUMsV0FBVyxDQUFDLEVBQUU7b0JBQ2pDLElBQUksS0FBSyxLQUFLLEtBQUs7d0JBQUUsT0FBTztvQkFDNUIsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO3dCQUNoQixNQUFNLGVBQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLFlBQVksR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUM7cUJBQ2xGO3lCQUFNO3dCQUNILE1BQU0sZUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztxQkFDekM7b0JBQ0QsT0FBTztpQkFDVjthQUNKO1lBQ0QsSUFBSSxLQUFLLEtBQUssSUFBSTtnQkFBRSxPQUFPO1lBQzNCLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzNGLENBQUM7UUFFRCxLQUFLLFVBQVUsYUFBYSxDQUFDLElBQWE7WUFDdEMsTUFBTSxZQUFZLEdBQUcsWUFBWSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2RCxNQUFNLGVBQWUsR0FBRyxZQUFZLEdBQUcsV0FBVyxDQUFDO1lBQ25ELE1BQU0sTUFBTSxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUN2QyxlQUFNLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMvQixlQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNsQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDL0IsTUFBTSxlQUFNLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNoRCxNQUFNLGVBQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLFlBQVksR0FBRyxNQUFNLENBQUMsQ0FBQztRQUNoRSxDQUFDO1FBQ0QsTUFBTSxLQUFLLEdBQXVCLEVBQUUsQ0FBQztRQUNyQyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3pCLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtZQUN0QixJQUFJLE1BQU0sS0FBSyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO2dCQUNuRCxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUNuRjtTQUNKO1FBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ08sTUFBTSxDQUFDLEVBQVUsRUFBRSxVQUFrQjtRQUN6QyxNQUFNLE1BQU0sR0FBRyxJQUFJLDJCQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLFFBQVEsT0FBTyxFQUFFO1lBQ2IsS0FBSyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUNwQixNQUFNLE1BQU0sR0FBWSxFQUFFLENBQUM7Z0JBQzNCLE1BQU0sSUFBSSxHQUFHLGVBQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNoRCxNQUFNLE9BQU8sR0FBRyxlQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDbkQsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLEVBQUU7b0JBQ3hCLElBQUEsdUNBQWtCLEVBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzdCO2dCQUNELE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzthQUN4QztZQUNEO2dCQUNJLE1BQU0sS0FBSyxDQUFDLGdDQUFnQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1NBQzlEO0lBQ0wsQ0FBQztJQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBc0IsRUFBRSxFQUFVO1FBQ3pDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsU0FBUztZQUNMLE1BQU0sWUFBWSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMzRCxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztnQkFDM0MsZUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQztnQkFDdEUsZUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDO2FBQ3RFLENBQUMsQ0FBQztZQUNILElBQUksVUFBVSxJQUFJLElBQUksRUFBRTtnQkFDcEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQzthQUN0QztZQUNELElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtnQkFDaEIsRUFBRSxHQUFHLE1BQU0sQ0FBQztnQkFDWixTQUFTO2FBQ1o7WUFDRCxPQUFPLElBQUksQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUNELFFBQVEsQ0FBQyxPQUFzQixFQUFFLEVBQVU7UUFDdkMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxTQUFTO1lBQ0wsTUFBTSxZQUFZLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzNELElBQUk7Z0JBQ0EsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLEdBQUcsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNoRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQ3RDO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1YsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLFFBQVE7b0JBQUUsTUFBTSxHQUFHLENBQUM7YUFDeEM7WUFDRCxJQUFJO2dCQUNBLEVBQUUsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksR0FBRyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3ZELFNBQVM7YUFDWjtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNWLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxRQUFRO29CQUFFLE1BQU0sR0FBRyxDQUFDO2FBQ3hDO1lBQ0QsT0FBTyxJQUFJLENBQUM7U0FDZjtJQUNMLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBZSxFQUFFLFFBQWdCO1FBQ3pDLE1BQU0sS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNELFdBQVcsQ0FBQyxPQUFlLEVBQUUsUUFBZ0I7UUFDekMsTUFBTSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ0QsTUFBTSxDQUFDLE9BQWUsRUFBRSxRQUFnQixFQUFFLEtBQWM7UUFDcEQsTUFBTSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRU0sSUFBSSxDQUFDLE9BQXNCOztZQUM5QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlDLE1BQU0sR0FBRyxHQUFHLHNCQUFNLGVBQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUEsQ0FBQztZQUM1QyxTQUFTO2dCQUNMLE1BQU0sR0FBRyxHQUFHLHNCQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQSxDQUFDO2dCQUM3QixJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7b0JBQ2Qsc0JBQU0sR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFBLENBQUM7b0JBQ2xCLHFDQUFPO2lCQUNWO2dCQUNELElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO29CQUFFLFNBQVM7Z0JBQzNDLDRCQUFNLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUEsQ0FBQztnQkFDM0UsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2Y7UUFDTCxDQUFDO0tBQUE7SUFDTSxTQUFTOztZQUNaLE1BQU0sR0FBRyxHQUFHLHNCQUFNLGVBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUM7WUFDaEQsU0FBUztnQkFDTCxNQUFNLEdBQUcsR0FBRyxzQkFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUEsQ0FBQztnQkFDN0IsSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFO29CQUNkLHNCQUFNLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQSxDQUFDO29CQUNsQixxQ0FBTztpQkFDVjtnQkFDRCw0QkFBTSxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7Z0JBQzdCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNmO1FBQ0wsQ0FBQztLQUFBO0NBQ0o7QUF0S0QsOENBc0tDIn0=