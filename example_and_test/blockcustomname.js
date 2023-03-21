"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_1 = require("bdsx/bds/block");
const blockpos_1 = require("bdsx/bds/blockpos");
const commandarea_1 = require("bdsx/bds/commandarea");
const command_1 = require("bdsx/command");
const launcher_1 = require("bdsx/launcher");
command_1.command.register("furnace", "generate named furnace").overload((params, origin, output) => {
    const actor = origin.getEntity();
    if (actor === null) {
        output.error("actor not found");
    }
    else {
        const region = actor.getRegion();
        const pos = actor.getFeetPos();
        const blockpos = blockpos_1.BlockPos.create(Math.floor(pos.x), Math.floor(pos.y), Math.floor(pos.z));
        const block = block_1.Block.create("minecraft:furnace");
        region.setBlock(blockpos, block);
        const dimension = actor.getDimension();
        // change the block name per 1 sec
        let numberForCheckingUpdate = 1;
        const interval = setInterval(() => {
            if (launcher_1.bedrockServer.isClosed()) {
                clearInterval(interval);
                return;
            }
            const area = commandarea_1.CommandAreaFactory.create(dimension).findArea(blockpos, blockpos, false, false, false);
            if (area === null) {
                // cannot access the furnace area
                return;
            }
            const region = area.blockSource;
            const blockActor = region.getBlockEntity(blockpos);
            if (blockActor === null) {
                // no block actor, it seems it's destroyed
                clearInterval(interval);
            }
            else {
                blockActor.setCustomName("customname " + numberForCheckingUpdate); // set the custom name
                numberForCheckingUpdate++;
                region.getDimension()._sendBlockEntityUpdatePacket(blockpos); // send update packets, clients are not updated without this
            }
            area.dispose();
        }, 1000);
    }
}, {});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2tjdXN0b21uYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmxvY2tjdXN0b21uYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMENBQXVDO0FBQ3ZDLGdEQUE2QztBQUM3QyxzREFBMEQ7QUFDMUQsMENBQXVDO0FBQ3ZDLDRDQUE4QztBQUU5QyxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQ3RGLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNqQyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7UUFDaEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0tBQ25DO1NBQU07UUFDSCxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakMsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQy9CLE1BQU0sUUFBUSxHQUFHLG1CQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUYsTUFBTSxLQUFLLEdBQUcsYUFBSyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBRSxDQUFDO1FBQ2pELE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRWpDLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV2QyxrQ0FBa0M7UUFDbEMsSUFBSSx1QkFBdUIsR0FBRyxDQUFDLENBQUM7UUFDaEMsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUM5QixJQUFJLHdCQUFhLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQzFCLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDeEIsT0FBTzthQUNWO1lBQ0QsTUFBTSxJQUFJLEdBQUcsZ0NBQWtCLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDcEcsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO2dCQUNmLGlDQUFpQztnQkFDakMsT0FBTzthQUNWO1lBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUNoQyxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25ELElBQUksVUFBVSxLQUFLLElBQUksRUFBRTtnQkFDckIsMENBQTBDO2dCQUMxQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDM0I7aUJBQU07Z0JBQ0gsVUFBVSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEdBQUcsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtnQkFDekYsdUJBQXVCLEVBQUUsQ0FBQztnQkFDMUIsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLDRCQUE0QixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsNERBQTREO2FBQzdIO1lBQ0QsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25CLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNaO0FBQ0wsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDIn0=