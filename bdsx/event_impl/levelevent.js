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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV2ZWxldmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxldmVsZXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNENBQXdDO0FBQ3hDLHdDQUFxQztBQUNyQyx3Q0FBMkM7QUFDM0MsOENBQXVDO0FBQ3ZDLHdDQUFxQztBQUNyQyxzQ0FBbUM7QUFDbkMsb0NBQWlDO0FBQ2pDLG9DQUFrQztBQUNsQywwQ0FBNEM7QUFDNUMsMENBQXVDO0FBQ3ZDLDhDQUFtRTtBQUNuRSw4Q0FBMkM7QUFFM0MsTUFBYSxpQkFBaUI7SUFDMUIsWUFDVyxLQUFZLEVBQ1osV0FBd0IsRUFDeEIsTUFBYSxFQUNiLFFBQWM7SUFDckIsMEZBQTBGO0lBQ25GLEtBQWE7SUFDcEIsbUVBQW1FO0lBQzVELFVBQW1CO0lBQzFCLDBFQUEwRTtJQUNuRSxZQUFxQjtJQUM1QiwyRkFBMkY7SUFDcEYsYUFBcUIsRUFDckIsZUFBd0I7UUFaeEIsVUFBSyxHQUFMLEtBQUssQ0FBTztRQUNaLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFdBQU0sR0FBTixNQUFNLENBQU87UUFDYixhQUFRLEdBQVIsUUFBUSxDQUFNO1FBRWQsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUViLGVBQVUsR0FBVixVQUFVLENBQVM7UUFFbkIsaUJBQVksR0FBWixZQUFZLENBQVM7UUFFckIsa0JBQWEsR0FBYixhQUFhLENBQVE7UUFDckIsb0JBQWUsR0FBZixlQUFlLENBQVM7SUFDaEMsQ0FBQztDQUNQO0FBaEJELDhDQWdCQztBQUVELE1BQWEsY0FBYztJQUN2QixZQUFtQixLQUFZO1FBQVosVUFBSyxHQUFMLEtBQUssQ0FBTztJQUFHLENBQUM7Q0FDdEM7QUFGRCx3Q0FFQztBQUVELE1BQWEsY0FBYztJQUN2QixZQUFtQixLQUFZO1FBQVosVUFBSyxHQUFMLEtBQUssQ0FBTztJQUFHLENBQUM7Q0FDdEM7QUFGRCx3Q0FFQztBQUVELE1BQWEsdUJBQXVCO0lBQ2hDLFlBQW1CLEtB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