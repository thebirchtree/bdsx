"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_1 = require("bdsx/bds/block");
const blockpos_1 = require("bdsx/bds/blockpos");
const event_1 = require("bdsx/event");
const launcher_1 = require("bdsx/launcher");
let counter = 0;
const airBlock = block_1.Block.create("minecraft:air");
const blocks = [
    block_1.Block.create("minecraft:planks", 0),
    block_1.Block.create("minecraft:planks", 1),
    block_1.Block.create("minecraft:planks", 2),
    block_1.Block.create("minecraft:planks", 3),
    block_1.Block.create("minecraft:planks", 4),
    block_1.Block.create("minecraft:planks", 5),
];
const interval = setInterval(() => {
    const newBlock = blocks[counter];
    for (const player of launcher_1.bedrockServer.serverInstance.getPlayers()) {
        const region = player.getRegion();
        const pos = player.getPosition();
        const blockpos = blockpos_1.BlockPos.create(Math.floor(pos.x), Math.floor(pos.y) - 2, Math.floor(pos.z));
        const oldBlock = region.getBlock(blockpos);
        if (!oldBlock.equals(airBlock)) {
            region.setBlock(blockpos, newBlock);
        }
    }
    counter = (counter + 1) % blocks.length;
}, 100);
event_1.events.serverStop.on(() => {
    clearInterval(interval);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0YmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXRibG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUF1QztBQUN2QyxnREFBNkM7QUFDN0Msc0NBQW9DO0FBQ3BDLDRDQUE4QztBQUU5QyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFFaEIsTUFBTSxRQUFRLEdBQUcsYUFBSyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUMvQyxNQUFNLE1BQU0sR0FBRztJQUNYLGFBQUssQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFFO0lBQ3BDLGFBQUssQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFFO0lBQ3BDLGFBQUssQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFFO0lBQ3BDLGFBQUssQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFFO0lBQ3BDLGFBQUssQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFFO0lBQ3BDLGFBQUssQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFFO0NBQ3ZDLENBQUM7QUFFRixNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO0lBQzlCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQyxLQUFLLE1BQU0sTUFBTSxJQUFJLHdCQUFhLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxFQUFFO1FBQzVELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakMsTUFBTSxRQUFRLEdBQUcsbUJBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUYsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM1QixNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUN2QztLQUNKO0lBQ0QsT0FBTyxHQUFHLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDNUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBRVIsY0FBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFO0lBQ3RCLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM1QixDQUFDLENBQUMsQ0FBQyJ9