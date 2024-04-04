import { events } from "bdsx/event";

let halfMiss = false;
events.blockDestroy.on(ev=>{
    const blockPos = ev.blockPos;
    ev.player.sendMessage(`${halfMiss ? "missed" : "destroyed"}: ${blockPos.x} ${blockPos.y} ${blockPos.z}`);
});
