"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityKnockbackEvent = exports.EntityCarriedItemChangedEvent = exports.ProjectileHitEvent = exports.PlayerDimensionChangeEvent = exports.EntityConsumeTotemEvent = exports.PlayerSleepInBedEvent = exports.ProjectileShootEvent = exports.SplashPotionHitEvent = exports.PlayerJumpEvent = exports.ItemUseOnBlockEvent = exports.ItemUseEvent = exports.PlayerUseItemEvent = exports.PlayerCritEvent = exports.PlayerPickupItemEvent = exports.PlayerLeftEvent = exports.PlayerJoinEvent = exports.PlayerLevelUpEvent = exports.PlayerRespawnEvent = exports.PlayerInventoryChangeEvent = exports.PlayerDropItemEvent = exports.PlayerInteractEvent = exports.PlayerAttackEvent = exports.EntityCreatedEvent = exports.EntitySneakEvent = exports.EntityStopRidingEvent = exports.EntityStartRidingEvent = exports.EntityStartSwimmingEvent = exports.EntityDieEvent = exports.EntityHeathChangeEvent = exports.EntityHurtEvent = void 0;
const actor_1 = require("../bds/actor");
const blockpos_1 = require("../bds/blockpos");
const components_1 = require("../bds/components");
const inventory_1 = require("../bds/inventory");
const level_1 = require("../bds/level");
const networkidentifier_1 = require("../bds/networkidentifier");
const packetids_1 = require("../bds/packetids");
const player_1 = require("../bds/player");
const common_1 = require("../common");
const core_1 = require("../core");
const decay_1 = require("../decay");
const event_1 = require("../event");
const makefunc_1 = require("../makefunc");
const nativetype_1 = require("../nativetype");
const pointer_1 = require("../pointer");
const prochacker_1 = require("../prochacker");
class EntityHurtEvent {
    constructor(entity, damage, damageSource, knock, ignite) {
        this.entity = entity;
        this.damage = damage;
        this.damageSource = damageSource;
        this.knock = knock;
        this.ignite = ignite;
    }
}
exports.EntityHurtEvent = EntityHurtEvent;
class EntityHeathChangeEvent {
    constructor(entity, oldHealth, newHealth) {
        this.entity = entity;
        this.oldHealth = oldHealth;
        this.newHealth = newHealth;
    }
}
exports.EntityHeathChangeEvent = EntityHeathChangeEvent;
class EntityDieEvent {
    constructor(entity, damageSource) {
        this.entity = entity;
        this.damageSource = damageSource;
    }
}
exports.EntityDieEvent = EntityDieEvent;
class EntityStartSwimmingEvent {
    constructor(entity) {
        this.entity = entity;
    }
}
exports.EntityStartSwimmingEvent = EntityStartSwimmingEvent;
class EntityStartRidingEvent {
    constructor(entity, ride) {
        this.entity = entity;
        this.ride = ride;
    }
}
exports.EntityStartRidingEvent = EntityStartRidingEvent;
class EntityStopRidingEvent {
    constructor(entity, exitFromRider, actorIsBeingDestroyed, switchingRides) {
        this.entity = entity;
        this.exitFromRider = exitFromRider;
        this.actorIsBeingDestroyed = actorIsBeingDestroyed;
        this.switchingRides = switchingRides;
    }
}
exports.EntityStopRidingEvent = EntityStopRidingEvent;
class EntitySneakEvent {
    constructor(entity, isSneaking) {
        this.entity = entity;
        this.isSneaking = isSneaking;
    }
}
exports.EntitySneakEvent = EntitySneakEvent;
class EntityCreatedEvent {
    constructor(entity) {
        this.entity = entity;
    }
}
exports.EntityCreatedEvent = EntityCreatedEvent;
class PlayerAttackEvent {
    constructor(player, victim) {
        this.player = player;
        this.victim = victim;
    }
}
exports.PlayerAttackEvent = PlayerAttackEvent;
class PlayerInteractEvent {
    constructor(player, victim, interactPos) {
        this.player = player;
        this.victim = victim;
        this.interactPos = interactPos;
    }
}
exports.PlayerInteractEvent = PlayerInteractEvent;
class PlayerDropItemEvent {
    constructor(player, itemStack, inContainer, hotbarSlot) {
        this.player = player;
        this.itemStack = itemStack;
        this.inContainer = inContainer;
        this.hotbarSlot = hotbarSlot;
    }
}
exports.PlayerDropItemEvent = PlayerDropItemEvent;
class PlayerInventoryChangeEvent {
    constructor(player, oldItemStack, newItemStack, slot) {
        this.player = player;
        this.oldItemStack = oldItemStack;
        this.newItemStack = newItemStack;
        this.slot = slot;
    }
}
exports.PlayerInventoryChangeEvent = PlayerInventoryChangeEvent;
class PlayerRespawnEvent {
    constructor(player) {
        this.player = player;
    }
}
exports.PlayerRespawnEvent = PlayerRespawnEvent;
class PlayerLevelUpEvent {
    constructor(player, 
    /** Amount of levels upgraded */
    levels) {
        this.player = player;
        this.levels = levels;
    }
}
exports.PlayerLevelUpEvent = PlayerLevelUpEvent;
class PlayerJoinEvent {
    constructor(player, isSimulated) {
        this.player = player;
        this.isSimulated = isSimulated;
    }
}
exports.PlayerJoinEvent = PlayerJoinEvent;
class PlayerLeftEvent {
    constructor(player, skipMessage) {
        this.player = player;
        this.skipMessage = skipMessage;
    }
}
exports.PlayerLeftEvent = PlayerLeftEvent;
class PlayerPickupItemEvent {
    constructor(player, 
    /**
     * itemActor is not ItemActor always.
     * it can be the arrow or trident.
     */
    itemActor) {
        this.player = player;
        this.itemActor = itemActor;
    }
}
exports.PlayerPickupItemEvent = PlayerPickupItemEvent;
class PlayerCritEvent {
    constructor(player, victim) {
        this.player = player;
        this.victim = victim;
    }
}
exports.PlayerCritEvent = PlayerCritEvent;
class PlayerUseItemEvent {
    constructor(player, useMethod, consumeItem, itemStack) {
        this.player = player;
        this.useMethod = useMethod;
        this.consumeItem = consumeItem;
        this.itemStack = itemStack;
    }
}
exports.PlayerUseItemEvent = PlayerUseItemEvent;
class ItemUseEvent {
    constructor(itemStack, player) {
        this.itemStack = itemStack;
        this.player = player;
    }
}
exports.ItemUseEvent = ItemUseEvent;
class ItemUseOnBlockEvent {
    constructor(itemStack, actor, x, y, z, face, clickX, clickY, clickZ) {
        this.itemStack = itemStack;
        this.actor = actor;
        this.x = x;
        this.y = y;
        this.z = z;
        this.face = face;
        this.clickX = clickX;
        this.clickY = clickY;
        this.clickZ = clickZ;
    }
}
exports.ItemUseOnBlockEvent = ItemUseOnBlockEvent;
class PlayerJumpEvent {
    constructor(player) {
        this.player = player;
    }
}
exports.PlayerJumpEvent = PlayerJumpEvent;
class SplashPotionHitEvent {
    constructor(entity, potionEffect) {
        this.entity = entity;
        this.potionEffect = potionEffect;
    }
}
exports.SplashPotionHitEvent = SplashPotionHitEvent;
class ProjectileShootEvent {
    constructor(projectile, shooter) {
        this.projectile = projectile;
        this.shooter = shooter;
    }
}
exports.ProjectileShootEvent = ProjectileShootEvent;
class PlayerSleepInBedEvent {
    constructor(player, pos) {
        this.player = player;
        this.pos = pos;
    }
}
exports.PlayerSleepInBedEvent = PlayerSleepInBedEvent;
class EntityConsumeTotemEvent {
    constructor(entity, totem) {
        this.entity = entity;
        this.totem = totem;
    }
}
exports.EntityConsumeTotemEvent = EntityConsumeTotemEvent;
class PlayerDimensionChangeEvent {
    constructor(player, dimension, 
    /** @deprecated deleted parameter */
    useNetherPortal) {
        this.player = player;
        this.dimension = dimension;
        this.useNetherPortal = useNetherPortal;
    }
}
exports.PlayerDimensionChangeEvent = PlayerDimensionChangeEvent;
class ProjectileHitEvent {
    constructor(projectile, victim, result) {
        this.projectile = projectile;
        this.victim = victim;
        this.result = result;
    }
}
exports.ProjectileHitEvent = ProjectileHitEvent;
class EntityCarriedItemChangedEvent {
    constructor(entity, oldItemStack, newItemStack, handSlot) {
        this.entity = entity;
        this.oldItemStack = oldItemStack;
        this.newItemStack = newItemStack;
        this.handSlot = handSlot;
    }
}
exports.EntityCarriedItemChangedEvent = EntityCarriedItemChangedEvent;
class EntityKnockbackEvent {
    constructor(target, source, damage, xd, zd, power, height, heightCap) {
        this.target = target;
        this.source = source;
        this.damage = damage;
        this.xd = xd;
        this.zd = zd;
        this.power = power;
        this.height = height;
        this.heightCap = heightCap;
    }
}
exports.EntityKnockbackEvent = EntityKnockbackEvent;
const MovMovementProxy$_getMob = prochacker_1.procHacker.js("?_getMob@?$DirectMobMovementProxyImpl@UIPlayerMovementProxy@@@@UEAAPEAVMob@@XZ", actor_1.Mob, null, core_1.VoidPointer);
function onMobJump(movementProxy, blockSourceInterface) {
    const mob = MovMovementProxy$_getMob(movementProxy);
    if (mob instanceof player_1.Player) {
        const event = new PlayerJumpEvent(mob);
        event_1.events.playerJump.fire(event);
    }
    return _onMobJump(movementProxy, blockSourceInterface);
}
const _onMobJump = prochacker_1.procHacker.hooking("?_jumpFromGround@Mob@@KAXAEAUIMobMovementProxy@@AEBVIConstBlockSource@@@Z", nativetype_1.void_t, null, core_1.VoidPointer, core_1.VoidPointer)(onMobJump);
function onPlayerUseItem(player, itemStack, useMethod, consumeItem) {
    const event = new PlayerUseItemEvent(player, useMethod, consumeItem, itemStack);
    event_1.events.playerUseItem.fire(event);
    (0, decay_1.decay)(itemStack);
    return _onPlayerUseItem(event.player, event.itemStack, event.useMethod, event.consumeItem);
}
const _onPlayerUseItem = prochacker_1.procHacker.hooking("?useItem@Player@@UEAAXAEAVItemStackBase@@W4ItemUseMethod@@_N@Z", nativetype_1.void_t, null, player_1.Player, inventory_1.ItemStack, nativetype_1.int32_t, nativetype_1.bool_t)(onPlayerUseItem);
function onItemUse(itemStack, player) {
    const event = new ItemUseEvent(itemStack, player);
    const canceled = event_1.events.itemUse.fire(event) === common_1.CANCEL;
    (0, decay_1.decay)(itemStack);
    if (canceled) {
        return itemStack;
    }
    return _onItemUse(event.itemStack, event.player);
}
const _onItemUse = prochacker_1.procHacker.hooking("?use@ItemStack@@QEAAAEAV1@AEAVPlayer@@@Z", inventory_1.ItemStack, null, inventory_1.ItemStack, player_1.Player)(onItemUse);
function onItemUseOnBlock(itemStack, actor, x, y, z, face, clickPos) {
    const event = new ItemUseOnBlockEvent(itemStack, actor, x, y, z, face, clickPos.x, clickPos.y, clickPos.z);
    const canceled = event_1.events.itemUseOnBlock.fire(event) === common_1.CANCEL;
    (0, decay_1.decay)(itemStack);
    if (canceled) {
        return false;
    }
    clickPos.x = event.clickX;
    clickPos.y = event.clickY;
    clickPos.z = event.clickZ;
    return _onItemUseOnBlock(event.itemStack, event.actor, event.x, event.y, event.z, event.face, clickPos);
}
const _onItemUseOnBlock = prochacker_1.procHacker.hooking("?useOn@ItemStack@@QEAA_NAEAVActor@@HHHEAEBVVec3@@@Z", nativetype_1.bool_t, null, inventory_1.ItemStack, actor_1.Actor, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.uint8_t, blockpos_1.Vec3)(onItemUseOnBlock);
function onPlayerCrit(player, victim) {
    const event = new PlayerCritEvent(player, victim);
    event_1.events.playerCrit.fire(event);
    return _onPlayerCrit(player, victim);
}
const _onPlayerCrit = prochacker_1.procHacker.hooking("?_crit@Player@@UEAAXAEAVActor@@@Z", nativetype_1.void_t, null, player_1.Player, actor_1.Actor)(onPlayerCrit);
function onEntityHurt(entity, actorDamageSource, damage, knock, ignite) {
    const event = new EntityHurtEvent(entity, damage, actorDamageSource, knock, ignite);
    const canceled = event_1.events.entityHurt.fire(event) === common_1.CANCEL;
    (0, decay_1.decay)(actorDamageSource);
    if (canceled) {
        return false;
    }
    return _onEntityHurt(event.entity, event.damageSource, event.damage, event.knock, event.ignite);
}
const _onEntityHurt = prochacker_1.procHacker.hooking("?hurt@Actor@@QEAA_NAEBVActorDamageSource@@M_N1@Z", nativetype_1.bool_t, null, actor_1.Actor, actor_1.ActorDamageSource, nativetype_1.float32_t, nativetype_1.bool_t, nativetype_1.bool_t)(onEntityHurt);
function onEntityHealthChange(attributeDelegate, oldHealth, newHealth, attributeBuffInfo) {
    const actor = actor_1.Actor[makefunc_1.makefunc.getFromParam](attributeDelegate, 0x20);
    const event = new EntityHeathChangeEvent(actor, oldHealth, newHealth);
    event_1.events.entityHealthChange.fire(event);
    attributeDelegate.setPointer(event.entity, 0x20);
    return _onEntityHealthChange(attributeDelegate, event.oldHealth, event.newHealth, attributeBuffInfo);
}
const _onEntityHealthChange = prochacker_1.procHacker.hooking("?change@HealthAttributeDelegate@@UEAAMMMAEBVAttributeBuff@@@Z", nativetype_1.float32_t, null, core_1.NativePointer, nativetype_1.float32_t, nativetype_1.float32_t, core_1.VoidPointer)(onEntityHealthChange);
function onEntityDie(entity, damageSource) {
    const event = new EntityDieEvent(entity, damageSource);
    event_1.events.entityDie.fire(event);
    (0, decay_1.decay)(damageSource);
    return _onEntityDie(event.entity, event.damageSource);
}
const _onEntityDie = prochacker_1.procHacker.hooking("?die@Mob@@UEAAXAEBVActorDamageSource@@@Z", nativetype_1.bool_t, null, actor_1.Mob, actor_1.ActorDamageSource)(onEntityDie);
function onEntityStartSwimming(entity) {
    const event = new EntityStartSwimmingEvent(entity);
    const canceled = event_1.events.entityStartSwimming.fire(event) === common_1.CANCEL;
    if (!canceled) {
        return _onEntityStartSwimming(event.entity);
    }
}
function onPlayerStartSwimming(entity) {
    const event = new EntityStartSwimmingEvent(entity);
    const canceled = event_1.events.entityStartSwimming.fire(event) === common_1.CANCEL;
    if (!canceled) {
        return _onPlayerStartSwimming(event.entity);
    }
}
const _onEntityStartSwimming = prochacker_1.procHacker.hooking("?startSwimming@Actor@@UEAAXXZ", nativetype_1.void_t, null, actor_1.Actor)(onEntityStartSwimming);
const _onPlayerStartSwimming = prochacker_1.procHacker.hooking("?startSwimming@Player@@UEAAXXZ", nativetype_1.void_t, null, player_1.Player)(onPlayerStartSwimming);
function onEntityStartRiding(entity, ride) {
    const event = new EntityStartRidingEvent(entity, ride);
    const canceled = event_1.events.entityStartRiding.fire(event) === common_1.CANCEL;
    if (canceled) {
        return false;
    }
    return _onEntityStartRiding(event.entity, event.ride);
}
const _onEntityStartRiding = prochacker_1.procHacker.hooking("?startRiding@Actor@@UEAA_NAEAV1@@Z", nativetype_1.bool_t, null, actor_1.Actor, actor_1.Actor)(onEntityStartRiding);
function onEntityStopRiding(entity, exitFromRider, actorIsBeingDestroyed, switchingRides) {
    const event = new EntityStopRidingEvent(entity, exitFromRider, actorIsBeingDestroyed, switchingRides);
    const canceled = event_1.events.entityStopRiding.fire(event) === common_1.CANCEL;
    if (canceled) {
        return;
    }
    return _onEntityStopRiding(event.entity, event.exitFromRider, event.actorIsBeingDestroyed, event.switchingRides);
}
const _onEntityStopRiding = prochacker_1.procHacker.hooking("?stopRiding@Actor@@UEAAX_N00@Z", nativetype_1.void_t, null, actor_1.Actor, nativetype_1.bool_t, nativetype_1.bool_t, nativetype_1.bool_t)(onEntityStopRiding);
function onEntitySneak(actorEventCoordinator, entity, isSneaking) {
    const event = new EntitySneakEvent(entity, isSneaking);
    event_1.events.entitySneak.fire(event);
    return _onEntitySneak(actorEventCoordinator, entity, event.isSneaking);
}
const _onEntitySneak = prochacker_1.procHacker.hooking("?sendActorSneakChanged@ActorEventCoordinator@@QEAAXAEAVActor@@_N@Z", nativetype_1.void_t, null, core_1.VoidPointer, actor_1.Actor, nativetype_1.bool_t)(onEntitySneak);
function onEntityCreated(actorEventCoordinator, entity) {
    const event = new EntityCreatedEvent(entity);
    _onEntityCreated(actorEventCoordinator, event.entity);
    event_1.events.entityCreated.fire(event);
}
const _onEntityCreated = prochacker_1.procHacker.hooking("?sendActorCreated@ActorEventCoordinator@@QEAAXAEAVActor@@@Z", nativetype_1.void_t, null, core_1.VoidPointer, actor_1.Actor)(onEntityCreated);
function onPlayerAttack(player, victim, cause) {
    const event = new PlayerAttackEvent(player, victim);
    const canceled = event_1.events.playerAttack.fire(event) === common_1.CANCEL;
    if (canceled) {
        return false;
    }
    return _onPlayerAttack(event.player, event.victim, cause);
}
const _onPlayerAttack = prochacker_1.procHacker.hooking("?attack@Player@@UEAA_NAEAVActor@@AEBW4ActorDamageCause@@@Z", nativetype_1.bool_t, null, player_1.Player, actor_1.Actor, pointer_1.Wrapper.make(nativetype_1.int32_t))(onPlayerAttack);
function onPlayerInteract(player, victim, interactPos) {
    const event = new PlayerInteractEvent(player, victim, interactPos);
    const canceled = event_1.events.playerInteract.fire(event) === common_1.CANCEL;
    if (canceled) {
        return false;
    }
    return _onPlayerInteract(event.player, event.victim, event.interactPos);
}
const _onPlayerInteract = prochacker_1.procHacker.hooking("?interact@Player@@QEAA_NAEAVActor@@AEBVVec3@@@Z", nativetype_1.bool_t, null, player_1.Player, actor_1.Actor, blockpos_1.Vec3)(onPlayerInteract);
event_1.events.packetBefore(packetids_1.MinecraftPacketIds.InventoryTransaction).on((pk, ni) => {
    const transaction = pk.transaction;
    if (transaction === null)
        return; // nullable
    if (transaction.type === inventory_1.ComplexInventoryTransaction.Type.NormalTransaction) {
        const src = inventory_1.InventorySource.create(inventory_1.ContainerId.Inventory, inventory_1.InventorySourceType.ContainerInventory);
        const actions = transaction.data.getActions(src);
        if (actions.length === 1) {
            const player = ni.getActor();
            const slot = actions[0].slot;
            const itemStack = player.getInventory().getItem(slot, inventory_1.ContainerId.Inventory);
            const event = new PlayerDropItemEvent(player, itemStack, false, slot);
            const canceled = event_1.events.playerDropItem.fire(event) === common_1.CANCEL;
            (0, decay_1.decay)(itemStack);
            if (canceled) {
                player.sendInventory();
                return common_1.CANCEL;
            }
        }
    }
});
const hasOpenContainer = Symbol("hasOpenContainer");
event_1.events.packetSend(packetids_1.MinecraftPacketIds.ContainerOpen).on((pk, ni) => {
    const player = ni.getActor();
    player[hasOpenContainer] = true;
});
event_1.events.packetSend(packetids_1.MinecraftPacketIds.ContainerClose).on((pk, ni) => {
    const player = ni.getActor();
    player[hasOpenContainer] = false;
});
function onPlayerDropItem(player, itemStack, randomly) {
    if (player[hasOpenContainer]) {
        const event = new PlayerDropItemEvent(player, itemStack, true);
        const canceled = event_1.events.playerDropItem.fire(event) === common_1.CANCEL;
        (0, decay_1.decay)(itemStack);
        if (canceled) {
            return false;
        }
        return _onPlayerDropItem(event.player, event.itemStack, randomly);
    }
    return _onPlayerDropItem(player, itemStack, randomly);
}
const _onPlayerDropItem = prochacker_1.procHacker.hooking("?drop@Player@@UEAA_NAEBVItemStack@@_N@Z", nativetype_1.bool_t, null, player_1.Player, inventory_1.ItemStack, nativetype_1.bool_t)(onPlayerDropItem);
function onPlayerInventoryChange(player, container, slot, oldItemStack, newItemStack, unknown) {
    const event = new PlayerInventoryChangeEvent(player, oldItemStack, newItemStack, slot);
    event_1.events.playerInventoryChange.fire(event);
    (0, decay_1.decay)(oldItemStack);
    (0, decay_1.decay)(newItemStack);
    return _onPlayerInventoryChange(event.player, container, event.slot, event.oldItemStack, event.newItemStack, unknown);
}
const _onPlayerInventoryChange = prochacker_1.procHacker.hooking("?inventoryChanged@Player@@UEAAXAEAVContainer@@HAEBVItemStack@@1_N@Z", nativetype_1.void_t, null, player_1.Player, core_1.VoidPointer, nativetype_1.int32_t, inventory_1.ItemStack, inventory_1.ItemStack, nativetype_1.bool_t)(onPlayerInventoryChange);
function onPlayerRespawn(player) {
    const event = new PlayerRespawnEvent(player);
    event_1.events.playerRespawn.fire(event);
    return _onPlayerRespawn(event.player);
}
const _onPlayerRespawn = prochacker_1.procHacker.hooking("?respawn@Player@@UEAAXXZ", nativetype_1.void_t, null, player_1.Player)(onPlayerRespawn);
function onPlayerLevelUp(player, levels) {
    const event = new PlayerLevelUpEvent(player, levels);
    const canceled = event_1.events.playerLevelUp.fire(event) === common_1.CANCEL;
    if (canceled) {
        return;
    }
    return _onPlayerLevelUp(event.player, event.levels);
}
const _onPlayerLevelUp = prochacker_1.procHacker.hooking("?addLevels@Player@@UEAAXH@Z", nativetype_1.void_t, null, player_1.Player, nativetype_1.int32_t)(onPlayerLevelUp);
event_1.events.packetBefore(packetids_1.MinecraftPacketIds.SetLocalPlayerAsInitialized).on((pk, ni) => {
    const actor = ni.getActor();
    if (actor === null)
        return common_1.CANCEL; // possibilities by the hacked client
});
const setLocalPlayerAsInitialized = prochacker_1.procHacker.hooking("?setLocalPlayerAsInitialized@ServerPlayer@@QEAAXXZ", nativetype_1.void_t, null, player_1.ServerPlayer)(player => {
    const event = new PlayerJoinEvent(player, player instanceof player_1.SimulatedPlayer);
    event_1.events.playerJoin.fire(event);
    return setLocalPlayerAsInitialized(player);
});
function onPlayerPickupItem(player, itemActor, orgCount, favoredSlot) {
    const event = new PlayerPickupItemEvent(player, itemActor);
    const canceled = event_1.events.playerPickupItem.fire(event) === common_1.CANCEL;
    if (canceled) {
        return false;
    }
    return _onPlayerPickupItem(event.player, event.itemActor, orgCount, favoredSlot);
}
const _onPlayerPickupItem = prochacker_1.procHacker.hooking("?take@Player@@QEAA_NAEAVActor@@HH@Z", nativetype_1.bool_t, null, player_1.Player, actor_1.Actor, nativetype_1.int32_t, nativetype_1.int32_t)(onPlayerPickupItem);
function onPlayerLeft(networkSystem, player, skipMessage) {
    const event = new PlayerLeftEvent(player, skipMessage);
    event_1.events.playerLeft.fire(event);
    return _onPlayerLeft(networkSystem, event.player, event.skipMessage);
}
const _onPlayerLeft = prochacker_1.procHacker.hooking("?_onPlayerLeft@ServerNetworkHandler@@AEAAXPEAVServerPlayer@@_N@Z", nativetype_1.void_t, null, networkidentifier_1.ServerNetworkHandler, player_1.ServerPlayer, nativetype_1.bool_t)(onPlayerLeft);
const _onSimulatedDisconnect = prochacker_1.procHacker.hooking("?simulateDisconnect@SimulatedPlayer@@QEAAXXZ", nativetype_1.void_t, null, player_1.SimulatedPlayer)(simulatedPlayer => {
    const event = new PlayerLeftEvent(simulatedPlayer, false /** disconnecting SimulatedPlayer doesn't send any message.*/);
    event_1.events.playerLeft.fire(event);
    _onSimulatedDisconnect(simulatedPlayer);
});
function onSplashPotionHit(splashPotionEffectSubcomponent, entity, projectileComponent) {
    const event = new SplashPotionHitEvent(entity, splashPotionEffectSubcomponent.potionEffect);
    const canceled = event_1.events.splashPotionHit.fire(event) === common_1.CANCEL;
    if (!canceled) {
        splashPotionEffectSubcomponent.potionEffect = event.potionEffect;
        _onSplashPotionHit(splashPotionEffectSubcomponent, event.entity, projectileComponent);
    }
    (0, decay_1.decay)(splashPotionEffectSubcomponent);
}
const _onSplashPotionHit = prochacker_1.procHacker.hooking("?doOnHitEffect@SplashPotionEffectSubcomponent@@UEAAXAEAVActor@@AEAVProjectileComponent@@@Z", nativetype_1.void_t, null, components_1.SplashPotionEffectSubcomponent, actor_1.Actor, components_1.ProjectileComponent)(onSplashPotionHit);
function onProjectileShoot(projectileComponent, projectile, shooter) {
    const event = new ProjectileShootEvent(projectile, shooter);
    event_1.events.projectileShoot.fire(event);
    (0, decay_1.decay)(projectileComponent);
    return _onProjectileShoot(projectileComponent, event.projectile, event.shooter);
}
const _onProjectileShoot = prochacker_1.procHacker.hooking("?shoot@ProjectileComponent@@QEAAXAEAVActor@@0@Z", nativetype_1.void_t, null, components_1.ProjectileComponent, actor_1.Actor, actor_1.Actor)(onProjectileShoot);
// TODO: hook ?shoot@ProjectileComponent@@QEAAXAEAVActor@@AEBVVec3@@MM1PEAV2@@Z instead
function onPlayerSleepInBed(player, pos) {
    const event = new PlayerSleepInBedEvent(player, pos);
    const canceled = event_1.events.playerSleepInBed.fire(event) === common_1.CANCEL;
    (0, decay_1.decay)(pos);
    if (canceled) {
        return level_1.BedSleepingResult.OTHER_PROBLEM;
    }
    return _onPlayerSleepInBed(event.player, event.pos);
}
const _onPlayerSleepInBed = prochacker_1.procHacker.hooking("?startSleepInBed@Player@@UEAA?AW4BedSleepingResult@@AEBVBlockPos@@@Z", nativetype_1.uint8_t, null, player_1.Player, blockpos_1.BlockPos)(onPlayerSleepInBed);
function onConsumeTotem(entity) {
    const event = new EntityConsumeTotemEvent(entity, entity.getEquippedTotem());
    event_1.events.entityConsumeTotem.fire(event);
    return _onConsumeTotem(entity);
}
const _onConsumeTotem = prochacker_1.procHacker.hooking("?consumeTotem@Actor@@UEAA_NXZ", nativetype_1.bool_t, null, actor_1.Actor)(onConsumeTotem);
function onPlayerDimensionChange(player, dimension) {
    const event = new PlayerDimensionChangeEvent(player, dimension, false);
    const canceled = event_1.events.playerDimensionChange.fire(event) === common_1.CANCEL;
    if (canceled) {
        return;
    }
    return _onPlayerDimensionChange(player, event.dimension);
}
const _onPlayerDimensionChange = prochacker_1.procHacker.hooking("?changeDimension@ServerPlayer@@UEAAXV?$AutomaticID@VDimension@@H@@@Z", nativetype_1.void_t, null, player_1.ServerPlayer, nativetype_1.int32_t)(onPlayerDimensionChange);
const onProjectileHit = prochacker_1.procHacker.hooking("?onHit@ProjectileComponent@@QEAAXAEAVActor@@AEBVHitResult@@@Z", nativetype_1.void_t, null, components_1.ProjectileComponent, actor_1.Actor, components_1.HitResult)((projectileComponent, projectile, result) => {
    const event = new ProjectileHitEvent(projectile, result.getEntity(), result);
    event_1.events.projectileHit.fire(event);
    (0, decay_1.decay)(projectileComponent);
    (0, decay_1.decay)(result);
    return onProjectileHit(projectileComponent, event.projectile, event.result);
});
// TODO: implement
// const sendActorCarriedItemChanged = procHacker.hooking(
//     "?sendActorCarriedItemChanged@ActorEventCoordinator@@QEAAXAEAVActor@@AEBVItemInstance@@1W4HandSlot@@@Z",
//     void_t,
//     null,
//     VoidPointer, // this, ActorEventCoordinator
//     Actor,
//     ItemStackBase, // Actually ItemInstance which extends ItemStackBase without additional fields
//     ItemStackBase,
//     int32_t,
// )((self, entity, oldItemStack, newItemStack, handSlot) => {
//     const event = new EntityCarriedItemChangedEvent(entity, oldItemStack, newItemStack, handSlot);
//     events.entityCarriedItemChanged.fire(event);
//     decay(oldItemStack);
//     decay(newItemStack);
//     return sendActorCarriedItemChanged(self, entity, oldItemStack, newItemStack, handSlot);
// });
function onEntityKnockback(target, source, damage, xd, zd, power, height, heightCap) {
    const event = new EntityKnockbackEvent(target, source, damage, xd, zd, power, height, heightCap);
    const canceled = event_1.events.entityKnockback.fire(event) === common_1.CANCEL;
    if (canceled) {
        return;
    }
    return _onEntityKnockback(target, source, damage, event.xd, event.zd, event.power, event.height, event.heightCap);
}
const _onEntityKnockback = prochacker_1.procHacker.hooking("?knockback@Mob@@UEAAXPEAVActor@@HMMMMM@Z", nativetype_1.void_t, null, actor_1.Mob, actor_1.Actor, nativetype_1.int32_t, nativetype_1.float32_t, nativetype_1.float32_t, nativetype_1.float32_t, nativetype_1.float32_t, nativetype_1.float32_t)(onEntityKnockback);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5ZXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbnRpdHlldmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBdUc7QUFDdkcsOENBQWlEO0FBQ2pELGtEQUFtRztBQUNuRyxnREFBc0o7QUFDdEosd0NBQWlEO0FBQ2pELGdFQUFnRTtBQUNoRSxnREFBc0Q7QUFFdEQsMENBQXNFO0FBQ3RFLHNDQUFtQztBQUNuQyxrQ0FBcUQ7QUFDckQsb0NBQWlDO0FBQ2pDLG9DQUFrQztBQUNsQywwQ0FBdUM7QUFDdkMsOENBQTRFO0FBQzVFLHdDQUFxQztBQUNyQyw4Q0FBMkM7QUFFM0MsTUFBYSxlQUFlO0lBQ3hCLFlBQW1CLE1BQWEsRUFBUyxNQUFjLEVBQVMsWUFBK0IsRUFBUyxLQUFjLEVBQVMsTUFBZTtRQUEzSCxXQUFNLEdBQU4sTUFBTSxDQUFPO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLGlCQUFZLEdBQVosWUFBWSxDQUFtQjtRQUFTLFVBQUssR0FBTCxLQUFLLENBQVM7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFTO0lBQUcsQ0FBQztDQUNySjtBQUZELDBDQUVDO0FBRUQsTUFBYSxzQkFBc0I7SUFDL0IsWUFBbUIsTUFBYSxFQUFXLFNBQWlCLEVBQVcsU0FBaUI7UUFBckUsV0FBTSxHQUFOLE1BQU0sQ0FBTztRQUFXLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFBVyxjQUFTLEdBQVQsU0FBUyxDQUFRO0lBQUcsQ0FBQztDQUMvRjtBQUZELHdEQUVDO0FBRUQsTUFBYSxjQUFjO0lBQ3ZCLFlBQW1CLE1BQVcsRUFBUyxZQUErQjtRQUFuRCxXQUFNLEdBQU4sTUFBTSxDQUFLO1FBQVMsaUJBQVksR0FBWixZQUFZLENBQW1CO0lBQUcsQ0FBQztDQUM3RTtBQUZELHdDQUVDO0FBQ0QsTUFBYSx3QkFBd0I7SUFDakMsWUFBbUIsTUFBYTtRQUFiLFdBQU0sR0FBTixNQUFNLENBQU87SUFBRyxDQUFDO0NBQ3ZD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