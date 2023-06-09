"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandParser = exports.CommandMappedValue = void 0;
const symbols_1 = require("./bds/symbols");
const core_1 = require("./core");
const makefunc_1 = require("./makefunc");
const nativeclass_1 = require("./nativeclass");
const nativetype_1 = require("./nativetype");
const colors = require("colors");
/**
 * For finding the default enum parser.
 * There is no default parser symbol, but many parsers refer to the default parser.
 */
function selectMore(...symbols) {
    let maximum = {
        addr: new core_1.NativePointer(),
        count: 0,
        symbol: "",
    };
    const map = new Map();
    for (const symbol of symbols) {
        const addr = symbols_1.proc[symbol];
        const addrbin = addr.getAddressBin();
        let item = map.get(addrbin);
        if (item === undefined) {
            map.set(addrbin, (item = { count: 1, addr, symbol }));
        }
        else {
            item.count = (item.count + 1) | 0;
        }
        if (item.count > maximum.count) {
            maximum = item;
        }
    }
    for (const item of map.values()) {
        if (item !== maximum) {
            console.error(colors.yellow(`[BDSX] selectMore exception: ${item.symbol}`));
        }
    }
    return maximum.addr;
}
const parsers = new Map();
const stringParser = symbols_1.proc["??$parse@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@CommandRegistry@@AEBA_NPEAXAEBUParseToken@0@AEBVCommandOrigin@@HAEAV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEAV?$vector@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$allocator@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@2@@4@@Z"];
let enumParser = selectMore("??$parseEnum@W4Mode@ExecuteCommand@@U?$DefaultIdConverter@W4Mode@ExecuteCommand@@@CommandRegistry@@@CommandRegistry@@AEBA_NPEAXAEBUParseToken@0@AEBVCommandOrigin@@HAEAV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEAV?$vector@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$allocator@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@2@@4@@Z", "??$parseEnum@W4DebuggerAction@ScriptDebugCommand@@U?$DefaultIdConverter@W4DebuggerAction@ScriptDebugCommand@@@CommandRegistry@@@CommandRegistry@@AEBA_NPEAXAEBUParseToken@0@AEBVCommandOrigin@@HAEAV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEAV?$vector@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$allocator@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@2@@4@@Z", "??$parseEnum@W4ActionType@ResourceUriCommand@@U?$DefaultIdConverter@W4ActionType@ResourceUriCommand@@@CommandRegistry@@@CommandRegistry@@AEBA_NPEAXAEBUParseToken@0@AEBVCommandOrigin@@HAEAV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEAV?$vector@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$allocator@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@2@@4@@Z", "??$parseEnum@W4StructureActionType@@U?$DefaultIdConverter@W4StructureActionType@@@CommandRegistry@@@CommandRegistry@@AEBA_NPEAXAEBUParseToken@0@AEBVCommandOrigin@@HAEAV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEAV?$vector@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$allocator@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@2@@4@@Z", "??$parseEnum@W4WatchdogAction@ScriptDebugCommand@@U?$DefaultIdConverter@W4WatchdogAction@ScriptDebugCommand@@@CommandRegistry@@@CommandRegistry@@AEBA_NPEAXAEBUParseToken@0@AEBVCommandOrigin@@HAEAV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEAV?$vector@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$allocator@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@2@@4@@Z", "??$parseEnum@W4Biomes@LocateCommandUtil@@U?$DefaultIdConverter@W4Biomes@LocateCommandUtil@@@CommandRegistry@@@CommandRegistry@@AEBA_NPEAXAEBUParseToken@0@AEBVCommandOrigin@@HAEAV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEAV?$vector@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$allocator@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@2@@4@@Z", "??$parseEnum@W4ActorLocation@@U?$DefaultIdConverter@W4ActorLocation@@@CommandRegistry@@@CommandRegistry@@AEBA_NPEAXAEBUParseToken@0@AEBVCommandOrigin@@HAEAV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEAV?$vector@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$allocator@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@2@@4@@Z");
function passNativeTypeCtorParams(type) {
    if (nativeclass_1.NativeClass.isNativeClassType(type)) {
        return [
            type[nativetype_1.NativeType.size],
            type[nativetype_1.NativeType.align],
            v => type.isTypeOf(v),
            v => type.isTypeOfWeak(v),
            (ptr, offset) => type[nativetype_1.NativeType.getter](ptr, offset),
            (ptr, param, offset) => type[nativetype_1.NativeType.setter](ptr, param, offset),
            (stackptr, offset) => type[makefunc_1.makefunc.getFromParam](stackptr, offset),
            (stackptr, param, offset) => type[makefunc_1.makefunc.setToParam](stackptr, param, offset),
            ptr => type[nativetype_1.NativeType.ctor](ptr),
            ptr => type[nativetype_1.NativeType.dtor](ptr),
            (to, from) => type[nativetype_1.NativeType.ctor_copy](to, from),
            (to, from) => type[nativetype_1.NativeType.ctor_move](to, from),
        ];
    }
    else {
        return [
            type[nativetype_1.NativeType.size],
            type[nativetype_1.NativeType.align],
            type.isTypeOf,
            type.isTypeOfWeak,
            type[nativetype_1.NativeType.getter],
            type[nativetype_1.NativeType.setter],
            type[makefunc_1.makefunc.getFromParam],
            type[makefunc_1.makefunc.setToParam],
            type[nativetype_1.NativeType.ctor],
            type[nativetype_1.NativeType.dtor],
            type[nativetype_1.NativeType.ctor_copy],
            type[nativetype_1.NativeType.ctor_move],
        ];
    }
}
/**
 * The command parameter type with the type converter
 */
