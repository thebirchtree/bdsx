"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoopbackPacketSender = void 0;
const tslib_1 = require("tslib");
const nativeclass_1 = require("../nativeclass");
const networkidentifier_1 = require("./networkidentifier");
let LoopbackPacketSender = class LoopbackPacketSender extends nativeclass_1.AbstractClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(networkidentifier_1.NetworkSystem.ref(), 8)
], LoopbackPacketSender.prototype, "networkSystem", void 0);
LoopbackPacketSender = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], LoopbackPacketSender);
exports.LoopbackPacketSender = LoopbackPacketSender;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9vcGJhY2tzZW5kZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb29wYmFja3NlbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsZ0RBQXlFO0FBQ3pFLDJEQUFvRDtBQUc3QyxJQUFNLG9CQUFvQixHQUExQixNQUFNLG9CQUFxQixTQUFRLDJCQUFhO0NBR3RELENBQUE7QUFERztJQURDLElBQUEseUJBQVcsRUFBQyxpQ0FBYSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQzsyREFDUDtBQUZwQixvQkFBb0I7SUFEaEMsSUFBQSx5QkFBVyxFQUFDLElBQUksQ0FBQztHQUNMLG9CQUFvQixDQUdoQztBQUhZLG9EQUFvQiJ9