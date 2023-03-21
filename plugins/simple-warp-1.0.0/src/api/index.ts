import { DimensionId } from "bdsx/bds/actor";
import { BlockPos, Vec3 } from "bdsx/bds/blockpos";
import { ServerPlayer } from "bdsx/bds/player";
import { events } from "bdsx/event";
import { writeFile } from "fs";

interface warp_data {
    blockpos: BlockPos,
    dimension: DimensionId,
}

export let config = {
    "title": "§l§2Simple§e-§dWarp",
    "content": "Hi §e%player%§r, This is WarpUI you can teleport to warp position",
    "button": "§l§2%warp%§r\n§7Click to teleport",
    "cancel_button": "§l§8[ §cCANCEL §8]§r"
};

let warps: {
    [warp: string]: warp_data
} = {};

try { config = require(__dirname + "../../../config.json") } catch(e) { console.log(`[Simple-Warp] config.json not found!`) }
try { warps = require(__dirname + "../../../warps.json") } catch(e) { console.log(`[Simple-Warp] warps.json not found!`) }

export function dimensionString(dimension: DimensionId): string {
    if (dimension === DimensionId.Overworld) return "Overworld";
    if (dimension === DimensionId.Nether) return "Nether";
    if (dimension === DimensionId.TheEnd) return "TheEnd";
    return "Undefined";
}

export class SimpleWarpAPI {
    /**warps. */
    static warps() {
        return warps;
    }
    /**Add warp. */
    static addWarp(name: string, pos: BlockPos, dimension: DimensionId, player?: ServerPlayer): boolean {
        if (name === "") {
            player?.sendMessage(`§cInvalid name.`);
            return false;
        }
        if (warps.hasOwnProperty(name)) {
            player?.sendMessage(`§cWarp alredy.`);
            return false;
        }

        warps[name] = {
            "blockpos": pos,
            "dimension": dimension
        }
        player?.sendMessage(`§aAdded §5[§r${name}§r§7, §8[§e${pos.x}§7, §e${pos.y}§7, §e${pos.z}§8]§7, §2${dimensionString(dimension)}§5]`);
        return true;
    }
    /**Edit warp position. */
    static editWarp(name: string, pos: BlockPos, dimension: DimensionId, player?: ServerPlayer): boolean {
        if (warps.hasOwnProperty(name) === false) {
            player?.sendMessage(`§cWarp not found.`);
            return false;
        }

        player?.sendMessage(`§aEdie §5[§r${name}§r§7, §8[§e${warps[name].blockpos.x}§7, §e${warps[name].blockpos.y}§7, §e${warps[name].blockpos.z}§8]§7, §2${dimensionString(warps[name].dimension)}§5] §ato §5[§r${name}§r§7, §8[§e${pos.x}§7, §e${pos.y}§7, §e${pos.z}§8]§7, §2${dimensionString(dimension)}§5]`);
        warps[name].blockpos=pos;
        warps[name].dimension=dimension;
        return true;
    }
    /**Remove warp. */
    static removeWarp(name: string, player?: ServerPlayer): boolean {
        if (warps.hasOwnProperty(name) === false) {
            player?.sendMessage(`§cWarp not found.`);
            return false;
        } else {
            player?.sendMessage(`§aRemove §5[§r${name}§r§7, §8[§e${warps[name].blockpos.x}§7, §e${warps[name].blockpos.y}§7, §e${warps[name].blockpos.z}§8]§7, §2${dimensionString(warps[name].dimension)}§5]`);
            delete warps[name];
            return true;
        }
    }
    /**WriteFile. */
    static writeFile(): void {
        writeFile(__dirname + "../../../config.json", JSON.stringify(config), (err) => {
            if (err) {
                console.log(`[Simple-Warp] config.json Error: \n${err}`);
            } else {
                console.log(`[Simple-Warp] config.json Saved!`);
            }
        });
        writeFile(__dirname + "../../../warps.json", JSON.stringify(warps), (err) => {
            if (err) {
                console.log(`[Simple-Warp] warps.json Error: \n${err}`);
            } else {
                console.log(`[Simple-Warp] warps.json Saved!`);
            }
        });
    }
    /**Teleport player to warp. */
    static teleport(player: ServerPlayer, warp: string): boolean {
        if (warps.hasOwnProperty(warp) === false) {
            player.sendMessage(`§cWarp not found.`);
            return false;
        }

        const data = warps[warp];
        player.teleport(Vec3.create(data.blockpos.x+0.5, data.blockpos.y+0.5, data.blockpos.z+0.5), data.dimension, Vec3.create(player.getRotation().x, player.getPosition().y, 10));
        player.sendMessage(`§aTeleport to §e${warp}`);
        return true;
    }
}

events.serverStop.on(() => {
    SimpleWarpAPI.writeFile();
});