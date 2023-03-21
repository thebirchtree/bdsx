"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandSoftEnum = exports.CommandIndexEnum = exports.CommandStringEnum = exports.CommandRawEnum = exports.CommandEnum = exports.EnumResult = void 0;
const tslib_1 = require("tslib");
const colors = require("colors");
const command_1 = require("./bds/command");
const commandorigin_1 = require("./bds/commandorigin");
const typeid_1 = require("./bds/typeid");
const capi_1 = require("./capi");
const commandparser_1 = require("./commandparser");
const core_1 = require("./core");
const cxxvector_1 = require("./cxxvector");
const event_1 = require("./event");
const launcher_1 = require("./launcher");
const makefunc_1 = require("./makefunc");
const nativeclass_1 = require("./nativeclass");
const nativetype_1 = require("./nativetype");
const util_1 = require("./util");
const enumResults = new Set();
let EnumResult = class EnumResult extends nativeclass_1.NativeClass {
    [nativetype_1.NativeType.ctor]() {
        enumResults.add(this.getAddressBin());
    }
    [nativetype_1.NativeType.dtor]() {
        enumResults.delete(this.getAddressBin());
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t, { ghost: true })
], EnumResult.prototype, "intValue", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bin64_t, { ghost: true })
], EnumResult.prototype, "bin64Value", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int64_as_float_t, { ghost: true })
], EnumResult.prototype, "int64Value", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], EnumResult.prototype, "stringValue", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], EnumResult.prototype, "token", void 0);
EnumResult = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], EnumResult);
exports.EnumResult = EnumResult;
class CommandEnumBase extends commandparser_1.CommandMappedValue {
    constructor(type, symbol, name) {
        super(type, symbol, name);
        this.nameUtf8 = capi_1.capi.permaUtf8(this.name);
    }
    getParser() {
        return new core_1.VoidPointer();
    }
}
class CommandEnum extends CommandEnumBase {
    constructor(symbol, name) {
        super(EnumResult, symbol, name || symbol);
    }
}
exports.CommandEnum = CommandEnum;
/**
 * built-in enum wrapper
 * one instance per one enum
 */
