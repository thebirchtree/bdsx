"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvertableFilter = void 0;
const common_1 = require("../common");
const mangle_1 = require("../mangle");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const singleton_1 = require("../singleton");
const util_1 = require("../util");
function setValueWithClass(v) {
    const cls = this.value;
    cls.destruct();
    cls.construct(v);
}
function setValueWithPrimitive(v) {
    this.value = v;
}
class InvertableFilter extends nativeclass_1.NativeClass {
    static make(type) {
        return singleton_1.Singleton.newInstance(InvertableFilter, type, () => {
            class InvertableFilterImpl extends InvertableFilter {
                setValue(value) {
                    (0, common_1.abstract)();
                }
            }
            InvertableFilterImpl.type = type;
            InvertableFilterImpl.prototype.setValue = (0, util_1.isBaseOf)(type, nativeclass_1.NativeClass) ? setValueWithClass : setValueWithPrimitive;
            InvertableFilterImpl.prototype.type = type;
            InvertableFilterImpl.define({ value: type, inverted: nativetype_1.bool_t });
            Object.defineProperties(InvertableFilterImpl, {
                name: {
                    value: `InvertableFilter<${type.name}>`,
                },
                symbol: { value: mangle_1.mangle.templateClass("InvertableFilter", type.symbol) },
            });
            return InvertableFilterImpl;
        });
    }
}
exports.InvertableFilter = InvertableFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZXJ0YWJsZWZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImludmVydGFibGVmaWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQXFDO0FBRXJDLHNDQUFtQztBQUNuQyxnREFBOEQ7QUFDOUQsOENBQTZDO0FBQzdDLDRDQUF5QztBQUN6QyxrQ0FBbUM7QUFPbkMsU0FBUyxpQkFBaUIsQ0FBK0IsQ0FBSTtJQUN6RCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBMkIsQ0FBQztJQUM3QyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDZixHQUFHLENBQUMsU0FBUyxDQUFDLENBQVEsQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFFRCxTQUFTLHFCQUFxQixDQUErQixDQUFJO0lBQzdELElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQ25CLENBQUM7QUFFRCxNQUFzQixnQkFBb0IsU0FBUSx5QkFBVztJQVF6RCxNQUFNLENBQUMsSUFBSSxDQUFJLElBQWE7UUFDeEIsT0FBTyxxQkFBUyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFO1lBQ3RELE1BQU0sb0JBQXFCLFNBQVEsZ0JBQW1CO2dCQUdsRCxRQUFRLENBQUMsS0FBUTtvQkFDYixJQUFBLGlCQUFRLEdBQUUsQ0FBQztnQkFDZixDQUFDOztZQUhlLHlCQUFJLEdBQVksSUFBSSxDQUFDO1lBS3pDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsSUFBQSxlQUFRLEVBQUMsSUFBSSxFQUFFLHlCQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDO1lBQ2xILG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQzNDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLG1CQUFNLEVBQVMsQ0FBQyxDQUFDO1lBQ3RFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsRUFBRTtnQkFDMUMsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxvQkFBb0IsSUFBSSxDQUFDLElBQUksR0FBRztpQkFDMUM7Z0JBQ0QsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLGVBQU0sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2FBQzNFLENBQUMsQ0FBQztZQUNILE9BQU8sb0JBQW9CLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUE3QkQsNENBNkJDIn0=