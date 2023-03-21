"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nethook = void 0;
const packetids_1 = require("./bds/packetids");
const event_1 = require("./event");
const util_1 = require("./util");
var nethook;
(function (nethook) {
    /**
     * Write all packets to console
     */
    function watchAll(exceptions = [
        packetids_1.MinecraftPacketIds.ClientCacheBlobStatus,
        packetids_1.MinecraftPacketIds.LevelChunk,
        packetids_1.MinecraftPacketIds.ClientCacheMissResponse,
        packetids_1.MinecraftPacketIds.MoveActorDelta,
        packetids_1.MinecraftPacketIds.SetActorMotion,
        packetids_1.MinecraftPacketIds.SetActorData,
    ]) {
        const ex = new Set(exceptions);
        for (let i = 1; i <= 0xa3; i++) {
            if (ex.has(i))
                continue;
            event_1.events.packetBefore(i).on((ptr, ni, id) => {
                console.log(`R ${packetids_1.MinecraftPacketIds[id]}(${id}) ${(0, util_1.hex)(ptr.getBuffer(0x10, 0x28))}`);
            });
        }
        for (let i = 1; i <= 0xa3; i++) {
            if (ex.has(i))
                continue;
            event_1.events.packetSend(i).on((ptr, ni, id) => {
                console.log(`S ${packetids_1.MinecraftPacketIds[id]}(${id}) ${(0, util_1.hex)(ptr.getBuffer(0x10, 0x28))}`);
            });
        }
    }
    nethook.watchAll = watchAll;
})(nethook = exports.nethook || (exports.nethook = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0aG9vay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5ldGhvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0NBQXFEO0FBSXJELG1DQUFpQztBQUNqQyxpQ0FBNkI7QUFFN0IsSUFBaUIsT0FBTyxDQXlDdkI7QUF6Q0QsV0FBaUIsT0FBTztJQWNwQjs7T0FFRztJQUNILFNBQWdCLFFBQVEsQ0FDcEIsYUFBbUM7UUFDL0IsOEJBQWtCLENBQUMscUJBQXFCO1FBQ3hDLDhCQUFrQixDQUFDLFVBQVU7UUFDN0IsOEJBQWtCLENBQUMsdUJBQXVCO1FBQzFDLDhCQUFrQixDQUFDLGNBQWM7UUFDakMsOEJBQWtCLENBQUMsY0FBYztRQUNqQyw4QkFBa0IsQ0FBQyxZQUFZO0tBQ2xDO1FBRUQsTUFBTSxFQUFFLEdBQUcsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1QixJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUFFLFNBQVM7WUFDeEIsY0FBTSxDQUFDLFlBQVksQ0FBcUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtnQkFDMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLDhCQUFrQixDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxJQUFBLFVBQUcsRUFBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN4RixDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1QixJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUFFLFNBQVM7WUFDeEIsY0FBTSxDQUFDLFVBQVUsQ0FBcUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtnQkFDeEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLDhCQUFrQixDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxJQUFBLFVBQUcsRUFBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN4RixDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQXZCZSxnQkFBUSxXQXVCdkIsQ0FBQTtBQUNMLENBQUMsRUF6Q2dCLE9BQU8sR0FBUCxlQUFPLEtBQVAsZUFBTyxRQXlDdkIifQ==