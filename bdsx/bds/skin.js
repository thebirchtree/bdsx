"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializedSkin = exports.SerializedPersonaPieceHandle = exports.AnimatedImageData = exports.PersonaPieceType = exports.PersonaAnimatedTextureType = exports.TrustedSkinFlag = void 0;
const tslib_1 = require("tslib");
const cxxvector_1 = require("../cxxvector");
const mce_1 = require("../mce");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const prochacker_1 = require("../prochacker");
const connreq_1 = require("./connreq");
const server_1 = require("./server");
var TrustedSkinFlag;
(function (TrustedSkinFlag) {
    TrustedSkinFlag[TrustedSkinFlag["Unset"] = 0] = "Unset";
    TrustedSkinFlag[TrustedSkinFlag["False"] = 1] = "False";
    TrustedSkinFlag[TrustedSkinFlag["True"] = 2] = "True";
})(TrustedSkinFlag = exports.TrustedSkinFlag || (exports.TrustedSkinFlag = {}));
var PersonaAnimatedTextureType;
(function (PersonaAnimatedTextureType) {
    PersonaAnimatedTextureType[PersonaAnimatedTextureType["None"] = 0] = "None";
    PersonaAnimatedTextureType[PersonaAnimatedTextureType["Face"] = 1] = "Face";
    PersonaAnimatedTextureType[PersonaAnimatedTextureType["Body32x32"] = 2] = "Body32x32";
    PersonaAnimatedTextureType[PersonaAnimatedTextureType["Body128x128"] = 3] = "Body128x128";
})(PersonaAnimatedTextureType = exports.PersonaAnimatedTextureType || (exports.PersonaAnimatedTextureType = {}));
var PersonaPieceType;
(function (PersonaPieceType) {
    PersonaPieceType[PersonaPieceType["Unknown"] = 0] = "Unknown";
    PersonaPieceType[PersonaPieceType["Skeleton"] = 1] = "Skeleton";
    PersonaPieceType[PersonaPieceType["Body"] = 2] = "Body";
    PersonaPieceType[PersonaPieceType["Skin"] = 3] = "Skin";
    PersonaPieceType[PersonaPieceType["Bottom"] = 4] = "Bottom";
    PersonaPieceType[PersonaPieceType["Feet"] = 5] = "Feet";
    PersonaPieceType[PersonaPieceType["Dress"] = 6] = "Dress";
    PersonaPieceType[PersonaPieceType["Top"] = 7] = "Top";
    PersonaPieceType[PersonaPieceType["HighPants"] = 8] = "HighPants";
    PersonaPieceType[PersonaPieceType["Hands"] = 9] = "Hands";
    PersonaPieceType[PersonaPieceType["Outerwear"] = 10] = "Outerwear";
    PersonaPieceType[PersonaPieceType["Back"] = 11] = "Back";
    PersonaPieceType[PersonaPieceType["FacialHair"] = 12] = "FacialHair";
    PersonaPieceType[PersonaPieceType["Mouth"] = 13] = "Mouth";
    PersonaPieceType[PersonaPieceType["Eyes"] = 14] = "Eyes";
    PersonaPieceType[PersonaPieceType["Hair"] = 15] = "Hair";
    PersonaPieceType[PersonaPieceType["FaceAccessory"] = 16] = "FaceAccessory";
    PersonaPieceType[PersonaPieceType["Head"] = 17] = "Head";
    PersonaPieceType[PersonaPieceType["Legs"] = 18] = "Legs";
    PersonaPieceType[PersonaPieceType["LeftLeg"] = 19] = "LeftLeg";
    PersonaPieceType[PersonaPieceType["RightLeg"] = 20] = "RightLeg";
    PersonaPieceType[PersonaPieceType["Arms"] = 21] = "Arms";
    PersonaPieceType[PersonaPieceType["LeftArm"] = 22] = "LeftArm";
    PersonaPieceType[PersonaPieceType["RightArm"] = 23] = "RightArm";
    PersonaPieceType[PersonaPieceType["Capes"] = 24] = "Capes";
    PersonaPieceType[PersonaPieceType["ClassicSkin"] = 25] = "ClassicSkin";
})(PersonaPieceType = exports.PersonaPieceType || (exports.PersonaPieceType = {}));
let AnimatedImageData = class AnimatedImageData extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], AnimatedImageData.prototype, "type", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(mce_1.mce.Image)
], AnimatedImageData.prototype, "image", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], AnimatedImageData.prototype, "frames", void 0);
AnimatedImageData = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x38)
], AnimatedImageData);
exports.AnimatedImageData = AnimatedImageData;
let SerializedPersonaPieceHandle = class SerializedPersonaPieceHandle extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], SerializedPersonaPieceHandle.prototype, "pieceId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], SerializedPersonaPieceHandle.prototype, "pieceType", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(mce_1.mce.UUID, 0x28)
], SerializedPersonaPieceHandle.prototype, "packId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], SerializedPersonaPieceHandle.prototype, "isDefaultPiece", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString, 0x40)
], SerializedPersonaPieceHandle.prototype, "productId", void 0);
SerializedPersonaPieceHandle = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], SerializedPersonaPieceHandle);
exports.SerializedPersonaPieceHandle = SerializedPersonaPieceHandle;
/**
 * persona::ArmSize::Type
 */
