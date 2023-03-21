"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstallInfo = void 0;
const fs = require("fs");
const path_1 = require("path");
const fsutil_1 = require("../fsutil");
class InstallInfo {
    constructor(bdsPath) {
        this.path = `${bdsPath}${path_1.sep}installinfo.json`;
    }
    toJSON() {
        return {
            bdsVersion: this.bdsVersion,
            bdsxCoreVersion: this.bdsxCoreVersion,
            pdbcacheVersion: this.pdbcacheVersion,
            files: this.files,
        };
    }
    _fromJSON(data) {
        if (data == null) {
            delete this.bdsVersion;
            delete this.bdsxCoreVersion;
            delete this.pdbcacheVersion;
            delete this.files;
        }
        else {
            this.bdsVersion = data.bdsVersion;
            this.bdsxCoreVersion = data.bdsxCoreVersion;
            this.pdbcacheVersion = data.pdbcacheVersion;
            this.files = data.files;
        }
    }
    async load() {
        try {
            const file = await fsutil_1.fsutil.readFile(this.path);
            const installInfo = JSON.parse(file);
            this._fromJSON(installInfo);
        }
        catch (err) {
            this._fromJSON(null);
            if (err.code !== "ENOENT")
                throw err;
        }
    }
    save() {
        return fsutil_1.fsutil.writeJson(this.path, this.toJSON());
    }
    loadSync() {
        try {
            const file = fs.readFileSync(this.path, "utf8");
            const installInfo = JSON.parse(file);
            this._fromJSON(installInfo);
        }
        catch (err) {
            this._fromJSON(null);
            if (err.code !== "ENOENT")
                throw err;
        }
    }
    saveSync() {
        fsutil_1.fsutil.writeJsonSync(this.path, this.toJSON());
    }
}
exports.InstallInfo = InstallInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFsbGluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnN0YWxsaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5QkFBeUI7QUFDekIsK0JBQTJCO0FBQzNCLHNDQUFtQztBQUVuQyxNQUFhLFdBQVc7SUFPcEIsWUFBWSxPQUFlO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxPQUFPLEdBQUcsVUFBRyxrQkFBa0IsQ0FBQztJQUNuRCxDQUFDO0lBRUQsTUFBTTtRQUNGLE9BQU87WUFDSCxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDM0IsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQ3JDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDcEIsQ0FBQztJQUNOLENBQUM7SUFFTyxTQUFTLENBQUMsSUFBUztRQUN2QixJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDZCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDdkIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBQzVCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUM1QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDckI7YUFBTTtZQUNILElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNsQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7WUFDNUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBQzVDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSTtRQUNOLElBQUk7WUFDQSxNQUFNLElBQUksR0FBRyxNQUFNLGVBQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUMvQjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQixJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssUUFBUTtnQkFBRSxNQUFNLEdBQUcsQ0FBQztTQUN4QztJQUNMLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxlQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJO1lBQ0EsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ2hELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUMvQjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQixJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssUUFBUTtnQkFBRSxNQUFNLEdBQUcsQ0FBQztTQUN4QztJQUNMLENBQUM7SUFFRCxRQUFRO1FBQ0osZUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7Q0FDSjtBQS9ERCxrQ0ErREMifQ==