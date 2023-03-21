"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandSymbols = void 0;
const colors = require("colors");
const symbols_1 = require("./symbols");
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
        this.counterSymbols.push(`?count@?$typeid_t@${base.symbol}@@2GA`);
    }
    addTypeIdFnSymbols(base, typesWithFunction) {
        const symbols = this._getTypeIdSymbols(base);
        for (const v of typesWithFunction) {
            symbols.fnTypes.push(v);
            symbols.fnSymbols.push(`??$type_id@${base.symbol}${v.symbol}@@YA?AV?$typeid_t@${base.symbol}@@XZ`);
        }
    }
    addTypeIdPtrSymbols(base, typesWithValuePtr) {
        const symbols = this._getTypeIdSymbols(base);
        for (const v of typesWithValuePtr) {
            symbols.ptrTypes.push(v);
            symbols.ptrSymbols.push({
                symbol: `?id@?1???$type_id@${base.symbol}${v.symbol}@@YA?AV?$typeid_t@${base.symbol}@@XZ@4V1@A`,
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
                console.error(colors.red(`${symbol} not found (type_id<${base.name}, ${symbols.fnTypes[i].name}>())`));
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
                throw Error(`type_id<${base.name}, ${type.name}> value pointer not found`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21kc3ltYm9sbG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY21kc3ltYm9sbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUFpQztBQUdqQyx1Q0FBaUM7QUFTakMsTUFBYSxjQUFjO0lBQTNCO1FBQ3FCLG1CQUFjLEdBQWEsRUFBRSxDQUFDO1FBRTlCLGtCQUFhLEdBQWEsRUFBRSxDQUFDO1FBQzdCLGdCQUFXLEdBQWdCLEVBQUUsQ0FBQztRQUM5QixpQkFBWSxHQUFnQixFQUFFLENBQUM7UUFDL0IsZUFBVSxHQUFHLElBQUksR0FBRyxFQUE0QixDQUFDO0lBNEZ0RSxDQUFDO0lBMUZXLGlCQUFpQixDQUFDLElBQWU7UUFDckMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsSUFBSSxPQUFPLElBQUksSUFBSTtZQUFFLE9BQU8sT0FBTyxDQUFDO1FBQ3BDLE9BQU8sR0FBRztZQUNOLFNBQVMsRUFBRSxFQUFFO1lBQ2IsT0FBTyxFQUFFLEVBQUU7WUFDWCxVQUFVLEVBQUUsRUFBRTtZQUNkLFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQztRQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuQyxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsSUFBZTtRQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsSUFBSSxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVELGtCQUFrQixDQUFDLElBQWUsRUFBRSxpQkFBOEI7UUFDOUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxD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