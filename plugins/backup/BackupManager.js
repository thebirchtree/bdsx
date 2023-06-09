"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupManager = void 0;
const BackupUtils_1 = require("./BackupUtils");
class BackupManager {
    constructor(bds, evt, testOnly, tempName) {
        this.bds = bds;
        this.evt = evt;
        this.testOnly = testOnly;
        this.tempName = tempName;
        this.worldName = "Unknown";
        this.runNextBackup = false;
        this.lastBackup = 0;
        this.backupSettings = {};
        this.resumeRetryCounter = 0;
        this.actorList = [];
        this.displayStatus = (message) => {
            if (this.actorList.length > 0) {
                // eslint-disable-next-line no-useless-escape
                this.bds.executeCommandOnConsole(`tellraw @a {\"rawtext\": [{\"text\": \"§lBackup\"},{\"text\": \"§r ${message}\"}]}`);
            }
        };
    }
    async init(settings) {
        var _a;
        this.backupSettings = settings;
        this.bedrockServerPath = (_a = settings.bedrockServerPath) !== null && _a !== void 0 ? _a : ".";
        this.worldName = await BackupUtils_1.BackupUtils.getWorldName(this.bedrockServerPath);
        console.log("bedrockServerPath:", this.bedrockServerPath);
        console.log("worldName:", this.worldName);
        if (!this.testOnly) {
            await BackupUtils_1.BackupUtils.removeDirectory("temp");
        }
        await this.registerHandlers();
        if (settings.interval && settings.interval > 0) {
            setInterval(async () => {
                await this.backup();
            }, settings.interval * 60000);
        }
        if (settings.backupOnStart) {
            this.runNextBackup = true;
            await this.backup();
        }
        this.displayStatus("Initialized");
    }
    async backup() {
        if (this.backupSettings.minIntervalBetweenBackups) {
            let diffTime = Math.abs(Date.now() - this.lastBackup) / 1000 / 60;
            diffTime = Math.round(diffTime * 100) / 100;
            console.log(diffTime);
            if (diffTime < this.backupSettings.minIntervalBetweenBackups) {
                console.log(`Skip backup - last processed ${diffTime}`);
                return;
            }
        }
        if (this.backupSettings.skipIfNoActivity) {
            if (this.actorList.length > 0 || this.runNextBackup) {
                console.log("Call save hold due to activity");
                this.bds.executeCommandOnConsole("save hold");
            }
            else {
                console.log("Skip backup - no activity");
            }
        }
        else {
            console.log("Call save hold (no activity)");
            this.bds.executeCommandOnConsole("save hold");
        }
    }
    async registerHandlers() {
        this.evt.commandOutput.on((result) => {
            if (result.indexOf("A previous save") > -1 || result.indexOf("The command is already running") > -1) {
                this.resumeRetryCounter++;
                if (this.resumeRetryCounter < 3) {
                    setTimeout(() => {
                        this.bds.executeCommandOnConsole("save resume");
                        this.runNextBackup = true;
                    }, 1000);
                }
                else {
                    this.resumeRetryCounter = 0;
                }
            }
            if (result === "Saving...") {
                this.bds.executeCommandOnConsole("save query");
            }
            if (result.indexOf("Data saved. Files are now ready to be copied.") > -1) {
                const files = result.split(", ");
                this.runBackup(files);
            }
            if (result === "Changes to the level are resumed." || result === "Changes to the world are resumed.") {
                this.resumeRetryCounter = 0;
            }
        });
        this.evt.playerJoin.on((e) => {
            const actor = e.player.getNetworkIdentifier().getActor();
            if (actor !== null) {
                this.actorList.push(actor);
                this.runNextBackup = true;
                if (this.backupSettings.backupOnPlayerConnected) {
                    this.backup();
                }
            }
        });
        this.evt.networkDisconnected.on((netId) => {
            var _a;
            const actor = (_a = netId.getActor()) === null || _a === void 0 ? void 0 : _a.getNetworkIdentifier().getActor();
            if (actor) {
                this.actorList.splice(this.actorList.findIndex(() => actor));
                this.runNextBackup = true;
                if (this.backupSettings.backupOnPlayerDisconnected) {
                    this.backup();
                }
            }
        });
    }
    async runBackup(files) {
        if (this.testOnly) {
            this.bds.executeCommandOnConsole("save resume");
            return;
        }
        const handleError = (error) => {
            error && console.log(error);
            this.runNextBackup = true;
            this.bds.executeCommandOnConsole("save resume");
        };
        this.runNextBackup = false;
        this.displayStatus("Starting...");
        const tempDirectory = await BackupUtils_1.BackupUtils.createTempDirectory(this.worldName, handleError, this.tempName);
        await BackupUtils_1.BackupUtils.moveFiles(`${this.bedrockServerPath}/worlds`, tempDirectory, this.worldName, handleError);
        await Promise.all(files.slice(1).map(async (file) => {
            await BackupUtils_1.BackupUtils.truncate(file, tempDirectory);
        }));
        await BackupUtils_1.BackupUtils.zipDirectory(`${this.bedrockServerPath}/backups`, tempDirectory, this.worldName, handleError);
        await BackupUtils_1.BackupUtils.removeTempDirectory(tempDirectory);
        this.bds.executeCommandOnConsole("save resume");
        this.lastBackup = Date.now();
        console.log("Finished");
        setTimeout(() => {
            this.displayStatus("Finished!");
        }, 2000);
    }
}
exports.BackupManager = BackupManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFja3VwTWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJhY2t1cE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBSUEsK0NBQTRDO0FBRzVDLE1BQWEsYUFBYTtJQVV0QixZQUFvQixHQUF5QixFQUFVLEdBQWtCLEVBQVUsUUFBa0IsRUFBVSxRQUFpQjtRQUE1RyxRQUFHLEdBQUgsR0FBRyxDQUFzQjtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQWU7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQVR4SCxjQUFTLEdBQUcsU0FBUyxDQUFDO1FBQ3RCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixtQkFBYyxHQUFvQixFQUFFLENBQUM7UUFFckMsdUJBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBRXZCLGNBQVMsR0FBbUIsRUFBRSxDQUFDO1FBNkkvQixrQkFBYSxHQUFHLENBQUMsT0FBZSxFQUFFLEVBQUU7WUFDeEMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzNCLDZDQUE2QztnQkFDN0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxzRUFBc0UsT0FBTyxPQUFPLENBQUMsQ0FBQzthQUMxSDtRQUNMLENBQUMsQ0FBQztJQWhKaUksQ0FBQztJQUU3SCxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQXlCOztRQUN2QyxJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQztRQUMvQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBQSxRQUFRLENBQUMsaUJBQWlCLG1DQUFJLEdBQUcsQ0FBQztRQUMzRCxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0seUJBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFeEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsTUFBTSx5QkFBVyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM3QztRQUVELE1BQU0sSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFOUIsSUFBSSxRQUFRLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFO1lBQzVDLFdBQVcsQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDbkIsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDeEIsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUM7U0FDakM7UUFFRCxJQUFJLFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDMUIsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDdkI7UUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFTSxLQUFLLENBQUMsTUFBTTtRQUNmLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyx5QkFBeUIsRUFBRTtZQUMvQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNsRSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyx5QkFBeUIsRUFBRTtnQkFDMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDeEQsT0FBTzthQUNWO1NBQ0o7UUFFRCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEVBQUU7WUFDdEMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ2pEO2lCQUFNO2dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQzthQUM1QztTQUNKO2FBQU07WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNqRDtJQUNMLENBQUM7SUFFTyxLQUFLLENBQUMsZ0JBQWdCO1FBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQWMsRUFBRSxFQUFFO1lBQ3pDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0NBQWdDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDakcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQzFCLElBQUksSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsRUFBRTtvQkFDN0IsVUFBVSxDQUFDLEdBQUcsRUFBRTt3QkFDWixJQUFJLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUNoRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztvQkFDOUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUNaO3FCQUFNO29CQUNILElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7aUJBQy9CO2FBQ0o7WUFFRCxJQUFJLE1BQU0sS0FBSyxXQUFXLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDbEQ7WUFFRCxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsK0NBQStDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDdEUsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN6QjtZQUVELElBQUksTUFBTSxLQUFLLG1DQUFtQyxJQUFJLE1BQU0sS0FBSyxtQ0FBbUMsRUFBRTtnQkFDbEcsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQzthQUMvQjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDekIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3pELElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtnQkFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRTNCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2dCQUMxQixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsdUJBQXVCLEVBQUU7b0JBQzdDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDakI7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTs7WUFDdEMsTUFBTSxLQUFLLEdBQUcsTUFBQSxLQUFLLENBQUMsUUFBUSxFQUFFLDBDQUFFLG9CQUFvQixHQUFHLFFBQVEsRUFBRSxDQUFDO1lBQ2xFLElBQUksS0FBSyxFQUFFO2dCQUNQLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBRTdELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2dCQUMxQixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsMEJBQTBCLEVBQUU7b0JBQ2hELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDakI7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBZTtRQUNuQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ2hELE9BQU87U0FDVjtRQUVELE1BQU0sV0FBVyxHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUU7WUFDbkMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sYUFBYSxHQUFHLE1BQU0seUJBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEcsTUFBTSx5QkFBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsU0FBUyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzVHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDYixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDOUIsTUFBTSx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDcEQsQ0FBQyxDQUFDLENBQ0wsQ0FBQztRQUNGLE1BQU0seUJBQVcsQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLFVBQVUsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNoSCxNQUFNLHlCQUFXLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFckQsSUFBSSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNiLENBQUM7Q0FRSjtBQTNKRCxzQ0EySkMifQ==