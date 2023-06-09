"use strict";
var ActorDefinitionIdentifier_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemActor = exports.Mob = exports.DistanceSortedActor = exports.ActorDataIDs = exports.SynchedActorDataEntityWrapper = exports.Actor = exports.EntityContextBase = exports.WeakEntityRef = exports.EntityRefTraits = exports.OwnerStorageEntity = exports.EntityContext = exports.ActorLink = exports.ActorLinkType = exports.ActorFlags = exports.ActorDamageCause = exports.ActorDamageByChildActorSource = exports.ActorDamageByActorSource = exports.ActorDamageByBlockSource = exports.ActorDamageSource = exports.ActorDefinitionIdentifier = exports.ActorType = exports.ActorRuntimeID = exports.DimensionId = exports.ActorUniqueID = void 0;
const tslib_1 = require("tslib");
const colors = require("colors");
const bin_1 = require("../bin");
const common_1 = require("../common");
const core_1 = require("../core");
const mangle_1 = require("../mangle");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const attribute_1 = require("./attribute");
const block_1 = require("./block");
const effects_1 = require("./effects");
const hashedstring_1 = require("./hashedstring");
const nbt_1 = require("./nbt");
const symbols_1 = require("./symbols");
exports.ActorUniqueID = nativetype_1.bin64_t.extends({
    INVALID_ID: symbols_1.proc["?INVALID_ID@ActorUniqueID@@2U1@B"].getBin64(),
});
var DimensionId;
(function (DimensionId) {
    DimensionId[DimensionId["Overworld"] = 0] = "Overworld";
    DimensionId[DimensionId["Nether"] = 1] = "Nether";
    DimensionId[DimensionId["TheEnd"] = 2] = "TheEnd";
    DimensionId[DimensionId["Undefined"] = 3] = "Undefined";
})(DimensionId = exports.DimensionId || (exports.DimensionId = {}));
class ActorRuntimeID extends core_1.VoidPointer {
}
exports.ActorRuntimeID = ActorRuntimeID;
var ActorType;
(function (ActorType) {
    ActorType[ActorType["Item"] = 64] = "Item";
    ActorType[ActorType["PrimedTnt"] = 65] = "PrimedTnt";
    ActorType[ActorType["FallingBlock"] = 66] = "FallingBlock";
    ActorType[ActorType["MovingBlock"] = 67] = "MovingBlock";
    ActorType[ActorType["Experience"] = 69] = "Experience";
    ActorType[ActorType["EyeOfEnder"] = 70] = "EyeOfEnder";
    ActorType[ActorType["EnderCrystal"] = 71] = "EnderCrystal";
    ActorType[ActorType["FireworksRocket"] = 72] = "FireworksRocket";
    ActorType[ActorType["FishingHook"] = 77] = "FishingHook";
    ActorType[ActorType["Chalkboard"] = 78] = "Chalkboard";
    ActorType[ActorType["Painting"] = 83] = "Painting";
    ActorType[ActorType["LeashKnot"] = 88] = "LeashKnot";
    ActorType[ActorType["BoatRideable"] = 90] = "BoatRideable";
    ActorType[ActorType["LightningBolt"] = 93] = "LightningBolt";
    ActorType[ActorType["AreaEffectCloud"] = 94] = "AreaEffectCloud";
    ActorType[ActorType["Balloon"] = 107] = "Balloon";
    ActorType[ActorType["Shield"] = 117] = "Shield";
    ActorType[ActorType["Lectern"] = 119] = "Lectern";
    ActorType[ActorType["TypeMask"] = 255] = "TypeMask";
    ActorType[ActorType["Mob"] = 256] = "Mob";
    ActorType[ActorType["Npc"] = 307] = "Npc";
    ActorType[ActorType["Agent"] = 312] = "Agent";
    ActorType[ActorType["ArmorStand"] = 317] = "ArmorStand";
    ActorType[ActorType["TripodCamera"] = 318] = "TripodCamera";
    ActorType[ActorType["Player"] = 319] = "Player";
    ActorType[ActorType["Bee"] = 378] = "Bee";
    ActorType[ActorType["Piglin"] = 379] = "Piglin";
    ActorType[ActorType["PiglinBrute"] = 383] = "PiglinBrute";
    ActorType[ActorType["PathfinderMob"] = 768] = "PathfinderMob";
    ActorType[ActorType["IronGolem"] = 788] = "IronGolem";
    ActorType[ActorType["SnowGolem"] = 789] = "SnowGolem";
    ActorType[ActorType["WanderingTrader"] = 886] = "WanderingTrader";
    ActorType[ActorType["Monster"] = 2816] = "Monster";
    ActorType[ActorType["Creeper"] = 2849] = "Creeper";
    ActorType[ActorType["Slime"] = 2853] = "Slime";
    ActorType[ActorType["EnderMan"] = 2854] = "EnderMan";
    ActorType[ActorType["Ghast"] = 2857] = "Ghast";
    ActorType[ActorType["LavaSlime"] = 2858] = "LavaSlime";
    ActorType[ActorType["Blaze"] = 2859] = "Blaze";
    ActorType[ActorType["Witch"] = 2861] = "Witch";
    ActorType[ActorType["Guardian"] = 2865] = "Guardian";
    ActorType[ActorType["ElderGuardian"] = 2866] = "ElderGuardian";
    ActorType[ActorType["Dragon"] = 2869] = "Dragon";
    ActorType[ActorType["Shulker"] = 2870] = "Shulker";
    ActorType[ActorType["Vindicator"] = 2873] = "Vindicator";
    ActorType[ActorType["IllagerBeast"] = 2875] = "IllagerBeast";
    ActorType[ActorType["EvocationIllager"] = 2920] = "EvocationIllager";
    ActorType[ActorType["Vex"] = 2921] = "Vex";
    ActorType[ActorType["Pillager"] = 2930] = "Pillager";
    ActorType[ActorType["ElderGuardianGhost"] = 2936] = "ElderGuardianGhost";
    ActorType[ActorType["Animal"] = 4864] = "Animal";
    ActorType[ActorType["Chicken"] = 4874] = "Chicken";
    ActorType[ActorType["Cow"] = 4875] = "Cow";
    ActorType[ActorType["Pig"] = 4876] = "Pig";
    ActorType[ActorType["Sheep"] = 4877] = "Sheep";
    ActorType[ActorType["MushroomCow"] = 4880] = "MushroomCow";
    ActorType[ActorType["Rabbit"] = 4882] = "Rabbit";
    ActorType[ActorType["PolarBear"] = 4892] = "PolarBear";
    ActorType[ActorType["Llama"] = 4893] = "Llama";
    ActorType[ActorType["Turtle"] = 4938] = "Turtle";
    ActorType[ActorType["Panda"] = 4977] = "Panda";
    ActorType[ActorType["Fox"] = 4985] = "Fox";
    ActorType[ActorType["Hoglin"] = 4988] = "Hoglin";
    ActorType[ActorType["Strider"] = 4989] = "Strider";
    ActorType[ActorType["Goat"] = 4992] = "Goat";
    ActorType[ActorType["Axolotl"] = 4994] = "Axolotl";
    ActorType[ActorType["WaterAnimal"] = 8960] = "WaterAnimal";
    ActorType[ActorType["Squid"] = 8977] = "Squid";
    ActorType[ActorType["Dolphin"] = 8991] = "Dolphin";
    ActorType[ActorType["Pufferfish"] = 9068] = "Pufferfish";
    ActorType[ActorType["Salmon"] = 9069] = "Salmon";
    ActorType[ActorType["Tropicalfish"] = 9071] = "Tropicalfish";
    ActorType[ActorType["Fish"] = 9072] = "Fish";
    ActorType[ActorType["GlowSquid"] = 9089] = "GlowSquid";
    ActorType[ActorType["TameableAnimal"] = 21248] = "TameableAnimal";
    ActorType[ActorType["Wolf"] = 21262] = "Wolf";
    ActorType[ActorType["Ocelot"] = 21270] = "Ocelot";
    ActorType[ActorType["Parrot"] = 21278] = "Parrot";
    ActorType[ActorType["Cat"] = 21323] = "Cat";
    ActorType[ActorType["Ambient"] = 33024] = "Ambient";
    ActorType[ActorType["Bat"] = 33043] = "Bat";
    ActorType[ActorType["UndeadMob"] = 68352] = "UndeadMob";
    ActorType[ActorType["PigZombie"] = 68388] = "PigZombie";
    ActorType[ActorType["WitherBoss"] = 68404] = "WitherBoss";
    ActorType[ActorType["Phantom"] = 68410] = "Phantom";
    ActorType[ActorType["Zoglin"] = 68478] = "Zoglin";
    ActorType[ActorType["ZombieMonster"] = 199424] = "ZombieMonster";
    ActorType[ActorType["Zombie"] = 199456] = "Zombie";
    ActorType[ActorType["ZombieVillager"] = 199468] = "ZombieVillager";
    ActorType[ActorType["Husk"] = 199471] = "Husk";
    ActorType[ActorType["Drowned"] = 199534] = "Drowned";
    ActorType[ActorType["ZombieVillagerV2"] = 199540] = "ZombieVillagerV2";
    ActorType[ActorType["Arthropod"] = 264960] = "Arthropod";
    ActorType[ActorType["Spider"] = 264995] = "Spider";
    ActorType[ActorType["Silverfish"] = 264999] = "Silverfish";
    ActorType[ActorType["CaveSpider"] = 265000] = "CaveSpider";
    ActorType[ActorType["Endermite"] = 265015] = "Endermite";
    ActorType[ActorType["Minecart"] = 524288] = "Minecart";
    ActorType[ActorType["MinecartRideable"] = 524372] = "MinecartRideable";
    ActorType[ActorType["MinecartHopper"] = 524384] = "MinecartHopper";
    ActorType[ActorType["MinecartTNT"] = 524385] = "MinecartTNT";
    ActorType[ActorType["MinecartChest"] = 524386] = "MinecartChest";
    ActorType[ActorType["MinecartFurnace"] = 524387] = "MinecartFurnace";
    ActorType[ActorType["MinecartCommandBlock"] = 524388] = "MinecartCommandBlock";
    ActorType[ActorType["SkeletonMonster"] = 1116928] = "SkeletonMonster";
    ActorType[ActorType["Skeleton"] = 1116962] = "Skeleton";
    ActorType[ActorType["Stray"] = 1116974] = "Stray";
    ActorType[ActorType["WitherSkeleton"] = 1116976] = "WitherSkeleton";
    ActorType[ActorType["EquineAnimal"] = 2118400] = "EquineAnimal";
    ActorType[ActorType["Horse"] = 2118423] = "Horse";
    ActorType[ActorType["Donkey"] = 2118424] = "Donkey";
    ActorType[ActorType["Mule"] = 2118425] = "Mule";
    ActorType[ActorType["SkeletonHorse"] = 2186010] = "SkeletonHorse";
    ActorType[ActorType["ZombieHorse"] = 2186011] = "ZombieHorse";
    ActorType[ActorType["Projectile"] = 4194304] = "Projectile";
    ActorType[ActorType["ExperiencePotion"] = 4194372] = "ExperiencePotion";
    ActorType[ActorType["ShulkerBullet"] = 4194380] = "ShulkerBullet";
    ActorType[ActorType["DragonFireball"] = 4194383] = "DragonFireball";
    ActorType[ActorType["Snowball"] = 4194385] = "Snowball";
    ActorType[ActorType["ThrownEgg"] = 4194386] = "ThrownEgg";
    ActorType[ActorType["LargeFireball"] = 4194389] = "LargeFireball";
    ActorType[ActorType["ThrownPotion"] = 4194390] = "ThrownPotion";
    ActorType[ActorType["Enderpearl"] = 4194391] = "Enderpearl";
    ActorType[ActorType["WitherSkull"] = 4194393] = "WitherSkull";
    ActorType[ActorType["WitherSkullDangerous"] = 4194395] = "WitherSkullDangerous";
    ActorType[ActorType["SmallFireball"] = 4194398] = "SmallFireball";
    ActorType[ActorType["LingeringPotion"] = 4194405] = "LingeringPotion";
    ActorType[ActorType["LlamaSpit"] = 4194406] = "LlamaSpit";
    ActorType[ActorType["EvocationFang"] = 4194407] = "EvocationFang";
    ActorType[ActorType["IceBomb"] = 4194410] = "IceBomb";
    ActorType[ActorType["AbstractArrow"] = 8388608] = "AbstractArrow";
    ActorType[ActorType["Trident"] = 12582985] = "Trident";
    ActorType[ActorType["Arrow"] = 12582992] = "Arrow";
    ActorType[ActorType["VillagerBase"] = 16777984] = "VillagerBase";
    ActorType[ActorType["Villager"] = 16777999] = "Villager";
    ActorType[ActorType["VillagerV2"] = 16778099] = "VillagerV2";
})(ActorType = exports.ActorType || (exports.ActorType = {}));
let ActorDefinitionIdentifier = ActorDefinitionIdentifier_1 = class ActorDefinitionIdentifier extends nativeclass_1.NativeClass {
    static constructWith(type) {
        (0, common_1.abstract)();
    }
    /** @deprecated use {@link constructWith()} instead*/
    static create(type) {
        return ActorDefinitionIdentifier_1.constructWith(type);
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], ActorDefinitionIdentifier.prototype, "namespace", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], ActorDefinitionIdentifier.prototype, "identifier", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], ActorDefinitionIdentifier.prototype, "initEvent", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], ActorDefinitionIdentifier.prototype, "fullName", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(hashedstring_1.HashedString)
], ActorDefinitionIdentifier.prototype, "canonicalName", void 0);
ActorDefinitionIdentifier = ActorDefinitionIdentifier_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)({ size: 0xb0, structSymbol: true })
], ActorDefinitionIdentifier);
exports.ActorDefinitionIdentifier = ActorDefinitionIdentifier;
let ActorDamageSource = class ActorDamageSource extends nativeclass_1.NativeClass {
    /** @deprecated Use {@link create} instead. */
    static constructWith(cause) {
        return this.create(cause);
    }
    static create(cause) {
        (0, common_1.abstract)();
    }
    /**
     *
     * @param cause damage cause
     */
    setCause(cause) {
        (0, common_1.abstract)();
    }
    getDamagingEntity() {
        const uniqueId = this.getDamagingEntityUniqueID();
        return Actor.fromUniqueIdBin(uniqueId);
    }
    getDamagingEntityUniqueID() {
        (0, common_1.abstract)();
    }
    isEntitySource() {
        return this instanceof ActorDamageByActorSource;
    }
    isChildEntitySource() {
        return this instanceof ActorDamageByChildActorSource;
    }
    isBlockSource() {
        return this instanceof ActorDamageByBlockSource;
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], ActorDamageSource.prototype, "vftable", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t, 0x08)
], ActorDamageSource.prototype, "cause", void 0);
ActorDamageSource = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x10)
], ActorDamageSource);
exports.ActorDamageSource = ActorDamageSource;
let ActorDamageByBlockSource = class ActorDamageByBlockSource extends ActorDamageSource {
    static create(block, cause) {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(block_1.Block.ref())
], ActorDamageByBlockSource.prototype, "block", void 0);
ActorDamageByBlockSource = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x30)
], ActorDamageByBlockSource);
exports.ActorDamageByBlockSource = ActorDamageByBlockSource;
let ActorDamageByActorSource = class ActorDamageByActorSource extends ActorDamageSource {
    static constructWith(damagingEntity, cause = ActorDamageCause.EntityAttack) {
        (0, common_1.abstract)();
    }
};
ActorDamageByActorSource = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x50)
], ActorDamageByActorSource);
exports.ActorDamageByActorSource = ActorDamageByActorSource;
let ActorDamageByChildActorSource = class ActorDamageByChildActorSource extends ActorDamageByActorSource {
    static constructWith(childEntity, damagingEntity, cause = ActorDamageCause.Projectile) {
        (0, common_1.abstract)();
    }
    getChildEntityUniqueId() {
        // not official name, there is not a method for child entity in BDS
        return this.getBin64(0x58); // accessed in ActorDamageByChildActorSource::ActorDamageByChildActorSource
    }
};
ActorDamageByChildActorSource = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x80)
], ActorDamageByChildActorSource);
exports.ActorDamageByChildActorSource = ActorDamageByChildActorSource;
var ActorDamageCause;
(function (ActorDamageCause) {
    /** The kill command */
    ActorDamageCause[ActorDamageCause["Override"] = 0] = "Override";
    /** @deprecated */
    ActorDamageCause[ActorDamageCause["None"] = 0] = "None";
    ActorDamageCause[ActorDamageCause["Contact"] = 1] = "Contact";
    ActorDamageCause[ActorDamageCause["EntityAttack"] = 2] = "EntityAttack";
    ActorDamageCause[ActorDamageCause["Projectile"] = 3] = "Projectile";
    ActorDamageCause[ActorDamageCause["Suffocation"] = 4] = "Suffocation";
    /** @deprecated Typo */
    ActorDamageCause[ActorDamageCause["Suffoocation"] = 4] = "Suffoocation";
    ActorDamageCause[ActorDamageCause["Fall"] = 5] = "Fall";
    ActorDamageCause[ActorDamageCause["Fire"] = 6] = "Fire";
    ActorDamageCause[ActorDamageCause["FireTick"] = 7] = "FireTick";
    ActorDamageCause[ActorDamageCause["Lava"] = 8] = "Lava";
    ActorDamageCause[ActorDamageCause["Drowning"] = 9] = "Drowning";
    ActorDamageCause[ActorDamageCause["BlockExplosion"] = 10] = "BlockExplosion";
    ActorDamageCause[ActorDamageCause["EntityExplosion"] = 11] = "EntityExplosion";
    ActorDamageCause[ActorDamageCause["Void"] = 12] = "Void";
    ActorDamageCause[ActorDamageCause["Suicide"] = 13] = "Suicide";
    ActorDamageCause[ActorDamageCause["Magic"] = 14] = "Magic";
    ActorDamageCause[ActorDamageCause["Wither"] = 15] = "Wither";
    ActorDamageCause[ActorDamageCause["Starve"] = 16] = "Starve";
    ActorDamageCause[ActorDamageCause["Anvil"] = 17] = "Anvil";
    ActorDamageCause[ActorDamageCause["Thorns"] = 18] = "Thorns";
    ActorDamageCause[ActorDamageCause["FallingBlock"] = 19] = "FallingBlock";
    ActorDamageCause[ActorDamageCause["Piston"] = 20] = "Piston";
    ActorDamageCause[ActorDamageCause["FlyIntoWall"] = 21] = "FlyIntoWall";
    ActorDamageCause[ActorDamageCause["Magma"] = 22] = "Magma";
    ActorDamageCause[ActorDamageCause["Fireworks"] = 23] = "Fireworks";
    ActorDamageCause[ActorDamageCause["Lightning"] = 24] = "Lightning";
    ActorDamageCause[ActorDamageCause["Charging"] = 25] = "Charging";
    ActorDamageCause[ActorDamageCause["Temperature"] = 26] = "Temperature";
    ActorDamageCause[ActorDamageCause["Freeze"] = 27] = "Freeze";
    ActorDamageCause[ActorDamageCause["Stalactite"] = 28] = "Stalactite";
    ActorDamageCause[ActorDamageCause["Stalagmite"] = 29] = "Stalagmite";
    ActorDamageCause[ActorDamageCause["RamAttack"] = 30] = "RamAttack";
    ActorDamageCause[ActorDamageCause["SonicBoom"] = 31] = "SonicBoom";
    ActorDamageCause[ActorDamageCause["All"] = 34] = "All";
})(ActorDamageCause = exports.ActorDamageCause || (exports.ActorDamageCause = {}));
var ActorFlags;
(function (ActorFlags) {
    ActorFlags[ActorFlags["OnFire"] = 0] = "OnFire";
    ActorFlags[ActorFlags["Sneaking"] = 1] = "Sneaking";
    ActorFlags[ActorFlags["Riding"] = 2] = "Riding";
    ActorFlags[ActorFlags["Sprinting"] = 3] = "Sprinting";
    ActorFlags[ActorFlags["UsingItem"] = 4] = "UsingItem";
    ActorFlags[ActorFlags["Invisible"] = 5] = "Invisible";
    ActorFlags[ActorFlags["Tempted"] = 6] = "Tempted";
    ActorFlags[ActorFlags["InLove"] = 7] = "InLove";
    ActorFlags[ActorFlags["Saddled"] = 8] = "Saddled";
    ActorFlags[ActorFlags["Powered"] = 9] = "Powered";
    /**
     * @deprecated typo.
     */
    ActorFlags[ActorFlags["Ignit0ed"] = 10] = "Ignit0ed";
    ActorFlags[ActorFlags["Ignited"] = 10] = "Ignited";
    ActorFlags[ActorFlags["Baby"] = 11] = "Baby";
    ActorFlags[ActorFlags["Converting"] = 12] = "Converting";
    ActorFlags[ActorFlags["Critical"] = 13] = "Critical";
    ActorFlags[ActorFlags["CanShowName"] = 14] = "CanShowName";
    ActorFlags[ActorFlags["AlwaysShowName"] = 15] = "AlwaysShowName";
    ActorFlags[ActorFlags["NoAI"] = 16] = "NoAI";
    ActorFlags[ActorFlags["Silent"] = 17] = "Silent";
    ActorFlags[ActorFlags["WallClimbing"] = 18] = "WallClimbing";
    ActorFlags[ActorFlags["CanClimb"] = 19] = "CanClimb";
    ActorFlags[ActorFlags["CanSwim"] = 20] = "CanSwim";
    ActorFlags[ActorFlags["CanFly"] = 21] = "CanFly";
    ActorFlags[ActorFlags["CanWalk"] = 22] = "CanWalk";
    ActorFlags[ActorFlags["Resting"] = 23] = "Resting";
    ActorFlags[ActorFlags["Sitting"] = 24] = "Sitting";
    ActorFlags[ActorFlags["Angry"] = 25] = "Angry";
    ActorFlags[ActorFlags["Interested"] = 26] = "Interested";
    ActorFlags[ActorFlags["Charged"] = 27] = "Charged";
    ActorFlags[ActorFlags["Tamed"] = 28] = "Tamed";
    ActorFlags[ActorFlags["Orphaned"] = 29] = "Orphaned";
    ActorFlags[ActorFlags["Leashed"] = 30] = "Leashed";
    ActorFlags[ActorFlags["Sheared"] = 31] = "Sheared";
    ActorFlags[ActorFlags["Gliding"] = 32] = "Gliding";
    ActorFlags[ActorFlags["Elder"] = 33] = "Elder";
    ActorFlags[ActorFlags["Moving"] = 34] = "Moving";
    ActorFlags[ActorFlags["Breathing"] = 35] = "Breathing";
    ActorFlags[ActorFlags["Chested"] = 36] = "Chested";
    ActorFlags[ActorFlags["Stackable"] = 37] = "Stackable";
    ActorFlags[ActorFlags["ShowBottom"] = 38] = "ShowBottom";
    ActorFlags[ActorFlags["Standing"] = 39] = "Standing";
    ActorFlags[ActorFlags["Shaking"] = 40] = "Shaking";
    ActorFlags[ActorFlags["Idling"] = 41] = "Idling";
    ActorFlags[ActorFlags["Casting"] = 42] = "Casting";
    ActorFlags[ActorFlags["Charging"] = 43] = "Charging";
    ActorFlags[ActorFlags["WasdControlled"] = 44] = "WasdControlled";
    ActorFlags[ActorFlags["CanPowerJump"] = 45] = "CanPowerJump";
    ActorFlags[ActorFlags["Lingering"] = 46] = "Lingering";
    ActorFlags[ActorFlags["HasCollision"] = 47] = "HasCollision";
    ActorFlags[ActorFlags["HasGravity"] = 48] = "HasGravity";
    ActorFlags[ActorFlags["FireImmune"] = 49] = "FireImmune";
    ActorFlags[ActorFlags["Dancing"] = 50] = "Dancing";
    ActorFlags[ActorFlags["Enchanted"] = 51] = "Enchanted";
    ActorFlags[ActorFlags["ReturnTrident"] = 52] = "ReturnTrident";
    ActorFlags[ActorFlags["ContainerIsPrivate"] = 53] = "ContainerIsPrivate";
    ActorFlags[ActorFlags["IsTransforming"] = 54] = "IsTransforming";
    ActorFlags[ActorFlags["DamageNearbyMobs"] = 55] = "DamageNearbyMobs";
    ActorFlags[ActorFlags["Swimming"] = 56] = "Swimming";
    ActorFlags[ActorFlags["Bribed"] = 57] = "Bribed";
    ActorFlags[ActorFlags["IsPregnant"] = 58] = "IsPregnant";
    ActorFlags[ActorFlags["LayingEgg"] = 59] = "LayingEgg";
    ActorFlags[ActorFlags["RiderCanPick"] = 60] = "RiderCanPick";
    ActorFlags[ActorFlags["TransitionSitting"] = 61] = "TransitionSitting";
    ActorFlags[ActorFlags["Eating"] = 62] = "Eating";
    ActorFlags[ActorFlags["LayingDown"] = 63] = "LayingDown";
    /**
     * @deprecated Typo!
     */
    ActorFlags[ActorFlags["Snezing"] = 64] = "Snezing";
    ActorFlags[ActorFlags["Sneezing"] = 64] = "Sneezing";
    ActorFlags[ActorFlags["Trusting"] = 65] = "Trusting";
    ActorFlags[ActorFlags["Rolling"] = 66] = "Rolling";
    ActorFlags[ActorFlags["Scared"] = 67] = "Scared";
    ActorFlags[ActorFlags["InScaffolding"] = 68] = "InScaffolding";
    ActorFlags[ActorFlags["OverScaffolding"] = 69] = "OverScaffolding";
    ActorFlags[ActorFlags["FallThroughScaffolding"] = 70] = "FallThroughScaffolding";
    ActorFlags[ActorFlags["Blocking"] = 71] = "Blocking";
    ActorFlags[ActorFlags["TransitionBlocking"] = 72] = "TransitionBlocking";
    ActorFlags[ActorFlags["BlockedUsingShield"] = 73] = "BlockedUsingShield";
    ActorFlags[ActorFlags["BlockedUsingDamagedShield"] = 74] = "BlockedUsingDamagedShield";
    ActorFlags[ActorFlags["Sleeping"] = 75] = "Sleeping";
    ActorFlags[ActorFlags["WantsToWake"] = 76] = "WantsToWake";
    ActorFlags[ActorFlags["TradeInterest"] = 77] = "TradeInterest";
    ActorFlags[ActorFlags["DoorBreaker"] = 78] = "DoorBreaker";
    ActorFlags[ActorFlags["BreakingObstruction"] = 79] = "BreakingObstruction";
    ActorFlags[ActorFlags["DoorOpener"] = 80] = "DoorOpener";
    ActorFlags[ActorFlags["IsIllagerCaptain"] = 81] = "IsIllagerCaptain";
    ActorFlags[ActorFlags["Stunned"] = 82] = "Stunned";
    ActorFlags[ActorFlags["Roaring"] = 83] = "Roaring";
    ActorFlags[ActorFlags["DelayedAttack"] = 84] = "DelayedAttack";
    ActorFlags[ActorFlags["IsAvoidingMobs"] = 85] = "IsAvoidingMobs";
    ActorFlags[ActorFlags["FacingTargetToRangeAttack"] = 86] = "FacingTargetToRangeAttack";
    ActorFlags[ActorFlags["HiddenWhenInvisible"] = 87] = "HiddenWhenInvisible";
    ActorFlags[ActorFlags["IsInUI"] = 88] = "IsInUI";
    ActorFlags[ActorFlags["Stalking"] = 89] = "Stalking";
    ActorFlags[ActorFlags["Emoting"] = 90] = "Emoting";
    ActorFlags[ActorFlags["Celebrating"] = 91] = "Celebrating";
    ActorFlags[ActorFlags["Admiring"] = 92] = "Admiring";
    ActorFlags[ActorFlags["CelebratingSpecial"] = 93] = "CelebratingSpecial";
    ActorFlags[ActorFlags["OutOfControl"] = 94] = "OutOfControl";
    ActorFlags[ActorFlags["RamAttack"] = 95] = "RamAttack";
    ActorFlags[ActorFlags["PlayingDead"] = 96] = "PlayingDead";
    ActorFlags[ActorFlags["InAscendableBlock"] = 97] = "InAscendableBlock";
    ActorFlags[ActorFlags["OverDescendableBlock"] = 98] = "OverDescendableBlock";
})(ActorFlags = exports.ActorFlags || (exports.ActorFlags = {}));
var ActorLinkType;
(function (ActorLinkType) {
    ActorLinkType[ActorLinkType["None"] = 0] = "None";
    ActorLinkType[ActorLinkType["Riding"] = 1] = "Riding";
    ActorLinkType[ActorLinkType["Passenger"] = 2] = "Passenger";
})(ActorLinkType = exports.ActorLinkType || (exports.ActorLinkType = {}));
let ActorLink = class ActorLink extends nativeclass_1.NativeStruct {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], ActorLink.prototype, "type", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.ActorUniqueID, 0x08)
], ActorLink.prototype, "A", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(exports.ActorUniqueID)
], ActorLink.prototype, "B", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], ActorLink.prototype, "immediate", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], ActorLink.prototype, "causedByRider", void 0);
ActorLink = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], ActorLink);
exports.ActorLink = ActorLink;
let EntityContext = class EntityContext extends nativeclass_1.AbstractClass {
};
EntityContext = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], EntityContext);
exports.EntityContext = EntityContext;
let OwnerStorageEntity = class OwnerStorageEntity extends nativeclass_1.AbstractClass {
    _getStackRef() {
        (0, common_1.abstract)();
    }
};
OwnerStorageEntity = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], OwnerStorageEntity);
exports.OwnerStorageEntity = OwnerStorageEntity;
let EntityRefTraits = class EntityRefTraits extends nativeclass_1.AbstractClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(OwnerStorageEntity)
], EntityRefTraits.prototype, "context", void 0);
EntityRefTraits = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x18)
], EntityRefTraits);
exports.EntityRefTraits = EntityRefTraits;
let WeakEntityRef = class WeakEntityRef extends nativeclass_1.AbstractClass {
    tryUnwrap(clazz, getRemoved = false) {
        (0, common_1.abstract)();
    }
    tryUnwrapPlayer(getRemoved = false) {
        (0, common_1.abstract)();
    }
    tryUnwrapActor(getRemoved = false) {
        (0, common_1.abstract)();
    }
};
WeakEntityRef = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x18)
], WeakEntityRef);
exports.WeakEntityRef = WeakEntityRef;
let EntityContextBase = class EntityContextBase extends nativeclass_1.AbstractClass {
    isValid() {
        (0, common_1.abstract)();
    }
    /** @deprecated use {@link isValid()} instead */
    isVaild() {
        return this.isValid();
    }
    _enttRegistry() {
        return this.enttRegistry;
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer.ref())
], EntityContextBase.prototype, "enttRegistry", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], EntityContextBase.prototype, "entityId", void 0);
EntityContextBase = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], EntityContextBase);
exports.EntityContextBase = EntityContextBase;
class Actor extends nativeclass_1.AbstractClass {
    /** @deprecated use {@link getIdentifier()} instead */
    get identifier() {
        return this.getIdentifier();
    }
    static summonAt(region, pos, type, id, summoner) {
        (0, common_1.abstract)();
    }
    /**
     * Get the Actor instance of an entity with its EntityContext
     */
    static tryGetFromEntity(entity, getRemoved) {
        (0, common_1.abstract)();
    }
    changeDimension(dimensionId, respawn) {
        (0, common_1.abstract)();
    }
    teleportTo(position, shouldStopRiding, cause, sourceEntityType, sourceActorId) {
        (0, common_1.abstract)();
    }
    /**
     * Adds an item to the entity's inventory
     * @remarks Entity(Mob) inventory will not be updated. Use Mob.sendInventory() to update it.
     *
     * @param itemStack - Item to add
     * @returns {boolean} Whether the item has been added successfully (Full inventory can be a cause of failure)
     */
    addItem(itemStack) {
        (0, common_1.abstract)();
    }
    sendPacket(packet) {
        if (!this.isPlayer())
            throw Error("this is not ServerPlayer");
        this.sendNetworkPacket(packet);
    }
    /**
     * Actually it's Mob::getArmorValue in BDS.
     * @returns the entity's armor value (as an integer)
     */
    getArmorValue() {
        return 0;
    }
    /**
     * Returns the Dimension instance of the entity currently in
     */
    getDimension() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the dimension id of the entity currently in
     */
    getDimensionId() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the entity's identifier
     */
    getIdentifier() {
        return this.getActorIdentifier().canonicalName.str;
    }
    /**
     * Returns the ActorDefinitionIdentifier instance of the entity
     */
    getActorIdentifier() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the item currently in the entity's mainhand slot
     */
    getCarriedItem() {
        (0, common_1.abstract)();
    }
    /**
     * @alias of getCarriedItem
     */
    getMainhandSlot() {
        return this.getCarriedItem();
    }
    /**
     * Sets the item currently in the entity's mainhand slot
     */
    setCarriedItem(item) {
        (0, common_1.abstract)();
    }
    /**
     * @alias of setCarriedItem
     */
    setMainhandSlot(item) {
        this.setCarriedItem(item);
    }
    /**
     * Returns the item currently in the entity's offhand slot
     */
    getOffhandSlot() {
        (0, common_1.abstract)();
    }
    /**
     * Sets the item currently in the entity's offhand slot
     */
    setOffhandSlot(item) {
        (0, common_1.abstract)();
    }
    /**
     * @alias instanceof Mob
     */
    isMob() {
        return this instanceof Mob;
    }
    isPlayer(includeSimulatedPlayer = false) {
        (0, common_1.abstract)();
    }
    /**
     * @alias instanceof SimulatedPlayer
     */
    isSimulatedPlayer() {
        (0, common_1.abstract)();
    }
    /**
     * @alias instanceof ItemActor
     */
    isItem() {
        return this instanceof ItemActor;
    }
    isSneaking() {
        (0, common_1.abstract)();
    }
    hasType(type) {
        (0, common_1.abstract)();
    }
    isType(type) {
        (0, common_1.abstract)();
    }
    /**
     * Kills the entity (itself)
     */
    kill() {
        (0, common_1.abstract)();
    }
    /**
     * Makes the entity dead
     * @param damageSource ex) ActorDamageSource.create(ActorDamageCause.Lava)
     */
    die(damageSource) {
        (0, common_1.abstract)();
    }
    /**
     * Returns the entity's attribute map
     */
    getAttributes() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the entity's name
     * @deprecated use getNameTag() instead
     */
    getName() {
        return this.getNameTag();
    }
    /**
     * Returns the entity's name
     */
    getNameTag() {
        (0, common_1.abstract)();
    }
    setHurtTime(time) {
        (0, common_1.abstract)();
    }
    /**
     * Changes the entity's name
     *
     * Calls Player::setName if it's Player.
     * or it calls Actor::setNameTag.
     */
    setName(name) {
        this.setNameTag(name);
    }
    /**
     * Changes the entity's nametag
     */
    setNameTag(name) {
        (0, common_1.abstract)();
    }
    /**
     * Set if the entity's nametag is visible
     */
    setNameTagVisible(visible) {
        (0, common_1.abstract)();
    }
    /**
     * Set a text under the entity's name (original is name of objective for scoreboard)
     */
    setScoreTag(text) {
        (0, common_1.abstract)();
    }
    /**
     * Returns a text under the entity's name (original is name of objective for scoreboard)
     */
    getScoreTag() {
        (0, common_1.abstract)();
    }
    /**
     * Despawn the entity. Don't use for this Player.
     */
    despawn() {
        (0, common_1.abstract)();
    }
    getNetworkIdentifier() {
        throw Error(`this is not player`);
    }
    /**
     * Returns the entity's position
     */
    getPosition() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the entity's feet position
     */
    getFeetPos() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the entity's rotation
     */
    getRotation() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the BlockSource instance which the entity is ticking
     * @alias getDimensionBlockSource
     */
    getRegion() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the BlockSource instance which the entity is ticking
     */
    getDimensionBlockSource() {
        (0, common_1.abstract)();
    }
    getUniqueIdLow() {
        return this.getUniqueIdPointer().getInt32(0);
    }
    getUniqueIdHigh() {
        return this.getUniqueIdPointer().getInt32(4);
    }
    getUniqueIdBin() {
        return this.getUniqueIdPointer().getBin64();
    }
    /**
     * Returns address of the entity's unique id
     */
    getUniqueIdPointer() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the entity's type
     */
    getEntityTypeId() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the entity's command permission level
     */
    getCommandPermissionLevel() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the entity's specific attribute
     */
    getAttribute(id) {
        const attr = this.getAttributes().getMutableInstance(id);
        if (attr === null)
            return 0;
        return attr.currentValue;
    }
    /**
     * Changes the entity's specific attribute
     */
    setAttribute(id, value) {
        if (id < 1)
            return null;
        if (id > 15)
            return null;
        const attr = this.getAttributes().getMutableInstance(id);
        if (attr === null)
            throw Error(`${this.getIdentifier()} has not ${attribute_1.AttributeId[id] || `Attribute${id}`}`);
        attr.currentValue = value;
        return attr;
    }
    /**
     * Returns the entity's runtime id
     */
    getRuntimeID() {
        (0, common_1.abstract)();
    }
    /**
     * Gets the entity component of bedrock scripting api
     *
     * @deprecated bedrock scripting API is removed.
     */
    getEntity() {
        let entity = this.entity;
        if (entity)
            return entity;
        entity = {
            __unique_id__: {
                "64bit_low": this.getUniqueIdLow(),
                "64bit_high": this.getUniqueIdHigh(),
            },
            __identifier__: this.identifier,
            __type__: (this.getEntityTypeId() & 0xff) === 0x40 ? "item_entity" : "entity",
            id: 0, // bool ScriptApi::WORKAROUNDS::helpRegisterActor(entt::Registry<unsigned int>* registry? ,Actor* actor,unsigned int* id_out);
        };
        return (this.entity = entity);
    }
    /**
     * Adds an effect to the entity. If a weaker effect of the same type is already applied, it will be replaced. If a weaker or equal-strength effect is already applied but has a shorter duration, it will be replaced.
     */
    addEffect(effect) {
        (0, common_1.abstract)();
    }
    /**
     * Removes the effect with the specified ID from the entity
     */
    removeEffect(id) {
        (0, common_1.abstract)();
    }
    _hasEffect(mobEffect) {
        (0, common_1.abstract)();
    }
    /**
     * Returns whether the specified effect is active on the entity
     */
    hasEffect(id) {
        const effect = effects_1.MobEffect.create(id);
        const retval = this._hasEffect(effect);
        return retval;
    }
    _getEffect(mobEffect) {
        (0, common_1.abstract)();
    }
    /**
     * Returns the effect instance active on this entity with the specified ID, or null if the entity does not have the effect.
     */
    getEffect(id) {
        const effect = effects_1.MobEffect.create(id);
        const retval = this._getEffect(effect);
        return retval;
    }
    removeAllEffects() {
        (0, common_1.abstract)();
    }
    /**
     * Adds a tag to the entity.
     * Related functions: {@link getTags}, {@link removeTag}, {@link hasTag}
     * @returns {boolean} Whether the tag has been added successfully
     */
    addTag(tag) {
        (0, common_1.abstract)();
    }
    /**
     * Returns whether the entity has the tag.
     * Related functions: {@link getTags}, {@link addTag}, {@link removeTag}
     */
    hasTag(tag) {
        (0, common_1.abstract)();
    }
    /**
     * Removes a tag from the entity.
     * Related functions: {@link getTags}, {@link addTag}, {@link hasTag}
     * @returns {boolean} Whether the tag has been removed successfully
     */
    removeTag(tag) {
        (0, common_1.abstract)();
    }
    /**
     * Returns tags the entity has.
     * Related functions: {@link addTag}, {@link removeTag}, {@link hasTag}
     */
    getTags() {
        (0, common_1.abstract)();
    }
    /**
     * Teleports the entity to a specified position
     */
    teleport(pos, dimensionId = DimensionId.Overworld, facePosition = null) {
        (0, common_1.abstract)();
    }
    /**
     * Returns the entity's armor
     */
    getArmor(slot) {
        (0, common_1.abstract)();
    }
    /**
     * Sets the entity's sneaking status
     */
    setSneaking(value) {
        (0, common_1.abstract)();
    }
    /**
     * Returns the entity's health
     */
    getHealth() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the entity's maximum health
     */
    getMaxHealth() {
        (0, common_1.abstract)();
    }
    save(tag) {
        (0, common_1.abstract)();
    }
    readAdditionalSaveData(tag) {
        (0, common_1.abstract)();
    }
    load(tag) {
        (0, common_1.abstract)();
    }
    allocateAndSave() {
        const tag = nbt_1.CompoundTag.allocate();
        this.save(tag);
        return tag;
    }
    hurt_(source, damage, knock, ignite) {
        (0, common_1.abstract)();
    }
    hurt(sourceOrCause, damage, knock, ignite) {
        const isSource = sourceOrCause instanceof ActorDamageSource;
        const source = isSource ? sourceOrCause : ActorDamageSource.create(sourceOrCause);
        const retval = this.hurt_(source, damage, knock, ignite);
        return retval;
    }
    /**
     * Changes a specific status flag of the entity
     * @remarks Most of the time it will be reset by ticking
     *
     */
    setStatusFlag(flag, value) {
        (0, common_1.abstract)();
    }
    /**
     * Returns a specific status flag of the entity
     */
    getStatusFlag(flag) {
        (0, common_1.abstract)();
    }
    /**
     * Returns the Level instance of the entity currently in
     */
    getLevel() {
        (0, common_1.abstract)();
    }
    /**
     * Returns if the entity is alive
     */
    isAlive() {
        (0, common_1.abstract)();
    }
    /**
     * Returns if the entity is invisible
     */
    isInvisible() {
        (0, common_1.abstract)();
    }
    /**
     * Makes `this` rides on the ride
     * @param ride ride, vehicle
     * @returns Returns whether riding was successful
     */
    startRiding(ride) {
        (0, common_1.abstract)();
    }
    _isRiding() {
        (0, common_1.abstract)();
    }
    _isRidingOn(entity) {
        (0, common_1.abstract)();
    }
    isRiding(entity) {
        if (entity)
            return this._isRidingOn(entity);
        return this._isRiding();
    }
    _isPassenger(ride) {
        (0, common_1.abstract)();
    }
    isPassenger(ride) {
        if (ride instanceof Actor) {
            return this._isPassenger(ride);
        }
        else {
            const actor = Actor.fromUniqueIdBin(ride);
            if (actor === null) {
                throw Error("actor not found");
            }
            return this._isPassenger(actor);
        }
    }
    /**
     * The result is smooth movement only with `server-authoritative-movement=server-auth-with-rewind` & `correct-player-movement=true` in `server.properties`.
     *
     * If the entity is a Player, it works with only `server-authoritative-movement=server-auth-with-rewind` & `correct-player-movement=true` in `server.properties`.
     */
    setVelocity(dest) {
        (0, common_1.abstract)();
    }
    isInWater() {
        (0, common_1.abstract)();
    }
    getArmorContainer() {
        (0, common_1.abstract)();
    }
    getHandContainer() {
        (0, common_1.abstract)();
    }
    setOnFire(seconds) {
        (0, common_1.abstract)();
    }
    setOnFireNoEffects(seconds) {
        (0, common_1.abstract)();
    }
    static fromUniqueIdBin(bin, getRemovedActor = true) {
        (0, common_1.abstract)();
    }
    static fromUniqueId(lowbits, highbits, getRemovedActor = true) {
        return Actor.fromUniqueIdBin(bin_1.bin.make64(lowbits, highbits), getRemovedActor);
    }
    /**
     * Gets the entity from entity component of bedrock scripting api
     * @deprecated bedrock scripting API is removed.
     */
    static fromEntity(entity, getRemovedActor = true) {
        const u = entity.__unique_id__;
        return Actor.fromUniqueId(u["64bit_low"], u["64bit_high"], getRemovedActor);
    }
    static all() {
        (0, common_1.abstract)();
    }
    [nativeclass_1.nativeClassUtil.inspectFields](obj) {
        obj.name = this.getNameTag();
        obj.pos = this.getPosition();
        obj.type = this.getEntityTypeId();
    }
    runCommand(command, mute = true, permissionLevel) {
        (0, common_1.abstract)();
    }
    isMoving() {
        (0, common_1.abstract)();
    }
    getEquippedTotem() {
        (0, common_1.abstract)();
    }
    consumeTotem() {
        (0, common_1.abstract)();
    }
    hasTotemEquipped() {
        (0, common_1.abstract)();
    }
    hasFamily_(familyType) {
        (0, common_1.abstract)();
    }
    /**
     * Returns whether the entity has the family type.
     * Ref: https://minecraft.fandom.com/wiki/Family
     */
    hasFamily(familyType) {
        if (familyType instanceof hashedstring_1.HashedString) {
            return this.hasFamily_(familyType);
        }
        const hashStr = hashedstring_1.HashedString.constructWith(familyType);
        const hasFamily = this.hasFamily_(hashStr);
        hashStr.destruct();
        return hasFamily;
    }
    /**
     * Returns the distance from the entity(returns of {@link getPosition}) to {@link dest}
     */
    distanceTo(dest) {
        (0, common_1.abstract)();
    }
    /**
     * Returns the mob that hurt the entity(`this`)
     */
    getLastHurtByMob() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the last actor damage cause for the entity.
     */
    getLastHurtCause() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the last damage amount for the entity.
     */
    getLastHurtDamage() {
        (0, common_1.abstract)();
    }
    /**
     * Returns a mob that was hurt by the entity(`this`)
     */
    getLastHurtMob() {
        (0, common_1.abstract)();
    }
    /**
     * Returns whether the entity was last hit by a player.
     */
    wasLastHitByPlayer() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the speed of the entity
     * If the entity is a Player and server-authoritative-movement(in `server.properties`) is `client-auth`, the result is always 0m/s.
     */
    getSpeedInMetersPerSecond() {
        (0, common_1.abstract)();
    }
    fetchNearbyActorsSorted_(maxDistance, filter) {
        (0, common_1.abstract)();
    }
    /**
     * Fetches other entities nearby from the entity.
     */
    fetchNearbyActorsSorted(maxDistance, filter) {
        const vector = this.fetchNearbyActorsSorted_(maxDistance, filter);
        const length = vector.size();
        const arr = new Array(length);
        for (let i = 0; i < length; i++) {
            arr[i] = DistanceSortedActor.construct(vector.get(i));
        }
        vector.destruct();
        return arr;
    }
    /**
     * Returns whether the player is in creative mode
     */
    isCreative() {
        (0, common_1.abstract)();
    }
    /**
     * Returns whether the player is in adventure mode
     */
    isAdventure() {
        (0, common_1.abstract)();
    }
    /**
     * Returns whether the player is in survival mode
     */
    isSurvival() {
        (0, common_1.abstract)();
    }
    /**
     * Returns whether the player is in spectator mode
     */
    isSpectator() {
        (0, common_1.abstract)();
    }
    /**
     * Removes the entity
     */
    remove() {
        (0, common_1.abstract)();
    }
    /**
     * Returns whether the actor is angry
     */
    isAngry() {
        (0, common_1.abstract)();
    }
    /**
     * Find actor's attack target
     * @deprecated code not found
     */
    findAttackTarget() {
        console.error(colors.red("Actor.findAttackTarget is not available. deleted from BDS"));
        return null;
    }
    /**
     * Get actor targeting block
     */
    getBlockTarget() {
        (0, common_1.abstract)();
    }
    isAttackableGamemode() {
        (0, common_1.abstract)();
    }
    isInvulnerableTo(damageSource) {
        (0, common_1.abstract)();
    }
    canSee(target) {
        (0, common_1.abstract)();
    }
    isValidTarget(source = null) {
        (0, common_1.abstract)();
    }
    canAttack(target, unknown = false) {
        (0, common_1.abstract)();
    }
    getLastDeathPos() {
        (0, common_1.abstract)();
    }
    getLastDeathDimension() {
        (0, common_1.abstract)();
    }
    _getViewVector(unused) {
        (0, common_1.abstract)();
    }
    getViewVector() {
        // it yields the same output as other values
        return this._getViewVector(0.0);
    }
    isImmobile() {
        (0, common_1.abstract)();
    }
    isSwimming() {
        (0, common_1.abstract)();
    }
    /**
     * Changes the actor's size
     * @remarks This function does not update the actor's skin size.
     *
     * @param width - New width
     * @param height - New height
     */
    setSize(width, height) {
        (0, common_1.abstract)();
    }
    isInsidePortal() {
        (0, common_1.abstract)();
    }
    isInWorld() {
        (0, common_1.abstract)();
    }
    isInWaterOrRain() {
        (0, common_1.abstract)();
    }
    isInThunderstorm() {
        (0, common_1.abstract)();
    }
    isInSnow() {
        (0, common_1.abstract)();
    }
    isInScaffolding() {
        (0, common_1.abstract)();
    }
    isInRain() {
        (0, common_1.abstract)();
    }
    isInPrecipitation() {
        (0, common_1.abstract)();
    }
    isInLove() {
        (0, common_1.abstract)();
    }
    isInLava() {
        (0, common_1.abstract)();
    }
    isInContactWithWater() {
        (0, common_1.abstract)();
    }
    isInClouds() {
        (0, common_1.abstract)();
    }
    /**
     * @deprecated it's meaningless. Doesn't work for decayed objects.
     */
    isRemoved() {
        return false;
    }
    isBaby() {
        (0, common_1.abstract)();
    }
    getEntityData() {
        (0, common_1.abstract)();
    }
    /**
     * Scale: 1 is for adult (normal), 0.5 is for baby.
     * It changes the size of Hitbox, and entity's size.
     */
    setScale(scale) {
        const entityData = this.getEntityData();
        entityData.setFloat(ActorDataIDs.Scale, scale);
    }
    /**
     * Scale: 1 is for adult (normal), 0.5 is for baby.
     */
    getScale() {
        const entityData = this.getEntityData();
        return entityData.getFloat(ActorDataIDs.Scale);
    }
    getOwner() {
        (0, common_1.abstract)();
    }
    setOwner(entityId) {
        (0, common_1.abstract)();
    }
}
exports.Actor = Actor;
mangle_1.mangle.update(Actor);
let SynchedActorDataEntityWrapper = class SynchedActorDataEntityWrapper extends nativeclass_1.AbstractClass {
    /**
     * SynchedActorDataEntityWrapper::set<float>
     */
    setFloat(id, value) {
        (0, common_1.abstract)();
    }
    /**
     * SynchedActorDataEntityWrapper::getFloat
     */
    getFloat(id) {
        (0, common_1.abstract)();
    }
};
SynchedActorDataEntityWrapper = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], SynchedActorDataEntityWrapper);
exports.SynchedActorDataEntityWrapper = SynchedActorDataEntityWrapper;
var ActorDataIDs;
(function (ActorDataIDs) {
    ActorDataIDs[ActorDataIDs["Scale"] = 38] = "Scale";
    ActorDataIDs[ActorDataIDs["Width"] = 53] = "Width";
    ActorDataIDs[ActorDataIDs["Height"] = 54] = "Height";
})(ActorDataIDs = exports.ActorDataIDs /** : unsigned short */ || (exports.ActorDataIDs /** : unsigned short */ = {}));
let DistanceSortedActor = class DistanceSortedActor extends nativeclass_1.NativeStruct {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(Actor.ref())
], DistanceSortedActor.prototype, "entity", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t, { ghost: true })
], DistanceSortedActor.prototype, "distance", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], DistanceSortedActor.prototype, "distanceSq", void 0);
DistanceSortedActor = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], DistanceSortedActor);
exports.DistanceSortedActor = DistanceSortedActor;
class Mob extends Actor {
    /**
     * @returns the entity's armor value (as an integer)
     */
    getArmorValue() {
        (0, common_1.abstract)();
    }
    /**
     * Applies knockback to the mob
     */
    knockback(source, damage, xd, zd, power, height, heightCap) {
        (0, common_1.abstract)();
    }
    getSpeed() {
        (0, common_1.abstract)();
    }
    isSprinting() {
        (0, common_1.abstract)();
    }
    sendArmorSlot(slot) {
        (0, common_1.abstract)();
    }
    setSprinting(shouldSprint) {
        (0, common_1.abstract)();
    }
    _sendInventory(shouldSelectSlot) {
        (0, common_1.abstract)();
    }
    /**
     * Updates the mob's inventory
     * @remarks used in PlayerHotbarPacket if the mob is a player
     *
     * @param shouldSelectSlot - Defines whether the sync selected slot also. (Sends `PlayerHotbarPacket`)
     */
    sendInventory(shouldSelectSlot = false) {
        this._sendInventory(shouldSelectSlot);
    }
    setSpeed(speed) {
        (0, common_1.abstract)();
    }
    hurtEffects_(sourceOrCause, damage, knock, ignite) {
        (0, common_1.abstract)();
    }
    hurtEffects(sourceOrCause, damage, knock, ignite) {
        const isSource = sourceOrCause instanceof ActorDamageSource;
        const source = isSource ? sourceOrCause : ActorDamageSource.create(sourceOrCause);
        const retval = this.hurtEffects_(source, damage, knock, ignite);
        return retval;
    }
    getArmorCoverPercentage() {
        (0, common_1.abstract)();
    }
    getToughnessValue() {
        (0, common_1.abstract)();
    }
    isBlocking() {
        (0, common_1.abstract)();
    }
}
exports.Mob = Mob;
class ItemActor extends Actor {
}
exports.ItemActor = ItemActor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGlDQUFpQztBQUNqQyxnQ0FBNkI7QUFFN0Isc0NBQXFDO0FBQ3JDLGtDQUFxRDtBQUdyRCxzQ0FBbUM7QUFDbkMsZ0RBQXFIO0FBQ3JILDhDQUEwRztBQUMxRywyQ0FBK0U7QUFDL0UsbUNBQTZDO0FBSzdDLHVDQUF1RTtBQUN2RSxpREFBOEM7QUFHOUMsK0JBQXlDO0FBSXpDLHVDQUFpQztBQUVwQixRQUFBLGFBQWEsR0FBRyxvQkFBTyxDQUFDLE9BQU8sQ0FBQztJQUN6QyxVQUFVLEVBQUUsY0FBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUMsUUFBUSxFQUFFO0NBQ2xFLENBQUMsQ0FBQztBQUdILElBQVksV0FLWDtBQUxELFdBQVksV0FBVztJQUNuQix1REFBYSxDQUFBO0lBQ2IsaURBQVUsQ0FBQTtJQUNWLGlEQUFVLENBQUE7SUFDVix1REFBYSxDQUFBO0FBQ2pCLENBQUMsRUFMVyxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQUt0QjtBQUVELE1BQWEsY0FBZSxTQUFRLGtCQUFXO0NBQUc7QUFBbEQsd0NBQWtEO0FBRWxELElBQVksU0F3Slg7QUF4SkQsV0FBWSxTQUFTO0lBQ2pCLDBDQUFXLENBQUE7SUFDWCxvREFBUyxDQUFBO0lBQ1QsMERBQVksQ0FBQTtJQUNaLHdEQUFXLENBQUE7SUFDWCxzREFBaUIsQ0FBQTtJQUNqQixzREFBVSxDQUFBO0lBQ1YsMERBQVksQ0FBQTtJQUNaLGdFQUFlLENBQUE7SUFDZix3REFBa0IsQ0FBQTtJQUNsQixzREFBVSxDQUFBO0lBQ1Ysa0RBQWUsQ0FBQTtJQUNmLG9EQUFnQixDQUFBO0lBQ2hCLDBEQUFtQixDQUFBO0lBQ25CLDREQUFvQixDQUFBO0lBQ3BCLGdFQUFlLENBQUE7SUFDZixpREFBYyxDQUFBO0lBQ2QsK0NBQWEsQ0FBQTtJQUNiLGlEQUFjLENBQUE7SUFD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