"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverInstance = exports.ServerInstance = exports.MinecraftServerScriptEngine = exports.BaseGameVersion = exports.SemVersion = exports.ScriptFramework = exports.DedicatedServer = exports.Minecraft = exports.VanilaGameModuleServer = exports.VanillaGameModuleServer = exports.Minecraft$Something = exports.VanilaServerGameplayEventListener = exports.VanillaServerGameplayEventListener = exports.EntityRegistryOwned = exports.ServerMetricsImpl = exports.ServerMetrics = exports.PrivateKeyManager = exports.Whitelist = exports.ResourcePackManager = exports.MinecraftEventing = void 0;
const tslib_1 = require("tslib");
const common_1 = require("../common");
const event_1 = require("../event");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
class MinecraftEventing extends nativeclass_1.AbstractClass {
}
exports.MinecraftEventing = MinecraftEventing;
class ResourcePackManager extends nativeclass_1.AbstractClass {
}
exports.ResourcePackManager = ResourcePackManager;
class Whitelist extends nativeclass_1.AbstractClass {
}
exports.Whitelist = Whitelist;
class PrivateKeyManager extends nativeclass_1.AbstractClass {
}
exports.PrivateKeyManager = PrivateKeyManager;
class ServerMetrics extends nativeclass_1.AbstractClass {
}
exports.ServerMetrics = ServerMetrics;
class ServerMetricsImpl extends ServerMetrics {
}
exports.ServerMetricsImpl = ServerMetricsImpl;
class EntityRegistryOwned extends nativeclass_1.AbstractClass {
}
exports.EntityRegistryOwned = EntityRegistryOwned;
class VanillaServerGameplayEventListener extends nativeclass_1.AbstractClass {
}
exports.VanillaServerGameplayEventListener = VanillaServerGameplayEventListener;
/** @deprecated typo, use {@link VanillaServerGameplayEventListener} instead. */
exports.VanilaServerGameplayEventListener = VanillaServerGameplayEventListener;
/**
 * @deprecated
 * unknown instance
 */
