"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SculkSensorActivateEvent = exports.SculkShriekEvent = exports.BlockAttackEvent = exports.FallOnBlockEvent = exports.LightningHitBlockEvent = exports.ProjectileHitBlockEvent = exports.BlockInteractedWithEvent = exports.ChestPairEvent = exports.ChestOpenEvent = exports.ButtonPressEvent = exports.CampfireTryDouseFire = exports.CampfireTryLightFire = exports.FarmlandDecayEvent = exports.PistonMoveEvent = exports.PistonAction = exports.BlockPlaceEvent = exports.BlockDestructionStartEvent = exports.BlockDestroyEvent = void 0;
const actor_1 = require("../bds/actor");
const block_1 = require("../bds/block");
const blockpos_1 = require("../bds/blockpos");
const gamemode_1 = require("../bds/gamemode");
const player_1 = require("../bds/player");
const server_1 = require("../bds/server");
const common_1 = require("../common");
const core_1 = require("../core");
const decay_1 = require("../decay");
const event_1 = require("../event");
const nativetype_1 = require("../nativetype");
const prochacker_1 = require("../prochacker");
class BlockDestroyEvent {
    constructor(player, blockPos, blockSource, itemStack, 
    /**
     * controls whether the server sends a deny effect, and is always 0 in all cases with the destroyer being a player
     * @deprecated not implemented
     */
    generateParticle) {
        this.player = player;
        this.blockPos = blockPos;
        this.blockSource = blockSource;
        this.itemStack = itemStack;
        this.generateParticle = generateParticle;
    }
}
exports.BlockDestroyEvent = BlockDestroyEvent;
class BlockDestructionStartEvent {
    constructor(player, blockPos) {
        this.player = player;
        this.blockPos = blockPos;
    }
}
exports.BlockDestructionStartEvent = BlockDestructionStartEvent;
class BlockPlaceEvent {
    constructor(player, block, blockSource, blockPos) {
        this.player = player;
        this.block = block;
        this.blockSource = blockSource;
        this.blockPos = blockPos;
    }
}
exports.BlockPlaceEvent = BlockPlaceEvent;
/** @deprecated import it from bdsx/bds/block.ts */
exports.PistonAction = block_1.PistonAction;
class PistonMoveEvent {
    constructor(blockPos, blockSource, action, affectedBlocks, facingDirection) {
        this.blockPos = blockPos;
        this.blockSource = blockSource;
        this.action = action;
        this.affectedBlocks = affectedBlocks;
        this.facingDirection = facingDirection;
    }
}
exports.PistonMoveEvent = PistonMoveEvent;
class FarmlandDecayEvent {
    constructor(block, blockPos, blockSource, culprit) {
        this.block = block;
        this.blockPos = blockPos;
        this.blockSource = blockSource;
        this.culprit = culprit;
    }
}
exports.FarmlandDecayEvent = FarmlandDecayEvent;
class CampfireTryLightFire {
    constructor(blockPos, blockSource, actor) {
        this.blockPos = blockPos;
        this.blockSource = blockSource;
        this.actor = actor;
    }
}
exports.CampfireTryLightFire = CampfireTryLightFire;
class CampfireTryDouseFire {
    constructor(blockPos, blockSource, actor) {
        this.blockPos = blockPos;
        this.blockSource = blockSource;
        this.actor = actor;
    }
}
exports.CampfireTryDouseFire = CampfireTryDouseFire;
class ButtonPressEvent {
    constructor(buttonBlock, player, blockPos, playerOrientation) {
        this.buttonBlock = buttonBlock;
        this.player = player;
        this.blockPos = blockPos;
        this.playerOrientation = playerOrientation;
    }
}
exports.ButtonPressEvent = ButtonPressEvent;
class ChestOpenEvent {
    constructor(chestBlock, player, blockPos, face) {
        this.chestBlock = chestBlock;
        this.player = player;
        this.blockPos = blockPos;
        this.face = face;
    }
}
exports.ChestOpenEvent = ChestOpenEvent;
class ChestPairEvent {
    /**
     * @param lead - Whether the chest is the lead chest.
     */
    constructor(chest, chest2, lead) {
        this.chest = chest;
        this.chest2 = chest2;
        this.lead = lead;
    }
}
exports.ChestPairEvent = ChestPairEvent;
function onBlockDestroy(gamemode, blockPos, face) {
    const player = gamemode.actor;
    /********************
     *   History
     * Old hooking point - BlockSource::checkBlockDestroyPermissions
     * - fired multiple times if `server-authoritative-block-breaking` is enabled
     * - It has three refs: AgentCommands::DestroyCommand::isDone, GameMode::_canDestroy, GameMode::destroyBlock
     *
     * Current hooking point - GameMode::destroyBlock
     * - fired with the sword attack of the creative mode user if `server-authoritative-block-breaking` is enabled
     */
    const blockSource = player.getRegion();
    const itemStack = player.getMainhandSlot();
    if (player.isCreative()) {
        // bypass the hooking point issue
        const item = itemStack.getItem();
        if (item !== null && !item.canDestroyInCreative()) {
            return _onBlockDestroy(gamemode, blockPos, face);
        }
    }
    const event = new BlockDestroyEvent(player, blockPos, blockSource, itemStack, false);
    const canceled = event_1.events.blockDestroy.fire(event) === common_1.CANCEL;
    (0, decay_1.decay)(blockPos);
    (0, decay_1.decay)(blockSource);
    (0, decay_1.decay)(itemStack);
    if (canceled) {
        return false;
    }
    else {
        return _onBlockDestroy(gamemode, event.blockPos, face);
    }
}
const _onBlockDestroy = prochacker_1.procHacker.hooking("?destroyBlock@GameMode@@UEAA_NAEBVBlockPos@@E@Z", nativetype_1.bool_t, null, gamemode_1.GameMode, blockpos_1.BlockPos, nativetype_1.uint8_t)(onBlockDestroy);
function onBlockDestructionStart(blockEventCoordinator, player, blockPos) {
    const event = new BlockDestructionStartEvent(player, blockPos);
    event_1.events.blockDestructionStart.fire(event);
    (0, decay_1.decay)(blockPos);
    return _onBlockDestructionStart(blockEventCoordinator, event.player, event.blockPos);
}
const _onBlockDestructionStart = prochacker_1.procHacker.hooking("?sendBlockDestructionStarted@BlockEventCoordinator@@QEAAXAEAVPlayer@@AEBVBlockPos@@@Z", nativetype_1.void_t, null, core_1.StaticPointer, player_1.Player, blockpos_1.BlockPos)(onBlockDestructionStart);
function onBlockPlace(blockSource, block, blockPos, facing, actor, ignoreEntities, unknown) {
    const ret = _onBlockPlace(blockSource, block, blockPos, facing, actor, ignoreEntities, unknown);
    if (!(actor instanceof player_1.ServerPlayer))
        return ret; // some mobs can call it. ignore all except players.
    if (!ret)
        return false;
    const event = new BlockPlaceEvent(actor, block, blockSource, blockPos);
    const canceled = event_1.events.blockPlace.fire(event) === common_1.CANCEL;
    (0, decay_1.decay)(blockSource);
    (0, decay_1.decay)(block);
    (0, decay_1.decay)(blockPos);
    if (canceled) {
        return false;
    }
    else {
        return ret;
    }
}
const _onBlockPlace = prochacker_1.procHacker.hooking("?mayPlace@BlockSource@@QEAA_NAEBVBlock@@AEBVBlockPos@@EPEAVActor@@_NVVec3@@@Z", nativetype_1.bool_t, null, block_1.BlockSource, block_1.Block, blockpos_1.BlockPos, nativetype_1.int32_t, actor_1.Actor, nativetype_1.bool_t, blockpos_1.Vec3)(onBlockPlace);
function onPistonMove(blockSource) {
    const event = new PistonMoveEvent(this.getPosition(), blockSource, this.action, this.getAttachedBlocks(), this.getFacingDir(blockSource));
    event_1.events.pistonMove.fire(event);
    (0, decay_1.decay)(this);
    (0, decay_1.decay)(blockSource);
    return _onPistonMove.call(this, event.blockSource);
}
const _onPistonMove = prochacker_1.procHacker.hooking("?_spawnMovingBlocks@PistonBlockActor@@AEAAXAEAVBlockSource@@@Z", nativetype_1.void_t, { this: block_1.PistonBlockActor }, block_1.BlockSource)(onPistonMove);
function onFarmlandDecay(block, blockSource, blockPos, culprit, fallDistance) {
    const event = new FarmlandDecayEvent(block, blockPos, blockSource, culprit);
    const canceled = event_1.events.farmlandDecay.fire(event) === common_1.CANCEL;
    (0, decay_1.decay)(block);
    (0, decay_1.decay)(blockSource);
    (0, decay_1.decay)(blockPos);
    if (!canceled) {
        return _onFarmlandDecay(event.block, event.blockSource, event.blockPos, event.culprit, fallDistance);
    }
}
const _onFarmlandDecay = prochacker_1.procHacker.hooking("?transformOnFall@FarmBlock@@UEBAXAEAVBlockSource@@AEBVBlockPos@@PEAVActor@@M@Z", nativetype_1.void_t, null, block_1.Block, block_1.BlockSource, blockpos_1.BlockPos, actor_1.Actor, nativetype_1.float32_t)(onFarmlandDecay);
function onCampfireTryLightFire(blockSource, blockPos, actor) {
    const event = new CampfireTryLightFire(blockPos, blockSource, actor);
    const canceled = event_1.events.campfireLight.fire(event) === common_1.CANCEL;
    (0, decay_1.decay)(blockSource);
    (0, decay_1.decay)(blockPos);
    if (canceled)
        return false;
    else
        return _CampfireTryLightFire(event.blockSource, event.blockPos, event.actor);
}
const _CampfireTryLightFire = prochacker_1.procHacker.hooking("?tryLightFire@CampfireBlock@@SA_NAEAVBlockSource@@AEBVBlockPos@@PEAVActor@@@Z", nativetype_1.bool_t, null, block_1.BlockSource, blockpos_1.BlockPos, actor_1.Actor)(onCampfireTryLightFire);
function onCampfireTryDouseFire(blockSource, blockPos, actor) {
    const event = new CampfireTryDouseFire(blockPos, blockSource, actor);
    const canceled = event_1.events.campfireDouse.fire(event) === common_1.CANCEL;
    (0, decay_1.decay)(blockSource);
    (0, decay_1.decay)(blockPos);
    if (canceled)
        return false;
    else
        return _CampfireTryDouseFire(event.blockSource, event.blockPos, event.actor);
}
const _CampfireTryDouseFire = prochacker_1.procHacker.hooking("?tryDouseFire@CampfireBlock@@SA_NAEAVBlockSource@@AEBVBlockPos@@PEAVActor@@_N@Z", nativetype_1.bool_t, null, block_1.BlockSource, blockpos_1.BlockPos, actor_1.Actor)(onCampfireTryDouseFire);
function onButtonPress(buttonBlock, player, blockPos, playerOrientation) {
    const event = new ButtonPressEvent(buttonBlock, player, blockPos, playerOrientation);
    const canceled = event_1.events.buttonPress.fire(event) === common_1.CANCEL;
    (0, decay_1.decay)(blockPos);
    (0, decay_1.decay)(buttonBlock);
    if (canceled)
        return false;
    return _onButtonPress(buttonBlock, player, blockPos, playerOrientation);
}
const _onButtonPress = prochacker_1.procHacker.hooking("?use@ButtonBlock@@UEBA_NAEAVPlayer@@AEBVBlockPos@@E@Z", nativetype_1.bool_t, null, block_1.ButtonBlock, player_1.Player, blockpos_1.BlockPos, nativetype_1.uint8_t)(onButtonPress);
function onChestOpen(chestBlock, player, blockPos, face) {
    const event = new ChestOpenEvent(chestBlock, player, blockPos, face);
    const canceled = event_1.events.chestOpen.fire(event) === common_1.CANCEL;
    (0, decay_1.decay)(blockPos);
    (0, decay_1.decay)(chestBlock);
    if (canceled)
        return false;
    return _onChestOpen(chestBlock, player, blockPos, face);
}
const _onChestOpen = prochacker_1.procHacker.hooking("?use@ChestBlock@@UEBA_NAEAVPlayer@@AEBVBlockPos@@E@Z", nativetype_1.bool_t, null, block_1.ChestBlock, player_1.Player, blockpos_1.BlockPos, nativetype_1.uint8_t)(onChestOpen);
function onChestPair(chest, chest2, lead) {
    const event = new ChestPairEvent(chest, chest2, lead);
    const canceled = event_1.events.chestPair.fire(event) === common_1.CANCEL;
    (0, decay_1.decay)(chest);
    (0, decay_1.decay)(chest2);
    if (canceled)
        return;
    return _onChestPair(chest, chest2, lead);
}
const _onChestPair = prochacker_1.procHacker.hooking("?pairWith@ChestBlockActor@@QEAAXPEAV1@_N@Z", nativetype_1.void_t, null, block_1.ChestBlockActor, block_1.ChestBlockActor, nativetype_1.bool_t)(onChestPair);
class BlockInteractedWithEvent {
    constructor(player, blockPos) {
        this.player = player;
        this.blockPos = blockPos;
    }
}
exports.BlockInteractedWithEvent = BlockInteractedWithEvent;
const _onBlockInteractedWith = prochacker_1.procHacker.hooking("?onBlockInteractedWith@VanillaServerGameplayEventListener@@UEAA?AW4EventResult@@AEAVPlayer@@AEBVBlockPos@@@Z", nativetype_1.int32_t, null, server_1.VanillaServerGameplayEventListener, player_1.Player, blockpos_1.BlockPos)((self, player, pos) => {
    const event = new BlockInteractedWithEvent(player, pos);
    const canceled = event_1.events.blockInteractedWith.fire(event) === common_1.CANCEL;
    if (canceled)
        return 1;
    return _onBlockInteractedWith(self, player, pos);
});
class ProjectileHitBlockEvent {
    constructor(block, region, blockPos, projectile) {
        this.block = block;
        this.region = region;
        this.blockPos = blockPos;
        this.projectile = projectile;
    }
}
exports.ProjectileHitBlockEvent = ProjectileHitBlockEvent;
function onProjectileHit(block, region, blockPos, projectile) {
    const event = new ProjectileHitBlockEvent(block, region, blockPos, projectile);
    event_1.events.projectileHitBlock.fire(event);
    (0, decay_1.decay)(block);
    (0, decay_1.decay)(region);
    (0, decay_1.decay)(blockPos);
    return _onProjectileHit(block, region, blockPos, projectile);
}
const _onProjectileHit = prochacker_1.procHacker.hooking("?onProjectileHit@Block@@QEBAXAEAVBlockSource@@AEBVBlockPos@@AEBVActor@@@Z", nativetype_1.void_t, null, block_1.Block, block_1.BlockSource, blockpos_1.BlockPos, actor_1.Actor)(onProjectileHit);
class LightningHitBlockEvent {
    constructor(block, region, blockPos) {
        this.block = block;
        this.region = region;
        this.blockPos = blockPos;
    }
}
exports.LightningHitBlockEvent = LightningHitBlockEvent;
function onLightningHit(block, region, blockPos) {
    const event = new LightningHitBlockEvent(block, region, blockPos);
    event_1.events.lightningHitBlock.fire(event);
    (0, decay_1.decay)(block);
    (0, decay_1.decay)(region);
    (0, decay_1.decay)(blockPos);
    return _onLightningHit(block, region, blockPos);
}
const _onLightningHit = prochacker_1.procHacker.hooking("?onLightningHit@Block@@QEBAXAEAVBlockSource@@AEBVBlockPos@@@Z", nativetype_1.void_t, null, block_1.Block, block_1.BlockSource, blockpos_1.BlockPos)(onLightningHit);
class FallOnBlockEvent {
    constructor(block, region, blockPos, entity, height) {
        this.block = block;
        this.region = region;
        this.blockPos = blockPos;
        this.entity = entity;
        this.height = height;
    }
}
exports.FallOnBlockEvent = FallOnBlockEvent;
function onFallOn(block, region, blockPos, entity, height) {
    const event = new FallOnBlockEvent(block, region, blockPos, entity, height);
    event_1.events.fallOnBlock.fire(event);
    (0, decay_1.decay)(block);
    (0, decay_1.decay)(region);
    (0, decay_1.decay)(blockPos);
    return _onFallOn(block, region, blockPos, entity, height);
}
const _onFallOn = prochacker_1.procHacker.hooking("?onFallOn@Block@@QEBAXAEAVBlockSource@@AEBVBlockPos@@AEAVActor@@M@Z", nativetype_1.void_t, null, block_1.Block, block_1.BlockSource, blockpos_1.BlockPos, actor_1.Actor, nativetype_1.float32_t)(onFallOn);
class BlockAttackEvent {
    constructor(block, player, blockPos) {
        this.block = block;
        this.player = player;
        this.blockPos = blockPos;
    }
}
exports.BlockAttackEvent = BlockAttackEvent;
function onBlockAttacked(block, player, blockPos) {
    const event = new BlockAttackEvent(block, player, blockPos);
    const canceled = event_1.events.attackBlock.fire(event) === common_1.CANCEL;
    if (canceled)
        return false;
    return Block$attack(block, player, blockPos);
}
const Block$attack = prochacker_1.procHacker.hooking("?attack@Block@@QEBA_NPEAVPlayer@@AEBVBlockPos@@@Z", nativetype_1.bool_t, null, block_1.Block, player_1.Player, blockpos_1.BlockPos)(onBlockAttacked);
class SculkShriekEvent {
    constructor(region, blockPos, entity) {
        this.region = region;
        this.blockPos = blockPos;
        this.entity = entity;
    }
}
exports.SculkShriekEvent = SculkShriekEvent;
function onSculkShriek(region, blockPos, entity) {
    const event = new SculkShriekEvent(region, blockPos, entity);
    const canceled = event_1.events.sculkShriek.fire(event) === common_1.CANCEL;
    (0, decay_1.decay)(region);
    (0, decay_1.decay)(blockPos);
    if (canceled)
        return;
    return SculkShriekerBlock$_shriek(region, blockPos, entity);
}
const SculkShriekerBlock$_shriek = prochacker_1.procHacker.hooking("?_shriek@SculkShriekerBlockActorInternal@@YAXAEAVBlockSource@@VBlockPos@@AEAVPlayer@@@Z", nativetype_1.void_t, null, block_1.BlockSource, blockpos_1.BlockPos, actor_1.Actor)(onSculkShriek);
class SculkSensorActivateEvent {
    constructor(region, pos, entity) {
        this.region = region;
        this.pos = pos;
        this.entity = entity;
    }
}
exports.SculkSensorActivateEvent = SculkSensorActivateEvent;
function onSculkSensorActivate(region, pos, entity, unknown) {
    const event = new SculkSensorActivateEvent(region, pos, entity);
    const canceled = event_1.events.sculkSensorActivate.fire(event) === common_1.CANCEL;
    (0, decay_1.decay)(region);
    (0, decay_1.decay)(pos);
    if (canceled)
        return;
    return sculkSensor$Activate(region, pos, entity, unknown);
}
const sculkSensor$Activate = prochacker_1.procHacker.hooking("?activate@SculkSensorBlock@@SAXAEAVBlockSource@@AEBVBlockPos@@PEAVActor@@H@Z", nativetype_1.void_t, null, block_1.BlockSource, blockpos_1.BlockPos, actor_1.Actor, nativetype_1.int32_t)(onSculkSensorActivate);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2tldmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJsb2NrZXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0NBQXFDO0FBQ3JDLHdDQUF3SjtBQUN4Siw4Q0FBaUQ7QUFDakQsOENBQTJDO0FBRTNDLDBDQUFxRDtBQUNyRCwwQ0FBbUU7QUFDbkUsc0NBQW1DO0FBQ25DLGtDQUF3QztBQUN4QyxvQ0FBaUM7QUFDakMsb0NBQWtDO0FBQ2xDLDhDQUE0RTtBQUM1RSw4Q0FBMkM7QUFFM0MsTUFBYSxpQkFBaUI7SUFDMUIsWUFDVyxNQUFvQixFQUNwQixRQUFrQixFQUNsQixXQUF3QixFQUN4QixTQUFvQjtJQUMzQjs7O09BR0c7SUFDSSxnQkFBeUI7UUFSekIsV0FBTSxHQUFOLE1BQU0sQ0FBYztRQUNwQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFLcEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFTO0lBQ2pDLENBQUM7Q0FDUDtBQVpELDhDQVlDO0FBRUQsTUFBYSwwQkFBMEI7SUFDbkMsWUFBbUIsTUFBb0IsRUFBUyxRQUFrQjtRQUEvQyxXQUFNLEdBQU4sTUFBTSxDQUFjO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUFHLENBQUM7Q0FDekU7QUFGRCxnRUFFQztBQUVELE1BQWEsZUFBZTtJQUN4QixZQUFtQixNQUFvQixFQUFTLEtBQVksRUFBUyxXQUF3QixFQUFTLFFBQWtCO1FBQXJHLFdBQU0sR0FBTixNQUFNLENBQWM7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFPO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQUcsQ0FBQztDQUMvSDtBQUZELDBDQUVDO0FBRUQsbURBQW1EO0FBQ3RDLFFBQUEsWUFBWSxHQUFHLG9CQUF3QixDQUFDO0FBSXJELE1BQWEsZUFBZTtJ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