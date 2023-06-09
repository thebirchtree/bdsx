"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blessed = require("blessed");
const child_process = require("child_process");
const deprecated_plugins_1 = require("../deprecated_plugins");
const fsutil_1 = require("../fsutil");
const util_1 = require("../util");
const deprecateds = new Map(deprecated_plugins_1.deprecatedPlugins);
const SELECTABLE_ITEM_STYLE = {
    fg: "magenta",
    selected: {
        bg: "blue",
    },
};
function exec(command) {
    return new Promise((resolve, reject) => {
        child_process.exec(command, {
            encoding: "utf-8",
        }, (err, output) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(output);
            }
        });
    });
}
function execWithoutError(command) {
    return new Promise((resolve, reject) => {
        child_process.exec(command, {
            encoding: "utf-8",
        }, (err, output) => {
            resolve(output);
        });
    });
}
function ellipsis(str, len) {
    return str.length < len ? str : `${str.substr(0, len - 3)}...`;
}
class PackageInfo {
    constructor(info, deps) {
        this.versions = null;
        this.name = info.name;
        this.desc = info.description != null ? info.description : "";
        this.author = info.publisher.username;
        this.date = info.date;
        this.version = info.version;
        const installedInfo = deps && deps[this.name];
        this.installed = (installedInfo && installedInfo.version) || null;
    }
    async getVersions() {
        if (this.versions !== null)
            return this.versions;
        const versions = await exec(`npm view "${this.name}" versions --json`);
        const vs = JSON.parse(versions.replace(/'/g, '"'));
        return (this.versions = vs);
    }
    static async search(name, deps) {
        const output = await execWithoutError(`npm search --json "${name}" --searchlimit=50`);
        if (output === "\n]\n\n") {
            // a bug? empty list
            return [];
        }
        const result = JSON.parse(output);
        return result.map(item => new PackageInfo(item, deps));
    }
    toMenuString() {
        const installedVersion = this.installed || "No";
        const author = ellipsis(this.author, 18);
        let desc;
        const deprecatedMessage = deprecateds.get(this.name + "@" + this.version);
        if (deprecatedMessage !== undefined) {
            desc = "(deprecated) " + deprecatedMessage;
        }
        else {
            desc = this.desc;
        }
        return [installedVersion, this.name, desc, author, this.date];
    }
    toString() {
        return JSON.stringify(this);
    }
}
let screen = null;
function loadingWrap(text, prom) {
    if (screen === null)
        throw Error("blessed.screen not found");
    const loading = blessed.loading({
        border: "line",
        top: 3,
        width: "100%-1",
    });
    screen.append(loading);
    loading.load(text);
    screen.render();
    return prom.then(v => {
        loading.stop();
        loading.destroy();
        return v;
    }, err => {
        loading.stop();
        loading.destroy();
        throw err;
    });
}
let latestSelected = 0;
let latestSearched = "";
function searchAndSelect(prefixes, deps) {
    return new Promise(resolve => {
        if (screen === null)
            throw Error("blessed.screen not found");
        const scr = screen;
        const search = blessed.textbox({
            border: "line",
            keys: true,
            mouse: true,
            width: "100%-1",
            height: 3,
            style: {
                fg: "blue",
                focus: {
                    fg: "white",
                },
            },
        });
        const table = blessed.listtable({
            border: "line",
            keys: true,
            mouse: true,
            style: {
                header: {
                    fg: "blue",
                    bold: true,
                },
                cell: SELECTABLE_ITEM_STYLE,
            },
            top: 3,
            scrollable: true,
            width: "100%-1",
            height: "100%-3",
            align: "left",
        });
        let packages = [];
        let preparing = true;
        table.on("select item", (item, index) => {
            if (preparing)
                return;
            setTimeout(() => {
                latestSelected = index;
            }, 0);
        });
        table.on("select", (item, index) => {
            const plugin = packages[index - 1];
            if (!plugin)
                return;
            table.destroy();
            search.destroy();
            resolve(plugin);
        });
        table.key("up", () => {
            if (latestSelected === 1) {
                processInput();
            }
        });
        search.key("down", () => {
            if (packages.length !== 0) {
                search.cancel();
            }
        });
        search.key("C-c", () => {
            process.exit(0);
        });
        async function searchText(name) {
            scr.remove(table);
            const waits = prefixes.map(prefix => PackageInfo.search(prefix + name, deps));
            let pkgsArray;
            try {
                pkgsArray = await loadingWrap("Searching...", Promise.all(waits));
            }
            catch (err) {
                const stack = err.stack;
                table.setData(stack.split("\n").map(str => [str]));
                scr.append(table);
                processInput();
                return;
            }
            packages = [].concat(...pkgsArray);
            packages = packages.filter(info => {
                for (const prefix of prefixes) {
                    if (!info.name.startsWith(prefix))
                        continue;
                    return true;
                }
                return false;
            });
            scr.append(table);
            preparing = false;
            if (packages.length === 0) {
                latestSelected = -1;
                table.setData([["No result"]]);
                processInput();
            }
            else {
                table.setData([["Installed", "Name", "Description", "Author", "Date"]].concat(packages.map(item => item.toMenuString())));
                table.select(latestSelected);
                table.focus();
                scr.render();
            }
        }
        function processInput() {
            table.select(-1);
            scr.render();
            search.readInput(async (err, value) => {
                if (value == null) {
                    table.select(1);
                    table.focus();
                    scr.render();
                    return;
                }
                latestSearched = value;
                searchText(value);
            });
        }
        table.key("escape", processInput);
        scr.append(search);
        search.setValue(latestSearched);
        scr.append(table);
        searchText(latestSearched);
    });
}
function reverse(items) {
    const n = items.length;
    const last = n - 1;
    const half = n >> 1;
    for (let i = 0; i < half; i++) {
        const j = last - i;
        const t = items[i];
        items[i] = items[j];
        items[j] = t;
    }
    return items;
}
function selectVersion(name, latestVersion, installedVersion, versions) {
    return new Promise(resolve => {
        if (screen === null)
            throw Error("blessed.screen not found");
        const vnames = reverse(versions).map(v => `${name}@${v}`);
        for (let i = 0; i < versions.length; i++) {
            let moveToTop = false;
            if (versions[i] === latestVersion) {
                vnames[i] += " (Latest)";
                moveToTop = true;
            }
            if (versions[i] === installedVersion)
                continue;
            if (moveToTop) {
                vnames.unshift(vnames.splice(i, 1)[0]);
                versions.unshift(versions.splice(i, 1)[0]);
            }
        }
        if (installedVersion !== null) {
            if (versions.indexOf(installedVersion) === -1) {
                vnames.unshift(installedVersion + " (Installed)");
                versions.unshift(installedVersion);
            }
            if (!installedVersion.startsWith("file:plugins/")) {
                vnames.unshift("Remove");
                versions.unshift("");
            }
        }
        const list = blessed.list({
            items: vnames,
            border: "line",
            style: SELECTABLE_ITEM_STYLE,
            top: 3,
            scrollable: true,
            width: "100%-1",
            height: "100%-3",
            keys: true,
            mouse: true,
        });
        screen.append(list);
        list.select(0);
        list.focus();
        screen.render();
        list.key("escape", () => {
            list.destroy();
            resolve(null);
        });
        list.on("select", (item, index) => {
            list.destroy();
            const version = versions[index];
            resolve(version);
        });
    });
}
(async () => {
    for (;;) {
        if (screen === null) {
            screen = blessed.screen({
                smartCSR: true,
            });
            screen.title = "BDSX Plugin Manager";
            screen.key(["q", "C-c"], (ch, key) => process.exit(0));
        }
        let packagejson;
        try {
            packagejson = JSON.parse(await fsutil_1.fsutil.readFile("./package-lock.json"));
        }
        catch (err) {
            screen.destroy();
            screen = null;
            console.error(err.message);
            return;
        }
        const deps = packagejson.dependencies || {};
        const plugin = await searchAndSelect(["@bdsx/"], deps);
        const topbox = blessed.box({
            border: "line",
            width: "100%",
            height: 3,
            content: plugin.name,
        });
        screen.append(topbox);
        screen.render();
        const versions = await loadingWrap("Loading...", plugin.getVersions());
        const version = await selectVersion(plugin.name, plugin.version, plugin.installed, versions);
        topbox.destroy();
        if (version === null)
            continue;
        if (version === plugin.installed)
            continue;
        screen.destroy();
        screen = null;
        if (version === "") {
            child_process.execSync(`npm r ${plugin.name}`, {
                stdio: "inherit",
            });
        }
        else {
            child_process.execSync(`npm i ${plugin.name}@${version}`, {
                stdio: "inherit",
            });
        }
        await (0, util_1.timeout)(2000);
    }
})().catch(err => console.error(err.stack));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFtQztBQUNuQywrQ0FBK0M7QUFDL0MsOERBQTBEO0FBQzFELHNDQUFtQztBQUNuQyxrQ0FBa0M7QUFFbEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxHQUFHLENBQWlCLHNDQUFpQixDQUFDLENBQUM7QUFFL0QsTUFBTSxxQkFBcUIsR0FBRztJQUMxQixFQUFFLEVBQUUsU0FBUztJQUNiLFFBQVEsRUFBRTtRQUNOLEVBQUUsRUFBRSxNQUFNO0tBQ2I7Q0FDSixDQUFDO0FBMEJGLFNBQVMsSUFBSSxDQUFDLE9BQWU7SUFDekIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNuQyxhQUFhLENBQUMsSUFBSSxDQUNkLE9BQU8sRUFDUDtZQUNJLFFBQVEsRUFBRSxPQUFPO1NBQ3BCLEVBQ0QsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDWixJQUFJLEdBQUcsRUFBRTtnQkFDTCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDZjtpQkFBTTtnQkFDSCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDbkI7UUFDTCxDQUFDLENBQ0osQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELFNBQVMsZ0JBQWdCLENBQUMsT0FBZTtJQUNyQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLGFBQWEsQ0FBQyxJQUFJLENBQ2QsT0FBTyxFQUNQO1lBQ0ksUUFBUSxFQUFFLE9BQU87U0FDcEIsRUFDRCxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNaLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQ0osQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVE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