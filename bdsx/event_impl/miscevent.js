"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectiveCreateEvent = exports.ScoreRemoveEvent = exports.ScoreAddEvent = exports.ScoreSetEvent = exports.ScoreResetEvent = exports.QueryRegenerateEvent = void 0;
const tslib_1 = require("tslib");
const scoreboard_1 = require("../bds/scoreboard");
const common_1 = require("../common");
const core_1 = require("../core");
const decay_1 = require("../decay");
const event_1 = require("../event");
const launcher_1 = require("../launcher");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const prochacker_1 = require("../prochacker");
class QueryRegenerateEvent {
    constructor(motd, levelname, currentPlayers, maxPlayers, isJoinableThroughServerScreen) {
        this.motd = motd;
        this.levelname = levelname;
        this.currentPlayers = currentPlayers;
        this.maxPlayers = maxPlayers;
        this.isJoinableThroughServerScreen = isJoinableThroughServerScreen;
    }
}
exports.QueryRegenerateEvent = QueryRegenerateEvent;
let AnnounceServerData = class AnnounceServerData extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], AnnounceServerData.prototype, "motd", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], AnnounceServerData.prototype, "levelname", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t, { relative: true, offset: 4 })
], AnnounceServerData.prototype, "currentPlayers", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], AnnounceServerData.prototype, "maxPlayers", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], AnnounceServerData.prototype, "isJoinableThroughServerScreen", void 0);
AnnounceServerData = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], AnnounceServerData);
// CxxStringWrapper, CxxStringWrapper, VoidPointer, int32_t, int32_t, bool_t
//  motd: CxxStringWrapper, levelname: CxxStringWrapper, gameType: VoidPointer, currentPlayers: number, maxPlayers: number, isJoinableThroughServerScreen: boolean
const _onQueryRegenerate = prochacker_1.procHacker.hooking("?_announceServer@RakNetServerLocator@@AEAAXAEBUAnnounceServerData@1@@Z", nativetype_1.void_t, null, core_1.VoidPointer, AnnounceServerData)(onQueryRegenerate);
function onQueryRegenerate(rakNetServerLocator, data) {
    const event = new QueryRegenerateEvent(data.motd, data.levelname, data.currentPlayers, data.maxPlayers, data.isJoinableThroughServerScreen);
    event_1.events.queryRegenerate.fire(event);
    data.motd = event.motd;
    data.levelname = event.levelname;
    return _onQueryRegenerate(rakNetServerLocator, data);
}
launcher_1.bedrockServer.afterOpen().then(() => launcher_1.bedrockServer.serverNetworkHandler.updateServerAnnouncement());
class ScoreResetEvent {
    constructor(identityRef, objective) {
        this.identityRef = identityRef;
        this.objective = objective;
    }
}
exports.ScoreResetEvent = ScoreResetEvent;
const _onScoreReset = prochacker_1.procHacker.hooking("?removeFromObjective@ScoreboardIdentityRef@@QEAA_NAEAVScoreboard@@AEAVObjective@@@Z", nativetype_1.bool_t, null, scoreboard_1.ScoreboardIdentityRef, scoreboard_1.Scoreboard, scoreboard_1.Objective)(onScoreReset);
function onScoreReset(identityRef, scoreboard, objective) {
    const event = new ScoreResetEvent(identityRef, objective);
    const canceled = event_1.events.scoreReset.fire(event) === common_1.CANCEL;
    (0, decay_1.decay)(identityRef);
    (0, decay_1.decay)(scoreboard);
    if (canceled) {
        scoreboard.sync(identityRef.scoreboardId, objective);
        return false;
    }
    return _onScoreReset(event.identityRef, scoreboard, event.objective);
}
class ScoreSetEvent {
    constructor(identityRef, objective, 
    /** The score to be set */
    score) {
        this.identityRef = identityRef;
        this.objective = objective;
        this.score = score;
    }
}
exports.ScoreSetEvent = ScoreSetEvent;
class ScoreAddEvent extends ScoreSetEvent {
    constructor(identityRef, objective, 
    /** The score to be added */
    score) {
        super(identityRef, objective, score);
        this.identityRef = identityRef;
        this.objective = objective;
        this.score = score;
    }
}
exports.ScoreAddEvent = ScoreAddEvent;
class ScoreRemoveEvent extends ScoreSetEvent {
    constructor(identityRef, objective, 
    /** The score to be removed */
    score) {
        super(identityRef, objective, score);
        this.identityRef = identityRef;
        this.objective = objective;
        this.score = score;
    }
}
exports.ScoreRemoveEvent = ScoreRemoveEvent;
const _onScoreModify = prochacker_1.procHacker.hooking("?modifyScoreInObjective@ScoreboardIdentityRef@@QEAA_NAEAHAEAVObjective@@HW4PlayerScoreSetFunction@@@Z", nativetype_1.bool_t, null, scoreboard_1.ScoreboardIdentityRef, core_1.StaticPointer, scoreboard_1.Objective, nativetype_1.int32_t, nativetype_1.uint8_t)(onScoreModify);
function onScoreModify(identityRef, result, objective, score, mode) {
    let event;
    let canceled;
    switch (mode) {
        case scoreboard_1.PlayerScoreSetFunction.Set:
            event = new ScoreSetEvent(identityRef, objective, score);
            canceled = event_1.events.scoreSet.fire(event) === common_1.CANCEL;
            break;
        case scoreboard_1.PlayerScoreSetFunction.Add:
            event = new ScoreAddEvent(identityRef, objective, score);
            canceled = event_1.events.scoreAdd.fire(event) === common_1.CANCEL;
            break;
        case scoreboard_1.PlayerScoreSetFunction.Subtract:
            event = new ScoreRemoveEvent(identityRef, objective, score);
            canceled = event_1.events.scoreRemove.fire(event) === common_1.CANCEL;
            break;
    }
    (0, decay_1.decay)(identityRef);
    (0, decay_1.decay)(objective);
    if (canceled) {
        return false;
    }
    return _onScoreModify(event.identityRef, result, event.objective, event.score, mode);
}
class ObjectiveCreateEvent {
    constructor(name, displayName, criteria) {
        this.name = name;
        this.displayName = displayName;
        this.criteria = criteria;
    }
}
exports.ObjectiveCreateEvent = ObjectiveCreateEvent;
const _onObjectiveCreate = prochacker_1.procHacker.hooking("?addObjective@Scoreboard@@QEAAPEAVObjective@@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@0AEBVObjectiveCriteria@@@Z", scoreboard_1.Objective, null, scoreboard_1.Scoreboard, nativetype_1.CxxString, nativetype_1.CxxString, scoreboard_1.ObjectiveCriteria)(onObjectiveCreate);
function onObjectiveCreate(scoreboard, name, displayName, criteria) {
    const event = new ObjectiveCreateEvent(name, displayName, criteria);
    const canceled = event_1.events.objectiveCreate.fire(event) === common_1.CANCEL;
    (0, decay_1.decay)(criteria);
    if (canceled) {
        return null;
    }
    return _onObjectiveCreate(scoreboard, event.name, event.displayName, event.criteria);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlzY2V2ZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWlzY2V2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxrREFBNEg7QUFDNUgsc0NBQW1DO0FBQ25DLGtDQUFxRDtBQUNyRCxvQ0FBaUM7QUFDakMsb0NBQWtDO0FBQ2xDLDBDQUE0QztBQUM1QyxnREFBdUU7QUFDdkUsOENBQTRFO0FBQzVFLDhDQUEyQztBQUUzQyxNQUFhLG9CQUFvQjtJQUM3QixZQUNXLElBQVksRUFDWixTQUFpQixFQUNqQixjQUFzQixFQUN0QixVQUFrQixFQUNsQiw2QkFBc0M7UUFKdEMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFDakIsbUJBQWMsR0FBZCxjQUFjLENBQVE7UUFDdEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUNsQixrQ0FBNkIsR0FBN0IsNkJBQTZCLENBQVM7SUFDOUMsQ0FBQztDQUNQO0FBUkQsb0RBUUM7QUFHRCxJQUFNLGtCQUFrQixHQUF4QixNQUFNLGtCQUFtQixTQUFRLHlCQUFXO0NBVzNDLENBQUE7QUFURztJQURDLElBQUEseUJBQVcsRUFBQyxzQkFBUyxDQUFDO2dEQUNQO0FBRWhCO0lBREMsSUFBQSx5QkFBVyxFQUFDLHNCQUFTLENBQUM7cURBQ0Y7QUFFckI7SUFEQyxJQUFBLHlCQUFXLEVBQUMsb0JBQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDOzBEQUM1QjtBQUV4QjtJQURDLElBQUEseUJBQVcsRUFBQyxvQkFBTyxDQUFDO3NEQUNEO0FBRXBCO0lBREMsSUFBQSx5QkFBVyxFQUFDLG1CQUFNLENBQUM7eUVBQ2tCO0FBVnBDLGtCQUFrQjtJQUR2QixJQUFBLHlCQUFXLEdBQUU7R0FDUixrQkFBa0IsQ0FXdkI7QUFFRCw0RUFBNEU7QUFDNUUsa0tBQWtLO0FBRWxLLE1BQU0sa0JBQWtCLEdBQUcsdUJBQVUs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