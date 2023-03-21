"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.banIp = void 0;
const core_1 = require("bdsx/core");
const storage_1 = require("bdsx/storage");
/**
 * ipfilter blocks at the earliest phase of the program.
 * It will never show the messages to the users
 */
let banListStorage = null;
function banIp(ni) {
    if (banListStorage === null)
        throw Error("the storage is not loaded");
    const ip = ni.toString();
    core_1.ipfilter.add(ip, 60 * 60); // add to the filter, 1 hour.
    // ipfilter does not keep it permanently. need to store it somewhere.
    banListStorage.push([ip, core_1.ipfilter.getTime(ip)]);
}
exports.banIp = banIp;
// if the traffic is larger than 1 MiB, it blocks the user until 1 hour
core_1.ipfilter.setTrafficLimit(1024 * 1024 * 1024); // 1 MiB
core_1.ipfilter.setTrafficLimitPeriod(60 * 60); // 1 Hour
// load from the storage
(async () => {
    const storage = await storage_1.storageManager.get("ipban");
    if (storage.data == null) {
        storage.init([]);
    }
    banListStorage = storage.data;
    for (const [name, period] of storage.data) {
        core_1.ipfilter.addAt(name, period); // restore from the storage
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXBiYW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpcGJhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxvQ0FBcUM7QUFDckMsMENBQThDO0FBRTlDOzs7R0FHRztBQUVILElBQUksY0FBYyxHQUE4QixJQUFJLENBQUM7QUFFckQsU0FBZ0IsS0FBSyxDQUFDLEVBQXFCO0lBQ3ZDLElBQUksY0FBYyxLQUFLLElBQUk7UUFBRSxNQUFNLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQ3RFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN6QixlQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyw2QkFBNkI7SUFFeEQscUVBQXFFO0lBQ3JFLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsZUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEQsQ0FBQztBQVBELHNCQU9DO0FBRUQsdUVBQXVFO0FBQ3ZFLGVBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVE7QUFDdEQsZUFBUSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVM7QUFFbEQsd0JBQXdCO0FBQ3hCLENBQUMsS0FBSyxJQUFJLEVBQUU7SUFDUixNQUFNLE9BQU8sR0FBRyxNQUFNLHdCQUFjLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xELElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUU7UUFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNwQjtJQUNELGNBQWMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0lBRTlCLEtBQUssTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFO1FBQ3ZDLGVBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsMkJBQTJCO0tBQzVEO0FBQ0wsQ0FBQyxDQUFDLEVBQUUsQ0FBQyJ9