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
const sep = path.sep;
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
const KEEPS = new Set([`${sep}whitelist.json`, `${sep}allowlist.json`, `${sep}valid_known_packs.json`, `${sep}server.properties`, `${sep}permissions.json`]);
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
            await installer.removeInstalled(installer.bdsPath, installer.info.files);
        }
    },
    async postinstall(installer, writedFiles) {
        installer.info.files = writedFiles.filter(file => !KEEPS.has(file));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFsbGVyYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5zdGFsbGVyYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtDQUErQztBQUMvQyxpQ0FBaUM7QUFDakMsNkJBQTZCO0FBQzdCLHNDQUFtQztBQUNuQywwREFBaUQ7QUFDakQsMkRBQTJEO0FBQzNELGtFQUFrRTtBQUNsRSxpREFBMkQ7QUFFM0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUVyQixNQUFNLGdCQUFnQixHQUFHLDBFQUEwRSxDQUFDO0FBQ3BHLE1BQU0sc0JBQXNCLEdBQUcsMkdBQTJHLENBQUM7QUFDM0ksTUFBTSxxQkFBcUIsR0FBRywrRUFBK0UsQ0FBQztBQUU5RyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixJQUFJLG1CQUFtQixDQUFDO0FBQ3hFLE1BQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsSUFBSSx5QkFBeUIsQ0FBQztBQUNyRixNQUFNLFFBQVEsR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUksZ0JBQWdCLENBQUMsQ0FBQztBQUNoRixNQUFNLGNBQWMsR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLElBQUksc0JBQXNCLENBQUMsQ0FBQztBQUM3RixNQUFNLGFBQWEsR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsSUFBSSxxQkFBcUIsQ0FBQyxDQUFDO0FBRS9GLFNBQVMsZUFBZSxDQUFDLEdBQVc7SUFDaEMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFZLEVBQUUsRUFBRTtRQUNuRCxRQUFRLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUN4QixLQUFLLEVBQUU7Z0JBQ0gsT0FBTyxHQUFHLENBQUM7WUFD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