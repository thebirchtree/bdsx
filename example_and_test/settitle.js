"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/command");
const nativetype_1 = require("bdsx/nativetype");
command_1.command.register("bdsxtitle", "").overload((params, origin, output) => {
    var _a;
    const actor = origin.getEntity();
    if (!(actor === null || actor === void 0 ? void 0 : actor.isPlayer()))
        return;
    actor.setTitleDuration(20, (_a = params.duration) !== null && _a !== void 0 ? _a : 60, 20);
    actor.sendTitle(params.message);
}, {
    message: nativetype_1.CxxString,
    duration: [nativetype_1.int32_t, true],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGl0bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXR0aXRsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUF1QztBQUN2QyxnREFBcUQ7QUFFckQsaUJBQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FDdEMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFOztJQUN2QixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDakMsSUFBSSxDQUFDLENBQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLFFBQVEsRUFBRSxDQUFBO1FBQUUsT0FBTztJQUMvQixLQUFLLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLE1BQUEsTUFBTSxDQUFDLFFBQVEsbUNBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3BDLENBQUMsRUFDRDtJQUNJLE9BQU8sRUFBRSxzQkFBUztJQUNsQixRQUFRLEVBQUUsQ0FBQyxvQkFBTyxFQUFFLElBQUksQ0FBQztDQUM1QixDQUNKLENBQUMifQ==