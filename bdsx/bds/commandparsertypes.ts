import { asmcode } from "../asm/asmcode";
import { commandParser } from "../commandparser";
import { bool_t, CxxString, float32_t, int32_t } from "../nativetype";
import { RelativeFloat } from "./blockpos";
import { CommandSymbols } from "./cmdsymbolloader";
import {
    ActorCommandSelector,
    ActorWildcardCommandSelector,
    Command,
    CommandFilePath,
    CommandIntegerRange,
    CommandItem,
    CommandMessage,
    CommandPosition,
    CommandPositionFloat,
    CommandRawText,
    CommandRegistry,
    CommandWildcardInt,
    PlayerCommandSelector,
    PlayerWildcardCommandSelector,
} from "./command";
import { JsonValue } from "./connreq";
import { type_id } from "./typeid";

/**
 * types for the command parameter parser
 */
const types = [
    int32_t,
    float32_t,
    CxxString,
    ActorWildcardCommandSelector,
    ActorCommandSelector,
    PlayerCommandSelector,
    RelativeFloat,
    CommandFilePath,
    CommandMessage,
    CommandPosition,
    CommandPositionFloat,
    CommandRawText,
    CommandWildcardInt,
    // CommandOperator,
    JsonValue,
    Command.MobEffect,
];
const typesWithTypeIdPtr = [
    bool_t,
    CommandIntegerRange,
    CommandItem,
    // Command.Block,
    Command.ActorDefinitionIdentifier,
];

const symbols = new CommandSymbols();
symbols.addParserSymbols(types);
symbols.addParserSymbols(typesWithTypeIdPtr);
symbols.addCounterSymbol(CommandRegistry);
symbols.addTypeIdFnSymbols(CommandRegistry, types);
symbols.addTypeIdPtrSymbols(CommandRegistry, typesWithTypeIdPtr);
type_id.load(symbols);
commandParser.load(symbols);
type_id.clone(CommandRegistry, ActorWildcardCommandSelector, PlayerWildcardCommandSelector);
commandParser.set(PlayerWildcardCommandSelector, commandParser.get(ActorWildcardCommandSelector)!);
commandParser.set(Command.Block, asmcode.returnZero);
