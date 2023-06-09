"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageManager = exports.StorageManager = exports.StorageDriver = exports.Storage = void 0;
const tslib_1 = require("tslib");
const path = require("path");
const fsutil_1 = require("../fsutil");
const util_1 = require("../util");
const util = require("util");
const Module = require("module");
const circulardetector_1 = require("../circulardetector");
const storages = new Map();
const storageStored = Symbol("storage");
const storageBase = Symbol("storageBase");
const proxyBase = Symbol("proxyBase");
var State;
(function (State) {
    State[State["Loaded"] = 0] = "Loaded";
    State[State["Loading"] = 1] = "Loading";
    State[State["Unloaded"] = 2] = "Unloaded";
    State[State["Deleted"] = 3] = "Deleted";
})(State || (State = {}));
class StorageArray extends Array {
    constructor(storage, arrayLength) {
        super(arrayLength);
        this[storageBase] = storage;
        this[proxyBase] = this;
    }
    set(index, value) {
        const storage = this[storageBase];
        if (storage === null)
            throw Error("deleted storage array");
        if (this[index] !== value) {
            this[index] = storage.convert(value);
            storage.saveRequest();
        }
        else if (value === undefined && !(index in this)) {
            this[index] = value;
            storage.saveRequest();
        }
        return true;
    }
    delete(index) {
        const storage = this[storageBase];
        if (storage === null)
            throw Error("deleted storage array");
        const res = delete this[index];
        if (res) {
            storage.saveRequest();
        }
        return res;
    }
    push(...items) {
        const storage = this[storageBase];
        if (storage === null)
            throw Error("deleted storage array");
        const n = items.length;
        for (let i = 0; i !== n; i = (i + 1) | 0) {
            items[i] = storage.convert(items[i]);
        }
        const res = super.push(...items);
        storage.saveRequest();
        return res;
    }
    pop() {
        if (this.length === 0)
            return undefined;
        const storage = this[storageBase];
        if (storage === null)
            throw Error("deleted storage array");
        const res = super.pop();
        storage.saveRequest();
        return res;
    }
    unshift(...items) {
        const storage = this[storageBase];
        if (storage === null)
            throw Error("deleted storage array");
        const n = items.length;
        for (let i = 0; i !== n; i = (i + 1) | 0) {
            items[i] = storage.convert(items[i]);
        }
        const res = super.unshift(...items);
        storage.saveRequest();
        return res;
    }
    shift() {
        if (this.length === 0)
            return undefined;
        const storage = this[storageBase];
        if (storage === null)
            throw Error("deleted storage array");
        const res = super.shift();
        storage.saveRequest();
        return res;
    }
    reverse() {
        const storage = this[storageBase];
        if (storage === null)
            throw Error("deleted storage array");
        super.reverse();
        storage.saveRequest();
        return this;
    }
    sort(compareFn) {
        const storage = this[storageBase];
        if (storage === null)
            throw Error("deleted storage array");
        super.sort(compareFn);
        storage.saveRequest();
        return this;
    }
    [util.inspect.custom](depth, options) {
        return circulardetector_1.CircularDetector.check(this, () => [...this]);
    }
}
const arrayProxyHandler = {
    set(target, p, value) {
        const storage = target[storageBase];
        if (storage === null)
            throw Error("deleted storage array");
        if (typeof p === "number") {
            if (storage.state !== State.Loaded)
                throw Error(`storage is not loaded`);
            return target.set(p, value);
        }
        else {
            target[p] = value;
            return true;
        }
    },
    deleteProperty(target, p) {
        const storage = target[storageBase];
        if (storage === null)
            throw Error("deleted storage array");
        if (typeof p === "number") {
            if (storage.state !== State.Loaded)
                throw Error(`storage is not loaded`);
            return target.delete(p);
        }
        else {
            return delete target[p];
        }
    },
};
const objectProxyHandler = {
    set(target, p, value) {
        if (typeof p === "string") {
            const storage = target[storageBase];
            if (storage === null)
                throw Error("deleted storage object");
            if (storage.state !== State.Loaded)
                throw Error(`storage is not loaded`);
            if (target[p] !== value) {
                target[p] = storage.convert(value);
                storage.saveRequest();
            }
            else if (value === undefined && !(p in target)) {
                target[p] = value;
                storage.saveRequest();
            }
        }
        else {
            target[p] = value;
        }
        return true;
    },
    deleteProperty(target, p) {
        if (typeof p === "string") {
            const storage = target[storageBase];
            if (storage === null)
                throw Error("deleted storage object");
            if (storage.state !== State.Loaded)
                throw Error(`storage is not loaded`);
            const res = delete target[p];
            if (res)
                storage.saveRequest();
            return res;
        }
        else {
            return delete target[p];
        }
    },
};
class Storage {
    constructor() {
        // empty
    }
    delete() {
        this.init(undefined);
    }
}
exports.Storage = Storage;
Storage.classId = Symbol("storageClassId");
Storage.id = Symbol("storageId");
Storage.aliasId = Symbol("storageId");
class StorageImpl extends Storage {
    constructor(container, classId, mainId, aliasId, isStringId, driver) {
        super();
        this.container = container;
        this.classId = classId;
        this.mainId = mainId;
        this.aliasId = aliasId;
        this.isStringId = isStringId;
        this.driver = driver;
        this.storageData = null;
        this.saving = null;
        this.modified = false;
        this.state = State.Unloaded;
        this.loading = null;
        const mainKey = classId + "/" + mainId;
        if (storages.has(mainKey))
            throw Error(`storage key duplicated`);
        storages.set(mainKey, this);
        if (aliasId !== null) {
            const aliasKey = classId + "/" + aliasId;
            if (storages.has(aliasKey))
                throw Error(`storage key duplicated`);
            storages.set(aliasKey, this);
        }
        if (container !== null) {
            container[storageStored] = this;
        }
    }
    get data() {
        const data = this.storageData;
        if (data === null)
            return undefined;
        return data.data;
    }
    get isLoaded() {
        return this.storageData !== null;
    }
    async _load() {
        if (this.state !== State.Unloaded)
            throw Error(`storage is already loaded`);
        this.state = State.Loading;
        let data = await this.driver.read(this.classId, this.mainId);
        if (this.state === State.Unloaded)
            return this; // unloaded while loading
        if (data === null && this.aliasId !== null) {
            data = await this.driver.read(this.classId, this.aliasId);
            if (this.state === State.Unloaded)
                return this; // unloaded while loading
        }
        this._loadData(data);
        return this;
    }
    _loadSync() {
        if (this.state !== State.Unloaded)
            throw Error(`storage is already loaded`);
        this.state = State.Loading;
        let data = this.driver.readSync(this.classId, this.mainId);
        if (this.state === State.Unloaded)
            return this; // unloaded while loading
        if (data === null && this.aliasId !== null) {
            data = this.driver.readSync(this.classId, this.aliasId);
            if (this.state === State.Unloaded)
                return this; // unloaded while loading
        }
        this._loadData(data);
        return this;
    }
    _loadData(data) {
        if (data === null) {
            this.storageData = {
                mainId: null,
                aliasId: null,
                data: undefined,
            };
        }
        else {
            this.storageData = data;
            data.data = this.convert(data.data);
            if (this.isStringId) {
                this._changeKeys(data.mainId, data.aliasId);
            }
            else if (data.mainId !== this.mainId || data.aliasId !== this.aliasId) {
                this.saveRequest();
            }
        }
        this.state = State.Loaded;
    }
    setContainer(container, mainId, aliasId) {
        this.isStringId = false;
        this.container = container;
        container[storageStored] = this;
        this._changeKeys(mainId, aliasId);
    }
    _changeKeys(mainId, aliasId) {
        if (mainId !== this.mainId) {
            if (this.aliasId === mainId) {
                this.aliasId = null;
            }
            else {
                storages.delete(this.classId + "/" + this.mainId);
                const newMainKey = this.classId + "/" + mainId;
                if (storages.has(newMainKey))
                    throw Error("storage key duplicated");
                storages.set(newMainKey, this);
            }
            this.mainId = mainId;
            this.saveRequest();
        }
        if (aliasId !== this.aliasId) {
            if (this.aliasId !== null) {
                storages.delete(this.classId + "/" + this.aliasId);
            }
            if (aliasId !== null) {
                const newAliasKey = this.classId + "/" + aliasId;
                if (storages.has(newAliasKey))
                    throw Error("storage key duplicated");
                storages.set(newAliasKey, this);
            }
            this.aliasId = aliasId;
            this.saveRequest();
        }
    }
    load() {
        if (this.loading !== null)
            return this.loading;
        return (this.loading = this._load());
    }
    loadSync() {
        this.loading = Promise.resolve(this);
        return this._loadSync();
    }
    init(value) {
        const data = this.storageData;
        if (data === null)
            throw Error(`storage is not loaded`);
        data.data = this.convert(value);
        this.saveRequest();
    }
    close() {
        if (this.state === State.Unloaded)
            return false;
        this.state = State.Unloaded;
        if (this.saving === null)
            this._unload();
        return true;
    }
    _unload() {
        storages.delete(this.classId + "/" + this.mainId);
        if (this.aliasId !== null)
            storages.delete(this.classId + "/" + this.aliasId);
        if (this.container !== null) {
            delete this.container[storageStored];
        }
        this.loading = null;
        this.storageData = null;
    }
    saveRequest() {
        this.modified = true;
        if (this.saving !== null)
            return this.saving;
        return (this.saving = (async () => {
            await (0, util_1.timeout)(this.driver.flushDelay);
            try {
                while (this.modified) {
                    this.modified = false;
                    await this.driver.write(this.classId, this.mainId, this.aliasId, this.storageData);
                }
            }
            finally {
                this.saving = null;
                if (this.state === State.Unloaded)
                    this._unload();
            }
        })());
    }
    convert(value) {
        switch (typeof value) {
            case "bigint":
                throw Error("Not implemented yet");
            case "function":
                throw Error("Cannot store the function to the storage");
            case "object":
                if (value === null)
                    return null;
                if (value instanceof Array) {
                    return this._makeArrayProxy(value);
                }
                else {
                    return this._makeObjectProxy(value);
                }
                break;
            default:
                return value;
        }
    }
    _makeArrayProxy(array) {
        const n = array.length;
        const base = new StorageArray(this, n);
        for (let i = 0; i !== n; i = (i + 1) | 0) {
            base.set(i, array[i]);
        }
        return new Proxy(base, arrayProxyHandler);
    }
    _makeObjectProxy(obj) {
        const realObj = obj[proxyBase];
        if (realObj !== undefined)
            obj = realObj;
        const base = {};
        base[storageBase] = this;
        base[proxyBase] = base;
        for (const key in obj) {
            base[key] = this.convert(obj[key]);
        }
        return new Proxy(base, objectProxyHandler);
    }
}
class StorageDriver {
    constructor() {
        this.flushDelay = 500;
    }
}
exports.StorageDriver = StorageDriver;
StorageDriver.NOT_FOUND = Symbol();
function driverNotProvided() {
    throw Error("storage.driver is not provided");
}
class NullDriver extends StorageDriver {
    write(classId, mainId, aliasId, data) {
        driverNotProvided();
    }
    read(classId, id) {
        driverNotProvided();
    }
    readSync(classId, id) {
        driverNotProvided();
    }
    createIndex(classId, indexKey) {
        driverNotProvided();
    }
    deleteIndex(classId, indexKey) {
        driverNotProvided();
    }
    search(classId, indexKey, value) {
        driverNotProvided();
    }
    list(classId) {
        driverNotProvided();
    }
    listClass() {
        driverNotProvided();
    }
}
(function (StorageDriver) {
    StorageDriver.nullDriver = new NullDriver();
})(StorageDriver = exports.StorageDriver || (exports.StorageDriver = {}));
class StorageManager {
    constructor(driver = StorageDriver.nullDriver) {
        this.driver = driver;
    }
    close(objOrKey) {
        if (typeof objOrKey !== "string") {
            const obj = objOrKey;
            let storage = obj[storageStored];
            if (storage != null) {
                storage.close();
            }
            else {
                const classId = obj.constructor[Storage.classId];
                if (classId == null)
                    return;
                const mainId = obj[Storage.id]();
                storage = storages.get(classId + "/" + mainId);
                if (obj[Storage.aliasId] != null) {
                    const aliasId = obj[Storage.aliasId]();
                    if (storage == null) {
                        storage = storages.get(classId + "/" + aliasId);
                    }
                }
                if (storage != null) {
                    storage.close();
                }
            }
        }
        else {
            const key = objOrKey;
            const storage = storages.get(key);
            if (storage != null) {
                storage.close();
            }
        }
    }
    _getWithoutLoad(objOrKey) {
        let storage;
        if (typeof objOrKey !== "string") {
            const obj = objOrKey;
            storage = obj[storageStored];
            if (storage == null) {
                const classId = obj.constructor[Storage.classId];
                if (classId == null)
                    throw Error(`The storage class does not provide the id. Please define 'static [Storage.classId]'`);
                const mainId = obj[Storage.id]();
                storage = storages.get(classId + "/" + mainId);
                let aliasId = null;
                if (obj[Storage.aliasId] != null) {
                    aliasId = obj[Storage.aliasId]();
                    if (storage == null) {
                        storage = storages.get(classId + "/" + aliasId);
                    }
                }
                if (storage != null) {
                    storage.setContainer(obj, mainId, aliasId);
                    return storage;
                }
                storage = new StorageImpl(obj, classId, mainId, aliasId, false, this.driver);
            }
        }
        else {
            const key = objOrKey;
            storage = storages.get(key);
            if (storage == null) {
                let mainId;
                let classId;
                const idx = key.indexOf("/");
                if (idx === -1) {
                    classId = null;
                    mainId = key;
                }
                else {
                    classId = key.substr(0, idx);
                    mainId = key.substr(idx + 1);
                }
                storage = new StorageImpl(null, classId, mainId, null, true, this.driver);
            }
        }
        return storage;
    }
    getSync(objOrKey) {
        return this._getWithoutLoad(objOrKey).loadSync();
    }
    get(objOrKey) {
        return this._getWithoutLoad(objOrKey).load();
    }
    createIndex(storageClass, indexKey) {
        const classId = storageClass[Storage.classId];
        return this.driver.createIndex(classId, indexKey);
    }
    search(storageClass, indexKey, value) {
        return tslib_1.__asyncGenerator(this, arguments, function* search_1() {
            var _a, e_1, _b, _c;
            const classId = storageClass[Storage.classId];
            try {
                for (var _d = true, _e = tslib_1.__asyncValues(this.driver.search(classId, indexKey, value)), _f; _f = yield tslib_1.__await(_e.next()), _a = _f.done, !_a;) {
                    _c = _f.value;
                    _d = false;
                    try {
                        const id = _c;
                        yield yield tslib_1.__await(yield tslib_1.__await(this.get(classId + "/" + id)));
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield tslib_1.__await(_b.call(_e));
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
    listClass() {
        return this.driver.listClass();
    }
    list(storageClass) {
        return tslib_1.__asyncGenerator(this, arguments, function* list_1() {
            var _a, e_2, _b, _c;
            const classId = storageClass == null ? null : storageClass[Storage.classId];
            try {
                for (var _d = true, _e = tslib_1.__asyncValues(this.driver.list(classId)), _f; _f = yield tslib_1.__await(_e.next()), _a = _f.done, !_a;) {
                    _c = _f.value;
                    _d = false;
                    try {
                        const id = _c;
                        yield yield tslib_1.__await(classId + "/" + id);
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield tslib_1.__await(_b.call(_e));
                }
                finally { if (e_2) throw e_2.error; }
            }
        });
    }
}
exports.StorageManager = StorageManager;
Module.prototype[Storage.id] = function () {
    let rpath = path.relative(fsutil_1.fsutil.projectPath, module.filename).replace(/\\/g, "/");
    if (rpath.endsWith(".js"))
        rpath = rpath.substr(0, rpath.length - 3);
    if (rpath.endsWith("/index"))
        rpath = rpath.substr(0, rpath.length - 6);
    return rpath;
};
Module[Storage.classId] = "module";
exports.storageManager = new StorageManager();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsNkJBQTZCO0FBQzdCLHNDQUFtQztBQUNuQyxrQ0FBa0M7QUFDbEMsNkJBQTZCO0FBQzdCLGlDQUFrQztBQUNsQywwREFBdUQ7QUFPdkQsTUFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQXVCLENBQUM7QUFDaEQsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3hDLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMxQyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFdEMsSUFBSyxLQUtKO0FBTEQsV0FBSyxLQUFLO0lBQ04scUNBQU0sQ0FBQTtJQUNOLHVDQUFPLENBQUE7SUFDUCx5Q0FBUSxDQUFBO0lBQ1IsdUNBQU8sQ0FBQTtBQUNYLENBQUMsRUFMSSxLQUFLLEtBQUwsS0FBSyxRQUtUO0FBRUQsTUFBTSxZQUFnQixTQUFRLEtBQVE7SUFJbEMsWUFBWSxPQUFvQixFQUFFLFdBQW1CO1FBQ2pELEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUNELEdBQUcsQ0FBQyxLQUFhLEVBQUUsS0FBUTtRQUN2QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEMsSUFBSSxPQUFPLEtBQUssSUFBSTtZQUFFLE1BQU0sS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDM0QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEtB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