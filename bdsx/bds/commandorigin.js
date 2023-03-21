"use strict";
var ActorCommandOrigin_1, ServerCommandOrigin_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerCommandOrigin = exports.ScriptCommandOrigin = exports.VirtualCommandOrigin = exports.ActorCommandOrigin = exports.PlayerCommandOrigin = exports.CommandOrigin = exports.CommandOriginType = void 0;
const tslib_1 = require("tslib");
const blockpos_1 = require("../bds/blockpos");
const capi_1 = require("../capi");
const common_1 = require("../common");
const core_1 = require("../core");
const mce_1 = require("../mce");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const prochacker_1 = require("../prochacker");
const actor_1 = require("./actor");
const connreq_1 = require("./connreq");
const dimension_1 = require("./dimension");
const level_1 = require("./level");
const nbt_1 = require("./nbt");
const symbols_1 = require("./symbols");
var CommandOriginType;
(function (CommandOriginType) {
    CommandOriginType[CommandOriginType["Player"] = 0] = "Player";
    CommandOriginType[CommandOriginType["CommandBlock"] = 1] = "CommandBlock";
    CommandOriginType[CommandOriginType["MinecartCommandBlock"] = 2] = "MinecartCommandBlock";
    CommandOriginType[CommandOriginType["DevConsole"] = 3] = "DevConsole";
    CommandOriginType[CommandOriginType["Test"] = 4] = "Test";
    CommandOriginType[CommandOriginType["AutomationPlayer"] = 5] = "AutomationPlayer";
    CommandOriginType[CommandOriginType["ClientAutomation"] = 6] = "ClientAutomation";
    CommandOriginType[CommandOriginType["Server"] = 7] = "Server";
    CommandOriginType[CommandOriginType["Entity"] = 8] = "Entity";
    CommandOriginType[CommandOriginType["Virtual"] = 9] = "Virtual";
    CommandOriginType[CommandOriginType["GameArgument"] = 10] = "GameArgument";
    CommandOriginType[CommandOriginType["EntityServer"] = 11] = "EntityServer";
    CommandOriginType[CommandOriginType["Precompiled"] = 12] = "Precompiled";
    CommandOriginType[CommandOriginType["GameMasterEntityServer"] = 13] = "GameMasterEntityServer";
    CommandOriginType[CommandOriginType["Scripting"] = 14] = "Scripting";
})(CommandOriginType = exports.CommandOriginType || (exports.CommandOriginType = {}));
let CommandOrigin = class CommandOrigin extends nativeclass_1.AbstractClass {
    dispose() {
        (0, common_1.abstract)();
    }
    constructWith(vftable, level) {
        this.vftable = vftable;
        this.level = level;
        this.uuid = mce_1.mce.UUID.generate();
    }
    isServerCommandOrigin() {
        return this.vftable.equalsptr(ServerCommandOrigin_vftable);
    }
    /**
     * @deprecated bedrock scripting API is removed.
     */
    isScriptCommandOrigin() {
        return false; // this.vftable.equalsptr(ScriptCommandOrigin_vftable);
    }
    getRequestId() {
        (0, common_1.abstract)();
    }
    /**
     * @remarks Do not call this the second time, assign it to a variable when calling this
     */
    getName() {
        (0, common_1.abstract)();
    }
    getBlockPosition() {
        (0, common_1.abstract)();
    }
    getWorldPosition() {
        (0, common_1.abstract)();
    }
    getLevel() {
        (0, common_1.abstract)();
    }
    getOriginType() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the dimension of the received command
     */
    getDimension() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the entity that send the command
     * @remarks Null if the command origin is the console
     */
    getEntity() {
        (0, common_1.abstract)();
    }
    /**
     * return the command result
     */
    handleCommandOutputCallback(value, statusCode, statusMessage) {
        if (statusCode == null)
            statusCode = value.statusCode;
        if (statusMessage == null)
            statusMessage = value.statusMessage;
        const v = capi_1.capi.malloc(connreq_1.JsonValue[nativetype_1.NativeType.size]).as(connreq_1.JsonValue);
        v.constructWith(value);
        handleCommandOutputCallback.call(this, statusCode, statusMessage, v);
        v.destruct();
        capi_1.capi.free(v);
    }
    save(tag) {
        (0, common_1.abstract)();
    }
    allocateAndSave() {
        const tag = nbt_1.CompoundTag.allocate();
        this.save(tag);
        return tag;
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], CommandOrigin.prototype, "vftable", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(mce_1.mce.UUID)
], CommandOrigin.prototype, "uuid", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(level_1.ServerLevel.ref())
], CommandOrigin.prototype, "level", void 0);
CommandOrigin = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], CommandOrigin);
exports.CommandOrigin = CommandOrigin;
let PlayerCommandOrigin = class PlayerCommandOrigin extends CommandOrigin {
};
PlayerCommandOrigin = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], PlayerCommandOrigin);
exports.PlayerCommandOrigin = PlayerCommandOrigin;
let ActorCommandOrigin = ActorCommandOrigin_1 = class ActorCommandOrigin extends CommandOrigin {
    // Actor*(*getEntity)(CommandOrigin* origin);
    static constructWith(actor) {
        const origin = new ActorCommandOrigin_1(true);
        ActorCommandOrigin$ActorCommandOrigin(origin, actor);
        return origin;
    }
    static allocateWith(actor) {
        const origin = capi_1.capi.malloc(ActorCommandOrigin_1[nativetype_1.NativeType.size]).as(ActorCommandOrigin_1);
        ActorCommandOrigin$ActorCommandOrigin(origin, actor);
        return origin;
    }
};
ActorCommandOrigin = ActorCommandOrigin_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x28)
], ActorCommandOrigin);
exports.ActorCommandOrigin = ActorCommandOrigin;
const ActorCommandOrigin$ActorCommandOrigin = prochacker_1.procHacker.js("??0ActorCommandOrigin@@QEAA@AEAVActor@@@Z", nativetype_1.void_t, null, ActorCommandOrigin, actor_1.Actor);
let VirtualCommandOrigin = class VirtualCommandOrigin extends CommandOrigin {
    static allocateWith(origin, actor, cmdPos) {
        (0, common_1.abstract)();
    }
    static constructWith(origin, actor, cmdPos) {
        (0, common_1.abstract)();
    }
};
VirtualCommandOrigin = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x50)
], VirtualCommandOrigin);
exports.VirtualCommandOrigin = VirtualCommandOrigin;
/**
 * @deprecated bedrock scripting API is removed.
 */
