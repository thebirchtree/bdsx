"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelWeatherChangeEvent = exports.LevelTickEvent = exports.LevelSaveEvent = exports.LevelExplodeEvent = void 0;
const assembler_1 = require("../assembler");
const actor_1 = require("../bds/actor");
const block_1 = require("../bds/block");
const blockpos_1 = require("../bds/blockpos");
const level_1 = require("../bds/level");
const common_1 = require("../common");
const decay_1 = require("../decay");
const event_1 = require("../event");
const launcher_1 = require("../launcher");
const makefunc_1 = require("../makefunc");
const nativetype_1 = require("../nativetype");
const prochacker_1 = require("../prochacker");
const util_1 = require("../util");
class LevelExplodeEvent {
    constructor(level, blockSource, entity, position, 
    /** The radius of the explosion in blocks and the amount of damage the explosion deals. */
    power, 
    /** If true, blocks in the explosion radius will be set on fire. */
    causesFire, 
    /** If true, the explosion will destroy blocks in the explosion radius. */
    breaksBlocks, 
    /** A blocks explosion resistance will be capped at this value when an explosion occurs. */
    maxResistance, allowUnderwater) {
        this.level = level;
        this.blockSource = blockSource;
        this.entity = entity;
        this.position = position;
        this.power = power;
        this.causesFire = causesFire;
        this.breaksBlocks = breaksBlocks;
        this.maxResistance = maxResistance;
        this.allowUnderwater = allowUnderwater;
    }
}
exports.LevelExplodeEvent = LevelExplodeEvent;
class LevelSaveEvent {
    constructor(level) {
        this.level = level;
    }
}
exports.LevelSaveEvent = LevelSaveEvent;
class LevelTickEvent {
    constructor(level) {
        this.level = level;
    }
}
exports.LevelTickEvent = LevelTickEvent;
class LevelWeatherChangeEvent {
    constructor(level, rainLevel, rainTime, lightningLevel, lightningTime) {
        this.level = level;
        this.rainLevel = rainLevel;
        this.rainTime = rainTime;
        this.lightningLevel = lightningLevel;
        this.lightningTime = lightningTime;
    }
}
exports.LevelWeatherChangeEvent = LevelWeatherChangeEvent;
function onLevelExplode(level, blockSource, entity, position, power, causesFire, breaksBlocks, maxResistance, allowUnderwater) {
    const event = new LevelExplodeEvent(level, blockSource, entity, position, power, causesFire, breaksBlocks, maxResistance, allowUnderwater);
    const canceled = event_1.events.levelExplode.fire(event) === common_1.CANCEL;
    (0, decay_1.decay)(level);
    if (!canceled) {
        return _onLevelExplode(event.level, event.blockSource, event.entity, event.position, event.power, event.causesFire, event.breaksBlocks, event.maxResistance, event.allowUnderwater);
    }
}
const _onLevelExplode = prochacker_1.procHacker.hooking("?explode@Level@@UEAAXAEAVBlockSource@@PEAVActor@@AEBVVec3@@M_N3M3@Z", nativetype_1.void_t, null, level_1.Level, block_1.BlockSource, actor_1.Actor, blockpos_1.Vec3, nativetype_1.float32_t, nativetype_1.bool_t, nativetype_1.bool_t, nativetype_1.float32_t, nativetype_1.bool_t)(onLevelExplode);
function onLevelSave(level) {
    const event = new LevelSaveEvent(level);
    const canceled = event_1.events.levelSave.fire(event) === common_1.CANCEL;
    (0, decay_1.decay)(level);
    if (!canceled) {
        return _onLevelSave(event.level);
    }
}
const _onLevelSave = prochacker_1.procHacker.hooking("?save@Level@@UEAAXXZ", nativetype_1.void_t, null, level_1.Level)(onLevelSave);
function onLevelTick() {
    const event = new LevelTickEvent(launcher_1.bedrockServer.level);
    event_1.events.levelTick.fire(event);
    (0, util_1._tickCallback)();
}
prochacker_1.procHacker.hookingRawWithCallOriginal("?tick@Level@@UEAAXXZ", makefunc_1.makefunc.np(onLevelTick, nativetype_1.void_t), [assembler_1.Register.rcx], []);
function onLevelWeatherChange(level, rainLevel, rainTime, lightningLevel, lightningTime) {
    const event = new LevelWeatherChangeEvent(level, rainLevel, rainTime, lightningLevel, lightningTime);
    const canceled = event_1.events.levelWeatherChange.fire(event) === common_1.CANCEL;
    (0, decay_1.decay)(level);
    if (!canceled) {
        return _onLevelWeatherChange(event.level, event.rainLevel, event.rainTime, event.lightningLevel, event.lightningTime);
    }
}
const _onLevelWeatherChange = prochacker_1.procHacker.hooking("?updateWeather@Level@@UEAAXMHMH@Z", nativetype_1.void_t, null, level_1.Level, nativetype_1.float32_t, nativetype_1.int32_t, nativetype_1.float32_t, nativetype_1.int32_t)(onLevelWeatherChange);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV2ZWxldmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxldmVsZXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNENBQXdDO0FBQ3hDLHdDQUFxQztBQUNyQyx3Q0FBMkM7QUFDM0MsOENBQXVDO0FBQ3ZDLHdDQUFxQztBQUNyQyxzQ0FBbUM7QUFDbkMsb0NBQWlDO0FBQ2pDLG9DQUFrQztBQUNsQywwQ0FBNEM7QUFDNUMsMENBQXVDO0FBQ3ZDLDhDQUFtRTtBQUNuRSw4Q0FBMkM7QUFDM0Msa0NBQXdDO0FBRXhDLE1BQWEsaUJBQWlCO0lBQzFCLFlBQ1csS0FBWSxFQUNaLFdBQXdCLEVBQ3hCLE1BQWEsRUFDYixRQUFjO0lBQ3JCLDBGQUEwRjtJQUNuRixLQUFhO0lBQ3BCLG1FQUFtRTtJQUM1RCxVQUFtQjtJQUMxQiwwRUFBMEU7SUFDbkUsWUFBcUI7SUFDNUIsMkZBQTJGO0lBQ3BGLGFBQXFCLEVBQ3JCLGVBQXdCO1FBWnhCLFVBQUssR0FBTCxLQUFLLENBQU87UUFDWixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFPO1FBQ2IsYUFBUSxHQUFSLFFBQVEsQ0FBTTtRQUVkLFVBQUssR0FBTCxLQUFLLENBQVE7UUFFYixlQUFVLEdBQVYsVUFBVSxDQUFTO1FBRW5CLGlCQUFZLEdBQVosWUFBWSxDQUFTO1FBRXJCLGtCQUFhLEdBQWIsYUFBYSxDQUFRO1FBQ3JCLG9CQUFlLEdBQWYsZUFBZSxDQUFTO0lBQ2hDLENBQUM7Q0FDUDtBQWhCRCw4Q0FnQkM7QUFFRCxNQUFhLGNBQWM7SUFDdkIsWUFBbUIsS0FBWTtRQUFaLFVBQUssR0FBTCxLQUFLLENBQU87SUFBRyxDQUFDO0NBQ3RDO0FBRkQsd0NBRUM7QUFFRCxNQUFhLGNBQWM7SUFDdkIsWUFBbUIsS0FBWTtRQUFaLFVBQUssR0FBTCxLQUFLLENBQU87SUFBRyxDQUFDO0NBQ3RDO0FBRkQsd0NBRUM7QUFFRCxNQUFhLHVCQUF1QjtJ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