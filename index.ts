import "./example_and_test"; 

import { bedrockServer } from "bdsx/launcher";
import { events } from "bdsx/event";
import { BackupManager } from "@bdsx/backup/BackupManager";
import { loadedPlugins } from "bdsx/plugins";

const backupManager = new BackupManager(bedrockServer, events);
backupManager.init({
    backupOnStart: false,
    skipIfNoActivity: true,
    backupOnPlayerConnected: false,
    backupOnPlayerDisconnected: true,
    interval: 180,
    minIntervalBetweenBackups: 180,
}).then((res) => {
    console.log(`backup manager initiated`);
});



// Please start your own codes from here!

import './example_and_test'; // remove this if it's not necessary for you
