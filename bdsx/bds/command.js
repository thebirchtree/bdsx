"use strict";
var WildcardCommandSelector_1, CommandSelector_1, CommandPosition_1, CommandContext_1, CommandOutputParameter_1, CommandOutput_1, Command_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandMobEffect = exports.CommandBlock = exports.CommandSoftEnum = exports.CommandIndexEnum = exports.CommandStringEnum = exports.CommandRawEnum = exports.CommandEnum = exports.CommandMappedValue = exports.Command = exports.CommandRegistry = exports.CommandVFTable = exports.CommandParameterData = exports.CommandParameterOption = exports.CommandParameterDataType = exports.MinecraftCommands = exports.CommandOutputSender = exports.CommandOutput = exports.CommandOutputParameter = exports.CommandOutputType = exports.CommandVersion = exports.CommandContext = exports.CommandWildcardInt = exports.CommandRawText = exports.CommandPositionFloat = exports.CommandPosition = exports.CommandMessage = exports.CommandItem = exports.CommandFilePath = exports.PlayerCommandSelector = exports.ActorCommandSelector = exports.CommandSelector = exports.PlayerWildcardCommandSelector = exports.ActorWildcardCommandSelector = exports.WildcardCommandSelector = exports.CommandSelectorBase = exports.CommandSelectionType = exports.CommandSelectionOrder = exports.MCRESULT = exports.SoftEnumUpdateType = exports.CommandFlag = exports.CommandVisibilityFlag = exports.CommandUsageFlag = exports.CommandTypeFlag = exports.CommandSyncFlag = exports.CommandExecuteFlag = exports.CommandCheatFlag = exports.CommandPermissionLevel = void 0;
const tslib_1 = require("tslib");
const colors = require("colors");
const bin_1 = require("../bin");
const capi_1 = require("../capi");
const commandparam_1 = require("../commandparam");
const commandparser = require("../commandparser");
const common_1 = require("../common");
const core_1 = require("../core");
const cxxmap_1 = require("../cxxmap");
const cxxpair_1 = require("../cxxpair");
const cxxvector_1 = require("../cxxvector");
const makefunc_1 = require("../makefunc");
const mangle_1 = require("../mangle");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const pointer_1 = require("../pointer");
const prochacker_1 = require("../prochacker");
const sharedpointer_1 = require("../sharedpointer");
const singleton_1 = require("../singleton");
const warning_1 = require("../warning");
const actor_1 = require("./actor");
const block_1 = require("./block");
const blockpos_1 = require("./blockpos");
const commandorigin_1 = require("./commandorigin");
const connreq_1 = require("./connreq");
const effects_1 = require("./effects");
const inventory_1 = require("./inventory");
const packets_1 = require("./packets");
const player_1 = require("./player");
const symbols_1 = require("./symbols");
const typeid_1 = require("./typeid");
var commandParser = commandparser.commandParser;
var CommandPermissionLevel;
(function (CommandPermissionLevel) {
    CommandPermissionLevel[CommandPermissionLevel["Normal"] = 0] = "Normal";
    CommandPermissionLevel[CommandPermissionLevel["Operator"] = 1] = "Operator";
    CommandPermissionLevel[CommandPermissionLevel["Host"] = 2] = "Host";
    CommandPermissionLevel[CommandPermissionLevel["Automation"] = 3] = "Automation";
    CommandPermissionLevel[CommandPermissionLevel["Admin"] = 4] = "Admin";
    CommandPermissionLevel[CommandPermissionLevel["Internal"] = 5] = "Internal";
})(CommandPermissionLevel = exports.CommandPermissionLevel || (exports.CommandPermissionLevel = {}));
var CommandCheatFlag;
(function (CommandCheatFlag) {
    CommandCheatFlag[CommandCheatFlag["Cheat"] = 0] = "Cheat";
    CommandCheatFlag[CommandCheatFlag["NotCheat"] = 64] = "NotCheat";
    /** @deprecated */
    CommandCheatFlag[CommandCheatFlag["NoCheat"] = 64] = "NoCheat";
    CommandCheatFlag[CommandCheatFlag["None"] = 0] = "None";
})(CommandCheatFlag = exports.CommandCheatFlag || (exports.CommandCheatFlag = {}));
var CommandExecuteFlag;
(function (CommandExecuteFlag) {
    CommandExecuteFlag[CommandExecuteFlag["Allowed"] = 0] = "Allowed";
    CommandExecuteFlag[CommandExecuteFlag["Disallowed"] = 16] = "Disallowed";
})(CommandExecuteFlag = exports.CommandExecuteFlag || (exports.CommandExecuteFlag = {}));
var CommandSyncFlag;
(function (CommandSyncFlag) {
    CommandSyncFlag[CommandSyncFlag["Synced"] = 0] = "Synced";
    CommandSyncFlag[CommandSyncFlag["Local"] = 8] = "Local";
})(CommandSyncFlag = exports.CommandSyncFlag || (exports.CommandSyncFlag = {}));
var CommandTypeFlag;
(function (CommandTypeFlag) {
    CommandTypeFlag[CommandTypeFlag["None"] = 0] = "None";
    CommandTypeFlag[CommandTypeFlag["Message"] = 32] = "Message";
})(CommandTypeFlag = exports.CommandTypeFlag || (exports.CommandTypeFlag = {}));
var CommandUsageFlag;
(function (CommandUsageFlag) {
    CommandUsageFlag[CommandUsageFlag["Normal"] = 0] = "Normal";
    CommandUsageFlag[CommandUsageFlag["Test"] = 1] = "Test";
    /** @deprecated Use `CommandVisibilityFlag` */
    CommandUsageFlag[CommandUsageFlag["Hidden"] = 2] = "Hidden";
    CommandUsageFlag[CommandUsageFlag["_Unknown"] = 128] = "_Unknown";
})(CommandUsageFlag = exports.CommandUsageFlag || (exports.CommandUsageFlag = {}));
/** Putting in flag1 or flag2 are both ok, you can also combine with other flags like CommandCheatFlag.NoCheat | CommandVisibilityFlag.HiddenFromCommandBlockOrigin but combining is actually not quite useful */
var CommandVisibilityFlag;
(function (CommandVisibilityFlag) {
    CommandVisibilityFlag[CommandVisibilityFlag["Visible"] = 0] = "Visible";
    /** Bug: Besides from being hidden from command blocks, players cannot see it also well, but they are still able to execute */
    CommandVisibilityFlag[CommandVisibilityFlag["HiddenFromCommandBlockOrigin"] = 2] = "HiddenFromCommandBlockOrigin";
    CommandVisibilityFlag[CommandVisibilityFlag["HiddenFromPlayerOrigin"] = 4] = "HiddenFromPlayerOrigin";
    /** Still visible to console */
    CommandVisibilityFlag[CommandVisibilityFlag["Hidden"] = 6] = "Hidden";
})(CommandVisibilityFlag = exports.CommandVisibilityFlag || (exports.CommandVisibilityFlag = {}));
/** @deprecated **/
exports.CommandFlag = CommandCheatFlag; // CommandFlag is actually a class
var SoftEnumUpdateType;
(function (SoftEnumUpdateType) {
    SoftEnumUpdateType[SoftEnumUpdateType["Add"] = 0] = "Add";
    SoftEnumUpdateType[SoftEnumUpdateType["Remove"] = 1] = "Remove";
    SoftEnumUpdateType[SoftEnumUpdateType["Replace"] = 2] = "Replace";
})(SoftEnumUpdateType = exports.SoftEnumUpdateType || (exports.SoftEnumUpdateType = {}));
let MCRESULT = class MCRESULT extends nativeclass_1.NativeStruct {
    getFullCode() {
        (0, common_1.abstract)();
    }
    isSuccess() {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], MCRESULT.prototype, "result", void 0);
