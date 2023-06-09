"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.undecoratedSymbols = exports.undecoratedPrivateSymbols = exports.loadAllSymbols = void 0;
const pdbcache_1 = require("../pdbcache");
let symbolNames = null;
function loadAllSymbols() {
    if (symbolNames !== null)
        return symbolNames;
    return (symbolNames = [...pdbcache_1.pdbcache.readKeys()]);
}
exports.loadAllSymbols = loadAllSymbols;
/** @deprecated use loadAllSymbols() */
exports.undecoratedPrivateSymbols = [];
/** @deprecated use loadAllSymbols() */
exports.undecoratedSymbols = [];
Object.defineProperty(exports, "decoratedSymbols", { get: loadAllSymbols });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ltYm9sbGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN5bWJvbGxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMENBQXVDO0FBRXZDLElBQUksV0FBVyxHQUFvQixJQUFJLENBQUM7QUFFeEMsU0FBZ0IsY0FBYztJQUMxQixJQUFJLFdBQVcsS0FBSyxJQUFJO1FBQUUsT0FBTyxXQUFXLENBQUM7SUFDN0MsT0FBTyxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsbUJBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDcEQsQ0FBQztBQUhELHdDQUdDO0FBRUQsdUNBQXVDO0FBQzFCLFFBQUEseUJBQXlCLEdBQWEsRUFBRSxDQUFDO0FBRXRELHVDQUF1QztBQUMxQixRQUFBLGtCQUFrQixHQUFhLEVBQUUsQ0FBQztBQUsvQyxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDIn0=