let ScriptCommandOrigin = class ScriptCommandOrigin extends PlayerCommandOrigin {
};
ScriptCommandOrigin = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ScriptCommandOrigin);
exports.ScriptCommandOrigin = ScriptCommandOrigin;
let ServerCommandOrigin = ServerCommandOrigin_1 = class ServerCommandOrigin extends CommandOrigin {
    static constructWith(requestId, level, permissionLevel, dimension) {
        var _a;
        const ptr = new ServerCommandOrigin_1(true);
        ServerCommandOrigin$ServerCommandOrigin(ptr, requestId, level, permissionLevel, (_a = dimension === null || dimension === void 0 ? void 0 : dimension.getDimensionId()) !== null && _a !== void 0 ? _a : actor_1.DimensionId.Overworld);
        return ptr;
    }
    static allocateWith(requestId, level, permissionLevel, dimension) {
        var _a;
        const ptr = capi_1.capi.malloc(ServerCommandOrigin_1[nativetype_1.NativeType.size]).as(ServerCommandOrigin_1);
        ServerCommandOrigin$ServerCommandOrigin(ptr, requestId, level, permissionLevel, (_a = dimension === null || dimension === void 0 ? void 0 : dimension.getDimensionId()) !== null && _a !== void 0 ? _a : actor_1.DimensionId.Overworld);
        return ptr;
    }
};
ServerCommandOrigin = ServerCommandOrigin_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x48)
], ServerCommandOrigin);
exports.ServerCommandOrigin = ServerCommandOrigin;
const ServerCommandOrigin$ServerCommandOrigin = prochacker_1.procHacker.js("??0ServerCommandOrigin@@QEAA@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEAVServerLevel@@W4CommandPermissionLevel@@V?$AutomaticID@VDimension@@H@@@Z", nativetype_1.void_t, null, ServerCommandOrigin, nativetype_1.CxxString, level_1.ServerLevel, nativetype_1.int32_t, nativetype_1.int32_t);
const ServerCommandOrigin_vftable = symbols_1.proc["??_7ServerCommandOrigin@@6B@"];
CommandOrigin.prototype[nativetype_1.NativeType.dtor] = nativeclass_1.vectorDeletingDestructor;
// std::string& CommandOrigin::getRequestId();
CommandOrigin.prototype.getRequestId = prochacker_1.procHacker.jsv("??_7ServerCommandOrigin@@6B@", "?getRequestId@ServerCommandOrigin@@UEBAAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@XZ", nativetype_1.CxxString, { this: CommandOrigin });
// std::string CommandOrigin::getName();
CommandOrigin.prototype.getName = prochacker_1.procHacker.jsv("??_7ServerCommandOrigin@@6B@", "?getName@ServerCommandOrigin@@UEBA?AV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@XZ", nativetype_1.CxxString, { this: CommandOrigin, structureReturn: true });
// BlockPos CommandOrigin::getBlockPosition();
CommandOrigin.prototype.getBlockPosition = prochacker_1.procHacker.jsv("??_7ServerCommandOrigin@@6B@", "?getBlockPosition@ServerCommandOrigin@@UEBA?AVBlockPos@@XZ", blockpos_1.BlockPos, {
    this: CommandOrigin,
    structureReturn: true,
});
// Vec3 CommandOrigin::getWorldPosition();
CommandOrigin.prototype.getWorldPosition = prochacker_1.procHacker.jsv("??_7ServerCommandOrigin@@6B@", "?getWorldPosition@ServerCommandOrigin@@UEBA?AVVec3@@XZ", blockpos_1.Vec3, {
    this: CommandOrigin,
    structureReturn: true,
});
// std::optional<Vec2> CommandOrigin::getRotation();
// Level* CommandOrigin::getLevel();
CommandOrigin.prototype.getLevel = prochacker_1.procHacker.jsv("??_7ServerCommandOrigin@@6B@", "?getLevel@ServerCommandOrigin@@UEBAPEAVLevel@@XZ", level_1.Level, {
    this: CommandOrigin,
});
// Dimension* (*CommandOrigin::getDimension)();
CommandOrigin.prototype.getDimension = prochacker_1.procHacker.jsv("??_7ServerCommandOrigin@@6B@", "?getDimension@ServerCommandOrigin@@UEBAPEAVDimension@@XZ", dimension_1.Dimension, {
    this: CommandOrigin,
});
// Actor* CommandOrigin::getEntity();
CommandOrigin.prototype.getEntity = prochacker_1.procHacker.jsv("??_7ServerCommandOrigin@@6B@", "?getEntity@ServerCommandOrigin@@UEBAPEAVActor@@XZ", actor_1.Actor, {
    this: CommandOrigin,
});
// enum CommandOriginType CommandOrigin::getOriginType();
CommandOrigin.prototype.getOriginType = prochacker_1.procHacker.jsv("??_7ServerCommandOrigin@@6B@", "?getOriginType@ServerCommandOrigin@@UEBA?AW4CommandOriginType@@XZ", nativetype_1.uint8_t, { this: CommandOrigin });
// void CommandOrigin::handleCommandOutputCallback(int, std::string &&, Json::Value &&) const
const handleCommandOutputCallback = prochacker_1.procHacker.jsv("??_7ScriptCommandOrigin@@6B@", "?handleCommandOutputCallback@ScriptCommandOrigin@@UEBAXH$$QEAV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@$$QEAVValue@Json@@@Z", nativetype_1.void_t, { this: CommandOrigin }, nativetype_1.int32_t, nativetype_1.CxxString, connreq_1.JsonValue);
// struct CompoundTag CommandOrigin::serialize(void)
const serializeCommandOrigin = prochacker_1.procHacker.jsv("??_7ServerCommandOrigin@@6B@", "?serialize@ServerCommandOrigin@@UEBA?AVCompoundTag@@XZ", nbt_1.CompoundTag, { this: CommandOrigin }, nbt_1.CompoundTag);
CommandOrigin.prototype.save = function (tag) {
    if (tag != null) {
        return serializeCommandOrigin.call(this, tag);
    }
    tag = nbt_1.CompoundTag.allocate();
    if (!serializeCommandOrigin.call(this, tag))
        return null;
    const res = tag.value();
    tag.dispose();
    return res;
};
ServerCommandOrigin.prototype[nativetype_1.NativeType.dtor] = nativeclass_1.vectorDeletingDestructor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZG9yaWdpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbW1hbmRvcmlnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4Q0FBaUQ7QUFDakQsa0NBQStCO0FBRS9CLHNDQUFxQztBQUNyQyxrQ0FBc0M7QUFDdEMsZ0NBQTZCO0FBQzdCLGdEQUFtRztBQUNuRyw4Q0FBZ0Y7QUFDaEYsOENBQTJDO0FBQzNDLG1DQUE2QztBQUU3Qyx1Q0FBc0M7QUFDdEMsMkNBQXdDO0FBQ3hDLG1DQUE2QztBQUM3QywrQkFBb0M7QUFDcEMsdUNBQWlDO0FBRWpDLElBQVksaUJBZ0JYO0FBaEJELFdBQVksaUJBQWlCO0lBQ3pCLDZEQUFNLENBQUE7SUFDTix5RUFBWSxDQUFBO0lBQ1oseUZBQW9CLENBQUE7SUFDcEIscUVBQVUsQ0FBQTtJQUNWLHlEQUFJLENBQUE7SUFDSixpRkFBZ0IsQ0FBQTtJQUNoQixpRkFBZ0IsQ0FBQTtJQUNoQiw2REFBTSxDQUFBO0lBQ04sNkRBQU0sQ0FBQTtJQUNOLCtEQUFPLENBQUE7SUFDUCwwRUFBWSxDQUFBO0lBQ1osMEVBQVksQ0FBQTtJQUNaLHdFQUFXLENBQUE7SUFDWCw4RkFBc0IsQ0FBQTtJQUN0QixvRUFBUyxDQUFBO0FBQ2IsQ0FBQyxFQWhCVyxpQkFBaUIsR0FBakIseUJBQWlCLEtBQWpCLHlCQUFpQixRQWdCNUI7QUFHTSxJQUFNLGFBQWEsR0FBbkIsTUFBTSxhQUFjLFNBQVEsMkJBQWE7SUFRNUMsT0FBTztRQUNILElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFvQixFQUFFLEtBQWtCO1FBQ2xELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQyxDQUFD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