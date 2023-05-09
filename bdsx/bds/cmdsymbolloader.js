"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandSymbols = void 0;
const colors = require("colors");
const symbols_1 = require("./symbols");
function errorlog(message) {
    console.error(colors.red(message));
}
class CommandSymbols {
    constructor() {
        this.counterSymbols = [];
        this.parserSymbols = [];
        this.parserTypes = [];
        this.counterBases = [];
        this.typeForIds = new Map();
    }
    _getTypeIdSymbols(base) {
        let symbols = this.typeForIds.get(base);
        if (symbols != null)
            return symbols;
        symbols = {
            fnSymbols: [],
            fnTypes: [],
            ptrSymbols: [],
            ptrTypes: [],
        };
        this.typeForIds.set(base, symbols);
        return symbols;
    }
    addCounterSymbol(base) {
        this.counterBases.push(base);
        this.counterSymbols.push(`?storage@?1??_getCounter@?$typeid_t@${base.symbol}@Bedrock@@CAAEAU?$atomic@G@std@@XZ@4U45@A`);
    }
    addTypeIdFnSymbols(base, typesWithFunction) {
        const symbols = this._getTypeIdSymbols(base);
        for (const v of typesWithFunction) {
            symbols.fnTypes.push(v);
            symbols.fnSymbols.push(`??$type_id@${base.symbol}${v.symbol}@Bedrock@@YA?AV?$typeid_t@${base.symbol}@0@XZ`);
        }
    }
    addTypeIdPtrSymbols(base, typesWithValuePtr) {
        const symbols = this._getTypeIdSymbols(base);
        for (const v of typesWithValuePtr) {
            symbols.ptrTypes.push(v);
            symbols.ptrSymbols.push({
                symbol: `?id@?1???$type_id@${base.symbol}${v.symbol}@Bedrock@@YA?AV?$typeid_t@${base.symbol}@1@XZ@4V21@A`,
                type: v,
            });
        }
    }
    addParserSymbols(types) {
        this.parserTypes.push(...types);
        for (const type of types) {
            this.parserSymbols.push(`??$parse@${type.symbol}@CommandRegistry@@AEBA_NPEAXAEBUParseToken@0@AEBVCommandOrigin@@HAEAV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@AEAV?$vector@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$allocator@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@2@@4@@Z`);
        }
    }
    *iterateTypeIdFns(base) {
        const symbols = this.typeForIds.get(base);
        if (symbols == null)
            return;
        for (let i = 0; i < symbols.fnSymbols.length; i++) {
            const symbol = symbols.fnSymbols[i];
            try {
                const addr = symbols_1.proc[symbol];
                yield [symbols.fnTypes[i], addr];
            }
            catch (err) {
                errorlog(`type_id<${base.name}, ${symbols.fnTypes[i].name}>() function not found`);
                errorlog(`symbol: ${symbol}`);
            }
        }
    }
    *iterateTypeIdPtrs(base) {
        const symbols = this.typeForIds.get(base);
        if (symbols == null)
            return;
        for (let i = 0; i < symbols.ptrSymbols.length; i++) {
            const { symbol, type } = symbols.ptrSymbols[i];
            try {
                const addr = symbols_1.proc[symbol];
                yield [symbols.ptrTypes[i], addr];
            }
            catch (err) {
                errorlog(`type_id<${base.name}, ${type.name}> id pointer not found`);
                errorlog(`symbol: ${symbol}`);
            }
        }
    }
    *iterateCounters() {
        for (let i = 0; i < this.counterBases.length; i++) {
            const symbol = this.counterSymbols[i];
            const addr = symbols_1.proc[symbol];
            yield [this.counterBases[i], addr];
        }
    }
    *iterateParsers() {
        for (let i = 0; i < this.parserTypes.length; i++) {
            const symbol = this.parserSymbols[i];
            const addr = symbols_1.proc[symbol];
            yield [this.parserTypes[i], addr];
        }
    }
}
exports.CommandSymbols = CommandSymbols;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21kc3ltYm9sbG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY21kc3ltYm9sbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUFpQztBQUdqQyx1Q0FBaUM7QUFTakMsU0FBUyxRQUFRLENBQUMsT0FBZTtJQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUN2QyxDQUFDO0FBRUQsTUFBYSxjQUFjO0lBQTNCO1FBQ3FCLG1CQUFjLEdBQWEsRUFBRSxDQUFDO1FBRTlCLGtCQUFhLEdBQWEsRUFBRSxDQUFDO1FBQzdCLGdCQUFXLEdBQWdCLEVBQUUsQ0FBQztRQUM5QixpQkFBWSxHQUFnQixFQUFFLENBQUM7UUFDL0IsZUFBVSxHQUFHLElBQUksR0FBRyxFQUE0QixDQUFDO0lBOEZ0RSxDQUFDO0lBNUZXLGlCQUFpQixDQUFDLElBQWU7UUFDckMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsSUFBSSxPQUFPLElBQUksSUFBSTtZQUFFLE9BQU8sT0FBTyxDQUFDO1FBQ3BDLE9BQU8sR0FBRztZQUNOLFNBQVMsRUFBRSxFQUFFO1lBQ2IsT0FBTyxFQUFFLEVBQUU7WUFDWCxVQUFVLEVBQUUsRUFBRTtZQUNkLFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQztRQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuQyxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsSUFBZTtRQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyx1Q0FBdUMsSUFBSSxDQUFDLE1BQU0sMkNBQTJDLENBQUMs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