MCRESULT = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], MCRESULT);
exports.MCRESULT = MCRESULT;
MCRESULT.prototype.getFullCode = prochacker_1.procHacker.js("?getFullCode@MCRESULT@@QEBAHXZ", nativetype_1.int32_t, { this: MCRESULT });
MCRESULT.prototype.isSuccess = prochacker_1.procHacker.js("?isSuccess@MCRESULT@@QEBA_NXZ", nativetype_1.bool_t, { this: MCRESULT });
var CommandSelectionOrder;
(function (CommandSelectionOrder) {
    CommandSelectionOrder[CommandSelectionOrder["Sorted"] = 0] = "Sorted";
    CommandSelectionOrder[CommandSelectionOrder["InvertSorted"] = 1] = "InvertSorted";
    CommandSelectionOrder[CommandSelectionOrder["Random"] = 2] = "Random";
})(CommandSelectionOrder = exports.CommandSelectionOrder || (exports.CommandSelectionOrder = {}));
var CommandSelectionType;
(function (CommandSelectionType) {
    /** Used in @s */
    CommandSelectionType[CommandSelectionType["Self"] = 0] = "Self";
    /** Used in @e */
    CommandSelectionType[CommandSelectionType["Entities"] = 1] = "Entities";
    /** Used in @a */
    CommandSelectionType[CommandSelectionType["Players"] = 2] = "Players";
    /** Used in @r */
    CommandSelectionType[CommandSelectionType["DefaultPlayers"] = 3] = "DefaultPlayers";
    /** Used in @c */
    CommandSelectionType[CommandSelectionType["OwnedAgent"] = 4] = "OwnedAgent";
    /** Used in @v */
    CommandSelectionType[CommandSelectionType["Agents"] = 5] = "Agents";
})(CommandSelectionType = exports.CommandSelectionType || (exports.CommandSelectionType = {}));
let CommandSelectorBase = class CommandSelectorBase extends nativeclass_1.AbstractClass {
    _newResults(origin) {
        (0, common_1.abstract)();
    }
    newResults(origin, typeFilter) {
        const list = this._newResults(origin);
        if (typeFilter != null) {
            const out = [];
            for (const actor of list.p) {
                if (actor instanceof typeFilter) {
                    out.push(actor);
                }
            }
            list.dispose();
            return out;
        }
        else {
            const actors = list.p.toArray();
            list.dispose();
            return actors;
        }
    }
    getName() {
        (0, common_1.abstract)();
    }
};
CommandSelectorBase = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0xc1, 8)
], CommandSelectorBase);
exports.CommandSelectorBase = CommandSelectorBase;
/** @param args_1 forcePlayer */
const CommandSelectorBaseCtor = prochacker_1.procHacker.js("??0CommandSelectorBase@@IEAA@_N@Z", nativetype_1.void_t, null, CommandSelectorBase, nativetype_1.bool_t);
CommandSelectorBase.prototype[nativetype_1.NativeType.dtor] = prochacker_1.procHacker.js("??1CommandSelectorBase@@QEAA@XZ", nativetype_1.void_t, { this: CommandSelectorBase });
CommandSelectorBase.prototype._newResults = prochacker_1.procHacker.js("?newResults@CommandSelectorBase@@IEBA?AV?$shared_ptr@V?$vector@PEAVActor@@V?$allocator@PEAVActor@@@std@@@std@@@std@@AEBVCommandOrigin@@@Z", sharedpointer_1.CxxSharedPtr.make(cxxvector_1.CxxVector.make(actor_1.Actor.ref())), { this: CommandSelectorBase, structureReturn: true }, commandorigin_1.CommandOrigin);
CommandSelectorBase.prototype.getName = prochacker_1.procHacker.js("?getName@CommandSelectorBase@@QEBA?AV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@XZ", nativetype_1.CxxString, { this: CommandSelectorBase, structureReturn: true });
let WildcardCommandSelector = WildcardCommandSelector_1 = class WildcardCommandSelector extends CommandSelectorBase {
    static make(type) {
        return singleton_1.Singleton.newInstance(WildcardCommandSelector_1, type, () => {
            class WildcardCommandSelectorImpl extends WildcardCommandSelector_1 {
            }
            WildcardCommandSelectorImpl.define({});
            Object.defineProperties(WildcardCommandSelectorImpl, {
                name: { value: `WildcardCommandSelector<${type.name}>` },
                symbol: {
                    value: mangle_1.mangle.templateClass("WildcardCommandSelector", type),
                },
            });
            return WildcardCommandSelectorImpl;
        });
    }
};
WildcardCommandSelector = WildcardCommandSelector_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], WildcardCommandSelector);
exports.WildcardCommandSelector = WildcardCommandSelector;
exports.ActorWildcardCommandSelector = WildcardCommandSelector.make(actor_1.Actor);
exports.ActorWildcardCommandSelector.prototype[nativetype_1.NativeType.ctor] = function () {
    CommandSelectorBaseCtor(this, false);
};
exports.PlayerWildcardCommandSelector = WildcardCommandSelector.make(player_1.ServerPlayer);
exports.PlayerWildcardCommandSelector.prototype[nativetype_1.NativeType.ctor] = function () {
    CommandSelectorBaseCtor(this, false);
};
let CommandSelector = CommandSelector_1 = class CommandSelector extends CommandSelectorBase {
    static make(type) {
        return singleton_1.Singleton.newInstance(CommandSelector_1, type, () => {
            class CommandSelectorImpl extends CommandSelector_1 {
            }
            CommandSelectorImpl.define({});
            Object.defineProperties(CommandSelectorImpl, {
                name: { value: `CommandSelector<${type.name}>` },
                symbol: {
                    value: mangle_1.mangle.templateClass("CommandSelector", type),
                },
            });
            return CommandSelectorImpl;
        });
    }
};
CommandSelector = CommandSelector_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], CommandSelector);
exports.CommandSelector = CommandSelector;
exports.ActorCommandSelector = CommandSelector.make(actor_1.Actor);
exports.ActorCommandSelector.prototype[nativetype_1.NativeType.ctor] = function () {
    CommandSelectorBaseCtor(this, false);
};
exports.PlayerCommandSelector = CommandSelector.make(player_1.ServerPlayer);
exports.PlayerCommandSelector.prototype[nativetype_1.NativeType.ctor] = function () {
    CommandSelectorBaseCtor(this, true);
};
let CommandFilePath = class CommandFilePath extends nativeclass_1.NativeClass {
};
commandparam_1.CommandParameterType.symbol;
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], CommandFilePath.prototype, "text", void 0);
CommandFilePath = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], CommandFilePath);
exports.CommandFilePath = CommandFilePath;
let CommandIntegerRange = class CommandIntegerRange extends nativeclass_1.NativeStruct {
};
commandparam_1.CommandParameterType.symbol;
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], CommandIntegerRange.prototype, "min", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], CommandIntegerRange.prototype, "max", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], CommandIntegerRange.prototype, "inverted", void 0);
CommandIntegerRange = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], CommandIntegerRange);
let CommandItem = class CommandItem extends nativeclass_1.NativeStruct {
    createInstance(count) {
        (0, common_1.abstract)();
    }
};
commandparam_1.CommandParameterType.symbol;
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], CommandItem.prototype, "version", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], CommandItem.prototype, "id", void 0);
CommandItem = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], CommandItem);
exports.CommandItem = CommandItem;
CommandItem.prototype.createInstance = prochacker_1.procHacker.js("?createInstance@CommandItem@@QEBA?AV?$optional@VItemInstance@@@std@@HHPEAVCommandOutput@@_N@Z", inventory_1.ItemStack, { this: CommandItem, structureReturn: true }, nativetype_1.int32_t);
class CommandMessage extends nativeclass_1.NativeClass {
    getMessage(origin) {
        (0, common_1.abstract)();
    }
}
exports.CommandMessage = CommandMessage;
commandparam_1.CommandParameterType.symbol;
(function (CommandMessage) {
    let MessageComponent = class MessageComponent extends nativeclass_1.NativeClass {
    };
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
    ], MessageComponent.prototype, "string", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(exports.ActorCommandSelector.ref())
    ], MessageComponent.prototype, "selection", void 0);
    MessageComponent = tslib_1.__decorate([
        (0, nativeclass_1.nativeClass)(0x28)
    ], MessageComponent);
    CommandMessage.MessageComponent = MessageComponent;
})(CommandMessage = exports.CommandMessage || (exports.CommandMessage = {}));
CommandMessage.abstract({
    data: cxxvector_1.CxxVector.make(CommandMessage.MessageComponent),
}, 0x18);
CommandMessage.prototype.getMessage = prochacker_1.procHacker.js("?getMessage@CommandMessage@@QEBA?AV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEBVCommandOrigin@@@Z", nativetype_1.CxxString, { this: CommandMessage, structureReturn: true }, commandorigin_1.CommandOrigin);
let CommandPosition = CommandPosition_1 = class CommandPosition extends nativeclass_1.NativeStruct {
    static create(x, isXRelative, y, isYRelative, z, isZRelative, local) {
        const ret = new CommandPosition_1(true);
        ret.x = x;
        ret.y = y;
        ret.z = z;
        ret.isXRelative = isXRelative;
        ret.isYRelative = isYRelative;
        ret.isZRelative = isZRelative;
        ret.local = local;
        return ret;
    }
    _getPosition(unknown, origin, offsetFromBase) {
        (0, common_1.abstract)();
    }
    getPosition(origin, offsetFromBase = blockpos_1.Vec3.create(0, 0, 0)) {
        return this._getPosition(0, origin, offsetFromBase);
    }
    _getBlockPosition(unknown, origin, offsetFromBase) {
        (0, common_1.abstract)();
    }
    getBlockPosition(origin, offsetFromBase = blockpos_1.Vec3.create(0, 0, 0)) {
        return this._getBlockPosition(0, origin, offsetFromBase);
    }
};
commandparam_1.CommandParameterType.symbol;
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], CommandPosition.prototype, "x", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], CommandPosition.prototype, "y", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], CommandPosition.prototype, "z", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], CommandPosition.prototype, "isXRelative", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], CommandPosition.prototype, "isYRelative", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], CommandPosition.prototype, "isZRelative", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], CommandPosition.prototype, "local", void 0);
CommandPosition = CommandPosition_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], CommandPosition);
exports.CommandPosition = CommandPosition;
CommandPosition.prototype._getPosition = prochacker_1.procHacker.js("?getPosition@CommandPosition@@QEBA?AVVec3@@HAEBVCommandOrigin@@AEBV2@@Z", blockpos_1.Vec3, { this: CommandPosition, structureReturn: true }, nativetype_1.int32_t, commandorigin_1.CommandOrigin, blockpos_1.Vec3);
CommandPosition.prototype._getBlockPosition = prochacker_1.procHacker.js("?getBlockPos@CommandPosition@@QEBA?AVBlockPos@@HAEBVCommandOrigin@@AEBVVec3@@@Z", blockpos_1.BlockPos, { this: CommandPosition, structureReturn: true }, nativetype_1.int32_t, commandorigin_1.CommandOrigin, blockpos_1.Vec3);
let CommandPositionFloat = class CommandPositionFloat extends CommandPosition {
    static create(x, isXRelative, y, isYRelative, z, isZRelative, local) {
        const ret = CommandPosition.construct();
        ret.x = x;
        ret.y = y;
        ret.z = z;
        ret.isXRelative = isXRelative;
        ret.isYRelative = isYRelative;
        ret.isZRelative = isZRelative;
        ret.local = local;
        return ret;
    }
};
commandparam_1.CommandParameterType.symbol;
CommandPositionFloat = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], CommandPositionFloat);
exports.CommandPositionFloat = CommandPositionFloat;
let CommandRawText = class CommandRawText extends nativeclass_1.NativeClass {
};
commandparam_1.CommandParameterType.symbol;
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], CommandRawText.prototype, "text", void 0);
CommandRawText = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], CommandRawText);
exports.CommandRawText = CommandRawText;
let CommandWildcardInt = class CommandWildcardInt extends nativeclass_1.NativeStruct {
};
commandparam_1.CommandParameterType.symbol;
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], CommandWildcardInt.prototype, "isWildcard", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], CommandWildcardInt.prototype, "value", void 0);
CommandWildcardInt = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], CommandWildcardInt);
exports.CommandWildcardInt = CommandWildcardInt;
// It is a special enum that cannot be used in `command.enum`, it is just a uint8_t.
// However, it might be confusing with only numbers, so I tried to create some methods for it.
// @nativeClass()
// export class CommandOperator extends NativeClass {
//     static readonly [CommandParameterType.symbol]:true;
//     static readonly symbol = 'enum CommandOperator';
//     @nativeField(uint8_t)
//     value:uint8_t;
//     toString(): string {
//         switch (this.value) {
//         case 1: return '=';
//         case 2: return '+=';
//         case 3: return '-=';
//         case 4: return '*=';
//         case 5: return '/=';
//         case 6: return '%=';
//         case 7: return '<';
//         case 8: return '>';
//         case 9: return '><';
//         default: return "invalid";
//         }
//     }
//     valueOf():number {
//         return this.value;
//     }
// }
let CommandContext = CommandContext_1 = class CommandContext extends nativeclass_1.NativeClass {
    /**
     * @param commandOrigin it's destructed by the destruction of CommandContext
     */
    constructWith(command, commandOrigin, version = CommandVersion.CurrentVersion) {
        CommandContext$CommandContext(this, command, CommandOriginWrapper.create(commandOrigin), version);
    }
    /**
     * @param commandOrigin it's destructed by the destruction of CommandContext
     */
    static constructWith(command, commandOrigin, version) {
        const ctx = new CommandContext_1(true);
        ctx.constructWith(command, commandOrigin, version);
        return ctx;
    }
    /**
     * @deprecated
     * @param commandOrigin it's destructed by the destruction of CommandContext. it should be allocated by malloc
     */
    static constructSharedPtr(command, commandOrigin, version) {
        const sharedptr = new CommandContextSharedPtr(true);
        const vftable = symbols_1.proc["??_7?$_Ref_count_obj2@_N@std@@6B@"]; // _Ref_count_obj2<bool>::vftable
        sharedptr.create(vftable);
        sharedptr.p.constructWith(command, commandOrigin, version);
        return sharedptr;
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], CommandContext.prototype, "command", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(commandorigin_1.CommandOrigin.ref())
], CommandContext.prototype, "origin", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t, 0x28)
], CommandContext.prototype, "version", void 0);
CommandContext = CommandContext_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x30)
], CommandContext);
exports.CommandContext = CommandContext;
var CommandVersion;
(function (CommandVersion) {
    CommandVersion.CurrentVersion = symbols_1.proc["?CurrentVersion@CommandVersion@@2HB"].getInt32();
})(CommandVersion = exports.CommandVersion || (exports.CommandVersion = {}));
const CommandOriginWrapper = pointer_1.Wrapper.make(commandorigin_1.CommandOrigin.ref());
const CommandContext$CommandContext = prochacker_1.procHacker.js("??0CommandContext@@QEAA@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$unique_ptr@VCommandOrigin@@U?$default_delete@VCommandOrigin@@@std@@@2@H@Z", nativetype_1.void_t, null, CommandContext, nativetype_1.CxxString, CommandOriginWrapper, nativetype_1.int32_t);
const CommandContextSharedPtr = sharedpointer_1.CxxSharedPtr.make(CommandContext);
var CommandOutputType;
(function (CommandOutputType) {
    CommandOutputType[CommandOutputType["None"] = 0] = "None";
    CommandOutputType[CommandOutputType["LastOutput"] = 1] = "LastOutput";
    CommandOutputType[CommandOutputType["Silent"] = 2] = "Silent";
    /** @deprecated */
    CommandOutputType[CommandOutputType["Type3"] = 3] = "Type3";
    CommandOutputType[CommandOutputType["AllOutput"] = 3] = "AllOutput";
    /** @deprecated */
    CommandOutputType[CommandOutputType["ScriptEngine"] = 4] = "ScriptEngine";
    CommandOutputType[CommandOutputType["DataSet"] = 4] = "DataSet";
})(CommandOutputType = exports.CommandOutputType || (exports.CommandOutputType = {}));
let CommandOutputParameter = CommandOutputParameter_1 = class CommandOutputParameter extends nativeclass_1.NativeClass {
    /**
     * @deprecated use constructWith to be sure. it has to be destructed.
     */
    static create(input, count) {
        return CommandOutputParameter_1.constructWith(input, count);
    }
    constructWith(input, count) {
        this.construct();
        switch (typeof input) {
            case "string":
                this.string = input;
                this.count = count !== null && count !== void 0 ? count : 0;
                break;
            case "boolean":
                this.string = input.toString();
                this.count = 0;
                break;
            case "number":
                if (Number.isInteger(input)) {
                    this.string = input.toString();
                }
                else {
                    this.string = input.toFixed(2).toString();
                }
                this.count = 0;
                break;
            case "object":
                if (input instanceof actor_1.Actor) {
                    this.string = input.getNameTag();
                    this.count = 1;
                }
                else if (input instanceof blockpos_1.BlockPos || input instanceof blockpos_1.Vec3) {
                    this.string = `${input.x}, ${input.y}, ${input.z}`;
                    this.count = count !== null && count !== void 0 ? count : 0;
                }
                else if (Array.isArray(input)) {
                    if (input.length > 0) {
                        if (input[0] instanceof actor_1.Actor) {
                            this.string = input.map(e => e.getNameTag()).join(", ");
                            this.count = input.length;
                        }
                    }
                }
                break;
            default:
                this.string = "";
                this.count = -1;
        }
    }
    static constructWith(input, count) {
        const out = CommandOutputParameter_1.construct();
        out.constructWith(input, count);
        return out;
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], CommandOutputParameter.prototype, "string", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], CommandOutputParameter.prototype, "count", void 0);
CommandOutputParameter = CommandOutputParameter_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], CommandOutputParameter);
exports.CommandOutputParameter = CommandOutputParameter;
const CommandOutputParameterVector = cxxvector_1.CxxVector.make(CommandOutputParameter);
function paramsToVector(params) {
    if (params != null) {
        if (params instanceof cxxvector_1.CxxVector) {
            return params;
        }
        else if (params.length) {
            const _params = CommandOutputParameterVector.construct();
            _params.reserve(params.length);
            if (params[0] instanceof CommandOutputParameter) {
                for (const param of params) {
                    _params.emplace(param);
                    param.destruct();
                }
            }
            else {
                for (const param of params) {
                    _params.prepare().constructWith(param);
                }
            }
            return _params;
        }
    }
    return CommandOutputParameterVector.construct();
}
let CommandPropertyBag = class CommandPropertyBag extends nativeclass_1.AbstractClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(connreq_1.JsonValue, 0x8)
], CommandPropertyBag.prototype, "json", void 0);
CommandPropertyBag = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], CommandPropertyBag);
let CommandOutput = CommandOutput_1 = class CommandOutput extends nativeclass_1.NativeClass {
    // @nativeField(int32_t, 0x28)
    // successCount:int32_t;
    getSuccessCount() {
        (0, common_1.abstract)();
    }
    getType() {
        (0, common_1.abstract)();
    }
    /**
     * @deprecated use constructWith, Uniform naming conventions
     */
    constructAs(type) {
        this.constructWith(type);
    }
    constructWith(type) {
        (0, common_1.abstract)();
    }
    empty() {
        (0, common_1.abstract)();
    }
    /**
     * CommandOutput::set<std::string>()
     */
    set_string(key, value) {
        (0, common_1.abstract)();
    }
    /**
     * CommandOutput::set<int>()
     */
    set_int(key, value) {
        (0, common_1.abstract)();
    }
    /**
     * CommandOutput::set<int>()
     */
    set_bool(key, value) {
        (0, common_1.abstract)();
    }
    /**
     * CommandOutput::set<float>()
     */
    set_float(key, value) {
        (0, common_1.abstract)();
    }
    /**
     * CommandOutput::set<BlockPos>()
     */
    set_BlockPos(key, value) {
        (0, common_1.abstract)();
    }
    /**
     * CommandOutput::set<Vec3>()
     */
    set_Vec3(key, value) {
        (0, common_1.abstract)();
    }
    set(key, value) {
        switch (typeof value) {
            case "string":
                return this.set_string(key, value);
            case "boolean":
                return this.set_bool(key, value);
            case "number":
                if (value === (value | 0))
                    return this.set_int(key, value);
                else
                    return this.set_float(key, value);
            default:
                if (value instanceof blockpos_1.Vec3) {
                    return this.set_Vec3(key, value);
                }
                else if (value instanceof blockpos_1.BlockPos) {
                    return this.set_BlockPos(key, value);
                }
                else {
                    throw Error("Unexpected");
                }
        }
    }
    _successNoMessage() {
        (0, common_1.abstract)();
    }
    _success(message, params) {
        (0, common_1.abstract)();
    }
    /**
     * @param params CAUTION! it will destruct the parameters.
     */
    success(message, params) {
        if (message === undefined) {
            this._successNoMessage();
        }
        else {
            const _params = paramsToVector(params);
            this._success(message, _params);
            _params.destruct();
        }
    }
    _error(message, params) {
        (0, common_1.abstract)();
    }
    /**
     * @param params CAUTION! it will destruct the parameters.
     */
    error(message, params) {
        const _params = paramsToVector(params);
        this._error(message, _params);
        _params.destruct();
    }
    _addMessage(message, params) {
        (0, common_1.abstract)();
    }
    /**
     * @param params CAUTION! it will destruct the parameters.
     */
    addMessage(message, params = []) {
        const _params = paramsToVector(params);
        this._addMessage(message, _params);
        _params.destruct();
    }
    static constructWith(type) {
        const output = new CommandOutput_1(true);
        output.constructWith(type);
        return output;
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], CommandOutput.prototype, "type", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(CommandPropertyBag.ref())
], CommandOutput.prototype, "propertyBag", void 0);
CommandOutput = CommandOutput_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x30)
], CommandOutput);
exports.CommandOutput = CommandOutput;
let CommandOutputSender = class CommandOutputSender extends nativeclass_1.NativeClass {
    _toJson(commandOutput) {
        (0, common_1.abstract)();
    }
    sendToAdmins(origin, output, permission) {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], CommandOutputSender.prototype, "vftable", void 0);
