"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const form_1 = require("bdsx/bds/form");
const command_1 = require("bdsx/command");
command_1.command.register("form", "form example").overload(async (param, origin, output) => {
    const actor = origin.getEntity();
    if (!(actor === null || actor === void 0 ? void 0 : actor.isPlayer())) {
        output.error("it's the command for players");
        return;
    }
    const ni = actor.getNetworkIdentifier();
    const isYes = await form_1.Form.sendTo(ni, {
        type: "modal",
        title: "Form Example",
        content: "Open more forms",
        button1: "yes",
        button2: "no",
    });
    if (isYes) {
        const res = await form_1.Form.sendTo(ni, {
            type: "custom_form",
            title: "Form Example",
            content: [
                {
                    type: "label",
                    text: "label",
                },
                {
                    type: "toggle",
                    text: "toggle",
                    default: true,
                },
                {
                    type: "slider",
                    text: "slider",
                    min: 0,
                    max: 10,
                    default: 6,
                    step: 2,
                },
                {
                    type: "step_slider",
                    text: "step_slider",
                    steps: ["step0", "step1", "step2"],
                    default: 1,
                },
                {
                    type: "dropdown",
                    text: "dropdown",
                    options: ["dropdown0", "dropdown1", "dropdown2"],
                    default: 1,
                },
                {
                    type: "input",
                    text: "input",
                    placeholder: "placeholder",
                    default: "deftext",
                },
            ],
        });
        if (res === null)
            return; // x pressed
        // alternative way, the wrapper API of Form.sendTo
        const altform = new form_1.CustomForm();
        altform.setTitle("Alt Form");
        for (let i = 0; i < res.length; i++) {
            altform.addComponent(new form_1.FormLabel(`Value ${i} = ${res[i]}`));
        }
        altform.sendTo(ni);
    }
}, {});
command_1.command.register("form2", "form example").overload(async (param, origin, output) => {
    const actor = origin.getEntity();
    if (!(actor === null || actor === void 0 ? void 0 : actor.isPlayer())) {
        output.error("it's the command for players");
        return;
    }
    const ni = actor.getNetworkIdentifier();
    const opt = {};
    const idx = await form_1.Form.sendTo(ni, {
        type: "form",
        title: "title",
        content: "content",
        buttons: [{ text: "button1" }, { text: "button2" }, { text: "button3" }, { text: "button4" }],
    }, {});
    if (idx === null) {
        switch (opt.cancelationReason) {
            case form_1.Form.CancelationReason.userBusy:
                console.log(`${actor.getNameTag()} is in another UI`);
                break;
            case form_1.Form.CancelationReason.userClosed:
                console.log(`${actor.getNameTag()} pressed X`);
                break;
        }
    }
    await form_1.Form.sendTo(ni, {
        type: "form",
        title: "",
        content: (idx !== null ? `button${idx + 1}` : "nothing") + " selected",
        buttons: [],
    });
}, {});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBNEQ7QUFDNUQsMENBQXVDO0FBRXZDLGlCQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDOUUsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2pDLElBQUksQ0FBQyxDQUFBLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxRQUFRLEVBQUUsQ0FBQSxFQUFFO1FBQ3BCLE1BQU0sQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUM3QyxPQUFPO0tBQ1Y7SUFDRCxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUV4QyxNQUFNLEtBQUssR0FBRyxNQUFNLFdBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFO1FBQ2hDLElBQUksRUFBRSxPQUFPO1FBQ2IsS0FBSyxFQUFFLGNBQWM7UUFDckIsT0FBTyxFQUFFLGlCQUFpQjtRQUMxQixPQUFPLEVBQUUsS0FBSztRQUNkLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUMsQ0FBQztJQUNILElBQUksS0FBSyxFQUFFO1FBQ1AsTUFBTSxHQUFHLEdBQUcsTUFBTSxXQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUM5QixJQUFJLEVBQUUsYUFBYTtZQUNuQixLQUFLLEVBQUUsY0FBYztZQUNyQixPQUFPLEVBQUU7Z0JBQ0w7b0JBQ0ksSUFBSSxFQUFFLE9BQU87b0JBQ2IsSUFBSSxFQUFFLE9BQU87aUJBQ2hCO2dCQUNEO29CQUNJLElBQUksRUFBRSxRQUFRO29CQUNkLElBQUksRUFBRSxRQUFRO29CQUNkLE9BQU8sRUFBRSxJQUFJO2lCQUNoQjtnQkFDRDtvQkFD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