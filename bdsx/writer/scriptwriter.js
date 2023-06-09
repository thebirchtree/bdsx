"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptWriter = void 0;
class ScriptWriter {
    constructor() {
        this.script = "";
        this.tabstr = "";
    }
    tab(n) {
        if (n < 0) {
            this.tabstr = this.tabstr.substr(0, this.tabstr.length + n);
        }
        else {
            this.tabstr += " ".repeat(n);
        }
    }
    writeln(line) {
        this.script += this.tabstr;
        this.script += line;
        this.script += "\r\n";
    }
}
exports.ScriptWriter = ScriptWriter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0d3JpdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2NyaXB0d3JpdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQWEsWUFBWTtJQUF6QjtRQUNXLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWCxXQUFNLEdBQUcsRUFBRSxDQUFDO0lBZXhCLENBQUM7SUFiRyxHQUFHLENBQUMsQ0FBUztRQUNULElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNQLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQy9EO2FBQU07WUFDSCxJQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEM7SUFDTCxDQUFDO0lBRUQsT0FBTyxDQUFDLElBQVk7UUFDaEIsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNCLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDO0lBQzFCLENBQUM7Q0FDSjtBQWpCRCxvQ0FpQkMifQ==