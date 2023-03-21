"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CxxOptionalToUndefUnion = exports.CxxOptional = void 0;
const tslib_1 = require("tslib");
const makefunc_1 = require("../makefunc");
const mangle_1 = require("../mangle");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const singleton_1 = require("../singleton");
function getOptionalSymbol(type) {
    return mangle_1.mangle.templateClass(["std", "optional"], type);
}
class CxxOptional extends nativeclass_1.NativeClass {
    static make(type) {
        return singleton_1.Singleton.newInstance(CxxOptional, type, () => {
            let OptionalImpl = class OptionalImpl extends CxxOptional {
                [nativetype_1.NativeType.ctor]() {
                    this._hasValue = false;
                }
                [nativetype_1.NativeType.ctor_copy](value) {
                    const hasValue = value._hasValue;
                    this._hasValue = hasValue;
                    if (hasValue)
                        type[nativetype_1.NativeType.ctor_copy](this, value);
                }
                [nativetype_1.NativeType.ctor_move](value) {
                    const hasValue = value._hasValue;
                    this._hasValue = hasValue;
                    if (hasValue)
                        type[nativetype_1.NativeType.ctor_move](this, value);
                }
                [nativetype_1.NativeType.dtor]() {
                    if (this._hasValue) {
                        type[nativetype_1.NativeType.dtor](this);
                    }
                }
                value() {
                    return this._hasValue ? this._value : undefined;
                }
                setValue(value) {
                    if (value === undefined) {
                        this.reset();
                    }
                    else {
                        this.initValue();
                        this._value = value;
                    }
                }
                initValue() {
                    if (!this._hasValue) {
                        this._hasValue = true;
                        type[nativetype_1.NativeType.ctor](this);
                    }
                }
                hasValue() {
                    return this._hasValue;
                }
                reset() {
                    if (this._hasValue) {
                        type[nativetype_1.NativeType.dtor](this);
                        this._hasValue = false;
                    }
                }
            };
            OptionalImpl.componentType = type;
            tslib_1.__decorate([
                (0, nativeclass_1.nativeField)(type, { noInitialize: true })
            ], OptionalImpl.prototype, "_value", void 0);
            tslib_1.__decorate([
                (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
            ], OptionalImpl.prototype, "_hasValue", void 0);
            OptionalImpl = tslib_1.__decorate([
                (0, nativeclass_1.nativeClass)()
            ], OptionalImpl);
            Object.defineProperties(OptionalImpl, {
                name: { value: `CxxOptional<${type.name}>` },
                symbol: { value: getOptionalSymbol(type) },
            });
            return OptionalImpl;
        });
    }
}
exports.CxxOptional = CxxOptional;
class CxxOptionalToUndefUnion extends nativetype_1.NativeType {
    constructor(compType) {
        const optionalType = CxxOptional.make(compType);
        const hasValueOffset = optionalType.offsetOf("_hasValue");
        super(getOptionalSymbol(compType), `CxxOptionalToJsValue<${compType.name}>`, optionalType[nativetype_1.NativeType.size], optionalType[nativetype_1.NativeType.align], v => v === undefined || compType.isTypeOf(v), undefined, (ptr, offset) => ptr.addAs(this.type, offset).value(), (ptr, v, offset) => ptr.addAs(this.type, offset).setValue(v), (stackptr, offset) => stackptr.getPointerAs(this.type, offset).value(), undefined, ptr => ptr.setBoolean(false, hasValueOffset), ptr => {
            if (ptr.getBoolean(hasValueOffset)) {
                compType[nativetype_1.NativeType.dtor](ptr);
            }
        }, (to, from) => to.as(this.type)[nativetype_1.NativeType.ctor_copy](from.as(this.type)), (to, from) => {
            const hasValue = from.getBoolean(hasValueOffset);
            to.setBoolean(hasValue, hasValueOffset);
            if (hasValue) {
                from.setBoolean(false, hasValueOffset);
                compType[nativetype_1.NativeType.ctor_move](to, from);
                compType[nativetype_1.NativeType.dtor](from);
            }
        });
        this.compType = compType;
        this.type = optionalType;
        this[makefunc_1.makefunc.paramHasSpace] = true;
    }
    static make(compType) {
        return singleton_1.Singleton.newInstance(CxxOptionalToUndefUnion, compType, () => new CxxOptionalToUndefUnion(compType));
    }
}
exports.CxxOptionalToUndefUnion = CxxOptionalToUndefUnion;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3h4b3B0aW9uYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjeHhvcHRpb25hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsMENBQXVDO0FBQ3ZDLHNDQUFtQztBQUNuQyxnREFBd0Y7QUFDeEYsOENBQXlEO0FBQ3pELDRDQUF5QztBQVN6QyxTQUFTLGlCQUFpQixDQUFDLElBQWU7SUFDdEMsT0FBTyxlQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFFRCxNQUFzQixXQUFlLFNBQVEseUJBQVc7SUFPN0MsQUFBUCxNQUFNLENBQUMsSUFBSSxDQUFJLElBQWE7UUFDeEIsT0FBTyxxQkFBUyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRTtZQUVqRCxJQUFNLFlBQVksR0FBbEIsTUFBTSxZQUFhLFNBQVEsV0FBYztnQkFPckMsQ0FBQyx1QkFBVSxDQUFDLElBQUksQ0FBQztvQkFDYixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDM0IsQ0FBQztnQkFDRCxDQUFDLHVCQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBbUI7b0JBQ3RDLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7b0JBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO29CQUMxQixJQUFJLFFBQVE7d0JBQUUsSUFBSSxDQUFDLHVCQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBVyxFQUFFLEtBQVksQ0FBQyxDQUFDO2dCQUN4RSxDQUFDO2dCQUNELENBQUMsdUJBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFtQjtvQkFDdEMsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztvQkFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7b0JBQzFCLElBQUksUUFBUTt3QkFBRSxJ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