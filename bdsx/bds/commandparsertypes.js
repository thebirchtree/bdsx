"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asmcode_1 = require("../asm/asmcode");
const commandparser_1 = require("../commandparser");
const nativetype_1 = require("../nativetype");
const blockpos_1 = require("./blockpos");
const cmdsymbolloader_1 = require("./cmdsymbolloader");
const command_1 = require("./command");
const connreq_1 = require("./connreq");
const typeid_1 = require("./typeid");
/**
 * types for the command parameter parser
 */
const types = [
    nativetype_1.int32_t,
    nativetype_1.float32_t,
    nativetype_1.CxxString,
    command_1.ActorWildcardCommandSelector,
    command_1.ActorCommandSelector,
    command_1.PlayerCommandSelector,
    blockpos_1.RelativeFloat,
    command_1.CommandFilePath,
    // CommandIntegerRange,
    command_1.CommandMessage,
    command_1.CommandPosition,
    command_1.CommandPositionFloat,
    command_1.CommandRawText,
    command_1.CommandWildcardInt,
    // CommandOperator,
    connreq_1.JsonValue,
    command_1.Command.MobEffect,
];
const typesWithTypeIdPtr = [
    nativetype_1.bool_t,
    command_1.CommandItem,
    // Command.Block,
    command_1.Command.ActorDefinitionIdentifier,
];
const symbols = new cmdsymbolloader_1.CommandSymbols();
symbols.addParserSymbols(types);
symbols.addParserSymbols(typesWithTypeIdPtr);
symbols.addCounterSymbol(command_1.CommandRegistry);
symbols.addTypeIdFnSymbols(command_1.CommandRegistry, types);
symbols.addTypeIdPtrSymbols(command_1.CommandRegistry, typesWithTypeIdPtr);
typeid_1.type_id.load(symbols);
commandparser_1.commandParser.load(symbols);
typeid_1.type_id.clone(command_1.CommandRegistry, command_1.ActorWildcardCommandSelector, command_1.PlayerWildcardCommandSelector);
commandparser_1.commandParser.set(command_1.PlayerWildcardCommandSelector, commandparser_1.commandParser.get(command_1.ActorWildcardCommandSelector));
commandparser_1.commandParser.set(command_1.Command.Block, asmcode_1.asmcode.returnZero);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZHBhcnNlcnR5cGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tbWFuZHBhcnNlcnR5cGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQXlDO0FBQ3pDLG9EQUFpRDtBQUNqRCw4Q0FBc0U7QUFDdEUseUNBQTJDO0FBQzNDLHVEQUFtRDtBQUNuRCx1Q0FjbUI7QUFDbkIsdUNBQXNDO0FBQ3RDLHFDQUFtQztBQUVuQzs7R0FFRztBQUNILE1BQU0sS0FBSyxHQUFHO0lBQ1Ysb0JBQU87SUFDUCxzQkFBUztJQUNULHNCQUFTO0lBQ1Qsc0NBQTRCO0lBQzVCLDhCQUFvQjtJQUNwQiwrQkFBcUI7SUFDckIsd0JBQWE7SUFDYix5QkFBZTtJQUNmLHVCQUF1QjtJQUN2Qix3QkFBYztJQUNkLHlCQUFlO0lBQ2YsOEJBQW9CO0lBQ3BCLHdCQUFjO0lBQ2QsNEJBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQixtQkFBUztJQUNULGlCQUFPLENBQUMsU0FBUztDQUNwQixDQUFDO0FBQ0YsTUFBTSxrQkFBa0IsR0FBRztJQUN2QixtQkFBTTtJQUNOLHFCQUFXO0lBQ1gsaUJBQWlCO0lBQ2pCLGlCQUFPLENBQUMseUJBQXlCO0NBQ3BDLENBQUM7QUFFRixNQUFNLE9BQU8sR0FBRyxJQUFJLGdDQUFjLEVBQUUsQ0FBQztBQUNyQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDaEMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDN0MsT0FBTyxDQUFDLGdCQUFnQixDQUFDLHlCQUFlLENBQUMsQ0FBQztBQUMxQyxPQUFPLENBQUMsa0JBQWtCLENBQUMseUJBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNuRCxPQUFPLENBQUMsbUJBQW1CLENBQUMseUJBQWUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0FBQ2pFLGdCQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3RCLDZCQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzVCLGdCQUFPLENBQUMsS0FBSyxDQUFDLHlCQUFlLEVBQUUsc0NBQTRCLEVBQUUsdUNBQTZCLENBQUMsQ0FBQztBQUM1Riw2QkFBYSxDQUFDLEdBQUcsQ0FBQyx1Q0FBNkIsRUFBRSw2QkFBYSxDQUFDLEdBQUcsQ0FBQyxzQ0FBNEIsQ0FBRSxDQUFDLENBQUM7QUFDbkcsNkJBQWEsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxLQUFLLEVBQUUsaUJBQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyJ9