"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockUtils = exports.PistonBlockActor = exports.PistonAction = exports.ChestBlockActor = exports.ChestBlock = exports.ButtonBlock = exports.BlockActorType = exports.BlockActor = exports.BlockSource = exports.Block = exports.BlockLegacy = void 0;
const tslib_1 = require("tslib");
const common_1 = require("../common");
const core_1 = require("../core");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const nbt_1 = require("./nbt");
let BlockLegacy = class BlockLegacy extends nativeclass_1.NativeClass {
    getCommandName() {
        const names = this.getCommandNames2();
        const name = names.get(0).name;
        names.destruct();
        if (name === null)
            throw Error(`block has not any names`);
        return name;
    }
    /**
     * @deprecated Use `this.getCommandNames2()` instead
     */
    getCommandNames() {
        (0, common_1.abstract)();
    }
    getCommandNames2() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the category of the block in creative inventory
     */
    getCreativeCategory() {
        (0, common_1.abstract)();
    }
    /**
     * Changes the time needed to destroy the block
     * @remarks Will not affect actual destroy time but will affect the speed of cracks
     */
    setDestroyTime(time) {
        (0, common_1.abstract)();
    }
    /**
     * Returns the time needed to destroy the block
     */
    getDestroyTime() {
        return this.getDestroySpeed();
    }
    /**
     * Returns the Block instance
     */
    getRenderBlock() {
        (0, common_1.abstract)();
    }
    getBlockEntityType() {
        (0, common_1.abstract)();
    }
    getBlockItemId() {
        (0, common_1.abstract)();
    }
    getStateFromLegacyData(data) {
        (0, common_1.abstract)();
    }
    use(subject, blockPos, face) {
        (0, common_1.abstract)();
    }
    getDefaultState() {
        (0, common_1.abstract)();
    }
    tryGetStateFromLegacyData(data) {
        (0, common_1.abstract)();
    }
    getSilkTouchedItemInstance(block) {
        (0, common_1.abstract)();
    }
    getDestroySpeed() {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], BlockLegacy.prototype, "vftable", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], BlockLegacy.prototype, "descriptionId", void 0);
