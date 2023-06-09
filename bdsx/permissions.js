"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permissions = void 0;
const path = require("path");
const event_1 = require("./event");
const fsutil_1 = require("./fsutil");
throw new Error("The permissions system is currently on hold. Please wait to use it until it is finished.");
const PERMISSIONS_FILE = "bdsxpermissions.json";
const permissionsPath = path.join(fsutil_1.fsutil.projectPath, PERMISSIONS_FILE);
var Permissions;
(function (Permissions) {
    let allPermissions = new Map();
    class RootPermissionNode {
        constructor() {
            this.children = new Map();
        }
        registerChild(...newChildren) {
            for (const child of newChildren) {
                if (this.children.has(child.name))
                    throw new Error(`PermissionNode ${this.getFullName()} cannot register child ${child.name} twice`);
                this.children.set(child.name, child);
                child.parent = this;
            }
        }
        getFullName() {
            return "";
        }
        getUser(_userXuid) {
            return false;
        }
        hasChild(child) {
            const first = child.split(".")[0];
            if (!first)
                return true;
            if (this.children.has(first))
                return this.children.get(first).hasChild(child.substr(first.length + 1));
            return false;
        }
        getChild(child) {
            if (!this.hasChild(child))
                return null;
            const nodes = child.split(".");
            const first = nodes.shift();
            if (nodes.length === 0)
                return this.children.get(first);
            return this.children.get(first).getChild(nodes.join("."));
        }
    }
    Permissions.RootPermissionNode = RootPermissionNode;
    const rootNode = new RootPermissionNode();
    let dirty = false;
    class PermissionNode extends RootPermissionNode {
        constructor(name, description, defaultValue) {
            super();
            this.name = name;
            this.description = description;
            this.parent = rootNode;
            this.defaultValue = defaultValue;
        }
        // getUser(player: Player): boolean;
        // getUser(playerXuid: string): boolean;
        // getUser(player: string | Player): boolean {
        //     if(typeof player !== 'string') player = player.getCertificate().getXuid();
        //     if(!this.isUserDefined(player)) return this.parent.getUser(player);
        //     return allPermissions.get(player)![this.getFullName()]!;
        // }
        // isUserDefined(player: Player): boolean;
        // isUserDefined(playerXuid: string): boolean;
        // isUserDefined(player: string | Player): boolean {
        //     if(typeof player !== 'string') player = player.getCertificate().getXuid();
        //     const userPermissions = allPermissions.get(player);
        //     if(!userPermissions) return false;
        //     return userPermissions[this.getFullName()] !== undefined;
        // }
        // setUser(player: Player, value: boolean | null): void;
        // setUser(playerXuid: string, value: boolean | null): void;
        // setUser(player: string | Player, value: boolean | null): void {
        //     if(typeof player !== 'string') player = player.getCertificate().getXuid();
        //     if(typeof value === 'boolean') {
        //         let userPermissions;
        //         if(allPermissions.has(player)) {
        //             userPermissions = allPermissions.get(player)!;
        //         } else {
        //             userPermissions = {};
        //             allPermissions.set(player, userPermissions);
        //         }
        //         userPermissions[this.getFullName()] = value;
        //     } else if(allPermissions.has(player)) {
        //         const userPermissions = allPermissions.get(player)!;
        //         userPermissions[this.getFullName()] = undefined;
        //         if(Object.keys(userPermissions).length === 0) allPermissions.delete(player);
        //     }
        //     dirty = true;
        // }
        getFullName() {
            const ret = this.parent.getFullName() + "." + this.name;
            if (ret.startsWith("."))
                return ret.substr(1);
            return ret;
        }
    }
    Permissions.PermissionNode = PermissionNode;
    function permissionNodeFromString(permission) {
        return rootNode.getChild(permission);
    }
    Permissions.permissionNodeFromString = permissionNodeFromString;
    // export function getUserAllPermissions(player: Player): any;
    // export function getUserAllPermissions(playerXuid: string): any;
    // export function getUserAllPermissions(player: string | Player): any {
    //     return allPermissions.get(typeof player === 'string' ? player : player.getCertificate().getXuid()) ?? {};
    // }
    function registerPermission(name, description, parent, defaultValue) {
        const permission = new PermissionNode(name, description, defaultValue);
        permission.parent = parent !== null && parent !== void 0 ? parent : rootNode;
        if (parent)
            parent.registerChild(permission);
        else
            rootNode.registerChild(permission);
        return permission;
    }
    Permissions.registerPermission = registerPermission;
    // export function registerPermissionRecursive(permission: string, ) {
    //     const nodes = permission.split('.');
    //     if(nodes.length < 1) return null;
    //     let currentNode = rootNode;
    //     for(const node of nodes) {
    //         if(!currentNode.hasChild(node)) {
    //             const newNode = new PermissionNode(node);
    //             currentNode.registerChild(newNode);
    //             currentNode = newNode;
    //         } else {
    //             currentNode = currentNode.getChild(node)!;
    //         }
    //     }
    // }
    async function saveData() {
        if (!dirty)
            return;
        dirty = false;
        const data = {};
        for (const user of allPermissions) {
            data[user[0]] = user[1];
        }
        await fsutil_1.fsutil.writeJson(permissionsPath, data);
        console.log("done");
    }
    Permissions.saveData = saveData;
    async function loadData(data) {
        if (!data)
            data = JSON.parse(await fsutil_1.fsutil.readFile(permissionsPath));
        const dataAsArray = [];
        for (const xuid in data) {
            dataAsArray.push([xuid, data[xuid]]);
        }
        allPermissions = new Map(dataAsArray);
    }
    Permissions.loadData = loadData;
    function registerPermissionBulk(data) {
        var _a;
        for (const permission of data) {
            (_a = permissionNodeFromString(permission.parent)) === null || _a === void 0 ? void 0 : _a.registerChild(new PermissionNode(permission.name, permission.description, permission.default));
        }
    }
    Permissions.registerPermissionBulk = registerPermissionBulk;
    setInterval(saveData, 60000).unref();
})(Permissions = exports.Permissions || (exports.Permissions = {}));
Permissions.loadData();
event_1.events.serverClose.on(() => {
    Permissions.saveData();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwZXJtaXNzaW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBNkI7QUFDN0IsbUNBQWlDO0FBQ2pDLHFDQUFrQztBQUVsQyxNQUFNLElBQUksS0FBSyxDQUFDLDBGQUEwRixDQUFDLENBQUM7QUFFNUcsTUFBTSxnQkFBZ0IsR0FBRyxzQkFBc0IsQ0FBQztBQUVoRCxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQU0sQ0FBQyxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUV4RSxJQUFpQixXQUFXLENBb0szQjtBQXBLRCxXQUFpQixXQUFXO0lBQ3hCLElBQUksY0FBYyxHQUFHLElBQUksR0FBRyxFQUF5RCxDQUFDO0lBRXRGLE1BQWEsa0JBQWtCO1FBQS9CO1lBQ0ksYUFBUSxHQUFnQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBMkJ0RCxDQUFDO1FBMUJHLGFBQWEsQ0FBQyxHQUFHLFdBQTZCO1lBQzFDLEtBQUssTUFBTSxLQUFLLElBQUksV0FBVyxFQUFFO2dCQUM3QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLFdBQVcsRUFBRSwwQkFBMEIsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUM7Z0JBQ3JJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3JDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO1FBQ0wsQ0FBQztRQUNELFdBQVc7WUFDUCxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFDRCxPQUFPLENBQUMsU0FBaUI7WUFDckIsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNELFFBQVEs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