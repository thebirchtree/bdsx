"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ability = exports.AbilitiesIndex = exports.LayeredAbilities = exports.AbilitiesLayer = exports.Abilities = void 0;
const tslib_1 = require("tslib");
const common_1 = require("../common");
const makefunc_1 = require("../makefunc");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const symbols_1 = require("./symbols");
let Abilities = class Abilities extends nativeclass_1.AbstractClass {
    getAbility(abilityIndex) {
        if (abilityIndex >= AbilitiesIndex.AbilityCount) {
            return Ability.INVALID_ABILITY;
        }
        return this.addAs(Ability, abilityIndex * Ability[makefunc_1.makefunc.size]);
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
    // unknown,
    AbilitiesIndex[AbilitiesIndex["AbilityCount"] = 19] = "AbilityCount";
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
Ability.INVALID_ABILITY = symbols_1.proc["?INVALID_ABILITY@Abilities@@2VAbility@@A"].as(Ability);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJpbGl0aWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWJpbGl0aWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxzQ0FBcUM7QUFDckMsMENBQXVDO0FBQ3ZDLGdEQUFvRztBQUNwRyw4Q0FBa0Q7QUFHbEQsdUNBQWlDO0FBRzFCLElBQU0sU0FBUyxHQUFmLE1BQU0sU0FBVSxTQUFRLDJCQUFhO0lBQ3hDLFVBQVUsQ0FBQyxZQUE0QjtRQUNuQyxJQUFJLFlBQVksSUFBSSxjQUFjLENBQUMsWUFBWSxFQUFFO1lBQzdDLE9BQU8sT0FBTyxDQUFDLGVBQWUsQ0FBQztTQUNsQztRQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsWUFBWSxHQUFHLE9BQU8sQ0FBQyxtQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUNELFVBQVUsQ0FBQyxZQUE0QixFQUFFLEtBQXVCO1FBQzVELElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELFFBQVE7UUFDSixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxRQUFRLENBQUMsWUFBNEI7UUFDakMsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsT0FBTyxDQUFDLFlBQTRCO1FBQ2hDLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELE1BQU0sQ0FBQyxjQUFjLENBQUMsWUFBNEI7UUFDOUMsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQVk7UUFDbEMsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0NBQ0osQ0FBQTtBQTFCWSxTQUFTO0lBRHJCLElBQUEseUJBQVcsRUFBQyxLQUFLLENBQUM7R0FDTixTQUFTLENBMEJyQjtBQTFCWSw4QkFBUztBQTRCdEIsSUFBWSxjQUFpQjtBQUE3QixXQUFZLGNBQWM7QUFB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