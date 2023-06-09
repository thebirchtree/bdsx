"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gitcheck_1 = require("./gitcheck");
const installerapi_1 = require("./installerapi");
const opts = {};
const argv = process.argv;
const bdsPath = argv[2];
for (let i = 3; i < argv.length; i++) {
    const arg = argv[i];
    switch (arg) {
        case "-y":
            opts.agree = "-y";
            break;
    }
}
(async () => {
    await (0, gitcheck_1.gitCheck)();
    if (!(await (0, installerapi_1.installBDS)(bdsPath, opts)))
        process.exit(-1);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFsbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5zdGFsbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUNBQXNDO0FBQ3RDLGlEQUE0QztBQUc1QyxNQUFNLElBQUksR0FBeUIsRUFBRSxDQUFDO0FBQ3RDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7QUFDMUIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ2xDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQixRQUFRLEdBQUcsRUFBRTtRQUNULEtBQUssSUFBSTtZQUNMLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLE1BQU07S0FDYjtDQUNKO0FBRUQsQ0FBQyxLQUFLLElBQUksRUFBRTtJQUNSLE1BQU0sSUFBQSxtQkFBUSxHQUFFLENBQUM7SUFDakIsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFBLHlCQUFVLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzdELENBQUMsQ0FBQyxFQUFFLENBQUMifQ==