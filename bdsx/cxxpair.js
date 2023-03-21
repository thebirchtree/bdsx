"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CxxPair = void 0;
const common_1 = require("./common");
const keycombine_1 = require("./keycombine");
const mangle_1 = require("./mangle");
const nativeclass_1 = require("./nativeclass");
const singleton_1 = require("./singleton");
const util_1 = require("./util");
function setFirstWithClass(v) {
    const cls = this.first;
    cls.destruct();
    cls.construct(v);
}
function setSecondWithClass(v) {
    const cls = this.second;
    cls.destruct();
    cls.construct(v);
}
function setFirstWithPrimitive(v) {
    this.first = v;
}
function setSecondWithPrimitive(v) {
    this.second = v;
}
/**
 * std::pair
 */
class CxxPair extends nativeclass_1.NativeClass {
    static make(firstType, secondType) {
        const key = (0, keycombine_1.combineObjectKey)(firstType, secondType);
        return singleton_1.Singleton.newInstance(CxxPair, key, () => {
            class CxxPairImpl extends CxxPair {
                setFirst(first) {
                    (0, common_1.abstract)();
                }
                setSecond(second) {
                    (0, common_1.abstract)();
                }
            }
            CxxPairImpl.firstType = firstType;
            CxxPairImpl.secondType = secondType;
            CxxPairImpl.prototype.setFirst = (0, util_1.isBaseOf)(firstType, nativeclass_1.NativeClass) ? setFirstWithClass : setFirstWithPrimitive;
            CxxPairImpl.prototype.setSecond = (0, util_1.isBaseOf)(secondType, nativeclass_1.NativeClass) ? setSecondWithClass : setSecondWithPrimitive;
            CxxPairImpl.prototype.firstType = firstType;
            CxxPairImpl.prototype.secondType = secondType;
            CxxPairImpl.define({ first: firstType, second: secondType });
            Object.defineProperties(CxxPairImpl, {
                name: {
                    value: `CxxPair<${firstType.name}, ${secondType.name}>`,
                },
                symbol: { value: getPairSymbol(firstType, secondType) },
            });
            return CxxPairImpl;
        });
    }
}
exports.CxxPair = CxxPair;
function getPairSymbol(type1, type2) {
    return mangle_1.mangle.templateClass(["std", "pair"], type1.symbol, type2.symbol);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3h4cGFpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImN4eHBhaXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQW9DO0FBRXBDLDZDQUFnRDtBQUNoRCxxQ0FBa0M7QUFDbEMsK0NBQTZEO0FBRTdELDJDQUF3QztBQUN4QyxpQ0FBa0M7QUFRbEMsU0FBUyxpQkFBaUIsQ0FBZ0MsQ0FBSztJQUMzRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBMkIsQ0FBQztJQUM3QyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDZixHQUFHLENBQUMsU0FBUyxDQUFDLENBQVEsQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFFRCxTQUFTLGtCQUFrQixDQUFnQyxDQUFLO0lBQzVELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUE0QixDQUFDO0lBQzlDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNmLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBUSxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQUVELFNBQVMscUJBQXFCLENBQWdDLENBQUs7SUFDL0QsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDbkIsQ0FBQztBQUVELFNBQVMsc0JBQXNCLENBQWdDLENBQUs7SUFDaEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDcEIsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBc0IsT0FBZ0IsU0FBUSx5QkFBVztJQVdyRCxNQUFNLENBQUMsSUFBSSxDQUFTLFNBQW1CLEVBQUUsVUFBb0I7UUFDekQsTUFBTSxHQUFHLEdBQUcsSUFBQSw2QkFBZ0IsRUFBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDcEQsT0FBTyxxQkFBUyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtZQUM1QyxNQUFNLFdBQVksU0FBUSxPQUFlO2dCQUtyQyxRQUFRLENBQUMsS0FBUztvQkFDZCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztnQkFDZixDQUFDO2dCQUNELFNBQVMsQ0FBQyxNQUFVO29CQUNoQixJQUFBLGlCQUFRLEdBQUUsQ0FBQztnQkFDZixDQUFDOztZQVBlLHFCQUFTLEdBQWEsU0FBUyxDQUFDO1lBQ2hDLHNCQUFVLEdBQWEsVUFBVSxDQUFDO1lBUXRELFdBQVcsQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLElBQUEsZUFBUSxFQUFDLFNBQVMsRUFBRSx5QkFBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQztZQUM5RyxXQUFXLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFBLGVBQVEsRUFBQyxVQUFVLEVBQUUseUJBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUM7WUFDbEgsV0FBVyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBQzVDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUM5QyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFTLENBQUMsQ0FBQztZQUNwRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFO2dCQUNqQyxJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLFdBQVcsU0FBUyxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsSUFBSSxHQUFHO2lCQUMxRDtnQkFDRCxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsYUFBYSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsRUFBRTthQUMxRCxDQUFDLENBQUM7WUFDSCxPQUFPLFdBQVcsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQXhDRCwwQkF3Q0M7QUFFRCxTQUFTLGFBQWEsQ0FBQyxLQUFnQixFQUFFLEtBQWdCO0lBQ3JELE9BQU8sZUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3RSxDQUFDIn0=