var ArmSizeType;
(function (ArmSizeType) {
    ArmSizeType[ArmSizeType["Slim"] = 0] = "Slim";
    ArmSizeType[ArmSizeType["Wide"] = 1] = "Wide";
})(ArmSizeType || (ArmSizeType = {}));
let SerializedSkin = class SerializedSkin extends nativeclass_1.NativeClass {
    /**
     * analyzed from static persona::ArmSize::getTypeFromString
     * SerializedSkin::SerializedSkin calls it.
     */
    get armSize() {
        return this.armSizeType === ArmSizeType.Slim ? "slim" : "wide";
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString, { ghost: true })
], SerializedSkin.prototype, "skinId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], SerializedSkin.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], SerializedSkin.prototype, "playFabId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], SerializedSkin.prototype, "fullId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], SerializedSkin.prototype, "resourcePatch", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], SerializedSkin.prototype, "defaultGeometryName", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(mce_1.mce.Image)
], SerializedSkin.prototype, "skinImage", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(mce_1.mce.Image)
], SerializedSkin.prototype, "capeImage", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(AnimatedImageData))
], SerializedSkin.prototype, "skinAnimatedImages", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(connreq_1.JsonValue)
], SerializedSkin.prototype, "geometryData", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(server_1.SemVersion)
], SerializedSkin.prototype, "geometryDataEngineVersion", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(connreq_1.JsonValue)
], SerializedSkin.prototype, "geometryDataMutable", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], SerializedSkin.prototype, "animationData", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], SerializedSkin.prototype, "capeId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(SerializedPersonaPieceHandle))
], SerializedSkin.prototype, "personaPieces", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], SerializedSkin.prototype, "armSizeType", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(mce_1.mce.Color, { offset: 0x44, relative: true })
], SerializedSkin.prototype, "skinColor", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], SerializedSkin.prototype, "isTrustedSkin", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], SerializedSkin.prototype, "isPremium", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], SerializedSkin.prototype, "isPersona", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t, { ghost: true })
], SerializedSkin.prototype, "isCapeOnClassicSkin", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], SerializedSkin.prototype, "isPersonaCapeOnClassicSkin", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], SerializedSkin.prototype, "isPrimaryUser", void 0);
SerializedSkin = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], SerializedSkin);
exports.SerializedSkin = SerializedSkin;
SerializedSkin.prototype[nativetype_1.NativeType.ctor] = prochacker_1.procHacker.js("??0SerializedSkin@@QEAA@XZ", nativetype_1.void_t, { this: SerializedSkin });
SerializedSkin.prototype[nativetype_1.NativeType.dtor] = prochacker_1.procHacker.js("??1SerializedSkin@@QEAA@XZ", nativetype_1.void_t, { this: SerializedSkin });
SerializedSkin.prototype[nativetype_1.NativeType.ctor_copy] = prochacker_1.procHacker.js("??0SerializedSkin@@QEAA@AEBV0@@Z", nativetype_1.void_t, { this: SerializedSkin }, SerializedSkin);
SerializedSkin.prototype[nativetype_1.NativeType.ctor_move] = prochacker_1.procHacker.js("??0SerializedSkin@@QEAA@$$QEAV0@@Z", nativetype_1.void_t, { this: SerializedSkin }, SerializedSkin);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNraW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDRDQUF5QztBQUN6QyxnQ0FBNkI7QUFDN0IsZ0RBQXVFO0FBQ3ZFLDhDQUE2RztBQUM3Ryw4Q0FBMkM7QUFDM0MsdUNBQXNDO0FBQ3RDLHFDQUFzQztBQUV0QyxJQUFZLGVBSVg7QUFKRCxXQUFZLGVBQWU7SUFDdkIsdURBQUssQ0FBQTtJQUNMLHVEQUFLLENBQUE7SUFDTCxxREFBSSxDQUFBO0FBQ1IsQ0FBQyxFQUpXLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBSTFCO0FBRUQsSUFBWSwwQkFLWDtBQUxELFdBQVksMEJBQTBCO0lBQ2xDLDJFQUFJLENBQUE7SUFDSiwyRUFBSSxDQUFBO0lBQ0oscUZBQVMsQ0FBQTtJQUNULHlGQUFXLENBQUE7QUFDZixDQUFDLEVBTFcsMEJBQTBCLEdBQTFCLGtDQUEwQixLQUExQixrQ0FBMEIsUUFLckM7QUFFRCxJQUFZLGdCQTJCWDtBQTNCRCxXQUFZLGdCQUFnQjtJQUN4Qiw2REFBTyxDQUFBO0lBQ1AsK0RBQVEsQ0FBQTtJQUNSLHVEQUFJLENBQUE7SUFDSix1REFBSSxDQUFBO0lBQ0osMkRBQU0sQ0FBQTtJQUNOLHVEQUFJLENBQUE7SUFDSix5REFBSyxDQUFBO0lBQ0wscURBQUcsQ0FBQTtJQUNILGlFQUFTLENBQUE7SUFDVCx5REFBSyxDQUFBO0lBQ0wsa0VBQVMsQ0FBQTtJQUNULHdEQUFJLENBQUE7SUFDSixvRUFBVSxDQUFBO0lBQ1YsMERBQUssQ0FBQTtJQUNMLHdEQUFJLENBQUE7SUFDSix3REFBSSxDQUFBO0lBQ0osMEVBQWEsQ0FBQTtJQUNiLHdEQUFJLENBQUE7SUFDSix3REFBSSxDQUFBO0lBQ0osOERBQU8sQ0FBQTtJQUNQLGdFQUFRLENBQUE7SUFDUix3REFBSSxDQUFBO0lBQ0osOERBQU8sQ0FBQTtJQUNQLGdFQUFRLENBQUE7SUFDUiwwREFBSyxDQUFB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