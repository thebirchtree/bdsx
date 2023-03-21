"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./example_and_test");
const launcher_1 = require("bdsx/launcher");
const event_1 = require("bdsx/event");
const BackupManager_1 = require("@bdsx/backup/BackupManager");
const backupManager = new BackupManager_1.BackupManager(launcher_1.bedrockServer, event_1.events);
backupManager.init({
    backupOnStart: false,
    skipIfNoActivity: true,
    backupOnPlayerConnected: false,
    backupOnPlayerDisconnected: true,
    interval: 180,
    minIntervalBetweenBackups: 180,
}).then((res) => {
    console.log(`backup manager initiated`);
});
// Please start your own codes from here!
require("./example_and_test"); // remove this if it's not necessary for you
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhCQUE0QjtBQUU1Qiw0Q0FBOEM7QUFDOUMsc0NBQW9DO0FBQ3BDLDhEQUEyRDtBQUczRCxNQUFNLGFBQWEsR0FBRyxJQUFJLDZCQUFhLENBQUMsd0JBQWEsRUFBRSxjQUFNLENBQUMsQ0FBQztBQUMvRCxhQUFhLENBQUMsSUFBSSxDQUFDO0lBQ2YsYUFBYSxFQUFFLEtBQUs7SUFDcEIsZ0JBQWdCLEVBQUUsSUFBSTtJQUN0Qix1QkFBdUIsRUFBRSxLQUFLO0lBQzlCLDBCQUEwQixFQUFFLElBQUk7SUFDaEMsUUFBUSxFQUFFLEdBQUc7SUFDYix5QkFBeUIsRUFBRSxHQUFHO0NBQ2pDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUM1QyxDQUFDLENBQUMsQ0FBQztBQUlILHlDQUF5QztBQUV6Qyw4QkFBNEIsQ0FBQyw0Q0FBNEMifQ==