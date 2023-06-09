"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shellPrepareData = void 0;
const fs = require("fs");
const path = require("path");
const config_1 = require("../config");
exports.shellPrepareData = {
    path: path.join(config_1.Config.BDS_PATH, "bdsx_shell_data.ini"),
    load() {
        const data = Object.create(null);
        try {
            const lines = fs.readFileSync(exports.shellPrepareData.path, "utf8");
            let matched;
            const matcher = /^[ \t]*([^\s=]+)[ \t]*=[ \t]*([^\s]+)[ \t]*$/gm;
            while ((matched = matcher.exec(lines)) !== null) {
                data[matched[1]] = matched[2];
            }
        }
        catch (err) { }
        return data;
    },
    save(data) {
        let out = "";
        for (const name in data) {
            out += name;
            out += "=";
            out += data[name];
            out += "\n";
        }
        fs.writeFileSync(exports.shellPrepareData.path, out, "utf8");
    },
    clear() {
        try {
            fs.unlinkSync(exports.shellPrepareData.path);
        }
        catch (err) { }
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QixzQ0FBbUM7QUFFdEIsUUFBQSxnQkFBZ0IsR0FBRztJQUM1QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFNLENBQUMsUUFBUSxFQUFFLHFCQUFxQixDQUFDO0lBQ3ZELElBQUk7UUFDQSxNQUFNLElBQUksR0FBMkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6RCxJQUFJO1lBQ0EsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyx3QkFBZ0IsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDN0QsSUFBSSxPQUErQixDQUFDO1lBQ3BDLE1BQU0sT0FBTyxHQUFHLGdEQUFnRCxDQUFDO1lBQ2pFLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqQztTQUNKO1FBQUMsT0FBTyxHQUFHLEVBQUUsR0FBRTtRQUNoQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0QsSUFBSSxDQUFDLElBQTRCO1FBQzdCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxFQUFFO1lBQ3JCLEdBQUcsSUFBSSxJQUFJLENBQUM7WUFDWixHQUFHLElBQUksR0FBRyxDQUFDO1lBQ1gsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixHQUFHLElBQUksSUFBSSxDQUFDO1NBQ2Y7UUFDRCxFQUFFLENBQUMsYUFBYSxDQUFDLHdCQUFnQixDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUNELEtBQUs7UUFDRCxJQUFJO1lBQ0EsRUFBRSxDQUFDLFVBQVUsQ0FBQyx3QkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4QztRQUFDLE9BQU8sR0FBRyxFQUFFLEdBQUU7SUFDcEIsQ0FBQztDQUNKLENBQUMifQ==