class Minecraft$Something {
}
exports.Minecraft$Something = Minecraft$Something;
class VanillaGameModuleServer extends nativeclass_1.AbstractClass {
}
exports.VanillaGameModuleServer = VanillaGameModuleServer;
/** @deprecated typo, use {@link VanillaGameModuleServer} */
exports.VanilaGameModuleServer = VanillaGameModuleServer;
class Minecraft extends nativeclass_1.AbstractClass {
    /** @deprecated Use `Minecraft::getCommands` instead */
    get commands() {
        return this.getCommands();
    }
    /** @deprecated */
    get something() {
        return new Minecraft$Something();
    }
    /** @deprecated Use `Minecraft::getNetworkHandler` instead */
    get network() {
        return this.getNetworkHandler();
    }
    /**
     * @deprecated use bedrockServer.level
     */
    getLevel() {
        (0, common_1.abstract)();
    }
    /**
     * @deprecated use bedrockServer.networkSystem
     */
    getNetworkHandler() {
        (0, common_1.abstract)();
    }
    /**
     * @deprecated use bedrockServer.serverNetworkHandler
     */
    getServerNetworkHandler() {
        (0, common_1.abstract)();
    }
    /**
     * @deprecated use bedrockServer.minecraftCommands
     */
    getCommands() {
        (0, common_1.abstract)();
    }
    /**
     * @deprecated it's a kind of global variable. it will generate a JS instance per access.
     */
    getNonOwnerPointerServerNetworkHandler() {
        (0, common_1.abstract)();
    }
}
exports.Minecraft = Minecraft;
class DedicatedServer extends nativeclass_1.AbstractClass {
}
exports.DedicatedServer = DedicatedServer;
class ScriptFramework extends nativeclass_1.AbstractClass {
}
exports.ScriptFramework = ScriptFramework;
let SemVersion = class SemVersion extends nativeclass_1.AbstractClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint16_t)
], SemVersion.prototype, "major", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint16_t)
], SemVersion.prototype, "minor", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint16_t)
], SemVersion.prototype, "patch", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString, 0x08)
], SemVersion.prototype, "preRelease", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], SemVersion.prototype, "buildMeta", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], SemVersion.prototype, "fullVersionString", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], SemVersion.prototype, "validVersion", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], SemVersion.prototype, "anyVersion", void 0);
SemVersion = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x70)
], SemVersion);
exports.SemVersion = SemVersion;
class BaseGameVersion extends SemVersion {
}
exports.BaseGameVersion = BaseGameVersion;
class MinecraftServerScriptEngine extends ScriptFramework {
}
exports.MinecraftServerScriptEngine = MinecraftServerScriptEngine;
class ServerInstance extends nativeclass_1.AbstractClass {
    _disconnectAllClients(message) {
        (0, common_1.abstract)();
    }
    createDimension(id) {
        (0, common_1.abstract)();
    }
    /**
     * Returns the number of current online players
     */
    getActivePlayerCount() {
        (0, common_1.abstract)();
    }
    /**
     * Disconnects all clients with the given message
     */
    disconnectAllClients(message = "disconnectionScreen.disconnected") {
        this._disconnectAllClients(message);
    }
    /**
     * Disconnects a specific client with the given message
     */
    disconnectClient(client, message = "disconnectionScreen.disconnected", skipMessage = false) {
        (0, common_1.abstract)();
    }
    /**
     * Returns the server's message-of-the-day
     */
    getMotd() {
        (0, common_1.abstract)();
    }
    /**
     * Changes the server's message-of-the-day
     */
    setMotd(motd) {
        (0, common_1.abstract)();
    }
    /**
     * Returns the server's maximum player capacity
     */
    getMaxPlayers() {
        (0, common_1.abstract)();
    }
    /**
     * Changes the server's maximum player capacity
     */
    setMaxPlayers(count) {
        (0, common_1.abstract)();
    }
    /**
     * Returns an array of all online players
     */
    getPlayers() {
        (0, common_1.abstract)();
    }
    /**
     * Resends all clients the updated command list
     */
    updateCommandList() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the server's current network protocol version
     */
    getNetworkProtocolVersion() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the server's current game version
     */
    getGameVersion() {
        (0, common_1.abstract)();
    }
    /**
     * Creates a promise that resolves on the next tick
     */
    nextTick() {
        return new Promise(resolve => {
            const listener = () => {
                resolve();
                event_1.events.levelTick.remove(listener);
            };
            event_1.events.levelTick.on(listener);
        });
    }
}
exports.ServerInstance = ServerInstance;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxzQ0FBcUM7QUFFckMsb0NBQWtDO0FBQ2xDLGdEQUF5RTtBQUN6RSw4Q0FBNEQ7QUFVNUQsTUFBYSxpQkFBa0IsU0FBUSwyQkFBYTtDQUFHO0FBQXZELDhDQUF1RDtBQUN2RCxNQUFhLG1CQUFvQixTQUFRLDJCQUFhO0NBQUc7QUFBekQsa0RBQXlEO0FBQ3pELE1BQWEsU0FBVSxTQUFRLDJCQUFhO0NBQUc7QUFBL0MsOEJBQStDO0FBQy9DLE1BQWEsaUJBQWtCLFNBQVEsMkJBQWE7Q0FBRztBQUF2RCw4Q0FBdUQ7QUFDdkQsTUFBYSxhQUFjLFNBQVEsMkJBQWE7Q0FBRztBQUFuRCxzQ0FBbUQ7QUFDbkQsTUFBYSxpQkFBa0IsU0FBUSxhQUFhO0NBQUc7QUFBdkQsOENBQXVEO0FBQ3ZELE1BQWEsbUJBQW9CLFNBQVEsMkJBQWE7Q0FBRztBQUF6RCxrREFBeUQ7QUFFekQsTUFBYSxrQ0FBbUMsU0FBUSwyQkFBYTtDQUFHO0FBQXhFLGdGQUF3RTtBQUd4RSxnRkFBZ0Y7QUFDbkUsUUFBQSxpQ0FBaUMsR0FBRyxrQ0FBa0MsQ0FBQztBQUVwRjs7O0dBR0c7QUFDSCxNQUFhLG1CQUFtQjtDQUkvQjtBQUpELGtEQUlDO0FBRUQsTUFBYSx1QkFBd0IsU0FBUSwyQkFBYTtDQUV6RDtBQUZELDBEQUVDO0FBR0QsNERBQTREO0FBQy9DLFFBQUEsc0JBQXNCLEdBQUcsdUJBQXVCLENBQUM7QUFFOUQsTUFBYSxTQUFVLFNBQVEsMkJBQWE7SUFJeEMsdURBQXVEO0lBQ3ZELElBQUksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFDRCxrQkFBa0I7SUFDbEIsSUFBSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLG1CQUFtQixFQUFFLENBQUM7SUFDckMsQ0FBQztJQUNELDZEQUE2RDtJQUM3RCxJ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