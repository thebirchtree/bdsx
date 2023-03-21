"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nativetype_1 = require("bdsx/nativetype");
const prochacker_1 = require("bdsx/prochacker");
// hook MapItemSavedData::_updateTrackedEntityDecoration
prochacker_1.procHacker.hooking("?_updateTrackedEntityDecoration@MapItemSavedData@@AEAA_NAEAVBlockSource@@V?$shared_ptr@VMapItemTrackedActor@@@std@@@Z", nativetype_1.bool_t)(() => false);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZW1hcG1hcmtlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhpZGVtYXBtYXJrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnREFBeUM7QUFDekMsZ0RBQTZDO0FBRTdDLHdEQUF3RDtBQUN4RCx1QkFBVSxDQUFDLE9BQU8sQ0FBQyx1SEFBdUgsRUFBRSxtQkFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMifQ==