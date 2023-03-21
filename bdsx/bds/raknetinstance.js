"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RakNetInstance = exports.RakNetConnector = void 0;
const tslib_1 = require("tslib");
const common_1 = require("../common");
const core_1 = require("../core");
const nativeclass_1 = require("../nativeclass");
let RakNetConnector = class RakNetConnector extends nativeclass_1.AbstractClass {
    getPort() {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], RakNetConnector.prototype, "vftable", void 0);
RakNetConnector = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], RakNetConnector);
exports.RakNetConnector = RakNetConnector;
/** @alias RakNetConnector */
exports.RakNetInstance = RakNetConnector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFrbmV0aW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyYWtuZXRpbnN0YW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsc0NBQXFDO0FBQ3JDLGtDQUFzQztBQUN0QyxnREFBeUU7QUFJbEUsSUFBTSxlQUFlLEdBQXJCLE1BQU0sZUFBZ0IsU0FBUSwyQkFBYTtJQVE5QyxPQUFPO1FBQ0gsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0NBQ0osQ0FBQTtBQVRHO0lBREMsSUFBQSx5QkFBVyxFQUFDLGtCQUFXLENBQUM7Z0RBQ0o7QUFGWixlQUFlO0lBRDNCLElBQUEseUJBQVcsR0FBRTtHQUNELGVBQWUsQ0FXM0I7QUFYWSwwQ0FBZTtBQWE1Qiw2QkFBNkI7QUFDaEIsUUFBQSxjQUFjLEdBQUcsZUFBZSxDQUFDIn0=