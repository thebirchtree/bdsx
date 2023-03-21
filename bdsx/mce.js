"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mce = void 0;
const tslib_1 = require("tslib");
const bin_1 = require("./bin");
const capi_1 = require("./capi");
const common_1 = require("./common");
const core_1 = require("./core");
const nativeclass_1 = require("./nativeclass");
const nativetype_1 = require("./nativetype");
const pointer_1 = require("./pointer");
const prochacker_1 = require("./prochacker");
var mce;
(function (mce) {
    mce.UUID = nativetype_1.bin128_t.extends({
        v1(uuid) {
            return uuid.charCodeAt(0) | (uuid.charCodeAt(1) << 16);
        },
        v2(uuid) {
            return uuid.charCodeAt(2);
        },
        v3(uuid) {
            return uuid.charCodeAt(3);
        },
        v4(uuid) {
            return uuid.substr(4);
        },
        generate() {
            return generateUUID().value;
        },
        toString(uuid) {
            const hex = bin_1.bin.reversedHex(uuid);
            const u4 = hex.substr(0, 4);
            const u5 = hex.substr(4, 12);
            const u1 = hex.substr(16, 8);
            const u2 = hex.substr(24, 4);
            const u3 = hex.substr(28, 4);
            return `${u1}-${u2}-${u3}-${u4}-${u5}`;
        },
    }, "UUID");
    mce.UUIDWrapper = pointer_1.Wrapper.make(mce.UUID);
    let Color = class Color extends nativeclass_1.NativeStruct {
    };
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
    ], Color.prototype, "r", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
    ], Color.prototype, "g", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
    ], Color.prototype, "b", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
    ], Color.prototype, "a", void 0);
    Color = tslib_1.__decorate([
        (0, nativeclass_1.nativeClass)()
    ], Color);
    mce.Color = Color;
    // I don't think there are any circumstances you would need to construct or destruct this
    // You would construct a SerializedSkin instance instead.
    let Blob = class Blob extends nativeclass_1.AbstractClass {
        [nativetype_1.NativeType.ctor]() {
            (0, common_1.abstract)();
        }
        [nativetype_1.NativeType.dtor]() {
            (0, common_1.abstract)();
        }
        toArray() {
            const bytes = [];
            const size = this.size;
            const ptr = this.getPointer(8); // get as NativePointer
            for (let i = 0; i < size; i++) {
                bytes.push(ptr.readUint8());
            }
            return bytes;
        }
        setFromArray(bytes) {
            this.destruct(); // it uses the deleter to deleting bytes
            this.construct(); // it initializes with the default deleter
            const size = bytes.length;
            this.size = size;
            const ptr = capi_1.capi.malloc(size);
            this.bytes = ptr; // the pointer will be copied because it's the primitive type in the C level
            for (const n of bytes) {
                ptr.writeUint8(n);
            }
        }
        toBuffer() {
            return this.bytes.getBuffer(this.size);
        }
        setFromBuffer(bytes) {
            capi_1.capi.free(this.bytes);
            this.size = bytes.length;
            const ptr = capi_1.capi.malloc(bytes.length);
            this.bytes = ptr;
            ptr.setBuffer(bytes);
        }
    };
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(core_1.VoidPointer)
    ], Blob.prototype, "deleter", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(core_1.StaticPointer)
    ], Blob.prototype, "bytes", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.uint64_as_float_t)
    ], Blob.prototype, "size", void 0);
    Blob = tslib_1.__decorate([
        (0, nativeclass_1.nativeClass)()
    ], Blob);
    mce.Blob = Blob;
    let ImageFormat;
    (function (ImageFormat) {
        ImageFormat[ImageFormat["Unknown"] = 0] = "Unknown";
        ImageFormat[ImageFormat["RGB8Unorm"] = 1] = "RGB8Unorm";
        ImageFormat[ImageFormat["RGBA8Unorm"] = 2] = "RGBA8Unorm";
    })(ImageFormat = mce.ImageFormat || (mce.ImageFormat = {}));
    let ImageUsage;
    (function (ImageUsage) {
        ImageUsage[ImageUsage["Unknown"] = 0] = "Unknown";
        ImageUsage[ImageUsage["sRGB"] = 1] = "sRGB";
        ImageUsage[ImageUsage["Data"] = 2] = "Data";
    })(ImageUsage = mce.ImageUsage || (mce.ImageUsage = {}));
    let Image = class Image extends nativeclass_1.NativeClass {
    };
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
    ], Image.prototype, "imageFormat", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
    ], Image.prototype, "width", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
    ], Image.prototype, "height", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
    ], Image.prototype, "usage", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(mce.Blob, 0x10)
    ], Image.prototype, "blob", void 0);
    Image = tslib_1.__decorate([
        (0, nativeclass_1.nativeClass)()
    ], Image);
    mce.Image = Image;
})(mce = exports.mce || (exports.mce = {}));
mce.Blob.prototype[nativetype_1.NativeType.ctor] = prochacker_1.procHacker.js("??0Blob@mce@@QEAA@XZ", nativetype_1.void_t, { this: mce.Blob });
mce.Blob.prototype[nativetype_1.NativeType.dtor] = prochacker_1.procHacker.js("??1Blob@mce@@QEAA@XZ", nativetype_1.void_t, { this: mce.Blob });
const generateUUID = prochacker_1.procHacker.js("?generateUUID@Random@Crypto@@YA?AVUUID@mce@@XZ", mce.UUIDWrapper, { structureReturn: true });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwrQkFBNEI7QUFDNUIsaUNBQThCO0FBQzlCLHFDQUFvQztBQUNwQyxpQ0FBb0Q7QUFDcEQsK0NBQW1HO0FBQ25HLDZDQUFnSTtBQUNoSSx1Q0FBb0M7QUFDcEMsNkNBQTBDO0FBRTFDLElBQWlCLEdBQUcsQ0E2SG5CO0FBN0hELFdBQWlCLEdBQUc7SUFDSCxRQUFJLEdBQUcscUJBQVEsQ0FBQyxPQUFPLENBQ2hDO1FBQ0ksRUFBRSxDQUFDLElBQVU7WUFDVCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFDRCxFQUFFLENBQUMsSUFBVTtZQUNULE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBQ0QsRUFBRSxDQUFDLElBQVU7WUFDVCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUNELEVBQUUsQ0FBQyxJQUFVO1lBQ1QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLENBQUM7UUFDRCxRQUFRO1lBQ0osT0FBTyxZQUFZLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDaEMsQ0FBQztRQUNELFFBQVEsQ0FBQyxJQUFVO1lBQ2YsTUFBTSxHQUFHLEdBQUcsU0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1QixNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUU3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