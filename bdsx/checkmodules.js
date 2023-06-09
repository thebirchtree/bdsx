"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors = require("colors");
const fs = require("fs");
const path = require("path");
const semver = require("semver");
const fsutil_1 = require("./fsutil");
const packagejsonPath = path.join(fsutil_1.fsutil.projectPath, "package.json");
const packagejson = JSON.parse(fs.readFileSync(packagejsonPath, "utf-8"));
let needUpdate = false;
const requiredDeps = packagejson.dependencies;
for (const [name, requiredVersion] of Object.entries(requiredDeps)) {
    if (/^file:(?:\.[\\/])?plugins[\\/]/.test(requiredVersion))
        continue;
    try {
        const installed = require(`${name}/package.json`);
        const installedVersion = installed.version;
        if (semver.validRange(requiredVersion)) {
            // filter URI syntaxes (ex. file:, http:, git)
            if (!semver.satisfies(installedVersion, requiredVersion)) {
                console.error(colors.red(`${name}: version does not match (installed=${installedVersion}, required=${requiredVersion})`));
                needUpdate = true;
            }
        }
    }
    catch (err) {
        if (err.code !== "MODULE_NOT_FOUND") {
            throw err;
        }
        console.error(colors.red(`${name}: not installed`));
        needUpdate = true;
    }
}
if (needUpdate) {
    console.error(colors.yellow(`Please use 'npm i' or '${process.platform === "win32" ? "update.bat" : "update.sh"}' to update`));
    process.exit(-1);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2ttb2R1bGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hlY2ttb2R1bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQWlDO0FBQ2pDLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFDN0IsaUNBQWlDO0FBQ2pDLHFDQUFrQztBQUVsQyxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQU0sQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDdEUsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBRTFFLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztBQUV2QixNQUFNLFlBQVksR0FBRyxXQUFXLENBQUMsWUFBWSxDQUFDO0FBQzlDLEtBQUssTUFBTSxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFTLFlBQVksQ0FBQyxFQUFFO0lBQ3hFLElBQUksZ0NBQWdDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUFFLFNBQVM7SUFDckUsSUFBSTtRQUNBLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLElBQUksZUFBZSxDQUFDLENBQUM7UUFDbEQsTUFBTSxnQkFBZ0IsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQzNDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUNwQyw4Q0FBOEM7WUFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsZUFBZSxDQUFDLEVBQUU7Z0JBQ3RELE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksdUNBQXVDLGdCQUFnQixjQUFjLGVBQWUsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDMUgsVUFBVSxHQUFHLElBQUksQ0FBQzthQUNyQjtTQUNKO0tBQ0o7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNWLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxrQkFBa0IsRUFBRTtZQUNqQyxNQUFNLEdBQUcsQ0FBQztTQUNiO1FBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDcEQsVUFBVSxHQUFHLElBQUksQ0FBQztLQUNyQjtDQUNKO0FBRUQsSUFBSSxVQUFVLEVBQUU7SUFDWixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsMEJBQTBCLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFdBQVcsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUMvSCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDcEIifQ==