"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_1 = require("bdsx/bds/block");
const blockpos_1 = require("bdsx/bds/blockpos");
const form_1 = require("bdsx/bds/form");
const nbt_1 = require("bdsx/bds/nbt");
const command_1 = require("bdsx/command");
const event_1 = require("bdsx/event");
const nativetype_1 = require("bdsx/nativetype");
command_1.command.register("sign", "generate signed block").overload((params, origin, output) => {
    const actor = origin.getEntity();
    if (actor === null) {
        output.error("actor not found");
    }
    else {
        const region = actor.getRegion();
        const pos = actor.getFeetPos();
        const blockpos = blockpos_1.BlockPos.create(Math.floor(pos.x), Math.floor(pos.y), Math.floor(pos.z));
        const block = block_1.Block.create("minecraft:standing_sign");
        region.setBlock(blockpos, block);
        const blockActor = region.getBlockEntity(blockpos);
        const nbt = {
            Text: "be happy",
            Examples: {
                // it's not NBTs of the sign, it does not affect the sign.
                ByteTag: nbt_1.NBT.byte(0),
                ByteTag2: false,
                ShortTag: nbt_1.NBT.short(0),
                IntTag: nbt_1.NBT.int(0),
                IntTag2: 0,
                Int64Tag: nbt_1.NBT.int64(0),
                Int64Tag2: nbt_1.NBT.int64(nativetype_1.bin64_t.zero),
                FloatTag: nbt_1.NBT.float(0),
                DoubleTag: nbt_1.NBT.double(0),
                StringTag: "text",
                ListTag: ["a", "b", "c"],
                CompoundTag: {
                    a: "a",
                    b: "b",
                    c: "c",
                },
                ByteArrayTag: nbt_1.NBT.byteArray([1, 2, 3]),
                ByteArrayTag2: new Uint8Array([1, 2, 3]),
                IntArrayTag: nbt_1.NBT.intArray([1, 2, 3]),
                IntArrayTag2: new Int32Array([1, 2, 3]),
            },
        };
        blockActor.load(nbt);
        form_1.Form.sendTo(actor.getNetworkIdentifier(), {
            type: "form",
            title: "NBT",
            buttons: [{ text: "OK" }],
            content: nbt_1.NBT.stringify(blockActor.save(), 4), // stringified NBT
        });
    }
}, {});
event_1.events.playerUseItem.on(ev => {
    ev.itemStack.save();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmJ0LXNpZ24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuYnQtc2lnbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUF1QztBQUN2QyxnREFBNkM7QUFDN0Msd0NBQXFDO0FBQ3JDLHNDQUFtQztBQUNuQywwQ0FBdUM7QUFDdkMsc0NBQW9DO0FBQ3BDLGdEQUEwQztBQUUxQyxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsdUJBQXVCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQ2xGLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNqQyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7UUFDaEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0tBQ25DO1NBQU07UUFDSCxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakMsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQy9CLE1BQU0sUUFBUSxHQUFHLG1CQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUYsTUFBTSxLQUFLLEdBQUcsYUFBSyxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBRSxDQUFDO1FBQ3ZELE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFFLENBQUM7UUFFcEQsTUFBTSxHQUFHLEdBQUc7WUFDUixJQUFJLEVBQUUsVUFBVTtZQUNoQixRQUFRLEVBQUU7Z0JBQ04sMERBQTBEO2dCQUMxRCxPQUFPLEVBQUUsU0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFFBQVEsRUFBRSxTQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsTUFBTSxFQUFFLFNBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixPQUFPLEVBQUUsQ0FBQztnQkFDVixRQUFRLEVBQUUsU0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLFNBQVMsRUFBRSxTQUFHLENBQUMsS0FBSyxDQUFDLG9CQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNsQyxRQUFRLEVBQUUsU0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLFNBQVMsRUFBRSxTQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDeEIsU0FBUyxFQUFFLE1BQU07Z0JBQ2pCLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO2dCQUN4QixXQUFXLEVBQUU7b0JBQ1QsQ0FBQyxFQUFFLEdBQUc7b0JBQ04sQ0FBQyxFQUFFLEdBQUc7b0JBQ04sQ0FBQyxFQUFFLEdBQUc7aUJBQ1Q7Z0JBQ0QsWUFBWSxFQUFFLFNBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxhQUFhLEVBQUUsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxXQUFXLEVBQUUsU0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLFlBQVksRUFBRSxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDMUM7U0FDSixDQUFDO1FBQ0YsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVyQixXQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxFQUFFO1lBQ3RDLElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLEtBQUs7WUFDWixPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUN6QixPQUFPLEVBQUUsU0FBRyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsa0JBQWtCO1NBQ25FLENBQUMsQ0FBQztLQUNOO0FBQ0wsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBRVAsY0FBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDekIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN4QixDQUFDLENBQUMsQ0FBQyJ9