"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = exports.CustomCommandFactoryWithSignature = exports.CustomCommandFactory = exports.CustomCommand = void 0;
const tslib_1 = require("tslib");
const colors = require("colors");
const command_1 = require("./bds/command");
const commandorigin_1 = require("./bds/commandorigin");
const symbols_1 = require("./bds/symbols");
const capi_1 = require("./capi");
const commandenum_1 = require("./commandenum");
const commandparser_1 = require("./commandparser");
const common_1 = require("./common");
const decay_1 = require("./decay");
const event_1 = require("./event");
const launcher_1 = require("./launcher");
const makefunc_1 = require("./makefunc");
const nativeclass_1 = require("./nativeclass");
const nativetype_1 = require("./nativetype");
const prochacker_1 = require("./prochacker");
const sharedpointer_1 = require("./sharedpointer");
let executeCommandOriginal;
function executeCommand(cmd, res, ctx, b) {
    try {
        const name = ctx.origin.getName();
        const resv = event_1.events.command.fire(ctx.command, name, ctx);
        switch (typeof resv) {
            case "number":
                res.result = resv;
                return res;
            default:
                return executeCommandOriginal(cmd, res, ctx, b);
        }
    }
    catch (err) {
        event_1.events.errorFire(err);
        res.result = -1;
        return res;
    }
}
command_1.MinecraftCommands.prototype.executeCommand = function (ctx, b) {
    const res = new command_1.MCRESULT(true);
    if (ctx instanceof sharedpointer_1.CxxSharedPtr) {
        executeCommand(this, res, ctx.p, b);
        ctx.dispose();
        return res;
    }
    else {
        return executeCommand(this, res, ctx, b);
    }
};
const Command$collectOptionalArguments = symbols_1.proc["?collectOptionalArguments@Command@@MEAA_NXZ"]; // return true
let CustomCommand = class CustomCommand extends command_1.Command {
    [nativetype_1.NativeType.ctor]() {
        this.self_vftable.destructor = customCommandDtor;
        this.self_vftable.collectOptionalArguments = Command$collectOptionalArguments;
        this.self_vftable.execute = null;
        this.vftable = this.self_vftable;
    }
    execute(origin, output) {
        // empty
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(command_1.Command.VFTable)
], CustomCommand.prototype, "self_vftable", void 0);
CustomCommand = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], CustomCommand);
exports.CustomCommand = CustomCommand;
CustomCommand.prototype[nativetype_1.NativeType.dtor] = common_1.emptyFunc; // remove the inherited destructor
class CustomCommandFactory {
    constructor(registry, name) {
        this.registry = registry;
        this.name = name;
    }
    overload(callback, parameters) {
        var _a;
        const paramInfos = [];
        class CustomCommandImpl extends CustomCommand {
            [nativetype_1.NativeType.ctor]() {
                this.self_vftable.execute = customCommandExecute;
            }
            execute(origin, output) {
                try {
                    const nobj = {};
                    for (const { key, optkey } of paramInfos) {
                        if (optkey == null || this[optkey]) {
                            const type = fields[key.toString()];
                            if (type instanceof commandparser_1.CommandMappedValue) {
                                nobj[key] = type.mapValue(this[key]);
                            }
                            else {
                                nobj[key] = this[key];
                            }
                        }
                    }
                    callback(nobj, origin, output);
                }
                catch (err) {
                    event_1.events.errorFire(err);
                }
            }
        }
        const fields = {};
        for (const [key, type_] of Object.entries(parameters)) {
            let type = type_;
            let optional = false;
            const info = {
                key: key,
                name: key,
                optkey: null,
                options: command_1.CommandParameterOption.None,
            };
            if (type instanceof Array) {
                const opts = type[1];
                if (typeof opts === "boolean") {
                    optional = opts;
                }
                else {
                    optional = !!opts.optional;
                    info.postfix = (_a = opts.postfix) !== null && _a !== void 0 ? _a : opts.description;
                    if (opts.options != null)
                        info.options = opts.options;
                    if (opts.name != null)
                        info.name = opts.name;
                }
                type = type[0];
            }
            if (key in fields)
                throw Error(`${key}: field name duplicated`);
            if (!commandparser_1.commandParser.has(type))
                throw Error(`CommandFactory.overload does not support ${type.name}, Please check bdsx/bds/commandparsertypes.ts`);
            fields[key] = type;
            if (optional) {
                const optkey = key + "__set";
                if (optkey in fields)
                    throw Error(`${optkey}: field name duplicated`);
                fields[optkey] = nativetype_1.bool_t;
                info.optkey = optkey;
            }
            paramInfos.push(info);
        }
        CustomCommandImpl.define(fields);
        const params = [];
        for (const { key, optkey, postfix, name, options } of paramInfos) {
            const type = fields[key];
            const dataType = type instanceof commandenum_1.CommandEnum
                ? command_1.CommandParameterDataType.ENUM
                : type instanceof commandenum_1.CommandSoftEnum
                    ? command_1.CommandParameterDataType.SOFT_ENUM
                    : command_1.CommandParameterDataType.NORMAL;
            if (optkey != null)
                params.push(CustomCommandImpl.optional(key, optkey, postfix, dataType, name, options));
            else
                params.push(CustomCommandImpl.mandatory(key, null, postfix, dataType, name, options));
        }
        const customCommandExecute = makefunc_1.makefunc.np(function (origin, output) {
            this.execute(origin, output);
            (0, decay_1.decay)(this);
            (0, decay_1.decay)(origin);
            (0, decay_1.decay)(output);
        }, nativetype_1.void_t, { this: CustomCommandImpl, name: `${this.name} command::execute` }, commandorigin_1.CommandOrigin, command_1.CommandOutput);
        this.registry.registerOverload(this.name, CustomCommandImpl, params);
        return this;
    }
    alias(alias) {
        this.registry.registerAlias(this.name, alias);
        return this;
    }
}
exports.CustomCommandFactory = CustomCommandFactory;
class CustomCommandFactoryWithSignature extends CustomCommandFactory {
    constructor(registry, name, signature) {
        super(registry, name);
        this.signature = signature;
    }
}
exports.CustomCommandFactoryWithSignature = CustomCommandFactoryWithSignature;
const commandEnumStored = Symbol("commandEnum");
function _enum(name, ...values) {
    const first = values[0];
    if (typeof first === "object") {
        if (first instanceof Array) {
            return new commandenum_1.CommandStringEnum(name, ...first);
        }
        else {
            const cmdenum = first[commandEnumStored];
            if (cmdenum != null) {
                if (cmdenum.name !== name) {
                    console.error(colors.yellow(`the enum name is different but it would not be applied. (${cmdenum.name} => ${name})`));
                }
                return cmdenum;
            }
            return (first[commandEnumStored] = new commandenum_1.CommandIndexEnum(name, first)); // store and reuse
        }
    }
    else {
        return new commandenum_1.CommandStringEnum(name, ...values);
    }
}
function softEnum(name, ...values) {
    const softenum = commandenum_1.CommandSoftEnum.getInstance(name);
    const first = values[0];
    softenum.addValues(Array.isArray(first) ? first : values);
    return softenum;
}
exports.command = {
    find(name) {
        const registry = launcher_1.bedrockServer.commandRegistry;
        const cmd = registry.findCommand(name);
        if (cmd === null)
            throw Error(`${name}: command not found`);
        return new CustomCommandFactoryWithSignature(registry, name, cmd);
    },
    register(name, description, perm = command_1.CommandPermissionLevel.Normal, flags1 = command_1.CommandCheatFlag.NotCheat, flags2 = command_1.CommandUsageFlag._Unknown) {
        const registry = launcher_1.bedrockServer.commandRegistry;
        const cmd = registry.findCommand(name);
        if (cmd !== null)
            throw Error(`${name}: command already registered`);
        registry.registerCommand(name, description, perm, flags1, flags2);
        return new CustomCommandFactory(registry, name);
    },
    softEnum,
    enum: _enum,
    /**
     * built-in enum system
     */
    rawEnum(name) {
        return commandenum_1.CommandRawEnum.getInstance(name);
    },
};
const customCommandDtor = makefunc_1.makefunc.np(function (delIt) {
    this[nativetype_1.NativeType.dtor]();
    if (delIt & 1) {
        capi_1.capi.free(this);
    }
}, nativetype_1.void_t, {
    this: CustomCommand,
    name: "CustomCommand::destructor",
    crossThread: true,
}, nativetype_1.int32_t);
launcher_1.bedrockServer.withLoading().then(() => {
    executeCommandOriginal = prochacker_1.procHacker.hooking("?executeCommand@MinecraftCommands@@QEBA?AUMCRESULT@@AEAVCommandContext@@_N@Z", command_1.MCRESULT, null, command_1.MinecraftCommands, command_1.MCRESULT, command_1.CommandContext, nativetype_1.bool_t)(executeCommand);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLGlDQUFpQztBQUNqQywyQ0FjdUI7QUFDdkIsdURBQW9EO0FBQ3BELDJDQUFxQztBQUNyQyxpQ0FBOEI7QUFDOUIsK0NBQWtIO0FBRWxILG1EQUFvRTtBQUNwRSxxQ0FBcUM7QUFDckMsbUNBQWdDO0FBQ2hDLG1DQUFpQztBQUNqQyx5Q0FBMkM7QUFDM0MseUNBQXNDO0FBQ3RDLCtDQUF5RDtBQUN6RCw2Q0FBeUU7QUFDekUsNkNBQTBDO0FBQzFDLG1EQUErQztBQUUvQyxJQUFJLHNCQUE4RyxDQUFDO0FBQ25ILFNBQVMsY0FBYyxDQUFDLEdBQXNCLEVBQUUsR0FBYSxFQUFFLEdBQW1CLEVBQUUsQ0FBUztJQUN6RixJQUFJO1FBQ0EsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNsQyxNQUFNLElBQUksR0FBRyxjQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6RCxRQUFRLE9BQU8sSUFBSSxFQUFFO1lBQ2pCLEtBQUssUUFBUTtnQkFDVCxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDbEIsT0FBTyxHQUFHLENBQUM7WUFDZjtnQkFDSSxPQUFPLHNCQUFzQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3ZEO0tBQ0o7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNWLGNBQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEIsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoQixPQUFPLEdBQUcsQ0FBQztLQUNkO0FBQ0wsQ0FBQztBQUVELDJCQUFpQixDQUFDLFNBQVMsQ0FBQyxj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