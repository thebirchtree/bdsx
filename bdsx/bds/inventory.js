"use strict";
var ItemStack_1, InventorySource_1, ComplexInventoryTransaction_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemReleaseInventoryTransaction = exports.ItemUseOnActorInventoryTransaction = exports.ItemUseInventoryTransaction = exports.ComplexInventoryTransaction = exports.InventoryTransaction = exports.InventoryTransactionItemGroup = exports.InventoryAction = exports.NetworkItemStackDescriptor = exports.ItemStackNetIdVariant = exports.ItemDescriptor = exports.InventorySource = exports.InventorySourceFlags = exports.InventorySourceType = exports.PlayerInventory = exports.PlayerUISlot = exports.PlayerUIContainer = exports.Inventory = exports.SimpleContainer = exports.FillingContainer = exports.Container = exports.ItemStack = exports.ItemStackBase = exports.ComponentItem = exports.ArmorItem = exports.Item = exports.HandSlot = exports.CreativeItemCategory = exports.ArmorSlot = exports.ContainerType = exports.ContainerId = void 0;
const tslib_1 = require("tslib");
const common_1 = require("../common");
const core_1 = require("../core");
const cxxvector_1 = require("../cxxvector");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const actor_1 = require("./actor");
const block_1 = require("./block");
const blockpos_1 = require("./blockpos");
const hashedstring_1 = require("./hashedstring");
const nbt_1 = require("./nbt");
const symbols_1 = require("./symbols");
/**
 * Values from 1 to 100 are for a player's container counter.
 */
var ContainerId;
(function (ContainerId) {
    ContainerId[ContainerId["Inventory"] = 0] = "Inventory";
    /** Used as the minimum value of a player's container counter. */
    ContainerId[ContainerId["First"] = 1] = "First";
    /** Used as the maximum value of a player's container counter. */
    ContainerId[ContainerId["Last"] = 100] = "Last";
    /** Used in InventoryContentPacket */
    ContainerId[ContainerId["Offhand"] = 119] = "Offhand";
    /** Used in InventoryContentPacket */
    ContainerId[ContainerId["Armor"] = 120] = "Armor";
    /** Used in InventoryContentPacket */
    ContainerId[ContainerId["Creative"] = 121] = "Creative";
    /**
     * @deprecated
     */
    ContainerId[ContainerId["Hotbar"] = 122] = "Hotbar";
    /**
     * @deprecated
     */
    ContainerId[ContainerId["FixedInventory"] = 123] = "FixedInventory";
    /** Used in InventoryContentPacket */
    ContainerId[ContainerId["UI"] = 124] = "UI";
    ContainerId[ContainerId["None"] = 255] = "None";
})(ContainerId = exports.ContainerId || (exports.ContainerId = {}));
var ContainerType;
(function (ContainerType) {
    ContainerType[ContainerType["Container"] = 0] = "Container";
    ContainerType[ContainerType["Workbench"] = 1] = "Workbench";
    ContainerType[ContainerType["Furnace"] = 2] = "Furnace";
    ContainerType[ContainerType["Enchantment"] = 3] = "Enchantment";
    ContainerType[ContainerType["BrewingStand"] = 4] = "BrewingStand";
    ContainerType[ContainerType["Anvil"] = 5] = "Anvil";
    ContainerType[ContainerType["Dispenser"] = 6] = "Dispenser";
    ContainerType[ContainerType["Dropper"] = 7] = "Dropper";
    ContainerType[ContainerType["Hopper"] = 8] = "Hopper";
    ContainerType[ContainerType["Cauldron"] = 9] = "Cauldron";
    ContainerType[ContainerType["MinecartChest"] = 10] = "MinecartChest";
    ContainerType[ContainerType["MinecartHopper"] = 11] = "MinecartHopper";
    ContainerType[ContainerType["Horse"] = 12] = "Horse";
    ContainerType[ContainerType["Beacon"] = 13] = "Beacon";
    ContainerType[ContainerType["StructureEditor"] = 14] = "StructureEditor";
    ContainerType[ContainerType["Trade"] = 15] = "Trade";
    ContainerType[ContainerType["CommandBlock"] = 16] = "CommandBlock";
    ContainerType[ContainerType["Jukebox"] = 17] = "Jukebox";
    ContainerType[ContainerType["Armor"] = 18] = "Armor";
    ContainerType[ContainerType["Hand"] = 19] = "Hand";
    ContainerType[ContainerType["CompoundCreator"] = 20] = "CompoundCreator";
    ContainerType[ContainerType["ElementConstructor"] = 21] = "ElementConstructor";
    ContainerType[ContainerType["MaterialReducer"] = 22] = "MaterialReducer";
    ContainerType[ContainerType["LabTable"] = 23] = "LabTable";
    ContainerType[ContainerType["Loom"] = 24] = "Loom";
    ContainerType[ContainerType["Lectern"] = 25] = "Lectern";
    ContainerType[ContainerType["Grindstone"] = 26] = "Grindstone";
    ContainerType[ContainerType["BlastFurnace"] = 27] = "BlastFurnace";
    ContainerType[ContainerType["Smoker"] = 28] = "Smoker";
    ContainerType[ContainerType["Stonecutter"] = 29] = "Stonecutter";
    ContainerType[ContainerType["Cartography"] = 30] = "Cartography";
    ContainerType[ContainerType["None"] = 247] = "None";
    ContainerType[ContainerType["Inventory"] = 255] = "Inventory";
})(ContainerType = exports.ContainerType || (exports.ContainerType = {}));
var ArmorSlot;
(function (ArmorSlot) {
    ArmorSlot[ArmorSlot["Head"] = 0] = "Head";
    /** IDA said this is called Torso */
    ArmorSlot[ArmorSlot["Torso"] = 1] = "Torso";
    ArmorSlot[ArmorSlot["Chest"] = 1] = "Chest";
    ArmorSlot[ArmorSlot["Legs"] = 2] = "Legs";
    ArmorSlot[ArmorSlot["Feet"] = 3] = "Feet";
})(ArmorSlot = exports.ArmorSlot || (exports.ArmorSlot = {}));
var CreativeItemCategory;
(function (CreativeItemCategory) {
    CreativeItemCategory[CreativeItemCategory["All"] = 0] = "All";
    CreativeItemCategory[CreativeItemCategory["Construction"] = 1] = "Construction";
    CreativeItemCategory[CreativeItemCategory["Nature"] = 2] = "Nature";
    CreativeItemCategory[CreativeItemCategory["Equipment"] = 3] = "Equipment";
    CreativeItemCategory[CreativeItemCategory["Items"] = 4] = "Items";
    CreativeItemCategory[CreativeItemCategory["Uncategorized"] = 5] = "Uncategorized";
})(CreativeItemCategory = exports.CreativeItemCategory || (exports.CreativeItemCategory = {}));
var HandSlot;
(function (HandSlot) {
    HandSlot[HandSlot["Mainhand"] = 0] = "Mainhand";
    HandSlot[HandSlot["Offhand"] = 1] = "Offhand";
})(HandSlot = exports.HandSlot || (exports.HandSlot = {}));
class Item extends nativeclass_1.NativeClass {
    /**
     * Returns whether the item is allowed to be used in the offhand slot
     */
    allowOffhand() {
        (0, common_1.abstract)();
    }
    getCommandName() {
        var _a;
        const names = this.getCommandNames2();
        const name = (_a = names.get(0)) === null || _a === void 0 ? void 0 : _a.name;
        names.destruct();
        if (name == null)
            throw Error(`item has not any names`);
        return name;
    }
    /** @deprecated Use `this.getCommandNames2()` instead */
    getCommandNames() {
        (0, common_1.abstract)();
    }
    getCommandNames2() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the category of the item in creative inventory
     */
    getCreativeCategory() {
        (0, common_1.abstract)();
    }
    getArmorValue() {
        (0, common_1.abstract)();
    }
    getToughnessValue() {
        (0, common_1.abstract)();
    }
    isDamageable() {
        (0, common_1.abstract)();
    }
    isFood() {
        (0, common_1.abstract)();
    }
    isArmor() {
        (0, common_1.abstract)();
    }
    /**
     * Changes whether the item is allowed to be used in the offhand slot
     *
     * @remarks Will not affect client but allows /replaceitem
     */
    setAllowOffhand(value) {
        (0, common_1.abstract)();
    }
    getSerializedName() {
        (0, common_1.abstract)();
    }
    getCooldownType() {
        (0, common_1.abstract)();
    }
    canDestroyInCreative() {
        (0, common_1.abstract)();
    }
}
exports.Item = Item;
/**
 * @deprecated rough. don't use it yet.
 */
