"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverProperties = exports.spropsUtil = void 0;
const fs = require("fs");
const path = require("path");
const config_1 = require("./config");
class Property {
    constructor(key, value, content) {
        this.key = key;
        this.value = value;
        this.content = content;
    }
}
var spropsUtil;
(function (spropsUtil) {
    function* read(content) {
        let index = 0;
        let eof = false;
        let propStart = 0;
        let prop = new Property("", "", "");
        while (!eof) {
            let lineEnd = content.indexOf("\n", index);
            if (lineEnd === -1) {
                lineEnd = content.length;
                eof = true;
            }
            const lineBegin = index;
            let parse = content.substring(lineBegin, lineEnd);
            index = lineEnd + 1;
            const commentBegin = parse.indexOf("#");
            if (commentBegin !== -1) {
                parse = parse.substr(0, commentBegin);
            }
            const equal = parse.indexOf("=");
            if (equal === -1)
                continue;
            prop.content = content.substring(propStart, lineBegin);
            yield prop;
            const key = parse.substr(0, equal).trim();
            const value = parse.substr(equal + 1).trim();
            propStart = lineBegin;
            prop = new Property(key, value, "");
        }
        prop.content = content.substring(propStart);
        yield prop;
    }
    spropsUtil.read = read;
    function merge(oldProps, newProps) {
        const props = [...spropsUtil.read(oldProps)];
        const namemap = new Map();
        for (const prop of props) {
            namemap.set(prop.key, prop);
        }
        let prev = null;
        let out = "";
        for (const newProp of spropsUtil.read(newProps)) {
            const oldProp = namemap.get(newProp.key);
            if (oldProp === undefined) {
                // new prop
                if (prev !== null) {
                    if (prev.newProps === undefined)
                        prev.newProps = [];
                    prev.newProps.push(newProp);
                }
                else {
                    out += newProp.content;
                }
            }
            else {
                prev = oldProp;
            }
        }
        for (const prop of props) {
            out += prop.content;
            if (prop.newProps !== undefined) {
                for (const newProp of prop.newProps) {
                    out += newProp.content;
                }
            }
        }
        return out;
    }
    spropsUtil.merge = merge;
})(spropsUtil = exports.spropsUtil || (exports.spropsUtil = {}));
exports.serverProperties = {};
try {
    const propertyFile = config_1.Config.BDS_PATH + path.sep + "server.properties";
    const properties = fs.readFileSync(propertyFile, "utf8");
    for (const prop of spropsUtil.read(properties)) {
        exports.serverProperties[prop.key] = prop.value;
    }
}
catch (err) {
    if (err.code !== "ENOENT") {
        throw err;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVycHJvcGVydGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlcnZlcnByb3BlcnRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QixxQ0FBa0M7QUE4QmxDLE1BQU0sUUFBUTtJQUNWLFlBQW1CLEdBQVcsRUFBUyxLQUFhLEVBQVMsT0FBZTtRQUF6RCxRQUFHLEdBQUgsR0FBRyxDQUFRO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUFTLFlBQU8sR0FBUCxPQUFPLENBQVE7SUFBRyxDQUFDO0NBQ25GO0FBRUQsSUFBaUIsVUFBVSxDQXlFMUI7QUF6RUQsV0FBaUIsVUFBVTtJQUN2QixRQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBZTtRQUNqQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUM7UUFDaEIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBRWxCLElBQUksSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDcEMsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNULElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzNDLElBQUksT0FBTyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUNoQixPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztnQkFDekIsR0FBRyxHQUFHLElBQUksQ0FBQzthQUNkO1lBQ0QsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ2xELEtBQUssR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEMsSUFBSSxZQUFZLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ3JCLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQzthQUN6QztZQUNELE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDO2dCQUFFLFNBQVM7WUFFM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUN2RCxNQUFNLElBQUksQ0FBQztZQUVYLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzFDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzdDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDdEIsSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDdkM7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUMsTUFBTSxJQUFJLENBQUM7SUFDZixDQUFDO0lBakNnQixlQUFJLE9BaUNwQixDQUFBO0lBRUQsU0FBZ0IsS0FBSyxDQUFDLFFBQWdCLEVBQUUsUUFBZ0I7UUFJcEQsTUFBTSxLQUFLLEdBQWlCLENBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDM0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQXNCLENBQUM7UUFDOUMsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUU7WUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQy9CO1FBRUQsSUFBSSxJQUFJLEdBQXNCLElBQUksQ0FBQztRQUNuQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixLQUFLLE1BQU0sT0FBTyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDN0MsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDekMsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO2dCQUN2QixXQUFXO2dCQUNYLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtvQkFDZixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUzt3QkFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztvQkFDcEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQy9CO3FCQUFNO29CQUNILEdBQUcsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDO2lCQUMxQjthQUNKO2lCQUFNO2dCQUNILElBQUksR0FBRyxPQUFPLENBQUM7YUFDbEI7U0FDSjtRQUVELEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFO1lBQ3RCLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3BCLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7Z0JBQzdCLEtBQUssTUFBTSxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDakMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUM7aUJBQzFCO2FBQ0o7U0FDSjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQXBDZSxnQkFBSyxRQW9DcEIsQ0FBQTtBQUNMLENBQUMsRUF6RWdCLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBeUUxQjtBQUVZLFFBQUEsZ0JBQWdCLEdBQTBFLEVBQVMsQ0FBQztBQUVqSCxJQUFJO0lBQ0EsTUFBTSxZQUFZLEdBQUcsZUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLG1CQUFtQixDQUFDO0lBQ3RFLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3pELEtBQUssTUFBTSxJQUFJLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUM1Qyx3QkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztLQUMzQztDQUNKO0FBQUMsT0FBTyxHQUFHLEVBQUU7SUFDVixJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQ3ZCLE1BQU0sR0FBRyxDQUFDO0tBQ2I7Q0FDSiJ9