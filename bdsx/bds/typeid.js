"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.type_id = exports.HasTypeId = exports.typeid_t = void 0;
const tslib_1 = require("tslib");
const makefunc_1 = require("../makefunc");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
let typeid_t = class typeid_t extends nativeclass_1.NativeStruct {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint16_t)
], typeid_t.prototype, "id", void 0);
typeid_t = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], typeid_t);
exports.typeid_t = typeid_t;
const counterWrapper = Symbol("IdCounter");
const typeidmap = Symbol("typeidmap");
let IdCounter = class IdCounter extends nativeclass_1.NativeClass {
    getValue() {
        return this.isoVolatileLoad16() & 0xffff;
    }
    /**
     * @return incremented value
     */
    increase() {
        return this.interlockedIncrement16() & 0xffff;
    }
};
IdCounter = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], IdCounter);
/**
 * dummy class for typeid
 */
class HasTypeId extends nativeclass_1.AbstractClass {
}
exports.HasTypeId = HasTypeId;
_a = typeidmap;
HasTypeId[_a] = new WeakMap();
function type_id(base, type) {
    const map = base[typeidmap];
    const typeid = map.get(type);
    if (typeid instanceof typeid_t) {
        return typeid;
    }
    const counter = base[counterWrapper];
    if (counter.getValue() === 0)
        throw Error("Cannot make type_id before launch");
    if (typeid != null) {
        const newid = makefunc_1.makefunc.js(typeid, typeid_t, {
            structureReturn: true,
        })();
        map.set(type, newid);
        return newid;
    }
    else {
        const newid = new typeid_t(true);
        newid.id = counter.increase() - 1;
        map.set(type, newid);
        return newid;
    }
}
exports.type_id = type_id;
(function (type_id) {
    /**
     * @deprecated dummy
     */
    function pdbimport(base, types) {
        // dummy
    }
    type_id.pdbimport = pdbimport;
    function load(symbols) {
        for (const [basetype, addr] of symbols.iterateCounters()) {
            const base = basetype;
            const map = base[typeidmap];
            base[counterWrapper] = addr.as(IdCounter);
            for (const [type, addr] of symbols.iterateTypeIdFns(basetype)) {
                map.set(type, addr);
            }
            for (const [type, addr] of symbols.iterateTypeIdPtrs(basetype)) {
                map.set(type, addr.as(typeid_t));
            }
        }
    }
    type_id.load = load;
    function clone(base, oriType, newType) {
        const map = base[typeidmap];
        let typeid = map.get(oriType);
        if (typeid == null) {
            throw Error(`type_id ${oriType.name} not found`);
        }
        if (!(typeid instanceof typeid_t)) {
            typeid = makefunc_1.makefunc.js(typeid, typeid_t, { structureReturn: true })();
            map.set(oriType, typeid);
        }
        map.set(newType, typeid);
    }
    type_id.clone = clone;
    function register(base, type, id) {
        const map = base[typeidmap];
        const newid = new typeid_t(true);
        newid.id = id;
        map.set(type, newid);
    }
    type_id.register = register;
})(type_id = exports.type_id || (exports.type_id = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWlkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHlwZWlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsMENBQXVDO0FBQ3ZDLGdEQUFvRztBQUNwRyw4Q0FBK0M7QUFJeEMsSUFBTSxRQUFRLEdBQWQsTUFBTSxRQUFZLFNBQVEsMEJBQVk7Q0FHNUMsQ0FBQTtBQURHO0lBREMsSUFBQSx5QkFBVyxFQUFDLHFCQUFRLENBQUM7b0NBQ1Q7QUFGSixRQUFRO0lBRHBCLElBQUEseUJBQVcsR0FBRTtHQUNELFFBQVEsQ0FHcEI7QUFIWSw0QkFBUTtBQUtyQixNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDM0MsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBR3RDLElBQU0sU0FBUyxHQUFmLE1BQU0sU0FBVSxTQUFRLHlCQUFXO0lBQy9CLFFBQVE7UUFDSixPQUFPLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLE1BQU0sQ0FBQztJQUM3QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxRQUFRO1FBQ0osT0FBTyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxNQUFNLENBQUM7SUFDbEQsQ0FBQztDQUNKLENBQUE7QUFYSyxTQUFTO0lBRGQsSUFBQSx5QkFBVyxHQUFFO0dBQ1IsU0FBUyxDQVdkO0FBRUQ7O0dBRUc7QUFDSCxNQUFhLFNBQVUsU0FBUSwyQkFBYTs7QUFBNUMsOEJBR0M7S0FEb0IsU0FBUztBQUFWLGFBQVcsR0FBRyxJQUFJLE9BQU8sRUFBNEMsQ0FBQztBQUcxRixTQUFnQixPQUFPLENBQTRCLElBQXlDLEVBQUUsSUFBYTtJQUN2RyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDNUIsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixJQUFJLE1BQU0sWUFBWSxRQUFRLEVBQUU7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