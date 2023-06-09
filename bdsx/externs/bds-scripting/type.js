"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocType = exports.DocMethod = exports.DocField = void 0;
const styling_1 = require("./styling");
const READONLY = /^READ ONLY. /;
const WILL_BE = / Will be: (.+)\.$/;
const CAN_BE = / Can be: (.+)\.$/;
const typeRemap = new Map();
typeRemap.set("String", { type: "string" });
typeRemap.set("Positive Integer", { type: "number", comment: true });
typeRemap.set("Integer", { type: "number", comment: true });
typeRemap.set("JavaScript Object", { type: "any", comment: true });
typeRemap.set("Boolean", { type: "boolean" });
typeRemap.set("Decimal", { type: "number" });
typeRemap.set("JSON Object", { type: "any" });
typeRemap.set("Range [a, b]", { type: "[number, number]" });
typeRemap.set("Minecraft Filter", { type: "MinecraftFilter" });
typeRemap.set("Vector [a, b, c]", { type: "VectorArray" });
typeRemap.set("List", { type: "any[]" });
function stripRegExp(str, regexp, onmatch) {
    const res = regexp.exec(str);
    if (res === null)
        return str;
    str = str.substr(0, res.index) + str.substr(res.index + res[0].length);
    onmatch(res);
    return str;
}
class DocField {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
    static fromRow(row) {
        var _a, _b, _c, _d, _e, _f;
        const name = ((_a = row.Name) === null || _a === void 0 ? void 0 : _a.text) || "";
        let type = ((_b = row.Type) === null || _b === void 0 ? void 0 : _b.text) || "";
        let desc = ((_c = row.Description) === null || _c === void 0 ? void 0 : _c.text) || ((_d = row.Value) === null || _d === void 0 ? void 0 : _d.text) || "";
        let readonly = false;
        const defval = ((_e = row.DefaultValue) === null || _e === void 0 ? void 0 : _e.text) || "";
        desc = stripRegExp(desc, READONLY, () => {
            readonly = true;
        });
        desc = stripRegExp(desc, WILL_BE, matched => {
            type = matched[1];
        });
        desc = stripRegExp(desc, CAN_BE, matched => {
            type = matched[1].split(" or ").join("|");
        });
        const inner = (_f = row.Description) === null || _f === void 0 ? void 0 : _f.table;
        let ntype;
        if (inner) {
            ntype = DocType.fromTable(inner);
            if (type === "List")
                ntype.arrayWrapped = true;
        }
        else {
            ntype = new DocType();
            const remapped = typeRemap.get(type);
            if (remapped) {
                if (remapped.comment)
                    desc = `${type}.\n${desc}`;
                ntype.inlineTypeName = remapped.type;
            }
            else {
                const iname = styling_1.styling.apiObjectNameToInterfaceName(type);
                if (iname !== null) {
                    ntype.inlineTypeName = iname;
                }
                else {
                    ntype.inlineTypeName = type;
                }
            }
            if (type === "JavaScript Object") {
                if (name.endsWith("_position")) {
                    ntype.inlineTypeName = "VectorXYZ";
                }
                else
                    switch (name) {
                        case "ticking_area":
                            ntype.inlineTypeName = "ITickingArea";
                            break;
                    }
            }
        }
        if (defval) {
            desc += `\n@default ${defval}`;
            ntype.optional = true;
        }
        const field = new DocField(name, ntype);
        ntype.readonly = readonly;
        ntype.desc = desc;
        return field;
    }
}
exports.DocField = DocField;
const PARAM = /^param(\d+):(.+)$/;
class DocMethod {
    constructor(name) {
        this.name = name;
        this.params = [];
        this.return = null;
        this.deleted = false;
        this.desc = "";
    }
    static fromDocFix(name, docfix) {
        const method = new DocMethod(name);
        if (docfix === null) {
            method.deleted = true;
        }
        else {
            method.desc = docfix.desc || "";
            for (const param in docfix) {
                const reg = PARAM.exec(param);
                if (reg === null)
                    continue;
                const fieldfix = DocType.fromDocFix(docfix[param]);
                method.params[+reg[1]] = new DocField(reg[2], fieldfix);
            }
            for (let i = 0; i < method.params.length; i++) {
                if (!method.params[i]) {
                    console.error(`${method.name}: ${i + 1} parameter is not provided`);
                    method.params.length = i;
                    break;
                }
            }
            if (docfix.return != null) {
                method.return = DocType.fromDocFix(docfix.return);
            }
        }
        return method;
    }
    setCamel() {
        for (const param of this.params) {
            param.name = styling_1.styling.toCamelStyle(param.name, " ");
        }
    }
    getField(name) {
        for (const field of this.params) {
            if (!field)
                continue;
            if (field.name === name)
                return field;
        }
        return null;
    }
    patch(docfix) {
        for (const param of this.params) {
            if (!param)
                continue;
            const paramFix = docfix.getField(param.name);
            if (paramFix === null)
                continue;
            const fixtype = paramFix.type;
            const type = paramFix.type;
            if (fixtype.inlineTypeName)
                type.inlineTypeName = fixtype.inlineTypeName;
            if (fixtype.optional)
                type.optional = true;
        }
        if (docfix.return !== null) {
            if (this.return === null)
                this.return = docfix.return;
            else
                this.return.patch(docfix.return);
        }
        if (docfix.deleted)
            this.deleted = true;
        if (docfix.desc)
            this.desc = docfix.desc;
        return this;
    }
}
exports.DocMethod = DocMethod;
class DocType {
    constructor() {
        this.fields = [];
        this.methods = [];
        this.inlineTypeName = "";
        this.desc = "";
        this.optional = false;
        this.readonly = false;
        this.arrayWrapped = false;
        this.wrapToArray = "";
        this.deleted = false;
    }
    static inline(name) {
        const type = new DocType();
        type.inlineTypeName = name;
        return type;
    }
    static fromTable(table) {
        const out = new DocType();
        for (const row of table) {
            out.fields.push(DocField.fromRow(row));
        }
        return out;
    }
    static fromDocFix(docfix) {
        const out = new DocType();
        if (docfix === null) {
            out.deleted = true;
        }
        else if (typeof docfix === "string") {
            out.inlineTypeName = docfix;
            out.optional = undefined;
            out.readonly = undefined;
        }
        else {
            out.desc = docfix.desc || "";
            out.inlineTypeName = docfix.type || "";
            out.optional = docfix.optional;
            out.readonly = docfix.readonly;
            switch (typeof docfix.wrapToArray) {
                case "string":
                    out.wrapToArray = docfix.wrapToArray;
                    break;
                case "boolean":
                    out.arrayWrapped = docfix.wrapToArray;
                    break;
            }
            for (const [key, item] of Object.entries(docfix)) {
                if (key.startsWith("field:")) {
                    const type = DocType.fromDocFix(item);
                    out.fields.push(new DocField(key.substr(6), type));
                }
                else if (key.startsWith("method:")) {
                    const method = DocMethod.fromDocFix(key.substr(7), item);
                    out.methods.push(method);
                }
            }
        }
        return out;
    }
    isVectorXYZ() {
        if (this.methods.length !== 0)
            return false;
        if (this.fields.length !== 3)
            return false;
        const obj = new Set(["x", "y", "z"]);
        for (let i = 0; i < this.fields.length; i++) {
            const field = this.fields[i];
            if (field.type.inlineTypeName !== "number")
                return false;
            if (!obj.delete(field.name))
                return false;
        }
        console.assert(obj.size === 0);
        return true;
    }
    getFieldType(name) {
        for (const field of this.fields) {
            if (field.name === name)
                return field.type;
        }
        return null;
    }
    getMethod(name) {
        for (const method of this.methods) {
            if (method.name === name)
                return method;
        }
        return null;
    }
    patch(docfix) {
        for (const fieldFix of docfix.fields) {
            const type = this.getFieldType(fieldFix.name);
            if (type === null) {
                this.fields.push(fieldFix);
                this.inlineTypeName = "";
            }
            else {
                type.patch(fieldFix.type);
            }
        }
        for (const methodFix of docfix.methods) {
            const method = this.getMethod(methodFix.name);
            if (method === null) {
                this.methods.push(methodFix);
                this.inlineTypeName = "";
            }
            else {
                method.patch(methodFix);
            }
        }
        if (docfix.deleted)
            this.deleted = true;
        if (docfix.desc)
            this.desc = docfix.desc;
        if (docfix.inlineTypeName) {
            this.inlineTypeName = docfix.inlineTypeName;
            this.fields.length = 0;
            this.methods.length = 0;
        }
        if (docfix.optional != null)
            this.optional = docfix.optional;
        if (docfix.readonly != null)
            this.readonly = docfix.readonly;
        if (docfix.wrapToArray) {
            const inner = new DocType();
            inner.set(this);
            inner.arrayWrapped = true;
            this.fields.push(new DocField(docfix.wrapToArray, inner));
        }
        if (docfix.arrayWrapped) {
            this.arrayWrapped = true;
        }
        return this;
    }
    set(other) {
        this.fields.push(...other.fields);
        this.methods.push(...other.methods);
        this.inlineTypeName = other.inlineTypeName;
        this.desc = other.desc;
        this.optional = other.optional;
        this.readonly = other.readonly;
        this.arrayWrapped = other.arrayWrapped;
        this.deleted = other.deleted;
    }
    clear() {
        this.fields.length = 0;
        this.methods.length = 0;
        this.inlineTypeName = "";
        this.desc = "";
        this.optional = false;
        this.readonly = false;
        this.arrayWrapped = false;
        this.deleted = false;
        this.wrapToArray = "";
    }
    async writeTo(name, writer) {
        if (this.deleted)
            return;
        const tab = "";
        if (this.desc) {
            await writer.write(`${tab}/**\n`);
            await writer.write(`${tab} * ${this.desc.replace(/\n/g, `\n${tab} * `)}\n`);
            await writer.write(`${tab} */\n`);
        }
        if (this.inlineTypeName !== "") {
            await writer.write(`type ${name} = ${this.inlineTypeName};\n\n`);
            return;
        }
        const tabi = "    ";
        if (this.arrayWrapped)
            await writer.write(`type ${name} = {`);
        else
            await writer.write(`interface ${name} {\n`);
        for (const field of this.fields) {
            if (field.type.deleted)
                continue;
            if (field.type.desc) {
                await writer.write(`${tabi}/**\n`);
                await writer.write(`${tabi} * ${field.type.desc.replace(/\n/g, `\n${tabi} * `)}\n`);
                await writer.write(`${tabi} */\n`);
            }
            await writer.write(`${tabi}${field.type.stringify(tabi, field.name, {
                ignoreOptional: true,
            })};\n`);
        }
        for (const method of this.methods) {
            if (method.deleted)
                continue;
            await writer.write(`${tabi}/**\n`);
            if (method.desc)
                await writer.write(`${tabi} * ${method.desc}\n`);
            for (const param of method.params) {
                if (param.type.desc) {
                    await writer.write(`${tabi} * @param ${param.name} ${param.type.desc.replace(/\n/g, `\n${tabi} *    `)}\n`);
                }
            }
            if (method.return !== null) {
                if (method.return.desc) {
                    await writer.write(`${tabi} * @return ${method.return.desc.replace(/\n/g, `\n${tabi} *    `)}\n`);
                }
            }
            await writer.write(`${tabi} */\n`);
            const arr = [];
            for (const param of method.params) {
                if (param.type.deleted)
                    continue;
                arr.push(`${param.type.stringify(tabi, param.name, {
                    ignoreReadonly: true,
                })}`);
            }
            await writer.write(`${tabi}${method.name}(${arr.join(", ")}):${method.return === null ? "void" : method.return.stringify(tabi, "")};\n`);
        }
        if (this.arrayWrapped)
            await writer.write(`}[]\n`);
        else
            await writer.write(`}\n\n`);
    }
    stringify(tab, name, opts = {}) {
        if (this.arrayWrapped)
            opts.ignoreOptional = false;
        if (name !== "") {
            name = styling_1.styling.toFieldName(name);
            if (!opts.ignoreReadonly && this.readonly)
                name = `readonly ${name}`;
            if (!opts.ignoreOptional && this.optional)
                name += "?";
            name += ":";
        }
        let out = name;
        if (this.isVectorXYZ()) {
            out += "VectorXYZ";
        }
        else {
            const tabi = `${tab}    `;
            if (this.inlineTypeName) {
                out += this.inlineTypeName.replace(/\n/g, `\n${tabi}`);
            }
            else {
                out += "{\n";
                for (const field of this.fields) {
                    if (field.type.desc) {
                        out += `${tabi}/**\n`;
                        out += `${tabi} * ${field.type.desc.replace(/\n/g, `\n${tabi} * `)}\n`;
                        out += `${tabi} */\n`;
                    }
                    out += `${tabi}${field.type.stringify(tabi, field.name, opts)},\n`;
                }
                out = out.substr(0, out.length - 2);
                out += `\n${tab}}`;
            }
        }
        if (this.arrayWrapped)
            out += "[]";
        return out;
    }
    static async writeTableKeyUnion(name, prefix, rows, key, value, writer) {
        await writer.write(`interface ${name}Map {\n`);
        const tabi = "    ";
        for (const row of rows) {
            const id = row[key].text;
            if (!id.startsWith(prefix)) {
                console.error(`   └ ${id}: Prefix is not ${prefix}`);
                continue;
            }
            const v = value(id);
            if (v === null)
                continue;
            await writer.write(`${tabi}${JSON.stringify(v)}:void;\n`);
        }
        await writer.write(`}\n`);
        await writer.write(`type ${name} = keyof ${name}Map;\n\n`);
    }
}
exports.DocType = DocType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQW9DO0FBR3BDLE1BQU0sUUFBUSxHQUFHLGNBQWMsQ0FBQztBQUNoQyxNQUFNLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztBQUNwQyxNQUFNLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQztBQUVsQyxNQUFNLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFNdEIsQ0FBQztBQUNKLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFDNUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDckUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzVELFNBQVMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ25FLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7QUFDOUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUM3QyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQzlDLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLENBQUMsQ0FBQztBQUM1RCxTQUFTLENBQUMsR0FBRyxD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