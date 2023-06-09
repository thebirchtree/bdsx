"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRule = exports.GameRules = exports.GameRuleId = void 0;
const tslib_1 = require("tslib");
const common_1 = require("../common");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
var GameRuleId;
(function (GameRuleId) {
    GameRuleId[GameRuleId["CommandBlockOutput"] = 0] = "CommandBlockOutput";
    GameRuleId[GameRuleId["DoDaylightCycle"] = 1] = "DoDaylightCycle";
    GameRuleId[GameRuleId["DoEntityDrops"] = 2] = "DoEntityDrops";
    GameRuleId[GameRuleId["DoFireTick"] = 3] = "DoFireTick";
    GameRuleId[GameRuleId["DoMobLoot"] = 4] = "DoMobLoot";
    GameRuleId[GameRuleId["DoMobSpawning"] = 5] = "DoMobSpawning";
    GameRuleId[GameRuleId["DoTileDrops"] = 6] = "DoTileDrops";
    GameRuleId[GameRuleId["DoWeatherCycle"] = 7] = "DoWeatherCycle";
    GameRuleId[GameRuleId["DrowningDamage"] = 8] = "DrowningDamage";
    GameRuleId[GameRuleId["FallDamage"] = 9] = "FallDamage";
    GameRuleId[GameRuleId["FireDamage"] = 10] = "FireDamage";
    GameRuleId[GameRuleId["KeepInventory"] = 11] = "KeepInventory";
    GameRuleId[GameRuleId["MobGriefing"] = 12] = "MobGriefing";
    GameRuleId[GameRuleId["Pvp"] = 13] = "Pvp";
    GameRuleId[GameRuleId["ShowCoordinates"] = 14] = "ShowCoordinates";
    GameRuleId[GameRuleId["NaturalRegeneration"] = 15] = "NaturalRegeneration";
    GameRuleId[GameRuleId["TntExplodes"] = 16] = "TntExplodes";
    GameRuleId[GameRuleId["SendCommandFeedback"] = 17] = "SendCommandFeedback";
    GameRuleId[GameRuleId["MaxCommandChainLength"] = 18] = "MaxCommandChainLength";
    GameRuleId[GameRuleId["DoInsomnia"] = 19] = "DoInsomnia";
    GameRuleId[GameRuleId["CommandBlocksEnabled"] = 20] = "CommandBlocksEnabled";
    GameRuleId[GameRuleId["RandomTickSpeed"] = 21] = "RandomTickSpeed";
    GameRuleId[GameRuleId["DoImmediateRespawn"] = 22] = "DoImmediateRespawn";
    GameRuleId[GameRuleId["ShowDeathMessages"] = 23] = "ShowDeathMessages";
    GameRuleId[GameRuleId["FunctionCommandLimit"] = 24] = "FunctionCommandLimit";
    GameRuleId[GameRuleId["SpawnRadius"] = 25] = "SpawnRadius";
    GameRuleId[GameRuleId["ShowTags"] = 26] = "ShowTags";
    GameRuleId[GameRuleId["FreezeDamage"] = 27] = "FreezeDamage";
    GameRuleId[GameRuleId["RespawnBlocksExplode"] = 28] = "RespawnBlocksExplode";
    GameRuleId[GameRuleId["ShowBorderEffect"] = 29] = "ShowBorderEffect";
})(GameRuleId = exports.GameRuleId || (exports.GameRuleId = {}));
class GameRules extends nativeclass_1.NativeClass {
    getRule(id) {
        (0, common_1.abstract)();
    }
    hasRule(id) {
        (0, common_1.abstract)();
    }
    setRule(id, value, type) {
        this.getRule(id).setValue(value, type);
    }
    nameToGameRuleIndex(name) {
        (0, common_1.abstract)();
    }
    static nameToGameRuleIndex(name) {
        (0, common_1.abstract)();
    }
}
exports.GameRules = GameRules;
class GameRule extends nativeclass_1.NativeClass {
    getBool() {
        (0, common_1.abstract)();
    }
    getInt() {
        (0, common_1.abstract)();
    }
    getFloat() {
        (0, common_1.abstract)();
    }
    setBool(value) {
        this.type = GameRule.Type.Bool;
        this.value.boolVal = value;
    }
    setInt(value) {
        this.type = GameRule.Type.Int;
        this.value.intVal = value;
    }
    setFloat(value) {
        this.type = GameRule.Type.Float;
        this.value.floatVal = value;
    }
    getValue() {
        switch (this.type) {
            case GameRule.Type.Invalid:
                return undefined;
            case GameRule.Type.Bool:
                return this.getBool();
            case GameRule.Type.Int:
                return this.getInt();
            case GameRule.Type.Float:
                return this.getFloat();
        }
    }
    setValue(value, type) {
        switch (type) {
            case GameRule.Type.Bool:
                this.setBool(value);
                break;
            case GameRule.Type.Int:
                this.setInt(value);
                break;
            case GameRule.Type.Float:
                this.setFloat(value);
                break;
            default:
                switch (typeof value) {
                    case "boolean":
                        this.setBool(value);
                        break;
                    case "number":
                        if (Number.isInteger(value)) {
                            this.setInt(value);
                        }
                        else {
                            this.setFloat(value);
                        }
                        break;
                }
        }
    }
}
exports.GameRule = GameRule;
(function (GameRule) {
    let Type;
    (function (Type) {
        Type[Type["Invalid"] = 0] = "Invalid";
        Type[Type["Bool"] = 1] = "Bool";
        Type[Type["Int"] = 2] = "Int";
        Type[Type["Float"] = 3] = "Float";
    })(Type = GameRule.Type || (GameRule.Type = {}));
    let Value = class Value extends nativeclass_1.NativeStruct {
    };
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.bool_t, { ghost: true })
    ], Value.prototype, "boolVal", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.int32_t, { ghost: true })
    ], Value.prototype, "intVal", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
    ], Value.prototype, "floatVal", void 0);
    Value = tslib_1.__decorate([
        (0, nativeclass_1.nativeClass)()
    ], Value);
    GameRule.Value = Value;
})(GameRule = exports.GameRule || (exports.GameRule = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZXJ1bGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2FtZXJ1bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxzQ0FBcUM7QUFDckMsZ0RBQXFGO0FBQ3JGLDhDQUEyRDtBQUUzRCxJQUFZLFVBK0JYO0FBL0JELFdBQVksVUFBVTtJQUNsQix1RUFBa0IsQ0FBQTtJQUNsQixpRUFBZSxDQUFBO0lBQ2YsNkRBQWEsQ0FBQTtJQUNiLHVEQUFVLENBQUE7SUFDVixxREFBUyxDQUFBO0lBQ1QsNkRBQWEsQ0FBQTtJQUNiLHlEQUFXLENBQUE7SUFDWCwrREFBYyxDQUFBO0lBQ2QsK0RBQWMsQ0FBQTtJQUNkLHVEQUFVLENBQUE7SUFDVix3REFBVSxDQUFBO0lBQ1YsOERBQWEsQ0FBQTtJQUNiLDBEQUFXLENBQUE7SUFDWCwwQ0FBRyxDQUFBO0lBQ0gsa0VBQWUsQ0FBQTtJQUNmLDBFQUFtQixDQUFBO0lBQ25CLDBEQUFXLENBQUE7SUFDWCwwRUFBbUIsQ0FBQTtJQUNuQiw4RUFBcUIsQ0FBQTtJQUNyQix3REFBVSxDQUFBO0lBQ1YsNEVBQW9CLENBQUE7SUFDcEIsa0VBQWUsQ0FBQTtJQUNmLHdFQUFrQixDQUFBO0lBQ2xCLHNFQUFpQixDQUFBO0lBQ2pCLDRFQUFvQixDQUFBO0lBQ3BCLDBEQUFXLENBQUE7SUFDWCxvREFBUSxDQUFBO0lBQ1IsNERBQVksQ0FBQTtJQUNaLDRFQUFvQixDQUFBO0lBQ3BCLG9FQUFnQixDQUFBO0FBQ3BCLENBQUMsRUEvQlcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUErQnJCO0FBRUQsTUFBYSxTQUFVLFNBQVEseUJBQVc7SUFDdEMsT0FBTyxDQUFDLEVBQWM7UUFDbEIsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsT0FBTyxDQUFDLEVBQWM7UUFDbEIsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsT0FBTyxDQUFDLEVBQWMsRUFBRSxLQUF1QixF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