"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abstract = exports.returnFalse = exports.returnTrue = exports.emptyFunc = exports.Encoding = exports.DeviceOS = exports.BuildPlatform = exports.AttributeName = exports.Direction = exports.CANCEL = void 0;
const colors = require("colors");
if (global.bdsx != null) {
    console.error(colors.red("[BDSX] multiple imported"));
    console.error(colors.red("First Import: " + global.bdsx));
    console.error(colors.red("Duplicated: " + __dirname));
}
global.bdsx = __dirname;
require("./polyfill");
exports.CANCEL = Symbol("CANCEL");
/**
 * Discovered by checking locator on a map
 */
var Direction;
(function (Direction) {
    let Type;
    (function (Type) {
        Type[Type["South"] = 0] = "South";
        Type[Type["West"] = 1] = "West";
        Type[Type["North"] = 2] = "North";
        Type[Type["East"] = 3] = "East";
    })(Type = Direction.Type || (Direction.Type = {}));
})(Direction = exports.Direction || (exports.Direction = {}));
var AttributeName;
(function (AttributeName) {
    AttributeName["ZombieSpawnReinforcementsChange"] = "minecraft:zombie.spawn.reinforcements";
    AttributeName["PlayerHunger"] = "minecraft:player.hunger";
    AttributeName["PlayerSaturation"] = "minecraft:player.saturation";
    AttributeName["PlayerExhaustion"] = "minecraft:player.exhaustion";
    AttributeName["PlayerLevel"] = "minecraft:player.level";
    AttributeName["PlayerExperience"] = "minecraft:player.experience";
    AttributeName["Health"] = "minecraft:health";
    AttributeName["FollowRange"] = "minecraft:follow_range";
    AttributeName["KnockbackResistance"] = "minecraft:knockback_resistance";
    AttributeName["MovementSpeed"] = "minecraft:movement";
    AttributeName["UnderwaterMovementSpeed"] = "minecraft:underwater_movement";
    AttributeName["LavaMovementSpeed"] = "minecraft:lava_movement";
    AttributeName["AttackDamage"] = "minecraft:attack_damage";
    AttributeName["Absorption"] = "minecraft:absorption";
    AttributeName["Luck"] = "minecraft:luck";
    AttributeName["JumpStrength"] = "minecraft:horse.jump_strength";
})(AttributeName = exports.AttributeName || (exports.AttributeName = {}));
// https://github.com/pmmp/BedrockProtocol/blob/master/src/types/DeviceOS.php
var BuildPlatform;
(function (BuildPlatform) {
    BuildPlatform[BuildPlatform["UNKNOWN"] = -1] = "UNKNOWN";
    BuildPlatform[BuildPlatform["ANDROID"] = 1] = "ANDROID";
    BuildPlatform[BuildPlatform["IOS"] = 2] = "IOS";
    BuildPlatform[BuildPlatform["OSX"] = 3] = "OSX";
    BuildPlatform[BuildPlatform["AMAZON"] = 4] = "AMAZON";
    BuildPlatform[BuildPlatform["GEAR_VR"] = 5] = "GEAR_VR";
    BuildPlatform[BuildPlatform["HOLOLENS"] = 6] = "HOLOLENS";
    BuildPlatform[BuildPlatform["WINDOWS_10"] = 7] = "WINDOWS_10";
    BuildPlatform[BuildPlatform["WIN32"] = 8] = "WIN32";
    BuildPlatform[BuildPlatform["DEDICATED"] = 9] = "DEDICATED";
    BuildPlatform[BuildPlatform["TVOS"] = 10] = "TVOS";
    BuildPlatform[BuildPlatform["PLAYSTATION"] = 11] = "PLAYSTATION";
    BuildPlatform[BuildPlatform["NINTENDO"] = 12] = "NINTENDO";
    BuildPlatform[BuildPlatform["XBOX"] = 13] = "XBOX";
    BuildPlatform[BuildPlatform["WINDOWS_PHONE"] = 14] = "WINDOWS_PHONE";
})(BuildPlatform = exports.BuildPlatform || (exports.BuildPlatform = {}));
/** @deprecated use {@link BuildPlatform}, matching to official name */
exports.DeviceOS = BuildPlatform;
var Encoding;
(function (Encoding) {
    Encoding[Encoding["Utf16"] = -2] = "Utf16";
    Encoding[Encoding["Buffer"] = -1] = "Buffer";
    Encoding[Encoding["Utf8"] = 0] = "Utf8";
    Encoding[Encoding["None"] = 1] = "None";
    Encoding[Encoding["Ansi"] = 2] = "Ansi";
})(Encoding = exports.Encoding || (exports.Encoding = {}));
function emptyFunc() {
    // empty
}
exports.emptyFunc = emptyFunc;
function returnTrue() {
    return true;
}
exports.returnTrue = returnTrue;
function returnFalse() {
    return false;
}
exports.returnFalse = returnFalse;
function abstract() {
    throw Error("abstract");
}
exports.abstract = abstract;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUFpQztBQUVqQyxJQUFLLE1BQWMsQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFO0lBQzlCLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7SUFDdEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFJLE1BQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ25FLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQztDQUN6RDtBQUNBLE1BQWMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO0FBR2pDLHNCQUFvQjtBQUVQLFFBQUEsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUd2Qzs7R0FFRztBQUNILElBQWlCLFNBQVMsQ0FPekI7QUFQRCxXQUFpQixTQUFTO0lBQ3RCLElBQVksSUFLWDtJQUxELFdBQVksSUFBSTtRQUNaLGlDQUFTLENBQUE7UUFDVCwrQkFBUSxDQUFBO1FBQ1IsaUNBQVMsQ0FBQTtRQUNULCtCQUFRLENBQUE7SUFDWixDQUFDLEVBTFcsSUFBSSxHQUFKLGNBQUksS0FBSixjQUFJLFFBS2Y7QUFDTCxDQUFDLEVBUGdCLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBT3pCO0FBRUQsSUFBWSxhQWlCWDtBQWpCRCxXQUFZLGFBQWE7SUFDckIsMEZBQXlFLENBQUE7SUFDekUseURBQXdDLENBQUE7SUFDeEMsaUVBQWdELENBQUE7SUFDaEQsaUVBQWdELENBQUE7SUFDaEQsdURBQXNDLENBQUE7SUFDdEMsaUVBQWdELENBQUE7SUFDaEQsNENBQTJCLENBQUE7SUFDM0IsdURBQXNDLENBQUE7SUFDdEMsdUVBQXNELENBQUE7SUFDdEQscURBQW9DLENBQUE7SUFDcEMsMEVBQXlELENBQUE7SUFDekQsOERBQTZDLENBQUE7SUFDN0MseURBQXdDLENBQUE7SUFDeEMsb0RBQW1DLENBQUE7SUFDbkMsd0NBQXVCLENBQUE7SUFDdkIsK0RBQThDLENBQUE7QUFDbEQsQ0FBQyxFQWpCVyxhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQWlCeEI7QUFFRCw2RUFBNkU7QUFDN0UsSUFBWSxhQWdCWDtBQWhCRCxXQUFZLGFBQWE7SUFDckIsd0RBQVksQ0FBQTtJQUNaLHVEQUFXLENBQUE7SUFDWCwrQ0FBTyxDQUFBO0lBQ1AsK0NBQU8sQ0FBQTtJQUNQLHFEQUFVLENBQUE7SUFDVix1REFBVyxDQUFBO0lBQ1gseURBQVksQ0FBQTtJQUNaLDZEQUFjLENBQUE7SUFDZCxtREFBUyxDQUFBO0lBQ1QsMkRBQWEsQ0FBQTtJQUNiLGtEQUFTLENBQUE7SUFDVCxnRUFBZ0IsQ0FBQTtJQUNoQiwwREFBYSxDQUFBO0lBQ2Isa0RBQVMsQ0FBQTtJQUNULG9FQUFrQixDQUFBO0FBQ3RCLENBQUMsRUFoQlcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFnQnhCO0FBR0QsdUVBQXVFO0FBQzFELFFBQUEsUUFBUSxHQUFHLGFBQWEsQ0FBQztBQUV0QyxJQUFZLFFBTVg7QUFORCxXQUFZLFFBQVE7SUFDaEIsMENBQVUsQ0FBQTtJQUNWLDRDQUFXLENBQUE7SUFDWCx1Q0FBUSxDQUFBO0lBQ1IsdUNBQUksQ0FBQTtJQUNKLHVDQUFJLENBQUE7QUFDUixDQUFDLEVBTlcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFNbkI7QUF5QkQsU0FBZ0IsU0FBUztJQUNyQixRQUFRO0FBQ1osQ0FBQztBQUZELDhCQUVDO0FBRUQsU0FBZ0IsVUFBVTtJQUN0QixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBRkQsZ0NBRUM7QUFFRCxTQUFnQixXQUFXO0lBQ3ZCLE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFGRCxrQ0FFQztBQUVELFNBQWdCLFFBQVE7SUFDcEIsTUFBTSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQUZELDRCQUVDIn0=