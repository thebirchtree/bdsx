"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAllPlugins = exports.loadedPackages = exports.loadedPlugins = void 0;
const colors = require("colors");
const path = require("path");
const concurrency_1 = require("./concurrency");
const counterpromise_1 = require("./counterpromise");
const deprecated_plugins_1 = require("./deprecated_plugins");
const fsutil_1 = require("./fsutil");
const source_map_support_1 = require("./source-map-support");
const winecompatible_1 = require("./winecompatible");
const PLUGINS_BDSX_PATH = "file:../bdsx";
const BDSX_SCOPE = "@bdsx/";
exports.loadedPlugins = [];
exports.loadedPackages = [];
async function loadAllPlugins() {
    class PackageJson {
        constructor(name) {
            this.name = name;
            this.loaded = false;
            this.jsonpath = null;
            this.json = null;
            this.errorMessage = null;
        }
        setJsonPath(jsonpath) {
            if (this.jsonpath !== null)
                throw Error(`already`);
            this.jsonpath = jsonpath;
        }
        getJson() {
            if (this.json !== null)
                return this.json;
            return (this.json = require(this.getJsonPath()));
        }
        getJsonPath() {
            if (this.jsonpath !== null)
                return this.jsonpath;
            return (this.jsonpath = require.resolve(`${this.name}/package.json`));
        }
        async fix() {
            let modified = false;
            try {
                const json = this.getJson();
                const deps = json.dependencies;
                if (deps != null && deps.bdsx != null && deps.bdsx !== PLUGINS_BDSX_PATH) {
                    deps.bdsx = PLUGINS_BDSX_PATH;
                    modified = true;
                }
                const devDeps = json.devDependencies;
                if (devDeps != null && devDeps.bdsx != null && devDeps.bdsx !== PLUGINS_BDSX_PATH) {
                    devDeps.bdsx = PLUGINS_BDSX_PATH;
                    modified = true;
                }
                if (json.scripts && json.scripts.prepare === "tsc") {
                    json.scripts.prepare = "tsc || exit 0";
                    modified = true;
                }
            }
            catch (err) {
                if (err.code === "ENOENT")
                    return;
                throw err;
            }
            if (modified) {
                await this.save();
            }
        }
        async load(rootPackage) {
            const packagejson = this.getJson();
            if (typeof packagejson !== "object") {
                console.error(`[BDSX-Plugins] Invalid ${this.name}/package.json`);
                return false;
            }
            if (packagejson.dependencies == null)
                return true;
            const counter = new counterpromise_1.CounterPromise();
            for (const name of Object.keys(packagejson.dependencies)) {
                if (!name.startsWith(BDSX_SCOPE))
                    continue;
                PackageJson.get(name).requestLoad(counter, rootPackage ? packagejson : null);
            }
            await counter.wait();
            return true;
        }
        async save() {
            if (this.json === null)
                return;
            await fsutil_1.fsutil.writeJson(this.getJsonPath(), this.json);
        }
        static get(name) {
            let pkg = PackageJson.all.get(name);
            if (pkg != null)
                return pkg;
            pkg = new PackageJson(name);
            PackageJson.all.set(name, pkg);
            return pkg;
        }
        requestLoad(counter, parentjson) {
            if (this.loaded)
                return;
            this.loaded = true;
            try {
                const json = this.getJson();
                if (json.bdsxPlugin) {
                    this.load(false);
                }
            }
            catch (err) {
                this.errorMessage = err.message;
                counter.increase();
                taskQueue.run(async () => {
                    if (parentjson && /^file:(:?\.[\\/])?plugins[\\/]/.test(parentjson.dependencies[this.name])) {
                        let directoryFound = false;
                        const directoryPath = `${pluginspath}${path.sep}${this.name.substr(BDSX_SCOPE.length)}`;
                        try {
                            await fsutil_1.fsutil.stat(directoryPath);
                            directoryFound = true;
                            await fsutil_1.fsutil.stat(`${directoryPath}${path.sep}package.json`);
                        }
                        catch (err) {
                            if (err.code === "ENOENT") {
                                console.error(colors.red(`[BDSX-Plugins] ${this.name}: removed`));
                                if (directoryFound) {
                                    winecompatible_1.wineCompatible.removeRecursiveSync(directoryPath);
                                }
                                delete parentjson.dependencies[this.name];
                                packagejsonModified = true;
                                needToNpmInstall = true;
                                PackageJson.all.delete(this.name);
                                counter.decrease();
                                return;
                            }
                            (0, source_map_support_1.remapAndPrintError)(err);
                        }
                    }
                    else {
                        (0, source_map_support_1.remapAndPrintError)(err);
                    }
                    console.error(colors.red(`[BDSX-Plugins] Failed to read '${this.name}/package.json'`));
                    counter.decrease();
                });
            }
        }
    }
    PackageJson.all = new Map();
    let packagejsonModified = false;
    let needToNpmInstall = false;
    const projpath = fsutil_1.fsutil.projectPath;
    const pluginspath = `${projpath}${path.sep}plugins`;
    const taskQueue = new concurrency_1.ConcurrencyQueue();
    // read package.json
    const mainpkg = new PackageJson("[entrypoint]");
    mainpkg.setJsonPath(`${projpath}${path.sep}package.json`);
    let mainjson;
    try {
        mainjson = mainpkg.getJson();
    }
    catch (err) {
        console.error(colors.red(`[BDSX-Plugins] Failed to load`));
        if (err.code === "ENOENT") {
            console.error(colors.red(`[BDSX-Plugins] 'package.json' not found. Please set the entry point to the directory containing package.json`));
        }
        else {
            console.error(colors.red(`[BDSX-Plugins] Failed to read package.json. ${err.message}`));
        }
        return;
    }
    try {
        // load plugins from the directory
        const counter = new counterpromise_1.CounterPromise();
        const pluginsFiles = await fsutil_1.fsutil.readdirWithFileTypes(pluginspath);
        const pluginsInDirectory = [];
        // check new plugins
        for (const info of pluginsFiles) {
            if (!info.isDirectory())
                continue;
            const pluginname = info.name;
            const fullname = `${BDSX_SCOPE}${pluginname}`;
            const plugin = PackageJson.get(fullname);
            try {
                plugin.getJsonPath();
            }
            catch (err) {
                if (err.code === "MODULE_NOT_FOUND") {
                    plugin.setJsonPath(`${pluginspath}${path.sep}${pluginname}${path.sep}package.json`);
                    needToNpmInstall = true;
                }
                else {
                    console.error(colors.red(`[BDSX-Plugins] Failed to read 'plugins/${pluginname}/package.json'.`));
                    (0, source_map_support_1.remapAndPrintError)(err);
                    continue;
                }
            }
            pluginsInDirectory.push(plugin);
            if (mainjson.dependencies[fullname])
                continue;
            mainjson.dependencies[fullname] = `file:plugins/${pluginname}`;
            packagejsonModified = true;
            needToNpmInstall = true;
            try {
                const json = plugin.getJson();
                if (json.name !== fullname) {
                    console.error(colors.red(`[BDSX-Plugins] Wrong plugin name. Name in 'package.json' must be '${fullname}' but was '${json.name}'`));
                    continue;
                }
            }
            catch (err) {
                if (err.code === "ENOENT") {
                    console.error(colors.red(`[BDSX-Plugins] 'plugins/${pluginname}/package.json' not found. Plugins need 'package.json'`));
                }
                else {
                    console.error(colors.red(`[BDSX-Plugins] Failed to read 'plugins/${pluginname}/package.json'.`));
                    (0, source_map_support_1.remapAndPrintError)(err);
                }
            }
            console.log(colors.green(`[BDSX-Plugins] ${fullname}: added`));
        }
        for (const plugin of pluginsInDirectory) {
            taskQueue.run(() => plugin.fix());
            plugin.requestLoad(counter, mainjson);
        }
        await mainpkg.load(true);
        await taskQueue.onceEnd();
        await counter.wait();
        // apply changes
        if (packagejsonModified) {
            console.error(`[BDSX-Plugins] Apply the package changes`);
            await mainpkg.save();
        }
        if (needToNpmInstall) {
            winecompatible_1.wineCompatible.execSync("npm i");
        }
        await taskQueue.onceEnd();
        // import
        const pluginCount = PackageJson.all.size;
        if (pluginCount === 0) {
            console.log("[BDSX-Plugins] No Plugins");
        }
        else {
            let index = 0;
            const deprecateds = new Map(deprecated_plugins_1.deprecatedPlugins);
            for (const pkg of PackageJson.all.values()) {
                try {
                    console.log(colors.green(`[BDSX-Plugins] Loading ${pkg.name} (${++index}/${pluginCount})`));
                    const json = pkg.getJson();
                    const message = deprecateds.get(pkg.name + "@" + json.version);
                    if (message !== undefined) {
                        console.log(colors.yellow(`[BDSX-Plugins] ${pkg.name} - Deprecated plugin`));
                        console.log(colors.yellow(`[BDSX-Plugins] ${pkg.name} - ${message}`));
                    }
                    require(pkg.name);
                    exports.loadedPlugins.push(pkg.name);
                    exports.loadedPackages.push({
                        name: pkg.name,
                        loaded: pkg.errorMessage === null,
                        jsonpath: pkg.getJsonPath(),
                        json: json,
                    });
                }
                catch (err) {
                    console.error(colors.red(`[BDSX-Plugins] Failed to load ${pkg.name}`));
                    (0, source_map_support_1.remapAndPrintError)(err);
                }
            }
        }
    }
    catch (err) {
        (0, source_map_support_1.remapAndPrintError)(err);
    }
}
exports.loadAllPlugins = loadAllPlugins;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2lucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBsdWdpbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQWlDO0FBQ2pDLDZCQUE2QjtBQUM3QiwrQ0FBaUQ7QUFDakQscURBQWtEO0FBQ2xELDZEQUF5RDtBQUN6RCxxQ0FBa0M7QUFDbEMsNkRBQTBEO0FBQzFELHFEQUFrRDtBQUVsRCxNQUFNLGlCQUFpQixHQUFHLGNBQWMsQ0FBQztBQUV6QyxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUM7QUFFZixRQUFBLGFBQWEsR0FBYSxFQUFFLENBQUM7QUFDN0IsUUFBQSxjQUFjLEdBS3JCLEVBQUUsQ0FBQztBQUVGLEtBQUssVUFBVSxjQUFjO0lBQ2hDLE1BQU0sV0FBVztRQU1iLFlBQTRCLElBQVk7WUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO1lBTGhDLFdBQU0sR0FBWSxLQUFLLENBQUM7WUFDeEIsYUFBUSxHQUFrQixJQUFJLENBQUM7WUFDL0IsU0FBSSxHQUFlLElBQUksQ0FBQztZQUN6QixpQkFBWSxHQUFrQixJQUFJLENBQUM7UUFFQyxDQUFDO1FBRTVDLFdBQVcsQ0FBQyxRQUFnQjtZQUN4QixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSTtnQkFBRSxNQUFNLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUM3QixDQUFDO1FBRUQsT0FBTztZQUNILElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJO2dCQUFFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztZQUN6QyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyRCxDQUFDO1FBRUQsV0FBVztZQUNQLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJO2dCQUFFLE9BQU8sSUFBSSxDQUFDLFFB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