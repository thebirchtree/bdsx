"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StructureManager = exports.StructureTemplate = exports.StructureTemplateData = exports.StructureSettings = exports.Mirror = exports.Rotation = void 0;
const tslib_1 = require("tslib");
const common_1 = require("../common");
const core_1 = require("../core");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const blockpos_1 = require("./blockpos");
var Rotation;
(function (Rotation) {
    Rotation[Rotation["None"] = 0] = "None";
    Rotation[Rotation["Rotate90"] = 1] = "Rotate90";
    Rotation[Rotation["Rotate180"] = 2] = "Rotate180";
    Rotation[Rotation["Rotate270"] = 3] = "Rotate270";
    Rotation[Rotation["Rotate360"] = 4] = "Rotate360";
})(Rotation = exports.Rotation || (exports.Rotation = {}));
var Mirror;
(function (Mirror) {
    Mirror[Mirror["None"] = 0] = "None";
    Mirror[Mirror["X"] = 1] = "X";
    Mirror[Mirror["Z"] = 2] = "Z";
    Mirror[Mirror["XZ"] = 3] = "XZ";
})(Mirror = exports.Mirror || (exports.Mirror = {}));
let StructureSettings = class StructureSettings extends nativeclass_1.AbstractClass {
    static constructWith(size, ignoreEntities = false, ignoreBlocks = false) {
        (0, common_1.abstract)();
    }
    getIgnoreBlocks() {
        (0, common_1.abstract)();
    }
    getIgnoreEntities() {
        (0, common_1.abstract)();
    }
    getIgnoreJigsawBlocks() {
        return this.getBoolean(0x23);
    }
    isAnimated() {
        (0, common_1.abstract)();
    }
    getStructureOffset() {
        (0, common_1.abstract)();
    }
    getStructureSize() {
        (0, common_1.abstract)();
    }
    getPivot() {
        (0, common_1.abstract)();
    }
    getPaletteName() {
        return this.getCxxString();
    }
    getAnimationMode() {
        (0, common_1.abstract)();
    }
    getMirror() {
        (0, common_1.abstract)();
    }
    getReloadActorEquipment() {
        return this.getBoolean(0x21);
    }
    getRotation() {
        (0, common_1.abstract)();
    }
    getAnimationSeconds() {
        (0, common_1.abstract)();
    }
    getIntegrityValue() {
        (0, common_1.abstract)();
    }
    getAnimationTicks() {
        (0, common_1.abstract)();
    }
    getIntegritySeed() {
        (0, common_1.abstract)();
    }
    setAnimationMode(mode) {
        (0, common_1.abstract)();
    }
    setAnimationSeconds(seconds) {
        (0, common_1.abstract)();
    }
    setIgnoreBlocks(ignoreBlocks) {
        (0, common_1.abstract)();
    }
    setIgnoreEntities(ignoreEntities) {
        (0, common_1.abstract)();
    }
    setIgnoreJigsawBlocks(ignoreJigsawBlocks) {
        (0, common_1.abstract)();
    }
    setIntegritySeed(seed) {
        (0, common_1.abstract)();
    }
    setIntegrityValue(value) {
        (0, common_1.abstract)();
    }
    setMirror(mirror) {
        (0, common_1.abstract)();
    }
    setPaletteName(name) {
        (0, common_1.abstract)();
    }
    setPivot(pivot) {
        (0, common_1.abstract)();
    }
    setReloadActorEquipment(reloadActorEquipment) {
        (0, common_1.abstract)();
    }
    setRotation(rotation) {
        (0, common_1.abstract)();
    }
    setStructureOffset(offset) {
        (0, common_1.abstract)();
    }
    setStructureSize(size) {
        (0, common_1.abstract)();
    }
    [nativeclass_1.nativeClassUtil.inspectFields](obj) {
        obj.paletteName = this.getPaletteName();
        obj.ignoreEntities = this.getIgnoreEntities();
        obj.reloadActorEquipment = this.getReloadActorEquipment();
        obj.ignoreBlocks = this.getIgnoreBlocks();
        obj.ignoreJigsawBlocks = this.getIgnoreJigsawBlocks();
        obj.structureSize = this.getStructureSize();
        obj.structureOffset = this.getStructureOffset();
        obj.pivot = this.getPivot();
        obj.rotation = this.getRotation();
        obj.mirror = this.getMirror();
        obj.animationMode = this.getAnimationMode();
        obj.animationTicks = this.getAnimationTicks();
        obj.integrityValue = this.getIntegrityValue();
        obj.integritySeed = this.getIntegritySeed();
    }
};
StructureSettings = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x60)
], StructureSettings);
exports.StructureSettings = StructureSettings;
let StructureTemplateData = class StructureTemplateData extends nativeclass_1.AbstractClass {
    save() {
        const tag = this.allocateAndSave();
        const out = tag.value();
        tag.dispose();
        return out;
    }
    allocateAndSave() {
        (0, common_1.abstract)();
    }
    load(tag) {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], StructureTemplateData.prototype, "vftable", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], StructureTemplateData.prototype, "formatVersion", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.BlockPos)
], StructureTemplateData.prototype, "size", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.BlockPos)
], StructureTemplateData.prototype, "structureWorldOrigin", void 0);
StructureTemplateData = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0xb8)
], StructureTemplateData);
exports.StructureTemplateData = StructureTemplateData;
let StructureTemplate = class StructureTemplate extends nativeclass_1.AbstractClass {
    fillFromWorld(region, pos, settings) {
        (0, common_1.abstract)();
    }
    placeInWorld(region, palette, pos, settings) {
        (0, common_1.abstract)();
    }
    getBlockAtPos(pos) {
        (0, common_1.abstract)();
    }
    getSize() {
        (0, common_1.abstract)();
    }
    allocateAndSave() {
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
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], StructureTemplate.prototype, "name", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(StructureTemplateData)
], StructureTemplate.prototype, "data", void 0);
StructureTemplate = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], StructureTemplate);
exports.StructureTemplate = StructureTemplate;
let StructureManager = class StructureManager extends nativeclass_1.AbstractClass {
    getOrCreate(name) {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], StructureManager.prototype, "vftable", void 0);
