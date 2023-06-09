import { DimensionId } from "bdsx/bds/actor";
import { BlockPos, Vec3 } from "bdsx/bds/blockpos";
import { CommandPermissionLevel, CommandPosition } from "bdsx/bds/command";
import { command } from "bdsx/command";
import { events } from "bdsx/event";
import { CxxString } from "bdsx/nativetype";
import { SimpleWarpAPI } from "../api";
import { SimpleWarpUI } from "../form";

events.serverOpen.on(() => {
command.register(`warp`, `Warps to a defined warp.`)
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    pl.sendMessage(`§6Warps: §7${Object.keys(SimpleWarpAPI.warps())}`);
}, {})
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    SimpleWarpAPI.teleport(pl, p.warp);
}, {
    warp: CxxString
});

command.register(`warpui`, `Open the warps ui.`)
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    SimpleWarpUI.warps(pl);
}, {});

command.register(`addwarp`, `Create a warp.`, CommandPermissionLevel.Operator)
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    SimpleWarpAPI.addWarp(p.name, BlockPos.create(pl.getPosition()), pl.getDimensionId(), pl);
}, {
    name: CxxString
})
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    SimpleWarpAPI.addWarp(p.name, BlockPos.create(Vec3.create(p.pos.x, p.pos.y, p.pos.z)), pl.getDimensionId(), pl);
}, {
    name: CxxString,
    pos: CommandPosition
})
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    if (p.dimension === "overworld") {
        SimpleWarpAPI.addWarp(p.name, BlockPos.create(Vec3.create(p.pos.x, p.pos.y, p.pos.z)), DimensionId.Overworld, pl);
    }
    if (p.dimension === "nether") {
        SimpleWarpAPI.addWarp(p.name, BlockPos.create(Vec3.create(p.pos.x, p.pos.y, p.pos.z)), DimensionId.Nether, pl);
    }
    if (p.dimension === "theend") {
        SimpleWarpAPI.addWarp(p.name, BlockPos.create(Vec3.create(p.pos.x, p.pos.y, p.pos.z)), DimensionId.TheEnd, pl);
    }
}, {
    name: CxxString,
    pos: CommandPosition,
    dimension: command.enum("CommandDimension", "overworld", "nether", "theend")
});

command.register(`removewarp`, `Remove a warp.`, CommandPermissionLevel.Operator)
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    SimpleWarpAPI.removeWarp(p.warp, pl);
}, {
    warp: CxxString
});

command.register(`editwarp`, `Edit a warp position and dimension.`, CommandPermissionLevel.Operator)
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    SimpleWarpAPI.editWarp(p.warp, BlockPos.create(pl.getPosition()), pl.getDimensionId(), pl);
}, {
    warp: CxxString
})
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    SimpleWarpAPI.editWarp(p.warp, BlockPos.create(Vec3.create(p.pos.x, p.pos.y, p.pos.z)), pl.getDimensionId(), pl);
}, {
    warp: CxxString,
    pos: CommandPosition
})
.overload((p, o) => {
    const entity = o.getEntity();
    if (entity === null) return;
    const pl = entity.getNetworkIdentifier().getActor();
    if (pl === null) return;

    if (p.dimension === "overworld") {
        SimpleWarpAPI.editWarp(p.name, BlockPos.create(Vec3.create(p.pos.x, p.pos.y, p.pos.z)), DimensionId.Overworld, pl);
    }
    if (p.dimension === "nether") {
        SimpleWarpAPI.editWarp(p.name, BlockPos.create(Vec3.create(p.pos.x, p.pos.y, p.pos.z)), DimensionId.Nether, pl);
    }
    if (p.dimension === "theend") {
        SimpleWarpAPI.editWarp(p.name, BlockPos.create(Vec3.create(p.pos.x, p.pos.y, p.pos.z)), DimensionId.TheEnd, pl);
    }
}, {
    name: CxxString,
    pos: CommandPosition,
    dimension: command.enum("CommandDimension", "overworld", "nether", "theend")
});
});