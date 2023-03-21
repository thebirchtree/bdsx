"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeakPtr = exports.SharedPtr = void 0;
const tslib_1 = require("tslib");
const capi_1 = require("../capi");
const mangle_1 = require("../mangle");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const singleton_1 = require("../singleton");
class PtrBase extends nativeclass_1.NativeClass {
    [nativetype_1.NativeType.ctor]() {
        this.useRef = 1;
        this.weakRef = 1;
    }
    addRef() {
        this.interlockedIncrement32(0x8);
    }
    addRefWeak() {
        this.interlockedIncrement32(0xc);
    }
    release() {
        const p = this.p;
        if (this.interlockedDecrement32(0x8) === 0) {
            if (p !== null) {
                this.p = null;
                nativeclass_1.vectorDeletingDestructor.deleteIt.call(p);
            }
            this.releaseWeak();
        }
    }
    releaseWeak() {
        if (this.interlockedDecrement32(0xc) === 0) {
            if (this.p === null) {
                capi_1.capi.free(this);
            }
        }
    }
    static make(type) {
        const cls = type;
        return singleton_1.Singleton.newInstance(PtrBase, cls, () => {
            let SharedPtrBaseImpl = class SharedPtrBaseImpl extends PtrBase {
            };
            tslib_1.__decorate([
                (0, nativeclass_1.nativeField)(cls.ref())
            ], SharedPtrBaseImpl.prototype, "p", void 0);
            tslib_1.__decorate([
                (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
            ], SharedPtrBaseImpl.prototype, "useRef", void 0);
            tslib_1.__decorate([
                (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
            ], SharedPtrBaseImpl.prototype, "weakRef", void 0);
            SharedPtrBaseImpl = tslib_1.__decorate([
                (0, nativeclass_1.nativeClass)()
            ], SharedPtrBaseImpl);
            return SharedPtrBaseImpl;
        });
    }
}
class SharedPtr extends nativeclass_1.NativeClass {
    [nativetype_1.NativeType.dtor]() {
        const p = this.ref;
        if (p === null)
            return;
        p.release();
    }
    value() {
        const ref = this.ref;
        if (ref === null)
            return null;
        return ref.p;
    }
    addRef() {
        const p = this.ref;
        if (p === null)
            return;
        p.addRef();
    }
    dispose() {
        const p = this.ref;
        if (p === null)
            return;
        this.ref = null;
        p.release();
    }
    static make(cls) {
        const clazz = cls;
        return singleton_1.Singleton.newInstance(SharedPtr, cls, () => {
            const Base = PtrBase.make(clazz);
            let Clazz = class Clazz extends SharedPtr {
            };
            tslib_1.__decorate([
                (0, nativeclass_1.nativeField)(Base.ref())
            ], Clazz.prototype, "ref", void 0);
            Clazz = tslib_1.__decorate([
                (0, nativeclass_1.nativeClass)()
            ], Clazz);
            Object.defineProperties(Clazz, {
                name: { value: `SharedPtr<${clazz.name}>` },
                symbol: { value: mangle_1.mangle.templateClass("SharedPtr", clazz) },
            });
            return Clazz;
        });
    }
}
exports.SharedPtr = SharedPtr;
class WeakPtr extends nativeclass_1.NativeClass {
    [nativetype_1.NativeType.dtor]() {
        const p = this.ref;
        if (p === null)
            return;
        p.releaseWeak();
    }
    value() {
        const ref = this.ref;
        if (ref === null)
            return null;
        return ref.p;
    }
    addRef() {
        const p = this.ref;
        if (p === null)
            return;
        p.addRefWeak();
    }
    dispose() {
        const p = this.ref;
        if (p === null)
            return;
        this.ref = null;
        p.releaseWeak();
    }
    static make(cls) {
        const clazz = cls;
        return singleton_1.Singleton.newInstance(WeakPtr, cls, () => {
            const Base = PtrBase.make(clazz);
            let Clazz = class Clazz extends WeakPtr {
            };
            tslib_1.__decorate([
                (0, nativeclass_1.nativeField)(Base.ref())
            ], Clazz.prototype, "ref", void 0);
            Clazz = tslib_1.__decorate([
                (0, nativeclass_1.nativeClass)()
            ], Clazz);
            Object.defineProperties(Clazz, {
                name: { value: `WeakPtr<${clazz.name}>` },
                symbol: { value: mangle_1.mangle.templateClass("WeakPtr", clazz) },
            });
            return Clazz;
        });
    }
}
exports.WeakPtr = WeakPtr;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkcHRyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2hhcmVkcHRyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxrQ0FBK0I7QUFDL0Isc0NBQW1DO0FBQ25DLGdEQUFrSDtBQUNsSCw4Q0FBb0Q7QUFDcEQsNENBQXlDO0FBRXpDLE1BQU0sT0FBK0IsU0FBUSx5QkFBVztJQUtwRCxDQUFDLHVCQUFVLENBQUMsSUFBSSxDQUFDO1FBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUNELFVBQVU7UUFDTixJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUNELE9BQU87UUFDSCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLElBQUksSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4QyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ2Qsc0NBQXdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM3QztZQUNELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFDRCxXQUFXO1FBQ1AsSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hDLElBQUksSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0JBQ2pCLFdBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbkI7U0FDSjtJQUNMLENBQUM7SUFFTSxBQUFQLE1B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