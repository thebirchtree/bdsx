"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = void 0;
const asmcode_1 = require("./asm/asmcode");
const common_1 = require("./common");
const eventtarget_1 = require("./eventtarget");
const source_map_support_1 = require("./source-map-support");
const PACKET_ID_COUNT = 0x100;
const PACKET_EVENT_COUNT = 0x500;
const enabledPacket = asmcode_1.asmcode.addressof_enabledPacket;
enabledPacket.fill(0, 256);
class PacketEvent extends eventtarget_1.Event {
    constructor(id) {
        super();
        this.id = id;
    }
}
function getNetEventTarget(type, packetId) {
    if (packetId >>> 0 >= PACKET_ID_COUNT) {
        throw Error(`Out of range: packetId < 0x100 (packetId=${packetId})`);
    }
    const idx = type * PACKET_ID_COUNT + packetId;
    let target = packetAllTargets[idx];
    if (target !== null)
        return target;
    packetAllTargets[idx] = target = new PacketEvent(packetId);
    target.setInstaller(() => {
        const packetId = target.id;
        enabledPacket.setUint8(enabledPacket.getUint8(packetId) + 1, packetId);
    }, () => {
        const packetId = target.id;
        enabledPacket.setUint8(enabledPacket.getUint8(packetId) - 1, packetId);
    });
    return target;
}
const packetAllTargets = new Array(PACKET_EVENT_COUNT);
for (let i = 0; i < PACKET_EVENT_COUNT; i++) {
    packetAllTargets[i] = null;
}
var events;
(function (events) {
    ////////////////////////////////////////////////////////
    // Block events
    /** Cancellable */
    events.blockDestroy = new eventtarget_1.Event();
    /** Not cancellable */
    events.blockDestructionStart = new eventtarget_1.Event();
    /** Cancellable */
    events.blockPlace = new eventtarget_1.Event();
    /** Not cancellable */
    events.pistonMove = new eventtarget_1.Event();
    /** Cancellable */
    events.farmlandDecay = new eventtarget_1.Event();
    /** Cancellable but requires additional stimulation */
    events.campfireLight = new eventtarget_1.Event();
    /** Cancellable but requires additional stimulation */
    events.campfireDouse = new eventtarget_1.Event();
    /** Cancellable but the client will have the motion and sound*/
    events.buttonPress = new eventtarget_1.Event();
    /** Cancellable.
     * Triggered when a player opens a chest. Cancelling this event will prevent the player from opening the chest.
     * To note : This event works for all chest types (normal chests, trapped chests, ender chests).
     */
    events.chestOpen = new eventtarget_1.Event();
    /** Cancellable.
     * Triggered when 2 chests are paired to form a double chest. Cancelling this event will prevent the chests from pairing.
     * To note : This event works for all chest types that can be doubled (normal chests, trapped chests).
     */
    events.chestPair = new eventtarget_1.Event();
    /** Cancellable but only in a few cases (e.g. interacting with the blocks such as anvil, grindstone, enchanting table, etc.*/
    events.blockInteractedWith = new eventtarget_1.Event();
    /** Not cancellable */
    events.projectileHitBlock = new eventtarget_1.Event();
    /** Not cancellable */
    events.lightningHitBlock = new eventtarget_1.Event();
    /** Not cancellable */
    events.fallOnBlock = new eventtarget_1.Event();
    /** Cancellable but only when the player is not in creative mode */
    events.attackBlock = new eventtarget_1.Event();
    /** Cancellable */
    events.sculkShriek = new eventtarget_1.Event();
    /** Cancellable */
    events.sculkSensorActivate = new eventtarget_1.Event();
    ////////////////////////////////////////////////////////
    // Entity events
    /** Cancellable */
    events.entityHurt = new eventtarget_1.Event();
    /** Not cancellable */
    events.entityHealthChange = new eventtarget_1.Event();
    /**
     * Not cancellable.
     * it can be occurred multiple times even it already died.
     */
    events.entityDie = new eventtarget_1.Event();
    /** Not cancellable */
    events.entitySneak = new eventtarget_1.Event();
    /** Cancellable */
    events.entityStartSwimming = new eventtarget_1.Event();
    /** Cancellable */
    events.entityStartRiding = new eventtarget_1.Event();
    /** Cancellable but the client is still exiting though it will automatically ride again after rejoin */
    events.entityStopRiding = new eventtarget_1.Event();
    /**
     * Not cancellable
     * **NOT IMPLEMENTED**
     */
    events.entityCarriedItemChanged = new eventtarget_1.Event();
    /** Cancellable */
    events.playerAttack = new eventtarget_1.Event();
    /** Cancellable */
    events.playerInteract = new eventtarget_1.Event();
    /** Cancellable */
    events.playerDropItem = new eventtarget_1.Event();
    /** Not cancellable */
    events.playerInventoryChange = new eventtarget_1.Event();
    /** Not cancellable */
    events.playerRespawn = new eventtarget_1.Event();
    /** Cancellable */
    events.playerLevelUp = new eventtarget_1.Event();
    /** Not cancellable */
    events.entityCreated = new eventtarget_1.Event();
    /** Not cancellable */
    events.playerJoin = new eventtarget_1.Event();
    /** Not cancellable */
    events.playerLeft = new eventtarget_1.Event();
    /** Cancellable */
    events.playerPickupItem = new eventtarget_1.Event();
    /** Not cancellable */
    events.playerCrit = new eventtarget_1.Event();
    /** Not cancellable.
     * Triggered when a player finishes consuming an item.
     * (e.g : food, potion, etc...)
     */
    events.playerUseItem = new eventtarget_1.Event();
    /** Cancellable.
     * Triggered when a player uses an item. Cancelling this event will prevent the item from being used.
     * (e.g : splash potion won't be thrown, food won't be consumed, etc...)
     * To note : this event is triggered with every item, even if they are not consumable.
     *
     * @remarks use `itemUseOnBlock` to cancel the usage of an item on a block (e.g : flint and steel)
     */
    events.itemUse = new eventtarget_1.Event();
    /** Cancellable.
     * Triggered when a player uses an item on a block. Cancelling this event will prevent the item from being used
     * (e.g : flint and steel won't ignite block, seeds won't be planted, etc...)
     * To note : this event is triggered with every item, even if they are not usable on blocks.
     */
    events.itemUseOnBlock = new eventtarget_1.Event();
    /** Cancellable */
    events.splashPotionHit = new eventtarget_1.Event();
    /** Not cancellable */
    events.projectileShoot = new eventtarget_1.Event();
    /** Not cancellable */
    events.projectileHit = new eventtarget_1.Event();
    /** Cancellable
     * Triggered when a player sleeps in a bed.
     * Cancelling this event will prevent the player from sleeping.
     */
    events.playerSleepInBed = new eventtarget_1.Event();
    /** Not cancellable */
    events.playerJump = new eventtarget_1.Event();
    /** Not cancellable */
    events.entityConsumeTotem = new eventtarget_1.Event();
    /** Cancellable
     * Triggered when a player changes dimension.
     * Cancelling this event will prevent the player from changing dimension (e.g : entering a nether portal).
     */
    events.playerDimensionChange = new eventtarget_1.Event();
    /** Cancellable.
     * Triggered when an entity has knockback applied to them (e.g : being hit by another entity).
     * Cancelling this event will prevent the knockback from being applied.
     */
    events.entityKnockback = new eventtarget_1.Event();
    ////////////////////////////////////////////////////////
    // Level events
    /** Cancellable */
    events.levelExplode = new eventtarget_1.Event();
    /** Not cancellable */
    events.levelTick = new eventtarget_1.Event();
    /** Cancellable but you won't be able to stop the server */
    events.levelSave = new eventtarget_1.Event();
    /** Cancellable */
    events.levelWeatherChange = new eventtarget_1.Event();
    ////////////////////////////////////////////////////////
    // Server events
    /**
     * before launched. after execute the main thread of BDS.
     * BDS will be loaded on the separated thread. this event will be executed concurrently with the BDS loading
     * Usual scripts are no need to use this event. it's for plugin scripts that are loaded before BDS.
     */
    events.serverLoading = new eventtarget_1.Event();
    /**
     * after BDS launched
     * Usual scripts are no need to use this event. it's for plugin scripts that are loaded before BDS.
     * or `bedrockServer.afterOpen().then(callback)` is usable for both situation.
     */
    events.serverOpen = new eventtarget_1.Event();
    /**
     * on internal update. but it's not tick.
     * @deprecated useless and incomprehensible
     */
    events.serverUpdate = new eventtarget_1.Event();
    /**
     * before serverStop, Minecraft is alive yet
     * LoopbackPacketSender is alive yet
     */
    events.serverLeave = new eventtarget_1.Event();
    /**
     * before system.shutdown, Minecraft is alive yet
     * LoopbackPacketSender is destroyed
     * some commands are failed on this event. use `events.serverLeave` instead.
     */
    events.serverStop = new eventtarget_1.Event();
    /**
     * after BDS closed
     */
    events.serverClose = new eventtarget_1.Event();
    /**
     * server console outputs
     */
    events.serverLog = new eventtarget_1.Event();
    ////////////////////////////////////////////////////////
    // Packet events
    let PacketEventType;
    (function (PacketEventType) {
        PacketEventType[PacketEventType["Raw"] = 0] = "Raw";
        PacketEventType[PacketEventType["Before"] = 1] = "Before";
        PacketEventType[PacketEventType["After"] = 2] = "After";
        PacketEventType[PacketEventType["Send"] = 3] = "Send";
        PacketEventType[PacketEventType["SendRaw"] = 4] = "SendRaw";
    })(PacketEventType = events.PacketEventType || (events.PacketEventType = {}));
    function packetEvent(type, packetId) {
        if (packetId >>> 0 >= PACKET_ID_COUNT) {
            console.error(`Out of range: packetId < 0x100 (type=${PacketEventType[type]}, packetId=${packetId})`);
            return null;
        }
        const id = type * PACKET_ID_COUNT + packetId;
        return packetAllTargets[id];
    }
    events.packetEvent = packetEvent;
    /**
     * before 'before' and 'after'
     * earliest event for the packet receiving.
     * It will bring raw packet buffers before parsing
     * It can be canceled the packet if you return 'CANCEL'
     */
    function packetRaw(id) {
        return getNetEventTarget(PacketEventType.Raw, id);
    }
    events.packetRaw = packetRaw;
    /**
     * after 'raw', before 'after'
     * the event that before processing but after parsed from raw.
     * It can be canceled the packet if you return 'CANCEL'
     */
    function packetBefore(id) {
        return getNetEventTarget(PacketEventType.Before, id);
    }
    events.packetBefore = packetBefore;
    /**
     * after 'raw' and 'before'
     * the event that after processing. some fields are assigned after the processing
     */
    function packetAfter(id) {
        return getNetEventTarget(PacketEventType.After, id);
    }
    events.packetAfter = packetAfter;
    /**
     * before serializing.
     * it can modify class fields.
     */
    function packetSend(id) {
        return getNetEventTarget(PacketEventType.Send, id);
    }
    events.packetSend = packetSend;
    /**
     * after serializing. before sending.
     * it can access serialized buffer.
     */
    function packetSendRaw(id) {
        return getNetEventTarget(PacketEventType.SendRaw, id);
    }
    events.packetSendRaw = packetSendRaw;
    ////////////////////////////////////////////////////////
    // Misc
    /** Not cancellable */
    events.queryRegenerate = new eventtarget_1.Event();
    /** Cancellable */
    events.scoreReset = new eventtarget_1.Event();
    /** Cancellable */
    events.scoreSet = new eventtarget_1.Event();
    /** Cancellable */
    events.scoreAdd = new eventtarget_1.Event();
    /** Cancellable */
    events.scoreRemove = new eventtarget_1.Event();
    /** Cancellable */
    events.objectiveCreate = new eventtarget_1.Event();
    /**
     * global error listeners
     * if returns 'CANCEL', then default error printing is disabled
     */
    events.error = eventtarget_1.Event.errorHandler;
    function errorFire(err) {
        if (err instanceof Error) {
            (0, source_map_support_1.remapError)(err);
        }
        if (events.error.fire(err) !== common_1.CANCEL) {
            (0, source_map_support_1.remapAndPrintError)(err);
        }
    }
    events.errorFire = errorFire;
    /**
     * command console outputs
     */
    events.commandOutput = new eventtarget_1.Event();
    /**
     * command input
     * Commands will be canceled if you return a error code.
     * 0 means success for error codes but others are unknown.
     */
    events.command = new eventtarget_1.Event();
    /**
     * network identifier disconnected
     */
    events.networkDisconnected = new eventtarget_1.Event();
})(events = exports.events || (exports.events = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJldmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwyQ0FBd0M7QUFJeEMscUNBQWtDO0FBQ2xDLCtDQUFzQztBQXVEdEMsNkRBQXNFO0FBRXRFLE1BQU0sZUFBZSxHQUFHLEtBQUssQ0FBQztBQUM5QixNQUFNLGtCQUFrQixHQUFHLEtBQUssQ0FBQztBQUVqQyxNQUFNLGFBQWEsR0FBRyxpQkFBTyxDQUFDLHVCQUF1QixDQUFDO0FBQ3RELGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBRTNCLE1BQU0sV0FBWSxTQUFRLG1CQUF3QztJQUM5RCxZQUE0QixFQUFVO1FBQ2xDLEtBQUssRUFBRSxDQUFDO1FBRGdCLE9BQUUsR0FBRixFQUFFLENBQVE7SUFFdEMsQ0FBQztDQUNKO0FBRUQsU0FBUyxpQkFBaUIsQ0FBQyxJQUE0QixFQUFFLFFBQTRCO0lBQ2pGLElBQUksUUFBUSxLQUFLLENBQUMsSUFBSSxlQUFlLEVBQUU7UUFDbkMsTUFBTSxLQUFLLENBQUMsNENBQTRDLFFBQVEsR0FBRyxDQUFDLENBQUM7S0FDeEU7SUFDRCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsZUFBZSxHQUFHLFFBQVEsQ0FBQztJQUM5QyxJQUFJLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQyxJQUFJLE1BQU0sS0FBSyxJQUFJO1FBQUUsT0FBTyxNQUFNLENBQUM7SUFDbkMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNELE1BQU0sQ0FBQyxZQUFZLENBQ2YsR0FBRyxFQUFFO1FBQ0QsTUFBTSxRQUFRLEdBQUcsTUFBTyxDQUFDLEVBQUUsQ0FBQztRQUM1QixhQUFhLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdB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