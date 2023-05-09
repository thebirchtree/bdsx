"use strict";
var DefaultDataLoaderHelper_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const asmcode_1 = require("../asm/asmcode");
const assembler_1 = require("../assembler");
const bin_1 = require("../bin");
const capi_1 = require("../capi");
const commandparser_1 = require("../commandparser");
const commandresult_1 = require("../commandresult");
const common_1 = require("../common");
const core_1 = require("../core");
const cxxvector_1 = require("../cxxvector");
const decay_1 = require("../decay");
const event_1 = require("../event");
const launcher_1 = require("../launcher");
const makefunc_1 = require("../makefunc");
const mce_1 = require("../mce");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const pointer_1 = require("../pointer");
const prochacker_1 = require("../prochacker");
const sharedpointer_1 = require("../sharedpointer");
const util_1 = require("../util");
const abilities_1 = require("./abilities");
const actor_1 = require("./actor");
const attribute_1 = require("./attribute");
const bedrock_1 = require("./bedrock");
const biome_1 = require("./biome");
const block_1 = require("./block");
const blockpos_1 = require("./blockpos");
const chunk_1 = require("./chunk");
const command = require("./command");
const command_1 = require("./command");
const commandname_1 = require("./commandname");
const commandorigin_1 = require("./commandorigin");
require("./commandparsertypes");
const components_1 = require("./components");
const connreq_1 = require("./connreq");
const cxxoptional_1 = require("./cxxoptional");
const dimension_1 = require("./dimension");
const effects_1 = require("./effects");
const enchants_1 = require("./enchants");
const gamemode_1 = require("./gamemode");
const gamerules_1 = require("./gamerules");
const hashedstring_1 = require("./hashedstring");
const inventory_1 = require("./inventory");
const item_component_1 = require("./item_component");
const level_1 = require("./level");
const nbt_1 = require("./nbt");
const networkidentifier_1 = require("./networkidentifier");
const packet_1 = require("./packet");
const packets_1 = require("./packets");
const peer_1 = require("./peer");
const player_1 = require("./player");
const raknet_1 = require("./raknet");
const raknetinstance_1 = require("./raknetinstance");
const scoreboard_1 = require("./scoreboard");
const server_1 = require("./server");
const sharedptr_1 = require("./sharedptr");
const skin_1 = require("./skin");
const stream_1 = require("./stream");
const structure_1 = require("./structure");
const symbols_1 = require("./symbols");
const weakreft_1 = require("./weakreft");
// avoiding circular dependency
// Wrappers
const WrappedInt32 = pointer_1.Wrapper.make(nativetype_1.int32_t);
// std::vector
const CxxVector$Vec3 = cxxvector_1.CxxVector.make(blockpos_1.Vec3);
const CxxVector$string = cxxvector_1.CxxVector.make(nativetype_1.CxxString);
const CxxVector$ScoreboardIdentityRef = cxxvector_1.CxxVector.make(scoreboard_1.ScoreboardIdentityRef);
const CxxVector$ScoreboardId = cxxvector_1.CxxVector.make(scoreboard_1.ScoreboardId);
const CxxVector$EntityRefTraits = cxxvector_1.CxxVector.make(actor_1.EntityRefTraits);
const CxxVector$CommandName = cxxvector_1.CxxVector.make(commandname_1.CommandName);
const CxxVector$CxxStringWith8Bytes = cxxvector_1.CxxVector.make(nativetype_1.CxxStringWith8Bytes);
// utils
var CommandUtils;
(function (CommandUtils) {
    CommandUtils.createItemStack = prochacker_1.procHacker.js("?createItemStack@CommandUtils@@YA?AVItemStack@@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@HH@Z", inventory_1.ItemStack, { structureReturn: true }, nativetype_1.CxxString, nativetype_1.int32_t, nativetype_1.int32_t);
    CommandUtils.spawnEntityAt = prochacker_1.procHacker.js("?spawnEntityAt@CommandUtils@@YAPEAVActor@@AEAVBlockSource@@AEBVVec3@@AEBUActorDefinitionIdentifier@@AEAUActorUniqueID@@PEAV2@@Z", actor_1.Actor, null, block_1.BlockSource, blockpos_1.Vec3, actor_1.ActorDefinitionIdentifier, core_1.StaticPointer, core_1.VoidPointer);
    CommandUtils.getFeetPos = prochacker_1.procHacker.js("?getFeetPos@CommandUtils@@YA?AVVec3@@PEBVActor@@@Z", blockpos_1.Vec3, { structureReturn: true }, actor_1.Actor);
})(CommandUtils || (CommandUtils = {}));
var OnFireSystem;
(function (OnFireSystem) {
    OnFireSystem.setOnFire = prochacker_1.procHacker.js("?setOnFire@OnFireSystem@@SAXAEAVActor@@H@Z", nativetype_1.void_t, null, actor_1.Actor, nativetype_1.int32_t);
    OnFireSystem.setOnFireNoEffects = prochacker_1.procHacker.js("?setOnFireNoEffects@OnFireSystem@@SAXAEAVActor@@H@Z", nativetype_1.void_t, null, actor_1.Actor, nativetype_1.int32_t);
})(OnFireSystem || (OnFireSystem = {}));
// level.ts
// assume all Level is always ServerLevel.
const DimensionWeakRef = weakreft_1.WeakRefT.make(dimension_1.Dimension);
level_1.Level.prototype.getOrCreateDimension = prochacker_1.procHacker.js("?getOrCreateDimension@Level@@UEAA?AV?$WeakRefT@U?$SharePtrRefTraits@VDimension@@@@@@V?$AutomaticID@VDimension@@H@@@Z", DimensionWeakRef, { this: level_1.Level, structureReturn: true }, nativetype_1.int32_t);
level_1.Level.prototype.createDimension = function (id) {
    const ref = this.getOrCreateDimension(id);
    process.nextTick(() => ref.dispose());
    return ref.p;
};
level_1.Level.prototype.destroyBlock = prochacker_1.procHacker.js("?destroyBlock@Level@@UEAA_NAEAVBlockSource@@AEBVBlockPos@@_N@Z", nativetype_1.bool_t, { this: level_1.Level }, block_1.BlockSource, blockpos_1.BlockPos, nativetype_1.bool_t);
level_1.Level.prototype.fetchEntity = prochacker_1.procHacker.js("?fetchEntity@Level@@UEBAPEAVActor@@UActorUniqueID@@_N@Z", actor_1.Actor, { this: level_1.Level }, nativetype_1.bin64_t, nativetype_1.bool_t);
level_1.Level.prototype.getActivePlayerCount = prochacker_1.procHacker.js("?getActivePlayerCount@Level@@UEBAHXZ", nativetype_1.int32_t, { this: level_1.Level });
level_1.Level.prototype.getActorFactory = prochacker_1.procHacker.js("?getActorFactory@Level@@UEAAAEAVActorFactory@@XZ", level_1.ActorFactory, { this: level_1.Level });
level_1.Level.prototype.getAdventureSettings = prochacker_1.procHacker.js("?getAdventureSettings@Level@@UEAAAEAUAdventureSettings@@XZ", level_1.AdventureSettings, { this: level_1.Level });
level_1.Level.prototype.getBlockPalette = prochacker_1.procHacker.js("?getBlockPalette@Level@@UEAAAEAVBlockPalette@@XZ", level_1.BlockPalette, { this: level_1.Level });
level_1.Level.prototype.getDimension = function (id) {
    const ref = this.getDimensionWeakRef(id);
    const p = ref.p;
    if (p !== null)
        process.nextTick(() => ref.dispose());
    return p;
};
level_1.Level.prototype.getDimensionWeakRef = prochacker_1.procHacker.js("?getDimension@Level@@UEBA?AV?$WeakRefT@U?$SharePtrRefTraits@VDimension@@@@@@V?$AutomaticID@VDimension@@H@@@Z", DimensionWeakRef, { this: level_1.Level, structureReturn: true }, nativetype_1.int32_t);
level_1.Level.prototype.getLevelData = prochacker_1.procHacker.js("?getLevelData@Level@@UEAAAEAVLevelData@@XZ", level_1.LevelData.ref(), { this: level_1.Level });
level_1.Level.prototype.getGameRules = function () {
    return launcher_1.bedrockServer.gameRules;
};
level_1.Level.prototype.getScoreboard = prochacker_1.procHacker.js("?getScoreboard@Level@@UEAAAEAVScoreboard@@XZ", scoreboard_1.Scoreboard, { this: level_1.Level });
level_1.Level.prototype.getSeed = prochacker_1.procHacker.js("?getSeed@Level@@UEAAIXZ", nativetype_1.uint32_t, {
    this: level_1.Level,
});
class StructureManagerShim extends structure_1.StructureManager {
    [nativetype_1.NativeType.dtor]() {
        // empty
    }
}
level_1.Level.prototype.getStructureManager = function () {
    return launcher_1.bedrockServer.structureManager.as(StructureManagerShim);
};
level_1.Level.prototype.getSpawner = prochacker_1.procHacker.js("?getSpawner@Level@@UEBAAEAVSpawner@@XZ", level_1.Spawner, { this: level_1.Level });
level_1.Level.prototype.getTagRegistry = prochacker_1.procHacker.js("?getTagRegistry@Level@@UEAAAEAV?$TagRegistry@U?$IDType@ULevelTagIDType@@@@U?$IDType@ULevelTagSetIDType@@@@@@XZ", level_1.TagRegistry, { this: level_1.Level });
level_1.Level.prototype.hasCommandsEnabled = prochacker_1.procHacker.js("?hasCommandsEnabled@Level@@UEBA_NXZ", nativetype_1.bool_t, { this: level_1.Level });
level_1.Level.prototype.setCommandsEnabled = prochacker_1.procHacker.js("?setCommandsEnabled@ServerLevel@@UEAAX_N@Z", nativetype_1.void_t, { this: level_1.ServerLevel }, nativetype_1.bool_t);
level_1.Level.prototype.setShouldSendSleepMessage = prochacker_1.procHacker.js("?setShouldSendSleepMessage@ServerLevel@@QEAAX_N@Z", nativetype_1.void_t, { this: level_1.ServerLevel }, nativetype_1.bool_t);
level_1.Level.prototype.getPlayerByXuid = prochacker_1.procHacker.js("?getPlayerByXuid@Level@@UEBAPEAVPlayer@@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", player_1.Player, { this: level_1.Level }, nativetype_1.CxxString);
const unique_ptr$GameRulesChangedPacket = pointer_1.Wrapper.make(packets_1.GameRulesChangedPacket.ref());
const GameRules$createAllGameRulesPacket = prochacker_1.procHacker.js("?createAllGameRulesPacket@GameRules@@QEBA?AV?$unique_ptr@VGameRulesChangedPacket@@U?$default_delete@VGameRulesChangedPacket@@@std@@@std@@XZ", unique_ptr$GameRulesChangedPacket, { this: gamerules_1.GameRules }, unique_ptr$GameRulesChangedPacket);
level_1.Level.prototype.syncGameRules = function () {
    const wrapper = new unique_ptr$GameRulesChangedPacket(true);
    GameRules$createAllGameRulesPacket.call(this.getGameRules(), wrapper);
    for (const player of launcher_1.bedrockServer.serverInstance.getPlayers()) {
        player.sendNetworkPacket(wrapper.value);
    }
    wrapper.destruct();
};
level_1.Level.prototype.spawnParticleEffect = prochacker_1.procHacker.js("?spawnParticleEffect@Level@@UEAAXAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEBVVec3@@PEAVDimension@@@Z", nativetype_1.void_t, { this: level_1.Level }, nativetype_1.CxxString, blockpos_1.Vec3, dimension_1.Dimension);
const level$setTime = prochacker_1.procHacker.js("?setTime@Level@@UEAAXH@Z", nativetype_1.void_t, { this: level_1.Level }, nativetype_1.int64_as_float_t);
level_1.Level.prototype.setTime = function (time) {
    level$setTime.call(this, time);
    const packet = packets_1.SetTimePacket.allocate();
    packet.time = time;
    for (const player of launcher_1.bedrockServer.serverInstance.getPlayers()) {
        player.sendNetworkPacket(packet);
    }
    packet.dispose();
};
level_1.Level.prototype.getPlayers = function () {
    const out = [];
    for (const user of this.getUsers()) {
        const entity = actor_1.Actor.tryGetFromEntity(user.context._getStackRef());
        if (!(entity instanceof player_1.ServerPlayer))
            continue;
        out.push(entity);
    }
    return out;
};
level_1.Level.prototype.getUsers = prochacker_1.procHacker.js("?getUsers@Level@@UEAAAEAV?$vector@V?$OwnerPtrT@UEntityRefTraits@@@@V?$allocator@V?$OwnerPtrT@UEntityRefTraits@@@@@std@@@std@@XZ", CxxVector$EntityRefTraits, { this: level_1.Level });
level_1.Level.prototype.getActiveUsers = prochacker_1.procHacker.js("?getActiveUsers@Level@@UEBAAEBV?$vector@VWeakEntityRef@@V?$allocator@VWeakEntityRef@@@std@@@std@@XZ", cxxvector_1.CxxVector.make(actor_1.WeakEntityRef), { this: level_1.Level });
level_1.Level.prototype._getEntities = prochacker_1.procHacker.js("?getEntities@Level@@UEBAAEBV?$vector@V?$OwnerPtrT@UEntityRefTraits@@@@V?$allocator@V?$OwnerPtrT@UEntityRefTraits@@@@@std@@@std@@XZ", CxxVector$EntityRefTraits, { this: level_1.Level });
level_1.Level.prototype.getEntities = function () {
    const out = [];
    for (const refTraits of this._getEntities()) {
        const entity = actor_1.Actor.tryGetFromEntity(refTraits.context._getStackRef());
        if (entity === null)
            continue;
        out.push(entity);
    }
    return out;
};
const Level$getRuntimeEntity = prochacker_1.procHacker.js("?getRuntimeEntity@Level@@UEBAPEAVActor@@VActorRuntimeID@@_N@Z", actor_1.Actor, null, level_1.Level, actor_1.ActorRuntimeID, nativetype_1.bool_t);
level_1.Level.prototype.getRuntimeEntity = function (id, getRemoved = false) {
    return Level$getRuntimeEntity(this, id, getRemoved);
};
level_1.Level.prototype.getRuntimePlayer = prochacker_1.procHacker.js("?getRuntimePlayer@Level@@UEBAPEAVPlayer@@VActorRuntimeID@@@Z", player_1.Player, { this: level_1.Level }, actor_1.ActorRuntimeID);
level_1.Level.prototype.getTime = prochacker_1.procHacker.js("?getTime@Level@@UEBAHXZ", nativetype_1.int64_as_float_t, { this: level_1.Level });
level_1.Level.prototype.getCurrentTick = prochacker_1.procHacker.js("?getCurrentTick@Level@@UEBAAEBUTick@@XZ", nativetype_1.int64_as_float_t.ref(), { this: level_1.Level }); // You can run the server for 1.4202551784875594e+22 years till it exceeds the max safe integer
level_1.Level.prototype.getRandomPlayer = prochacker_1.procHacker.js("?getRandomPlayer@Level@@UEAAPEAVPlayer@@XZ", player_1.Player, { this: level_1.Level });
level_1.Level.prototype.updateWeather = prochacker_1.procHacker.js("?updateWeather@Level@@UEAAXMHMH@Z", nativetype_1.void_t, { this: level_1.Level }, nativetype_1.float32_t, nativetype_1.int32_t, nativetype_1.float32_t, nativetype_1.int32_t);
level_1.Level.prototype.setDefaultSpawn = prochacker_1.procHacker.js("?setDefaultSpawn@Level@@UEAAXAEBVBlockPos@@@Z", nativetype_1.void_t, { this: level_1.Level }, blockpos_1.BlockPos);
level_1.Level.prototype.getDefaultSpawn = prochacker_1.procHacker.js("?getDefaultSpawn@Level@@UEBAAEBVBlockPos@@XZ", blockpos_1.BlockPos, { this: level_1.Level });
level_1.Level.prototype.explode = prochacker_1.procHacker.js("?explode@Level@@UEAAXAEAVBlockSource@@PEAVActor@@AEBVVec3@@M_N3M3@Z", nativetype_1.void_t, { this: level_1.Level }, block_1.BlockSource, core_1.VoidPointer, blockpos_1.Vec3, nativetype_1.float32_t, nativetype_1.bool_t, nativetype_1.bool_t, nativetype_1.float32_t, nativetype_1.bool_t);
level_1.Level.prototype.getDifficulty = prochacker_1.procHacker.js("?getDifficulty@Level@@UEBA?AW4Difficulty@@XZ", nativetype_1.int32_t, { this: level_1.Level });
const Level$setDifficulty = prochacker_1.procHacker.js("?setDifficulty@Level@@UEAAXW4Difficulty@@@Z", nativetype_1.void_t, { this: level_1.Level }, nativetype_1.int32_t);
level_1.Level.prototype.setDifficulty = function (difficulty) {
    Level$setDifficulty.call(this, difficulty);
    const pkt = packets_1.SetDifficultyPacket.allocate();
    pkt.difficulty = difficulty;
    for (const player of this.getPlayers()) {
        player.sendNetworkPacket(pkt);
    }
    pkt.dispose();
};
level_1.Level.prototype.getNewUniqueID = prochacker_1.procHacker.js("?getNewUniqueID@Level@@UEAA?AUActorUniqueID@@XZ", actor_1.ActorUniqueID, { this: level_1.Level, structureReturn: true });
level_1.Level.prototype.getNextRuntimeID = prochacker_1.procHacker.js("?getNextRuntimeID@Level@@UEAA?AVActorRuntimeID@@XZ", actor_1.ActorRuntimeID, { this: level_1.Level, structureReturn: true });
level_1.Level.prototype.sendAllPlayerAbilities = prochacker_1.procHacker.js("?sendAllPlayerAbilities@Level@@UEAAXAEBVPlayer@@@Z", nativetype_1.void_t, { this: level_1.Level }, player_1.Player);
level_1.Level.abstract({
    vftable: core_1.VoidPointer,
});
level_1.ServerLevel.abstract({});
level_1.LevelData.prototype.getGameDifficulty = prochacker_1.procHacker.js("?getGameDifficulty@LevelData@@QEBA?AW4Difficulty@@XZ", nativetype_1.uint32_t, { this: level_1.LevelData });
level_1.LevelData.prototype.setGameDifficulty = prochacker_1.procHacker.js("?setGameDifficulty@LevelData@@QEAAXW4Difficulty@@@Z", nativetype_1.void_t, { this: level_1.LevelData }, nativetype_1.uint32_t);
level_1.BlockPalette.prototype.getBlockLegacy = prochacker_1.procHacker.js("?getBlockLegacy@BlockPalette@@QEBAPEBVBlockLegacy@@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", block_1.BlockLegacy, { this: level_1.BlockPalette }, nativetype_1.CxxString);
const Spawner$spawnItem = prochacker_1.procHacker.js("?spawnItem@Spawner@@QEAAPEAVItemActor@@AEAVBlockSource@@AEBVItemStack@@PEAVActor@@AEBVVec3@@H@Z", actor_1.ItemActor, null, level_1.Spawner, block_1.BlockSource, inventory_1.ItemStack, core_1.VoidPointer, blockpos_1.Vec3, nativetype_1.int32_t);
level_1.Spawner.prototype.spawnItem = function (region, itemStack, pos, throwTime) {
    return Spawner$spawnItem(this, region, itemStack, null, pos, throwTime);
};
const Spawner$spawnMob = prochacker_1.procHacker.js("?spawnMob@Spawner@@QEAAPEAVMob@@AEAVBlockSource@@AEBUActorDefinitionIdentifier@@PEAVActor@@AEBVVec3@@_N44@Z", actor_1.Actor, null, level_1.Spawner, block_1.BlockSource, actor_1.ActorDefinitionIdentifier, core_1.VoidPointer, blockpos_1.Vec3, nativetype_1.bool_t, nativetype_1.bool_t, nativetype_1.bool_t);
level_1.Spawner.prototype.spawnMob = function (region, id, pos, naturalSpawn = false, surface = true, fromSpawner = false) {
    return Spawner$spawnMob(this, region, id, null, pos, naturalSpawn, surface, fromSpawner);
};
// dimension.ts
const fetchNearestAttackablePlayer$nonBlockPos = prochacker_1.procHacker.js("?fetchNearestAttackablePlayer@Dimension@@QEAAPEAVPlayer@@AEAVActor@@M@Z", player_1.Player, { this: dimension_1.Dimension }, actor_1.Actor, nativetype_1.float32_t);
const fetchNearestAttackablePlayer$withBlockPos = prochacker_1.procHacker.js("?fetchNearestAttackablePlayer@Dimension@@QEAAPEAVPlayer@@VBlockPos@@MPEAVActor@@@Z", player_1.Player, { this: dimension_1.Dimension }, blockpos_1.BlockPos, nativetype_1.float32_t, actor_1.Actor);
dimension_1.Dimension.prototype.fetchNearestAttackablePlayer = function (actor, distance, blockPos) {
    if (blockPos) {
        return fetchNearestAttackablePlayer$withBlockPos.call(this, blockPos, distance, actor);
    }
    return fetchNearestAttackablePlayer$nonBlockPos.call(this, actor, distance);
};
dimension_1.Dimension.prototype.getSunAngle = prochacker_1.procHacker.js("?getSunAngle@Dimension@@QEBAMM@Z", nativetype_1.float32_t, { this: dimension_1.Dimension });
dimension_1.Dimension.prototype.getTimeOfDay = prochacker_1.procHacker.js("?getTimeOfDay@Dimension@@QEBAMM@Z", nativetype_1.float32_t, { this: dimension_1.Dimension });
dimension_1.Dimension.prototype.isDay = prochacker_1.procHacker.jsv("??_7OverworldDimension@@6BIDimension@@@", "?isDay@Dimension@@UEBA_NXZ", nativetype_1.bool_t, { this: dimension_1.Dimension });
dimension_1.Dimension.prototype.distanceToNearestPlayerSqr2D = prochacker_1.procHacker.js("?distanceToNearestPlayerSqr2D@Dimension@@QEAAMVVec3@@@Z", nativetype_1.float32_t, { this: dimension_1.Dimension }, blockpos_1.Vec3);
dimension_1.Dimension.prototype.transferEntityToUnloadedChunk = prochacker_1.procHacker.js("?transferEntityToUnloadedChunk@Dimension@@QEAAXAEAVActor@@PEAVLevelChunk@@@Z", nativetype_1.void_t, { this: dimension_1.Dimension }, actor_1.Actor, chunk_1.LevelChunk);
dimension_1.Dimension.prototype.getSpawnPos = prochacker_1.procHacker.jsv("??_7OverworldDimension@@6BIDimension@@@", "?getSpawnPos@Dimension@@UEBA?AVBlockPos@@XZ", blockpos_1.BlockPos, {
    this: dimension_1.Dimension,
    structureReturn: true,
});
dimension_1.Dimension.prototype.getPlayers = function () {
    const id = this.getDimensionId();
    const players = [];
    const users = launcher_1.bedrockServer.level.getActiveUsers();
    for (const user of users) {
        const player = user.tryUnwrapPlayer();
        if (player === null)
            continue;
        if (player.getDimensionId() !== id)
            continue;
        players.push(player);
    }
    return players;
};
dimension_1.Dimension.prototype.fetchNearestPlayerToActor = function (actor, distance) {
    const actorPos = actor.getPosition();
    return this.fetchNearestPlayerToPosition(actorPos.x, actorPos.y, actorPos.z, distance, false);
};
dimension_1.Dimension.prototype.fetchNearestPlayerToPosition = function (x, y, z, distance, findAnyNearPlayer) {
    let found = null;
    let nearestDistSq = distance * distance;
    const pos = { x, y, z };
    const users = launcher_1.bedrockServer.level.getActiveUsers();
    for (const user of users) {
        const player = user.tryUnwrapPlayer();
        if (player === null)
            continue;
        const distSq = player.getPosition().distanceSq(pos);
        if (distSq <= nearestDistSq) {
            if (findAnyNearPlayer)
                return player;
            found = player;
            nearestDistSq = distSq;
        }
    }
    return found;
};
dimension_1.Dimension.prototype.getMoonBrightness = prochacker_1.procHacker.js("?getMoonBrightness@Dimension@@QEBAMXZ", nativetype_1.float32_t, { this: dimension_1.Dimension });
dimension_1.Dimension.prototype.getHeight = prochacker_1.procHacker.js("?getHeight@Dimension@@QEBAFXZ", nativetype_1.int16_t, { this: dimension_1.Dimension });
dimension_1.Dimension.prototype.tryGetClosestPublicRegion = function (chunkpos) {
    return this.getBlockSource();
    /**
     * @author rua.kr
     * legacy polyfill.
     * I'm not sure it should be implemented.
     * Skipped for now.
     */
    // let blockSource: BlockSource | null = null; // rsp+80
    // for (const player of this.getPlayers()) {
    //     if (!player.hasDimension()) continue;
    //     blockSource = player.getRegion();
    //     if (blockSource.getChunk(chunkpos) === null) continue;
    //     break;
    // }
    // if (blockSource !== null) return blockSource;
    // const list = (this as VoidPointer as StaticPointer).getPointerAs(TickingAreaList, 0x2b8);
    // for (const tickingAreaPtr of list.getAreas()) {
    //     const tickingArea = tickingAreaPtr.p;
    //     let bpl = 0;
    //     let chunkFound = false;
    //     let chunk: CxxSharedPtr<LevelChunk> | null = null; // qword ptr ss:[rsp+30]
    //     if (tickingArea !== null) {
    //         if (!tickingArea.isRemoved()) {
    //             const view = tickingArea.getView();
    //             // mov r8,chunkpos
    //             // lea rdx,
    //             chunk = view.getAvailableChunk(chunkpos);
    //             chunkFound = true;
    //             if (chunk.p !== null) {
    //                 bpl = 1;
    //             }
    //         }
    //     }
    //     if (chunkFound) {
    //         // mov rbx,qword ptr ss:[rsp+38]
    //         // test rbx,rbx
    //         // je bedrock_server.7FF694F649AD
    //         // mov eax,FFFFFFFF
    //         // lock xadd dword ptr ds:[rbx+8],eax
    //         // cmp eax,1
    //         // jne bedrock_server.7FF694F649AD
    //         // mov rax,qword ptr ds:[rbx]
    //         // mov rcx,rbx
    //         // mov rax,qword ptr ds:[rax]
    //         // call qword ptr ds:[<__guard_dispatch_icall_fptr>]
    //         // mov eax,FFFFFFFF
    //         // lock xadd dword ptr ds:[rbx+C],eax
    //         // cmp eax,1
    //         // jne bedrock_server.7FF694F649AD
    //         // mov rax,qword ptr ds:[rbx]
    //         // mov rcx,rbx
    //         // mov rax,qword ptr ds:[rax+8]
    //         // call qword ptr ds:[<__guard_dispatch_icall_fptr>]
    //     }
    //     // test bpl,bpl
    //     // jne bedrock_server.7FF694F649E1
    //     // rdi = tickingArea*
    //     // add rdi,10
    //     // cmp rdi,inst_end
    //     // jne bedrock_server.7FF694F64905
    //     // bedrock_server.7FF694F649E1
    //     // rcx = tickingArea
    //     // mov rax,qword ptr ds:[rcx]
    //     // mov rax,qword ptr ds:[rax+28]
    //     // call qword ptr ds:[<__guard_dispatch_icall_fptr>]
    //     // return;
    // }
    // const mainBlockSource = this.getBlockSource();
    // if (mainBlockSource !== null) {
    //     if (mainBlockSource.getChunk(chunkpos) !== null) {
    //         return mainBlockSource;
    //     }
    // }
    // return null as any;
};
dimension_1.Dimension.prototype.removeActorByID = prochacker_1.procHacker.js("?removeActorByID@Dimension@@QEAAXAEBUActorUniqueID@@@Z", nativetype_1.void_t, { this: dimension_1.Dimension }, actor_1.ActorUniqueID);
dimension_1.Dimension.prototype.getMinHeight = prochacker_1.procHacker.js("?getMinHeight@Dimension@@QEBAFXZ", nativetype_1.int16_t, { this: dimension_1.Dimension });
dimension_1.Dimension.prototype.getDefaultBiomeString = prochacker_1.procHacker.jsv("??_7NetherDimension@@6BIDimension@@@", "?getDefaultBiome@NetherDimension@@UEBA?AVHashedString@@XZ", hashedstring_1.HashedStringToString, { this: dimension_1.Dimension, structureReturn: true });
dimension_1.Dimension.prototype.getMoonPhase = prochacker_1.procHacker.js("?getMoonPhase@Dimension@@QEBAHXZ", nativetype_1.int32_t, { this: dimension_1.Dimension });
// actor.ts
const actorMaps = new Map();
const ServerPlayer$vftable = symbols_1.proc["??_7ServerPlayer@@6B@"];
const ItemActor$vftable = symbols_1.proc["??_7ItemActor@@6B@"];
const SimulatedPlayer$vftable = symbols_1.proc["??_7SimulatedPlayer@@6B@"];
const Actor$teleportTo = prochacker_1.procHacker.jsv("??_7Actor@@6B@", "?teleportTo@Actor@@UEAAXAEBVVec3@@_NHH1@Z", nativetype_1.void_t, { this: actor_1.Actor }, blockpos_1.Vec3, nativetype_1.bool_t, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.bool_t);
actor_1.Actor.abstract({
    vftable: core_1.VoidPointer,
    ctxbase: actor_1.EntityContextBase, // accessed in ServerNetworkHandler::_displayGameMessage before calling EntityContextBase::_enttRegistry
});
actor_1.Actor.prototype.changeDimension = prochacker_1.procHacker.jsv("??_7Actor@@6B@", "?changeDimension@Actor@@UEAAXV?$AutomaticID@VDimension@@H@@@Z", nativetype_1.void_t, { this: actor_1.Actor }, nativetype_1.int32_t);
actor_1.Actor.prototype.teleportTo = function (position, shouldStopRiding, cause, sourceEntityType, unknown) {
    if (typeof unknown === "string")
        unknown = false;
    Actor$teleportTo.call(this, position, shouldStopRiding, cause, sourceEntityType, unknown);
};
// `includeSimulatedPlayer` is for deprecated overload
actor_1.Actor.prototype.isPlayer = function (includeSimulatedPlayer = false) {
    return this instanceof player_1.ServerPlayer;
};
actor_1.Actor.prototype.isSimulatedPlayer = function () {
    return this instanceof player_1.SimulatedPlayer;
};
actor_1.Actor.setResolver(ptr => {
    if (ptr === null)
        return null;
    const binptr = ptr.getAddressBin();
    let actor = actorMaps.get(binptr);
    if (actor != null)
        return actor;
    const vftable = ptr.getPointer();
    if (vftable.equalsptr(SimulatedPlayer$vftable)) {
        actor = ptr.as(player_1.SimulatedPlayer);
    }
    else if (vftable.equalsptr(ServerPlayer$vftable)) {
        actor = ptr.as(player_1.ServerPlayer);
    }
    else if (vftable.equalsptr(ItemActor$vftable)) {
        actor = ptr.as(actor_1.ItemActor);
    }
    else if (Actor$hasType.call(ptr, actor_1.ActorType.Mob)) {
        actor = ptr.as(actor_1.Mob);
    }
    else {
        actor = ptr.as(actor_1.Actor);
    }
    actorMaps.set(binptr, actor);
    return actor;
});
actor_1.Actor.all = function () {
    return actorMaps.values();
};
actor_1.Actor.summonAt = function (region, pos, type, id = -1, summoner = null) {
    const ptr = new core_1.AllocatedPointer(8);
    switch (typeof id) {
        case "number":
            ptr.setInt64WithFloat(id);
            break;
        case "string":
            ptr.setBin(id);
            break;
        case "object":
            ptr.setInt64WithFloat(-1);
            summoner = id;
            break;
    }
    if (!(type instanceof actor_1.ActorDefinitionIdentifier)) {
        type = actor_1.ActorDefinitionIdentifier.constructWith(type);
        const res = CommandUtils.spawnEntityAt(region, pos, type, ptr, summoner);
        type.destruct();
        return res;
    }
    else {
        return CommandUtils.spawnEntityAt(region, pos, type, ptr, summoner);
    }
};
actor_1.Actor.prototype.addItem = prochacker_1.procHacker.js("?add@Actor@@UEAA_NAEAVItemStack@@@Z", nativetype_1.bool_t, { this: actor_1.Actor }, inventory_1.ItemStack);
actor_1.Actor.prototype.getAttributes = prochacker_1.procHacker.js("?getAttributes@Actor@@QEAA?AV?$not_null@PEAVBaseAttributeMap@@@gsl@@XZ", attribute_1.BaseAttributeMap.ref(), {
    this: actor_1.Actor,
    structureReturn: true,
});
actor_1.Actor.prototype.getNameTag = prochacker_1.procHacker.js("?getNameTag@Actor@@UEBAAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@XZ", nativetype_1.CxxString, { this: actor_1.Actor });
actor_1.Actor.prototype.setNameTag = prochacker_1.procHacker.js("?setNameTag@Actor@@UEAAXAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", nativetype_1.void_t, { this: actor_1.Actor }, nativetype_1.CxxString);
actor_1.Actor.prototype.setNameTagVisible = prochacker_1.procHacker.js("?setNameTagVisible@Actor@@UEAAX_N@Z", nativetype_1.void_t, { this: actor_1.Actor }, nativetype_1.bool_t);
actor_1.Actor.prototype.addTag = prochacker_1.procHacker.js("?addTag@Actor@@QEAA_NAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", nativetype_1.bool_t, { this: actor_1.Actor }, nativetype_1.CxxString);
actor_1.Actor.prototype.hasTag = prochacker_1.procHacker.js("?hasTag@Actor@@QEBA_NAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", nativetype_1.bool_t, { this: actor_1.Actor }, nativetype_1.CxxString);
actor_1.Actor.prototype.despawn = prochacker_1.procHacker.js("?despawn@Actor@@UEAAXXZ", nativetype_1.void_t, {
    this: actor_1.Actor,
});
actor_1.Actor.prototype.removeTag = prochacker_1.procHacker.js("?removeTag@Actor@@QEAA_NAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", nativetype_1.bool_t, { this: actor_1.Actor }, nativetype_1.CxxString);
actor_1.Actor.prototype.getPosition = prochacker_1.procHacker.js("?getPosition@Actor@@UEBAAEBVVec3@@XZ", blockpos_1.Vec3, { this: actor_1.Actor });
actor_1.Actor.prototype.getFeetPos = function () {
    return CommandUtils.getFeetPos(this);
};
actor_1.Actor.prototype.getRotation = prochacker_1.procHacker.js("?getRotation@Actor@@QEBAAEBVVec2@@XZ", blockpos_1.Vec2, { this: actor_1.Actor });
actor_1.Actor.prototype.getScoreTag = prochacker_1.procHacker.js("?getScoreTag@Actor@@UEBAAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@XZ", nativetype_1.CxxString, {
    this: actor_1.Actor,
});
actor_1.Actor.prototype.setScoreTag = prochacker_1.procHacker.js("?setScoreTag@Actor@@UEAAXAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", nativetype_1.void_t, { this: actor_1.Actor }, nativetype_1.CxxString);
actor_1.Actor.prototype.getDimensionBlockSource = actor_1.Actor.prototype.getRegion = prochacker_1.procHacker.js("?getDimensionBlockSource@Actor@@QEBAAEAVBlockSource@@XZ", block_1.BlockSource, {
    this: actor_1.Actor,
});
actor_1.Actor.prototype.getUniqueIdPointer = prochacker_1.procHacker.js("?getUniqueID@Actor@@QEBAAEBUActorUniqueID@@XZ", core_1.StaticPointer, { this: actor_1.Actor });
actor_1.Actor.prototype.getEntityTypeId = prochacker_1.procHacker.jsv("??_7Actor@@6B@", "?getEntityTypeId@Actor@@UEBA?AW4ActorType@@XZ", nativetype_1.int32_t, { this: actor_1.Actor }); // ActorType getEntityTypeId()
actor_1.Actor.prototype.getRuntimeID = prochacker_1.procHacker.js("?getRuntimeID@Actor@@QEBA?AVActorRuntimeID@@XZ", actor_1.ActorRuntimeID, { this: actor_1.Actor, structureReturn: true });
actor_1.Actor.prototype.getDimension = prochacker_1.procHacker.js("?getDimension@Actor@@QEBAAEAVDimension@@XZ", dimension_1.Dimension, { this: actor_1.Actor });
actor_1.Actor.prototype.getDimensionId = prochacker_1.procHacker.js("?getDimensionId@Actor@@QEBA?AV?$AutomaticID@VDimension@@H@@XZ", nativetype_1.int32_t, { this: actor_1.Actor, structureReturn: true });
actor_1.Actor.prototype.getActorIdentifier = prochacker_1.procHacker.js("?getActorIdentifier@Actor@@QEBAAEBUActorDefinitionIdentifier@@XZ", actor_1.ActorDefinitionIdentifier, { this: actor_1.Actor });
actor_1.Actor.prototype.getCommandPermissionLevel = prochacker_1.procHacker.js("?getCommandPermissionLevel@Actor@@UEBA?AW4CommandPermissionLevel@@XZ", nativetype_1.int32_t, { this: actor_1.Actor });
actor_1.Actor.prototype.getCarriedItem = prochacker_1.procHacker.js("?getCarriedItem@Actor@@UEBAAEBVItemStack@@XZ", inventory_1.ItemStack, { this: actor_1.Actor });
actor_1.Actor.prototype.setCarriedItem = prochacker_1.procHacker.jsv("??_7Actor@@6B@", "?setCarriedItem@Actor@@UEAAXAEBVItemStack@@@Z", nativetype_1.void_t, { this: actor_1.Actor }, inventory_1.ItemStack); // Actor::setCarriedItem Agent::setCarriedItem Player::setCarriedItem
actor_1.Actor.prototype.getOffhandSlot = prochacker_1.procHacker.js("?getOffhandSlot@Actor@@QEBAAEBVItemStack@@XZ", inventory_1.ItemStack, { this: actor_1.Actor });
actor_1.Actor.prototype.setOffhandSlot = prochacker_1.procHacker.js("?setOffhandSlot@Actor@@UEAAXAEBVItemStack@@@Z", nativetype_1.void_t, { this: actor_1.Actor }, inventory_1.ItemStack);
let TeleportRotationData = class TeleportRotationData extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.RelativeFloat)
], TeleportRotationData.prototype, "rx", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.RelativeFloat)
], TeleportRotationData.prototype, "ry", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.Vec2)
], TeleportRotationData.prototype, "pos", void 0);
TeleportRotationData = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], TeleportRotationData);
const TeleportCommand$computeTarget = prochacker_1.procHacker.js("?computeTarget@TeleportCommand@@SA?AVTeleportTarget@@AEAVActor@@VVec3@@PEAV4@V?$AutomaticID@VDimension@@H@@AEBV?$optional@VRotationData@RotationCommandUtils@@@std@@H@Z", nativetype_1.void_t, null, core_1.StaticPointer, actor_1.Actor, blockpos_1.Vec3, blockpos_1.Vec3, nativetype_1.int32_t, cxxoptional_1.CxxOptionalToUndefUnion.make(TeleportRotationData), nativetype_1.int32_t);
const TeleportCommand$applyTarget = prochacker_1.procHacker.js("?applyTarget@TeleportCommand@@SAXAEAVActor@@VTeleportTarget@@_N@Z", nativetype_1.void_t, null, actor_1.Actor, core_1.StaticPointer, nativetype_1.bool_t);
actor_1.Actor.prototype.teleport = function (pos, dimensionId = actor_1.DimensionId.Overworld, facePosition = null) {
    const target = new core_1.AllocatedPointer(0x80);
    const unknownParam = false;
    TeleportCommand$computeTarget(target, this, pos, facePosition, dimensionId, undefined, 0); // it allocates `target`
    TeleportCommand$applyTarget(this, target, unknownParam); // it deletes `target`
};
actor_1.Actor.prototype.getArmor = prochacker_1.procHacker.js("?getArmor@Actor@@UEBAAEBVItemStack@@W4ArmorSlot@@@Z", inventory_1.ItemStack, { this: actor_1.Actor }, nativetype_1.int32_t);
const Actor$hasType = (actor_1.Actor.prototype.hasType = prochacker_1.procHacker.js("?hasType@Actor@@QEBA_NW4ActorType@@@Z", nativetype_1.bool_t, { this: actor_1.Actor }, nativetype_1.int32_t));
actor_1.Actor.prototype.isType = prochacker_1.procHacker.js("?isType@Actor@@QEBA_NW4ActorType@@@Z", nativetype_1.bool_t, { this: actor_1.Actor }, nativetype_1.int32_t);
actor_1.Actor.prototype.kill = prochacker_1.procHacker.jsv("??_7Actor@@6B@", "?kill@Actor@@UEAAXXZ", nativetype_1.void_t, { this: actor_1.Actor });
actor_1.Actor.prototype.die = prochacker_1.procHacker.jsv("??_7Actor@@6B@", "?die@Actor@@UEAAXAEBVActorDamageSource@@@Z", nativetype_1.void_t, { this: actor_1.Actor }, actor_1.ActorDamageSource);
actor_1.Actor.prototype.isSneaking = prochacker_1.procHacker.js("?isSneaking@Actor@@QEBA_NXZ", nativetype_1.bool_t, { this: actor_1.Actor }, nativetype_1.void_t);
actor_1.Actor.prototype.isMoving = prochacker_1.procHacker.js("?isMoving@Actor@@QEBA_NXZ", nativetype_1.bool_t, { this: actor_1.Actor }, nativetype_1.void_t);
actor_1.Actor.prototype.setSneaking = prochacker_1.procHacker.js("?setSneaking@Actor@@UEAAX_N@Z", nativetype_1.void_t, { this: actor_1.Actor }, nativetype_1.bool_t);
actor_1.Actor.prototype.getHealth = prochacker_1.procHacker.js("?getHealth@Actor@@QEBAHXZ", nativetype_1.int32_t, { this: actor_1.Actor });
actor_1.Actor.prototype.getMaxHealth = prochacker_1.procHacker.js("?getMaxHealth@Actor@@QEBAHXZ", nativetype_1.int32_t, { this: actor_1.Actor });
actor_1.Actor.prototype.startRiding = prochacker_1.procHacker.jsv("??_7Actor@@6B@", "?startRiding@Actor@@UEAA_NAEAV1@@Z", nativetype_1.bool_t, { this: actor_1.Actor }, actor_1.Actor);
const Actor$save = prochacker_1.procHacker.js("?save@Actor@@UEBA_NAEAVCompoundTag@@@Z", nativetype_1.bool_t, { this: actor_1.Actor }, nbt_1.CompoundTag);
actor_1.Actor.prototype.save = function (tag) {
    if (tag != null) {
        return Actor$save.call(this, tag);
    }
    else {
        tag = nbt_1.CompoundTag.allocate();
        Actor$save.call(this, tag);
        const nbt = tag.value();
        tag.dispose();
        return nbt;
    }
};
const Actor$getTags = prochacker_1.procHacker.js("?getTags@Actor@@QEBA?BV?$vector@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$allocator@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@2@@std@@XZ", CxxVector$string, { this: actor_1.Actor, structureReturn: true });
actor_1.Actor.prototype.getTags = function () {
    const tags = Actor$getTags.call(this);
    const out = tags.toArray();
    tags.destruct();
    return out;
};
const VirtualCommandOrigin$VirtualCommandOrigin = prochacker_1.procHacker.js("??0VirtualCommandOrigin@@QEAA@AEBVCommandOrigin@@AEAVActor@@AEBVCommandPositionFloat@@H@Z", nativetype_1.void_t, null, commandorigin_1.VirtualCommandOrigin, commandorigin_1.CommandOrigin, actor_1.Actor, command_1.CommandPositionFloat, nativetype_1.int32_t);
actor_1.Actor.prototype.runCommand = function (command, mute = true, permissionLevel = command_1.CommandPermissionLevel.Operator) {
    const actorPos = CommandUtils.getFeetPos(this);
    const cmdPos = command_1.CommandPositionFloat.create(actorPos.x, false, actorPos.y, false, actorPos.z, false, false);
    const serverOrigin = commandorigin_1.ServerCommandOrigin.constructWith("Server", this.getLevel(), permissionLevel, this.getDimension());
    const origin = commandorigin_1.VirtualCommandOrigin.constructWith(serverOrigin, this, cmdPos);
    serverOrigin.destruct(); // serverOrigin will be cloned.
    const result = executeCommandWithOutput(command, origin, mute);
    origin.destruct();
    return result;
};
let DefaultDataLoaderHelper = DefaultDataLoaderHelper_1 = class DefaultDataLoaderHelper extends nativeclass_1.NativeClass {
    [nativetype_1.NativeType.ctor]() {
        this.vftable = DefaultDataLoaderHelper_1.vftable;
    }
    static create() {
        const v = new DefaultDataLoaderHelper_1(true);
        v.vftable = DefaultDataLoaderHelper_1.vftable;
        return v;
    }
};
DefaultDataLoaderHelper.vftable = symbols_1.proc["??_7DefaultDataLoadHelper@@6B@"];
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], DefaultDataLoaderHelper.prototype, "vftable", void 0);
DefaultDataLoaderHelper = DefaultDataLoaderHelper_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], DefaultDataLoaderHelper);
const Actor$readAdditionalSaveData = prochacker_1.procHacker.jsv("??_7Actor@@6B@", "?readAdditionalSaveData@Actor@@MEAAXAEBVCompoundTag@@AEAVDataLoadHelper@@@Z", nativetype_1.void_t, { this: actor_1.Actor }, nbt_1.CompoundTag, DefaultDataLoaderHelper);
actor_1.Actor.prototype.readAdditionalSaveData = function (tag) {
    if (tag instanceof nbt_1.Tag) {
        Actor$readAdditionalSaveData.call(this, tag, DefaultDataLoaderHelper.create());
    }
    else {
        tag = nbt_1.NBT.allocate(tag);
        Actor$readAdditionalSaveData.call(this, tag, DefaultDataLoaderHelper.create());
        tag.dispose();
    }
};
const Actor$load = prochacker_1.procHacker.js("?load@Actor@@UEAA_NAEBVCompoundTag@@AEAVDataLoadHelper@@@Z", nativetype_1.void_t, { this: actor_1.Actor }, nbt_1.CompoundTag, DefaultDataLoaderHelper);
actor_1.Actor.prototype.load = function (tag) {
    if (tag instanceof nbt_1.Tag) {
        Actor$load.call(this, tag, DefaultDataLoaderHelper.create());
    }
    else {
        tag = nbt_1.NBT.allocate(tag);
        Actor$load.call(this, tag, DefaultDataLoaderHelper.create());
        tag.dispose();
    }
};
actor_1.Actor.prototype.hurt_ = prochacker_1.procHacker.js("?hurt@Actor@@QEAA_NAEBVActorDamageSource@@M_N1@Z", nativetype_1.bool_t, { this: actor_1.Actor }, actor_1.ActorDamageSource, nativetype_1.float32_t, nativetype_1.bool_t, nativetype_1.bool_t);
actor_1.Actor.prototype.setStatusFlag = prochacker_1.procHacker.js("?setStatusFlag@Actor@@UEAAXW4ActorFlags@@_N@Z", nativetype_1.void_t, { this: actor_1.Actor }, nativetype_1.int32_t, nativetype_1.bool_t);
actor_1.Actor.prototype.getStatusFlag = prochacker_1.procHacker.js("?getStatusFlag@Actor@@UEBA_NW4ActorFlags@@@Z", nativetype_1.bool_t, { this: actor_1.Actor }, nativetype_1.int32_t);
actor_1.Actor.prototype.getLevel = prochacker_1.procHacker.js("?getLevel@Actor@@QEAAAEAVLevel@@XZ", level_1.Level, { this: actor_1.Actor });
actor_1.Actor.prototype.isAlive = prochacker_1.procHacker.js("?isAlive@Actor@@UEBA_NXZ", nativetype_1.bool_t, {
    this: actor_1.Actor,
});
actor_1.Actor.prototype.isInvisible = prochacker_1.procHacker.js("?isInvisible@Actor@@UEBA_NXZ", nativetype_1.bool_t, { this: actor_1.Actor });
actor_1.Actor.prototype._isRiding = prochacker_1.procHacker.js("?isRiding@Actor@@QEBA_NXZ", nativetype_1.bool_t, { this: actor_1.Actor });
actor_1.Actor.prototype._isRidingOn = prochacker_1.procHacker.js("?isRiding@Actor@@QEBA_NPEAV1@@Z", nativetype_1.bool_t, { this: actor_1.Actor }, actor_1.Actor);
actor_1.Actor.prototype._isPassenger = prochacker_1.procHacker.js("?isPassenger@Actor@@QEBA_NAEBV1@@Z", nativetype_1.bool_t, { this: actor_1.Actor }, actor_1.Actor);
actor_1.Actor.prototype.setVelocity = prochacker_1.procHacker.js("?setVelocity@Actor@@QEAAXAEBVVec3@@@Z", nativetype_1.void_t, { this: actor_1.Actor }, blockpos_1.Vec3);
actor_1.Actor.prototype.isInWater = prochacker_1.procHacker.js("?isInWater@Actor@@UEBA_NXZ", nativetype_1.bool_t, { this: actor_1.Actor });
actor_1.Actor.prototype.getArmorContainer = prochacker_1.procHacker.js("?getArmorContainer@Actor@@QEAAAEAVSimpleContainer@@XZ", inventory_1.SimpleContainer, { this: actor_1.Actor });
actor_1.Actor.prototype.getHandContainer = prochacker_1.procHacker.js("?getHandContainer@Actor@@QEAAAEAVSimpleContainer@@XZ", inventory_1.SimpleContainer, { this: actor_1.Actor });
actor_1.Actor.fromUniqueIdBin = function (bin, getRemovedActor = true) {
    return launcher_1.bedrockServer.level.fetchEntity(bin, getRemovedActor);
};
actor_1.Actor.prototype.setHurtTime = prochacker_1.procHacker.js("?setHurtTime@Actor@@QEAAXH@Z", nativetype_1.void_t, { this: actor_1.Actor }, nativetype_1.int32_t);
actor_1.Actor.prototype.addEffect = prochacker_1.procHacker.js("?addEffect@Actor@@QEAAXAEBVMobEffectInstance@@@Z", nativetype_1.void_t, { this: actor_1.Actor }, effects_1.MobEffectInstance);
actor_1.Actor.prototype.removeEffect = prochacker_1.procHacker.js("?removeEffect@Actor@@QEAAXH@Z", nativetype_1.void_t, { this: actor_1.Actor }, nativetype_1.int32_t);
actor_1.Actor.prototype._hasEffect = prochacker_1.procHacker.js("?hasEffect@Actor@@QEBA_NAEBVMobEffect@@@Z", nativetype_1.bool_t, { this: actor_1.Actor }, effects_1.MobEffect);
actor_1.Actor.prototype._getEffect = prochacker_1.procHacker.js("?getEffect@Actor@@QEBAPEBVMobEffectInstance@@AEBVMobEffect@@@Z", effects_1.MobEffectInstance, { this: actor_1.Actor }, effects_1.MobEffect);
actor_1.Actor.prototype.removeAllEffects = prochacker_1.procHacker.js("?removeAllEffects@Actor@@QEAAXXZ", nativetype_1.void_t, { this: actor_1.Actor });
actor_1.Actor.prototype.setOnFire = function (seconds) {
    OnFireSystem.setOnFire(this, seconds);
};
actor_1.Actor.prototype.setOnFireNoEffects = function (seconds) {
    OnFireSystem.setOnFireNoEffects(this, seconds);
};
actor_1.Actor.prototype.getEquippedTotem = prochacker_1.procHacker.js("?getEquippedTotem@Actor@@UEBAAEBVItemStack@@XZ", inventory_1.ItemStack, { this: actor_1.Actor });
actor_1.Actor.prototype.consumeTotem = prochacker_1.procHacker.js("?consumeTotem@Actor@@UEAA_NXZ", nativetype_1.bool_t, { this: actor_1.Actor });
actor_1.Actor.prototype.hasTotemEquipped = prochacker_1.procHacker.js("?hasTotemEquipped@Actor@@QEBA_NXZ", nativetype_1.bool_t, { this: actor_1.Actor });
actor_1.Actor.prototype.hasFamily_ = prochacker_1.procHacker.js("?hasFamily@Actor@@QEBA_NAEBVHashedString@@@Z", nativetype_1.bool_t, { this: actor_1.Actor }, hashedstring_1.HashedString);
actor_1.Actor.prototype.distanceTo = prochacker_1.procHacker.js("?distanceTo@Actor@@QEBAMAEBVVec3@@@Z", nativetype_1.float32_t, { this: actor_1.Actor }, blockpos_1.Vec3);
actor_1.Actor.prototype.getLastHurtByMob = prochacker_1.procHacker.js("?getLastHurtByMob@Actor@@UEAAPEAVMob@@XZ", actor_1.Mob, { this: actor_1.Actor });
actor_1.Actor.prototype.getLastHurtCause = prochacker_1.procHacker.js("?getLastHurtCause@Actor@@QEBA?AW4ActorDamageCause@@XZ", nativetype_1.int32_t, { this: actor_1.Actor });
actor_1.Actor.prototype.getLastHurtDamage = prochacker_1.procHacker.js("?getLastHurtDamage@Actor@@QEBAMXZ", nativetype_1.int32_t, { this: actor_1.Actor });
actor_1.Actor.prototype.getLastHurtMob = prochacker_1.procHacker.js("?getLastHurtMob@Actor@@UEAAPEAVMob@@XZ", actor_1.Mob, { this: actor_1.Actor });
actor_1.Actor.prototype.wasLastHitByPlayer = prochacker_1.procHacker.js("?wasLastHitByPlayer@Actor@@QEAA_NXZ", nativetype_1.bool_t, { this: actor_1.Actor });
actor_1.Actor.prototype.getSpeedInMetersPerSecond = prochacker_1.procHacker.js("?getSpeedInMetersPerSecond@Actor@@QEBAMXZ", nativetype_1.float32_t, { this: actor_1.Actor });
actor_1.Actor.prototype.fetchNearbyActorsSorted_ = prochacker_1.procHacker.js("?fetchNearbyActorsSorted@Actor@@QEAA?AV?$vector@UDistanceSortedActor@@V?$allocator@UDistanceSortedActor@@@std@@@std@@AEBVVec3@@W4ActorType@@@Z", cxxvector_1.CxxVector.make(actor_1.DistanceSortedActor), { this: actor_1.Actor, structureReturn: true }, blockpos_1.Vec3, nativetype_1.int32_t);
actor_1.Actor.prototype.isCreative = prochacker_1.procHacker.jsv("??_7Player@@6B@", "?isCreative@Player@@UEBA_NXZ", nativetype_1.bool_t, { this: actor_1.Actor });
actor_1.Actor.prototype.isAdventure = prochacker_1.procHacker.jsv("??_7Player@@6B@", "?isAdventure@Player@@UEBA_NXZ", nativetype_1.bool_t, { this: actor_1.Actor });
actor_1.Actor.prototype.isSurvival = prochacker_1.procHacker.jsv("??_7Player@@6B@", "?isSurvival@Player@@UEBA_NXZ", nativetype_1.bool_t, { this: actor_1.Actor });
actor_1.Actor.prototype.isSpectator = prochacker_1.procHacker.jsv("??_7Player@@6B@", "?isSpectator@Player@@UEBA_NXZ", nativetype_1.bool_t, { this: actor_1.Actor });
actor_1.Actor.prototype.remove = prochacker_1.procHacker.jsv("??_7Actor@@6B@", "?remove@Actor@@UEAAXXZ", nativetype_1.void_t, { this: actor_1.Actor });
actor_1.Actor.prototype.isAngry = prochacker_1.procHacker.js("?isAngry@Actor@@QEBA_NXZ", nativetype_1.bool_t, {
    this: actor_1.Actor,
});
actor_1.Actor.prototype.getBlockTarget = prochacker_1.procHacker.js("?getBlockTarget@Actor@@QEBA?AVBlockPos@@XZ", blockpos_1.BlockPos, { this: actor_1.Actor, structureReturn: true });
actor_1.Actor.prototype.isAttackableGamemode = prochacker_1.procHacker.jsv("??_7Actor@@6B@", "?isAttackableGamemode@Actor@@UEBA_NXZ", nativetype_1.bool_t, { this: actor_1.Actor });
actor_1.Actor.prototype.isInvulnerableTo = prochacker_1.procHacker.jsv("??_7Actor@@6B@", "?isInvulnerableTo@Actor@@UEBA_NAEBVActorDamageSource@@@Z", nativetype_1.bool_t, { this: actor_1.Actor }, actor_1.ActorDamageSource);
const Actor$canSeeEntity = prochacker_1.procHacker.js("?canSee@Actor@@UEBA_NAEBV1@@Z", nativetype_1.bool_t, null, actor_1.Actor, actor_1.Actor);
const Actor$canSeePos = prochacker_1.procHacker.js("?canSee@Actor@@UEBA_NAEBVVec3@@@Z", nativetype_1.bool_t, null, actor_1.Actor, blockpos_1.Vec3);
actor_1.Actor.prototype.canSee = function (target) {
    if (target instanceof actor_1.Actor) {
        return Actor$canSeeEntity(this, target);
    }
    else {
        return Actor$canSeePos(this, target);
    }
};
const Actor$isValidTarget = prochacker_1.procHacker.jsv("??_7ServerPlayer@@6B@", "?isValidTarget@ServerPlayer@@UEBA_NPEAVActor@@@Z", nativetype_1.bool_t, { this: actor_1.Actor }, actor_1.Actor);
actor_1.Actor.prototype.isValidTarget = function (source = null) {
    return Actor$isValidTarget.call(this, source);
};
const Actor$canAttack = prochacker_1.procHacker.jsv("??_7Actor@@6B@", "?canAttack@Actor@@UEBA_NPEAV1@_N@Z", nativetype_1.bool_t, { this: actor_1.Actor }, actor_1.Actor, nativetype_1.bool_t);
actor_1.Actor.prototype.canAttack = function (target, unknown = false) {
    return Actor$canAttack.call(this, target, unknown);
};
actor_1.Actor.prototype.getLastDeathPos = prochacker_1.procHacker.jsv("??_7Actor@@6B@", "?getLastDeathPos@Actor@@UEBA?AV?$optional@VBlockPos@@@std@@XZ", cxxoptional_1.CxxOptional.make(blockpos_1.BlockPos), {
    this: actor_1.Actor,
    structureReturn: true,
});
actor_1.Actor.prototype.getLastDeathDimension = prochacker_1.procHacker.jsv("??_7Actor@@6B@", "?getLastDeathDimension@Actor@@UEBA?AV?$optional@V?$AutomaticID@VDimension@@H@@@std@@XZ", cxxoptional_1.CxxOptional.make(nativetype_1.int32_t), { this: actor_1.Actor, structureReturn: true });
actor_1.Actor.prototype._getViewVector = prochacker_1.procHacker.js("?getViewVector@Actor@@QEBA?AVVec3@@M@Z", blockpos_1.Vec3, { this: actor_1.Actor, structureReturn: true }, nativetype_1.float32_t);
actor_1.Actor.prototype.isImmobile = prochacker_1.procHacker.jsv("??_7Actor@@6B@", "?isImmobile@Actor@@UEBA_NXZ", nativetype_1.bool_t, { this: actor_1.Actor });
actor_1.Actor.prototype.isSwimming = prochacker_1.procHacker.js("?isSwimming@Actor@@QEBA_NXZ", nativetype_1.bool_t, { this: actor_1.Actor });
actor_1.Actor.prototype.setSize = prochacker_1.procHacker.js("?setSize@Actor@@UEAAXMM@Z", nativetype_1.void_t, { this: player_1.Player }, nativetype_1.float32_t, nativetype_1.float32_t);
actor_1.Actor.prototype.isInsidePortal = prochacker_1.procHacker.js("?isInsidePortal@Actor@@QEBA_NXZ", nativetype_1.bool_t, { this: actor_1.Actor });
actor_1.Actor.prototype.isInWorld = prochacker_1.procHacker.js("?isInWorld@Actor@@QEBA_NXZ", nativetype_1.bool_t, { this: actor_1.Actor });
actor_1.Actor.prototype.isInWaterOrRain = prochacker_1.procHacker.js("?isInWaterOrRain@Actor@@QEBA_NXZ", nativetype_1.bool_t, { this: actor_1.Actor });
actor_1.Actor.prototype.isInThunderstorm = prochacker_1.procHacker.js("?isInThunderstorm@Actor@@QEBA_NXZ", nativetype_1.bool_t, { this: actor_1.Actor });
actor_1.Actor.prototype.isInSnow = prochacker_1.procHacker.js("?isInSnow@Actor@@QEBA_NXZ", nativetype_1.bool_t, {
    this: actor_1.Actor,
});
actor_1.Actor.prototype.isInScaffolding = prochacker_1.procHacker.js("?isInScaffolding@Actor@@QEBA_NXZ", nativetype_1.bool_t, { this: actor_1.Actor });
actor_1.Actor.prototype.isInRain = prochacker_1.procHacker.js("?isInRain@Actor@@QEBA_NXZ", nativetype_1.bool_t, {
    this: actor_1.Actor,
});
actor_1.Actor.prototype.isInPrecipitation = prochacker_1.procHacker.js("?isInPrecipitation@Actor@@QEBA_NXZ", nativetype_1.bool_t, { this: actor_1.Actor });
actor_1.Actor.prototype.isInLove = prochacker_1.procHacker.js("?isInLove@Actor@@QEBA_NXZ", nativetype_1.bool_t, {
    this: actor_1.Actor,
});
actor_1.Actor.prototype.isInLava = prochacker_1.procHacker.js("?isInLava@Actor@@QEBA_NXZ", nativetype_1.bool_t, {
    this: actor_1.Actor,
});
actor_1.Actor.prototype.isInContactWithWater = prochacker_1.procHacker.js("?isInContactWithWater@Actor@@QEBA_NXZ", nativetype_1.bool_t, { this: actor_1.Actor });
actor_1.Actor.prototype.isInClouds = prochacker_1.procHacker.js("?isInClouds@Actor@@QEBA_NXZ", nativetype_1.bool_t, { this: actor_1.Actor });
actor_1.Actor.prototype.isBaby = prochacker_1.procHacker.js("?isBaby@Actor@@QEBA_NXZ", nativetype_1.bool_t, {
    this: actor_1.Actor,
});
actor_1.Actor.prototype.getEntityData = prochacker_1.procHacker.js("?getEntityData@Actor@@QEBAAEBVSynchedActorDataEntityWrapper@@XZ", actor_1.SynchedActorDataEntityWrapper, { this: actor_1.Actor });
actor_1.Actor.prototype.getOwner = prochacker_1.procHacker.js("?getOwner@Actor@@QEBAPEAVMob@@XZ", actor_1.Mob, { this: actor_1.Actor });
actor_1.Actor.prototype.setOwner = prochacker_1.procHacker.js("?setOwner@Actor@@UEAAXUActorUniqueID@@@Z", nativetype_1.void_t, { this: actor_1.Actor }, actor_1.ActorUniqueID);
actor_1.Mob.prototype.getArmorValue = prochacker_1.procHacker.jsv("??_7Mob@@6B@", "?getArmorValue@Mob@@UEBAHXZ", nativetype_1.int32_t, { this: actor_1.Actor });
actor_1.Mob.prototype.knockback = prochacker_1.procHacker.jsv("??_7Mob@@6B@", "?knockback@Mob@@UEAAXPEAVActor@@HMMMMM@Z", nativetype_1.void_t, { this: actor_1.Mob }, actor_1.Actor, nativetype_1.int32_t, nativetype_1.float32_t, nativetype_1.float32_t, nativetype_1.float32_t, nativetype_1.float32_t, nativetype_1.float32_t);
actor_1.Mob.prototype.getSpeed = prochacker_1.procHacker.js("?getSpeed@Mob@@UEBAMXZ", nativetype_1.float32_t, {
    this: actor_1.Mob,
});
actor_1.Mob.prototype.setSpeed = prochacker_1.procHacker.js("?setSpeed@Mob@@UEAAXM@Z", nativetype_1.void_t, { this: actor_1.Mob }, nativetype_1.float32_t);
actor_1.Mob.prototype.isSprinting = prochacker_1.procHacker.js("?isSprinting@Mob@@QEBA_NXZ", nativetype_1.bool_t, { this: actor_1.Mob });
actor_1.Mob.prototype.sendArmorSlot = prochacker_1.procHacker.js("?sendArmorSlot@Mob@@QEAAXW4ArmorSlot@@@Z", nativetype_1.void_t, { this: actor_1.Mob }, nativetype_1.uint32_t);
actor_1.Mob.prototype.setSprinting = prochacker_1.procHacker.js("?setSprinting@Mob@@UEAAX_N@Z", nativetype_1.void_t, { this: actor_1.Mob }, nativetype_1.bool_t);
actor_1.Mob.prototype.isAlive = prochacker_1.procHacker.js("?isAlive@Mob@@UEBA_NXZ", nativetype_1.bool_t, {
    this: actor_1.Mob,
});
actor_1.Mob.prototype._sendInventory = prochacker_1.procHacker.js("?sendInventory@Mob@@UEAAX_N@Z", nativetype_1.void_t, { this: actor_1.Mob }, nativetype_1.bool_t);
actor_1.Mob.prototype.hurtEffects_ = prochacker_1.procHacker.jsv("??_7Mob@@6B@", "?hurtEffects@Mob@@UEAAXAEBVActorDamageSource@@M_N1@Z", nativetype_1.bool_t, { this: actor_1.Mob }, actor_1.ActorDamageSource, nativetype_1.int32_t, nativetype_1.bool_t, nativetype_1.bool_t);
actor_1.Mob.prototype.getArmorCoverPercentage = prochacker_1.procHacker.js("?getArmorCoverPercentage@Mob@@UEBAMXZ", nativetype_1.float32_t, { this: actor_1.Mob });
actor_1.Mob.prototype.getToughnessValue = prochacker_1.procHacker.js("?getToughnessValue@Mob@@UEBAHXZ", nativetype_1.int32_t, { this: actor_1.Mob });
actor_1.Mob.prototype.isBlocking = prochacker_1.procHacker.jsv("??_7Mob@@6B@", "?isBlocking@Mob@@UEBA_NXZ", nativetype_1.bool_t, { this: actor_1.Mob });
actor_1.OwnerStorageEntity.prototype._getStackRef = prochacker_1.procHacker.js("?_getStackRef@OwnerStorageEntity@@IEBAAEAVEntityContext@@XZ", actor_1.EntityContext, {
    this: actor_1.OwnerStorageEntity,
});
actor_1.Actor.tryGetFromEntity = prochacker_1.procHacker.js("?tryGetFromEntity@Actor@@SAPEAV1@AEAVEntityContext@@_N@Z", actor_1.Actor, null, actor_1.EntityContext, nativetype_1.bool_t);
actor_1.SynchedActorDataEntityWrapper.prototype.getFloat = prochacker_1.procHacker.js("?getFloat@SynchedActorDataEntityWrapper@@QEBAMG@Z", nativetype_1.float32_t, { this: actor_1.SynchedActorDataEntityWrapper }, nativetype_1.uint16_t);
actor_1.SynchedActorDataEntityWrapper.prototype.setFloat = prochacker_1.procHacker.js("??$set@M@SynchedActorDataEntityWrapper@@QEAAXGAEBM@Z", nativetype_1.void_t, { this: actor_1.SynchedActorDataEntityWrapper }, nativetype_1.uint16_t, nativetype_1.float32_t.ref() /** float const & */);
let StackResultStorageEntity = class StackResultStorageEntity extends nativeclass_1.NativeClass {
    constructWith(weakEntityRef) {
        (0, common_1.abstract)();
    }
    _hasValue() {
        (0, common_1.abstract)();
    }
    _getStackRef() {
        (0, common_1.abstract)();
    }
};
StackResultStorageEntity = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x18)
], StackResultStorageEntity);
StackResultStorageEntity.prototype.constructWith = prochacker_1.procHacker.js("??0StackResultStorageEntity@@IEAA@AEBVWeakStorageEntity@@@Z", nativetype_1.void_t, { this: StackResultStorageEntity }, actor_1.WeakEntityRef);
StackResultStorageEntity.prototype._hasValue = prochacker_1.procHacker.js("?_hasValue@StackResultStorageEntity@@IEBA_NXZ", nativetype_1.bool_t, { this: StackResultStorageEntity });
StackResultStorageEntity.prototype._getStackRef = prochacker_1.procHacker.js("?_getStackRef@StackResultStorageEntity@@IEBAAEAVEntityContext@@XZ", actor_1.EntityContext, {
    this: StackResultStorageEntity,
});
actor_1.WeakEntityRef.prototype.tryUnwrap = function (clazz, getRemoved = false) {
    const storage = new StackResultStorageEntity(true);
    storage.constructWith(this);
    if (!storage._hasValue())
        return null;
    const entity = storage._getStackRef();
    return clazz.tryGetFromEntity(entity, getRemoved);
};
actor_1.WeakEntityRef.prototype.tryUnwrapPlayer = function (getRemoved = false) {
    return this.tryUnwrap(player_1.Player, getRemoved);
};
actor_1.WeakEntityRef.prototype.tryUnwrapActor = function (getRemoved = false) {
    return this.tryUnwrap(actor_1.Actor, getRemoved);
};
const ActorDefinitionIdentifier$ActorDefinitionIdentifier$ActorType = prochacker_1.procHacker.js("??0ActorDefinitionIdentifier@@QEAA@W4ActorType@@@Z", nativetype_1.void_t, null, actor_1.ActorDefinitionIdentifier, nativetype_1.int32_t);
const ActorDefinitionIdentifier$ActorDefinitionIdentifier$CxxString = prochacker_1.procHacker.js("??0ActorDefinitionIdentifier@@QEAA@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", nativetype_1.void_t, null, actor_1.ActorDefinitionIdentifier, nativetype_1.CxxString);
actor_1.ActorDefinitionIdentifier.constructWith = function (type) {
    const identifier = new actor_1.ActorDefinitionIdentifier(true);
    if (typeof type === "number") {
        ActorDefinitionIdentifier$ActorDefinitionIdentifier$ActorType(identifier, type);
    }
    else {
        ActorDefinitionIdentifier$ActorDefinitionIdentifier$CxxString(identifier, type);
    }
    return identifier;
};
const ActorDamageSource$ActorDamageSource = prochacker_1.procHacker.js("??0ActorDamageSource@@QEAA@W4ActorDamageCause@@@Z", nativetype_1.void_t, null, actor_1.ActorDamageSource, nativetype_1.int32_t);
actor_1.ActorDamageSource.create = function (cause) {
    const source = new actor_1.ActorDamageSource(true);
    ActorDamageSource$ActorDamageSource(source, cause);
    return source;
};
const ActorDamageByActorSource$vftable = symbols_1.proc["??_7ActorDamageByActorSource@@6B@"];
const ActorDamageByChildActorSource$vftable = symbols_1.proc["??_7ActorDamageByChildActorSource@@6B@"];
const ActorDamageByBlockSource$vftable = symbols_1.proc["??_7ActorDamageByBlockSource@@6B@"];
actor_1.ActorDamageSource.setResolver(ptr => {
    if (ptr === null)
        return null;
    const vftable = ptr.getPointer();
    if (vftable.equalsptr(ActorDamageByActorSource$vftable)) {
        return ptr.as(actor_1.ActorDamageByActorSource);
    }
    if (vftable.equalsptr(ActorDamageByChildActorSource$vftable)) {
        return ptr.as(actor_1.ActorDamageByChildActorSource);
    }
    if (vftable.equalsptr(ActorDamageByBlockSource$vftable)) {
        return ptr.as(actor_1.ActorDamageByBlockSource);
    }
    return ptr.as(actor_1.ActorDamageSource);
});
actor_1.ActorDamageSource.prototype.getDamagingEntityUniqueID = prochacker_1.procHacker.jsv("??_7ActorDamageSource@@6B@", "?getDamagingEntityUniqueID@ActorDamageSource@@UEBA?AUActorUniqueID@@XZ", actor_1.ActorUniqueID, { this: actor_1.ActorDamageSource, structureReturn: true });
actor_1.ActorDamageSource.prototype.setCause = prochacker_1.procHacker.js("?setCause@ActorDamageSource@@QEAAXW4ActorDamageCause@@@Z", nativetype_1.void_t, { this: actor_1.ActorDamageSource }, nativetype_1.int32_t);
actor_1.ActorDamageByActorSource.prototype[nativetype_1.NativeType.dtor] = prochacker_1.procHacker.js("??1ActorDamageByActorSource@@UEAA@XZ", nativetype_1.void_t, { this: actor_1.ActorDamageByActorSource });
const ActorDamageByActorSource$ActorDamageByActorSource = prochacker_1.procHacker.js("??0ActorDamageByActorSource@@QEAA@AEBVActor@@W4ActorDamageCause@@@Z", nativetype_1.void_t, null, actor_1.ActorDamageByActorSource, actor_1.Actor, nativetype_1.int32_t);
actor_1.ActorDamageByActorSource.constructWith = function (damagingEntity, cause = actor_1.ActorDamageCause.EntityAttack) {
    const source = new actor_1.ActorDamageByActorSource(true);
    ActorDamageByActorSource$ActorDamageByActorSource(source, damagingEntity, cause);
    return source;
};
actor_1.ActorDamageByChildActorSource.prototype[nativetype_1.NativeType.dtor] = prochacker_1.procHacker.js("??1ActorDamageByChildActorSource@@UEAA@XZ", core_1.VoidPointer, {
    this: actor_1.ActorDamageByChildActorSource,
});
const ActorDamageByChildActorSource$ActorDamageByChildActorSource = prochacker_1.procHacker.js("??0ActorDamageByChildActorSource@@QEAA@AEBVActor@@0W4ActorDamageCause@@@Z", actor_1.ActorDamageByChildActorSource, null, actor_1.ActorDamageByChildActorSource, actor_1.Actor, actor_1.Actor, nativetype_1.int32_t);
actor_1.ActorDamageByChildActorSource.constructWith = function (childEntity, damagingEntity, cause = actor_1.ActorDamageCause.Projectile) {
    const source = new actor_1.ActorDamageByChildActorSource(true);
    ActorDamageByChildActorSource$ActorDamageByChildActorSource(source, childEntity, damagingEntity, cause);
    return source;
};
actor_1.ItemActor.abstract({
    itemStack: [inventory_1.ItemStack, 0x470], // accessed in ItemActor::isFireImmune
});
const attribNames = (0, util_1.getEnumKeys)(attribute_1.AttributeId).map(str => common_1.AttributeName[str]);
player_1.ServerPlayer.prototype.setAttribute = function (id, value) {
    const attr = actor_1.Actor.prototype.setAttribute.call(this, id, value);
    if (attr === null)
        return null;
    const packet = packets_1.UpdateAttributesPacket.allocate();
    packet.actorId = this.getRuntimeID();
    const data = packets_1.AttributeData.construct();
    data.name.set(attribNames[id - 1]);
    data.current = value;
    data.min = attr.minValue;
    data.max = attr.maxValue;
    data.default = attr.defaultValue;
    packet.attributes.push(data);
    data.destruct();
    this.sendNetworkPacket(packet);
    packet.dispose();
    return attr;
};
function _removeActor(actorptr) {
    const addrbin = actorptr.getAddressBin();
    const actor = actorMaps.get(addrbin);
    if (actor != null) {
        actorMaps.delete(addrbin);
        (0, decay_1.decay)(actor);
    }
}
const Level$levelCleanupQueueEntityRemoval = prochacker_1.procHacker.hooking("?levelCleanupQueueEntityRemoval@Level@@UEAAXV?$OwnerPtrT@UEntityRefTraits@@@@@Z", nativetype_1.void_t, null, level_1.Level, actor_1.EntityRefTraits)((level, entity) => {
    const actor = actor_1.Actor.tryGetFromEntity(entity, true);
    Level$levelCleanupQueueEntityRemoval(level, entity);
    if (actor !== null)
        _removeActor(actor);
});
asmcode_1.asmcode.removeActor = makefunc_1.makefunc.np(_removeActor, nativetype_1.void_t, null, core_1.VoidPointer);
prochacker_1.procHacker.hookingRawWithCallOriginal("??1Actor@@UEAA@XZ", asmcode_1.asmcode.actorDestructorHook, [assembler_1.Register.rcx], []);
// player.ts
player_1.Player.abstract({
    playerUIContainer: [inventory_1.PlayerUIContainer, 0xd78],
    deviceId: [nativetype_1.CxxString, 0x1d10], // accessed in AddPlayerPacket::AddPlayerPacket (the string assignment between LayeredAbilities::LayeredAbilities and Player::getPlatform)
});
player_1.Player.prototype._setName = prochacker_1.procHacker.js("?setName@Player@@UEAAXAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", nativetype_1.void_t, { this: player_1.Player }, nativetype_1.CxxString);
const PlayerListPacket$emplace = prochacker_1.procHacker.js("?emplace@PlayerListPacket@@QEAAX$$QEAVPlayerListEntry@@@Z", nativetype_1.void_t, null, packets_1.PlayerListPacket, packets_1.PlayerListEntry);
player_1.Player.prototype.setName = function (name) {
    this._setName(name);
    this.updatePlayerList();
};
player_1.Player.prototype.updatePlayerList = function () {
    const entry = packets_1.PlayerListEntry.constructWith(this);
    const pk = packets_1.PlayerListPacket.allocate();
    PlayerListPacket$emplace(pk, entry);
    for (const player of launcher_1.bedrockServer.serverInstance.getPlayers()) {
        player.sendNetworkPacket(pk);
    }
    entry.destruct();
    pk.dispose();
};
player_1.Player.prototype.getGameType = prochacker_1.procHacker.js("?getPlayerGameType@Player@@QEBA?AW4GameType@@XZ", nativetype_1.int32_t, { this: player_1.Player });
player_1.Player.prototype.getInventory = player_1.Player.prototype.getSupplies = prochacker_1.procHacker.js("?getSupplies@Player@@QEAAAEAVPlayerInventory@@XZ", inventory_1.PlayerInventory, { this: player_1.Player });
player_1.Player.prototype.getCommandPermissionLevel = prochacker_1.procHacker.js("?getCommandPermissionLevel@Player@@UEBA?AW4CommandPermissionLevel@@XZ", nativetype_1.int32_t, { this: actor_1.Actor });
player_1.Player.prototype.getPermissionLevel = prochacker_1.procHacker.js("?getPlayerPermissionLevel@Player@@QEBA?AW4PlayerPermissionLevel@@XZ", nativetype_1.int32_t, { this: player_1.Player });
player_1.Player.prototype.getSkin = prochacker_1.procHacker.js("?getSkin@Player@@QEAAAEAVSerializedSkin@@XZ", skin_1.SerializedSkin, { this: player_1.Player });
player_1.Player.prototype.startCooldown = prochacker_1.procHacker.js("?startCooldown@Player@@UEAAXPEBVItem@@_N@Z", nativetype_1.void_t, { this: player_1.Player }, inventory_1.Item);
player_1.Player.prototype.getItemCooldownLeft = prochacker_1.procHacker.js("?getItemCooldownLeft@Player@@UEBAHAEBVHashedString@@@Z", nativetype_1.int32_t, { this: player_1.Player }, hashedstring_1.HashedString);
player_1.Player.prototype.setGameType = prochacker_1.procHacker.js("?setPlayerGameType@ServerPlayer@@UEAAXW4GameType@@@Z", nativetype_1.void_t, { this: player_1.Player }, nativetype_1.int32_t);
player_1.Player.prototype.setPermissions = prochacker_1.procHacker.js("?setPermissions@Player@@QEAAXW4CommandPermissionLevel@@@Z", nativetype_1.void_t, { this: player_1.Player }, nativetype_1.int32_t);
player_1.Player.prototype.setSleeping = prochacker_1.procHacker.js("?setSleeping@Player@@UEAAX_N@Z", nativetype_1.void_t, { this: player_1.Player }, nativetype_1.bool_t);
player_1.Player.prototype.isSleeping = prochacker_1.procHacker.js("?isSleeping@Player@@UEBA_NXZ", nativetype_1.bool_t, { this: player_1.Player });
player_1.Player.prototype.isJumping = prochacker_1.procHacker.js("?isJumping@Actor@@QEBA_NXZ", nativetype_1.bool_t, { this: player_1.Player });
const UpdateAbilitiesPacket$UpdateAbilitiesPacket = prochacker_1.procHacker.js("??0UpdateAbilitiesPacket@@QEAA@UActorUniqueID@@AEBVLayeredAbilities@@@Z", packets_1.UpdateAbilitiesPacket, null, packets_1.UpdateAbilitiesPacket, actor_1.ActorUniqueID, abilities_1.LayeredAbilities);
player_1.Player.prototype.syncAbilities = function () {
    const pkt = new packets_1.UpdateAbilitiesPacket(true);
    UpdateAbilitiesPacket$UpdateAbilitiesPacket(pkt, this.getUniqueIdBin(), this.getAbilities());
    this.sendPacket(pkt);
    pkt.destruct();
};
player_1.Player.prototype.clearRespawnPosition = prochacker_1.procHacker.js("?clearRespawnPosition@Player@@QEAAXXZ", nativetype_1.void_t, { this: player_1.Player });
player_1.Player.prototype.hasRespawnPosition = prochacker_1.procHacker.js("?hasRespawnPosition@Player@@QEBA_NXZ", nativetype_1.bool_t, { this: player_1.Player });
player_1.Player.prototype.setRespawnPosition = prochacker_1.procHacker.js("?setRespawnPosition@Player@@QEAAXAEBVBlockPos@@V?$AutomaticID@VDimension@@H@@@Z", nativetype_1.void_t, { this: player_1.Player }, blockpos_1.BlockPos, nativetype_1.int32_t);
player_1.Player.prototype.setBedRespawnPosition = prochacker_1.procHacker.js("?setBedRespawnPosition@Player@@QEAAXAEBVBlockPos@@@Z", nativetype_1.void_t, { this: player_1.Player }, blockpos_1.BlockPos);
player_1.Player.prototype.getSpawnDimension = prochacker_1.procHacker.js("?getSpawnDimension@Player@@QEBA?AV?$AutomaticID@VDimension@@H@@XZ", nativetype_1.int32_t, {
    this: player_1.Player,
    structureReturn: true,
});
player_1.Player.prototype.getSpawnPosition = prochacker_1.procHacker.js("?getSpawnPosition@Player@@QEBAAEBVBlockPos@@XZ", blockpos_1.BlockPos, { this: player_1.Player });
player_1.Player.prototype.getCarriedItem = prochacker_1.procHacker.js("?getCarriedItem@Player@@UEBAAEBVItemStack@@XZ", inventory_1.ItemStack, { this: player_1.Player });
player_1.Player.prototype.setOffhandSlot = prochacker_1.procHacker.js("?setOffhandSlot@Player@@UEAAXAEBVItemStack@@@Z", nativetype_1.void_t, { this: player_1.Player }, inventory_1.ItemStack);
player_1.Player.prototype.addItem = prochacker_1.procHacker.js("?add@Player@@UEAA_NAEAVItemStack@@@Z", nativetype_1.bool_t, { this: player_1.Player }, inventory_1.ItemStack);
player_1.Player.prototype.getEquippedTotem = prochacker_1.procHacker.js("?getEquippedTotem@Player@@UEBAAEBVItemStack@@XZ", inventory_1.ItemStack, { this: player_1.Player });
player_1.Player.prototype.consumeTotem = prochacker_1.procHacker.js("?consumeTotem@Player@@UEAA_NXZ", nativetype_1.bool_t, { this: player_1.Player });
player_1.Player.prototype.setSpeed = prochacker_1.procHacker.js("?setSpeed@Player@@UEAAXM@Z", nativetype_1.void_t, { this: player_1.Player }, nativetype_1.float32_t);
player_1.Player.prototype._sendInventory = prochacker_1.procHacker.js("?sendInventory@Player@@UEAAX_N@Z", nativetype_1.void_t, { this: player_1.Player }, nativetype_1.bool_t);
let UserEntityIdentifierComponent = class UserEntityIdentifierComponent extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(networkidentifier_1.NetworkIdentifier)
], UserEntityIdentifierComponent.prototype, "networkIdentifier", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(mce_1.mce.UUID, 0xa8) // accessed in PlayerListEntry::PlayerListEntry after calling entt::basic_registry<EntityId>::try_get<UserEntityIdentifierComponent>
], UserEntityIdentifierComponent.prototype, "uuid", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(connreq_1.Certificate.ref(), 0xd8) // accessed in ServerNetworkHandler::_displayGameMessage before calling ExtendedCertificate::getXuid
], UserEntityIdentifierComponent.prototype, "certificate", void 0);
UserEntityIdentifierComponent = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], UserEntityIdentifierComponent);
actor_1.EntityContextBase.prototype.isValid = prochacker_1.procHacker.js("?isValid@EntityContextBase@@QEBA_NXZ", nativetype_1.bool_t, { this: actor_1.EntityContextBase });
const Registry_getEntityIdentifierComponent = prochacker_1.procHacker.js("??$try_get@VUserEntityIdentifierComponent@@@?$basic_registry@VEntityId@@V?$allocator@VEntityId@@@std@@@entt@@QEBA?A_PVEntityId@@@Z", UserEntityIdentifierComponent, null, core_1.VoidPointer, nativetype_1.int32_t.ref());
player_1.Player.prototype.getCertificate = function () {
    // part of ServerNetworkHandler::_displayGameMessage
    const base = this.ctxbase;
    const registry = base.enttRegistry;
    return Registry_getEntityIdentifierComponent(registry, base.entityId).certificate;
};
player_1.Player.prototype.getDestroySpeed = prochacker_1.procHacker.js("?getDestroySpeed@Player@@QEBAMAEBVBlock@@@Z", nativetype_1.float32_t, { this: player_1.Player }, block_1.Block.ref());
player_1.Player.prototype.canDestroy = prochacker_1.procHacker.js("?canDestroy@Player@@QEBA_NAEBVBlock@@@Z", nativetype_1.bool_t, { this: player_1.Player }, block_1.Block.ref());
player_1.Player.prototype.addExperience = prochacker_1.procHacker.js("?addExperience@Player@@UEAAXH@Z", nativetype_1.void_t, { this: player_1.Player }, nativetype_1.int32_t);
player_1.Player.prototype.addExperienceLevels = prochacker_1.procHacker.js("?addLevels@Player@@UEAAXH@Z", nativetype_1.void_t, { this: player_1.Player }, nativetype_1.int32_t);
player_1.Player.prototype.resetExperienceLevels = prochacker_1.procHacker.js("?resetPlayerLevel@Player@@QEAAXXZ", nativetype_1.void_t, { this: player_1.Player });
player_1.Player.prototype.getXpNeededForNextLevel = prochacker_1.procHacker.js("?getXpNeededForNextLevel@Player@@QEBAHXZ", nativetype_1.int32_t, { this: player_1.Player });
player_1.Player.prototype.setCursorSelectedItem = prochacker_1.procHacker.js("?setCursorSelectedItem@Player@@QEAAXAEBVItemStack@@@Z", nativetype_1.void_t, { this: player_1.Player }, inventory_1.ItemStack);
player_1.Player.prototype.getCursorSelectedItem = function () {
    return this.getPlayerUIItem(inventory_1.PlayerUISlot.CursorSelected);
};
player_1.Player.prototype.getPlayerUIItem = prochacker_1.procHacker.js("?getPlayerUIItem@Player@@QEAAAEBVItemStack@@W4PlayerUISlot@@@Z", inventory_1.ItemStack.ref(), { this: player_1.Player }, nativetype_1.int32_t);
player_1.Player.prototype.setPlayerUIItem = prochacker_1.procHacker.js("?setPlayerUIItem@Player@@QEAAXW4PlayerUISlot@@AEBVItemStack@@@Z", nativetype_1.void_t, { this: player_1.Player }, nativetype_1.int32_t, inventory_1.ItemStack.ref());
player_1.Player.prototype.getPlatform = prochacker_1.procHacker.js("?getPlatform@Player@@QEBA?AW4BuildPlatform@@XZ", nativetype_1.int32_t, { this: player_1.Player });
player_1.Player.prototype.getXuid = prochacker_1.procHacker.js("?getXuid@Player@@UEBA?AV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@XZ", nativetype_1.CxxString, {
    this: player_1.Player,
    structureReturn: true,
});
player_1.Player.prototype.getUuid = function () {
    const base = this.ctxbase;
    if (!base.isValid())
        throw Error(`EntityContextBase is not valid`);
    const registry = base._enttRegistry();
    return Registry_getEntityIdentifierComponent(registry, base.entityId).uuid;
};
player_1.Player.prototype.forceAllowEating = prochacker_1.procHacker.js("?forceAllowEating@Player@@QEBA_NXZ", nativetype_1.bool_t, { this: player_1.Player });
player_1.Player.prototype.getSpeed = prochacker_1.procHacker.js("?getSpeed@Player@@UEBAMXZ", nativetype_1.float32_t, { this: player_1.Player });
player_1.Player.prototype.hasOpenContainer = prochacker_1.procHacker.js("?hasOpenContainer@Player@@QEBA_NXZ", nativetype_1.bool_t, { this: player_1.Player });
player_1.Player.prototype.isHungry = prochacker_1.procHacker.js("?isHungry@Player@@QEBA_NXZ", nativetype_1.bool_t, { this: player_1.Player });
player_1.Player.prototype.isHurt = prochacker_1.procHacker.js("?isHurt@Player@@QEAA_NXZ", nativetype_1.bool_t, {
    this: player_1.Player,
});
player_1.Player.prototype.isSpawned = prochacker_1.procHacker.js("?isSpawned@Player@@QEBA_NXZ", nativetype_1.bool_t, { this: player_1.Player });
player_1.Player.prototype.isLoading = prochacker_1.procHacker.jsv("??_7ServerPlayer@@6B@", "?isLoading@ServerPlayer@@UEBA_NXZ", nativetype_1.bool_t, { this: player_1.Player });
player_1.Player.prototype.isPlayerInitialized = prochacker_1.procHacker.jsv("??_7ServerPlayer@@6B@", "?isPlayerInitialized@ServerPlayer@@UEBA_NXZ", nativetype_1.bool_t, { this: player_1.Player });
player_1.Player.prototype.getDestroyProgress = prochacker_1.procHacker.js("?getDestroyProgress@Player@@QEBAMAEBVBlock@@@Z", nativetype_1.float32_t, { this: player_1.Player }, block_1.Block);
player_1.Player.prototype.respawn = prochacker_1.procHacker.js("?respawn@Player@@UEAAXXZ", nativetype_1.void_t, {
    this: player_1.Player,
});
player_1.Player.prototype.setRespawnReady = prochacker_1.procHacker.js("?setRespawnReady@Player@@QEAAXAEBVVec3@@@Z", nativetype_1.void_t, { this: player_1.Player }, blockpos_1.Vec3);
player_1.Player.prototype.setSpawnBlockRespawnPosition = prochacker_1.procHacker.js("?setSpawnBlockRespawnPosition@Player@@QEAAXAEBVBlockPos@@V?$AutomaticID@VDimension@@H@@@Z", nativetype_1.void_t, { this: player_1.Player }, blockpos_1.BlockPos, nativetype_1.int32_t);
player_1.Player.prototype.setSelectedSlot = prochacker_1.procHacker.js("?setSelectedSlot@Player@@QEAAAEBVItemStack@@H@Z", inventory_1.ItemStack, { this: player_1.Player }, nativetype_1.int32_t);
player_1.Player.prototype.getDirection = prochacker_1.procHacker.js("?getDirection@Player@@QEBAHXZ", nativetype_1.int32_t, { this: player_1.Player });
player_1.Player.prototype.isFlying = prochacker_1.procHacker.js("?isFlying@Player@@QEBA_NXZ", nativetype_1.bool_t, { this: player_1.Player });
player_1.Player.prototype.isHiddenFrom = prochacker_1.procHacker.js("?isHiddenFrom@Player@@QEBA_NAEAVMob@@@Z", nativetype_1.bool_t, { this: player_1.Player }, actor_1.Mob);
player_1.Player.prototype.isInRaid = prochacker_1.procHacker.js("?isInRaid@Player@@QEBA_NXZ", nativetype_1.bool_t, { this: player_1.Player });
player_1.Player.prototype.isUsingItem = prochacker_1.procHacker.js("?isUsingItem@Player@@QEBA_NXZ", nativetype_1.bool_t, { this: player_1.Player });
player_1.Player.prototype.hasDimension = prochacker_1.procHacker.js("?hasDimension@Actor@@QEBA_NXZ", nativetype_1.bool_t, { this: player_1.Player });
player_1.Player.prototype.getAbilities = prochacker_1.procHacker.js("?getAbilities@Player@@QEAAAEAVLayeredAbilities@@XZ", abilities_1.LayeredAbilities, { this: player_1.Player });
player_1.Player.prototype.getSelectedItem = prochacker_1.procHacker.js("?getSelectedItem@Player@@QEBAAEBVItemStack@@XZ", inventory_1.ItemStack, { this: player_1.Player });
player_1.Player.prototype.getName = prochacker_1.procHacker.js("?getName@Player@@QEBAAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@XZ", nativetype_1.CxxString, { this: player_1.Player });
player_1.Player.tryGetFromEntity = prochacker_1.procHacker.js("?tryGetFromEntity@Player@@SAPEAV1@AEAVEntityContext@@_N@Z", player_1.Player, null, actor_1.EntityContext, nativetype_1.bool_t);
player_1.ServerPlayer.prototype.nextContainerCounter = prochacker_1.procHacker.js("?_nextContainerCounter@ServerPlayer@@AEAA?AW4ContainerID@@XZ", nativetype_1.int8_t, { this: player_1.ServerPlayer });
player_1.ServerPlayer.prototype.openInventory = prochacker_1.procHacker.js("?openInventory@ServerPlayer@@UEAAXXZ", nativetype_1.void_t, { this: player_1.ServerPlayer });
player_1.ServerPlayer.prototype.resendAllChunks = prochacker_1.procHacker.js("?resendAllChunks@Player@@UEAAXXZ", nativetype_1.void_t, { this: player_1.ServerPlayer });
player_1.ServerPlayer.prototype.sendNetworkPacket = prochacker_1.procHacker.js("?sendNetworkPacket@ServerPlayer@@UEBAXAEAVPacket@@@Z", nativetype_1.void_t, { this: player_1.ServerPlayer }, packet_1.Packet);
player_1.ServerPlayer.prototype.getNetworkIdentifier = function () {
    // part of ServerPlayer::sendNetworkPacket
    const base = this.ctxbase;
    if (!base.isValid())
        throw Error(`EntityContextBase is not valid`);
    const registry = base._enttRegistry();
    const res = Registry_getEntityIdentifierComponent(registry, base.entityId);
    return res.networkIdentifier;
};
player_1.ServerPlayer.prototype.setArmor = prochacker_1.procHacker.js("?setArmor@ServerPlayer@@UEAAXW4ArmorSlot@@AEBVItemStack@@@Z", nativetype_1.void_t, { this: player_1.ServerPlayer }, nativetype_1.uint32_t, inventory_1.ItemStack);
player_1.ServerPlayer.prototype.getInputMode = prochacker_1.procHacker.js("?getInputMode@ServerPlayer@@UEBA?AW4InputMode@@XZ", nativetype_1.int32_t, { this: player_1.ServerPlayer });
player_1.ServerPlayer.prototype.setInputMode = prochacker_1.procHacker.js("?setInputMode@ServerPlayer@@QEAAXAEBW4InputMode@@@Z", nativetype_1.void_t, { this: player_1.ServerPlayer }, nativetype_1.int32_t.ref());
player_1.ServerPlayer.prototype.setOffhandSlot = prochacker_1.procHacker.js("?setOffhandSlot@ServerPlayer@@UEAAXAEBVItemStack@@@Z", nativetype_1.void_t, { this: player_1.ServerPlayer }, inventory_1.ItemStack);
player_1.ServerPlayer.prototype._sendInventory = prochacker_1.procHacker.js("?sendInventory@ServerPlayer@@UEAAX_N@Z", nativetype_1.void_t, { this: player_1.ServerPlayer }, nativetype_1.bool_t);
player_1.ServerPlayer.tryGetFromEntity = prochacker_1.procHacker.js("?tryGetFromEntity@ServerPlayer@@SAPEAV1@AEAVEntityContext@@_N@Z", player_1.ServerPlayer, null, actor_1.EntityContext, nativetype_1.bool_t);
const ServerNetworkHandlerNonOwnerPointer = bedrock_1.Bedrock.NonOwnerPointer.make(networkidentifier_1.ServerNetworkHandler);
player_1.SimulatedPlayer.abstract({});
const SimulatedPlayer$create = prochacker_1.procHacker.js("?create@SimulatedPlayer@@SAPEAV1@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEBVBlockPos@@V?$AutomaticID@VDimension@@H@@V?$not_null@V?$NonOwnerPointer@VServerNetworkHandler@@@Bedrock@@@gsl@@0@Z", player_1.SimulatedPlayer, null, nativetype_1.CxxString, blockpos_1.BlockPos, nativetype_1.int32_t, ServerNetworkHandlerNonOwnerPointer, nativetype_1.CxxString);
const shHandler = ServerNetworkHandlerNonOwnerPointer.construct();
player_1.SimulatedPlayer.create = function (name, blockPos, dimensionId) {
    if (!(blockPos instanceof blockpos_1.BlockPos))
        blockPos = blockpos_1.BlockPos.create(blockPos);
    shHandler.assign(launcher_1.bedrockServer.nonOwnerPointerServerNetworkHandler);
    const unknown = "";
    return SimulatedPlayer$create(name, blockPos, dimensionId, shHandler, unknown); // it destructs snHandler
};
player_1.SimulatedPlayer.prototype.simulateDisconnect = prochacker_1.procHacker.js("?simulateDisconnect@SimulatedPlayer@@QEAAXXZ", nativetype_1.void_t, { this: player_1.SimulatedPlayer });
player_1.SimulatedPlayer.prototype.simulateAttack = prochacker_1.procHacker.js("?simulateAttack@SimulatedPlayer@@QEAA_NPEAVActor@@@Z", nativetype_1.bool_t, { this: player_1.SimulatedPlayer }, actor_1.Actor);
const SimulatedPlayer$simulateLookAtEntity = prochacker_1.procHacker.js("?simulateLookAt@SimulatedPlayer@@QEAAXAEAVActor@@@Z", nativetype_1.void_t, null, player_1.SimulatedPlayer, actor_1.Actor);
const SimulatedPlayer$simulateLookAtBlock = prochacker_1.procHacker.js("?simulateLookAt@SimulatedPlayer@@QEAAXAEBVBlockPos@@@Z", nativetype_1.void_t, null, player_1.SimulatedPlayer, blockpos_1.BlockPos);
const SimulatedPlayer$simulateLookAtLocation = prochacker_1.procHacker.js("?simulateLookAt@SimulatedPlayer@@QEAAXAEBVVec3@@@Z", nativetype_1.void_t, null, player_1.SimulatedPlayer, blockpos_1.Vec3);
player_1.SimulatedPlayer.prototype.simulateLookAt = function (target) {
    if (target instanceof actor_1.Actor) {
        SimulatedPlayer$simulateLookAtEntity(this, target);
    }
    else if (target instanceof blockpos_1.BlockPos) {
        SimulatedPlayer$simulateLookAtBlock(this, target);
    }
    else {
        SimulatedPlayer$simulateLookAtLocation(this, target);
    }
};
player_1.SimulatedPlayer.tryGetFromEntity = prochacker_1.procHacker.js("?tryGetFromEntity@SimulatedPlayer@@SAPEAV1@AEAVEntityContext@@_N@Z", player_1.SimulatedPlayer, null, actor_1.EntityContext, nativetype_1.bool_t);
/*
TODO: Implement `ScriptNavigationResult`
const SimulatedPlayer$simulateNavigateToEntity = procHacker.js("?simulateNavigateToEntity@SimulatedPlayer@@QEAA?AUScriptNavigationResult@@AEAVActor@@M@Z",void_t,null,SimulatedPlayer,Actor,float32_t);
const SimulatedPlayer$simulateNavigateToLocation = procHacker.js("?simulateNavigateToLocation@SimulatedPlayer@@QEAA?AUScriptNavigationResult@@AEBVVec3@@M@Z",void_t,null,SimulatedPlayer,Vec3,float32_t);
SimulatedPlayer.prototype.simulateNavigateTo = function(goal:Actor|Vec3, speed:number){
    if(goal instanceof Vec3){
        SimulatedPlayer$simulateNavigateToLocation(this,goal,speed);
    }else{
        SimulatedPlayer$simulateNavigateToEntity(this,goal,speed);
    }
}; */
const SimulatedPlayer$simulateNavigateToLocations = prochacker_1.procHacker.js("?simulateNavigateToLocations@SimulatedPlayer@@QEAAX$$QEAV?$vector@VVec3@@V?$allocator@VVec3@@@std@@@std@@M@Z", nativetype_1.void_t, null, player_1.SimulatedPlayer, CxxVector$Vec3, nativetype_1.float32_t);
player_1.SimulatedPlayer.prototype.simulateNavigateToLocations = function (_locations, speed) {
    const locations = CxxVector$Vec3.construct();
    locations.reserve(_locations.length);
    for (const location of _locations) {
        locations.push(location);
    }
    SimulatedPlayer$simulateNavigateToLocations(this, locations, speed);
    locations.destruct();
};
player_1.SimulatedPlayer.prototype.simulateInteractWithActor = prochacker_1.procHacker.js("?simulateInteract@SimulatedPlayer@@QEAA_NAEAVActor@@@Z", nativetype_1.bool_t, { this: player_1.SimulatedPlayer }, actor_1.Actor);
const SimulatedPlayer$simulateInteractWithBlock = prochacker_1.procHacker.js("?simulateInteract@SimulatedPlayer@@QEAA_NAEBVBlockPos@@W4ScriptFacing@ScriptModuleMinecraft@@@Z", nativetype_1.bool_t, null, player_1.SimulatedPlayer, blockpos_1.BlockPos, nativetype_1.uint8_t);
player_1.SimulatedPlayer.prototype.simulateInteractWithBlock = function (blockPos, direction = 1) {
    return SimulatedPlayer$simulateInteractWithBlock(this, blockPos, direction);
};
player_1.SimulatedPlayer.prototype.simulateJump = prochacker_1.procHacker.js("?simulateJump@SimulatedPlayer@@QEAA_NXZ", nativetype_1.void_t, { this: player_1.SimulatedPlayer });
player_1.SimulatedPlayer.prototype.simulateSetBodyRotation = prochacker_1.procHacker.js("?simulateSetBodyRotation@SimulatedPlayer@@QEAAXM@Z", nativetype_1.void_t, { this: player_1.SimulatedPlayer }, nativetype_1.float32_t);
player_1.SimulatedPlayer.prototype.simulateSetItem = prochacker_1.procHacker.js("?simulateSetItem@SimulatedPlayer@@QEAA_NAEAVItemStack@@_NH@Z", nativetype_1.bool_t, { this: player_1.SimulatedPlayer }, inventory_1.ItemStack, nativetype_1.bool_t, nativetype_1.int32_t);
const SimulatedPlayer$simulateDestroyBlock = prochacker_1.procHacker.js("?simulateDestroyBlock@SimulatedPlayer@@QEAA_NAEBVBlockPos@@W4ScriptFacing@ScriptModuleMinecraft@@@Z", nativetype_1.bool_t, null, player_1.SimulatedPlayer, blockpos_1.BlockPos, nativetype_1.int32_t);
player_1.SimulatedPlayer.prototype.simulateDestroyBlock = function (pos, direction = 1) {
    return SimulatedPlayer$simulateDestroyBlock(this, pos, direction);
};
player_1.SimulatedPlayer.prototype.simulateStopDestroyingBlock = prochacker_1.procHacker.js("?simulateStopDestroyingBlock@SimulatedPlayer@@QEAAXXZ", nativetype_1.void_t, { this: player_1.SimulatedPlayer });
player_1.SimulatedPlayer.prototype.simulateLocalMove = prochacker_1.procHacker.js("?simulateLocalMove@SimulatedPlayer@@QEAAXAEBVVec3@@M@Z", nativetype_1.void_t, { this: player_1.SimulatedPlayer }, blockpos_1.Vec3, nativetype_1.float32_t);
player_1.SimulatedPlayer.prototype.simulateMoveToLocation = prochacker_1.procHacker.js("?simulateMoveToLocation@SimulatedPlayer@@QEAAXAEBVVec3@@M@Z", nativetype_1.void_t, { this: player_1.SimulatedPlayer }, blockpos_1.Vec3, nativetype_1.float32_t);
player_1.SimulatedPlayer.prototype.simulateStopMoving = prochacker_1.procHacker.js("?simulateStopMoving@SimulatedPlayer@@QEAAXXZ", nativetype_1.void_t, { this: player_1.SimulatedPlayer });
player_1.SimulatedPlayer.prototype.simulateUseItem = prochacker_1.procHacker.js("?simulateUseItem@SimulatedPlayer@@QEAA_NAEAVItemStack@@@Z", nativetype_1.bool_t, { this: player_1.SimulatedPlayer }, inventory_1.ItemStack);
player_1.SimulatedPlayer.prototype.simulateUseItemInSlot = prochacker_1.procHacker.js("?simulateUseItemInSlot@SimulatedPlayer@@QEAA_NH@Z", nativetype_1.bool_t, { this: player_1.SimulatedPlayer }, nativetype_1.int32_t);
const SimulatedPlayer$simulateUseItemOnBlock = prochacker_1.procHacker.js("?simulateUseItemOnBlock@SimulatedPlayer@@QEAA_NAEAVItemStack@@AEBVBlockPos@@W4ScriptFacing@ScriptModuleMinecraft@@AEBVVec3@@@Z", nativetype_1.bool_t, null, player_1.SimulatedPlayer, inventory_1.ItemStack, blockpos_1.BlockPos, nativetype_1.int32_t, blockpos_1.Vec3);
player_1.SimulatedPlayer.prototype.simulateUseItemOnBlock = function (item, pos, direction = 1, clickPos = blockpos_1.Vec3.create(0, 0, 0)) {
    return SimulatedPlayer$simulateUseItemOnBlock(this, item, pos, direction, clickPos);
};
const SimulatedPlayer$simulateUseItemInSlotOnBlock = prochacker_1.procHacker.js("?simulateUseItemInSlotOnBlock@SimulatedPlayer@@QEAA_NHAEBVBlockPos@@W4ScriptFacing@ScriptModuleMinecraft@@AEBVVec3@@@Z", nativetype_1.bool_t, null, player_1.SimulatedPlayer, nativetype_1.int32_t, blockpos_1.BlockPos, nativetype_1.int32_t, blockpos_1.Vec3);
player_1.SimulatedPlayer.prototype.simulateUseItemInSlotOnBlock = function (slot, pos, direction = 1, clickPos = blockpos_1.Vec3.create(0, 0, 0)) {
    return SimulatedPlayer$simulateUseItemInSlotOnBlock(this, slot, pos, direction, clickPos);
};
const PlayerListEntry$PlayerListEntry = prochacker_1.procHacker.js("??0PlayerListEntry@@QEAA@AEBVPlayer@@@Z", packets_1.PlayerListEntry, null, packets_1.PlayerListEntry, player_1.Player);
packets_1.PlayerListEntry.constructWith = function (player) {
    const entry = new packets_1.PlayerListEntry(true);
    return PlayerListEntry$PlayerListEntry(entry, player);
};
packets_1.PlayerListEntry.prototype[nativetype_1.NativeType.dtor] = prochacker_1.procHacker.js("??1PlayerListEntry@@QEAA@XZ", nativetype_1.void_t, { this: packets_1.PlayerListEntry });
packets_1.ItemStackRequestPacket.prototype.getRequestBatch = prochacker_1.procHacker.js("?getRequestBatch@ItemStackRequestPacket@@QEBAAEBVItemStackRequestBatch@@XZ", packets_1.ItemStackRequestBatch, { this: packets_1.ItemStackRequestPacket });
packets_1.ItemStackRequestActionTransferBase.prototype.getSrc = prochacker_1.procHacker.js("?getSrc@ItemStackRequestActionTransferBase@@QEBAAEBUItemStackRequestSlotInfo@@XZ", packets_1.ItemStackRequestSlotInfo, { this: packets_1.ItemStackRequestActionTransferBase });
// networkidentifier.ts
networkidentifier_1.NetworkIdentifier.prototype.getActor = function () {
    return launcher_1.bedrockServer.serverNetworkHandler._getServerPlayer(this, 0);
};
networkidentifier_1.NetworkIdentifier.prototype.getAddress = function () {
    const idx = this.address.GetSystemIndex();
    const rakpeer = launcher_1.bedrockServer.rakPeer;
    return rakpeer.GetSystemAddressFromIndex(idx).toString();
};
const NetworkIdentifier$equalsTypeData = prochacker_1.procHacker.js("?equalsTypeData@NetworkIdentifier@@AEBA_NAEBV1@@Z", nativetype_1.bool_t, null, networkidentifier_1.NetworkIdentifier, networkidentifier_1.NetworkIdentifier);
networkidentifier_1.NetworkIdentifier.prototype.equals = function (other) {
    if (other.type !== other.type)
        return false;
    return NetworkIdentifier$equalsTypeData(this, other);
};
const NetworkIdentifier_getHash = prochacker_1.procHacker.js("?getHash@NetworkIdentifier@@QEBA_KXZ", nativetype_1.bin64_t, null, networkidentifier_1.NetworkIdentifier);
networkidentifier_1.NetworkIdentifier.prototype.hash = function () {
    const hash = NetworkIdentifier_getHash(this);
    return bin_1.bin.int32(hash) ^ bin_1.bin.int32_high(hash);
};
networkidentifier_1.NetworkConnection.abstract({
    networkIdentifier: [networkidentifier_1.NetworkIdentifier, 0],
});
networkidentifier_1.NetworkSystem.abstract({
    vftable: core_1.VoidPointer,
});
Object.defineProperties(networkidentifier_1.NetworkSystem.prototype, {
    instance: {
        get() {
            return launcher_1.bedrockServer.connector;
        },
    },
});
// NetworkSystem::Connection* NetworkSystem::getConnectionFromId(const NetworkIdentifier& ni)
networkidentifier_1.NetworkSystem.prototype.getConnectionFromId = prochacker_1.procHacker.js("?_getConnectionFromId@NetworkSystem@@AEBAPEAVNetworkConnection@@AEBVNetworkIdentifier@@@Z", networkidentifier_1.NetworkConnection, { this: networkidentifier_1.NetworkSystem });
// void NetworkSystem::send(const NetworkIdentifier& ni, Packet* packet, unsigned char senderSubClientId)
networkidentifier_1.NetworkSystem.prototype.send = makefunc_1.makefunc.js(asmcode_1.asmcode.packetSendHook, // pass hooked function directly, reduce overhead
nativetype_1.void_t, { this: networkidentifier_1.NetworkSystem }, networkidentifier_1.NetworkIdentifier, packet_1.Packet, nativetype_1.int32_t);
// void NetworkSystem::_sendInternal(const NetworkIdentifier& ni, Packet* packet, std::string& data)
networkidentifier_1.NetworkSystem.prototype.sendInternal = prochacker_1.procHacker.js("?_sendInternal@NetworkSystem@@AEAAXAEBVNetworkIdentifier@@AEBVPacket@@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", nativetype_1.void_t, { this: networkidentifier_1.NetworkSystem }, networkidentifier_1.NetworkIdentifier, packet_1.Packet, pointer_1.CxxStringWrapper);
networkidentifier_1.NetworkConnection.prototype.disconnect = prochacker_1.procHacker.js("?disconnect@NetworkConnection@@QEAAXXZ", nativetype_1.void_t, { this: networkidentifier_1.NetworkConnection });
const BatchedNetworkPeer$sendPacket = prochacker_1.procHacker.js("?sendPacket@BatchedNetworkPeer@@UEAAXAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@W4Reliability@NetworkPeer@@W4Compressibility@@@Z", nativetype_1.void_t, { this: peer_1.BatchedNetworkPeer }, nativetype_1.CxxString, nativetype_1.int32_t, nativetype_1.int32_t);
peer_1.BatchedNetworkPeer.prototype.sendPacket = function (data, reliability, compressibility, oldparam, oldparam2) {
    if (oldparam2 !== undefined) {
        compressibility = oldparam2;
    }
    else if (oldparam !== undefined) {
        compressibility = oldparam;
    }
    BatchedNetworkPeer$sendPacket.call(this, data, reliability, compressibility);
};
Object.defineProperties(raknetinstance_1.RakNetConnector.prototype, {
    peer: {
        get() {
            return launcher_1.bedrockServer.rakPeer;
        },
    },
});
raknetinstance_1.RakNetConnector.prototype.getPort = prochacker_1.procHacker.js("?getPort@RakNetConnector@@UEBAGXZ", nativetype_1.uint16_t, { this: raknetinstance_1.RakNetConnector });
raknet_1.RakNet.RakPeer.prototype.GetAveragePing = prochacker_1.procHacker.js("?GetAveragePing@RakPeer@RakNet@@UEAAHUAddressOrGUID@2@@Z", nativetype_1.int32_t, { this: raknet_1.RakNet.RakPeer }, raknet_1.RakNet.AddressOrGUID);
raknet_1.RakNet.RakPeer.prototype.GetLastPing = prochacker_1.procHacker.js("?GetLastPing@RakPeer@RakNet@@UEBAHUAddressOrGUID@2@@Z", nativetype_1.int32_t, { this: raknet_1.RakNet.RakPeer }, raknet_1.RakNet.AddressOrGUID);
raknet_1.RakNet.RakPeer.prototype.GetLowestPing = prochacker_1.procHacker.js("?GetLowestPing@RakPeer@RakNet@@UEBAHUAddressOrGUID@2@@Z", nativetype_1.int32_t, { this: raknet_1.RakNet.RakPeer }, raknet_1.RakNet.AddressOrGUID);
// packet.ts
packet_1.Packet.prototype[nativetype_1.NativeType.dtor] = nativeclass_1.vectorDeletingDestructor;
packet_1.Packet.prototype.sendTo = function (target, senderSubClientId = 0) {
    launcher_1.bedrockServer.networkSystem.send(target, this, senderSubClientId);
};
packet_1.Packet.prototype.getId = prochacker_1.procHacker.jsv("??_7SetTitlePacket@@6B@", "?getId@SetTitlePacket@@UEBA?AW4MinecraftPacketIds@@XZ", nativetype_1.int32_t, { this: packet_1.Packet });
packet_1.Packet.prototype.getName = prochacker_1.procHacker.jsv("??_7LoginPacket@@6B@", "?getName@LoginPacket@@UEBA?AV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@XZ", nativetype_1.CxxString, { this: packet_1.Packet, structureReturn: true });
packet_1.Packet.prototype.write = prochacker_1.procHacker.jsv("??_7LoginPacket@@6B@", "?write@LoginPacket@@UEBAXAEAVBinaryStream@@@Z", nativetype_1.void_t, { this: packet_1.Packet }, stream_1.BinaryStream);
packet_1.Packet.prototype.readExtended = prochacker_1.procHacker.jsv("??_7PlayerListPacket@@6B@", "?readExtended@PlayerListPacket@@UEAA?AUExtendedStreamReadResult@@AEAVReadOnlyBinaryStream@@@Z", packet_1.ExtendedStreamReadResult, { this: packet_1.Packet }, packet_1.ExtendedStreamReadResult, stream_1.BinaryStream);
packet_1.Packet.prototype.read = prochacker_1.procHacker.jsv("??_7LoginPacket@@6B@", "?_read@LoginPacket@@EEAA?AW4StreamReadResult@@AEAVReadOnlyBinaryStream@@@Z", nativetype_1.int32_t, { this: packet_1.Packet }, stream_1.BinaryStream);
packets_1.ItemStackRequestData.prototype.getStringsToFilter = prochacker_1.procHacker.js("?getStringsToFilter@ItemStackRequestData@@QEBAAEBV?$vector@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$allocator@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@2@@std@@XZ", CxxVector$string, { this: packets_1.ItemStackRequestData });
packets_1.ItemStackRequestData.prototype.getActions = prochacker_1.procHacker.js("?getActions@ItemStackRequestData@@QEBAAEBV?$vector@V?$unique_ptr@VItemStackRequestAction@@U?$default_delete@VItemStackRequestAction@@@std@@@std@@V?$allocator@V?$unique_ptr@VItemStackRequestAction@@U?$default_delete@VItemStackRequestAction@@@std@@@std@@@2@@std@@XZ", cxxvector_1.CxxVector.make(packets_1.ItemStackRequestAction.ref()), { this: packets_1.ItemStackRequestData });
// networkidentifier.ts
networkidentifier_1.ServerNetworkHandler.prototype._getServerPlayer = prochacker_1.procHacker.js("?_getServerPlayer@ServerNetworkHandler@@EEAAPEAVServerPlayer@@AEBVNetworkIdentifier@@W4SubClientId@@@Z", player_1.ServerPlayer, { this: networkidentifier_1.ServerNetworkHandler }, networkidentifier_1.NetworkIdentifier, nativetype_1.int32_t);
const ServerNetworkHandler$disconnectClient = prochacker_1.procHacker.js("?disconnectClient@ServerNetworkHandler@@QEAAXAEBVNetworkIdentifier@@W4SubClientId@@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@_N@Z", nativetype_1.void_t, null, networkidentifier_1.ServerNetworkHandler, networkidentifier_1.NetworkIdentifier, nativetype_1.int32_t, nativetype_1.CxxString, nativetype_1.bool_t);
networkidentifier_1.ServerNetworkHandler.prototype.disconnectClient = function (client, message = "disconnectionScreen.disconnected", skipMessage = false) {
    ServerNetworkHandler$disconnectClient(this, client, /** subClientId */ 0, message, skipMessage);
};
networkidentifier_1.ServerNetworkHandler.prototype.allowIncomingConnections = prochacker_1.procHacker.js("?allowIncomingConnections@ServerNetworkHandler@@QEAAXAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@_N@Z", nativetype_1.void_t, { this: networkidentifier_1.ServerNetworkHandler }, nativetype_1.CxxString, nativetype_1.bool_t);
networkidentifier_1.ServerNetworkHandler.prototype.updateServerAnnouncement = prochacker_1.procHacker.js("?updateServerAnnouncement@ServerNetworkHandler@@QEAAXXZ", nativetype_1.void_t, {
    this: networkidentifier_1.ServerNetworkHandler,
});
networkidentifier_1.ServerNetworkHandler.prototype.setMaxNumPlayers = prochacker_1.procHacker.js("?setMaxNumPlayers@ServerNetworkHandler@@QEAAHH@Z", nativetype_1.void_t, { this: networkidentifier_1.ServerNetworkHandler }, nativetype_1.int32_t);
networkidentifier_1.ServerNetworkHandler.prototype.fetchConnectionRequest = prochacker_1.procHacker.js("?fetchConnectionRequest@ServerNetworkHandler@@QEAAAEBVConnectionRequest@@AEBVNetworkIdentifier@@@Z", connreq_1.ConnectionRequest, { this: networkidentifier_1.ServerNetworkHandler }, networkidentifier_1.NetworkIdentifier);
// connreq.ts
connreq_1.Certificate.prototype.getXuid = function () {
    return ExtendedCertificate.getXuid(this);
};
connreq_1.Certificate.prototype.getIdentityName = function () {
    return ExtendedCertificate.getIdentityName(this);
};
connreq_1.Certificate.prototype.getIdentity = function () {
    return ExtendedCertificate.getIdentity(this).value;
};
connreq_1.ConnectionRequest.prototype.getCertificate = prochacker_1.procHacker.js("?getCertificate@ConnectionRequest@@QEBAPEBVCertificate@@XZ", connreq_1.Certificate, { this: connreq_1.ConnectionRequest });
var ExtendedCertificate;
(function (ExtendedCertificate) {
    ExtendedCertificate.getXuid = prochacker_1.procHacker.js("?getXuid@ExtendedCertificate@@SA?AV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEBVCertificate@@@Z", nativetype_1.CxxString, { structureReturn: true }, connreq_1.Certificate);
    ExtendedCertificate.getIdentityName = prochacker_1.procHacker.js("?getIdentityName@ExtendedCertificate@@SA?AV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEBVCertificate@@@Z", nativetype_1.CxxString, { structureReturn: true }, connreq_1.Certificate);
    ExtendedCertificate.getIdentity = prochacker_1.procHacker.js("?getIdentity@ExtendedCertificate@@SA?AVUUID@mce@@AEBVCertificate@@@Z", mce_1.mce.UUIDWrapper, { structureReturn: true }, connreq_1.Certificate);
})(ExtendedCertificate || (ExtendedCertificate = {}));
// attribute.ts
attribute_1.AttributeInstance.abstract({
    vftable: core_1.VoidPointer,
    u1: core_1.VoidPointer,
    u2: core_1.VoidPointer,
    currentValue: [nativetype_1.float32_t, 0x84],
    minValue: [nativetype_1.float32_t, 0x7c],
    maxValue: [nativetype_1.float32_t, 0x80],
    defaultValue: [nativetype_1.float32_t, 0x78],
});
attribute_1.BaseAttributeMap.prototype.getMutableInstance = prochacker_1.procHacker.js("?getMutableInstance@BaseAttributeMap@@QEAAPEAVAttributeInstance@@I@Z", attribute_1.AttributeInstance, { this: attribute_1.BaseAttributeMap }, nativetype_1.int32_t);
// server.ts
server_1.VanillaGameModuleServer.abstract({
    listener: [server_1.VanillaServerGameplayEventListener.ref(), 0x8],
});
server_1.DedicatedServer.abstract({
    vftable: core_1.VoidPointer,
});
server_1.Minecraft.abstract({
    vftable: core_1.VoidPointer,
    vanillaGameModuleServer: [sharedpointer_1.CxxSharedPtr, 0x28],
    server: server_1.DedicatedServer.ref(),
});
server_1.Minecraft.prototype.getLevel = function () {
    return launcher_1.bedrockServer.level;
};
server_1.Minecraft.prototype.getNetworkHandler = prochacker_1.procHacker.js("?getNetworkSystem@Minecraft@@QEAAAEAVNetworkSystem@@XZ", networkidentifier_1.NetworkSystem, { this: server_1.Minecraft });
server_1.Minecraft.prototype.getNonOwnerPointerServerNetworkHandler = prochacker_1.procHacker.js("?getServerNetworkHandler@Minecraft@@QEAA?AV?$NonOwnerPointer@VServerNetworkHandler@@@Bedrock@@XZ", bedrock_1.Bedrock.NonOwnerPointer.make(networkidentifier_1.ServerNetworkHandler), { this: server_1.Minecraft, structureReturn: true });
server_1.Minecraft.prototype.getServerNetworkHandler = function () {
    return launcher_1.bedrockServer.serverNetworkHandler;
};
server_1.Minecraft.prototype.getCommands = function () {
    return launcher_1.bedrockServer.minecraftCommands;
};
server_1.ScriptFramework.abstract({
    vftable: core_1.VoidPointer,
});
server_1.ServerInstance.abstract({
    vftable: core_1.VoidPointer,
});
Object.defineProperties(server_1.ServerInstance.prototype, {
    server: {
        get() {
            return launcher_1.bedrockServer.dedicatedServer;
        },
    },
    minecraft: {
        get() {
            return launcher_1.bedrockServer.minecraft;
        },
    },
    networkSystem: {
        get() {
            return launcher_1.bedrockServer.networkSystem;
        },
    },
});
server_1.ServerInstance.prototype._disconnectAllClients = prochacker_1.procHacker.js("?disconnectAllClientsWithMessage@ServerInstance@@QEAAXV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", nativetype_1.void_t, { this: server_1.ServerInstance }, nativetype_1.CxxString);
server_1.ServerInstance.prototype.createDimension = function (id) {
    return launcher_1.bedrockServer.level.createDimension(id);
};
server_1.ServerInstance.prototype.getActivePlayerCount = function () {
    return launcher_1.bedrockServer.level.getActivePlayerCount();
};
server_1.ServerInstance.prototype.disconnectClient = function (client, message = "disconnectionScreen.disconnected", skipMessage = false) {
    return launcher_1.bedrockServer.serverNetworkHandler.disconnectClient(client, message, skipMessage);
};
server_1.ServerInstance.prototype.getMotd = function () {
    return launcher_1.bedrockServer.serverNetworkHandler.motd;
};
server_1.ServerInstance.prototype.setMotd = function (motd) {
    return launcher_1.bedrockServer.serverNetworkHandler.setMotd(motd);
};
server_1.ServerInstance.prototype.getMaxPlayers = function () {
    return launcher_1.bedrockServer.serverNetworkHandler.maxPlayers;
};
server_1.ServerInstance.prototype.setMaxPlayers = function (count) {
    launcher_1.bedrockServer.serverNetworkHandler.setMaxNumPlayers(count);
};
server_1.ServerInstance.prototype.getPlayers = function () {
    return launcher_1.bedrockServer.level.getPlayers();
};
server_1.ServerInstance.prototype.updateCommandList = function () {
    const pk = launcher_1.bedrockServer.commandRegistry.serializeAvailableCommands();
    for (const player of this.getPlayers()) {
        player.sendNetworkPacket(pk);
    }
    pk.dispose();
};
const networkProtocolVersion = symbols_1.proc["?NetworkProtocolVersion@SharedConstants@@3HB"].getInt32();
server_1.ServerInstance.prototype.getNetworkProtocolVersion = function () {
    return networkProtocolVersion;
};
const currentGameSemVersion = symbols_1.proc["?CurrentGameSemVersion@SharedConstants@@3VSemVersion@@B"].as(server_1.SemVersion);
server_1.ServerInstance.prototype.getGameVersion = function () {
    return currentGameSemVersion;
};
server_1.Minecraft$Something.prototype.network = launcher_1.bedrockServer.networkSystem;
server_1.Minecraft$Something.prototype.level = launcher_1.bedrockServer.level;
server_1.Minecraft$Something.prototype.shandler = launcher_1.bedrockServer.serverNetworkHandler;
// gamemode.ts
gamemode_1.GameMode.abstract({
    actor: [player_1.Player.ref(), 8],
});
let RecordItem = class RecordItem extends inventory_1.Item {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], RecordItem.prototype, "vftable", void 0);
RecordItem = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], RecordItem);
const RecordItem$vftable = symbols_1.proc["??_7RecordItem@@6B@"];
inventory_1.Item.setResolver(ptr => {
    if (ptr === null) {
        return null;
    }
    const vftable = ptr.getPointer();
    if (vftable.equalsptr(RecordItem$vftable)) {
        return ptr.as(RecordItem);
    }
    else {
        return ptr.as(inventory_1.Item);
    }
});
inventory_1.Item.prototype.isMusicDisk = function () {
    return this instanceof RecordItem;
};
// inventory.ts
inventory_1.Item.prototype.allowOffhand = function () {
    // manual implement
    // accessed on Item::setAllowOffhand
    return this.getInt8(0x13a) < 0;
};
inventory_1.Item.prototype.isDamageable = prochacker_1.procHacker.js("?isDamageable@Item@@UEBA_NXZ", nativetype_1.bool_t, { this: inventory_1.Item });
inventory_1.Item.prototype.isFood = prochacker_1.procHacker.js("?isFood@Item@@UEBA_NXZ", nativetype_1.bool_t, {
    this: inventory_1.Item,
});
inventory_1.Item.prototype.setAllowOffhand = prochacker_1.procHacker.js("?setAllowOffhand@Item@@QEAAAEAV1@_N@Z", nativetype_1.void_t, { this: inventory_1.Item }, nativetype_1.bool_t);
inventory_1.Item.prototype.getSerializedName = prochacker_1.procHacker.js("?getSerializedName@Item@@QEBA?AV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@XZ", nativetype_1.CxxString, {
    this: inventory_1.Item,
    structureReturn: true,
});
inventory_1.Item.prototype.getCommandNames = prochacker_1.procHacker.js("?getCommandNames@Item@@QEBA?AV?$vector@UCommandName@@V?$allocator@UCommandName@@@std@@@std@@XZ", CxxVector$CxxStringWith8Bytes, { this: inventory_1.Item, structureReturn: true });
inventory_1.Item.prototype.getCommandNames2 = prochacker_1.procHacker.js("?getCommandNames@Item@@QEBA?AV?$vector@UCommandName@@V?$allocator@UCommandName@@@std@@@std@@XZ", CxxVector$CommandName, { this: inventory_1.Item, structureReturn: true });
inventory_1.Item.prototype.getCreativeCategory = prochacker_1.procHacker.js("?getCreativeCategory@Item@@QEBA?AW4CreativeItemCategory@@XZ", nativetype_1.int32_t, { this: inventory_1.Item });
inventory_1.ItemStack.prototype[nativetype_1.NativeType.dtor] = nativeclass_1.vectorDeletingDestructor;
inventory_1.Item.prototype.isArmor = prochacker_1.procHacker.jsv("??_7ArmorItem@@6B@", "?isArmor@ArmorItem@@UEBA_NXZ", nativetype_1.bool_t, { this: inventory_1.Item });
inventory_1.Item.prototype.getArmorValue = prochacker_1.procHacker.jsv("??_7ArmorItem@@6B@", "?getArmorValue@ArmorItem@@UEBAHXZ", nativetype_1.int32_t, { this: inventory_1.Item });
inventory_1.Item.prototype.getToughnessValue = prochacker_1.procHacker.jsv("??_7ArmorItem@@6B@", "?getToughnessValue@ArmorItem@@UEBAHXZ", nativetype_1.int32_t, { this: inventory_1.Item });
inventory_1.Item.prototype.getCooldownType = prochacker_1.procHacker.jsv("??_7Item@@6B@", "?getCooldownType@Item@@UEBAAEBVHashedString@@XZ", hashedstring_1.HashedString, { this: inventory_1.Item });
inventory_1.Item.prototype.canDestroyInCreative = prochacker_1.procHacker.jsv("??_7ComponentItem@@6B@", "?canDestroyInCreative@ComponentItem@@UEBA_NXZ", nativetype_1.bool_t, { this: inventory_1.Item });
inventory_1.ItemStackBase.prototype.toString = prochacker_1.procHacker.jsv("??_7ItemStackBase@@6B@", "?toString@ItemStackBase@@UEBA?AV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@XZ", nativetype_1.CxxString, { this: inventory_1.ItemStackBase, structureReturn: true });
inventory_1.ItemStackBase.prototype.toDebugString = prochacker_1.procHacker.jsv("??_7ItemStackBase@@6B@", "?toDebugString@ItemStackBase@@UEBA?AV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@XZ", nativetype_1.CxxString, { this: inventory_1.ItemStackBase, structureReturn: true });
inventory_1.ItemStackBase.prototype.remove = prochacker_1.procHacker.js("?remove@ItemStackBase@@QEAAXH@Z", nativetype_1.void_t, { this: inventory_1.ItemStackBase }, nativetype_1.int32_t);
inventory_1.ItemStackBase.prototype.addAmount = prochacker_1.procHacker.js("?add@ItemStackBase@@QEAAXH@Z", nativetype_1.void_t, { this: inventory_1.ItemStackBase }, nativetype_1.int32_t);
inventory_1.ItemStackBase.prototype.setAuxValue = prochacker_1.procHacker.js("?setAuxValue@ItemStackBase@@QEAAXF@Z", nativetype_1.void_t, { this: inventory_1.ItemStackBase }, nativetype_1.int16_t);
inventory_1.ItemStackBase.prototype.getAuxValue = prochacker_1.procHacker.js("?getAuxValue@ItemStackBase@@QEBAFXZ", nativetype_1.int16_t, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.isValidAuxValue = prochacker_1.procHacker.js("?isValidAuxValue@ItemStackBase@@QEBA_NH@Z", nativetype_1.bool_t, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.getMaxStackSize = prochacker_1.procHacker.js("?getMaxStackSize@ItemStackBase@@QEBAEXZ", nativetype_1.int32_t, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.getId = prochacker_1.procHacker.js("?getId@ItemStackBase@@QEBAFXZ", nativetype_1.int16_t, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.getRawNameId = prochacker_1.procHacker.js("?getRawNameId@ItemStackBase@@QEBA?AV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@XZ", nativetype_1.CxxString, { this: inventory_1.ItemStackBase, structureReturn: true });
inventory_1.ItemStackBase.prototype.getCustomName = prochacker_1.procHacker.js("?getName@ItemStackBase@@QEBA?AV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@XZ", nativetype_1.CxxString, {
    this: inventory_1.ItemStackBase,
    structureReturn: true,
});
inventory_1.ItemStackBase.prototype.setCustomName = prochacker_1.procHacker.js("?setCustomName@ItemStackBase@@QEAAXAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", nativetype_1.void_t, { this: inventory_1.ItemStackBase }, nativetype_1.CxxString);
inventory_1.ItemStackBase.prototype.getUserData = prochacker_1.procHacker.js("?getUserData@ItemStackBase@@QEAAPEAVCompoundTag@@XZ", nbt_1.CompoundTag, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.hasCustomName = prochacker_1.procHacker.js("?hasCustomHoverName@ItemStackBase@@QEBA_NXZ", nativetype_1.bool_t, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.isBlock = prochacker_1.procHacker.js("?isBlock@ItemStackBase@@QEBA_NXZ", nativetype_1.bool_t, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.isNull = prochacker_1.procHacker.js("?isNull@ItemStackBase@@QEBA_NXZ", nativetype_1.bool_t, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.setNull = prochacker_1.procHacker.js("?setNull@ItemStackBase@@UEAAXV?$optional@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@std@@@Z", nativetype_1.void_t, { this: inventory_1.ItemStackBase }, cxxoptional_1.CxxOptionalToUndefUnion.make(nativetype_1.CxxString));
inventory_1.ItemStackBase.prototype.getEnchantValue = prochacker_1.procHacker.js("?getEnchantValue@ItemStackBase@@QEBAHXZ", nativetype_1.int32_t, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.isEnchanted = prochacker_1.procHacker.js("?isEnchanted@ItemStackBase@@QEBA_NXZ", nativetype_1.bool_t, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.setDamageValue = prochacker_1.procHacker.js("?setDamageValue@ItemStackBase@@QEAAXF@Z", nativetype_1.void_t, { this: inventory_1.ItemStackBase }, nativetype_1.int16_t);
inventory_1.ItemStackBase.prototype.setItem = prochacker_1.procHacker.js("?_setItem@ItemStackBase@@IEAA_NH_N@Z", nativetype_1.bool_t, { this: inventory_1.ItemStackBase }, nativetype_1.int32_t);
inventory_1.ItemStackBase.prototype.startCoolDown = prochacker_1.procHacker.js("?startCoolDown@ItemStackBase@@QEBAXPEAVPlayer@@@Z", nativetype_1.void_t, { this: inventory_1.ItemStackBase }, player_1.ServerPlayer);
inventory_1.ItemStackBase.prototype.sameItem = prochacker_1.procHacker.js("?sameItem@ItemStackBase@@QEBA_NAEBV1@@Z", nativetype_1.bool_t, { this: inventory_1.ItemStackBase }, inventory_1.ItemStackBase);
inventory_1.ItemStackBase.prototype.sameItemAndAux = prochacker_1.procHacker.js("?sameItemAndAux@ItemStackBase@@QEBA_NAEBV1@@Z", nativetype_1.bool_t, { this: inventory_1.ItemStackBase }, inventory_1.ItemStackBase);
inventory_1.ItemStackBase.prototype.isStackedByData = prochacker_1.procHacker.js("?isStackedByData@ItemStackBase@@QEBA_NXZ", nativetype_1.bool_t, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.isStackable = prochacker_1.procHacker.js("?isStackable@ItemStackBase@@QEBA_NAEBV1@@Z", nativetype_1.bool_t, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.isPotionItem = prochacker_1.procHacker.js("?isPotionItem@ItemStackBase@@QEBA_NXZ", nativetype_1.bool_t, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.isPattern = prochacker_1.procHacker.js("?isPattern@ItemStackBase@@QEBA_NXZ", nativetype_1.bool_t, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.isLiquidClipItem = prochacker_1.procHacker.js("?isLiquidClipItem@ItemStackBase@@QEBA_NXZ", nativetype_1.bool_t, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.isHorseArmorItem = prochacker_1.procHacker.js("?isHorseArmorItem@ItemStackBase@@QEBA_NXZ", nativetype_1.bool_t, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.isGlint = prochacker_1.procHacker.js("?isGlint@ItemStackBase@@QEBA_NXZ", nativetype_1.bool_t, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.isFullStack = prochacker_1.procHacker.js("?isFullStack@ItemStackBase@@QEBA_NXZ", nativetype_1.bool_t, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.isFireResistant = prochacker_1.procHacker.js("?isFireResistant@ItemStackBase@@QEBA_NXZ", nativetype_1.bool_t, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.isExplodable = prochacker_1.procHacker.js("?isExplodable@ItemStackBase@@QEBA_NXZ", nativetype_1.bool_t, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.isDamaged = prochacker_1.procHacker.js("?isDamaged@ItemStackBase@@QEBA_NXZ", nativetype_1.bool_t, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.isDamageableItem = prochacker_1.procHacker.js("?isDamageableItem@ItemStackBase@@QEBA_NXZ", nativetype_1.bool_t, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.isArmorItem = prochacker_1.procHacker.js("?isArmorItem@ItemStackBase@@QEBA_NXZ", nativetype_1.bool_t, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.getComponentItem = prochacker_1.procHacker.js("?getComponentItem@ItemStackBase@@QEBAPEBVComponentItem@@XZ", inventory_1.ComponentItem, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.getMaxDamage = prochacker_1.procHacker.js("?getMaxDamage@ItemStackBase@@QEBAFXZ", nativetype_1.int32_t, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.getDamageValue = prochacker_1.procHacker.js("?getDamageValue@ItemStackBase@@QEBAFXZ", nativetype_1.int16_t, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.isWearableItem = prochacker_1.procHacker.js("?isWearableItem@ItemStackBase@@QEBA_NXZ", nativetype_1.bool_t, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.getAttackDamage = prochacker_1.procHacker.js("?getAttackDamage@ItemStackBase@@QEBAHXZ", nativetype_1.int32_t, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype.allocateAndSave = prochacker_1.procHacker.js("?save@ItemStackBase@@QEBA?AV?$unique_ptr@VCompoundTag@@U?$default_delete@VCompoundTag@@@std@@@std@@XZ", nbt_1.CompoundTag.ref(), { this: inventory_1.ItemStackBase, structureReturn: true });
inventory_1.ItemStackBase.prototype.isMusicDiscItem = function () {
    var _a;
    return ((_a = this.getItem()) === null || _a === void 0 ? void 0 : _a.isMusicDisk()) === true;
};
inventory_1.ItemStackBase.prototype._getItem = prochacker_1.procHacker.js("?getItem@ItemStackBase@@QEBAPEBVItem@@XZ", inventory_1.Item, { this: inventory_1.ItemStackBase });
inventory_1.ItemStackBase.prototype._setCustomLore = prochacker_1.procHacker.js("?setCustomLore@ItemStackBase@@QEAAXAEBV?$vector@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$allocator@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@2@@std@@@Z", nativetype_1.void_t, { this: inventory_1.ItemStackBase }, cxxvector_1.CxxVector.make(pointer_1.CxxStringWrapper));
const ItemStackBase$getCustomLore = prochacker_1.procHacker.js("?getCustomLore@ItemStackBase@@QEBA?AV?$vector@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$allocator@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@2@@std@@XZ", CxxVector$string, { this: inventory_1.ItemStackBase, structureReturn: true });
inventory_1.ItemStackBase.prototype.getCustomLore = function () {
    const lore = ItemStackBase$getCustomLore.call(this);
    const res = lore.toArray();
    lore.destruct();
    return res;
};
inventory_1.ItemStackBase.prototype.constructItemEnchantsFromUserData = prochacker_1.procHacker.js("?constructItemEnchantsFromUserData@ItemStackBase@@QEBA?AVItemEnchants@@XZ", enchants_1.ItemEnchants, { this: inventory_1.ItemStackBase, structureReturn: true });
inventory_1.ItemStackBase.prototype.saveEnchantsToUserData = prochacker_1.procHacker.js("?saveEnchantsToUserData@ItemStackBase@@QEAAXAEBVItemEnchants@@@Z", nativetype_1.void_t, { this: inventory_1.ItemStackBase }, enchants_1.ItemEnchants);
// ItemStackBase.prototype.getCategoryName = procHacker.js(
//     "?getCategoryName@ItemStackBase@@QEBA?AV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@XZ",
//     CxxString,
//     { this: ItemStackBase, structureReturn: true },
// );
inventory_1.ItemStackBase.prototype.canDestroySpecial = prochacker_1.procHacker.js("?canDestroySpecial@ItemStackBase@@QEBA_NAEBVBlock@@@Z", nativetype_1.bool_t, { this: inventory_1.ItemStackBase }, block_1.Block);
const ItemStackBase$hurtAndBreak = prochacker_1.procHacker.js("?hurtAndBreak@ItemStackBase@@QEAA_NHPEAVActor@@@Z", nativetype_1.bool_t, { this: inventory_1.ItemStackBase }, nativetype_1.int32_t, actor_1.Actor);
inventory_1.ItemStackBase.prototype.hurtAndBreak = function (count, actor = null) {
    return ItemStackBase$hurtAndBreak.call(this, count, actor);
};
const ItemStackBase$load = prochacker_1.procHacker.js("?load@ItemStackBase@@QEAAXAEBVCompoundTag@@@Z", nativetype_1.void_t, { this: inventory_1.ItemStackBase }, nbt_1.CompoundTag);
inventory_1.ItemStackBase.prototype.load = function (tag) {
    if (tag instanceof nbt_1.Tag) {
        ItemStackBase$load.call(this, tag);
    }
    else {
        const allocated = nbt_1.NBT.allocate(tag);
        ItemStackBase$load.call(this, allocated);
        allocated.dispose();
    }
};
const ItemStack$clone = prochacker_1.procHacker.js("?clone@ItemStack@@QEBA?AV1@XZ", nativetype_1.void_t, null, inventory_1.ItemStack, inventory_1.ItemStack);
inventory_1.ItemStack.prototype.clone = function (target = new inventory_1.ItemStack(true)) {
    ItemStack$clone(this, target);
    return target;
};
inventory_1.ItemStack.prototype.getDestroySpeed = prochacker_1.procHacker.js("?getDestroySpeed@ItemStack@@QEBAMAEBVBlock@@@Z", nativetype_1.float32_t, { this: inventory_1.ItemStack }, block_1.Block);
inventory_1.ItemStack.constructWith = function (itemName, amount = 1, data = 0) {
    return CommandUtils.createItemStack(itemName, amount, data);
};
inventory_1.ItemStack.fromDescriptor = prochacker_1.procHacker.js("?fromDescriptor@ItemStack@@SA?AV1@AEBVNetworkItemStackDescriptor@@AEAVBlockPalette@@_N@Z", inventory_1.ItemStack, { structureReturn: true }, inventory_1.NetworkItemStackDescriptor, level_1.BlockPalette, nativetype_1.bool_t);
inventory_1.NetworkItemStackDescriptor.constructWith = prochacker_1.procHacker.js("??0NetworkItemStackDescriptor@@QEAA@AEBVItemStack@@@Z", inventory_1.NetworkItemStackDescriptor, { structureReturn: true }, inventory_1.ItemStack);
inventory_1.NetworkItemStackDescriptor.prototype[nativetype_1.NativeType.ctor_move] = prochacker_1.procHacker.js("??0NetworkItemStackDescriptor@@QEAA@$$QEAV0@@Z", nativetype_1.void_t, { this: inventory_1.NetworkItemStackDescriptor }, inventory_1.NetworkItemStackDescriptor);
const ItemStack$fromTag = prochacker_1.procHacker.js("?fromTag@ItemStack@@SA?AV1@AEBVCompoundTag@@@Z", inventory_1.ItemStack, { structureReturn: true }, nbt_1.CompoundTag);
inventory_1.ItemStack.fromTag = function (tag) {
    if (tag instanceof nbt_1.Tag) {
        return ItemStack$fromTag(tag);
    }
    else {
        const allocated = nbt_1.NBT.allocate(tag);
        const res = ItemStack$fromTag(allocated);
        allocated.dispose();
        return res;
    }
};
inventory_1.ComponentItem.prototype.buildNetworkTag = prochacker_1.procHacker.jsv("??_7ComponentItem@@6B@", "?buildNetworkTag@ComponentItem@@UEBA?AV?$unique_ptr@VCompoundTag@@U?$default_delete@VCompoundTag@@@std@@@std@@XZ", nbt_1.CompoundTag.ref(), { this: inventory_1.ComponentItem, structureReturn: true });
inventory_1.ComponentItem.prototype.initializeFromNetwork = prochacker_1.procHacker.jsv("??_7ComponentItem@@6B@", "?initializeFromNetwork@ComponentItem@@UEAAXAEBVCompoundTag@@@Z", nativetype_1.void_t, { this: inventory_1.ComponentItem }, nbt_1.CompoundTag);
inventory_1.ComponentItem.prototype._getComponent = prochacker_1.procHacker.js("?getComponent@ComponentItem@@UEBAPEAVItemComponent@@AEBVHashedString@@@Z", item_component_1.ItemComponent, { this: inventory_1.ComponentItem }, hashedstring_1.HashedString);
inventory_1.Container.prototype.addItem = prochacker_1.procHacker.js("?addItem@Container@@UEAA_NAEAVItemStack@@@Z", nativetype_1.void_t, { this: inventory_1.Container }, inventory_1.ItemStack);
inventory_1.Container.prototype.addItemToFirstEmptySlot = prochacker_1.procHacker.js("?addItemToFirstEmptySlot@Container@@UEAA_NAEBVItemStack@@@Z", nativetype_1.bool_t, { this: inventory_1.Container }, inventory_1.ItemStack);
inventory_1.Container.prototype.getSlots = prochacker_1.procHacker.js("?getSlots@Container@@UEBA?BV?$vector@PEBVItemStack@@V?$allocator@PEBVItemStack@@@std@@@std@@XZ", cxxvector_1.CxxVector.make(inventory_1.ItemStack.ref()), { this: inventory_1.Container, structureReturn: true });
inventory_1.Container.prototype.getItem = prochacker_1.procHacker.jsv("??_7SimpleContainer@@6B@", "?getItem@SimpleContainer@@UEBAAEBVItemStack@@H@Z", inventory_1.ItemStack, { this: inventory_1.Container }, nativetype_1.uint8_t);
inventory_1.Container.prototype.getItemCount = prochacker_1.procHacker.js("?getItemCount@Container@@UEBAHAEBVItemStack@@@Z", nativetype_1.int32_t, { this: inventory_1.Container }, inventory_1.ItemStack);
inventory_1.Container.prototype.getContainerType = prochacker_1.procHacker.js("?getContainerType@Container@@QEBA?AW4ContainerType@@XZ", nativetype_1.uint8_t, { this: inventory_1.Container });
inventory_1.Container.prototype.hasRoomForItem = prochacker_1.procHacker.js("?hasRoomForItem@Container@@UEAA_NAEBVItemStack@@@Z", nativetype_1.bool_t, { this: inventory_1.Container }, inventory_1.ItemStack);
inventory_1.Container.prototype.isEmpty = prochacker_1.procHacker.js("?isEmpty@Container@@UEBA_NXZ", nativetype_1.bool_t, { this: inventory_1.Container });
inventory_1.Container.prototype.removeAllItems = prochacker_1.procHacker.js("?removeAllItems@Container@@UEAAXXZ", nativetype_1.void_t, { this: inventory_1.Container });
inventory_1.Container.prototype.removeItem = prochacker_1.procHacker.js("?removeItem@Container@@UEAAXHH@Z", nativetype_1.void_t, { this: inventory_1.Container }, nativetype_1.int32_t, nativetype_1.int32_t);
inventory_1.Container.prototype.setCustomName = prochacker_1.procHacker.js("?setCustomName@Container@@UEAAXAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", nativetype_1.void_t, { this: inventory_1.Container }, nativetype_1.CxxString);
inventory_1.FillingContainer.prototype.canAdd = prochacker_1.procHacker.jsv("??_7FillingContainer@@6B@", "?canAdd@FillingContainer@@UEBA_NAEBVItemStack@@@Z", nativetype_1.bool_t, { this: inventory_1.FillingContainer }, inventory_1.ItemStack);
inventory_1.Inventory.prototype.dropSlot = prochacker_1.procHacker.js("?dropSlot@Inventory@@QEAAXH_N00@Z", nativetype_1.void_t, { this: inventory_1.Inventory }, nativetype_1.int32_t, nativetype_1.bool_t, nativetype_1.bool_t, nativetype_1.bool_t);
inventory_1.PlayerInventory.prototype.getSlotWithItem = prochacker_1.procHacker.js("?getSlotWithItem@PlayerInventory@@QEBAHAEBVItemStack@@_N1@Z", nativetype_1.int32_t, { this: inventory_1.PlayerInventory }, inventory_1.ItemStack, nativetype_1.bool_t, nativetype_1.bool_t);
inventory_1.PlayerInventory.prototype.addItem = prochacker_1.procHacker.js("?add@PlayerInventory@@QEAA_NAEAVItemStack@@_N@Z", nativetype_1.bool_t, { this: inventory_1.PlayerInventory }, inventory_1.ItemStack, nativetype_1.bool_t);
inventory_1.PlayerInventory.prototype.clearSlot = prochacker_1.procHacker.js("?clearSlot@PlayerInventory@@QEAAXHW4ContainerID@@@Z", nativetype_1.void_t, { this: inventory_1.PlayerInventory }, nativetype_1.int32_t, nativetype_1.int32_t);
inventory_1.PlayerInventory.prototype.getContainerSize = prochacker_1.procHacker.js("?getContainerSize@PlayerInventory@@QEBAHW4ContainerID@@@Z", nativetype_1.int32_t, { this: inventory_1.PlayerInventory }, nativetype_1.int32_t);
inventory_1.PlayerInventory.prototype.getFirstEmptySlot = prochacker_1.procHacker.js("?getFirstEmptySlot@PlayerInventory@@QEBAHXZ", nativetype_1.int32_t, { this: inventory_1.PlayerInventory });
inventory_1.PlayerInventory.prototype.getHotbarSize = prochacker_1.procHacker.js("?getHotbarSize@PlayerInventory@@QEBAHXZ", nativetype_1.int32_t, { this: inventory_1.PlayerInventory });
inventory_1.PlayerInventory.prototype.getItem = prochacker_1.procHacker.js("?getItem@PlayerInventory@@QEBAAEBVItemStack@@HW4ContainerID@@@Z", inventory_1.ItemStack, { this: inventory_1.PlayerInventory }, nativetype_1.int32_t, nativetype_1.int32_t);
inventory_1.PlayerInventory.prototype.getSelectedItem = prochacker_1.procHacker.js("?getSelectedItem@PlayerInventory@@QEAAAEBVItemStack@@XZ", inventory_1.ItemStack, { this: inventory_1.PlayerInventory });
inventory_1.PlayerInventory.prototype.selectSlot = prochacker_1.procHacker.js("?selectSlot@PlayerInventory@@QEAA_NHW4ContainerID@@@Z", nativetype_1.void_t, { this: inventory_1.PlayerInventory }, nativetype_1.int32_t, nativetype_1.int32_t);
inventory_1.PlayerInventory.prototype.setItem = prochacker_1.procHacker.js("?setItem@PlayerInventory@@QEAAXHAEBVItemStack@@W4ContainerID@@_N@Z", nativetype_1.void_t, { this: inventory_1.PlayerInventory }, nativetype_1.int32_t, inventory_1.ItemStack, nativetype_1.int32_t, nativetype_1.bool_t);
inventory_1.PlayerInventory.prototype.setSelectedItem = prochacker_1.procHacker.js("?setSelectedItem@PlayerInventory@@QEAAXAEBVItemStack@@@Z", nativetype_1.void_t, { this: inventory_1.PlayerInventory }, inventory_1.ItemStack);
inventory_1.PlayerInventory.prototype.swapSlots = prochacker_1.procHacker.js("?swapSlots@PlayerInventory@@QEAAXHH@Z", nativetype_1.void_t, { this: inventory_1.PlayerInventory }, nativetype_1.int32_t, nativetype_1.int32_t);
const FillingContainer$removeResource = prochacker_1.procHacker.js("?removeResource@FillingContainer@@QEAAHAEBVItemStack@@_N1H@Z", nativetype_1.int32_t, null, inventory_1.FillingContainer, inventory_1.ItemStack, nativetype_1.bool_t, nativetype_1.bool_t, nativetype_1.int32_t);
inventory_1.PlayerInventory.prototype.removeResource = function (item, requireExactAux = true, requireExactData = false, maxCount) {
    const container = this.container;
    maxCount !== null && maxCount !== void 0 ? maxCount : (maxCount = container.getItemCount(item));
    return FillingContainer$removeResource(container, item, requireExactAux, requireExactData, maxCount);
};
inventory_1.PlayerInventory.prototype.canAdd = prochacker_1.procHacker.js("?canAdd@PlayerInventory@@QEBA_NAEBVItemStack@@@Z", nativetype_1.bool_t, { this: inventory_1.PlayerInventory }, inventory_1.ItemStack);
inventory_1.ItemDescriptor.prototype[nativetype_1.NativeType.ctor] = prochacker_1.procHacker.js("??0ItemDescriptor@@QEAA@XZ", nativetype_1.void_t, { this: inventory_1.ItemDescriptor });
inventory_1.ItemDescriptor.prototype[nativetype_1.NativeType.dtor] = prochacker_1.procHacker.js("??1ItemDescriptor@@UEAA@XZ", nativetype_1.void_t, { this: inventory_1.ItemDescriptor });
inventory_1.ItemDescriptor.prototype[nativetype_1.NativeType.ctor_copy] = prochacker_1.procHacker.js("??0ItemDescriptor@@QEAA@AEBV0@@Z", nativetype_1.void_t, { this: inventory_1.ItemDescriptor }, inventory_1.ItemDescriptor);
inventory_1.NetworkItemStackDescriptor.prototype[nativetype_1.NativeType.dtor] = prochacker_1.procHacker.js("??1NetworkItemStackDescriptor@@UEAA@XZ", nativetype_1.void_t, { this: inventory_1.NetworkItemStackDescriptor });
inventory_1.NetworkItemStackDescriptor.prototype[nativetype_1.NativeType.ctor_copy] = prochacker_1.procHacker.js("??0NetworkItemStackDescriptor@@QEAA@AEBVItemStackDescriptor@@@Z", nativetype_1.void_t, { this: inventory_1.NetworkItemStackDescriptor }, inventory_1.NetworkItemStackDescriptor);
inventory_1.InventoryTransaction.prototype.addItemToContent = prochacker_1.procHacker.js("?addItemToContent@InventoryTransaction@@AEAAXAEBVItemStack@@H@Z", nativetype_1.void_t, { this: inventory_1.InventoryTransaction }, inventory_1.ItemStack, nativetype_1.int32_t);
inventory_1.InventoryTransaction.prototype._getActions = prochacker_1.procHacker.js("?getActions@InventoryTransaction@@QEBAAEBV?$vector@VInventoryAction@@V?$allocator@VInventoryAction@@@std@@@std@@AEBVInventorySource@@@Z", cxxvector_1.CxxVector.make(inventory_1.InventoryAction), { this: inventory_1.InventoryTransaction }, inventory_1.InventorySource);
inventory_1.InventoryTransactionItemGroup.prototype.getItemStack = prochacker_1.procHacker.js("?getItemInstance@InventoryTransactionItemGroup@@QEBA?AVItemStack@@XZ", inventory_1.ItemStack, {
    this: inventory_1.InventoryTransaction,
    structureReturn: true,
});
// block.ts
var BlockTypeRegistry;
(function (BlockTypeRegistry) {
    BlockTypeRegistry.lookupByName = prochacker_1.procHacker.js("?lookupByName@BlockTypeRegistry@@SA?AV?$WeakPtr@VBlockLegacy@@@@AEBVHashedString@@_N@Z", sharedptr_1.WeakPtr.make(block_1.BlockLegacy), { structureReturn: true }, hashedstring_1.HashedString, nativetype_1.bool_t);
})(BlockTypeRegistry || (BlockTypeRegistry = {}));
block_1.BlockLegacy.prototype.getCommandNames = prochacker_1.procHacker.js("?getCommandNames@BlockLegacy@@QEBA?AV?$vector@UCommandName@@V?$allocator@UCommandName@@@std@@@std@@XZ", CxxVector$CxxStringWith8Bytes, { this: block_1.BlockLegacy, structureReturn: true });
block_1.BlockLegacy.prototype.getCommandNames2 = prochacker_1.procHacker.js("?getCommandNames@BlockLegacy@@QEBA?AV?$vector@UCommandName@@V?$allocator@UCommandName@@@std@@@std@@XZ", CxxVector$CommandName, { this: block_1.BlockLegacy, structureReturn: true });
block_1.BlockLegacy.prototype.getCreativeCategory = prochacker_1.procHacker.js("?getCreativeCategory@BlockLegacy@@QEBA?AW4CreativeItemCategory@@XZ", nativetype_1.int32_t, { this: block_1.BlockLegacy });
block_1.BlockLegacy.prototype.setDestroyTime = prochacker_1.procHacker.js("?setDestroyTime@BlockLegacy@@QEAAAEAV1@M@Z", nativetype_1.void_t, { this: block_1.BlockLegacy }, nativetype_1.float32_t);
block_1.BlockLegacy.prototype.getBlockEntityType = prochacker_1.procHacker.js("?getBlockEntityType@BlockLegacy@@QEBA?AW4BlockActorType@@XZ", nativetype_1.int32_t, { this: block_1.BlockLegacy });
block_1.BlockLegacy.prototype.getBlockItemId = prochacker_1.procHacker.js("?getBlockItemId@BlockLegacy@@QEBAFXZ", nativetype_1.int16_t, { this: block_1.BlockLegacy });
block_1.BlockLegacy.prototype.getStateFromLegacyData = prochacker_1.procHacker.js("?getStateFromLegacyData@BlockLegacy@@UEBAAEBVBlock@@G@Z", block_1.Block.ref(), { this: block_1.BlockLegacy }, nativetype_1.uint16_t);
block_1.BlockLegacy.prototype.getRenderBlock = prochacker_1.procHacker.js("?getRenderBlock@BlockLegacy@@UEBAAEBVBlock@@XZ", block_1.Block, { this: block_1.BlockLegacy });
block_1.BlockLegacy.prototype.getDefaultState = prochacker_1.procHacker.js("?getDefaultState@BlockLegacy@@QEBAAEBVBlock@@XZ", block_1.Block, { this: block_1.BlockLegacy });
block_1.BlockLegacy.prototype.tryGetStateFromLegacyData = prochacker_1.procHacker.js("?tryGetStateFromLegacyData@BlockLegacy@@QEBAPEBVBlock@@G_N@Z", block_1.Block, { this: block_1.BlockLegacy }, nativetype_1.uint16_t, nativetype_1.bool_t);
block_1.BlockLegacy.prototype.use = prochacker_1.procHacker.jsv("??_7JukeboxBlock@@6B@", "?use@JukeboxBlock@@UEBA_NAEAVPlayer@@AEBVBlockPos@@E@Z", nativetype_1.bool_t, { this: block_1.BlockLegacy }, player_1.Player, blockpos_1.BlockPos, nativetype_1.uint8_t);
block_1.BlockLegacy.prototype.getSilkTouchedItemInstance = prochacker_1.procHacker.js("?getSilkTouchItemInstance@BlockLegacy@@MEBA?AVItemInstance@@AEBVBlock@@@Z", inventory_1.ItemStack, { this: block_1.BlockLegacy, structureReturn: true }, block_1.Block);
block_1.Block.prototype._getName = prochacker_1.procHacker.js("?getName@Block@@QEBAAEBVHashedString@@XZ", hashedstring_1.HashedString, { this: block_1.Block });
block_1.Block.create = function (blockName, data = 0) {
    data |= 0;
    if (data < 0 || data > 0x7fff)
        data = 0;
    const blockNameHashed = hashedstring_1.HashedString.constructWith(blockName);
    const legacyptr = BlockTypeRegistry.lookupByName(blockNameHashed, false);
    blockNameHashed.destruct();
    const legacy = legacyptr.value();
    legacyptr.dispose(); // it does not delete `legacy` because it's WeakPtr
    if (legacy !== null) {
        if (legacy.getBlockItemId() < 0x100) {
            if (data === 0x7fff) {
                return legacy.getDefaultState();
            }
            else {
                return legacy.tryGetStateFromLegacyData(data);
            }
        }
        else {
            return legacy.tryGetStateFromLegacyData(data);
        }
    }
    return null;
};
block_1.Block.prototype.getDescriptionId = prochacker_1.procHacker.js("?getDescriptionId@Block@@QEBA?AV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@XZ", nativetype_1.CxxString, {
    this: block_1.Block,
    structureReturn: true,
});
block_1.Block.prototype.getRuntimeId = prochacker_1.procHacker.js("?getRuntimeId@Block@@QEBAAEBIXZ", nativetype_1.int32_t.ref(), { this: block_1.Block });
block_1.Block.prototype.getBlockEntityType = prochacker_1.procHacker.js("?getBlockEntityType@Block@@QEBA?AW4BlockActorType@@XZ", nativetype_1.int32_t, { this: block_1.Block });
block_1.Block.prototype.hasBlockEntity = prochacker_1.procHacker.js("?hasBlockEntity@Block@@QEBA_NXZ", nativetype_1.bool_t, { this: block_1.Block });
block_1.Block.prototype.use = prochacker_1.procHacker.js("?use@Block@@QEBA_NAEAVPlayer@@AEBVBlockPos@@EV?$optional@VVec3@@@std@@@Z", nativetype_1.bool_t, { this: block_1.Block }, player_1.Player, blockpos_1.BlockPos, nativetype_1.uint8_t);
block_1.Block.prototype.getVariant = prochacker_1.procHacker.js("?getVariant@Block@@QEBAHXZ", nativetype_1.int32_t, { this: block_1.Block });
block_1.Block.prototype.getSerializationId = prochacker_1.procHacker.js("?getSerializationId@Block@@QEBAAEBVCompoundTag@@XZ", nbt_1.CompoundTag.ref(), { this: block_1.Block });
block_1.Block.prototype.getSilkTouchItemInstance = prochacker_1.procHacker.jsv("??_7InfestedBlock@@6B@", "?getSilkTouchItemInstance@InfestedBlock@@MEBA?AVItemInstance@@AEBVBlock@@@Z", inventory_1.ItemStack, { this: block_1.Block, structureReturn: true });
block_1.Block.prototype.isUnbreakable = prochacker_1.procHacker.js("?isUnbreakable@Block@@QEBA_NXZ", nativetype_1.bool_t, { this: block_1.Block });
block_1.Block.prototype.buildDescriptionId = prochacker_1.procHacker.js("?buildDescriptionId@Block@@QEBA?AV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@XZ", nativetype_1.CxxString, {
    this: block_1.Block,
    structureReturn: true,
});
block_1.Block.prototype.isCropBlock = prochacker_1.procHacker.js("?isCropBlock@Block@@QEBA_NXZ", nativetype_1.bool_t, { this: block_1.Block });
block_1.Block.prototype.popResource = prochacker_1.procHacker.js("?popResource@Block@@QEBAPEAVItemActor@@AEAVBlockSource@@AEBVBlockPos@@AEBVItemInstance@@@Z", actor_1.ItemActor, { this: block_1.Block }, block_1.BlockSource, blockpos_1.BlockPos, inventory_1.ItemStack);
block_1.Block.prototype.canHurtAndBreakItem = prochacker_1.procHacker.js("?canHurtAndBreakItem@Block@@QEBA_NXZ", nativetype_1.bool_t, { this: block_1.Block });
block_1.Block.prototype.getThickness = prochacker_1.procHacker.js("?getThickness@Block@@QEBAMXZ", nativetype_1.float32_t, { this: block_1.Block });
block_1.Block.prototype.hasComparatorSignal = prochacker_1.procHacker.js("?hasComparatorSignal@Block@@QEBA_NXZ", nativetype_1.bool_t, { this: block_1.Block });
block_1.Block.prototype.getTranslucency = prochacker_1.procHacker.js("?getTranslucency@Block@@QEBAMXZ", nativetype_1.float32_t, { this: block_1.Block });
const Block$getExplosionResistance = prochacker_1.procHacker.js("?getExplosionResistance@Block@@QEBAMXZ", nativetype_1.float32_t, { this: block_1.Block }, actor_1.Actor);
block_1.Block.prototype.getExplosionResistance = function (actor = null) {
    return Block$getExplosionResistance.call(this, actor);
};
block_1.Block.prototype.getComparatorSignal = prochacker_1.procHacker.js("?getComparatorSignal@Block@@QEBAHAEAVBlockSource@@AEBVBlockPos@@E@Z", nativetype_1.int32_t, { this: block_1.Block }, block_1.BlockSource, blockpos_1.BlockPos, nativetype_1.uint8_t);
block_1.Block.prototype.getDirectSignal = prochacker_1.procHacker.js("?getDirectSignal@Block@@QEBAHAEAVBlockSource@@AEBVBlockPos@@H@Z", nativetype_1.int32_t, { this: block_1.Block }, block_1.BlockSource, blockpos_1.BlockPos, nativetype_1.int32_t);
block_1.Block.prototype.isSignalSource = prochacker_1.procHacker.js("?isSignalSource@Block@@QEBA_NXZ", nativetype_1.bool_t, { this: block_1.Block });
block_1.Block.prototype.getDestroySpeed = prochacker_1.procHacker.js("?getDestroySpeed@Block@@QEBAMXZ", nativetype_1.float32_t, { this: block_1.Block });
block_1.BlockSource.prototype._setBlock = prochacker_1.procHacker.js("?setBlock@BlockSource@@QEAA_NHHHAEBVBlock@@HPEAVActor@@@Z", nativetype_1.bool_t, { this: block_1.BlockSource }, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.int32_t, block_1.Block, nativetype_1.int32_t, actor_1.Actor);
block_1.BlockSource.prototype.getBlock = prochacker_1.procHacker.js("?getBlock@BlockSource@@UEBAAEBVBlock@@AEBVBlockPos@@@Z", block_1.Block, { this: block_1.BlockSource }, blockpos_1.BlockPos);
const UpdateBlockPacket$UpdateBlockPacket = prochacker_1.procHacker.js("??0UpdateBlockPacket@@QEAA@AEBVBlockPos@@IIE@Z", nativetype_1.void_t, null, packets_1.UpdateBlockPacket, blockpos_1.BlockPos, nativetype_1.uint32_t, nativetype_1.uint32_t, nativetype_1.uint8_t);
block_1.BlockSource.prototype.setBlock = function (blockPos, block) {
    if (block == null)
        throw Error("Block is null");
    const retval = this._setBlock(blockPos.x, blockPos.y, blockPos.z, block, 0, null);
    const pk = packets_1.UpdateBlockPacket.allocate();
    UpdateBlockPacket$UpdateBlockPacket(pk, blockPos, 0, block.getRuntimeId(), 3);
    for (const player of launcher_1.bedrockServer.serverInstance.getPlayers()) {
        player.sendNetworkPacket(pk);
    }
    pk.dispose();
    return retval;
};
block_1.BlockSource.prototype.getBlockEntity = prochacker_1.procHacker.js("?getBlockEntity@BlockSource@@QEAAPEAVBlockActor@@AEBVBlockPos@@@Z", block_1.BlockActor, { this: block_1.BlockSource }, blockpos_1.BlockPos);
block_1.BlockSource.prototype.removeBlockEntity = prochacker_1.procHacker.js("?removeBlockEntity@BlockSource@@QEAA?AV?$shared_ptr@VBlockActor@@@std@@AEBVBlockPos@@@Z", nativetype_1.void_t, { this: block_1.BlockSource }, blockpos_1.BlockPos);
block_1.BlockSource.prototype.getDimension = prochacker_1.procHacker.js("?getDimension@BlockSource@@UEAAAEAVDimension@@XZ", dimension_1.Dimension, { this: block_1.BlockSource });
block_1.BlockSource.prototype.getDimensionId = prochacker_1.procHacker.js("?getDimensionId@BlockSource@@UEBA?AV?$AutomaticID@VDimension@@H@@XZ", nativetype_1.int32_t, {
    this: block_1.BlockSource,
    structureReturn: true,
});
block_1.BlockSource.prototype.getBrightness = prochacker_1.procHacker.jsv("??_7BlockSource@@6B@", "?getBrightness@BlockSource@@UEBAMAEBVBlockPos@@@Z", nativetype_1.float32_t, { this: block_1.BlockSource }, blockpos_1.BlockPos);
const ChestBlockActor$vftable = symbols_1.proc["??_7ChestBlockActor@@6BRandomizableBlockActorContainerBase@@@"];
block_1.BlockActor.setResolver(ptr => {
    if (ptr === null)
        return null;
    const vftable = ptr.getPointer();
    if (vftable.equalsptr(ChestBlockActor$vftable)) {
        return ptr.as(block_1.ChestBlockActor);
    }
    return ptr.as(block_1.BlockActor);
});
const BlockActor$load = prochacker_1.procHacker.jsv("??_7BlockActor@@6B@", "?load@BlockActor@@UEAAXAEAVLevel@@AEBVCompoundTag@@AEAVDataLoadHelper@@@Z", nativetype_1.void_t, { this: block_1.BlockActor }, level_1.Level, nbt_1.CompoundTag, DefaultDataLoaderHelper);
const BlockActor$save = prochacker_1.procHacker.jsv("??_7BlockActor@@6B@", "?save@BlockActor@@UEBA_NAEAVCompoundTag@@@Z", nativetype_1.bool_t, { this: block_1.BlockActor }, nbt_1.CompoundTag);
block_1.BlockActor.prototype.save = function (tag) {
    if (tag != null) {
        return BlockActor$save.call(this, tag);
    }
    tag = nbt_1.CompoundTag.allocate();
    if (!BlockActor$save.call(this, tag))
        return null;
    const res = tag.value();
    tag.dispose();
    return res;
};
block_1.BlockActor.prototype.load = function (tag) {
    const level = launcher_1.bedrockServer.level;
    if (tag instanceof nbt_1.Tag) {
        BlockActor$load.call(this, level, tag, DefaultDataLoaderHelper.create());
    }
    else {
        const allocated = nbt_1.NBT.allocate(tag);
        BlockActor$load.call(this, level, allocated, DefaultDataLoaderHelper.create());
        allocated.dispose();
    }
};
block_1.BlockActor.prototype.setChanged = prochacker_1.procHacker.js("?setChanged@BlockActor@@QEAAXXZ", nativetype_1.void_t, { this: block_1.BlockActor });
block_1.BlockActor.prototype.setCustomName = prochacker_1.procHacker.js("?setCustomName@BlockActor@@UEAAXAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", nativetype_1.void_t, { this: block_1.BlockActor }, nativetype_1.CxxString);
block_1.BlockActor.prototype.getContainer = prochacker_1.procHacker.jsv("??_7ChestBlockActor@@6BRandomizableBlockActorContainerBase@@@", "?getContainer@ChestBlockActor@@UEBAPEBVContainer@@XZ", inventory_1.Container, { this: block_1.BlockActor });
block_1.BlockActor.prototype.getType = prochacker_1.procHacker.js("?getType@BlockActor@@QEBAAEBW4BlockActorType@@XZ", nativetype_1.int32_t.ref(), { this: block_1.BlockActor });
block_1.BlockActor.prototype.getPosition = prochacker_1.procHacker.js("?getPosition@BlockActor@@QEBAAEBVBlockPos@@XZ", blockpos_1.BlockPos, { this: block_1.BlockActor });
block_1.BlockActor.prototype.getServerUpdatePacket = prochacker_1.procHacker.js("?getServerUpdatePacket@BlockActor@@QEAA?AV?$unique_ptr@VBlockActorDataPacket@@U?$default_delete@VBlockActorDataPacket@@@std@@@std@@AEAVBlockSource@@@Z", packets_1.BlockActorDataPacket.ref(), { this: block_1.BlockActor, structureReturn: true }, block_1.BlockSource);
block_1.BlockActor.prototype.updateClientSide = function (player) {
    const pk = packets_1.BlockActorDataPacket.allocate();
    const nbtData = this.allocateAndSave();
    pk.pos.set(this.getPosition());
    pk.data.destruct();
    pk.data[nativetype_1.NativeType.ctor_move](nbtData);
    player.sendNetworkPacket(pk);
    nbtData.dispose();
    pk.dispose();
};
block_1.BlockActor.prototype.getCustomName = prochacker_1.procHacker.js("?getCustomName@BlockActor@@UEBAAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@XZ", nativetype_1.CxxString, {
    this: block_1.BlockActor,
});
block_1.ChestBlockActor.prototype.isLargeChest = prochacker_1.procHacker.js("?isLargeChest@ChestBlockActor@@QEBA_NXZ", nativetype_1.bool_t, { this: block_1.ChestBlockActor });
block_1.ChestBlockActor.prototype.openBy = prochacker_1.procHacker.js("?openBy@ChestBlockActor@@QEAAXAEAVPlayer@@@Z", nativetype_1.void_t, { this: block_1.ChestBlockActor }, player_1.Player);
block_1.ChestBlockActor.prototype.getPairedChestPosition = prochacker_1.procHacker.js("?getPairedChestPosition@ChestBlockActor@@QEAAAEBVBlockPos@@XZ", blockpos_1.BlockPos, {
    this: block_1.ChestBlockActor,
});
block_1.PistonBlockActor.prototype.getPosition = prochacker_1.procHacker.js("?getPosition@BlockActor@@QEBAAEBVBlockPos@@XZ", blockpos_1.BlockPos, { this: block_1.PistonBlockActor });
block_1.PistonBlockActor.prototype.getAttachedBlocks = prochacker_1.procHacker.js("?getAttachedBlocks@PistonBlockActor@@QEBAAEBV?$vector@VBlockPos@@V?$allocator@VBlockPos@@@std@@@std@@XZ", cxxvector_1.CxxVectorToArray.make(blockpos_1.BlockPos), { this: block_1.PistonBlockActor });
block_1.PistonBlockActor.prototype.getFacingDir = prochacker_1.procHacker.js("?getFacingDir@PistonBlockActor@@QEBAAEBVBlockPos@@AEBVIConstBlockSource@@@Z", blockpos_1.BlockPos, { this: block_1.PistonBlockActor }, block_1.BlockSource);
block_1.BlockSource.prototype.getChunk = prochacker_1.procHacker.js("?getChunk@BlockSource@@QEBAPEAVLevelChunk@@AEBVChunkPos@@@Z", chunk_1.LevelChunk, { this: block_1.BlockSource }, blockpos_1.ChunkPos);
block_1.BlockSource.prototype.getChunkAt = prochacker_1.procHacker.js("?getChunkAt@BlockSource@@UEBAPEAVLevelChunk@@AEBVBlockPos@@@Z", chunk_1.LevelChunk, { this: block_1.BlockSource }, blockpos_1.BlockPos);
block_1.BlockSource.prototype.getChunkSource = prochacker_1.procHacker.js("?getChunkSource@BlockSource@@UEAAAEAVChunkSource@@XZ", chunk_1.ChunkSource, { this: block_1.BlockSource });
block_1.BlockSource.prototype.checkBlockDestroyPermission = prochacker_1.procHacker.js("?checkBlockDestroyPermissions@BlockSource@@QEAA_NAEAVActor@@AEBVBlockPos@@AEBVItemStackBase@@_N@Z", nativetype_1.bool_t, { this: block_1.BlockSource }, actor_1.Actor, blockpos_1.BlockPos, inventory_1.ItemStackBase, nativetype_1.bool_t);
block_1.BlockUtils.isDownwardFlowingLiquid = prochacker_1.procHacker.js("?isDownwardFlowingLiquid@BlockUtils@@SA_NAEBVBlock@@@Z", nativetype_1.bool_t, null, block_1.Block);
block_1.BlockUtils.isBeehiveBlock = prochacker_1.procHacker.js("?isBeehiveBlock@BlockUtils@@SA_NAEBVBlockLegacy@@@Z", nativetype_1.bool_t, null, block_1.BlockLegacy);
block_1.BlockUtils.isWaterSource = prochacker_1.procHacker.js("?isWaterSource@BlockUtils@@SA_NAEBVBlock@@@Z", nativetype_1.bool_t, null, block_1.Block);
block_1.BlockUtils.isFullFlowingLiquid = prochacker_1.procHacker.js("?isFullFlowingLiquid@BlockUtils@@SA_NAEBVBlock@@@Z", nativetype_1.bool_t, null, block_1.Block);
block_1.BlockUtils.allowsNetherVegetation = prochacker_1.procHacker.js("?allowsNetherVegetation@BlockUtils@@SA_NAEBVBlockLegacy@@@Z", nativetype_1.bool_t, null, block_1.BlockLegacy);
block_1.BlockUtils.isThinFenceOrWallBlock = prochacker_1.procHacker.js("?isThinFenceOrWallBlock@BlockUtils@@SA_NAEBVBlock@@@Z", nativetype_1.bool_t, null, block_1.Block);
block_1.BlockUtils.isLiquidSource = prochacker_1.procHacker.js("?isLiquidSource@BlockUtils@@SA_NAEBVBlock@@@Z", nativetype_1.bool_t, null, block_1.Block);
block_1.BlockUtils.getLiquidBlockHeight = prochacker_1.procHacker.js("?getLiquidBlockHeight@BlockUtils@@SAMAEBVBlock@@AEBVBlockPos@@@Z", nativetype_1.float32_t, null, block_1.Block, blockpos_1.BlockPos);
block_1.BlockUtils.canGrowTreeWithBeehive = prochacker_1.procHacker.js("?canGrowTreeWithBeehive@BlockUtils@@SA_NAEBVBlock@@@Z", nativetype_1.bool_t, null, block_1.Block);
// abilties.ts
const Abilities$setAbilityBool = prochacker_1.procHacker.js("?setAbility@Abilities@@QEAAXW4AbilitiesIndex@@_N@Z", nativetype_1.void_t, { this: abilities_1.Abilities }, nativetype_1.uint16_t, nativetype_1.bool_t);
abilities_1.Abilities.prototype.setAbility = function (abilityIndex, value) {
    switch (typeof value) {
        case "boolean":
            Abilities$setAbilityBool.call(abilityIndex, value);
            break;
        case "number":
            this.getAbility(abilityIndex).setFloat(value);
            break;
    }
};
abilities_1.Abilities.prototype.getBool = prochacker_1.procHacker.js("?getBool@Abilities@@QEBA_NW4AbilitiesIndex@@@Z", nativetype_1.bool_t, { this: abilities_1.Abilities }, nativetype_1.uint16_t);
abilities_1.Abilities.prototype.getFloat = prochacker_1.procHacker.js("?getFloat@Abilities@@QEBAMW4AbilitiesIndex@@@Z", nativetype_1.float32_t, { this: abilities_1.Abilities }, nativetype_1.uint16_t);
abilities_1.Abilities.prototype.isFlying = function () {
    return this.getBool(abilities_1.AbilitiesIndex.Flying);
};
abilities_1.LayeredAbilities.prototype.getLayer = prochacker_1.procHacker.js("?getLayer@LayeredAbilities@@QEAAAEAVAbilities@@W4AbilitiesLayer@@@Z", abilities_1.Abilities, { this: abilities_1.LayeredAbilities }, nativetype_1.uint16_t);
abilities_1.LayeredAbilities.prototype.getCommandPermissions = prochacker_1.procHacker.js("?getCommandPermissions@LayeredAbilities@@QEBA?AW4CommandPermissionLevel@@XZ", nativetype_1.int32_t, {
    this: abilities_1.LayeredAbilities,
});
abilities_1.LayeredAbilities.prototype.getPlayerPermissions = prochacker_1.procHacker.js("?getPlayerPermissions@LayeredAbilities@@QEBA?AW4PlayerPermissionLevel@@XZ", nativetype_1.int32_t, {
    this: abilities_1.LayeredAbilities,
});
abilities_1.LayeredAbilities.prototype.setCommandPermissions = prochacker_1.procHacker.js("?setCommandPermissions@LayeredAbilities@@QEAAXW4CommandPermissionLevel@@@Z", nativetype_1.void_t, { this: abilities_1.LayeredAbilities }, nativetype_1.int32_t);
abilities_1.LayeredAbilities.prototype.setPlayerPermissions = prochacker_1.procHacker.js("?setPlayerPermissions@LayeredAbilities@@QEAAXW4PlayerPermissionLevel@@@Z", nativetype_1.void_t, { this: abilities_1.LayeredAbilities }, nativetype_1.int32_t);
abilities_1.LayeredAbilities.prototype.getCommandPermissionLevel = abilities_1.LayeredAbilities.prototype.getCommandPermissions;
abilities_1.LayeredAbilities.prototype.getPlayerPermissionLevel = abilities_1.LayeredAbilities.prototype.getPlayerPermissions;
abilities_1.LayeredAbilities.prototype.setCommandPermissionLevel = abilities_1.LayeredAbilities.prototype.setCommandPermissions;
abilities_1.LayeredAbilities.prototype.setPlayerPermissionLevel = abilities_1.LayeredAbilities.prototype.setPlayerPermissions;
const LayeredAbilities$getAbility = prochacker_1.procHacker.js("?getAbility@LayeredAbilities@@QEAAAEAVAbility@@W4AbilitiesLayer@@W4AbilitiesIndex@@@Z", abilities_1.Ability, { this: abilities_1.LayeredAbilities }, nativetype_1.uint16_t, nativetype_1.uint16_t);
const LayeredAbilities$getAbilityOnlyIndex = prochacker_1.procHacker.js("?getAbility@LayeredAbilities@@QEBAAEBVAbility@@W4AbilitiesIndex@@@Z", abilities_1.Ability, { this: abilities_1.LayeredAbilities }, nativetype_1.uint16_t);
abilities_1.LayeredAbilities.prototype.getAbility = function (abilityLayer, abilityIndex) {
    if (abilityIndex == null) {
        return LayeredAbilities$getAbilityOnlyIndex.call(this, abilityLayer);
    }
    else {
        return LayeredAbilities$getAbility.call(this, abilityLayer, abilityIndex);
    }
};
const LayeredAbilities$setAbilityFloat = prochacker_1.procHacker.js("?setAbility@LayeredAbilities@@QEAAXW4AbilitiesIndex@@M@Z", nativetype_1.void_t, { this: abilities_1.LayeredAbilities }, nativetype_1.uint16_t, nativetype_1.float32_t);
const LayeredAbilities$setAbilityBool = prochacker_1.procHacker.js("?setAbility@LayeredAbilities@@QEAAXW4AbilitiesIndex@@_N@Z", nativetype_1.void_t, { this: abilities_1.LayeredAbilities }, nativetype_1.uint16_t, nativetype_1.bool_t);
abilities_1.LayeredAbilities.prototype.setAbility = function (abilityIndex, value) {
    switch (typeof value) {
        case "boolean":
            LayeredAbilities$setAbilityBool.call(this, abilityIndex, value);
            break;
        case "number":
            LayeredAbilities$setAbilityFloat.call(this, abilityIndex, value);
            break;
    }
};
abilities_1.LayeredAbilities.prototype.getBool = prochacker_1.procHacker.js("?getBool@LayeredAbilities@@QEBA_NW4AbilitiesIndex@@@Z", nativetype_1.bool_t, { this: abilities_1.LayeredAbilities }, nativetype_1.uint16_t);
abilities_1.LayeredAbilities.prototype.getFloat = prochacker_1.procHacker.js("?getFloat@LayeredAbilities@@QEBAMW4AbilitiesIndex@@@Z", nativetype_1.float32_t, { this: abilities_1.LayeredAbilities }, nativetype_1.uint16_t);
abilities_1.LayeredAbilities.prototype.isFlying = function () {
    return this.getBool(abilities_1.AbilitiesIndex.Flying);
};
const Abilities$getAbilityName = prochacker_1.procHacker.js("?getAbilityName@Abilities@@SAPEBDW4AbilitiesIndex@@@Z", core_1.StaticPointer, null, nativetype_1.uint16_t);
abilities_1.Abilities.getAbilityName = function (abilityIndex) {
    const name = Abilities$getAbilityName(abilityIndex);
    return name.getString();
};
const Abilities$nameToAbilityIndex = prochacker_1.procHacker.js("?nameToAbilityIndex@Abilities@@SA?AW4AbilitiesIndex@@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", nativetype_1.int16_t, null, nativetype_1.CxxString); // Will return -1 if not found, so int16 instead of uint16
abilities_1.Abilities.nameToAbilityIndex = function (name) {
    return Abilities$nameToAbilityIndex(name.toLowerCase());
};
abilities_1.Ability.define({
    type: nativetype_1.uint8_t,
    value: abilities_1.Ability.Value,
    options: nativetype_1.uint8_t,
});
abilities_1.Ability.prototype.getBool = prochacker_1.procHacker.js("?getBool@Ability@@QEBA_NXZ", nativetype_1.bool_t, { this: abilities_1.Ability });
abilities_1.Ability.prototype.getFloat = prochacker_1.procHacker.js("?getFloat@Ability@@QEBAMXZ", nativetype_1.float32_t, { this: abilities_1.Ability });
abilities_1.Ability.prototype.setBool = prochacker_1.procHacker.js("?setBool@Ability@@QEAAX_N@Z", nativetype_1.void_t, { this: abilities_1.Ability }, nativetype_1.bool_t);
// gamerules.ts
const GameRules$getRule = prochacker_1.procHacker.js("?getRule@GameRules@@QEBAPEBVGameRule@@UGameRuleId@@@Z", gamerules_1.GameRule.ref(), { this: gamerules_1.GameRules }, WrappedInt32);
gamerules_1.GameRules.prototype.getRule = function (id) {
    return GameRules$getRule.call(this, WrappedInt32.create(id));
};
const GameRules$hasRule = prochacker_1.procHacker.js("?hasRule@GameRules@@QEBA_NUGameRuleId@@@Z", nativetype_1.bool_t, { this: gamerules_1.GameRules }, WrappedInt32);
gamerules_1.GameRules.prototype.hasRule = function (id) {
    return GameRules$hasRule.call(this, WrappedInt32.create(id));
};
gamerules_1.GameRules.prototype.nameToGameRuleIndex = prochacker_1.procHacker.js("?nameToGameRuleIndex@GameRules@@QEBA?AUGameRuleId@@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", nativetype_1.int32_t, { this: gamerules_1.GameRules, structureReturn: true }, nativetype_1.CxxString); // Will return -1 if not found, so int32 instead of uint32
gamerules_1.GameRules.nameToGameRuleIndex = function (name) {
    return launcher_1.bedrockServer.level.getGameRules().nameToGameRuleIndex(name);
};
gamerules_1.GameRule.abstract({
    shouldSave: nativetype_1.bool_t,
    type: nativetype_1.uint8_t,
    value: [gamerules_1.GameRule.Value, 0x04],
});
gamerules_1.GameRule.prototype.getBool = prochacker_1.procHacker.js("?getBool@GameRule@@QEBA_NXZ", nativetype_1.bool_t, { this: gamerules_1.GameRule });
gamerules_1.GameRule.prototype.getInt = prochacker_1.procHacker.js("?getInt@GameRule@@QEBAHXZ", nativetype_1.int32_t, { this: gamerules_1.GameRule });
gamerules_1.GameRule.prototype.getFloat = prochacker_1.procHacker.js("?getFloat@GameRule@@QEBAMXZ", nativetype_1.float32_t, { this: gamerules_1.GameRule });
// scoreboard.ts
scoreboard_1.Scoreboard.prototype.clearDisplayObjective = prochacker_1.procHacker.js("?clearDisplayObjective@ServerScoreboard@@UEAAPEAVObjective@@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", scoreboard_1.Objective, { this: scoreboard_1.Scoreboard }, nativetype_1.CxxString);
scoreboard_1.Scoreboard.prototype.setDisplayObjective = prochacker_1.procHacker.js("?setDisplayObjective@ServerScoreboard@@UEAAPEBVDisplayObjective@@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEBVObjective@@W4ObjectiveSortOrder@@@Z", scoreboard_1.DisplayObjective, { this: scoreboard_1.Scoreboard }, nativetype_1.CxxString, scoreboard_1.Objective, nativetype_1.uint8_t);
scoreboard_1.Scoreboard.prototype.addObjective = prochacker_1.procHacker.js("?addObjective@Scoreboard@@QEAAPEAVObjective@@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@0AEBVObjectiveCriteria@@@Z", scoreboard_1.Objective, { this: scoreboard_1.Scoreboard }, nativetype_1.CxxString, nativetype_1.CxxString, scoreboard_1.ObjectiveCriteria);
scoreboard_1.Scoreboard.prototype.createScoreboardId = prochacker_1.procHacker.js("?createScoreboardId@ServerScoreboard@@UEAAAEBUScoreboardId@@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", scoreboard_1.ScoreboardId, { this: scoreboard_1.Scoreboard }, nativetype_1.CxxString);
scoreboard_1.Scoreboard.prototype.getCriteria = prochacker_1.procHacker.js("?getCriteria@Scoreboard@@QEBAPEAVObjectiveCriteria@@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", scoreboard_1.ObjectiveCriteria, { this: scoreboard_1.Scoreboard }, nativetype_1.CxxString);
scoreboard_1.Scoreboard.prototype.getDisplayObjective = prochacker_1.procHacker.js("?getDisplayObjective@Scoreboard@@QEBAPEBVDisplayObjective@@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", scoreboard_1.DisplayObjective, { this: scoreboard_1.Scoreboard }, nativetype_1.CxxString);
scoreboard_1.Scoreboard.prototype.getObjective = prochacker_1.procHacker.js("?getObjective@Scoreboard@@QEBAPEAVObjective@@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", scoreboard_1.Objective, { this: scoreboard_1.Scoreboard }, nativetype_1.CxxString);
const Scoreboard$getObjectiveNames = prochacker_1.procHacker.js("?getObjectiveNames@Scoreboard@@QEBA?AV?$vector@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$allocator@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@2@@std@@XZ", CxxVector$string, { this: scoreboard_1.Scoreboard, structureReturn: true });
scoreboard_1.Scoreboard.prototype.getObjectiveNames = function () {
    const names = Scoreboard$getObjectiveNames.call(this);
    const res = names.toArray();
    names.destruct();
    return res;
};
const Scoreboard$getObjectives = prochacker_1.procHacker.js("?getObjectives@Scoreboard@@QEBA?AV?$vector@PEBVObjective@@V?$allocator@PEBVObjective@@@std@@@std@@XZ", cxxvector_1.CxxVector.make(scoreboard_1.Objective.ref()), { this: scoreboard_1.Scoreboard, structureReturn: true });
scoreboard_1.Scoreboard.prototype.getObjectives = function () {
    const objectives = Scoreboard$getObjectives.call(this);
    const res = objectives.toArray();
    objectives.destruct();
    return res;
};
scoreboard_1.Scoreboard.prototype.getActorScoreboardId = prochacker_1.procHacker.js("?getScoreboardId@Scoreboard@@QEBAAEBUScoreboardId@@AEBVActor@@@Z", scoreboard_1.ScoreboardId, { this: scoreboard_1.Scoreboard }, actor_1.Actor);
scoreboard_1.Scoreboard.prototype.getFakePlayerScoreboardId = prochacker_1.procHacker.js("?getScoreboardId@Scoreboard@@QEBAAEBUScoreboardId@@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", scoreboard_1.ScoreboardId, { this: scoreboard_1.Scoreboard }, nativetype_1.CxxString);
scoreboard_1.Scoreboard.prototype.getPlayerScoreboardId = prochacker_1.procHacker.js("?getScoreboardId@Scoreboard@@QEBAAEBUScoreboardId@@AEBVPlayer@@@Z", scoreboard_1.ScoreboardId, { this: scoreboard_1.Scoreboard }, player_1.Player);
scoreboard_1.Scoreboard.prototype.getScoreboardIdentityRef = prochacker_1.procHacker.js("?getScoreboardIdentityRef@Scoreboard@@QEAAPEAVScoreboardIdentityRef@@AEBUScoreboardId@@@Z", scoreboard_1.ScoreboardIdentityRef.ref(), { this: scoreboard_1.Scoreboard }, scoreboard_1.ScoreboardId);
scoreboard_1.Scoreboard.prototype._getScoreboardIdentityRefs = prochacker_1.procHacker.js("?getScoreboardIdentityRefs@Scoreboard@@QEBA?AV?$vector@VScoreboardIdentityRef@@V?$allocator@VScoreboardIdentityRef@@@std@@@std@@XZ", CxxVector$ScoreboardIdentityRef, { this: scoreboard_1.Scoreboard }, CxxVector$ScoreboardIdentityRef);
scoreboard_1.Scoreboard.prototype._getTrackedIds = prochacker_1.procHacker.js("?getTrackedIds@Scoreboard@@QEBA?AV?$vector@UScoreboardId@@V?$allocator@UScoreboardId@@@std@@@std@@XZ", CxxVector$ScoreboardId, { this: scoreboard_1.Scoreboard }, CxxVector$ScoreboardId);
scoreboard_1.Scoreboard.prototype.removeObjective = prochacker_1.procHacker.js("?removeObjective@Scoreboard@@QEAA_NPEAVObjective@@@Z", nativetype_1.bool_t, { this: scoreboard_1.Scoreboard }, scoreboard_1.Objective);
scoreboard_1.Scoreboard.prototype.resetPlayerScore = prochacker_1.procHacker.js("?resetPlayerScore@Scoreboard@@QEAAXAEBUScoreboardId@@AEAVObjective@@@Z", nativetype_1.void_t, { this: scoreboard_1.Scoreboard }, scoreboard_1.ScoreboardId, scoreboard_1.Objective);
scoreboard_1.Scoreboard.prototype.sync = prochacker_1.procHacker.js("?onScoreChanged@ServerScoreboard@@UEAAXAEBUScoreboardId@@AEBVObjective@@@Z", nativetype_1.void_t, { this: scoreboard_1.Scoreboard }, scoreboard_1.ScoreboardId, scoreboard_1.Objective);
const Objective$getPlayers = prochacker_1.procHacker.js("?getPlayers@Objective@@QEBA?AV?$vector@UScoreboardId@@V?$allocator@UScoreboardId@@@std@@@std@@XZ", CxxVector$ScoreboardId, { this: scoreboard_1.Objective, structureReturn: true });
scoreboard_1.Objective.prototype.getPlayers = function () {
    const ids = Objective$getPlayers.call(this);
    const res = ids.toArray();
    ids.destruct();
    return res;
};
scoreboard_1.Objective.prototype.getPlayerScore = prochacker_1.procHacker.js("?getPlayerScore@Objective@@QEBA?AUScoreInfo@@AEBUScoreboardId@@@Z", scoreboard_1.ScoreInfo, { this: scoreboard_1.Objective, structureReturn: true }, scoreboard_1.ScoreboardId);
scoreboard_1.Objective.prototype.getName = prochacker_1.procHacker.js("?getName@Objective@@QEBAAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@XZ", nativetype_1.CxxString, {
    this: scoreboard_1.Objective,
});
scoreboard_1.Objective.prototype.getDisplayName = prochacker_1.procHacker.js("?getDisplayName@Objective@@QEBAAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@XZ", nativetype_1.CxxString, {
    this: scoreboard_1.Objective,
});
scoreboard_1.IdentityDefinition.prototype.getEntityId = prochacker_1.procHacker.js("?getEntityId@IdentityDefinition@@QEBAAEBUActorUniqueID@@XZ", actor_1.ActorUniqueID.ref(), {
    this: scoreboard_1.IdentityDefinition,
});
scoreboard_1.IdentityDefinition.prototype.getPlayerId = prochacker_1.procHacker.js("?getPlayerId@IdentityDefinition@@QEBAAEBUPlayerScoreboardId@@XZ", actor_1.ActorUniqueID.ref(), {
    this: scoreboard_1.IdentityDefinition,
});
scoreboard_1.IdentityDefinition.prototype.getFakePlayerName = prochacker_1.procHacker.js("?getFakePlayerName@IdentityDefinition@@QEBAAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@XZ", nativetype_1.CxxString, { this: scoreboard_1.IdentityDefinition });
scoreboard_1.IdentityDefinition.prototype.getIdentityType = prochacker_1.procHacker.js("?getIdentityType@IdentityDefinition@@QEBA?AW4Type@1@XZ", nativetype_1.uint8_t, { this: scoreboard_1.IdentityDefinition });
scoreboard_1.ScoreboardId.prototype.isValid = prochacker_1.procHacker.js("?isValid@ScoreboardId@@QEBA_NXZ", nativetype_1.bool_t, { this: scoreboard_1.ScoreboardId });
scoreboard_1.ScoreboardIdentityRef.prototype._modifyScoreInObjective = prochacker_1.procHacker.js("?modifyScoreInObjective@ScoreboardIdentityRef@@QEAA_NAEAHAEAVObjective@@HW4PlayerScoreSetFunction@@@Z", nativetype_1.bool_t, { this: scoreboard_1.ScoreboardIdentityRef }, core_1.StaticPointer, scoreboard_1.Objective, nativetype_1.int32_t, nativetype_1.uint8_t);
scoreboard_1.ScoreboardIdentityRef.prototype.getIdentityType = prochacker_1.procHacker.js("?getIdentityType@ScoreboardIdentityRef@@QEBA?AW4Type@IdentityDefinition@@XZ", nativetype_1.uint8_t, {
    this: scoreboard_1.ScoreboardIdentityRef,
});
scoreboard_1.ScoreboardIdentityRef.prototype.getEntityId = prochacker_1.procHacker.js("?getEntityId@ScoreboardIdentityRef@@QEBAAEBUActorUniqueID@@XZ", actor_1.ActorUniqueID.ref(), {
    this: scoreboard_1.ScoreboardIdentityRef,
});
scoreboard_1.ScoreboardIdentityRef.prototype.getPlayerId = prochacker_1.procHacker.js("?getPlayerId@ScoreboardIdentityRef@@QEBAAEBUPlayerScoreboardId@@XZ", actor_1.ActorUniqueID.ref(), {
    this: scoreboard_1.ScoreboardIdentityRef,
});
scoreboard_1.ScoreboardIdentityRef.prototype.getScoreboardId = prochacker_1.procHacker.js("?getScoreboardId@ScoreboardIdentityRef@@QEBAAEBUScoreboardId@@XZ", scoreboard_1.ScoreboardId, {
    this: scoreboard_1.ScoreboardIdentityRef,
});
scoreboard_1.ScoreboardIdentityRef.prototype.isPlayerType = prochacker_1.procHacker.js("?isPlayerType@ScoreboardIdentityRef@@QEBA_NXZ", nativetype_1.bool_t, { this: scoreboard_1.ScoreboardIdentityRef });
// effects.ts
effects_1.MobEffect.create = prochacker_1.procHacker.js("?getById@MobEffect@@SAPEAV1@I@Z", effects_1.MobEffect, null, nativetype_1.int32_t);
effects_1.MobEffect.prototype.getId = prochacker_1.procHacker.js("?getId@MobEffect@@QEBAIXZ", nativetype_1.uint32_t, { this: effects_1.MobEffect });
effects_1.MobEffectInstance.prototype._create = prochacker_1.procHacker.js("??0MobEffectInstance@@QEAA@IHH_N00@Z", nativetype_1.void_t, { this: effects_1.MobEffectInstance }, nativetype_1.uint32_t, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.bool_t, nativetype_1.bool_t, nativetype_1.bool_t);
effects_1.MobEffectInstance.prototype._getComponentName = prochacker_1.procHacker.js("?getComponentName@MobEffectInstance@@QEBAAEBVHashedString@@XZ", hashedstring_1.HashedString, {
    this: effects_1.MobEffectInstance,
});
effects_1.MobEffectInstance.prototype.getAmplifier = prochacker_1.procHacker.js("?getAmplifier@MobEffectInstance@@QEBAHXZ", nativetype_1.int32_t, { this: effects_1.MobEffectInstance });
effects_1.MobEffectInstance.prototype.allocateAndSave = prochacker_1.procHacker.js("?save@MobEffectInstance@@QEBA?AV?$unique_ptr@VCompoundTag@@U?$default_delete@VCompoundTag@@@std@@@std@@XZ", nbt_1.CompoundTag.ref(), { this: effects_1.MobEffectInstance, structureReturn: true });
const MobEffectInstance$load = prochacker_1.procHacker.js("?load@MobEffectInstance@@SA?AV1@AEBVCompoundTag@@@Z", nativetype_1.void_t, null, effects_1.MobEffectInstance, nbt_1.CompoundTag);
effects_1.MobEffectInstance.prototype.load = function (tag) {
    if (tag instanceof nbt_1.Tag) {
        MobEffectInstance$load(this, tag);
    }
    else {
        const allocated = nbt_1.NBT.allocate(tag);
        MobEffectInstance$load(this, allocated);
        allocated.dispose();
    }
};
effects_1.MobEffectInstance.load = function (tag) {
    const inst = new effects_1.MobEffectInstance(true);
    inst.load(tag);
    return inst;
};
// enchants.ts
enchants_1.EnchantUtils.applyEnchant = prochacker_1.procHacker.js("?applyEnchant@EnchantUtils@@SA_NAEAVItemStackBase@@W4Type@Enchant@@H_N@Z", nativetype_1.bool_t, null, inventory_1.ItemStack, nativetype_1.int16_t, nativetype_1.int32_t, nativetype_1.bool_t);
enchants_1.EnchantUtils.getEnchantLevel = prochacker_1.procHacker.js("?getEnchantLevel@EnchantUtils@@SAHW4Type@Enchant@@AEBVItemStackBase@@@Z", nativetype_1.int32_t, null, nativetype_1.uint8_t, inventory_1.ItemStack);
enchants_1.EnchantUtils.hasCurse = prochacker_1.procHacker.js("?hasCurse@EnchantUtils@@SA_NAEBVItemStackBase@@@Z", nativetype_1.bool_t, null, inventory_1.ItemStack);
enchants_1.EnchantUtils.hasEnchant = prochacker_1.procHacker.js("?hasEnchant@EnchantUtils@@SA_NW4Type@Enchant@@AEBVItemStackBase@@@Z", nativetype_1.bool_t, null, nativetype_1.int16_t, inventory_1.ItemStack);
// nbt.ts
const tagTypes = [
    nbt_1.EndTag,
    nbt_1.ByteTag,
    nbt_1.ShortTag,
    nbt_1.IntTag,
    nbt_1.Int64Tag,
    nbt_1.FloatTag,
    nbt_1.DoubleTag,
    nbt_1.ByteArrayTag,
    nbt_1.StringTag,
    nbt_1.ListTag,
    nbt_1.CompoundTag,
    nbt_1.IntArrayTag,
];
nbt_1.Tag.setResolver(ptr => {
    if (ptr === null)
        return null;
    const typeId = nbt_1.Tag.prototype.getId.call(ptr);
    const type = tagTypes[typeId];
    if (type == null) {
        throw Error(`Invalid Tag.getId(): ${typeId}`);
    }
    return ptr.as(type);
});
nbt_1.Tag.prototype.toString = prochacker_1.procHacker.jsv("??_7CompoundTag@@6B@", "?toString@CompoundTag@@UEBA?AV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@XZ", nativetype_1.CxxString, { this: nbt_1.Tag, structureReturn: true });
nbt_1.Tag.prototype.getId = prochacker_1.procHacker.jsv("??_7CompoundTag@@6B@", "?getId@CompoundTag@@UEBA?AW4Type@Tag@@XZ", nativetype_1.uint8_t, { this: nbt_1.Tag });
nbt_1.Tag.prototype.equals = prochacker_1.procHacker.jsv("??_7CompoundTag@@6B@", "?equals@CompoundTag@@UEBA_NAEBVTag@@@Z", nativetype_1.bool_t, { this: nbt_1.Tag }, nbt_1.Tag);
const EndTag$vftable = symbols_1.proc["??_7EndTag@@6B@"];
const ByteTag$vftable = symbols_1.proc["??_7ByteTag@@6B@"];
const ShortTag$vftable = symbols_1.proc["??_7ShortTag@@6B@"];
const IntTag$vftable = symbols_1.proc["??_7IntTag@@6B@"];
const Int64Tag$vftable = symbols_1.proc["??_7Int64Tag@@6B@"];
const FloatTag$vftable = symbols_1.proc["??_7FloatTag@@6B@"];
const DoubleTag$vftable = symbols_1.proc["??_7DoubleTag@@6B@"];
const ByteArrayTag$vftable = symbols_1.proc["??_7ByteArrayTag@@6B@"];
const StringTag$vftable = symbols_1.proc["??_7StringTag@@6B@"];
nbt_1.EndTag.prototype[nativetype_1.NativeType.ctor] = function () {
    this.vftable = EndTag$vftable;
};
nbt_1.ByteTag.prototype[nativetype_1.NativeType.ctor] = function () {
    this.vftable = ByteTag$vftable;
};
nbt_1.ShortTag.prototype[nativetype_1.NativeType.ctor] = function () {
    this.vftable = ShortTag$vftable;
};
nbt_1.IntTag.prototype[nativetype_1.NativeType.ctor] = function () {
    this.vftable = IntTag$vftable;
};
nbt_1.Int64Tag.prototype[nativetype_1.NativeType.ctor] = function () {
    this.vftable = Int64Tag$vftable;
};
nbt_1.FloatTag.prototype[nativetype_1.NativeType.ctor] = function () {
    this.vftable = FloatTag$vftable;
};
nbt_1.DoubleTag.prototype[nativetype_1.NativeType.ctor] = function () {
    this.vftable = DoubleTag$vftable;
};
nbt_1.ByteArrayTag.prototype[nativetype_1.NativeType.ctor] = function () {
    this.vftable = ByteArrayTag$vftable;
    this.data.construct();
};
const ByteArrayTag$ByteArrayTag = prochacker_1.procHacker.js("??0ByteArrayTag@@QEAA@UTagMemoryChunk@@@Z", nativetype_1.void_t, null, nbt_1.ByteArrayTag, nbt_1.TagMemoryChunk);
nbt_1.ByteArrayTag.prototype.constructWith = function (data) {
    const chunk = nbt_1.TagMemoryChunk.construct();
    chunk.set(data);
    ByteArrayTag$ByteArrayTag(this, chunk); // it will destruct the chunk.
};
const StringTagDataOffset = nbt_1.StringTag.offsetOf("data");
nbt_1.StringTag.prototype[nativetype_1.NativeType.ctor] = function () {
    this.vftable = StringTag$vftable;
    nativetype_1.CxxString[nativetype_1.NativeType.ctor](this.add(StringTagDataOffset));
};
nbt_1.ListTag.prototype[nativetype_1.NativeType.ctor] = prochacker_1.procHacker.js("??0ListTag@@QEAA@XZ", nativetype_1.void_t, { this: nbt_1.ListTag });
nbt_1.ListTag.prototype[nativetype_1.NativeType.dtor] = prochacker_1.procHacker.js("??1ListTag@@UEAA@XZ", nativetype_1.void_t, { this: nbt_1.ListTag });
const ListTag$add = prochacker_1.procHacker.js("?add@ListTag@@QEAAXV?$unique_ptr@VTag@@U?$default_delete@VTag@@@std@@@std@@@Z", nativetype_1.void_t, null, nbt_1.ListTag, nbt_1.TagPointer);
nbt_1.ListTag.prototype.pushAllocated = function (tag) {
    ListTag$add(this, nbt_1.TagPointer.create(tag));
};
nbt_1.ListTag.prototype.size = prochacker_1.procHacker.js("?size@ListTag@@QEBAHXZ", nativetype_1.int64_as_float_t, { this: nbt_1.ListTag });
nbt_1.CompoundTag.prototype[nativetype_1.NativeType.ctor] = prochacker_1.procHacker.js("??0CompoundTag@@QEAA@XZ", nativetype_1.void_t, { this: nbt_1.CompoundTag });
nbt_1.CompoundTag.prototype[nativetype_1.NativeType.dtor] = prochacker_1.procHacker.js("??1CompoundTag@@UEAA@XZ", nativetype_1.void_t, { this: nbt_1.CompoundTag });
nbt_1.CompoundTag.prototype[nativetype_1.NativeType.ctor_move] = prochacker_1.procHacker.js("??0CompoundTag@@QEAA@$$QEAV0@@Z", nativetype_1.void_t, { this: nbt_1.CompoundTag }, nbt_1.CompoundTag);
nbt_1.CompoundTag.prototype.get = prochacker_1.procHacker.js("?get@CompoundTag@@QEAAPEAVTag@@V?$basic_string_view@DU?$char_traits@D@std@@@std@@@Z", nbt_1.Tag, { this: nbt_1.CompoundTag }, nativetype_1.CxxStringView);
const CompoundTag$put = prochacker_1.procHacker.js("?put@CompoundTag@@QEAAPEAVTag@@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$unique_ptr@VTag@@U?$default_delete@VTag@@@std@@@4@@Z", nativetype_1.void_t, null, nbt_1.CompoundTag, pointer_1.CxxStringWrapper, nbt_1.TagPointer);
nbt_1.CompoundTag.prototype.setAllocated = function (key, value) {
    CompoundTag$put(this, pointer_1.CxxStringWrapper.constructWith(key), nbt_1.TagPointer.create(value)); // `key` and `value` will be moved into the CompoundTag. no need to destruct them
};
nbt_1.CompoundTag.prototype.delete = prochacker_1.procHacker.js("?remove@CompoundTag@@QEAA_NV?$basic_string_view@DU?$char_traits@D@std@@@std@@@Z", nativetype_1.bool_t, { this: nbt_1.CompoundTag }, nativetype_1.CxxStringView);
nbt_1.CompoundTag.prototype.has = prochacker_1.procHacker.js("?contains@CompoundTag@@QEBA_NV?$basic_string_view@DU?$char_traits@D@std@@@std@@@Z", nativetype_1.bool_t, { this: nbt_1.CompoundTag }, nativetype_1.CxxStringView);
nbt_1.CompoundTag.prototype.clear = prochacker_1.procHacker.js("?clear@CompoundTag@@QEAAXXZ", nativetype_1.void_t, { this: nbt_1.CompoundTag });
nbt_1.CompoundTagVariant.prototype[nativetype_1.NativeType.ctor] = function () {
    // init as a EndTag
    const ptr = this;
    ptr.setPointer(EndTag$vftable, 0); // set the value as a EndTag
    ptr.setUint8(0, 0x28); // the type index of the std::variant<...>, 0 is the EndTag
};
nbt_1.CompoundTagVariant.prototype[nativetype_1.NativeType.dtor] = prochacker_1.procHacker.js("??1CompoundTagVariant@@QEAA@XZ", nativetype_1.void_t, { this: nbt_1.CompoundTagVariant });
nbt_1.CompoundTagVariant.prototype.emplace = prochacker_1.procHacker.js("?emplace@CompoundTagVariant@@QEAAAEAVTag@@$$QEAV2@@Z", nativetype_1.void_t, { this: nbt_1.CompoundTagVariant }, nbt_1.Tag);
// structure.ts
structure_1.StructureSettings.prototype[nativetype_1.NativeType.ctor] = prochacker_1.procHacker.js("??0StructureSettings@@QEAA@XZ", nativetype_1.void_t, { this: structure_1.StructureSettings });
structure_1.StructureSettings.constructWith = function (size, ignoreEntities = false, ignoreBlocks = false) {
    const settings = structure_1.StructureSettings.construct();
    settings.setStructureSize(size);
    settings.setStructureOffset(blockpos_1.BlockPos.create(0, 0, 0));
    settings.setIgnoreEntities(ignoreEntities);
    settings.setIgnoreBlocks(ignoreBlocks);
    return settings;
};
structure_1.StructureSettings.prototype[nativetype_1.NativeType.dtor] = prochacker_1.procHacker.js("??1StructureSettings@@QEAA@XZ", nativetype_1.void_t, { this: structure_1.StructureSettings });
structure_1.StructureSettings.prototype.getIgnoreBlocks = prochacker_1.procHacker.js("?getIgnoreBlocks@StructureSettings@@QEBA_NXZ", nativetype_1.bool_t, { this: structure_1.StructureSettings });
structure_1.StructureSettings.prototype.getIgnoreEntities = prochacker_1.procHacker.js("?getIgnoreEntities@StructureSettings@@QEBA_NXZ", nativetype_1.bool_t, { this: structure_1.StructureSettings });
structure_1.StructureSettings.prototype.isAnimated = prochacker_1.procHacker.js("?isAnimated@StructureSettings@@QEBA_NXZ", nativetype_1.bool_t, { this: structure_1.StructureSettings });
structure_1.StructureSettings.prototype.getStructureOffset = prochacker_1.procHacker.js("?getStructureOffset@StructureSettings@@QEBAAEBVBlockPos@@XZ", blockpos_1.BlockPos, { this: structure_1.StructureSettings });
structure_1.StructureSettings.prototype.getStructureSize = prochacker_1.procHacker.js("?getStructureSize@StructureSettings@@QEBAAEBVBlockPos@@XZ", blockpos_1.BlockPos, { this: structure_1.StructureSettings });
structure_1.StructureSettings.prototype.getPivot = prochacker_1.procHacker.js("?getPivot@StructureSettings@@QEBAAEBVVec3@@XZ", blockpos_1.Vec3, { this: structure_1.StructureSettings });
structure_1.StructureSettings.prototype.getAnimationMode = prochacker_1.procHacker.js("?getAnimationMode@StructureSettings@@QEBA?AW4AnimationMode@@XZ", nativetype_1.uint8_t, { this: structure_1.StructureSettings });
structure_1.StructureSettings.prototype.getMirror = prochacker_1.procHacker.js("?getMirror@StructureSettings@@QEBA?AW4Mirror@@XZ", nativetype_1.uint32_t, { this: structure_1.StructureSettings });
structure_1.StructureSettings.prototype.getRotation = prochacker_1.procHacker.js("?getRotation@StructureSettings@@QEBA?AW4Rotation@@XZ", nativetype_1.uint32_t, { this: structure_1.StructureSettings });
structure_1.StructureSettings.prototype.getAnimationSeconds = prochacker_1.procHacker.js("?getAnimationSeconds@StructureSettings@@QEBAMXZ", nativetype_1.float32_t, { this: structure_1.StructureSettings });
structure_1.StructureSettings.prototype.getIntegrityValue = prochacker_1.procHacker.js("?getIntegrityValue@StructureSettings@@QEBAMXZ", nativetype_1.float32_t, { this: structure_1.StructureSettings });
structure_1.StructureSettings.prototype.getAnimationTicks = prochacker_1.procHacker.js("?getAnimationTicks@StructureSettings@@QEBAIXZ", nativetype_1.uint32_t, { this: structure_1.StructureSettings });
structure_1.StructureSettings.prototype.getIntegritySeed = prochacker_1.procHacker.js("?getIntegritySeed@StructureSettings@@QEBAIXZ", nativetype_1.float32_t, { this: structure_1.StructureSettings });
structure_1.StructureSettings.prototype.setAnimationMode = prochacker_1.procHacker.js("?setAnimationMode@StructureSettings@@QEAAXW4AnimationMode@@@Z", nativetype_1.void_t, { this: structure_1.StructureSettings }, nativetype_1.uint8_t);
structure_1.StructureSettings.prototype.setAnimationSeconds = prochacker_1.procHacker.js("?setAnimationSeconds@StructureSettings@@QEAAXM@Z", nativetype_1.void_t, { this: structure_1.StructureSettings }, nativetype_1.float32_t);
structure_1.StructureSettings.prototype.setIgnoreBlocks = prochacker_1.procHacker.js("?setIgnoreBlocks@StructureSettings@@QEAAX_N@Z", nativetype_1.void_t, { this: structure_1.StructureSettings }, nativetype_1.bool_t);
structure_1.StructureSettings.prototype.setIgnoreEntities = prochacker_1.procHacker.js("?setIgnoreEntities@StructureSettings@@QEAAX_N@Z", nativetype_1.void_t, { this: structure_1.StructureSettings }, nativetype_1.bool_t);
structure_1.StructureSettings.prototype.setIgnoreJigsawBlocks = prochacker_1.procHacker.js("?setIgnoreJigsawBlocks@StructureSettings@@QEAAX_N@Z", nativetype_1.void_t, { this: structure_1.StructureSettings }, nativetype_1.bool_t);
structure_1.StructureSettings.prototype.setIntegritySeed = prochacker_1.procHacker.js("?setIntegritySeed@StructureSettings@@QEAAXI@Z", nativetype_1.void_t, { this: structure_1.StructureSettings }, nativetype_1.float32_t);
structure_1.StructureSettings.prototype.setIntegrityValue = prochacker_1.procHacker.js("?setIntegrityValue@StructureSettings@@QEAAXM@Z", nativetype_1.void_t, { this: structure_1.StructureSettings }, nativetype_1.float32_t);
structure_1.StructureSettings.prototype.setMirror = prochacker_1.procHacker.js("?setMirror@StructureSettings@@QEAAXW4Mirror@@@Z", nativetype_1.void_t, { this: structure_1.StructureSettings }, nativetype_1.uint8_t);
structure_1.StructureSettings.prototype.setPaletteName = prochacker_1.procHacker.js("?setPaletteName@StructureSettings@@QEAAXV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", nativetype_1.void_t, { this: structure_1.StructureSettings }, nativetype_1.CxxString);
structure_1.StructureSettings.prototype.setPivot = prochacker_1.procHacker.js("?setPivot@StructureSettings@@QEAAXAEBVVec3@@@Z", nativetype_1.void_t, { this: structure_1.StructureSettings }, blockpos_1.Vec3);
structure_1.StructureSettings.prototype.setReloadActorEquipment = prochacker_1.procHacker.js("?setReloadActorEquipment@StructureSettings@@QEAAX_N@Z", nativetype_1.void_t, { this: structure_1.StructureSettings }, nativetype_1.bool_t);
structure_1.StructureSettings.prototype.setRotation = prochacker_1.procHacker.js("?setRotation@StructureSettings@@QEAAXW4Rotation@@@Z", nativetype_1.void_t, { this: structure_1.StructureSettings }, nativetype_1.uint8_t);
structure_1.StructureSettings.prototype.setStructureOffset = prochacker_1.procHacker.js("?setStructureOffset@StructureSettings@@QEAAXAEBVBlockPos@@@Z", nativetype_1.void_t, { this: structure_1.StructureSettings }, blockpos_1.BlockPos);
structure_1.StructureSettings.prototype.setStructureSize = prochacker_1.procHacker.js("?setStructureSize@StructureSettings@@QEAAXAEBVBlockPos@@@Z", nativetype_1.void_t, { this: structure_1.StructureSettings }, blockpos_1.BlockPos);
structure_1.StructureTemplateData.prototype.allocateAndSave = prochacker_1.procHacker.js("?save@StructureTemplateData@@QEBA?AV?$unique_ptr@VCompoundTag@@U?$default_delete@VCompoundTag@@@std@@@std@@XZ", nbt_1.CompoundTag.ref(), { this: structure_1.StructureTemplate, structureReturn: true });
const StructureTemplateData$load = prochacker_1.procHacker.js("?load@StructureTemplateData@@QEAA_NAEBVCompoundTag@@@Z", nativetype_1.bool_t, null, structure_1.StructureTemplateData, nbt_1.CompoundTag);
structure_1.StructureTemplateData.prototype.load = function (tag) {
    if (tag instanceof nbt_1.Tag) {
        return StructureTemplateData$load(this, tag);
    }
    else {
        const allocated = nbt_1.NBT.allocate(tag);
        const res = StructureTemplateData$load(this, allocated);
        allocated.dispose();
        return res;
    }
};
structure_1.StructureTemplate.prototype.fillFromWorld = prochacker_1.procHacker.js("?fillFromWorld@StructureTemplate@@QEAAXAEAVBlockSource@@AEBVBlockPos@@AEBVStructureSettings@@@Z", nativetype_1.void_t, { this: structure_1.StructureTemplate }, block_1.BlockSource, blockpos_1.BlockPos, structure_1.StructureSettings);
structure_1.StructureTemplate.prototype.placeInWorld = prochacker_1.procHacker.js("?placeInWorld@StructureTemplate@@QEBAXAEAVBlockSource@@AEBVBlockPalette@@AEBVBlockPos@@AEBVStructureSettings@@PEAVStructureTelemetryServerData@@_N@Z", nativetype_1.void_t, { this: structure_1.StructureTemplate }, block_1.BlockSource, level_1.BlockPalette, blockpos_1.BlockPos, structure_1.StructureSettings);
structure_1.StructureTemplate.prototype.getBlockAtPos = prochacker_1.procHacker.js("?getBlockAtPos@StructureTemplate@@QEBAAEBVBlock@@AEBVBlockPos@@@Z", block_1.Block, { this: structure_1.StructureTemplate }, blockpos_1.BlockPos);
structure_1.StructureTemplate.prototype.getSize = prochacker_1.procHacker.js("?getSize@StructureTemplate@@QEBAAEBVBlockPos@@XZ", blockpos_1.BlockPos, { this: structure_1.StructureTemplate });
structure_1.StructureTemplate.prototype.allocateAndSave = prochacker_1.procHacker.js("?save@StructureTemplate@@QEBA?AV?$unique_ptr@VCompoundTag@@U?$default_delete@VCompoundTag@@@std@@@std@@XZ", nbt_1.CompoundTag.ref(), { this: structure_1.StructureTemplate, structureReturn: true });
structure_1.StructureManager.prototype.getOrCreate = prochacker_1.procHacker.js("?getOrCreate@StructureManager@@QEAAAEAVStructureTemplate@@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", structure_1.StructureTemplate, { this: structure_1.StructureManager }, nativetype_1.CxxString);
// components.ts
components_1.OnHitSubcomponent.prototype.readfromJSON = prochacker_1.procHacker.jsv("??_7FreezeOnHitSubcomponent@@6B@", "?readfromJSON@FreezeOnHitSubcomponent@@UEAAXAEAVValue@Json@@AEBVSemVersion@@@Z", nativetype_1.void_t, { this: components_1.OnHitSubcomponent }, connreq_1.JsonValue);
components_1.OnHitSubcomponent.prototype.writetoJSON = prochacker_1.procHacker.jsv("??_7FreezeOnHitSubcomponent@@6B@", "?writetoJSON@FreezeOnHitSubcomponent@@UEBAXAEAVValue@Json@@@Z", nativetype_1.void_t, { this: components_1.OnHitSubcomponent }, connreq_1.JsonValue);
components_1.OnHitSubcomponent.prototype._getName = prochacker_1.procHacker.jsv("??_7FreezeOnHitSubcomponent@@6B@", "?getName@FreezeOnHitSubcomponent@@UEAAPEBDXZ", core_1.StaticPointer, {
    this: components_1.OnHitSubcomponent,
});
components_1.HitResult.prototype.getEntity = prochacker_1.procHacker.js("?getEntity@HitResult@@QEBAPEAVActor@@XZ", actor_1.Actor, { this: components_1.HitResult });
// chunk.ts
chunk_1.LevelChunk.prototype.getBiome = prochacker_1.procHacker.js("?getBiome@LevelChunk@@QEBAAEAVBiome@@AEBVChunkBlockPos@@@Z", biome_1.Biome, { this: chunk_1.LevelChunk });
chunk_1.LevelChunk.prototype.getLevel = prochacker_1.procHacker.js("?getLevel@LevelChunk@@QEBAAEAVLevel@@XZ", level_1.Level, { this: chunk_1.LevelChunk });
chunk_1.LevelChunk.prototype.getPosition = prochacker_1.procHacker.js("?getPosition@LevelChunk@@QEBAAEBVChunkPos@@XZ", blockpos_1.ChunkPos, { this: chunk_1.LevelChunk });
chunk_1.LevelChunk.prototype.getMin = prochacker_1.procHacker.js("?getMin@LevelChunk@@QEBAAEBVBlockPos@@XZ", blockpos_1.BlockPos, { this: chunk_1.LevelChunk });
chunk_1.LevelChunk.prototype.getMax = prochacker_1.procHacker.js("?getMax@LevelChunk@@QEBAAEBVBlockPos@@XZ", blockpos_1.BlockPos, { this: chunk_1.LevelChunk });
chunk_1.LevelChunk.prototype.isFullyLoaded = prochacker_1.procHacker.js("?isFullyLoaded@LevelChunk@@QEBA_NXZ", nativetype_1.bool_t, { this: chunk_1.LevelChunk });
chunk_1.LevelChunk.prototype.toWorldPos = prochacker_1.procHacker.js("?toWorldPos@LevelChunk@@QEBA?AVBlockPos@@AEBVChunkBlockPos@@@Z", blockpos_1.BlockPos, { this: chunk_1.LevelChunk, structureReturn: true }, blockpos_1.ChunkPos);
chunk_1.LevelChunk.prototype.getEntity = prochacker_1.procHacker.js("?getEntity@LevelChunk@@QEBAPEAVActor@@AEBUActorUniqueID@@@Z", actor_1.Actor, { this: chunk_1.LevelChunk }, actor_1.ActorUniqueID.ref());
// std::vector<WeakEntityRef>& LevelChunk::getChunkEntities();
chunk_1.LevelChunk.prototype.getChunkEntities = prochacker_1.procHacker.js("?getChunkEntities@LevelChunk@@QEAAAEAV?$vector@VWeakEntityRef@@V?$allocator@VWeakEntityRef@@@std@@@std@@XZ", cxxvector_1.CxxVectorToArray.make(actor_1.WeakEntityRef), { this: chunk_1.LevelChunk });
chunk_1.ChunkSource.prototype.getLevel = prochacker_1.procHacker.js("?getLevel@ChunkSource@@QEBAAEAVLevel@@XZ", level_1.Level, { this: chunk_1.ChunkSource });
chunk_1.ChunkSource.prototype.isChunkKnown = prochacker_1.procHacker.jsv("??_7ChunkSource@@6B@", "?isChunkKnown@ChunkSource@@UEAA_NAEBVChunkPos@@@Z", nativetype_1.bool_t, { this: chunk_1.ChunkSource }, blockpos_1.ChunkPos);
chunk_1.ChunkSource.prototype.isChunkSaved = prochacker_1.procHacker.js("?isChunkSaved@ChunkSource@@UEAA_NAEBVChunkPos@@@Z", nativetype_1.bool_t, { this: chunk_1.ChunkSource }, blockpos_1.ChunkPos);
chunk_1.ChunkSource.prototype.isWithinWorldLimit = prochacker_1.procHacker.jsv("??_7WorldLimitChunkSource@@6B@", "?isWithinWorldLimit@WorldLimitChunkSource@@UEBA_NAEBVChunkPos@@@Z", nativetype_1.bool_t, { this: chunk_1.ChunkSource }, blockpos_1.ChunkPos);
chunk_1.ChunkSource.prototype.isShutdownDone = prochacker_1.procHacker.js("?isShutdownDone@ChunkSource@@UEAA_NXZ", nativetype_1.bool_t, { this: chunk_1.ChunkSource });
// origin.ts
commandorigin_1.VirtualCommandOrigin.allocateWith = function (origin, actor, cmdPos) {
    const out = capi_1.capi.malloc(commandorigin_1.VirtualCommandOrigin[nativetype_1.NativeType.size]).as(commandorigin_1.VirtualCommandOrigin);
    VirtualCommandOrigin$VirtualCommandOrigin(out, origin, actor, cmdPos, command_1.CommandVersion.CurrentVersion);
    return out;
};
commandorigin_1.VirtualCommandOrigin.constructWith = function (origin, actor, cmdPos) {
    const out = new commandorigin_1.VirtualCommandOrigin(true);
    VirtualCommandOrigin$VirtualCommandOrigin(out, origin, actor, cmdPos, command_1.CommandVersion.CurrentVersion);
    return out;
};
// biome.ts
biome_1.Biome.prototype.getBiomeType = prochacker_1.procHacker.js("?getBiomeType@Biome@@QEBA?AW4VanillaBiomeTypes@@XZ", nativetype_1.uint32_t, { this: biome_1.Biome });
// item_component.ts
const itemComponents = new Map([
    [symbols_1.proc["??_7CooldownItemComponent@@6B@"].getAddressBin(), item_component_1.CooldownItemComponent],
    [symbols_1.proc["??_7ArmorItemComponent@@6B@"].getAddressBin(), item_component_1.ArmorItemComponent],
    [symbols_1.proc["??_7DurabilityItemComponent@@6B@"].getAddressBin(), item_component_1.DurabilityItemComponent],
    [symbols_1.proc["??_7DiggerItemComponent@@6B@"].getAddressBin(), item_component_1.DiggerItemComponent],
    [symbols_1.proc["??_7DisplayNameItemComponent@@6B@"].getAddressBin(), item_component_1.DisplayNameItemComponent],
    [symbols_1.proc["??_7DyePowderItemComponent@@6B@"].getAddressBin(), item_component_1.DyePowderItemComponent],
    [symbols_1.proc["??_7EntityPlacerItemComponent@@6B@"].getAddressBin(), item_component_1.EntityPlacerItemComponent],
    [symbols_1.proc["??_7FoodItemComponent@@6B?$NetworkedItemComponent@VFoodItemComponent@@@@@"].getAddressBin(), item_component_1.FoodItemComponent],
    [symbols_1.proc["??_7FuelItemComponent@@6B@"].getAddressBin(), item_component_1.FuelItemComponent],
    [symbols_1.proc["??_7IconItemComponent@@6B@"].getAddressBin(), item_component_1.IconItemComponent],
    [symbols_1.proc["??_7KnockbackResistanceItemComponent@@6B@"].getAddressBin(), item_component_1.KnockbackResistanceItemComponent],
    [symbols_1.proc["??_7OnUseItemComponent@@6B@"].getAddressBin(), item_component_1.OnUseItemComponent],
    [symbols_1.proc["??_7PlanterItemComponent@@6B@"].getAddressBin(), item_component_1.PlanterItemComponent],
    [symbols_1.proc["??_7ProjectileItemComponent@@6B@"].getAddressBin(), item_component_1.ProjectileItemComponent],
    [symbols_1.proc["??_7RecordItemComponent@@6B@"].getAddressBin(), item_component_1.RecordItemComponent],
    [symbols_1.proc["??_7RenderOffsetsItemComponent@@6B@"].getAddressBin(), item_component_1.RenderOffsetsItemComponent],
    [symbols_1.proc["??_7RepairableItemComponent@@6B@"].getAddressBin(), item_component_1.RepairableItemComponent],
    [symbols_1.proc["??_7ShooterItemComponent@@6B@"].getAddressBin(), item_component_1.ShooterItemComponent],
    [symbols_1.proc["??_7ThrowableItemComponent@@6B@"].getAddressBin(), item_component_1.ThrowableItemComponent],
    [symbols_1.proc["??_7WeaponItemComponent@@6B@"].getAddressBin(), item_component_1.WeaponItemComponent],
    [symbols_1.proc["??_7WearableItemComponent@@6B@"].getAddressBin(), item_component_1.WearableItemComponent], // WearableItemComponent$vftable
]);
item_component_1.ItemComponent.setResolver(ptr => {
    if (ptr === null)
        return null;
    const vftable = ptr.getBin64();
    const cls = itemComponents.get(vftable);
    return ptr.as(cls || item_component_1.ItemComponent);
});
item_component_1.ItemComponent.prototype.buildNetworkTag = prochacker_1.procHacker.jsv("??_7ItemComponent@@6B@", "?buildNetworkTag@ItemComponent@@UEBA?AV?$unique_ptr@VCompoundTag@@U?$default_delete@VCompoundTag@@@std@@@std@@XZ", nbt_1.CompoundTag.ref(), { this: item_component_1.ItemComponent, structureReturn: true });
item_component_1.ItemComponent.prototype.initializeFromNetwork = prochacker_1.procHacker.jsv("??_7ChargeableItemComponent@@6B@", "?initializeFromNetwork@ChargeableItemComponent@@UEAA_NAEBVCompoundTag@@@Z", nativetype_1.void_t, { this: item_component_1.ItemComponent }, nbt_1.CompoundTag);
item_component_1.CooldownItemComponent.getIdentifier = prochacker_1.procHacker.js("?getIdentifier@CooldownItemComponent@@SAAEBVHashedString@@XZ", hashedstring_1.HashedString, null);
item_component_1.ArmorItemComponent.getIdentifier = prochacker_1.procHacker.js("?getIdentifier@ArmorItemComponent@@SAAEBVHashedString@@XZ", hashedstring_1.HashedString, null);
item_component_1.DurabilityItemComponent.getIdentifier = prochacker_1.procHacker.js("?getIdentifier@DurabilityItemComponent@@SAAEBVHashedString@@XZ", hashedstring_1.HashedString, null);
item_component_1.DiggerItemComponent.getIdentifier = prochacker_1.procHacker.js("?getIdentifier@DiggerItemComponent@@SAAEBVHashedString@@XZ", hashedstring_1.HashedString, null);
item_component_1.DisplayNameItemComponent.getIdentifier = prochacker_1.procHacker.js("?getIdentifier@DisplayNameItemComponent@@SAAEBVHashedString@@XZ", hashedstring_1.HashedString, null);
item_component_1.DyePowderItemComponent.getIdentifier = prochacker_1.procHacker.js("?getIdentifier@DyePowderItemComponent@@SAAEBVHashedString@@XZ", hashedstring_1.HashedString, null);
item_component_1.EntityPlacerItemComponent.getIdentifier = prochacker_1.procHacker.js("?getIdentifier@EntityPlacerItemComponent@@SAAEBVHashedString@@XZ", hashedstring_1.HashedString, null);
item_component_1.FoodItemComponent.getIdentifier = prochacker_1.procHacker.js("?getIdentifier@FoodItemComponent@@SAAEBVHashedString@@XZ", hashedstring_1.HashedString, null);
item_component_1.FuelItemComponent.getIdentifier = prochacker_1.procHacker.js("?getIdentifier@FuelItemComponent@@SAAEBVHashedString@@XZ", hashedstring_1.HashedString, null);
item_component_1.IconItemComponent.getIdentifier = prochacker_1.procHacker.js("?getIdentifier@IconItemComponent@@SAAEBVHashedString@@XZ", hashedstring_1.HashedString, null);
item_component_1.KnockbackResistanceItemComponent.getIdentifier = prochacker_1.procHacker.js("?getIdentifier@KnockbackResistanceItemComponent@@SAAEBVHashedString@@XZ", hashedstring_1.HashedString, null);
item_component_1.OnUseItemComponent.getIdentifier = prochacker_1.procHacker.js("?getIdentifier@OnUseItemComponent@@SAAEBVHashedString@@XZ", hashedstring_1.HashedString, null);
item_component_1.PlanterItemComponent.getIdentifier = prochacker_1.procHacker.js("?getIdentifier@PlanterItemComponent@@SAAEBVHashedString@@XZ", hashedstring_1.HashedString, null);
item_component_1.ProjectileItemComponent.getIdentifier = prochacker_1.procHacker.js("?getIdentifier@ProjectileItemComponent@@SAAEBVHashedString@@XZ", hashedstring_1.HashedString, null);
item_component_1.RecordItemComponent.getIdentifier = prochacker_1.procHacker.js("?getIdentifier@RecordItemComponent@@SAAEBVHashedString@@XZ", hashedstring_1.HashedString, null);
item_component_1.RenderOffsetsItemComponent.getIdentifier = prochacker_1.procHacker.js("?getIdentifier@RenderOffsetsItemComponent@@SAAEBVHashedString@@XZ", hashedstring_1.HashedString, null);
item_component_1.RepairableItemComponent.getIdentifier = prochacker_1.procHacker.js("?getIdentifier@RepairableItemComponent@@SAAEBVHashedString@@XZ", hashedstring_1.HashedString, null);
item_component_1.ShooterItemComponent.getIdentifier = prochacker_1.procHacker.js("?getIdentifier@ShooterItemComponent@@SAAEBVHashedString@@XZ", hashedstring_1.HashedString, null);
item_component_1.ThrowableItemComponent.getIdentifier = prochacker_1.procHacker.js("?getIdentifier@ThrowableItemComponent@@SAAEBVHashedString@@XZ", hashedstring_1.HashedString, null);
item_component_1.WeaponItemComponent.getIdentifier = prochacker_1.procHacker.js("?getIdentifier@WeaponItemComponent@@SAAEBVHashedString@@XZ", hashedstring_1.HashedString, null);
item_component_1.WearableItemComponent.getIdentifier = prochacker_1.procHacker.js("?getIdentifier@WearableItemComponent@@SAAEBVHashedString@@XZ", hashedstring_1.HashedString, null);
item_component_1.DiggerItemComponent.prototype.mineBlock = prochacker_1.procHacker.js("?mineBlock@DiggerItemComponent@@QEAA_NAEAVItemStack@@AEBVBlock@@HHHPEAVActor@@@Z", nativetype_1.bool_t, { this: item_component_1.DiggerItemComponent }, inventory_1.ItemStack, block_1.Block, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.int32_t, actor_1.Actor);
// TODO: removed method, need to implement
// EntityPlacerItemComponent.prototype.positionAndRotateActor = procHacker.js(
//     "?_positionAndRotateActor@EntityPlacerItemComponent@@AEBAXAEAVActor@@VVec3@@EAEBV3@PEBVBlockLegacy@@@Z",
//     void_t,
//     { this: EntityPlacerItemComponent },
//     Actor,
//     Vec3,
//     int8_t,
//     Vec3,
//     BlockLegacy,
// );
item_component_1.EntityPlacerItemComponent.prototype.setActorCustomName = prochacker_1.procHacker.js("?_setActorCustomName@EntityPlacerItemComponent@@AEBAXAEAVActor@@AEBVItemStack@@@Z", nativetype_1.void_t, { this: item_component_1.EntityPlacerItemComponent }, actor_1.Actor, inventory_1.ItemStack);
item_component_1.FoodItemComponent.prototype.canAlwaysEat = prochacker_1.procHacker.js("?canAlwaysEat@FoodItemComponent@@UEBA_NXZ", nativetype_1.bool_t, { this: item_component_1.FoodItemComponent });
item_component_1.FoodItemComponent.prototype.getUsingConvertsToItemDescriptor = prochacker_1.procHacker.js("?getUsingConvertsToItemDescriptor@FoodItemComponent@@QEBA?AVItemDescriptor@@XZ", inventory_1.ItemDescriptor, { this: item_component_1.FoodItemComponent });
item_component_1.KnockbackResistanceItemComponent.prototype.getProtectionValue = prochacker_1.procHacker.js("?getProtectionValue@KnockbackResistanceItemComponent@@QEBAMXZ", nativetype_1.float32_t, {
    this: item_component_1.KnockbackResistanceItemComponent,
});
item_component_1.ProjectileItemComponent.prototype.getShootDir = prochacker_1.procHacker.js("?getShootDir@ProjectileItemComponent@@QEBA?AVVec3@@AEBVPlayer@@M@Z", blockpos_1.Vec3, { this: item_component_1.ProjectileItemComponent }, player_1.Player, nativetype_1.float32_t);
item_component_1.ProjectileItemComponent.prototype.shootProjectile = prochacker_1.procHacker.js("?shootProjectile@ProjectileItemComponent@@QEBAPEAVActor@@AEAVBlockSource@@AEBVVec3@@1MPEAVPlayer@@@Z", actor_1.Actor, { this: item_component_1.ProjectileItemComponent }, block_1.BlockSource, blockpos_1.Vec3, blockpos_1.Vec3, nativetype_1.float32_t, player_1.Player);
item_component_1.RecordItemComponent.prototype.getAlias = prochacker_1.procHacker.js("?getAlias@RecordItemComponent@@QEBA?AV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@XZ", nativetype_1.CxxString, { this: item_component_1.RecordItemComponent });
item_component_1.RepairableItemComponent.prototype.handleItemRepair = prochacker_1.procHacker.js("?handleItemRepair@RepairableItemComponent@@QEAAHAEAVItemStackBase@@0@Z", nativetype_1.int32_t, { this: item_component_1.RepairableItemComponent }, inventory_1.ItemStackBase, inventory_1.ItemStackBase);
item_component_1.ThrowableItemComponent.prototype.getLaunchPower = prochacker_1.procHacker.js("?_getLaunchPower@ThrowableItemComponent@@AEBAMHHH@Z", nativetype_1.float32_t, { this: item_component_1.ThrowableItemComponent }, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.int32_t);
// command.ts
command_1.CommandRegistry.getParser = function (type) {
    return commandparser_1.commandParser.get(type);
};
command_1.CommandRegistry.hasParser = function (type) {
    return commandparser_1.commandParser.has(type);
};
command_1.CommandRegistry.loadParser = function (symbols) {
    return commandparser_1.commandParser.load(symbols);
};
command_1.CommandRegistry.setParser = function (type, parserFnPointer) {
    return commandparser_1.commandParser.set(type, parserFnPointer);
};
/**
 * @deprecated no need to use
 */
command_1.CommandRegistry.setEnumParser = function (parserFnPointer) {
    return commandparser_1.commandParser.setEnumParser(parserFnPointer);
};
command.MinecraftCommands.prototype.getRegistry = function () {
    return launcher_1.bedrockServer.commandRegistry;
};
Object.defineProperties(command.MinecraftCommands.prototype, {
    sender: {
        get() {
            return launcher_1.bedrockServer.commandOutputSender;
        },
    },
});
// launcher.ts
const CommandOutputParameterVector = cxxvector_1.CxxVector.make(command_1.CommandOutputParameter);
launcher_1.bedrockServer.executeCommand = function (command, mute = null, permissionLevel = null, dimension = null) {
    const origin = commandorigin_1.ServerCommandOrigin.constructWith("Server", launcher_1.bedrockServer.level, // assume it's always ServerLevel
    permissionLevel !== null && permissionLevel !== void 0 ? permissionLevel : command_1.CommandPermissionLevel.Admin, dimension);
    const result = executeCommandWithOutput(command, origin, mute);
    origin.destruct();
    return result;
};
function executeCommandWithOutput(command, origin, mute = null) {
    // fire `events.command` manually. because it does not pass MinecraftCommands::executeCommand
    const ctx = command_1.CommandContext.constructWith(command, origin);
    const resv = event_1.events.command.fire(command, origin.getName(), ctx);
    ctx.destruct();
    (0, decay_1.decay)(ctx);
    if (typeof resv === "number") {
        const res = new command_1.MCRESULT(true);
        res.result = resv;
        return res;
    }
    // modified MinecraftCommands::executeCommand
    const commands = launcher_1.bedrockServer.minecraftCommands;
    const registry = launcher_1.bedrockServer.commandRegistry;
    if (mute === true || mute == null)
        mute = commandresult_1.CommandResultType.Mute;
    else if (mute === false)
        mute = commandresult_1.CommandResultType.Output;
    const outputType = mute === commandresult_1.CommandResultType.Mute ? command_1.CommandOutputType.None : mute === commandresult_1.CommandResultType.Output ? command_1.CommandOutputType.AllOutput : command_1.CommandOutputType.DataSet;
    const output = command_1.CommandOutput.constructWith(outputType);
    const cmdparser = command_1.CommandRegistry.Parser.constructWith(registry, command_1.CommandVersion.CurrentVersion);
    try {
        let cmd;
        const res = new command_1.MCRESULT(true);
        if (cmdparser.parseCommand(command) && (cmd = cmdparser.createCommand(origin)) !== null) {
            cmd.run(origin, output);
            cmd.destruct();
            const successCount = output.getSuccessCount();
            if (successCount > 0) {
                res.result = 1; // MCRESULT_Success
            }
            else {
                res.result = 0x200; // MCRESULT_ExecutionFail
            }
        }
        else {
            const outputParams = CommandOutputParameterVector.construct();
            const errorParams = cmdparser.getErrorParams();
            if (errorParams.length !== 0) {
                outputParams.reserve(errorParams.length);
                for (const err of errorParams) {
                    outputParams.prepare().constructWith(err);
                }
            }
            const message = cmdparser.getErrorMessage();
            output.error(message, outputParams); // outputParams is destructed by output.error
            res.result = 0; // MCRESULT_FailedToParseCommand;
        }
        output.set_int("statusCode", res.getFullCode());
        if ((mute & commandresult_1.CommandResultType.Output) !== 0 && !output.empty()) {
            commands.handleOutput(origin, output);
        }
        if ((mute & commandresult_1.CommandResultType.Data) !== 0) {
            const json = launcher_1.bedrockServer.commandOutputSender._toJson(output);
            res.data = json.value();
            json.destruct();
        }
        return res;
    }
    finally {
        output.destruct();
        cmdparser.destruct();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wbGVtZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltcGxlbWVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDRDQUF5QztBQUN6Qyw0Q0FBd0M7QUFDeEMsZ0NBQTZCO0FBQzdCLGtDQUErQjtBQUMvQixvREFBaUQ7QUFDakQsb0RBQW9FO0FBQ3BFLHNDQUErRDtBQUMvRCxrQ0FBdUU7QUFDdkUsNENBQTJEO0FBQzNELG9DQUFpQztBQUNqQyxvQ0FBa0M7QUFDbEMsMENBQTRDO0FBQzVDLDBDQUF1QztBQUN2QyxnQ0FBNkI7QUFDN0IsZ0RBQWtIO0FBQ2xILDhDQWlCdUI7QUFDdkIsd0NBQXVEO0FBQ3ZELDhDQUEyQztBQUMzQyxvREFBZ0Q7QUFDaEQsa0NBQXNDO0FBQ3RDLDJDQUFtRztBQUNuRyxtQ0FxQmlCO0FBQ2pCLDJDQUErRTtBQUMvRSx1Q0FBb0M7QUFDcEMsbUNBQWdDO0FBQ2hDLG1DQUFxSDtBQUNySCx5Q0FBMkU7QUFDM0UsbUNBQWtEO0FBRWxELHFDQUFxQztBQUNyQyx1Q0FXbUI7QUFDbkIsK0NBQTRDO0FBQzVDLG1EQUEyRjtBQUMzRixnQ0FBOEI7QUFDOUIsNkNBQTREO0FBQzVELHVDQUFzRTtBQUN0RSwrQ0FBcUU7QUFDckUsMkNBQXdDO0FBQ3hDLHVDQUF5RDtBQUN6RCx5Q0FBd0Q7QUFDeEQseUNBQXNDO0FBQ3RDLDJDQUE4RDtBQUM5RCxpREFBb0U7QUFDcEUsMkNBa0JxQjtBQUNyQixxREF1QjBCO0FBQzFCLG1DQUE2SDtBQUM3SCwrQkFrQmU7QUFDZiwyREFBZ0g7QUFDaEgscUNBQTREO0FBQzVELHVDQWlCbUI7QUFDbkIsaUNBQTRDO0FBQzVDLHFDQUFpRTtBQUNqRSxxQ0FBa0M7QUFDbEMscURBQW1EO0FBQ25ELDZDQUE4SjtBQUM5SixxQ0FTa0I7QUFDbEIsMkNBQXNDO0FBQ3RDLGlDQUF3QztBQUN4QyxxQ0FBd0M7QUFDeEMsMkNBQTRHO0FBQzVHLHVDQUFpQztBQUNqQyx5Q0FB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