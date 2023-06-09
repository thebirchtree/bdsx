"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEx = exports.Event = void 0;
const common_1 = require("./common");
const source_map_support_1 = require("./source-map-support");
class Event {
    constructor() {
        this.listeners = [];
        this.installer = null;
        this.uninstaller = null;
    }
    /**
     * call the installer when first listener registered.
     */
    setInstaller(installer, uninstaller = null) {
        if (this.listeners.length !== 0) {
            if (this.uninstaller !== null) {
                this.uninstaller();
            }
            installer();
            if (uninstaller === null) {
                this.installer = null;
            }
            else {
                this.installer = installer;
            }
        }
        else {
            this.installer = installer;
        }
        this.uninstaller = uninstaller;
    }
    /**
     * pipe two events
     * it uses setInstaller
     */
    pipe(target, piper) {
        const pipe = ((...args) => piper.call(this, ...args));
        this.setInstaller(() => target.on(pipe), () => target.remove(pipe));
    }
    isEmpty() {
        return this.listeners.length === 0;
    }
    /**
     * cancel event if it returns non-undefined value
     */
    on(listener) {
        if (this.listeners.length === 0 && this.installer !== null) {
            this.installer();
            if (this.uninstaller === null) {
                this.installer = null;
            }
        }
        this.listeners.push(listener);
    }
    once(listener) {
        const that = this;
        function callback(...args) {
            that.remove(callback);
            return listener(...args);
        }
        this.listeners.push(callback);
    }
    promise() {
        return new Promise(resolve => this.once(resolve));
    }
    onFirst(listener) {
        this.listeners.unshift(listener);
    }
    onLast(listener) {
        this.listeners.push(listener);
    }
    onBefore(listener, needle) {
        const idx = this.listeners.indexOf(needle);
        if (idx === -1)
            throw Error("needle not found");
        this.listeners.splice(idx, 0, listener);
    }
    onAfter(listener, needle) {
        const idx = this.listeners.indexOf(needle);
        if (idx === -1)
            throw Error("needle not found");
        this.listeners.splice(idx + 1, 0, listener);
    }
    remove(listener) {
        const idx = this.listeners.indexOf(listener);
        if (idx === -1)
            return false;
        this.listeners.splice(idx, 1);
        if (this.listeners.length === 0 && this.uninstaller != null) {
            this.uninstaller();
        }
        return true;
    }
    /**
     * return value if it canceled
     */
    _fireWithoutErrorHandling(...v) {
        for (const listener of this.listeners.slice()) {
            try {
                const ret = listener(...v);
                if (ret === common_1.CANCEL)
                    return common_1.CANCEL;
                if (typeof ret === "number")
                    return ret;
            }
            catch (err) {
                (0, source_map_support_1.remapAndPrintError)(err);
            }
        }
        return undefined;
    }
    static reportError(err) {
        const res = Event.errorHandler._fireWithoutErrorHandling(err);
        if (res == null) {
            (0, source_map_support_1.remapAndPrintError)(err);
        }
    }
    /**
     * return value if it canceled
     */
    promiseFire(...v) {
        const res = this.listeners.slice().map(listener => listener(...v));
        return Promise.all(res);
    }
    /**
     * return value if it canceled
     */
    fire(...v) {
        for (const listener of this.listeners.slice()) {
            try {
                const ret = listener(...v);
                if (ret === common_1.CANCEL)
                    return common_1.CANCEL;
                if (typeof ret === "number")
                    return ret;
            }
            catch (err) {
                Event.reportError(err);
            }
        }
    }
    /**
     * reverse listener orders
     * return value if it canceled
     */
    fireReverse(...v) {
        for (const listener of this.listeners.slice().reverse()) {
            try {
                const ret = listener(...v);
                if (ret === common_1.CANCEL)
                    return common_1.CANCEL;
                if (typeof ret === "number")
                    return ret;
            }
            catch (err) {
                Event.reportError(err);
            }
        }
    }
    allListeners() {
        return this.listeners.values();
    }
    /**
     * remove all listeners
     */
    clear() {
        this.listeners.length = 0;
    }
}
exports.Event = Event;
Event.errorHandler = new Event();
/**
 * @deprecated use Event.setInstaller
 */
class EventEx extends Event {
    onStarted() {
        // empty
    }
    onCleared() {
        // empty
    }
    on(listener) {
        if (this.isEmpty())
            this.onStarted();
        super.on(listener);
    }
    remove(listener) {
        if (!super.remove(listener))
            return false;
        if (this.isEmpty())
            this.onCleared();
        return true;
    }
}
exports.EventEx = EventEx;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnR0YXJnZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJldmVudHRhcmdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBK0M7QUFDL0MsNkRBQTBEO0FBWTFELE1BQWEsS0FBSztJQUFsQjtRQUNxQixjQUFTLEdBQXVCLEVBQUUsQ0FBQztRQUM1QyxjQUFTLEdBQXdCLElBQUksQ0FBQztRQUN0QyxnQkFBVyxHQUF3QixJQUFJLENBQUM7SUF5S3BELENBQUM7SUF2S0c7O09BRUc7SUFDSCxZQUFZLENBQUMsU0FBcUIsRUFBRSxjQUFtQyxJQUFJO1FBQ3ZFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzdCLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUN0QjtZQUNELFNBQVMsRUFBRSxDQUFDO1lBRVosSUFBSSxXQUFXLEtBQUssSUFBSSxFQUFFO2dCQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzthQUN6QjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQzthQUM5QjtTQUNKO2FBQU07WUFDSCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztTQUM5QjtRQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFJLENBQWtELE1BQWlCLEVBQUUsS0FBOEQ7UUFDbkksTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFzQixDQUFDO1FBQzNFLElBQUksQ0FBQyxZQUFZLENBQ2IsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFDckIs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