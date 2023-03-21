"use strict";
var PlayerListEntry_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RespawnPacket = exports.AnimatePacket = exports.SetSpawnPositionPacket = exports.SetHealthPacket = exports.SetActorLinkPacket = exports.SetActorMotionPacket = exports.SetActorDataPacket = exports.HurtArmorPacket = exports.EntityFallPacket = exports.PlayerActionPacket = exports.ActorPickRequestPacket = exports.BlockPickRequestPacket = exports.InteractPacket = exports.MobArmorEquipmentPacket = exports.MobEquipmentPacket = exports.InventoryTransactionPacket = exports.UpdateAttributesPacket = exports.AttributeData = exports.MobEffectPacket = exports.ActorEventPacket = exports.BlockEventPacket = exports.LevelEventPacket = exports.LevelSoundEventPacketV1 = exports.TickSyncPacket = exports.AddPaintingPacket = exports.UpdateBlockPacket = exports.RiderJumpPacket = exports.PassengerJumpPacket = exports.MovePlayerPacket = exports.MoveActorAbsolutePacket = exports.TakeItemActorPacket = exports.AddItemActorPacket = exports.RemoveActorPacket = exports.AddActorPacket = exports.AddPlayerPacket = exports.StartGamePacket = exports.LevelSettings = exports.SetTimePacket = exports.TextPacket = exports.ResourcePackClientResponsePacket = exports.ResourcePackResponse = exports.ResourcePackStacksPacket = exports.ResourcePackStackPacket = exports.ResourcePacksInfoPacket = exports.PackType = exports.DisconnectPacket = exports.ClientToServerHandshakePacket = exports.ServerToClientHandshakePacket = exports.PlayStatusPacket = exports.LoginPacket = void 0;
exports.PurchaseReceiptPacket = exports.ShowStoreOfferPacket = exports.StructureBlockUpdatePacket = exports.AddBehaviorTreePacket = exports.SetTitlePacket = exports.StopSoundPacket = exports.PlaySoundPacket = exports.TransferPacket = exports.ResourcePackChunkRequestPacket = exports.ResourcePackChunkDataPacket = exports.ResourcePackDataInfoPacket = exports.UpdateEquipPacket = exports.UpdateTradePacket = exports.CommandOutputPacket = exports.CommandBlockUpdatePacket = exports.CommandRequestPacket = exports.AvailableCommandsPacket = exports.ShowCreditsPacket = exports.BossEventPacket = exports.CameraPacket = exports.GameRulesChangedPacket = exports.ItemFrameDropItemPacket = exports.ChunkRadiusUpdatedPacket = exports.RequestChunkRadiusPacket = exports.MapInfoRequestPacket = exports.MapItemDataPacket = exports.ClientboundMapItemData = exports.SpawnExperienceOrbPacket = exports.TelemetryEventPacket = exports.EventPacket = exports.SimpleEventPacket = exports.PlayerListPacket = exports.PlayerListEntry = exports.SetPlayerGameTypePacket = exports.ChangeDimensionPacket = exports.SetDifficultyPacket = exports.SetCommandsEnabledPacket = exports.LevelChunkPacket = exports.PlayerInputPacket = exports.BlockActorDataPacket = exports.AdventureSettingsPacket = exports.GuiDataPickItemPacket = exports.CraftingEventPacket = exports.CraftingDataPacket = exports.ContainerSetDataPacket = exports.InventorySlotPacket = exports.InventoryContentPacket = exports.PlayerHotbarPacket = exports.ContainerClosePacket = exports.ContainerOpenPacket = void 0;
exports.AnvilDamagePacket = exports.SettingsCommandPacket = exports.MultiplayerSettingsPacket = exports.EmotePacket = exports.EducationSettingsPacket = exports.ClientCacheMissResponsePacket = exports.ClientCacheBlobStatusPacket = exports.StructureTemplateDataExportPacket = exports.StructureTemplateDataResponsePacket = exports.StructureTemplateDataRequestPacket = exports.MapCreateLockedCopy = exports.OnScreenTextureAnimationPacket = exports.ClientCacheStatusPacket = exports.RemoveEntityPacket = exports.LecternUpdatePacket = exports.LevelEventGenericPacket = exports.LevelSoundEventPacket = exports.BiomeDefinitionList = exports.NetworkChunkPublisherUpdatePacket = exports.LevelSoundEventPacketV2 = exports.AvailableActorIdentifiersPacket = exports.SpawnParticleEffect = exports.SpawnParticleEffectPacket = exports.ScriptCustomEventPacket = exports.NetworkStackLatencyPacket = exports.UpdateSoftEnumPacket = exports.SetLocalPlayerAsInitializedPacket = exports.SetScoreboardIdentityPacket = exports.MoveActorDeltaPacket = exports.UpdateBlockPacketSynced = exports.LabTablePacket = exports.SetScorePacket = exports.ScorePacketInfo = exports.SetDisplayObjectivePacket = exports.RemoveObjectivePacket = exports.SetDefaultGameTypePacket = exports.ShowProfilePacket = exports.ServerSettingsResponsePacket = exports.ServerSettingsRequestPacket = exports.ModalFormResponsePacket = exports.ShowModalFormPacket = exports.ModalFormRequestPacket = exports.PhotoTransferPacket = exports.NpcRequestPacket = exports.BookEditPacket = exports.SetLastHurtByPacket = exports.WSConnectPacket = exports.AutomationClientConnectPacket = exports.SubClientLoginPacket = exports.PlayerSkinPacket = void 0;
exports.DimensionDataPacket = exports.TickingAreasLoadStatusPacket = exports.CodeBuilderSourcePacket = exports.ScriptMessagePacket = exports.PlayerStartItemCooldownPacket = exports.UpdateSubChunkBlocks = exports.UpdateSubChunkBlocksPacket = exports.CreatePhotoPacket = exports.EduUriResourcePacket = exports.AddEntity = exports.VideoStreamConnect_DEPRECATED = exports.BlockPalette = exports.NpcDialoguePacket = exports.SimulationTypePacket = exports.RemoveVolumeEntityPacket = exports.AddVolumeEntityPacket = exports.SyncActorPropertyPacket = exports.ClientboundDebugRendererPacket = exports.FilterTextPacket = exports.ItemComponentPacket = exports.CorrectPlayerMovePredictionPacket = exports.PlayerFogPacket = exports.CameraShakePacket = exports.AnimateEntityPacket = exports.MotionPredictionHintsPacket = exports.PacketViolationWarningPacket = exports.DebugInfoPacket = exports.PositionTrackingDBClientRequest = exports.PositionTrackingDBClientRequestPacket = exports.PositionTrackingDBServerBroadcast = exports.PositionTrackingDBServerBroadcastPacket = exports.EmoteListPacket = exports.UpdatePlayerGameTypePacket = exports.CodeBuilderPacket = exports.PlayerArmorDamagePacket = exports.ItemStackResponse = exports.ItemStackResponsePacket = exports.ItemStackRequest = exports.ItemStackRequestPacket = exports.ItemStackRequestBatch = exports.ItemStackRequestData = exports.ItemStackRequestActionTransferBase = exports.ItemStackRequestAction = exports.ItemStackRequestActionType = exports.ItemStackRequestSlotInfo = exports.PlayerEnchantOptionsPacket = exports.CreativeContentPacket = exports.PlayerAuthInputPacket = exports.NetworkSettingsPacket = exports.CompletedUsingItemPacket = void 0;
exports.PacketIdToType = exports.UpdateClientInputLocksPacket = exports.GameTestResultsPacket = exports.GameTestRequestPacket = exports.RequestNetworkSettingsPacket = exports.ServerStatsPacket = exports.FeatureRegistryPacket = exports.EditorNetworkPacket = exports.DeathInfoPacket = exports.UpdateAdventureSettingsPacket = exports.UpdateAbilitiesPacket = exports.ToastRequestPacket = exports.RequestPermissionsPacket = exports.RequestAbilityPacket = exports.LessonProgressPacket = exports.ChangeMobPropertyPacket = exports.AgentActionEventPacket = void 0;
const tslib_1 = require("tslib");
const common_1 = require("../common");
const core_1 = require("../core");
const cxxpair_1 = require("../cxxpair");
const cxxvector_1 = require("../cxxvector");
const mce_1 = require("../mce");
const nativeclass_1 = require("../nativeclass");
const nativetype_1 = require("../nativetype");
const actor_1 = require("./actor");
const attribute_1 = require("./attribute");
const blockpos_1 = require("./blockpos");
const connreq_1 = require("./connreq");
const cxxoptional_1 = require("./cxxoptional");
const hashedstring_1 = require("./hashedstring");
const inventory_1 = require("./inventory");
const molangvariablemap_1 = require("./molangvariablemap");
const nbt_1 = require("./nbt");
const packet_1 = require("./packet");
const scoreboard_1 = require("./scoreboard");
const skin_1 = require("./skin");
const CxxVector$string = cxxvector_1.CxxVector.make(nativetype_1.CxxString);
let LoginPacket = class LoginPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], LoginPacket.prototype, "protocol", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(connreq_1.ConnectionRequest.ref())
], LoginPacket.prototype, "connreq", void 0);
LoginPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], LoginPacket);
exports.LoginPacket = LoginPacket;
let PlayStatusPacket = class PlayStatusPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], PlayStatusPacket.prototype, "status", void 0);
PlayStatusPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], PlayStatusPacket);
exports.PlayStatusPacket = PlayStatusPacket;
let ServerToClientHandshakePacket = class ServerToClientHandshakePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], ServerToClientHandshakePacket.prototype, "jwt", void 0);
ServerToClientHandshakePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ServerToClientHandshakePacket);
exports.ServerToClientHandshakePacket = ServerToClientHandshakePacket;
let ClientToServerHandshakePacket = class ClientToServerHandshakePacket extends packet_1.Packet {
};
ClientToServerHandshakePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ClientToServerHandshakePacket);
exports.ClientToServerHandshakePacket = ClientToServerHandshakePacket;
let DisconnectPacket = class DisconnectPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], DisconnectPacket.prototype, "skipMessage", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString, 0x38)
], DisconnectPacket.prototype, "message", void 0);
DisconnectPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], DisconnectPacket);
exports.DisconnectPacket = DisconnectPacket;
var PackType;
(function (PackType) {
    PackType[PackType["Invalid"] = 0] = "Invalid";
    PackType[PackType["Addon"] = 1] = "Addon";
    PackType[PackType["Cached"] = 2] = "Cached";
    PackType[PackType["CopyProtected"] = 3] = "CopyProtected";
    PackType[PackType["Behavior"] = 4] = "Behavior";
    PackType[PackType["PersonaPiece"] = 5] = "PersonaPiece";
    PackType[PackType["Resources"] = 6] = "Resources";
    PackType[PackType["Skins"] = 7] = "Skins";
    PackType[PackType["WorldTemplate"] = 8] = "WorldTemplate";
    PackType[PackType["Count"] = 9] = "Count";
})(PackType = exports.PackType || (exports.PackType = {}));
// @nativeClass(0x88)
// export class PackIdVersion extends AbstractClass {
//     @nativeField(mce.UUID)
//     uuid:mce.UUID
//     @nativeField(SemVersion, 0x10)
//     version:SemVersion
//     @nativeField(uint8_t)
//     packType:PackType
// }
// @nativeClass(0xA8)
// export class PackInstanceId extends AbstractClass {
//     @nativeField(PackIdVersion)
//     packId:PackIdVersion;
//     @nativeField(CxxString)
//     subpackName:CxxString;
// }
// @nativeClass(0x18)
// export class ContentIdentity extends AbstractClass {
//     @nativeField(mce.UUID)
//     uuid:mce.UUID
//     @nativeField(bool_t, 0x10)
//     valid:bool_t
// }
// @nativeClass(0xF0)
// export class ResourcePackInfoData extends AbstractClass {
//     @nativeField(PackIdVersion)
//     packId:PackIdVersion;
//     @nativeField(bin64_t)
//     packSize:bin64_t;
//     @nativeField(CxxString)
//     contentKey:CxxString;
//     @nativeField(CxxString)
//     subpackName:CxxString;
//     @nativeField(ContentIdentity)
//     contentIdentity:ContentIdentity;
//     @nativeField(bool_t)
//     hasScripts:bool_t;
//     @nativeField(bool_t)
//     hasExceptions:bool_t;
// }
// @nativeClass(null)
// export class ResourcePacksInfoData extends AbstractClass {
//     @nativeField(bool_t)
//     texturePackRequired:bool_t;
//     @nativeField(bool_t)
//     hasScripts:bool_t;
//     @nativeField(bool_t)
//     hasExceptions:bool_t;
//     @nativeField(CxxVector.make(ResourcePackInfoData), 0x08)
//     addOnPacks:CxxVector<ResourcePackInfoData>;
//     @nativeField(CxxVector.make(ResourcePackInfoData), 0x20)
//     texturePacks:CxxVector<ResourcePackInfoData>;
// }
let ResourcePacksInfoPacket = class ResourcePacksInfoPacket extends packet_1.Packet {
};
ResourcePacksInfoPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ResourcePacksInfoPacket);
exports.ResourcePacksInfoPacket = ResourcePacksInfoPacket;
let ResourcePackStackPacket = class ResourcePackStackPacket extends packet_1.Packet {
};
ResourcePackStackPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ResourcePackStackPacket);
exports.ResourcePackStackPacket = ResourcePackStackPacket;
/** @deprecated Use ResourcePackStackPacket, follow the real class name */
exports.ResourcePackStacksPacket = ResourcePackStackPacket;
var ResourcePackResponse;
(function (ResourcePackResponse) {
    ResourcePackResponse[ResourcePackResponse["Cancel"] = 1] = "Cancel";
    ResourcePackResponse[ResourcePackResponse["Downloading"] = 2] = "Downloading";
    ResourcePackResponse[ResourcePackResponse["DownloadingFinished"] = 3] = "DownloadingFinished";
    ResourcePackResponse[ResourcePackResponse["ResourcePackStackFinished"] = 4] = "ResourcePackStackFinished";
})(ResourcePackResponse = exports.ResourcePackResponse || (exports.ResourcePackResponse = {}));
let ResourcePackClientResponsePacket = class ResourcePackClientResponsePacket extends packet_1.Packet {
};
ResourcePackClientResponsePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ResourcePackClientResponsePacket);
exports.ResourcePackClientResponsePacket = ResourcePackClientResponsePacket;
let TextPacket = class TextPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], TextPacket.prototype, "type", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], TextPacket.prototype, "name", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], TextPacket.prototype, "message", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(CxxVector$string)
], TextPacket.prototype, "params", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t, 0x90)
], TextPacket.prototype, "needsTranslation", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString, 0x98)
], TextPacket.prototype, "xboxUserId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], TextPacket.prototype, "platformChatId", void 0);
TextPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], TextPacket);
exports.TextPacket = TextPacket;
(function (TextPacket) {
    let Types;
    (function (Types) {
        Types[Types["Raw"] = 0] = "Raw";
        Types[Types["Chat"] = 1] = "Chat";
        Types[Types["Translate"] = 2] = "Translate";
        /** @deprecated **/
        Types[Types["Translated"] = 2] = "Translated";
        Types[Types["Popup"] = 3] = "Popup";
        Types[Types["JukeboxPopup"] = 4] = "JukeboxPopup";
        Types[Types["Tip"] = 5] = "Tip";
        Types[Types["SystemMessage"] = 6] = "SystemMessage";
        /** @deprecated **/
        Types[Types["Sytem"] = 6] = "Sytem";
        Types[Types["Whisper"] = 7] = "Whisper";
        // /say command
        Types[Types["Announcement"] = 8] = "Announcement";
        Types[Types["TextObject"] = 9] = "TextObject";
        /** @deprecated **/
        Types[Types["ObjectWhisper"] = 9] = "ObjectWhisper";
    })(Types = TextPacket.Types || (TextPacket.Types = {}));
})(TextPacket = exports.TextPacket || (exports.TextPacket = {}));
exports.TextPacket = TextPacket;
let SetTimePacket = class SetTimePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], SetTimePacket.prototype, "time", void 0);
SetTimePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], SetTimePacket);
exports.SetTimePacket = SetTimePacket;
let LevelSettings = class LevelSettings extends nativeclass_1.MantleClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int64_as_float_t)
], LevelSettings.prototype, "seed", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t, 0x88)
], LevelSettings.prototype, "customSkinsDisabled", void 0);
LevelSettings = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], LevelSettings);
exports.LevelSettings = LevelSettings;
let StartGamePacket = class StartGamePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(LevelSettings)
], StartGamePacket.prototype, "settings", void 0);
StartGamePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], StartGamePacket);
exports.StartGamePacket = StartGamePacket;
let AddPlayerPacket = class AddPlayerPacket extends packet_1.Packet {
};
AddPlayerPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], AddPlayerPacket);
exports.AddPlayerPacket = AddPlayerPacket;
let AddActorPacket = class AddActorPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(actor_1.ActorLink))
], AddActorPacket.prototype, "links", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.Vec3)
], AddActorPacket.prototype, "pos", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.Vec3)
], AddActorPacket.prototype, "velocity", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.Vec2)
], AddActorPacket.prototype, "rot", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], AddActorPacket.prototype, "headYaw", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(actor_1.ActorUniqueID)
], AddActorPacket.prototype, "entityId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(actor_1.ActorRuntimeID)
], AddActorPacket.prototype, "runtimeId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(actor_1.ActorDefinitionIdentifier, {
        offset: 0x08 + 0x18,
        relative: true,
    })
], AddActorPacket.prototype, "type", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(attribute_1.AttributeInstanceHandle))
], AddActorPacket.prototype, "attributeHandles", void 0);
AddActorPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], AddActorPacket);
exports.AddActorPacket = AddActorPacket;
let RemoveActorPacket = class RemoveActorPacket extends packet_1.Packet {
};
RemoveActorPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], RemoveActorPacket);
exports.RemoveActorPacket = RemoveActorPacket;
let AddItemActorPacket = class AddItemActorPacket extends packet_1.Packet {
};
AddItemActorPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], AddItemActorPacket);
exports.AddItemActorPacket = AddItemActorPacket;
let TakeItemActorPacket = class TakeItemActorPacket extends packet_1.Packet {
};
TakeItemActorPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], TakeItemActorPacket);
exports.TakeItemActorPacket = TakeItemActorPacket;
let MoveActorAbsolutePacket = class MoveActorAbsolutePacket extends packet_1.Packet {
};
MoveActorAbsolutePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], MoveActorAbsolutePacket);
exports.MoveActorAbsolutePacket = MoveActorAbsolutePacket;
let MovePlayerPacket = class MovePlayerPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(actor_1.ActorRuntimeID)
], MovePlayerPacket.prototype, "actorId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.Vec3)
], MovePlayerPacket.prototype, "pos", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], MovePlayerPacket.prototype, "pitch", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], MovePlayerPacket.prototype, "yaw", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], MovePlayerPacket.prototype, "headYaw", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], MovePlayerPacket.prototype, "mode", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], MovePlayerPacket.prototype, "onGround", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(actor_1.ActorRuntimeID)
], MovePlayerPacket.prototype, "ridingActorId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], MovePlayerPacket.prototype, "teleportCause", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], MovePlayerPacket.prototype, "teleportItem", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bin64_t)
], MovePlayerPacket.prototype, "tick", void 0);
MovePlayerPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], MovePlayerPacket);
exports.MovePlayerPacket = MovePlayerPacket;
(function (MovePlayerPacket) {
    let Modes;
    (function (Modes) {
        Modes[Modes["Normal"] = 0] = "Normal";
        Modes[Modes["Reset"] = 1] = "Reset";
        Modes[Modes["Teleport"] = 2] = "Teleport";
        Modes[Modes["Pitch"] = 3] = "Pitch";
    })(Modes = MovePlayerPacket.Modes || (MovePlayerPacket.Modes = {}));
})(MovePlayerPacket = exports.MovePlayerPacket || (exports.MovePlayerPacket = {}));
exports.MovePlayerPacket = MovePlayerPacket;
let PassengerJumpPacket = class PassengerJumpPacket extends packet_1.Packet {
};
PassengerJumpPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], PassengerJumpPacket);
exports.PassengerJumpPacket = PassengerJumpPacket;
/** @deprecated use PassengerJumpPacket */
exports.RiderJumpPacket = PassengerJumpPacket;
let UpdateBlockPacket = class UpdateBlockPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.BlockPos)
], UpdateBlockPacket.prototype, "blockPos", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], UpdateBlockPacket.prototype, "dataLayerId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], UpdateBlockPacket.prototype, "flags", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], UpdateBlockPacket.prototype, "blockRuntimeId", void 0);
UpdateBlockPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], UpdateBlockPacket);
exports.UpdateBlockPacket = UpdateBlockPacket;
(function (UpdateBlockPacket) {
    let Flags;
    (function (Flags) {
        Flags[Flags["None"] = 0] = "None";
        Flags[Flags["Neighbors"] = 1] = "Neighbors";
        Flags[Flags["Network"] = 2] = "Network";
        Flags[Flags["All"] = 3] = "All";
        Flags[Flags["NoGraphic"] = 4] = "NoGraphic";
        Flags[Flags["Priority"] = 8] = "Priority";
        Flags[Flags["AllPriority"] = 11] = "AllPriority";
    })(Flags = UpdateBlockPacket.Flags || (UpdateBlockPacket.Flags = {}));
    let DataLayerIds;
    (function (DataLayerIds) {
        DataLayerIds[DataLayerIds["Normal"] = 0] = "Normal";
        DataLayerIds[DataLayerIds["Liquid"] = 1] = "Liquid";
    })(DataLayerIds = UpdateBlockPacket.DataLayerIds || (UpdateBlockPacket.DataLayerIds = {}));
})(UpdateBlockPacket = exports.UpdateBlockPacket || (exports.UpdateBlockPacket = {}));
exports.UpdateBlockPacket = UpdateBlockPacket;
let AddPaintingPacket = class AddPaintingPacket extends packet_1.Packet {
};
AddPaintingPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], AddPaintingPacket);
exports.AddPaintingPacket = AddPaintingPacket;
let TickSyncPacket = class TickSyncPacket extends packet_1.Packet {
};
TickSyncPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], TickSyncPacket);
exports.TickSyncPacket = TickSyncPacket;
let LevelSoundEventPacketV1 = class LevelSoundEventPacketV1 extends packet_1.Packet {
};
LevelSoundEventPacketV1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], LevelSoundEventPacketV1);
exports.LevelSoundEventPacketV1 = LevelSoundEventPacketV1;
let LevelEventPacket = class LevelEventPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], LevelEventPacket.prototype, "eventId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.Vec3)
], LevelEventPacket.prototype, "pos", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], LevelEventPacket.prototype, "data", void 0);
LevelEventPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], LevelEventPacket);
exports.LevelEventPacket = LevelEventPacket;
let BlockEventPacket = class BlockEventPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.BlockPos)
], BlockEventPacket.prototype, "pos", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], BlockEventPacket.prototype, "type", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], BlockEventPacket.prototype, "data", void 0);
BlockEventPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], BlockEventPacket);
exports.BlockEventPacket = BlockEventPacket;
let ActorEventPacket = class ActorEventPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(actor_1.ActorRuntimeID)
], ActorEventPacket.prototype, "actorId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], ActorEventPacket.prototype, "event", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], ActorEventPacket.prototype, "data", void 0);
ActorEventPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ActorEventPacket);
exports.ActorEventPacket = ActorEventPacket;
(function (ActorEventPacket) {
    let Events;
    (function (Events) {
        Events[Events["Jump"] = 1] = "Jump";
        Events[Events["HurtAnimation"] = 2] = "HurtAnimation";
        Events[Events["DeathAnimation"] = 3] = "DeathAnimation";
        Events[Events["ArmSwing"] = 4] = "ArmSwing";
        Events[Events["StopAttack"] = 5] = "StopAttack";
        Events[Events["TameFail"] = 6] = "TameFail";
        Events[Events["TameSuccess"] = 7] = "TameSuccess";
        Events[Events["ShakeWet"] = 8] = "ShakeWet";
        Events[Events["UseItem"] = 9] = "UseItem";
        Events[Events["EatGrassAnimation"] = 10] = "EatGrassAnimation";
        Events[Events["FishHookBubble"] = 11] = "FishHookBubble";
        Events[Events["FishHookPosition"] = 12] = "FishHookPosition";
        Events[Events["FishHookHook"] = 13] = "FishHookHook";
        Events[Events["FishHookTease"] = 14] = "FishHookTease";
        Events[Events["SquidInkCloud"] = 15] = "SquidInkCloud";
        Events[Events["ZombieVillagerCure"] = 16] = "ZombieVillagerCure";
        Events[Events["AmbientSound"] = 17] = "AmbientSound";
        Events[Events["Respawn"] = 18] = "Respawn";
        Events[Events["IronGolemOfferFlower"] = 19] = "IronGolemOfferFlower";
        Events[Events["IronGolemWithdrawFlower"] = 20] = "IronGolemWithdrawFlower";
        Events[Events["LoveParticles"] = 21] = "LoveParticles";
        Events[Events["VillagerAngry"] = 22] = "VillagerAngry";
        Events[Events["VillagerHappy"] = 23] = "VillagerHappy";
        Events[Events["WitchSpellParticles"] = 24] = "WitchSpellParticles";
        Events[Events["FireworkParticles"] = 25] = "FireworkParticles";
        Events[Events["InLoveParticles"] = 26] = "InLoveParticles";
        Events[Events["SilverfishSpawnAnimation"] = 27] = "SilverfishSpawnAnimation";
        Events[Events["GuardianAttack"] = 28] = "GuardianAttack";
        Events[Events["WitchDrinkPotion"] = 29] = "WitchDrinkPotion";
        Events[Events["WitchThrowPotion"] = 30] = "WitchThrowPotion";
        Events[Events["MinecartTntPrimeFuse"] = 31] = "MinecartTntPrimeFuse";
        Events[Events["CreeperPrimeFuse"] = 32] = "CreeperPrimeFuse";
        Events[Events["AirSupplyExpired"] = 33] = "AirSupplyExpired";
        Events[Events["PlayerAddXpLevels"] = 34] = "PlayerAddXpLevels";
        Events[Events["ElderGuardianCurse"] = 35] = "ElderGuardianCurse";
        Events[Events["AgentArmSwing"] = 36] = "AgentArmSwing";
        Events[Events["EnderDragonDeath"] = 37] = "EnderDragonDeath";
        Events[Events["DustParticles"] = 38] = "DustParticles";
        Events[Events["ArrowShake"] = 39] = "ArrowShake";
        Events[Events["EatingItem"] = 57] = "EatingItem";
        Events[Events["BabyAnimalFeed"] = 60] = "BabyAnimalFeed";
        Events[Events["DeathSmokeCloud"] = 61] = "DeathSmokeCloud";
        Events[Events["CompleteTrade"] = 62] = "CompleteTrade";
        Events[Events["RemoveLeash"] = 63] = "RemoveLeash";
        Events[Events["ConsumeTotem"] = 65] = "ConsumeTotem";
        Events[Events["PlayerCheckTreasureHunterAchievement"] = 66] = "PlayerCheckTreasureHunterAchievement";
        Events[Events["EntitySpawn"] = 67] = "EntitySpawn";
        Events[Events["DragonPuke"] = 68] = "DragonPuke";
        Events[Events["ItemEntityMerge"] = 69] = "ItemEntityMerge";
        Events[Events["StartSwim"] = 70] = "StartSwim";
        Events[Events["BalloonPop"] = 71] = "BalloonPop";
        Events[Events["TreasureHunt"] = 72] = "TreasureHunt";
        Events[Events["AgentSummon"] = 73] = "AgentSummon";
        Events[Events["ChargedCrossbow"] = 74] = "ChargedCrossbow";
        Events[Events["Fall"] = 75] = "Fall";
    })(Events = ActorEventPacket.Events || (ActorEventPacket.Events = {}));
})(ActorEventPacket = exports.ActorEventPacket || (exports.ActorEventPacket = {}));
exports.ActorEventPacket = ActorEventPacket;
let MobEffectPacket = class MobEffectPacket extends packet_1.Packet {
};
MobEffectPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], MobEffectPacket);
exports.MobEffectPacket = MobEffectPacket;
let AttributeModifier = class AttributeModifier extends nativeclass_1.AbstractClass {
};
AttributeModifier = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], AttributeModifier);
let AttributeData = class AttributeData extends nativeclass_1.NativeClass {
    [nativetype_1.NativeType.ctor]() {
        this.min = 0;
        this.max = 0;
        this.current = 0;
        this.default = 0;
        this._dummy1 = null;
        this._dummy2 = null;
        this._dummy3 = null;
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], AttributeData.prototype, "current", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], AttributeData.prototype, "min", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], AttributeData.prototype, "max", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], AttributeData.prototype, "default", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(hashedstring_1.HashedString)
], AttributeData.prototype, "name", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(AttributeModifier.ref())
], AttributeData.prototype, "_dummy1", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(AttributeModifier.ref())
], AttributeData.prototype, "_dummy2", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(AttributeModifier.ref())
], AttributeData.prototype, "_dummy3", void 0);
AttributeData = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], AttributeData);
exports.AttributeData = AttributeData;
let UpdateAttributesPacket = class UpdateAttributesPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(actor_1.ActorRuntimeID)
], UpdateAttributesPacket.prototype, "actorId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(AttributeData))
], UpdateAttributesPacket.prototype, "attributes", void 0);
UpdateAttributesPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], UpdateAttributesPacket);
exports.UpdateAttributesPacket = UpdateAttributesPacket;
let InventoryTransactionPacket = class InventoryTransactionPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], InventoryTransactionPacket.prototype, "legacyRequestId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(inventory_1.ComplexInventoryTransaction.ref(), 0x58)
], InventoryTransactionPacket.prototype, "transaction", void 0);
InventoryTransactionPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], InventoryTransactionPacket);
exports.InventoryTransactionPacket = InventoryTransactionPacket;
let MobEquipmentPacket = class MobEquipmentPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(actor_1.ActorRuntimeID)
], MobEquipmentPacket.prototype, "runtimeId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(inventory_1.NetworkItemStackDescriptor)
], MobEquipmentPacket.prototype, "item", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], MobEquipmentPacket.prototype, "slot", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], MobEquipmentPacket.prototype, "selectedSlot", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], MobEquipmentPacket.prototype, "containerId", void 0);
MobEquipmentPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], MobEquipmentPacket);
exports.MobEquipmentPacket = MobEquipmentPacket;
let MobArmorEquipmentPacket = class MobArmorEquipmentPacket extends packet_1.Packet {
};
MobArmorEquipmentPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], MobArmorEquipmentPacket);
exports.MobArmorEquipmentPacket = MobArmorEquipmentPacket;
let InteractPacket = class InteractPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], InteractPacket.prototype, "action", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(actor_1.ActorRuntimeID)
], InteractPacket.prototype, "actorId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.Vec3)
], InteractPacket.prototype, "pos", void 0);
InteractPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], InteractPacket);
exports.InteractPacket = InteractPacket;
(function (InteractPacket) {
    let Actions;
    (function (Actions) {
        Actions[Actions["LeaveVehicle"] = 3] = "LeaveVehicle";
        Actions[Actions["Mouseover"] = 4] = "Mouseover";
        Actions[Actions["OpenNPC"] = 5] = "OpenNPC";
        Actions[Actions["OpenInventory"] = 6] = "OpenInventory";
    })(Actions = InteractPacket.Actions || (InteractPacket.Actions = {}));
})(InteractPacket = exports.InteractPacket || (exports.InteractPacket = {}));
exports.InteractPacket = InteractPacket;
let BlockPickRequestPacket = class BlockPickRequestPacket extends packet_1.Packet {
};
BlockPickRequestPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], BlockPickRequestPacket);
exports.BlockPickRequestPacket = BlockPickRequestPacket;
let ActorPickRequestPacket = class ActorPickRequestPacket extends packet_1.Packet {
};
ActorPickRequestPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ActorPickRequestPacket);
exports.ActorPickRequestPacket = ActorPickRequestPacket;
let PlayerActionPacket = class PlayerActionPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.BlockPos)
], PlayerActionPacket.prototype, "pos", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.BlockPos)
], PlayerActionPacket.prototype, "resultPos", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], PlayerActionPacket.prototype, "face", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], PlayerActionPacket.prototype, "action", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(actor_1.ActorRuntimeID)
], PlayerActionPacket.prototype, "actorId", void 0);
PlayerActionPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], PlayerActionPacket);
exports.PlayerActionPacket = PlayerActionPacket;
(function (PlayerActionPacket) {
    let Actions;
    (function (Actions) {
        /** @deprecated */
        Actions[Actions["StartBreak"] = 0] = "StartBreak";
        /** @deprecated */
        Actions[Actions["AbortBreak"] = 1] = "AbortBreak";
        /** @deprecated */
        Actions[Actions["StopBreak"] = 2] = "StopBreak";
        Actions[Actions["GetUpdatedBlock"] = 3] = "GetUpdatedBlock";
        /** @deprecated */
        Actions[Actions["DropItem"] = 4] = "DropItem";
        Actions[Actions["StartSleeping"] = 5] = "StartSleeping";
        Actions[Actions["StopSleeping"] = 6] = "StopSleeping";
        Actions[Actions["Respawn"] = 7] = "Respawn";
        /** @deprecated */
        Actions[Actions["Jump"] = 8] = "Jump";
        /** @deprecated */
        Actions[Actions["StartSprint"] = 9] = "StartSprint";
        /** @deprecated */
        Actions[Actions["StopSprint"] = 10] = "StopSprint";
        /** @deprecated */
        Actions[Actions["StartSneak"] = 11] = "StartSneak";
        /** @deprecated */
        Actions[Actions["StopSneak"] = 12] = "StopSneak";
        Actions[Actions["CreativePlayerDestroyBlock"] = 13] = "CreativePlayerDestroyBlock";
        Actions[Actions["DimensionChangeAck"] = 14] = "DimensionChangeAck";
        /** @deprecated */
        Actions[Actions["StartGlide"] = 15] = "StartGlide";
        /** @deprecated */
        Actions[Actions["StopGlide"] = 16] = "StopGlide";
        /** @deprecated */
        Actions[Actions["BuildDenied"] = 17] = "BuildDenied";
        Actions[Actions["CrackBreak"] = 18] = "CrackBreak";
        /** @deprecated */
        Actions[Actions["ChangeSkin"] = 19] = "ChangeSkin";
        /** @deprecated */
        Actions[Actions["SetEnchantmentSeed"] = 20] = "SetEnchantmentSeed";
        /** @deprecated */
        Actions[Actions["StartSwimming"] = 21] = "StartSwimming";
        /** @deprecated */
        Actions[Actions["StopSwimming"] = 22] = "StopSwimming";
        Actions[Actions["StartSpinAttack"] = 23] = "StartSpinAttack";
        Actions[Actions["StopSpinAttack"] = 24] = "StopSpinAttack";
        Actions[Actions["InteractBlock"] = 25] = "InteractBlock";
        Actions[Actions["PredictDestroyBlock"] = 26] = "PredictDestroyBlock";
        Actions[Actions["ContinueDestroyBlock"] = 27] = "ContinueDestroyBlock";
        Actions[Actions["StartItemUseOn"] = 28] = "StartItemUseOn";
        Actions[Actions["StopItemUseOn"] = 29] = "StopItemUseOn";
    })(Actions = PlayerActionPacket.Actions || (PlayerActionPacket.Actions = {}));
})(PlayerActionPacket = exports.PlayerActionPacket || (exports.PlayerActionPacket = {}));
exports.PlayerActionPacket = PlayerActionPacket;
let EntityFallPacket = class EntityFallPacket extends packet_1.Packet {
};
EntityFallPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], EntityFallPacket);
exports.EntityFallPacket = EntityFallPacket;
let HurtArmorPacket = class HurtArmorPacket extends packet_1.Packet {
};
HurtArmorPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], HurtArmorPacket);
exports.HurtArmorPacket = HurtArmorPacket;
let SetActorDataPacket = class SetActorDataPacket extends packet_1.Packet {
};
SetActorDataPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], SetActorDataPacket);
exports.SetActorDataPacket = SetActorDataPacket;
let SetActorMotionPacket = class SetActorMotionPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(actor_1.ActorRuntimeID)
], SetActorMotionPacket.prototype, "runtimeId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.Vec3)
], SetActorMotionPacket.prototype, "motion", void 0);
SetActorMotionPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], SetActorMotionPacket);
exports.SetActorMotionPacket = SetActorMotionPacket;
let SetActorLinkPacket = class SetActorLinkPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(actor_1.ActorLink)
], SetActorLinkPacket.prototype, "link", void 0);
SetActorLinkPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], SetActorLinkPacket);
exports.SetActorLinkPacket = SetActorLinkPacket;
let SetHealthPacket = class SetHealthPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], SetHealthPacket.prototype, "health", void 0);
SetHealthPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], SetHealthPacket);
exports.SetHealthPacket = SetHealthPacket;
let SetSpawnPositionPacket = class SetSpawnPositionPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.BlockPos)
], SetSpawnPositionPacket.prototype, "pos", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], SetSpawnPositionPacket.prototype, "spawnType", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], SetSpawnPositionPacket.prototype, "dimension", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.BlockPos)
], SetSpawnPositionPacket.prototype, "causingBlockPos", void 0);
SetSpawnPositionPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], SetSpawnPositionPacket);
exports.SetSpawnPositionPacket = SetSpawnPositionPacket;
let AnimatePacket = class AnimatePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(actor_1.ActorRuntimeID)
], AnimatePacket.prototype, "actorId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], AnimatePacket.prototype, "action", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], AnimatePacket.prototype, "rowingTime", void 0);
AnimatePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], AnimatePacket);
exports.AnimatePacket = AnimatePacket;
(function (AnimatePacket) {
    let Actions;
    (function (Actions) {
        Actions[Actions["SwingArm"] = 1] = "SwingArm";
        Actions[Actions["WakeUp"] = 3] = "WakeUp";
        Actions[Actions["CriticalHit"] = 4] = "CriticalHit";
        Actions[Actions["MagicCriticalHit"] = 5] = "MagicCriticalHit";
        Actions[Actions["RowRight"] = 128] = "RowRight";
        Actions[Actions["RowLeft"] = 129] = "RowLeft";
    })(Actions = AnimatePacket.Actions || (AnimatePacket.Actions = {}));
})(AnimatePacket = exports.AnimatePacket || (exports.AnimatePacket = {}));
exports.AnimatePacket = AnimatePacket;
let RespawnPacket = class RespawnPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.Vec3)
], RespawnPacket.prototype, "pos", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], RespawnPacket.prototype, "state", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(actor_1.ActorRuntimeID)
], RespawnPacket.prototype, "runtimeId", void 0);
RespawnPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], RespawnPacket);
exports.RespawnPacket = RespawnPacket;
let ContainerOpenPacket = class ContainerOpenPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t, { ghost: true })
], ContainerOpenPacket.prototype, "windowId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], ContainerOpenPacket.prototype, "containerId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int8_t)
], ContainerOpenPacket.prototype, "type", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.BlockPos)
], ContainerOpenPacket.prototype, "pos", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int64_as_float_t, { ghost: true })
], ContainerOpenPacket.prototype, "entityUniqueIdAsNumber", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bin64_t)
], ContainerOpenPacket.prototype, "entityUniqueId", void 0);
ContainerOpenPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ContainerOpenPacket);
exports.ContainerOpenPacket = ContainerOpenPacket;
let ContainerClosePacket = class ContainerClosePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t, { ghost: true })
], ContainerClosePacket.prototype, "windowId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], ContainerClosePacket.prototype, "containerId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], ContainerClosePacket.prototype, "server", void 0);
ContainerClosePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ContainerClosePacket);
exports.ContainerClosePacket = ContainerClosePacket;
let PlayerHotbarPacket = class PlayerHotbarPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], PlayerHotbarPacket.prototype, "selectedSlot", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], PlayerHotbarPacket.prototype, "selectHotbarSlot", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t, { ghost: true })
], PlayerHotbarPacket.prototype, "windowId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], PlayerHotbarPacket.prototype, "containerId", void 0);
PlayerHotbarPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], PlayerHotbarPacket);
exports.PlayerHotbarPacket = PlayerHotbarPacket;
let InventoryContentPacket = class InventoryContentPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], InventoryContentPacket.prototype, "containerId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(inventory_1.NetworkItemStackDescriptor), 56)
], InventoryContentPacket.prototype, "slots", void 0);
InventoryContentPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], InventoryContentPacket);
exports.InventoryContentPacket = InventoryContentPacket;
let InventorySlotPacket = class InventorySlotPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], InventorySlotPacket.prototype, "containerId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], InventorySlotPacket.prototype, "slot", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(inventory_1.NetworkItemStackDescriptor)
], InventorySlotPacket.prototype, "descriptor", void 0);
InventorySlotPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], InventorySlotPacket);
exports.InventorySlotPacket = InventorySlotPacket;
let ContainerSetDataPacket = class ContainerSetDataPacket extends packet_1.Packet {
};
ContainerSetDataPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ContainerSetDataPacket);
exports.ContainerSetDataPacket = ContainerSetDataPacket;
let CraftingDataPacket = class CraftingDataPacket extends packet_1.Packet {
};
CraftingDataPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], CraftingDataPacket);
exports.CraftingDataPacket = CraftingDataPacket;
let CraftingEventPacket = class CraftingEventPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], CraftingEventPacket.prototype, "containerId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t, 0x34)
], CraftingEventPacket.prototype, "containerType", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(mce_1.mce.UUID)
], CraftingEventPacket.prototype, "recipeId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(inventory_1.NetworkItemStackDescriptor))
], CraftingEventPacket.prototype, "inputItems", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(inventory_1.NetworkItemStackDescriptor))
], CraftingEventPacket.prototype, "outputItems", void 0);
CraftingEventPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], CraftingEventPacket);
exports.CraftingEventPacket = CraftingEventPacket;
let GuiDataPickItemPacket = class GuiDataPickItemPacket extends packet_1.Packet {
};
GuiDataPickItemPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], GuiDataPickItemPacket);
exports.GuiDataPickItemPacket = GuiDataPickItemPacket;
/**
 * @deprecated deleted from BDS
 */
