"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dimension = void 0;
const tslib_1 = require("tslib");
const common_1 = require("../common");
const core_1 = require("../core");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const prochacker_1 = require("../prochacker");
const block_1 = require("./block");
const blockpos_1 = require("./blockpos");
const chunk_1 = require("./chunk");
let Dimension = class Dimension extends nativeclass_1.NativeClass {
    /** @deprecated Use `this.getBlockSource()` instead */
    get blockSource() {
        return this.getBlockSource();
    }
    getBlockSource() {
        (0, common_1.abstract)();
    }
    getChunkSource() {
        (0, common_1.abstract)();
    }
    getDimensionId() {
        (0, common_1.abstract)();
    }
    _sendBlockEntityUpdatePacket(pos) {
        (0, common_1.abstract)();
    }
    fetchNearestAttackablePlayer(actor, distance, blockPos) {
        (0, common_1.abstract)();
    }
    getSunAngle() {
        (0, common_1.abstract)();
    }
    getTimeOfDay() {
        (0, common_1.abstract)();
    }
    isDay() {
        (0, common_1.abstract)();
    }
    distanceToNearestPlayerSqr2D(pos) {
        (0, common_1.abstract)();
    }
    transferEntityToUnloadedChunk(actor, levelChunk) {
        (0, common_1.abstract)();
    }
    getSpawnPos() {
        (0, common_1.abstract)();
    }
    getPlayers() {
        (0, common_1.abstract)();
    }
    fetchNearestPlayerToActor(actor, distance) {
        (0, common_1.abstract)();
    }
    fetchNearestPlayerToPosition(x, y, z, distance, findAnyNearPlayer) {
        (0, common_1.abstract)();
    }
    getMoonBrightness() {
        (0, common_1.abstract)();
    }
    getHeight() {
        (0, common_1.abstract)();
    }
    getMinHeight() {
        (0, common_1.abstract)();
    }
    tryGetClosestPublicRegion(chunkPos) {
        (0, common_1.abstract)();
    }
    unregisterEntity(actorUniqueId) {
        (0, common_1.abstract)();
    }
    removeActorByID(actorUniqueId) {
        (0, common_1.abstract)();
    }
    getDefaultBiomeString() {
        (0, common_1.abstract)();
    }
    /**
     * @deprecated use getDefaultBiomeString
     */
    getDefaultBiome() {
        // polyfill
        switch (this.getDefaultBiomeString()) {
            case "hell":
                return 8;
            case "the_end":
                return 9;
            case "ocean":
            default:
                return 0; // unexpected
        }
    }
    getMoonPhase() {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], Dimension.prototype, "vftable", void 0);
Dimension = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], Dimension);
exports.Dimension = Dimension;
Dimension.prototype.getBlockSource = prochacker_1.procHacker.js("?getBlockSourceFromMainChunkSource@Dimension@@QEBAAEAVBlockSource@@XZ", block_1.BlockSource, { this: Dimension });
Dimension.prototype.getChunkSource = prochacker_1.procHacker.js("?getChunkSource@Dimension@@QEBAAEAVChunkSource@@XZ", chunk_1.ChunkSource, { this: Dimension });
Dimension.prototype.getDimensionId = prochacker_1.procHacker.js("?getDimensionId@Dimension@@UEBA?AV?$AutomaticID@VDimension@@H@@XZ", nativetype_1.int32_t, {
    this: Dimension,
    structureReturn: true,
});
/**
 * in fact, the first parameter of this function is NetworkBlockPosition.
 * but it seems it's an alias of BlockPos and it's used for only this function.
 */