BlockLegacy = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], BlockLegacy);
exports.BlockLegacy = BlockLegacy;
let Block = class Block extends nativeclass_1.NativeClass {
    static constructWith(blockName, data = 0) {
        return this.create(blockName, data);
    }
    static create(blockName, data = 0) {
        (0, common_1.abstract)();
    }
    _getName() {
        (0, common_1.abstract)();
    }
    getName() {
        return this._getName().str;
    }
    getDescriptionId() {
        (0, common_1.abstract)();
    }
    getRuntimeId() {
        (0, common_1.abstract)();
    }
    getBlockEntityType() {
        (0, common_1.abstract)();
    }
    hasBlockEntity() {
        (0, common_1.abstract)();
    }
    use(subject, blockPos, face) {
        (0, common_1.abstract)();
    }
    getVariant() {
        (0, common_1.abstract)();
    }
    getSerializationId() {
        (0, common_1.abstract)();
    }
    getSilkTouchItemInstance() {
        (0, common_1.abstract)();
    }
    isUnbreakable() {
        (0, common_1.abstract)();
    }
    buildDescriptionId() {
        (0, common_1.abstract)();
    }
    isCropBlock() {
        (0, common_1.abstract)();
    }
    popResource(blockSource, blockPos, itemStack) {
        (0, common_1.abstract)();
    }
    canHurtAndBreakItem() {
        (0, common_1.abstract)();
    }
    getThickness() {
        (0, common_1.abstract)();
    }
    hasComparatorSignal() {
        (0, common_1.abstract)();
    }
    getTranslucency() {
        (0, common_1.abstract)();
    }
    getExplosionResistance(actor) {
        (0, common_1.abstract)();
    }
    getComparatorSignal(blockSource, blockPos, facing) {
        (0, common_1.abstract)();
    }
    getDirectSignal(blockSource, blockPos, facing) {
        (0, common_1.abstract)();
    }
    isSignalSource() {
        (0, common_1.abstract)();
    }
    getDestroySpeed() {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], Block.prototype, "vftable", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint16_t)
], Block.prototype, "data", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(BlockLegacy.ref(), 0x10)
], Block.prototype, "blockLegacy", void 0);
Block = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], Block);
exports.Block = Block;
// Neighbors causes block updates around
// Network causes the block to be sent to clients
// Uses of other flags unknown
var BlockUpdateFlags;
(function (BlockUpdateFlags) {
    BlockUpdateFlags[BlockUpdateFlags["NONE"] = 0] = "NONE";
    BlockUpdateFlags[BlockUpdateFlags["NEIGHBORS"] = 1] = "NEIGHBORS";
    BlockUpdateFlags[BlockUpdateFlags["NETWORK"] = 2] = "NETWORK";
    BlockUpdateFlags[BlockUpdateFlags["NOGRAPHIC"] = 4] = "NOGRAPHIC";
    BlockUpdateFlags[BlockUpdateFlags["PRIORITY"] = 8] = "PRIORITY";
    BlockUpdateFlags[BlockUpdateFlags["ALL"] = 3] = "ALL";
    BlockUpdateFlags[BlockUpdateFlags["ALL_PRIORITY"] = 11] = "ALL_PRIORITY";
})(BlockUpdateFlags || (BlockUpdateFlags = {}));
let BlockSource = class BlockSource extends nativeclass_1.NativeClass {
    _setBlock(x, y, z, block, updateFlags, actor) {
        (0, common_1.abstract)();
    }
    getBlock(blockPos) {
        (0, common_1.abstract)();
    }
    /**
     *
     * @param blockPos Position of the block to place
     * @param block The Block to place
     * @param updateFlags BlockUpdateFlags, to place without ticking neighbor updates use only BlockUpdateFlags.NETWORK
     * @returns true if the block was placed, false if it was not
     */
    setBlock(blockPos, block, updateFlags = BlockUpdateFlags.ALL) {
        return this._setBlock(blockPos.x, blockPos.y, blockPos.z, block, updateFlags, null);
    }
    getChunk(pos) {
        (0, common_1.abstract)();
    }
    getChunkAt(pos) {
        (0, common_1.abstract)();
    }
    getChunkSource() {
        (0, common_1.abstract)();
    }
    getBlockEntity(blockPos) {
        (0, common_1.abstract)();
    }
    getDimension() {
        (0, common_1.abstract)();
    }
    getDimensionId() {
        (0, common_1.abstract)();
    }
    removeBlockEntity(blockPos) {
        (0, common_1.abstract)();
    }
    getBrightness(blockPos) {
        (0, common_1.abstract)();
    }
    checkBlockDestroyPermission(actor, blockPos, item, b) {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], BlockSource.prototype, "vftable", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], BlockSource.prototype, "ownerThreadID", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], BlockSource.prototype, "allowUnpopulatedChunks", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], BlockSource.prototype, "publicSource", void 0);
BlockSource = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], BlockSource);
exports.BlockSource = BlockSource;
let BlockActor = class BlockActor extends nativeclass_1.NativeClass {
    isChestBlockActor() {
        return this instanceof ChestBlockActor;
    }
    save(tag) {
        (0, common_1.abstract)();
    }
    load(tag) {
        (0, common_1.abstract)();
    }
    /**
     * @deprecated use allocateAndSave
     */
    constructAndSave() {
        const tag = nbt_1.CompoundTag.construct();
        this.save(tag);
        return tag;
    }
    allocateAndSave() {
        const tag = nbt_1.CompoundTag.allocate();
        this.save(tag);
        return tag;
    }
    setChanged() {
        (0, common_1.abstract)();
    }
    /**
     * Sets a custom name to the block. (e.g : chest, furnace...)
     *
     * @param name - Name to set
     *
     * @remarks This will not update the block client-side. use `BlockActor.updateClientSide()` to do so.
     */
    setCustomName(name) {
        (0, common_1.abstract)();
    }
    getContainer() {
        (0, common_1.abstract)();
    }
    getType() {
        (0, common_1.abstract)();
    }
    getPosition() {
        (0, common_1.abstract)();
    }
    /**
     * make a packet for updating the client-side.
     * it has a risk about memoryleaks but following the original function name.
     *
     * @return allocated BlockActorDataPacket. it needs to be disposed of.
     */
    getServerUpdatePacket(blockSource) {
        (0, common_1.abstract)();
    }
    /**
     * Updates the block actor client-side.
     *
     * @param player - The player to update the block for.
     */
    updateClientSide(player) {
        (0, common_1.abstract)();
    }
    getCustomName() {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], BlockActor.prototype, "vftable", void 0);