let AdventureSettingsPacket = class AdventureSettingsPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], AdventureSettingsPacket.prototype, "flag1", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], AdventureSettingsPacket.prototype, "commandPermission", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t, 0x38)
], AdventureSettingsPacket.prototype, "flag2", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], AdventureSettingsPacket.prototype, "playerPermission", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(actor_1.ActorUniqueID)
], AdventureSettingsPacket.prototype, "actorId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t, 0x4c)
], AdventureSettingsPacket.prototype, "customFlag", void 0);
AdventureSettingsPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], AdventureSettingsPacket);
exports.AdventureSettingsPacket = AdventureSettingsPacket;
let BlockActorDataPacket = class BlockActorDataPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.BlockPos)
], BlockActorDataPacket.prototype, "pos", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nbt_1.CompoundTag, 0x40)
], BlockActorDataPacket.prototype, "data", void 0);
BlockActorDataPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], BlockActorDataPacket);
exports.BlockActorDataPacket = BlockActorDataPacket;
let PlayerInputPacket = class PlayerInputPacket extends packet_1.Packet {
};
PlayerInputPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], PlayerInputPacket);
exports.PlayerInputPacket = PlayerInputPacket;
let LevelChunkPacket = class LevelChunkPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.ChunkPos)
], LevelChunkPacket.prototype, "pos", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], LevelChunkPacket.prototype, "cacheEnabled", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], LevelChunkPacket.prototype, "serializedChunk", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], LevelChunkPacket.prototype, "subChunksCount", void 0);
LevelChunkPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], LevelChunkPacket);
exports.LevelChunkPacket = LevelChunkPacket;
let SetCommandsEnabledPacket = class SetCommandsEnabledPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], SetCommandsEnabledPacket.prototype, "commandsEnabled", void 0);
SetCommandsEnabledPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], SetCommandsEnabledPacket);
exports.SetCommandsEnabledPacket = SetCommandsEnabledPacket;
let SetDifficultyPacket = class SetDifficultyPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], SetDifficultyPacket.prototype, "difficulty", void 0);
SetDifficultyPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], SetDifficultyPacket);
exports.SetDifficultyPacket = SetDifficultyPacket;
let ChangeDimensionPacket = class ChangeDimensionPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], ChangeDimensionPacket.prototype, "dimensionId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], ChangeDimensionPacket.prototype, "x", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], ChangeDimensionPacket.prototype, "y", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], ChangeDimensionPacket.prototype, "z", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], ChangeDimensionPacket.prototype, "respawn", void 0);
ChangeDimensionPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ChangeDimensionPacket);
exports.ChangeDimensionPacket = ChangeDimensionPacket;
let SetPlayerGameTypePacket = class SetPlayerGameTypePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], SetPlayerGameTypePacket.prototype, "playerGameType", void 0);
SetPlayerGameTypePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], SetPlayerGameTypePacket);
exports.SetPlayerGameTypePacket = SetPlayerGameTypePacket;
let PlayerListEntry = PlayerListEntry_1 = class PlayerListEntry extends nativeclass_1.AbstractClass {
    static constructWith(player) {
        (0, common_1.abstract)();
    }
    /** @deprecated Use {@link constructWith()} instead  */
    static create(player) {
        return PlayerListEntry_1.constructWith(player);
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(actor_1.ActorUniqueID)
], PlayerListEntry.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(mce_1.mce.UUID)
], PlayerListEntry.prototype, "uuid", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], PlayerListEntry.prototype, "name", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], PlayerListEntry.prototype, "xuid", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], PlayerListEntry.prototype, "platformOnlineId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], PlayerListEntry.prototype, "buildPlatform", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(skin_1.SerializedSkin, 0x80)
], PlayerListEntry.prototype, "skin", void 0);
PlayerListEntry = PlayerListEntry_1 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x2f0)
], PlayerListEntry);
exports.PlayerListEntry = PlayerListEntry;
let PlayerListPacket = class PlayerListPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(PlayerListEntry))
], PlayerListPacket.prototype, "entries", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], PlayerListPacket.prototype, "action", void 0);
PlayerListPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], PlayerListPacket);
exports.PlayerListPacket = PlayerListPacket;
let SimpleEventPacket = class SimpleEventPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint16_t)
], SimpleEventPacket.prototype, "subtype", void 0);
SimpleEventPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], SimpleEventPacket);
exports.SimpleEventPacket = SimpleEventPacket;
let EventPacket = class EventPacket extends packet_1.Packet {
};
EventPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], EventPacket);
exports.EventPacket = EventPacket;
/** @deprecated Use EventPacket instead, to match to official class name*/
exports.TelemetryEventPacket = EventPacket;
let SpawnExperienceOrbPacket = class SpawnExperienceOrbPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.Vec3)
], SpawnExperienceOrbPacket.prototype, "pos", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], SpawnExperienceOrbPacket.prototype, "amount", void 0);
SpawnExperienceOrbPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], SpawnExperienceOrbPacket);
exports.SpawnExperienceOrbPacket = SpawnExperienceOrbPacket;
let ClientboundMapItemData = class ClientboundMapItemData extends packet_1.Packet {
};
ClientboundMapItemData = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ClientboundMapItemData);
exports.ClientboundMapItemData = ClientboundMapItemData;
/** @deprecated Use ClientboundMapItemData instead, to match to official class name*/
exports.MapItemDataPacket = ClientboundMapItemData;
let MapInfoRequestPacket = class MapInfoRequestPacket extends packet_1.Packet {
};
MapInfoRequestPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], MapInfoRequestPacket);
exports.MapInfoRequestPacket = MapInfoRequestPacket;
let RequestChunkRadiusPacket = class RequestChunkRadiusPacket extends packet_1.Packet {
};
RequestChunkRadiusPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], RequestChunkRadiusPacket);
exports.RequestChunkRadiusPacket = RequestChunkRadiusPacket;
let ChunkRadiusUpdatedPacket = class ChunkRadiusUpdatedPacket extends packet_1.Packet {
};
ChunkRadiusUpdatedPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ChunkRadiusUpdatedPacket);
exports.ChunkRadiusUpdatedPacket = ChunkRadiusUpdatedPacket;
let ItemFrameDropItemPacket = class ItemFrameDropItemPacket extends packet_1.Packet {
};
ItemFrameDropItemPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ItemFrameDropItemPacket);
exports.ItemFrameDropItemPacket = ItemFrameDropItemPacket;
let GameRulesChangedPacket = class GameRulesChangedPacket extends packet_1.Packet {
};
GameRulesChangedPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], GameRulesChangedPacket);
exports.GameRulesChangedPacket = GameRulesChangedPacket;
let CameraPacket = class CameraPacket extends packet_1.Packet {
};
CameraPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], CameraPacket);
exports.CameraPacket = CameraPacket;
let BossEventPacket = class BossEventPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bin64_t, { ghost: true })
], BossEventPacket.prototype, "unknown", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], BossEventPacket.prototype, "flagDarken", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], BossEventPacket.prototype, "flagFog", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bin64_t)
], BossEventPacket.prototype, "entityUniqueId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bin64_t)
], BossEventPacket.prototype, "playerUniqueId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], BossEventPacket.prototype, "type", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString, 0x50)
], BossEventPacket.prototype, "title", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], BossEventPacket.prototype, "healthPercent", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], BossEventPacket.prototype, "color", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], BossEventPacket.prototype, "overlay", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], BossEventPacket.prototype, "darkenScreen", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], BossEventPacket.prototype, "createWorldFog", void 0);
BossEventPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], BossEventPacket);
exports.BossEventPacket = BossEventPacket;
(function (BossEventPacket) {
    let Types;
    (function (Types) {
        Types[Types["Show"] = 0] = "Show";
        Types[Types["RegisterPlayer"] = 1] = "RegisterPlayer";
        Types[Types["Hide"] = 2] = "Hide";
        Types[Types["UnregisterPlayer"] = 3] = "UnregisterPlayer";
        Types[Types["HealthPercent"] = 4] = "HealthPercent";
        Types[Types["Title"] = 5] = "Title";
        Types[Types["Properties"] = 6] = "Properties";
        Types[Types["Style"] = 7] = "Style";
    })(Types = BossEventPacket.Types || (BossEventPacket.Types = {}));
    let Colors;
    (function (Colors) {
        Colors[Colors["Pink"] = 0] = "Pink";
        Colors[Colors["Blue"] = 1] = "Blue";
        Colors[Colors["Red"] = 2] = "Red";
        Colors[Colors["Green"] = 3] = "Green";
        Colors[Colors["Yellow"] = 4] = "Yellow";
        Colors[Colors["Purple"] = 5] = "Purple";
        Colors[Colors["White"] = 6] = "White";
    })(Colors = BossEventPacket.Colors || (BossEventPacket.Colors = {}));
    let Overlay;
    (function (Overlay) {
        Overlay[Overlay["Progress"] = 0] = "Progress";
        Overlay[Overlay["Notched6"] = 1] = "Notched6";
        Overlay[Overlay["Notched10"] = 2] = "Notched10";
        Overlay[Overlay["Notched12"] = 3] = "Notched12";
        Overlay[Overlay["Notched20"] = 4] = "Notched20";
    })(Overlay = BossEventPacket.Overlay || (BossEventPacket.Overlay = {}));
})(BossEventPacket = exports.BossEventPacket || (exports.BossEventPacket = {}));
exports.BossEventPacket = BossEventPacket;
let ShowCreditsPacket = class ShowCreditsPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(actor_1.ActorRuntimeID)
], ShowCreditsPacket.prototype, "runtimeId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], ShowCreditsPacket.prototype, "state", void 0);
ShowCreditsPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ShowCreditsPacket);
exports.ShowCreditsPacket = ShowCreditsPacket;
(function (ShowCreditsPacket) {
    let CreditsState;
    (function (CreditsState) {
        CreditsState[CreditsState["StartCredits"] = 0] = "StartCredits";
        CreditsState[CreditsState["EndCredits"] = 1] = "EndCredits";
    })(CreditsState = ShowCreditsPacket.CreditsState || (ShowCreditsPacket.CreditsState = {}));
})(ShowCreditsPacket = exports.ShowCreditsPacket || (exports.ShowCreditsPacket = {}));
exports.ShowCreditsPacket = ShowCreditsPacket;
let AvailableCommandsParamData = class AvailableCommandsParamData extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], AvailableCommandsParamData.prototype, "paramName", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], AvailableCommandsParamData.prototype, "paramType", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], AvailableCommandsParamData.prototype, "isOptional", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], AvailableCommandsParamData.prototype, "flags", void 0);
AvailableCommandsParamData = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], AvailableCommandsParamData);
let AvailableCommandsOverloadData = class AvailableCommandsOverloadData extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(AvailableCommandsParamData))
], AvailableCommandsOverloadData.prototype, "parameters", void 0);
AvailableCommandsOverloadData = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], AvailableCommandsOverloadData);
let AvailableCommandsCommandData = class AvailableCommandsCommandData extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], AvailableCommandsCommandData.prototype, "name", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], AvailableCommandsCommandData.prototype, "description", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint16_t) // 40
], AvailableCommandsCommandData.prototype, "flags", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t) // 42
], AvailableCommandsCommandData.prototype, "permission", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(cxxvector_1.CxxVector.make(nativetype_1.CxxStringWith8Bytes)), {
        ghost: true,
    })
], AvailableCommandsCommandData.prototype, "parameters", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(AvailableCommandsOverloadData))
], AvailableCommandsCommandData.prototype, "overloads", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t) // 60
], AvailableCommandsCommandData.prototype, "aliases", void 0);
AvailableCommandsCommandData = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x68)
], AvailableCommandsCommandData);
let AvailableCommandsEnumData = class AvailableCommandsEnumData extends nativeclass_1.AbstractClass {
};
AvailableCommandsEnumData = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x38)
], AvailableCommandsEnumData);
let AvailableCommandsPacket = class AvailableCommandsPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(CxxVector$string)
], AvailableCommandsPacket.prototype, "enumValues", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(CxxVector$string)
], AvailableCommandsPacket.prototype, "postfixes", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(AvailableCommandsEnumData))
], AvailableCommandsPacket.prototype, "enums", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(AvailableCommandsCommandData))
], AvailableCommandsPacket.prototype, "commands", void 0);
AvailableCommandsPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], AvailableCommandsPacket);
exports.AvailableCommandsPacket = AvailableCommandsPacket;
(function (AvailableCommandsPacket) {
    AvailableCommandsPacket.CommandData = AvailableCommandsCommandData;
    AvailableCommandsPacket.EnumData = AvailableCommandsEnumData;
})(AvailableCommandsPacket = exports.AvailableCommandsPacket || (exports.AvailableCommandsPacket = {}));
exports.AvailableCommandsPacket = AvailableCommandsPacket;
let CommandRequestPacket = class CommandRequestPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], CommandRequestPacket.prototype, "command", void 0);
CommandRequestPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], CommandRequestPacket);
exports.CommandRequestPacket = CommandRequestPacket;
let CommandBlockUpdatePacket = class CommandBlockUpdatePacket extends packet_1.Packet {
};
CommandBlockUpdatePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], CommandBlockUpdatePacket);
exports.CommandBlockUpdatePacket = CommandBlockUpdatePacket;
let CommandOutputPacket = class CommandOutputPacket extends packet_1.Packet {
};
CommandOutputPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], CommandOutputPacket);
exports.CommandOutputPacket = CommandOutputPacket;
let UpdateTradePacket = class UpdateTradePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], UpdateTradePacket.prototype, "containerId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], UpdateTradePacket.prototype, "containerType", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], UpdateTradePacket.prototype, "displayName", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t, 0x5c)
], UpdateTradePacket.prototype, "traderTier", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(actor_1.ActorUniqueID)
], UpdateTradePacket.prototype, "entityId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(actor_1.ActorUniqueID)
], UpdateTradePacket.prototype, "lastTradingPlayer", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nbt_1.CompoundTag)
], UpdateTradePacket.prototype, "data", void 0);
UpdateTradePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], UpdateTradePacket);
exports.UpdateTradePacket = UpdateTradePacket;
let UpdateEquipPacket = class UpdateEquipPacket extends packet_1.Packet {
};
UpdateEquipPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], UpdateEquipPacket);
exports.UpdateEquipPacket = UpdateEquipPacket;
let ResourcePackDataInfoPacket = class ResourcePackDataInfoPacket extends packet_1.Packet {
};
ResourcePackDataInfoPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ResourcePackDataInfoPacket);
exports.ResourcePackDataInfoPacket = ResourcePackDataInfoPacket;
let ResourcePackChunkDataPacket = class ResourcePackChunkDataPacket extends packet_1.Packet {
};
ResourcePackChunkDataPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ResourcePackChunkDataPacket);
exports.ResourcePackChunkDataPacket = ResourcePackChunkDataPacket;
let ResourcePackChunkRequestPacket = class ResourcePackChunkRequestPacket extends packet_1.Packet {
};
ResourcePackChunkRequestPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ResourcePackChunkRequestPacket);
exports.ResourcePackChunkRequestPacket = ResourcePackChunkRequestPacket;
let TransferPacket = class TransferPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], TransferPacket.prototype, "address", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint16_t)
], TransferPacket.prototype, "port", void 0);
TransferPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], TransferPacket);
exports.TransferPacket = TransferPacket;
let PlaySoundPacket = class PlaySoundPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], PlaySoundPacket.prototype, "soundName", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.BlockPos)
], PlaySoundPacket.prototype, "pos", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], PlaySoundPacket.prototype, "volume", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], PlaySoundPacket.prototype, "pitch", void 0);
PlaySoundPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], PlaySoundPacket);
exports.PlaySoundPacket = PlaySoundPacket;
let StopSoundPacket = class StopSoundPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], StopSoundPacket.prototype, "soundName", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], StopSoundPacket.prototype, "stopAll", void 0);
StopSoundPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], StopSoundPacket);
exports.StopSoundPacket = StopSoundPacket;
/**
 * @remark use ServerPlayer.sendTitle instead of sending it.
 */
