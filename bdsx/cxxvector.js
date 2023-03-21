"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CxxVectorToArray = exports.CxxVector = exports.CxxVectorLike = void 0;
const util = require("util");
const dll_1 = require("./dll");
const makefunc_1 = require("./makefunc");
const mangle_1 = require("./mangle");
const msalloc_1 = require("./msalloc");
const nativeclass_1 = require("./nativeclass");
const nativetype_1 = require("./nativetype");
const singleton_1 = require("./singleton");
const util_1 = require("./util");
const VECTOR_SIZE = 0x18;
function getVectorSymbol(type) {
    return mangle_1.mangle.templateClass(["std", "vector"], type, mangle_1.mangle.templateClass(["std", "allocator"], type));
}
function getSize(bytes, compsize) {
    if (bytes < 0 || bytes % compsize !== 0) {
        throw Error(`invalid vector size (bytes=${(0, util_1.hex)(bytes)}, compsize=${(0, util_1.hex)(compsize)})`);
    }
    return (bytes / compsize) | 0;
}
/**
 * CxxVector-like with a JS array
 * @deprecated this API is for the legacy support.
 */
class CxxVectorLike {
    constructor(array) {
        this.array = array;
        this.warned = false;
    }
    [nativetype_1.NativeType.ctor]() {
        this.array.length = 0;
    }
    [nativetype_1.NativeType.dtor]() {
        this.array.length = 0;
    }
    [nativetype_1.NativeType.ctor_copy](from) {
        this.setFromArray(from.array);
    }
    [nativetype_1.NativeType.ctor_move](from) {
        this.setFromArray(from.array);
        from.array.length = 0;
    }
    set(idx, component) {
        const fromSize = this.array.length;
        const newSize = idx + 1;
        if (newSize > fromSize) {
            for (let i = fromSize; i < newSize; i = (i + 1) | 0) {
                this.array[i] = null;
            }
        }
        this.array[idx] = component;
    }
    get(idx) {
        return (this.array[idx] || null);
    }
    back() {
        const n = this.array.length;
        if (n === 0) {
            return null;
        }
        return this.array[n - 1];
    }
    pop() {
        if (this.array.length === 0) {
            return false;
        }
        this.array.pop();
        return true;
    }
    push(...component) {
        this.array.push(...component);
    }
    splice(start, deleteCount, ...items) {
        const n = items.length;
        if (n < deleteCount) {
            let i = start + n;
            const offset = deleteCount - n;
            const newsize = this.size() - offset;
            for (; i < newsize; i = (i + 1) | 0) {
                this.set(i, this.get(i + offset));
            }
            this.resize(newsize);
        }
        else if (n > deleteCount) {
            const offset = n - deleteCount;
            const size = this.size();
            const newsize = size + offset;
            this.resize(newsize);
            const iend = start + n;
            for (let i = newsize - 1; i >= iend; i--) {
                this.set(i, this.get(i - offset));
            }
        }
        for (let i = 0; i !== n; i = (i + 1) | 0) {
            this.set(i + start, items[i]);
        }
    }
    resize(newSize) {
        const oldSize = this.array.length;
        this.array.length = newSize;
        for (let i = oldSize; i < newSize; i = (i + 1) | 0) {
            this.array[i] = null;
        }
    }
    size() {
        return this.array.length;
    }
    sizeBytes() {
        if (!this.warned) {
            this.warned = true;
            console.trace("CxxVectorLike.sizeBytes, deprecated usage, it's not actual bytes");
        }
        return this.array.length * 8;
    }
    capacity() {
        return this.array.length;
    }
    toArray() {
        return this.array.slice();
    }
    setFromArray(array) {
        const t = this.array;
        const n = (t.length = array.length);
        for (let i = 0; i !== n; i = (i + 1) | 0) {
            t[i] = array[i];
        }
    }
    [Symbol.iterator]() {
        return this.array.values();
    }
}
exports.CxxVectorLike = CxxVectorLike;
/**
 * std::vector<T>
 * C++ standard dynamic array class
 */
