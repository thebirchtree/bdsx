"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// install source map
const source_map_support_1 = require("./source-map-support");
(0, source_map_support_1.install)();
// disable colors
const colors_1 = require("colors");
if (process.env.COLOR && !(process.env.COLOR === "true" || process.env.COLOR === "on"))
    (0, colors_1.disable)();
// check
require("./check");
// install bdsx error handler
const errorhandler_1 = require("./errorhandler");
(0, errorhandler_1.installErrorHandler)();
// legacy
require("./legacy");
const fsutil_1 = require("./fsutil");
const storage_1 = require("./storage");
const filedriver_1 = require("./storage/filedriver");
if (storage_1.storageManager.driver === storage_1.StorageDriver.nullDriver) {
    storage_1.storageManager.driver = new filedriver_1.FileStorageDriver(fsutil_1.fsutil.projectPath + "\\storage\\filestorage");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQkFBcUI7QUFDckIsNkRBQTBFO0FBQzFFLElBQUEsNEJBQXVCLEdBQUUsQ0FBQztBQUUxQixpQkFBaUI7QUFDakIsbUNBQWtEO0FBQ2xELElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLE1BQU0sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUM7SUFBRSxJQUFBLGdCQUFhLEdBQUUsQ0FBQztBQUV4RyxRQUFRO0FBQ1IsbUJBQWlCO0FBRWpCLDZCQUE2QjtBQUM3QixpREFBcUQ7QUFDckQsSUFBQSxrQ0FBbUIsR0FBRSxDQUFDO0FBRXRCLFNBQVM7QUFDVCxvQkFBa0I7QUFFbEIscUNBQWtDO0FBQ2xDLHVDQUEwRDtBQUMxRCxxREFBeUQ7QUFDekQsSUFBSSx3QkFBYyxDQUFDLE1BQU0sS0FBSyx1QkFBYSxDQUFDLFVBQVUsRUFBRTtJQUNwRCx3QkFBYyxDQUFDLE1BQU0sR0FBRyxJQUFJLDhCQUFpQixDQUFDLGVBQU0sQ0FBQyxXQUFXLEdBQUcsd0JBQXdCLENBQUMsQ0FBQztDQUNoRyJ9