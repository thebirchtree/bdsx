"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageSections = exports.ImageSections = exports.ImageSectionHeader = void 0;
const dll_1 = require("../dll");
const nativetype_1 = require("../nativetype");
const util_1 = require("../util");
const windows_h_1 = require("../windows_h");
const DOS_MAGIC = (0, util_1.makeSignature)("MZ");
const NT_MAGIC = (0, util_1.makeSignature)("PE");
class ImageSectionHeader {
    constructor(name, rva, size) {
        this.name = name;
        this.rva = rva;
        this.size = size;
    }
}
exports.ImageSectionHeader = ImageSectionHeader;
class ImageSections {
    constructor() {
        this.sections = [];
        this.module = dll_1.dll.current;
        const header = this.module.as(windows_h_1.IMAGE_DOS_HEADER);
        if (header.e_magic !== DOS_MAGIC)
            throw Error("Invalid DOS signature");
        const ntheader = header.addAs(windows_h_1.IMAGE_NT_HEADERS64, header.e_lfanew);
        if (ntheader.Signature !== NT_MAGIC)
            throw Error("Invalid NT signature");
        const count = ntheader.FileHeader.NumberOfSections;
        const sectionHeaderSize = windows_h_1.IMAGE_SECTION_HEADER[nativetype_1.NativeType.size];
        let ptr = (0, windows_h_1.IMAGE_FIRST_SECTION)(ntheader);
        for (let i = 0; i < count; i++) {
            const array = ptr.Name.toArray();
            const len = array.indexOf(0);
            if (len !== -1)
                array.length = len;
            const name = String.fromCharCode(...array);
            this.sections.push(new ImageSectionHeader(name, ptr.VirtualAddress, ptr.SizeOfRawData));
            ptr = ptr.addAs(windows_h_1.IMAGE_SECTION_HEADER, sectionHeaderSize);
        }
    }
    getSectionOfRva(rva) {
        for (const section of this.sections) {
            if (rva >= section.rva)
                continue;
            if (rva - section.rva >= section.size)
                return null;
            return section;
        }
        return null;
    }
}
exports.ImageSections = ImageSections;
exports.imageSections = new ImageSections();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VzZWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltYWdlc2VjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0NBQTZCO0FBQzdCLDhDQUEyQztBQUMzQyxrQ0FBd0M7QUFDeEMsNENBQStHO0FBRS9HLE1BQU0sU0FBUyxHQUFHLElBQUEsb0JBQWEsRUFBQyxJQUFJLENBQUMsQ0FBQztBQUN0QyxNQUFNLFFBQVEsR0FBRyxJQUFBLG9CQUFhLEVBQUMsSUFBSSxDQUFDLENBQUM7QUFFckMsTUFBYSxrQkFBa0I7SUFDM0IsWUFBNEIsSUFBWSxFQUFrQixHQUFXLEVBQWtCLElBQVk7UUFBdkUsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFrQixRQUFHLEdBQUgsR0FBRyxDQUFRO1FBQWtCLFNBQUksR0FBSixJQUFJLENBQVE7SUFBRyxDQUFDO0NBQzFHO0FBRkQsZ0RBRUM7QUFFRCxNQUFhLGFBQWE7SUFJdEI7UUFIaUIsYUFBUSxHQUF5QixFQUFFLENBQUM7UUFDckMsV0FBTSxHQUFHLFNBQUcsQ0FBQyxPQUFPLENBQUM7UUFHakMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsNEJBQWdCLENBQUMsQ0FBQztRQUNoRCxJQUFJLE1BQU0sQ0FBQyxPQUFPLEtBQUssU0FBUztZQUFFLE1BQU0sS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDdkUsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyw4QkFBa0IsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkUsSUFBSSxRQUFRLENBQUMsU0FBUyxLQUFLLFFBQVE7WUFBRSxNQUFNLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3pFLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUM7UUFDbkQsTUFBTSxpQkFBaUIsR0FBRyxnQ0FBb0IsQ0FBQyx1QkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hFLElBQUksR0FBRyxHQUFHLElBQUEsK0JBQW1CLEVBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1QixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2pDLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUFFLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBQ25DLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLGtCQUFrQixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3hGLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLGdDQUFvQixFQUFFLGlCQUFpQixDQUFDLENBQUM7U0FDNUQ7SUFDTCxDQUFDO0lBRUQsZUFBZSxDQUFDLEdBQVc7UUFDdkIsS0FBSyxNQUFNLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pDLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHO2dCQUFFLFNBQVM7WUFDakMsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSTtnQkFBRSxPQUFPLElBQUksQ0FBQztZQUNuRCxPQUFPLE9BQU8sQ0FBQztTQUNsQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FDSjtBQTlCRCxzQ0E4QkM7QUFFWSxRQUFBLGFBQWEsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDIn0=