BlockActor = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], BlockActor);
exports.BlockActor = BlockActor;
var BlockActorType;
(function (BlockActorType) {
    BlockActorType[BlockActorType["None"] = 0] = "None";
    BlockActorType[BlockActorType["Furnace"] = 1] = "Furnace";
    BlockActorType[BlockActorType["Chest"] = 2] = "Chest";
    BlockActorType[BlockActorType["NetherReactor"] = 3] = "NetherReactor";
    BlockActorType[BlockActorType["Sign"] = 4] = "Sign";
    BlockActorType[BlockActorType["MobSpawner"] = 5] = "MobSpawner";
    BlockActorType[BlockActorType["Skull"] = 6] = "Skull";
    BlockActorType[BlockActorType["FlowerPot"] = 7] = "FlowerPot";
    BlockActorType[BlockActorType["BrewingStand"] = 8] = "BrewingStand";
    BlockActorType[BlockActorType["EnchantingTable"] = 9] = "EnchantingTable";
    BlockActorType[BlockActorType["DaylightDetector"] = 10] = "DaylightDetector";
    BlockActorType[BlockActorType["Music"] = 11] = "Music";
    BlockActorType[BlockActorType["Comparator"] = 12] = "Comparator";
    BlockActorType[BlockActorType["Dispenser"] = 13] = "Dispenser";
    BlockActorType[BlockActorType["Dropper"] = 14] = "Dropper";
    BlockActorType[BlockActorType["Hopper"] = 15] = "Hopper";
    BlockActorType[BlockActorType["Cauldron"] = 16] = "Cauldron";
    BlockActorType[BlockActorType["ItemFrame"] = 17] = "ItemFrame";
    BlockActorType[BlockActorType["Piston"] = 18] = "Piston";
    BlockActorType[BlockActorType["MovingBlock"] = 19] = "MovingBlock";
    BlockActorType[BlockActorType["Beacon"] = 21] = "Beacon";
    BlockActorType[BlockActorType["EndPortal"] = 22] = "EndPortal";
    BlockActorType[BlockActorType["EnderChest"] = 23] = "EnderChest";
    BlockActorType[BlockActorType["EndGateway"] = 24] = "EndGateway";
    BlockActorType[BlockActorType["ShulkerBox"] = 25] = "ShulkerBox";
    BlockActorType[BlockActorType["CommandBlock"] = 26] = "CommandBlock";
    BlockActorType[BlockActorType["Bed"] = 27] = "Bed";
    BlockActorType[BlockActorType["Banner"] = 28] = "Banner";
    BlockActorType[BlockActorType["StructureBlock"] = 32] = "StructureBlock";
    BlockActorType[BlockActorType["Jukebox"] = 33] = "Jukebox";
    BlockActorType[BlockActorType["ChemistryTable"] = 34] = "ChemistryTable";
    BlockActorType[BlockActorType["Conduit"] = 35] = "Conduit";
    BlockActorType[BlockActorType["Jigsaw"] = 36] = "Jigsaw";
    BlockActorType[BlockActorType["Lectern"] = 37] = "Lectern";
    BlockActorType[BlockActorType["BlastFurnace"] = 38] = "BlastFurnace";
    BlockActorType[BlockActorType["Smoker"] = 39] = "Smoker";
    BlockActorType[BlockActorType["Bell"] = 40] = "Bell";
    BlockActorType[BlockActorType["Campfire"] = 41] = "Campfire";
    BlockActorType[BlockActorType["Barrel"] = 42] = "Barrel";
    BlockActorType[BlockActorType["Beehive"] = 43] = "Beehive";
    BlockActorType[BlockActorType["Lodestone"] = 44] = "Lodestone";
    BlockActorType[BlockActorType["SculkSensor"] = 45] = "SculkSensor";
    BlockActorType[BlockActorType["SporeBlossom"] = 46] = "SporeBlossom";
    BlockActorType[BlockActorType["SculkCatalyst"] = 48] = "SculkCatalyst";
})(BlockActorType = exports.BlockActorType || (exports.BlockActorType = {}));
let ButtonBlock = class ButtonBlock extends BlockLegacy {
};
ButtonBlock = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ButtonBlock);
exports.ButtonBlock = ButtonBlock;
let ChestBlock = class ChestBlock extends BlockLegacy {
};
ChestBlock = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ChestBlock);
exports.ChestBlock = ChestBlock;
let ChestBlockActor = class ChestBlockActor extends BlockActor {
    /**
     * Returns whether the chest is a double chest
     */
    isLargeChest() {
        (0, common_1.abstract)();
    }
    /**
     * Makes a player open the chest
     *
     * @param player - Player that will open the chest
     *
     * @remarks The chest must be in range of the player !
     */
    openBy(player) {
        (0, common_1.abstract)();
    }
    /**
     * Returns the position of the other chest forming the double chest.
     *
     * @remarks If the chest is not a double chest, BlockPos ZERO (0,0,0) is returned.
     */
    getPairedChestPosition() {
        (0, common_1.abstract)();
    }
};
ChestBlockActor = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ChestBlockActor);
exports.ChestBlockActor = ChestBlockActor;
var PistonAction;
(function (PistonAction) {
    PistonAction[PistonAction["Extend"] = 1] = "Extend";
    PistonAction[PistonAction["Retract"] = 3] = "Retract";
})(PistonAction = exports.PistonAction || (exports.PistonAction = {}));
let PistonBlockActor = class PistonBlockActor extends nativeclass_1.NativeClass {
    getPosition() {
        (0, common_1.abstract)();
    }
    getAttachedBlocks() {
        (0, common_1.abstract)();
    }
    getFacingDir(region) {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int8_t, 0xd7)
], PistonBlockActor.prototype, "action", void 0);
PistonBlockActor = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0xe0)
], PistonBlockActor);
exports.PistonBlockActor = PistonBlockActor;
let BlockUtils = class BlockUtils extends nativeclass_1.NativeClass {
    static isDownwardFlowingLiquid(block) {
        (0, common_1.abstract)();
    }
    static isBeehiveBlock(block) {
        (0, common_1.abstract)();
    }
    static isWaterSource(block) {
        (0, common_1.abstract)();
    }
    static isFullFlowingLiquid(block) {
        (0, common_1.abstract)();
    }
    static allowsNetherVegetation(block) {
        (0, common_1.abstract)();
    }
    static isThinFenceOrWallBlock(block) {
        (0, common_1.abstract)();
    }
    static isLiquidSource(block) {
        (0, common_1.abstract)();
    }
    static getLiquidBlockHeight(block, blockPos) {
        (0, common_1.abstract)();
    }
    static canGrowTreeWithBeehive(block) {
        (0, common_1.abstract)();
    }
};
BlockUtils = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], BlockUtils);
exports.BlockUtils = BlockUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJibG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsc0NBQXFDO0FBQ3JDLGtDQUFzQztBQUV0QyxnREFBdUU7QUFDdkUsOENBQTJHO0FBUzNHLCtCQUF5QztBQUtsQyxJQUFNLFdBQVcsR0FBakIsTUFBTSxXQUFZLFNBQVEseUJBQVc7SUFTeEMsY0FBYztRQUNWLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3RDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQy9CLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqQixJQUFJLElBQUksS0FBSyxJQUFJO1lBQUUsTUFBTSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUMxRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0Q7O09BRUc7SUFDSCxlQUFlO1FBQ1gsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsZ0JBQWdCO1FBQ1osSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0Q7O09BRUc7SUFDSCxtQkFBbUI7UUFDZixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRDs7O09BR0c7SUFDSCxjQUFjLENBQUMsSUFBWTtRQUN2QixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRDs7T0FFRztJQUNILGNBQWM7UUFDVixPQUFPLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBQ0Q7O09BRUc7SUFDSCxjQUFjO1FBQ1YsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0Qsa0JBQWtCO1FBQ2QsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsY0FBYztRQUNWLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2Ys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