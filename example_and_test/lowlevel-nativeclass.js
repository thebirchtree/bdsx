"use strict";
// Low Level - define C++ class or structure
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("bdsx/core");
const nativeclass_1 = require("bdsx/nativeclass");
const nativetype_1 = require("bdsx/nativetype");
/**
 * All packets in packets.ts are NativeClass also
 */
let SampleStructure = class SampleStructure extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], SampleStructure.prototype, "a", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int16_t)
], SampleStructure.prototype, "b", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int8_t)
], SampleStructure.prototype, "c", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], SampleStructure.prototype, "d", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t, null, 1)
], SampleStructure.prototype, "bitfield1", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t, null, 1)
], SampleStructure.prototype, "bitfield2", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t, null, 30)
], SampleStructure.prototype, "bitfield3", void 0);
SampleStructure = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], SampleStructure);
/**
 * struct SampleStructure
 * {
 *     int32_t a;
 *     int16_t b;
 *     int8_t c;
 *     int32_t d;
 *     int8_t bitfield1:1;
 *     int8_t bitfield2:1;
 * };
 */
/**
 * it allocates itself if it's received 'true'
 */
const obj = new SampleStructure(true);
const pointer = obj.as(core_1.NativePointer);
// full bits is -1
obj.a = 0xffffffff;
console.assert(obj.a === -1);
// &obj.a == (address of obj + 0);
console.assert(obj.a === pointer.getInt32(0));
// int8_t/uint8_t will be truncated within 8bits
obj.c = 0xffffff01;
console.assert(obj.c === 1 && obj.c === pointer.getInt8(6));
console.assert(SampleStructure.offsetOf("a") === 0); // the a offset is 0
console.assert(SampleStructure.offsetOf("b") === 4); // the b offset is 4
console.assert(SampleStructure.offsetOf("d") === 8); // the d offset is 8 by C/C++ field alignments
pointer.setInt32(SampleStructure.offsetOf("bitfield1"), 0);
obj.bitfield1 = 1;
obj.bitfield2 = 0xfffffffe;
console.assert(obj.bitfield2 === 0); // all is masked without the first bit
obj.bitfield3 = 1;
const bitfield = pointer.getInt32(SampleStructure.offsetOf("bitfield1"));
console.assert(bitfield === 0b101); // bitfield = 101 (2)
// override the copy constructor
let Class = class Class extends nativeclass_1.NativeClass {
    [nativetype_1.NativeType.ctor_copy](from) {
        this.value = from.value + 1;
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], Class.prototype, "value", void 0);
Class = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], Class);
const original = new Class(true);
original.value = 10;
const copied = Class.construct(original); // call the copy constructor
console.assert(copied.value === 11);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG93bGV2ZWwtbmF0aXZlY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb3dsZXZlbC1uYXRpdmVjbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsNENBQTRDOzs7QUFFNUMsb0NBQTBDO0FBQzFDLGtEQUF5RTtBQUN6RSxnREFBdUU7QUFFdkU7O0dBRUc7QUFHSCxJQUFNLGVBQWUsR0FBckIsTUFBTSxlQUFnQixTQUFRLHlCQUFXO0NBZXhDLENBQUE7QUFiRztJQURDLElBQUEseUJBQVcsRUFBQyxvQkFBTyxDQUFDOzBDQUNWO0FBRVg7SUFEQyxJQUFBLHlCQUFXLEVBQUMsb0JBQU8sQ0FBQzswQ0FDVjtBQUVYO0lBREMsSUFBQSx5QkFBVyxFQUFDLG1CQUFNLENBQUM7MENBQ1Y7QUFFVjtJQURDLElBQUEseUJBQVcsRUFBQyxvQkFBTyxDQUFDOzBDQUNWO0FBRVg7SUFEQyxJQUFBLHlCQUFXLEVBQUMsb0JBQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2tEQUNYO0FBRW5CO0lBREMsSUFBQSx5QkFBVyxFQUFDLG9CQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztrREFDWDtBQUVuQjtJQURDLElBQUEseUJBQVcsRUFBQyxvQkFBTyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7a0RBQ1o7QUFkakIsZUFBZTtJQURwQixJQUFBLHlCQUFXLEdBQUU7R0FDUixlQUFlLENBZXBCO0FBQ0Q7Ozs7Ozs7Ozs7R0FVRztBQUVIOztHQUVHO0FBQ0gsTUFBTSxHQUFHLEdBQUcsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEMsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxvQkFBYSxDQUFDLENBQUM7QUFFdEMsa0JBQWtCO0FBQ2xCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDO0FBQ25CLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRTdCLGtDQUFrQztBQUNsQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRTlDLGdEQUFnRDtBQUNoRCxHQUFHLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQztBQUNuQixPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRTVELE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLG9CQUFvQjtBQUN6RSxPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxvQkFBb0I7QUFDekUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsOENBQThDO0FBRW5HLE9BQU8sQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUUzRCxHQUFHLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztBQUNsQixHQUFHLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQztBQUMzQixPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxzQ0FBc0M7QUFDM0UsR0FBRyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFDbEIsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFDekUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxxQkFBcUI7QUFFekQsZ0NBQWdDO0FBRWhDLElBQU0sS0FBSyxHQUFYLE1BQU0sS0FBTSxTQUFRLHlCQUFXO0lBRzNCLENBQUMsdUJBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFXO1FBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQztDQUNKLENBQUE7QUFKRztJQURDLElBQUEseUJBQVcsRUFBQyxvQkFBTyxDQUFDO29DQUNOO0FBRmIsS0FBSztJQURWLElBQUEseUJBQVcsR0FBRTtHQUNSLEtBQUssQ0FNVjtBQUVELE1BQU0sUUFBUSxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyw0QkFBNEI7QUFDdEUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDIn0=