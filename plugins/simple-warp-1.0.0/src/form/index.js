"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleWarpUI = void 0;
const form_1 = require("bdsx/bds/form");
const api_1 = require("../api");
class SimpleWarpUI {
    /**Open WarpsUI for teleport */
    static warps(player) {
        var _a, _b;
        const b = [];
        const warps = api_1.SimpleWarpAPI.warps();
        const data = Object.keys(warps);
        data.forEach(v => {
            var _a;
            b.push(new form_1.FormButton((_a = api_1.config.button.replace("%warp%", v)) !== null && _a !== void 0 ? _a : v));
        });
        new form_1.SimpleForm((_a = api_1.config.title) !== null && _a !== void 0 ? _a : "§l§2Simple§e-§dWarp", (_b = api_1.config.content.replace("%player%", player.getName())) !== null && _b !== void 0 ? _b : "", b)
            .sendTo(player.getNetworkIdentifier(), (f) => {
            const r = f.response;
            if (r === null)
                return;
            api_1.SimpleWarpAPI.teleport(player, data[r]);
        });
    }
}
exports.SimpleWarpUI = SimpleWarpUI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBdUU7QUFFdkUsZ0NBQStDO0FBRS9DLE1BQWEsWUFBWTtJQUNyQiwrQkFBK0I7SUFDL0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFvQjs7UUFDN0IsTUFBTSxDQUFDLEdBQWlCLEVBQUUsQ0FBQztRQUMzQixNQUFNLEtBQUssR0FBRyxtQkFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3BDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTs7WUFDYixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQVUsQ0FBQyxNQUFBLFlBQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsbUNBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRSxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksaUJBQVUsQ0FBQyxNQUFBLFlBQU0sQ0FBQyxLQUFLLG1DQUFJLHFCQUFxQixFQUFFLE1BQUEsWUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxtQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ25ILE1BQU0sQ0FBQyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxDQUFDLENBQWlCLEVBQUUsRUFBRTtZQUN6RCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLElBQUk7Z0JBQUUsT0FBTztZQUN2QixtQkFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUFsQkQsb0NBa0JDIn0=