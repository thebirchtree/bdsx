import { Form, FormButton, FormData, SimpleForm } from "bdsx/bds/form";
import { ServerPlayer } from "bdsx/bds/player";
import { config, SimpleWarpAPI } from "../api";

export class SimpleWarpUI {
    /**Open WarpsUI for teleport */
    static warps(player: ServerPlayer): void {
        const b: FormButton[] = [];
        const warps = SimpleWarpAPI.warps();
        const data = Object.keys(warps);

        data.forEach(v => {
            b.push(new FormButton(config.button.replace("%warp%", v) ?? v));
        });

        new SimpleForm(config.title ?? "§l§2Simple§e-§dWarp", config.content.replace("%player%", player.getName()) ?? "", b)
        .sendTo(player.getNetworkIdentifier(), (f: Form<FormData>) => {
            const r = f.response;
            if (r === null) return;
            SimpleWarpAPI.teleport(player, data[r]);
        });
    }
}