let SetTitlePacket = class SetTitlePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], SetTitlePacket.prototype, "type", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], SetTitlePacket.prototype, "text", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], SetTitlePacket.prototype, "fadeInTime", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], SetTitlePacket.prototype, "stayTime", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], SetTitlePacket.prototype, "fadeOutTime", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], SetTitlePacket.prototype, "xuid", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], SetTitlePacket.prototype, "platformOnlineId", void 0);
SetTitlePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], SetTitlePacket);
exports.SetTitlePacket = SetTitlePacket;
(function (SetTitlePacket) {
    let Types;
    (function (Types) {
        Types[Types["Clear"] = 0] = "Clear";
        Types[Types["Reset"] = 1] = "Reset";
        Types[Types["Title"] = 2] = "Title";
        Types[Types["Subtitle"] = 3] = "Subtitle";
        Types[Types["Actionbar"] = 4] = "Actionbar";
        Types[Types["AnimationTimes"] = 5] = "AnimationTimes";
    })(Types = SetTitlePacket.Types || (SetTitlePacket.Types = {}));
})(SetTitlePacket = exports.SetTitlePacket || (exports.SetTitlePacket = {}));
exports.SetTitlePacket = SetTitlePacket;
let AddBehaviorTreePacket = class AddBehaviorTreePacket extends packet_1.Packet {
};
AddBehaviorTreePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], AddBehaviorTreePacket);
exports.AddBehaviorTreePacket = AddBehaviorTreePacket;
let StructureBlockUpdatePacket = class StructureBlockUpdatePacket extends packet_1.Packet {
};
StructureBlockUpdatePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], StructureBlockUpdatePacket);
exports.StructureBlockUpdatePacket = StructureBlockUpdatePacket;
/** @deprecated This packet only works on partnered servers.*/
let ShowStoreOfferPacket = class ShowStoreOfferPacket extends packet_1.Packet {
};
ShowStoreOfferPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ShowStoreOfferPacket);
exports.ShowStoreOfferPacket = ShowStoreOfferPacket;
/** @deprecated This packet only works on partnered servers.*/
let PurchaseReceiptPacket = class PurchaseReceiptPacket extends packet_1.Packet {
};
PurchaseReceiptPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], PurchaseReceiptPacket);
exports.PurchaseReceiptPacket = PurchaseReceiptPacket;
let PlayerSkinPacket = class PlayerSkinPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(mce_1.mce.UUID)
], PlayerSkinPacket.prototype, "uuid", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(skin_1.SerializedSkin)
], PlayerSkinPacket.prototype, "skin", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], PlayerSkinPacket.prototype, "localizedNewSkinName", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], PlayerSkinPacket.prototype, "localizedOldSkinName", void 0);
PlayerSkinPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], PlayerSkinPacket);
exports.PlayerSkinPacket = PlayerSkinPacket;
let SubClientLoginPacket = class SubClientLoginPacket extends packet_1.Packet {
};
SubClientLoginPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], SubClientLoginPacket);
exports.SubClientLoginPacket = SubClientLoginPacket;
let AutomationClientConnectPacket = class AutomationClientConnectPacket extends packet_1.Packet {
};
AutomationClientConnectPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], AutomationClientConnectPacket);
exports.AutomationClientConnectPacket = AutomationClientConnectPacket;
/** @deprecated Use AutomationClientConnectPacket instead, to match to official class name*/
exports.WSConnectPacket = AutomationClientConnectPacket;
let SetLastHurtByPacket = class SetLastHurtByPacket extends packet_1.Packet {
};
SetLastHurtByPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], SetLastHurtByPacket);
exports.SetLastHurtByPacket = SetLastHurtByPacket;
let BookEditPacket = class BookEditPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], BookEditPacket.prototype, "type", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t, 0x34) // It is int32 but is uint8 after serialization
], BookEditPacket.prototype, "inventorySlot", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t) // It is int32 but is uint8 after serialization
], BookEditPacket.prototype, "pageNumber", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], BookEditPacket.prototype, "secondaryPageNumber", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], BookEditPacket.prototype, "text", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], BookEditPacket.prototype, "author", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], BookEditPacket.prototype, "xuid", void 0);
BookEditPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], BookEditPacket);
exports.BookEditPacket = BookEditPacket;
(function (BookEditPacket) {
    let Types;
    (function (Types) {
        Types[Types["ReplacePage"] = 0] = "ReplacePage";
        Types[Types["AddPage"] = 1] = "AddPage";
        Types[Types["DeletePage"] = 2] = "DeletePage";
        Types[Types["SwapPages"] = 3] = "SwapPages";
        Types[Types["SignBook"] = 4] = "SignBook";
    })(Types = BookEditPacket.Types || (BookEditPacket.Types = {}));
})(BookEditPacket = exports.BookEditPacket || (exports.BookEditPacket = {}));
exports.BookEditPacket = BookEditPacket;
let NpcRequestPacket = class NpcRequestPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(actor_1.ActorRuntimeID)
], NpcRequestPacket.prototype, "runtimeId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], NpcRequestPacket.prototype, "requestType", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], NpcRequestPacket.prototype, "command", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], NpcRequestPacket.prototype, "actionType", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], NpcRequestPacket.prototype, "sceneName", void 0);
NpcRequestPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], NpcRequestPacket);
exports.NpcRequestPacket = NpcRequestPacket;
(function (NpcRequestPacket) {
    let RequestType;
    (function (RequestType) {
        RequestType[RequestType["SetActions"] = 0] = "SetActions";
        RequestType[RequestType["ExecuteAction"] = 1] = "ExecuteAction";
        RequestType[RequestType["ExecuteClosingCommands"] = 2] = "ExecuteClosingCommands";
        RequestType[RequestType["SetName"] = 3] = "SetName";
        RequestType[RequestType["SetAction"] = 4] = "SetAction";
        RequestType[RequestType["SetSkin"] = 5] = "SetSkin";
        RequestType[RequestType["SetInteractionText"] = 6] = "SetInteractionText";
    })(RequestType = NpcRequestPacket.RequestType || (NpcRequestPacket.RequestType = {}));
    let ActionType;
    (function (ActionType) {
        ActionType[ActionType["SetActions"] = 0] = "SetActions";
        ActionType[ActionType["ExecuteAction"] = 1] = "ExecuteAction";
        ActionType[ActionType["ExecuteClosingCommands"] = 2] = "ExecuteClosingCommands";
        ActionType[ActionType["SetName"] = 3] = "SetName";
        ActionType[ActionType["SetAction"] = 4] = "SetAction";
        ActionType[ActionType["SetSkin"] = 5] = "SetSkin";
        ActionType[ActionType["SetInteractionText"] = 6] = "SetInteractionText";
        ActionType[ActionType["ExecuteOpeningCommands"] = 7] = "ExecuteOpeningCommands";
    })(ActionType = NpcRequestPacket.ActionType || (NpcRequestPacket.ActionType = {}));
})(NpcRequestPacket = exports.NpcRequestPacket || (exports.NpcRequestPacket = {}));
exports.NpcRequestPacket = NpcRequestPacket;
/** @deprecated Only usable in Education Edition, Bedrock will not display the photo. */
let PhotoTransferPacket = class PhotoTransferPacket extends packet_1.Packet {
};
PhotoTransferPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], PhotoTransferPacket);
exports.PhotoTransferPacket = PhotoTransferPacket;
let ModalFormRequestPacket = class ModalFormRequestPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], ModalFormRequestPacket.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], ModalFormRequestPacket.prototype, "content", void 0);
ModalFormRequestPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ModalFormRequestPacket);
exports.ModalFormRequestPacket = ModalFormRequestPacket;
/** @deprecated use ModalFormRequestPacket, follow the real class name */
exports.ShowModalFormPacket = ModalFormRequestPacket;
let ModalFormResponsePacket = class ModalFormResponsePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], ModalFormResponsePacket.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxoptional_1.CxxOptional.make(connreq_1.JsonValue))
], ModalFormResponsePacket.prototype, "response", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxoptional_1.CxxOptional.make(nativetype_1.uint8_t))
], ModalFormResponsePacket.prototype, "cancelationReason", void 0);
ModalFormResponsePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ModalFormResponsePacket);
exports.ModalFormResponsePacket = ModalFormResponsePacket;
let ServerSettingsRequestPacket = class ServerSettingsRequestPacket extends packet_1.Packet {
};
ServerSettingsRequestPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ServerSettingsRequestPacket);
exports.ServerSettingsRequestPacket = ServerSettingsRequestPacket;
let ServerSettingsResponsePacket = class ServerSettingsResponsePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], ServerSettingsResponsePacket.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], ServerSettingsResponsePacket.prototype, "content", void 0);
ServerSettingsResponsePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ServerSettingsResponsePacket);
exports.ServerSettingsResponsePacket = ServerSettingsResponsePacket;
let ShowProfilePacket = class ShowProfilePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], ShowProfilePacket.prototype, "xuid", void 0);
ShowProfilePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ShowProfilePacket);
exports.ShowProfilePacket = ShowProfilePacket;
let SetDefaultGameTypePacket = class SetDefaultGameTypePacket extends packet_1.Packet {
};
SetDefaultGameTypePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], SetDefaultGameTypePacket);
exports.SetDefaultGameTypePacket = SetDefaultGameTypePacket;
let RemoveObjectivePacket = class RemoveObjectivePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], RemoveObjectivePacket.prototype, "objectiveName", void 0);
RemoveObjectivePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], RemoveObjectivePacket);
exports.RemoveObjectivePacket = RemoveObjectivePacket;
let SetDisplayObjectivePacket = class SetDisplayObjectivePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], SetDisplayObjectivePacket.prototype, "displaySlot", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], SetDisplayObjectivePacket.prototype, "objectiveName", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], SetDisplayObjectivePacket.prototype, "displayName", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], SetDisplayObjectivePacket.prototype, "criteriaName", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], SetDisplayObjectivePacket.prototype, "sortOrder", void 0);
SetDisplayObjectivePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], SetDisplayObjectivePacket);
exports.SetDisplayObjectivePacket = SetDisplayObjectivePacket;
let ScorePacketInfo = class ScorePacketInfo extends nativeclass_1.NativeClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(scoreboard_1.ScoreboardId)
], ScorePacketInfo.prototype, "scoreboardId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], ScorePacketInfo.prototype, "objectiveName", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], ScorePacketInfo.prototype, "score", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], ScorePacketInfo.prototype, "type", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bin64_t)
], ScorePacketInfo.prototype, "playerEntityUniqueId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bin64_t)
], ScorePacketInfo.prototype, "entityUniqueId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], ScorePacketInfo.prototype, "customName", void 0);
ScorePacketInfo = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], ScorePacketInfo);
exports.ScorePacketInfo = ScorePacketInfo;
(function (ScorePacketInfo) {
    let Type;
    (function (Type) {
        Type[Type["PLAYER"] = 1] = "PLAYER";
        Type[Type["ENTITY"] = 2] = "ENTITY";
        Type[Type["FAKE_PLAYER"] = 3] = "FAKE_PLAYER";
    })(Type = ScorePacketInfo.Type || (ScorePacketInfo.Type = {}));
})(ScorePacketInfo = exports.ScorePacketInfo || (exports.ScorePacketInfo = {}));
exports.ScorePacketInfo = ScorePacketInfo;
let SetScorePacket = class SetScorePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], SetScorePacket.prototype, "type", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(ScorePacketInfo))
], SetScorePacket.prototype, "entries", void 0);
SetScorePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], SetScorePacket);
exports.SetScorePacket = SetScorePacket;
(function (SetScorePacket) {
    let Type;
    (function (Type) {
        Type[Type["CHANGE"] = 0] = "CHANGE";
        Type[Type["REMOVE"] = 1] = "REMOVE";
    })(Type = SetScorePacket.Type || (SetScorePacket.Type = {}));
})(SetScorePacket = exports.SetScorePacket || (exports.SetScorePacket = {}));
exports.SetScorePacket = SetScorePacket;
let LabTablePacket = class LabTablePacket extends packet_1.Packet {
};
LabTablePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], LabTablePacket);
exports.LabTablePacket = LabTablePacket;
let UpdateBlockPacketSynced = class UpdateBlockPacketSynced extends packet_1.Packet {
};
UpdateBlockPacketSynced = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], UpdateBlockPacketSynced);
exports.UpdateBlockPacketSynced = UpdateBlockPacketSynced;
let MoveActorDeltaPacket = class MoveActorDeltaPacket extends packet_1.Packet {
};
MoveActorDeltaPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], MoveActorDeltaPacket);
exports.MoveActorDeltaPacket = MoveActorDeltaPacket;
let SetScoreboardIdentityPacket = class SetScoreboardIdentityPacket extends packet_1.Packet {
};
SetScoreboardIdentityPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], SetScoreboardIdentityPacket);
exports.SetScoreboardIdentityPacket = SetScoreboardIdentityPacket;
let SetLocalPlayerAsInitializedPacket = class SetLocalPlayerAsInitializedPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(actor_1.ActorRuntimeID)
], SetLocalPlayerAsInitializedPacket.prototype, "actorId", void 0);
SetLocalPlayerAsInitializedPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], SetLocalPlayerAsInitializedPacket);
exports.SetLocalPlayerAsInitializedPacket = SetLocalPlayerAsInitializedPacket;
let UpdateSoftEnumPacket = class UpdateSoftEnumPacket extends packet_1.Packet {
};
UpdateSoftEnumPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], UpdateSoftEnumPacket);
exports.UpdateSoftEnumPacket = UpdateSoftEnumPacket;
let NetworkStackLatencyPacket = class NetworkStackLatencyPacket extends packet_1.Packet {
};
NetworkStackLatencyPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], NetworkStackLatencyPacket);
exports.NetworkStackLatencyPacket = NetworkStackLatencyPacket;
let ScriptCustomEventPacket = class ScriptCustomEventPacket extends packet_1.Packet {
};
ScriptCustomEventPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ScriptCustomEventPacket);
exports.ScriptCustomEventPacket = ScriptCustomEventPacket;
let SpawnParticleEffectPacket = class SpawnParticleEffectPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], SpawnParticleEffectPacket.prototype, "dimensionId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(actor_1.ActorUniqueID)
], SpawnParticleEffectPacket.prototype, "actorId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.Vec3)
], SpawnParticleEffectPacket.prototype, "pos", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], SpawnParticleEffectPacket.prototype, "particleName", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(molangvariablemap_1.MolangVariableMap)
], SpawnParticleEffectPacket.prototype, "molangVariablesJson", void 0);
SpawnParticleEffectPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], SpawnParticleEffectPacket);
exports.SpawnParticleEffectPacket = SpawnParticleEffectPacket;
/** @deprecated use SpawnParticleEffectPacket, follow real class name */
exports.SpawnParticleEffect = SpawnParticleEffectPacket;
let AvailableActorIdentifiersPacket = class AvailableActorIdentifiersPacket extends packet_1.Packet {
};
AvailableActorIdentifiersPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], AvailableActorIdentifiersPacket);
exports.AvailableActorIdentifiersPacket = AvailableActorIdentifiersPacket;
/** @deprecated Unused packet, use LevelSoundEventPacket instead. */
let LevelSoundEventPacketV2 = class LevelSoundEventPacketV2 extends packet_1.Packet {
};
LevelSoundEventPacketV2 = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], LevelSoundEventPacketV2);
exports.LevelSoundEventPacketV2 = LevelSoundEventPacketV2;
let NetworkChunkPublisherUpdatePacket = class NetworkChunkPublisherUpdatePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.BlockPos)
], NetworkChunkPublisherUpdatePacket.prototype, "position", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], NetworkChunkPublisherUpdatePacket.prototype, "radius", void 0);
NetworkChunkPublisherUpdatePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], NetworkChunkPublisherUpdatePacket);
exports.NetworkChunkPublisherUpdatePacket = NetworkChunkPublisherUpdatePacket;
let BiomeDefinitionList = class BiomeDefinitionList extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nbt_1.CompoundTag)
], BiomeDefinitionList.prototype, "nbt", void 0);
BiomeDefinitionList = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], BiomeDefinitionList);
exports.BiomeDefinitionList = BiomeDefinitionList;
let LevelSoundEventPacket = class LevelSoundEventPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], LevelSoundEventPacket.prototype, "sound", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.Vec3)
], LevelSoundEventPacket.prototype, "pos", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], LevelSoundEventPacket.prototype, "extraData", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], LevelSoundEventPacket.prototype, "entityType", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], LevelSoundEventPacket.prototype, "isBabyMob", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], LevelSoundEventPacket.prototype, "disableRelativeVolume", void 0);
LevelSoundEventPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], LevelSoundEventPacket);
exports.LevelSoundEventPacket = LevelSoundEventPacket;
let LevelEventGenericPacket = class LevelEventGenericPacket extends packet_1.Packet {
};
LevelEventGenericPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], LevelEventGenericPacket);
exports.LevelEventGenericPacket = LevelEventGenericPacket;
let LecternUpdatePacket = class LecternUpdatePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], LecternUpdatePacket.prototype, "page", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], LecternUpdatePacket.prototype, "pageCount", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.Vec3)
], LecternUpdatePacket.prototype, "position", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], LecternUpdatePacket.prototype, "dropBook", void 0);
LecternUpdatePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], LecternUpdatePacket);
exports.LecternUpdatePacket = LecternUpdatePacket;
let RemoveEntityPacket = class RemoveEntityPacket extends packet_1.Packet {
};
RemoveEntityPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], RemoveEntityPacket);
exports.RemoveEntityPacket = RemoveEntityPacket;
let ClientCacheStatusPacket = class ClientCacheStatusPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bool_t)
], ClientCacheStatusPacket.prototype, "enabled", void 0);
ClientCacheStatusPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ClientCacheStatusPacket);
exports.ClientCacheStatusPacket = ClientCacheStatusPacket;
let OnScreenTextureAnimationPacket = class OnScreenTextureAnimationPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], OnScreenTextureAnimationPacket.prototype, "animationType", void 0);
OnScreenTextureAnimationPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], OnScreenTextureAnimationPacket);
exports.OnScreenTextureAnimationPacket = OnScreenTextureAnimationPacket;
let MapCreateLockedCopy = class MapCreateLockedCopy extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint64_as_float_t)
], MapCreateLockedCopy.prototype, "original", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint64_as_float_t)
], MapCreateLockedCopy.prototype, "new", void 0);
MapCreateLockedCopy = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], MapCreateLockedCopy);
exports.MapCreateLockedCopy = MapCreateLockedCopy;
let StructureTemplateDataRequestPacket = class StructureTemplateDataRequestPacket extends packet_1.Packet {
};
StructureTemplateDataRequestPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], StructureTemplateDataRequestPacket);
exports.StructureTemplateDataRequestPacket = StructureTemplateDataRequestPacket;
let StructureTemplateDataResponsePacket = class StructureTemplateDataResponsePacket extends packet_1.Packet {
};
StructureTemplateDataResponsePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], StructureTemplateDataResponsePacket);
exports.StructureTemplateDataResponsePacket = StructureTemplateDataResponsePacket;
/** @deprecated Use StructureTemplateDataResponsePacket instead, to match to official class name*/
exports.StructureTemplateDataExportPacket = StructureTemplateDataResponsePacket;
let ClientCacheBlobStatusPacket = class ClientCacheBlobStatusPacket extends packet_1.Packet {
};
ClientCacheBlobStatusPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ClientCacheBlobStatusPacket);
exports.ClientCacheBlobStatusPacket = ClientCacheBlobStatusPacket;
let ClientCacheMissResponsePacket = class ClientCacheMissResponsePacket extends packet_1.Packet {
};
ClientCacheMissResponsePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ClientCacheMissResponsePacket);
exports.ClientCacheMissResponsePacket = ClientCacheMissResponsePacket;
let EducationSettingsPacket = class EducationSettingsPacket extends packet_1.Packet {
};
EducationSettingsPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], EducationSettingsPacket);
exports.EducationSettingsPacket = EducationSettingsPacket;
let EmotePacket = class EmotePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(actor_1.ActorRuntimeID)
], EmotePacket.prototype, "runtimeId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], EmotePacket.prototype, "emoteId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], EmotePacket.prototype, "flag", void 0);
EmotePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], EmotePacket);
exports.EmotePacket = EmotePacket;
(function (EmotePacket) {
    let Flags;
    (function (Flags) {
        Flags[Flags["ServerSide"] = 1] = "ServerSide";
        Flags[Flags["MuteChat"] = 2] = "MuteChat";
    })(Flags = EmotePacket.Flags || (EmotePacket.Flags = {}));
})(EmotePacket = exports.EmotePacket || (exports.EmotePacket = {}));
exports.EmotePacket = EmotePacket;
/** @deprecated Minecraft Education Edition exclusive */
let MultiplayerSettingsPacket = class MultiplayerSettingsPacket extends packet_1.Packet {
};
MultiplayerSettingsPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], MultiplayerSettingsPacket);
exports.MultiplayerSettingsPacket = MultiplayerSettingsPacket;
let SettingsCommandPacket = class SettingsCommandPacket extends packet_1.Packet {
};
SettingsCommandPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], SettingsCommandPacket);
exports.SettingsCommandPacket = SettingsCommandPacket;
let AnvilDamagePacket = class AnvilDamagePacket extends packet_1.Packet {
};
AnvilDamagePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], AnvilDamagePacket);
exports.AnvilDamagePacket = AnvilDamagePacket;
let CompletedUsingItemPacket = class CompletedUsingItemPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int16_t)
], CompletedUsingItemPacket.prototype, "itemId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], CompletedUsingItemPacket.prototype, "action", void 0);
CompletedUsingItemPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], CompletedUsingItemPacket);
exports.CompletedUsingItemPacket = CompletedUsingItemPacket;
(function (CompletedUsingItemPacket) {
    let Actions;
    (function (Actions) {
        Actions[Actions["EquipArmor"] = 0] = "EquipArmor";
        Actions[Actions["Eat"] = 1] = "Eat";
        Actions[Actions["Attack"] = 2] = "Attack";
        Actions[Actions["Consume"] = 3] = "Consume";
        Actions[Actions["Throw"] = 4] = "Throw";
        Actions[Actions["Shoot"] = 5] = "Shoot";
        Actions[Actions["Place"] = 6] = "Place";
        Actions[Actions["FillBottle"] = 7] = "FillBottle";
        Actions[Actions["FillBucket"] = 8] = "FillBucket";
        Actions[Actions["PourBucket"] = 9] = "PourBucket";
        Actions[Actions["UseTool"] = 10] = "UseTool";
        Actions[Actions["Interact"] = 11] = "Interact";
        Actions[Actions["Retrieved"] = 12] = "Retrieved";
        Actions[Actions["Dyed"] = 13] = "Dyed";
        Actions[Actions["Traded"] = 14] = "Traded";
    })(Actions = CompletedUsingItemPacket.Actions || (CompletedUsingItemPacket.Actions = {}));
})(CompletedUsingItemPacket = exports.CompletedUsingItemPacket || (exports.CompletedUsingItemPacket = {}));
exports.CompletedUsingItemPacket = CompletedUsingItemPacket;
let NetworkSettingsPacket = class NetworkSettingsPacket extends packet_1.Packet {
};
NetworkSettingsPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], NetworkSettingsPacket);
exports.NetworkSettingsPacket = NetworkSettingsPacket;
let PlayerAuthInputPacket = class PlayerAuthInputPacket extends packet_1.Packet {
    /** @deprecated */
    get heaYaw() {
        return this.headYaw;
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], PlayerAuthInputPacket.prototype, "pitch", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], PlayerAuthInputPacket.prototype, "yaw", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.Vec3)
], PlayerAuthInputPacket.prototype, "pos", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], PlayerAuthInputPacket.prototype, "moveX", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], PlayerAuthInputPacket.prototype, "moveZ", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], PlayerAuthInputPacket.prototype, "headYaw", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bin64_t)
], PlayerAuthInputPacket.prototype, "inputFlags", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], PlayerAuthInputPacket.prototype, "inputMode", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint32_t)
], PlayerAuthInputPacket.prototype, "playMode", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.Vec3)
], PlayerAuthInputPacket.prototype, "vrGazeDirection", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.bin64_t)
], PlayerAuthInputPacket.prototype, "tick", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(blockpos_1.Vec3)
], PlayerAuthInputPacket.prototype, "delta", void 0);
PlayerAuthInputPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], PlayerAuthInputPacket);
exports.PlayerAuthInputPacket = PlayerAuthInputPacket;
(function (PlayerAuthInputPacket) {
    let InputData;
    (function (InputData) {
        InputData[InputData["Ascend"] = 0] = "Ascend";
        InputData[InputData["Descend"] = 1] = "Descend";
        InputData[InputData["NorthJump"] = 2] = "NorthJump";
        InputData[InputData["JumpDown"] = 3] = "JumpDown";
        InputData[InputData["SprintDown"] = 4] = "SprintDown";
        InputData[InputData["ChangeHeight"] = 5] = "ChangeHeight";
        InputData[InputData["Jumping"] = 6] = "Jumping";
        InputData[InputData["AutoJumpingInWater"] = 7] = "AutoJumpingInWater";
        InputData[InputData["Sneaking"] = 8] = "Sneaking";
        InputData[InputData["SneakDown"] = 9] = "SneakDown";
        InputData[InputData["Up"] = 10] = "Up";
        InputData[InputData["Down"] = 11] = "Down";
        InputData[InputData["Left"] = 12] = "Left";
        InputData[InputData["Right"] = 13] = "Right";
        InputData[InputData["UpLeft"] = 14] = "UpLeft";
        InputData[InputData["UpRight"] = 15] = "UpRight";
        InputData[InputData["WantUp"] = 16] = "WantUp";
        InputData[InputData["WantDown"] = 17] = "WantDown";
        InputData[InputData["WantDownSlow"] = 18] = "WantDownSlow";
        InputData[InputData["WantUpSlow"] = 19] = "WantUpSlow";
        InputData[InputData["Sprinting"] = 20] = "Sprinting";
        InputData[InputData["AscendScaffolding"] = 21] = "AscendScaffolding";
        InputData[InputData["DescendScaffolding"] = 22] = "DescendScaffolding";
        InputData[InputData["SneakToggleDown"] = 23] = "SneakToggleDown";
        InputData[InputData["PersistSneak"] = 24] = "PersistSneak";
        // These are all from IDA, PlayerAuthInputPacket::InputData in 1.14.60.5, 25-36 were not implemented
    })(InputData = PlayerAuthInputPacket.InputData || (PlayerAuthInputPacket.InputData = {}));
})(PlayerAuthInputPacket = exports.PlayerAuthInputPacket || (exports.PlayerAuthInputPacket = {}));
exports.PlayerAuthInputPacket = PlayerAuthInputPacket;
let CreativeContentPacket = class CreativeContentPacket extends packet_1.Packet {
};
CreativeContentPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], CreativeContentPacket);
exports.CreativeContentPacket = CreativeContentPacket;
let PlayerEnchantOptionsPacket = class PlayerEnchantOptionsPacket extends packet_1.Packet {
};
PlayerEnchantOptionsPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], PlayerEnchantOptionsPacket);
exports.PlayerEnchantOptionsPacket = PlayerEnchantOptionsPacket;
let ItemStackRequestSlotInfo = class ItemStackRequestSlotInfo extends nativeclass_1.NativeStruct {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], ItemStackRequestSlotInfo.prototype, "openContainerNetId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], ItemStackRequestSlotInfo.prototype, "slot", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(inventory_1.ItemStackNetIdVariant)
], ItemStackRequestSlotInfo.prototype, "netIdVariant", void 0);
ItemStackRequestSlotInfo = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ItemStackRequestSlotInfo);
exports.ItemStackRequestSlotInfo = ItemStackRequestSlotInfo;
var ItemStackRequestActionType;
(function (ItemStackRequestActionType) {
    ItemStackRequestActionType[ItemStackRequestActionType["Take"] = 0] = "Take";
    ItemStackRequestActionType[ItemStackRequestActionType["Place"] = 1] = "Place";
    ItemStackRequestActionType[ItemStackRequestActionType["Swap"] = 2] = "Swap";
    ItemStackRequestActionType[ItemStackRequestActionType["Drop"] = 3] = "Drop";
    ItemStackRequestActionType[ItemStackRequestActionType["Destroy"] = 4] = "Destroy";
    ItemStackRequestActionType[ItemStackRequestActionType["Consume"] = 5] = "Consume";
    ItemStackRequestActionType[ItemStackRequestActionType["Create"] = 6] = "Create";
    ItemStackRequestActionType[ItemStackRequestActionType["PlaceInItemContainer"] = 7] = "PlaceInItemContainer";
    ItemStackRequestActionType[ItemStackRequestActionType["TakeFromItemContainer"] = 8] = "TakeFromItemContainer";
    ItemStackRequestActionType[ItemStackRequestActionType["ScreenLabTableCombine"] = 9] = "ScreenLabTableCombine";
    ItemStackRequestActionType[ItemStackRequestActionType["ScreenBeaconPayment"] = 10] = "ScreenBeaconPayment";
    ItemStackRequestActionType[ItemStackRequestActionType["ScreenHUDMineBlock"] = 11] = "ScreenHUDMineBlock";
    ItemStackRequestActionType[ItemStackRequestActionType["CraftRecipe"] = 12] = "CraftRecipe";
    ItemStackRequestActionType[ItemStackRequestActionType["CraftRecipeAuto"] = 13] = "CraftRecipeAuto";
    ItemStackRequestActionType[ItemStackRequestActionType["CraftCreative"] = 14] = "CraftCreative";
    ItemStackRequestActionType[ItemStackRequestActionType["CraftRecipeOptional"] = 15] = "CraftRecipeOptional";
    ItemStackRequestActionType[ItemStackRequestActionType["CraftRepairAndDisenchant"] = 16] = "CraftRepairAndDisenchant";
    ItemStackRequestActionType[ItemStackRequestActionType["CraftLoom"] = 17] = "CraftLoom";
    /** @deprecated Deprecated in BDS */
    ItemStackRequestActionType[ItemStackRequestActionType["CraftNonImplemented_DEPRECATEDASKTYLAING"] = 18] = "CraftNonImplemented_DEPRECATEDASKTYLAING";
    /** @deprecated Deprecated in BDS */
    ItemStackRequestActionType[ItemStackRequestActionType["CraftResults_DEPRECATEDASKTYLAING"] = 19] = "CraftResults_DEPRECATEDASKTYLAING";
})(ItemStackRequestActionType = exports.ItemStackRequestActionType || (exports.ItemStackRequestActionType = {}));
let ItemStackRequestAction = class ItemStackRequestAction extends nativeclass_1.AbstractClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(core_1.VoidPointer)
], ItemStackRequestAction.prototype, "vftable", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], ItemStackRequestAction.prototype, "type", void 0);
ItemStackRequestAction = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ItemStackRequestAction);
exports.ItemStackRequestAction = ItemStackRequestAction;
ItemStackRequestAction.setResolver(ptr => {
    if (ptr === null)
        return null;
    const action = ptr.as(ItemStackRequestAction);
    switch (action.type) {
        case ItemStackRequestActionType.Take:
        case ItemStackRequestActionType.Place:
        case ItemStackRequestActionType.Swap:
        case ItemStackRequestActionType.Destroy:
        case ItemStackRequestActionType.Consume:
        case ItemStackRequestActionType.PlaceInItemContainer:
        case ItemStackRequestActionType.TakeFromItemContainer:
            return ptr.as(ItemStackRequestActionTransferBase);
        default:
            return action;
    }
});
let ItemStackRequestActionTransferBase = class ItemStackRequestActionTransferBase extends ItemStackRequestAction {
    getSrc() {
        (0, common_1.abstract)();
    }
};
ItemStackRequestActionTransferBase = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ItemStackRequestActionTransferBase);
exports.ItemStackRequestActionTransferBase = ItemStackRequestActionTransferBase;
let ItemStackRequestData = class ItemStackRequestData extends nativeclass_1.AbstractClass {
    get stringsToFilter() {
        return this.getStringsToFilter();
    }
    /** @deprecated use getActions */
    get actions() {
        return this.getActions();
    }
    getStringsToFilter() {
        (0, common_1.abstract)();
    }
    getActions() {
        (0, common_1.abstract)();
    }
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t, 0x08)
], ItemStackRequestData.prototype, "clientRequestId", void 0);
ItemStackRequestData = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ItemStackRequestData);
exports.ItemStackRequestData = ItemStackRequestData;
let ItemStackRequestBatch = class ItemStackRequestBatch extends nativeclass_1.AbstractClass {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(ItemStackRequestData.ref()))
], ItemStackRequestBatch.prototype, "data", void 0);
ItemStackRequestBatch = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], ItemStackRequestBatch);
exports.ItemStackRequestBatch = ItemStackRequestBatch;
let ItemStackRequestPacket = class ItemStackRequestPacket extends packet_1.Packet {
    getRequestBatch() {
        (0, common_1.abstract)();
    }
};
ItemStackRequestPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ItemStackRequestPacket);
exports.ItemStackRequestPacket = ItemStackRequestPacket;
/** @deprecated use ItemStackRequestPacket, follow the real class name */
exports.ItemStackRequest = ItemStackRequestPacket;
let ItemStackResponsePacket = class ItemStackResponsePacket extends packet_1.Packet {
};
ItemStackResponsePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ItemStackResponsePacket);
exports.ItemStackResponsePacket = ItemStackResponsePacket;
/** @deprecated use ItemStackResponsePacket, follow the real class name */
exports.ItemStackResponse = ItemStackResponsePacket;
let PlayerArmorDamagePacket = class PlayerArmorDamagePacket extends packet_1.Packet {
};
PlayerArmorDamagePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], PlayerArmorDamagePacket);
exports.PlayerArmorDamagePacket = PlayerArmorDamagePacket;
let CodeBuilderPacket = class CodeBuilderPacket extends packet_1.Packet {
};
CodeBuilderPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], CodeBuilderPacket);
exports.CodeBuilderPacket = CodeBuilderPacket;
let UpdatePlayerGameTypePacket = class UpdatePlayerGameTypePacket extends packet_1.Packet {
};
UpdatePlayerGameTypePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], UpdatePlayerGameTypePacket);
exports.UpdatePlayerGameTypePacket = UpdatePlayerGameTypePacket;
let EmoteListPacket = class EmoteListPacket extends packet_1.Packet {
};
EmoteListPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], EmoteListPacket);
exports.EmoteListPacket = EmoteListPacket;
let PositionTrackingDBServerBroadcastPacket = class PositionTrackingDBServerBroadcastPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], PositionTrackingDBServerBroadcastPacket.prototype, "action", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], PositionTrackingDBServerBroadcastPacket.prototype, "trackingId", void 0);
PositionTrackingDBServerBroadcastPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], PositionTrackingDBServerBroadcastPacket);
exports.PositionTrackingDBServerBroadcastPacket = PositionTrackingDBServerBroadcastPacket;
(function (PositionTrackingDBServerBroadcastPacket) {
    let Actions;
    (function (Actions) {
        Actions[Actions["Update"] = 0] = "Update";
        Actions[Actions["Destroy"] = 1] = "Destroy";
        Actions[Actions["NotFound"] = 2] = "NotFound";
    })(Actions = PositionTrackingDBServerBroadcastPacket.Actions || (PositionTrackingDBServerBroadcastPacket.Actions = {}));
})(PositionTrackingDBServerBroadcastPacket = exports.PositionTrackingDBServerBroadcastPacket || (exports.PositionTrackingDBServerBroadcastPacket = {}));
exports.PositionTrackingDBServerBroadcastPacket = PositionTrackingDBServerBroadcastPacket;
/** @deprecated use PositionTrackingDBServerBroadcastPacket, follow the real class name */
exports.PositionTrackingDBServerBroadcast = PositionTrackingDBServerBroadcastPacket;
let PositionTrackingDBClientRequestPacket = class PositionTrackingDBClientRequestPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], PositionTrackingDBClientRequestPacket.prototype, "action", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], PositionTrackingDBClientRequestPacket.prototype, "trackingId", void 0);
PositionTrackingDBClientRequestPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], PositionTrackingDBClientRequestPacket);
exports.PositionTrackingDBClientRequestPacket = PositionTrackingDBClientRequestPacket;
(function (PositionTrackingDBClientRequestPacket) {
    let Actions;
    (function (Actions) {
        Actions[Actions["Query"] = 0] = "Query";
    })(Actions = PositionTrackingDBClientRequestPacket.Actions || (PositionTrackingDBClientRequestPacket.Actions = {}));
})(PositionTrackingDBClientRequestPacket = exports.PositionTrackingDBClientRequestPacket || (exports.PositionTrackingDBClientRequestPacket = {}));
exports.PositionTrackingDBClientRequestPacket = PositionTrackingDBClientRequestPacket;
/** @deprecated Use PositionTrackingDBClientRequestPacket, follow the real class name */
exports.PositionTrackingDBClientRequest = PositionTrackingDBClientRequestPacket;
let DebugInfoPacket = class DebugInfoPacket extends packet_1.Packet {
};
DebugInfoPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], DebugInfoPacket);
exports.DebugInfoPacket = DebugInfoPacket;
let PacketViolationWarningPacket = class PacketViolationWarningPacket extends packet_1.Packet {
};
PacketViolationWarningPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], PacketViolationWarningPacket);
exports.PacketViolationWarningPacket = PacketViolationWarningPacket;
let MotionPredictionHintsPacket = class MotionPredictionHintsPacket extends packet_1.Packet {
};
MotionPredictionHintsPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], MotionPredictionHintsPacket);
exports.MotionPredictionHintsPacket = MotionPredictionHintsPacket;
let AnimateEntityPacket = class AnimateEntityPacket extends packet_1.Packet {
};
AnimateEntityPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], AnimateEntityPacket);
exports.AnimateEntityPacket = AnimateEntityPacket;
let CameraShakePacket = class CameraShakePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], CameraShakePacket.prototype, "intensity", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.float32_t)
], CameraShakePacket.prototype, "duration", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], CameraShakePacket.prototype, "shakeType", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.uint8_t)
], CameraShakePacket.prototype, "shakeAction", void 0);
CameraShakePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], CameraShakePacket);
exports.CameraShakePacket = CameraShakePacket;
(function (CameraShakePacket) {
    let ShakeType;
    (function (ShakeType) {
        ShakeType[ShakeType["Positional"] = 0] = "Positional";
        ShakeType[ShakeType["Rotational"] = 1] = "Rotational";
    })(ShakeType = CameraShakePacket.ShakeType || (CameraShakePacket.ShakeType = {}));
    let ShakeAction;
    (function (ShakeAction) {
        ShakeAction[ShakeAction["Add"] = 0] = "Add";
        ShakeAction[ShakeAction["Stop"] = 1] = "Stop";
    })(ShakeAction = CameraShakePacket.ShakeAction || (CameraShakePacket.ShakeAction = {}));
})(CameraShakePacket = exports.CameraShakePacket || (exports.CameraShakePacket = {}));
exports.CameraShakePacket = CameraShakePacket;
let PlayerFogPacket = class PlayerFogPacket extends packet_1.Packet {
};
PlayerFogPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], PlayerFogPacket);
exports.PlayerFogPacket = PlayerFogPacket;
let CorrectPlayerMovePredictionPacket = class CorrectPlayerMovePredictionPacket extends packet_1.Packet {
};
CorrectPlayerMovePredictionPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], CorrectPlayerMovePredictionPacket);
exports.CorrectPlayerMovePredictionPacket = CorrectPlayerMovePredictionPacket;
let ItemComponentPacket = class ItemComponentPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxvector_1.CxxVector.make(cxxpair_1.CxxPair.make(nativetype_1.CxxString, nbt_1.CompoundTag)))
], ItemComponentPacket.prototype, "entries", void 0);
ItemComponentPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ItemComponentPacket);
exports.ItemComponentPacket = ItemComponentPacket;
let FilterTextPacket = class FilterTextPacket extends packet_1.Packet {
};
FilterTextPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], FilterTextPacket);
exports.FilterTextPacket = FilterTextPacket;
let ClientboundDebugRendererPacket = class ClientboundDebugRendererPacket extends packet_1.Packet {
};
ClientboundDebugRendererPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ClientboundDebugRendererPacket);
exports.ClientboundDebugRendererPacket = ClientboundDebugRendererPacket;
let SyncActorPropertyPacket = class SyncActorPropertyPacket extends packet_1.Packet {
};
SyncActorPropertyPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], SyncActorPropertyPacket);
exports.SyncActorPropertyPacket = SyncActorPropertyPacket;
let AddVolumeEntityPacket = class AddVolumeEntityPacket extends packet_1.Packet {
};
AddVolumeEntityPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], AddVolumeEntityPacket);
exports.AddVolumeEntityPacket = AddVolumeEntityPacket;
let RemoveVolumeEntityPacket = class RemoveVolumeEntityPacket extends packet_1.Packet {
};
RemoveVolumeEntityPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], RemoveVolumeEntityPacket);
exports.RemoveVolumeEntityPacket = RemoveVolumeEntityPacket;
let SimulationTypePacket = class SimulationTypePacket extends packet_1.Packet {
};
SimulationTypePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], SimulationTypePacket);
exports.SimulationTypePacket = SimulationTypePacket;
let NpcDialoguePacket = class NpcDialoguePacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(actor_1.ActorUniqueID)
], NpcDialoguePacket.prototype, "actorId", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int32_t)
], NpcDialoguePacket.prototype, "action", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.int64_as_float_t, 0x30)
], NpcDialoguePacket.prototype, "actorIdAsNumber", void 0);
NpcDialoguePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], NpcDialoguePacket);
exports.NpcDialoguePacket = NpcDialoguePacket;
(function (NpcDialoguePacket) {
    let Actions;
    (function (Actions) {
        Actions[Actions["Open"] = 0] = "Open";
        Actions[Actions["Close"] = 1] = "Close";
    })(Actions = NpcDialoguePacket.Actions || (NpcDialoguePacket.Actions = {}));
})(NpcDialoguePacket = exports.NpcDialoguePacket || (exports.NpcDialoguePacket = {}));
exports.NpcDialoguePacket = NpcDialoguePacket;
// export class ActorFall extends Packet {
//     // unknown
// }
/** @deprecated not available */
class BlockPalette extends packet_1.Packet {
}
exports.BlockPalette = BlockPalette;
/** @deprecated not available */
class VideoStreamConnect_DEPRECATED extends packet_1.Packet {
}
exports.VideoStreamConnect_DEPRECATED = VideoStreamConnect_DEPRECATED;
class AddEntity extends packet_1.Packet {
}
exports.AddEntity = AddEntity;
// export class UpdateBlockProperties extends Packet {
//     // unknown
// }
class EduUriResourcePacket extends packet_1.Packet {
}
exports.EduUriResourcePacket = EduUriResourcePacket;
class CreatePhotoPacket extends packet_1.Packet {
}
exports.CreatePhotoPacket = CreatePhotoPacket;
class UpdateSubChunkBlocksPacket extends packet_1.Packet {
}
exports.UpdateSubChunkBlocksPacket = UpdateSubChunkBlocksPacket;
/** @deprecated use UpdateSubChunkBlocksPacket, follow the real class name */
exports.UpdateSubChunkBlocks = UpdateSubChunkBlocksPacket;
// export class PhotoInfoRequest extends Packet {
//     // unknown
// }
let PlayerStartItemCooldownPacket = class PlayerStartItemCooldownPacket extends packet_1.Packet {
};
PlayerStartItemCooldownPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], PlayerStartItemCooldownPacket);
exports.PlayerStartItemCooldownPacket = PlayerStartItemCooldownPacket;
let ScriptMessagePacket = class ScriptMessagePacket extends packet_1.Packet {
};
ScriptMessagePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ScriptMessagePacket);
exports.ScriptMessagePacket = ScriptMessagePacket;
let CodeBuilderSourcePacket = class CodeBuilderSourcePacket extends packet_1.Packet {
};
CodeBuilderSourcePacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], CodeBuilderSourcePacket);
exports.CodeBuilderSourcePacket = CodeBuilderSourcePacket;
let TickingAreasLoadStatusPacket = class TickingAreasLoadStatusPacket extends packet_1.Packet {
};
TickingAreasLoadStatusPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], TickingAreasLoadStatusPacket);
exports.TickingAreasLoadStatusPacket = TickingAreasLoadStatusPacket;
let DimensionDataPacket = class DimensionDataPacket extends packet_1.Packet {
};
DimensionDataPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], DimensionDataPacket);
exports.DimensionDataPacket = DimensionDataPacket;
let AgentActionEventPacket = class AgentActionEventPacket extends packet_1.Packet {
};
AgentActionEventPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], AgentActionEventPacket);
exports.AgentActionEventPacket = AgentActionEventPacket;
let ChangeMobPropertyPacket = class ChangeMobPropertyPacket extends packet_1.Packet {
};
ChangeMobPropertyPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ChangeMobPropertyPacket);
exports.ChangeMobPropertyPacket = ChangeMobPropertyPacket;
let LessonProgressPacket = class LessonProgressPacket extends packet_1.Packet {
};
LessonProgressPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], LessonProgressPacket);
exports.LessonProgressPacket = LessonProgressPacket;
let RequestAbilityPacket = class RequestAbilityPacket extends packet_1.Packet {
};
RequestAbilityPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], RequestAbilityPacket);
exports.RequestAbilityPacket = RequestAbilityPacket;
let RequestPermissionsPacket = class RequestPermissionsPacket extends packet_1.Packet {
};
RequestPermissionsPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], RequestPermissionsPacket);
exports.RequestPermissionsPacket = RequestPermissionsPacket;
let ToastRequestPacket = class ToastRequestPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], ToastRequestPacket.prototype, "title", void 0);
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(nativetype_1.CxxString)
], ToastRequestPacket.prototype, "body", void 0);
ToastRequestPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x70)
], ToastRequestPacket);
exports.ToastRequestPacket = ToastRequestPacket;
let UpdateAbilitiesPacket = class UpdateAbilitiesPacket extends packet_1.Packet {
};
UpdateAbilitiesPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(0x50)
], UpdateAbilitiesPacket);
exports.UpdateAbilitiesPacket = UpdateAbilitiesPacket;
let UpdateAdventureSettingsPacket = class UpdateAdventureSettingsPacket extends packet_1.Packet {
};
UpdateAdventureSettingsPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], UpdateAdventureSettingsPacket);
exports.UpdateAdventureSettingsPacket = UpdateAdventureSettingsPacket;
let DeathInfoPacket = class DeathInfoPacket extends packet_1.Packet {
};
tslib_1.__decorate([
    (0, nativeclass_1.nativeField)(cxxpair_1.CxxPair.make(nativetype_1.CxxString, CxxVector$string))
], DeathInfoPacket.prototype, "info", void 0);
DeathInfoPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)()
], DeathInfoPacket);
exports.DeathInfoPacket = DeathInfoPacket;
let EditorNetworkPacket = class EditorNetworkPacket extends packet_1.Packet {
};
EditorNetworkPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], EditorNetworkPacket);
exports.EditorNetworkPacket = EditorNetworkPacket;
let FeatureRegistryPacket = class FeatureRegistryPacket extends packet_1.Packet {
};
FeatureRegistryPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], FeatureRegistryPacket);
exports.FeatureRegistryPacket = FeatureRegistryPacket;
let ServerStatsPacket = class ServerStatsPacket extends packet_1.Packet {
};
ServerStatsPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], ServerStatsPacket);
exports.ServerStatsPacket = ServerStatsPacket;
let RequestNetworkSettingsPacket = class RequestNetworkSettingsPacket extends packet_1.Packet {
};
RequestNetworkSettingsPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], RequestNetworkSettingsPacket);
exports.RequestNetworkSettingsPacket = RequestNetworkSettingsPacket;
let GameTestRequestPacket = class GameTestRequestPacket extends packet_1.Packet {
};
GameTestRequestPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], GameTestRequestPacket);
exports.GameTestRequestPacket = GameTestRequestPacket;
let GameTestResultsPacket = class GameTestResultsPacket extends packet_1.Packet {
};
GameTestResultsPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], GameTestResultsPacket);
exports.GameTestResultsPacket = GameTestResultsPacket;
let UpdateClientInputLocksPacket = class UpdateClientInputLocksPacket extends packet_1.Packet {
};
UpdateClientInputLocksPacket = tslib_1.__decorate([
    (0, nativeclass_1.nativeClass)(null)
], UpdateClientInputLocksPacket);
exports.UpdateClientInputLocksPacket = UpdateClientInputLocksPacket;
exports.PacketIdToType = {
    0x01: LoginPacket,
    0x02: PlayStatusPacket,
    0x03: ServerToClientHandshakePacket,
    0x04: ClientToServerHandshakePacket,
    0x05: DisconnectPacket,
    0x06: ResourcePacksInfoPacket,
    0x07: ResourcePackStackPacket,
    0x08: ResourcePackClientResponsePacket,
    0x09: TextPacket,
    0x0a: SetTimePacket,
    0x0b: StartGamePacket,
    0x0c: AddPlayerPacket,
    0x0d: AddActorPacket,
    0x0e: RemoveActorPacket,
    0x0f: AddItemActorPacket,
    // 0x10: UNUSED_PLS_USE_ME, // DEPRECATED
    0x11: TakeItemActorPacket,
    0x12: MoveActorAbsolutePacket,
    0x13: MovePlayerPacket,
    0x14: PassengerJumpPacket,
    0x15: UpdateBlockPacket,
    0x16: AddPaintingPacket,
    0x17: TickSyncPacket,
    0x18: LevelSoundEventPacketV1,
    0x19: LevelEventPacket,
    0x1a: BlockEventPacket,
    0x1b: ActorEventPacket,
    0x1c: MobEffectPacket,
    0x1d: UpdateAttributesPacket,
    0x1e: InventoryTransactionPacket,
    0x1f: MobEquipmentPacket,
    0x20: MobArmorEquipmentPacket,
    0x21: InteractPacket,
    0x22: BlockPickRequestPacket,
    0x23: ActorPickRequestPacket,
    0x24: PlayerActionPacket,
    // 0x25: ActorFall, // DEPRECATED
    0x26: HurtArmorPacket,
    0x27: SetActorDataPacket,
    0x28: SetActorMotionPacket,
    0x29: SetActorLinkPacket,
    0x2a: SetHealthPacket,
    0x2b: SetSpawnPositionPacket,
    0x2c: AnimatePacket,
    0x2d: RespawnPacket,
    0x2e: ContainerOpenPacket,
    0x2f: ContainerClosePacket,
    0x30: PlayerHotbarPacket,
    0x31: InventoryContentPacket,
    0x32: InventorySlotPacket,
    0x33: ContainerSetDataPacket,
    0x34: CraftingDataPacket,
    0x35: CraftingEventPacket,
    0x36: GuiDataPickItemPacket,
    0x37: AdventureSettingsPacket,
    0x38: BlockActorDataPacket,
    0x39: PlayerInputPacket,
    0x3a: LevelChunkPacket,
    0x3b: SetCommandsEnabledPacket,
    0x3c: SetDifficultyPacket,
    0x3d: ChangeDimensionPacket,
    0x3e: SetPlayerGameTypePacket,
    0x3f: PlayerListPacket,
    0x40: SimpleEventPacket,
    0x41: EventPacket,
    0x42: SpawnExperienceOrbPacket,
    0x43: ClientboundMapItemData,
    0x44: MapInfoRequestPacket,
    0x45: RequestChunkRadiusPacket,
    0x46: ChunkRadiusUpdatedPacket,
    0x47: ItemFrameDropItemPacket,
    0x48: GameRulesChangedPacket,
    0x49: CameraPacket,
    0x4a: BossEventPacket,
    0x4b: ShowCreditsPacket,
    0x4c: AvailableCommandsPacket,
    0x4d: CommandRequestPacket,
    0x4e: CommandBlockUpdatePacket,
    0x4f: CommandOutputPacket,
    0x50: UpdateTradePacket,
    0x51: UpdateEquipPacket,
    0x52: ResourcePackDataInfoPacket,
    0x53: ResourcePackChunkDataPacket,
    0x54: ResourcePackChunkRequestPacket,
    0x55: TransferPacket,
    0x56: PlaySoundPacket,
    0x57: StopSoundPacket,
    0x58: SetTitlePacket,
    0x59: AddBehaviorTreePacket,
    0x5a: StructureBlockUpdatePacket,
    0x5b: ShowStoreOfferPacket,
    0x5c: PurchaseReceiptPacket,
    0x5d: PlayerSkinPacket,
    0x5e: SubClientLoginPacket,
    0x5f: AutomationClientConnectPacket,
    0x60: SetLastHurtByPacket,
    0x61: BookEditPacket,
    0x62: NpcRequestPacket,
    0x63: PhotoTransferPacket,
    0x64: ModalFormRequestPacket,
    0x65: ModalFormResponsePacket,
    0x66: ServerSettingsRequestPacket,
    0x67: ServerSettingsResponsePacket,
    0x68: ShowProfilePacket,
    0x69: SetDefaultGameTypePacket,
    0x6a: RemoveObjectivePacket,
    0x6b: SetDisplayObjectivePacket,
    0x6c: SetScorePacket,
    0x6d: LabTablePacket,
    0x6e: UpdateBlockPacketSynced,
    0x6f: MoveActorDeltaPacket,
    0x70: SetScoreboardIdentityPacket,
    0x71: SetLocalPlayerAsInitializedPacket,
    0x72: UpdateSoftEnumPacket,
    0x73: NetworkStackLatencyPacket,
    // 0x74: BlockPalette, // DEPRECATED
    0x75: ScriptCustomEventPacket,
    0x76: SpawnParticleEffectPacket,
    0x77: AvailableActorIdentifiersPacket,
    0x78: LevelSoundEventPacketV2,
    0x79: NetworkChunkPublisherUpdatePacket,
    0x7a: BiomeDefinitionList,
    0x7b: LevelSoundEventPacket,
    0x7c: LevelEventGenericPacket,
    0x7d: LecternUpdatePacket,
    // 0x7e: VideoStreamConnect_DEPRECATED,
    0x7f: AddEntity,
    0x80: RemoveEntityPacket,
    0x81: ClientCacheStatusPacket,
    0x82: OnScreenTextureAnimationPacket,
    0x83: MapCreateLockedCopy,
    0x84: StructureTemplateDataRequestPacket,
    0x85: StructureTemplateDataResponsePacket,
    // 0x86: UpdateBlockProperties, // DEPRECATED
    0x87: ClientCacheBlobStatusPacket,
    0x88: ClientCacheMissResponsePacket,
    0x89: EducationSettingsPacket,
    0x8a: EmotePacket,
    0x8b: MultiplayerSettingsPacket,
    0x8c: SettingsCommandPacket,
    0x8d: AnvilDamagePacket,
    0x8e: CompletedUsingItemPacket,
    0x8f: NetworkSettingsPacket,
    0x90: PlayerAuthInputPacket,
    0x91: CreativeContentPacket,
    0x92: PlayerEnchantOptionsPacket,
    0x93: ItemStackRequestPacket,
    0x94: ItemStackResponsePacket,
    0x95: PlayerArmorDamagePacket,
    0x96: CodeBuilderPacket,
    0x97: UpdatePlayerGameTypePacket,
    0x98: EmoteListPacket,
    0x99: PositionTrackingDBServerBroadcastPacket,
    0x9a: PositionTrackingDBClientRequestPacket,
    0x9b: DebugInfoPacket,
    0x9c: PacketViolationWarningPacket,
    0x9d: MotionPredictionHintsPacket,
    0x9e: AnimateEntityPacket,
    0x9f: CameraShakePacket,
    0xa0: PlayerFogPacket,
    0xa1: CorrectPlayerMovePredictionPacket,
    0xa2: ItemComponentPacket,
    0xa3: FilterTextPacket,
    0xa4: ClientboundDebugRendererPacket,
    0xa5: SyncActorPropertyPacket,
    0xa6: AddVolumeEntityPacket,
    0xa7: RemoveVolumeEntityPacket,
    0xa8: SimulationTypePacket,
    0xa9: NpcDialoguePacket,
    0xaa: EduUriResourcePacket,
    0xab: CreatePhotoPacket,
    0xac: UpdateSubChunkBlocksPacket,
    // 0xad: PhotoInfoRequest
    0xb0: PlayerStartItemCooldownPacket,
    0xb1: ScriptMessagePacket,
    0xb2: CodeBuilderSourcePacket,
    0xb3: TickingAreasLoadStatusPacket,
    0xb4: DimensionDataPacket,
    0xb5: AgentActionEventPacket,
    0xb6: ChangeMobPropertyPacket,
    0xb7: LessonProgressPacket,
    0xb8: RequestAbilityPacket,
    0xb9: RequestPermissionsPacket,
    0xba: ToastRequestPacket,
    0xbb: UpdateAbilitiesPacket,
    0xbc: UpdateAdventureSettingsPacket,
    0xbd: DeathInfoPacket,
    0xbe: EditorNetworkPacket,
    0xbf: FeatureRegistryPacket,
    0xc0: ServerStatsPacket,
    0xc1: RequestNetworkSettingsPacket,
    0xc2: GameTestRequestPacket,
    0xc3: GameTestResultsPacket,
    0xc4: UpdateClientInputLocksPacket,
};
for (const [packetId, type] of Object.entries(exports.PacketIdToType)) {
    type.ID = +packetId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2V0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhY2tldHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsc0NBQW9EO0FBQ3BELGtDQUFzQztBQUN0Qyx3Q0FBcUM7QUFDckMsNENBQXlDO0FBQ3pDLGdDQUE2QjtBQUM3QixnREFBaUg7QUFDakgsOENBZXVCO0FBQ3ZCLG1DQUE4RjtBQUM5RiwyQ0FBc0Q7QUFDdEQseUNBQTREO0FBQzVELHVDQUF5RDtBQUN6RCwrQ0FBNEM7QUFFNUMsaURBQThDO0FBQzlDLDJDQUF5STtBQUN6SSwyREFBd0Q7QUFDeEQsK0JBQW9DO0FBQ3BDLHFDQUFrQztBQUVsQyw2Q0FBNkU7QUFDN0UsaUNBQXdDO0FBRXhDLE1BQU0sZ0JBQWdCLEdBQUcscUJBQVMsQ0FBQyxJQUFJLENBQUMsc0JBQVMsQ0FBQyxDQUFDO0FBRzVDLElBQU0sV0FBVyxHQUFqQixNQUFNLFdBQVksU0FBUSxlQUFNO0NBUXRDLENBQUE7QUFORztJQURDLElBQUEseUJBQVcsRUFBQyxvQkFBTyxDQUFDOzZDQUNIO0FBS2xCO0lBREMsSUFBQSx5QkFBVyxFQUFDLDJCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDOzRDQUNIO0FBUHpCLFdBQVc7SUFEdkIsSUFBQSx5QkFBVyxFQUFDLElBQUksQ0FBQztHQUNMLFdBQVcsQ0FRdkI7QUFSWSxrQ0FBVztBQVdqQixJQUFNLGdCQUFnQixHQUF0QixNQUFNLGdCQUFpQixTQUFRLGVBQU07Q0FHM0MsQ0FBQTtBQURHO0lBREMsSUFBQSx5QkFBVyxFQUFDLG9CQUFPLENBQUM7Z0RBQ0w7QUFGUCxnQkFBZ0I7SUFENUIsSUFBQSx5QkFBVyxFQUFDLElBQUksQ0FBQztHQUNMLGdCQUFnQixDQUc1QjtBQUhZLDRDQUFnQjtBQU10QixJQUFNLDZCQUE2QixHQUFuQyxNQUFNLDZCQUE4QixTQUFRLGVBQU07Q0FHeEQsQ0FBQTtBQURHO0lBREMsSUFBQSx5QkFBVyxFQUFDLHNCQUFT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