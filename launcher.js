"use strict";
// launcher.ts is the launcher for BDS
// These scripts are run before launching BDS
// So there is no 'server' variable yet
// launcher.ts will import ./index.ts after launching BDS.
Object.defineProperty(exports, "__esModule", { value: true });
require("bdsx/init");
const event_1 = require("bdsx/event");
const launcher_1 = require("bdsx/launcher");
const source_map_support_1 = require("bdsx/source-map-support");
console.log("  _____      _____ \n".green +
    "  \\    \\    /    / \n".green +
    "   \\".green + "___ ".white + "\\".green + "__".white + "/".green + " ___".white + "/  \n".green +
    "   | _ )   \\/ __|  \n".white +
    "   | _ \\ |) \\__ \\  \n".white +
    "   |___/___/|___/  \n".white +
    "   /    /  \\    \\  \n".green +
    "  /____/    \\____\\ \n".green);
(async () => {
    event_1.events.serverClose.on(() => {
        console.log("[BDSX] bedrockServer closed");
        setTimeout(() => {
            console.log("[BDSX] node.js is processing...");
        }, 3000).unref();
    });
    // launch BDS
    console.log("[BDSX] bedrockServer is launching...");
    await launcher_1.bedrockServer.launch();
    // run index
    require("./index");
})().catch(source_map_support_1.remapAndPrintError);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsYXVuY2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQXNDO0FBQ3RDLDZDQUE2QztBQUM3Qyx1Q0FBdUM7QUFDdkMsMERBQTBEOztBQUUxRCxxQkFBbUI7QUFDbkIsc0NBQW9DO0FBQ3BDLDRDQUE4QztBQUM5QyxnRUFBNkQ7QUFFN0QsT0FBTyxDQUFDLEdBQUcsQ0FDUCx1QkFBdUIsQ0FBQyxLQUFLO0lBQzdCLHlCQUF5QixDQUFDLEtBQUs7SUFDL0IsT0FBTyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUs7SUFDakcsd0JBQXdCLENBQUMsS0FBSztJQUM5QiwwQkFBMEIsQ0FBQyxLQUFLO0lBQ2hDLHVCQUF1QixDQUFDLEtBQUs7SUFDN0IseUJBQXlCLENBQUMsS0FBSztJQUMvQix5QkFBeUIsQ0FBQyxLQUFLLENBQzlCLENBQUM7QUFFTixDQUFDLEtBQUssSUFBSSxFQUFFO0lBQ1IsY0FBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUMzQyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1FBQ25ELENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNyQixDQUFDLENBQUMsQ0FBQztJQUVILGFBQWE7SUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7SUFDcEQsTUFBTSx3QkFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBRTdCLFlBQVk7SUFDWixPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdkIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsdUNBQWtCLENBQUMsQ0FBQyJ9