class CommandMappedValue extends nativetype_1.CommandParameterNativeType {
    constructor(type, symbol = type.symbol, name = type.name) {
        super(symbol, name, ...passNativeTypeCtorParams(type));
    }
}
exports.CommandMappedValue = CommandMappedValue;
var commandParser;
(function (commandParser) {
    let Type;
    (function (Type) {
        Type[Type["Unknown"] = 0] = "Unknown";
        Type[Type["Int"] = 1] = "Int";
        Type[Type["String"] = 2] = "String";
    })(Type = commandParser.Type || (commandParser.Type = {}));
    function get(type) {
        if (type instanceof CommandMappedValue && type.getParser !== undefined) {
            return type.getParser();
        }
        const parser = parsers.get(type);
        if (parser != null)
            return parser;
        throw Error(`${type.name} parser not found`);
    }
    commandParser.get = get;
    function has(type) {
        if (type instanceof CommandMappedValue && type.getParser !== undefined)
            return true;
        return parsers.has(type);
    }
    commandParser.has = has;
    function load(symbols) {
        for (const [type, addr] of symbols.iterateParsers()) {
            parsers.set(type, addr);
        }
    }
    commandParser.load = load;
    function set(type, parserFnPointer) {
        parsers.set(type, parserFnPointer);
    }
    commandParser.set = set;
    /**
     * @deprecated no need to use
     */
    function setEnumParser(parserFnPointer) {
        enumParser = parserFnPointer;
    }
    commandParser.setEnumParser = setEnumParser;
    function getType(parser) {
        if (parser.equalsptr(stringParser)) {
            return Type.String;
        }
        else if (parser.equalsptr(enumParser)) {
            return Type.Int;
        }
        else {
            return Type.Unknown;
        }
    }
    commandParser.getType = getType;
})(commandParser = exports.commandParser || (exports.commandParser = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZHBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbW1hbmRwYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsMkNBQXFDO0FBQ3JDLGlDQUFtRTtBQUNuRSx5Q0FBc0M7QUFDdEMsK0NBQTRDO0FBQzVDLDZDQUE4RjtBQUM5RixpQ0FBaUM7QUFFakM7OztHQUdHO0FBQ0gsU0FBUyxVQUFVLENBQUMsR0FBRyxPQUFpQjtJQU1wQyxJQUFJLE9BQU8sR0FBUztRQUNoQixJQUFJLEVBQUUsSUFBSSxvQkFBYSxFQUFFO1FBQ3pCLEtBQUssRUFBRSxDQUFDO1FBQ1IsTUFBTSxFQUFFLEVBQUU7S0FDYixDQUFDO0lBQ0YsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQWdCLENBQUM7SUFDcEMsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUU7UUFDMUIsTUFBTSxJQUFJLEdBQUcsY0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVCLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUNwQixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN6RDthQUFNO1lBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3JDO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDNUIsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNsQjtLQUNKO0lBQ0QsS0FBSyxNQUFNLElB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