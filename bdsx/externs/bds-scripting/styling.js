"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.styling = void 0;
const API_OBJECT_SUFFIX = " JS API Object";
const VAR_NAME = /^[a-zA-Z$_][a-zA-Z0-9$_]*$/;
var styling;
(function (styling) {
    function toCamelStyle(content, seperator, firstUpper) {
        const names = content.split(seperator).filter(v => v !== "");
        let out = names.shift();
        if (firstUpper)
            out = out.charAt(0).toUpperCase() + out.substr(1);
        else {
            if (/^[A-Z]*$/.test(out)) {
                out = out.toLowerCase();
            }
            else {
                out = out.charAt(0).toLowerCase() + out.substr(1);
            }
        }
        for (const name of names) {
            out += name.charAt(0).toUpperCase() + name.substr(1);
        }
        return out;
    }
    styling.toCamelStyle = toCamelStyle;
    function apiObjectNameToInterfaceName(id) {
        if (!id.endsWith(API_OBJECT_SUFFIX))
            return null;
        return (id = `I${id.substr(0, id.length - API_OBJECT_SUFFIX.length).replace(/ /g, "")}`);
    }
    styling.apiObjectNameToInterfaceName = apiObjectNameToInterfaceName;
    function toFieldName(name) {
        return VAR_NAME.test(name) ? name : JSON.stringify(name);
    }
    styling.toFieldName = toFieldName;
})(styling = exports.styling || (exports.styling = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0eWxpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTSxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQztBQUMzQyxNQUFNLFFBQVEsR0FBRyw0QkFBNEIsQ0FBQztBQUU5QyxJQUFpQixPQUFPLENBMEJ2QjtBQTFCRCxXQUFpQixPQUFPO0lBQ3BCLFNBQWdCLFlBQVksQ0FBQyxPQUFlLEVBQUUsU0FBMEIsRUFBRSxVQUFvQjtRQUMxRixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUM3RCxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFHLENBQUM7UUFDekIsSUFBSSxVQUFVO1lBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM3RDtZQUNELElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDdEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUMzQjtpQkFBTTtnQkFDSCxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3JEO1NBQ0o7UUFDRCxLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTtZQUN0QixHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hEO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBZmUsb0JBQVksZUFlM0IsQ0FBQTtJQUVELFNBQWdCLDRCQUE0QixDQUFDLEVBQVU7UUFDbkQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUNqRCxPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3RixDQUFDO0lBSGUsb0NBQTRCLCtCQUczQyxDQUFBO0lBRUQsU0FBZ0IsV0FBVyxDQUFDLElBQVk7UUFDcEMsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUZlLG1CQUFXLGNBRTFCLENBQUE7QUFDTCxDQUFDLEVBMUJnQixPQUFPLEdBQVAsZUFBTyxLQUFQLGVBQU8sUUEwQnZCIn0=