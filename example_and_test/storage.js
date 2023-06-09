"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("bdsx/event");
const storage_1 = require("bdsx/storage");
// global storage
const storage = storage_1.storageManager.getSync("storage_example");
if (storage.data === undefined) {
    // it's undefined if it does not exist.
    // initialize
    storage.init({
        a: 1,
        b: "2",
        c: [3, 4],
        d: true,
        counter: 0,
    });
}
storage.data.counter++; // it will be saved automatically after 500ms.
console.log(`storage counter = ${storage.data.counter}`);
// the flush delay is defined on 'storageManager.driver.flushDelay' and it can be modified.
// storage from the player
event_1.events.playerJoin.on(async (ev) => {
    const playerName = ev.player.getNameTag();
    const storage = await storage_1.storageManager.get(ev.player); // it's using an asynchronized method.
    // don't recommend the synchronized method. ex) storageManager.getSync
    // the synchronized method pauses the entire server until the end of the load.
    if (!storage.isLoaded)
        return; // if the player left before loading it's possible to occur.
    if (storage.data === undefined) {
        // initialize
        storage.init({
            level: 1,
            money: 1000,
            permaInfo: "Hello World",
            attendance: 0,
            lastLoginDate: new Date().toDateString(),
        });
    }
    const playerData = storage.data;
    const today = new Date().toDateString();
    console.log(`${playerName}.lastLoginDate=${playerData.lastLoginDate}`);
    if (playerData.lastLoginDate !== today) {
        playerData.attendance++;
        playerData.lastLoginDate = today;
    }
    console.log(`${playerName}.attendance=${playerData.attendance}`);
    // storing instance
    const instance = new CustomClass();
    instance.value = 1;
    playerData.object = instance;
    console.assert(playerData.object !== instance); // but it's not referenced object.
    console.assert(playerData.object instanceof CustomClass === false); // it's not the class instance even.
    console.assert(playerData.object.value === 1); // but the property is stored anyway.
});
event_1.events.playerLeft.on(async (ev) => {
    storage_1.storageManager.close(ev.player);
});
class CustomClass {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0M7QUFDcEMsMENBQThDO0FBRTlDLGlCQUFpQjtBQUNqQixNQUFNLE9BQU8sR0FBRyx3QkFBYyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQzFELElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7SUFDNUIsdUNBQXVDO0lBQ3ZDLGFBQWE7SUFDYixPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ1QsQ0FBQyxFQUFFLENBQUM7UUFDSixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDVCxDQUFDLEVBQUUsSUFBSTtRQUNQLE9BQU8sRUFBRSxDQUFDO0tBQ2IsQ0FBQyxDQUFDO0NBQ047QUFFRCxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsOENBQThDO0FBQ3RFLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUN6RCwyRkFBMkY7QUFFM0YsMEJBQTBCO0FBQzFCLGNBQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBQyxFQUFFLEVBQUMsRUFBRTtJQUM1QixNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzFDLE1BQU0sT0FBTyxHQUFHLE1BQU0sd0JBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsc0NBQXNDO0lBQzNGLHNFQUFzRTtJQUN0RSw4RUFBOEU7SUFDOUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRO1FBQUUsT0FBTyxDQUFDLDREQUE0RDtJQUUzRixJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1FBQzVCLGFBQWE7UUFDYixPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ1QsS0FBSyxFQUFFLENBQUM7WUFDUixLQUFLLEVBQUUsSUFBSTtZQUNYLFNBQVMsRUFBRSxhQUFhO1lBQ3hCLFVBQVUsRUFBRSxDQUFDO1lBQ2IsYUFBYSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsWUFBWSxFQUFFO1NBQzNDLENBQUMsQ0FBQztLQUNOO0lBRUQsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztJQUNoQyxNQUFNLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLGtCQUFrQixVQUFVLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztJQUN2RSxJQUFJLFVBQVUsQ0FBQyxhQUFhLEtBQUssS0FBSyxFQUFFO1FBQ3BDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN4QixVQUFVLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztLQUNwQztJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLGVBQWUsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFFakUsbUJBQW1CO0lBQ25CLE1BQU0sUUFBUSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7SUFDbkMsUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDbkIsVUFBVSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7SUFDN0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsa0NBQWtDO0lBQ2xGLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sWUFBWSxXQUFXLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxvQ0FBb0M7SUFDeEcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLHFDQUFxQztBQUN4RixDQUFDLENBQUMsQ0FBQztBQUVILGNBQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBQyxFQUFFLEVBQUMsRUFBRTtJQUM1Qix3QkFBYyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDcEMsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLFdBQVc7Q0FFaEIifQ==