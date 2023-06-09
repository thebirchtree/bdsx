"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installMinecraftAddons = void 0;
const colors = require("colors");
const fs = require("fs");
const path = require("path");
const ProgressBar = require("progress");
const stripJsonComments = require("strip-json-comments");
const unzipper = require("unzipper");
const config_1 = require("./config");
const fsutil_1 = require("./fsutil");
const serverproperties_1 = require("./serverproperties");
var Provider;
(function (Provider) {
    Provider[Provider["Server"] = 0] = "Server";
    Provider[Provider["World"] = 1] = "World";
    Provider[Provider["BDSX"] = 2] = "BDSX";
})(Provider || (Provider = {}));
var PackDirectoryType;
(function (PackDirectoryType) {
    PackDirectoryType["ResourcePacks"] = "resource_packs";
    PackDirectoryType["BehaviorPacks"] = "behavior_packs";
})(PackDirectoryType || (PackDirectoryType = {}));
class PackInfo {
    constructor(packPath, managedDirPath, managedName, manifest) {
        this.managedName = managedName;
        this.path = packPath;
        this.name = manifest.header.name.replace(/\W/g, "");
        this.managedPath = managedDirPath + "/" + managedName;
        this.uuid = manifest.header.uuid;
        this.version = manifest.header.version || manifest.header.modules[0].version;
        if (manifest.modules != null) {
            this.type = manifest.modules[0].type.toLowerCase();
        }
        else if (manifest.header.modules != null) {
            this.type = manifest.header.modules[0].type.toLowerCase();
        }
        else {
            throw new Error(`${path}: modules not found.`);
        }
        switch (this.type) {
            case "data":
                this.directoryType = PackDirectoryType.BehaviorPacks;
                break;
            case "resources":
                this.directoryType = PackDirectoryType.ResourcePacks;
                break;
            case "javascript":
            case "script":
                this.directoryType = PackDirectoryType.BehaviorPacks;
                break;
            default:
                throw Error(`unknown addon pack type '${this.type}'`);
        }
    }
    isResourcePack() {
        return this.type === "resources";
    }
    isBehaviorPack() {
        return this.type === "data" || this.type === "javascript" || this.type === "script";
    }
    static async createFrom(packPath, hostManagePath, managedName) {
        const manifestPath = await findFiles(manifestNames, packPath);
        if (manifestPath === null) {
            console.error(colors.red(`[MCAddons] ${hostManagePath}/${managedName}: manifest not found`));
            return null;
        }
        const json = await fsutil_1.fsutil.readFile(manifestPath);
        const manifest = JSON.parse(stripJsonComments(json));
        return new PackInfo(packPath, hostManagePath, managedName, manifest);
    }
}
class PackDirectory {
    constructor(host, type, path, managedPath) {
        this.host = host;
        this.type = type;
        this.path = path;
        this.managedPath = managedPath;
        this.packs = new Map();
        this.loaded = false;
    }
    async _load() {
        if (this.loaded)
            return;
        this.loaded = true;
        this.packs.clear();
        const packs = await fsutil_1.fsutil.readdir(this.path);
        for (const packName of packs) {
            const packPath = path.join(this.path, packName);
            if (!(await fsutil_1.fsutil.isDirectory(packPath)))
                continue;
            try {
                const pack = await PackInfo.createFrom(packPath, this.managedPath, packName);
                if (pack === null) {
                    continue;
                }
                if (this.type !== null && pack.directoryType !== this.type) {
                    console.error(colors.red(`[MCAddons] ${this.managedPath}/${packName}: addon directory unmatched (pack = ${pack.directoryType}, host = ${this.type})`));
                    continue;
                }
                this.packs.set(pack.uuid, pack);
            }
            catch (err) {
                if (err.code === "ENOENT") {
                    // broken link
                    console.error(colors.yellow(`[MCAddons] ${this.managedPath}/${packName}: Link is broken, removing`));
                    await fsutil_1.fsutil.unlinkQuiet(packPath);
                    continue;
                }
                console.trace(colors.red(`[MCAddons] ${this.managedPath}/${packName}: ${(err && err.message) || err}`));
            }
        }
    }
    async makeLink(pack) {
        await dirmaker.make(this.path);
        await this._load();
        const already = this.packs.get(pack.uuid);
        const installPath = this.path + path.sep + pack.name;
        if (already == null) {
            try {
                await fsutil_1.fsutil.symlink(pack.path, installPath, "junction");
            }
            catch (err) {
                if (err.code === "ENOENT") {
                    // broken link
                    console.error(colors.yellow(`[MCAddons] addons/${pack.managedName}: Link is broken, fixing`));
                    await fsutil_1.fsutil.unlinkQuiet(pack.path);
                    await fsutil_1.fsutil.symlink(pack.path, installPath, "junction");
                }
            }
        }
        else {
            if (!(await isLink(already.path))) {
                console.error(colors.yellow(`[MCAddons] addons/${pack.managedName}: already exist`));
            }
        }
        return installPath;
    }
    /**
     * delete if it's symlink
     */
    async unlink(mpack) {
        if (mpack.uuid !== null) {
            this.packs.delete(mpack.uuid);
        }
        const installPath = this.path + path.sep + mpack.packName;
        try {
            if (!(await isLink(installPath))) {
                console.error(colors.yellow(`[MCAddons] ${installPath}: Skip removing. is not installed by bdsx.`));
                return;
            }
        }
        catch (err) {
            if (err.code !== "ENOENT")
                throw err;
        }
        await fsutil_1.fsutil.unlinkQuiet(installPath);
    }
}
var ZipType;
(function (ZipType) {
    ZipType[ZipType["mcaddon"] = 0] = "mcaddon";
    ZipType[ZipType["mcpack"] = 1] = "mcpack";
    ZipType[ZipType["zip"] = 2] = "zip";
})(ZipType || (ZipType = {}));
class ManagedPack {
    constructor(managedName) {
        this.managedName = managedName;
        this.state = ManagedPackState.Removed;
        this.installMTime = null;
        this.directory = null;
        this.zip = null;
        this.zipType = null;
        this.uuid = null;
        this.packName = null;
        this.pack = null;
        this.packs = null;
    }
    getPackDirectoryPath() {
        return addonsPath + path.sep + this.managedName.replace(/\//g, path.sep);
    }
    checkUpdated(targetTime) {
        return this.installMTime === null || targetTime > this.installMTime;
    }
    async loadPack() {
        if (this.pack !== null)
            return this.pack;
        if (this.directory === null)
            throw Error(`${this.managedName}: does not have directory`);
        const pack = await PackInfo.createFrom(this.directory.path, "addons", this.managedName);
        if (pack === null) {
            throw Error(`${this.managedName}: does not have pack`);
        }
        this.pack = pack;
        this.uuid = pack.uuid;
        this.packName = pack.name;
        return pack;
    }
    static fromJson(managedName, json) {
        const [mtime, zipType, packName, uuid] = json;
        const mpack = new ManagedPack(managedName);
        mpack.installMTime = mtime;
        mpack.uuid = uuid || null;
        mpack.packName = packName || null;
        mpack.zipType = zipType;
        return mpack;
    }
    toJson() {
        if (this.uuid !== null) {
            return [this.installMTime, this.zipType, this.packName, this.uuid];
        }
        else {
            return [this.installMTime, this.zipType];
        }
    }
}
class BdsxPackDirectory {
    constructor(worldPath, worldName) {
        this.worldName = worldName;
        this.loaded = false;
        this.modified = false;
        this.managedPacks = new Map();
        this.bdsxAddonsJsonPath = worldPath + path.sep + "addons_from_bdsx.json";
    }
    async getPacks() {
        await this._load();
        return this.managedPacks.values();
    }
    _getManagedPack(stat, addonName) {
        let packName = stat.isDirectory ? stat.base : stat.name;
        if (addonName != null)
            packName = addonName + "/" + packName;
        let newPack = false;
        let mpack = this.managedPacks.get(packName);
        if (mpack == null) {
            mpack = new ManagedPack(packName);
            mpack.state = ManagedPackState.Added;
            newPack = true;
        }
        else {
            if (mpack.state === ManagedPackState.Removed) {
                mpack.state = ManagedPackState.Already;
            }
        }
        if (stat.isDirectory) {
            mpack.directory = stat;
        }
        else {
            let zipType;
            if (stat.base.endsWith(".mcaddon")) {
                zipType = ZipType.mcaddon;
            }
            else if (stat.base.endsWith(".mcpack")) {
                zipType = ZipType.mcpack;
            }
            else if (stat.base.endsWith(".zip")) {
                zipType = ZipType.zip;
            }
            else {
                console.error(colors.red(`[MCAddons] Unexpected file: addons/${stat}`));
                return null;
            }
            if (mpack.zipType === null) {
                mpack.zipType = zipType;
                mpack.zip = stat;
            }
            else {
                mpack.zip = stat;
            }
        }
        if (newPack) {
            this.managedPacks.set(packName, mpack);
        }
        return mpack;
    }
    async _addDirectory(mpack) {
        try {
            let files = null;
            if (mpack.zip !== null) {
                if (mpack.directory === null || mpack.zip.mtime > mpack.directory.mtime) {
                    console.error(`[MCAddons] ${mpack.zip.getSimplePath()}: unzip`);
                    mpack.directory = await mpack.zip.makeDirectory();
                    files = await unzip(mpack.managedName, mpack.zip, mpack.directory, true);
                }
            }
            else if (mpack.directory === null) {
                console.trace(`[MCAddons] ${mpack.managedName}: does not have zip or directory`);
                return;
            }
            if (!mpack.checkUpdated(mpack.directory.mtime)) {
                return;
            }
            mpack.installMTime = mpack.directory.mtime;
            const dirName = mpack.managedName;
            if (mpack.zipType === ZipType.mcpack) {
                await mpack.loadPack();
                return;
            }
            if (files == null)
                files = await readdirWithStats(mpack.directory.path);
            const packFiles = [];
            if (mpack.zipType === ZipType.mcaddon) {
                for (const stat of files) {
                    if (stat.isDirectory) {
                        packFiles.push(stat);
                    }
                    else if (stat.base.endsWith(".mcpack")) {
                        packFiles.push(stat);
                    }
                }
            }
            else {
                for (const stat of files) {
                    if (stat.isDirectory) {
                        packFiles.push(stat);
                    }
                    else if (mpack.zipType === ZipType.mcaddon) {
                        if (stat.base.endsWith(".mcpack")) {
                            packFiles.push(stat);
                        }
                    }
                    else if (manifestNames.has(stat.base)) {
                        // it has manifest. determine as mcpack
                        mpack.zipType = ZipType.mcpack;
                        await mpack.loadPack();
                        return;
                    }
                    else if (stat.base.endsWith(".mcpack")) {
                        mpack.zipType = ZipType.mcaddon;
                        packFiles.push(stat);
                    }
                }
            }
            if (packFiles.length === 0) {
                // it does not have anything
                console.error(colors.red(`[MCAddons] addons/${mpack.managedName}: empty`));
                return;
            }
            const mpacks = new Set();
            for (const unzipped of packFiles) {
                const mpack = this._getManagedPack(unzipped, dirName);
                if (mpack === null)
                    continue;
                mpack.zipType = ZipType.mcpack;
                mpacks.add(mpack);
            }
            mpack.packs = [...mpacks];
            for (const pack of mpack.packs) {
                await this._addDirectory(pack);
            }
        }
        catch (err) {
            console.trace(colors.red(`[MCAddons] addons/${mpack.managedName}: ${(err && err.message) || err}`));
        }
    }
    async _load() {
        if (this.loaded)
            return;
        this.loaded = true;
        const managedInfos = await readObjectJson(this.bdsxAddonsJsonPath);
        for (const [name, info] of Object.entries(managedInfos)) {
            const names = name.split("/");
            const mpack = ManagedPack.fromJson(name, info);
            if (names.length >= 2) {
                const addonName = names[0];
                const addon = this.managedPacks.get(addonName);
                if (addon !== undefined) {
                    if (addon.packs === null)
                        addon.packs = [];
                    addon.packs.push(mpack);
                }
            }
            this.managedPacks.set(name, mpack);
        }
        const packFiles = await readdirWithStats(addonsPath);
        for (const stat of packFiles) {
            if (!stat.isDirectory && (stat.base.endsWith(".txt") || stat.base.endsWith(".md") || stat.base.endsWith(".html"))) {
                continue; // Ignore READMEs or similar things.
            }
            const addon = this._getManagedPack(stat); // make managed packs from zip or directory or both
            if (addon !== null && addon.packs !== null) {
                for (const pack of addon.packs) {
                    const packPath = pack.getPackDirectoryPath();
                    let stat;
                    try {
                        stat = await fsutil_1.fsutil.stat(packPath);
                    }
                    catch (err) {
                        if (err.code !== "ENOENT")
                            throw err;
                        // not found, removed
                        continue;
                    }
                    pack.directory = FileInfo.fromStat(packPath, path.basename(packPath), stat);
                    if (pack.state === ManagedPackState.Removed)
                        pack.state = ManagedPackState.Already;
                }
            }
        }
        for (const pack of this.managedPacks.values()) {
            if (pack.state === ManagedPackState.Removed)
                continue;
            await this._addDirectory(pack);
        }
    }
    async save() {
        if (!this.modified)
            return;
        const obj = {};
        for (const managedPack of this.managedPacks.values()) {
            if (managedPack.state !== ManagedPackState.Removed) {
                obj[managedPack.managedName] = managedPack.toJson();
            }
        }
        await fsutil_1.fsutil.writeJson(this.bdsxAddonsJsonPath, obj);
    }
}
var ManagedPackState;
(function (ManagedPackState) {
    ManagedPackState[ManagedPackState["Removed"] = 0] = "Removed";
    ManagedPackState[ManagedPackState["Already"] = 1] = "Already";
    ManagedPackState[ManagedPackState["Added"] = 2] = "Added";
})(ManagedPackState || (ManagedPackState = {}));
class PackManager {
    constructor(provider, jsonPath) {
        this.provider = provider;
        this.jsonPath = jsonPath;
        this.data = [];
        this.loaded = false;
        this.modified = false;
    }
    async _load() {
        if (this.loaded)
            return;
        this.loaded = true;
        this.data.length = 0;
        try {
            const json = await fsutil_1.fsutil.readFile(this.jsonPath);
            const result = JSON.parse(json);
            if (result instanceof Array) {
                this.data = result;
            }
        }
        catch (err) { }
    }
    async save() {
        if (!this.modified)
            return;
        await dirmaker.make(path.dirname(this.jsonPath));
        await fsutil_1.fsutil.writeJson(this.jsonPath, this.data);
    }
    async uninstall(mpack) {
        if (mpack.uuid === null)
            throw TypeError(`${mpack.managedName}: does not have uuid`);
        await this._load();
        const packIndex = this._indexOf(mpack.uuid);
        if (packIndex !== -1) {
            this.data.splice(packIndex, 1);
            this.modified = true;
        }
    }
}
class WorldPackManager extends PackManager {
    constructor(type, worldPath, worldName) {
        super(Provider.World, `${worldPath}${path.sep}world_${type}.json`);
        this.type = type;
        this.installed = new PackDirectory(Provider.World, type, worldPath + path.sep + type, `${worldName}/${type}`);
    }
    _indexOf(uuid) {
        return this.data.findIndex(v => v.pack_id === uuid);
    }
    async install(mpack) {
        const pack = await mpack.loadPack();
        await this.installed.makeLink(pack);
        await this._load();
        const wpack = {
            pack_id: pack.uuid,
            version: pack.version,
        };
        const already = this.data.findIndex(v => v.pack_id === mpack.uuid);
        if (already !== -1) {
            this.data.splice(already, 1, wpack);
        }
        else {
            this.data.unshift(wpack);
        }
        this.modified = true;
    }
    async uninstall(mpack) {
        await super.uninstall(mpack);
        await this.installed.unlink(mpack);
    }
}
class ServerPackManager extends PackManager {
    constructor(jsonPath) {
        super(Provider.Server, jsonPath);
        this.installedResources = new PackDirectory(Provider.Server, PackDirectoryType.ResourcePacks, config_1.Config.BDS_PATH + path.sep + "resource_packs", "bedrock_server/resource_packs");
        this.installedBehaviors = new PackDirectory(Provider.Server, PackDirectoryType.BehaviorPacks, config_1.Config.BDS_PATH + path.sep + "behavior_packs", "bedrock_server/behavior_packs");
    }
    _indexOf(uuid) {
        return this.data.findIndex(v => v.uuid === uuid);
    }
    getPackDirectory(type) {
        switch (type) {
            case PackDirectoryType.ResourcePacks:
                return this.installedResources;
            case PackDirectoryType.BehaviorPacks:
                return this.installedBehaviors;
        }
    }
    async install(mpack) {
        const pack = await mpack.loadPack();
        await this.getPackDirectory(pack.directoryType).makeLink(pack);
        await this._load();
        const already = this.data.findIndex(v => v.uuid === pack.uuid);
        const spack = {
            file_system: "RawPath",
            path: `${pack.directoryType}/${pack.name}`,
            uuid: pack.uuid,
            version: `${pack.version[0]}.${pack.version[1]}.${pack.version[2]}`,
        };
        if (already !== -1) {
            this.data.splice(already, 1, spack);
        }
        else {
            this.data.splice(1, 0, spack);
        }
        this.modified = true;
    }
    async uninstall(mpack) {
        await super.uninstall(mpack);
        await this.installedResources.unlink(mpack);
        await this.installedBehaviors.unlink(mpack);
    }
}
async function readObjectJson(path) {
    try {
        const json = await fsutil_1.fsutil.readFile(path);
        const result = JSON.parse(json);
        if (result === null || !(result instanceof Object)) {
            return {};
        }
        return result;
    }
    catch (err) {
        return {};
    }
}
class FileInfo {
    constructor(path, 
    /**
     * name without extension
     */
    name, 
    /**
     * name with extension
     */
    base, isDirectory, mtime, size) {
        this.path = path;
        this.name = name;
        this.base = base;
        this.isDirectory = isDirectory;
        this.mtime = mtime;
        this.size = size;
    }
    getSimplePath() {
        const rpath = path.relative(addonsPath, this.path);
        return rpath.replace(path.sep, "/");
    }
    async makeDirectory() {
        const dirPath = path.dirname(this.path) + path.sep + this.name;
        await dirmaker.make(dirPath);
        return new FileInfo(dirPath, this.name, this.name, true, Date.now(), 0);
    }
    static fromStat(filePath, fileName, stat) {
        const extidx = fileName.lastIndexOf(".");
        return new FileInfo(filePath, extidx === -1 ? fileName : fileName.substr(0, extidx), fileName, stat.isDirectory(), stat.mtimeMs, stat.size);
    }
}
async function readdirWithStats(dirPath) {
    try {
        const files = await fsutil_1.fsutil.readdir(dirPath);
        const out = [];
        for (const fileName of files) {
            const filePath = dirPath + path.sep + fileName;
            const stat = await fsutil_1.fsutil.stat(filePath);
            out.push(FileInfo.fromStat(filePath, fileName, stat));
        }
        return out;
    }
    catch (err) {
        if (err.code === "ENOENT")
            return [];
        else
            throw err;
    }
}
async function unzip(name, zip, targetDir, getRootFiles = false) {
    const bar = new ProgressBar(`${name}: Unzip :bar :current/:total`, zip.size);
    const rootFiles = getRootFiles ? new Map() : null;
    await fs
        .createReadStream(zip.path)
        .pipe(unzipper.Parse())
        .on("entry", async (entry) => {
        bar.tick(entry.vars.compressedSize);
        if (rootFiles !== null) {
            const rootedFile = /^[/\\]?([^/\\]+)([/\\]?)/.exec(entry.path);
            if (rootedFile !== null) {
                const fileName = rootedFile[1];
                if (!rootFiles.has(fileName)) {
                    const extidx = fileName.lastIndexOf(".");
                    rootFiles.set(fileName, new FileInfo(targetDir.path + path.sep + fileName, extidx === -1 ? fileName : fileName.substr(0, extidx), fileName, rootedFile[2] !== "" || entry.type === "Directory", entry.vars.lastModifiedTime, entry.extra.uncompressedSize));
                }
            }
        }
        const targetPath = path.join(targetDir.path, entry.path);
        await dirmaker.make(path.dirname(targetPath));
        if (entry.type === "File") {
            entry.pipe(fs.createWriteStream(targetPath));
        }
    })
        .promise();
    bar.update(bar.total);
    bar.terminate();
    if (targetDir.mtime < zip.mtime) {
        await fsutil_1.fsutil.utimes(targetDir.path, zip.mtime, zip.mtime);
    }
    return rootFiles !== null ? [...rootFiles.values()] : null;
}
async function findFiles(filenames, directory) {
    const directories = [path.resolve(directory)];
    const files = [];
    for (;;) {
        for (const dir of directories) {
            const contents = await fsutil_1.fsutil.readdir(dir);
            for (const file of contents) {
                const filepath = dir + path.sep + file;
                if (filenames.has(file))
                    return path.join(filepath);
                files.push(filepath);
            }
        }
        directories.length = 0;
        for (const file of files) {
            if (await fsutil_1.fsutil.isDirectory(file)) {
                directories.push(file);
            }
        }
        files.length = 0;
        if (directories.length === 0) {
            return null;
        }
    }
}
async function isLink(filepath) {
    return (await fsutil_1.fsutil.lstat(filepath)).isSymbolicLink();
}
const projectPath = fsutil_1.fsutil.projectPath;
const addonsPath = projectPath + path.sep + "addons";
const manifestNames = new Set(["manifest.json", "pack_manifest.json"]);
const dirmaker = new fsutil_1.fsutil.DirectoryMaker();
dirmaker.dirhas.add(projectPath);
async function installMinecraftAddons() {
    await dirmaker.make(config_1.Config.BDS_PATH);
    const worldName = serverproperties_1.serverProperties["level-name"] || "Bedrock level";
    const worldPath = config_1.Config.BDS_PATH + path.sep + "worlds" + path.sep + worldName;
    const serverPacks = new ServerPackManager(config_1.Config.BDS_PATH + path.sep + "valid_known_packs.json");
    const worldResources = new WorldPackManager(PackDirectoryType.ResourcePacks, worldPath, worldName);
    const worldBehaviors = new WorldPackManager(PackDirectoryType.BehaviorPacks, worldPath, worldName);
    const bdsxPacks = new BdsxPackDirectory(worldPath, worldName);
    function getWorldPackManager(type) {
        switch (type) {
            case PackDirectoryType.ResourcePacks:
                return worldResources;
            case PackDirectoryType.BehaviorPacks:
                return worldBehaviors;
        }
    }
    for (const mpack of await bdsxPacks.getPacks()) {
        switch (mpack.state) {
            case ManagedPackState.Removed:
                if (mpack.uuid !== null) {
                    await worldResources.uninstall(mpack);
                    await worldBehaviors.uninstall(mpack);
                    await serverPacks.uninstall(mpack);
                    console.log(colors.red(`[MCAddons] addons/${mpack.managedName}: removed`));
                    bdsxPacks.modified = true;
                }
                break;
            case ManagedPackState.Added: {
                if (mpack.pack !== null) {
                    await getWorldPackManager(mpack.pack.directoryType).install(mpack);
                    await serverPacks.install(mpack);
                    console.log(colors.green(`[MCAddons] addons/${mpack.managedName}: added`));
                    bdsxPacks.modified = true;
                }
                break;
            }
            case ManagedPackState.Already:
                if (mpack.pack !== null) {
                    console.log(`[MCAddons] addons/${mpack.managedName}`);
                }
                break;
        }
    }
    await serverPacks.save();
    await worldResources.save();
    await worldBehaviors.save();
    await bdsxPacks.save();
}
exports.installMinecraftAddons = installMinecraftAddons;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkb25pbnN0YWxsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZGRvbmluc3RhbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBaUM7QUFDakMseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3Qix3Q0FBd0M7QUFDeEMseURBQXlEO0FBQ3pELHFDQUFxQztBQUNyQyxxQ0FBa0M7QUFDbEMscUNBQWtDO0FBQ2xDLHlEQUFzRDtBQXlCdEQsSUFBSyxRQUlKO0FBSkQsV0FBSyxRQUFRO0lBQ1QsMkNBQU0sQ0FBQTtJQUNOLHlDQUFLLENBQUE7SUFDTCx1Q0FBSSxDQUFBO0FBQ1IsQ0FBQyxFQUpJLFFBQVEsS0FBUixRQUFRLFFBSVo7QUFFRCxJQUFLLGlCQUdKO0FBSEQsV0FBSyxpQkFBaUI7SUFDbEIscURBQWdDLENBQUE7SUFDaEMscURBQWdDLENBQUE7QUFDcEMsQ0FBQyxFQUhJLGlCQUFpQixLQUFqQixpQkFBaUIsUUFHckI7QUFFRCxNQUFNLFFBQVE7SUFTVixZQUFZLFFBQWdCLEVBQUUsY0FBc0IsRUFBa0IsV0FBbUIsRUFBRSxRQUF1QjtRQUE1QyxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUNyRixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLEdBQUcsR0FBRyxHQUFHLFdBQVcsQ0FBQztRQUN0RCxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FB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