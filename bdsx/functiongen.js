"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionGen = void 0;
const RESERVED_WORDS = new Set([
    "$imp",
    // statements
    "do",
    "if",
    "in",
    "for",
    "let",
    "new",
    "try",
    "var",
    "case",
    "else",
    "enum",
    "eval",
    "false",
    "null",
    "undefined",
    "NaN",
    "this",
    "true",
    "void",
    "with",
    "break",
    "catch",
    "class",
    "const",
    "super",
    "throw",
    "while",
    "yield",
    "delete",
    "export",
    "import",
    "public",
    "return",
    "static",
    "switch",
    "typeof",
    "default",
    "extends",
    "finally",
    "package",
    "private",
    "continue",
    "debugger",
    "function",
    "arguments",
    "interface",
    "protected",
    "implements",
    "instanceof",
]);
class FunctionGen {
    constructor(functionName, ...parameters) {
        this.importNames = [];
        this.imports = [];
        if (!functionName) {
            functionName = "_";
        }
        else {
            functionName = functionName.replace(/[^a-zA-Z0-9_$]+/g, "_");
            if (RESERVED_WORDS.has(functionName) || /^[0-9]/.test(functionName)) {
                functionName = "_" + functionName;
            }
        }
        this.functionName = functionName;
        let out = '"use strict";\n';
        out += `function ${functionName}(${parameters.join(",")}){`;
        this.out = out;
    }
    import(name, value) {
        this.importNames.push(name);
        this.imports.push(value);
    }
    writeln(line) {
        this.out += line;
        this.out += "\n";
    }
    generate() {
        this.out += "}\n";
        this.out += `const [${[...this.importNames].join(",")}]=$imp;\n`;
        this.out += `return ${this.functionName};`;
        return new Function("$imp", this.out)(this.imports);
    }
}
exports.FunctionGen = FunctionGen;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25nZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmdW5jdGlvbmdlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxNQUFNLGNBQWMsR0FBRyxJQUFJLEdBQUcsQ0FBQztJQUMzQixNQUFNO0lBRU4sYUFBYTtJQUNiLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLEtBQUs7SUFDTCxLQUFLO0lBQ0wsS0FBSztJQUNMLEtBQUs7SUFDTCxLQUFLO0lBQ0wsTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUNOLE9BQU87SUFDUCxNQUFNO0lBQ04sV0FBVztJQUNYLEtBQUs7SUFDTCxNQUFNO0lBQ04sTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sT0FBTztJQUNQLE9BQU87SUFDUCxPQUFPO0lBQ1AsT0FBTztJQUNQLE9BQU87SUFDUCxPQUFPO0lBQ1AsT0FBTztJQUNQLE9BQU87SUFDUCxRQUFRO0lBQ1IsUUFBUTtJQUNSLFFBQVE7SUFDUixRQUFRO0lBQ1IsUUFBUTtJQUNSLFFBQVE7SUFDUixRQUFRO0lBQ1IsUUFBUTtJQUNSLFNBQVM7SUFDVCxTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsV0FBVztJQUNYLFdBQVc7SUFDWCxXQUFXO0lBQ1gsWUFBWTtJQUNaLFlBQVk7Q0FDZixDQUFDLENBQUM7QUFFSCxNQUFhLFdBQVc7SUFPcEIsWUFBWSxZQUFnQyxFQUFFLEdBQUcsVUFBb0I7UUFOcEQsZ0JBQVcsR0FBYSxFQUFFLENBQUM7UUFDM0IsWUFBTyxHQUFjLEVBQUUsQ0FBQztRQU1yQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2YsWUFBWSxHQUFHLEdBQUcsQ0FBQztTQUN0QjthQUFNO1lBQ0gsWUFBWSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDN0QsSUFBSSxjQUFjLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQ2pFLFlBQVksR0FBRyxHQUFHLEdBQUcsWUFBWSxDQUFDO2FBQ3JDO1NBQ0o7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUVqQyxJQUFJLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQztRQUM1QixHQUFHLElBQUksWUFBWSxZQUFZLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQzVELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBWSxFQUFFLEtBQWM7UUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFZO1FBQ2hCLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUM7UUFDbEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7UUFDakUsSUFBSSxDQUFDLEdBQUcsSUFBSSxVQUFVLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQztRQUMzQyxPQUFPLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hELENBQUM7Q0FDSjtBQXZDRCxrQ0F1Q0MifQ==