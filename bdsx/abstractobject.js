"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAbstractObject = void 0;
/**
 * @param message error message when accessing
 */
function createAbstractObject(message) {
    function _() {
        throw Error(message);
    }
    return new Proxy({}, {
        get: _,
        set: _,
        ownKeys: _,
        getPrototypeOf: _,
        defineProperty: _,
        isExtensible: _,
        preventExtensions: _,
        setPrototypeOf: _,
        has: _,
        deleteProperty: _,
        getOwnPropertyDescriptor: _,
    });
}
exports.createAbstractObject = createAbstractObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3RvYmplY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhYnN0cmFjdG9iamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7R0FFRztBQUNILFNBQWdCLG9CQUFvQixDQUFDLE9BQWU7SUFDaEQsU0FBUyxDQUFDO1FBQ04sTUFBTSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNELE9BQU8sSUFBSSxLQUFLLENBQ1osRUFBRSxFQUNGO1FBQ0ksR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDO1FBQ1YsY0FBYyxFQUFFLENBQUM7UUFDakIsY0FBYyxFQUFFLENBQUM7UUFDakIsWUFBWSxFQUFFLENBQUM7UUFDZixpQkFBaUIsRUFBRSxDQUFDO1FBQ3BCLGNBQWMsRUFBRSxDQUFDO1FBQ2pCLEdBQUcsRUFBRSxDQUFDO1FBQ04sY0FBYyxFQUFFLENBQUM7UUFDakIsd0JBQXdCLEVBQUUsQ0FBQztLQUM5QixDQUNKLENBQUM7QUFDTixDQUFDO0FBcEJELG9EQW9CQyJ9