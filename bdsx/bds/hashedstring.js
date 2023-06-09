"use strict";
var HashedString_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashedStringToString = exports.HashedString = void 0;
const tslib_1 = require("tslib");
const core_1 = require("../core");
const makefunc_1 = require("../makefunc");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const prochacker_1 = require("../prochacker");
let HashedString = HashedString_1 = class HashedString extends nativeclass_1.NativeClass {
    [nativetype_1.NativeType.ctor]() {
        this.hash = null;
        this.recentCompared = null;
    }
    set(str) {
        this.str = str;
        this.hash = computeHash(this.add(str_offset));
    }
    static constructWith(str) {
        const hStr = new HashedString_1(true);
        HashedString$HashedString(hStr, str);
        return hStr;
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], HashedString.prototype, "hash", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], HashedString.prototype, "str", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(HashedString_1.ref())
], HashedString.prototype, "recentCompared", void 0);
HashedString = HashedString_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], HashedString);
exports.HashedString = HashedString;
const HashedString$HashedString = prochacker_1.procHacker.js("??0HashedString@@QEAA@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", nativetype_1.void_t, null, HashedString, nativetype_1.CxxString);
const str_offset = HashedString.offsetOf("str");
const computeHash = prochacker_1.procHacker.js("?computeHash@HashedString@@SA_KAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", core_1.VoidPointer, null, core_1.VoidPointer);
exports.HashedStringToString = new nativetype_1.NativeType(HashedString.symbol, "HashedStringToString", HashedString[nativetype_1.NativeType.size], HashedString[nativetype_1.NativeType.align], v => typeof v === "string", undefined, (ptr, offset) => ptr.addAs(HashedString, offset).str, (ptr, value, offset) => ptr.addAs(HashedString, offset).set(value), undefined, undefined, HashedString[nativetype_1.NativeType.ctor].bind(HashedString), HashedString[nativetype_1.NativeType.dtor].bind(HashedString), HashedString[nativetype_1.NativeType.ctor_copy].bind(HashedString), HashedString[nativetype_1.NativeType.ctor_move].bind(HashedString));
exports.HashedStringToString[makefunc_1.makefunc.paramHasSpace] = true;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzaGVkc3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaGFzaGVkc3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0NBQXNDO0FBQ3RDLDBDQUF1QztBQUN2QyxnREFBdUU7QUFDdkUsOENBQThEO0FBQzlELDhDQUEyQztBQUdwQyxJQUFNLFlBQVksb0JBQWxCLE1BQU0sWUFBYSxTQUFRLHlCQUFXO0lBUXpDLENBQUMsdUJBQVUsQ0FBQyxJQUFJLENBQUM7UUFDYixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztJQUMvQixDQUFDO0lBRUQsR0FBRyxDQUFDLEdBQVc7UUFDWCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ0QsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFXO1FBQzVCLE1BQU0sSUFBSSxHQUFHLElBQUksY0FBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLHlCQUF5QixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNyQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0osQ0FBQTtBQXBCRztJQURDLElBQUEseUJBQVcsRUFBQyxrQkFBVyxDQUFDOzBDQUNBO0FBRXpCO0lBREMsSUFBQSx5QkFBVyxFQUFDLHNCQUFTLENBQUM7eUNBQ1I7QUFFZjtJQURDLElBQUEseUJBQVcsRUFBQyxjQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7b0RBQ0k7QUFOM0IsWUFBWTtJQUR4QixJQUFBLHlCQUFXLEdBQUU7R0FDRCxZQUFZLENBc0J4QjtBQXRCWSxvQ0FBWTtBQXVCekIsTUFBTSx5QkFBeUIsR0FBRyx1QkFBVSxDQUFDLEVBQUUsQ0FDM0MsMkZBQTJGLEVBQzNGLG1CQUFNLEVBQ04sSUFBSSxFQUNKLFlBQVksRUFDWixzQkFBUyxDQUNaLENBQUM7QUFDRixNQUFNLFVBQVUsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hELE1BQU0sV0FBVyxHQUFHLHVCQUFVLENBQUMsRUFBRSxDQUM3QixvR0FBb0csRUFDcEcsa0JBQVcsRUFDWCxJQUFJLEVBQ0osa0JBQVcsQ0FDZCxDQUFDO0FBRVcsUUFBQSxvQkFBb0IsR0FBRyxJQUFJLHVCQUFVLENBQzlDLFlBQVksQ0FBQyxNQUFNLEVBQ25CLHNCQUFzQixFQUN0QixZQUFZLENBQUMsdUJBQVUsQ0FBQyxJQUFJLENBQUMsRUFDN0IsWUFBWSxDQUFDLHVCQUFVLENBQUMsS0FBSyxDQUFDLEVBQzlCLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUSxFQUMxQixTQUFTLEVBQ1QsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQ3BELENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFDbEUsU0FBUyxFQUNULFNBQVMsRUFDVCxZQUFZLENBQUMsdUJBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQ2hELFlBQVksQ0FBQyx1QkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFDaEQsWUFBWSxDQUFDLHVCQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUNyRCxZQUFZLENBQUMsdUJBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQ3hELENBQUM7QUFDRiw0QkFBb0IsQ0FBQyxtQkFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQyJ9