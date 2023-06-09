"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HitResult = exports.SplashPotionEffectSubcomponent = exports.OnHitSubcomponent = exports.ProjectileComponent = void 0;
const tslib_1 = require("tslib");
const common_1 = require("../common");
const core_1 = require("../core");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
let ProjectileComponent = class ProjectileComponent extends nativeclass_1.NativeClass {
};
ProjectileComponent = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ProjectileComponent);
exports.ProjectileComponent = ProjectileComponent;
let OnHitSubcomponent = class OnHitSubcomponent extends nativeclass_1.NativeClass {
    readfromJSON(json) {
        (0, common_1.abstract)();
    }
    writetoJSON(json) {
        (0, common_1.abstract)();
    }
    _getName() {
        (0, common_1.abstract)();
    }
    getName() {
        return this._getName().getString();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], OnHitSubcomponent.prototype, "vftable", void 0);
OnHitSubcomponent = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x08)
], OnHitSubcomponent);
exports.OnHitSubcomponent = OnHitSubcomponent;
let SplashPotionEffectSubcomponent = class SplashPotionEffectSubcomponent extends OnHitSubcomponent {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], SplashPotionEffectSubcomponent.prototype, "potionEffect", void 0);
SplashPotionEffectSubcomponent = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], SplashPotionEffectSubcomponent);
exports.SplashPotionEffectSubcomponent = SplashPotionEffectSubcomponent;
let HitResult = class HitResult extends nativeclass_1.AbstractClass {
    getEntity() {
        (0, common_1.abstract)();
    }
};
HitResult = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], HitResult);
exports.HitResult = HitResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbXBvbmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLHNDQUFxQztBQUNyQyxrQ0FBcUQ7QUFDckQsZ0RBQXNGO0FBQ3RGLDhDQUFnRDtBQUt6QyxJQUFNLG1CQUFtQixHQUF6QixNQUFNLG1CQUFvQixTQUFRLHlCQUFXO0NBNEJuRCxDQUFBO0FBNUJZLG1CQUFtQjtJQUQvQixJQUFBLHlCQUFXLEVBQUMsSUFBSSxDQUFDO0dBQ0wsbUJBQW1CLENBNEIvQjtBQTVCWSxrREFBbUI7QUErQnpCLElBQU0saUJBQWlCLEdBQXZCLE1BQU0saUJBQWtCLFNBQVEseUJBQVc7SUFJOUMsWUFBWSxDQUFDLElBQWU7UUFDeEIsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsV0FBVyxDQUFDLElBQWU7UUFDdkIsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ1MsUUFBUTtRQUNkLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELE9BQU87UUFDSCxPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0NBQ0osQ0FBQTtBQWRHO0lBREMsSUFBQSx5QkFBVyxFQUFDLGtCQUFXLENBQUM7a0RBQ0o7QUFGWixpQkFBaUI7SUFEN0IsSUFBQSx5QkFBVyxFQUFDLElBQUksQ0FBQztHQUNMLGlCQUFpQixDQWdCN0I7QUFoQlksOENBQWlCO0FBbUJ2QixJQUFNLDhCQUE4QixHQUFwQyxNQUFNLDhCQUErQixTQUFRLGlCQUFpQjtDQUdwRSxDQUFBO0FBREc7SUFEQyxJQUFBLHlCQUFXLEVBQUMsb0JBQU8sQ0FBQztvRUFDQztBQUZiLDhCQUE4QjtJQUQxQyxJQUFBLHlCQUFXLEVBQUMsSUFBSSxDQUFDO0dBQ0wsOEJBQThCLENBRzFDO0FBSFksd0VBQThCO0FBTXBDLElBQU0sU0FBUyxHQUFmLE1BQU0sU0FBVSxTQUFRLDJCQUFhO0lBQ3hDLFNBQVM7UUFDTCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7Q0FDSixDQUFBO0FBSlksU0FBUztJQURyQixJQUFBLHlCQUFXLEVBQUMsSUFBSSxDQUFDO0dBQ0wsU0FBUyxDQUlyQjtBQUpZLDhCQUFTIn0=