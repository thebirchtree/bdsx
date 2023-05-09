"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const assembler_1 = require("../assembler");
const core_1 = require("../core");
const source_map_support_1 = require("../source-map-support");
const textparser_1 = require("../textparser");
const const_1 = require("../const");
try {
    console.log(`[bdsx-asm] start`);
    const code = (0, assembler_1.asm)();
    const asmpath = path.join(__dirname, "./asmcode.asm");
    const defines = {
        asyncSize: core_1.uv_async.sizeOfTask,
        sizeOfCxxString: 0x20,
        PACKET_ID_COUNT: const_1.PACKET_ID_COUNT,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbXBpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLDRDQUFtQztBQUNuQyxrQ0FBbUM7QUFDbkMsOERBQTJEO0FBQzNELDhDQUE2QztBQUM3QyxvQ0FBMkM7QUFFM0MsSUFBSTtJQUNBLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNoQyxNQUFNLElBQUksR0FBRyxJQUFBLGVBQUcsR0FBRSxDQUFDO0lBQ25CLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ3RELE1BQU0sT0FBTyxHQUFHO1FBQ1osU0FBUyxFQUFFLGVBQVEsQ0FBQyxVQUFVO1FBQzlCLGVBQWUsRUFBRSxJQUFJO1FBQ3JCLGVBQWUsRUFBZix1QkFBZTtLQUNsQixDQUFDO0lBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDakUsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNuRCxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzNELEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM5RCxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7Q0FDN0M7QUFBQyxPQUFPLEdBQUcsRUFBRTtJQUNWLElBQUksQ0FBQyxDQUFDLEdBQUcsWUFBWSx5QkFBWSxDQUFDLEVBQUU7UUFDaEMsSUFBQSx1Q0FBa0IsRUFBQyxHQUFHLENBQUMsQ0FBQztLQUMzQjtTQUFNO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0tBQ3BDO0NBQ0oifQ==