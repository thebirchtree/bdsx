"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WearableItemComponent = exports.WeaponItemComponent = exports.ThrowableItemComponent = exports.ShooterItemComponent = exports.RepairableItemComponent = exports.RenderOffsetsItemComponent = exports.RecordItemComponent = exports.ProjectileItemComponent = exports.PlanterItemComponent = exports.OnUseItemComponent = exports.KnockbackResistanceItemComponent = exports.IconItemComponent = exports.FuelItemComponent = exports.FoodItemComponent = exports.EntityPlacerItemComponent = exports.DyePowderItemComponent = exports.DisplayNameItemComponent = exports.DurabilityItemComponent = exports.DiggerItemComponent = exports.ArmorItemComponent = exports.CooldownItemComponent = exports.ItemComponent = void 0;
const common_1 = require("../common");
const nativeclass_1 = require("../nativeclass");
class ItemComponent extends nativeclass_1.NativeClass {
    static getIdentifier() {
        (0, common_1.abstract)();
    }
    buildNetworkTag() {
        (0, common_1.abstract)();
    }
    initializeFromNetwork(tag) {
        (0, common_1.abstract)();
    }
    isCooldown() {
        return this instanceof CooldownItemComponent;
    }
    isDurability() {
        return this instanceof DurabilityItemComponent;
    }
    isDigger() {
        return this instanceof DiggerItemComponent;
    }
    isDisplayName() {
        return this instanceof DisplayNameItemComponent;
    }
    isDyePowder() {
        return this instanceof DyePowderItemComponent;
    }
    isEntityPlacer() {
        return this instanceof EntityPlacerItemComponent;
    }
    isFood() {
        return this instanceof FoodItemComponent;
    }
    isFuel() {
        return this instanceof FuelItemComponent;
    }
    isIcon() {
        return this instanceof IconItemComponent;
    }
    isKnockbackResistance() {
        return this instanceof KnockbackResistanceItemComponent;
    }
    isOnUse() {
        return this instanceof OnUseItemComponent;
    }
    isPlanter() {
        return this instanceof PlanterItemComponent;
    }
    isProjectile() {
        return this instanceof ProjectileItemComponent;
    }
    isRecord() {
        return this instanceof RecordItemComponent;
    }
    isRenderOffsets() {
        return this instanceof RenderOffsetsItemComponent;
    }
    isRepairable() {
        return this instanceof RepairableItemComponent;
    }
    isShooter() {
        return this instanceof ShooterItemComponent;
    }
    isThrowable() {
        return this instanceof ThrowableItemComponent;
    }
    isWeapon() {
        return this instanceof WeaponItemComponent;
    }
    isWearable() {
        return this instanceof WearableItemComponent;
    }
    isArmor() {
        return this instanceof ArmorItemComponent;
    }
}
exports.ItemComponent = ItemComponent;
class CooldownItemComponent extends ItemComponent {
}
exports.CooldownItemComponent = CooldownItemComponent;
class ArmorItemComponent extends ItemComponent {
}
exports.ArmorItemComponent = ArmorItemComponent;
class DiggerItemComponent extends ItemComponent {
    mineBlock(itemStack, block, int1, int2, int3, actor) {
        (0, common_1.abstract)();
    }
}
exports.DiggerItemComponent = DiggerItemComponent;
class DurabilityItemComponent extends ItemComponent {
    getDamageChance(int) {
        const damageChangeRange = this.getUint32(0x14);
        let unk = this.getUint32(0x18);
        unk -= damageChangeRange;
        unk = (unk / int + 1) | 0;
        return unk + damageChangeRange;
    }
}
exports.DurabilityItemComponent = DurabilityItemComponent;
class DisplayNameItemComponent extends ItemComponent {
}
exports.DisplayNameItemComponent = DisplayNameItemComponent;
class DyePowderItemComponent extends ItemComponent {
}
exports.DyePowderItemComponent = DyePowderItemComponent;
class EntityPlacerItemComponent extends ItemComponent {
    // TODO: removed method, need to implement
    // positionAndRotateActor(actor: Actor, vec3: Vec3, unsignedInt8: number, _vec3: Vec3, blockLegacy: BlockLegacy): void {
    //     abstract();
    // }
    setActorCustomName(actor, itemStack) {
        (0, common_1.abstract)();
    }
}
exports.EntityPlacerItemComponent = EntityPlacerItemComponent;
class FoodItemComponent extends ItemComponent {
    canAlwaysEat() {
        (0, common_1.abstract)();
    }
    getUsingConvertsToItemDescriptor() {
        (0, common_1.abstract)();
    }
}
exports.FoodItemComponent = FoodItemComponent;
class FuelItemComponent extends ItemComponent {
}
exports.FuelItemComponent = FuelItemComponent;
class IconItemComponent extends ItemComponent {
}
exports.IconItemComponent = IconItemComponent;
class KnockbackResistanceItemComponent extends ItemComponent {
    getProtectionValue() {
        (0, common_1.abstract)();
    }
}
exports.KnockbackResistanceItemComponent = KnockbackResistanceItemComponent;
class OnUseItemComponent extends ItemComponent {
}
exports.OnUseItemComponent = OnUseItemComponent;
class PlanterItemComponent extends ItemComponent {
}
exports.PlanterItemComponent = PlanterItemComponent;
class ProjectileItemComponent extends ItemComponent {
    getShootDir(player, float) {
        (0, common_1.abstract)();
    }
    shootProjectile(blockSource, vec3, _vec3, float, player) {
        (0, common_1.abstract)();
    }
}
exports.ProjectileItemComponent = ProjectileItemComponent;
class RecordItemComponent extends ItemComponent {
    getAlias() {
        (0, common_1.abstract)();
    }
}
exports.RecordItemComponent = RecordItemComponent;
class RenderOffsetsItemComponent extends ItemComponent {
}
exports.RenderOffsetsItemComponent = RenderOffsetsItemComponent;
class RepairableItemComponent extends ItemComponent {
    handleItemRepair(itemStackBase, _itemStackBase) {
        (0, common_1.abstract)();
    }
}
exports.RepairableItemComponent = RepairableItemComponent;
class ShooterItemComponent extends ItemComponent {
}
exports.ShooterItemComponent = ShooterItemComponent;
class ThrowableItemComponent extends ItemComponent {
    getLaunchPower(int1, int2, int3) {
        (0, common_1.abstract)();
    }
}
exports.ThrowableItemComponent = ThrowableItemComponent;
class WeaponItemComponent extends ItemComponent {
}
exports.WeaponItemComponent = WeaponItemComponent;
class WearableItemComponent extends ItemComponent {
}
exports.WearableItemComponent = WearableItemComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbV9jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpdGVtX2NvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBcUM7QUFDckMsZ0RBQTZDO0FBUzdDLE1BQWEsYUFBYyxTQUFRLHlCQUFXO0lBQzFDLE1BQU0sQ0FBQyxhQUFhO1FBQ2hCLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELGVBQWU7UUFDWCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxxQkFBcUIsQ0FBQyxHQUFnQjtRQUNsQyxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxVQUFVO1FBQ04sT0FBTyxJQUFJLFlBQVkscUJBQXFCLENBQUM7SUFDakQsQ0FBQztJQUNELFlBQVk7UUFDUixPQUFPLElBQUksWUFBWSx1QkFBdUIsQ0FBQztJQUNuRCxDQUFDO0lBQ0QsUUFBUTtRQUNKLE9BQU8sSUFBSSxZQUFZLG1CQUFtQixDQUFDO0lBQy9DLENBQUM7SUFDRCxhQUFhO1FBQ1QsT0FBTyxJQUFJLFlBQVksd0JBQXdCLENBQUM7SUFDcEQsQ0FBQztJQUNELFdBQVc7UUFDUCxPQUFPLElBQUksWUFBWSxzQkFBc0IsQ0FBQztJQUNsRCxDQUFDO0lBQ0QsY0FBYztRQUNWLE9BQU8sSUFBSSxZQUFZLHlCQUF5QixDQUFDO0lBQ3JELENBQUM7SUFDRCxNQUFNO1FBQ0YsT0FBTyxJQUFJLFlBQVksaUJBQWlCLENBQUM7SUFDN0MsQ0FBQztJQUNELE1BQU07UUFDRixPQUFPLElBQUksWUFBWSxpQkFBaUIsQ0FBQztJQUM3QyxDQUFDO0lBQ0QsTUFBTTtRQUNGLE9BQU8sSUFBSSxZQUFZLGlCQUFpQixDQUFDO0lBQzdDLENBQUM7SUFDRCxxQkFBcUI7UUFDakIsT0FBTyxJQUFJLFlBQVksZ0NBQWdDLENBQUM7SUFDNUQsQ0FBQztJQUNELE9BQU87UUFDSCxPQUFPLElBQUksWUFBWSxrQkFBa0Is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