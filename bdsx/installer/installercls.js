"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstallItem = exports.BDSInstaller = void 0;
const colors = require("colors");
const follow_redirects_1 = require("follow-redirects");
const fs = require("fs");
const JSZip = require("jszip");
const path = require("path");
const path_1 = require("path");
const readline = require("readline");
const unzipper = require("unzipper");
const fsutil_1 = require("../fsutil");
const progressbar_1 = require("../progressbar");
const util_1 = require("../util");
const key_1 = require("../util/key");
const installinfo_1 = require("./installinfo");
const publisher_1 = require("./publisher");
class BDSInstaller {
    constructor(bdsPath, opts) {
        this.bdsPath = bdsPath;
        this.opts = opts;
        const BDSX_YES = process.env.BDSX_YES;
        if (BDSX_YES !== undefined) {
            switch (BDSX_YES.toLowerCase()) {
                case "y":
                case "yes":
                case "true":
                    if (opts.agree === undefined)
                        opts.agree = `BDSX_YES=${BDSX_YES}`;
                    break;
                case "n":
                case "no":
                case "false":
                    if (opts.disagree === undefined)
                        opts.disagree = `BDSX_YES=${BDSX_YES}`;
                    break;
                case "skip":
                    if (opts.skip === undefined)
                        opts.skip = `BDSX_YES=${BDSX_YES}`;
                    break;
            }
            if (typeof opts.agree === "boolean")
                opts.agree = opts.agree ? "agree=true" : undefined;
            if (typeof opts.disagree === "boolean")
                opts.disagree = opts.disagree ? "disagree=true" : undefined;
            if (typeof opts.skip === "boolean")
                opts.skip = opts.skip ? "skip=true" : undefined;
        }
        this.info = new installinfo_1.InstallInfo(bdsPath);
    }
    yesno(question, defaultValue) {
        const yesValues = ["yes", "y"];
        const noValues = ["no", "n"];
        return new Promise(resolve => {
            if (this.opts.agree !== undefined) {
                console.log(`Agreed by ${this.opts.agree}`);
                return resolve(true);
            }
            if (this.opts.disagree !== undefined) {
                console.log(`Disagreed by ${this.opts.disagree}`);
                return resolve(false);
            }
            if (!process.stdin.isTTY) {
                return resolve(true);
            }
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            rl.question(`${question} `, async (answer) => {
                rl.close();
                const cleaned = answer.trim().toLowerCase();
                if (cleaned === "" && defaultValue != null)
                    return resolve(defaultValue);
                if (yesValues.indexOf(cleaned) >= 0)
                    return resolve(true);
                if (noValues.indexOf(cleaned) >= 0)
                    return resolve(false);
                console.log();
                console.log("Invalid Response.");
                console.log(`Answer either yes : (${yesValues.join(", ")})`);
                console.log(`Or no: (${noValues.join(", ")})`);
                console.log();
                resolve(this.yesno(question, defaultValue));
            });
        });
    }
    async removeInstalled(dest, files) {
        for (let i = files.length - 1; i >= 0; i--) {
            const file = files[i];
            try {
                if (file.endsWith(path_1.sep)) {
                    await fsutil_1.fsutil.rmdir(path.join(dest, file.substr(0, file.length - 1)));
                }
                else {
                    await fsutil_1.fsutil.unlink(path.join(dest, file));
                }
            }
            catch (err) {
                if (err.code !== "ENOENT") {
                    console.error(`Failed to remove ${file}, ${err.message}`);
                }
            }
        }
    }
    async gitPublish(item, files, basePath, zipPath) {
        function resolve(filePath) {
            if (basePath === undefined)
                return filePath;
            if (path.isAbsolute(filePath))
                return filePath;
            else
                return path.join(basePath, filePath);
        }
        const githubToken = await key_1.key.getGithubToken();
        if (githubToken === undefined)
            return;
        if (item.version === undefined)
            throw Error(`${item.name} version is not defined`);
        let publishName;
        if (!(files instanceof Array)) {
            if (zipPath !== undefined) {
                publishName = zipPath;
            }
            else {
                publishName = files;
            }
            files = [files];
        }
        else if (zipPath !== undefined) {
            publishName = zipPath;
        }
        else {
            throw TypeError("Invalid usage");
        }
        // zip file
        if (zipPath !== undefined) {
            publishName = zipPath;
            const zip = new JSZip();
            for (const file of files) {
                zip.file(file, await fsutil_1.fsutil.readFile(resolve(file), null));
            }
            await fsutil_1.fsutil.writeStream(resolve(zipPath), zip.generateNodeStream({
                compression: "DEFLATE",
            }));
        }
        // create release
        console.error(colors.yellow(`publish ${path.basename(publishName)}`));
        const client = new publisher_1.GitHubClient(githubToken);
        const release = await client.createRelease(`${item.name} ${item.version}`, "bdsx", item.name, item.version);
        try {
            await release.upload(resolve(publishName));
        }
        catch (err) {
            await release.delete();
            throw err;
        }
    }
}
exports.BDSInstaller = BDSInstaller;
class InstallItem {
    constructor(opts) {
        this.opts = opts;
    }
    async _downloadAndUnzip(installer) {
        const dest = installer.target;
        const url = this.opts.url;
        const writedFiles = [];
        let writingProm = Promise.resolve();
        progressbar_1.progressBar.start(`${this.opts.name}: Install`, {
            total: 1,
            width: 20,
        });
        const dirhas = new Set();
        dirhas.add(dest);
        await new Promise((resolve, reject) => {
            follow_redirects_1.https
                .get(url, response => {
                progressbar_1.progressBar.setTotal(+response.headers["content-length"]);
                if (response.statusCode !== 200) {
                    (async () => {
                        if (this.opts.fallback != null) {
                            const res = await this.opts.fallback(installer, response.statusCode);
                            if (res === false) {
                                resolve();
                            }
                        }
                        reject(new InstallItem.Report(`${this.opts.name}: ${response.statusCode} ${response.statusMessage}, Failed to download ${url}`));
                    })().catch(reject);
                    return;
                }
                response.on("data", (data) => {
                    progressbar_1.progressBar.tick(data.length);
                });
                const mergeMap = this.opts.merge !== undefined ? new Map(this.opts.merge) : null;
                const zip = response.pipe(unzipper.Parse());
                zip.on("entry", async (entry) => {
                    let filepath = entry.path;
                    if (path_1.sep !== "/")
                        filepath = filepath.replace(/\//g, path_1.sep);
                    else
                        filepath = filepath.replace(/\\/g, path_1.sep);
                    if (filepath.startsWith(path_1.sep)) {
                        filepath = filepath.substr(1);
                    }
                    writedFiles.push(filepath);
                    const extractPath = path.join(dest, filepath);
                    if (entry.type === "Directory") {
                        await fsutil_1.fsutil.mkdirRecursive(extractPath, dirhas);
                        entry.autodrain();
                        return;
                    }
                    if (mergeMap !== null) {
                        const merge = mergeMap.get(filepath);
                        if (merge !== undefined) {
                            const prom = Promise.all([fsutil_1.fsutil.readFile(extractPath).catch(() => null), entry.buffer()]).then(([oldprop, newprop]) => {
                                let result;
                                if (oldprop !== null) {
                                    (0, util_1.printOnProgress)(`Merge ${filepath}`);
                                    result = merge(oldprop, newprop.toString("utf8"));
                                }
                                else {
                                    result = newprop;
                                }
                                return fsutil_1.fsutil.writeFile(extractPath, result);
                            });
                            writingProm = writingProm.then(() => prom);
                            return;
                        }
                    }
                    if (this.opts.skipExists) {
                        const exists = await fsutil_1.fsutil.exists(extractPath);
                        if (exists) {
                            (0, util_1.printOnProgress)(`Keep ${filepath}`);
                            entry.autodrain();
                            return;
                        }
                    }
                    await fsutil_1.fsutil.mkdirRecursive(path.dirname(extractPath), dirhas);
                    entry.pipe(fs.createWriteStream(extractPath)).on("error", reject);
                })
                    .on("finish", () => {
                    writingProm.then(() => {
                        resolve();
                        progressbar_1.progressBar.finish();
                    });
                })
                    .on("error", reject);
            })
                .on("error", reject);
        });
        return writedFiles;
    }
    async _install(installer) {
        const oldFiles = this.opts.oldFiles;
        if (oldFiles != null) {
            for (const oldfile of oldFiles) {
                try {
                    await fsutil_1.fsutil.del(path.join(installer.target, oldfile));
                }
                catch (err) { }
            }
        }
        await fsutil_1.fsutil.mkdir(installer.target);
        const preinstall = this.opts.preinstall;
        if (preinstall)
            await preinstall(installer);
        const writedFiles = await this._downloadAndUnzip(installer);
        if (this.opts.key != null) {
            installer.info[this.opts.key] = this.opts.version;
        }
        const postinstall = this.opts.postinstall;
        if (postinstall)
            await postinstall(installer, writedFiles);
    }
    async _confirmAndInstall(installer) {
        const confirm = this.opts.confirm;
        if (confirm != null)
            await confirm(installer);
        await this._install(installer);
        console.log(`${this.opts.name}: Installed successfully`);
    }
    async install(installer) {
        installer.target = path.join(installer.bdsPath, this.opts.targetPath);
        const name = this.opts.name;
        const key = this.opts.key;
        if (key == null || this.opts.version == null) {
            await this._install(installer);
            return;
        }
        const keyFile = this.opts.keyFile;
        const keyExists = keyFile != null && (await fsutil_1.fsutil.exists(path.join(installer.target, keyFile)));
        const keyNotFound = keyFile != null && !keyExists;
        const version = installer.info[key];
        if (version === undefined) {
            if (keyExists) {
                if (await installer.yesno(`${name}: Would you like to use what already installed?`)) {
                    installer.info[key] = "manual";
                    console.log(`${name}: manual`);
                    return;
                }
            }
            await this._confirmAndInstall(installer);
        }
        else {
            if (keyNotFound) {
                console.log(colors.yellow(`${name}: ${keyFile} not found`));
                await this._confirmAndInstall(installer);
            }
            else {
                if (version === null || version === "manual") {
                    console.log(`${name}: manual`);
                }
                else if (version === this.opts.version) {
                    console.log(`${name}: ${this.opts.version}`);
                }
                else {
                    console.log(`${name}: Old (${version})`);
                    console.log(`${name}: New (${this.opts.version})`);
                    await this._install(installer);
                    console.log(`${name}: Updated`);
                }
            }
        }
    }
}
exports.InstallItem = InstallItem;
(function (InstallItem) {
    class Report extends Error {
    }
    InstallItem.Report = Report;
})(InstallItem = exports.InstallItem || (exports.InstallItem = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFsbGVyY2xzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5zdGFsbGVyY2xzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUFpQztBQUNqQyx1REFBeUM7QUFDekMseUJBQXlCO0FBQ3pCLCtCQUErQjtBQUMvQiw2QkFBNkI7QUFDN0IsK0JBQTJCO0FBQzNCLHFDQUFxQztBQUNyQyxxQ0FBcUM7QUFDckMsc0NBQW1DO0FBQ25DLGdEQUE2QztBQUM3QyxrQ0FBMEM7QUFDMUMscUNBQWtDO0FBQ2xDLCtDQUE0QztBQUM1QywyQ0FBMkM7QUFFM0MsTUFBYSxZQUFZO0lBSXJCLFlBQTRCLE9BQWUsRUFBa0IsSUFBMEI7UUFBM0QsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFrQixTQUFJLEdBQUosSUFBSSxDQUFzQjtRQUNuRixNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUN0QyxJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDeEIsUUFBUSxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQzVCLEtBQUssR0FBRyxDQUFDO2dCQUNULEtBQUssS0FBSyxDQUFDO2dCQUNYLEtBQUssTUFBTTtvQkFDUCxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUzt3QkFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLFlBQVksUUFBUSxFQUFFLENBQUM7b0JBQ2xFLE1BQU07Z0JBQ1YsS0FBSyxHQUFHLENBQUM7Z0JBQ1QsS0FBSyxJQUFJLENBQUM7Z0JBQ1YsS0FBSyxPQUFPO29CQUNSLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTO3dCQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsWUFBWSxRQUFRLEVBQUUsQ0FBQztvQkFDeEUsTUFBTTtnQkFDVixLQUFLLE1BQU07b0JBQ1AsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVM7d0JBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxZQUFZLFFBQVEsRUFBRSxDQUFDO29CQUNoRSxNQUFNO2FBQ2I7WUFDRCxJQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTO2dCQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDeEYsSUFBSSxPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUztnQkFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ3BHLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVM7Z0JBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztTQUN2RjtRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSx5QkFBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxLQUFLLENBQUMsUUFBZ0IsRUFBRSxZQUFzQjtRQUMxQyxNQUFNLFNBQVMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvQixNQUFNLFFBQVEsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUU3QixPQUFPLElBQUksT0FBTyxDQUFVLE9BQU8sQ0FBQyxFQUFFO1lBQ2xDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO2dCQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUM1QyxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN4QjtZQUNELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO2dCQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ2xELE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pCO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUN0QixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN4QjtZQUVELE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUM7Z0JBQ2hDLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSztnQkFDcEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO2FBQ3pCLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxRQUFRLEdBQUcsRUFBRSxLQUFLLEVBQUMsTUFBTSxFQUFDLEVBQUU7Z0JBQ3ZDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFFWCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzVDLElBQUksT0FBTyxLQUFLLEVBQUUsSUFBSSxZQUFZLElBQUksSUFBSTtvQkFBRSxPQUFPLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFFekUsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQUUsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRTFELElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUFFLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUUxRCxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDN0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMvQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ2QsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDaEQsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxLQUFLLENBQUMsZUFBZSxDQUFDLElBQVksRUFBRSxLQUFlO1FBQy9DLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4QyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSTtnQkFDQSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBRyxDQUFDLEVBQUU7b0JBQ3BCLE1BQU0sZUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDeEU7cUJBQU07b0JBQ0gsTUFBTSxlQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQzlDO2FBQ0o7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDVixJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO29CQUN2QixPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixJQUFJLEtBQUssR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7aUJBQzdEO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsVUFBVSxDQUFDLElBQXlCLEVBQUUsS0FBd0IsRUFBRSxRQUFpQixFQUFFLE9BQWdCO1FBQ3JHLFNBQVMsT0FBTyxDQUFDLFFBQWdCO1lBQzdCLElBQUksUUFBUSxLQUFLLFNBQVM7Z0JBQUUsT0FBTyxRQUFRLENBQUM7WUFDNUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztnQkFBRSxPQUFPLFFBQVEsQ0FBQzs7Z0JBQzFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQUVELE1BQU0sV0FBVyxHQUFHLE1BQU0sU0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQy9DLElBQUksV0FBVyxLQUFLLFNBQVM7WUFBRSxPQUFPO1FBQ3RDLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxTQUFTO1lBQUUsTUFBTSxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSx5QkFBeUIsQ0FBQyxDQUFDO1FBRW5GLElBQUksV0FBbUIsQ0FBQztRQUN4QixJQUFJLENBQUMsQ0FBQyxLQUFLLFlBQVksS0FBSyxDQUFDLEVBQUU7WUFDM0IsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO2dCQUN2QixXQUFXLEdBQUcsT0FBTyxDQUFDO2FBQ3pCO2lCQUFNO2dCQUNILFdBQVcsR0FBRyxLQUFLLENBQUM7YUFDdkI7WUFDRCxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQjthQUFNLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUM5QixXQUFXLEdBQUcsT0FBTyxDQUFDO1NBQ3pCO2FBQU07WUFDSCxNQUFNLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUNwQztRQUVELFdBQVc7UUFDWCxJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7WUFDdkIsV0FBVyxHQUFHLE9BQU8sQ0FBQztZQUN0QixNQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ3hCLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFO2dCQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLGVBQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDOUQ7WUFDRCxNQUFNLGVBQU0sQ0FBQyxXQUFXLENBQ3BCLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFDaEIsR0FBRyxDQUFDLGtCQUFrQixDQUFDO2dCQUNuQixXQUFXLEVBQUUsU0FBUzthQUN6QixDQUFDLENBQ0wsQ0FBQztTQUNMO1FBRUQsaUJBQWlCO1FBQ2pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEUsTUFBTSxNQUFNLEdBQUcsSUFBSSx3QkFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sT0FBTyxHQUFHLE1BQU0sTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1RyxJQUFJO1lBQ0EsTUFBTSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1NBQzlDO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDVixNQUFNLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN2QixNQUFNLEdBQUcsQ0FBQztTQUNiO0lBQ0wsQ0FBQztDQUNKO0FBM0lELG9DQTJJQztBQVVELE1BQWEsV0FBVztJQUNwQixZQUE0QixJQUF5QjtRQUF6QixTQUFJLEdBQUosSUFBSSxDQUFxQjtJQUFHLENBQUM7SUFFakQsS0FBSyxDQUFDLGlCQUFpQixDQUFDLFNBQXVCO1FBQ25ELE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7UUFDOUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDMUIsTUFBTSxXQUFXLEdBQWEsRUFBRSxDQUFDO1FBQ2pDLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUVwQyx5QkFBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxXQUFXLEVBQUU7WUFDNUMsS0FBSyxFQUFFLENBQUM7WUFDUixLQUFLLEVBQUUsRUFBRTtTQUNaLENBQUMsQ0FBQztRQUVILE1BQU0sTUFBTSxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7UUFDakMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVqQixNQUFNLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3hDLHdCQUFLO2lCQUNBLEdBQUcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEVBQUU7Z0JBQ2pCLHlCQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBRSxDQUFDLENBQUM7Z0JBQzNELElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxHQUFHLEVBQUU7b0JBQzdCLENBQUMsS0FBSyxJQUFJLEVBQUU7d0JBQ1IsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUU7NEJBQzVCLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxVQUFXLENBQUMsQ0FBQzs0QkFDdEUsSUFBSSxHQUFHLEtBQUssS0FBSyxFQUFFO2dDQUNmLE9BQU8sRUFBRSxDQUFDOzZCQUNiO3lCQUNKO3dCQUNELE1BQU0sQ0FBQyxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsVUFBVSxJQUFJLFFBQVEsQ0FBQyxhQUFhLHdCQUF3QixHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3JJLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNuQixPQUFPO2lCQUNWO2dCQUNELFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBWSxFQUFFLEVBQUU7b0JBQ2pDLHlCQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbEMsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBRWpGLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQzVDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFxQixFQUFFLEVBQUU7b0JBQzVDLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQzFCLElBQUksVUFBRyxLQUFLLEdBQUc7d0JBQUUsUUFBUSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFVBQUcsQ0FBQyxDQUFDOzt3QkFDcEQsUUFBUSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFVBQUcsQ0FBQyxDQUFDO29CQUM3QyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsVUFBRyxDQUFDLEVBQUU7d0JBQzFCLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNqQztvQkFDRCxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUUzQixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDOUMsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBRTt3QkFDNUIsTUFBTSxlQUFNLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDakQsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO3dCQUNsQixPQUFPO3FCQUNWO29CQUVELElBQUksUUFBUSxLQUFLLElBQUksRUFBRTt3QkFDbkIsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDckMsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFOzRCQUNyQixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsZUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFO2dDQUNuSCxJQUFJLE1BQXVCLENBQUM7Z0NBQzVCLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtvQ0FDbEIsSUFBQSxzQkFBZSxFQUFDLFNBQVMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQ0FDckMsTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2lDQUNyRDtxQ0FBTTtvQ0FDSCxNQUFNLEdBQUcsT0FBTyxDQUFDO2lDQUNwQjtnQ0FDRCxPQUFPLGVBQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDOzRCQUNqRCxDQUFDLENBQUMsQ0FBQzs0QkFDSCxXQUFXLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDM0MsT0FBTzt5QkFDVjtxQkFDSjtvQkFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO3dCQUN0QixNQUFNLE1BQU0sR0FBRyxNQUFNLGVBQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQ2hELElBQUksTUFBTSxFQUFFOzRCQUNSLElBQUEsc0JBQWUsRUFBQyxRQUFRLFFBQVEsRUFBRSxDQUFDLENBQUM7NEJBQ3BDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQzs0QkFDbEIsT0FBTzt5QkFDVjtxQkFDSjtvQkFFRCxNQUFNLGVBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDL0QsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUN0RSxDQUFDLENBQUM7cUJBQ0csRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7b0JBQ2YsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7d0JBQ2xCLE9BQU8sRUFBRSxDQUFDO3dCQUNWLHlCQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ3pCLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQztxQkFDRCxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzdCLENBQUMsQ0FBQztpQkFDRCxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQUVPLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBdUI7UUFDMUMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDcEMsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO1lBQ2xCLEtBQUssTUFBTSxPQUFPLElBQUksUUFBUSxFQUFFO2dCQUM1QixJQUFJO29CQUNBLE1BQU0sZUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztpQkFDMUQ7Z0JBQUMsT0FBTyxHQUFHLEVBQUUsR0FBRTthQUNuQjtTQUNKO1FBQ0QsTUFBTSxlQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN4QyxJQUFJLFVBQVU7WUFBRSxNQUFNLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QyxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1RCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRTtZQUN2QixTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFjLENBQUM7U0FDNUQ7UUFFRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUMxQyxJQUFJLFdBQVc7WUFBRSxNQUFNLFdBQVcsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVPLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxTQUF1QjtRQUNwRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNsQyxJQUFJLE9BQU8sSUFBSSxJQUFJO1lBQUUsTUFBTSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUMsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksMEJBQTBCLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUF1QjtRQUNqQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXRFLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzVCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQzFCLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7WUFDMUMsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQy9CLE9BQU87U0FDVjtRQUNELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2xDLE1BQU0sU0FBUyxHQUFHLE9BQU8sSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLGVBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRyxNQUFNLFdBQVcsR0FBRyxPQUFPLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2xELE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQ3ZCLElBQUksU0FBUyxFQUFFO2dCQUNYLElBQUksTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxpREFBaUQsQ0FBQyxFQUFFO29CQUNqRixTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQWUsQ0FBQztvQkFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksVUFBVSxDQUFDLENBQUM7b0JBQy9CLE9BQU87aUJBQ1Y7YUFDSjtZQUNELE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzVDO2FBQU07WUFDSCxJQUFJLFdBQVcsRUFBRTtnQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLEtBQUssT0FBTyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUM1RCxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUM1QztpQkFBTTtnQkFDSCxJQUFJLE9BQU8sS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLFFBQVEsRUFBRTtvQkFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksVUFBVSxDQUFDLENBQUM7aUJBQ2xDO3FCQUFNLElBQUksT0FBTyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO29CQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztpQkFDaEQ7cUJBQU07b0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksVUFBVSxPQUFPLEdBQUcsQ0FBQyxDQUFDO29CQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztvQkFDbkQsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxXQUFXLENBQUMsQ0FBQztpQkFDbkM7YUFDSjtTQUNKO0lBQ0wsQ0FBQztDQUNKO0FBdktELGtDQXVLQztBQUVELFdBQWlCLFdBQVc7SUFnQnhCLE1BQWEsTUFBTyxTQUFRLEtBQUs7S0FBRztJQUF2QixrQkFBTSxTQUFpQixDQUFBO0FBQ3hDLENBQUMsRUFqQmdCLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBaUIzQiJ9