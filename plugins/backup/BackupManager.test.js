"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const networkidentifier_1 = require("bdsx/bds/networkidentifier");
const player_1 = require("bdsx/bds/player");
const entityevent_1 = require("bdsx/event_impl/entityevent");
const krevent_1 = require("krevent");
const moq_ts_1 = require("moq.ts");
const unzipper = require("unzipper");
const wait_for_expect_1 = require("wait-for-expect");
const BackupManager_1 = require("./BackupManager");
const BackupUtils_1 = require("./BackupUtils");
describe("BackupManager", () => {
    const mockBedrockLogEvents = new krevent_1.default();
    const mockCommandOutputEvents = new krevent_1.default();
    const mockPlayerJoin = new krevent_1.default();
    const mockNetworkDisconnected = new krevent_1.default();
    const mockExecuteCommandOnConsole = (command) => {
        console.log(command);
    };
    afterAll(async () => {
        setTimeout(async () => {
            await BackupUtils_1.BackupUtils.removeDirectory("backups");
        }, 0);
    });
    const createBackupManager = (bds, evt, testOnly, tempName) => {
        return new BackupManager_1.BackupManager(bds, evt, testOnly, tempName);
    };
    const createBdsMock = () => {
        const stub = {
            executeCommandOnConsole: mockExecuteCommandOnConsole,
        };
        return new moq_ts_1.Mock().setup(() => moq_ts_1.It.IsAny()).mimics(stub);
    };
    const createEvtMock = () => {
        const stub = {
            commandOutput: mockCommandOutputEvents,
            playerJoin: mockPlayerJoin,
            networkDisconnected: mockNetworkDisconnected,
        };
        return new moq_ts_1.Mock().setup(() => moq_ts_1.It.IsAny()).mimics(stub);
    };
    const firePlayerJoinEvent = () => {
        mockPlayerJoin.fire(new entityevent_1.PlayerJoinEvent(new player_1.ServerPlayer()));
    };
    const fireDisconnectedEvent = () => {
        mockNetworkDisconnected.fire(new networkidentifier_1.NetworkIdentifier());
    };
    test("Can init", async () => {
        const bdsMock = createBdsMock();
        const evtMock = createEvtMock();
        const backupManager = createBackupManager(bdsMock.object(), evtMock.object(), true);
        await backupManager.init({ backupOnStart: false, skipIfNoActivity: false });
        bdsMock.verify((instance) => instance.executeCommandOnConsole(moq_ts_1.It.IsAny()), moq_ts_1.Times.Never());
    });
    test("Backup is skipped if no activity with skipIfNoActivity=true", async () => {
        const bdsMock = createBdsMock();
        const evtMock = createEvtMock();
        const backupManager = createBackupManager(bdsMock.object(), evtMock.object(), true);
        await backupManager.init({ backupOnStart: false, skipIfNoActivity: true });
        await backupManager.backup();
        bdsMock.verify((instance) => instance.executeCommandOnConsole(moq_ts_1.It.IsAny()), moq_ts_1.Times.Never());
    });
    test("Backup does not run when user connects with backupOnPlayerConnected=false and backupOnPlayerDisconnected=false", async () => {
        const bdsMock = createBdsMock();
        const evtMock = createEvtMock();
        const backupManager = createBackupManager(bdsMock.object(), evtMock.object(), true);
        await backupManager.init({
            backupOnStart: false,
            skipIfNoActivity: true,
            backupOnPlayerConnected: false,
            backupOnPlayerDisconnected: false,
        });
        mockBedrockLogEvents.fire("Player connected", "test");
        mockBedrockLogEvents.fire("Player disconnected", "test");
        bdsMock.verify((instance) => instance.executeCommandOnConsole(moq_ts_1.It.IsAny()), moq_ts_1.Times.Never());
    });
    test("Backup runs when player connects with backupOnPlayerConnected=true", async () => {
        const bdsMock = createBdsMock();
        const evtMock = createEvtMock();
        const backupManager = createBackupManager(bdsMock.object(), evtMock.object(), true);
        await backupManager.init({ backupOnStart: false, skipIfNoActivity: true, backupOnPlayerConnected: true });
        firePlayerJoinEvent();
        bdsMock.verify((instance) => instance.executeCommandOnConsole("save hold"), moq_ts_1.Times.Once());
    });
    test("Backup run when user connects with backupOnPlayerConnected=false and backupOnPlayerDisconnected=true", async () => {
        const bdsMock = createBdsMock();
        const evtMock = createEvtMock();
        const backupManager = createBackupManager(bdsMock.object(), evtMock.object(), true);
        await backupManager.init({
            backupOnStart: false,
            skipIfNoActivity: true,
            backupOnPlayerConnected: false,
            backupOnPlayerDisconnected: true,
        });
        firePlayerJoinEvent();
        fireDisconnectedEvent();
        bdsMock.verify((instance) => instance.executeCommandOnConsole("save hold"), moq_ts_1.Times.Once());
    });
    test("Backup runs next backup after play connects or disconnects", async () => {
        const bdsMock = createBdsMock();
        const evtMock = createEvtMock();
        const backupManager = createBackupManager(bdsMock.object(), evtMock.object(), true);
        await backupManager.init({
            backupOnStart: false,
            skipIfNoActivity: true,
            backupOnPlayerConnected: true,
            backupOnPlayerDisconnected: true,
        });
        firePlayerJoinEvent();
        bdsMock.verify((instance) => instance.executeCommandOnConsole("save hold"), moq_ts_1.Times.Once());
        fireDisconnectedEvent();
        bdsMock.verify((instance) => instance.executeCommandOnConsole("save hold"), moq_ts_1.Times.Exactly(2));
    });
    test("Can run a backup on start", async () => {
        const bdsMock = createBdsMock();
        const evtMock = createEvtMock();
        const backupManager = createBackupManager(bdsMock.object(), evtMock.object(), true);
        await backupManager.init({ backupOnStart: true });
        bdsMock.verify((instance) => instance.executeCommandOnConsole("save hold"), moq_ts_1.Times.Once());
    });
    test("Backup resets and tries again if backup fails", async () => {
        jest.useFakeTimers();
        const bdsMock = createBdsMock();
        const evtMock = createEvtMock();
        const backupManager = createBackupManager(bdsMock.object(), evtMock.object(), true);
        await backupManager.init({ backupOnStart: false, skipIfNoActivity: true });
        mockCommandOutputEvents.fire("The command is already running", "test");
        jest.runOnlyPendingTimers();
        bdsMock.verify((instance) => instance.executeCommandOnConsole("save resume"), moq_ts_1.Times.Once());
        jest.useRealTimers();
        backupManager.backup();
        bdsMock.verify((instance) => instance.executeCommandOnConsole("save hold"), moq_ts_1.Times.Once());
    });
    test("Backup always runs with skipIfNoActivity=false", async () => {
        const bdsMock = createBdsMock();
        const evtMock = createEvtMock();
        const backupManager = createBackupManager(bdsMock.object(), evtMock.object(), true);
        await backupManager.init({ backupOnStart: false, skipIfNoActivity: false });
        await backupManager.backup();
        bdsMock.verify((instance) => instance.executeCommandOnConsole("save hold"), moq_ts_1.Times.Once());
    });
    test("Backup manager responds to events", async () => {
        jest.setTimeout(10000);
        jest.useFakeTimers();
        const bdsMock = createBdsMock();
        const evtMock = createEvtMock();
        const backupManager = createBackupManager(bdsMock.object(), evtMock.object(), false, "testing");
        await backupManager.init({ backupOnStart: false, skipIfNoActivity: false, backupOnPlayerConnected: true, bedrockServerPath: "./bedrock_server" });
        firePlayerJoinEvent();
        bdsMock.verify((instance) => instance.executeCommandOnConsole("save hold"), moq_ts_1.Times.Once());
        mockCommandOutputEvents.fire("Saving...", "test");
        bdsMock.verify((instance) => instance.executeCommandOnConsole("save query"), moq_ts_1.Times.Once());
        mockCommandOutputEvents.fire("Data saved. Files are now ready to be copied., WorldName123/test.txt:6", "test");
        // eslint-disable-next-line prettier/prettier
        bdsMock.verify((instance) => instance.executeCommandOnConsole("tellraw @a {\"rawtext\": [{\"text\": \"§lBackup\"},{\"text\": \"§r Starting...\"}]}"), moq_ts_1.Times.Once());
        await (0, wait_for_expect_1.default)(() => {
            bdsMock.verify((instance) => instance.executeCommandOnConsole("save resume"), moq_ts_1.Times.Once());
        });
        jest.runAllTimers();
        await (0, wait_for_expect_1.default)(() => {
            // eslint-disable-next-line prettier/prettier
            bdsMock.verify((instance) => instance.executeCommandOnConsole("tellraw @a {\"rawtext\": [{\"text\": \"§lBackup\"},{\"text\": \"§r Finished!\"}]}"), moq_ts_1.Times.Once());
        }, 2500);
        const testFile = await extractFromZip("bedrock_server/backups/testing_WorldName123.zip", "bedrock_server/backups/test.txt");
        expect(testFile).toHaveLength(6);
        jest.useRealTimers();
    });
    test("Backup runs at set intervals", async () => {
        const bdsMock = createBdsMock();
        const evtMock = createEvtMock();
        const backupManager = createBackupManager(bdsMock.object(), evtMock.object(), true);
        jest.useFakeTimers();
        await backupManager.init({ backupOnStart: false, skipIfNoActivity: false, interval: 1 });
        for (let i = 0; i < 10; i++) {
            jest.runOnlyPendingTimers();
        }
        bdsMock.verify((instance) => instance.executeCommandOnConsole("save hold"), moq_ts_1.Times.Exactly(10));
        jest.useRealTimers();
    });
    async function extractFromZip(path, fileName) {
        unzipper.Open.file(path).then((d) => d.extract({ path: "backups", concurrency: 5 }));
        return await BackupUtils_1.BackupUtils.readFile(fileName);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFja3VwTWFuYWdlci50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQmFja3VwTWFuYWdlci50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0VBQStEO0FBQy9ELDRDQUErQztBQUUvQyw2REFBOEQ7QUFFOUQscUNBQTRCO0FBQzVCLG1DQUFnRDtBQUNoRCxxQ0FBcUM7QUFDckMscURBQTRDO0FBRTVDLG1EQUFnRDtBQUNoRCwrQ0FBNEM7QUFFNUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7SUFDM0IsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLGlCQUFLLEVBQXFDLENBQUM7SUFDNUUsTUFBTSx1QkFBdUIsR0FBRyxJQUFJLGlCQUFLLEVBQWlELENBQUM7SUFDM0YsTUFBTSxjQUFjLEdBQUcsSUFBSSxpQkFBSyxFQUFvQyxDQUFDO0lBQ3JFLE1BQU0sdUJBQXVCLEdBQUcsSUFBSSxpQkFBSyxFQUFtQyxDQUFDO0lBQzdFLE1BQU0sMkJBQTJCLEdBQUcsQ0FBQyxPQUFlLEVBQVEsRUFBRTtRQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pCLENBQUMsQ0FBQztJQUVGLFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNoQixVQUFVLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDbEIsTUFBTSx5QkFBVyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDVixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxHQUF5QixFQUFFLEdBQWtCLEVBQUUsUUFBa0IsRUFBRSxRQUFpQixFQUFpQixFQUFFO1FBQ2hJLE9BQU8sSUFBSSw2QkFBYSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzNELENBQUMsQ0FBQztJQUVGLE1BQU0sYUFBYSxHQUFHLEdBQWdD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