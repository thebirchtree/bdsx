"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileWriter = void 0;
const fs = require("fs");
class FileWriter {
    constructor(path) {
        this.ws = fs.createWriteStream(path, "utf-8");
        this.errprom = new Promise((resolve, reject) => {
            this.ws.on("error", reject);
        });
    }
    write(data) {
        return Promise.race([
            new Promise(resolve => {
                if (!this.ws.write(data)) {
                    this.ws.once("drain", resolve);
                }
                else {
                    resolve();
                }
            }),
            this.errprom,
        ]);
    }
    end() {
        return Promise.race([
            new Promise(resolve => {
                this.ws.end(resolve);
            }),
            this.errprom,
        ]);
    }
}
exports.FileWriter = FileWriter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXdyaXRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGV3cml0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUJBQXlCO0FBRXpCLE1BQWEsVUFBVTtJQUduQixZQUFZLElBQVk7UUFDcEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDM0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFZO1FBQ2QsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ2hCLElBQUksT0FBTyxDQUFPLE9BQU8sQ0FBQyxFQUFFO2dCQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDbEM7cUJBQU07b0JBQ0gsT0FBTyxFQUFFLENBQUM7aUJBQ2I7WUFDTCxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsT0FBTztTQUNmLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxHQUFHO1FBQ0MsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ2hCLElBQUksT0FBTyxDQUFPLE9BQU8sQ0FBQyxFQUFFO2dCQUN4QixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6QixDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsT0FBTztTQUNmLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQS9CRCxnQ0ErQkMifQ==