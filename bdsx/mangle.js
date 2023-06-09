"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mangle = void 0;
const REF = /^[0-9]$/;
function attach(code, name) {
    return code + (typeof name === "string" ? name : name.symbol);
}
exports.mangle = {
    char: "D",
    unsignedChar: "E",
    short: "F",
    unsignedShort: "G",
    int: "H",
    unsignedInt: "I",
    long: "J",
    unsignedLong: "K",
    double: "N",
    float: "M",
    longlong: "_J",
    unsignedLongLong: "_K",
    bool: "_N",
    unsignedInt128: "_M",
    void: "X",
    constChar: "$$CBD",
    constCharPointer: "PEBD",
    update(target, opts) {
        if (opts != null) {
            target.symbol = opts.symbol != null ? opts.symbol : opts.structSymbol ? exports.mangle.struct(target.name) : exports.mangle.clazz(target.name);
        }
        else {
            target.symbol = exports.mangle.clazz(target.name);
        }
    },
    pointer(name) {
        return attach("PEA", name);
    },
    constPointer(name) {
        return attach("PEB", name);
    },
    ref(name) {
        return attach("AEA", name);
    },
    constRef(name) {
        return attach("AEB", name);
    },
    ns(names) {
        if (typeof names === "string")
            return names + "@@";
        let out = "";
        let nameidx = names.length;
        while (nameidx !== 0) {
            const name = names[--nameidx];
            if (REF.test(name)) {
                out += name;
            }
            else if (name.endsWith("@")) {
                out += name;
            }
            else {
                out += name;
                out += "@";
            }
        }
        out += "@";
        return out;
    },
    clazz(...name) {
        return "V" + exports.mangle.ns(name);
    },
    struct(...name) {
        return "U" + exports.mangle.ns(name);
    },
    number(n) {
        if (n !== 0 && n <= 10 && n >= -10) {
            if (n > 0) {
                return `$0` + n;
            }
            else {
                return `$0?` + n;
            }
        }
        else {
            const out = [0x24, 0x30];
            if (n < 0) {
                out.push(0x3f);
                n = -n;
            }
            do {
                out.push((n & 0xf) + 0x41);
                n >>>= 4;
            } while (n !== 0);
            out.push(0x40);
            return String.fromCharCode(...out);
        }
    },
    parameters(params) {
        if (params.length === 0) {
            return "X";
        }
        else {
            let out = "";
            for (const param of params) {
                out += typeof param === "string" ? param : param.symbol;
            }
            out += "@";
            return out;
        }
    },
    funcptr(returnType, params) {
        if (typeof returnType !== "string")
            returnType = returnType.symbol;
        let out = "P6A";
        out += returnType;
        out += exports.mangle.parameters(params);
        out += "Z";
        return out;
    },
    func(code, name, returnType, params) {
        if (typeof returnType !== "string")
            returnType = returnType.symbol;
        let out = "?";
        out += exports.mangle.ns(name);
        out += code;
        out += returnType;
        out += exports.mangle.parameters(params);
        out += "Z";
        return out;
    },
    globalFunc(name, returnType, params) {
        return exports.mangle.func("YA", name, returnType, params);
    },
    privateConstFunc(name, returnType, params) {
        return exports.mangle.func("AEBA", name, returnType, params);
    },
    template(name, params) {
        let out = "?$";
        out += name;
        out += "@";
        for (const param of params) {
            switch (typeof param) {
                case "string":
                    out += param;
                    break;
                case "number":
                    out += exports.mangle.number(param);
                    break;
                default:
                    out += param.symbol;
                    break;
            }
        }
        out += "@";
        return out;
    },
    templateClass(name, ...params) {
        if (typeof name === "string") {
            return "V" + exports.mangle.template(name, params) + "@";
        }
        else {
            const last = name.pop();
            return "V" + exports.mangle.template(last, params) + exports.mangle.ns(name);
        }
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFuZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQztBQUV0QixTQUFTLE1BQU0sQ0FBQyxJQUFZLEVBQUUsSUFBaUM7SUFDM0QsT0FBTyxJQUFJLEdBQUcsQ0FBQyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2xFLENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBRztJQUNsQixJQUFJLEVBQUUsR0FBRztJQUNULFlBQVksRUFBRSxHQUFHO0lBQ2pCLEtBQUssRUFBRSxHQUFHO0lBQ1YsYUFBYSxFQUFFLEdBQUc7SUFDbEIsR0FBRyxFQUFFLEdBQUc7SUFDUixXQUFXLEVBQUUsR0FBRztJQUNoQixJQUFJLEVBQUUsR0FBRztJQUNULFlBQVksRUFBRSxHQUFHO0lBQ2pCLE1BQU0sRUFBRSxHQUFHO0lBQ1gsS0FBSyxFQUFFLEdBQUc7SUFDVixRQUFRLEVBQUUsSUFBSTtJQUNkLGdCQUFnQixFQUFFLElBQUk7SUFDdEIsSUFBSSxFQUFFLElBQUk7SUFDVixjQUFjLEVBQUUsSUFBSTtJQUNwQixJQUFJLEVBQUUsR0FBRztJQUNULFNBQVMsRUFBRSxPQUFPO0lBQ2xCLGdCQUFnQixFQUFFLE1BQU07SUFFeEIsTUFBTSxDQUFDLE1BQTBCLEVBQUUsSUFBMkI7UUFDMUQsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO1lBQ2QsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsY0FBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGNB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