"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Low Level - API Hooking
const block_1 = require("bdsx/bds/block");
const blockpos_1 = require("bdsx/bds/blockpos");
const gamemode_1 = require("bdsx/bds/gamemode");
const inventory_1 = require("bdsx/bds/inventory");
const player_1 = require("bdsx/bds/player");
const makefunc_1 = require("bdsx/makefunc");
const nativetype_1 = require("bdsx/nativetype");
const prochacker_1 = require("bdsx/prochacker");
const tester_1 = require("bdsx/tester");
/**
 * Backward compatibility cannot be guaranteed. The symbol name can be changed by BDS updating.
 */
//////////////////////////
// hook the block breaking
let halfMiss = false;
function onDestroyBlock(gameMode, blockPos, v) {
    halfMiss = !halfMiss;
    const actor = gameMode.actor;
    if (actor instanceof player_1.ServerPlayer) {
        actor.sendMessage(`${halfMiss ? "missed" : "destroyed"}: ${blockPos.x} ${blockPos.y} ${blockPos.z} ${v}`);
    }
    if (halfMiss)
        return false;
    return originalFunc(gameMode, blockPos, v);
}
// bool SurvivalMode::destroyBlock(BlockPos&,unsigned char); // it can be dug with the disassembler or the decompiler.
const originalFunc = prochacker_1.procHacker.hooking("?destroyBlock@SurvivalMode@@UEAA_NAEBVBlockPos@@E@Z", nativetype_1.bool_t, null, gamemode_1.SurvivalMode, blockpos_1.BlockPos, nativetype_1.int32_t)(onDestroyBlock);
//////////////////////////
// hook the item using on block
const itemUseOn = prochacker_1.procHacker.hooking("?useItemOn@GameMode@@UEAA_NAEAVItemStack@@AEBVBlockPos@@EAEBVVec3@@PEBVBlock@@@Z", nativetype_1.bool_t, null, gamemode_1.GameMode, inventory_1.ItemStack, blockpos_1.BlockPos, nativetype_1.int8_t, blockpos_1.Vec3, block_1.Block)((gameMode, item, blockpos, n, pos, block) => {
    const actor = gameMode.actor;
    if (actor instanceof player_1.ServerPlayer) {
        actor.sendMessage(`${item.getName()} using at ${blockpos.x} ${blockpos.y} ${blockpos.z}`);
    }
    return itemUseOn(gameMode, item, blockpos, n, pos, block);
});
//////////////////////////
// hide the map marker
prochacker_1.procHacker.hooking("?_updateTrackedEntityDecoration@MapItemSavedData@@AEAA_NAEAVBlockSource@@V?$shared_ptr@VMapItemTrackedActor@@@std@@@Z", nativetype_1.bool_t)(() => false);
//////////////////////////
// Cross thread hooking
// it will synchronize the thread and call the JS engine.
// void BedrockLog::log(enum BedrockLog::LogCategory,class std::bitset<3>,enum BedrockLog::LogRule,enum LogAreaID,unsigned int,char const *,int,char const *,...)
prochacker_1.procHacker.hooking("?log@BedrockLog@@YAXW4LogCategory@1@V?$bitset@$02@std@@W4LogRule@1@W4LogAreaID@@IPEBDH4ZZ", nativetype_1.void_t, { crossThread: true }, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.int32_t, nativetype_1.uint32_t, makefunc_1.makefunc.Utf8)((category, bitset, logrule, logarea, n, message) => {
    if (!tester_1.Tester.isPassed())
        return; // logging if test is passed
    console.log(message);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG93bGV2ZWwtYXBpaG9va2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvd2xldmVsLWFwaWhvb2tpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQkFBMEI7QUFDMUIsMENBQXVDO0FBQ3ZDLGdEQUFtRDtBQUNuRCxnREFBMkQ7QUFDM0Qsa0RBQStDO0FBQy9DLDRDQUErQztBQUMvQyw0Q0FBeUM7QUFDekMsZ0RBQTRFO0FBQzVFLGdEQUE2QztBQUM3Qyx3Q0FBcUM7QUFFckM7O0dBRUc7QUFFSCwwQkFBMEI7QUFDMUIsMEJBQTBCO0FBQzFCLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztBQUNyQixTQUFTLGNBQWMsQ0FBQyxRQUFzQixFQUFFLFFBQWtCLEVBQUUsQ0FBUztJQUN6RSxRQUFRLEdBQUcsQ0FBQyxRQUFRLENBQUM7SUFDckIsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztJQUM3QixJQUFJLEtBQUssWUFBWSxxQkFBWSxFQUFFO1FBQy9CLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsV0FBVyxLQUFLLFFBQVEsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDN0c7SUFFRCxJQUFJLFFBQVE7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUMzQixPQUFPLFlBQVksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9DLENBQUM7QUFFRCxzSEFBc0g7QUFDdEgsTUFBTSxZQUFZLEdBQUcsdUJBQVUsQ0FBQyxPQUFPLENBQUMscURBQXFELEVBQUUsbUJBQU0sRUFBRSxJQUFJLEVBQUUsdUJBQVksRUFBRSxtQkFBUSxFQUFFLG9CQUFPLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUU5SiwwQkFBMEI7QUFDMUIsK0JBQStCO0FBQy9CLE1BQU0sU0FBUyxHQUFHLHVCQUFVLENBQUMsT0FBTyxDQUNoQyxrRkFBa0YsRUFDbEYsbUJBQU0sRUFDTixJQUFJLEVBQ0osbUJBQVEsRUFDUixxQkFBUyxFQUNULG1CQUFRLEVBQ1IsbUJBQU0sRUFDTixlQUFJLEVBQ0osYUFBSyxDQUNSLENBQUMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQzFDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7SUFDN0IsSUFBSSxLQUFLLFlBQVkscUJBQVksRUFBRTtRQUMvQixLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxhQUFhLFFBQVEsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUM3RjtJQUNELE9BQU8sU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDOUQsQ0FBQyxDQUFDLENBQUM7QUFFSCwwQkFBMEI7QUFDMUIsc0JBQXNCO0FBQ3RCLHVCQUFVLENBQUMsT0FBTyxDQUFDLHVIQUF1SCxFQUFFLG1CQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUVqSywwQkFBMEI7QUFDMUIsdUJBQXVCO0FBQ3ZCLHlEQUF5RDtBQUV6RCxpS0FBaUs7QUFDakssdUJBQVUsQ0FBQyxPQUFPLENBQ2QsMkZBQTJGLEVBQzNGLG1CQUFNLEVBQ04sRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLEVBQ3JCLG9CQUFPLEVBQ1Asb0JBQU8sRUFDUCxvQkFBTyxFQUNQLG9CQUFPLEVBQ1AscUJBQVEsRUFDUixtQkFBUSxDQUFDLElBQUksQ0FDaEIsQ0FBQyxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUU7SUFDakQsSUFBSSxDQUFDLGVBQU0sQ0FBQyxRQUFRLEVBQUU7UUFBRSxPQUFPLENBQUMsNEJBQTRCO0lBQzVELE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFDLENBQUMifQ==