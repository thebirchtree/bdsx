"use strict";
// import { abstract } from "../common";
// import { nativeClass, NativeClass, nativeField } from "../nativeclass";
// import { bool_t, int32_t, NativeType, uint32_t, void_t } from "../nativetype";
// import { procHacker } from "./proc";
var MobEffectInstance_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobEffectInstance = exports.MobEffect = exports.MobEffectIds = void 0;
const tslib_1 = require("tslib");
const common_1 = require("../common");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const hashedstring_1 = require("./hashedstring");
var MobEffectIds;
(function (MobEffectIds) {
    MobEffectIds[MobEffectIds["Empty"] = 0] = "Empty";
    MobEffectIds[MobEffectIds["Speed"] = 1] = "Speed";
    MobEffectIds[MobEffectIds["Slowness"] = 2] = "Slowness";
    MobEffectIds[MobEffectIds["Haste"] = 3] = "Haste";
    MobEffectIds[MobEffectIds["MiningFatigue"] = 4] = "MiningFatigue";
    MobEffectIds[MobEffectIds["Strength"] = 5] = "Strength";
    MobEffectIds[MobEffectIds["InstantHealth"] = 6] = "InstantHealth";
    MobEffectIds[MobEffectIds["InstantDamage"] = 7] = "InstantDamage";
    MobEffectIds[MobEffectIds["JumpBoost"] = 8] = "JumpBoost";
    MobEffectIds[MobEffectIds["Nausea"] = 9] = "Nausea";
    MobEffectIds[MobEffectIds["Regeneration"] = 10] = "Regeneration";
    MobEffectIds[MobEffectIds["Resistance"] = 11] = "Resistance";
    MobEffectIds[MobEffectIds["FireResistant"] = 12] = "FireResistant";
    MobEffectIds[MobEffectIds["WaterBreathing"] = 13] = "WaterBreathing";
    MobEffectIds[MobEffectIds["Invisibility"] = 14] = "Invisibility";
    MobEffectIds[MobEffectIds["Blindness"] = 15] = "Blindness";
    MobEffectIds[MobEffectIds["NightVision"] = 16] = "NightVision";
    MobEffectIds[MobEffectIds["Hunger"] = 17] = "Hunger";
    MobEffectIds[MobEffectIds["Weakness"] = 18] = "Weakness";
    MobEffectIds[MobEffectIds["Poison"] = 19] = "Poison";
    MobEffectIds[MobEffectIds["Wither"] = 20] = "Wither";
    MobEffectIds[MobEffectIds["HealthBoost"] = 21] = "HealthBoost";
    MobEffectIds[MobEffectIds["Absorption"] = 22] = "Absorption";
    MobEffectIds[MobEffectIds["Saturation"] = 23] = "Saturation";
    MobEffectIds[MobEffectIds["Levitation"] = 24] = "Levitation";
    MobEffectIds[MobEffectIds["FatalPoison"] = 25] = "FatalPoison";
    MobEffectIds[MobEffectIds["ConduitPower"] = 26] = "ConduitPower";
    MobEffectIds[MobEffectIds["SlowFalling"] = 27] = "SlowFalling";
    MobEffectIds[MobEffectIds["BadOmen"] = 28] = "BadOmen";
    MobEffectIds[MobEffectIds["HeroOfTheVillage"] = 29] = "HeroOfTheVillage";
})(MobEffectIds = exports.MobEffectIds || (exports.MobEffectIds = {}));
let MobEffect = class MobEffect extends nativeclass_1.NativeClass {
    // @nativeField(VoidPointer, 0xF8) // std::vector<std::pair<Attribute const*,std::shared_ptr<AttributeModifier>>>
    // attributeModifiers: CxxVector<CxxPair<Attribute.ref(), CxxSharedPtr<AttributeModifier>>;
    /**
     * @deprecated
     */
    static constructWith(id) {
        (0, common_1.abstract)();
    }
    /**
     * @remark DO NOT DESTRUCT
     */
    static create(id) {
        (0, common_1.abstract)();
    }
    getId() {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t, 0x08)
], MobEffect.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], MobEffect.prototype, "harmful", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString, 0x20)
], MobEffect.prototype, "descriptionId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], MobEffect.prototype, "icon", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], MobEffect.prototype, "durationModifier", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t) // 0x48
], MobEffect.prototype, "disabled", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString, 0x50)
], MobEffect.prototype, "resourceName", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], MobEffect.prototype, "iconName", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], MobEffect.prototype, "showParticles", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(hashedstring_1.HashedString, 0x98)
], MobEffect.prototype, "componentName", void 0);
MobEffect = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], MobEffect);
exports.MobEffect = MobEffect;
let MobEffectInstance = MobEffectInstance_1 = class MobEffectInstance extends nativeclass_1.NativeClass {
    /**
     * @param duration How many ticks will the effect last (one tick = 0.05s)
     */
    static create(id, duration = 600, amplifier = 0, ambient = false, showParticles = true, displayAnimation = false) {
        const effect = new MobEffectInstance_1(true);
        effect._create(id, duration, amplifier, ambient, showParticles, displayAnimation);
        return effect;
    }
    _create(id, duration, amplifier, ambient, showParticles, displayAnimation) {
        (0, common_1.abstract)();
    }
    getSplashDuration() {
        return this.duration * 0.75;
    }
    getLingerDuration() {
        return this.duration * 0.25;
    }
    getAmplifier() {
        (0, common_1.abstract)();
    }
    _getComponentName() {
        (0, common_1.abstract)();
    }
    getComponentName() {
        return this._getComponentName().str;
    }
    save() {
        const tag = this.allocateAndSave();
        const out = tag.value();
        tag.dispose();
        return out;
    }
    allocateAndSave() {
        (0, common_1.abstract)();
    }
    load(tag) {
        (0, common_1.abstract)();
    }
    static load(tag) {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], MobEffectInstance.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], MobEffectInstance.prototype, "duration", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], MobEffectInstance.prototype, "durationEasy", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], MobEffectInstance.prototype, "durationNormal", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], MobEffectInstance.prototype, "durationHard", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], MobEffectInstance.prototype, "amplifier", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], MobEffectInstance.prototype, "displayAnimation", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], MobEffectInstance.prototype, "ambient", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], MobEffectInstance.prototype, "noCounter", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], MobEffectInstance.prototype, "showParticles", void 0);
MobEffectInstance = MobEffectInstance_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x80)
], MobEffectInstance);
exports.MobEffectInstance = MobEffectInstance;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVmZmVjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdDQUF3QztBQUN4QywwRUFBMEU7QUFDMUUsaUZBQWlGO0FBQ2pGLHVDQUF1Qzs7Ozs7QUFFdkMsc0NBQXFDO0FBQ3JDLGdEQUF1RTtBQUN2RSw4Q0FBZ0Y7QUFDaEYsaURBQThDO0FBRzlDLElBQVksWUErQlg7QUEvQkQsV0FBWSxZQUFZO0lBQ3BCLGlEQUFLLENBQUE7SUFDTCxpREFBSyxDQUFBO0lBQ0wsdURBQVEsQ0FBQTtJQUNSLGlEQUFLLENBQUE7SUFDTCxpRUFBYSxDQUFBO0lBQ2IsdURBQVEsQ0FBQTtJQUNSLGlFQUFhLENBQUE7SUFDYixpRUFBYSxDQUFBO0lBQ2IseURBQVMsQ0FBQTtJQUNULG1EQUFNLENBQUE7SUFDTixnRUFBWSxDQUFBO0lBQ1osNERBQVUsQ0FBQTtJQUNWLGtFQUFhLENBQUE7SUFDYixvRUFBYyxDQUFBO0lBQ2QsZ0VBQVksQ0FBQTtJQUNaLDBEQUFTLENBQUE7SUFDVCw4REFBVyxDQUFBO0lBQ1gsb0RBQU0sQ0FBQTtJQUNOLHdEQUFRLENBQUE7SUFDUixvREFBTSxDQUFBO0lBQ04sb0RBQU0sQ0FBQTtJQUNOLDhEQUFXLENBQUE7SUFDWCw0REFBVSxDQUFBO0lBQ1YsNERBQVUsQ0FBQTtJQUNWLDREQUFVLENBQUE7SUFDViw4REFBVyxDQUFBO0lBQ1gsZ0VBQVksQ0FBQTtJQUNaLDhEQUFXLENBQUE7SUFDWCxzREFBTyxDQUFBO0lBQ1Asd0VBQWdCLENBQUE7QUFDcEIsQ0FBQyxFQS9CVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQStCdkI7QUFHTSxJQUFNLFNBQVMsR0FBZixNQUFNLFNBQVUsU0FBUSx5QkFBVztJQXVCdEMsaUhBQWlIO0lBQ2pILDJGQUEyRjtJQUUzRjs7T0FFRztJQUNILE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBZ0I7UUFDakMsSUFBQSxpQkFBUSxH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