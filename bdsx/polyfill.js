"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (!Promise.prototype.finally) {
    Promise.prototype.finally = function (onfinally) {
        async function voiding(value) {
            if (!onfinally)
                return;
            onfinally();
            return value;
        }
        return this.then(voiding, voiding);
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWZpbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwb2x5ZmlsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU1BLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtJQUM1QixPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxVQUErQixTQUEyQztRQUNsRyxLQUFLLFVBQVUsT0FBTyxDQUFDLEtBQVU7WUFDN0IsSUFBSSxDQUFDLFNBQVM7Z0JBQUUsT0FBTztZQUN2QixTQUFTLEVBQUUsQ0FBQztZQUNaLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQztDQUNMIn0=