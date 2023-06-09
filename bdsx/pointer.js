"use strict";
var CxxStringWrapper_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CxxStringWrapper = exports.Wrapper = void 0;
const tslib_1 = require("tslib");
const util = require("util");
const circulardetector_1 = require("./circulardetector");
const common_1 = require("./common");
const msalloc_1 = require("./msalloc");
const nativeclass_1 = require("./nativeclass");
const nativetype_1 = require("./nativetype");
const singleton_1 = require("./singleton");
class Wrapper extends nativeclass_1.NativeClass {
    static create(value) {
        const out = new this(true);
        out.value = value;
        return out;
    }
    static make(type) {
        return singleton_1.Singleton.newInstance(Wrapper, type, () => {
            class TypedWrapper extends Wrapper {
                static constructWith(v) {
                    const wrapper = TypedWrapper.construct();
                    wrapper.value = v;
                    return wrapper;
                }
            }
            Object.defineProperty(TypedWrapper, "name", { value: type.name });
            TypedWrapper.prototype.type = type;
            TypedWrapper.define({ value: type });
            return TypedWrapper;
        });
    }
    static [nativetype_1.NativeType.descriptor](builder, key, info) {
        const { offset } = info;
        const type = this;
        builder.desc[key] = {
            configurable: true,
            get() {
                const value = this.getPointerAs(type, offset);
                Object.defineProperty(this, key, { value });
                return value;
            },
        };
    }
}
exports.Wrapper = Wrapper;
let CxxStringWrapper = CxxStringWrapper_1 = class CxxStringWrapper extends nativeclass_1.NativeClass {
    [nativetype_1.NativeType.ctor]() {
        (0, common_1.abstract)();
    }
    [nativetype_1.NativeType.dtor]() {
        (0, common_1.abstract)();
    }
    [nativetype_1.NativeType.ctor_copy](other) {
        (0, common_1.abstract)();
    }
    get value() {
        return this.getCxxString();
    }
    set value(str) {
        this.setCxxString(str);
    }
    get valueptr() {
        if (this.capacity >= 0x10)
            return this.getPointer();
        else
            return this.add();
    }
    valueAs(encoding) {
        return this.getCxxString(0, encoding);
    }
    reserve(nsize) {
        const capacity = this.capacity;
        if (nsize > capacity) {
            const orivalue = this.valueptr;
            this.capacity = nsize;
            const dest = msalloc_1.msAlloc.allocate(nsize + 1);
            dest.copyFrom(orivalue, this.length);
            if (capacity >= 0x10)
                msalloc_1.msAlloc.deallocate(orivalue, capacity);
            this.setPointer(dest);
            if (dest === null) {
                this.setString("[out of memory]\0");
                this.capacity = 15;
                this.length = 15;
                return;
            }
        }
    }
    resize(nsize) {
        this.reserve(nsize);
        this.length = nsize;
    }
    static constructWith(str) {
        const v = CxxStringWrapper_1.construct();
        v.value = str;
        return v;
    }
    [util.inspect.custom](depth, options) {
        const obj = new (circulardetector_1.CircularDetector.makeTemporalClass(this.constructor.name, this, options))();
        obj.value = this.value;
        return obj;
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int64_as_float_t, 0x10)
], CxxStringWrapper.prototype, "length", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int64_as_float_t, 0x18)
], CxxStringWrapper.prototype, "capacity", void 0);
CxxStringWrapper = CxxStringWrapper_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], CxxStringWrapper);
exports.CxxStringWrapper = CxxStringWrapper;
CxxStringWrapper.prototype[nativetype_1.NativeType.ctor] = function () {
    return nativetype_1.CxxString[nativetype_1.NativeType.ctor](this);
};
CxxStringWrapper.prototype[nativetype_1.NativeType.dtor] = function () {
    return nativetype_1.CxxString[nativetype_1.NativeType.dtor](this);
};
CxxStringWrapper.prototype[nativetype_1.NativeType.ctor_copy] = function (other) {
    return nativetype_1.CxxString[nativetype_1.NativeType.ctor_copy](this, other);
};
CxxStringWrapper.prototype[nativetype_1.NativeType.ctor_move] = function (other) {
    return nativetype_1.CxxString[nativetype_1.NativeType.ctor_move](this, other);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pbnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvaW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw2QkFBNkI7QUFDN0IseURBQXNEO0FBQ3RELHFDQUFnRTtBQUVoRSx1Q0FBb0M7QUFDcEMsK0NBQXVGO0FBQ3ZGLDZDQUFzRztBQUN0RywyQ0FBd0M7QUFPeEMsTUFBc0IsT0FBVyxTQUFRLHlCQUFXO0lBSWhELE1BQU0sQ0FBQyxNQUFNLENBQTJDLEtBQVE7UUFDNUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsR0FBRyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbEIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBSSxJQUFtQztRQUM5QyxPQUFPLHFCQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFO1lBQzdDLE1BQU0sWUFBYSxTQUFRLE9BQVU7Z0JBR2pDLE1BQU0sQ0FBQyxhQUFhLENBQTZDLENBQUs7b0JBQ2xFLE1BQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDekMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7b0JBQ2xCLE9BQU8sT0FBYyxDQUFDO2dCQUMxQixDQUFDO2FBQ0o7WUFDRCxNQUFNLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDbEUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBVyxDQUFDO1lBQzFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBVyxFQUFFLENBQUMsQ0FBQztZQUM1QyxPQUFPLFlBQVksQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxN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