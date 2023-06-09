"use strict";
// Visual C++ uses red black tree for std::map
// https://en.wikipedia.org/wiki/Red%E2%80%93black_tree
Object.defineProperty(exports, "__esModule", { value: true });
exports.CxxMap = void 0;
const tslib_1 = require("tslib");
const util = require("util");
const capi_1 = require("./capi");
const cxxfunctional_1 = require("./cxxfunctional");
const cxxpair_1 = require("./cxxpair");
const mangle_1 = require("./mangle");
const nativeclass_1 = require("./nativeclass");
const nativetype_1 = require("./nativetype");
const singleton_1 = require("./singleton");
var _Redbl;
(function (_Redbl) {
    _Redbl[_Redbl["_Red"] = 0] = "_Red";
    _Redbl[_Redbl["_Black"] = 1] = "_Black";
})(_Redbl || (_Redbl = {}));
class CxxTreeNode extends nativeclass_1.NativeClass {
    next() {
        let _Ptr = this;
        if (_Ptr._Right._Isnil) {
            // climb looking for right subtree
            let _Pnode;
            while (!(_Pnode = _Ptr._Parent)._Isnil && _Ptr.equalsptr(_Pnode._Right)) {
                _Ptr = _Pnode; // ==> parent while right subtree
            }
            _Ptr = _Pnode; // ==> parent (head if end())
        }
        else {
            _Ptr = _Min(_Ptr._Right); // ==> smallest of right subtree
        }
        return _Ptr;
    }
    previous() {
        let _Ptr = this;
        if (_Ptr._Isnil) {
            _Ptr = _Ptr._Right; // end() ==> rightmost
        }
        else if (_Ptr._Left._Isnil) {
            // climb looking for left subtree
            let _Pnode;
            while (!(_Pnode = _Ptr._Parent)._Isnil && _Ptr.equalsptr(_Pnode._Left)) {
                _Ptr = _Pnode; // ==> parent while left subtree
            }
            if (!_Ptr._Isnil) {
                // decrement non-begin()
                _Ptr = _Pnode; // ==> parent if not head
            }
        }
        else {
            _Ptr = _Max(_Ptr._Left); // ==> largest of left subtree
        }
        return _Ptr;
    }
    static make(type) {
        return singleton_1.Singleton.newInstance(CxxTreeNode, type, () => {
            var CxxTreeNodeImpl_1;
            let CxxTreeNodeImpl = CxxTreeNodeImpl_1 = class CxxTreeNodeImpl extends CxxTreeNode {
            };
            tslib_1.__decorate([
                (0, nativeclass_1.nativeField)(CxxTreeNodeImpl_1.ref())
            ], CxxTreeNodeImpl.prototype, "_Left", void 0);
            tslib_1.__decorate([
                (0, nativeclass_1.nativeField)(CxxTreeNodeImpl_1.ref())
            ], CxxTreeNodeImpl.prototype, "_Parent", void 0);
            tslib_1.__decorate([
                (0, nativeclass_1.nativeField)(CxxTreeNodeImpl_1.ref())
            ], CxxTreeNodeImpl.prototype, "_Right", void 0);
            tslib_1.__decorate([
                (0, nativeclass_1.nativeField)(nativetype_1.int8_t)
            ], CxxTreeNodeImpl.prototype, "_Color", void 0);
            tslib_1.__decorate([
                (0, nativeclass_1.nativeField)(nativetype_1.int8_t)
            ], CxxTreeNodeImpl.prototype, "_Isnil", void 0);
            tslib_1.__decorate([
                (0, nativeclass_1.nativeField)(type, { noInitialize: true })
            ], CxxTreeNodeImpl.prototype, "_Myval", void 0);
            CxxTreeNodeImpl = CxxTreeNodeImpl_1 = tslib_1.__decorate([
                (0, nativeclass_1.nativeClass)()
            ], CxxTreeNodeImpl);
            return CxxTreeNodeImpl;
        });
    }
}
function _Max(_Pnode) {
    // return rightmost node in subtree at _Pnode
    while (!_Pnode._Right._Isnil) {
        _Pnode = _Pnode._Right;
    }
    return _Pnode;
}
function _Min(_Pnode) {
    // return leftmost node in subtree at _Pnode
    while (!_Pnode._Left._Isnil) {
        _Pnode = _Pnode._Left;
    }
    return _Pnode;
}
class CxxMap extends nativeclass_1.NativeClass {
    get _Myhead() {
        return this.getPointerAs(this.nodeType, 0);
    }
    size() {
        return this.getUint64AsFloat(8);
    }
    empty() {
        return this.size() === 0;
    }
    [nativetype_1.NativeType.ctor]() {
        const head = capi_1.capi.malloc(0x20).as(this.nodeType); // allocate without value size
        this.setPointer(head, 0);
        this.setUint64WithFloat(0, 8);
        head._Left = head;
        head._Parent = head;
        head._Right = head;
        head._Color = _Redbl._Black;
        head._Isnil = 1;
    }
    [nativetype_1.NativeType.dtor]() {
        this.clear();
        nativeclass_1.NativeClass.delete(this.getPointerAs(this.nodeType, 0));
    }
    [nativetype_1.NativeType.ctor_move](from) {
        this.setPointer(from._Myhead, 0);
        this.setUint64WithFloat(from.size(), 8);
        const newhead = capi_1.capi.malloc(0x20).as(this.nodeType); // allocate without value size
        this.setPointer(newhead, 0);
        this.setUint64WithFloat(0, 8);
        newhead._Left = newhead;
        newhead._Parent = newhead;
        newhead._Right = newhead;
        newhead._Color = _Redbl._Black;
        newhead._Isnil = 1;
    }
    /**
     * @return [node, isRight]
     */
    _search(key) {
        const key_comp = this.key_comp;
        let bound = this._Myhead;
        let node = bound._Parent;
        let parent = node;
        let isRight = true;
        while (!node._Isnil) {
            parent = node;
            if (key_comp(node._Myval.first, key)) {
                isRight = true;
                node = node._Right;
            }
            else {
                isRight = false;
                bound = node;
                node = node._Left;
            }
        }
        return { bound, parent, isRight };
    }
    _Lrotate(_Wherenode) {
        // promote right node to root of subtree
        const _Pnode = _Wherenode._Right;
        _Wherenode._Right = _Pnode._Left;
        if (!_Pnode._Left._Isnil) {
            _Pnode._Left._Parent = _Wherenode;
        }
        _Pnode._Parent = _Wherenode._Parent;
        const _Myhead = this._Myhead;
        if (_Wherenode.equalsptr(_Myhead._Parent)) {
            _Myhead._Parent = _Pnode;
        }
        else if (_Wherenode.equalsptr(_Wherenode._Parent._Left)) {
            _Wherenode._Parent._Left = _Pnode;
        }
        else {
            _Wherenode._Parent._Right = _Pnode;
        }
        _Pnode._Left = _Wherenode;
        _Wherenode._Parent = _Pnode;
    }
    _Rrotate(_Wherenode) {
        // promote left node to root of subtree
        const _Pnode = _Wherenode._Left;
        _Wherenode._Left = _Pnode._Right;
        if (!_Pnode._Right._Isnil) {
            _Pnode._Right._Parent = _Wherenode;
        }
        _Pnode._Parent = _Wherenode._Parent;
        const _Myhead = this._Myhead;
        if (_Wherenode.equalsptr(_Myhead._Parent)) {
            _Myhead._Parent = _Pnode;
        }
        else if (_Wherenode.equalsptr(_Wherenode._Parent._Right)) {
            _Wherenode._Parent._Right = _Pnode;
        }
        else {
            _Wherenode._Parent._Left = _Pnode;
        }
        _Pnode._Right = _Wherenode;
        _Wherenode._Parent = _Pnode;
    }
    _insert(key) {
        const { parent, bound, isRight } = this._search(key);
        if (!bound._Isnil && !this.key_comp(key, bound._Myval.first)) {
            return [bound, false];
        }
        const size = this.size() + 1;
        this.setUint64WithFloat(size, 8);
        const _Head = this._Myhead;
        const _Newnode = this.nodeType.allocate();
        _Newnode._Myval.construct();
        _Newnode._Myval.setFirst(key);
        _Newnode._Isnil = 0;
        _Newnode._Left = _Head;
        _Newnode._Right = _Head;
        _Newnode._Parent = parent;
        if (parent.equalsptr(_Head)) {
            // first node in tree, just set head values
            _Newnode._Color = _Redbl._Black; // the root is black
            _Head._Left = _Newnode;
            _Head._Parent = _Newnode;
            _Head._Right = _Newnode;
            return [_Newnode, true];
        }
        _Newnode._Color = _Redbl._Red;
        if (isRight) {
            // add to right of parent
            parent._Right = _Newnode;
            if (parent.equalsptr(_Head._Right)) {
                // remember rightmost node
                _Head._Right = _Newnode;
            }
        }
        else {
            // add to left of parent
            parent._Left = _Newnode;
            if (parent.equalsptr(_Head._Left)) {
                // remember leftmost node
                _Head._Left = _Newnode;
            }
        }
        for (let _Pnode = _Newnode; _Pnode._Parent._Color === _Redbl._Red;) {
            if (_Pnode._Parent.equalsptr(_Pnode._Parent._Parent._Left)) {
                // fixup red-red in left subtree
                const _Parent_sibling = _Pnode._Parent._Parent._Right;
                if (_Parent_sibling._Color === _Redbl._Red) {
                    // parent's sibling has two red children, blacken both
                    _Pnode._Parent._Color = _Redbl._Black;
                    _Parent_sibling._Color = _Redbl._Black;
                    _Pnode._Parent._Parent._Color = _Redbl._Red;
                    _Pnode = _Pnode._Parent._Parent;
                }
                else {
                    // parent's sibling has red and black children
                    if (_Pnode.equalsptr(_Pnode._Parent._Right)) {
                        // rotate right child to left
                        _Pnode = _Pnode._Parent;
                        this._Lrotate(_Pnode);
                    }
                    _Pnode._Parent._Color = _Redbl._Black; // propagate red up
                    _Pnode._Parent._Parent._Color = _Redbl._Red;
                    this._Rrotate(_Pnode._Parent._Parent);
                }
            }
            else {
                // fixup red-red in right subtree
                const _Parent_sibling = _Pnode._Parent._Parent._Left;
                if (_Parent_sibling._Color === _Redbl._Red) {
                    // parent's sibling has two red children, blacken both
                    _Pnode._Parent._Color = _Redbl._Black;
                    _Parent_sibling._Color = _Redbl._Black;
                    _Pnode._Parent._Parent._Color = _Redbl._Red;
                    _Pnode = _Pnode._Parent._Parent;
                }
                else {
                    // parent's sibling has red and black children
                    if (_Pnode.equalsptr(_Pnode._Parent._Left)) {
                        // rotate left child to right
                        _Pnode = _Pnode._Parent;
                        this._Rrotate(_Pnode);
                    }
                    _Pnode._Parent._Color = _Redbl._Black; // propagate red up
                    _Pnode._Parent._Parent._Color = _Redbl._Red;
                    this._Lrotate(_Pnode._Parent._Parent);
                }
            }
        }
        _Head._Parent._Color = _Redbl._Black; // root is always black
        return [_Newnode, true];
    }
    _Extract(node) {
        const _Erasednode = node; // node to erase
        const _Myhead = this._Myhead;
        let _Fixnode; // the node to recolor as needed
        let _Fixnodeparent; // parent of _Fixnode (which may be nil)
        let _Pnode = _Erasednode;
        if (_Pnode._Left._Isnil) {
            _Fixnode = _Pnode._Right; // stitch up right subtree
        }
        else if (_Pnode._Right._Isnil) {
            _Fixnode = _Pnode._Left; // stitch up left subtree
        }
        else {
            // two subtrees, must lift successor node to replace erased
            _Pnode = node; // _Pnode is successor node
            _Fixnode = _Pnode._Right; // _Fixnode is only subtree
        }
        if (_Pnode.equalsptr(_Erasednode)) {
            // at most one subtree, relink it
            _Fixnodeparent = _Erasednode._Parent;
            if (!_Fixnode._Isnil) {
                _Fixnode._Parent = _Fixnodeparent; // link up
            }
            if (_Myhead._Parent.equalsptr(_Erasednode)) {
                _Myhead._Parent = _Fixnode; // link down from root
            }
            else if (_Fixnodeparent._Left.equalsptr(_Erasednode)) {
                _Fixnodeparent._Left = _Fixnode; // link down to left
            }
            else {
                _Fixnodeparent._Right = _Fixnode; // link down to right
            }
            if (_Myhead._Left.equalsptr(_Erasednode)) {
                _Myhead._Left = _Fixnode._Isnil
                    ? _Fixnodeparent // smallest is parent of erased node
                    : _Min(_Fixnode); // smallest in relinked subtree
            }
            if (_Myhead._Right.equalsptr(_Erasednode)) {
                _Myhead._Right = _Fixnode._Isnil
                    ? _Fixnodeparent // largest is parent of erased node
                    : _Max(_Fixnode); // largest in relinked subtree
            }
        }
        else {
            // erased has two subtrees, _Pnode is successor to erased
            _Erasednode._Left._Parent = _Pnode; // link left up
            _Pnode._Left = _Erasednode._Left; // link successor down
            if (_Pnode.equalsptr(_Erasednode._Right)) {
                _Fixnodeparent = _Pnode; // successor is next to erased
            }
            else {
                // successor further down, link in place of erased
                _Fixnodeparent = _Pnode._Parent; // parent is successor's
                if (!_Fixnode._Isnil) {
                    _Fixnode._Parent = _Fixnodeparent; // link fix up
                }
                _Fixnodeparent._Left = _Fixnode; // link fix down
                _Pnode._Right = _Erasednode._Right; // link next down
                _Erasednode._Right._Parent = _Pnode; // right up
            }
            if (_Myhead._Parent.equalsptr(_Erasednode)) {
                _Myhead._Parent = _Pnode; // link down from root
            }
            else if (_Erasednode._Parent._Left.equalsptr(_Erasednode)) {
                _Erasednode._Parent._Left = _Pnode; // link down to left
            }
            else {
                _Erasednode._Parent._Right = _Pnode; // link down to right
            }
            _Pnode._Parent = _Erasednode._Parent; // link successor up
            const swap = _Pnode._Color;
            _Pnode._Color = _Erasednode._Color;
            _Erasednode._Color = swap; // recolor it
        }
        if (_Erasednode._Color === _Redbl._Black) {
            // erasing black link, must recolor/rebalance tree
            for (; !_Fixnode.equalsptr(_Myhead._Parent) && _Fixnode._Color === _Redbl._Black; _Fixnodeparent = _Fixnode._Parent) {
                if (_Fixnode.equalsptr(_Fixnodeparent._Left)) {
                    // fixup left subtree
                    _Pnode = _Fixnodeparent._Right;
                    if (_Pnode._Color === _Redbl._Red) {
                        // rotate red up from right subtree
                        _Pnode._Color = _Redbl._Black;
                        _Fixnodeparent._Color = _Redbl._Red;
                        this._Lrotate(_Fixnodeparent);
                        _Pnode = _Fixnodeparent._Right;
                    }
                    if (_Pnode._Isnil) {
                        _Fixnode = _Fixnodeparent; // shouldn't happen
                    }
                    else if (_Pnode._Left._Color === _Redbl._Black && _Pnode._Right._Color === _Redbl._Black) {
                        // redden right subtree with black children
                        _Pnode._Color = _Redbl._Red;
                        _Fixnode = _Fixnodeparent;
                    }
                    else {
                        // must rearrange right subtree
                        if (_Pnode._Right._Color === _Redbl._Black) {
                            // rotate red up from left sub-subtree
                            _Pnode._Left._Color = _Redbl._Black;
                            _Pnode._Color = _Redbl._Red;
                            this._Rrotate(_Pnode);
                            _Pnode = _Fixnodeparent._Right;
                        }
                        _Pnode._Color = _Fixnodeparent._Color;
                        _Fixnodeparent._Color = _Redbl._Black;
                        _Pnode._Right._Color = _Redbl._Black;
                        this._Lrotate(_Fixnodeparent);
                        break; // tree now recolored/rebalanced
                    }
                }
                else {
                    // fixup right subtree
                    _Pnode = _Fixnodeparent._Left;
                    if (_Pnode._Color === _Redbl._Red) {
                        // rotate red up from left subtree
                        _Pnode._Color = _Redbl._Black;
                        _Fixnodeparent._Color = _Redbl._Red;
                        this._Rrotate(_Fixnodeparent);
                        _Pnode = _Fixnodeparent._Left;
                    }
                    if (_Pnode._Isnil) {
                        _Fixnode = _Fixnodeparent; // shouldn't happen
                    }
                    else if (_Pnode._Right._Color === _Redbl._Black && _Pnode._Left._Color === _Redbl._Black) {
                        // redden left subtree with black children
                        _Pnode._Color = _Redbl._Red;
                        _Fixnode = _Fixnodeparent;
                    }
                    else {
                        // must rearrange left subtree
                        if (_Pnode._Left._Color === _Redbl._Black) {
                            // rotate red up from right sub-subtree
                            _Pnode._Right._Color = _Redbl._Black;
                            _Pnode._Color = _Redbl._Red;
                            this._Lrotate(_Pnode);
                            _Pnode = _Fixnodeparent._Left;
                        }
                        _Pnode._Color = _Fixnodeparent._Color;
                        _Fixnodeparent._Color = _Redbl._Black;
                        _Pnode._Left._Color = _Redbl._Black;
                        this._Rrotate(_Fixnodeparent);
                        break; // tree now recolored/rebalanced
                    }
                }
            }
            _Fixnode._Color = _Redbl._Black; // stopping node is black
        }
        const size = this.size();
        if (0 < size) {
            this.setUint64WithFloat(size - 1, 8);
        }
        return _Erasednode;
    }
    _Eqrange(_Keyval) {
        // find range of nodes equivalent to _Keyval
        const _Myhead = this._Myhead;
        let _Pnode = _Myhead._Parent;
        let _Lonode = _Myhead; // end() if search fails
        let _Hinode = _Myhead; // end() if search fails
        while (!_Pnode._Isnil) {
            const _Nodekey = _Pnode._Myval.first;
            if (this.key_comp(_Nodekey, _Keyval)) {
                _Pnode = _Pnode._Right; // descend right subtree
            }
            else {
                // _Pnode not less than _Keyval, remember it
                if (_Hinode._Isnil && this.key_comp(_Keyval, _Nodekey)) {
                    _Hinode = _Pnode; // _Pnode greater, remember it
                }
                _Lonode = _Pnode;
                _Pnode = _Pnode._Left; // descend left subtree
            }
        }
        _Pnode = _Hinode._Isnil ? _Myhead._Parent : _Hinode._Left; // continue scan for upper bound
        while (!_Pnode._Isnil) {
            if (this.key_comp(_Keyval, _Pnode._Myval.first)) {
                // _Pnode greater than _Keyval, remember it
                _Hinode = _Pnode;
                _Pnode = _Pnode._Left; // descend left subtree
            }
            else {
                _Pnode = _Pnode._Right; // descend right subtree
            }
        }
        return [_Lonode, _Hinode];
    }
    _delete(node) {
        this._Extract(node);
        node._Myval.destruct();
        nativeclass_1.NativeClass.delete(node._Myval);
    }
    _deleteAll(_First, _Last) {
        const head = this._Myhead;
        if (_First.equalsptr(head._Left) && _Last._Isnil) {
            // erase all
            this.clear();
            return;
        }
        // partial erase, one at a time
        while (!_First.equalsptr(_Last)) {
            const next = _First.next();
            this._delete(_First);
            _First = next;
        }
        return;
    }
    _Erase_tree(_Rootnode) {
        while (!_Rootnode._Isnil) {
            // free subtrees, then node
            this._Erase_tree(_Rootnode._Right);
            const deleteTarget = _Rootnode;
            _Rootnode = _Rootnode._Left;
            deleteTarget._Myval.destruct();
            nativeclass_1.NativeClass.delete(deleteTarget);
        }
    }
    has(key) {
        const { bound } = this._search(key);
        return !bound._Isnil && !this.key_comp(key, bound._Myval.first);
    }
    /**
     * @return it returns null if not found. it does not return undefined
     */
    get(key) {
        const { bound } = this._search(key);
        if (bound._Isnil || this.key_comp(key, bound._Myval.first))
            return null;
        return bound._Myval.second;
    }
    /**
     * it returns the [pair, boolean].
     * - first item (pair)
     * it's std::pair<K, V>, and it can be modified
     * - second item (boolean)
     * if it insert new, return true for second item.
     * if the item is already there, return false for second item.
     */
    insert(key, value) {
        const [node, inserted] = this._insert(key);
        if (inserted && value != null)
            node._Myval.setSecond(value);
        return [node._Myval, inserted];
    }
    set(key, value) {
        const [node] = this.insert(key);
        node.setSecond(value);
    }
    delete(key) {
        const [min, max] = this._Eqrange(key);
        if (min.equalsptr(max))
            return false;
        this._deleteAll(min, max);
        return true;
    }
    clear() {
        const _Head = this._Myhead;
        this._Erase_tree(_Head._Parent);
        _Head._Parent = _Head;
        _Head._Left = _Head;
        _Head._Right = _Head;
        this.setUint64WithFloat(0, 8);
    }
    /**
     * @deprecated Typo!
     */
    entires() {
        return this.entries();
    }
    *entries() {
        let node = this._Myhead._Left;
        while (!node._Isnil) {
            const pair = node._Myval;
            const next = node.next();
            yield [pair.first, pair.second];
            node = next;
        }
    }
    *keys() {
        let node = this._Myhead._Left;
        while (!node._Isnil) {
            const pair = node._Myval;
            const next = node.next();
            yield pair.first;
            node = next;
        }
    }
    *values() {
        let node = this._Myhead._Left;
        while (!node._Isnil) {
            const pair = node._Myval;
            const next = node.next();
            yield pair.second;
            node = next;
        }
    }
    static make(k, v) {
        const comptype = cxxpair_1.CxxPair.make(k, v);
        const nodetype = CxxTreeNode.make(comptype);
        const key_comp = cxxfunctional_1.CxxLess.make(k);
        return singleton_1.Singleton.newInstance(CxxMap, comptype, () => {
            let CxxMapImpl = class CxxMapImpl extends CxxMap {
            };
            CxxMapImpl.componentType = comptype;
            CxxMapImpl.key_comp = key_comp;
            CxxMapImpl = tslib_1.__decorate([
                (0, nativeclass_1.nativeClass)(0x10)
            ], CxxMapImpl);
            CxxMapImpl.prototype.componentType = comptype;
            CxxMapImpl.prototype.nodeType = nodetype;
            CxxMapImpl.prototype.key_comp = key_comp;
            Object.defineProperties(CxxMapImpl, {
                name: { value: `CxxMap<${k.name}, ${v.name}>` },
                symbol: { value: getMapSymbol(comptype) },
            });
            return CxxMapImpl;
        });
    }
    toArray() {
        return [...this.entries()];
    }
    [util.inspect.custom](depth, options) {
        const map = new Map(this.toArray());
        return `CxxMap ${util.inspect(map, options).substr(4)}`;
    }
}
exports.CxxMap = CxxMap;
function getMapSymbol(pair) {
    const key = pair.firstType;
    const value = pair.secondType;
    return mangle_1.mangle.templateClass(["std", "map"], key.symbol, value.symbol, mangle_1.mangle.templateClass(["std", "less"], key.symbol), mangle_1.mangle.templateClass(["std", "allocator"], pair.symbol));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3h4bWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3h4bWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw4Q0FBOEM7QUFDOUMsdURBQXVEOzs7O0FBRXZELDZCQUE2QjtBQUM3QixpQ0FBOEI7QUFDOUIsbURBQTBDO0FBQzFDLHVDQUFpRDtBQUNqRCxxQ0FBa0M7QUFDbEMsK0NBQXVGO0FBQ3ZGLDZDQUF3RDtBQUN4RCwyQ0FBd0M7QUFFeEMsSUFBSyxNQUdKO0FBSEQsV0FBSyxNQUFNO0lBQ1AsbUNBQUksQ0FBQTtJQUNKLHVDQUFNLENBQUE7QUFDVixDQUFDLEVBSEksTUFBTSxLQUFOLE1BQU0sUUFHVjtBQUlELE1BQWUsV0FBbUMsU0FBUSx5QkFBVztJQVFqRSxJQUFJO1FBQ0EsSUFBSSxJQUFJLEdBQW1CLElBQUksQ0FBQztRQUNoQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ3BCLGtDQUFrQztZQUNsQyxJQUFJLE1BQXNCLENBQUM7WUFDM0IsT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3JFLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxpQ0FBaUM7YUFDbkQ7WUFFRCxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsNkJBQTZCO1NBQy9DO2FBQU07WUFDSCxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGdDQUFnQztTQUM3RDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxJQUFJLEdBQW1CLElBQUksQ0FBQztRQUNoQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLHNCQUFzQjtTQUM3Qzth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