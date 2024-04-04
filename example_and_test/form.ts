import { CustomForm, Form, FormLabel } from "bdsx/bds/form";
import { command } from "bdsx/command";

command.register("form", "form example").overload(async (param, origin, output) => {
    const actor = origin.getEntity();
    if (!actor?.isPlayer()) {
        output.error("it's the command for players");
        return;
    }
    const ni = actor.getNetworkIdentifier();

    const isYes = await Form.sendTo(ni, {
        type: "modal",
        title: "Form Example",
        content: "Open more forms",
        button1: "yes",
        button2: "no",
    });
    if (isYes) {
        const res = await Form.sendTo(ni, {
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
        if (res === null) return; // x pressed

        // alternative way, the wrapper API of Form.sendTo
        const altform = new CustomForm();
        altform.setTitle("Alt Form");
        for (let i = 0; i < res.length; i++) {
            altform.addComponent(new FormLabel(`Value ${i} = ${res[i]}`));
        }
        altform.sendTo(ni);
    }
}, {});

command.register("form2", "form example").overload(async (param, origin, output) => {
    const actor = origin.getEntity();
    if (!actor?.isPlayer()) {
        output.error("it's the command for players");
        return;
    }
    const ni = actor.getNetworkIdentifier();
    const opt: Form.Options = {};
    const idx = await Form.sendTo(
        ni,
        {
            type: "form",
            title: "title",
            content: "content",
            buttons: [{ text: "button1" }, { text: "button2" }, { text: "button3" }, { text: "button4" }],
        },
        {},
    );
    if (idx === null) {
        switch (opt.cancelationReason) {
            case Form.CancelationReason.userBusy:
                console.log(`${actor.getNameTag()} is in another UI`);
                break;
            case Form.CancelationReason.userClosed:
                console.log(`${actor.getNameTag()} pressed X`);
                break;
        }
    }
    await Form.sendTo(ni, {
        type: "form",
        title: "",
        content: (idx !== null ? `button${idx + 1}` : "nothing") + " selected",
        buttons: [],
    });
}, {});
