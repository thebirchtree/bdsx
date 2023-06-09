"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BedSleepingResult = exports.LevelEvent = exports.Spawner = exports.TagRegistry = exports.AdventureSettings = exports.BlockPalette = exports.ActorFactory = exports.LevelData = exports.ServerLevel = exports.Level = exports.Difficulty = void 0;
const common_1 = require("../common");
const cxxvector_1 = require("../cxxvector");
const nativeclass_1 = require("../nativeclass");
var Difficulty;
(function (Difficulty) {
    Difficulty[Difficulty["Peaceful"] = 0] = "Peaceful";
    Difficulty[Difficulty["Easy"] = 1] = "Easy";
    Difficulty[Difficulty["Normal"] = 2] = "Normal";
    Difficulty[Difficulty["Hard"] = 3] = "Hard";
})(Difficulty = exports.Difficulty || (exports.Difficulty = {}));
class Level extends nativeclass_1.NativeClass {
    /** @deprecated Use `this.getPlayers()` instead */
    get players() {
        const players = new cxxvector_1.CxxVectorLike(this.getPlayers());
        Object.defineProperty(this, "players", {
            get() {
                players.setFromArray(this.getPlayers());
                return players;
            },
        });
        return players;
    }
    /**
     * Returns an array of all online players in the level
     */
    getPlayers() {
        (0, common_1.abstract)();
    }
    getUsers() {
        (0, common_1.abstract)();
    }
    getActiveUsers() {
        (0, common_1.abstract)();
    }
    _getEntities() {
        (0, common_1.abstract)();
    }
    getEntities() {
        (0, common_1.abstract)();
    }
    getRuntimeEntity(runtimeId, getRemoved = false) {
        (0, common_1.abstract)();
    }
    getRuntimePlayer(runtimeId) {
        (0, common_1.abstract)();
    }
    createDimension(id) {
        (0, common_1.abstract)();
    }
    getOrCreateDimension(id) {
        (0, common_1.abstract)();
    }
    /**
     * Destroys a block at the given position
     *
     * @returns {boolean} Whether the block was destroyed successfully
     */
    destroyBlock(blockSource, blockPos, dropResources) {
        (0, common_1.abstract)();
    }
    /**
     * Gets an entity with the given unique id
     */
    fetchEntity(actorUniqueId, getRemoved) {
        (0, common_1.abstract)();
    }
    /**
     * Returns the number of current online players
     */
    getActivePlayerCount() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the ActorFactory instance
     */
    getActorFactory() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the AdventureSettings instance
     */
    getAdventureSettings() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the BlockPalette instance
     */
    getBlockPalette() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the Dimension instance
     */
    getDimension(dimension) {
        (0, common_1.abstract)();
    }
    getDimensionWeakRef(dimension) {
        (0, common_1.abstract)();
    }
    /**
     * Returns the LevelData instance
     */
    getLevelData() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the GameRules instance
     * @deprecated use bedrockServer.gameRules
     */
    getGameRules() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the Scoreboard instance
     */
    getScoreboard() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the level's random seed
     */
    getSeed() {
        (0, common_1.abstract)();
    }
    /**
     * Constructs a StructureManager instance, you need to destruct it later
     * @deprecated use bedrockServer.structureManager
     */
    getStructureManager() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the Spawner instance
     */
    getSpawner() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the TagRegistry instance
     */
    getTagRegistry() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the level's time
     */
    getTime() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the level's current tick
     */
    getCurrentTick() {
        (0, common_1.abstract)();
    }
    /**
     * Returns whether the level has allow-cheats turned on
     */
    hasCommandsEnabled() {
        (0, common_1.abstract)();
    }
    /**
     * Changes the allow-cheats state of the level
     */
    setCommandsEnabled(value) {
        (0, common_1.abstract)();
    }
    setShouldSendSleepMessage(value) {
        (0, common_1.abstract)();
    }
    /**
     * Changes the level's time
     */
    setTime(time) {
        (0, common_1.abstract)();
    }
    /**
     * Syncs the level's game rules with all clients
     */
    syncGameRules() {
        (0, common_1.abstract)();
    }
    /**
     * Spawn a particle effect at the given position
     *
     * @param effectName accepts format like "minecraft:arrow_spell_emitter"
     *
     * @see https://www.digminecraft.com/lists/particle_list_pe.php
     * */
    spawnParticleEffect(effectName, spawnLocation, dimension) {
        (0, common_1.abstract)();
    }
    /**
     * Returns a random Player
     */
    getRandomPlayer() {
        (0, common_1.abstract)();
    }
    /**
     * Updates the level's weather
     */
    updateWeather(rainLevel, rainTime, lightningLevel, lightningTime) {
        (0, common_1.abstract)();
    }
    setDefaultSpawn(pos) {
        (0, common_1.abstract)();
    }
    getDefaultSpawn() {
        (0, common_1.abstract)();
    }
    explode(region, source, pos, explosionRadius, fire, breaksBlocks, maxResistance, allowUnderwater) {
        (0, common_1.abstract)();
    }
    getPlayerByXuid(xuid) {
        (0, common_1.abstract)();
    }
    getDifficulty() {
        (0, common_1.abstract)();
    }
    setDifficulty(difficulty) {
        (0, common_1.abstract)();
    }
    getNewUniqueID() {
        (0, common_1.abstract)();
    }
    getNextRuntimeID() {
        (0, common_1.abstract)();
    }
    sendAllPlayerAbilities(player) {
        (0, common_1.abstract)();
    }
}
exports.Level = Level;
class ServerLevel extends Level {
}
exports.ServerLevel = ServerLevel;
class LevelData extends nativeclass_1.NativeClass {
    getGameDifficulty() {
        (0, common_1.abstract)();
    }
    setGameDifficulty(value) {
        (0, common_1.abstract)();
    }
}
exports.LevelData = LevelData;
class ActorFactory extends nativeclass_1.NativeClass {
}
exports.ActorFactory = ActorFactory;
class BlockPalette extends nativeclass_1.NativeClass {
    getBlockLegacy(name) {
        (0, common_1.abstract)();
    }
}
exports.BlockPalette = BlockPalette;
class AdventureSettings extends nativeclass_1.NativeClass {
}
exports.AdventureSettings = AdventureSettings;
class TagRegistry extends nativeclass_1.NativeClass {
}
exports.TagRegistry = TagRegistry;
class Spawner extends nativeclass_1.NativeClass {
    spawnItem(region, itemStack, pos, throwTime) {
        (0, common_1.abstract)();
    }
    spawnMob(region, id, pos, naturalSpawn = false, surface = true, fromSpawner = false) {
        (0, common_1.abstract)();
    }
}
exports.Spawner = Spawner;
var LevelEvent;
(function (LevelEvent) {
    LevelEvent[LevelEvent["SoundClick"] = 1000] = "SoundClick";
    LevelEvent[LevelEvent["SoundClickFail"] = 1001] = "SoundClickFail";
    LevelEvent[LevelEvent["SoundLaunch"] = 1002] = "SoundLaunch";
    LevelEvent[LevelEvent["SoundOpenDoor"] = 1003] = "SoundOpenDoor";
    LevelEvent[LevelEvent["SoundFizz"] = 1004] = "SoundFizz";
    LevelEvent[LevelEvent["SoundFuse"] = 1005] = "SoundFuse";
    LevelEvent[LevelEvent["SoundPlayRecording"] = 1006] = "SoundPlayRecording";
    LevelEvent[LevelEvent["SoundGhastWarning"] = 1007] = "SoundGhastWarning";
    LevelEvent[LevelEvent["SoundGhastFireball"] = 1008] = "SoundGhastFireball";
    LevelEvent[LevelEvent["SoundBlazeFireball"] = 1009] = "SoundBlazeFireball";
    LevelEvent[LevelEvent["SoundZombieWoodenDoor"] = 1010] = "SoundZombieWoodenDoor";
    LevelEvent[LevelEvent["SoundZombieDoorCrash"] = 1012] = "SoundZombieDoorCrash";
    LevelEvent[LevelEvent["SoundZombieInfected"] = 1016] = "SoundZombieInfected";
    LevelEvent[LevelEvent["SoundZombieConverted"] = 1017] = "SoundZombieConverted";
    LevelEvent[LevelEvent["SoundEndermanTeleport"] = 1018] = "SoundEndermanTeleport";
    LevelEvent[LevelEvent["SoundAnvilBroken"] = 1020] = "SoundAnvilBroken";
    LevelEvent[LevelEvent["SoundAnvilUsed"] = 1021] = "SoundAnvilUsed";
    LevelEvent[LevelEvent["SoundAnvilLand"] = 1022] = "SoundAnvilLand";
    LevelEvent[LevelEvent["SoundInfinityArrowPickup"] = 1030] = "SoundInfinityArrowPickup";
    LevelEvent[LevelEvent["SoundTeleportEnderPearl"] = 1032] = "SoundTeleportEnderPearl";
    LevelEvent[LevelEvent["SoundAddItem"] = 1040] = "SoundAddItem";
    LevelEvent[LevelEvent["SoundItemFrameBreak"] = 1041] = "SoundItemFrameBreak";
    LevelEvent[LevelEvent["SoundItemFramePlace"] = 1042] = "SoundItemFramePlace";
    LevelEvent[LevelEvent["SoundItemFrameRemoveItem"] = 1043] = "SoundItemFrameRemoveItem";
    LevelEvent[LevelEvent["SoundItemFrameRotateItem"] = 1044] = "SoundItemFrameRotateItem";
    LevelEvent[LevelEvent["SoundExperienceOrbPickup"] = 1051] = "SoundExperienceOrbPickup";
    LevelEvent[LevelEvent["SoundTotemUsed"] = 1052] = "SoundTotemUsed";
    LevelEvent[LevelEvent["SoundArmorStandBreak"] = 1060] = "SoundArmorStandBreak";
    LevelEvent[LevelEvent["SoundArmorStandHit"] = 1061] = "SoundArmorStandHit";
    LevelEvent[LevelEvent["SoundArmorStandLand"] = 1062] = "SoundArmorStandLand";
    LevelEvent[LevelEvent["SoundArmorStandPlace"] = 1063] = "SoundArmorStandPlace";
    LevelEvent[LevelEvent["ParticlesShoot"] = 2000] = "ParticlesShoot";
    LevelEvent[LevelEvent["ParticlesDestroyBlock"] = 2001] = "ParticlesDestroyBlock";
    LevelEvent[LevelEvent["ParticlesPotionSplash"] = 2002] = "ParticlesPotionSplash";
    LevelEvent[LevelEvent["ParticlesEyeOfEnderDeath"] = 2003] = "ParticlesEyeOfEnderDeath";
    LevelEvent[LevelEvent["ParticlesMobBlockSpawn"] = 2004] = "ParticlesMobBlockSpawn";
    LevelEvent[LevelEvent["ParticleCropGrowth"] = 2005] = "ParticleCropGrowth";
    LevelEvent[LevelEvent["ParticleSoundGuardianGhost"] = 2006] = "ParticleSoundGuardianGhost";
    LevelEvent[LevelEvent["ParticleDeathSmoke"] = 2007] = "ParticleDeathSmoke";
    LevelEvent[LevelEvent["ParticleDenyBlock"] = 2008] = "ParticleDenyBlock";
    LevelEvent[LevelEvent["ParticleGenericSpawn"] = 2009] = "ParticleGenericSpawn";
    LevelEvent[LevelEvent["ParticlesDragonEgg"] = 2010] = "ParticlesDragonEgg";
    LevelEvent[LevelEvent["ParticlesCropEaten"] = 2011] = "ParticlesCropEaten";
    LevelEvent[LevelEvent["ParticlesCrit"] = 2012] = "ParticlesCrit";
    LevelEvent[LevelEvent["ParticlesTeleport"] = 2013] = "ParticlesTeleport";
    LevelEvent[LevelEvent["ParticlesCrackBlock"] = 2014] = "ParticlesCrackBlock";
    LevelEvent[LevelEvent["ParticlesBubble"] = 2015] = "ParticlesBubble";
    LevelEvent[LevelEvent["ParticlesEvaporate"] = 2016] = "ParticlesEvaporate";
    LevelEvent[LevelEvent["ParticlesDestroyArmorStand"] = 2017] = "ParticlesDestroyArmorStand";
    LevelEvent[LevelEvent["ParticlesBreakingEgg"] = 2018] = "ParticlesBreakingEgg";
    LevelEvent[LevelEvent["ParticleDestroyEgg"] = 2019] = "ParticleDestroyEgg";
    LevelEvent[LevelEvent["ParticlesEvaporateWater"] = 2020] = "ParticlesEvaporateWater";
    LevelEvent[LevelEvent["ParticlesDestroyBlockNoSound"] = 2021] = "ParticlesDestroyBlockNoSound";
    LevelEvent[LevelEvent["ParticlesKnockbackRoar"] = 2022] = "ParticlesKnockbackRoar";
    LevelEvent[LevelEvent["ParticlesTeleportTrail"] = 2023] = "ParticlesTeleportTrail";
    LevelEvent[LevelEvent["ParticlesPointCloud"] = 2024] = "ParticlesPointCloud";
    LevelEvent[LevelEvent["ParticlesExplosion"] = 2025] = "ParticlesExplosion";
    LevelEvent[LevelEvent["ParticlesBlockExplosion"] = 2026] = "ParticlesBlockExplosion";
    LevelEvent[LevelEvent["StartRaining"] = 185] = "StartRaining";
    LevelEvent[LevelEvent["StartThunderstorm"] = 186] = "StartThunderstorm";
    LevelEvent[LevelEvent["StopRaining"] = 187] = "StopRaining";
    LevelEvent[LevelEvent["StopThunderstorm"] = 188] = "StopThunderstorm";
    LevelEvent[LevelEvent["GlobalPause"] = 189] = "GlobalPause";
    LevelEvent[LevelEvent["SimTimeStep"] = 190] = "SimTimeStep";
    LevelEvent[LevelEvent["SimTimeScale"] = 191] = "SimTimeScale";
    LevelEvent[LevelEvent["ActivateBlock"] = 3500] = "ActivateBlock";
    LevelEvent[LevelEvent["CauldronExplode"] = 3501] = "CauldronExplode";
    LevelEvent[LevelEvent["CauldronDyeArmor"] = 3502] = "CauldronDyeArmor";
    LevelEvent[LevelEvent["CauldronCleanArmor"] = 3503] = "CauldronCleanArmor";
    LevelEvent[LevelEvent["CauldronFillPotion"] = 3504] = "CauldronFillPotion";
    LevelEvent[LevelEvent["CauldronTakePotion"] = 3505] = "CauldronTakePotion";
    LevelEvent[LevelEvent["CauldronFillWater"] = 3506] = "CauldronFillWater";
    LevelEvent[LevelEvent["CauldronTakeWater"] = 3507] = "CauldronTakeWater";
    LevelEvent[LevelEvent["CauldronAddDye"] = 3508] = "CauldronAddDye";
    LevelEvent[LevelEvent["CauldronCleanBanner"] = 3509] = "CauldronCleanBanner";
    LevelEvent[LevelEvent["CauldronFlush"] = 3510] = "CauldronFlush";
    LevelEvent[LevelEvent["AgentSpawnEffect"] = 3511] = "AgentSpawnEffect";
    LevelEvent[LevelEvent["CauldronFillLava"] = 3512] = "CauldronFillLava";
    LevelEvent[LevelEvent["CauldronTakeLava"] = 3513] = "CauldronTakeLava";
    LevelEvent[LevelEvent["StartBlockCracking"] = 3600] = "StartBlockCracking";
    LevelEvent[LevelEvent["StopBlockCracking"] = 3601] = "StopBlockCracking";
    LevelEvent[LevelEvent["UpdateBlockCracking"] = 3602] = "UpdateBlockCracking";
    LevelEvent[LevelEvent["AllPlayersSleeping"] = 9800] = "AllPlayersSleeping";
    LevelEvent[LevelEvent["JumpPrevented"] = 9810] = "JumpPrevented";
    LevelEvent[LevelEvent["ParticleLegacyEvent"] = 16384] = "ParticleLegacyEvent";
})(LevelEvent = exports.LevelEvent || (exports.LevelEvent = {}));
var BedSleepingResult;
(function (BedSleepingResult) {
    BedSleepingResult[BedSleepingResult["OK_2"] = 0] = "OK_2";
    BedSleepingResult[BedSleepingResult["NOT_POSSIBLE_HERE"] = 1] = "NOT_POSSIBLE_HERE";
    BedSleepingResult[BedSleepingResult["NOT_POSSIBLE_NOW"] = 2] = "NOT_POSSIBLE_NOW";
    BedSleepingResult[BedSleepingResult["TOO_FAR_AWAY"] = 3] = "TOO_FAR_AWAY";
    BedSleepingResult[BedSleepingResult["OTHER_PROBLEM"] = 4] = "OTHER_PROBLEM";
    BedSleepingResult[BedSleepingResult["NOT_SAFE"] = 5] = "NOT_SAFE";
})(BedSleepingResult = exports.BedSleepingResult || (exports.BedSleepingResult = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV2ZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsZXZlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBcUM7QUFFckMsNENBQXdEO0FBQ3hELGdEQUE2QztBQVk3QyxJQUFZLFVBS1g7QUFMRCxXQUFZLFVBQVU7SUFDbEIsbURBQVEsQ0FBQTtJQUNSLDJDQUFJLENBQUE7SUFDSiwrQ0FBTSxDQUFBO0lBQ04sMkNBQUksQ0FBQTtBQUNSLENBQUMsRUFMVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUtyQjtBQUVELE1BQWEsS0FBTSxTQUFRLHlCQUFXO0lBRWxDLGtEQUFrRDtJQUNsRCxJQUFJLE9BQU87UUFDUCxNQUFNLE9BQU8sR0FBRyxJQUFJLHlCQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDckQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQ25DLEdBQUc7Z0JBQ0MsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztnQkFDeEMsT0FBTyxPQUFPLENBQUM7WUFDbkIsQ0FBQztTQUNKLENBQUMsQ0FBQztRQUNILE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRDs7T0FFRztJQUNILFVBQVU7UUFDTixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxRQUFRO1FBQ0osSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsY0FBYztRQUNWLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNTLFlBQVk7UUFDbEIsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsV0FBVztRQUNQLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELGdCQUFnQixDQUFDLFNBQXlCLEVBQUUsYUFBc0IsS0FBSztRQUNuRSxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJ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