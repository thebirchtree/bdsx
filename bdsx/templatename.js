"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateName = void 0;
function templateName(name, ...templateParams) {
    let idx = templateParams.length;
    if (idx === 0)
        return name + "<>";
    idx--;
    if (templateParams[idx].endsWith(">"))
        templateParams[idx] += " ";
    return name + "<" + templateParams.join(",") + ">";
}
exports.templateName = templateName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVuYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGVtcGxhdGVuYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLFNBQWdCLFlBQVksQ0FBQyxJQUFZLEVBQUUsR0FBRyxjQUF3QjtJQUNsRSxJQUFJLEdBQUcsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDO0lBQ2hDLElBQUksR0FBRyxLQUFLLENBQUM7UUFBRSxPQUFPLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbEMsR0FBRyxFQUFFLENBQUM7SUFDTixJQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1FBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQztJQUNsRSxPQUFPLElBQUksR0FBRyxHQUFHLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDdkQsQ0FBQztBQU5ELG9DQU1DIn0=