StructureManager = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null) // Last few lines of Minecraft::Minecraft
], StructureManager);
exports.StructureManager = StructureManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RydWN0dXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RydWN0dXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxzQ0FBcUM7QUFDckMsa0NBQXNDO0FBQ3RDLGdEQUEwRjtBQUMxRiw4Q0FBbUQ7QUFFbkQseUNBQTRDO0FBSTVDLElBQVksUUFNWDtBQU5ELFdBQVksUUFBUTtJQUNoQix1Q0FBSSxDQUFBO0lBQ0osK0NBQVEsQ0FBQTtJQUNSLGlEQUFTLENBQUE7SUFDVCxpREFBUyxDQUFBO0lBQ1QsaURBQVMsQ0FBQTtBQUNiLENBQUMsRUFOVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQU1uQjtBQUVELElBQVksTUFLWDtBQUxELFdBQVksTUFBTTtJQUNkLG1DQUFJLENBQUE7SUFDSiw2QkFBQyxDQUFBO0lBQ0QsNkJBQUMsQ0FBQTtJQUNELCtCQUFFLENBQUE7QUFDTixDQUFDLEVBTFcsTUFBTSxHQUFOLGNBQU0sS0FBTixjQUFNLFFBS2pCO0FBR00sSUFBTSxpQkFBaUIsR0FBdkIsTUFBTSxpQkFBa0IsU0FBUSwyQkFBYTtJQUNoRCxNQUFNLENBQUMsYUFBYSxDQUFDLElBQWMsRUFBRSxpQkFBMEIsS0FBSyxFQUFFLGVBQXdCLEtBQUs7UUFDL0YsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELGlCQUFpQjtRQUNiLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELHFCQUFxQjtRQUNqQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNELFVBQVU7UUFDTixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxrQkFBa0I7UUFDZCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxnQkFBZ0I7UUFDWixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxRQUFRO1FBQ0osSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsY0FBYztRQUNWLE9BQU8sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFDRCxnQkFBZ0I7UUFDWixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxTQUFTO1FBQ0wsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsdUJBQXVCO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0QsV0FBVztRQUNQLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELG1CQUFtQjtRQUNmLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELGlCQUFpQjtRQUNiLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELGlCQUFpQjtRQUNiLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELGdCQUFnQjtRQUNaLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELGdCQUFnQixDQUFDLElBQVk7UUFDekIsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsbUJBQW1CLENBQUMsT0FBZTtRQUMvQixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxlQUFlLENBQUMsWUFBcUI7UUFDakMsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsaUJBQWlCLENBQUMsY0FBdUI7UUFDckMsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QscUJBQXFCLENBQUMsa0JBQTJCO1FBQzdDLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELGdCQUFnQixDQUFDLElBQVk7UUFDekIsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsaUJBQWlCLENBQUMsS0FBYTtRQUMzQixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxTQUFTLENBQUMsTUFBYztRQUNwQixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxjQUFjLENBQUMsSUFBWTtRQUN2QixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxRQUFRLENBQUMsS0FBVztRQUNoQixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCx1QkFBdUIsQ0FBQyxvQkFBNkI7UUFDakQsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsV0FBVyxDQUFDLFFBQWtCO1FBQzFCLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELGtCQUFrQixDQUFDLE1BQWdCO1FBQy9CLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELGdCQUFnQixDQUFDLElBQWM7UUFDM0IsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsQ0FBQyw2QkFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQXdCO1FBQ3BELEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDOUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQzFELEdBQUcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUN0RCxHQUFHLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDaEQsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUIsR0FBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEMsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDOUIsR0FBRyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM1QyxHQUFHLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzlDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDOUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0NBQ0osQ0FBQTtBQWhIWSxpQkFBaUI7SUFEN0IsSUFBQSx5QkFBVyxFQUFDLElBQUksQ0FBQztHQUNMLGlCQUFpQixDQWdIN0I7QUFoSFksOENBQWlCO0FBbUh2QixJQUFNLHFCQUFxQixHQUEzQixNQUFNLHFCQUFzQixTQUFRLDJCQUFhO0lBVXBELElBQUk7UUFDQSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDbkMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNkLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUNELGVBQWU7UUFDWCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxJQUFJLENBQUMsR0FBK0I7UUFDaEMsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0NBQ0osQ0FBQTtBQXBCRztJQURDLElBQUEseUJBQVcsRUFBQyxrQkFBVyxDQUFDO3NEQUNKO0FBRXJCO0lBREMsSUFBQSx5QkFBVyxFQUFDLG9CQUFPLENBQUM7NERBQ0U7QUFFdkI7SUFEQyxJQUFBLHlCQUFXLEVBQUMsbUJBQVEsQ0FBQzttREFDRTtBQUV4QjtJQURDLElBQUEseUJBQVcsRUFBQyxtQkFBUSxDQUFDO21FQUNrQjtBQVIvQixxQkFBcUI7SUFEakMsSUFBQSx5QkFBVyxFQUFDLElBQUksQ0FBQztHQUNMLHFCQUFxQixDQXNCakM7QUF0Qlksc0RBQXFCO0FBeUIzQixJQUFNLGlCQUFpQixHQUF2QixNQUFNLGlCQUFrQixTQUFRLDJCQUFhO0lBTWhELGFBQWEsQ0FBQyxNQUFtQixFQUFFLEdBQWEsRUFBRSxRQUEyQjtRQUN6RSxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxZQUFZLENBQUMsTUFBbUIsRUFBRSxPQUFxQixFQUFFLEdBQWEsRUFBRSxRQUEyQjtRQUMvRixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxhQUFhLENBQUMsR0FBYTtRQUN2QixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxPQUFPO1FBQ0gsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsZUFBZTtRQUNYLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELElBQUk7UUFDQSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDbkMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNkLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUNELElBQUksQ0FBQyxHQUErQjtRQUNoQyxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7Q0FDSixDQUFBO0FBNUJHO0lBREMsSUFBQSx5QkFBVyxFQUFDLHNCQUFTLENBQUM7K0NBQ1A7QUFFaEI7SUFEQyxJQUFBLHlCQUFXLEVBQUMscUJBQXFCLENBQUM7K0NBQ1A7QUFKbkIsaUJBQWlCO0lBRDdCLElBQUEseUJBQVcsR0FBRTtHQUNELGlCQUFpQixDQThCN0I7QUE5QlksOENBQWlCO0FBaUN2QixJQUFNLGdCQUFnQixHQUF0QixNQUFNLGdCQUFpQixTQUFRLDJCQUFhO0lBSS9DLFdBQVcsQ0FBQyxJQUFZO1FBQ3BCLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztDQUNKLENBQUE7QUFMRztJQURDLElBQUEseUJBQVcsRUFBQyxrQkFBVyxDQUFDO2lEQUNKO0FBRlosZ0JBQWdCO0lBRDVCLElBQUEseUJBQVcsRUFBQyxJQUFJLENBQUMsQ0FBQyx5Q0FBeUM7R0FDL0MsZ0JBQWdCLENBTzVCO0FBUFksNENBQWdCIn0=