import { events } from "bdsx/event";
import { bedrockServer } from "bdsx/launcher";
import { IBackupSettings } from "./IBackupSettings";
export declare class BackupManager {
    private bds;
    private evt;
    private testOnly?;
    private tempName?;
    private worldName;
    private runNextBackup;
    private lastBackup;
    private backupSettings;
    private bedrockServerPath;
    private resumeRetryCounter;
    private actorList;
    constructor(bds: typeof bedrockServer, evt: typeof events, testOnly?: boolean | undefined, tempName?: string | undefined);
    init(settings: IBackupSettings): Promise<void>;
    backup(): Promise<void>;
    private registerHandlers;
    private runBackup;
    private displayStatus;
}
