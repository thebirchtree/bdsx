"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdbcache = void 0;
const fs = require("fs");
const path = require("path");
const config_1 = require("./config");
const util_1 = require("./util");
const cachePath = path.join(config_1.Config.BDS_PATH, "pdbcache.bin");
const fd = fs.openSync(cachePath, "r");
// no error. BDSX cannot be launched without pdbcache.bin
const HASHMAP_CAP_OFFSET = 4 + 16 + 4; // version + md5 + main rva
const TABLE_OFFSET = HASHMAP_CAP_OFFSET + 4; // version + md5 + main rva + hashmap capacity
const ENTRY_SIZE = 4 + 4 + 4; // hash + name offset + rva
const ENTRY_INT_COUNT = ENTRY_SIZE >> 2;
const READ_AT_ONCE = 85;
const buffer = new Uint32Array(READ_AT_ONCE * ENTRY_INT_COUNT);
fs.readSync(fd, buffer, 0, 4, HASHMAP_CAP_OFFSET);
const hashmapCapacity = buffer[0];
const namesOffset = TABLE_OFFSET + ENTRY_SIZE * hashmapCapacity;
function nameEquals(nameOffset, keyUtf8) {
    const readkey = Buffer.allocUnsafe(keyUtf8.length);
    const readSize = fs.readSync(fd, readkey, 0, readkey.length, nameOffset);
    if (readSize !== readkey.length)
        return false;
    if (!keyUtf8.equals(readkey))
        return false;
    return true;
}
function* readFrom(startIndex) {
    let readCount;
    let index = startIndex;
    let readTo = hashmapCapacity;
    for (;;) {
        const readFrom = index;
        const countToEnd = readTo - index;
        if (READ_AT_ONCE < countToEnd) {
            readCount = READ_AT_ONCE;
            index += readCount;
        }
        else {
            readCount = countToEnd;
            index = 0;
            readTo = startIndex;
        }
        fs.readSync(fd, buffer, 0, readCount * ENTRY_SIZE, readFrom * ENTRY_SIZE + TABLE_OFFSET);
        const intCount = readCount * 3;
        for (let offset = 0; offset < intCount;) {
            const hash = buffer[offset++];
            const nameOffset = buffer[offset++];
            const rva = buffer[offset++];
            if (nameOffset === 0)
                return;
            yield { hash, nameOffset, rva };
        }
        if (index === startIndex)
            break;
    }
}
var pdbcache;
(function (pdbcache) {
    function* readKeys() {
        let offset = namesOffset;
        let buffer = Buffer.allocUnsafe(8192);
        let filled = 0;
        for (;;) {
            const readSize = fs.readSync(fd, buffer, filled, buffer.length - filled, offset);
            if (readSize === 0)
                break;
            filled += readSize;
            offset += readSize;
            let index = 0;
            for (;;) {
                const nullterm = buffer.indexOf(0, index);
                if (nullterm !== -1 && nullterm < filled) {
                    const key = buffer.subarray(index, nullterm).toString("utf8");
                    yield key;
                    index = nullterm + 1;
                }
                else {
                    const remainedData = filled - index;
                    if (remainedData * 2 > buffer.length) {
                        // need to expand
                        const nbuffer = Buffer.allocUnsafe(buffer.length * 2);
                        buffer.copy(nbuffer, 0, index, filled);
                        buffer = nbuffer;
                    }
                    else {
                        // need to truncate
                        buffer.copy(buffer, 0, index, filled);
                    }
                    filled -= index;
                    break;
                }
            }
        }
    }
    pdbcache.readKeys = readKeys;
    /**
     * @return -1 if not found
     */
    function search(key) {
        const hash = (0, util_1.hashString)(key);
        const keyUtf8 = Buffer.from(key + "\0", "utf8");
        for (const entry of readFrom(hash % hashmapCapacity)) {
            if (entry.hash === hash && nameEquals(entry.nameOffset, keyUtf8)) {
                return entry.rva;
            }
        }
        return -1;
    }
    pdbcache.search = search;
})(pdbcache = exports.pdbcache || (exports.pdbcache = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRiY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwZGJjYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLHFDQUFrQztBQUNsQyxpQ0FBb0M7QUFFcEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFNLENBQUMsUUFBUSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBRTdELE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZDLHlEQUF5RDtBQUV6RCxNQUFNLGtCQUFrQixHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsMkJBQTJCO0FBQ2xFLE1BQU0sWUFBWSxHQUFHLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxDQUFDLDhDQUE4QztBQUMzRixNQUFNLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDJCQUEyQjtBQUN6RCxNQUFNLGVBQWUsR0FBRyxVQUFVLElBQUksQ0FBQyxDQUFDO0FBRXhDLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUN4QixNQUFNLE1BQU0sR0FBRyxJQUFJLFdBQVcsQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFDLENBQUM7QUFFL0QsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztBQUNsRCxNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEMsTUFBTSxXQUFXLEdBQUcsWUFBWSxHQUFHLFVBQVUsR0FBRyxlQUFlLENBQUM7QUFRaEUsU0FBUyxVQUFVLENBQUMsVUFBa0IsRUFBRSxPQUFlO0lBQ25ELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FB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