class ArmorItem extends Item {
}
exports.ArmorItem = ArmorItem;
class ComponentItem extends Item {
    getComponent(identifier) {
        const hashedStr = hashedstring_1.HashedString.construct();
        hashedStr.set(identifier);
        const component = this._getComponent(hashedStr);
        hashedStr.destruct();
        return component;
    }
    _getComponent(identifier) {
        (0, common_1.abstract)();
    }
    buildNetworkTag() {
        (0, common_1.abstract)();
    }
    initializeFromNetwork(tag) {
        (0, common_1.abstract)();
    }
}
exports.ComponentItem = ComponentItem;
let ItemStackBase = class ItemStackBase extends nativeclass_1.NativeClass {
    _getItem() {
        (0, common_1.abstract)();
    }
    _setCustomLore(name) {
        (0, common_1.abstract)();
    }
    /**
     * just `ItemStackBase::add` in BDS.
     * but it conflicts to {@link VoidPointer.prototype.add}
     */
    addAmount(amount) {
        (0, common_1.abstract)();
    }
    remove(amount) {
        (0, common_1.abstract)();
    }
    getArmorValue() {
        const item = this.getItem();
        return item !== null ? item.getArmorValue() : 0;
    }
    setAuxValue(value) {
        (0, common_1.abstract)();
    }
    getAuxValue() {
        (0, common_1.abstract)();
    }
    isValidAuxValue(aux) {
        (0, common_1.abstract)();
    }
    getMaxStackSize() {
        (0, common_1.abstract)();
    }
    toString() {
        (0, common_1.abstract)();
    }
    toDebugString() {
        (0, common_1.abstract)();
    }
    isBlock() {
        (0, common_1.abstract)();
    }
    isNull() {
        (0, common_1.abstract)();
    }
    setNull(unknown) {
        (0, common_1.abstract)();
    }
    getAmount() {
        return this.amount;
    }
    setAmount(amount) {
        this.amount = amount;
    }
    getId() {
        (0, common_1.abstract)();
    }
    getItem() {
        if (this.isNull()) {
            return null;
        }
        return this._getItem();
    }
    getName() {
        const item = this.getItem();
        if (item != null) {
            const Name = item.getCommandName();
            if (Name.includes(":"))
                return Name;
            else
                return "minecraft:" + Name;
        }
        return "minecraft:air";
    }
    getRawNameId() {
        (0, common_1.abstract)();
    }
    hasCustomName() {
        (0, common_1.abstract)();
    }
    getCustomName() {
        (0, common_1.abstract)();
    }
    setCustomName(name) {
        (0, common_1.abstract)();
    }
    getUserData() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the item's enchantability
     *
     * @see https://minecraft.fandom.com/wiki/Enchanting_mechanics
     */
    getEnchantValue() {
        (0, common_1.abstract)();
    }
    isEnchanted() {
        (0, common_1.abstract)();
    }
    setCustomLore(lores) {
        const CxxVectorString = cxxvector_1.CxxVector.make(nativetype_1.CxxString);
        const cxxvector = CxxVectorString.construct();
        if (typeof lores === "string") {
            cxxvector.push(lores);
        }
        else {
            cxxvector.push(...lores);
        }
        this._setCustomLore(cxxvector);
        cxxvector.destruct();
    }
    getCustomLore() {
        (0, common_1.abstract)();
    }
    /**
     * @remarks The value is applied only to Damageable items
     */
    setDamageValue(value) {
        (0, common_1.abstract)();
    }
    setItem(id) {
        (0, common_1.abstract)();
    }
    startCoolDown(player) {
        (0, common_1.abstract)();
    }
    sameItem(item) {
        (0, common_1.abstract)();
    }
    sameItemAndAux(item) {
        (0, common_1.abstract)();
    }
    isStackedByData() {
        (0, common_1.abstract)();
    }
    isStackable() {
        (0, common_1.abstract)();
    }
    isPotionItem() {
        (0, common_1.abstract)();
    }
    isPattern() {
        (0, common_1.abstract)();
    }
    isMusicDiscItem() {
        (0, common_1.abstract)();
    }
    isLiquidClipItem() {
        (0, common_1.abstract)();
    }
    isHorseArmorItem() {
        (0, common_1.abstract)();
    }
    isGlint() {
        (0, common_1.abstract)();
    }
    isFullStack() {
        (0, common_1.abstract)();
    }
    isFireResistant() {
        (0, common_1.abstract)();
    }
    isExplodable() {
        (0, common_1.abstract)();
    }
    isDamaged() {
        (0, common_1.abstract)();
    }
    isDamageableItem() {
        (0, common_1.abstract)();
    }
    isArmorItem() {
        (0, common_1.abstract)();
    }
    isWearableItem() {
        (0, common_1.abstract)();
    }
    getMaxDamage() {
        (0, common_1.abstract)();
    }
    /**
     * Only custom items return ComponentItem
     */
    getComponentItem() {
        (0, common_1.abstract)();
    }
    getDamageValue() {
        (0, common_1.abstract)();
    }
    getAttackDamage() {
        (0, common_1.abstract)();
    }
    save() {
        const tag = this.allocateAndSave();
        const out = tag.value();
        tag.dispose();
        return out;
    }
    load(tag) {
        (0, common_1.abstract)();
    }
    allocateAndSave() {
        (0, common_1.abstract)();
    }
    constructItemEnchantsFromUserData() {
        (0, common_1.abstract)();
    }
    saveEnchantsToUserData(itemEnchants) {
        (0, common_1.abstract)();
    }
    getCategoryName() {
        (0, common_1.abstract)();
    }
    canDestroySpecial(block) {
        (0, common_1.abstract)();
    }
    /**
     * Hurts the item's durability.
     * Breaks the item if its durability reaches 0 or less.
     * @param count delta damage
     * @param owner owner of the item, if not null, server will send inventory.
     * @returns returns whether hurt successfully or not
     */
    hurtAndBreak(count, owner = null) {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], ItemStackBase.prototype, "vftable", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(Item.ref().ref())
], ItemStackBase.prototype, "item", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nbt_1.CompoundTag.ref())
], ItemStackBase.prototype, "userData", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(block_1.Block.ref())
], ItemStackBase.prototype, "block", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int16_t)
], ItemStackBase.prototype, "aux", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], ItemStackBase.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], ItemStackBase.prototype, "valid", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bin64_t)
], ItemStackBase.prototype, "pickupTime", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t) // uint16_t
], ItemStackBase.prototype, "showPickup", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(block_1.BlockLegacy.ref()), 0x38)
], ItemStackBase.prototype, "canPlaceOn", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(block_1.BlockLegacy.ref()), 0x58)
], ItemStackBase.prototype, "canDestroy", void 0);
ItemStackBase = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x88)
], ItemStackBase);
exports.ItemStackBase = ItemStackBase;
let ItemStack = ItemStack_1 = class ItemStack extends ItemStackBase {
    static constructWith(itemName, amount = 1, data = 0) {
        (0, common_1.abstract)();
    }
    /** @deprecated use constructWith */
    static create(itemName, amount = 1, data = 0) {
        return ItemStack_1.constructWith(itemName, amount, data);
    }
    static fromDescriptor(descriptor, palette, unknown) {
        (0, common_1.abstract)();
    }
    static fromTag(tag) {
        (0, common_1.abstract)();
    }
    clone(itemStack) {
        (0, common_1.abstract)();
    }
    /**
     * @deprecated use clone()
     */
    cloneItem() {
        const itemStack = ItemStack_1.constructWith("minecraft:air");
        this.clone(itemStack);
        return itemStack;
    }
    getDestroySpeed(block) {
        (0, common_1.abstract)();
    }
};
ItemStack.EMPTY_ITEM = symbols_1.proc["?EMPTY_ITEM@ItemStack@@2V1@B"].as(ItemStack_1);
ItemStack = ItemStack_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0xa0)
], ItemStack);
exports.ItemStack = ItemStack;
let Container = class Container extends nativeclass_1.AbstractClass {
    addItem(item) {
        (0, common_1.abstract)();
    }
    addItemToFirstEmptySlot(item) {
        (0, common_1.abstract)();
    }
    getSlots() {
        (0, common_1.abstract)();
    }
    getItem(slot) {
        (0, common_1.abstract)();
    }
    getItemCount(compare) {
        (0, common_1.abstract)();
    }
    getContainerType() {
        (0, common_1.abstract)();
    }
    hasRoomForItem(item) {
        (0, common_1.abstract)();
    }
    isEmpty() {
        (0, common_1.abstract)();
    }
    removeAllItems() {
        (0, common_1.abstract)();
    }
    removeItem(slot, count) {
        (0, common_1.abstract)();
    }
    setCustomName(name) {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], Container.prototype, "vftable", void 0);
