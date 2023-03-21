"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeInstanceHandle = exports.BaseAttributeMap = exports.AttributeInstance = exports.AttributeId = void 0;
const tslib_1 = require("tslib");
const common_1 = require("../common");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
// public: static class Attribute const
var AttributeId;
(function (AttributeId) {
    AttributeId[AttributeId["PlayerHunger"] = 1] = "PlayerHunger";
    AttributeId[AttributeId["PlayerSaturation"] = 2] = "PlayerSaturation";
    AttributeId[AttributeId["PlayerExhaustion"] = 3] = "PlayerExhaustion";
    AttributeId[AttributeId["PlayerLevel"] = 4] = "PlayerLevel";
    AttributeId[AttributeId["PlayerExperience"] = 5] = "PlayerExperience";
    AttributeId[AttributeId["ZombieSpawnReinforcementsChange"] = 6] = "ZombieSpawnReinforcementsChange";
    AttributeId[AttributeId["Health"] = 7] = "Health";
    AttributeId[AttributeId["FollowRange"] = 8] = "FollowRange";
    AttributeId[AttributeId["KnockbackResistance"] = 9] = "KnockbackResistance";
    AttributeId[AttributeId["MovementSpeed"] = 10] = "MovementSpeed";
    AttributeId[AttributeId["UnderwaterMovementSpeed"] = 11] = "UnderwaterMovementSpeed";
    AttributeId[AttributeId["LavaMovementSpeed"] = 12] = "LavaMovementSpeed";
    AttributeId[AttributeId["AttackDamage"] = 13] = "AttackDamage";
    AttributeId[AttributeId["Absorption"] = 14] = "Absorption";
    AttributeId[AttributeId["Luck"] = 15] = "Luck";
    AttributeId[AttributeId["JumpStrength"] = 16] = "JumpStrength";
})(AttributeId = exports.AttributeId || (exports.AttributeId = {}));
class AttributeInstance extends nativeclass_1.AbstractClass {
}
exports.AttributeInstance = AttributeInstance;
class BaseAttributeMap extends nativeclass_1.AbstractClass {
    getMutableInstance(type) {
        (0, common_1.abstract)();
    }
}
exports.BaseAttributeMap = BaseAttributeMap;
let AttributeInstanceHandle = class AttributeInstanceHandle extends nativeclass_1.AbstractClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], AttributeInstanceHandle.prototype, "attributeId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(BaseAttributeMap.ref(), 0x08)
], AttributeInstanceHandle.prototype, "attributeMap", void 0);
AttributeInstanceHandle = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], AttributeInstanceHandle);
exports.AttributeInstanceHandle = AttributeInstanceHandle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXR0cmlidXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxzQ0FBcUM7QUFFckMsZ0RBQXlFO0FBQ3pFLDhDQUFvRDtBQUVwRCx1Q0FBdUM7QUFDdkMsSUFBWSxXQWlCWDtBQWpCRCxXQUFZLFdBQVc7SUFDbkIsNkRBQWdCLENBQUE7SUFDaEIscUVBQW9CLENBQUE7SUFDcEIscUVBQW9CLENBQUE7SUFDcEIsMkRBQWUsQ0FBQTtJQUNmLHFFQUFvQixDQUFBO0lBQ3BCLG1HQUFtQyxDQUFBO0lBQ25DLGlEQUFVLENBQUE7SUFDViwyREFBZSxDQUFBO0lBQ2YsMkVBQXVCLENBQUE7SUFDdkIsZ0VBQWtCLENBQUE7SUFDbEIsb0ZBQTRCLENBQUE7SUFDNUIsd0VBQXNCLENBQUE7SUFDdEIsOERBQWlCLENBQUE7SUFDakIsMERBQWUsQ0FBQTtJQUNmLDhDQUFTLENBQUE7SUFDVCw4REFBaUIsQ0FBQTtBQUNyQixDQUFDLEVBakJXLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBaUJ0QjtBQUVELE1BQWEsaUJBQWtCLFNBQVEsMkJBQWE7Q0FRbkQ7QUFSRCw4Q0FRQztBQUNELE1BQWEsZ0JBQWlCLFNBQVEsMkJBQWE7SUFDL0Msa0JBQWtCLENBQUMsSUFBaUI7UUFDaEMsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0NBQ0o7QUFKRCw0Q0FJQztBQUVNLElBQU0sdUJBQXVCLEdBQTdCLE1BQU0sdUJBQXdCLFNBQVEsMkJBQWE7Q0FLekQsQ0FBQTtBQUhHO0lBREMsSUFBQSx5QkFBVyxFQUFDLHFCQUFRLENBQUM7NERBQ0c7QUFFekI7SUFEQyxJQUFBLHlCQUFXLEVBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDOzZEQUNYO0FBSnRCLHVCQUF1QjtJQURuQyxJQUFBLHlCQUFXLEdBQUU7R0FDRCx1QkFBdUIsQ0FLbkM7QUFMWSwwREFBdUIifQ==