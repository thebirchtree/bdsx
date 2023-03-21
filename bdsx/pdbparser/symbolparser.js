"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdbIdentifier = void 0;
const ProgressBar = require("progress");
const core_1 = require("../core");
const templatename_1 = require("../templatename");
const textparser_1 = require("../textparser");
const pdbcache_1 = require("./pdbcache");
const OPERATORS = new Set(["::", "&&"]);
const OPERATORS_FOR_OPERATOR = new Set([
    "++",
    "--",
    ">>",
    "<<",
    "&&",
    "||",
    "!=",
    "==",
    ">=",
    "<=",
    "()",
    "[]",
    "+=",
    "-=",
    "*=",
    "/=",
    "%=",
    "&=",
    "^=",
    "|=",
    "<<=",
    ">>=",
    "->",
]);
// [name, hasParam]
const SPECIAL_NAMES = [
    ["dynamic initializer for '", true],
    ["dynamic atexit destructor for '", true],
    ["RTTI Complete Object Locator'", false],
    ["RTTI Class Hierarchy Descriptor'", false],
    ["RTTI Base Class Array'", false],
    ["anonymous namespace'", false],
    ["scalar deleting destructor'", false],
    ["eh vector constructor iterator'", false],
    ["eh vector copy constructor iterator'", false],
    ["eh vector destructor iterator'", false],
    ["vector deleting destructor'", false],
    ["RTTI Type Descriptor'", false],
    ["vbase destructor'", false],
];
const FIELD_FOR_CLASS = new Set(["`vector deleting destructor'", "`scalar deleting destructor'"]);
// "operator=",
// "operator+",
// "operator-",
// "operator*",
// "operator/",
// "operator%",
// "operator()",
// "operator[]",
// "operator==",
// "operator!=",
// "operator>=",
// "operator<=",
// "operator>",
// "operator<",
// "operator+=",
// "operator-=",
// "operator*=",
// "operator/=",
// "operator%=",
// "operator>>",
// "operator<<",
let symbolIndex = -1;
class PdbIdentifier {
    get isTypeUnion() {
        return this.unionedTypes !== null;
    }
    constructor(name) {
        this.name = name;
        this.modifier = null;
        this.isVirtualFunction = false;
        this.isNamespaceLike = false;
        this.isNamespace = false;
        this.isClassLike = false;
        this.isFunction = false;
        this.isFunctionBase = false;
        this.isTemplateFunctionBase = false;
        this.isNameBase = false;
        this.isMemberPointer = false;
        this.isEnum = false;
        this.isTemplate = false;
        this.isPrivate = false;
        this.isLambda = false;
        this.isType = false;
        this.arraySize = null;
        this.isFunctionType = false;
        this.isDecoed = false;
        this.isBasicType = false;
        this.isRedirectType = false;
        this.isConstructor = false;
        this.isNoExcept = false;
        this.isTemplateConstructorBase = false;
        this.deco = "";
        this.decoedFrom = null;
        this.memberPointerBase = null;
        this.isValue = false;
        this.isConstant = false;
        this.callingConvension = null;
        this.isDestructor = false;
        this.isStatic = false;
        this.isThunk = false;
        this.isVFTable = false;
        this.parent = null;
        this.templateBase = null;
        this.functionBase = null;
        this.nameBase = null;
        this.returnType = null;
        this.children = new Map();
        this.functionParameters = [];
        this.templateParameters = [];
        this.adjustors = [];
        this.specialized = [];
        this.overloads = [];
        this.address = 0;
        this.redirectTo = null;
        this.redirectedFrom = null;
        this.source = "";
        this.constFunction = null;
        this.ref = 0;
        this.symbolIndex = symbolIndex;
        this.unionedTypes = null;
    }
    getBase() {
        if (this.templateBase !== null) {
            return this.templateBase.getBase();
        }
        if (this.functionBase !== null) {
            return this.functionBase.getBase();
        }
        return this;
    }
    checkBase(...baseNames) {
        const list = [];
        let base = this.decay();
        while (base.parent !== null) {
            list.push(base);
            base = base.parent.decay();
        }
        function check(target, base) {
            if (target.templateBase !== null) {
                if (check(target.templateBase, base))
                    return true;
            }
            if (target.functionBase !== null) {
                if (check(target.functionBase, base))
                    return true;
            }
            return target === base || target.name === base;
        }
        for (const base of baseNames) {
            const target = list.pop();
            if (target == null)
                return false;
            if (!check(target, base))
                return false;
        }
        return true;
    }
    addRef() {
        this.ref++;
    }
    release() {
        this.ref--;
        if (this.ref === 0) {
            this.parent.children.delete(this.name);
        }
    }
    removeConst() {
        return this.removeDeco("const");
    }
    removeDeco(deco) {
        if (this.decoedFrom !== null) {
            if (this.deco === deco)
                return this.decoedFrom;
            const removed = this.decoedFrom.removeDeco(deco);
            if (removed === this)
                return this;
            return removed.decorate(this.deco);
        }
        return this;
    }
    containTypes(other) {
        if (this === other)
            return true;
        if (this === any_t)
            return true;
        if (this.unionedTypes !== null) {
            if (other.unionedTypes !== null) {
                for (const t of other.unionedTypes) {
                    if (!this.unionedTypes.has(t))
                        return false;
                }
                return true;
            }
            else {
                if (this.unionedTypes.has(other))
                    return true;
            }
        }
        return false;
    }
    static makeUnionTypes(types) {
        if (types.length >= 5)
            return any_t;
        const set = new Set();
        for (const t of types) {
            if (t.unionedTypes !== null) {
                for (const item of t.unionedTypes) {
                    set.add(item);
                }
            }
            else {
                set.add(t);
            }
        }
        if (set.size >= 5)
            return any_t;
        const names = [...set].map(v => v.toString());
        names.sort((a, b) => a.localeCompare(b));
        const union = PdbIdentifier.global.make(`${names.join("|")}`);
        if (union.unionedTypes === null) {
            union.unionedTypes = set;
        }
        return union;
    }
    makeUnionTypes(other) {
        return PdbIdentifier.makeUnionTypes([this, other]);
    }
    union(other) {
        const a = this.removeConst();
        const b = other.removeConst();
        if (a === b)
            return a;
        if (a === any_t || b === any_t)
            return any_t;
        if (a.templateBase !== null) {
            if (a.templateParameters.length === 0)
                throw Error(`template but no params (${a})`);
            return a.makeUnionTypes(b);
        }
        if (int32Types.has(a) && int32Types.has(b)) {
            return int_t;
        }
        return a.makeUnionTypes(b);
        throw Error(`not implemented (${a}, ${b})`);
    }
    unionParameters(to) {
        if (to === null)
            return this.functionParameters.slice();
        const n = Math.max(to.length, this.functionParameters.length);
        for (let i = 0; i < n; i++) {
            const a = to[i];
            const b = this.functionParameters[i];
            to[i] = a && b ? a.union(b) : a || b;
        }
        return to;
    }
    hasArrayParam() {
        for (const param of this.functionParameters) {
            if (param.getArraySize() !== null)
                return true;
        }
        return false;
    }
    *allOverloads() {
        if (this.isTemplate) {
            for (const s of this.specialized) {
                for (const o of s.overloads) {
                    if (o.address === 0)
                        continue;
                    yield o;
                }
            }
        }
        else if (this.isFunctionBase) {
            for (const o of this.overloads) {
                if (o.address === 0)
                    continue;
                yield o;
            }
        }
    }
    isPointerLike() {
        if (this.deco === "&" || this.deco === "*")
            return true;
        if (this.decoedFrom !== null)
            return this.decoedFrom.isPointerLike();
        return false;
    }
    decorate(deco, source) {
        let name = this.name;
        if (/^\w/.test(deco)) {
            name += " ";
        }
        name += deco;
        const id = this.parent.make(name);
        if (id === this)
            throw Error(`self deco linked (deco:${deco})`);
        if (this.isType)
            id.setAsType();
        if (this.isValue)
            id.setAsValue();
        if (this.isBasicType)
            id.setAsBasicType();
        id.isDecoed = true;
        id.deco = deco;
        id.decoedFrom = this;
        if (source != null)
            id.source = source;
        return id;
    }
    getArraySize() {
        let node = this;
        for (;;) {
            if (node.decoedFrom === null)
                return null;
            if (node.arraySize !== null)
                return node.arraySize;
            node = node.decoedFrom;
        }
    }
    decay() {
        let id = this;
        for (;;) {
            if (id.decoedFrom === null)
                return id;
            id = id.decoedFrom;
        }
    }
    removeParameters() {
        return this.functionBase || this;
    }
    removeTemplateParameters() {
        return this.templateBase || this;
    }
    find(name) {
        const item = this.children.get(name);
        if (item == null)
            throw Error(`${name} not found in '${this}'`);
        return item;
    }
    make(name) {
        let id = this.children.get(name);
        if (id != null)
            return id;
        this.children.set(name, (id = new PdbIdentifier(name)));
        id.parent = this;
        return id;
    }
    makeSpecialized(args, source) {
        if (this.parent === null)
            throw Error(`no parent`);
        const name = (0, templatename_1.templateName)(this.name, ...args.map(id => id.toString()));
        let specialized = this.parent.children.get(name);
        if (specialized == null) {
            specialized = this.parent.make(name);
            specialized.templateParameters = args;
            specialized.templateBase = this;
            if (source != null)
                specialized.source = source;
            this.specialized.push(specialized);
        }
        else {
            if (specialized.isConstructor || specialized.isDestructor) {
                // ctor or dtor
            }
            else {
                for (let i = 0; i < args.length; i++) {
                    if (specialized.templateParameters[i] !== args[i]) {
                        throw Error(`name is same but parameters mismatched. (${specialized.templateParameters[i]} != ${args[i]})`);
                    }
                }
                if (specialized.templateBase !== this) {
                    throw Error(`name is same but template base mismatched. (${specialized.templateBase} != ${this})`);
                }
            }
        }
        return specialized;
    }
    constVal(name) {
        const id = this.make(name);
        id.isConstant = true;
        id.setAsValue();
        return id;
    }
    toString() {
        let name = "";
        if (this.parent === null || this.parent === PdbIdentifier.global)
            name = this.name.toString();
        else
            name = this.parent.toString() + "::" + this.name.toString();
        if (this.returnType !== null) {
            if (!this.isType) {
                return this.returnType.toString() + " " + name;
            }
        }
        return name;
    }
    setReturnType(returnType) {
        this.returnType = returnType;
    }
    setAsNamespace() {
        this.setAsNamespaceLike();
        if (this.isClassLike)
            throw Error(`namespace but class(${this})`);
        this.isNamespace = true;
    }
    setAsNamespaceLike() {
        if (this.isNamespaceLike)
            return;
        this.isNamespaceLike = true;
        if (this.parent !== null) {
            if (this.parent.isClassLike) {
                this.setAsClass();
            }
            else {
                this.parent.setAsNamespaceLike();
            }
        }
    }
    setAsValue() {
        if (this.isType)
            throw Error(`type but value (${this})`);
        this.isValue = true;
    }
    setAsType() {
        if (this.isTemplateFunctionBase)
            throw Error(`function base but type (${this})`);
        if (this.isFunctionBase)
            throw Error(`function base but type (${this})`);
        if (this.isFunction)
            throw Error(`function but type (${this})`);
        if (this.isValue)
            throw Error(`value but type (${this})`);
        this.isType = true;
    }
    setAsBasicType() {
        this.setAsType();
        this.isBasicType = true;
    }
    setAsClass() {
        this.setAsType();
        this.isClassLike = true;
        this.setAsNamespaceLike();
        if (this.templateBase !== null) {
            this.templateBase.setAsClass();
        }
        if (this.parent !== null) {
            this.parent.setAsNamespaceLike();
        }
    }
    setAsClassLike() {
        this.isClassLike = true;
        this.setAsNamespaceLike();
    }
    setAsEnum() {
        this.setAsType();
        this.isEnum = true;
        this.setAsClassLike();
    }
    setAsFunction() {
        this.isFunction = true;
    }
    getTypeOfIt() {
        if (this.isConstant) {
            if (this.parent !== PdbIdentifier.global) {
                throw Error(`${this}: constant parent is not global`);
            }
            if (/^-?\d+$/.test(this.name)) {
                return int_t;
            }
            else {
                throw Error(`${this}: unexpected constant`);
            }
        }
        if (this.isClassLike || this.isBasicType) {
            return typename.makeSpecialized([this]);
        }
        if (this.isValue) {
            const item = this.removeDeco("&").removeConst();
            if (item.isFunction) {
                if (item.isMemberPointer) {
                    const base = PdbIdentifier.global.make(`${item.returnType} ${item.memberPointerBase}::*`);
                    return makeFunction(base, item.returnType, item.functionParameters, true);
                }
                else {
                    const base = PdbIdentifier.global.make(`${item.returnType}`);
                    return makeFunction(base, item.returnType, item.functionParameters, true);
                }
            }
            if (item.returnType === null) {
                return item;
            }
            return item.returnType;
        }
        return typename.makeSpecialized([this]);
    }
    unwrapType() {
        if (this.templateBase === typename)
            return this.templateParameters[0];
        if (this.unionedTypes !== null) {
            return PdbIdentifier.makeUnionTypes([...this.unionedTypes].map(u => u.unwrapType()));
        }
        return this;
    }
    redirect(target) {
        this.redirectTo = target;
        target.redirectedFrom = this;
        this.isRedirectType = true;
    }
    static parse(symbol) {
        const oldi = parser.i;
        const oldctx = parser.context;
        parser.i = 0;
        parser.context = symbol;
        const out = parseSymbol("");
        parser.context = oldctx;
        parser.i = oldi;
        return out;
    }
}
exports.PdbIdentifier = PdbIdentifier;
PdbIdentifier.global = new PdbIdentifier("");
PdbIdentifier.std = PdbIdentifier.global.make("std");
PdbIdentifier.global.setAsNamespace();
PdbIdentifier.std.setAsNamespace();
PdbIdentifier.global.make("__int64").setAsBasicType();
PdbIdentifier.global.make("__int64 unsigned").setAsBasicType();
PdbIdentifier.global.make("bool").setAsBasicType();
PdbIdentifier.global.make("void").setAsBasicType();
const uniqueType_t = PdbIdentifier.global.make("UniqueType");
const int_t = PdbIdentifier.global.make("int");
int_t.setAsBasicType();
PdbIdentifier.global.make("int unsigned").setAsBasicType();
PdbIdentifier.global.make("long").setAsBasicType();
PdbIdentifier.global.make("long unsigned").setAsBasicType();
PdbIdentifier.global.make("short").setAsBasicType();
PdbIdentifier.global.make("short unsigned").setAsBasicType();
PdbIdentifier.global.make("char").setAsBasicType();
PdbIdentifier.global.make("char unsigned").setAsBasicType();
PdbIdentifier.global.make("wchar_t").setAsBasicType();
PdbIdentifier.global.make("wchar_t unsigned").setAsBasicType();
PdbIdentifier.global.make("float").setAsBasicType();
PdbIdentifier.global.make("double").setAsBasicType();
const any_t = PdbIdentifier.global.make("any");
any_t.setAsBasicType();
const void_t = PdbIdentifier.global.make("void");
void_t.setAsBasicType();
const typename = PdbIdentifier.global.make("typename");
typename.isType = true;
const parser = new textparser_1.LanguageParser("");
function printParserState(id) {
    console.log();
    console.log();
    console.log("index: " + symbolIndex);
    if (id != null)
        console.log(id + "");
    console.log(parser.context);
    console.log(" ".repeat(parser.i) + "^");
}
function must(next, id) {
    if (parser.nextIf(next))
        return;
    printParserState(id);
    throw Error(`unexpected character(Expected=${next}, Actual=${parser.peek()})`);
}
function setAsFunction(func, funcbase, args, returnType, isType) {
    if (args.length === 1 && args[0] === void_t) {
        args.length = 0;
    }
    func.functionParameters = args;
    funcbase.overloads.push(func);
    if (returnType !== null) {
        func.setReturnType(returnType);
    }
    if (isType) {
        func.setAsType();
        func.isFunctionType = true;
    }
    else {
        func.setAsFunction();
        func.functionBase = funcbase;
        funcbase.isFunctionBase = true;
        const templateBase = funcbase.templateBase;
        if (templateBase !== null) {
            templateBase.isTemplateFunctionBase = true;
            func.templateBase = templateBase;
        }
    }
}
function makeFunction(funcbase, returnType, args, isType) {
    const id = funcbase.parent.make(funcbase.name + "(" + args.join(",") + ")");
    id.isConstructor = funcbase.isConstructor;
    id.isDestructor = funcbase.isDestructor;
    if (id.isConstructor || id.isDestructor)
        id.parent.setAsClass();
    setAsFunction(id, funcbase, args, returnType, isType);
    return id;
}
function parseParameters() {
    const args = [];
    for (;;) {
        if (parser.nextIf("...")) {
            parser.readOperator(OPERATORS);
            args.push(PdbIdentifier.global.make("..."));
        }
        else {
            const arg = parseIdentity(",)");
            arg.setAsType();
            args.push(arg);
        }
        if (parser.endsWith(","))
            continue;
        if (!parser.endsWith(")")) {
            printParserState();
            throw Error(`Unexpected end`);
        }
        break;
    }
    return args;
}
class Deco {
    constructor() {
        this.chain = null;
    }
    add(chain) {
        chain.chain = this.chain;
        this.chain = chain;
    }
    clear() {
        this.chain = null;
    }
}
class DecoRoot extends Deco {
    apply(id) {
        if (this.chain === null)
            return id;
        return this.chain.apply(id);
    }
}
function parseDeco(base, info, from, sourceFrom, eof) {
    const deco = new DecoRoot();
    for (;;) {
        const prev = parser.i;
        const oper = parser.readOperator(OPERATORS);
        if (oper === null) {
            if (eof !== "") {
                throw Error(`Unexpected end, ${eof} expected`);
            }
            if (base === null)
                throw Error(`null base`);
            return deco.apply(base);
        }
        else if (oper === "" || oper === "`" || oper === "<") {
            if (oper !== "") {
                parser.i = prev;
            }
            const beforeKeyword = parser.i;
            const keyword = parser.readIdentifier();
            if (keyword === "const") {
                if (base === null)
                    throw Error(`null base`);
                const decoed = base.decorate(keyword, parser.getFrom(sourceFrom));
                if (base.isFunction) {
                    base.constFunction = decoed;
                    setAsFunction(decoed, base.functionBase, base.functionParameters.slice(), base.returnType, base.isType);
                    decoed.isType = false;
                }
                base = decoed;
            }
            else if (keyword === "__cdecl" || keyword === "__stdcall") {
                info.callingConvension = keyword;
                info.isFunction = true;
            }
            else if (keyword === "__ptr64") {
                // do nothing
            }
            else if (keyword === "unsigned" || keyword === "signed") {
                if (base === null)
                    throw Error(`null base`);
                base = base.decorate(keyword, parser.getFrom(sourceFrom));
                base.setAsBasicType();
            }
            else if (keyword === "noexcept") {
                if (base === null)
                    throw Error(`null base`);
                if (!base.isFunction && !base.isFunctionType)
                    throw Error(`base is not function (${base})`);
                if (base.isType) {
                    base = base.decorate("noexcept", parser.getFrom(sourceFrom));
                }
                base.isNoExcept = true;
            }
            else {
                if (keyword === null) {
                    parser.skipSpaces();
                    if (parser.nextIf("`")) {
                        const name = parser.readTo("'");
                        if (name === "RTTI Type Descriptor") {
                            if (base === null)
                                throw Error(`null base`);
                            base = base.make("`RTTI Type Descriptor'");
                            base.source = parser.getFrom(sourceFrom);
                            base.isStatic = true;
                            base.setAsValue();
                            continue;
                        }
                    }
                }
                parser.i = beforeKeyword;
                const fnOrThisType = parseIdentity(info.isParenthesesInside ? ")" : info.isFunction ? "(" : eof, { isTypeInside: true });
                let returnType;
                if (base !== null) {
                    returnType = deco.apply(base);
                    if (fnOrThisType.returnType !== null) {
                        throw Error(`returnType duplicated (${fnOrThisType})`);
                    }
                }
                else {
                    if (fnOrThisType.returnType !== null) {
                        returnType = fnOrThisType.returnType;
                    }
                    else if (fnOrThisType.name.startsWith("~")) {
                        returnType = void_t;
                        fnOrThisType.isDestructor = true;
                        if (fnOrThisType.templateBase !== null) {
                            fnOrThisType.nameBase = fnOrThisType.templateBase;
                            fnOrThisType.nameBase.isNameBase = true;
                            fnOrThisType.templateBase = null;
                        }
                    }
                    else {
                        let ctor = null;
                        const parent = fnOrThisType.parent;
                        if (parent.name === fnOrThisType.name) {
                            ctor = fnOrThisType;
                        }
                        else if (fnOrThisType.templateBase !== null && fnOrThisType.templateBase.name === parent.name) {
                            ctor = fnOrThisType.templateBase;
                        }
                        if (ctor !== null) {
                            if (ctor.templateBase !== null) {
                                ctor.nameBase = ctor.templateBase;
                                ctor.nameBase.isNameBase = true;
                                ctor.templateBase = null;
                            }
                            ctor.isConstructor = true;
                            returnType = void_t;
                            fnOrThisType.isConstructor = true;
                        }
                        else {
                            returnType = null;
                        }
                    }
                }
                deco.clear();
                if (parser.endsWith("(")) {
                    const args = parseParameters();
                    base = makeFunction(fnOrThisType, returnType, args, false);
                    base.source = parser.getFrom(sourceFrom);
                    info.isFunction = false;
                }
                else if (parser.endsWith("*")) {
                    base = PdbIdentifier.global.make(`${returnType} ${fnOrThisType}::*`);
                    base.isMemberPointer = true;
                    base.memberPointerBase = fnOrThisType;
                    if (returnType !== null) {
                        base.setReturnType(returnType);
                    }
                    base.setAsType();
                    base.source = parser.getFrom(sourceFrom);
                }
                else {
                    base = fnOrThisType;
                    if (info.isFunction) {
                        // vcall, code chunk?
                    }
                    else {
                        base.setAsValue();
                    }
                    if (returnType !== null) {
                        base.setReturnType(returnType);
                    }
                    base.source = parser.getFrom(sourceFrom);
                    return base;
                }
            }
        }
        else if (eof.indexOf(oper) !== -1) {
            if (base === null)
                throw Error(`null base`);
            return base;
        }
        else if (oper === "*" || oper === "&" || oper === "&&") {
            if (base === null)
                throw Error(`null base`);
            base = base.decorate(oper, parser.getFrom(sourceFrom));
        }
        else if (oper === "(") {
            if (info.isFunction) {
                if (base === null)
                    throw Error(`null base`);
                const baseType = base.isMemberPointer ? base.memberPointerBase : base;
                const returnType = base.isMemberPointer ? base.returnType : base;
                const args = parseParameters();
                base = makeFunction(baseType, returnType, args, true);
                info.isFunction = false;
                if (base.isMemberPointer) {
                    base.setAsType();
                    base.isFunctionType = true;
                }
            }
            else {
                const old = info.isParenthesesInside;
                info.isParenthesesInside = true;
                base = parseDeco(base, info, from, sourceFrom, ")");
                info.isParenthesesInside = old;
            }
        }
        else if (oper === "[") {
            const number = parser.readIdentifier();
            if (number === null) {
                printParserState(base);
                throw Error(`Invalid number ${number}`);
            }
            if (!/^\d+$/.test(number)) {
                printParserState(base);
                throw Error(`Unexpected index ${number}`);
            }
            must("]");
            if (base === null)
                throw Error(`null base`);
            base = base.decorate(`[${number}]`, parser.getFrom(sourceFrom));
            base.arraySize = +number;
        }
        else {
            parser.i--;
            printParserState(base);
            throw Error(`Unexpected operator ${oper}`);
        }
    }
}
function parseIdentity(eof, info = {}, scope = PdbIdentifier.global) {
    if (info.isTypeInside == null)
        info.isTypeInside = false;
    parser.skipSpaces();
    const sourceFrom = parser.i;
    for (;;) {
        parser.skipSpaces();
        const from = parser.i;
        let id;
        let idname;
        for (;;) {
            const idnameNormal = parser.readIdentifier();
            idname = parser.getFrom(from);
            if (idnameNormal === null) {
                const oper = parser.readOperator(OPERATORS);
                if (oper === "~") {
                    continue;
                }
                else if (oper !== null && info.isTypeInside && oper === "*") {
                    scope.isClassLike = true;
                    scope.setAsType();
                    return scope;
                }
                else if (oper === "<") {
                    const innerText = parser.readTo(">");
                    const lambdaName = parser.getFrom(from);
                    if (innerText === "lambda_invoker_cdecl") {
                        id = scope.make(lambdaName);
                        id.setAsFunction();
                        id.source = parser.getFrom(sourceFrom);
                    }
                    else if (/^lambda_[a-z0-9]+$/.test(innerText)) {
                        id = scope.make(lambdaName);
                        id.isLambda = true;
                        id.source = parser.getFrom(sourceFrom);
                        id.setAsClass();
                    }
                    else if (/^unnamed-type-.+$/.test(innerText)) {
                        id = scope.make(lambdaName);
                        id.source = parser.getFrom(sourceFrom);
                    }
                    else {
                        printParserState();
                        throw Error(`Unexpected name <${innerText}>`);
                    }
                }
                else if (oper === "-") {
                    const idname = parser.readIdentifier();
                    if (idname === null) {
                        printParserState();
                        throw Error(`Unexpected end`);
                    }
                    if (!/^\d+$/.test(idname)) {
                        printParserState();
                        throw Error(`Unexpected identifier ${idname}`);
                    }
                    id = PdbIdentifier.global.constVal("-" + idname);
                }
                else if (oper === "&") {
                    id = parseSymbol(eof);
                    id.setAsValue();
                    id.source = parser.getFrom(sourceFrom);
                    id = id.decorate(oper, parser.getFrom(from));
                    id.setAsValue();
                    id.source = parser.getFrom(sourceFrom);
                    return id;
                }
                else if (oper === "`") {
                    _idfind: {
                        if (parser.nextIf("vftable'") || parser.nextIf("vbtable'")) {
                            scope.setAsClass();
                            if (parser.nextIf("{for `")) {
                                const arg = parseSymbol("'");
                                must("}");
                                id = scope.make(parser.getFrom(from));
                                id.adjustors = [arg];
                            }
                            else {
                                id = scope.make(parser.getFrom(from));
                            }
                            id.isVFTable = true;
                            id.isStatic = true;
                            id.setAsValue();
                        }
                        else if (parser.nextIf("vcall'")) {
                            const arg = parser.readTo("'");
                            parser.readTo("'");
                            id = scope.make(parser.getFrom(from));
                            id.isPrivate = true;
                            id.adjustors = [PdbIdentifier.global.make(arg)];
                            eof = eof.replace(/\(/, "");
                        }
                        else {
                            for (const [sname, hasParam] of SPECIAL_NAMES) {
                                if (parser.nextIf(sname)) {
                                    if (hasParam) {
                                        const iid = parseIdentity("'", {}, scope);
                                        must("'");
                                        id = scope.make(parser.getFrom(from));
                                        id.adjustors = [iid];
                                    }
                                    else {
                                        id = scope.make(parser.getFrom(from));
                                    }
                                    break _idfind;
                                }
                            }
                            const arg = parseSymbol("'");
                            parser.readTo("'");
                            id = scope.make(parser.getFrom(from));
                            id.isPrivate = true;
                            id.adjustors = [arg];
                            id.source = parser.getFrom(sourceFrom);
                        }
                    }
                }
                else {
                    parser.i--;
                    printParserState();
                    throw Error(`Unexpected operator ${oper}`);
                }
            }
            else {
                let isUnsigned = 0;
                let castTo = null;
                if (scope === PdbIdentifier.global && /^\d+$/.test(idname)) {
                    id = PdbIdentifier.global.constVal(idname);
                }
                else if (idname === "__cdecl" || idname === "__stdcall") {
                    if (scope === PdbIdentifier.global) {
                        id = null;
                    }
                    else {
                        throw Error(`Invalid scope(${scope}) for ${idname}`);
                    }
                    parser.i = from;
                    break;
                }
                else if (idname === "const") {
                    id = parseIdentity(eof);
                    id.setAsValue();
                    id.isConstant = true;
                    return id;
                }
                else if (idname === "enum") {
                    id = parseIdentity(eof, { isClassLike: true });
                    return id;
                }
                else if (idname === "class") {
                    id = parseIdentity(eof, { isClassLike: true });
                    return id;
                }
                else if (idname === "struct") {
                    return parseIdentity(eof, { isClassLike: true });
                }
                else if (idname === "union") {
                    return parseIdentity(eof, { isClassLike: true });
                }
                else if (idname === "operator") {
                    const oi = parser.i;
                    const oper = parser.readOperator(OPERATORS_FOR_OPERATOR);
                    if (oper === "") {
                        const prev = parser.i;
                        let next = parser.readIdentifier();
                        if (next === null) {
                            printParserState();
                            throw Error(`Unexpected end, identifier expected`);
                        }
                        if (next === "delete") {
                            if (parser.nextIf("[]")) {
                                next += "[]";
                            }
                        }
                        else if (next === "new") {
                            if (parser.nextIf("[]")) {
                                next += "[]";
                            }
                        }
                        else {
                            parser.i = prev;
                            castTo = parseIdentity("(");
                            parser.unget("(");
                            next = castTo.toString();
                        }
                        idname += " " + next;
                    }
                    else {
                        const oi2 = parser.i;
                        const oper2 = parser.readOperator(OPERATORS);
                        if (oper === "<<" && oper2 === "") {
                            parser.i = oi;
                            idname += parser.readOperator(OPERATORS);
                        }
                        else {
                            parser.i = oi2;
                            idname += oper;
                        }
                    }
                }
                else if (idname === "unsigned") {
                    isUnsigned = 1;
                    idname = parser.readIdentifier();
                    if (idname === null) {
                        idname = "int";
                    }
                }
                else if (idname === "signed") {
                    isUnsigned = 2;
                    idname = parser.readIdentifier();
                    if (idname === null) {
                        idname = "int";
                    }
                }
                id = scope.make(idname);
                if (castTo !== null) {
                    id.returnType = castTo;
                }
                if (isUnsigned !== 0) {
                    id = id.decorate(isUnsigned === 1 ? "unsigned" : "signed", parser.getFrom(sourceFrom));
                    id.setAsBasicType();
                }
                if (idname.startsWith("~")) {
                    id.parent.setAsClass();
                }
                id.source = parser.getFrom(sourceFrom);
            }
            break;
        }
        if (id !== null) {
            if (FIELD_FOR_CLASS.has(idname)) {
                if (id.isNamespace) {
                    throw Error(`${id}: is not class`);
                }
                id.parent.setAsClass();
            }
            id.addRef();
            if (parser.nextIf("`")) {
                id.release();
                const adjustor = parser.readTo("'");
                let matched;
                if ((matched = adjustor.match(/^adjustor{(\d+)}$/))) {
                    id = scope.make(id.name + "`" + adjustor + "'");
                    id.adjustors.push(PdbIdentifier.global.constVal(matched[1]));
                }
                else if ((matched = adjustor.match(/^vtordisp{(\d+),(\d+)}$/))) {
                    id = scope.make(id.name + "`" + adjustor + "'");
                    const v1 = PdbIdentifier.global.constVal(matched[1]);
                    const v2 = PdbIdentifier.global.constVal(matched[2]);
                    id.adjustors.push(v1, v2);
                }
                else {
                    printParserState();
                    throw Error(`Invalid adjustor ${adjustor}`);
                }
                id.source = parser.getFrom(sourceFrom);
            }
            while (parser.nextIf("<")) {
                id.isTemplate = true;
                const args = [];
                if (!parser.nextIf(">")) {
                    for (;;) {
                        const arg = parseIdentity(",>");
                        args.push(arg);
                        if (parser.endsWith(","))
                            continue;
                        if (!parser.endsWith(">")) {
                            printParserState();
                            throw Error(`Unexpected end`);
                        }
                        break;
                    }
                }
                const base = id.parent.templateBase;
                if (base !== null && base.name === id.name) {
                    base.isTemplateConstructorBase = true;
                }
                const source = parser.getFrom(sourceFrom);
                id = id.makeSpecialized(args, source);
            }
        }
        parser.skipSpaces();
        if (parser.nextIf("::")) {
            if (id === null) {
                throw Error("namespace without name");
            }
            id.setAsNamespaceLike();
            scope = id;
        }
        else {
            if (info.isClassLike) {
                if (id === null) {
                    throw Error("class without name");
                }
                id.setAsClass();
            }
            if (id !== null) {
                id.source = parser.getFrom(sourceFrom);
            }
            return parseDeco(id, {
                callingConvension: null,
                isFunction: false,
                isParenthesesInside: false,
            }, from, sourceFrom, eof);
        }
    }
}
function parseSymbol(eof, isFunction = false) {
    const from = parser.i;
    let modifier = null;
    const isThunk = parser.nextIf("[thunk]:");
    if (parser.nextIf("public:")) {
        modifier = "public";
    }
    else if (parser.nextIf("private:")) {
        modifier = "private";
    }
    else if (parser.nextIf("protected:")) {
        modifier = "protected";
    }
    parser.skipSpaces();
    const virtualFunction = parser.nextIf("virtual");
    const isStatic = parser.nextIf("static");
    const id = parseIdentity(eof, { isTypeInside: isFunction });
    if (modifier !== null) {
        id.modifier = modifier;
        id.decay().parent.setAsClass();
    }
    if (virtualFunction) {
        id.setAsFunction();
        id.isVirtualFunction = true;
        id.decay().parent.setAsClass();
    }
    if (isStatic) {
        id.isStatic = true;
        id.decay().parent.setAsClass();
    }
    id.isThunk = isThunk;
    id.source = parser.getFrom(from);
    return id;
}
function parse(from = 0, to) {
    const cache = new pdbcache_1.PdbCache();
    if (to == null)
        to = cache.total;
    const bar = new ProgressBar("loading [:bar] :current/:total", to - from);
    symbolIndex = -1;
    for (const { address, name, flags, tag } of cache) {
        if (++symbolIndex < from)
            continue;
        if (symbolIndex >= to)
            break;
        bar.tick();
        parser.context = core_1.pdb.undecorate(name, 0);
        parser.i = 0;
        try {
            const id = parseSymbol("");
            id.address = address;
            id.source = parser.context;
        }
        catch (err) {
            printParserState();
            throw err;
        }
    }
    bar.terminate();
    cache.close();
}
const int32Types = new Set([
    PdbIdentifier.global.make("char"),
    PdbIdentifier.global.make("char unsigned"),
    PdbIdentifier.global.make("wchar_t"),
    PdbIdentifier.global.make("wchar_t unsigned"),
    PdbIdentifier.global.make("short"),
    PdbIdentifier.global.make("short unsigned"),
    PdbIdentifier.global.make("int"),
    PdbIdentifier.global.make("long"),
]);
PdbIdentifier.parse("class std::basic_string<char,class std::char_traits<char>,class std::allocator<char> >");
PdbIdentifier.parse("class std::basic_ostream<char,class std::char_traits<char> >");
PdbIdentifier.parse("class std::basic_istream<char,class std::char_traits<char> >");
PdbIdentifier.parse("class std::basic_iostream<char,class std::char_traits<char> >");
PdbIdentifier.parse("class std::basic_stringbuf<char,class std::char_traits<char>,class std::allocator<char> >");
PdbIdentifier.parse("class std::basic_istringstream<char,class std::char_traits<char>,class std::allocator<char> >");
PdbIdentifier.parse("class std::basic_ostringstream<char,class std::char_traits<char>,class std::allocator<char> >");
PdbIdentifier.parse("class std::basic_stringstream<char,class std::char_traits<char>,class std::allocator<char> >");
// 57136, Error: function but type
parse(0, 50000);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ltYm9scGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3ltYm9scGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdDQUF3QztBQUN4QyxrQ0FBOEI7QUFDOUIsa0RBQStDO0FBQy9DLDhDQUErQztBQUMvQyx5Q0FBc0M7QUFFdEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUVoRCxNQUFNLHNCQUFzQixHQUFHLElBQUksR0FBRyxDQUFTO0lBQzNDLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osSUFBSTtJQUNKLElBQUk7SUFDSixJQUFJO0lBQ0osS0FBSztJQUNMLEtBQUs7SUFDTCxJQUFJO0NBQ1AsQ0FBQyxDQUFDO0FBRUgsbUJBQW1CO0FBQ25CLE1BQU0sYUFBYSxHQUF3QjtJQUN2QyxDQUFDLDJCQUEyQixFQUFFLElBQUksQ0FBQztJQUNuQyxDQUFDLGlDQUFpQyxFQUFFLElBQUksQ0FBQztJQUN6QyxDQUFDLCtCQUErQixFQUFFLEtBQUssQ0FBQztJQUN4QyxDQUFDLGtDQUFrQyxFQUFFLEtBQUssQ0FBQztJQUMzQyxDQUFDLHdCQUF3QixFQUFFLEtBQUssQ0FBQztJQUNqQyxDQUFDLHNCQUFzQixFQUFFLEtBQUssQ0FBQztJQUMvQixDQUFDLDZCQUE2QixFQUFFLEtBQUssQ0FBQztJQUN0QyxDQUFDLGlDQUFpQyxFQUFFLEtBQUssQ0FBQztJQUMxQyxDQUFDLHNDQUFzQyxFQUFFLEtBQUssQ0FBQztJQUMvQyxDQUFDLGdDQUFnQyxFQUFFLEtBQUssQ0FBQztJQUN6QyxD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