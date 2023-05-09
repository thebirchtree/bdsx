"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installBDS = void 0;
const child_process = require("child_process");
const colors = require("colors");
const path = require("path");
const fsutil_1 = require("../fsutil");
const serverproperties_1 = require("../serverproperties");
const BDS_VERSION_DEFAULT = require("../version-bds.json");
const BDSX_CORE_VERSION_DEFAULT = require("../version-bdsx.json");
const installercls_1 = require("./installercls");
const BDS_LINK_DEFAULT = "https://minecraft.azureedge.net/bin-win/bedrock-server-%BDS_VERSION%.zip";
const BDSX_CORE_LINK_DEFAULT = "https://github.com/bdsx/bdsx-core/releases/download/%BDSX_CORE_VERSION%/bdsx-core-%BDSX_CORE_VERSION%.zip";
const PDBCACHE_LINK_DEFAULT = "https://github.com/bdsx/pdbcache/releases/download/%BDS_VERSION%/pdbcache.zip";
const BDS_VERSION = process.env.BDSX_BDS_VERSION || BDS_VERSION_DEFAULT;
const BDSX_CORE_VERSION = process.env.BDSX_CORE_VERSION || BDSX_CORE_VERSION_DEFAULT;
const BDS_LINK = replaceVariable(process.env.BDSX_BDS_LINK || BDS_LINK_DEFAULT);
const BDSX_CORE_LINK = replaceVariable(process.env.BDSX_CORE_LINK || BDSX_CORE_LINK_DEFAULT);
const PDBCACHE_LINK = replaceVariable(process.env.BDSX_PDBCACHE_LINK || PDBCACHE_LINK_DEFAULT);
function replaceVariable(str) {
    return str.replace(/%(.*?)%/g, (match, name) => {
        switch (name.toUpperCase()) {
            case "":
                return "%";
            case "BDS_VERSION":
                return BDS_VERSION;
            case "BDSX_CORE_VERSION":
                return BDSX_CORE_VERSION;
            default:
                return match;
        }
    });
}
const KEEPS = new Set([`whitelist.json`, `allowlist.json`, `valid_known_packs.json`, `server.properties`, `permissions.json`]);
const pdbcache = new installercls_1.InstallItem({
    name: "pdbcache",
    version: BDS_VERSION,
    url: PDBCACHE_LINK,
    targetPath: ".",
    key: "pdbcacheVersion",
    keyFile: "pdbcache.bin",
    async fallback(installer, statusCode) {
        if (statusCode !== 404)
            return;
        console.error(colors.yellow(`pdbcache-${BDS_VERSION} does not exist on the server`));
        console.error(colors.yellow("Generate through pdbcachegen.exe"));
        const pdbcachegen = path.join(installer.bdsPath, "pdbcachegen.exe");
        const pdbcachebin = path.join(installer.bdsPath, "pdbcache.bin");
        const bedrockserver = path.join(installer.bdsPath, "bedrock_server.exe");
        const res = child_process.spawnSync(pdbcachegen, [bedrockserver, pdbcachebin], { stdio: "inherit" });
        if (res.status !== 0)
            throw new installercls_1.InstallItem.Report(`Failed to generate pdbcache`);
        await installer.gitPublish(this, "pdbcache.bin", installer.bdsPath, "pdbcache.zip");
        return false;
    },
});
const bds = new installercls_1.InstallItem({
    name: "BDS",
    version: BDS_VERSION,
    url: BDS_LINK,
    targetPath: ".",
    key: "bdsVersion",
    keyFile: "bedrock_server.exe",
    skipExists: true,
    async confirm(installer) {
        console.log(`This will download and install Bedrock Dedicated Server to '${path.resolve(installer.bdsPath)}'`);
        console.log(`BDS Version: ${BDS_VERSION}`);
        console.log(`Minecraft End User License Agreement: https://account.mojang.com/terms`);
        console.log(`Privacy Policy: https://go.microsoft.com/fwlink/?LinkId=521839`);
        const ok = await installer.yesno("Do you agree to the terms above? (y/n)");
        if (!ok)
            throw new installercls_1.InstallItem.Report("Canceled");
    },
    async preinstall(installer) {
        if (installer.info.files) {
            const files = installer.info.files.filter(file => !KEEPS.has(file));
            // Removes KEEPS because they could have been stored before by bugs.
            await installer.removeInstalled(installer.bdsPath, files);
        }
    },
    async postinstall(installer, writedFiles) {
        installer.info.files = writedFiles.filter(file => !KEEPS.has(file));
        // `installer.info will` be saved to `bedrock_server/installinfo.json`.
        // Removes KEEPS because they don't need to be remembered.
    },
    merge: [["server.properties", serverproperties_1.spropsUtil.merge]],
});
const bdsxCore = new installercls_1.InstallItem({
    name: "bdsx-core",
    version: BDSX_CORE_VERSION,
    url: BDSX_CORE_LINK,
    targetPath: ".",
    key: "bdsxCoreVersion",
    keyFile: "VCRUNTIME140_1.dll",
    oldFiles: ["mods", "Chakra.pdb"],
    async fallback(installer, statusCode) {
        if (statusCode !== 404)
            return;
        console.error(colors.yellow(`bdsx-core-${BDSX_CORE_VERSION} does not exist on the server`));
        const corePath = path.join(fsutil_1.fsutil.projectPath, `../bdsx-core/release/bdsx-core-${BDSX_CORE_VERSION}.zip`);
        if (await fsutil_1.fsutil.exists(corePath)) {
            console.error(colors.yellow(`Found it from the local core project: ${corePath}`));
            await installer.gitPublish(this, corePath);
        }
        return false;
    },
});
async function installBDS(bdsPath, opts) {
    const installer = new installercls_1.BDSInstaller(bdsPath, opts);
    if (opts.skip !== undefined) {
        console.log(`Skipped by ${opts.skip}`);
        return true;
    }
    await installer.info.load();
    try {
        await bds.install(installer);
        await bdsxCore.install(installer);
        await pdbcache.install(installer);
        await installer.info.save();
        return true;
    }
    catch (err) {
        if (err instanceof installercls_1.InstallItem.Report) {
            console.error(err.message);
        }
        else {
            console.error(err.stack);
        }
        await installer.info.save();
        return false;
    }
}
exports.installBDS = installBDS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFsbGVyYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5zdGFsbGVyYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtDQUErQztBQUMvQyxpQ0FBaUM7QUFDakMsNkJBQTZCO0FBQzdCLHNDQUFtQztBQUNuQywwREFBaUQ7QUFDakQsMkRBQTJEO0FBQzNELGtFQUFrRTtBQUNsRSxpREFBMkQ7QUFFM0QsTUFBTSxnQkFBZ0IsR0FBRywwRUFBMEUsQ0FBQztBQUNwRyxNQUFNLHNCQUFzQixHQUFHLDJHQUEyRyxDQUFDO0FBQzNJLE1BQU0scUJBQXFCLEdBQUcsK0VBQStFLENBQUM7QUFFOUcsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsSUFBSSxtQkFBbUIsQ0FBQztBQUN4RSxNQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLElBQUkseUJBQXlCLENBQUM7QUFDckYsTUFBTSxRQUFRLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLGdCQUFnQixDQUFDLENBQUM7QUFDaEYsTUFBTSxjQUFjLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxJQUFJLHNCQUFzQixDQUFDLENBQUM7QUFDN0YsTUFBTSxhQUFhLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLElBQUkscUJBQXFCLENBQUMsQ0FBQztBQUUvRixTQUFTLGVBQWUsQ0FBQyxHQUFXO0lBQ2hDLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBWSxFQUFFLEVBQUU7UUFDbkQsUUFBUSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDeEIsS0FBSyxFQUFFO2dCQUNILE9BQU8sR0FBRyxDQUFDO1lBQ2YsS0FBSyxhQUFhO2dCQUNkLE9BQU8sV0FBVyxDQUFDO1lBQ3ZCLEtB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