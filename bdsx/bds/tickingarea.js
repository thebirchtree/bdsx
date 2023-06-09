"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TickingAreaList = exports.ITickingArea = exports.ITickingAreaView = void 0;
const tslib_1 = require("tslib");
const common_1 = require("../common");
const cxxvector_1 = require("../cxxvector");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const prochacker_1 = require("../prochacker");
const sharedpointer_1 = require("../sharedpointer");
const blockpos_1 = require("./blockpos");
const chunk_1 = require("./chunk");
let ITickingAreaView = class ITickingAreaView extends nativeclass_1.NativeClass {
    getAvailableChunk(pos) {
        (0, common_1.abstract)();
    }
};
ITickingAreaView = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], ITickingAreaView);
exports.ITickingAreaView = ITickingAreaView;
let ITickingArea = class ITickingArea extends nativeclass_1.NativeClass {
    isRemoved() {
        (0, common_1.abstract)();
    }
    getView() {
        (0, common_1.abstract)();
    }
};
ITickingArea = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], ITickingArea);
exports.ITickingArea = ITickingArea;
let TickingAreaList = class TickingAreaList extends nativeclass_1.NativeClass {
    getAreas() {
        (0, common_1.abstract)();
    }
};
TickingAreaList = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], TickingAreaList);
exports.TickingAreaList = TickingAreaList;
ITickingAreaView.prototype.getAvailableChunk = prochacker_1.procHacker.jsv("??_7TickingAreaView@@6B@", "?getAvailableChunk@TickingAreaView@@UEAA?AV?$shared_ptr@VLevelChunk@@@std@@AEBVChunkPos@@@Z", sharedpointer_1.CxxSharedPtr.make(chunk_1.LevelChunk), { this: ITickingAreaView, structureReturn: true }, blockpos_1.ChunkPos);
ITickingArea.prototype.isRemoved = prochacker_1.procHacker.jsv("??_7TickingArea@@6B@", "?isRemoved@TickingArea@@UEAA_NXZ", nativetype_1.bool_t, { this: ITickingArea });
ITickingArea.prototype.getView = prochacker_1.procHacker.jsv("??_7TickingArea@@6B@", "?getView@TickingArea@@UEAAAEAVITickingAreaView@@XZ", ITickingAreaView, {
    this: ITickingArea,
});
TickingAreaList.prototype.getAreas = prochacker_1.procHacker.js("?getAreas@TickingAreaListBase@@QEBAAEBV?$vector@V?$shared_ptr@VITickingArea@@@std@@V?$allocator@V?$shared_ptr@VITickingArea@@@std@@@2@@std@@XZ", cxxvector_1.CxxVector.make(sharedpointer_1.CxxSharedPtr.make(ITickingArea)), { this: TickingAreaList });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlja2luZ2FyZWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aWNraW5nYXJlYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsc0NBQXFDO0FBQ3JDLDRDQUF5QztBQUN6QyxnREFBMEQ7QUFDMUQsOENBQXVDO0FBQ3ZDLDhDQUEyQztBQUMzQyxvREFBZ0Q7QUFDaEQseUNBQXNDO0FBQ3RDLG1DQUFxQztBQUc5QixJQUFNLGdCQUFnQixHQUF0QixNQUFNLGdCQUFpQixTQUFRLHlCQUFXO0lBQzdDLGlCQUFpQixDQUFDLEdBQWE7UUFDM0IsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0NBQ0osQ0FBQTtBQUpZLGdCQUFnQjtJQUQ1QixJQUFBLHlCQUFXLEdBQUU7R0FDRCxnQkFBZ0IsQ0FJNUI7QUFKWSw0Q0FBZ0I7QUFPdEIsSUFBTSxZQUFZLEdBQWxCLE1BQU0sWUFBYSxTQUFRLHlCQUFXO0lBQ3pDLFNBQVM7UUFDTCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxPQUFPO1FBQ0gsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0NBQ0osQ0FBQTtBQVJZLFlBQVk7SUFEeEIsSUFBQSx5QkFBVyxHQUFFO0dBQ0QsWUFBWSxDQVF4QjtBQVJZLG9DQUFZO0FBV2xCLElBQU0sZUFBZSxHQUFyQixNQUFNLGVBQWdCLFNBQVEseUJBQVc7SUFDNUMsUUFBUTtRQUNKLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztDQUNKLENBQUE7QUFKWSxlQUFlO0lBRDNCLElBQUEseUJBQVcsR0FBRTtHQUNELGVBQWUsQ0FJM0I7QUFKWSwwQ0FBZTtBQU01QixnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEdBQUcsdUJBQVUsQ0FBQyxHQUFHLENBQ3pELDBCQUEwQixFQUMxQiw2RkFBNkYsRUFDN0YsNEJBQVksQ0FBQyxJQUFJLENBQUMsa0JBQVUsQ0FBQyxFQUM3QixFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLEVBQ2pELG1CQUFRLENBQ1gsQ0FBQztBQUVGLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLHVCQUFVLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLGtDQUFrQyxFQUFFLG1CQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztBQUU5SSxZQUFZLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyx1QkFBVSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxvREFBb0QsRUFBRSxnQkFBZ0IsRUFBRTtJQUM1SSxJQUFJLEVBQUUsWUFBWTtDQUNyQixDQUFDLENBQUM7QUFFSCxlQUFlLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyx1QkFBVSxDQUFDLEVBQUUsQ0FDOUMsZ0pBQWdKLEVBQ2hKLHFCQUFTLENBQUMsSUFBSSxDQUFDLDRCQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQy9DLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxDQUM1QixDQUFDIn0=