Container = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], Container);
exports.Container = Container;
class FillingContainer extends Container {
    /**
     * It doesn't care item's amount
     */
    canAdd(itemStack) {
        (0, common_1.abstract)();
    }
}
exports.FillingContainer = FillingContainer;
class SimpleContainer extends Container {
}
exports.SimpleContainer = SimpleContainer;
class Inventory extends FillingContainer {
    /**
     * Remove the items in the slot
     * @remarks Requires `player.sendInventory()` to update the slot
     * */
    dropSlot(slot, onlyClearContainer, dropAll, randomly) {
        (0, common_1.abstract)();
    }
}
exports.Inventory = Inventory;
class PlayerUIContainer extends SimpleContainer {
}
exports.PlayerUIContainer = PlayerUIContainer;
var PlayerUISlot;
(function (PlayerUISlot) {
    PlayerUISlot[PlayerUISlot["CursorSelected"] = 0] = "CursorSelected";
    PlayerUISlot[PlayerUISlot["AnvilInput"] = 1] = "AnvilInput";
    PlayerUISlot[PlayerUISlot["AnvilMaterial"] = 2] = "AnvilMaterial";
    PlayerUISlot[PlayerUISlot["StoneCutterInput"] = 3] = "StoneCutterInput";
    PlayerUISlot[PlayerUISlot["Trade2Ingredient1"] = 4] = "Trade2Ingredient1";
    PlayerUISlot[PlayerUISlot["Trade2Ingredient2"] = 5] = "Trade2Ingredient2";
    PlayerUISlot[PlayerUISlot["TradeIngredient1"] = 6] = "TradeIngredient1";
    PlayerUISlot[PlayerUISlot["TradeIngredient2"] = 7] = "TradeIngredient2";
    PlayerUISlot[PlayerUISlot["MaterialReducerInput"] = 8] = "MaterialReducerInput";
    PlayerUISlot[PlayerUISlot["LoomInput"] = 9] = "LoomInput";
    PlayerUISlot[PlayerUISlot["LoomDye"] = 10] = "LoomDye";
    PlayerUISlot[PlayerUISlot["LoomMaterial"] = 11] = "LoomMaterial";
    PlayerUISlot[PlayerUISlot["CartographyInput"] = 12] = "CartographyInput";
    PlayerUISlot[PlayerUISlot["CartographyAdditional"] = 13] = "CartographyAdditional";
    PlayerUISlot[PlayerUISlot["EnchantingInput"] = 14] = "EnchantingInput";
    PlayerUISlot[PlayerUISlot["EnchantingMaterial"] = 15] = "EnchantingMaterial";
    PlayerUISlot[PlayerUISlot["GrindstoneInput"] = 16] = "GrindstoneInput";
    PlayerUISlot[PlayerUISlot["GrindstoneAdditional"] = 17] = "GrindstoneAdditional";
    PlayerUISlot[PlayerUISlot["CompoundCreatorInput1"] = 18] = "CompoundCreatorInput1";
    PlayerUISlot[PlayerUISlot["CompoundCreatorInput2"] = 19] = "CompoundCreatorInput2";
    PlayerUISlot[PlayerUISlot["CompoundCreatorInput3"] = 20] = "CompoundCreatorInput3";
    PlayerUISlot[PlayerUISlot["CompoundCreatorInput4"] = 21] = "CompoundCreatorInput4";
    PlayerUISlot[PlayerUISlot["CompoundCreatorInput5"] = 22] = "CompoundCreatorInput5";
    PlayerUISlot[PlayerUISlot["CompoundCreatorInput6"] = 23] = "CompoundCreatorInput6";
    PlayerUISlot[PlayerUISlot["CompoundCreatorInput7"] = 24] = "CompoundCreatorInput7";
    PlayerUISlot[PlayerUISlot["CompoundCreatorInput8"] = 25] = "CompoundCreatorInput8";
    PlayerUISlot[PlayerUISlot["CompoundCreatorInput9"] = 26] = "CompoundCreatorInput9";
    PlayerUISlot[PlayerUISlot["BeaconPayment"] = 27] = "BeaconPayment";
    PlayerUISlot[PlayerUISlot["Crafting2x2Input1"] = 28] = "Crafting2x2Input1";
    PlayerUISlot[PlayerUISlot["Crafting2x2Input2"] = 29] = "Crafting2x2Input2";
    PlayerUISlot[PlayerUISlot["Crafting2x2Input3"] = 30] = "Crafting2x2Input3";
    PlayerUISlot[PlayerUISlot["Crafting2x2Input4"] = 31] = "Crafting2x2Input4";
    PlayerUISlot[PlayerUISlot["Crafting3x3Input1"] = 32] = "Crafting3x3Input1";
    PlayerUISlot[PlayerUISlot["Crafting3x3Input2"] = 33] = "Crafting3x3Input2";
    PlayerUISlot[PlayerUISlot["Crafting3x3Input3"] = 34] = "Crafting3x3Input3";
    PlayerUISlot[PlayerUISlot["Crafting3x3Input4"] = 35] = "Crafting3x3Input4";
    PlayerUISlot[PlayerUISlot["Crafting3x3Input5"] = 36] = "Crafting3x3Input5";
    PlayerUISlot[PlayerUISlot["Crafting3x3Input6"] = 37] = "Crafting3x3Input6";
    PlayerUISlot[PlayerUISlot["Crafting3x3Input7"] = 38] = "Crafting3x3Input7";
    PlayerUISlot[PlayerUISlot["Crafting3x3Input8"] = 39] = "Crafting3x3Input8";
    PlayerUISlot[PlayerUISlot["Crafting3x3Input9"] = 40] = "Crafting3x3Input9";
    PlayerUISlot[PlayerUISlot["MaterialReducerOutput1"] = 41] = "MaterialReducerOutput1";
    PlayerUISlot[PlayerUISlot["MaterialReducerOutput2"] = 42] = "MaterialReducerOutput2";
    PlayerUISlot[PlayerUISlot["MaterialReducerOutput3"] = 43] = "MaterialReducerOutput3";
    PlayerUISlot[PlayerUISlot["MaterialReducerOutput4"] = 44] = "MaterialReducerOutput4";
    PlayerUISlot[PlayerUISlot["MaterialReducerOutput5"] = 45] = "MaterialReducerOutput5";
    PlayerUISlot[PlayerUISlot["MaterialReducerOutput6"] = 46] = "MaterialReducerOutput6";
    PlayerUISlot[PlayerUISlot["MaterialReducerOutput7"] = 47] = "MaterialReducerOutput7";
    PlayerUISlot[PlayerUISlot["MaterialReducerOutput8"] = 48] = "MaterialReducerOutput8";
    PlayerUISlot[PlayerUISlot["MaterialReducerOutput9"] = 49] = "MaterialReducerOutput9";
    PlayerUISlot[PlayerUISlot["CreatedItemOutput"] = 50] = "CreatedItemOutput";
    PlayerUISlot[PlayerUISlot["SmithingTableInput"] = 51] = "SmithingTableInput";
    PlayerUISlot[PlayerUISlot["SmithingTableMaterial"] = 52] = "SmithingTableMaterial";
})(PlayerUISlot = exports.PlayerUISlot || (exports.PlayerUISlot = {}));
let PlayerInventory = class PlayerInventory extends nativeclass_1.AbstractClass {
    get container() {
        return this.getContainer();
    }
    getContainer() {
        (0, common_1.abstract)();
    }
    addItem(itemStack, linkEmptySlot) {
        (0, common_1.abstract)();
    }
    clearSlot(slot, containerId) {
        (0, common_1.abstract)();
    }
    getContainerSize(containerId) {
        (0, common_1.abstract)();
    }
    getFirstEmptySlot() {
        (0, common_1.abstract)();
    }
    getHotbarSize() {
        (0, common_1.abstract)();
    }
    getItem(slot, containerId) {
        (0, common_1.abstract)();
    }
    getSelectedItem() {
        (0, common_1.abstract)();
    }
    getSelectedSlot() {
        return this.getInt8(0x10); // accessed in PlayerInventory::getSelectedSlot `mov eax, [rcx+10h]`
    }
    getSlotWithItem(itemStack, checkAux, checkData) {
        (0, common_1.abstract)();
    }
    /**
     * @deprecated Use container.getSlots();
     */
    getSlots() {
        return this.container.getSlots();
    }
    selectSlot(slot, containerId) {
        (0, common_1.abstract)();
    }
    setItem(slot, itemStack, containerId, linkEmptySlot) {
        (0, common_1.abstract)();
    }
    setSelectedItem(itemStack) {
        (0, common_1.abstract)();
    }
    swapSlots(primarySlot, secondarySlot) {
        (0, common_1.abstract)();
    }
    /**
     * Removes the items from inventory.
     * @param item item for resource to remove
     * @param requireExactAux if true, will only remove the item if it has the exact same aux value
     * @param requireExactData if true, will only remove the item if it has the exact same data value
     * @param maxCount max number of items to remove
     * @returns number of items not removed
     */
    removeResource(item, requireExactAux = true, requireExactData = false, maxCount) {
        (0, common_1.abstract)();
    }
    /**
     * It doesn't care item's amount
     */
    canAdd(itemStack) {
        (0, common_1.abstract)();
    }
};
PlayerInventory = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], PlayerInventory);
exports.PlayerInventory = PlayerInventory;
var InventorySourceType;
(function (InventorySourceType) {
    InventorySourceType[InventorySourceType["InvalidInventory"] = -1] = "InvalidInventory";
    InventorySourceType[InventorySourceType["ContainerInventory"] = 0] = "ContainerInventory";
    InventorySourceType[InventorySourceType["GlobalInventory"] = 1] = "GlobalInventory";
    InventorySourceType[InventorySourceType["WorldInteraction"] = 2] = "WorldInteraction";
    InventorySourceType[InventorySourceType["CreativeInventory"] = 3] = "CreativeInventory";
    InventorySourceType[InventorySourceType["UntrackedInteractionUI"] = 100] = "UntrackedInteractionUI";
    InventorySourceType[InventorySourceType["NonImplementedFeatureTODO"] = 99999] = "NonImplementedFeatureTODO";
})(InventorySourceType = exports.InventorySourceType || (exports.InventorySourceType = {}));
var InventorySourceFlags;
(function (InventorySourceFlags) {
    InventorySourceFlags[InventorySourceFlags["NoFlag"] = 0] = "NoFlag";
    InventorySourceFlags[InventorySourceFlags["WorldInteractionRandom"] = 1] = "WorldInteractionRandom";
})(InventorySourceFlags = exports.InventorySourceFlags || (exports.InventorySourceFlags = {}));
let InventorySource = InventorySource_1 = class InventorySource extends nativeclass_1.NativeStruct {
    static create(containerId, type = InventorySourceType.ContainerInventory) {
        const source = new InventorySource_1(true);
        source.type = type;
        source.containerId = containerId;
        source.flags = InventorySourceFlags.NoFlag;
        return source;
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], InventorySource.prototype, "type", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], InventorySource.prototype, "containerId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], InventorySource.prototype, "flags", void 0);
InventorySource = InventorySource_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], InventorySource);
exports.InventorySource = InventorySource;
let ItemDescriptor = class ItemDescriptor extends nativeclass_1.AbstractClass {
};
ItemDescriptor = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x10)
], ItemDescriptor);
exports.ItemDescriptor = ItemDescriptor;
class ItemStackNetIdVariant extends nativeclass_1.AbstractClass {
}
exports.ItemStackNetIdVariant = ItemStackNetIdVariant;
let NetworkItemStackDescriptor = class NetworkItemStackDescriptor extends nativeclass_1.AbstractClass {
    static constructWith(itemStack) {
        (0, common_1.abstract)();
    }
    /**
     * Calls move constructor of NetworkItemStackDescriptor for `this`
     */
    [nativetype_1.NativeType.ctor_move](temp) {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(ItemDescriptor)
], NetworkItemStackDescriptor.prototype, "descriptor", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(ItemStackNetIdVariant, 0x20) // accessed in NetworkItemStackDescriptor::tryGetServerNetId
], NetworkItemStackDescriptor.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString, 0x40)
], NetworkItemStackDescriptor.prototype, "_unknown", void 0);
NetworkItemStackDescriptor = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x60)
], NetworkItemStackDescriptor);
exports.NetworkItemStackDescriptor = NetworkItemStackDescriptor;
let InventoryAction = class InventoryAction extends nativeclass_1.AbstractClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(InventorySource)
], InventoryAction.prototype, "source", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], InventoryAction.prototype, "slot", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(NetworkItemStackDescriptor) // 0x10
], InventoryAction.prototype, "fromDesc", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(NetworkItemStackDescriptor) // 0x68
], InventoryAction.prototype, "toDesc", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(ItemStack) // 0xc0
], InventoryAction.prototype, "from", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(ItemStack) // 0x160
], InventoryAction.prototype, "to", void 0);
InventoryAction = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], InventoryAction);
exports.InventoryAction = InventoryAction;
let InventoryTransactionItemGroup = class InventoryTransactionItemGroup extends nativeclass_1.AbstractClass {
    /** When the item is dropped this is air, it should be the item when it is picked up */
    getItemStack() {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], InventoryTransactionItemGroup.prototype, "itemId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], InventoryTransactionItemGroup.prototype, "itemAux", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nbt_1.CompoundTag.ref())
], InventoryTransactionItemGroup.prototype, "tag", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], InventoryTransactionItemGroup.prototype, "count", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], InventoryTransactionItemGroup.prototype, "overflow", void 0);
InventoryTransactionItemGroup = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x18)
], InventoryTransactionItemGroup);
exports.InventoryTransactionItemGroup = InventoryTransactionItemGroup;
let InventoryTransaction = class InventoryTransaction extends nativeclass_1.AbstractClass {
    /** The packet will be cancelled if this is added wrongly */
    addItemToContent(item, count) {
        (0, common_1.abstract)();
    }
    getActions(source) {
        return this._getActions(source).toArray();
    }
    _getActions(source) {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(InventoryTransactionItemGroup), 0x40) // accessed in InventoryTransaction::~InventoryTransaction when calling std::vector<InventoryTransactionItemGroup>::_Tidy
], InventoryTransaction.prototype, "content", void 0);
InventoryTransaction = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x58)
], InventoryTransaction);
exports.InventoryTransaction = InventoryTransaction;
let ComplexInventoryTransaction = ComplexInventoryTransaction_1 = class ComplexInventoryTransaction extends nativeclass_1.AbstractClass {
    isItemUseTransaction() {
        return this.type === ComplexInventoryTransaction_1.Type.ItemUseTransaction;
    }
    isItemUseOnEntityTransaction() {
        return this.type === ComplexInventoryTransaction_1.Type.ItemUseOnEntityTransaction;
    }
    isItemReleaseTransaction() {
        return this.type === ComplexInventoryTransaction_1.Type.ItemReleaseTransaction;
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], ComplexInventoryTransaction.prototype, "vftable", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], ComplexInventoryTransaction.prototype, "type", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(InventoryTransaction)
], ComplexInventoryTransaction.prototype, "data", void 0);
ComplexInventoryTransaction = ComplexInventoryTransaction_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], ComplexInventoryTransaction);
exports.ComplexInventoryTransaction = ComplexInventoryTransaction;
ComplexInventoryTransaction.setResolver(ptr => {
    if (ptr === null)
        return null;
    const transaction = ptr.as(ComplexInventoryTransaction);
    switch (transaction.type) {
        case ComplexInventoryTransaction.Type.ItemUseTransaction:
            return ptr.as(ItemUseInventoryTransaction);
        case ComplexInventoryTransaction.Type.ItemUseOnEntityTransaction:
            return ptr.as(ItemUseOnActorInventoryTransaction);
        case ComplexInventoryTransaction.Type.ItemReleaseTransaction:
            return ptr.as(ItemReleaseInventoryTransaction);
        default:
            return transaction;
    }
});
(function (ComplexInventoryTransaction) {
    let Type;
    (function (Type) {
        Type[Type["NormalTransaction"] = 0] = "NormalTransaction";
        Type[Type["InventoryMismatch"] = 1] = "InventoryMismatch";
        Type[Type["ItemUseTransaction"] = 2] = "ItemUseTransaction";
        Type[Type["ItemUseOnEntityTransaction"] = 3] = "ItemUseOnEntityTransaction";
        Type[Type["ItemReleaseTransaction"] = 4] = "ItemReleaseTransaction";
    })(Type = ComplexInventoryTransaction.Type || (ComplexInventoryTransaction.Type = {}));
})(ComplexInventoryTransaction = exports.ComplexInventoryTransaction || (exports.ComplexInventoryTransaction = {}));
exports.ComplexInventoryTransaction = ComplexInventoryTransaction;
let ItemUseInventoryTransaction = class ItemUseInventoryTransaction extends ComplexInventoryTransaction {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], ItemUseInventoryTransaction.prototype, "actionType", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.BlockPos)
], ItemUseInventoryTransaction.prototype, "pos", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], ItemUseInventoryTransaction.prototype, "targetBlockId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], ItemUseInventoryTransaction.prototype, "face", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], ItemUseInventoryTransaction.prototype, "slot", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(NetworkItemStackDescriptor)
], ItemUseInventoryTransaction.prototype, "descriptor", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.Vec3)
], ItemUseInventoryTransaction.prototype, "fromPos", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.Vec3)
], ItemUseInventoryTransaction.prototype, "clickPos", void 0);
ItemUseInventoryTransaction = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ItemUseInventoryTransaction);
exports.ItemUseInventoryTransaction = ItemUseInventoryTransaction;
(function (ItemUseInventoryTransaction) {
    let ActionType;
    (function (ActionType) {
        ActionType[ActionType["Place"] = 0] = "Place";
        ActionType[ActionType["Use"] = 1] = "Use";
        ActionType[ActionType["Destroy"] = 2] = "Destroy";
    })(ActionType = ItemUseInventoryTransaction.ActionType || (ItemUseInventoryTransaction.ActionType = {}));
})(ItemUseInventoryTransaction = exports.ItemUseInventoryTransaction || (exports.ItemUseInventoryTransaction = {}));
exports.ItemUseInventoryTransaction = ItemUseInventoryTransaction;
let ItemUseOnActorInventoryTransaction = class ItemUseOnActorInventoryTransaction extends ComplexInventoryTransaction {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(actor_1.ActorRuntimeID)
], ItemUseOnActorInventoryTransaction.prototype, "runtimeId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], ItemUseOnActorInventoryTransaction.prototype, "actionType", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], ItemUseOnActorInventoryTransaction.prototype, "slot", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(NetworkItemStackDescriptor)
], ItemUseOnActorInventoryTransaction.prototype, "descriptor", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.Vec3)
], ItemUseOnActorInventoryTransaction.prototype, "fromPos", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.Vec3)
], ItemUseOnActorInventoryTransaction.prototype, "hitPos", void 0);
ItemUseOnActorInventoryTransaction = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ItemUseOnActorInventoryTransaction);
exports.ItemUseOnActorInventoryTransaction = ItemUseOnActorInventoryTransaction;
(function (ItemUseOnActorInventoryTransaction) {
    let ActionType;
    (function (ActionType) {
        ActionType[ActionType["Interact"] = 0] = "Interact";
        ActionType[ActionType["Attack"] = 1] = "Attack";
        ActionType[ActionType["ItemInteract"] = 2] = "ItemInteract";
    })(ActionType = ItemUseOnActorInventoryTransaction.ActionType || (ItemUseOnActorInventoryTransaction.ActionType = {}));
})(ItemUseOnActorInventoryTransaction = exports.ItemUseOnActorInventoryTransaction || (exports.ItemUseOnActorInventoryTransaction = {}));
exports.ItemUseOnActorInventoryTransaction = ItemUseOnActorInventoryTransaction;
let ItemReleaseInventoryTransaction = class ItemReleaseInventoryTransaction extends ComplexInventoryTransaction {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], ItemReleaseInventoryTransaction.prototype, "actionType", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], ItemReleaseInventoryTransaction.prototype, "slot", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(NetworkItemStackDescriptor)
], ItemReleaseInventoryTransaction.prototype, "descriptor", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.Vec3)
], ItemReleaseInventoryTransaction.prototype, "fromPos", void 0);
ItemReleaseInventoryTransaction = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ItemReleaseInventoryTransaction);
exports.ItemReleaseInventoryTransaction = ItemReleaseInventoryTransaction;
(function (ItemReleaseInventoryTransaction) {
    let ActionType;
    (function (ActionType) {
        ActionType[ActionType["Release"] = 0] = "Release";
        ActionType[ActionType["Use"] = 1] = "Use";
    })(ActionType = ItemReleaseInventoryTransaction.ActionType || (ItemReleaseInventoryTransaction.ActionType = {}));
})(ItemReleaseInventoryTransaction = exports.ItemReleaseInventoryTransaction || (exports.ItemReleaseInventoryTransaction = {}));
exports.ItemReleaseInventoryTransaction = ItemReleaseInventoryTransaction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZW50b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW52ZW50b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0NBQXFDO0FBQ3JDLGtDQUFzQztBQUN0Qyw0Q0FBeUM7QUFDekMsZ0RBQW9HO0FBQ3BHLDhDQUFpSTtBQUNqSSxtQ0FBZ0Q7QUFDaEQsbUNBQTZDO0FBQzdDLHlDQUE0QztBQUc1QyxpREFBOEM7QUFHOUMsK0JBQXlDO0FBRXpDLHVDQUFpQztBQUVqQzs7R0FFRztBQUNILElBQVksV0F1Qlg7QUF2QkQsV0FBWSxXQUFXO0lBQ25CLHVEQUFTLENBQUE7SUFDVCxpRUFBaUU7SUFDakUsK0NBQUssQ0FBQTtJQUNMLGlFQUFpRTtJQUNqRSwrQ0FBVSxDQUFBO0lBQ1YscUNBQXFDO0lBQ3JDLHFEQUFhLENBQUE7SUFDYixxQ0FBcUM7SUFDckMsaURBQUssQ0FBQTtJQUNMLHFDQUFxQztJQUNyQyx1REFBUSxDQUFBO0lBQ1I7O09BRUc7SUFDSCxtREFBTSxDQUFBO0lBQ047O09BRUc7SUFDSCxtRUFBYyxDQUFBO0lBQ2QscUNBQXFDO0lBQ3JDLDJDQUFFLENBQUE7SUFDRiwrQ0FBVyxDQUFBO0FBQ2YsQ0FBQyxFQXZCVyxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQXVCdEI7QUFFRCxJQUFZLGFBa0NYO0FBbENELFdBQVksYUFBYTtJQUNyQiwyREFBUyxDQUFBO0lBQ1QsMkRBQVMsQ0FBQTtJQUNULHVEQUFPLENBQUE7SUFDUCwrREFBVyxDQUFBO0lBQ1gsaUVBQVksQ0FBQTtJQUNaLG1EQUFLLENBQUE7SUFDTCwyREFBUyxDQUFBO0lBQ1QsdURBQU8sQ0FBQTtJQUNQLHFEQUFNLENBQUE7SUFDTix5REFBUSxDQUFBO0lBQ1Isb0VBQWEsQ0FBQTtJQUNiLHNFQUFjLENBQUE7SUFDZCxvREFBSyxDQUFBO0lBQ0wsc0RBQU0sQ0FBQTtJQUNOLHdFQUFlLENBQUE7SUFDZixvREFBSyxDQUFBO0lBQ0wsa0VB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