export declare class BackupUtils {
    static getWorldName(bedrockServerPath: string): Promise<string>;
    static readFile(path: string): Promise<string>;
    static removeDirectory(path: string): Promise<any>;
    static directoryExists(filePath: string): Promise<boolean>;
    private static ensureDirectoryExists;
    static createTempDirectory(worldName: string, handleError: (error?: string) => void, tempName?: string): Promise<string>;
    static removeTempDirectory(tempDirectory: string): Promise<void>;
    static truncate(file: string, tempDirectory: string): Promise<void>;
    static zipDirectory(backupsPath: string, tempDirectory: string, worldName: string, handleError: (error?: string) => void): Promise<void>;
    static moveFiles(worldsPath: string, tempDirectory: string, worldName: string, handleError: any): Promise<void>;
}
