"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XCoinWeb = exports.XCoin = exports.EconomyWeb = exports.EconomyX = void 0;
const event_1 = require("bdsx/event");
const _1 = require(".");
const __1 = require("..");
const path = require("path");
const fs = require("fs");
let economy = {};
const economyPath = path.join(__dirname, "..", "economy.json");
try {
    economy = require(economyPath);
}
catch (err) {
    if (err) {
        __1.send.error(`economy.json Error! ${err}`);
        throw err;
    }
}
/**Economy-X. */
var EconomyX;
(function (EconomyX) {
    /**Get currency. */
    function currency() {
        return _1.EconomyConfig.getCurrency();
    }
    EconomyX.currency = currency;
    /**Add player data. */
    function addPlayer(player) {
        if (player.getXuid() === "")
            return false;
        if (economy.hasOwnProperty(player.getXuid()))
            return false;
        economy[player.getXuid()] = {
            money: 0,
            xcoin: 0,
        };
        return true;
    }
    EconomyX.addPlayer = addPlayer;
    /**Get player data. */
    function getPlayer(player) {
        if (!economy.hasOwnProperty(player.getXuid()))
            return null;
        return economy[player.getXuid()];
    }
    EconomyX.getPlayer = getPlayer;
    /**Add player money. */
    function addMoney(player, amount) {
        if (player.getXuid() === "")
            return false;
        if (!economy.hasOwnProperty(player.getXuid()))
            addPlayer(player);
        if (amount < 0 || amount === 0)
            return false;
        let data = economy[player.getXuid()];
        data.money = data.money + amount;
        return true;
    }
    EconomyX.addMoney = addMoney;
    /**Remove player money. */
    function removeMoney(player, amount) {
        if (player.getXuid() === "")
            return false;
        if (!economy.hasOwnProperty(player.getXuid()))
            addPlayer(player);
        if (amount < 0 || amount === 0)
            return false;
        let data = economy[player.getXuid()];
        if (data.money - amount < 0) {
            data.money = 0;
            return true;
        }
        data.money = data.money - amount;
        return true;
    }
    EconomyX.removeMoney = removeMoney;
    /**Set player money. */
    function setMoney(player, amount) {
        if (player.getXuid() === "")
            return false;
        if (economy.hasOwnProperty(player.getXuid()) === false)
            addPlayer(player);
        if (amount < 0)
            return false;
        let data = economy[player.getXuid()];
        data.money = amount;
        return true;
    }
    EconomyX.setMoney = setMoney;
    /**Get player money. */
    function getMoney(player) {
        if (player.getXuid() === undefined)
            return -1;
        if (economy.hasOwnProperty(player.getXuid()) === false)
            addPlayer(player);
        let data = economy[player.getXuid()];
        return data.money;
    }
    EconomyX.getMoney = getMoney;
    /**Transfer money player to target. */
    function transfer(player, target, amount) {
        if (player.getXuid() === "")
            return false;
        if (target.getXuid() === "")
            return false;
        if (!economy.hasOwnProperty(player.getXuid()))
            addPlayer(player);
        if (!economy.hasOwnProperty(target.getXuid()))
            addPlayer(target);
        let data1 = economy[player.getXuid()];
        let data2 = economy[target.getXuid()];
        if (amount < 0 || amount === 0)
            return false;
        if (data1.money - amount < 0) {
            data2.money += data1.money;
            data1.money = 0;
            return false;
        }
        data1.money -= amount;
        data2.money += amount;
        return true;
    }
    EconomyX.transfer = transfer;
    /**Save. */
    function save(message = false) {
        fs.writeFile(economyPath, JSON.stringify(economy, null, 2), "utf8", (err) => {
            if (message) {
                if (err) {
                    __1.send.error(`economy.json Error! ${err}`);
                    throw err;
                }
                else
                    __1.send.success(`economy.json Saved!`);
            }
        });
    }
    EconomyX.save = save;
})(EconomyX = exports.EconomyX || (exports.EconomyX = {}));
var EconomyWeb;
(function (EconomyWeb) {
    /**Check player data. */
    function check(xuid) {
        return economy.hasOwnProperty(xuid);
    }
    EconomyWeb.check = check;
    /**Get player data. */
    function getPlayer(xuid) {
        if (!economy.hasOwnProperty(xuid))
            return null;
        return economy[xuid];
    }
    EconomyWeb.getPlayer = getPlayer;
    /**Add player money. */
    function addMoney(xuid, amount) {
        if (!economy.hasOwnProperty(xuid))
            return false;
        if (amount < 0 || amount === 0)
            false;
        let data = economy[xuid];
        data.money += amount;
        return true;
    }
    EconomyWeb.addMoney = addMoney;
    /**Remove player money. */
    function removeMoney(xuid, amount) {
        if (!economy.hasOwnProperty(xuid))
            return false;
        if (amount < 0 || amount === 0)
            return false;
        let data = economy[xuid];
        if (data.money - amount < 0) {
            data.money = 0;
            return true;
        }
        data.money -= amount;
        return true;
    }
    EconomyWeb.removeMoney = removeMoney;
    /**Set player money. */
    function setMoney(xuid, amount) {
        if (!economy.hasOwnProperty(xuid))
            return false;
        if (amount < 0)
            return false;
        let data = economy[xuid];
        data.money = amount;
        return true;
    }
    EconomyWeb.setMoney = setMoney;
    /**Get player money. */
    function getMoney(xuid) {
        if (!economy.hasOwnProperty(xuid))
            return -1;
        let data = economy[xuid];
        return data.money;
    }
    EconomyWeb.getMoney = getMoney;
})(EconomyWeb = exports.EconomyWeb || (exports.EconomyWeb = {}));
var XCoin;
(function (XCoin) {
    /**Get player X-Coin. */
    function get(player) {
        if (player.getXuid() === "")
            return -1;
        if (!economy.hasOwnProperty(player.getXuid()))
            EconomyX.addPlayer(player);
        let data = economy[player.getXuid()];
        return data.xcoin;
    }
    XCoin.get = get;
    /**Add player X-Coin. */
    function add(player, amount) {
        if (player.getXuid() === "")
            return false;
        if (!economy.hasOwnProperty(player.getXuid()))
            EconomyX.addPlayer(player);
        if (amount < 0 || amount === 0)
            return false;
        let data = economy[player.getXuid()];
        data.xcoin += amount;
        return true;
    }
    XCoin.add = add;
    /**Remove player X-Coin. */
    function remove(player, amount) {
        if (player.getXuid() === "")
            return false;
        if (!economy.hasOwnProperty(player.getXuid()))
            EconomyX.addPlayer(player);
        if (amount < 0 || amount === 0)
            return false;
        let data = economy[player.getXuid()];
        if (data.xcoin - amount < 0) {
            data.xcoin = 0;
            return true;
        }
        data.xcoin -= amount;
        return true;
    }
    XCoin.remove = remove;
    /**Set player X-Coin. */
    function set(player, amount) {
        if (player.getXuid() === "")
            return false;
        if (!economy.hasOwnProperty(player.getXuid()))
            EconomyX.addPlayer(player);
        if (amount < 0)
            return false;
        let data = economy[player.getXuid()];
        data.xcoin = amount;
        return true;
    }
    XCoin.set = set;
})(XCoin = exports.XCoin || (exports.XCoin = {}));
var XCoinWeb;
(function (XCoinWeb) {
    /**Get player X-Coin. */
    function get(xuid) {
        if (!economy.hasOwnProperty(xuid))
            return -1;
        const data = economy[xuid];
        return data.xcoin;
    }
    XCoinWeb.get = get;
    /**Add player X-Coin. */
    function add(xuid, amount) {
        if (!economy.hasOwnProperty(xuid))
            return false;
        if (amount < 0 || amount === 0)
            return false;
        let data = economy[xuid];
        data.xcoin += amount;
        return true;
    }
    XCoinWeb.add = add;
    /**Remove player X-Coin. */
    function remove(xuid, amount) {
        if (!economy.hasOwnProperty(xuid))
            return false;
        if (amount < 0 || amount === 0)
            return false;
        let data = economy[xuid];
        if (data.xcoin - amount < 0) {
            data.xcoin = 0;
            return true;
        }
        data.xcoin -= amount;
        return true;
    }
    XCoinWeb.remove = remove;
    /**Set player X-Coin. */
    function set(xuid, amount) {
        if (!economy.hasOwnProperty(xuid))
            return false;
        if (amount < 0)
            return false;
        let data = economy[xuid];
        data.xcoin = amount;
        return true;
    }
    XCoinWeb.set = set;
})(XCoinWeb = exports.XCoinWeb || (exports.XCoinWeb = {}));
event_1.events.playerJoin.on((ev) => {
    EconomyX.addPlayer(ev.player);
});
event_1.events.serverStop.on(() => EconomyX.save());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNvbm9teS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVjb25vbXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esc0NBQW9DO0FBQ3BDLHdCQUFrQztBQUNsQywwQkFBMEI7QUFDMUIsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQU96QixJQUFJLE9BQU8sR0FBZ0MsRUFBRSxDQUFDO0FBRTlDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztBQUUvRCxJQUFJO0lBQ0EsT0FBTyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztDQUNsQztBQUFDLE9BQU0sR0FBRyxFQUFFO0lBQ1QsSUFBSSxHQUFHLEVBQUU7UUFDTCxRQUFJLENBQUMsS0FBSyxDQUFDLHVCQUF1QixHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sR0FBRyxDQUFDO0tBQ2I7Q0FDSjtBQUVELGdCQUFnQjtBQUNoQixJQUFpQixRQUFRLENBK0d4QjtBQS9HRCxXQUFpQixRQUFRO0lBQ3JCLG1CQUFtQjtJQUNuQixTQUFnQixRQUFRO1FBQ3BCLE9BQU8sZ0JBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRmUsaUJBQVEsV0FFdkIsQ0FBQTtJQUVELHNCQUFzQjtJQUN0QixTQUFnQixTQUFTLENBQUMsTUFBb0I7UUFDMUMsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzFDLElBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUUzRCxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUc7WUFDeEIsS0FBSyxFQUFFLENBQUM7WUFDUixLQUFLLEVBQUUsQ0FBQztTQUNYLENBQUM7UUFDRixPQUFPLElBQUksQ0FBQztJ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