CommandOutputSender = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], CommandOutputSender);
exports.CommandOutputSender = CommandOutputSender;
let MinecraftCommands = class MinecraftCommands extends nativeclass_1.NativeClass {
    handleOutput(origin, output) {
        (0, common_1.abstract)();
    }
    executeCommand(ctx, suppressOutput) {
        (0, common_1.abstract)();
    }
    /**
     * @deprecated use bedrockServer.commandRegistry
     */
    getRegistry() {
        (0, common_1.abstract)();
    }
    // not implemented
    // runCommand(command:HashedString, origin:CommandOrigin, ccVersion:number): void{
    //     abstract();
    // }
    static getOutputType(origin) {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], MinecraftCommands.prototype, "vftable", void 0);
MinecraftCommands = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], MinecraftCommands);
exports.MinecraftCommands = MinecraftCommands;
var CommandParameterDataType;
(function (CommandParameterDataType) {
    CommandParameterDataType[CommandParameterDataType["NORMAL"] = 0] = "NORMAL";
    CommandParameterDataType[CommandParameterDataType["ENUM"] = 1] = "ENUM";
    CommandParameterDataType[CommandParameterDataType["SOFT_ENUM"] = 2] = "SOFT_ENUM";
    CommandParameterDataType[CommandParameterDataType["POSTFIX"] = 3] = "POSTFIX";
})(CommandParameterDataType = exports.CommandParameterDataType || (exports.CommandParameterDataType = {}));
var CommandParameterOption;
(function (CommandParameterOption) {
    CommandParameterOption[CommandParameterOption["None"] = 0] = "None";
    CommandParameterOption[CommandParameterOption["EnumAutocompleteExpansion"] = 1] = "EnumAutocompleteExpansion";
    CommandParameterOption[CommandParameterOption["HasSemanticConstraint"] = 2] = "HasSemanticConstraint";
})(CommandParameterOption = exports.CommandParameterOption || (exports.CommandParameterOption = {}));
let CommandParameterData = class CommandParameterData extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(typeid_1.typeid_t)
], CommandParameterData.prototype, "tid", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], CommandParameterData.prototype, "parser", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], CommandParameterData.prototype, "name", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer, { ghost: true })
], CommandParameterData.prototype, "desc", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], CommandParameterData.prototype, "enumNameOrPostfix", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t, { ghost: true })
], CommandParameterData.prototype, "unk56", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], CommandParameterData.prototype, "enumOrPostfixSymbol", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], CommandParameterData.prototype, "type", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], CommandParameterData.prototype, "offset", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], CommandParameterData.prototype, "flag_offset", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], CommandParameterData.prototype, "optional", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t, { ghost: true })
], CommandParameterData.prototype, "pad73", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], CommandParameterData.prototype, "options", void 0);
CommandParameterData = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], CommandParameterData);
exports.CommandParameterData = CommandParameterData;
let CommandVFTable = class CommandVFTable extends nativeclass_1.NativeStruct {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], CommandVFTable.prototype, "destructor", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], CommandVFTable.prototype, "collectOptionalArguments", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], CommandVFTable.prototype, "execute", void 0);
CommandVFTable = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], CommandVFTable);
exports.CommandVFTable = CommandVFTable;
{
    // check command vftable
    const HelpCommand$vftable = symbols_1.proc["??_7HelpCommand@@6B@"];
    (0, warning_1.bdsxEqualsAssert)(HelpCommand$vftable.getPointer(0x00), symbols_1.proc["??_GHelpCommand@@UEAAPEAXI@Z"], "unexpected Command::vftable structure");
    (0, warning_1.bdsxEqualsAssert)(HelpCommand$vftable.getPointer(0x08), symbols_1.proc["?collectOptionalArguments@Command@@MEAA_NXZ"], "unexpected Command::vftable structure");
    (0, warning_1.bdsxEqualsAssert)(HelpCommand$vftable.getPointer(0x10), symbols_1.proc["?execute@HelpCommand@@UEBAXAEBVCommandOrigin@@AEAVCommandOutput@@@Z"], "unexpected Command::vftable structure");
}
class CommandRegistry extends typeid_1.HasTypeId {
    registerCommand(command, description, level, flag1, flag2) {
        (0, common_1.abstract)();
    }
    registerAlias(command, alias) {
        (0, common_1.abstract)();
    }
    /**
     * this method will destruct all parameters in params
     */
    registerOverload(name, commandClass, params) {
        const cls = commandClass;
        const size = cls[nativetype_1.NativeType.size];
        if (!size)
            throw Error(`${cls.name}: size is not defined`);
        const allocator = makefunc_1.makefunc.np((returnval) => {
            const ptr = capi_1.capi.malloc(size);
            const cmd = ptr.as(cls);
            cmd.construct();
            returnval.setPointer(cmd);
            return returnval;
        }, core_1.StaticPointer, { name: `${name} command::allocator` }, core_1.StaticPointer);
        const sig = this.findCommand(name);
        if (sig === null)
            throw Error(`${name}: command not found`);
        const overload = sig.overloads.prepare();
        overload.construct();
        overload.commandVersion = bin_1.bin.make64(1, 0x7fffffff);
        overload.allocator = allocator;
        overload.parameters.setFromArray(params);
        overload.commandVersionOffset = -1;
        this.registerOverloadInternal(sig, overload);
        for (const param of params) {
            param.destruct();
        }
    }
    registerOverloadInternal(signature, overload) {
        (0, common_1.abstract)();
    }
    getCommandName(command) {
        (0, common_1.abstract)();
    }
    findCommand(command) {
        (0, common_1.abstract)();
    }
    _serializeAvailableCommands(pk) {
        (0, common_1.abstract)();
    }
    serializeAvailableCommands() {
        const pk = packets_1.AvailableCommandsPacket.allocate();
        this._serializeAvailableCommands(pk);
        return pk;
    }
    /**
     * @deprecated use commandParser.get
     */
    static getParser(type) {
        (0, common_1.abstract)();
    }
    /**
     * @deprecated use commandParser.has
     */
    static hasParser(type) {
        (0, common_1.abstract)();
    }
    /**
     * @deprecated use commandParser.load
     */
    static loadParser(symbols) {
        (0, common_1.abstract)();
    }
    /**
     * @deprecated use commandParser.set
     */
    static setParser(type, parserFnPointer) {
        (0, common_1.abstract)();
    }
    /**
     * @deprecated no need to use
     */
    static setEnumParser(parserFnPointer) {
        (0, common_1.abstract)();
    }
    hasEnum(name) {
        return this.enumLookup.has(name);
    }
    getEnum(name) {
        const enumIndex = this.enumLookup.get(name);
        if (enumIndex === null)
            return null;
        return this.enums.get(enumIndex);
    }
    addEnumValues(name, values) {
        (0, common_1.abstract)();
    }
    getEnumValues(name) {
        const values = new Array();
        const _enum = this.getEnum(name);
        if (!_enum)
            return null;
        for (const { first: valueIndex } of _enum.values) {
            values.push(this.enumValues.get(valueIndex));
        }
        return values;
    }
    hasSoftEnum(name) {
        return this.softEnumLookup.has(name);
    }
    getSoftEnum(name) {
        const enumIndex = this.softEnumLookup.get(name);
        if (enumIndex == null)
            return null;
        return this.softEnums.get(enumIndex);
    }
    addSoftEnum(name, values) {
        (0, common_1.abstract)();
    }
    getSoftEnumValues(name) {
        const _enum = this.getSoftEnum(name);
        if (!_enum)
            return null;
        return _enum.list.toArray();
    }
    updateSoftEnum(type, name, values) {
        CommandSoftEnumRegistry$updateSoftEnum(this, type, name, values);
    }
}
exports.CommandRegistry = CommandRegistry;
(function (CommandRegistry) {
    var Parser_1;
    let Symbol = class Symbol extends nativeclass_1.NativeStruct {
    };
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
    ], Symbol.prototype, "value", void 0);
    Symbol = tslib_1.__decorate([
        (0, nativeclass_1.nativeClass)()
    ], Symbol);
    CommandRegistry.Symbol = Symbol;
    let Overload = class Overload extends nativeclass_1.NativeClass {
    };
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.bin64_t)
    ], Overload.prototype, "commandVersion", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(core_1.VoidPointer)
    ], Overload.prototype, "allocator", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(CommandParameterData))
    ], Overload.prototype, "parameters", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
    ], Overload.prototype, "commandVersionOffset", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.int32_t, 0x28)
    ], Overload.prototype, "u6", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(CommandRegistry.Symbol))
    ], Overload.prototype, "symbols", void 0);
    Overload = tslib_1.__decorate([
        (0, nativeclass_1.nativeClass)(0x48)
    ], Overload);
    CommandRegistry.Overload = Overload;
    let Signature = class Signature extends nativeclass_1.NativeClass {
    };
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
    ], Signature.prototype, "command", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
    ], Signature.prototype, "description", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(CommandRegistry.Overload))
    ], Signature.prototype, "overloads", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
    ], Signature.prototype, "permissionLevel", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(CommandRegistry.Symbol)
    ], Signature.prototype, "commandSymbol", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(CommandRegistry.Symbol)
    ], Signature.prototype, "commandAliasEnum", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
    ], Signature.prototype, "flags", void 0);
    Signature = tslib_1.__decorate([
        (0, nativeclass_1.nativeClass)(null)
    ], Signature);
    CommandRegistry.Signature = Signature;
    let ParseToken = class ParseToken extends nativeclass_1.NativeClass {
        getText() {
            return this.text.getString().slice(0, this.length);
        }
    };
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(core_1.StaticPointer, 0x18)
    ], ParseToken.prototype, "text", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
    ], ParseToken.prototype, "length", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(CommandRegistry.Symbol)
    ], ParseToken.prototype, "type", void 0);
    ParseToken = tslib_1.__decorate([
        (0, nativeclass_1.nativeClass)(null)
    ], ParseToken);
    CommandRegistry.ParseToken = ParseToken;
    let Enum = class Enum extends nativeclass_1.NativeClass {
    };
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
    ], Enum.prototype, "name", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(typeid_1.typeid_t)
    ], Enum.prototype, "tid", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(core_1.VoidPointer)
    ], Enum.prototype, "parser", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(cxxpair_1.CxxPair.make(nativetype_1.uint64_as_float_t, nativetype_1.bin64_t)))
    ], Enum.prototype, "values", void 0);
    Enum = tslib_1.__decorate([
        (0, nativeclass_1.nativeClass)()
    ], Enum);
    CommandRegistry.Enum = Enum;
    let SoftEnum = class SoftEnum extends nativeclass_1.NativeClass {
    };
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
    ], SoftEnum.prototype, "name", void 0);
    tslib_1.__decorate([
        (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(nativetype_1.CxxString))
    ], SoftEnum.prototype, "list", void 0);
    SoftEnum = tslib_1.__decorate([
        (0, nativeclass_1.nativeClass)()
    ], SoftEnum);
    CommandRegistry.SoftEnum = SoftEnum;
    let Parser = Parser_1 = class Parser extends nativeclass_1.AbstractClass {
        constructWith(registry, version) {
            (0, common_1.abstract)();
        }
        parseCommand(command) {
            (0, common_1.abstract)();
        }
        createCommand(origin) {
            (0, common_1.abstract)();
        }
        getErrorMessage() {
            (0, common_1.abstract)();
        }
        getErrorParams() {
            (0, common_1.abstract)();
        }
        static constructWith(registry, version) {
            const parser = new Parser_1(true);
            parser.constructWith(registry, version);
            return parser;
        }
    };
    Parser = Parser_1 = tslib_1.__decorate([
        (0, nativeclass_1.nativeClass)(0xc0)
    ], Parser);
    CommandRegistry.Parser = Parser;
})(CommandRegistry = exports.CommandRegistry || (exports.CommandRegistry = {}));
let Command = Command_1 = class Command extends nativeclass_1.NativeClass {
    [nativetype_1.NativeType.ctor]() {
        this.vftable = null;
        this.version = 0;
        this.registry = null;
        this.commandSymbol = -1;
        this.permissionLevel = 5;
        this.flags = 0;
    }
    [nativetype_1.NativeType.dtor]() {
        (0, common_1.abstract)();
    }
    run(origin, output) {
        (0, common_1.abstract)();
    }
    static mandatory(key, keyForIsSet, enumNameOrPostfix, type = CommandParameterDataType.NORMAL, name = key, options = CommandParameterOption.None) {
        const cmdclass = this;
        const paramType = cmdclass.typeOf(key);
        const offset = cmdclass.offsetOf(key);
        const flag_offset = keyForIsSet !== null ? cmdclass.offsetOf(keyForIsSet) : -1;
        return Command_1.manual(name, paramType, offset, flag_offset, false, enumNameOrPostfix, type, options);
    }
    static optional(key, keyForIsSet, enumNameOrPostfix, type = CommandParameterDataType.NORMAL, name = key, options = CommandParameterOption.None) {
        const cmdclass = this;
        const paramType = cmdclass.typeOf(key);
        const offset = cmdclass.offsetOf(key);
        const flag_offset = keyForIsSet !== null ? cmdclass.offsetOf(keyForIsSet) : -1;
        return Command_1.manual(name, paramType, offset, flag_offset, true, enumNameOrPostfix, type, options);
    }
    static manual(name, paramType, offset, flag_offset = -1, optional = false, enumNameOrPostfix, type = CommandParameterDataType.NORMAL, options = CommandParameterOption.None) {
        const param = CommandParameterData.construct();
        param.tid.id = (0, typeid_1.type_id)(CommandRegistry, paramType).id;
        param.enumNameOrPostfix = null;
        if (paramType instanceof commandparser.CommandMappedValue && paramType.nameUtf8 !== undefined) {
            // a soft enum is a string with autocompletions, for example, objectives in /scoreboard
            if (enumNameOrPostfix != null)
                throw Error(`CommandEnum does not support postfix`);
            param.enumNameOrPostfix = paramType.nameUtf8;
        }
        else {
            if (enumNameOrPostfix) {
                if (paramType === nativetype_1.int32_t) {
                    type = CommandParameterDataType.POSTFIX;
                    param.enumNameOrPostfix = capi_1.capi.permaUtf8(enumNameOrPostfix);
                }
                else {
                    console.error(colors.yellow(`${paramType.name} does not support postfix`));
                }
            }
        }
        param.parser = commandParser.get(paramType);
        param.name = name;
        param.type = type;
        param.enumOrPostfixSymbol = -1;
        param.offset = offset;
        param.flag_offset = flag_offset;
        param.optional = optional;
        param.options = options;
        return param;
    }
    static isWildcard(selectorBase) {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(CommandVFTable.ref())
], Command.prototype, "vftable", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t, { ghost: true })
], Command.prototype, "u1", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], Command.prototype, "version", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer, { ghost: true })
], Command.prototype, "u2", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(CommandRegistry.ref())
], Command.prototype, "registry", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t, { ghost: true })
], Command.prototype, "u3", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], Command.prototype, "commandSymbol", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int16_t, { ghost: true })
], Command.prototype, "u4", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], Command.prototype, "permissionLevel", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int16_t)
], Command.prototype, "flags", void 0);
Command = Command_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], Command);
exports.Command = Command;
Command.isWildcard = prochacker_1.procHacker.js("?isWildcard@Command@@KA_NAEBVCommandSelectorBase@@@Z", nativetype_1.bool_t, null, CommandSelectorBase);
const MobEffectClass = effects_1.MobEffect;
const ActorDefinitionIdentifierClass = actor_1.ActorDefinitionIdentifier;
function constptr(cls) {
    const nativecls = cls;
    const constptr = Object.create(nativecls.ref());
    constptr.name = nativecls.name + "*";
    constptr.symbol = mangle_1.mangle.constPointer(nativecls.symbol);
    return constptr;
}
CommandOutput.prototype.getSuccessCount = prochacker_1.procHacker.js("?getSuccessCount@CommandOutput@@QEBAHXZ", nativetype_1.int32_t, { this: CommandOutput });
CommandOutput.prototype.getType = prochacker_1.procHacker.js("?getType@CommandOutput@@QEBA?AW4CommandOutputType@@XZ", nativetype_1.int32_t, { this: CommandOutput });
CommandOutput.prototype.constructWith = prochacker_1.procHacker.js("??0CommandOutput@@QEAA@W4CommandOutputType@@@Z", nativetype_1.void_t, { this: CommandOutput }, nativetype_1.int32_t);
CommandOutput.prototype.empty = prochacker_1.procHacker.js("?empty@CommandOutput@@QEBA_NXZ", nativetype_1.bool_t, { this: CommandOutput });
CommandOutput.prototype.set_string = prochacker_1.procHacker.js("??$set@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@CommandOutput@@QEAAXPEBDV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", nativetype_1.void_t, { this: CommandOutput }, makefunc_1.makefunc.Utf8, nativetype_1.CxxString);
CommandOutput.prototype.set_int = prochacker_1.procHacker.js("??$set@H@CommandOutput@@QEAAXPEBDH@Z", nativetype_1.void_t, { this: CommandOutput }, makefunc_1.makefunc.Utf8, nativetype_1.int32_t);
CommandOutput.prototype.set_bool = prochacker_1.procHacker.js("??$set@_N@CommandOutput@@QEAAXPEBD_N@Z", nativetype_1.void_t, { this: CommandOutput }, makefunc_1.makefunc.Utf8, nativetype_1.bool_t);
CommandOutput.prototype.set_float = prochacker_1.procHacker.js("??$set@M@CommandOutput@@QEAAXPEBDM@Z", nativetype_1.void_t, { this: CommandOutput }, makefunc_1.makefunc.Utf8, nativetype_1.float32_t);
CommandOutput.prototype.set_BlockPos = prochacker_1.procHacker.js("??$set@VBlockPos@@@CommandOutput@@QEAAXPEBDVBlockPos@@@Z", nativetype_1.void_t, { this: CommandOutput }, makefunc_1.makefunc.Utf8, blockpos_1.BlockPos);
CommandOutput.prototype.set_Vec3 = function (k, v) {
    if (this.type !== CommandOutputType.DataSet)
        return;
    this.propertyBag.json.get(k).setValue({
        x: v.x,
        y: v.y,
        z: v.z,
    });
};
CommandOutput.prototype._successNoMessage = prochacker_1.procHacker.js("?success@CommandOutput@@QEAAXXZ", nativetype_1.void_t, { this: CommandOutput });
CommandOutput.prototype._success = prochacker_1.procHacker.js("?success@CommandOutput@@QEAAXAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEBV?$vector@VCommandOutputParameter@@V?$allocator@VCommandOutputParameter@@@std@@@3@@Z", nativetype_1.void_t, { this: CommandOutput }, nativetype_1.CxxString, CommandOutputParameterVector);
CommandOutput.prototype._error = prochacker_1.procHacker.js("?error@CommandOutput@@QEAAXAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEBV?$vector@VCommandOutputParameter@@V?$allocator@VCommandOutputParameter@@@std@@@3@@Z", nativetype_1.void_t, { this: CommandOutput }, nativetype_1.CxxString, CommandOutputParameterVector);
CommandOutput.prototype._addMessage = prochacker_1.procHacker.js("?addMessage@CommandOutput@@AEAAXAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEBV?$vector@VCommandOutputParameter@@V?$allocator@VCommandOutputParameter@@@std@@@3@W4CommandOutputMessageType@@@Z", nativetype_1.void_t, { this: CommandOutput }, nativetype_1.CxxString, CommandOutputParameterVector);
CommandOutput.prototype[nativetype_1.NativeType.dtor] = prochacker_1.procHacker.js("??1CommandOutput@@QEAA@XZ", nativetype_1.void_t, { this: CommandOutput });
CommandOutputSender.prototype._toJson = prochacker_1.procHacker.js("?_toJson@CommandOutputSender@@IEBA?AVValue@Json@@AEBVCommandOutput@@@Z", connreq_1.JsonValue, { this: CommandOutputSender, structureReturn: true }, CommandOutput);
CommandOutputSender.prototype.sendToAdmins = prochacker_1.procHacker.js("?sendToAdmins@CommandOutputSender@@QEAAXAEBVCommandOrigin@@AEBVCommandOutput@@W4CommandPermissionLevel@@@Z", nativetype_1.void_t, { this: MinecraftCommands }, commandorigin_1.CommandOrigin, CommandOutput, nativetype_1.int32_t);
MinecraftCommands.prototype.handleOutput = prochacker_1.procHacker.js("?handleOutput@MinecraftCommands@@QEBAXAEBVCommandOrigin@@AEBVCommandOutput@@@Z", nativetype_1.void_t, { this: MinecraftCommands }, commandorigin_1.CommandOrigin, CommandOutput);
// MinecraftCommands.prototype.executeCommand is defined at bdsx/command.ts
MinecraftCommands.getOutputType = prochacker_1.procHacker.js("?getOutputType@MinecraftCommands@@SA?AW4CommandOutputType@@AEBVCommandOrigin@@@Z", nativetype_1.int32_t, null, commandorigin_1.CommandOrigin);
CommandRegistry.abstract({
    enumValues: [cxxvector_1.CxxVector.make(nativetype_1.CxxString), 192],
    enums: [cxxvector_1.CxxVector.make(CommandRegistry.Enum), 216],
    enumLookup: [cxxmap_1.CxxMap.make(nativetype_1.CxxString, nativetype_1.uint32_t), 288],
    enumValueLookup: [cxxmap_1.CxxMap.make(nativetype_1.CxxString, nativetype_1.uint64_as_float_t), 304],
    commandSymbols: [cxxvector_1.CxxVector.make(CommandRegistry.Symbol), 320],
    signatures: [cxxmap_1.CxxMap.make(nativetype_1.CxxString, CommandRegistry.Signature), 344],
    softEnums: [cxxvector_1.CxxVector.make(CommandRegistry.SoftEnum), 488],
    softEnumLookup: [cxxmap_1.CxxMap.make(nativetype_1.CxxString, nativetype_1.uint32_t), 512],
});
CommandRegistry.prototype.registerOverloadInternal = prochacker_1.procHacker.js("?registerOverloadInternal@CommandRegistry@@AEAAXAEAUSignature@1@AEAUOverload@1@@Z", nativetype_1.void_t, { this: CommandRegistry }, CommandRegistry.Signature, CommandRegistry.Overload);
CommandRegistry.prototype.registerCommand = prochacker_1.procHacker.js("?registerCommand@CommandRegistry@@QEAAXAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@PEBDW4CommandPermissionLevel@@UCommandFlag@@3@Z", nativetype_1.void_t, { this: CommandRegistry }, nativetype_1.CxxString, makefunc_1.makefunc.Utf8, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.int32_t);
CommandRegistry.prototype.registerAlias = prochacker_1.procHacker.js("?registerAlias@CommandRegistry@@QEAAXV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@0@Z", nativetype_1.void_t, { this: CommandRegistry }, nativetype_1.CxxString, nativetype_1.CxxString);
CommandRegistry.prototype.getCommandName = prochacker_1.procHacker.js("?getCommandName@CommandRegistry@@QEBA?AV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEBV23@@Z", nativetype_1.CxxString, { structureReturn: true, this: CommandRegistry }, nativetype_1.CxxString);
CommandRegistry.prototype.findCommand = prochacker_1.procHacker.js("?findCommand@CommandRegistry@@AEAAPEAUSignature@1@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", CommandRegistry.Signature, { this: CommandRegistry }, nativetype_1.CxxString);
CommandRegistry.prototype.addEnumValues = prochacker_1.procHacker.js("?addEnumValues@CommandRegistry@@QEAAHAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEBV?$vector@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$allocator@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@2@@3@@Z", nativetype_1.int32_t, { this: CommandRegistry }, nativetype_1.CxxString, cxxvector_1.CxxVectorToArray.make(nativetype_1.CxxString));
CommandRegistry.prototype.addSoftEnum = prochacker_1.procHacker.js("?addSoftEnum@CommandRegistry@@QEAAHAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$vector@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$allocator@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@2@@3@@Z", nativetype_1.int32_t, { this: CommandRegistry }, nativetype_1.CxxString, cxxvector_1.CxxVectorToArray.make(nativetype_1.CxxString));
CommandRegistry.prototype._serializeAvailableCommands = prochacker_1.procHacker.js("?serializeAvailableCommands@CommandRegistry@@QEBA?AVAvailableCommandsPacket@@XZ", packets_1.AvailableCommandsPacket, { this: CommandRegistry }, packets_1.AvailableCommandsPacket);
Command.prototype[nativetype_1.NativeType.dtor] = nativeclass_1.vectorDeletingDestructor;
CommandRegistry.Parser.prototype.constructWith = prochacker_1.procHacker.js("??0Parser@CommandRegistry@@QEAA@AEBV1@H@Z", nativetype_1.void_t, { this: CommandRegistry.Parser }, CommandRegistry, nativetype_1.int32_t);
CommandRegistry.Parser.prototype[nativetype_1.NativeType.dtor] = prochacker_1.procHacker.js("??1Parser@CommandRegistry@@QEAA@XZ", nativetype_1.void_t, { this: CommandRegistry.Parser });
CommandRegistry.Parser.prototype.parseCommand = prochacker_1.procHacker.js("?parseCommand@Parser@CommandRegistry@@QEAA_NAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z", nativetype_1.bool_t, { this: CommandRegistry.Parser }, nativetype_1.CxxString);
CommandRegistry.Parser.prototype.createCommand = prochacker_1.procHacker.js("?createCommand@Parser@CommandRegistry@@QEAA?AV?$unique_ptr@VCommand@@U?$default_delete@VCommand@@@std@@@std@@AEBVCommandOrigin@@@Z", Command.ref(), { this: CommandRegistry.Parser, structureReturn: true }, commandorigin_1.CommandOrigin);
CommandRegistry.Parser.prototype.getErrorMessage = prochacker_1.procHacker.js("?getErrorMessage@Parser@CommandRegistry@@QEBAAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@XZ", nativetype_1.CxxString, { this: CommandRegistry.Parser });
CommandRegistry.Parser.prototype.getErrorParams = prochacker_1.procHacker.js("?getErrorParams@Parser@CommandRegistry@@QEBA?AV?$vector@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$allocator@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@2@@std@@XZ", cxxvector_1.CxxVectorToArray.make(nativetype_1.CxxString), { this: CommandRegistry.Parser, structureReturn: true });
Command.prototype.run = prochacker_1.procHacker.js("?run@Command@@QEBAXAEBVCommandOrigin@@AEAVCommandOutput@@@Z", nativetype_1.void_t, { this: Command }, commandorigin_1.CommandOrigin, CommandOutput);
// CommandSoftEnumRegistry is a class with only one field, which is a pointer to CommandRegistry.
// I can only find one member function so I am not sure if a dedicated class is needed.
const CommandSoftEnumRegistry$updateSoftEnum = prochacker_1.procHacker.js("?updateSoftEnum@CommandSoftEnumRegistry@@QEAAXW4SoftEnumUpdateType@@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$vector@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$allocator@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@2@@4@@Z", nativetype_1.void_t, null, CommandRegistry.ref().ref(), nativetype_1.uint8_t, nativetype_1.CxxString, cxxvector_1.CxxVectorToArray.make(nativetype_1.CxxString));
// list for not implemented
("CommandRegistry::parse<AutomaticID<Dimension,int> >"); // CommandRegistry::parse<DimensionId>
("CommandRegistry::parse<CommandIntegerRange>"); // Not supported yet(?) there is no type id for it
("CommandRegistry::parse<std::unique_ptr<Command,struct std::default_delete<Command> > >");
("CommandRegistry::parse<AgentCommand::Mode>");
("CommandRegistry::parse<AgentCommands::CollectCommand::CollectionSpecification>");
("CommandRegistry::parse<AgentCommands::Direction>");
("CommandRegistry::parse<AnimationMode>");
("CommandRegistry::parse<AreaType>");
("CommandRegistry::parse<BlockSlot>");
("CommandRegistry::parse<CodeBuilderCommand::Action>");
("CommandRegistry::parse<CommandOperator>");
("CommandRegistry::parse<Enchant::Type>");
("CommandRegistry::parse<EquipmentSlot>");
("CommandRegistry::parse<GameType>");
("CommandRegistry::parse<Mirror>");
("CommandRegistry::parse<ObjectiveSortOrder>");
("CommandRegistry::parse<Rotation>");
const commandenumImport = require("../commandenum");
/** @deprecated import it from bdsx/command */
exports.CommandMappedValue = commandparser.CommandMappedValue;
/** @deprecated import it from bdsx/command */
exports.CommandEnum = commandenumImport.CommandEnum;
/** @deprecated import it from bdsx/command */
exports.CommandRawEnum = commandenumImport.CommandRawEnum;
/** @deprecated import it from bdsx/command */
exports.CommandStringEnum = commandenumImport.CommandStringEnum;
/** @deprecated import it from bdsx/command */
exports.CommandIndexEnum = commandenumImport.CommandIndexEnum;
/** @deprecated import it from bdsx/command */
exports.CommandSoftEnum = commandenumImport.CommandSoftEnum;
class CommandBlockEnum extends exports.CommandEnum {
    constructor() {
        super("Block");
    }
    mapValue(value) {
        return block_1.Block.create(value.token);
    }
}
(function (Command) {
    Command.VFTable = CommandVFTable;
    Command.Block = new CommandBlockEnum();
    Command.MobEffect = constptr(MobEffectClass);
    Command.ActorDefinitionIdentifier = constptr(ActorDefinitionIdentifierClass);
})(Command = exports.Command || (exports.Command = {}));
exports.Command = Command;
/** @deprecated use Command.Block */
exports.CommandBlock = Command.Block;
/** @deprecated use Command.MobEffect */
exports.CommandMobEffect = Command.MobEffect;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxpQ0FBaUM7QUFDakMsZ0NBQTZCO0FBQzdCLGtDQUErQjtBQUUvQixrREFBdUQ7QUFDdkQsa0RBQWtEO0FBQ2xELHNDQUFxQztBQUNyQyxrQ0FBcUQ7QUFDckQsc0NBQW1DO0FBQ25DLHdDQUFxQztBQUNyQyw0Q0FBMkQ7QUFDM0QsMENBQXVDO0FBQ3ZDLHNDQUFtQztBQUNuQyxnREFBMko7QUFDM0osOENBY3VCO0FBQ3ZCLHdDQUFxQztBQUNyQyw4Q0FBMkM7QUFDM0Msb0RBQWdEO0FBQ2hELDRDQUF5QztBQUN6Qyx3Q0FBOEM7QUFDOUMsbUNBQTJEO0FBQzNELG1DQUFnQztBQUNoQyx5Q0FBNEM7QUFFNUMsbURBQWdEO0FBQ2hELHVDQUFzQztBQUN0Qyx1Q0FBc0M7QUFDdEMsMkNBQXdDO0FBQ3hDLHVDQUFvRDtBQUNwRCxxQ0FBd0M7QUFDeEMsdUNBQWlDO0FBQ2pDLHFDQUF3RDtBQUN4RCxJQUFPLGFBQWEsR0FBRyxhQUFhLENBQUMsYUFBYSxDQUFDO0FBRW5ELElBQVksc0JBT1g7QUFQRCxXQUFZLHNCQUFzQjtJQUM5Qix1RUFBTSxDQUFBO0lBQ04sMkVBQVEsQ0FBQTtJQUNSLG1FQUFJLENBQUE7SUFDSiwrRUFBVSxDQUFBO0lBQ1YscUVBQUssQ0FBQTtJQUNMLDJFQUFRLENBQUE7QUFDWixDQUFDLEVBUFcsc0JBQXNCLEdBQXRCLDhCQUFzQixLQUF0Qiw4QkFBc0IsUUFPakM7QUFFRCxJQUFZLGdCQU1YO0FBTkQsV0FBWSxnQkFBZ0I7SUFDeEIseURBQUssQ0FBQTtJQUNMLGdFQUFlLENBQUE7SUFDZixrQkFBa0I7SUFDbEIsOERBQWMsQ0FBQTtJQUNkLHVEQUFRLENBQUE7QUFDWixDQUFDLEVBTlcsZ0JBQWdCLEdBQWhCLHdCQUFnQixLQUFoQix3QkFBZ0IsUUFNM0I7QUFFRCxJQUFZLGtCQUdYO0FB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