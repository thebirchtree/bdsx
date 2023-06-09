"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bedrock = void 0;
const tslib_1 = require("tslib");
const mangle_1 = require("../mangle");
const nativeclass_1 = require("../nativeclass");
const pointer_1 = require("../pointer");
const sharedpointer_1 = require("../sharedpointer");
const singleton_1 = require("../singleton");
var Bedrock;
(function (Bedrock) {
    var NonOwnerPointer_1;
    let NonOwnerPointer = NonOwnerPointer_1 = class NonOwnerPointer extends nativeclass_1.NativeClass {
        /**
         * @deprecated CAUTION, it's not working properly
         */
        get() {
            const p = this.sharedptr.p;
            return p && p.value;
        }
        assign(value) {
            this.sharedptr.assign(value.sharedptr);
        }
        dispose() {
            return this.sharedptr.dispose();
        }
        static make(v) {
            const clazz = v;
            return singleton_1.Singleton.newInstance(NonOwnerPointer_1, clazz, () => {
                class Class extends NonOwnerPointer_1 {
                }
                Class.define({
                    sharedptr: sharedpointer_1.CxxSharedPtr.make(pointer_1.Wrapper.make(clazz.ref())),
                });
                Object.defineProperties(Class, {
                    name: { value: `NonOwnerPointer<${clazz.name}>` },
                    symbol: {
                        value: mangle_1.mangle.templateClass("NonOwnerPointer", clazz),
                    },
                });
                return Class;
            });
        }
    };
    NonOwnerPointer = NonOwnerPointer_1 = tslib_1.__decorate([
        (0, nativeclass_1.nativeClass)()
    ], NonOwnerPointer);
    Bedrock.NonOwnerPointer = NonOwnerPointer;
})(Bedrock = exports.Bedrock || (exports.Bedrock = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVkcm9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJlZHJvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLHNDQUFtQztBQUNuQyxnREFBMkU7QUFDM0Usd0NBQXFDO0FBQ3JDLG9EQUFnRDtBQUNoRCw0Q0FBeUM7QUFFekMsSUFBaUIsT0FBTyxDQTJDdkI7QUEzQ0QsV0FBaUIsT0FBTzs7SUFJcEIsSUFBYSxlQUFlLHVCQUE1QixNQUFhLGVBQXVDLFNBQVEseUJBQVc7UUFNbkU7O1dBRUc7UUFDSCxHQUFHO1lBQ0MsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUN4QixDQUFDO1FBRUQsTUFBTSxDQUFDLEtBQXlCO1lBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBRUQsT0FBTztZQUNILE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNwQyxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBd0IsQ0FBYztZQUM3QyxNQUFNLEtBQUssR0FBRyxDQUF1QixDQUFDO1lBQ3RDLE9BQU8scUJBQVMsQ0FBQyxXQUFXLENBQUMsaUJBQWUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO2dCQUN0RCxNQUFNLEtBQU0sU0FBUSxpQkFBa0I7aUJBQUc7Z0JBQ3pDLEtBQUssQ0FBQyxNQUFNLENBQUM7b0JBQ1QsU0FBUyxFQUFFLDRCQUFZLENBQUMsSUFBSSxDQUFDLGlCQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2lCQUMxRCxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRTtvQkFDM0IsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLG1CQUFtQixLQUFLLENBQUMsSUFBSSxHQUFHLEVBQUU7b0JBQ2pELE1BQU0sRUFBRTt3QkFDSixLQUFLLEVBQUUsZUFBTSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUM7cUJBQ3hEO2lCQUNKLENBQUMsQ0FBQztnQkFDSCxPQUFPLEtBQUssQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7S0FDSixDQUFBO0lBdENZLGVBQWU7UUFEM0IsSUFBQSx5QkFBVyxHQUFFO09BQ0QsZUFBZSxDQXNDM0I7SUF0Q1ksdUJBQWUsa0JBc0MzQixDQUFBO0FBQ0wsQ0FBQyxFQTNDZ0IsT0FBTyxHQUFQLGVBQU8sS0FBUCxlQUFPLFFBMkN2QiJ9