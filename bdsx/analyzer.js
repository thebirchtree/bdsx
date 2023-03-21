"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzer = void 0;
const pdbcache_1 = require("./pdbcache");
let analyzeMap;
let symbols = null;
function asAscii(addr) {
    const nums = [];
    const bin = addr.getAddressBin();
    for (let i = 0; i < bin.length; i++) {
        nums.push(bin.charCodeAt(i));
    }
    if (!nums.every(n => n < 0x7f))
        return undefined;
    nums.reverse();
    const text = String.fromCharCode(...nums.map(n => (n < 0x20 ? 0x20 : n)));
    return text;
}
var analyzer;
(function (analyzer) {
    function loadMap() {
        if (analyzeMap)
            return;
        analyzeMap = new Map();
        const proc = require("./bds/symbols").proc;
        if (symbols === null) {
            symbols = { __proto__: null };
            for (const key of pdbcache_1.pdbcache.readKeys()) {
                symbols[key] = proc[key];
            }
        }
        for (const [name, value] of Object.entries(symbols)) {
            analyzeMap.set(value.getAddressBin(), name);
        }
    }
    analyzer.loadMap = loadMap;
    function getAddressInfo(addr) {
        loadMap();
        const addrname = analyzeMap.get(addr.getAddressBin());
        if (addrname !== undefined) {
            return {
                symbol: addrname,
                address: addr + "",
            };
        }
        try {
            const addr2 = addr.add().getPointer();
            const addr2name = analyzeMap.get(addr2.getAddressBin());
            if (addr2name !== undefined) {
                return {
                    symbol: "& " + addr2name,
                    address: addr + "",
                    address2: addr2 + "",
                };
            }
            else {
                return {
                    address: addr + "",
                    address2: addr2 + "",
                    ascii: asAscii(addr2),
                };
            }
        }
        catch (err) {
            return {
                address: addr + "",
                ascii: asAscii(addr),
            };
        }
    }
    analyzer.getAddressInfo = getAddressInfo;
    function analyze(ptr, count = 32) {
        const nptr = ptr.add();
        loadMap();
        console.log(`[analyze: ${nptr}]`);
        try {
            for (let i = 0; i < count; i++) {
                let offset = (i * 8).toString(16);
                offset = "0".repeat(Math.max(3 - offset.length, 0)) + offset;
                const addr = nptr.readPointer();
                const info = getAddressInfo(addr);
                let line = `${offset}: ${info.address}`;
                if (info.address2 !== undefined) {
                    line += ": ";
                    line += info.address2;
                }
                if (info.symbol !== undefined) {
                    line += info.symbol;
                }
                if (info.ascii !== undefined) {
                    line += `"${info.ascii}"`;
                }
            }
        }
        catch (err) {
            console.log("[VA]");
        }
    }
    analyzer.analyze = analyze;
})(analyzer = exports.analyzer || (exports.analyzer = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbmFseXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx5Q0FBc0M7QUFFdEMsSUFBSSxVQUEyQyxDQUFDO0FBQ2hELElBQUksT0FBTyxHQUF5QyxJQUFJLENBQUM7QUFFekQsU0FBUyxPQUFPLENBQUMsSUFBaUI7SUFDOUIsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBQzFCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUNqQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNoQztJQUNELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUFFLE9BQU8sU0FBUyxDQUFDO0lBQ2pELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNmLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRSxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBRUQsSUFBaUIsUUFBUSxDQXFGeEI7QUFyRkQsV0FBaUIsUUFBUTtJQUNyQixTQUFnQixPQUFPO1FBQ25CLElBQUksVUFBVTtZQUFFLE9BQU87UUFDdkIsVUFBVSxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO1FBQ3ZDLE1BQU0sSUFBSSxHQUF3QyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDO1FBRWhGLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtZQUNsQixPQUFPLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBVyxFQUFFLENBQUM7WUFDckMsS0FBSyxNQUFNLEdBQUcsSUFBSSxtQkFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzVCO1NBQ0o7UUFFRCxLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNqRCxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMvQztJQUNMLENBQUM7SUFmZSxnQkFBTyxVQWV0QixDQUFBO0lBU0QsU0FBZ0IsY0FBYyxDQUFDLElBQWlCO1FBQzVDLE9BQU8sRUFBRSxDQUFDO1FBQ1YsTUFBTSxRQUFRLEdBQUcsVUFBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUN2RCxJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDeEIsT0FBTztnQkFDSCxNQUFNLEVBQUUsUUFBUTtnQkFDaEIsT0FBTyxFQUFFLElBQUksR0FBRyxFQUFFO2FBQ3JCLENBQUM7U0FDTDtRQUNELElBQUk7WUFDQSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDdEMsTUFBTSxTQUFTLEdBQUcsVUFBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztZQUN6RCxJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUU7Z0JBQ3pCLE9BQU87b0JBQ0gsTUFBTSxFQUFFLElBQUksR0FBRyxTQUFTO29CQUN4QixPQUFPLEVBQUUsSUFBSSxHQUFHLEVBQUU7b0JBQ2xCLFFBQVEsRUFBRSxLQUFLLEdBQUcsRUFBRTtpQkFDdkIsQ0FBQzthQUNMO2lCQUFNO2dCQUNILE9BQU87b0JBQ0gsT0FBTyxFQUFFLElBQUksR0FBRyxFQUFFO29CQUNsQixRQUFRLEVBQUUsS0FBSyxHQUFHLEVBQUU7b0JBQ3BCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDO2lCQUN4QixDQUFDO2FBQ0w7U0FDSjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1YsT0FBTztnQkFDSCxPQUFPLEVBQUUsSUFBSSxHQUFHLEVBQUU7Z0JBQ2xCLEtBQUssRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDO2FBQ3ZCLENBQUM7U0FDTDtJQUNMLENBQUM7SUEvQmUsdUJBQWMsaUJBK0I3QixDQUFBO0lBRUQsU0FBZ0IsT0FBTyxDQUFDLEdBQWdCLEVBQUUsUUFBZ0IsRUFBRTtRQUN4RCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdkIsT0FBTyxFQUFFLENBQUM7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNsQyxJQUFJO1lBQ0EsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDNUIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNsQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDO2dCQUU3RCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ2hDLE1BQU0sSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxJQUFJLEdBQUcsR0FBRyxNQUFNLEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN4QyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO29CQUM3QixJQUFJLElBQUksSUFBSSxDQUFDO29CQUNiLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDO2lCQUN6QjtnQkFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO29CQUMzQixJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQztpQkFDdkI7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtvQkFDMUIsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDO2lCQUM3QjthQUNKO1NBQ0o7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBMUJlLGdCQUFPLFVBMEJ0QixDQUFBO0FBQ0wsQ0FBQyxFQXJGZ0IsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFxRnhCIn0=