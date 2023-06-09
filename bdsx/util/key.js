"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.key = void 0;
const fsutil_1 = require("../fsutil");
const path = require("path");
var key;
(function (key) {
    async function getGithubToken() {
        let data;
        try {
            data = await fsutil_1.fsutil.readFile(path.join(fsutil_1.fsutil.projectPath, ".key/github.json"), "utf8");
        }
        catch (err) {
            return undefined;
        }
        data = JSON.parse(data);
        if (data == null)
            throw Error("token not found");
        const token = data.token;
        if (typeof token !== "string")
            throw Error("token not found");
        return token;
    }
    key.getGithubToken = getGithubToken;
})(key = exports.key || (exports.key = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsia2V5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHNDQUFtQztBQUNuQyw2QkFBNkI7QUFFN0IsSUFBaUIsR0FBRyxDQWNuQjtBQWRELFdBQWlCLEdBQUc7SUFDVCxLQUFLLFVBQVUsY0FBYztRQUNoQyxJQUFJLElBQVMsQ0FBQztRQUNkLElBQUk7WUFDQSxJQUFJLEdBQUcsTUFBTSxlQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBTSxDQUFDLFdBQVcsRUFBRSxrQkFBa0IsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzNGO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDVixPQUFPLFNBQVMsQ0FBQztTQUNwQjtRQUNELElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLElBQUksSUFBSSxJQUFJLElBQUk7WUFBRSxNQUFNLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDekIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1lBQUUsTUFBTSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUM5RCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBWnFCLGtCQUFjLGlCQVluQyxDQUFBO0FBQ0wsQ0FBQyxFQWRnQixHQUFHLEdBQUgsV0FBRyxLQUFILFdBQUcsUUFjbkIifQ==