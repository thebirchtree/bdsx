"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const styling_1 = require("../externs/bds-scripting/styling");
const imagesections_1 = require("./imagesections");
const symbolparser_1 = require("./symbolparser");
const specialNameRemap = new Map();
specialNameRemap.set("`vector deleting destructor'", "__vector_deleting_destructor");
specialNameRemap.set("`scalar deleting destructor'", "__scalar_deleting_destructor");
specialNameRemap.set("`vbase destructor'", "__vbase_destructor");
specialNameRemap.set("any", "_any");
specialNameRemap.set("string", "_string");
specialNameRemap.set("function", "_function");
specialNameRemap.set("add", "_add");
specialNameRemap.set("null", "_null");
specialNameRemap.set("finally", "_finally");
specialNameRemap.set("yield", "_yield");
specialNameRemap.set("Symbol", "_Symbol");
specialNameRemap.set("`vftable'", "__vftable");
specialNameRemap.set("`vbtable'", "__vbtable");
specialNameRemap.set("operator new", "operator_new");
specialNameRemap.set("operator new[]", "operator_new_array");
specialNameRemap.set("operator delete", "operator_delete");
specialNameRemap.set("operator delete[]", "operator_delete_array");
specialNameRemap.set("operator=", "operator_mov");
specialNameRemap.set("operator+", "operator_add");
specialNameRemap.set("operator-", "operator_sub");
specialNameRemap.set("operator*", "operator_mul");
specialNameRemap.set("operator/", "operator_div");
specialNameRemap.set("operator%", "operator_mod");
specialNameRemap.set("operator+=", "operator_add_mov");
specialNameRemap.set("operator-=", "operator_sub_mov");
specialNameRemap.set("operator*=", "operator_mul_mov");
specialNameRemap.set("operator/=", "operator_div_mov");
specialNameRemap.set("operator%=", "operator_mod_mov");
specialNameRemap.set("operator==", "operator_e");
specialNameRemap.set("operator!=", "operator_ne");
specialNameRemap.set("operator>", "operator_gt");
specialNameRemap.set("operator<", "operator_lt");
specialNameRemap.set("operator>=", "operator_gte");
specialNameRemap.set("operator<=", "operator_lte");
specialNameRemap.set("operator>>", "operator_shr");
specialNameRemap.set("operator<<", "operator_shl");
specialNameRemap.set("operator()", "operator_call");
specialNameRemap.set("operator[]", "operator_index");
specialNameRemap.set("operator++", "operator_inc");
specialNameRemap.set("operator--", "operator_dec");
specialNameRemap.set("getString", "_getString");
class IgnoreThis {
    constructor(message) {
        this.message = message;
    }
}
const outpath = path.join(__dirname, "globals");
try {
    fs.mkdirSync(outpath);
}
catch (err) { }
class TemplateInfo {
    constructor(parent, paramTypes, parameters, totalCount, totalVariadicCount, count, variadicType) {
        this.parent = parent;
        this.paramTypes = paramTypes;
        this.parameters = parameters;
        this.totalCount = totalCount;
        this.totalVariadicCount = totalVariadicCount;
        this.count = count;
        this.variadicType = variadicType;
        this.names = new Map();
    }
    makeNames(file) {
        let names = this.names.get(file);
        if (names != null)
            return names;
        if (this.parent === null) {
            this.names.set(file, (names = []));
            return names;
        }
        names = this.parent.makeNames(file).slice();
        this.names.set(file, names);
        for (let i = 0; i < this.count; i++) {
            const name = file.stringify(this.paramTypes[i].unwrapType(), IdType.Type);
            names.push(`T${this.parent.totalCount + i} extends ${name}`);
        }
        if (this.variadicType !== null) {
            names.push(`ARGS extends any[]`);
        }
        return names;
    }
}
function filterToFunction(filters) {
    filters = filters.filter(f => f !== null);
    return id => {
        for (const filter of filters) {
            switch (typeof filter) {
                case "string":
                    if (id.name === filter)
                        return true;
                    break;
                case "function":
                    if (filter(id))
                        return true;
                    break;
                default:
                    if (filter.test(id.name))
                        return true;
                    break;
            }
        }
        return false;
    };
}
function getFiltered(filters) {
    const filter = filterToFunction(filters);
    const filted = [];
    for (let i = 0; i < ids.length;) {
        const id = ids[i];
        if (filter(id)) {
            filted.push(id);
            if (i === ids.length - 1) {
                ids.pop();
            }
            else {
                ids[i] = ids.pop();
            }
        }
        else {
            i++;
        }
    }
    return filted;
}
function getFirstIterableItem(item) {
    for (const v of item) {
        return v;
    }
    return undefined;
}
const TEMPLATE_INFO_EMPTY = new TemplateInfo(null, [], [], 0, 0, 0, null);
function usingFilter(item) {
    if (item.unuse != null)
        return item.unuse;
    item = item.decay();
    if (item.isLambda)
        return (item.unuse = false);
    if (item.parent === null)
        return (item.unuse = true);
    if (!usingFilter(item.parent))
        return (item.unuse = false);
    if ((item.isFunctionBase || item.isTemplateFunctionBase || item.isFunction || item.isClassLike) &&
        item.parent === symbolparser_1.PdbIdentifier.std &&
        item.name.startsWith("_"))
        return (item.unuse = false);
    if (item.name === "`anonymous namespace'")
        return (item.unuse = false);
    if (item.templateBase !== null) {
        if (item.templateBase.parent.name === "JsonUtil") {
            switch (item.templateBase.name) {
                case "JsonSchemaNode":
                case "JsonParseState":
                case "JsonSchemaEnumNode":
                case "JsonSchemaNodeChildSchemaOptions":
                case "JsonSchemaNode_CanHaveChildren":
                case "JsonSchemaChildOption":
                case "JsonSchemaObjectNode":
                case "JsonSchemaArrayNode":
                case "JsonSchemaTypedNode":
                case "JsonSchemaChildOptionBase":
                    return (item.unuse = false);
            }
        }
        for (const param of item.templateParameters) {
            if (!usingFilter(param))
                return (item.unuse = false);
        }
    }
    for (const param of item.functionParameters) {
        if (!usingFilter(param))
            return (item.unuse = false);
    }
    if (item.unionedTypes !== null) {
        for (const t of item.unionedTypes) {
            if (!usingFilter(t))
                return (item.unuse = false);
        }
    }
    if (item.returnType !== null) {
        if (!usingFilter(item.returnType))
            return (item.unuse = false);
    }
    return (item.unuse = true);
}
function remapRecursive(item, parameters) {
    const idx = parameters.indexOf(item);
    return parameters;
    if (idx === -1)
        return parameters;
    return parameters.map(param => {
        if (param !== item)
            return param;
        const base = item.templateBase;
        if (base === null)
            throw Error(`no base (${base})`);
        return base.makeSpecialized(item.templateParameters.map(() => any_t));
    });
}
function setBasicType(name, jsTypeName, paramVarName, host) {
    const item = name instanceof symbolparser_1.PdbIdentifier ? name : symbolparser_1.PdbIdentifier.parse(name);
    item.isBasicType = true;
    item.host = host;
    item.jsTypeName = jsTypeName;
    item.paramVarName = paramVarName;
    return item;
}
var IdType;
(function (IdType) {
    IdType[IdType["Type"] = 0] = "Type";
    IdType[IdType["Value"] = 1] = "Value";
})(IdType || (IdType = {}));
class ImportName {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}
class ImportTarget {
    constructor(path) {
        this.path = path;
        this.imports = new Map();
        this.varName = null;
    }
}
class TsWriter {
    constructor() {
        this.text = "";
        this.tabtext = "";
        this.opened = null;
    }
    appendAtLastLine(str) {
        if (!this.text.endsWith("\n"))
            return;
        this.text = this.text.substr(0, this.text.length - 1) + str + "\n";
    }
    writeln(text) {
        if (this.opened !== null) {
            this.text += this.opened;
            this.opened = null;
        }
        if (!text) {
            this.text += "\n";
        }
        else {
            text = text.trim();
            if (text === "") {
                this.text += "\n";
            }
            else {
                this.text += `${this.tabtext}${text}\n`;
            }
        }
    }
    open(openstr, always) {
        if (this.opened !== null) {
            this.text += this.opened;
            this.opened = null;
        }
        if (always) {
            this.text += `${this.tabtext}${openstr}\n`;
            this.tab();
            return;
        }
        this.opened = `${this.tabtext}${openstr}\n`;
        this.tab();
    }
    close(closestr) {
        this.detab();
        if (this.opened === null) {
            this.text += `${this.tabtext}${closestr}\n`;
        }
        else {
            this.opened = null;
        }
    }
    tab() {
        this.tabtext += "    ";
    }
    detab() {
        this.tabtext = this.tabtext.substr(0, this.tabtext.length - 4);
    }
}
class ImportInfo {
    constructor(base) {
        this.base = base;
        this.imports = new Map();
        this.globalNames = new Map();
    }
    makeGlobalName(name) {
        let counter = this.globalNames.get(name);
        if (counter == null) {
            this.globalNames.set(name, 1);
            return name;
        }
        for (;;) {
            const nname = name + ++counter;
            if (!this.globalNames.has(nname)) {
                this.globalNames.set(nname, counter);
                return nname;
            }
        }
    }
    importDirect(hint, module) {
        if (module === undefined) {
            throw Error(`host not found (${hint})`);
        }
        if (module === this.base) {
            throw Error(`self import (${hint})`);
        }
        if (module === null) {
            throw Error(`is const identifier (${hint})`);
        }
        let target = this.imports.get(module);
        if (target == null) {
            this.imports.set(module, (target = module.makeTarget()));
        }
        else {
            if (target.varName !== null) {
                return target.varName;
            }
        }
        const name = path.basename(module.path);
        target.varName = this.makeGlobalName(name);
        return target.varName;
    }
    importName(host, name, idType) {
        if (host === this.base)
            return name;
        if (host === undefined) {
            console.log("_____" + symbolparser_1.PdbIdentifier.global.children.get("int").host);
            throw Error(`host not found (${name})`);
        }
        if (host === null) {
            return name;
        }
        let target = this.imports.get(host);
        if (!target)
            this.imports.set(host, (target = host.makeTarget()));
        const imported = target.imports.get(name);
        let renamed;
        if (imported == null) {
            renamed = this.makeGlobalName(name);
            target.imports.set(name, new ImportName(renamed, idType));
        }
        else {
            renamed = imported.name;
            if (idType > imported.type) {
                imported.type = idType;
            }
        }
        return renamed;
    }
    makeImportString() {
        const MAX_LEN = 200;
        let importtext = "\n";
        function writeImportString(prefix, imports, postfix) {
            importtext += prefix;
            let linelen = prefix.length;
            let first = true;
            for (const [from, to] of imports) {
                let name;
                if (from === to) {
                    name = from;
                }
                else {
                    name = `${from} as ${to}`;
                }
                linelen += name.length;
                if (linelen >= MAX_LEN) {
                    importtext += "\n    ";
                    linelen = name.length + 4;
                }
                if (!first) {
                    importtext += ", ";
                    linelen += 2;
                }
                else {
                    first = false;
                }
                importtext += name;
            }
            importtext += postfix;
        }
        for (const target of this.imports.values()) {
            if (target.varName !== null) {
                importtext += `import ${target.varName} = require("${target.path}");\n`;
            }
            const types = [];
            const values = [];
            for (const [name, imported] of target.imports) {
                switch (imported.type) {
                    case IdType.Type:
                        types.push([name, imported.name]);
                        break;
                    case IdType.Value:
                        values.push([name, imported.name]);
                        break;
                }
            }
            if (types.length !== 0)
                writeImportString("import type { ", types, ` } from "${target.path}";\n`);
            if (values.length !== 0)
                writeImportString("import { ", values, ` } from "${target.path}";\n`);
        }
        importtext += "\n";
        return importtext;
    }
}
class TsFileBase {
    constructor(path) {
        this.path = path;
        this.imports = new ImportInfo(this);
    }
    makeTarget() {
        return new ImportTarget(this.path);
    }
}
class TsFileExtern extends TsFileBase {
}
const imports = {
    nativetype: new TsFileExtern("../../nativetype"),
    complextype: new TsFileExtern("../../complextype"),
    nativeclass: new TsFileExtern("../../nativeclass"),
    makefunc: new TsFileExtern("../../makefunc"),
    dll: new TsFileExtern("../../dll"),
    core: new TsFileExtern("../../core"),
    common: new TsFileExtern("../../common"),
    pointer: new TsFileExtern("../../pointer"),
};
var FieldType;
(function (FieldType) {
    FieldType[FieldType["Member"] = 0] = "Member";
    FieldType[FieldType["Static"] = 1] = "Static";
    FieldType[FieldType["InNamespace"] = 2] = "InNamespace";
})(FieldType || (FieldType = {}));
function getFieldType(item) {
    if (item.parent === null) {
        throw Error(`${item.name}: parent is null`);
    }
    if (item.isStatic) {
        return FieldType.Static;
    }
    if (item.isFunctionBase || item.isTemplateFunctionBase || item.isFunction) {
        return FieldType.Member;
    }
    return FieldType.InNamespace;
}
let insideOfClass = false;
let isStatic = false;
const adjustorRegExp = /^(.+)`adjustor{(\d+)}'$/;
const idremap = {
    "{": "",
    "}": "",
    ",": "_",
    "<": "_",
    ">": "_",
};
const recursiveCheck = new Set();
class TsFile extends TsFileBase {
    constructor() {
        super(...arguments);
        this.source = new TsWriter();
        this.currentNs = symbolparser_1.PdbIdentifier.global;
        this.isEmpty = false;
    }
    _getVarName(type) {
        let baseid = type;
        for (;;) {
            if (baseid.paramVarName)
                return baseid.paramVarName;
            if (baseid.decoedFrom !== null) {
                baseid = baseid.decoedFrom;
            }
            else if (baseid.functionBase !== null) {
                baseid = baseid.functionBase;
            }
            else if (baseid.templateBase !== null) {
                baseid = baseid.templateBase;
            }
            else if (baseid.isFunctionType) {
                return "cb";
            }
            else {
                break;
            }
        }
        if (baseid.memberPointerBase !== null) {
            const postfix = baseid.isFunction ? "_fn" : "_m";
            return this._getVarName(baseid.memberPointerBase) + postfix;
        }
        if (baseid.isTypeUnion)
            return "arg";
        let basename = this.getNameOnly(baseid, IdType.Value, {
            noImport: true,
        });
        if (basename.endsWith("_t"))
            basename = basename.substr(0, basename.length - 2);
        basename = styling_1.styling.toCamelStyle(basename, /[[\] :*]/g, false);
        return basename;
    }
    *enterNamespace(item) {
        const name = this.getNameOnly(item, IdType.Value);
        this.source.open(`export namespace ${name} {`);
        const oldns = this.currentNs;
        this.currentNs = item;
        yield;
        this.source.close(`}`);
        this.currentNs = oldns;
    }
    isClassMethod(id, isStatic) {
        return !id.isType && id.parent.isClassLike && !(isStatic || id.isStatic);
    }
    getIdName(item) {
        if (item.redirectedFrom !== null) {
            return this.getIdName(item.redirectedFrom);
        }
        if (item.templateBase !== null) {
            return this.getIdName(item.templateBase) + "_" + item.templateParameters.map(id => this.getIdName(id)).join("_");
        }
        if (item.decoedFrom !== null) {
            return this.getIdName(item.decoedFrom);
        }
        if (item.memberPointerBase !== null) {
            const postfix = item.isFunction ? "_fn" : "_m";
            return this.getIdName(item.memberPointerBase) + postfix;
        }
        let name = this.getNameOnly(item, IdType.Value, {
            noImport: true,
        }).replace(/[{},<>]/g, v => idremap[v]);
        if (name.startsWith("-")) {
            name = "minus_" + name.substr(1);
        }
        return name;
    }
    getTemplateInfo(item) {
        if (item.templateInfo != null) {
            return item.templateInfo;
        }
        if (item.parent === null) {
            item.templateInfo = TEMPLATE_INFO_EMPTY;
            return item.templateInfo;
        }
        const parentInfo = this.getTemplateInfo(item.parent);
        let parameters = parentInfo.parameters;
        if (item.specialized.length !== 0) {
            const first = item.specialized[0];
            let count = first.templateParameters.length;
            const slen = item.specialized.length;
            for (let i = 1; i < slen; i++) {
                const n = item.specialized[i].templateParameters.length;
                if (n !== count) {
                    if (n < count)
                        count = n;
                }
            }
            let types = null;
            let variadicType = null;
            for (const s of item.specialized) {
                if (!usingFilter(s))
                    continue;
                let j = 0;
                const srctypes = s.templateParameters;
                if (types === null) {
                    types = [];
                    for (; j < count; j++) {
                        types.push(srctypes[j].getTypeOfIt());
                    }
                }
                else {
                    for (; j < count; j++) {
                        types[j] = types[j].union(srctypes[j].getTypeOfIt());
                    }
                }
                for (; j < srctypes.length; j++) {
                    const t = srctypes[j];
                    if (variadicType === null) {
                        variadicType = t.getTypeOfIt();
                    }
                    else {
                        variadicType = variadicType.union(t.getTypeOfIt());
                    }
                }
            }
            if (types === null) {
                item.templateInfo = new TemplateInfo(parentInfo, remapRecursive(item, parentInfo.paramTypes), parameters, parentInfo.totalCount, parentInfo.totalVariadicCount, 0, null);
            }
            else {
                if (variadicType !== null) {
                    // types.push(variadicType); // TODO: array-lize
                    types.push(anys_t);
                }
                const variadicCount = variadicType !== null ? 1 : 0;
                item.templateInfo = new TemplateInfo(parentInfo, remapRecursive(item, parentInfo.paramTypes.concat(types)), parameters, count + parentInfo.totalCount, parentInfo.totalVariadicCount + +variadicCount, count, variadicType);
            }
        }
        else if (item.templateBase !== null) {
            const base = this.getTemplateInfo(item.templateBase);
            if (item.templateParameters.length !== 0) {
                if (base.variadicType !== null) {
                    const args = item.templateParameters.slice(base.count);
                    for (const arg of args) {
                        if (arg instanceof Array) {
                            throw Error(`Unexpected array`);
                        }
                    }
                    parameters = parameters.concat(item.templateParameters.slice(0, base.count), [args]);
                }
                else {
                    parameters = parameters.concat(item.templateParameters);
                }
            }
            item.templateInfo = new TemplateInfo(parentInfo, remapRecursive(item, base.paramTypes), parameters, base.totalCount, base.totalVariadicCount, base.count, base.variadicType);
        }
        else {
            if (parentInfo.parameters.length === 0) {
                item.templateInfo = TEMPLATE_INFO_EMPTY;
            }
            else {
                item.templateInfo = new TemplateInfo(parentInfo, remapRecursive(item, parentInfo.paramTypes), parameters, parentInfo.totalCount, parentInfo.totalVariadicCount, 0, null);
            }
        }
        return item.templateInfo;
    }
    getNameOnly(item, idType, opts = {}) {
        if (item.templateBase !== null) {
            throw Error(`${item}: getName with template`);
        }
        if (item.isTypeUnion) {
            throw Error(`${item}: getName with type union`);
        }
        if (item.decoedFrom !== null) {
            throw Error(`getName with deco type(${item})`);
        }
        if (item.isFunctionType) {
            throw Error(`${item.name}: getName with function type`);
        }
        if (item.parent === null) {
            throw Error(`${item.name} has not parent`);
        }
        if (item.isLambda) {
            throw new IgnoreThis(`lambda (${item})`);
        }
        let name = item.removeParameters().name;
        if (item.isConstructor) {
            let result = "";
            if (opts.needDot)
                result += ".";
            return result + "__constructor";
        }
        else {
            if (item.isDestructor) {
                const NativeType = this.imports.importName(imports.nativetype, "NativeType", idType);
                return `[${NativeType}.dtor]`;
            }
        }
        const remapped = specialNameRemap.get(name);
        let matched;
        if (remapped != null) {
            name = remapped;
        }
        else if (name.startsWith("`vector deleting destructor'")) {
            name = "__vector_deleting_destructor_" + item.adjustors.join("_");
        }
        else if (name.startsWith("`vftable'")) {
            name = "__vftable_for_" + item.adjustors.map(id => this.getIdName(id)).join("_");
        }
        else if (name.startsWith("`vbtable'")) {
            name = "__vbtable_for_" + item.adjustors.map(id => this.getIdName(id)).join("_");
        }
        else if (name.startsWith("`vcall'")) {
            name = "__vcall_" + item.adjustors.map(id => this.getIdName(id)).join("_");
        }
        else if ((matched = name.match(adjustorRegExp)) !== null) {
            name = matched[1] + "_adjustor_" + matched[2];
        }
        else if (name.startsWith("operator ")) {
            if (item.returnType === null) {
                throw Error(`failed to get return type(${item})`);
            }
            else {
                name = "operator_castto_" + this.getIdName(item.returnType);
            }
        }
        else if (name === "...") {
            if (opts.needDot)
                throw Error(`Variadic not need dot`);
        }
        if (item.parent === symbolparser_1.PdbIdentifier.global && !item.isConstant) {
            if (!opts.needDot && !opts.noImport) {
                name = this.imports.importName(item.host, name, idType);
            }
        }
        if (opts.needDot)
            name = "." + name;
        return name;
    }
    getDeclaration(item, type, define) {
        if (item.templateBase !== null) {
            throw Error(`${item}: getNameDeclaration with template`);
        }
        if (item.parent === null) {
            throw Error(`${item.name} has not parent`);
        }
        if (item.isLambda) {
            throw new IgnoreThis(`lambda (${item})`);
        }
        let result = "";
        if (insideOfClass) {
            if (isStatic) {
                result += "static ";
            }
        }
        else {
            if (define == null)
                throw Error(`non class member but no define`);
            result += `export ${define} `;
        }
        result += this.getNameOnly(item, IdType.Value);
        if (type !== null)
            result += ":" + type;
        return result;
    }
    getName(item, idType, opts = {}) {
        if (item.templateBase !== null) {
            throw Error(`${item}: getName with template`);
        }
        if (item.parent === null) {
            throw Error(`${item.name} has not parent`);
        }
        if (item.isLambda) {
            throw new IgnoreThis(`lambda (${item})`);
        }
        let result = "";
        let needDot = false;
        if (item.parent === symbolparser_1.PdbIdentifier.global) {
            if (opts.assignee) {
                const name = this.imports.importDirect(item, item.host);
                result += name;
                needDot = true;
            }
        }
        else {
            result = this.stringify(item.parent, idType);
            if (insideOfClass &&
                !isStatic &&
                !item.isType &&
                idType !== IdType.Type &&
                item.parent.isClassLike &&
                (item.isFunction || item.isFunctionBase || item.isTemplateFunctionBase)) {
                result += ".prototype";
            }
            needDot = true;
        }
        return result + this.getNameOnly(item, idType, { needDot });
    }
    makeFuncDeclaration(args, thisType) {
        const names = new Map();
        const declaration = [];
        const parameters = [];
        for (let i = 0; i < args.length; i++) {
            const basename = this._getVarName(args[i]);
            let name = basename;
            const info = names.get(name);
            if (info == null) {
                names.set(name, { index: i, counter: 1 });
            }
            else {
                if (info.counter === 1) {
                    declaration[info.index] = basename + "_" + info.counter;
                }
                info.counter++;
                name = basename + "_" + info.counter;
            }
            declaration[i] = name;
        }
        for (let i = 0; i < declaration.length; i++) {
            const name = declaration[i];
            declaration[i] = `${name}:${this.stringify(args[i], IdType.Type, {
                isParameter: true,
            })}`;
            parameters[i] = name;
        }
        if (thisType != null) {
            let type = "this:";
            if (isStatic)
                type += "NativeClassType<";
            type += this.stringify(thisType, IdType.Type, {
                isParameter: true,
            });
            if (isStatic)
                type += ">";
            declaration.unshift(type);
        }
        return {
            declaration,
            parameterNames: parameters,
        };
    }
    makeFuncParams_params(item) {
        return item.map(id => this.stringify(id, IdType.Value, { isParameter: true }));
    }
    makefuncParams_this(item) {
        if (this.isClassMethod(item, false)) {
            return this.stringify(item.parent, IdType.Value, {
                isParameter: true,
            });
        }
        else {
            return null;
        }
    }
    makefuncParams_return(item) {
        if (item.returnType === null) {
            throw Error(`${item}: function but no return type`);
        }
        return this.stringify(item.returnType, IdType.Value, {
            isParameter: true,
        });
    }
    makeFuncParams(item) {
        const returnType = this.makefuncParams_return(item);
        const params = this.makeFuncParams_params(item.functionParameters);
        const dll = this.imports.importName(imports.dll, "dll", IdType.Value);
        const thistype = this.makefuncParams_this(item);
        if (thistype !== null) {
            params.unshift(`{this:${thistype}}`);
        }
        else {
            if (params.length !== 0) {
                params.unshift("null");
            }
        }
        params.unshift(returnType);
        params.unshift(`${dll}.current.add(${item.address})`);
        return params.join(", ");
    }
    makeFunction(item) {
        const makefunc = this.imports.importName(imports.makefunc, "makefunc", IdType.Value);
        return `${makefunc}.js(${this.makeFuncParams(item)})`;
    }
    getArgNames(args, idType) {
        return args
            .map(id => {
            if (id instanceof Array) {
                return `[${id.map(id => this.stringify(id, idType)).join(", ")}]`;
            }
            return this.stringify(id, idType);
        })
            .join(", ");
    }
    stringify(item, idType, opts = {}) {
        try {
            if (recursiveCheck.has(item)) {
                throw Error(`recursive (${item})`);
            }
            recursiveCheck.add(item);
            if (item.parent === null) {
                throw Error(`stringify root`);
            }
            if (item.isLambda) {
                throw new IgnoreThis(`lambda (${item})`);
            }
            if (item.parent === symbolparser_1.PdbIdentifier.global && item.name.startsWith("`")) {
                throw new IgnoreThis(`private symbol (${item})`);
            }
            if (item.redirectedFrom !== null) {
                return this.stringify(item.redirectedFrom, idType, opts);
            }
            if (item.decoedFrom !== null) {
                if (item.deco === "const")
                    return this.stringify(item.decoedFrom, idType, opts);
                if (item.deco === "[0]")
                    throw new IgnoreThis(`incomprehensible syntax(${item})`);
            }
            if (item.unionedTypes !== null) {
                if (idType === IdType.Value)
                    throw Error(`Value union (${item})`);
                const names = [];
                for (const union of item.unionedTypes) {
                    let name = this.stringify(union, idType, opts);
                    if (union.isFunctionType)
                        name = "(" + name + ")";
                    names.push(name);
                }
                return names.join("|");
            }
            if (item.jsTypeName != null) {
                if (opts.isParameter) {
                    if (item === any_t)
                        return "unknown";
                }
                return this.imports.importName(item.host, item.jsTypeName, idType);
            }
            if (item.decoedFrom !== null) {
                if (item.deco === "*" || item.deco === "&" || item.deco === "&&") {
                    const str = this.stringify(item.decoedFrom, idType);
                    if (item.isValue) {
                        if (item.decoedFrom.address === 0) {
                            console.error(`${item.source}: address not found`);
                            throw new IgnoreThis(`address not found (${item})`);
                        }
                        if (idType === IdType.Type) {
                            return this.stringify(item.getTypeOfIt(), idType);
                        }
                        return str;
                    }
                    if (item.decoedFrom.isMemberPointer)
                        return str;
                    if (idType === IdType.Type) {
                        if (opts.isField || opts.isParameter) {
                            return str;
                        }
                        else {
                            const Wrapper = this.imports.importName(imports.pointer, "Wrapper", idType);
                            return `${Wrapper}<${str}>`;
                        }
                    }
                    else {
                        if (opts.isParameter) {
                            return str;
                        }
                        else if (opts.isField) {
                            return `${str}.ref()`;
                        }
                        else {
                            const Wrapper = this.imports.importName(imports.pointer, "Wrapper", idType);
                            return `${Wrapper}.make(${str}.ref())`;
                        }
                    }
                }
            }
            let out = "";
            if (item.templateBase !== null) {
                const nopts = Object.assign({}, opts);
                nopts.noTemplate = true;
                out = this.stringify(item.templateBase, idType, nopts);
            }
            else {
                if (item.isMemberPointer) {
                    const base = this.stringify(item.memberPointerBase, idType);
                    const type = this.stringify(item.returnType, idType);
                    const MemberPointer = this.imports.importName(imports.complextype, "MemberPointer", idType);
                    if (idType === IdType.Type) {
                        return `${MemberPointer}<${base}, ${type}>`;
                    }
                    else {
                        return `${MemberPointer}.make(${base}, ${type})`;
                    }
                }
                if (item.isFunctionType) {
                    if (idType === IdType.Type) {
                        const params = this.makeFuncDeclaration(item.functionParameters).declaration;
                        return `(${params.join(", ")})=>${this.stringify(item.returnType, idType, { isParameter: true })}`;
                    }
                    else {
                        const NativeFunctionType = this.imports.importName(imports.complextype, "NativeFunctionType", idType);
                        return `${NativeFunctionType}.make(${this.stringify(item.returnType, idType, { isParameter: true })}, null, ${item.functionParameters.map(id => this.stringify(id, idType, { isParameter: true }))})`;
                    }
                }
                let needDot = false;
                if (item.parent !== symbolparser_1.PdbIdentifier.global && item.parent !== this.currentNs) {
                    out += this.stringify(item.parent, idType, {
                        noTemplate: true,
                    });
                    needDot = true;
                    if (!isStatic &&
                        !item.isType &&
                        idType !== IdType.Type &&
                        item.parent.isClassLike &&
                        (item.isFunction || item.isFunctionBase || item.isTemplateFunctionBase)) {
                        out += ".prototype";
                    }
                }
                out += this.getNameOnly(item, idType, { needDot });
                if (item.isOverloaded) {
                    const OverloadedFunction = this.imports.importName(imports.complextype, "OverloadedFunction", idType);
                    out = `(${out} as ${OverloadedFunction}).get(${this.makefuncParams_this(item)}, [${this.makeFuncParams_params(item.functionParameters)}])`;
                }
            }
            if (opts.noTemplate) {
                return out;
            }
            const tinfo = this.getTemplateInfo(item);
            if (tinfo.parameters.length === 0) {
                return out;
            }
            if (idType === IdType.Type) {
                return `${out}<${this.getArgNames(tinfo.parameters, IdType.Type)}>`;
            }
            else {
                return `${out}.make(${this.getArgNames(tinfo.parameters, IdType.Value)})`;
            }
        }
        finally {
            recursiveCheck.delete(item);
        }
    }
    writeAll() {
        if (this.source.text === "") {
            this.isEmpty = true;
            return;
        }
        const importtext = this.imports.makeImportString();
        fs.writeFileSync(path.join(outpath, this.path + ".ts"), importtext + this.source.text);
        this.source.text = "";
    }
}
class TsFileImplement extends TsFile {
    _writeImplements(target, item) {
        if (item.address === 0) {
            console.error(`${item}: address not found`);
            throw new IgnoreThis(`address not found (${item})`);
        }
        if (item.returnType === null) {
            const targetName = this.getName(target, IdType.Value, {
                assignee: true,
            });
            if (!item.isVFTable && item.functionParameters.length !== 0)
                console.error(`${item}: function but no return type`);
            const dll = this.imports.importName(imports.dll, "dll", IdType.Value);
            this.source.writeln(`${targetName} = ${dll}.current.add(${item.address});`);
        }
        else if (item.isFunction) {
            const targetName = this.getName(target, IdType.Value, {
                assignee: true,
            });
            this.source.writeln(`${targetName} = ${this.makeFunction(item)};`);
        }
        else {
            if (target.parent === null) {
                throw Error(`${target}: has not parent`);
            }
            let parent = "";
            if (target.parent === symbolparser_1.PdbIdentifier.global) {
                parent = this.imports.importDirect(target, target.host);
            }
            else {
                parent = this.stringify(target.parent, IdType.Value);
            }
            const dll = this.imports.importName(imports.dll, "dll", IdType.Value);
            const NativeType = this.imports.importName(imports.nativetype, "NativeType", IdType.Value);
            const type = this.stringify(item.returnType, IdType.Value, {
                isField: true,
            });
            const key = this.getNameOnly(target, IdType.Value);
            this.source.writeln(`${NativeType}.definePointedProperty(${parent}, '${key}', ${dll}.current.add(${item.address}), ${type});`);
        }
    }
    writeAssign(field) {
        try {
            const target = field.base.removeTemplateParameters();
            this.source.writeln(`// ${field.base.source}`);
            const overloads = field.overloads;
            if (overloads == null || overloads.length === 0) {
                this._writeImplements(target, field.base);
            }
            else if (overloads.length === 1) {
                this._writeImplements(target, overloads[0]);
            }
            else {
                const OverloadedFunction = this.imports.importName(imports.complextype, "OverloadedFunction", IdType.Value);
                let lastSourceLine = 0;
                const lines = [`${OverloadedFunction}.make()`];
                for (const overload of overloads) {
                    lines.push(`// ${overload.source}`);
                    try {
                        lastSourceLine = lines.push(`.overload(${this.makeFuncParams(overload)})`) - 1;
                    }
                    catch (err) {
                        if (!(err instanceof IgnoreThis))
                            throw err;
                        lines.push(`// ignored: ${err.message}`);
                    }
                }
                lines[lastSourceLine] += ";";
                const targetName = this.getName(target, IdType.Value, {
                    assignee: true,
                });
                this.source.writeln(`${targetName} = ${lines.join("\n")}`);
            }
        }
        catch (err) {
            if (err instanceof IgnoreThis) {
                this.source.writeln(`// ignored: ${err.message}`);
                return;
            }
            throw err;
        }
    }
}
class IdField {
    constructor(base) {
        this.base = base;
        this.overloads = [];
    }
}
class IdFieldMap {
    constructor() {
        this.map = new Map();
    }
    append(list) {
        for (const item of list) {
            this.get(item.base).overloads.push(...item.overloads);
        }
        return this;
    }
    get(base) {
        let nametarget = base;
        if (base.functionBase !== null) {
            nametarget = base.functionBase;
        }
        if (base.templateBase !== null) {
            nametarget = base.templateBase;
        }
        let name = "";
        if (base.isConstructor) {
            name = "#constructor";
        }
        else if (base.isDestructor) {
            name = "#destructor";
        }
        else {
            name = nametarget.name;
        }
        let field = this.map.get(name);
        if (field != null)
            return field;
        field = new IdField(base);
        this.map.set(name, field);
        return field;
    }
    clear() {
        this.map.clear();
    }
    get size() {
        return this.map.size;
    }
    values() {
        return this.map.values();
    }
    [Symbol.iterator]() {
        return this.map.values();
    }
}
class FieldInfo {
    constructor() {
        this.inNamespace = new IdFieldMap();
        this.staticMember = new IdFieldMap();
        this.member = new IdFieldMap();
    }
    push(base, item) {
        this.set(base, item).overloads.push(item);
    }
    set(base, item = base) {
        if (base.templateBase !== null) {
            throw Error("base is template");
        }
        switch (getFieldType(item)) {
            case FieldType.Member:
                return this.member.get(base);
            case FieldType.Static:
                return this.staticMember.get(base);
            case FieldType.InNamespace:
                return this.inNamespace.get(base);
        }
    }
}
function retTrue() {
    return true;
}
class TsFileDeclaration extends TsFile {
    constructor(path, ...filters) {
        super(path);
        this.implements = [[retTrue, new TsFileImplement(path + "_impl")]];
        this.ids = getFiltered(filters);
        this.ids.sort();
        for (const id of this.ids) {
            if (id.host !== undefined)
                continue;
            id.host = this;
        }
        TsFileDeclaration.all.push(this);
    }
    addImplementFile(filter, path) {
        this.implements.push([filter, new TsFileImplement(path)]);
    }
    getImplementFile(item) {
        const arr = this.implements;
        for (let i = arr.length - 1; i >= 0; i--) {
            const [filter, file] = arr[i];
            if (filter(item))
                return file;
        }
        throw Error(`${this.path}: target not found (${item})`);
    }
    hasOverloads(item) {
        return item.isTemplateFunctionBase || (item.isFunctionBase && item.templateBase === null);
    }
    _writeRedirect(item) {
        try {
            const ori = item.redirectTo;
            if (ori === null) {
                console.error(`${item}: is not redirecting`);
                return;
            }
            const from = ori.redirectedFrom;
            ori.redirectedFrom = null;
            const typestr = this.stringify(ori, IdType.Type);
            const NativeClassType = this.imports.importName(imports.nativeclass, "NativeClassType", IdType.Type);
            this.source.writeln(`// ${ori.source}`);
            this.source.writeln(`${this.getDeclaration(item, null, "type")} = ${typestr};`);
            this.source.writeln(`${this.getDeclaration(item, `${NativeClassType}<${typestr}>&typeof ${this.stringify(ori.removeTemplateParameters(), IdType.Value)}`, "let")};`);
            const impl = this.getImplementFile(item);
            impl.source.writeln(`// ${ori.source}`);
            impl.source.writeln(`${impl.getName(item, IdType.Value, {
                assignee: true,
            })} = ${impl.stringify(ori, IdType.Value)};`);
            ori.redirectedFrom = from;
        }
        catch (err) {
            if (err instanceof IgnoreThis) {
                this.source.writeln(`ignored: ${err.message}`);
                return;
            }
            throw err;
        }
    }
    _writeOverloads(field) {
        try {
            const overloads = field.overloads;
            if (overloads.length === 0) {
                throw Error(`empty overloads`);
            }
            if (!insideOfClass && isStatic) {
                throw Error(`${overloads[0]}: is static but not in the class`);
            }
            let prefix = "";
            if (!insideOfClass)
                prefix = "export function ";
            else if (isStatic)
                prefix += "static ";
            const name = this.getNameOnly(field.base, IdType.Value);
            if (overloads.length === 1) {
                const item = overloads[0];
                if (item.returnType === null) {
                    if (item.functionParameters.length !== 0)
                        console.error(`${item}: no has the return type but has the arguments types`);
                    const StaticPointer = this.imports.importName(imports.core, "StaticPointer", IdType.Type);
                    this.source.writeln(`// ${item.source}`);
                    this.source.writeln(`${prefix}${item.removeParameters().name}:${StaticPointer};`);
                }
                else {
                    const abstract = this.imports.importName(imports.common, "abstract", IdType.Value);
                    const params = this.makeFuncDeclaration(item.functionParameters, item.parent.templateBase !== null ? item.parent : null).declaration;
                    this.source.writeln(`// ${item.source}`);
                    this.source.writeln(`${prefix}${name}(${params.join(", ")}):${this.stringify(item.returnType, IdType.Type, {
                        isParameter: true,
                    })} { ${abstract}(); }`);
                }
            }
            else {
                for (const over of overloads) {
                    try {
                        this.source.writeln(`// ${over.source}`);
                        const params = this.makeFuncDeclaration(over.functionParameters, over.parent.templateBase !== null ? over.parent : null).declaration;
                        this.source.writeln(`${prefix}${name}(${params.join(", ")}):${this.stringify(over.returnType, IdType.Type, { isParameter: true })};`);
                    }
                    catch (err) {
                        if (!(err instanceof IgnoreThis)) {
                            console.error(`> Writing ${over} (symbolIndex=${over.symbolIndex})`);
                            throw err;
                        }
                        this.source.writeln(`// ignored: ${err.message}`);
                    }
                }
                const abstract = this.imports.importName(imports.common, "abstract", IdType.Value);
                this.source.writeln(`${prefix}${name}(...args:any[]):any { ${abstract}(); }`);
            }
        }
        catch (err) {
            if (err instanceof IgnoreThis) {
                this.source.writeln(`// ignored: ${err.message}`);
                return;
            }
            throw err;
        }
    }
    _writeField(item) {
        try {
            this.source.writeln(`// ${item.source}`);
            if (item.returnType !== null) {
                const type = this.stringify(item.returnType, IdType.Type, {
                    isField: true,
                });
                this.source.writeln(`${this.getDeclaration(item, `${type}`, "let")};`);
            }
            else {
                const StaticPointer = this.imports.importName(imports.core, "StaticPointer", IdType.Type);
                this.source.writeln(`${this.getDeclaration(item, StaticPointer, "let")};`);
            }
            const impl = this.getImplementFile(item);
            impl.writeAssign(new IdField(item));
        }
        catch (err) {
            if (err instanceof IgnoreThis) {
                this.source.writeln(`// ignored: ${err.message}`);
                return;
            }
            throw err;
        }
    }
    _getField(out, item) {
        if (item.parent === null) {
            throw Error(`${item.name}: parent not found`);
        }
        if (!usingFilter(item))
            return;
        if (item.isDecoed)
            return;
        if (item.isFunctionType)
            return;
        if (item.isNameBase)
            return;
        if (item.templateBase !== null && !item.isTemplateFunctionBase && !item.isFunctionBase) {
            if (/^[A-Z]/.test(item.name) && item.address === 0) {
                // assume class if template
                item.setAsClass();
                item.templateBase.setAsClass();
            }
            return;
        }
        if (item.templateBase !== null && item.isFunctionBase) {
            return;
        }
        if (item.functionBase !== null)
            return;
        if (item.address !== 0) {
            // expect type from section
            const section = imagesections_1.imageSections.getSectionOfRva(item.address);
            if (section === null) {
                console.error(`${item.name}: Unknown section`);
            }
            else {
                switch (section.name) {
                    case ".reloc": // data?
                        break;
                    case ".pdata": // exception info
                        return;
                    case ".data": // user section?
                        return;
                    case ".rdata": // readonly
                        item.setAsFunction();
                        break;
                    default:
                        console.error(`${section.name}, ${item.name}: unspecified section`);
                        break;
                }
            }
        }
        if (this.hasOverloads(item)) {
            for (const o of item.allOverloads()) {
                if (!usingFilter(item))
                    continue;
                if (o.isTemplate && o.hasArrayParam())
                    continue;
                if (item.isTemplateFunctionBase) {
                    if (o.functionParameters.some(arg => arg.getArraySize() !== null))
                        continue;
                }
                if (!o.functionParameters.every(usingFilter)) {
                    continue;
                }
                if (!usingFilter(o.parent)) {
                    continue;
                }
                if (o.returnType !== null && !usingFilter(o.returnType)) {
                    continue;
                }
                out.push(item, o);
            }
        }
        else {
            out.set(item);
        }
    }
    getAllFields(item) {
        const out = new FieldInfo();
        if (item.specialized.length !== 0) {
            for (const specialized of item.specialized) {
                for (const child of specialized.children.values()) {
                    this._getField(out, child);
                }
            }
        }
        for (const child of item.children.values()) {
            this._getField(out, child);
        }
        return out;
    }
    _writeClass(item) {
        try {
            let opened = false;
            const info = this.getTemplateInfo(item);
            if (info.paramTypes.length !== 0) {
                const NativeTemplateClass = this.imports.importName(imports.complextype, "NativeTemplateClass", IdType.Value);
                this.source.writeln(`// ${item.source}`);
                const names = info.makeNames(this);
                const paramsText = `<${names.join(", ")}>`;
                const clsname = this.getNameOnly(item, IdType.Value);
                this.source.open(`export class ${clsname}${paramsText} extends ${NativeTemplateClass} {`, true);
                opened = true;
                try {
                    const args = this.makeFuncDeclaration(info.paramTypes);
                    const NativeClassType = this.imports.importName(imports.nativeclass, "NativeClassType", IdType.Value);
                    this.source.open(`static make(${args.declaration.join(", ")}):${NativeClassType}<${clsname}<${args.parameterNames
                        .map(() => "any")
                        .join(", ")}>>&typeof ${clsname} {`);
                    this.source.writeln(`return super.make(${args.parameterNames.join(", ")});`);
                    this.source.close("}");
                }
                catch (err) {
                    if (err instanceof IgnoreThis) {
                        this.source.writeln(`// ignored: ${err.message}`);
                    }
                    else {
                        throw err;
                    }
                }
            }
            else {
                if (item.isClassLike) {
                    const NativeClass = this.imports.importName(imports.nativeclass, "NativeClass", IdType.Value);
                    this.source.writeln(`// ${item.source}`);
                    this.source.open(`export class ${this.getNameOnly(item, IdType.Value)} extends ${NativeClass} {`, true);
                    opened = true;
                }
            }
            const fields = this.getAllFields(item);
            if (opened) {
                insideOfClass = true;
                for (const field of fields.staticMember) {
                    isStatic = true;
                    this.writeMembers(field);
                    isStatic = false;
                }
                for (const field of fields.member) {
                    this.writeMembers(field);
                }
                this.source.close(`}`);
                insideOfClass = false;
            }
            for (const _ of this.enterNamespace(item)) {
                if (!opened) {
                    for (const field of fields.member) {
                        try {
                            this.writeMembers(field);
                        }
                        catch (err) {
                            if (err instanceof IgnoreThis) {
                                this.source.writeln(`// ignored: ${err.message}`);
                            }
                            else {
                                console.error(`> Writing ${field.base} (symbolIndex=${field.base.symbolIndex})`);
                                throw err;
                            }
                        }
                    }
                }
                for (const field of fields.inNamespace) {
                    try {
                        this.writeMembers(field);
                    }
                    catch (err) {
                        if (err instanceof IgnoreThis) {
                            this.source.writeln(`// ignored: ${err.message}`);
                        }
                        else {
                            console.error(`> Writing ${field.base} (symbolIndex=${field.base.symbolIndex})`);
                            throw err;
                        }
                    }
                }
            }
        }
        catch (err) {
            if (err instanceof IgnoreThis) {
                this.source.writeln(`// ignored: ${err.message}`);
                return;
            }
            throw err;
        }
    }
    writeMembers(field) {
        const overloads = field.overloads;
        if (overloads.length !== 0) {
            // set default constructor
            if (insideOfClass) {
                for (const overload of overloads) {
                    if (overload.functionParameters.length === 0 && overload.functionBase.name === overload.parent.name) {
                        const NativeType = this.imports.importName(imports.nativetype, "NativeType", IdType.Value);
                        this.source.writeln(`[${NativeType}.ctor]():void{ return this.__constructor(); }`);
                        break;
                    }
                }
            }
            // write overloads
            try {
                this._writeOverloads(field);
                const impl = this.getImplementFile(field.base);
                impl.writeAssign(field);
            }
            catch (err) {
                if (err instanceof IgnoreThis) {
                    this.source.writeln(`// ignored: ${err.message}`);
                }
                else {
                    throw err;
                }
            }
        }
        else {
            const base = field.base;
            if (base.isFunction) {
                this._writeField(base);
            }
            else if (base.isClassLike) {
                if (!insideOfClass) {
                    this._writeClass(base);
                }
            }
            else if (base.isStatic) {
                this._writeField(base);
            }
            else if (base.isRedirectType) {
                this._writeRedirect(base);
            }
            else if (base.templateBase === null) {
                if (!insideOfClass) {
                    this._writeClass(base);
                }
            }
            // throw Error(`${base.source || base}: unexpected identifier`);
        }
    }
    writeAll() {
        try {
            const out = new FieldInfo();
            for (const item of this.ids) {
                this._getField(out, item);
            }
            if (out.staticMember.size !== 0) {
                const first = getFirstIterableItem(out.staticMember);
                throw Error(`global static member: ${first.base}`);
            }
            for (const field of out.inNamespace) {
                try {
                    this.writeMembers(field);
                }
                catch (err) {
                    if (err instanceof IgnoreThis) {
                        this.source.writeln(`// ignored: ${err.message}`);
                        continue;
                    }
                    console.error(`> Writing ${field.base} (symbolIndex=${field.base.symbolIndex})`);
                    throw err;
                }
            }
            for (const field of out.member) {
                try {
                    this.writeMembers(field);
                }
                catch (err) {
                    if (err instanceof IgnoreThis) {
                        this.source.writeln(`// ignored: ${err.message}`);
                        continue;
                    }
                    console.error(`> Writing ${field.base} (symbolIndex=${field.base.symbolIndex})`);
                    throw err;
                }
            }
            super.writeAll();
            for (const [filter, impl] of this.implements) {
                impl.writeAll();
            }
        }
        catch (err) {
            console.error(`> Writing ${this.path}`);
            throw err;
        }
    }
}
TsFileDeclaration.all = [];
const std = symbolparser_1.PdbIdentifier.std;
setBasicType("bool", "bool_t", "b", imports.nativetype);
setBasicType("void", "void_t", "v", imports.nativetype);
setBasicType("float", "float32_t", "f", imports.nativetype);
setBasicType("double", "float64_t", "d", imports.nativetype);
setBasicType("char", "int8_t", "c", imports.nativetype);
setBasicType("wchar_t", "uint16_t", "wc", imports.nativetype);
setBasicType("char signed", "int8_t", "sc", imports.nativetype);
setBasicType("char unsigned", "uint8_t", "uc", imports.nativetype);
setBasicType("short", "int16_t", "s", imports.nativetype);
setBasicType("short unsigned", "uint16_t", "us", imports.nativetype);
setBasicType("int", "int32_t", "i", imports.nativetype);
setBasicType("int unsigned", "uint32_t", "u", imports.nativetype);
setBasicType("long", "int32_t", "i", imports.nativetype);
setBasicType("long unsigned", "uint32_t", "u", imports.nativetype);
setBasicType("__int64", "bin64_t", "i", imports.nativetype);
setBasicType("__int64 unsigned", "bin64_t", "u", imports.nativetype);
setBasicType("void*", "VoidPointer", "p", imports.core);
setBasicType("void const*", "VoidPointer", "p", imports.core);
setBasicType("std::nullptr_t", "null", "v", null);
const typename_t = setBasicType("typename", "Type", "t", imports.nativetype);
const any_t = setBasicType("any", "any", "v", null);
const anys_t = setBasicType(any_t.decorate("[]"), "any[]", "args", null);
setBasicType(std.find("basic_string<char,std::char_traits<char>,std::allocator<char> >"), "CxxString", "str", imports.nativetype);
setBasicType(symbolparser_1.PdbIdentifier.global.make("..."), "NativeVarArgs", "...args", imports.complextype);
// std.make('string').redirect(std.find('basic_string<char,std::char_traits<char>,std::allocator<char> >'));
std.make("ostream").redirect(std.find("basic_ostream<char,std::char_traits<char> >"));
std.make("istream").redirect(std.find("basic_istream<char,std::char_traits<char> >"));
std.make("iostream").redirect(std.find("basic_iostream<char,std::char_traits<char> >"));
std.make("stringbuf").redirect(std.find("basic_stringbuf<char,std::char_traits<char>,std::allocator<char> >"));
std.make("istringstream").redirect(std.find("basic_istringstream<char,std::char_traits<char>,std::allocator<char> >"));
std.make("ostringstream").redirect(std.find("basic_ostringstream<char,std::char_traits<char>,std::allocator<char> >"));
std.make("stringstream").redirect(std.find("basic_stringstream<char,std::char_traits<char>,std::allocator<char> >"));
symbolparser_1.PdbIdentifier.global.make("RakNet").make("RakNetRandom").setAsClass();
// remove useless identities
symbolparser_1.PdbIdentifier.global.children.delete("..."); // variadic args
const ids = [];
for (const [key, value] of symbolparser_1.PdbIdentifier.global.children) {
    if (value.isBasicType) {
        // basic types
    }
    else if (key.startsWith("`")) {
        // private symbols
    }
    else if (value.isLambda) {
        // lambdas
    }
    else if (value.isConstant && /^\d+$/.test(key)) {
        // numbers
    }
    else if (key.startsWith("{")) {
        // code chunk?
    }
    else if (key.startsWith("__imp_")) {
        // import
    }
    else if (/^main\$dtor\$\d+$/.test(key)) {
        // dtor in main
    }
    else {
        ids.push(value);
    }
}
new TsFileDeclaration("./raknet", "RakNet");
const stdfile = new TsFileDeclaration("./std", "std", "strchr", "strcmp", "strcspn", "strerror_s", "strncmp", "strncpy", "strrchr", "strspn", "strstart", "strstr", "strtol", "strtoul", "wcsstr", "_stricmp", "tan", "tanh", "cos", "cosf", "cosh", "sin", "sinf", "sinh", "log", "log10", "log1p", "log2", "logf", "fabs", "asin", "asinf", "asinh", "atan2f", "powf", "fmod", "fmodf", "atan", "atan2", "atanf", "atanh", "fclose", "feof", "ferror", "fgets", "fflush", "fopen", "ftell", "fwrite", "terminate", "sscanf", "sprintf_s", "printf", "atexit", "snprintf", "sprintf", "memcpy", "memmove", "operator delete[]", "operator new[]", "free", "malloc", "_aligned_malloc", "delete", "delete[]", "delete[](void * __ptr64)", "delete[](void * __ptr64,unsigned __int64)");
stdfile.addImplementFile(item => item.checkBase(symbolparser_1.PdbIdentifier.std, "vector"), "./std_vector_impl");
stdfile.addImplementFile(item => item.checkBase(symbolparser_1.PdbIdentifier.std, "unique_ptr") || item.checkBase(symbolparser_1.PdbIdentifier.std, "make_unique"), "./std_unique_ptr_impl");
stdfile.addImplementFile(item => item.checkBase(symbolparser_1.PdbIdentifier.std, "shared_ptr"), "./std_shared_ptr_impl");
stdfile.addImplementFile(item => item.checkBase(symbolparser_1.PdbIdentifier.std, "allocator"), "./std_allocator_impl");
stdfile.addImplementFile(item => item.checkBase(symbolparser_1.PdbIdentifier.std, "function"), "./std_function_impl");
stdfile.addImplementFile(item => item.checkBase(symbolparser_1.PdbIdentifier.std, "list"), "./std_list_impl");
new TsFileDeclaration("./socket", "sockaddr_in", "sockaddr_in6", "");
new TsFileDeclaration("./zlib", "comp_zlib_cleanup_int", "compressBound", /^unz/, /^zip/, /^zc/, /^zlib_/, "z_errmsg", /^deflate/, /^_tr_/);
new TsFileDeclaration("./quickjs", /^js_/, /^JS_/, /^lre_/, /^string_/, /^dbuf_/);
new TsFileDeclaration("./openssl", "err_free_strings_int", /^EVP_/, /^OPENSSL_/, /^OSSL_/, /^RSA_/, /^SEED_/, /^SHA1/, /^SHA224/, /^SHA256/, /^SHA384/, /^SHA3/, /^SHA512/, /^X509/, /^X509V3/, /^X448/, /^X25519/, /^XXH64/, /^curve448_/, /^openssl_/, /^rand_/, /^d2i_/, /^ec_/, /^i2a_/, /^hmac_/, /^i2c_/, /^i2d_/, /^i2o_/, /^i2s_/, /^i2t_/, /^i2v_/, /^o2i_/, /^v3_/, /^v2i_/, /^x448_/, /^x509_/, /^ecdh_/, /^dsa_/, /_meth$/, /^CMS_/, /^CRYPTO_/, /^AES_/, /^ASN1_/, /^sha512_/, /^sm2_/, /^sm3_/, /^rsa_/, /^ripemd160_/, /^ossl_/, /^md5_/, /^int_rsa_/, /^gf_/, /^evp_/, /^cr_/, /^cms_/, /^c448_/, /^c2i_/, /^bn_/, /^asn1_/, /^aria_/, /^a2i_/, /^a2d_/, /^ERR_/, /^EC_/, /^BN_/, /^BIO_/);
new TsFileDeclaration("./rapidjson", "rapidjson");
new TsFileDeclaration("./gsl", "gsl");
new TsFileDeclaration("./glm", "glm");
new TsFileDeclaration("./gltf", "glTF");
new TsFileDeclaration("./leveldb", "leveldb");
new TsFileDeclaration("./entt", "entt");
new TsFileDeclaration("./json", "Json", /^Json/);
new TsFileDeclaration("./chakra", /^Js[A-Z]/);
new TsFileDeclaration("./minecraft_bedrock", "Bedrock");
new TsFileDeclaration("./minecraft_scripting", "Scripting");
new TsFileDeclaration("./minecraft_crypto", "Crypto");
new TsFileDeclaration("./minecraft_core", "Core");
new TsFileDeclaration("./minecraft_goal", /Goal$/);
new TsFileDeclaration("./minecraft_events", /Event$/);
new TsFileDeclaration("./minecraft_handlers", /Handler$/);
new TsFileDeclaration("./minecraft_triggers", /Trigger$/);
new TsFileDeclaration("./minecraft_attributes", /Attributes$/);
new TsFileDeclaration("./minecraft_components", /Component$/);
new TsFileDeclaration("./minecraft_packets", /Packet$/, "make_packet");
new TsFileDeclaration("./minecraft_defs", /^Definition/, /Definition$/);
new TsFileDeclaration("./minecraft_tests", /Test$/);
new TsFileDeclaration("./minecraft_items", item => item.children.has("buildDescriptionId") ||
    item.children.has("getSilkTouchItemInstance") ||
    item.children.has("asItemInstance") ||
    item.children.has("getResourceItem") ||
    item.children.has("getPlacementBlock") ||
    item.children.has("isGlint") ||
    item.children.has("onPlace"));
new TsFileDeclaration("./minecraft_actors", item => item.children.has("aiStep") ||
    item.children.has("checkSpawnRules") ||
    item.children.has("reloadHardcoded") ||
    item.children.has("reloadHardcodedClient") ||
    item.children.has("useNewAi"));
new TsFileDeclaration("./minecraft", () => true);
for (const file of TsFileDeclaration.all) {
    file.writeAll();
}
console.log(`global id count: ${symbolparser_1.PdbIdentifier.global.children.size}`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ltYm9sd3JpdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3ltYm9sd3JpdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3Qiw4REFBMkQ7QUFDM0QsbURBQWdEO0FBQ2hELGlEQUErQztBQUUvQyxNQUFNLGdCQUFnQixHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO0FBQ25ELGdCQUFnQixDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO0FBQ3JGLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO0FBQ3JGLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0FBQ2pFLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDcEMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUMxQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzlDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDcEMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN0QyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzVDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDeEMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUMxQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQy9DLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxXQUFXLEVB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