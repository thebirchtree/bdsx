"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerPermission = exports.GameType = exports.InputMode = exports.PlayerListEntry = exports.SimulatedPlayer = exports.ServerPlayer = exports.Player = void 0;
const common_1 = require("../common");
const mce_1 = require("../mce");
const storage_1 = require("../storage");
const actor_1 = require("./actor");
const attribute_1 = require("./attribute");
const blockpos_1 = require("./blockpos");
const packets_1 = require("./packets");
const scoreboard_1 = require("./scoreboard");
class Player extends actor_1.Mob {
    /** @deprecated Use `this.getSpawnDimension()` instead */
    get respawnDimension() {
        return this.getSpawnDimension();
    }
    /** @deprecated Use `this.getSpawnPosition()` instead */
    get respawnPosition() {
        return this.getSpawnPosition();
    }
    /** @deprecated use `this.getAbilities()` instead */
    get abilities() {
        return this.getAbilities();
    }
    _setName(name) {
        (0, common_1.abstract)();
    }
    /**
     * Changes the player's name
     *
     * @param name - New name
     */
    setName(name) {
        (0, common_1.abstract)();
    }
    /**
     * Updates the player list to all players
     */
    updatePlayerList() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the player's gamemode
     */
    getGameType() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the player's inventory proxy
     * @alias getSupplies
     */
    getInventory() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the player's inventory proxy
     */
    getSupplies() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the player's permission level
     * @see PlayerPermission
     */
    getPermissionLevel() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the player's skin
     */
    getSkin() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the player's real name
     */
    getName() {
        (0, common_1.abstract)();
    }
    /**
     * Triggers an item cooldown (e.g: Ender pearl)
     * @remarks This function seems to crash the server. use ItemStack.startCoolDown() instead.
     *
     * @param item - Item to start the cooldown on
     */
    startCooldown(item) {
        (0, common_1.abstract)();
    }
    /**
     * Returns a tick. If you want seconds, divide by 20
     */
    getItemCooldownLeft(cooldownType) {
        (0, common_1.abstract)();
    }
    /**
     * Changes the player's permissions
     */
    setPermissions(permissions) {
        (0, common_1.abstract)();
    }
    /**
     * Changes the player's gamemode
     *
     * @param gameType - Gamemode to switch to
     */
    setGameType(gameType) {
        (0, common_1.abstract)();
    }
    /**
     * Sets the player's sleeping status
     */
    setSleeping(value) {
        (0, common_1.abstract)();
    }
    /**
     * Returns the player's sleeping status
     */
    isSleeping() {
        (0, common_1.abstract)();
    }
    /**
     * Returns whether the player is currently jumping
     */
    isJumping() {
        (0, common_1.abstract)();
    }
    syncAbilities() {
        (0, common_1.abstract)();
    }
    /**
     * @deprecated Typo!
     */
    syncAbilties() {
        this.syncAbilities();
    }
    /**
     * Sets the player's respawn position
     *
     * @param pos - Respawn position
     * @param dimension - Dimension
     */
    setRespawnPosition(pos, dimension) {
        (0, common_1.abstract)();
    }
    /**
     * Sets the player's bed respawn position
     * @param pos - Position of the bed
     */
    setBedRespawnPosition(pos) {
        (0, common_1.abstract)();
    }
    /**
     * Returns the Dimension ID of the player's respawn point
     * @remarks Currently, it's always the Overworld
     */
    getSpawnDimension() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the position of the player's respawn point
     */
    getSpawnPosition() {
        (0, common_1.abstract)();
    }
    /**
     *Clears the player's respawn position
     */
    clearRespawnPosition() {
        (0, common_1.abstract)();
    }
    /**
     * Returns if the player has respawn position
     */
    hasRespawnPosition() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the player's certificate
     */
    getCertificate() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the multiplier for the player block destroy time, with every factor accounted, except for if the tool is correct, the faster the higher
     */
    getDestroySpeed(block) {
        (0, common_1.abstract)();
    }
    /**
     * Returns if the tool is correct to break a block
     */
    canDestroy(block) {
        (0, common_1.abstract)();
    }
    /**
     * Returns the player's XP points
     */
    getExperience() {
        return Math.round(this.getExperienceProgress() * this.getXpNeededForNextLevel());
    }
    /**
     * Returns the player's progression to the next level, between 0.0 and 1.0
     */
    getExperienceProgress() {
        return this.getAttribute(attribute_1.AttributeId.PlayerExperience);
    }
    /**
     * Returns the player's XP level
     */
    getExperienceLevel() {
        return this.getAttribute(attribute_1.AttributeId.PlayerLevel);
    }
    /**
     * Sets the player's XP points
     *
     * @param xp - between 1 and the maximum XP points for the level
     */
    setExperience(xp) {
        this.setAttribute(attribute_1.AttributeId.PlayerExperience, xp / this.getXpNeededForNextLevel() > 1 ? 1 : xp / this.getXpNeededForNextLevel());
    }
    /**
     * Sets the player's progression to the next XP level
     *
     * @param progress - between 0.0 and 1.0
     */
    setExperienceProgress(progress) {
        this.setAttribute(attribute_1.AttributeId.PlayerExperience, progress > 1 ? 1 : progress);
    }
    /**
     * Sets the player's XP level
     *
     * @param level - between 0 and 24791
     */
    setExperienceLevel(level) {
        this.setAttribute(attribute_1.AttributeId.PlayerLevel, level > 24791 ? 24791 : level < 0 ? 0 : level);
    }
    /**
     * Adds XP points to the player, recalculating their level & progress
     *
     * @param xp - XP to add
     */
    addExperience(xp) {
        (0, common_1.abstract)();
    }
    /**
     * Adds progress to the player's XP level
     *
     * @param progress - between 0.0 and 1.0
     */
    addExperienceProgress(progress) {
        if (-progress > this.getExperienceProgress())
            this.setExperienceProgress(0);
        else
            this.setAttribute(attribute_1.AttributeId.PlayerExperience, this.getExperienceProgress() + progress > 1 ? 1 : this.getExperienceProgress() + progress);
    }
    /**
     * Adds XP levels to the player
     *
     * @param levels - levels to add
     */
    addExperienceLevels(levels) {
        (0, common_1.abstract)();
    }
    /**
     * Reset the XP levels of the player
     */
    resetExperienceLevels() {
        (0, common_1.abstract)();
    }
    /**
     * Subtracts XP points from the player
     *
     * @param xp - between 1 and the current XP points for the level
     */
    subtractExperience(xp) {
        this.addExperience(-xp);
    }
    /**
     * Subtracts progress from the player's XP level
     *
     * @param progress - between 0.0 and the current XP progress
     */
    subtractExperienceProgress(progress) {
        this.addExperienceProgress(progress > this.getExperienceProgress() ? -this.getExperienceProgress() : -progress);
    }
    /**
     * Subtracts XP levels from the player
     *
     * @param levels - between 1 and the player's XP level
     */
    subtractExperienceLevels(levels) {
        this.addExperienceLevels(levels > this.getExperienceLevel() ? -this.getExperienceLevel() : -levels);
    }
    /**
     * Returns the total XP needed for the next level
     */
    getXpNeededForNextLevel() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the remaining XP needed for the next level
     */
    getRemainingXpForNextLevel() {
        return this.getXpNeededForNextLevel() - this.getExperience();
    }
    getCursorSelectedItem() {
        (0, common_1.abstract)();
    }
    setCursorSelectedItem(itemStack) {
        (0, common_1.abstract)();
    }
    getPlayerUIItem(slot) {
        (0, common_1.abstract)();
    }
    setPlayerUIItem(slot, itemStack) {
        (0, common_1.abstract)();
    }
    getPlatform() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the player's XUID
     */
    getXuid() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the player's UUID
     */
    getUuid() {
        (0, common_1.abstract)();
    }
    forceAllowEating() {
        (0, common_1.abstract)();
    }
    getSpeed() {
        (0, common_1.abstract)();
    }
    hasOpenContainer() {
        (0, common_1.abstract)();
    }
    /**
     * Returns whether the player is hungry.
     */
    isHungry() {
        (0, common_1.abstract)();
    }
    /**
     * Returns whether the player is hurt.
     */
    isHurt() {
        (0, common_1.abstract)();
    }
    /**
     * Returns whether the player has spawned in the Level. Different from `isAlive`.
     * if true, it's a valid entity.
     */
    isSpawned() {
        (0, common_1.abstract)();
    }
    /**
     * Returns whether the player is loading in login screen.
     * if true, it's not a valid entity.
     */
    isLoading() {
        (0, common_1.abstract)();
    }
    /**
     * Returns whether the player is initialized.
     * if true, it's a valid entity.
     * it checks {@link isSpawned}, and {@link isLoading} etc. internally.
     */
    isPlayerInitialized() {
        (0, common_1.abstract)();
    }
    /**
     * Get block destroy progress
     * @param block
     */
    getDestroyProgress(block) {
        (0, common_1.abstract)();
    }
    /**
     * Respawn player
     */
    respawn() {
        (0, common_1.abstract)();
    }
    /**
     * Returns whether the player is simulated
     */
    isSimulated() {
        return this instanceof SimulatedPlayer;
    }
    /**
     * Set player's respawn ready
     * @param vec3
     */
    setRespawnReady(vec3) {
        (0, common_1.abstract)();
    }
    /**
     * Set player's spawn block respawn position
     * @param blockPos
     * @param dimensionId
     */
    setSpawnBlockRespawnPosition(blockPos, dimensionId) {
        (0, common_1.abstract)();
    }
    setSelectedSlot(slot) {
        (0, common_1.abstract)();
    }
    /**
     * @deprecated typo. Please use setSelectedSlot instead.
     * */
    setSelecetdSlot(slot) {
        return this.setSelectedSlot(slot);
    }
    getDirection() {
        (0, common_1.abstract)();
    }
    isFlying() {
        (0, common_1.abstract)();
    }
    isHiddenFrom(source) {
        (0, common_1.abstract)();
    }
    isInRaid() {
        (0, common_1.abstract)();
    }
    isUsingItem() {
        (0, common_1.abstract)();
    }
    hasDimension() {
        (0, common_1.abstract)();
    }
    getAbilities() {
        (0, common_1.abstract)();
    }
    getSelectedItem() {
        (0, common_1.abstract)();
    }
    [(_a = storage_1.Storage.classId, storage_1.Storage.id)]() {
        return mce_1.mce.UUID.toString(this.getUuid());
    }
    [storage_1.Storage.aliasId]() {
        return "_" + this.getNameTag();
    }
    /** @deprecated Use `this.getNetworkIdentifier()` instead */
    get networkIdentifier() {
        return this.getNetworkIdentifier();
    }
    /**
     * Returns the player's NetworkIdentifier
     */
    getNetworkIdentifier() {
        (0, common_1.abstract)();
    }
    /**
     * Returns the player's next ContainerId
     * @remarks Values range from 1 to 99
     */
    nextContainerCounter() {
        (0, common_1.abstract)();
    }
    /**
     * Opens the player's inventory
     */
    openInventory() {
        (0, common_1.abstract)();
    }
    resendAllChunks() {
        (0, common_1.abstract)();
    }
    /**
     * Sends a packet to the player
     *
     * @param packet - Packet to send
     */
    sendNetworkPacket(packet) {
        (0, common_1.abstract)();
    }
    /**
     * Updates a player's attribute
     *
     * @param id - Attribute ID to update
     * @param value - New value of the attribute
     */
    setAttribute(id, value) {
        (0, common_1.abstract)();
    }
    /**
     * Sets the player's armor
     *
     * @param slot - Armor slot
     * @param itemStack - Armor item to set
     */
    setArmor(slot, itemStack) {
        (0, common_1.abstract)();
    }
    /**
     * Sends a chat-like message to the player
     * @remarks The message will have this format : <author> message
     *
     * @param message - Message to send
     * @param author - Message author (will be put inside the <>)
     */
    sendChat(message, author) {
        const pk = packets_1.TextPacket.allocate();
        pk.type = packets_1.TextPacket.Types.Chat;
        pk.name = author;
        pk.message = message;
        this.sendNetworkPacket(pk);
        pk.dispose();
    }
    /**
     * Sends a whisper-like message to the player
     * @remarks The message will have this format : <author> message (same as ServerPlayer.sendChat())
     *
     * @param message - Message to send
     * @param author - Message author (will be put inside the <>)
     */
    sendWhisper(message, author) {
        const pk = packets_1.TextPacket.allocate();
        pk.type = packets_1.TextPacket.Types.Whisper;
        pk.name = author;
        pk.message = message;
        this.sendNetworkPacket(pk);
        pk.dispose();
    }
    /**
     * Sends a JSON-Object to the player
     * For the format for that object, reference:
     * @see https://minecraft.fandom.com/wiki/Commands/tellraw
     *
     * @param object JSON-Object to encode and send
     */
    sendTextObject(object) {
        const pk = packets_1.TextPacket.allocate();
        pk.type = packets_1.TextPacket.Types.TextObject;
        pk.message = JSON.stringify(object);
        this.sendNetworkPacket(pk);
        pk.dispose();
    }
    /**
     * Sends a raw message to the player
     *
     * @param message - Message to send
     */
    sendMessage(message) {
        const pk = packets_1.TextPacket.allocate();
        pk.type = packets_1.TextPacket.Types.Raw;
        pk.message = message;
        this.sendNetworkPacket(pk);
        pk.dispose();
    }
    /**
     * Sends a jukebox-like popup to the player
     * @remarks Does not have a background like other popups.
     *
     * @param message - Popup text
     * @param params - Translation keys to use
     */
    sendJukeboxPopup(message, params = []) {
        const pk = packets_1.TextPacket.allocate();
        pk.type = packets_1.TextPacket.Types.JukeboxPopup;
        pk.message = message;
        for (const param of params) {
            pk.params.push(param);
        }
        pk.needsTranslation = true;
        this.sendNetworkPacket(pk);
        pk.dispose();
    }
    /**
     * Sends a popup to the player
     *
     * @param message - Popup text
     * @param params - Translation keys to use
     */
    sendPopup(message, params = []) {
        const pk = packets_1.TextPacket.allocate();
        pk.type = packets_1.TextPacket.Types.Popup;
        pk.message = message;
        for (const param of params) {
            pk.params.push(param);
        }
        pk.needsTranslation = true;
        this.sendNetworkPacket(pk);
        pk.dispose();
    }
    /**
     * Sends a tip-like popup to the player
     * @remarks Smaller than a Popup, positioned lower than an Actionbar
     *
     * @param message - Tip text
     * @param params - Translation keys to use
     */
    sendTip(message, params = []) {
        const pk = packets_1.TextPacket.allocate();
        pk.type = packets_1.TextPacket.Types.Tip;
        pk.message = message;
        for (const param of params) {
            pk.params.push(param);
        }
        pk.needsTranslation = true;
        this.sendNetworkPacket(pk);
        pk.dispose();
    }
    /**
     * Sends a translated message to the player
     *
     * @param message - Message to send
     * @param params - Translation keys
     */
    sendTranslatedMessage(message, params = []) {
        const pk = packets_1.TextPacket.allocate();
        pk.type = packets_1.TextPacket.Types.Translate;
        pk.message = message;
        pk.params.push(...params);
        pk.needsTranslation = true;
        this.sendNetworkPacket(pk);
        pk.dispose();
    }
    sendToastRequest(title, body = "") {
        const pk = packets_1.ToastRequestPacket.allocate();
        pk.title = title;
        pk.body = body;
        this.sendNetworkPacket(pk);
        pk.dispose();
    }
    /**
     * Displays a bossbar to the player
     * @remarks Bossbar percentage doesn't seem to function.
     *
     * @param title - Text above the bossbar
     * @param percent - Bossbar filling percentage
     * @param color - Bossbar color
     */
    setBossBar(title, percent, color) {
        this.removeBossBar();
        const pk = packets_1.BossEventPacket.allocate();
        pk.entityUniqueId = this.getUniqueIdBin();
        pk.playerUniqueId = this.getUniqueIdBin();
        pk.type = packets_1.BossEventPacket.Types.Show;
        pk.title = title;
        pk.healthPercent = percent;
        if (color)
            pk.color = color;
        this.sendNetworkPacket(pk);
        pk.dispose();
    }
    /**
     * Resets title duration
     */
    resetTitleDuration() {
        const pk = packets_1.SetTitlePacket.allocate();
        pk.type = packets_1.SetTitlePacket.Types.Reset;
        this.sendNetworkPacket(pk);
        pk.dispose();
    }
    /**
     * Sets the title animation duration (in ticks)
     * @remarks Will not affect actionbar and other popups.
     *
     * @param fadeInTime - fade-in duration (in ticks)
     * @param stayTime - stay time duration (in ticks)
     * @param fadeOutTime - fade-out duration (in ticks)
     */
    setTitleDuration(fadeInTime, stayTime, fadeOutTime) {
        const pk = packets_1.SetTitlePacket.allocate();
        pk.type = packets_1.SetTitlePacket.Types.AnimationTimes;
        pk.fadeInTime = fadeInTime;
        pk.stayTime = stayTime;
        pk.fadeOutTime = fadeOutTime;
        this.sendNetworkPacket(pk);
        pk.dispose();
    }
    /**
     * Sends a title to the player
     *
     * @param title - Title text
     * @param subtitle - Subtitle text
     */
    sendTitle(title, subtitle) {
        const pk = packets_1.SetTitlePacket.allocate();
        pk.type = packets_1.SetTitlePacket.Types.Title;
        pk.text = title;
        this.sendNetworkPacket(pk);
        pk.dispose();
        if (subtitle)
            this.sendSubtitle(subtitle);
    }
    /**
     * Sends a subtitle to the player
     * @remarks Will not display if there is no title being displayed
     *
     * @param subtitle - subtitle text
     */
    sendSubtitle(subtitle) {
        const pk = packets_1.SetTitlePacket.allocate();
        pk.type = packets_1.SetTitlePacket.Types.Subtitle;
        pk.text = subtitle;
        this.sendNetworkPacket(pk);
        pk.dispose();
    }
    /**
     * Clears player's title and subtitle
     * @remarks Will not affect actionbar and other popups
     */
    clearTitle() {
        const pk = packets_1.SetTitlePacket.allocate();
        pk.type = packets_1.SetTitlePacket.Types.Clear;
        this.sendNetworkPacket(pk);
        pk.dispose();
    }
    /**
     * Sends an actionbar-like popup to the player
     * @remarks Smaller than a Popup, positioned higher than a Tip
     *
     * @param actionbar - Actionbar text
     */
    sendActionbar(actionbar) {
        const pk = packets_1.SetTitlePacket.allocate();
        pk.type = packets_1.SetTitlePacket.Types.Actionbar;
        pk.text = actionbar;
        this.sendNetworkPacket(pk);
        pk.dispose();
    }
    /**
     * Removes the bossbar
     */
    removeBossBar() {
        const pk = packets_1.BossEventPacket.allocate();
        pk.entityUniqueId = this.getUniqueIdBin();
        pk.playerUniqueId = this.getUniqueIdBin();
        pk.type = packets_1.BossEventPacket.Types.Hide;
        this.sendNetworkPacket(pk);
        pk.dispose();
    }
    /**
     * Displays a scoreboard with custom text & scores
     *
     * @param title - Scoreboard title
     * @param lines - Scoreboard lines
     * @param name - Scoreboard name
     *
     * @example setFakeScoreboard("test", ["my score is 0", ["my score is 3", 3], "my score is 2 as my index is 2"])
     */
    setFakeScoreboard(title, lines, name = `tmp-${new Date().getTime()}`) {
        this.removeFakeScoreboard();
        {
            const pk = packets_1.SetDisplayObjectivePacket.allocate();
            pk.displaySlot = scoreboard_1.DisplaySlot.Sidebar;
            pk.objectiveName = name;
            pk.displayName = title;
            pk.criteriaName = "dummy";
            this.sendNetworkPacket(pk);
            pk.dispose();
        }
        {
            const pk = packets_1.SetScorePacket.allocate();
            pk.type = packets_1.SetScorePacket.Type.CHANGE;
            const entries = [];
            for (const [i, line] of lines.entries()) {
                const entry = packets_1.ScorePacketInfo.construct();
                entry.objectiveName = name;
                entry.scoreboardId.idAsNumber = i + 1;
                entry.type = packets_1.ScorePacketInfo.Type.FAKE_PLAYER;
                if (typeof line === "string") {
                    entry.score = i + 1;
                    entry.customName = line;
                }
                else {
                    entry.score = line[1];
                    entry.customName = line[0];
                }
                pk.entries.push(entry);
                entries.push(entry);
            }
            this.sendNetworkPacket(pk);
            pk.dispose();
            for (const entry of entries) {
                entry.destruct();
            }
        }
        return name;
    }
    /**
     * Removes scoreboard
     */
    removeFakeScoreboard() {
        const pk = packets_1.SetDisplayObjectivePacket.allocate();
        pk.displaySlot = scoreboard_1.DisplaySlot.Sidebar;
        pk.objectiveName = "";
        pk.displayName = "";
        pk.criteriaName = "dummy";
        this.sendNetworkPacket(pk);
        pk.dispose();
    }
    /**
     * Transfers the player to another server
     *
     * @param address - Server address
     * @param port - Server port
     */
    transferServer(address, port = 19132) {
        const pk = packets_1.TransferPacket.allocate();
        pk.address = address;
        pk.port = port;
        this.sendNetworkPacket(pk);
        pk.dispose();
    }
    /**
     * Plays a sound to the player
     *
     * @param soundName - Sound name, like "random.burp". See {@link https://minecraft.fandom.com/wiki/Sounds.json/Bedrock_Edition_values}
     * @param pos - Position where the sound is played (defaults to player position)
     * @param volume - Volume of the sound (defaults to 1)
     * @param pitch - Pitch of the sound (defaults to 1)
     */
    playSound(soundName, pos = this.getPosition(), volume = 1.0, pitch = 1.0) {
        const pk = packets_1.PlaySoundPacket.allocate();
        pk.soundName = soundName;
        pk.pos.x = pos.x * 8;
        pk.pos.y = pos.y * 8;
        pk.pos.z = pos.z * 8;
        pk.volume = volume;
        pk.pitch = pitch;
        this.sendNetworkPacket(pk);
        pk.dispose();
    }
    getInputMode() {
        (0, common_1.abstract)();
    }
    setInputMode(mode) {
        (0, common_1.abstract)();
    }
    die(damageSource) {
        this.setAttribute(attribute_1.AttributeId.Health, 0);
        return super.die(damageSource);
    }
    static tryGetFromEntity(entity, getRemoved) {
        (0, common_1.abstract)();
    }
}
exports.Player = Player;
// ServerPlayer fields
Player[_a] = "player";
exports.ServerPlayer = Player; // Player is always ServerPlayer on the server software.
class SimulatedPlayer extends exports.ServerPlayer {
    static create(name, blockPos, dimensionId, nonOwnerPointerServerNetworkHandler) {
        (0, common_1.abstract)();
    }
    /**
     * Simulate disconnect
     */
    simulateDisconnect() {
        (0, common_1.abstract)();
    }
    simulateLookAt(target) {
        (0, common_1.abstract)();
    }
    simulateJump() {
        (0, common_1.abstract)();
    }
    simulateSetBodyRotation(rotation) {
        (0, common_1.abstract)();
    }
    simulateSetItem(item, selectSlot, slot) {
        (0, common_1.abstract)();
    }
    simulateDestroyBlock(pos, direction = 1) {
        (0, common_1.abstract)();
    }
    simulateStopDestroyingBlock() {
        (0, common_1.abstract)();
    }
    simulateLocalMove(pos, speed) {
        (0, common_1.abstract)();
    }
    simulateMoveToLocation(pos, speed) {
        (0, common_1.abstract)();
    }
    /* move to target with navigation
    TODO: Implement `ScriptNavigationResult`
    /* simulateNavigateTo(goal:Actor|Vec3, speed:number):void{
        abstract();
    } */
    simulateNavigateToLocations(locations, speed) {
        (0, common_1.abstract)();
    }
    simulateStopMoving() {
        (0, common_1.abstract)();
    }
    /** It attacks regardless of reach */
    simulateAttack(target) {
        (0, common_1.abstract)();
    }
    simulateInteractWithActor(target) {
        (0, common_1.abstract)();
    }
    simulateInteractWithBlock(blockPos, direction = 1) {
        (0, common_1.abstract)();
    }
    simulateUseItem(item) {
        (0, common_1.abstract)();
    }
    simulateUseItemOnBlock(item, pos, direction = 1, clickPos = blockpos_1.Vec3.create(0, 0, 0)) {
        (0, common_1.abstract)();
    }
    simulateUseItemInSlot(slot) {
        (0, common_1.abstract)();
    }
    simulateUseItemInSlotOnBlock(slot, pos, direction = 1, clickPos = blockpos_1.Vec3.create(0, 0, 0)) {
        (0, common_1.abstract)();
    }
    static tryGetFromEntity(entity, getRemoved) {
        (0, common_1.abstract)();
    }
}
exports.SimulatedPlayer = SimulatedPlayer;
/** @deprecated Import from `bdsx/bds/packets` instead */
exports.PlayerListEntry = packets_1.PlayerListEntry;
var InputMode;
(function (InputMode) {
    InputMode[InputMode["Mouse"] = 1] = "Mouse";
    InputMode[InputMode["Touch"] = 2] = "Touch";
    InputMode[InputMode["GamePad"] = 3] = "GamePad";
    InputMode[InputMode["MotionController"] = 4] = "MotionController";
})(InputMode = exports.InputMode || (exports.InputMode = {}));
/**
 * Lists possible player gamemodes
 */
