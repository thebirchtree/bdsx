"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageLoop = void 0;
const core_1 = require("../core");
const dll_1 = require("../dll");
const nativetype_1 = require("../nativetype");
const windows_h_1 = require("../windows_h");
let timer = null;
let counter = 0;
const msg = new windows_h_1.MSG(true);
const MAX_MSG_PER_MS = 64;
var messageLoop;
(function (messageLoop) {
    function ref() {
        if (timer === null) {
            timer = setInterval(() => {
                for (let i = 0; i < MAX_MSG_PER_MS; i++) {
                    if (!PeekMessage(msg, null, 0, 0, PM_REMOVE))
                        break;
                    TranslateMessage(msg);
                    DispatchMessage(msg);
                }
            }, 1);
        }
        counter++;
    }
    messageLoop.ref = ref;
    function unref() {
        if (timer === null)
            return;
        counter--;
        if (counter === 0) {
            clearInterval(timer);
            timer = null;
        }
    }
    messageLoop.unref = unref;
    messageLoop.user32 = dll_1.NativeModule.load("user32.dll");
})(messageLoop = exports.messageLoop || (exports.messageLoop = {}));
/*
 * PeekMessage() Options
 */
const PM_NOREMOVE = 0x0000;
const PM_REMOVE = 0x0001;
const PM_NOYIELD = 0x0002;
const PeekMessage = messageLoop.user32.getFunction("PeekMessageW", nativetype_1.bool_t, null, windows_h_1.MSG, windows_h_1.HWND, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.int32_t);
const DispatchMessage = messageLoop.user32.getFunction("DispatchMessageW", core_1.VoidPointer, null, windows_h_1.MSG);
const TranslateMessage = messageLoop.user32.getFunction("TranslateMessage", nativetype_1.bool_t, null, windows_h_1.MSG);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZWxvb3AuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtZXNzYWdlbG9vcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxrQ0FBc0M7QUFDdEMsZ0NBQXNDO0FBQ3RDLDhDQUFnRDtBQUNoRCw0Q0FBeUM7QUFFekMsSUFBSSxLQUFLLEdBQTBCLElBQUksQ0FBQztBQUN4QyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDaEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxlQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUIsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDO0FBRTFCLElBQWlCLFdBQVcsQ0FzQjNCO0FBdEJELFdBQWlCLFdBQVc7SUFDeEIsU0FBZ0IsR0FBRztRQUNmLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtZQUNoQixLQUFLLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRTtnQkFDckIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDO3dCQUFFLE1BQU07b0JBQ3BELGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN0QixlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3hCO1lBQ0wsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ1Q7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFYZSxlQUFHLE1BV2xCLENBQUE7SUFDRCxTQUFnQixLQUFLO1FBQ2pCLElBQUksS0FBSyxLQUFLLElBQUk7WUFBRSxPQUFPO1FBQzNCLE9BQU8sRUFBRSxDQUFDO1FBQ1YsSUFBSSxPQUFPLEtBQUssQ0FBQyxFQUFFO1lBQ2YsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLEtBQUssR0FBRyxJQUFJLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBUGUsaUJBQUssUUFPcEIsQ0FBQTtJQUNZLGtCQUFNLEdBQUcsa0JBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDMUQsQ0FBQyxFQXRCZ0IsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFzQjNCO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUM7QUFDM0IsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDO0FBQ3pCLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQztBQUUxQixNQUFNLFdBQVcsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsbUJBQU0sRUFBRSxJQUFJLEVBQUUsZUFBRyxFQUFFLGdCQUFJLEVBQUUsb0JBQU8sRUFBRSxvQkFBTyxFQUFFLG9CQUFPLENBQUMsQ0FBQztBQUN2SCxNQUFNLGVBQWUsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxrQkFBVyxFQUFFLElBQUksRUFBRSxlQUFHLENBQUMsQ0FBQztBQUNuRyxNQUFNLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLG1CQUFNLEVBQUUsSUFBSSxFQUFFLGVBQUcsQ0FBQyxDQUFDIn0=