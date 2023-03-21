"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bin = void 0;
function shrinkZero(values) {
    for (let j = values.length - 1; j >= 0; j--) {
        if (values[j] !== 0) {
            values.length = j + 1;
            break;
        }
    }
}
function add_with_offset(a, b, offset) {
    let minn;
    let maxn;
    const alen = a.length;
    const blen = offset + b.length;
    let maxoff;
    if (alen < blen) {
        minn = a.length;
        maxn = blen;
        maxoff = offset;
    }
    else {
        minn = blen;
        maxn = a.length;
        maxoff = 0;
    }
    let v = 0;
    let i = 0;
    for (; i < minn; i++) {
        v += a[i];
        v += b.charCodeAt(i - offset);
        a[i] = v & 0xffff;
        v >>= 16;
    }
    if (alen < blen) {
        for (; i < maxn; i++) {
            v += b.charCodeAt(i - maxoff);
            a.push(v & 0xffff);
            v >>= 16;
        }
    }
    else {
        for (; i < maxn; i++) {
            v += a[i];
            a[i] = v & 0xffff;
            v >>= 16;
            if (v === 0)
                return;
        }
    }
    a.push(v);
}
var bin;
(function (bin) {
    function isZero(value) {
        for (let i = 0; i < value.length; i++) {
            if (value.charCodeAt(i) !== 0)
                return false;
        }
        return true;
    }
    bin.isZero = isZero;
    function uint8(value) {
        return value.length !== 0 ? value.charCodeAt(0) & 0xff : 0;
    }
    bin.uint8 = uint8;
    function uint16(value) {
        return value.length !== 0 ? value.charCodeAt(0) : 0;
    }
    bin.uint16 = uint16;
    function int32(value) {
        if (value.length >= 2) {
            return (value.charCodeAt(1) << 16) | value.charCodeAt(0);
        }
        else if (value.length === 0) {
            return 0;
        }
        else {
            return value.charCodeAt(0);
        }
    }
    bin.int32 = int32;
    function int32_high(value) {
        if (value.length >= 4) {
            return (value.charCodeAt(3) << 16) | value.charCodeAt(2);
        }
        else if (value.length >= 3) {
            return value.charCodeAt(2);
        }
        else {
            return 0;
        }
    }
    bin.int32_high = int32_high;
    function int32_2(value) {
        if (value.length >= 4) {
            return [(value.charCodeAt(1) << 16) | value.charCodeAt(0), (value.charCodeAt(3) << 16) | value.charCodeAt(2)];
        }
        if (value.length >= 2) {
            if (value.length === 3) {
                return [(value.charCodeAt(1) << 16) | value.charCodeAt(0), value.charCodeAt(2)];
            }
            else {
                return [(value.charCodeAt(1) << 16) | value.charCodeAt(0), 0];
            }
        }
        else if (value.length === 0) {
            return [0, 0];
        }
        else {
            return [value.charCodeAt(0), 0];
        }
    }
    bin.int32_2 = int32_2;
    function make64(low, high) {
        const v1 = low & 0xffff;
        const v2 = low >>> 16;
        const v3 = high & 0xffff;
        const v4 = high >>> 16;
        return String.fromCharCode(v1, v2, v3, v4);
    }
    bin.make64 = make64;
    function make128(a, b, c, d) {
        const a1 = a & 0xffff;
        const a2 = a >>> 16;
        const b1 = b & 0xffff;
        const b2 = b >>> 16;
        const c1 = c & 0xffff;
        const c2 = c >>> 16;
        const d1 = d & 0xffff;
        const d2 = d >>> 16;
        return String.fromCharCode(a1, a2, b1, b2, c1, c2, d1, d2);
    }
    bin.make128 = make128;
    function toNumber(v) {
        let out = 0;
        let mult = 1;
        const len = v.length;
        for (let i = 0; i < len; i++) {
            out += v.charCodeAt(i) * mult;
            mult *= 0x10000;
        }
        return out;
    }
    bin.toNumber = toNumber;
    function makeVar(n) {
        n = Math.floor(n);
        if (n < 0)
            n = 0;
        const out = [];
        for (let i = 0; n !== 0; i++) {
            out[i] = n % 0x10000;
            n = Math.floor(n / 0x10000);
        }
        return String.fromCharCode(...out);
    }
    bin.makeVar = makeVar;
    function make(n, wordsize) {
        n = Math.floor(n);
        if (n < 0)
            n = 0;
        const out = new Array(wordsize);
        for (let i = 0; i < wordsize; i++) {
            out[i] = n % 0x10000;
            n = Math.floor(n / 0x10000);
        }
        return String.fromCharCode(...out);
    }
    bin.make = make;
    function fromBuffer(buffer, pad = 0) {
        const dest = new Uint16Array((buffer.length + 1) >> 1);
        const words = buffer.length & ~1;
        let j = 0;
        let i = 0;
        for (; i !== words;) {
            const low = buffer[i++];
            const high = buffer[i++];
            dest[j++] = (high << 16) | low;
        }
        if (i !== buffer.length) {
            const low = buffer[i];
            dest[j++] = (pad << 16) | low;
        }
        return String.fromCharCode(...dest);
    }
    bin.fromBuffer = fromBuffer;
    /**
     * similar to parseInt but make it as a bin.
     * throw the error if it's not a number.
     */
    function parse(v, radix, wordsize) {
        let idx = 0;
        if (radix == null) {
            _loop: for (;;) {
                const chr = v.charCodeAt(idx);
                switch (chr) {
                    case 0x09:
                    case 0x0d:
                    case 0x20: // space
                        idx++;
                        continue;
                    case 0x30: // zero start
                        if (v.length === 1)
                            return ""; // just '0'
                        idx++;
                        switch (v.charCodeAt(idx)) {
                            case 0x30:
                            case 0x31:
                            case 0x32:
                            case 0x33:
                            case 0x34:
                            case 0x35:
                            case 0x36:
                            case 0x37:
                            case 0x38:
                            case 0x39: // numeric
                                radix = 10;
                                break;
                            case 0x58:
                            case 0x78: // X x
                                idx++;
                                radix = 16;
                                break;
                            case 0x42:
                            case 0x62: // B b
                                idx++;
                                radix = 2;
                                break;
                            case 0x4f:
                            case 0x6f: // O o
                                idx++;
                                radix = 8;
                                break;
                            default:
                                throw Error(`${v}: is not a number`);
                        }
                        break _loop;
                    case 0x31:
                    case 0x32:
                    case 0x33:
                    case 0x34:
                    case 0x35:
                    case 0x36:
                    case 0x37:
                    case 0x38:
                    case 0x39: // numeric
                        radix = 10;
                        break _loop;
                    default:
                        throw Error(`${v}: is not a number`);
                }
            }
        }
        if (radix < 2 || radix > 36)
            throw Error(`parse() radix argument must be between 2 and 36`);
        const values = [0];
        function mulRadix() {
            n *= radix;
            let i = 1;
            let carry = n >>> 16;
            n &= 0xffff;
            for (;;) {
                if (i === values.length) {
                    if (carry !== 0) {
                        values.push(carry);
                    }
                    break;
                }
                const n = values[i] * radix + carry;
                values[i++] = n & 0xffff;
                carry = n >>> 16;
            }
        }
        function carry() {
            let i = 1;
            for (;;) {
                if (i === values.length) {
                    values.push(1);
                    break;
                }
                const n = values[i];
                if (n === 0xffff) {
                    values[i] = 0;
                    continue;
                }
                values[i++] = n + 1;
                break;
            }
        }
        let n = 0;
        for (;;) {
            if (idx === v.length) {
                values[0] = n;
                if (wordsize != null) {
                    const oldsize = values.length;
                    values.length = wordsize;
                    for (let i = oldsize; i < wordsize; i++) {
                        values[i] = 0;
                    }
                }
                return String.fromCharCode(...values);
            }
            mulRadix();
            const chr = v.charCodeAt(idx++);
            let add;
            if (0x30 <= chr && chr <= 0x39) {
                // numeric
                add = chr - 0x30;
            }
            else if (0x41 <= chr && chr <= 0x5a) {
                // upper case
                add = chr - (0x41 - 10);
            }
            else if (0x61 <= chr && chr <= 0x7a) {
                // lower case
                add = chr - (0x61 - 10);
            }
            else {
                throw Error(`${v}: is not a number`);
            }
            if (add >= radix)
                throw Error(`${v}: is not a number`);
            n += add;
            if (n > 0xffff) {
                n -= 0x10000;
                carry();
            }
        }
    }
    bin.parse = parse;
    function toString(v, radix = 10) {
        if (radix < 2 || radix > 36)
            throw Error(`toString() radix argument must be between 2 and 36`);
        let len = v.length;
        do {
            if (len === 0)
                return "0";
            len--;
        } while (v.charCodeAt(len) === 0);
        len++;
        v = v.substr(0, len);
        const out = [];
        for (;;) {
            const [quotient, remainder] = bin.divn(v, radix);
            if (remainder < 10) {
                out.push(remainder + 0x30);
            }
            else {
                out.push(remainder + (0x61 - 10));
            }
            v = quotient;
            const last = v.length - 1;
            if (v.charCodeAt(last) === 0)
                v = v.substr(0, last);
            if (v === "")
                break;
        }
        out.reverse();
        return String.fromCharCode(...out);
    }
    bin.toString = toString;
    function add(a, b) {
        let maxtext;
        let minn;
        let maxn;
        if (a.length < b.length) {
            maxtext = b;
            minn = a.length;
            maxn = b.length;
        }
        else {
            maxtext = a;
            minn = b.length;
            maxn = a.length;
        }
        const values = new Array(maxn);
        let v = 0;
        let i = 0;
        for (; i < minn; i++) {
            v += a.charCodeAt(i);
            v += b.charCodeAt(i);
            values[i] = v & 0xffff;
            v >>= 16;
        }
        for (; i < maxn; i++) {
            v += maxtext.charCodeAt(i);
            values[i] = v & 0xffff;
            v >>= 16;
        }
        // if (v !== 0) values.push(v);
        return String.fromCharCode(...values);
    }
    bin.add = add;
    function zero(wordsize) {
        return "\0".repeat(wordsize);
    }
    bin.zero = zero;
    function sub(a, b) {
        const alen = a.length;
        const blen = b.length;
        const values = new Array(alen);
        let v = 0;
        for (let i = alen; i < blen; i++) {
            if (b.charCodeAt(i) !== 0)
                return bin.zero(alen);
        }
        let i = 0;
        for (; i < blen; i++) {
            v += a.charCodeAt(i);
            v -= b.charCodeAt(i);
            values[i] = v & 0xffff;
            v >>= 16;
        }
        for (; i < alen; i++) {
            v += a.charCodeAt(i);
            values[i] = v & 0xffff;
            v >>= 16;
        }
        if (v !== 0)
            return bin.zero(alen);
        // shrinkZero(values);
        return String.fromCharCode(...values);
    }
    bin.sub = sub;
    function divn(a, b) {
        const alen = a.length;
        const out = new Array(alen);
        let v = 0;
        for (let i = a.length - 1; i >= 0; i--) {
            v *= 0x10000;
            v += a.charCodeAt(i);
            out[i] = Math.floor(v / b);
            v %= b;
        }
        // shrinkZero(values);
        return [String.fromCharCode(...out), v];
    }
    bin.divn = divn;
    function muln(a, b) {
        let v = 0;
        const n = a.length;
        const out = new Array(n);
        for (let i = 0; i < n; i++) {
            v += a.charCodeAt(i) * b;
            out[i] = v % 0x10000;
            v = Math.floor(v / 0x10000);
        }
        // while (v !== 0)
        // {
        //     out.push(v % 0x10000);
        //     v = Math.floor(v / 0x10000);
        // }
        return String.fromCharCode(...out);
    }
    bin.muln = muln;
    function mul(a, b) {
        const out = [];
        const alen = a.length;
        const blen = b.length;
        for (let j = 0; j < blen; j++) {
            const bn = b.charCodeAt(j);
            for (let i = 0; i < alen; i++) {
                add_with_offset(out, bin.muln(a, bn), j);
            }
        }
        return String.fromCharCode(...out);
    }
    bin.mul = mul;
    function bitand(a, b) {
        const minlen = Math.min(a.length, b.length);
        const out = new Array(minlen);
        for (let i = 0; i < minlen; i++) {
            out[i] = a.charCodeAt(i) & b.charCodeAt(i);
        }
        return String.fromCharCode(...out);
    }
    bin.bitand = bitand;
    function bitor(a, b) {
        let minstr;
        let maxstr;
        if (a.length < b.length) {
            minstr = a;
            maxstr = b;
        }
        else {
            maxstr = a;
            minstr = b;
        }
        const minlen = minstr.length;
        const maxlen = maxstr.length;
        const out = new Array(maxlen);
        let i = 0;
        for (; i < minlen; i++) {
            out[i] = maxstr.charCodeAt(i) | minstr.charCodeAt(i);
        }
        for (; i < maxlen; i++) {
            out[i] = maxstr.charCodeAt(i);
        }
        return String.fromCharCode(...out);
    }
    bin.bitor = bitor;
    function bitxor(a, b) {
        let minstr;
        let maxstr;
        if (a.length < b.length) {
            minstr = a;
            maxstr = b;
        }
        else {
            maxstr = a;
            minstr = b;
        }
        const minlen = minstr.length;
        const maxlen = maxstr.length;
        const out = new Array(maxlen);
        let i = 0;
        for (; i < minlen; i++) {
            out[i] = maxstr.charCodeAt(i) ^ minstr.charCodeAt(i);
        }
        for (; i < maxlen; i++) {
            out[i] = maxstr.charCodeAt(i);
        }
        return String.fromCharCode(...out);
    }
    bin.bitxor = bitxor;
    /**
     * bitwise shift right
     */
    function bitshr(a, shift) {
        const len = a.length;
        const values = new Array(len);
        let srci = (shift + 15) >> 4;
        shift -= (srci << 4) - 16;
        const ishift = 16 - shift;
        let dsti = 0;
        let v = 0;
        if (srci !== 0) {
            v = a.charCodeAt(srci - 1) >> shift;
        }
        while (srci < len) {
            const c = a.charCodeAt(srci++);
            v |= c << ishift;
            values[dsti++] = v;
            v <<= 16;
            v |= c >> shift;
        }
        while (dsti < len) {
            values[dsti++] = 0;
        }
        return String.fromCharCode(...values);
    }
    bin.bitshr = bitshr;
    /**
     * bitwise shift right
     */
    function bitshl(a, shift) {
        const len = a.length;
        const values = new Array(len);
        let dsti = shift >> 4;
        shift &= 0xf;
        let srci = 0;
        let v = 0;
        for (let i = 0; i < dsti; i++) {
            values[i] = 0;
        }
        while (dsti < len) {
            v |= a.charCodeAt(srci++) << shift;
            values[dsti++] = v;
            v >>= 16;
        }
        return String.fromCharCode(...values);
    }
    bin.bitshl = bitshl;
    function neg(a) {
        const n = a.length;
        if (n === 0)
            return a;
        let carry = 0;
        const out = new Array(n);
        let i = 0;
        {
            const v = a.charCodeAt(0);
            out[i] = -v;
            carry = +(v === 0);
        }
        for (; i < n; i++) {
            carry = ~a.charCodeAt(i) + carry;
            out[i] = carry & 0xffff;
            carry >>= 16;
        }
        return String.fromCharCode(...out);
    }
    bin.neg = neg;
    function reads32(str) {
        const n = str.length;
        const dwords = n & ~1;
        const outn = (n & 1) + dwords;
        const out = new Array(outn);
        let i = 0;
        for (; i < dwords; i++) {
            const i2 = i * 2;
            out[i] = str.charCodeAt(i2) | (str.charCodeAt(i2 + 1) << 16);
        }
        if (dwords !== outn) {
            out[i] = str.charCodeAt(i * 2);
        }
        return out;
    }
    bin.reads32 = reads32;
    /**
     * makes as hex bytes
     */
    function hex(a) {
        const out = [];
        function write(v) {
            if (v < 10) {
                out.push(v + 0x30);
            }
            else {
                out.push(v + (0x61 - 10));
            }
        }
        const n = a.length;
        for (let i = 0; i < n; i++) {
            const v = a.charCodeAt(i);
            write((v >> 4) & 0xf);
            write(v & 0xf);
            write((v >> 12) & 0xf);
            write((v >> 8) & 0xf);
        }
        return String.fromCharCode(...out);
    }
    bin.hex = hex;
    /**
     * similar with bin.hex(), but reversed byte by byte
     */
    function reversedHex(a) {
        const out = [];
        const write = (v) => {
            if (v < 10) {
                out.push(v + 0x30);
            }
            else {
                out.push(v + (0x61 - 10));
            }
        };
        const n = a.length;
        for (let i = n - 1; i >= 0; i--) {
            const v = a.charCodeAt(i);
            write((v >> 12) & 0xf);
            write((v >> 8) & 0xf);
            write((v >> 4) & 0xf);
            write(v & 0xf);
        }
        return String.fromCharCode(...out);
    }
    bin.reversedHex = reversedHex;
    function as64(v) {
        const n = v.length;
        if (n === 4)
            return v;
        if (n > 4)
            return v.substr(0, 4);
        return v + "\0".repeat(4 - n);
    }
    bin.as64 = as64;
    function compare(a, b) {
        const alen = a.length;
        const blen = b.length;
        let diff = alen - blen;
        if (diff < 0) {
            for (let i = alen; i !== blen; i++) {
                if (a.charCodeAt(i) === 0)
                    continue;
                return 1;
            }
        }
        else if (diff > 0) {
            for (let i = blen; i !== alen; i++) {
                if (a.charCodeAt(i) === 0)
                    continue;
                return -1;
            }
        }
        for (let i = blen - 1; i >= 0; i--) {
            diff = a.charCodeAt(i) - b.charCodeAt(i);
            if (diff !== 0)
                return diff;
        }
        return 0;
    }
    bin.compare = compare;
    bin.MAX_SAFE_INTEGER = makeVar(Number.MAX_SAFE_INTEGER);
})(bin = exports.bin || (exports.bin = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLFNBQVMsVUFBVSxDQUFDLE1BQWdCO0lBQ2hDLEtBQUssSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN6QyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDakIsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLE1BQU07U0FDVDtLQUNKO0FBQ0wsQ0FBQztBQUVELFNBQVMsZUFBZSxDQUFDLENBQVcsRUFBRSxDQUFTLEVBQUUsTUFBYztJQUMzRCxJQUFJLElBQVksQ0FBQztJQUNqQixJQUFJLElBQVksQ0FBQztJQUNqQixNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ3RCLE1BQU0sSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQy9CLElBQUksTUFBYyxDQUFDO0lBQ25CLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtRQUNiLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ2hCLElBQUksR0FBRyxJQUFJLENBQUM7UUFDWixNQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ25CO1NBQU07UUFDSCxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDaEIsTUFBTSxHQUFHLENBQUMsQ0FBQztLQUNkO0lBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsT0FBTyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFD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