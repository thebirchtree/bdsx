"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fsutil_1 = require("../fsutil");
const asm = path.join(__dirname, "./asmcode.asm");
const js = path.join(__dirname, "./asmcode.js");
if (fsutil_1.fsutil.checkModifiedSync(asm, js)) {
    require("./compile");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2thc20uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGVja2FzbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUM3QixzQ0FBbUM7QUFFbkMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFDbEQsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDaEQsSUFBSSxlQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQ25DLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztDQUN4QiJ9