"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./common");
require("./checkmodules");
require("./asm/checkasm");
const core_1 = require("./core");
const bdsVersionJson = require("./version-bds.json");
const bdsxVersionJson = require("./version-bdsx.json");
const colors = require("colors");
const installinfo_1 = require("./installer/installinfo");
const config_1 = require("./config");
function checkInstallInfoAndExit() {
    function check(versionKey, oversion) {
        const installed = installInfo[versionKey];
        if (installed === "manual" || installed == null) {
            if (versionKey === "bdsVersion") {
                cannotUpdate = true;
                return;
            }
            installInfo[versionKey] = oversion;
            modified = true;
        }
    }
    let modified = false;
    let cannotUpdate = false;
    const installInfo = new installinfo_1.InstallInfo(config_1.Config.BDS_PATH);
    installInfo.loadSync();
    check("bdsVersion", bdsVersion);
    check("pdbcacheVersion", bdsVersion);
    check("bdsxCoreVersion", core_1.cgate.bdsxCoreVersion);
    if (modified)
        installInfo.saveSync();
    if (cannotUpdate) {
        // the installed manual BDS is hard to update.
        // BDSX cannot distinguish between user files and BDS files.
        console.error(`[BDSX] BDSX cannot update the manual installed BDS`);
        console.error(`[BDSX] Please update BDS manually`);
        process.exit(exitcode_1.BdsxExitCode.Quit);
    }
    else {
        console.error(`[BDSX] Please run 'npm i' or ${process.platform === "win32" ? "update.bat" : "update.sh"} to update`);
        process.exit(exitcode_1.BdsxExitCode.InstallNpm);
    }
}
function checkAndReport(name, oversion, nversion) {
    if (oversion === nversion)
        return;
    console.error(colors.red(`[BDSX] ${name} outdated`));
    console.error(colors.red(`[BDSX] Current version: ${oversion}`));
    console.error(colors.red(`[BDSX] Required version: ${nversion}`));
    checkInstallInfoAndExit();
}
// check BDSX version
checkAndReport("BDSX Core", core_1.cgate.bdsxCoreVersion, bdsxVersionJson);
// check BDS version
const symbols_1 = require("./bds/symbols");
const exitcode_1 = require("./shellprepare/exitcode");
const versions = [
    symbols_1.proc["?MajorVersion@SharedConstants@@3HB"].getInt32(),
    symbols_1.proc["?MinorVersion@SharedConstants@@3HB"].getInt32(),
    symbols_1.proc["?PatchVersion@SharedConstants@@3HB"].getInt32(),
    (symbols_1.proc["?RevisionVersion@SharedConstants@@3HB"].getInt32() + 100).toString().substr(1),
];
const bdsVersion = versions.join(".");
checkAndReport("BDS", bdsVersion, bdsVersionJson);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGVjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9CQUFrQjtBQUNsQiwwQkFBd0I7QUFDeEIsMEJBQXdCO0FBQ3hCLGlDQUErQjtBQUMvQixxREFBcUQ7QUFDckQsdURBQXVEO0FBQ3ZELGlDQUFpQztBQUNqQyx5REFBc0Q7QUFDdEQscUNBQWtDO0FBRWxDLFNBQVMsdUJBQXVCO0lBQzVCLFNBQVMsS0FBSyxDQUFDLFVBQTZCLEVBQUUsUUFBZ0I7UUFDMUQsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFDLElBQUksU0FBUyxLQUFLLFFBQVEsSUFBSSxTQUFTLElBQUksSUFBSSxFQUFFO1lBQzdDLElBQUksVUFBVSxLQUFLLFlBQVksRUFBRTtnQkFDN0IsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFDcEIsT0FBTzthQUNWO1lBQ0QsV0FBVyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFFBQWUsQ0FBQztZQUMxQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUVELElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztJQUNyQixJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDekIsTUFBTSxXQUFXLEdBQUcsSUFBSSx5QkFBVyxDQUFDLGVBQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyRCxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDdkIsS0FBSyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNoQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDckMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLFlBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNoRCxJQUFJLFFBQVE7UUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7SUFFckMsSUFBSSxZQUFZLEVBQUU7UUFDZCw4Q0FBOEM7UUFDOUMsNERBQTREO1FBQzVELE9BQU8sQ0FBQyxLQUFLLENBQUMsb0RBQW9ELENBQUMsQ0FBQztRQUNwRSxPQUFPLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDbkQsT0FBTyxDQUFDLElBQUksQ0FBQyx1QkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ25DO1NBQU07UUFDSCxPQUFPLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxXQUFXLFlBQVksQ0FBQyxDQUFDO1FBQ3JILE9BQU8sQ0FBQyxJQUFJLENBQUMsdUJBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUN6QztBQUNMLENBQUM7QUFDRCxTQUFTLGNBQWMsQ0FBQyxJQUFZLEVBQUUsUUFBZ0IsRUFBRSxRQUFnQjtJQUNwRSxJQUFJLFFBQVEsS0FBSyxRQUFRO1FBQUUsT0FBTztJQUNsQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDckQsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLDJCQUEyQixRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDakUsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLDRCQUE0QixRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEUsdUJBQXVCLEVBQUUsQ0FBQztBQUM5QixDQUFDO0FBRUQscUJBQXFCO0FBQ3JCLGNBQWMsQ0FBQyxXQUFXLEVBQUUsWUFBSyxDQUFDLGVBQWUsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUVwRSxvQkFBb0I7QUFDcEIsMkNBQXFDO0FBQ3JDLHNEQUF1RDtBQUN2RCxNQUFNLFFBQVEsR0FBRztJQUNiLGNBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDLFFBQVEsRUFBRTtJQUNyRCxjQUFJLENBQUMsb0NBQW9DLENBQUMsQ0FBQyxRQUFRLEVBQUU7SUFDckQsY0FBSSxDQUFDLG9DQUFvQyxDQUFDLENBQUMsUUFBUSxFQUFFO0lBQ3JELENBQUMsY0FBSSxDQUFDLHVDQUF1QyxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztDQUN4RixDQUFDO0FBQ0YsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN0QyxjQUFjLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQyJ9