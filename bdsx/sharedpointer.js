"use strict";
var CxxPtrBase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CxxWeakPtr = exports.SharedPtr = exports.CxxSharedPtr = exports.SharedPtrBase = void 0;
const tslib_1 = require("tslib");
const capi_1 = require("./capi");
const common_1 = require("./common");
const core_1 = require("./core");
const makefunc_1 = require("./makefunc");
const mangle_1 = require("./mangle");
const nativeclass_1 = require("./nativeclass");
const nativetype_1 = require("./nativetype");
const singleton_1 = require("./singleton");
let CxxPtrBase = CxxPtrBase_1 = class CxxPtrBase extends nativeclass_1.NativeClass {
    [nativetype_1.NativeType.ctor]() {
        this.useRef = 1;
        this.weakRef = 1;
    }
    addRef() {
        this.interlockedIncrement32(0x8); // useRef
    }
    addRefWeak() {
        this.interlockedIncrement32(0xc); // weakRef
    }
    release() {
        if (this.interlockedDecrement32(0x8) === 0) {
            this._Destroy();
            this.releaseWeak();
        }
    }
    releaseWeak() {
        if (this.interlockedDecrement32(0xc) === 0) {
            this._DeleteThis();
        }
    }
    _DeleteThis() {
        (0, common_1.abstract)();
    }
    _Destroy() {
        (0, common_1.abstract)();
    }
    static make(type) {
        return singleton_1.Singleton.newInstance(CxxPtrBase_1, type, () => {
            class SharedPtrBaseImpl extends CxxPtrBase_1 {
            }
            SharedPtrBaseImpl.define({ value: type });
            return SharedPtrBaseImpl;
        });
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], CxxPtrBase.prototype, "vftable", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], CxxPtrBase.prototype, "useRef", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], CxxPtrBase.prototype, "weakRef", void 0);
CxxPtrBase = CxxPtrBase_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], CxxPtrBase);
CxxPtrBase.prototype._Destroy = makefunc_1.makefunc.js([0], nativetype_1.void_t, { this: CxxPtrBase });
CxxPtrBase.prototype._DeleteThis = makefunc_1.makefunc.js([8], nativetype_1.void_t, {
    this: CxxPtrBase,
});
const sizeOfSharedPtrBase = CxxPtrBase[nativetype_1.NativeType.size];
/** @deprecate Do you need to use it? */
exports.SharedPtrBase = CxxPtrBase;
/**
 * wrapper for std::shared_ptr
 */
class CxxSharedPtr extends nativeclass_1.NativeClass {
    [nativetype_1.NativeType.ctor]() {
        this.p = null;
        this.ref = null;
    }
    [nativetype_1.NativeType.dtor]() {
        const ref = this.ref;
        if (ref !== null)
            ref.release();
    }
    [nativetype_1.NativeType.ctor_copy](value) {
        this.p = value.p;
        const ref = value.ref;
        this.ref = ref;
        if (ref !== null)
            ref.addRef();
    }
    [nativetype_1.NativeType.ctor_move](value) {
        this.p = value.p;
        this.ref = value.ref;
        value.p = null;
        value.ref = null;
    }
    /**
     * @deprecated use [NativeType.ctor_move]()
     */
    ctor_move(value) {
        this[nativetype_1.NativeType.ctor_move](value);
    }
    assign(value) {
        this[nativetype_1.NativeType.dtor]();
        this[nativetype_1.NativeType.ctor_copy](value);
        return this;
    }
    assign_move(value) {
        this[nativetype_1.NativeType.dtor]();
        this[nativetype_1.NativeType.ctor_move](value);
        return this;
    }
    exists() {
        return this.ref !== null;
    }
    addRef() {
        this.ref.addRef();
    }
    assignTo(dest) {
        const ctor = this.constructor;
        const ptr = dest.as(ctor);
        ptr.assign(this);
    }
    dispose() {
        const ref = this.ref;
        if (ref !== null) {
            ref.release();
            this.ref = null;
        }
        this.p = null;
    }
    static make(cls) {
        const clazz = cls;
        return singleton_1.Singleton.newInstance(CxxSharedPtr, cls, () => {
            const Base = CxxPtrBase.make(clazz);
            class Clazz extends CxxSharedPtr {
                create(vftable) {
                    const size = Base[nativetype_1.NativeType.size];
                    if (size === null)
                        throw Error(`cannot allocate the non sized class`);
                    this.ref = capi_1.capi.malloc(size).as(Base);
                    this.ref.vftable = vftable;
                    this.ref.construct();
                    this.p = this.ref.addAs(clazz, sizeOfSharedPtrBase);
                }
            }
            Clazz.define({
                p: clazz.ref(),
                ref: Base.ref(),
            });
            Object.defineProperties(Clazz, {
                name: { value: `CxxSharedPtr<${clazz.name}>` },
                symbol: {
                    value: mangle_1.mangle.templateClass(["std", "shared_ptr"], clazz),
                },
            });
            return Clazz;
        });
    }
}
exports.CxxSharedPtr = CxxSharedPtr;
/** @deprecated use CxxSharedPtr, avoid duplicated name */
exports.SharedPtr = CxxSharedPtr;
/**
 * wrapper for std::weak_ptr
 */
class CxxWeakPtr extends nativeclass_1.NativeClass {
    [nativetype_1.NativeType.ctor]() {
        this.p = null;
        this.ref = null;
    }
    [nativetype_1.NativeType.dtor]() {
        const ref = this.ref;
        if (ref !== null)
            ref.releaseWeak();
    }
    [nativetype_1.NativeType.ctor_copy](value) {
        this.p = value.p;
        const ref = value.ref;
        this.ref = ref;
        if (ref !== null)
            ref.addRefWeak();
    }
    [nativetype_1.NativeType.ctor_move](value) {
        this.p = value.p;
        this.ref = value.ref;
        value.p = null;
        value.ref = null;
    }
    assign(value) {
        this[nativetype_1.NativeType.dtor]();
        this[nativetype_1.NativeType.ctor_copy](value);
        return this;
    }
    assign_move(value) {
        this[nativetype_1.NativeType.dtor]();
        this[nativetype_1.NativeType.ctor_move](value);
        return this;
    }
    exists() {
        return this.ref !== null;
    }
    addRef() {
        this.ref.addRefWeak();
    }
    assignTo(dest) {
        const ctor = this.constructor;
        const ptr = dest.as(ctor);
        ptr.assign(this);
    }
    dispose() {
        const ref = this.ref;
        if (ref !== null) {
            ref.releaseWeak();
            this.ref = null;
        }
        this.p = null;
    }
    static make(cls) {
        const clazz = cls;
        return singleton_1.Singleton.newInstance(CxxWeakPtr, cls, () => {
            const Base = CxxPtrBase.make(clazz);
            class Clazz extends CxxWeakPtr {
                create(vftable) {
                    const size = Base[nativetype_1.NativeType.size];
                    if (size === null)
                        throw Error(`cannot allocate the non sized class`);
                    this.ref = capi_1.capi.malloc(size).as(Base);
                    this.ref.vftable = vftable;
                    this.ref.construct();
                    this.p = this.ref.addAs(clazz, sizeOfSharedPtrBase);
                }
            }
            Object.defineProperties(Clazz, {
                name: { value: `CxxWeakPtr<${clazz.name}>` },
            });
            Clazz.define({
                p: clazz.ref(),
                ref: Base.ref(),
            }, {
                symbol: mangle_1.mangle.templateClass(["std", "weak_ptr"], clazz),
            });
            return Clazz;
        });
    }
}
exports.CxxWeakPtr = CxxWeakPtr;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkcG9pbnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoYXJlZHBvaW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxpQ0FBOEI7QUFDOUIscUNBQW9DO0FBQ3BDLGlDQUFvRDtBQUNwRCx5Q0FBc0M7QUFDdEMscUNBQWtDO0FBQ2xDLCtDQUF1RjtBQUN2Riw2Q0FBa0U7QUFDbEUsMkNBQXdDO0FBR3hDLElBQU0sVUFBVSxrQkFBaEIsTUFBTSxVQUFjLFNBQVEseUJBQVc7SUFTbkMsQ0FBQyx1QkFBVSxDQUFDLElBQUksQ0FBQztRQUNiLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFDRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUztJQUMvQyxDQUFDO0lBQ0QsVUFBVTtRQUNOLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVU7SUFDaEQsQ0FBQztJQUNELE9BQU87UUFDSCxJQUFJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFDRCxXQUFXO1FBQ1AsSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFDRCxXQUFXO1FBQ1AsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsUUFBUTtRQUNKLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUksSUFB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