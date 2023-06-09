"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BackupUtils_1 = require("./BackupUtils");
describe("Backup Utils", () => {
    const handleError = () => {
        // no action
    };
    test("Can get world name from server.properties", async () => {
        const worldName = await BackupUtils_1.BackupUtils.getWorldName("./bedrock_server");
        expect(worldName).toBe("WorldName123");
    });
    test("Can create temp directory and cleanup", async () => {
        const tempDirectory = await BackupUtils_1.BackupUtils.createTempDirectory("test123", handleError);
        expect(tempDirectory).toContain("temp/");
        await BackupUtils_1.BackupUtils.removeDirectory("temp");
        const tempExists = await BackupUtils_1.BackupUtils.directoryExists("temp");
        expect(tempExists).toBeFalsy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFja3VwVXRpbHMudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJhY2t1cFV0aWxzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQ0FBNEM7QUFFNUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUU7SUFDMUIsTUFBTSxXQUFXLEdBQUcsR0FBRyxFQUFFO1FBQ3JCLFlBQVk7SUFDaEIsQ0FBQyxDQUFDO0lBRUYsSUFBSSxDQUFDLDJDQUEyQyxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ3pELE1BQU0sU0FBUyxHQUFHLE1BQU0seUJBQVcsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNyRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLHVDQUF1QyxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ3JELE1BQU0sYUFBYSxHQUFHLE1BQU0seUJBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDcEYsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV6QyxNQUFNLHlCQUFXLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLE1BQU0sVUFBVSxHQUFHLE1BQU0seUJBQVcsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25DLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==