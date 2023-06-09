"use strict";
var ScoreboardId_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreCommandOperator = exports.PlayerScoreSetFunction = exports.ObjectiveSortOrder = exports.DisplaySlot = exports.ScoreboardIdentityRef = exports.ScoreInfo = exports.ScoreboardId = exports.IdentityDefinition = exports.DisplayObjective = exports.Objective = exports.ObjectiveCriteria = exports.Scoreboard = void 0;
const tslib_1 = require("tslib");
const bin_1 = require("../bin");
const common_1 = require("../common");
const core_1 = require("../core");
const cxxvector_1 = require("../cxxvector");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const actor_1 = require("./actor");
const symbols_1 = require("./symbols");
class Scoreboard extends nativeclass_1.AbstractClass {
    /**
     * Resends the scoreboard to all clients
     */
    sync(id, objective) {
        (0, common_1.abstract)();
    }
    addObjective(name, displayName, criteria) {
        (0, common_1.abstract)();
    }
    createScoreboardId(name) {
        (0, common_1.abstract)();
    }
    getCriteria(name) {
        (0, common_1.abstract)();
    }
    getDisplayObjective(displaySlot) {
        (0, common_1.abstract)();
    }
    getObjectiveNames() {
        (0, common_1.abstract)();
    }
    getObjective(name) {
        (0, common_1.abstract)();
    }
    getObjectives() {
        (0, common_1.abstract)();
    }
    getActorScoreboardId(actor) {
        (0, common_1.abstract)();
    }
    getFakePlayerScoreboardId(name) {
        (0, common_1.abstract)();
    }
    getPlayerScoreboardId(player) {
        (0, common_1.abstract)();
    }
    getScoreboardIdentityRef(id) {
        (0, common_1.abstract)();
    }
    _getScoreboardIdentityRefs(retstr) {
        (0, common_1.abstract)();
    }
    getScoreboardIdentityRefs() {
        const arr = this._getScoreboardIdentityRefs(CxxVector$ScoreboardIdentityRef.construct());
        const retval = arr.toArray();
        arr.destruct();
        return retval;
    }
    _getTrackedIds(retstr) {
        (0, common_1.abstract)();
    }
    getTrackedIds() {
        const arr = this._getTrackedIds(CxxVector$ScoreboardId.construct());
        const retval = arr.toArray();
        arr.destruct();
        return retval;
    }
    removeObjective(objective) {
        (0, common_1.abstract)();
    }
    clearDisplayObjective(displaySlotName) {
        (0, common_1.abstract)();
    }
    setDisplayObjective(displaySlot, objective, order) {
        (0, common_1.abstract)();
    }
    getPlayerScore(id, objective) {
        const score = objective.getPlayerScore(id);
        if (score.valid) {
            const retval = score.value;
            score.destruct();
            return retval;
        }
        score.destruct();
        return null;
    }
    resetPlayerScore(id, objective) {
        (0, common_1.abstract)();
    }
    setPlayerScore(id, objective, value) {
        const retval = this.getScoreboardIdentityRef(id).modifyScoreInObjective(objective, value, PlayerScoreSetFunction.Set);
        this.sync(id, objective);
        return retval;
    }
    addPlayerScore(id, objective, value) {
        const retval = this.getScoreboardIdentityRef(id).modifyScoreInObjective(objective, value, PlayerScoreSetFunction.Add);
        this.sync(id, objective);
        return retval;
    }
    removePlayerScore(id, objective, value) {
        const retval = this.getScoreboardIdentityRef(id).modifyScoreInObjective(objective, value, PlayerScoreSetFunction.Subtract);
        this.sync(id, objective);
        return retval;
    }
}
exports.Scoreboard = Scoreboard;
let ObjectiveCriteria = class ObjectiveCriteria extends nativeclass_1.AbstractClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], ObjectiveCriteria.prototype, "name", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], ObjectiveCriteria.prototype, "readOnly", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], ObjectiveCriteria.prototype, "renderType", void 0);
ObjectiveCriteria = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ObjectiveCriteria);
exports.ObjectiveCriteria = ObjectiveCriteria;
let Objective = class Objective extends nativeclass_1.AbstractClass {
    getPlayers() {
        (0, common_1.abstract)();
    }
    getPlayerScore(id) {
        (0, common_1.abstract)();
    }
    getName() {
        (0, common_1.abstract)();
    }
    getDisplayName() {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString, 0x40) // accessed in Objective::getName()
], Objective.prototype, "name", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], Objective.prototype, "displayName", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(ObjectiveCriteria.ref())
], Objective.prototype, "criteria", void 0);
Objective = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], Objective);
exports.Objective = Objective;
let DisplayObjective = class DisplayObjective extends nativeclass_1.AbstractClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(Objective.ref())
], DisplayObjective.prototype, "objective", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], DisplayObjective.prototype, "order", void 0);
DisplayObjective = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], DisplayObjective);
exports.DisplayObjective = DisplayObjective;
class IdentityDefinition extends nativeclass_1.AbstractClass {
    getEntityId() {
        (0, common_1.abstract)();
    }
    getPlayerId() {
        (0, common_1.abstract)();
    }
    getFakePlayerName() {
        (0, common_1.abstract)();
    }
    getIdentityType() {
        (0, common_1.abstract)();
    }
    getName() {
        switch (this.getIdentityType()) {
            case IdentityDefinition.Type.Entity: {
                // BDSX reads int64 as uint64, so we have to manually handle it since ActorUniqueID is signed and negative
                const a = bin_1.bin.sub(bin_1.bin.make64(4294967295, 4294967295), this.getEntityId());
                const b = bin_1.bin.add(a, bin_1.bin.make64(1, 0));
                return "-" + bin_1.bin.toString(b);
            }
            case IdentityDefinition.Type.Player: {
                const actor = actor_1.Actor.fromUniqueIdBin(this.getPlayerId());
                if (actor) {
                    return actor.getNameTag();
                }
                else {
                    // Player Offline
                    return null;
                }
            }
            case IdentityDefinition.Type.FakePlayer:
                return this.getFakePlayerName();
            default:
                return null;
        }
    }
}
exports.IdentityDefinition = IdentityDefinition;
(function (IdentityDefinition) {
    let Type;
    (function (Type) {
        Type[Type["Invalid"] = 0] = "Invalid";
        Type[Type["Player"] = 1] = "Player";
        Type[Type["Entity"] = 2] = "Entity";
        Type[Type["FakePlayer"] = 3] = "FakePlayer";
    })(Type = IdentityDefinition.Type || (IdentityDefinition.Type = {}));
})(IdentityDefinition = exports.IdentityDefinition || (exports.IdentityDefinition = {}));
let ScoreboardId = ScoreboardId_1 = class ScoreboardId extends nativeclass_1.NativeClass {
    isValid() {
        (0, common_1.abstract)();
    }
};
ScoreboardId.INVALID = symbols_1.proc["?INVALID@ScoreboardId@@2U1@A"].as(ScoreboardId_1);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bin64_t)
], ScoreboardId.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int64_as_float_t, 0)
], ScoreboardId.prototype, "idAsNumber", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(IdentityDefinition.ref())
], ScoreboardId.prototype, "identityDef", void 0);
ScoreboardId = ScoreboardId_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], ScoreboardId);
exports.ScoreboardId = ScoreboardId;
const CxxVector$ScoreboardId = cxxvector_1.CxxVector.make(ScoreboardId);
let ScoreInfo = class ScoreInfo extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(Objective.ref())
], ScoreInfo.prototype, "objective", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], ScoreInfo.prototype, "valid", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t, 0x0c)
], ScoreInfo.prototype, "value", void 0);
ScoreInfo = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], ScoreInfo);
exports.ScoreInfo = ScoreInfo;
let ScoreboardIdentityRef = class ScoreboardIdentityRef extends nativeclass_1.NativeClass {
    _modifyScoreInObjective(result, objective, score, action) {
        (0, common_1.abstract)();
    }
    modifyScoreInObjective(objective, score, action) {
        const result = new core_1.AllocatedPointer(4);
        this._modifyScoreInObjective(result, objective, score, action);
        const retval = result.getInt32();
        return retval;
    }
    getIdentityType() {
        (0, common_1.abstract)();
    }
    /**
     * Returns INVALID id for players
     */
    getEntityId() {
        (0, common_1.abstract)();
    }
    getPlayerId() {
        (0, common_1.abstract)();
    }
    getFakePlayerName() {
        return this.scoreboardId.identityDef.getFakePlayerName();
    }
    getScoreboardId() {
        (0, common_1.abstract)();
    }
    isPlayerType() {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], ScoreboardIdentityRef.prototype, "objectiveReferences", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(ScoreboardId)
], ScoreboardIdentityRef.prototype, "scoreboardId", void 0);
ScoreboardIdentityRef = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], ScoreboardIdentityRef);
exports.ScoreboardIdentityRef = ScoreboardIdentityRef;
const CxxVector$ScoreboardIdentityRef = cxxvector_1.CxxVector.make(ScoreboardIdentityRef);
var DisplaySlot;
(function (DisplaySlot) {
    DisplaySlot["BelowName"] = "belowname";
    DisplaySlot["List"] = "list";
    DisplaySlot["Sidebar"] = "sidebar";
})(DisplaySlot = exports.DisplaySlot || (exports.DisplaySlot = {}));
var ObjectiveSortOrder;
(function (ObjectiveSortOrder) {
    ObjectiveSortOrder[ObjectiveSortOrder["Ascending"] = 0] = "Ascending";
    ObjectiveSortOrder[ObjectiveSortOrder["Descending"] = 1] = "Descending";
})(ObjectiveSortOrder = exports.ObjectiveSortOrder || (exports.ObjectiveSortOrder = {}));
var PlayerScoreSetFunction;
(function (PlayerScoreSetFunction) {
    PlayerScoreSetFunction[PlayerScoreSetFunction["Set"] = 0] = "Set";
    PlayerScoreSetFunction[PlayerScoreSetFunction["Add"] = 1] = "Add";
    PlayerScoreSetFunction[PlayerScoreSetFunction["Subtract"] = 2] = "Subtract";
})(PlayerScoreSetFunction = exports.PlayerScoreSetFunction || (exports.PlayerScoreSetFunction = {}));
var ScoreCommandOperator;
(function (ScoreCommandOperator) {
    ScoreCommandOperator[ScoreCommandOperator["Equals"] = 1] = "Equals";
    ScoreCommandOperator[ScoreCommandOperator["PlusEquals"] = 2] = "PlusEquals";
    ScoreCommandOperator[ScoreCommandOperator["MinusEquals"] = 3] = "MinusEquals";
    ScoreCommandOperator[ScoreCommandOperator["TimesEquals"] = 4] = "TimesEquals";
    ScoreCommandOperator[ScoreCommandOperator["DivideEquals"] = 5] = "DivideEquals";
    ScoreCommandOperator[ScoreCommandOperator["ModEquals"] = 6] = "ModEquals";
    ScoreCommandOperator[ScoreCommandOperator["MinEquals"] = 7] = "MinEquals";
    ScoreCommandOperator[ScoreCommandOperator["MaxEquals"] = 8] = "MaxEquals";
    ScoreCommandOperator[ScoreCommandOperator["Swap"] = 9] = "Swap";
})(ScoreCommandOperator = exports.ScoreCommandOperator || (exports.ScoreCommandOperator = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NvcmVib2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNjb3JlYm9hcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnQ0FBNkI7QUFDN0Isc0NBQXFDO0FBQ3JDLGtDQUEwRDtBQUMxRCw0Q0FBeUM7QUFDekMsZ0RBQXNGO0FBQ3RGLDhDQUF5RztBQUN6RyxtQ0FBK0M7QUFFL0MsdUNBQWlDO0FBRWpDLE1BQWEsVUFBVyxTQUFRLDJCQUFhO0lBQ3pDOztPQUVHO0lBQ0gsSUFBSSxDQUFDLEVBQWdCLEVBQUUsU0FBb0I7UUFDdkMsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsWUFBWSxDQUFDLElBQVksRUFBRSxXQUFtQixFQUFFLFFBQTJCO1FBQ3ZFLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELGtCQUFrQixDQUFDLElBQVk7UUFDM0IsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBT0QsV0FBVyxDQUFDLElBQVk7UUFDcEIsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsbUJBQW1CLENBQUMsV0FBd0I7UUFDeEMsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsaUJBQWlCO1FBQ2IsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsWUFBWSxDQUFDLElBQVk7UUFDckIsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsYUFBYTtRQUNULElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELG9CQUFvQixDQUFDLEtBQVk7UUFDN0IsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQseUJBQXlCLENBQUMsSUFBWTtRQUNsQyxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxNQUFjO1FBQ2hDLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FB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