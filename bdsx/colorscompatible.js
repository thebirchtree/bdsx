"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * for changing colors to chalk.
 * not using currently
 */
const chalk = require("chalk");
const colors = require("colors");
const colorsKeys = ["strip", "stripColors", "rainbow", "zebra", "america", "trap", "random", "zalgo"];
const mixedKeys = [
    "black",
    "red",
    "green",
    "yellow",
    "blue",
    "magenta",
    "cyan",
    "white",
    "gray",
    "grey",
    "bgBlack",
    "bgRed",
    "bgGreen",
    "bgYellow",
    "bgBlue",
    "bgMagenta",
    "bgCyan",
    "bgWhite",
    "reset",
    "bold",
    "dim",
    "italic",
    "underline",
    "inverse",
    "hidden",
    "strikethrough",
];
/**
 * @deprecated it will be removed someday. Please use chalk directly
 */
function chalkToColors(chalk) {
    for (const key of colorsKeys) {
        chalk[key] = colors[key];
    }
    for (const key of mixedKeys) {
        chalk[key] = chalkToColors(chalk[key]);
    }
    return chalk;
}
// declare module 'colors'
// {
//     /** @deprecated bdsx will use chalk module */
//     export const brightRed:chalk.Chalk;
//     /** @deprecated bdsx will use chalk module */
//     export const brightGreen:Color;
//     /** @deprecated bdsx will use chalk module */
//     export const brightYellow:chalk.Chalk;
//     /** @deprecated bdsx will use chalk module */
//     export const brightBlue:Color;
//     /** @deprecated bdsx will use chalk module */
//     export const brightMagenta:Color;
//     /** @deprecated bdsx will use chalk module */
//     export const brightCyan:Color;
//     /** @deprecated bdsx will use chalk module */
//     export const brightWhite:chalk.Chalk;
// }
/*
compatible for events.serverLog
using chalk as colors
colors.brightRed === chalk.redBright, makes it true
*/
colors.brightRed = chalkToColors(chalk.redBright);
colors.brightWhite = chalkToColors(chalk.whiteBright);
colors.brightYellow = chalkToColors(chalk.yellowBright);
colors.white = chalkToColors(chalk.white);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3JzY29tcGF0aWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbG9yc2NvbXBhdGlibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7O0dBR0c7QUFDSCwrQkFBK0I7QUFDL0IsaUNBQWlDO0FBRWpDLE1BQU0sVUFBVSxHQUFHLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBVSxDQUFDO0FBQy9HLE1BQU0sU0FBUyxHQUFHO0lBQ2QsT0FBTztJQUNQLEtBQUs7SUFDTCxPQUFPO0lBQ1AsUUFBUTtJQUNSLE1BQU07SUFDTixTQUFTO0lBQ1QsTUFBTTtJQUNOLE9BQU87SUFDUCxNQUFNO0lBQ04sTUFBTTtJQUNOLFNBQVM7SUFDVCxPQUFPO0lBQ1AsU0FBUztJQUNULFVBQVU7SUFDVixRQUFRO0lBQ1IsV0FBVztJQUNYLFFBQVE7SUFDUixTQUFTO0lBRVQsT0FBTztJQUNQLE1BQU07SUFDTixLQUFLO0lBQ0wsUUFBUTtJQUNSLFdBQVc7SUFDWCxTQUFTO0lBQ1QsUUFBUTtJQUNSLGVBQWU7Q0FDVCxDQUFDO0FBNENYOztHQUVHO0FBQ0gsU0FBUyxhQUFhLENBQUMsS0FBa0I7SUFDckMsS0FBSyxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUU7UUFDekIsS0FBcUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDN0M7SUFDRCxLQUFLLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRTtRQUN4QixLQUFxQixDQUFDLEdBQUcsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUMzRDtJQUNELE9BQU8sS0FBb0IsQ0FBQztBQUNoQyxDQUFDO0FBRUQsMEJBQTBCO0FBQzFCLElBQUk7QUFDSixvREFBb0Q7QUFDcEQsMENBQTBDO0FBQzFDLG9EQUFvRDtBQUNwRCxzQ0FBc0M7QUFDdEMsb0RBQW9EO0FBQ3BELDZDQUE2QztBQUM3QyxvREFBb0Q7QUFDcEQscUNBQXFDO0FBQ3JDLG9EQUFvRDtBQUNwRCx3Q0FBd0M7QUFDeEMsb0RBQW9EO0FBQ3BELHFDQUFxQztBQUNyQyxvREFBb0Q7QUFDcEQsNENBQTRDO0FBQzVDLElBQUk7QUFFSjs7OztFQUlFO0FBRUQsTUFBYyxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzFELE1BQWMsQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM5RCxNQUFjLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDaEUsTUFBYyxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDIn0=