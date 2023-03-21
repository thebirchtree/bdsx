"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomForm = exports.ModalForm = exports.SimpleForm = exports.Form = exports.FormInput = exports.FormDropdown = exports.FormStepSlider = exports.FormSlider = exports.FormToggle = exports.FormLabel = exports.FormButton = void 0;
const event_1 = require("../event");
const packetids_1 = require("./packetids");
const packets_1 = require("./packets");
const formMaps = new Map();
// rua.kr: I could not find the internal form id counter, It seems BDS does not use the form.
//         But I set the minimum for the unexpected situation.
const MINIMUM_FORM_ID = 0x10000000;
const MAXIMUM_FORM_ID = 0x7fffffff; // 32bit signed integer maximum
const FORM_TIMEOUT = 1000 * 60 * 10; // 10min. deleting timeout if the form response is too late.
let formIdCounter = MINIMUM_FORM_ID;
class SentForm {
    constructor(networkIdentifier, resolve, reject, formOption) {
        this.networkIdentifier = networkIdentifier;
        this.resolve = resolve;
        this.reject = reject;
        this.formOption = formOption;
        // allocate id without duplication
        for (;;) {
            const id = formIdCounter++;
            if (formIdCounter >= MAXIMUM_FORM_ID)
                formIdCounter = MINIMUM_FORM_ID;
            // logically it will enter the infinity loop when it fulled. but technically it will crash by out of memory before
            if (!formMaps.has(id)) {
                formMaps.set(id, this);
                this.id = id;
                break;
            }
        }
        this.timeout = setTimeout(() => {
            formMaps.delete(this.id);
            this.reject(Error("form timeout"));
        }, FORM_TIMEOUT);
    }
}
class FormButton {
    constructor(text, imageType, imagePath = "") {
        this.text = text;
        if (imageType) {
            this.image = {
                type: imageType,
                data: imagePath,
            };
        }
    }
}
exports.FormButton = FormButton;
class FormComponent {
    constructor(text) {
        this.text = text;
    }
}
class FormLabel extends FormComponent {
    constructor(text) {
        super(text);
        this.type = "label";
    }
}
exports.FormLabel = FormLabel;
class FormToggle extends FormComponent {
    constructor(text, defaultValue) {
        super(text);
        this.type = "toggle";
        if (defaultValue)
            this.default = defaultValue;
    }
}
exports.FormToggle = FormToggle;
class FormSlider extends FormComponent {
    constructor(text, min, max, step, defaultValue) {
        super(text);
        this.type = "slider";
        this.min = min;
        this.max = max;
        if (step)
            this.step = step;
        if (defaultValue)
            this.default = defaultValue;
    }
}
exports.FormSlider = FormSlider;
class FormStepSlider extends FormComponent {
    constructor(text, steps, defaultIndex) {
        super(text);
        this.type = "step_slider";
        this.steps = steps;
        if (defaultIndex)
            this.default = defaultIndex;
    }
}
exports.FormStepSlider = FormStepSlider;
class FormDropdown extends FormComponent {
    constructor(text, options, defaultIndex) {
        super(text);
        this.type = "dropdown";
        this.options = options;
        if (defaultIndex)
            this.default = defaultIndex;
    }
}
exports.FormDropdown = FormDropdown;
class FormInput extends FormComponent {
    constructor(text, placeholder, defaultValue) {
        super(text);
        this.type = "input";
        if (placeholder)
            this.placeholder = placeholder;
        if (defaultValue)
            this.default = defaultValue;
    }
}
exports.FormInput = FormInput;
class Form {
    constructor(data) {
        this.data = data;
        this.labels = new Map();
    }
    static sendTo(target, data, opts) {
        return new Promise((resolve, reject) => {
            var _a;
            const submitted = new SentForm(target, resolve, reject, opts || {});
            const pk = packets_1.ModalFormRequestPacket.allocate();
            pk.id = submitted.id;
            if (opts != null)
                opts.id = pk.id;
            pk.content = JSON.stringify(data);
            pk.sendTo(target);
            pk.dispose();
            const formdata = data;
            if (formdata.type === "form") {
                if (formdata.buttons != null) {
                    for (const button of formdata.buttons) {
                        if (((_a = button.image) === null || _a === void 0 ? void 0 : _a.type) === "url") {
                            setTimeout(() => {
                                const pk = packets_1.SetTitlePacket.allocate();
                                pk.sendTo(target);
                                pk.dispose();
                            }, 1000);
                            break;
                        }
                    }
                }
            }
        });
    }
    sendTo(target, callback) {
        const opts = {};
        Form.sendTo(target, this.data, opts).then(res => {
            if (callback == null)
                return;
            switch (this.data.type) {
                case "form":
                    this.response = this.labels.get(res) || res;
                    break;
                case "modal":
                    this.response = res;
                    break;
                case "custom_form":
                    this.response = res;
                    if (res !== null) {
                        for (const [index, label] of this.labels) {
                            res[label] = res[index];
                        }
                    }
                    break;
            }
            callback(this, target);
        });
        return opts.id;
    }
    toJSON() {
        return this.data;
    }
}
exports.Form = Form;
(function (Form) {
    /**
     * @reference https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server-ui/formresponse#cancelationreason
     */
    let CancelationReason;
    (function (CancelationReason) {
        CancelationReason[CancelationReason["userClosed"] = 0] = "userClosed";
        CancelationReason[CancelationReason["userBusy"] = 1] = "userBusy";
    })(CancelationReason = Form.CancelationReason || (Form.CancelationReason = {}));
})(Form = exports.Form || (exports.Form = {}));
class SimpleForm extends Form {
    constructor(title = "", content = "", buttons = []) {
        super({
            type: "form",
            title,
            content,
            buttons,
        });
    }
    getTitle() {
        return this.data.title;
    }
    setTitle(title) {
        this.data.title = title;
    }
    getContent() {
        return this.data.content;
    }
    setContent(content) {
        this.data.content = content;
    }
    addButton(button, label) {
        this.data.buttons.push(button);
        if (label)
            this.labels.set(this.data.buttons.length - 1, label);
    }
    getButton(indexOrLabel) {
        if (typeof indexOrLabel === "string") {
            for (const [index, label] of this.labels) {
                if (label === indexOrLabel)
                    return this.data.buttons[index];
            }
        }
        else {
            return this.data.buttons[indexOrLabel];
        }
        return null;
    }
}
exports.SimpleForm = SimpleForm;
class ModalForm extends Form {
    constructor(title = "", content = "") {
        super({
            type: "modal",
            title,
            content,
            button1: "",
            button2: "",
        });
    }
    getTitle() {
        return this.data.title;
    }
    setTitle(title) {
        this.data.title = title;
    }
    getContent() {
        return this.data.content;
    }
    setContent(content) {
        this.data.content = content;
    }
    getButtonConfirm() {
        return this.data.button1;
    }
    setButtonConfirm(text) {
        this.data.button1 = text;
    }
    getButtonCancel() {
        return this.data.button2;
    }
    setButtonCancel(text) {
        this.data.button2 = text;
    }
}
exports.ModalForm = ModalForm;
class CustomForm extends Form {
    constructor(title = "", content = []) {
        super({
            type: "custom_form",
            title,
            content: content,
        });
    }
    getTitle() {
        return this.data.title;
    }
    setTitle(title) {
        this.data.title = title;
    }
    addComponent(component, label) {
        this.data.content.push(component);
        if (label)
            this.labels.set(this.data.content.length - 1, label);
    }
    getComponent(indexOrLabel) {
        if (typeof indexOrLabel === "string") {
            for (const [index, label] of this.labels) {
                if (label === indexOrLabel)
                    return this.data.content[index];
            }
        }
        else {
            return this.data.content[indexOrLabel];
        }
        return null;
    }
}
exports.CustomForm = CustomForm;
event_1.events.packetAfter(packetids_1.MinecraftPacketIds.ModalFormResponse).on((pk, ni) => {
    const sent = formMaps.get(pk.id);
    if (sent == null)
        return;
    if (sent.networkIdentifier !== ni)
        return; // other user is responding
    formMaps.delete(pk.id);
    sent.formOption.cancelationReason = pk.cancelationReason.value();
    const result = pk.response.value();
    sent.resolve(result == null ? null : result.value());
    clearTimeout(sent.timeout);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0NBQWtDO0FBR2xDLDJDQUFpRDtBQUNqRCx1Q0FBeUY7QUFFekYsTUFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQW9CLENBQUM7QUFFN0MsNkZBQTZGO0FBQzdGLDhEQUE4RDtBQUM5RCxNQUFNLGVBQWUsR0FBRyxVQUFVLENBQUM7QUFDbkMsTUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDLENBQUMsK0JBQStCO0FBQ25FLE1BQU0sWUFBWSxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsNERBQTREO0FBRWpHLElBQUksYUFBYSxHQUFHLGVBQWUsQ0FBQztBQUVwQyxNQUFNLFFBQVE7SUFJVixZQUNvQixpQkFBb0MsRUFDcEMsT0FBMkUsRUFDM0UsTUFBOEIsRUFDOUIsVUFBd0I7UUFIeEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxZQUFPLEdBQVAsT0FBTyxDQUFvRTtRQUMzRSxXQUFNLEdBQU4sTUFBTSxDQUF3QjtRQUM5QixlQUFVLEdBQVYsVUFBVSxDQUFjO1FBRXhDLGtDQUFrQztRQUNsQyxTQUFTO1lBQ0wsTUFBTSxFQUFFLEdBQUcsYUFBYSxFQUFFLENBQUM7WUFDM0IsSUFBSSxhQUFhLElBQUksZUFBZTtnQkFBRSxhQUFhLEdBQUcsZUFBZSxDQUFDO1lBRXRFLGtIQUFrSDtZQUNsSCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDbkIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO2dCQUNiLE1BQU07YUFDVDtTQUNKO1FBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQzNCLFFBQVEsQ0FBQyxNQUFN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