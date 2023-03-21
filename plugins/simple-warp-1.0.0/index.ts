import "./src";
import { events } from "bdsx/event";

events.serverOpen.on(() => { console.log(`[Simple-Warp] Started!`) });
events.serverStop.on(() => { console.log(`[Simple-Warp] Started!`) });