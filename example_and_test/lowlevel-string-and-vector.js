"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cxxvector_1 = require("bdsx/cxxvector");
const nativetype_1 = require("bdsx/nativetype");
const pointer_1 = require("bdsx/pointer");
// string allocation
const cxxstring = new pointer_1.CxxStringWrapper(true); // it will allocate memory if it takes 'true'. it points NULL without 'true'
cxxstring.construct(); // call the constructor, std::string::string()
cxxstring.value = "string"; // set value
cxxstring.resize(2);
console.assert(cxxstring.value == "st");
cxxstring.destruct(); // call the destructor. std::string::~string()
// without true
const sampleStringInstance = new pointer_1.CxxStringWrapper();
// basically all native classes are the pointer
// it's the null pointer if you allocate without 'true' argument
console.assert(sampleStringInstance.toString() === "0x0000000000000000");
// vector allocation
const CxxVectorString = cxxvector_1.CxxVector.make(nativetype_1.CxxString);
const cxxvector = CxxVectorString.construct(); // combination of 'new Class(true);' and 'cxxvector.construct();'
cxxvector.push("test");
console.assert(cxxvector.get(0) === "test");
cxxvector.destruct(); // call std::vector<std::string>::~vector<string>()
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG93bGV2ZWwtc3RyaW5nLWFuZC12ZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb3dsZXZlbC1zdHJpbmctYW5kLXZlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUEyQztBQUMzQyxnREFBNEM7QUFDNUMsMENBQWdEO0FBRWhELG9CQUFvQjtBQUNwQixNQUFNLFNBQVMsR0FBRyxJQUFJLDBCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsNEVBQTRFO0FBQzFILFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLDhDQUE4QztBQUNyRSxTQUFTLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLFlBQVk7QUFDeEMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQixPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUM7QUFDeEMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsOENBQThDO0FBRXBFLGVBQWU7QUFDZixNQUFNLG9CQUFvQixHQUFHLElBQUksMEJBQWdCLEVBQUUsQ0FBQztBQUNwRCwrQ0FBK0M7QUFDL0MsZ0VBQWdFO0FBQ2hFLE9BQU8sQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFFLEtBQUssb0JBQW9CLENBQUMsQ0FBQztBQUV6RSxvQkFBb0I7QUFDcEIsTUFBTSxlQUFlLEdBQUcscUJBQVMsQ0FBQyxJQUFJLENBQUMsc0JBQVMsQ0FBQyxDQUFDO0FBQ2xELE1BQU0sU0FBUyxHQUFHLGVBQWUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLGlFQUFpRTtBQUNoSCxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZCLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNLENBQUMsQ0FBQztBQUM1QyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxtREFBbUQifQ==