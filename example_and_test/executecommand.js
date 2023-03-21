"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commandresult_1 = require("bdsx/commandresult");
const launcher_1 = require("bdsx/launcher");
const res = launcher_1.bedrockServer.executeCommand("list", commandresult_1.CommandResultType.Data);
console.log(`[example/executecommand.ts] ${res.data.statusMessage.replace(/[\r\n]+/g, " ")}`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0ZWNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleGVjdXRlY29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNEQUF1RDtBQUN2RCw0Q0FBOEM7QUFFOUMsTUFBTSxHQUFHLEdBQUcsd0JBQWEsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLGlDQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDIn0=