class CommandRawEnum extends CommandEnum {
    constructor(name) {
        super(name, name);
        this.name = name;
        this.enumIndex = -1;
        this.idRegistered = false;
        this.parserType = commandparser_1.commandParser.Type.Int;
        this.isBuiltInEnum = false;
        if (CommandRawEnum.all.has(name))
            throw Error(`the enum parser already exists (name=${name})`);
        this._update();
        this.isBuiltInEnum = this.enumIndex !== -1;
    }
    _update() {
        if (this.enumIndex !== -1)
            return true; // already hooked
        const registry = launcher_1.bedrockServer.commandRegistry;
        const enumIdex = registry.enumLookup.get(this.name);
        if (enumIdex === null)
            return false;
        this.enumIndex = enumIdex;
        const enumobj = registry.enums.get(this.enumIndex);
        this.parserType = commandparser_1.commandParser.getType(enumobj.parser);
        // hook the enum parser, provides extra information.
        const original = makefunc_1.makefunc.js(enumobj.parser, nativetype_1.bool_t, null, command_1.CommandRegistry, EnumResult, core_1.StaticPointer, commandorigin_1.CommandOrigin, nativetype_1.int32_t, nativetype_1.CxxString, cxxvector_1.CxxVector.make(nativetype_1.CxxString));
        enumobj.parser = makefunc_1.makefunc.np((registry, storage, tokenPtr, origin, version, error, errorParams) => {
            const ret = original(registry, storage, tokenPtr, origin, version, error, errorParams);
            if (enumResults.delete(storage.getAddressBin())) {
                const token = tokenPtr.getPointerAs(command_1.CommandRegistry.ParseToken);
                storage.token = token.getText();
            }
            return ret;
        }, nativetype_1.bool_t, null, command_1.CommandRegistry, EnumResult, core_1.StaticPointer, commandorigin_1.CommandOrigin.ref(), nativetype_1.int32_t, nativetype_1.CxxString, cxxvector_1.CxxVector.make(nativetype_1.CxxString));
        return true;
    }
    addValues(values) {
        const registry = launcher_1.bedrockServer.commandRegistry;
        const id = registry.addEnumValues(this.name, values);
        if (!this.idRegistered) {
            this.idRegistered = true;
            typeid_1.type_id.register(command_1.CommandRegistry, this, id);
        }
        if (!this._update()) {
            throw Error(`enum parser is not generated (name=${this.name})`);
        }
    }
    getValues() {
        const values = new Array();
        if (this.enumIndex === -1)
            return values;
        const registry = launcher_1.bedrockServer.commandRegistry;
        const enumobj = registry.enums.get(this.enumIndex);
        for (const { first: valueIndex } of enumobj.values) {
            values.push(registry.enumValues.get(valueIndex));
        }
        return values;
    }
    getValueCount() {
        if (this.enumIndex === -1)
            return 0;
        const registry = launcher_1.bedrockServer.commandRegistry;
        const enumobj = registry.enums.get(this.enumIndex);
        return enumobj.values.size();
    }
    mapValue(value) {
        switch (this.parserType) {
            case commandparser_1.commandParser.Type.Unknown:
                return value.token.toLowerCase();
            case commandparser_1.commandParser.Type.Int:
                return value.intValue;
            case commandparser_1.commandParser.Type.String:
                return value.stringValue;
        }
    }
    static getInstance(name) {
        let parser = CommandRawEnum.all.get(name);
        if (parser != null)
            return parser;
        parser = new CommandRawEnum(name);
        CommandRawEnum.all.set(name, parser);
        return parser;
    }
}
exports.CommandRawEnum = CommandRawEnum;
CommandRawEnum.all = new Map();
class CommandMappedEnum extends CommandEnum {
    constructor() {
        super(...arguments);
        this.mapper = new Map();
    }
    _init() {
        const keys = [...this.mapper.keys()];
        for (const value of keys) {
            if (value === "")
                throw Error(`${value}: enum value cannot be empty`); // It will be ignored by CommandRegistry::addEnumValues if it is empty
            /*
                Allowed special characters:
                - (
                - )
                - -
                - .
                - ?
                - _
                and the ones whose ascii code is bigger than 127, like §, ©, etc.
            */
            const regex = /[ -'*-,/:->@[-^`{-~]/g;
            let invalidCharacters = "";
            let matched;
            while ((matched = regex.exec(value)) !== null) {
                invalidCharacters += matched[0];
            }
            if (invalidCharacters !== "")
                throw Error(`${value}: enum value contains invalid characters (${invalidCharacters})`);
        }
        this.raw = CommandRawEnum.getInstance(this.name);
        this.raw.addValues(keys);
        if (this.raw.isBuiltInEnum) {
            console.error(colors.yellow(`Warning, built-in enum is extended(name = ${this.name})`));
        }
    }
    mapValue(value) {
        // it can return the undefined value if it overlaps the raw enum.
        return this.mapper.get(value.token.toLocaleLowerCase());
    }
}
class CommandStringEnum extends CommandMappedEnum {
    constructor(name, ...values) {
        super(name);
        this.values = values;
        for (const value of values) {
            const lower = value.toLocaleLowerCase();
            if (this.mapper.has(lower)) {
                throw Error(`${value}: enum value duplicated`);
            }
            this.mapper.set(lower, value);
        }
        this._init();
    }
}
exports.CommandStringEnum = CommandStringEnum;
class CommandIndexEnum extends CommandMappedEnum {
    constructor(name, enumType) {
        super(name);
        this.enum = enumType;
        for (const key of (0, util_1.getEnumKeys)(enumType)) {
            const lower = key.toLocaleLowerCase();
            if (this.mapper.has(lower)) {
                throw Error(`${key}: enum value duplicated`);
            }
            this.mapper.set(lower, enumType[key]);
        }
        this._init();
    }
}
exports.CommandIndexEnum = CommandIndexEnum;
class CommandSoftEnum extends CommandEnumBase {
    constructor(name) {
        var _a, _b;
        super(nativetype_1.CxxString, nativetype_1.CxxString.symbol, name);
        this.enumIndex = -1;
        if (CommandSoftEnum.all.has(name))
            throw Error(`the enum parser already exists (name=${name})`);
        const registry = launcher_1.bedrockServer.commandRegistry;
        this.enumIndex = (_a = registry.softEnumLookup.get(this.name)) !== null && _a !== void 0 ? _a : -1;
        if (this.enumIndex === -1) {
            registry.addSoftEnum(this.name, []);
            registry.softEnumLookup.get(this.name);
            this.enumIndex = (_b = registry.softEnumLookup.get(this.name)) !== null && _b !== void 0 ? _b : -1;
        }
        // No type id should be registered, it is the type of string
    }
    updateValues(mode, values) {
        launcher_1.bedrockServer.commandRegistry.updateSoftEnum(mode, this.name, values);
    }
    getParser() {
        return commandparser_1.commandParser.get(nativetype_1.CxxString);
    }
    mapValue(value) {
        return value;
    }
    addValues(...values) {
        const first = values[0];
        if (Array.isArray(first)) {
            values = first;
        }
        this.updateValues(command_1.SoftEnumUpdateType.Add, values);
    }
    removeValues(...values) {
        const first = values[0];
        if (Array.isArray(first)) {
            values = first;
        }
        this.updateValues(command_1.SoftEnumUpdateType.Remove, values);
    }
    setValues(...values) {
        const first = values[0];
        if (Array.isArray(first)) {
            values = first;
        }
        this.updateValues(command_1.SoftEnumUpdateType.Replace, values);
    }
    getValues() {
        const values = new Array();
        if (this.enumIndex === -1)
            return values;
        const enumobj = launcher_1.bedrockServer.commandRegistry.softEnums.get(this.enumIndex);
        return enumobj.list.toArray();
    }
    getValueCount() {
        if (this.enumIndex === -1)
            return 0;
        const enumobj = launcher_1.bedrockServer.commandRegistry.softEnums.get(this.enumIndex);
        return enumobj.list.size();
    }
    static getInstance(name) {
        let parser = CommandSoftEnum.all.get(name);
        if (parser != null)
            return parser;
        parser = new CommandSoftEnum(name);
        CommandSoftEnum.all.set(name, parser);
        return parser;
    }
}
exports.CommandSoftEnum = CommandSoftEnum;
CommandSoftEnum.all = new Map();
event_1.events.serverOpen.on(() => {
    // To hook parseEnum<class CommandBlockName>; for Command.Block
    CommandRawEnum.getInstance("Block");
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZGVudW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21tYW5kZW51bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsaUNBQWlDO0FBQ2pDLDJDQUFvRTtBQUNwRSx1REFBb0Q7QUFDcEQseUNBQXVDO0FBQ3ZDLGlDQUE4QjtBQUM5QixtREFBb0U7QUFDcEUsaUNBQW9EO0FBQ3BELDJDQUF3QztBQUN4QyxtQ0FBaUM7QUFDakMseUNBQTJDO0FBQzNDLHlDQUFzQztBQUN0QywrQ0FBc0U7QUFDdEUsNkNBQXVHO0FBQ3ZHLGlDQUFxQztBQUVyQyxNQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFDO0FBRS9CLElBQU0sVUFBVSxHQUFoQixNQUFNLFVBQVcsU0FBUSx5QkFBVztJQVl2QyxDQUFDLHVCQUFVLENBQUMsSUFBSSxDQUFDO1FBQ2IsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBQ0QsQ0FBQyx1QkFBVSxDQUFDLElBQUksQ0FBQztRQUNiLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUNKLENBQUE7QUFoQkc7SUFEQyxJQUFBLHlCQUFXLEVBQUMsb0JBQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQzs0Q0FDcEI7QUFFbEI7SUFEQyxJQUFBLHlCQUFXLEVBQUMsb0JBQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQzs4Q0FDbEI7QUFFcEI7SUFEQyxJQUFBLHlCQUFXLEVBQUMsNkJBQWdCLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7OENBQ2xCO0FBRTdCO0lBREMsSUFBQSx5QkFBVyxFQUFDLHNCQUFTLENBQUM7K0NBQ0E7QUFFdkI7SUFEQyxJQUFBLHlCQUFXLEVBQUMsc0JBQVMsQ0FBQzt5Q0FDTjtBQVZSLFVB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