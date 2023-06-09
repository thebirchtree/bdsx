"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnchantUtils = exports.ItemEnchants = exports.EnchantmentInstance = exports.EnchantmentNames = exports.Enchant = void 0;
const tslib_1 = require("tslib");
const common_1 = require("../common");
const cxxvector_1 = require("../cxxvector");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
var Enchant;
(function (Enchant) {
    let Type;
    (function (Type) {
        Type[Type["ArmorAll"] = 0] = "ArmorAll";
        Type[Type["ArmorFire"] = 1] = "ArmorFire";
        Type[Type["ArmorFall"] = 2] = "ArmorFall";
        Type[Type["ArmorExplosive"] = 3] = "ArmorExplosive";
        Type[Type["ArmorProjectile"] = 4] = "ArmorProjectile";
        Type[Type["ArmorThorns"] = 5] = "ArmorThorns";
        Type[Type["WaterBreath"] = 6] = "WaterBreath";
        Type[Type["WaterSpeed"] = 7] = "WaterSpeed";
        Type[Type["WaterAffinity"] = 8] = "WaterAffinity";
        Type[Type["WeaponDamage"] = 9] = "WeaponDamage";
        Type[Type["WeaponUndead"] = 10] = "WeaponUndead";
        Type[Type["WeaponArthropod"] = 11] = "WeaponArthropod";
        Type[Type["WeaponKnockback"] = 12] = "WeaponKnockback";
        Type[Type["WeaponFire"] = 13] = "WeaponFire";
        Type[Type["WeaponLoot"] = 14] = "WeaponLoot";
        Type[Type["MiningEfficiency"] = 15] = "MiningEfficiency";
        Type[Type["MiningSilkTouch"] = 16] = "MiningSilkTouch";
        Type[Type["MiningDurability"] = 17] = "MiningDurability";
        Type[Type["MiningLoot"] = 18] = "MiningLoot";
        Type[Type["BowDamage"] = 19] = "BowDamage";
        Type[Type["BowKnockback"] = 20] = "BowKnockback";
        Type[Type["BowFire"] = 21] = "BowFire";
        Type[Type["BowInfinity"] = 22] = "BowInfinity";
        Type[Type["FishingLoot"] = 23] = "FishingLoot";
        Type[Type["FishingLure"] = 24] = "FishingLure";
        Type[Type["FrostWalker"] = 25] = "FrostWalker";
        Type[Type["Mending"] = 26] = "Mending";
        Type[Type["CurseBinding"] = 27] = "CurseBinding";
        Type[Type["CurseVanishing"] = 28] = "CurseVanishing";
        Type[Type["TridentImpaling"] = 29] = "TridentImpaling";
        Type[Type["TridentRiptide"] = 30] = "TridentRiptide";
        Type[Type["TridentLoyalty"] = 31] = "TridentLoyalty";
        Type[Type["TridentChanneling"] = 32] = "TridentChanneling";
        Type[Type["CrossbowMultishot"] = 33] = "CrossbowMultishot";
        Type[Type["CrossbowPiercing"] = 34] = "CrossbowPiercing";
        Type[Type["CrossbowQuickCharge"] = 35] = "CrossbowQuickCharge";
        Type[Type["SoulSpeed"] = 36] = "SoulSpeed";
        Type[Type["NumEnchantments"] = 37] = "NumEnchantments";
        Type[Type["InvalidEnchantment"] = 38] = "InvalidEnchantment";
    })(Type = Enchant.Type || (Enchant.Type = {}));
})(Enchant = exports.Enchant || (exports.Enchant = {}));
var EnchantmentNames;
(function (EnchantmentNames) {
    EnchantmentNames[EnchantmentNames["Protection"] = 0] = "Protection";
    EnchantmentNames[EnchantmentNames["FireProtection"] = 1] = "FireProtection";
    EnchantmentNames[EnchantmentNames["FeatherFalling"] = 2] = "FeatherFalling";
    EnchantmentNames[EnchantmentNames["BlastProtection"] = 3] = "BlastProtection";
    EnchantmentNames[EnchantmentNames["ProjectileProtection"] = 4] = "ProjectileProtection";
    EnchantmentNames[EnchantmentNames["Thorns"] = 5] = "Thorns";
    EnchantmentNames[EnchantmentNames["Respiration"] = 6] = "Respiration";
    EnchantmentNames[EnchantmentNames["DepthStrider"] = 7] = "DepthStrider";
    EnchantmentNames[EnchantmentNames["AquaAffinity"] = 8] = "AquaAffinity";
    EnchantmentNames[EnchantmentNames["Sharpness"] = 9] = "Sharpness";
    EnchantmentNames[EnchantmentNames["Smite"] = 10] = "Smite";
    EnchantmentNames[EnchantmentNames["BaneOfArthropods"] = 11] = "BaneOfArthropods";
    EnchantmentNames[EnchantmentNames["Knockback"] = 12] = "Knockback";
    EnchantmentNames[EnchantmentNames["FireAspect"] = 13] = "FireAspect";
    EnchantmentNames[EnchantmentNames["Looting"] = 14] = "Looting";
    EnchantmentNames[EnchantmentNames["Efficiency"] = 15] = "Efficiency";
    EnchantmentNames[EnchantmentNames["SilkTouch"] = 16] = "SilkTouch";
    EnchantmentNames[EnchantmentNames["Unbreaking"] = 17] = "Unbreaking";
    EnchantmentNames[EnchantmentNames["Fortune"] = 18] = "Fortune";
    EnchantmentNames[EnchantmentNames["Power"] = 19] = "Power";
    EnchantmentNames[EnchantmentNames["Punch"] = 20] = "Punch";
    EnchantmentNames[EnchantmentNames["Flame"] = 21] = "Flame";
    EnchantmentNames[EnchantmentNames["Infinity"] = 22] = "Infinity";
    EnchantmentNames[EnchantmentNames["LuckOfTheSea"] = 23] = "LuckOfTheSea";
    EnchantmentNames[EnchantmentNames["Lure"] = 24] = "Lure";
    EnchantmentNames[EnchantmentNames["FrostWalker"] = 25] = "FrostWalker";
    EnchantmentNames[EnchantmentNames["Mending"] = 26] = "Mending";
    EnchantmentNames[EnchantmentNames["BindingCurse"] = 27] = "BindingCurse";
    EnchantmentNames[EnchantmentNames["VanishingCurse"] = 28] = "VanishingCurse";
    EnchantmentNames[EnchantmentNames["Impaling"] = 29] = "Impaling";
    EnchantmentNames[EnchantmentNames["Riptide"] = 30] = "Riptide";
    EnchantmentNames[EnchantmentNames["Loyalty"] = 31] = "Loyalty";
    EnchantmentNames[EnchantmentNames["Channeling"] = 32] = "Channeling";
    EnchantmentNames[EnchantmentNames["Multishot"] = 33] = "Multishot";
    EnchantmentNames[EnchantmentNames["Piercing"] = 34] = "Piercing";
    EnchantmentNames[EnchantmentNames["QuickCharge"] = 35] = "QuickCharge";
    EnchantmentNames[EnchantmentNames["SoulSpeed"] = 36] = "SoulSpeed";
    EnchantmentNames[EnchantmentNames["SwiftSneak"] = 37] = "SwiftSneak";
})(EnchantmentNames = exports.EnchantmentNames || (exports.EnchantmentNames = {}));
let EnchantmentInstance = class EnchantmentInstance extends nativeclass_1.NativeStruct {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], EnchantmentInstance.prototype, "type", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], EnchantmentInstance.prototype, "level", void 0);
EnchantmentInstance = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], EnchantmentInstance);
exports.EnchantmentInstance = EnchantmentInstance;
let ItemEnchants = class ItemEnchants extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], ItemEnchants.prototype, "slot", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(EnchantmentInstance), 0x08)
    /** 1-8 */
], ItemEnchants.prototype, "enchants1", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(EnchantmentInstance))
], ItemEnchants.prototype, "enchants2", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(EnchantmentInstance))
], ItemEnchants.prototype, "enchants3", void 0);
ItemEnchants = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], ItemEnchants);
exports.ItemEnchants = ItemEnchants;
var EnchantUtils;
(function (EnchantUtils) {
    function applyEnchant(itemStack, enchant, level, allowUnsafe) {
        (0, common_1.abstract)();
    }
    EnchantUtils.applyEnchant = applyEnchant;
    function getEnchantLevel(enchant, itemStack) {
        (0, common_1.abstract)();
    }
    EnchantUtils.getEnchantLevel = getEnchantLevel;
    function hasCurse(itemStack) {
        (0, common_1.abstract)();
    }
    EnchantUtils.hasCurse = hasCurse;
    function hasEnchant(enchant, itemStack) {
        (0, common_1.abstract)();
    }
    EnchantUtils.hasEnchant = hasEnchant;
})(EnchantUtils = exports.EnchantUtils || (exports.EnchantUtils = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jaGFudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbmNoYW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsc0NBQXFDO0FBQ3JDLDRDQUF5QztBQUN6QyxnREFBcUY7QUFDckYsOENBQWtEO0FBR2xELElBQWlCLE9BQU8sQ0EyQ3ZCO0FBM0NELFdBQWlCLE9BQU87SUFDcEIsSUFBWSxJQXlDWDtJQXpDRCxXQUFZLElBQUk7UUFDWix1Q0FBUSxDQUFBO1FBQ1IseUNBQVMsQ0FBQTtRQUNULHlDQUFTLENBQUE7UUFDVCxtREFBYyxDQUFBO1FBQ2QscURBQWUsQ0FBQTtRQUNmLDZDQUFXLENBQUE7UUFDWCw2Q0FBVyxDQUFBO1FBQ1gsMkNBQVUsQ0FBQTtRQUNWLGlEQUFhLENBQUE7UUFDYiwrQ0FBWSxDQUFBO1FBQ1osZ0RBQVksQ0FBQTtRQUNaLHNEQUFlLENBQUE7UUFDZixzREFBZSxDQUFBO1FBQ2YsNENBQVUsQ0FBQTtRQUNWLDRDQUFVLENBQUE7UUFDVix3REFBZ0IsQ0FBQTtRQUNoQixzREFBZSxDQUFBO1FBQ2Ysd0RBQWdCLENBQUE7UUFDaEIsNENBQVUsQ0FBQTtRQUNWLDBDQUFTLENBQUE7UUFDVCxnREFBWSxDQUFBO1FBQ1osc0NBQU8sQ0FBQTtRQUNQLDhDQUFXLENBQUE7UUFDWCw4Q0FBVyxDQUFBO1FBQ1gsOENBQVcsQ0FBQTtRQUNYLDhDQUFXLENBQUE7UUFDWCxzQ0FBTyxDQUFBO1FBQ1AsZ0RBQVksQ0FBQTtRQUNaLG9EQUFjLENBQUE7UUFDZCxzREFBZSxDQUFBO1FBQ2Ysb0RBQWMsQ0FBQTtRQUNkLG9EQUFjLENBQUE7UUFDZCwwREFBaUIsQ0FBQTtRQUNqQiwwREFBaUIsQ0FBQTtRQUNqQix3REFBZ0IsQ0FBQTtRQUNoQiw4REFBbUIsQ0FBQTtRQUNuQiwwQ0FBUyxDQUFBO1FBRVQsc0RBQWUsQ0FBQTtRQUNmLDREQUFrQixDQUFBO0lBQ3RCLENBQUMsRUF6Q1csSUFBSSxHQUFKLFlBQUksS0FB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