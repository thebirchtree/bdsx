"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const assembler_1 = require("../assembler");
const core_1 = require("../core");
const source_map_support_1 = require("../source-map-support");
const textparser_1 = require("../textparser");
try {
    console.log(`[bdsx-asm] start`);
    const code = (0, assembler_1.asm)();
    const asmpath = path.join(__dirname, "./asmcode.asm");
    const defines = {
        asyncSize: core_1.uv_async.sizeOfTask,
        sizeOfCxxString: 0x20,
    };
    code.compile(fs.readFileSync(asmpath, "utf8"), defines, asmpath);
    const { js, dts } = code.toScript("..", "asmcode");
    fs.writeFileSync(path.join(__dirname, "./asmcode.js"), js);
    fs.writeFileSync(path.join(__dirname, "./asmcode.d.ts"), dts);
    console.log(`[bdsx-asm] done. no errors`);
}
catch (err) {
    if (!(err instanceof textparser_1.ParsingError)) {
        (0, source_map_support_1.remapAndPrintError)(err);
    }
    else {
        console.log(`[bdsx-asm] failed`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbXBpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLDRDQUFtQztBQUNuQyxrQ0FBbUM7QUFDbkMsOERBQTJEO0FBQzNELDhDQUE2QztBQUU3QyxJQUFJO0lBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ2hDLE1BQU0sSUFBSSxHQUFHLElBQUEsZUFBRyxHQUFFLENBQUM7SUFDbkIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDdEQsTUFBTSxPQUFPLEdBQUc7UUFDWixTQUFTLEVBQUUsZUFBUSxDQUFDLFVBQVU7UUFDOUIsZUFBZSxFQUFFLElBQUk7S0FDeEIsQ0FBQztJQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pFLE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDbkQsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMzRCxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGdCQUFnQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0NBQzdDO0FBQUMsT0FBTyxHQUFHLEVBQUU7SUFDVixJQUFJLENBQUMsQ0FBQyxHQUFHLFlBQVkseUJBQVksQ0FBQyxFQUFFO1FBQ2hDLElBQUEsdUNBQWtCLEVBQUMsR0FBRyxDQUFDLENBQUM7S0FDM0I7U0FBTTtRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztLQUNwQztDQUNKIn0=