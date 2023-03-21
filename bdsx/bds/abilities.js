"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ability = exports.AbilitiesIndex = exports.LayeredAbilities = exports.AbilitiesLayer = exports.Abilities = void 0;
const tslib_1 = require("tslib");
const common_1 = require("../common");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
let Abilities = class Abilities extends nativeclass_1.AbstractClass {
    getAbility(abilityIndex) {
        (0, common_1.abstract)();
    }
    setAbility(abilityIndex, value) {
        (0, common_1.abstract)();
    }
    isFlying() {
        (0, common_1.abstract)();
    }
    getFloat(abilityIndex) {
        (0, common_1.abstract)();
    }
    getBool(abilityIndex) {
        (0, common_1.abstract)();
    }
    static getAbilityName(abilityIndex) {
        (0, common_1.abstract)();
    }
    static nameToAbilityIndex(name) {
        (0, common_1.abstract)();
    }
};
Abilities = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x140)
], Abilities);
exports.Abilities = Abilities;
var AbilitiesLayer;
(function (AbilitiesLayer) {
})(AbilitiesLayer = exports.AbilitiesLayer || (exports.AbilitiesLayer = {}));
// TODO: fill
let LayeredAbilities = class LayeredAbilities extends nativeclass_1.AbstractClass {
    getLayer(layer) {
        (0, common_1.abstract)();
    }
    _setAbility(abilityIndex, value) {
        (0, common_1.abstract)();
    }
    /**
     * Returns the command permission level of the ability owner
     */
    getCommandPermissions() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the player permission level of the ability owner
     */
    getPlayerPermissions() {
        (0, common_1.abstract)();
    }
    /**
     * Changes the command permission level of the ability owner
     */
    setCommandPermissions(commandPermissionLevel) {
        (0, common_1.abstract)();
    }
    /**
     * Changes the player permission level of the ability owner
     */
    setPlayerPermissions(playerPermissionLevel) {
        (0, common_1.abstract)();
    }
    /**
     * Returns the command permission level of the ability owner
     * @deprecated use getCommandPermissions, use the native function name
     */
    getCommandPermissionLevel() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the player permission level of the ability owner
     * @deprecated use getPlayerPermissions, use the native function name
     */
    getPlayerPermissionLevel() {
        (0, common_1.abstract)();
    }
    /**
     * Changes the command permission level of the ability owner
     * @deprecated use setCommandPermissions, use the native function name
     */
    setCommandPermissionLevel(commandPermissionLevel) {
        (0, common_1.abstract)();
    }
    /**
     * Changes the player permission level of the ability owner
     * @deprecated use setPlayerPermissions, use the native function name
     */
    setPlayerPermissionLevel(playerPermissionLevel) {
        (0, common_1.abstract)();
    }
    getAbility(abilityLayer, abilityIndex) {
        (0, common_1.abstract)();
    }
    setAbility(abilityIndex, value) {
        (0, common_1.abstract)();
    }
    isFlying() {
        (0, common_1.abstract)();
    }
    getFloat(abilityIndex) {
        (0, common_1.abstract)();
    }
    getBool(abilityIndex) {
        (0, common_1.abstract)();
    }
};
LayeredAbilities = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], LayeredAbilities);
exports.LayeredAbilities = LayeredAbilities;
var AbilitiesIndex;
(function (AbilitiesIndex) {
    AbilitiesIndex[AbilitiesIndex["Build"] = 0] = "Build";
    AbilitiesIndex[AbilitiesIndex["Mine"] = 1] = "Mine";
    AbilitiesIndex[AbilitiesIndex["DoorsAndSwitches"] = 2] = "DoorsAndSwitches";
    AbilitiesIndex[AbilitiesIndex["OpenContainers"] = 3] = "OpenContainers";
    AbilitiesIndex[AbilitiesIndex["AttackPlayers"] = 4] = "AttackPlayers";
    AbilitiesIndex[AbilitiesIndex["AttackMobs"] = 5] = "AttackMobs";
    AbilitiesIndex[AbilitiesIndex["OperatorCommands"] = 6] = "OperatorCommands";
    AbilitiesIndex[AbilitiesIndex["Teleport"] = 7] = "Teleport";
    /** Both are 8 */
    AbilitiesIndex[AbilitiesIndex["ExposedAbilityCount"] = 8] = "ExposedAbilityCount";
    AbilitiesIndex[AbilitiesIndex["Invulnerable"] = 8] = "Invulnerable";
    AbilitiesIndex[AbilitiesIndex["Flying"] = 9] = "Flying";
    AbilitiesIndex[AbilitiesIndex["MayFly"] = 10] = "MayFly";
    AbilitiesIndex[AbilitiesIndex["Instabuild"] = 11] = "Instabuild";
    AbilitiesIndex[AbilitiesIndex["Lightning"] = 12] = "Lightning";
    AbilitiesIndex[AbilitiesIndex["FlySpeed"] = 13] = "FlySpeed";
    AbilitiesIndex[AbilitiesIndex["WalkSpeed"] = 14] = "WalkSpeed";
    AbilitiesIndex[AbilitiesIndex["Muted"] = 15] = "Muted";
    AbilitiesIndex[AbilitiesIndex["WorldBuilder"] = 16] = "WorldBuilder";
    AbilitiesIndex[AbilitiesIndex["NoClip"] = 17] = "NoClip";
    AbilitiesIndex[AbilitiesIndex["AbilityCount"] = 18] = "AbilityCount";
})(AbilitiesIndex = exports.AbilitiesIndex || (exports.AbilitiesIndex = {}));
class Ability extends nativeclass_1.NativeClass {
    getBool() {
        (0, common_1.abstract)();
    }
    getFloat() {
        (0, common_1.abstract)();
    }
    setBool(value) {
        (0, common_1.abstract)();
    }
    setFloat(value) {
        this.type = Ability.Type.Float;
        this.setFloat32(value, 0x04);
    }
    getValue() {
        switch (this.type) {
            case Ability.Type.Unset:
                return undefined;
            case Ability.Type.Bool:
                return this.getBool();
            case Ability.Type.Float:
                return this.getFloat();
            default:
                throw Error(`invalid Ability.type, ${this.type}`);
        }
    }
    setValue(value) {
        switch (typeof value) {
            case "boolean":
                this.setBool(value);
                break;
            case "number":
                this.setFloat(value);
                break;
        }
    }
}
exports.Ability = Ability;
(function (Ability) {
    let Type;
    (function (Type) {
        Type[Type["Invalid"] = 0] = "Invalid";
        Type[Type["Unset"] = 1] = "Unset";
        Type[Type["Bool"] = 2] = "Bool";
        Type[Type["Float"] = 3] = "Float";
    })(Type = Ability.Type || (Ability.Type = {}));
    let Options;
    (function (Options) {
        Options[Options["None"] = 0] = "None";
        Options[Options["NoSave"] = 1] = "NoSave";
        Options[Options["CommandExposed"] = 2] = "CommandExposed";
        Options[Options["PermissionsInterfaceExposed"] = 4] = "PermissionsInterfaceExposed";
        Options[Options["WorldbuilderOverrides"] = 8] = "WorldbuilderOverrides";
        Options[Options["NoSaveCommandExposed"] = 3] = "NoSaveCommandExposed";
        Options[Options["NoSavePermissionsInterfaceExposed"] = 5] = "NoSavePermissionsInterfaceExposed";
        Options[Options["CommandExposedPermissionsInterfaceExposed"] = 6] = "CommandExposedPermissionsInterfaceExposed";
        Options[Options["NoSaveCommandExposedPermissionsInterfaceExposed"] = 7] = "NoSaveCommandExposedPermissionsInterfaceExposed";
        Options[Options["NoSaveWorldbuilderOverrides"] = 9] = "NoSaveWorldbuilderOverrides";
        Options[Options["CommandExposedWorldbuilderOverrides"] = 10] = "CommandExposedWorldbuilderOverrides";
        Options[Options["NoSaveCommandExposedWorldbuilderOverrides"] = 11] = "NoSaveCommandExposedWorldbuilderOverrides";
        Options[Options["PermissionsInterfaceExposedWorldbuilderOverrides"] = 12] = "PermissionsInterfaceExposedWorldbuilderOverrides";
        Options[Options["NoSavePermissionsInterfaceExposedWorldbuilderOverrides"] = 13] = "NoSavePermissionsInterfaceExposedWorldbuilderOverrides";
        Options[Options["CommandExposedPermissionsInterfaceExposedWorldbuilderOverrides"] = 14] = "CommandExposedPermissionsInterfaceExposedWorldbuilderOverrides";
        Options[Options["All"] = 15] = "All";
    })(Options = Ability.Options || (Ability.Options = {}));
    let Value = class Value extends nativeclass_1.NativeStruct {
    };
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.bool_t, { ghost: true })
    ], Value.prototype, "boolVal", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
    ], Value.prototype, "floatVal", void 0);
    Value = tslib_1.__decorate([
        (0, nativeclass_1.nativeClass)()
    ], Value);
    Ability.Value = Value;
})(Ability = exports.Ability || (exports.Ability = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJpbGl0aWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWJpbGl0aWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxzQ0FBcUM7QUFDckMsZ0RBQW9HO0FBQ3BHLDhDQUFrRDtBQUszQyxJQUFNLFNBQVMsR0FBZixNQUFNLFNBQVUsU0FBUSwyQkFBYTtJQUN4QyxVQUFVLENBQUMsWUFBNEI7UUFDbkMsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsVUFBVSxDQUFDLFlBQTRCLEVBQUUsS0FBdUI7UUFDNUQsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsUUFBUTtRQUNKLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELFFBQVEsQ0FBQyxZQUE0QjtRQUNqQyxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxPQUFPLENBQUMsWUFBNEI7UUFDaEMsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxZQUE0QjtRQUM5QyxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBWTtRQUNsQyxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7Q0FDSixDQUFBO0FBdkJZLFNBQVM7SUFEckIsSUFBQSx5QkFBVyxFQUFDLEtBQUssQ0FBQztHQUNOLFNBQVMsQ0F1QnJCO0FBdkJZLDhCQUFTO0FBeUJ0QixJQUFZLGNBQWlCO0FBQTdCLFdBQVksY0FBYztBQUFFLENBQUMsRUFBakIsY0FBYyxHQUFkLHNCQUFjLEtBQWQsc0JBQWMsUUFBRztBQUM3QixhQUFhO0FBR04sSUFBTSxnQkFBZ0IsR0FBdEIsTUFBTSxnQkFBaUIsU0FBUSwyQkFBYTtJQUMvQyxRQUFRLENBQUMsS0FBcUI7UUFDMUIsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ1MsV0FB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