var GameType;
(function (GameType) {
    GameType[GameType["Survival"] = 0] = "Survival";
    GameType[GameType["Creative"] = 1] = "Creative";
    GameType[GameType["Adventure"] = 2] = "Adventure";
    GameType[GameType["SurvivalSpectator"] = 3] = "SurvivalSpectator";
    GameType[GameType["CreativeSpectator"] = 4] = "CreativeSpectator";
    GameType[GameType["Default"] = 5] = "Default";
    GameType[GameType["Spectator"] = 6] = "Spectator";
})(GameType = exports.GameType || (exports.GameType = {}));
/**
 * Lists possible player permission levels
 */
var PlayerPermission;
(function (PlayerPermission) {
    PlayerPermission[PlayerPermission["VISITOR"] = 0] = "VISITOR";
    PlayerPermission[PlayerPermission["MEMBER"] = 1] = "MEMBER";
    PlayerPermission[PlayerPermission["OPERATOR"] = 2] = "OPERATOR";
    PlayerPermission[PlayerPermission["CUSTOM"] = 3] = "CUSTOM";
})(PlayerPermission = exports.PlayerPermission || (exports.PlayerPermission = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxzQ0FBMEU7QUFDMUUsZ0NBQTZCO0FBRTdCLHdDQUFpRDtBQUVqRCxtQ0FBb0Y7QUFDcEYsMkNBQTZEO0FBRzdELHlDQUE0QztBQU81Qyx1Q0FXbUI7QUFDbkIsNkNBQTJDO0FBd0IzQyxNQUFhLE1BQU8sU0FBUSxXQUFHO0lBSTNCLHlEQUF5RDtJQUN6RCxJQUFJLGdCQUFnQjtRQUNoQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFDRCx3REFBd0Q7SUFDeEQsSUFBSSxlQUFlO1FBQ2YsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBQ0Qsb0RBQW9EO0lBQ3BELElBQUksU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFUyxRQUFRLENBQUMsSUFBWTtRQUMzQixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsT0FBTyxDQUFDLElBQVk7UUFDaEIsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQ7O09BRUc7SUFDSCxnQkFBZ0I7UUFDWixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVc7UUFDUCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSCxZQUFZO1FBQ1IsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXO1FBQ1AsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsa0JBQWtCO1FBQ2QsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQ7O09BRUc7SUFDSCxPQUFPO1FBQ0gsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQ7O09BRUc7SUFDSCxPQUFPO1FBQ0gsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxhQUFhLENBQUMsSUFBVTtRQUNwQixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFFRDs7T0FFRztJQUNILG1CQUFtQixDQUFDLFlBQTBCO1FBQzFDLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNEOztPQUVHO0lBQ0gsY0FBYyxDQUFDLFdBQW1DO1FBQzlDLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNEOzs7O09BSUc7SUFDSCxXQUFXLENBQUMsUUFBa0I7UUFDMUIsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXLENBQUMsS0FBYztRQUN0QixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFFRDs7T0FFRztJQUNILFVBQVU7UUFDTixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFFRDs7T0FFRztJQUNILFNBQVM7UUFDTCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxhQUFhO1FBQ1QsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQ7O09BRUc7SUFDSCxZQUFZO1FBQ1IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGtCQUFrQixDQUFDLEdBQWEsRUFBRSxTQUFzQjtRQUNwRCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFFRDs7O09BR0c7SUFDSCxxQkFBcUIsQ0FBQyxHQUFhO1FBQy9CLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNILGlCQUFpQjtRQUNiLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZ0JBQWdCO1FBQ1osSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQ7O09BRUc7SUFDSCxvQkFBb0I7UUFDaEIsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQ7O09BRUc7SUFDSCxrQkFBa0I7UUFDZCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFFRDs7T0FFRztJQUNILGNBQWM7UUFDVixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFFRDs7T0FFRztJQUNILGVBQWUsQ0FBQyxLQUFZO1FBQ3hCLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUVEOztPQUVHO0lBQ0gsVUFBVSxDQUFDLEtBQVk7UUFDbkIsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQ7O09BRUc7SUFDSCxhQUFhO1FBQ1QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVEOztPQUVHO0lBQ0gscUJBQXFCO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyx1QkFBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOztPQUVHO0lBQ0gsa0JBQWtCO1FBQ2QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLHVCQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxhQUFhLENBQUMsRUFBVTtRQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLHVCQUFXLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQztJQUN2SSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILHFCQUFxQixDQUFDLFFBQWdCO1FBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsdUJBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsa0JBQWtCLENBQUMsS0FBYTtRQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLHVCQUFXLENBQUMsV0FBVyxFQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGFBQWEsQ0FBQyxFQUFVO1FBQ3BCLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxxQkFBcUIsQ0FBQyxRQUFnQjtRQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDdkUsSUFBSSxDQUFDLFlBQVksQ0FBQyx1QkFBVyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUM7SUFDcEosQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxtQkFBbUIsQ0FBQyxNQUFjO1FBQzlCLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUVEOztPQUVHO0lBQ0gscUJBQXFCO1FBQ2pCLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxrQkFBa0IsQ0FBQyxFQUFVO1FBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILDBCQUEwQixDQUFDLFFBQWdCO1FBQ3ZDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEgsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCx3QkFBd0IsQ0FBQyxNQUFjO1FBQ25DLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEcsQ0FBQztJQUVEOztPQUVHO0lBQ0gsdUJBQXVCO1FBQ25CLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUVEOztPQUVHO0lBQ0gsMEJBQTBCO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ2pFLENBQUM7SUFFRCxxQkFBcUI7UUFDakIsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QscUJBQXFCLENBQUMsU0FBb0I7UUFDdEMsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsZUFBZSxDQUFDLElBQWtCO1FBQzlCLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELGVBQWUsQ0FBQyxJQUFrQixFQUFFLFNBQW9CO1FBQ3BELElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELFdBQVc7UUFDUCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRDs7T0FFRztJQUNILE9BQU87UUFDSCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRDs7T0FFRztJQUNILE9BQU87UUFDSCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxnQkFBZ0I7UUFDWixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxRQUFRO1FBQ0osSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsZ0JBQWdCO1FBQ1osSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0Q7O09BRUc7SUFDSCxRQUFRO1FBQ0osSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0Q7O09BRUc7SUFDSCxNQUFNO1FBQ0YsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0gsU0FBUztRQUNMLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNEOzs7T0FHRztJQUNILFNBQVM7UUFDTCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRDs7OztPQUlHO0lBQ0gsbUJBQW1CO1FBQ2YsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsa0JBQWtCLENBQUMsS0FBWTtRQUMzQixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFFRDs7T0FFRztJQUNILE9BQU87UUFDSCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVc7UUFDUCxPQUFPLElBQUksWUFBWSxlQUFlLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7T0FHRztJQUNILGVBQWUsQ0FBQyxJQUFVO1FBQ3RCLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCw0QkFBNEIsQ0FBQyxRQUFrQixFQUFFLFdBQXdCO1FBQ3JFLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELGVBQWUsQ0FBQyxJQUFZO1FBQ3hCLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNEOztTQUVLO0lBQ0wsZUFBZSxDQUFDLElBQVk7UUFDeEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxZQUFZO1FBQ1IsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELFlBQVksQ0FBQyxNQUFXO1FBQ3BCLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsWUFBWTtRQUNSLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELFlBQVk7UUFDUixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBS0QsT0FEaUIsaUJBQU8sQ0FBQyxPQUFPLEVBQy9CLGlCQUFPLENBQUMsRUFBRSxFQUFDO1FBQ1IsT0FBTyxTQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBQ0QsQ0FBQyxpQkFBTyxDQUFDLE9BQU8sQ0FBQztRQUNiLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsNERBQTREO0lBQzVELElBQUksaUJBQWlCO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUNEOztPQUVHO0lBQ0gsb0JBQW9CO1FBQ2hCLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRztJQUNILG9CQUFvQjtRQUNoQixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFFRDs7T0FFRztJQUNILGFBQWE7UUFDVCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGlCQUFpQixDQUFDLE1BQWM7UUFDNUIsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxZQUFZLENBQUMsRUFBZSxFQUFFLEtBQWE7UUFDdkMsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxRQUFRLENBQUMsSUFBZSxFQUFFLFNBQW9CO1FBQzFDLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILFFBQVEsQ0FBQyxPQUFlLEVBQUUsTUFBYztRQUNwQyxNQUFNLEVBQUUsR0FBRyxvQkFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsb0JBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ2hDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2pCLEVBQUUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQixFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILFdBQVcsQ0FBQyxPQUFlLEVBQUUsTUFBYztRQUN2QyxNQUFNLEVBQUUsR0FBRyxvQkFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsb0JBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ25DLEVBQUUsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2pCLEVBQUUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQixFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILGNBQWMsQ0FBQyxNQUFxQjtRQUNoQyxNQUFNLEVBQUUsR0FBRyxvQkFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsb0JBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQ3RDLEVBQUUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0IsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsV0FBVyxDQUFDLE9BQWU7UUFDdkIsTUFBTSxFQUFFLEdBQUcsb0JBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqQyxFQUFFLENBQUMsSUFBSSxHQUFHLG9CQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUMvQixFQUFFLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUNyQixJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0IsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxnQkFBZ0IsQ0FBQyxPQUFlLEVBQUUsU0FBbUIsRUFBRTtRQUNuRCxNQUFNLEVBQUUsR0FBRyxvQkFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsb0JBQVUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3JCLEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFO1lBQ3hCLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsRUFBRSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0IsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILFNBQVMsQ0FBQyxPQUFlLEVBQUUsU0FBbUIsRUFBRTtRQUM1QyxNQUFNLEVBQUUsR0FBRyxvQkFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsb0JBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3JCLEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFO1lBQ3hCLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsRUFBRSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0IsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxPQUFPLENBQUMsT0FBZSxFQUFFLFNBQW1CLEVBQUU7UUFDMUMsTUFBTSxFQUFFLEdBQUcsb0JBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqQyxFQUFFLENBQUMsSUFBSSxHQUFHLG9CQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUMvQixFQUFFLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUNyQixLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtZQUN4QixFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN6QjtRQUNELEVBQUUsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxxQkFBcUIsQ0FBQyxPQUFlLEVBQUUsU0FBbUIsRUFBRTtRQUN4RCxNQUFNLEVBQUUsR0FBRyxvQkFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsb0JBQVUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ3JDLEVBQUUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3JCLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7UUFDMUIsRUFBRSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0IsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxLQUFhLEVBQUUsT0FBZSxFQUFFO1FBQzdDLE1BQU0sRUFBRSxHQUFHLDRCQUFrQixDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3pDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLEVBQUUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILFVBQVUsQ0FBQyxLQUFhLEVBQUUsT0FBZSxFQUFFLEtBQThCO1FBQ3JFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixNQUFNLEVBQUUsR0FBRyx5QkFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3RDLEVBQUUsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzFDLEVBQUUsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcseUJBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ3JDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLEVBQUUsQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO1FBQzNCLElBQUksS0FBSztZQUFFLEVBQUUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQixFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsa0JBQWtCO1FBQ2QsTUFBTSxFQUFFLEdBQUcsd0JBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNyQyxFQUFFLENBQUMsSUFBSSxHQUFHLHdCQUFjLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNyQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0IsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsZ0JBQWdCLENBQUMsVUFBa0IsRUFBRSxRQUFnQixFQUFFLFdBQW1CO1FBQ3RFLE1BQU0sRUFBRSxHQUFHLHdCQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDckMsRUFBRSxDQUFDLElBQUksR0FBRyx3QkFBYyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUM7UUFDOUMsRUFBRSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDM0IsRUFBRSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDdkIsRUFBRSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxTQUFTLENBQUMsS0FBYSxFQUFFLFFBQWlCO1FBQ3RDLE1BQU0sRUFBRSxHQUFHLHdCQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDckMsRUFBRSxDQUFDLElBQUksR0FBRyx3QkFBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDckMsRUFBRSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDaEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNiLElBQUksUUFBUTtZQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsWUFBWSxDQUFDLFFBQWdCO1FBQ3pCLE1BQU0sRUFBRSxHQUFHLHdCQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDckMsRUFBRSxDQUFDLElBQUksR0FBRyx3QkFBYyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDeEMsRUFBRSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7UUFDbkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsVUFBVTtRQUNOLE1BQU0sRUFBRSxHQUFHLHdCQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDckMsRUFBRSxDQUFDLElBQUksR0FBRyx3QkFBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDckMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxhQUFhLENBQUMsU0FBaUI7UUFDM0IsTUFBTSxFQUFFLEdBQUcsd0JBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNyQyxFQUFFLENBQUMsSUFBSSxHQUFHLHdCQUFjLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUN6QyxFQUFFLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUNwQixJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0IsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7T0FFRztJQUNILGFBQWE7UUFDVCxNQUFNLEVBQUUsR0FBRyx5QkFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3RDLEVBQUUsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzFDLEVBQUUsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcseUJBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQixFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsaUJBQWlCLENBQUMsS0FBYSxFQUFFLEtBQXVDLEVBQUUsT0FBZSxPQUFPLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDbEgsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDNUI7WUFDSSxNQUFNLEVBQUUsR0FBRyxtQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoRCxFQUFFLENBQUMsV0FBVyxHQUFHLHdCQUFXLENBQUMsT0FBTyxDQUFDO1lBQ3JDLEVBQUUsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLEVBQUUsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLEVBQUUsQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMzQixFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDaEI7UUFDRDtZQUNJLE1BQU0sRUFBRSxHQUFHLHdCQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDckMsRUFBRSxDQUFDLElBQUksR0FBRyx3QkFBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDckMsTUFBTSxPQUFPLEdBQTJCLEVBQUUsQ0FBQztZQUMzQyxLQUFLLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNyQyxNQUFNLEtBQUssR0FBRyx5QkFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUMxQyxLQUFLLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFDM0IsS0FBSyxDQUFDLFlBQVksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEMsS0FBSyxDQUFDLElBQUksR0FBRyx5QkFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQzlDLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO29CQUMxQixLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3BCLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2lCQUMzQjtxQkFBTTtvQkFDSCxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEIsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzlCO2dCQUNELEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3ZCO1lBQ0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzNCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNiLEtBQUssTUFBTSxLQUFLLElBQUksT0FBTyxFQUFFO2dCQUN6QixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDcEI7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7T0FFRztJQUNILG9CQUFvQjtRQUNoQixNQUFNLEVBQUUsR0FBRyxtQ0FBeUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoRCxFQUFFLENBQUMsV0FBVyxHQUFHLHdCQUFXLENBQUMsT0FBTyxDQUFDO1FBQ3JDLEVBQUUsQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLEVBQUUsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO1FBQzFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQixFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsY0FBYyxDQUFDLE9BQWUsRUFBRSxPQUFlLEtBQUs7UUFDaEQsTUFBTSxFQUFFLEdBQUcsd0JBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNyQyxFQUFFLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUNyQixFQUFFLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNmLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQixFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxTQUFTLENBQUMsU0FBaUIsRUFBRSxNQUFpQixJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsU0FBaUIsR0FBRyxFQUFFLFFBQWdCLEdBQUc7UUFDdkcsTUFBTSxFQUFFLEdBQUcseUJBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN0QyxFQUFFLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUN6QixFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixFQUFFLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNuQixFQUFFLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNqQixJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0IsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxZQUFZO1FBQ1IsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsWUFBWSxDQUFDLElBQWU7UUFDeEIsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsR0FBRyxDQUFDLFlBQStCO1FBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsdUJBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekMsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBcUIsRUFBRSxVQUFvQjtRQUMvRCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7O0FBeDVCTCx3QkF5NUJDO0FBamJHLHNCQUFzQjtBQUVOLFVBQWlCLEdBQUcsUUFBUSxDQUFDO0FBaWJwQyxRQUFBLFlBQVksR0FBRyxNQUFNLENBQUMsQ0FBQyx3REFBd0Q7QUFHNUYsTUFBYSxlQUFnQixTQUFRLG9CQUFZO0lBd0I3QyxNQUFNLENBQUMsTUFBTSxDQUNULElBQVksRUFDWixRQUFxQyxFQUNyQyxXQUF3QixFQUN4QixtQ0FBbUY7UUFFbkYsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQ7O09BRUc7SUFDSCxrQkFBa0I7UUFDZCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFJRCxjQUFjLENBQUMsTUFBK0I7UUFDMUMsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsWUFBWTtRQUNSLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELHVCQUF1QixDQUFDLFFBQWdCO1FBQ3BDLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELGVBQWUsQ0FBQyxJQUFlLEVBQUUsVUFBbUIsRUFBRSxJQUFZO1FBQzlELElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELG9CQUFvQixDQUFDLEdBQWEsRUFBRSxZQUFvQixDQUFDO1FBQ3JELElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELDJCQUEyQjtRQUN2QixJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxpQkFBaUIsQ0FBQyxHQUFTLEVBQUUsS0FBYTtRQUN0QyxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxzQkFBc0IsQ0FBQyxHQUFTLEVBQUUsS0FBYTtRQUMzQyxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRDs7OztRQUlJO0lBQ0osMkJBQTJCLENBQUMsU0FBaUIsRUFBRSxLQUFnQjtRQUMzRCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxrQkFBa0I7UUFDZCxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxxQ0FBcUM7SUFDckMsY0FBYyxDQUFDLE1BQWE7UUFDeEIsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QseUJBQXlCLENBQUMsTUFBYTtRQUNuQyxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCx5QkFBeUIsQ0FBQyxRQUFrQixFQUFFLFlBQW9CLENBQUM7UUFDL0QsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsZUFBZSxDQUFDLElBQWU7UUFDM0IsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBQ0Qsc0JBQXNCLENBQUMsSUFBZSxFQUFFLEdBQWEsRUFBRSxZQUFvQixDQUFDLEVBQUUsV0FBaUIsZUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvRyxJQUFBLGlCQUFRLEdBQUUsQ0FBQztJQUNmLENBQUM7SUFDRCxxQkFBcUIsQ0FBQyxJQUFZO1FBQzlCLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBQ2YsQ0FBQztJQUNELDRCQUE0QixDQUFDLElBQVksRUFBRSxHQUFhLEVBQUUsWUFBb0IsQ0FBQyxFQUFFLFdBQWlCLGVBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEgsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQXFCLEVBQUUsVUFBb0I7UUFDL0QsSUFBQSxpQkFBUSxHQUFFLENBQUM7SUFDZixDQUFDO0NBQ0o7QUF2R0QsMENBdUdDO0FBRUQseURBQXlEO0FBQzVDLFFBQUEsZUFBZSxHQUFHLHlCQUFnQixDQUFDO0FBSWhELElBQVksU0FLWDtBQUxELFdBQVksU0FBUztJQUNqQiwyQ0FBUyxDQUFBO0lBQ1QsMkNBQVMsQ0FBQTtJQUNULCtDQUFXLENBQUE7SUFDWCxpRUFBb0IsQ0FBQTtBQUN4QixDQUFDLEVBTFcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFLcEI7QUFFRDs7R0FFRztBQUNILElBQVksUUFRWDtBQVJELFdBQVksUUFBUTtJQUNoQiwrQ0FBUSxDQUFBO0lBQ1IsK0NBQVEsQ0FBQTtJQUNSLGlEQUFTLENBQUE7SUFDVCxpRUFBaUIsQ0FBQTtJQUNqQixpRUFBaUIsQ0FBQTtJQUNqQiw2Q0FBTyxDQUFBO0lBQ1AsaURBQVMsQ0FBQTtBQUNiLENBQUMsRUFSVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQVFuQjtBQUVEOztHQUVHO0FBQ0gsSUFBWSxnQkFLWDtBQUxELFdBQVksZ0JBQWdCO0lBQ3hCLDZEQUFPLENBQUE7SUFDUCwyREFBTSxDQUFBO0lBQ04sK0RBQVEsQ0FBQTtJQUNSLDJEQUFNLENBQUE7QUFDVixDQUFDLEVBTFcsZ0JBQWdCLEdBQWhCLHdCQUFnQixLQUFoQix3QkFBZ0IsUUFLM0IifQ==