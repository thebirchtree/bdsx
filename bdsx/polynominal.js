"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.polynominal = void 0;
const textparser_1 = require("./textparser");
function unexpected() {
    throw Error("Unexpected operation");
}
function method(a, b, method) {
    return [a, b, method];
}
var polynominal;
(function (polynominal) {
    class Operand {
        _constantOperating(oper, other) {
            return null;
        }
        equals(other) {
            return false;
        }
        equalsConstant(v) {
            return false;
        }
        add(other) {
            const res = this._constantOperating(operation.binaryPlus, other);
            if (res !== null)
                return res;
            for (const [a, b, func] of operation.add) {
                if (this instanceof a && other instanceof b) {
                    const res = func(this, other);
                    if (res === null)
                        continue;
                    return res;
                }
                if (this instanceof b && other instanceof a) {
                    const res = func(other, this);
                    if (res === null)
                        continue;
                    return res;
                }
            }
            const out = new Additive();
            out.add(this); // must not normalize
            out.add(other);
            return out;
        }
        multiply(other) {
            const res = this._constantOperating(operation.binaryMultiply, other);
            if (res !== null)
                return res;
            for (const [a, b, func] of operation.multiply) {
                if (this instanceof a && other instanceof b) {
                    const res = func(this, other);
                    if (res === null)
                        continue;
                    return res;
                }
                if (this instanceof b && other instanceof a) {
                    const res = func(other, this);
                    if (res === null)
                        continue;
                    return res;
                }
            }
            const out = new Multiplicative();
            out.multiply(this); // must not normalize
            out.multiply(other);
            return out;
        }
        exponent(other) {
            const res = this._constantOperating(operation.binaryExponent, other);
            if (res !== null)
                return res;
            return new polynominal.Variable(this, other);
        }
        asAdditive() {
            const out = new Additive();
            const mult = new Multiplicative();
            mult.pushVariable(new Variable(this, new Constant(1)));
            out.pushTerm(mult);
            return out;
        }
        defineVariable(name, value) {
            return this;
        }
        toString() {
            unexpected();
        }
    }
    polynominal.Operand = Operand;
    class Constant extends Operand {
        constructor(value) {
            super();
            this.value = value;
        }
        _constantOperating(oper, other) {
            if (!(other instanceof Constant))
                return null;
            this.value = oper.operationConst(this.value, other.value);
            return this;
        }
        equals(other) {
            if (!(other instanceof Constant))
                return false;
            return this.value === other.value;
        }
        equalsConstant(v) {
            return this.value === v;
        }
        asAdditive() {
            const out = new Additive();
            out.constant = this.value;
            return out;
        }
        toString() {
            return this.value + "";
        }
    }
    polynominal.Constant = Constant;
    class Name extends Operand {
        constructor(name) {
            super();
            this.name = name;
            this.column = -1;
            this.length = -1;
        }
        equals(other) {
            if (!(other instanceof Name))
                return false;
            return this.name === other.name;
        }
        defineVariable(name, value) {
            if (name === this.name)
                return new Constant(value);
            return this;
        }
        toString() {
            return this.name;
        }
    }
    polynominal.Name = Name;
    class Variable extends Operand {
        constructor(term, degree) {
            super();
            this.term = term;
            this.degree = degree;
        }
        equals(other) {
            if (!(other instanceof Variable))
                return false;
            return this.degree.equals(other.degree) && this.term.equals(other.term);
        }
        asAdditive() {
            const out = new Additive();
            out.pushVariable(this);
            return out;
        }
        defineVariable(name, value) {
            this.term = this.term.defineVariable(name, value);
            this.degree = this.degree.defineVariable(name, value);
            return this.normalize();
        }
        normalize() {
            if (this.degree instanceof Constant) {
                if (this.term instanceof Constant) {
                    return new Constant(this.term.value ** this.degree.value);
                }
                if (this.degree.value === 0) {
                    return new Constant(1);
                }
                if (this.degree.value === 1) {
                    return this.term;
                }
            }
            if (this.term instanceof Constant) {
                if (this.term.value === 0) {
                    return new Constant(0);
                }
                if (this.term.value === 1) {
                    return new Constant(1);
                }
            }
            return this;
        }
        toString() {
            if (this.degree instanceof Constant && this.degree.value === 1)
                return this.term + "";
            return `(${this.term}^${this.degree})`;
        }
    }
    polynominal.Variable = Variable;
    class Multiplicative extends Operand {
        constructor() {
            super(...arguments);
            this.variables = [];
            this.constant = 1;
        }
        has(v) {
            for (const thisv of this.variables) {
                if (thisv.equals(v))
                    return true;
            }
            return false;
        }
        isOnlyVariable(o) {
            if (this.variables.length !== 1)
                return false;
            if (!this.variables[0].equals(o))
                return false;
            return true;
        }
        isSameVariables(o) {
            const arr = this.variables.slice();
            _foundSame: for (const v of o.variables) {
                for (let i = 0; i < arr.length; i++) {
                    if (!arr[i].equals(v))
                        continue;
                    const last = arr.length - 1;
                    if (i !== last) {
                        arr[i] = arr.pop();
                    }
                    else {
                        arr.length = last;
                    }
                    continue _foundSame;
                }
                return false;
            }
            return true;
        }
        pushVariable(v) {
            for (const thisvar of this.variables) {
                if (!v.term.equals(thisvar.term))
                    continue;
                v.degree = v.degree.multiply(thisvar);
                return;
            }
            this.variables.push(v);
        }
        pushMultiplicative(item) {
            this.constant *= item.constant;
            for (const term of item.variables) {
                this.pushVariable(term);
            }
        }
        asAdditive() {
            const out = new Additive();
            out.pushTerm(this);
            return out;
        }
        defineVariable(name, value) {
            const out = new Multiplicative();
            out.constant = this.constant;
            for (const v of this.variables) {
                out.multiply(v.defineVariable(name, value));
            }
            return out.normalize();
        }
        normalize() {
            if (this.constant === 0)
                return new Constant(0);
            if (this.variables.length === 0)
                return new Constant(this.constant);
            if (this.variables.length === 1 && this.constant === 1)
                return this.variables[0];
            return this;
        }
        toString() {
            if (this.variables.length === 0)
                return this.constant + "";
            if (this.constant === 1) {
                if (this.variables.length === 1)
                    return this.variables[0] + "";
                return `(${this.variables.join("*")})`;
            }
            return `(${this.variables.join("*")}*${this.constant})`;
        }
    }
    polynominal.Multiplicative = Multiplicative;
    class Additive extends Operand {
        constructor() {
            super(...arguments);
            this.terms = [];
            this.constant = 0;
        }
        pushTerm(term) {
            for (let i = 0; i < this.terms.length; i++) {
                const thisterm = this.terms[i];
                if (!term.isSameVariables(thisterm))
                    continue;
                thisterm.pushMultiplicative(term);
                if (thisterm.constant === 0) {
                    this.terms.splice(i, 1);
                }
                return;
            }
            this.terms.push(term);
        }
        pushVariable(variable) {
            for (const term of this.terms) {
                if (term.isOnlyVariable(variable)) {
                    term.constant++;
                    return;
                }
            }
            const mult = new Multiplicative();
            mult.variables.push(variable);
            this.terms.push(mult);
        }
        pushAddtive(item) {
            this.constant += item.constant;
            for (const term of item.terms) {
                this.pushTerm(term);
            }
        }
        asAdditive() {
            return this;
        }
        defineVariable(name, value) {
            const out = new Additive();
            out.constant = this.constant;
            for (const term of this.terms) {
                out.add(term.defineVariable(name, value));
            }
            return out.normalize();
        }
        normalize() {
            if (this.terms.length === 1 && this.constant === 0)
                return this.terms[0];
            if (this.terms.length === 0)
                return new Constant(this.constant);
            return this;
        }
        toString() {
            if (this.terms.length === 0)
                return this.constant + "";
            return `(${this.terms.join("+")}+${this.constant})`;
        }
    }
    polynominal.Additive = Additive;
    class Operation extends Operand {
        constructor(oper, operands) {
            super();
            this.oper = oper;
            this.operands = operands;
        }
        toString() {
            return `(${this.operands.join(this.oper.name)})`;
        }
        defineVariable(name, value) {
            const values = [];
            for (let i = 0; i < this.operands.length; i++) {
                const operand = this.operands[i].defineVariable(name, value);
                this.operands[i] = operand;
                if (operand instanceof Constant)
                    values.push(operand.value);
            }
            if (values.length === this.operands.length)
                return new Constant(this.oper.operationConst(...values));
            return this;
        }
    }
    polynominal.Operation = Operation;
    class Operator {
        constructor(precedence, operationConst, operation = function (...args) {
            return new Operation(this, args);
        }) {
            this.precedence = precedence;
            this.operationConst = operationConst;
            this.operation = operation;
        }
        toString() {
            return this.name;
        }
    }
    polynominal.Operator = Operator;
    /**
     * @return null if invalid
     */
    function parseToNumber(text) {
        let i = 0;
        let firstchr = text.charCodeAt(i);
        const minus = firstchr === 0x2d;
        if (minus) {
            do {
                firstchr = text.charCodeAt(++i);
                if (isNaN(firstchr))
                    return null;
            } while (firstchr === 0x20 || firstchr === 0x09 || firstchr === 0x0d || firstchr === 0x0a);
        }
        if (text.charAt(text.length - 1) === "h") {
            const numstr = text.substring(i, text.length - 1);
            if (/^[a-fA-F0-9]+$/.test(numstr)) {
                return parseInt(numstr, 16);
            }
            return null;
        }
        else {
            if (0x30 <= firstchr && firstchr <= 0x39) {
                // number
                const n = +text.substr(i);
                if (isNaN(n))
                    return null;
                return minus ? -n : n;
            }
        }
        return null;
    }
    polynominal.parseToNumber = parseToNumber;
    function parse(text, lineNumber = 0, offset = 0) {
        const parser = new textparser_1.LanguageParser(text);
        const ungettedOperators = [];
        function error(message, word) {
            throw new textparser_1.ParsingError(message, {
                column: offset + parser.i - word.length,
                width: word.length,
                line: lineNumber,
            });
        }
        function readOperator(...types) {
            if (ungettedOperators.length !== 0) {
                return ungettedOperators.shift();
            }
            const opername = parser.readOperator(OPERATORS);
            if (opername === null) {
                return OPER_EOF;
            }
            const opers = OPERATORS.get(opername);
            if (opers == null)
                error(`Unexpected operator '${opername}'`, opername);
            for (const type of types) {
                const oper = opers[type];
                if (oper != null)
                    return oper;
            }
            error(`Unexpected operator '${opername}' for ${types.join(",")}`, opername);
        }
        function ungetOperator(oper) {
            ungettedOperators.push(oper);
        }
        function readOperand() {
            const word = parser.readIdentifier();
            if (word === null)
                return null;
            const n = parseToNumber(word);
            let out;
            if (n === null) {
                out = new Name(word);
                out.column = parser.i - word.length;
                out.length = word.length;
            }
            else {
                if (isNaN(n))
                    throw error(`Unexpected number: ${word}`, word);
                out = new Constant(n);
            }
            return out;
        }
        function readStatement(endPrecedence) {
            let operand = readOperand();
            if (operand === null) {
                const oper = readOperator("unaryPrefix");
                if (oper === OPER_EOF) {
                    error("unexpected end", "");
                }
                else if (oper.name === "(") {
                    operand = readStatement(OPER_CLOSE.precedence);
                    const endoper = readOperator("unarySuffix");
                    if (endoper !== OPER_CLOSE)
                        error(`Unexpected operator: '${oper}', expected: ')'`, endoper.name);
                }
                else {
                    return oper.operation(readStatement(oper.precedence));
                }
            }
            for (;;) {
                const oper = readOperator("binary", "unarySuffix");
                if (oper.precedence <= endPrecedence) {
                    ungetOperator(oper);
                    return operand;
                }
                if (oper.type === "unarySuffix") {
                    if (operand instanceof Constant) {
                        operand.value = oper.operationConst(operand.value);
                    }
                    else {
                        operand = oper.operation(operand);
                    }
                    continue;
                }
                const operand2 = readStatement(oper.precedence);
                if (operand instanceof Constant && operand2 instanceof Constant) {
                    operand.value = oper.operationConst(operand.value, operand2.value);
                }
                else {
                    operand = oper.operation(operand, operand2);
                }
            }
        }
        return readStatement(-1);
    }
    polynominal.parse = parse;
})(polynominal = exports.polynominal || (exports.polynominal = {}));
var operation;
(function (operation) {
    operation.add = [
        method(polynominal.Additive, polynominal.Constant, (a, b) => {
            a.constant += b.value;
            return a.normalize();
        }),
        method(polynominal.Additive, polynominal.Variable, (a, b) => {
            a.pushVariable(b);
            return a.normalize();
        }),
        method(polynominal.Additive, polynominal.Multiplicative, (a, b) => {
            a.pushTerm(b);
            return a.normalize();
        }),
        method(polynominal.Additive, polynominal.Additive, (a, b) => {
            a.pushAddtive(b);
            return a.normalize();
        }),
        method(polynominal.Additive, polynominal.Name, (a, b) => {
            a.pushVariable(new polynominal.Variable(b, new polynominal.Constant(1)));
            return a.normalize();
        }),
        method(polynominal.Additive, polynominal.Operand, (a, b) => {
            a.pushVariable(new polynominal.Variable(b, new polynominal.Constant(1)));
            return a.normalize();
        }),
    ];
    operation.multiply = [
        method(polynominal.Multiplicative, polynominal.Multiplicative, (a, b) => {
            a.pushMultiplicative(b);
            return a.normalize();
        }),
        method(polynominal.Multiplicative, polynominal.Variable, (a, b) => {
            a.pushVariable(b);
            return a.normalize();
        }),
        method(polynominal.Multiplicative, polynominal.Constant, (a, b) => {
            a.constant *= b.value;
            return a.normalize();
        }),
        method(polynominal.Multiplicative, polynominal.Name, (a, b) => {
            a.pushVariable(new polynominal.Variable(b, new polynominal.Constant(1)));
            return a.normalize();
        }),
        method(polynominal.Variable, polynominal.Operand, (a, b) => {
            if (a.term.equals(b)) {
                a.degree = a.degree.add(new polynominal.Constant(1));
                return a.normalize();
            }
            return null;
        }),
        method(polynominal.Additive, polynominal.Operand, (a, b) => {
            const out = new polynominal.Additive();
            for (const term of a.terms) {
                out.add(term.multiply(b));
            }
            out.add(new polynominal.Constant(a.constant).multiply(b));
            return out.normalize();
        }),
        method(polynominal.Multiplicative, polynominal.Operand, (a, b) => {
            a.pushVariable(new polynominal.Variable(b, new polynominal.Constant(1)));
            return a.normalize();
        }),
    ];
    operation.binaryPlus = new polynominal.Operator(14, (a, b) => a + b, (a, b) => a.add(b));
    operation.binaryMultiply = new polynominal.Operator(15, (a, b) => a * b, (a, b) => a.multiply(b));
    operation.binaryExponent = new polynominal.Operator(16, (a, b) => a ** b, (a, b) => a.exponent(b));
})(operation || (operation = {}));
const OPERATORS = new Map();
OPERATORS.set("**", {
    binary: operation.binaryExponent,
});
OPERATORS.set("*", {
    binary: operation.binaryMultiply,
});
OPERATORS.set("/", {
    binary: new polynominal.Operator(15, (a, b) => a / b, (a, b) => a.multiply(b.exponent(new polynominal.Constant(-1)))),
});
OPERATORS.set("+", {
    unaryPrefix: new polynominal.Operator(17, v => v, v => v),
    binary: operation.binaryPlus,
});
OPERATORS.set("-", {
    unaryPrefix: new polynominal.Operator(17, v => -v, v => v.multiply(new polynominal.Constant(-1))),
    binary: new polynominal.Operator(14, (a, b) => a - b, (a, b) => a.add(b.multiply(new polynominal.Constant(-1)))),
});
OPERATORS.set("~", { unaryPrefix: new polynominal.Operator(17, v => ~v) });
OPERATORS.set("<<", { binary: new polynominal.Operator(13, (a, b) => a << b) });
OPERATORS.set(">>", { binary: new polynominal.Operator(13, (a, b) => a >> b) });
OPERATORS.set(">>>", {
    binary: new polynominal.Operator(13, (a, b) => a >>> b),
});
OPERATORS.set("&", { binary: new polynominal.Operator(10, (a, b) => a & b) });
OPERATORS.set("^", { binary: new polynominal.Operator(9, (a, b) => a ^ b) });
OPERATORS.set("|", { binary: new polynominal.Operator(8, (a, b) => a | b) });
OPERATORS.set("(", {
    unaryPrefix: new polynominal.Operator(0, unexpected, unexpected),
});
OPERATORS.set(")", {
    unarySuffix: new polynominal.Operator(0, unexpected, unexpected),
});
OPERATORS.set(";", {
    unarySuffix: new polynominal.Operator(0, unexpected, unexpected),
});
for (const [name, oper] of OPERATORS.entries()) {
    if (oper.unaryPrefix) {
        oper.unaryPrefix.name = name;
        oper.unaryPrefix.type = "unarySuffix";
    }
    if (oper.unarySuffix) {
        oper.unarySuffix.name = name;
        oper.unarySuffix.type = "unarySuffix";
    }
    if (oper.binary) {
        oper.binary.name = name;
        oper.binary.type = "binary";
    }
}
const OPER_EOF = new polynominal.Operator(-1, unexpected);
const OPER_CLOSE = OPERATORS.get(")").unarySuffix;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seW5vbWluYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwb2x5bm9taW5hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBNEQ7QUFFNUQsU0FBUyxVQUFVO0lBQ2YsTUFBTSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBSUQsU0FBUyxNQUFNLENBQ1gsQ0FBaUIsRUFDakIsQ0FBaUIsRUFDakIsTUFBa0Q7SUFFbEQsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQUVELElBQWlCLFdBQVcsQ0ErYjNCO0FBL2JELFdBQWlCLFdBQVc7SUFDeEIsTUFBYSxPQUFPO1FBQ04sa0JBQWtCLENBQUMsSUFBYyxFQUFFLEtBQWM7WUFDdkQsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFjO1lBQ2pCLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFDRCxjQUFjLENBQUMsQ0FBUztZQUNwQixPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0QsR0FBRyxDQUFDLEtBQWM7WUFDZCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNqRSxJQUFJLEdBQUcsS0FBSyxJQUFJO2dCQUFFLE9BQU8sR0FBRyxDQUFDO1lBQzdCLEtBQUssTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLEdBQUcsRUFBRTtnQkFDdEMsSUFBSSxJQUFJLFlBQVksQ0FBQyxJQUFJLEtBQUssWUFBWSxDQUFDLEVBQUU7b0JBQ3pDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQzlCLElBQUksR0FBRyxLQUFLLElBQUk7d0JBQUUsU0FBUztvQkFDM0IsT0FBTyxH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QUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDNUQ7Q0FDSixDQUFDLENBQUM7QUFDSCxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFM0UsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDaEYsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDaEYsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUU7SUFDakIsTUFBTSxFQUFFLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQzFELENBQUMsQ0FBQztBQUVILFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzdFLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRTdFLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO0lBQ2YsV0FBVyxFQUFFLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQztDQUNuRSxDQUFDLENBQUM7QUFDSCxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTtJQUNmLFdBQVcsRUFBRSxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUM7Q0FDbkUsQ0FBQyxDQUFDO0FBQ0gsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7SUFDZixXQUFXLEVBQUUsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDO0NBQ25FLENBQUMsQ0FBQztBQUVILEtBQUssTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUU7SUFDNUMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxhQUFhLENBQUM7S0FDekM7SUFDRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQztLQUN6QztJQUNELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7S0FDL0I7Q0FDSjtBQUVELE1BQU0sUUFBUSxHQUFHLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUMxRCxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBRSxDQUFDLFdBQVksQ0FBQyJ9