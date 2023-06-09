"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Custom Command
const actor_1 = require("bdsx/bds/actor");
const blockpos_1 = require("bdsx/bds/blockpos");
const command_1 = require("bdsx/bds/command");
const connreq_1 = require("bdsx/bds/connreq");
const command_2 = require("bdsx/command");
const event_1 = require("bdsx/event");
const fsutil_1 = require("bdsx/fsutil");
const launcher_1 = require("bdsx/launcher");
const nativetype_1 = require("bdsx/nativetype");
const data_1 = require("bdsx/shellprepare/data");
const fs = require("fs");
const path = require("path");
command_2.command.find("say").signature.permissionLevel = command_1.CommandPermissionLevel.Admin; // change the say permission
// raw text
command_2.command.register("aaa", "bdsx command example").overload((param, origin, output) => {
    output.success(`raw text example> origin=${origin.getName()}\n` + `text: ${param.rawtext.text}`);
}, { rawtext: command_1.CommandRawText });
// optional
command_2.command.register("bbb", "optional param example").overload((param, origin, output) => {
    let out = `optional param example> origin=${origin.getName()}\n` + `first: ${param.first}`;
    if (param.second !== undefined)
        out += `\nsecond: ${param.second}`;
    output.success(out);
}, {
    first: nativetype_1.int32_t,
    second: [nativetype_1.CxxString, true],
});
// empty parameters
command_2.command.register("ccc", "empty params example").overload((param, origin, output) => {
    output.success(`empty params example> origin=${origin.getName()}\n`);
}, {});
// relative float, /ccc ~~~
command_2.command.register("ddd", "relative float example").overload((param, origin, output) => {
    output.success(`relative float example> origin=${origin.getName()}\n` +
        `${param.x.value} ${param.x.is_relative}\n` +
        `${param.y.value} ${param.y.is_relative}\n` +
        `${param.z.value} ${param.z.is_relative}\n`);
}, {
    x: blockpos_1.RelativeFloat,
    y: blockpos_1.RelativeFloat,
    z: blockpos_1.RelativeFloat,
});
// entity
command_2.command.register("eee", "entity example").overload((param, origin, output) => {
    let out = `entity example> origin=${origin.getName()}`;
    for (const actor of param.actors.newResults(origin)) {
        out += "\n" + "Entity:" + actor.getNameTag() + ", " + actor.getIdentifier();
    }
    output.success(out);
    if (param.players) {
        for (const player of param.players.newResults(origin)) {
            out += "\n" + "Player:" + player.getNameTag() + ", " + player.getIdentifier(); // must be minecraft:player
        }
        output.success(out);
    }
}, {
    actors: command_1.ActorCommandSelector,
    players: [command_1.PlayerCommandSelector, true], // player-only
});
// boolean
command_2.command.register("fff", "boolean example").overload((param, origin, output) => {
    output.success(`boolean example> origin=${origin.getName()}\n` + `value: ${param.b}`);
}, {
    b: nativetype_1.bool_t,
});
// enum
// bedrockServer.level.setCommandsEnabled(true); // (?) it shows the enum list, but it will turn on allow-cheats.
command_2.command.register("ggg", "enum example").overload((param, origin, output) => {
    output.success(`enum example> origin=${origin.getName()}\n` + `enum1: ${param.enum1}\n` + `enum2: ${param.enum2}`);
}, {
    enum1: command_2.command.enum("EnumType", "enum1", "Enum2", "ENUM3"),
    enum2: command_2.command.enum("DimensionId", actor_1.DimensionId), // TS enum
});
// json
command_2.command.register("hhh", "json example").overload((param, origin, output) => {
    output.success(`json example> origin=${origin.getName()}\n` + `value: ${JSON.stringify(param.json.value())}`);
}, {
    json: connreq_1.JsonValue,
});
// CommandPosition, more useful than three of `RelativeFloat`
command_2.command.register("iii", "position example").overload((param, origin, output) => {
    // without offset :
    const pos = param.position.getPosition(origin).toJSON();
    // with offset :
    // the offset is used for relative position
    const blockPos = param.position.getBlockPosition(origin, blockpos_1.Vec3.create(0, 4, 0)).toJSON();
    output.success(`position example> origin=${origin.getName()}\n` +
        `Pos: §a${pos.x.toFixed(2)}§f, §a${pos.y.toFixed(2)}§f, §a${pos.z.toFixed(2)}§f\n` +
        `BlockPos: §a${blockPos.x}§f, §a${blockPos.y}§f, §a${blockPos.z}`);
}, {
    position: command_1.CommandPosition,
});
// block
command_2.command.register("jjj", "block example").overload((param, origin, output) => {
    output.success(`block example> origin=${origin.getName()}\n` + `block name: ${param.block.getName()}`);
}, {
    block: command_1.Command.Block,
});
// multiple overloads example
command_2.command
    .register("kkk", "multiple overloads example")
    .overload((param, origin, output) => {
    output.success(`overload example: Add ${param.name}.`);
}, {
    option: command_2.command.enum("option.add", "add"),
    name: nativetype_1.CxxString,
})
    .overload((param, origin, output) => {
    output.success(`overload example: Remove ${param.id}.`);
}, {
    option: command_2.command.enum("option.remove", "remove"),
    id: nativetype_1.int32_t,
});
// soft enum example
const softEnumExample = command_2.command.softEnum("softEnumExample", "hello", "world");
command_2.command
    .register("lll", "soft enum example")
    // Adds a value to the soft enum.
    .overload((param, origin, output) => {
    softEnumExample.addValues(param.value);
    output.success(`soft enum example : Added value ${param.value}`);
}, {
    action: command_2.command.enum("action.add", "add"),
    value: nativetype_1.CxxString,
})
    // Removes a value from the soft enum.
    .overload((param, origin, output) => {
    softEnumExample.removeValues(param.value);
    output.success(`soft enum example : Removed value ${param.value}`);
}, {
    action: command_2.command.enum("action.remove", "remove"),
    value: nativetype_1.CxxString,
})
    // Lists all the soft enum values.
    .overload((param, origin, output) => {
    output.success(`soft enum example : Values: ${softEnumExample.getValues().join(", ")}`);
}, {
    action: command_2.command.enum("action.list", "list"),
    list: softEnumExample,
});
// disable examples
command_2.command.register("disable_example", "disable examples").overload((param, origin, output) => {
    const indexPath = path.join(fsutil_1.fsutil.projectPath, "index.ts");
    if (fs.statSync(indexPath).size >= 150) {
        output.error("Failed to disable, index.ts is modified.");
    }
    else {
        const content = "\r\n// Please start your own codes from here!";
        fs.writeFileSync(indexPath, content);
        fs.writeFileSync(path.join(fsutil_1.fsutil.projectPath, "index.js"), content);
        const data = data_1.shellPrepareData.load();
        data.relaunch = "1";
        data_1.shellPrepareData.save(data);
        launcher_1.bedrockServer.stop();
    }
}, {});
// hook direct
event_1.events.command.on((cmd, origin, ctx) => {
    switch (cmd) {
        case "/whoami":
            if (ctx.origin.isServerCommandOrigin()) {
                console.log("You are the server console");
            }
            else {
                console.log("You are " + origin);
            }
            break;
        default:
            return; // process the default command
    }
    return 0; // suppress the command, It will mute 'Unknown command' message.
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImN1c3RvbWNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQkFBaUI7QUFDakIsMENBQTZDO0FBQzdDLGdEQUF3RDtBQUN4RCw4Q0FBaUo7QUFDakosOENBQTZDO0FBQzdDLDBDQUF1QztBQUN2QyxzQ0FBb0M7QUFDcEMsd0NBQXFDO0FBQ3JDLDRDQUE4QztBQUM5QyxnREFBNkQ7QUFDN0QsaURBQTBEO0FBQzFELHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFFN0IsaUJBQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLGVBQWUsR0FBRyxnQ0FBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyw0QkFBNEI7QUFFMUcsV0FBVztBQUNYLGlCQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxzQkFBc0IsQ0FBQyxDQUFDLFFBQVEsQ0FDcEQsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQ3RCLE1BQU0sQ0FBQyxPQUFPLENBQUMsNEJBQTRCLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxHQUFHLFNBQVMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3JHLENBQUMsRUFDRCxFQUFFLE9BQU8sRUFBRSx3QkFBYyxFQUFFLENBQzlCLENBQUM7QUFFRixXQUFXO0FBQ1gsaUJBQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLHdCQUF3QixDQUFDLENBQUMsUUFBUSxDQUN0RCxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDdEIsSUFBSSxHQUFHLEdBQUcsa0NBQWtDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxHQUFHLFVBQVUsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzNGLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxTQUFTO1FBQUUsR0FBRyxJ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