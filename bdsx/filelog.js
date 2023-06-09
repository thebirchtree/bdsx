"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileLog = void 0;
const fs = require("fs");
const path = require("path");
const util_1 = require("util");
class FileLog {
    constructor(filepath) {
        this.appending = "";
        this.flushing = false;
        this.path = path.resolve(filepath);
    }
    _flush() {
        fs.appendFile(this.path, this.appending, () => {
            if (this.appending !== "") {
                this._flush();
            }
            else {
                this.flushing = false;
            }
        });
        this.appending = "";
    }
    log(...message) {
        this.appending += message.map(x => (0, util_1.inspect)(x)).join(" ");
        if (!this.flushing) {
            this.flushing = true;
            this._flush();
        }
    }
}
exports.FileLog = FileLog;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZWxvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGVsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QiwrQkFBK0I7QUFFL0IsTUFBYSxPQUFPO0lBS2hCLFlBQVksUUFBZ0I7UUFIcEIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFHckIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFTyxNQUFNO1FBQ1YsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQzFDLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxFQUFFLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNqQjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQzthQUN6QjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELEdBQUcsQ0FBQyxHQUFHLE9BQWM7UUFDakIsSUFBSSxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBQSxjQUFPLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQztDQUNKO0FBM0JELDBCQTJCQyJ9