class CxxVector extends nativeclass_1.NativeClass {
    [nativetype_1.NativeType.ctor]() {
        dll_1.dll.vcruntime140.memset(this, 0, VECTOR_SIZE);
    }
    [nativetype_1.NativeType.dtor]() {
        const begin = this.getPointer(0);
        const ptr = begin.add();
        const end = this.getPointer(8);
        const capBytes = this.getPointer(16).subptr(begin);
        const compsize = this.componentType[nativetype_1.NativeType.size];
        let idx = 0;
        while (!ptr.equalsptr(end)) {
            this._dtor(ptr, idx++);
            ptr.move(compsize);
        }
        msalloc_1.msAlloc.deallocate(begin, capBytes);
        this._resizeCache(0);
    }
    [nativetype_1.NativeType.ctor_copy](from) {
        const fromSizeBytes = from.sizeBytes();
        const ptr = msalloc_1.msAlloc.allocate(fromSizeBytes);
        const compsize = this.componentType[nativetype_1.NativeType.size];
        const size = getSize(fromSizeBytes, compsize);
        const srcptr = from.getPointer(0);
        this.setPointer(ptr, 0);
        for (let i = 0; i < size; i = (i + 1) | 0) {
            this._ctor(ptr, i);
            this._copy(ptr, from._get(srcptr, i), i);
            ptr.move(compsize);
            srcptr.move(compsize);
        }
        this.setPointer(ptr, 8);
        this.setPointer(ptr, 16);
    }
    [nativetype_1.NativeType.ctor_move](from) {
        from._resizeCache(0);
        dll_1.dll.vcruntime140.memcpy(this, from, VECTOR_SIZE);
        dll_1.dll.vcruntime140.memset(from, 0, VECTOR_SIZE);
    }
    _resizeCache(n) {
        // empty
    }
    _reserve(newCapBytes, oldCapBytes, oldptr, oldSizeBytes) {
        const compsize = this.componentType[nativetype_1.NativeType.size];
        const allocated = msalloc_1.msAlloc.allocate(newCapBytes);
        this.setPointer(allocated, 0);
        const size = getSize(oldSizeBytes, compsize);
        this._move_alloc(allocated, oldptr, size);
        msalloc_1.msAlloc.deallocate(oldptr, oldCapBytes);
        this.setPointer(allocated, 8);
        allocated.move(newCapBytes - oldSizeBytes);
        this.setPointer(allocated, 16);
    }
    /**
     * @remark it initializes the new field. but doesn't destruct the old field.
     */
    _resize(newSizeBytes, oldCapBytes, oldptr, oldSizeBytes) {
        const newcapBytes = Math.max(newSizeBytes, oldCapBytes * 2);
        const compsize = this.componentType[nativetype_1.NativeType.size];
        const allocated = msalloc_1.msAlloc.allocate(newcapBytes);
        this.setPointer(allocated, 0);
        const oldSize = getSize(oldSizeBytes, compsize);
        const newSize = getSize(newSizeBytes, compsize);
        this._move_alloc(allocated, oldptr, Math.min(oldSize, newSize));
        msalloc_1.msAlloc.deallocate(oldptr, oldCapBytes);
        for (let i = oldSize; i < newSize; i = (i + 1) | 0) {
            this._ctor(allocated, i);
            allocated.move(compsize);
        }
        this.setPointer(allocated, 8);
        allocated.move(newcapBytes - newSizeBytes);
        this.setPointer(allocated, 16);
    }
    _resizeWithoutInit(newSizeBytes, oldCapBytes, oldptr, oldSizeBytes) {
        const newcapBytes = Math.max(newSizeBytes, oldCapBytes * 2);
        const compsize = this.componentType[nativetype_1.NativeType.size];
        const allocated = msalloc_1.msAlloc.allocate(newcapBytes);
        this.setPointer(allocated, 0);
        const oldSize = getSize(oldSizeBytes, compsize);
        const newSize = getSize(newSizeBytes, compsize);
        this._move_alloc(allocated, oldptr, Math.min(oldSize, newSize));
        msalloc_1.msAlloc.deallocate(oldptr, oldCapBytes);
        if (newSizeBytes > oldSizeBytes)
            allocated.move(newSizeBytes - oldSizeBytes);
        this.setPointer(allocated, 8);
        allocated.move(newcapBytes - newSizeBytes);
        this.setPointer(allocated, 16);
    }
    set(idx, component) {
        const type = this.componentType;
        const compsize = type[nativetype_1.NativeType.size];
        let begptr = this.getPointer(0);
        const oldSizeBytes = this.getPointer(8).subptr(begptr);
        const targetOffset = idx * compsize;
        if (targetOffset < oldSizeBytes) {
            begptr.move(targetOffset);
            this._copy(begptr, component, idx);
            return;
        }
        const oldCapBytes = this.getPointer(16).subptr(begptr);
        const newSizeBytes = targetOffset + compsize;
        if (newSizeBytes > oldCapBytes) {
            this._resize(newSizeBytes, oldCapBytes, begptr, oldSizeBytes);
            begptr = this.getPointer(0);
        }
        begptr.move(newSizeBytes);
        this.setPointer(begptr, 8);
        begptr.move(-compsize, -1);
        this._copy(begptr, component, idx);
    }
    /**
     * @return null if not found, it does not return undefined
     */
    get(idx) {
        const beginptr = this.getPointer(0);
        const endptr = this.getPointer(8);
        const compsize = this.componentType[nativetype_1.NativeType.size];
        const bytes = endptr.subptr(beginptr);
        const size = getSize(bytes, compsize);
        if (idx < 0 || idx >= size)
            return null;
        beginptr.move(idx * compsize);
        return this._get(beginptr, idx);
    }
    back() {
        const beginptr = this.getPointer(0);
        const endptr = this.getPointer(8);
        if (beginptr.equalsptr(endptr))
            return null;
        const compsize = this.componentType[nativetype_1.NativeType.size];
        endptr.move(-compsize, -1);
        const bytes = endptr.subptr(beginptr);
        const idx = getSize(bytes, compsize);
        return this._get(endptr, idx);
    }
    pop() {
        const begptr = this.getPointer(0);
        const endptr = this.getPointer(8);
        if (endptr.equalsptr(begptr))
            return false;
        const compsize = this.componentType[nativetype_1.NativeType.size];
        endptr.move(-compsize, -1);
        const idx = getSize(endptr.subptr(begptr), compsize);
        this._dtor(endptr, idx);
        this.setPointer(endptr, 8);
        return true;
    }
    /**
     * @return [pointer, index], begin of extended.
     * @remark don't use with n=0
     */
    _prepare(n) {
        let begptr = this.getPointer(0);
        const endptr = this.getPointer(8);
        const capptr = this.getPointer(16);
        const oldbytes = endptr.subptr(begptr);
        const compsize = this.componentType[nativetype_1.NativeType.size];
        const oldsize = getSize(oldbytes, compsize);
        if (n === 1) {
            if (capptr.equalsptr(endptr)) {
                const capBytes = capptr.subptr(begptr);
                const newBytes = oldbytes + compsize;
                this._resizeWithoutInit(newBytes, capBytes, begptr, oldbytes);
                begptr = this.getPointer(0);
                begptr.move(oldbytes);
            }
            else {
                begptr.move(oldbytes + compsize);
                this.setPointer(begptr, 8);
                begptr.move(-compsize, -1);
            }
            return { pointer: begptr, index: oldsize };
        }
        else {
            const newbytes = n * compsize + oldbytes;
            const capbytes = capptr.subptr(begptr);
            if (newbytes > capbytes) {
                this._resizeWithoutInit(newbytes, capbytes, begptr, oldbytes);
                begptr = this.getPointer(0);
                begptr.move(oldbytes);
            }
            else {
                begptr.move(compsize * n);
                this.setPointer(begptr, 8);
                begptr.move(oldbytes - newbytes, -1);
            }
            const idx = getSize(oldbytes, compsize);
            return { pointer: begptr, index: idx };
        }
    }
    push(...component) {
        const n = component.length;
        if (n === 0)
            return;
        const compsize = this.componentType[nativetype_1.NativeType.size];
        const res = this._prepare(n);
        const ptr = res.pointer;
        let idx = res.index;
        for (const c of component) {
            this._ctor_copy(ptr, c, idx++);
            ptr.move(compsize);
        }
    }
    emplace(...component) {
        const n = component.length;
        if (n === 0)
            return;
        const compsize = this.componentType[nativetype_1.NativeType.size];
        const res = this._prepare(n);
        const ptr = res.pointer;
        let idx = res.index;
        for (const c of component) {
            this._ctor_move(ptr, c, idx++);
            ptr.move(compsize);
        }
    }
    /**
     * extends one component and returns it without constructing it.
     * it's does not work with the primitive type
     */
    prepare() {
        const res = this._prepare(1);
        return this._get(res.pointer, res.index);
    }
    splice(start, deleteCount, ...items) {
        const n = items.length;
        if (n < deleteCount) {
            let i = start + n;
            const offset = deleteCount - n;
            const newsize = this.size() - offset;
            for (; i < newsize; i = (i + 1) | 0) {
                this.set(i, this.get(i + offset));
            }
            this.resize(newsize);
        }
        else if (n > deleteCount) {
            const offset = n - deleteCount;
            const size = this.size();
            const newsize = size + offset;
            this.resize(newsize);
            const iend = start + n;
            for (let i = newsize - 1; i >= iend; i--) {
                this.set(i, this.get(i - offset));
            }
        }
        for (let i = 0; i !== n; i = (i + 1) | 0) {
            this.set(i + start, items[i]);
        }
    }
    reserve(newSize) {
        const compsize = this.componentType[nativetype_1.NativeType.size];
        const begin = this.getPointer(0);
        const end = this.getPointer(8);
        const oldSizeBytes = end.subptr(begin);
        const oldSize = getSize(oldSizeBytes, compsize);
        if (newSize <= oldSize)
            return;
        const newCapBytes = newSize * compsize;
        const cap = this.getPointer(16);
        const oldCapBytes = cap.subptr(begin);
        if (newCapBytes <= oldCapBytes)
            return;
        this._reserve(newCapBytes, oldCapBytes, begin, oldSizeBytes);
    }
    resize(newSize) {
        const compsize = this.componentType[nativetype_1.NativeType.size];
        const begin = this.getPointer(0);
        const end = this.getPointer(8);
        const oldSizeBytes = end.subptr(begin);
        const oldSize = getSize(oldSizeBytes, compsize);
        const newSizeBytes = newSize * compsize;
        if (newSize <= oldSize) {
            begin.move(newSizeBytes);
            this.setPointer(begin, 8);
            let i = newSize;
            while (!begin.equalsptr(end)) {
                this._dtor(begin, (i = (i + 1) | 0));
                begin.move(compsize);
            }
            this._resizeCache(newSize);
            return;
        }
        const cap = this.getPointer(16);
        const oldCapBytes = cap.subptr(begin);
        if (newSizeBytes <= oldCapBytes) {
            begin.move(newSizeBytes);
            this.setPointer(begin, 8);
            let i = oldSize;
            while (!end.equalsptr(begin)) {
                this._ctor(end, (i = (i + 1) | 0));
                end.move(compsize);
            }
            return;
        }
        this._resize(newSizeBytes, oldCapBytes, begin, oldSizeBytes);
    }
    empty() {
        return this.getBin64(0) === this.getBin64(8);
    }
    size() {
        const beginptr = this.getPointer(0);
        const endptr = this.getPointer(8);
        const bytes = endptr.subptr(beginptr);
        const compsize = this.componentType[nativetype_1.NativeType.size];
        return getSize(bytes, compsize);
    }
    sizeBytes() {
        const beginptr = this.getPointer(0);
        const endptr = this.getPointer(8);
        return endptr.subptr(beginptr);
    }
    capacity() {
        const beginptr = this.getPointer(0);
        const endptr = this.getPointer(16);
        return getSize(endptr.subptr(beginptr), this.componentType[nativetype_1.NativeType.size]);
    }
    toArray() {
        const n = this.size();
        const out = new Array(n);
        for (let i = 0; i !== n; i = (i + 1) | 0) {
            out[i] = this.get(i);
        }
        return out;
    }
    setFromArray(array) {
        const n = array.length;
        const size = this.size();
        if (n > size)
            this.resize(n);
        for (let i = 0; i !== n; i = (i + 1) | 0) {
            this.set(i, array[i]);
        }
        if (n < size)
            this.resize(n);
    }
    *[Symbol.iterator]() {
        const n = this.size();
        for (let i = 0; i !== n; i = (i + 1) | 0) {
            yield this.get(i);
        }
    }
    static make(type) {
        return singleton_1.Singleton.newInstance(CxxVector, type, () => {
            if (type[nativetype_1.NativeType.size] === undefined)
                throw Error("CxxVector needs the component size");
            if (nativeclass_1.NativeClass.isNativeClassType(type)) {
                class VectorImpl extends CxxVector {
                    constructor() {
                        super(...arguments);
                        this.cache = [];
                    }
                    _resizeCache(size) {
                        this.cache.length = size;
                    }
                    _move_alloc(allocated, oldptr, movesize) {
                        const clazz = this.componentType;
                        const compsize = this.componentType[nativetype_1.NativeType.size];
                        const oldptrmove = oldptr.add();
                        for (let i = 0; i < movesize; i = (i + 1) | 0) {
                            const new_item = allocated.as(clazz);
                            const old_item = this._get(oldptrmove, i);
                            this.cache[i] = new_item;
                            new_item[nativetype_1.NativeType.ctor_move](old_item);
                            old_item[nativetype_1.NativeType.dtor]();
                            allocated.move(compsize);
                            oldptrmove.move(compsize);
                        }
                        this.cache.length = 0;
                    }
                    _get(ptr, index) {
                        const item = this.cache[index];
                        if (item != null && ptr.equalsptr(item))
                            return item;
                        const type = this.componentType;
                        return (this.cache[index] = ptr.as(type));
                    }
                    _dtor(ptr, index) {
                        this._get(ptr, index)[nativetype_1.NativeType.dtor]();
                    }
                    _ctor(ptr, index) {
                        this._get(ptr, index)[nativetype_1.NativeType.ctor]();
                    }
                    _copy(ptr, from, index) {
                        this._get(ptr, index)[nativetype_1.NativeType.setter](from);
                    }
                    _ctor_copy(ptr, from, index) {
                        this._get(ptr, index)[nativetype_1.NativeType.ctor_copy](from);
                    }
                    _ctor_move(ptr, from, index) {
                        this._get(ptr, index)[nativetype_1.NativeType.ctor_move](from);
                    }
                }
                VectorImpl.componentType = type;
                VectorImpl.prototype.componentType = type;
                VectorImpl.abstract({}, VECTOR_SIZE, 8);
                Object.defineProperties(VectorImpl, {
                    name: { value: `CxxVector<${type.name}>` },
                    symbol: { value: getVectorSymbol(type) },
                });
                return VectorImpl;
            }
            else {
                class VectorImpl extends CxxVector {
                    _move_alloc(allocated, oldptr, movesize) {
                        const compsize = this.componentType[nativetype_1.NativeType.size];
                        const oldptrmove = oldptr.add();
                        for (let i = 0; i < movesize; i = (i + 1) | 0) {
                            this.componentType[nativetype_1.NativeType.ctor_move](allocated, oldptrmove);
                            this.componentType[nativetype_1.NativeType.dtor](oldptrmove);
                            allocated.move(compsize);
                            oldptrmove.move(compsize);
                        }
                    }
                    _get(ptr) {
                        const type = this.componentType;
                        return type[nativetype_1.NativeType.getter](ptr);
                    }
                    _dtor(ptr) {
                        const type = this.componentType;
                        type[nativetype_1.NativeType.dtor](ptr);
                    }
                    _ctor(ptr) {
                        const type = this.componentType;
                        type[nativetype_1.NativeType.ctor](ptr);
                    }
                    _copy(ptr, from) {
                        const type = this.componentType;
                        type[nativetype_1.NativeType.setter](ptr, from);
                    }
                    _ctor_copy(ptr, from) {
                        const type = this.componentType;
                        type[nativetype_1.NativeType.ctor](ptr);
                        type[nativetype_1.NativeType.setter](ptr, from);
                    }
                    _ctor_move(ptr, from) {
                        const type = this.componentType;
                        type[nativetype_1.NativeType.ctor](ptr);
                        type[nativetype_1.NativeType.setter](ptr, from);
                    }
                }
                VectorImpl.componentType = type;
                Object.defineProperty(VectorImpl, "name", {
                    value: getVectorSymbol(type),
                });
                VectorImpl.prototype.componentType = type;
                VectorImpl.abstract({}, VECTOR_SIZE, 8);
                return VectorImpl;
            }
        });
    }
    [util.inspect.custom](depth, options) {
        return `CxxVector ${util.inspect(this.toArray(), options)}`;
    }
}
exports.CxxVector = CxxVector;
class CxxVectorToArrayImpl extends nativetype_1.NativeType {
    constructor(compType) {
        super(getVectorSymbol(compType), `CxxVectorToArray<${compType.name}>`, VECTOR_SIZE, 8, v => v instanceof Array, undefined, (ptr, offset) => ptr.addAs(this.type, offset).toArray(), (ptr, v, offset) => ptr.addAs(this.type, offset).setFromArray(v), (stackptr, offset) => stackptr.getPointerAs(this.type, offset).toArray(), undefined, ptr => ptr.fill(0, VECTOR_SIZE), ptr => {
            const beg = ptr.getPointer(0);
            const cap = ptr.getPointer(16);
            msalloc_1.msAlloc.deallocate(beg, cap.subptr(beg));
        }, (to, from) => to.as(this.type)[nativetype_1.NativeType.ctor_copy](from.as(this.type)), (to, from) => {
            dll_1.dll.vcruntime140.memcpy(to, from, VECTOR_SIZE);
            dll_1.dll.vcruntime140.memset(from, 0, VECTOR_SIZE);
        });
        this.compType = compType;
        this.type = CxxVector.make(this.compType);
        this[makefunc_1.makefunc.paramHasSpace] = true;
    }
}
var CxxVectorToArray;
(function (CxxVectorToArray) {
    CxxVectorToArray.name = "CxxVectorToArray";
    function make(compType) {
        return singleton_1.Singleton.newInstance(CxxVectorToArrayImpl, compType, () => new CxxVectorToArrayImpl(compType));
    }
    CxxVectorToArray.make = make;
})(CxxVectorToArray = exports.CxxVectorToArray || (exports.CxxVectorToArray = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3h4dmVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3h4dmVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZCQUE2QjtBQUU3QiwrQkFBNEI7QUFDNUIseUNBQXNDO0FBQ3RDLHFDQUFrQztBQUNsQyx1Q0FBb0M7QUFDcEMsK0NBQTZEO0FBQzdELDZDQUFnRDtBQUNoRCwyQ0FBd0M7QUFDeEMsaUNBQTZCO0FBTzdCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQztBQUV6QixTQUFTLGVBQWUsQ0FBQyxJQUFlO0lBQ3BDLE9BQU8sZUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzNHLENBQUM7QUFFRCxTQUFTLE9BQU8sQ0FBQyxLQUFhLEVBQUUsUUFBZ0I7SUFDNUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxRQUFRLEtBQUssQ0FBQyxFQUFFO1FBQ3JDLE1BQU0sS0FBSyxDQUFDLDhCQUE4QixJQUFBLFVBQUcsRUFBQyxLQUFLLENBQUMsY0FBYyxJQUFBLFVBQUcsRUFBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDdkY7SUFDRCxPQUFPLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsQyxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsTUFBYSxhQUFhO0lBRXRCLFlBQTZCLEtBQW1CO1FBQW5CLFVBQUssR0FBTCxLQUFLLENBQWM7UUFEeEMsV0FBTSxHQUFHLEtBQUssQ0FBQztJQUM0QixDQUFDO0lBRXBELENBQUMsdUJBQVUsQ0FBQyxJQUFJLENBQUM7UUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUNELENBQUMsdUJB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QUFDLENBQUM7UUFDOUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsSUFBSTtRQUNBLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDNUMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyx1QkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDckMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsR0FBRztRQUNDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDM0MsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyx1QkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUzQixNQUFNLEdBQUcsR0FBRyxPQUFP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