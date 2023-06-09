"use strict";
var CommandAreaFactory_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandAreaFactory = exports.CommandArea = void 0;
const tslib_1 = require("tslib");
const capi_1 = require("../capi");
const common_1 = require("../common");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const prochacker_1 = require("../prochacker");
const block_1 = require("./block");
const blockpos_1 = require("./blockpos");
const dimension_1 = require("./dimension");
let CommandArea = class CommandArea extends nativeclass_1.AbstractClass {
    [nativetype_1.NativeType.dtor]() {
        (0, common_1.abstract)();
    }
    dispose() {
        this.destruct();
        capi_1.capi.free(this);
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(block_1.BlockSource.ref(), 0x8)
], CommandArea.prototype, "blockSource", void 0);
CommandArea = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], CommandArea);
exports.CommandArea = CommandArea;
let CommandAreaFactory = CommandAreaFactory_1 = class CommandAreaFactory extends nativeclass_1.NativeClass {
    static create(dimension) {
        const factory = new CommandAreaFactory_1(true);
        factory.dimension = dimension;
        return factory;
    }
    /**
     * @return CommandArea need to be disposed
     */
    findArea(pos1, pos2, b, b2, b3) {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(dimension_1.Dimension.ref())
], CommandAreaFactory.prototype, "dimension", void 0);
CommandAreaFactory = CommandAreaFactory_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], CommandAreaFactory);
exports.CommandAreaFactory = CommandAreaFactory;
CommandArea.prototype[nativetype_1.NativeType.dtor] = prochacker_1.procHacker.js("??1CommandArea@@QEAA@XZ", nativetype_1.void_t, { this: CommandArea });
CommandAreaFactory.prototype.findArea = prochacker_1.procHacker.js("?findArea@CommandAreaFactory@@QEBA?AV?$unique_ptr@VCommandArea@@U?$default_delete@VCommandArea@@@std@@@std@@AEBVBlockPos@@0_N11@Z", CommandArea.ref(), { structureReturn: true, this: CommandAreaFactory }, blockpos_1.BlockPos, blockpos_1.BlockPos, nativetype_1.bool_t, nativetype_1.bool_t, nativetype_1.bool_t);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZGFyZWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21tYW5kYXJlYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtDQUErQjtBQUMvQixzQ0FBcUM7QUFDckMsZ0RBQXNGO0FBQ3RGLDhDQUEyRDtBQUMzRCw4Q0FBMkM7QUFDM0MsbUNBQXNDO0FBQ3RDLHlDQUFzQztBQUN0QywyQ0FBd0M7QUFHakMsSUFBTSxXQUFXLEdBQWpCLE1BQU0sV0FBWSxTQUFRLDJCQUFhO0lBSTFDLENBQUMsdUJBQVUsQ0FBQyxJQUFJLENBQUM7UUFDYixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxPQUFPO1FBQ0gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLFdBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQztDQUNKLENBQUE7QUFWRztJQURDLElBQUEseUJBQVcsRUFBQyxtQkFBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsQ0FBQztnREFDWDtBQUZoQixXQUFXO0lBRHZCLElBQUEseUJBQVcsR0FBRTtHQUNELFdBQVcsQ0FZdkI7QUFaWSxrQ0FBVztBQWVqQixJQUFNLGtCQUFrQiwwQkFBeEIsTUFBTSxrQkFBbUIsU0FBUSx5QkFBVztJQUkvQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQW9CO1FBQzlCLE1BQU0sT0FBTyxHQUFHLElBQUksb0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsT0FBTyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDOUIsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsUUFBUSxDQUFDLElBQWMsRUFBRSxJQUFjLEVBQUUsQ0FBVSxFQUFFLEVBQVcsRUFBRSxFQUFXO1FBQ3pFLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztDQUNKLENBQUE7QUFkRztJQURDLElBQUEseUJBQVcsRUFBQyxxQkFBUyxDQUFDLEdBQUcsRUFBRSxDQUFDO3FEQUNSO0FBRlosa0JBQWtCO0lBRDlCLElBQUEseUJBQVcsR0FBRTtHQUNELGtCQUFrQixDQWdCOUI7QUFoQlksZ0RBQWtCO0FBa0IvQixXQUFXLENBQUMsU0FBUyxDQUFDLHVCQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsdUJBQVUsQ0FBQyxFQUFFLENBQUMseUJBQXlCLEVBQUUsbUJBQU0sRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO0FBQ2pILGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsdUJBQVUsQ0FBQyxFQUFFLENBQ2pELG1JQUFtSSxFQUNuSSxXQUFXLENBQUMsR0FBRyxFQUFFLEVBQ2pCLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsRUFDbkQsbUJBQVEsRUFDUixtQkFBUSxFQUNSLG1CQUFNLEVBQ04sbUJBQU0sRUFDTixtQkFBTSxDQUNULENBQUMifQ==