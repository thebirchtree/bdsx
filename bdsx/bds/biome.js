"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Biome = exports.VanillaBiomeTypes = void 0;
const tslib_1 = require("tslib");
const common_1 = require("../common");
const core_1 = require("../core");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
var VanillaBiomeTypes;
(function (VanillaBiomeTypes) {
    VanillaBiomeTypes[VanillaBiomeTypes["Beach"] = 0] = "Beach";
    VanillaBiomeTypes[VanillaBiomeTypes["Desert"] = 1] = "Desert";
    VanillaBiomeTypes[VanillaBiomeTypes["ExtremeHills"] = 2] = "ExtremeHills";
    VanillaBiomeTypes[VanillaBiomeTypes["Flat"] = 3] = "Flat";
    VanillaBiomeTypes[VanillaBiomeTypes["Forest"] = 4] = "Forest";
    VanillaBiomeTypes[VanillaBiomeTypes["Hell"] = 5] = "Hell";
    VanillaBiomeTypes[VanillaBiomeTypes["Ice"] = 6] = "Ice";
    VanillaBiomeTypes[VanillaBiomeTypes["Jungle"] = 7] = "Jungle";
    VanillaBiomeTypes[VanillaBiomeTypes["Mesa"] = 8] = "Mesa";
    VanillaBiomeTypes[VanillaBiomeTypes["MushroomIsland"] = 9] = "MushroomIsland";
    VanillaBiomeTypes[VanillaBiomeTypes["Ocean"] = 10] = "Ocean";
    VanillaBiomeTypes[VanillaBiomeTypes["Plain"] = 11] = "Plain";
    VanillaBiomeTypes[VanillaBiomeTypes["River"] = 12] = "River";
    VanillaBiomeTypes[VanillaBiomeTypes["Savanna"] = 13] = "Savanna";
    VanillaBiomeTypes[VanillaBiomeTypes["StoneBeach"] = 14] = "StoneBeach";
    VanillaBiomeTypes[VanillaBiomeTypes["Swamp"] = 15] = "Swamp";
    VanillaBiomeTypes[VanillaBiomeTypes["Taiga"] = 16] = "Taiga";
    VanillaBiomeTypes[VanillaBiomeTypes["TheEnd"] = 17] = "TheEnd";
    VanillaBiomeTypes[VanillaBiomeTypes["DataDriven"] = 18] = "DataDriven";
})(VanillaBiomeTypes = exports.VanillaBiomeTypes || (exports.VanillaBiomeTypes = {}));
let Biome = class Biome extends nativeclass_1.AbstractClass {
    /**
     * Returns the type of the biome (not the name)
     */
    getBiomeType() {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], Biome.prototype, "vftable", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], Biome.prototype, "name", void 0);
Biome = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], Biome);
exports.Biome = Biome;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlvbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiaW9tZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsc0NBQXFDO0FBQ3JDLGtDQUFzQztBQUN0QyxnREFBeUU7QUFDekUsOENBQTBDO0FBRTFDLElBQVksaUJBb0JYO0FBcEJELFdBQVksaUJBQWlCO0lBQ3pCLDJEQUFTLENBQUE7SUFDVCw2REFBVSxDQUFBO0lBQ1YseUVBQWdCLENBQUE7SUFDaEIseURBQVEsQ0FBQTtJQUNSLDZEQUFVLENBQUE7SUFDVix5REFBUSxDQUFBO0lBQ1IsdURBQU8sQ0FBQTtJQUNQLDZEQUFVLENBQUE7SUFDVix5REFBUSxDQUFBO0lBQ1IsNkVBQWtCLENBQUE7SUFDbEIsNERBQVUsQ0FBQTtJQUNWLDREQUFVLENBQUE7SUFDViw0REFBVSxDQUFBO0lBQ1YsZ0VBQVksQ0FBQTtJQUNaLHNFQUFlLENBQUE7SUFDZiw0REFBVSxDQUFBO0lBQ1YsNERBQVUsQ0FBQTtJQUNWLDhEQUFXLENBQUE7SUFDWCxzRUFBZSxDQUFBO0FBQ25CLENBQUMsRUFwQlcsaUJBQWlCLEdBQWpCLHlCQUFpQixLQUFqQix5QkFBaUIsUUFvQjVCO0FBR00sSUFBTSxLQUFLLEdBQVgsTUFBTSxLQUFNLFNBQVEsMkJBQWE7SUFNcEM7O09BRUc7SUFDSCxZQUFZO1FBQ1IsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0NBQ0osQ0FBQTtBQVZHO0lBREMsSUFBQSx5QkFBVyxFQUFDLGtCQUFXLENBQUM7c0NBQ0o7QUFFckI7SUFEQyxJQUFBLHlCQUFXLEVBQUMsc0JBQVMsQ0FBQzttQ0FDUDtBQUpQLEtBQUs7SUFEakIsSUFBQSx5QkFBVyxFQUFDLElBQUksQ0FBQztHQUNMLEtBQUssQ0FZakI7QUFaWSxzQkFBSyJ9