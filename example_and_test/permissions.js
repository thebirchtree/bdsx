"use strict";
// The permissions system is currently deprecated and not useable. This is an example of the api works for reference.
Object.defineProperty(exports, "__esModule", { value: true });
exports.bdsxExampleNode = void 0;
const permissions_1 = require("bdsx/permissions");
const commandPerm = permissions_1.Permissions.registerPermission("command", "Minecraft commands", permissions_1.Permissions.registerPermission("minecraft", "Minecraft data", null, false), false);
permissions_1.Permissions.registerPermission("me", "Vanilla me command", commandPerm, true);
permissions_1.Permissions.registerPermission("say", "Vanilla say command", commandPerm, true);
permissions_1.Permissions.registerPermission("give", "Vanilla give command", commandPerm, false);
exports.bdsxExampleNode = permissions_1.Permissions.registerPermission("example", "BDSX examples", permissions_1.Permissions.registerPermission("bdsx", "BDSX permissions", null, false), false);
permissions_1.Permissions.registerPermission("imacow", "Permission to use the commandthatneedspermission command", exports.bdsxExampleNode, false);
// command.register('commandthatneedspermission', 'Say "I\'m a cow"').overload((params, origin, result) => {
//     if(!origin.getEntity()?.isPlayer()) return;
//     const node = Permissions.permissionNodeFromString("bdsx.example.imacow");
//     const res = node?.getUser(origin.getEntity() as Player);
//     if(res) {
//         bedrockServer.executeCommand(`execute "${origin.getName()}" ~ ~ ~ say I'm a cow`);
//     } else {
//         result.error("You don't have permission 'bdsx.example.imacow' needed to use this command");
//     }
// }, {});
// command.register('giveperm', 'Give a player a permission', CommandPermissionLevel.Operator).overload((params, origin, res) => {
//     let result = "Gave the permission " + params.permission.text + " to ";
//     for(const p of params.target.newResults(origin)) {
//         if(!p.isPlayer()) continue;
//         Permissions.permissionNodeFromString(params.permission.text)?.setUser(p as Player, true);
//         result += p.getName() + ", ";
//     }
//     result = result.substr(0, result.length - 2);
//     res.success(result);
// }, {
//     target: ActorWildcardCommandSelector,
//     permission: CommandRawText
// });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwZXJtaXNzaW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEscUhBQXFIOzs7QUFJckgsa0RBQStDO0FBSS9DLE1BQU0sV0FBVyxHQUFHLHlCQUFXLENBQUMsa0JBQWtCLENBQzlDLFNBQVMsRUFDVCxvQkFBb0IsRUFDcEIseUJBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUMxRSxLQUFLLENBQ1IsQ0FBQztBQUVGLHlCQUFXLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM5RSx5QkFBVyxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxxQkFBcUIsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDaEYseUJBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsc0JBQXNCLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3RFLFFBQUEsZUFBZSxHQUFHLHlCQUFXLENBQUMsa0JBQWtCLENBQ3pELFNBQVMsRUFDVCxlQUFlLEVBQ2YseUJBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUN2RSxLQUFLLENBQ1IsQ0FBQztBQUNGLHlCQUFXLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLDBEQUEwRCxFQUFFLHVCQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFFN0gsNEdBQTRHO0FBQzVHLGtEQUFrRDtBQUNsRCxnRkFBZ0Y7QUFDaEYsK0RBQStEO0FBQy9ELGdCQUFnQjtBQUNoQiw2RkFBNkY7QUFDN0YsZUFBZTtBQUNmLHNHQUFzRztBQUN0RyxRQUFRO0FBQ1IsVUFBVTtBQUNWLGtJQUFrSTtBQUNsSSw2RUFBNkU7QUFDN0UseURBQXlEO0FBQ3pELHNDQUFzQztBQUN0QyxvR0FBb0c7QUFDcEcsd0NBQXdDO0FBQ3hDLFFBQVE7QUFDUixvREFBb0Q7QUFDcEQsMkJBQTJCO0FBQzNCLE9BQU87QUFDUCw0Q0FBNEM7QUFDNUMsaUNBQWlDO0FBQ2pDLE1BQU0ifQ==