Dimension.prototype._sendBlockEntityUpdatePacket = prochacker_1.procHacker.js("?_sendBlockEntityUpdatePacket@Dimension@@AEAAXAEBVNetworkBlockPosition@@@Z", nativetype_1.void_t, { this: Dimension }, blockpos_1.BlockPos);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGltZW5zaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGltZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxzQ0FBcUM7QUFDckMsa0NBQXNDO0FBQ3RDLGdEQUF1RTtBQUN2RSw4Q0FBZ0Q7QUFDaEQsOENBQTJDO0FBRTNDLG1DQUFzQztBQUN0Qyx5Q0FBc0Q7QUFDdEQsbUNBQWtEO0FBSzNDLElBQU0sU0FBUyxHQUFmLE1BQU0sU0FBVSxTQUFRLHlCQUFXO0lBR3RDLHNEQUFzRDtJQUN0RCxJQUFJLFdBQVc7UUFDWCxPQUFPLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsY0FBYztRQUNWLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELGNBQWM7UUFDVixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxjQUFjO1FBQ1YsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsNEJBQTRCLENBQUMsR0FBYTtRQUN0QyxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFHRCw0QkFBNEIsQ0FBQyxLQUFZLEVBQUUsUUFBZ0IsRUFBRSxRQUFtQjtRQUM1RSxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxXQUFXO1FBQ1AsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsWUFBWTtRQUNSLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELEtBQUs7UUFDRCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCw0QkFBNEIsQ0FBQyxHQUFTO1FBQ2xDLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELDZCQUE2QixDQUFDLEtBQVksRUFBRSxVQUF1QjtRQUMvRCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxXQUFXO1FBQ1AsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsVUFBVTtRQUNOLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELHlCQUF5QixDQUFDLEtBQVksRUFBRSxRQUFnQjtRQUNwRCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCw0QkFBNEIsQ0FBQyxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxRQUFnQixFQUFFLGlCQUEwQjtRQUN0RyxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxpQkFBaUI7UUFDYixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxTQUFTO1FBQ0wsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsWUFBWTtRQUNSLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELHlCQUF5QixDQUFDLFFBQWtCO1FBQ3hDLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELGdCQUFnQixDQUFDLGFBQTRCO1FBQ3pDLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELGVBQWUsQ0FBQyxhQUE0QjtRQUN4QyxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxxQkFBcUI7UUFDakIsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0Q7O09BRUc7SUFDSCxlQUFlO1FBQ1gsV0FBVztRQUNYLFFBQVEsSUFBSSxDQUFDLHFCQUFxQixFQUFFLEVBQUU7WUFDbEMsS0FBSyxNQUFNO2dCQUNQLE9BQU8sQ0FBQyxDQUFDO1lBQ2IsS0FBSyxTQUFTO2dCQUNWLE9BQU8sQ0FBQyxDQUFDO1lBQ2IsS0FBSyxPQUFPLENBQUM7WUFDYjtnQkFDSSxPQUFPLENBQUMsQ0FBQyxDQUFDLGFBQWE7U0FDOUI7SUFDTCxDQUFDO0lBQ0QsWUFBWTtRQUNSLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztDQUNKLENBQUE7QUF6Rkc7SUFEQyxJQUFBLHlCQUFXLEVBQUMsa0JBQVcsQ0FBQzswQ0FDSjtBQUZaLFNBQVM7SUFEckIsSUFBQSx5QkFBVyxFQUFDLElBQUksQ0FBQztHQUNMLFNBQVMsQ0EyRnJCO0FBM0ZZLDhCQUFTO0FBNkZ0QixTQUFTLENBQUMsU0FBUyxDQUFDLGNBQWMsR0FBRyx1QkFBVSxDQUFDLEVBQUUsQ0FBQyx1RUFBdUUsRUFBRSxtQkFBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7QUFDOUosU0FBUyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEdBQUcsdUJBQVUsQ0FBQyxFQUFFLENBQUMsb0RBQW9ELEVBQUUsbUJBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO0FBQzNJLFNBQVMsQ0FBQyxTQUFTLENBQUMsY0FBYyxHQUFHLHVCQUFVLENBQUMsRUFBRSxDQUFDLG1FQUFtRSxFQUFFLG9CQUFPLEVBQUU7SUFDN0gsSUFBSSxFQUFFLFNBQVM7SUFDZixlQUFlLEVBQUUsSUFBSTtDQUN4QixDQUFDLENBQUM7QUFFSDs7O0dBR0c7QUFDSCxTQUFTLENBQUMsU0FBUyxDQUFDLDRCQUE0QixHQUFHLHVCQUFVLENBQUMsRUFBRSxDQUM1RCw0RUFBNEUsRUFDNUUsbUJBQU0sRUFDTixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFDbkIsbUJBQVEsQ0FDWCxDQUFDIn0=