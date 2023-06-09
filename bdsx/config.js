"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const path = require("path");
const fsutil_1 = require("./fsutil");
let isBdsx = false;
try {
    require("./core");
    isBdsx = true;
}
catch (err) { }
const isWine = isBdsx ? require("./dllraw").dllraw.ntdll.wine_get_version !== null : false;
var Config;
(function (Config) {
    /**
     * true if running BDSX normally (with BDS and bdsx-core)
     */
    Config.BDSX = isBdsx;
    /**
     * true if running on Linux+Wine
     */
    Config.WINE = isWine;
    /**
     * handle stdin with the hooking method.
     * or it uses the readline module of node.js
     *
     * Linux+Wine has an issue on the readline module
     */
    Config.USE_NATIVE_STDIN_HANDLER = true;
    /**
     * replace the unicode encoder of BDS.
     *
     * the original encoder crashes sometimes on Linux+Wine.
     */
    Config.REPLACE_UNICODE_ENCODER = Config.WINE;
    Config.BDS_PATH = path.join(fsutil_1.fsutil.projectPath, "bedrock_server");
})(Config = exports.Config || (exports.Config = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZCQUE2QjtBQUM3QixxQ0FBa0M7QUFFbEMsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQ25CLElBQUk7SUFDQSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEIsTUFBTSxHQUFHLElBQUksQ0FBQztDQUNqQjtBQUFDLE9BQU8sR0FBRyxFQUFFLEdBQUU7QUFFaEIsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUUzRixJQUFpQixNQUFNLENBMkJ0QjtBQTNCRCxXQUFpQixNQUFNO0lBQ25COztPQUVHO0lBQ1UsV0FBSSxHQUFHLE1BQU0sQ0FBQztJQUUzQjs7T0FFRztJQUNVLFdBQUksR0FBRyxNQUFNLENBQUM7SUFFM0I7Ozs7O09BS0c7SUFDVSwrQkFBd0IsR0FBRyxJQUFJLENBQUM7SUFFN0M7Ozs7T0FJRztJQUNVLDhCQUF1QixHQUFHLE9BQUEsSUFBSSxDQUFDO0lBRS9CLGVBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQU0sQ0FBQyxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUM1RSxDQUFDLEVBM0JnQixNQUFNLEdBQU4sY0FBTSxLQUFOLGNBQU0sUUEyQnRCIn0=