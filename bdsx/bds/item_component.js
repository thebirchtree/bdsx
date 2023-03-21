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
        (0, common_1.abstract)();
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
    positionAndRotateActor(actor, vec3, unsignedInt8, _vec3, blockLegacy) {
        (0, common_1.abstract)();
    }
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