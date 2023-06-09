"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinecraftPacketIds = void 0;
/**
 * referred from: https://github.com/NiclasOlofsson/MiNET/blob/master/src/MiNET/MiNET/Net/MCPE%20Protocol%20Documentation.md
 */
var MinecraftPacketIds;
(function (MinecraftPacketIds) {
    MinecraftPacketIds[MinecraftPacketIds["Login"] = 1] = "Login";
    MinecraftPacketIds[MinecraftPacketIds["PlayStatus"] = 2] = "PlayStatus";
    MinecraftPacketIds[MinecraftPacketIds["ServerToClientHandshake"] = 3] = "ServerToClientHandshake";
    MinecraftPacketIds[MinecraftPacketIds["ClientToServerHandshake"] = 4] = "ClientToServerHandshake";
    MinecraftPacketIds[MinecraftPacketIds["Disconnect"] = 5] = "Disconnect";
    MinecraftPacketIds[MinecraftPacketIds["ResourcePacksInfo"] = 6] = "ResourcePacksInfo";
    /** @deprecated use ResourcePackStack, follow the real class name */
    MinecraftPacketIds[MinecraftPacketIds["ResourcePacksStack"] = 7] = "ResourcePacksStack";
    MinecraftPacketIds[MinecraftPacketIds["ResourcePackStack"] = 7] = "ResourcePackStack";
    MinecraftPacketIds[MinecraftPacketIds["ResourcePackClientResponse"] = 8] = "ResourcePackClientResponse";
    MinecraftPacketIds[MinecraftPacketIds["Text"] = 9] = "Text";
    MinecraftPacketIds[MinecraftPacketIds["SetTime"] = 10] = "SetTime";
    MinecraftPacketIds[MinecraftPacketIds["StartGame"] = 11] = "StartGame";
    MinecraftPacketIds[MinecraftPacketIds["AddPlayer"] = 12] = "AddPlayer";
    MinecraftPacketIds[MinecraftPacketIds["AddActor"] = 13] = "AddActor";
    MinecraftPacketIds[MinecraftPacketIds["RemoveActor"] = 14] = "RemoveActor";
    MinecraftPacketIds[MinecraftPacketIds["AddItemActor"] = 15] = "AddItemActor";
    // UNUSED_PLS_USE_ME = 0x10, // DEPRECATED
    MinecraftPacketIds[MinecraftPacketIds["TakeItemActor"] = 17] = "TakeItemActor";
    MinecraftPacketIds[MinecraftPacketIds["MoveActorAbsolute"] = 18] = "MoveActorAbsolute";
    MinecraftPacketIds[MinecraftPacketIds["MovePlayer"] = 19] = "MovePlayer";
    /** @deprecated use PassengerJump, follow the real class name */
    MinecraftPacketIds[MinecraftPacketIds["RiderJump"] = 20] = "RiderJump";
    MinecraftPacketIds[MinecraftPacketIds["PassengerJump"] = 20] = "PassengerJump";
    MinecraftPacketIds[MinecraftPacketIds["UpdateBlock"] = 21] = "UpdateBlock";
    MinecraftPacketIds[MinecraftPacketIds["AddPainting"] = 22] = "AddPainting";
    MinecraftPacketIds[MinecraftPacketIds["TickSync"] = 23] = "TickSync";
    MinecraftPacketIds[MinecraftPacketIds["LevelSoundEventV1"] = 24] = "LevelSoundEventV1";
    MinecraftPacketIds[MinecraftPacketIds["LevelEvent"] = 25] = "LevelEvent";
    MinecraftPacketIds[MinecraftPacketIds["BlockEvent"] = 26] = "BlockEvent";
    /** @deprecated use ActorEvent, matching to official name */
    MinecraftPacketIds[MinecraftPacketIds["EntityEvent"] = 27] = "EntityEvent";
    MinecraftPacketIds[MinecraftPacketIds["ActorEvent"] = 27] = "ActorEvent";
    MinecraftPacketIds[MinecraftPacketIds["MobEffect"] = 28] = "MobEffect";
    MinecraftPacketIds[MinecraftPacketIds["UpdateAttributes"] = 29] = "UpdateAttributes";
    MinecraftPacketIds[MinecraftPacketIds["InventoryTransaction"] = 30] = "InventoryTransaction";
    MinecraftPacketIds[MinecraftPacketIds["MobEquipment"] = 31] = "MobEquipment";
    MinecraftPacketIds[MinecraftPacketIds["MobArmorEquipment"] = 32] = "MobArmorEquipment";
    MinecraftPacketIds[MinecraftPacketIds["Interact"] = 33] = "Interact";
    MinecraftPacketIds[MinecraftPacketIds["BlockPickRequest"] = 34] = "BlockPickRequest";
    MinecraftPacketIds[MinecraftPacketIds["ActorPickRequest"] = 35] = "ActorPickRequest";
    MinecraftPacketIds[MinecraftPacketIds["PlayerAction"] = 36] = "PlayerAction";
    // ActorFall = 0x25, // DEPRECATED
    MinecraftPacketIds[MinecraftPacketIds["HurtArmor"] = 38] = "HurtArmor";
    /** @deprecated use SetActorData, matching to official name */
    MinecraftPacketIds[MinecraftPacketIds["SetEntityData"] = 39] = "SetEntityData";
    MinecraftPacketIds[MinecraftPacketIds["SetActorData"] = 39] = "SetActorData";
    /** @deprecated use SetActorMotion, matching to official name */
    MinecraftPacketIds[MinecraftPacketIds["SetEntityMotion"] = 40] = "SetEntityMotion";
    MinecraftPacketIds[MinecraftPacketIds["SetActorMotion"] = 40] = "SetActorMotion";
    MinecraftPacketIds[MinecraftPacketIds["SetActorLink"] = 41] = "SetActorLink";
    MinecraftPacketIds[MinecraftPacketIds["SetHealth"] = 42] = "SetHealth";
    MinecraftPacketIds[MinecraftPacketIds["SetSpawnPosition"] = 43] = "SetSpawnPosition";
    MinecraftPacketIds[MinecraftPacketIds["Animate"] = 44] = "Animate";
    MinecraftPacketIds[MinecraftPacketIds["Respawn"] = 45] = "Respawn";
    MinecraftPacketIds[MinecraftPacketIds["ContainerOpen"] = 46] = "ContainerOpen";
    MinecraftPacketIds[MinecraftPacketIds["ContainerClose"] = 47] = "ContainerClose";
    MinecraftPacketIds[MinecraftPacketIds["PlayerHotbar"] = 48] = "PlayerHotbar";
    MinecraftPacketIds[MinecraftPacketIds["InventoryContent"] = 49] = "InventoryContent";
    MinecraftPacketIds[MinecraftPacketIds["InventorySlot"] = 50] = "InventorySlot";
    MinecraftPacketIds[MinecraftPacketIds["ContainerSetData"] = 51] = "ContainerSetData";
    MinecraftPacketIds[MinecraftPacketIds["CraftingData"] = 52] = "CraftingData";
    MinecraftPacketIds[MinecraftPacketIds["CraftingEvent"] = 53] = "CraftingEvent";
    MinecraftPacketIds[MinecraftPacketIds["GuiDataPickItem"] = 54] = "GuiDataPickItem";
    MinecraftPacketIds[MinecraftPacketIds["AdventureSettings"] = 55] = "AdventureSettings";
    MinecraftPacketIds[MinecraftPacketIds["BlockActorData"] = 56] = "BlockActorData";
    MinecraftPacketIds[MinecraftPacketIds["PlayerInput"] = 57] = "PlayerInput";
    MinecraftPacketIds[MinecraftPacketIds["LevelChunk"] = 58] = "LevelChunk";
    MinecraftPacketIds[MinecraftPacketIds["SetCommandsEnabled"] = 59] = "SetCommandsEnabled";
    MinecraftPacketIds[MinecraftPacketIds["SetDifficulty"] = 60] = "SetDifficulty";
    MinecraftPacketIds[MinecraftPacketIds["ChangeDimension"] = 61] = "ChangeDimension";
    MinecraftPacketIds[MinecraftPacketIds["SetPlayerGameType"] = 62] = "SetPlayerGameType";
    MinecraftPacketIds[MinecraftPacketIds["PlayerList"] = 63] = "PlayerList";
    MinecraftPacketIds[MinecraftPacketIds["SimpleEvent"] = 64] = "SimpleEvent";
    /** @deprecated use Event instead, to follow the real class name */
    MinecraftPacketIds[MinecraftPacketIds["TelemetryEvent"] = 65] = "TelemetryEvent";
    MinecraftPacketIds[MinecraftPacketIds["Event"] = 65] = "Event";
    MinecraftPacketIds[MinecraftPacketIds["SpawnExperienceOrb"] = 66] = "SpawnExperienceOrb";
    /** @deprecated Use ClientboundMapItemData instead, to match to official class name*/
    MinecraftPacketIds[MinecraftPacketIds["MapItemData"] = 67] = "MapItemData";
    MinecraftPacketIds[MinecraftPacketIds["ClientboundMapItemData"] = 67] = "ClientboundMapItemData";
    MinecraftPacketIds[MinecraftPacketIds["MapInfoRequest"] = 68] = "MapInfoRequest";
    MinecraftPacketIds[MinecraftPacketIds["RequestChunkRadius"] = 69] = "RequestChunkRadius";
    MinecraftPacketIds[MinecraftPacketIds["ChunkRadiusUpdated"] = 70] = "ChunkRadiusUpdated";
    MinecraftPacketIds[MinecraftPacketIds["ItemFrameDropItem"] = 71] = "ItemFrameDropItem";
    MinecraftPacketIds[MinecraftPacketIds["GameRulesChanged"] = 72] = "GameRulesChanged";
    MinecraftPacketIds[MinecraftPacketIds["Camera"] = 73] = "Camera";
    MinecraftPacketIds[MinecraftPacketIds["BossEvent"] = 74] = "BossEvent";
    MinecraftPacketIds[MinecraftPacketIds["ShowCredits"] = 75] = "ShowCredits";
    MinecraftPacketIds[MinecraftPacketIds["AvailableCommands"] = 76] = "AvailableCommands";
    MinecraftPacketIds[MinecraftPacketIds["CommandRequest"] = 77] = "CommandRequest";
    MinecraftPacketIds[MinecraftPacketIds["CommandBlockUpdate"] = 78] = "CommandBlockUpdate";
    MinecraftPacketIds[MinecraftPacketIds["CommandOutput"] = 79] = "CommandOutput";
    MinecraftPacketIds[MinecraftPacketIds["UpdateTrade"] = 80] = "UpdateTrade";
    MinecraftPacketIds[MinecraftPacketIds["UpdateEquip"] = 81] = "UpdateEquip";
    MinecraftPacketIds[MinecraftPacketIds["ResourcePackDataInfo"] = 82] = "ResourcePackDataInfo";
    MinecraftPacketIds[MinecraftPacketIds["ResourcePackChunkData"] = 83] = "ResourcePackChunkData";
    MinecraftPacketIds[MinecraftPacketIds["ResourcePackChunkRequest"] = 84] = "ResourcePackChunkRequest";
    MinecraftPacketIds[MinecraftPacketIds["Transfer"] = 85] = "Transfer";
    MinecraftPacketIds[MinecraftPacketIds["PlaySound"] = 86] = "PlaySound";
    MinecraftPacketIds[MinecraftPacketIds["StopSound"] = 87] = "StopSound";
    MinecraftPacketIds[MinecraftPacketIds["SetTitle"] = 88] = "SetTitle";
    MinecraftPacketIds[MinecraftPacketIds["AddBehaviorTree"] = 89] = "AddBehaviorTree";
    MinecraftPacketIds[MinecraftPacketIds["StructureBlockUpdate"] = 90] = "StructureBlockUpdate";
    MinecraftPacketIds[MinecraftPacketIds["ShowStoreOffer"] = 91] = "ShowStoreOffer";
    MinecraftPacketIds[MinecraftPacketIds["PurchaseReceipt"] = 92] = "PurchaseReceipt";
    MinecraftPacketIds[MinecraftPacketIds["PlayerSkin"] = 93] = "PlayerSkin";
    MinecraftPacketIds[MinecraftPacketIds["SubClientLogin"] = 94] = "SubClientLogin";
    /** @deprecated use AutomationClientConnect instead, to follow the real class name */
    MinecraftPacketIds[MinecraftPacketIds["WSConnect"] = 95] = "WSConnect";
    MinecraftPacketIds[MinecraftPacketIds["AutomationClientConnect"] = 95] = "AutomationClientConnect";
    MinecraftPacketIds[MinecraftPacketIds["SetLastHurtBy"] = 96] = "SetLastHurtBy";
    MinecraftPacketIds[MinecraftPacketIds["BookEdit"] = 97] = "BookEdit";
    MinecraftPacketIds[MinecraftPacketIds["NpcRequest"] = 98] = "NpcRequest";
    MinecraftPacketIds[MinecraftPacketIds["PhotoTransfer"] = 99] = "PhotoTransfer";
    /** @deprecated use ModalFormRequest, follow the real class name */
    MinecraftPacketIds[MinecraftPacketIds["ShowModalForm"] = 100] = "ShowModalForm";
    MinecraftPacketIds[MinecraftPacketIds["ModalFormRequest"] = 100] = "ModalFormRequest";
    MinecraftPacketIds[MinecraftPacketIds["ModalFormResponse"] = 101] = "ModalFormResponse";
    MinecraftPacketIds[MinecraftPacketIds["ServerSettingsRequest"] = 102] = "ServerSettingsRequest";
    MinecraftPacketIds[MinecraftPacketIds["ServerSettingsResponse"] = 103] = "ServerSettingsResponse";
    MinecraftPacketIds[MinecraftPacketIds["ShowProfile"] = 104] = "ShowProfile";
    MinecraftPacketIds[MinecraftPacketIds["SetDefaultGameType"] = 105] = "SetDefaultGameType";
    MinecraftPacketIds[MinecraftPacketIds["RemoveObjective"] = 106] = "RemoveObjective";
    MinecraftPacketIds[MinecraftPacketIds["SetDisplayObjective"] = 107] = "SetDisplayObjective";
    MinecraftPacketIds[MinecraftPacketIds["SetScore"] = 108] = "SetScore";
    MinecraftPacketIds[MinecraftPacketIds["LabTable"] = 109] = "LabTable";
    MinecraftPacketIds[MinecraftPacketIds["UpdateBlockSynced"] = 110] = "UpdateBlockSynced";
    /** @deprecated use MoveActorDelta, matching to official name */
    MinecraftPacketIds[MinecraftPacketIds["MoveEntityDelta"] = 111] = "MoveEntityDelta";
    MinecraftPacketIds[MinecraftPacketIds["MoveActorDelta"] = 111] = "MoveActorDelta";
    MinecraftPacketIds[MinecraftPacketIds["SetScoreboardIdentity"] = 112] = "SetScoreboardIdentity";
    MinecraftPacketIds[MinecraftPacketIds["SetLocalPlayerAsInitialized"] = 113] = "SetLocalPlayerAsInitialized";
    MinecraftPacketIds[MinecraftPacketIds["UpdateSoftEnum"] = 114] = "UpdateSoftEnum";
    MinecraftPacketIds[MinecraftPacketIds["NetworkStackLatency"] = 115] = "NetworkStackLatency";
    // BlockPalette = 0x74, // DEPRECATED
    MinecraftPacketIds[MinecraftPacketIds["ScriptCustomEvent"] = 117] = "ScriptCustomEvent";
    MinecraftPacketIds[MinecraftPacketIds["SpawnParticleEffect"] = 118] = "SpawnParticleEffect";
    MinecraftPacketIds[MinecraftPacketIds["AvailableActorIdentifiers"] = 119] = "AvailableActorIdentifiers";
    MinecraftPacketIds[MinecraftPacketIds["LevelSoundEventV2"] = 120] = "LevelSoundEventV2";
    MinecraftPacketIds[MinecraftPacketIds["NetworkChunkPublisherUpdate"] = 121] = "NetworkChunkPublisherUpdate";
    MinecraftPacketIds[MinecraftPacketIds["BiomeDefinitionList"] = 122] = "BiomeDefinitionList";
    MinecraftPacketIds[MinecraftPacketIds["LevelSoundEvent"] = 123] = "LevelSoundEvent";
    MinecraftPacketIds[MinecraftPacketIds["LevelEventGeneric"] = 124] = "LevelEventGeneric";
    MinecraftPacketIds[MinecraftPacketIds["LecternUpdate"] = 125] = "LecternUpdate";
    // VideoStreamConnect_DEPRECATED = 0x7e,
    MinecraftPacketIds[MinecraftPacketIds["AddEntity"] = 127] = "AddEntity";
    MinecraftPacketIds[MinecraftPacketIds["RemoveEntity"] = 128] = "RemoveEntity";
    MinecraftPacketIds[MinecraftPacketIds["ClientCacheStatus"] = 129] = "ClientCacheStatus";
    MinecraftPacketIds[MinecraftPacketIds["OnScreenTextureAnimation"] = 130] = "OnScreenTextureAnimation";
    MinecraftPacketIds[MinecraftPacketIds["MapCreateLockedCopy"] = 131] = "MapCreateLockedCopy";
    MinecraftPacketIds[MinecraftPacketIds["StructureTemplateDataRequest"] = 132] = "StructureTemplateDataRequest";
    /** @deprecated use StructureTemplateDataResponse instead, to follow the real class name */
    MinecraftPacketIds[MinecraftPacketIds["StructureTemplateDataExport"] = 133] = "StructureTemplateDataExport";
    MinecraftPacketIds[MinecraftPacketIds["StructureTemplateDataResponse"] = 133] = "StructureTemplateDataResponse";
    // UpdateBlockProperties = 0x86, // DEPRECATED
    MinecraftPacketIds[MinecraftPacketIds["ClientCacheBlobStatus"] = 135] = "ClientCacheBlobStatus";
    MinecraftPacketIds[MinecraftPacketIds["ClientCacheMissResponse"] = 136] = "ClientCacheMissResponse";
    MinecraftPacketIds[MinecraftPacketIds["EducationSettings"] = 137] = "EducationSettings";
    MinecraftPacketIds[MinecraftPacketIds["Emote"] = 138] = "Emote";
    MinecraftPacketIds[MinecraftPacketIds["MultiplayerSettings"] = 139] = "MultiplayerSettings";
    MinecraftPacketIds[MinecraftPacketIds["SettingsCommand"] = 140] = "SettingsCommand";
    MinecraftPacketIds[MinecraftPacketIds["AnvilDamage"] = 141] = "AnvilDamage";
    MinecraftPacketIds[MinecraftPacketIds["CompletedUsingItem"] = 142] = "CompletedUsingItem";
    MinecraftPacketIds[MinecraftPacketIds["NetworkSettings"] = 143] = "NetworkSettings";
    MinecraftPacketIds[MinecraftPacketIds["PlayerAuthInput"] = 144] = "PlayerAuthInput";
    MinecraftPacketIds[MinecraftPacketIds["CreativeContent"] = 145] = "CreativeContent";
    MinecraftPacketIds[MinecraftPacketIds["PlayerEnchantOptions"] = 146] = "PlayerEnchantOptions";
    MinecraftPacketIds[MinecraftPacketIds["ItemStackRequest"] = 147] = "ItemStackRequest";
    MinecraftPacketIds[MinecraftPacketIds["ItemStackResponse"] = 148] = "ItemStackResponse";
    MinecraftPacketIds[MinecraftPacketIds["PlayerArmorDamage"] = 149] = "PlayerArmorDamage";
    MinecraftPacketIds[MinecraftPacketIds["CodeBuilder"] = 150] = "CodeBuilder";
    MinecraftPacketIds[MinecraftPacketIds["UpdatePlayerGameType"] = 151] = "UpdatePlayerGameType";
    MinecraftPacketIds[MinecraftPacketIds["EmoteList"] = 152] = "EmoteList";
    MinecraftPacketIds[MinecraftPacketIds["PositionTrackingDBServerBroadcast"] = 153] = "PositionTrackingDBServerBroadcast";
    MinecraftPacketIds[MinecraftPacketIds["PositionTrackingDBClientRequest"] = 154] = "PositionTrackingDBClientRequest";
    MinecraftPacketIds[MinecraftPacketIds["DebugInfo"] = 155] = "DebugInfo";
    MinecraftPacketIds[MinecraftPacketIds["PacketViolationWarning"] = 156] = "PacketViolationWarning";
    MinecraftPacketIds[MinecraftPacketIds["MotionPredictionHints"] = 157] = "MotionPredictionHints";
    MinecraftPacketIds[MinecraftPacketIds["AnimateEntity"] = 158] = "AnimateEntity";
    MinecraftPacketIds[MinecraftPacketIds["CameraShake"] = 159] = "CameraShake";
    MinecraftPacketIds[MinecraftPacketIds["PlayerFog"] = 160] = "PlayerFog";
    MinecraftPacketIds[MinecraftPacketIds["CorrectPlayerMovePrediction"] = 161] = "CorrectPlayerMovePrediction";
    MinecraftPacketIds[MinecraftPacketIds["ItemComponent"] = 162] = "ItemComponent";
    MinecraftPacketIds[MinecraftPacketIds["FilterText"] = 163] = "FilterText";
    MinecraftPacketIds[MinecraftPacketIds["ClientboundDebugRenderer"] = 164] = "ClientboundDebugRenderer";
    MinecraftPacketIds[MinecraftPacketIds["SyncActorProperty"] = 165] = "SyncActorProperty";
    MinecraftPacketIds[MinecraftPacketIds["AddVolumeEntity"] = 166] = "AddVolumeEntity";
    MinecraftPacketIds[MinecraftPacketIds["RemoveVolumeEntity"] = 167] = "RemoveVolumeEntity";
    MinecraftPacketIds[MinecraftPacketIds["SimulationType"] = 168] = "SimulationType";
    MinecraftPacketIds[MinecraftPacketIds["NpcDialogue"] = 169] = "NpcDialogue";
    /** @deprecated skip Packet ends */
    MinecraftPacketIds[MinecraftPacketIds["EduUriResourcePacket"] = 170] = "EduUriResourcePacket";
    MinecraftPacketIds[MinecraftPacketIds["EduUriResource"] = 170] = "EduUriResource";
    /** @deprecated skip Packet ends */
    MinecraftPacketIds[MinecraftPacketIds["CreatePhotoPacket"] = 171] = "CreatePhotoPacket";
    MinecraftPacketIds[MinecraftPacketIds["CreatePhoto"] = 171] = "CreatePhoto";
    MinecraftPacketIds[MinecraftPacketIds["UpdateSubChunkBlocks"] = 172] = "UpdateSubChunkBlocks";
    // PhotoInfoRequest = 0xad,
    MinecraftPacketIds[MinecraftPacketIds["PlayerStartItemCooldown"] = 176] = "PlayerStartItemCooldown";
    MinecraftPacketIds[MinecraftPacketIds["ScriptMessage"] = 177] = "ScriptMessage";
    MinecraftPacketIds[MinecraftPacketIds["CodeBuilderSource"] = 178] = "CodeBuilderSource";
    MinecraftPacketIds[MinecraftPacketIds["TickingAreasLoadStatus"] = 179] = "TickingAreasLoadStatus";
    MinecraftPacketIds[MinecraftPacketIds["DimensionData"] = 180] = "DimensionData";
    MinecraftPacketIds[MinecraftPacketIds["AgentActionEvent"] = 181] = "AgentActionEvent";
    MinecraftPacketIds[MinecraftPacketIds["ChangeMobProperty"] = 182] = "ChangeMobProperty";
    MinecraftPacketIds[MinecraftPacketIds["LessonProgress"] = 183] = "LessonProgress";
    MinecraftPacketIds[MinecraftPacketIds["RequestAbility"] = 184] = "RequestAbility";
    MinecraftPacketIds[MinecraftPacketIds["RequestPermissions"] = 185] = "RequestPermissions";
    MinecraftPacketIds[MinecraftPacketIds["ToastRequest"] = 186] = "ToastRequest";
    MinecraftPacketIds[MinecraftPacketIds["UpdateAbilities"] = 187] = "UpdateAbilities";
    MinecraftPacketIds[MinecraftPacketIds["UpdateAdventureSettings"] = 188] = "UpdateAdventureSettings";
    MinecraftPacketIds[MinecraftPacketIds["DeathInfo"] = 189] = "DeathInfo";
    MinecraftPacketIds[MinecraftPacketIds["EditorNetwork"] = 190] = "EditorNetwork";
    MinecraftPacketIds[MinecraftPacketIds["FeatureRegistry"] = 191] = "FeatureRegistry";
    MinecraftPacketIds[MinecraftPacketIds["ServerStats"] = 192] = "ServerStats";
    MinecraftPacketIds[MinecraftPacketIds["RequestNetworkSettings"] = 193] = "RequestNetworkSettings";
    MinecraftPacketIds[MinecraftPacketIds["GameTestRequest"] = 194] = "GameTestRequest";
    MinecraftPacketIds[MinecraftPacketIds["GameTestResults"] = 195] = "GameTestResults";
    MinecraftPacketIds[MinecraftPacketIds["UpdateClientInputLocks"] = 196] = "UpdateClientInputLocks";
})(MinecraftPacketIds = exports.MinecraftPacketIds || (exports.MinecraftPacketIds = {}));
MinecraftPacketIds.__proto__ = null;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2V0aWRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFja2V0aWRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOztHQUVHO0FBQ0gsSUFBWSxrQkE2Tlg7QUE3TkQsV0FBWSxrQkFBa0I7SUFDMUIsNkRBQVksQ0FBQTtJQUNaLHVFQUFpQixDQUFBO0lBQ2pCLGlHQUE4QixDQUFBO0lBQzlCLGlHQUE4QixDQUFBO0lBQzlCLHVFQUFpQixDQUFBO0lBQ2pCLHFGQUF3QixDQUFBO0lBQ3hCLG9FQUFvRTtJQUNwRSx1RkFBeUIsQ0FBQTtJQUN6QixxRkFBd0IsQ0FBQTtJQUN4Qix1R0FBaUMsQ0FBQTtJQUNqQywyREFBVyxDQUFBO0lBQ1gsa0VBQWMsQ0FBQTtJQUNkLHNFQUFnQixDQUFBO0lBQ2hCLHNFQUFnQixDQUFBO0lBQ2hCLG9FQUFlLENBQUE7SUFDZiwwRUFBa0IsQ0FBQTtJQUNsQiw0RUFBbUIsQ0FBQTtJQUNuQiwwQ0FBMEM7SUFDMUMsOEVBQW9CLENBQUE7SUFDcEIsc0ZBQXdCLENBQUE7SUFDeEIsd0VBQWlCLENBQUE7SUFDakIsZ0VBQWdFO0lBQ2hFLHNFQUFnQixDQUFBO0lBQ2hCLDhFQUFvQixDQUFBO0lBQ3BCLDBFQUFrQixDQUFBO0lBQ2xCLDBFQUFrQixDQUFBO0lBQ2xCLG9FQUFlLENBQUE7SUFDZixzRkFBd0IsQ0FBQTtJQUN4Qix3RUFBaUIsQ0FBQTtJQUNqQix3RUFBaUIsQ0FBQTtJQUNqQiw0REFBNEQ7SUFDNUQsMEVBQWtCLENBQUE7SUFDbEIsd0VBQWlCLENBQUE7SUFDakIsc0VBQWdCLENBQUE7SUFDaEIsb0ZBQXVCLENBQUE7SUFDdkIsNEZBQTJCLENBQUE7SUFDM0IsNEVBQW1CLENBQUE7SUFDbkIsc0ZBQXdCLENBQUE7SUFDeEIsb0VBQWUsQ0FBQTtJQUNmLG9GQUF1QixDQUFBO0lBQ3ZCLG9GQUF1QixDQUFBO0lBQ3ZCLDRFQUFtQixDQUFBO0lBQ25CLGtDQUFrQztJQUNsQyxzRUFBZ0Is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