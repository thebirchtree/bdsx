"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChunkSource = exports.LevelChunk = void 0;
const tslib_1 = require("tslib");
const common_1 = require("../common");
const nativeclass_1 = require("../nativeclass");
class LevelChunk extends nativeclass_1.NativeClass {
    getBiome(pos) {
        (0, common_1.abstract)();
    }
    getLevel() {
        (0, common_1.abstract)();
    }
    getPosition() {
        (0, common_1.abstract)();
    }
    getMin() {
        (0, common_1.abstract)();
    }
    getMax() {
        (0, common_1.abstract)();
    }
    isFullyLoaded() {
        (0, common_1.abstract)();
    }
    /**
     * Converts a local ChunkBlockPos instance to a global BlockPos.
     */
    toWorldPos(pos) {
        (0, common_1.abstract)();
    }
    getEntity(actorId) {
        (0, common_1.abstract)();
    }
    getChunkEntities() {
        (0, common_1.abstract)();
    }
}
exports.LevelChunk = LevelChunk;
let ChunkSource = class ChunkSource extends nativeclass_1.NativeClass {
    getLevel() {
        (0, common_1.abstract)();
    }
    isChunkKnown(chunkPos) {
        (0, common_1.abstract)();
    }
    isChunkSaved(chunkPos) {
        (0, common_1.abstract)();
    }
    isWithinWorldLimit(chunkPos) {
        (0, common_1.abstract)();
    }
    isShutdownDone() {
        (0, common_1.abstract)();
    }
};
ChunkSource = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ChunkSource);
exports.ChunkSource = ChunkSource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaHVuay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsc0NBQXFDO0FBQ3JDLGdEQUEwRDtBQU8xRCxNQUFhLFVBQVcsU0FBUSx5QkFBVztJQUN2QyxRQUFRLENBQUMsR0FBa0I7UUFDdkIsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsUUFBUTtRQUNKLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELFdBQVc7UUFDUCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxNQUFNO1FBQ0YsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsTUFBTTtRQUNGLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELGFBQWE7UUFDVCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRDs7T0FFRztJQUNILFVBQVUsQ0FBQyxHQUFrQjtRQUN6QixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxTQUFTLENBQUMsT0FBc0I7UUFDNUIsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsZ0JBQWdCO1FBQ1osSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0NBQ0o7QUEvQkQsZ0NBK0JDO0FBR00sSUFBTSxXQUFXLEdBQWpCLE1BQU0sV0FBWSxTQUFRLHlCQUFXO0lBQ3hDLFFBQVE7UUFDSixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxZQUFZLENBQUMsUUFBa0I7UUFDM0IsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsWUFBWSxDQUFDLFFBQWtCO1FBQzNCLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELGtCQUFrQixDQUFDLFFBQWtCO1FBQ2pDLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELGNBQWM7UUFDVixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7Q0FDSixDQUFBO0FBcEJZLFdBQVc7SUFEdkIsSUFBQSx5QkFBVyxFQUFDLElBQUksQ0FBQztHQUNMLFdBQVcsQ0FvQnZCO0FBcEJZLGtDQUFXIn0=