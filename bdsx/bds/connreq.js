"use strict";
var JsonValue_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionRequest = exports.Certificate = exports.JsonValue = exports.JsonValueType = void 0;
const tslib_1 = require("tslib");
const commandparam_1 = require("../commandparam");
const common_1 = require("../common");
const cxxvector_1 = require("../cxxvector");
const makefunc_1 = require("../makefunc");
const mce_1 = require("../mce");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const symbols_1 = require("./symbols");
var JsonValueType;
(function (JsonValueType) {
    JsonValueType[JsonValueType["Null"] = 0] = "Null";
    JsonValueType[JsonValueType["Int32"] = 1] = "Int32";
    JsonValueType[JsonValueType["Int64"] = 2] = "Int64";
    JsonValueType[JsonValueType["Float64"] = 3] = "Float64";
    JsonValueType[JsonValueType["String"] = 4] = "String";
    JsonValueType[JsonValueType["Boolean"] = 5] = "Boolean";
    JsonValueType[JsonValueType["Array"] = 6] = "Array";
    JsonValueType[JsonValueType["Object"] = 7] = "Object";
})(JsonValueType = exports.JsonValueType || (exports.JsonValueType = {}));
let JsonValue = JsonValue_1 = class JsonValue extends nativeclass_1.NativeClass {
    [(commandparam_1.CommandParameterType.symbol, nativetype_1.NativeType.ctor)]() {
        this.type = JsonValueType.Null;
    }
    [nativetype_1.NativeType.dtor]() {
        (0, common_1.abstract)();
    }
    static constructWith(value) {
        const json = new JsonValue_1(true);
        json.constructWith(value);
        return json;
    }
    constructWith(value) {
        switch (typeof value) {
            case "boolean":
                this.type = JsonValueType.Boolean;
                this.setBoolean(value);
                break;
            case "number":
                if ((value | 0) === value) {
                    this.type = JsonValueType.Int32;
                    this.setInt32(value);
                }
                else {
                    this.type = JsonValueType.Float64;
                    this.setFloat64(value);
                }
                break;
            case "object":
                if (value === null) {
                    this.type = JsonValueType.Null;
                }
                else {
                    Json$Value$CtorWithType(this, JsonValueType.Object);
                    for (const [key, kv] of Object.entries(value)) {
                        const child = Json$Value$ResolveReference(this, key, false);
                        child.setValue(kv);
                    }
                }
                break;
            case "string":
                Json$Value$CtorWithString(this, value);
                break;
            default:
                throw TypeError(`unexpected json type: ${typeof value}`);
        }
    }
    size() {
        (0, common_1.abstract)();
    }
    isMember(name) {
        (0, common_1.abstract)();
    }
    getByInt(key) {
        return Json$Value$GetByInt(this, key);
    }
    getByString(key) {
        return Json$Value$GetByString(this, key);
    }
    get(key) {
        if (typeof key === "number") {
            if ((key | 0) === key) {
                return Json$Value$GetByInt(this, key);
            }
            key = key + "";
        }
        return Json$Value$GetByString(this, key);
    }
    getMemberNames() {
        const members = Json$Value$GetMemberNames.call(this);
        const array = members.toArray();
        members.destruct();
        return array;
    }
    setValue(value) {
        this.destruct();
        this.constructWith(value);
    }
    proxy() {
        switch (this.type) {
            case JsonValueType.Array: {
                const self = this;
                const base = {};
                return new Proxy(base, {
                    get(target, prop) {
                        if (typeof prop === "symbol" || !/^\d+$/.test(prop)) {
                            return base[prop];
                        }
                        else {
                            const idx = +prop | 0;
                            if (idx < 0 || idx >= self.size())
                                return undefined;
                            let v = base[idx];
                            if (!(v instanceof JsonValue_1)) {
                                v = self.getByInt(+prop | 0);
                                base[prop] = v;
                            }
                            return v.proxy();
                        }
                    },
                    set(base, prop, value) {
                        if (typeof prop === "symbol" || !/^\d+$/.test(prop)) {
                            base[prop] = value;
                        }
                        else {
                            let v = base[prop];
                            if (!(v instanceof JsonValue_1)) {
                                v = self.getByInt(+prop | 0);
                                base[prop] = v;
                            }
                            v.setValue(value);
                        }
                        return true;
                    },
                });
            }
            case JsonValueType.Object: {
                const self = this;
                const base = {};
                return new Proxy(base, {
                    get(base, prop) {
                        if (typeof prop === "symbol") {
                            return base[prop];
                        }
                        else {
                            if (!self.isMember(prop))
                                return undefined;
                            let v = base[prop];
                            if (!(v instanceof JsonValue_1)) {
                                v = self.getByString(prop);
                                base[prop] = v;
                            }
                            return v.proxy();
                        }
                    },
                    set(base, prop, value) {
                        if (typeof prop === "symbol") {
                            base[prop] = value;
                        }
                        else {
                            let v = base[prop];
                            if (!(v instanceof JsonValue_1)) {
                                v = self.getByString(prop);
                                base[prop] = v;
                            }
                            v.setValue(value);
                        }
                        return true;
                    },
                });
            }
            default:
                return this.value();
        }
    }
    value() {
        const type = this.type;
        switch (type) {
            case JsonValueType.Null:
                return null;
            case JsonValueType.Int32:
                return this.getInt32();
            case JsonValueType.Int64:
                return this.getInt64AsFloat();
            case JsonValueType.Float64:
                return this.getFloat64();
            case JsonValueType.String: {
                const ptr = this.getNullablePointer();
                return ptr === null ? "" : ptr.getString();
            }
            case JsonValueType.Boolean:
                return this.getBoolean();
            case JsonValueType.Array: {
                const out = [];
                const n = this.size();
                for (let i = 0; i < n; i++) {
                    out[i] = this.get(i).value();
                }
                return out;
            }
            case JsonValueType.Object: {
                const out = {};
                for (const key of this.getMemberNames()) {
                    out[key] = this.get(key).value();
                }
                return out;
            }
            default:
                throw Error(`unexpected type: ${type}`);
        }
    }
    toString() {
        return this.value() + "";
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t, 8)
], JsonValue.prototype, "type", void 0);
JsonValue = JsonValue_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)({ size: 0x10, align: 0x8, symbol: "VValue@Json@@" })
], JsonValue);
exports.JsonValue = JsonValue;
const Json$Value$CtorWithType = makefunc_1.makefunc.js(symbols_1.proc["??0Value@Json@@QEAA@W4ValueType@1@@Z"], JsonValue, null, JsonValue, nativetype_1.int32_t);
const Json$Value$CtorWithString = makefunc_1.makefunc.js(symbols_1.proc["??0Value@Json@@QEAA@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z"], JsonValue, null, JsonValue, nativetype_1.CxxString);
const Json$Value$GetByInt = makefunc_1.makefunc.js(symbols_1.proc["??AValue@Json@@QEAAAEAV01@H@Z"], JsonValue, null, JsonValue, nativetype_1.int32_t);
const Json$Value$GetByString = makefunc_1.makefunc.js(symbols_1.proc["??AValue@Json@@QEAAAEAV01@PEBD@Z"], JsonValue, null, JsonValue, makefunc_1.makefunc.Utf8);
const Json$Value$GetMemberNames = makefunc_1.makefunc.js(symbols_1.proc["?getMemberNames@Value@Json@@QEBA?AV?$vector@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$allocator@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@2@@std@@XZ"], cxxvector_1.CxxVector.make(nativetype_1.CxxString), { this: JsonValue, structureReturn: true });
const Json$Value$ResolveReference = makefunc_1.makefunc.js(symbols_1.proc["?resolveReference@Value@Json@@AEAAAEAV12@PEBD_N@Z"], JsonValue, null, JsonValue, makefunc_1.makefunc.Utf8, nativetype_1.bool_t);
JsonValue.prototype.isMember = makefunc_1.makefunc.js(symbols_1.proc["?isMember@Value@Json@@QEBA_NAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z"], nativetype_1.bool_t, { this: JsonValue }, nativetype_1.CxxString);
JsonValue.prototype.size = makefunc_1.makefunc.js(symbols_1.proc["?size@Value@Json@@QEBAIXZ"], nativetype_1.int32_t, { this: JsonValue });
JsonValue.prototype[nativetype_1.NativeType.dtor] = makefunc_1.makefunc.js(symbols_1.proc["??1Value@Json@@QEAA@XZ"], nativetype_1.void_t, { this: JsonValue });
let Certificate = class Certificate extends nativeclass_1.AbstractClass {
    getXuid() {
        (0, common_1.abstract)();
    }
    /**
     * alias of getIdentityName
     */
    getId() {
        return this.getIdentityName();
    }
    getIdentityName() {
        (0, common_1.abstract)();
    }
    getIdentity() {
        (0, common_1.abstract)();
    }
    getIdentityString() {
        return mce_1.mce.UUID.toString(this.getIdentity());
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(JsonValue, 0x50)
], Certificate.prototype, "json", void 0);
Certificate = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], Certificate);
exports.Certificate = Certificate;
let ConnectionRequest = class ConnectionRequest extends nativeclass_1.AbstractClass {
    /** @deprecated use getCertificate() */
    get cert() {
        return this.getCertificate();
    }
    /**
     * it's possible to return null if before packet processing
     */
    getCertificate() {
        (0, common_1.abstract)();
    }
    getJson() {
        const ptr = this.something;
        if (ptr === null)
            return null;
        return ptr.json;
    }
    getJsonValue() {
        var _a, _b;
        return (_b = (_a = this.getJson()) === null || _a === void 0 ? void 0 : _a.value()) !== null && _b !== void 0 ? _b : null;
    }
    getDeviceId() {
        const json = this.getJson();
        if (json === null)
            throw Error("Json object not found in ConnectionRequest");
        return json.get("DeviceId").toString();
    }
    getDeviceOS() {
        const json = this.getJson();
        if (json === null)
            throw Error("Json object not found in ConnectionRequest");
        return +json.get("DeviceOS");
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(Certificate.ref(), 0x10)
], ConnectionRequest.prototype, "something", void 0);
ConnectionRequest = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ConnectionRequest);
exports.ConnectionRequest = ConnectionRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubnJlcS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbm5yZXEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBdUQ7QUFDdkQsc0NBQXFDO0FBQ3JDLDRDQUF5QztBQUN6QywwQ0FBdUM7QUFDdkMsZ0NBQTZCO0FBQzdCLGdEQUFzRjtBQUN0Riw4Q0FBd0Y7QUFDeEYsdUNBQWlDO0FBRWpDLElBQVksYUFTWDtBQVRELFdBQVksYUFBYTtJQUNyQixpREFBUSxDQUFBO0lBQ1IsbURBQVMsQ0FBQTtJQUNULG1EQUFTLENBQUE7SUFDVCx1REFBVyxDQUFBO0lBQ1gscURBQVUsQ0FBQTtJQUNWLHVEQUFXLENBQUE7SUFDWCxtREFBUyxDQUFBO0lBQ1QscURBQVUsQ0FBQTtBQUNkLENBQUMsRUFUVyxhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQVN4QjtBQUdNLElBQU0sU0FBUyxpQkFBZixNQUFNLFNBQVUsU0FBUSx5QkFBVztJQU10QyxFQUxpQixtQ0FBb0IsQ0FBQyxNQUFNLEVBSzNDLHVCQUFVLENBQUMsSUFBSSxFQUFDO1FBQ2IsSUFBSSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFDRCxDQUFDLHVCQUFVLENBQUMsSUFBSSxDQUFDO1FBQ2IsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFjO1FBQy9CLE1BQU0sSUFBSSxHQUFHLElBQUksV0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELGFBQWEsQ0FBQyxLQUFjO1FBQ3hCLFFBQVEsT0FBTyxLQUFLLEVBQUU7WUFDbEIsS0FBSyxTQUFTO2dCQUNWLElBQUksQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQztnQkFD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