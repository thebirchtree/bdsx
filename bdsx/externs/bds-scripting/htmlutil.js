"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlSearcher = exports.htmlutil = exports.HtmlRule = void 0;
const https = require("https");
const node_html_parser_1 = require("node-html-parser");
class HtmlRule {
    constructor(filter) {
        this.filter = filter;
        this.finally = [];
    }
}
exports.HtmlRule = HtmlRule;
var htmlutil;
(function (htmlutil) {
    function* childrenFilter(node, opts) {
        let i = 0;
        for (const child of node.childNodes) {
            if (!(child instanceof node_html_parser_1.HTMLElement))
                continue;
            if (check(child, opts, i)) {
                yield child;
            }
            i++;
        }
    }
    htmlutil.childrenFilter = childrenFilter;
    function get(node, opt) {
        switch (typeof opt) {
            case "number":
                for (const child of node.childNodes) {
                    if (opt === 0) {
                        return child;
                    }
                    opt--;
                }
                break;
            case "string":
                opt = opt.toUpperCase();
                for (const child of node.childNodes) {
                    if (child instanceof node_html_parser_1.HTMLElement && child.tagName === opt) {
                        return child;
                    }
                }
                break;
            case "function":
                for (const child of node.childNodes) {
                    if (child instanceof node_html_parser_1.HTMLElement && opt(child))
                        return child;
                }
                break;
            default:
                if (opt instanceof Array) {
                    for (const filter of opt) {
                        const item = get(node, filter);
                        if (item !== null)
                            return item;
                    }
                }
                else {
                    if (opt.tag)
                        opt.tag = opt.tag.toUpperCase();
                    for (const child of node.childNodes) {
                        if (opt.type !== undefined && child.nodeType !== opt.type)
                            continue;
                        if (child instanceof node_html_parser_1.HTMLElement) {
                            if (opt.id && child.id !== opt.id)
                                continue;
                            if (opt.class && child.classNames.indexOf(opt.class) === -1)
                                continue;
                            if (opt.tag && child.tagName !== opt.tag)
                                continue;
                        }
                        else {
                            if (opt.id || opt.class || opt.tag)
                                continue;
                        }
                        return child;
                    }
                }
                break;
        }
        return null;
    }
    htmlutil.get = get;
    function follow(node, ...opts) {
        for (const opt of opts) {
            const child = get(node, opt);
            if (child === null)
                return null;
            node = child;
        }
        return node;
    }
    htmlutil.follow = follow;
    function check(node, opt, index) {
        switch (typeof opt) {
            case "number":
                return index === opt;
            case "string":
                return node.nodeType === node_html_parser_1.NodeType.ELEMENT_NODE && node.tagName === opt.toUpperCase();
            case "function":
                return node.nodeType === node_html_parser_1.NodeType.ELEMENT_NODE && !!opt(node);
            default:
                if (opt instanceof Array) {
                    for (const filter of opt) {
                        if (check(node, filter))
                            return true;
                    }
                    return false;
                }
                else {
                    if (opt.type !== undefined && node.nodeType !== opt.type)
                        return false;
                    if (node instanceof node_html_parser_1.HTMLElement) {
                        if (opt.id && node.id !== opt.id)
                            return false;
                        if (opt.class && node.classNames.indexOf(opt.class) === -1)
                            return false;
                        if (opt.tag && node.tagName !== opt.tag.toUpperCase())
                            return false;
                    }
                    else {
                        if (opt.id || opt.class || opt.tag)
                            return false;
                    }
                    return true;
                }
        }
    }
    htmlutil.check = check;
    function checks(node, opt, ...opts) {
        if (!check(node, opt))
            return null;
        return follow(node, ...opts);
    }
    htmlutil.checks = checks;
    function tableToObject(table) {
        const out = [];
        const keys = [];
        for (const row of htmlutil.childrenFilter(table, "tr")) {
            let i = 0;
            const obj = {};
            let isCell = false;
            for (const cell of htmlutil.childrenFilter(row, ["td", "th"])) {
                if (cell.tagName === "TH") {
                    keys[i] = cell.innerText.replace(/ /g, "");
                }
                else {
                    if (cell.childNodes.length !== 0) {
                        const column = (obj[keys[i]] = {
                            text: cell.childNodes[0].innerText,
                        });
                        isCell = true;
                        const searcher = new HtmlSearcher(cell);
                        try {
                            column.table = htmlutil.tableToObject(searcher.search("table"));
                        }
                        catch (err) {
                            if (err !== HtmlSearcher.EOF)
                                throw err;
                        }
                    }
                }
                i++;
            }
            if (isCell) {
                out.push(obj);
            }
        }
        return out;
    }
    htmlutil.tableToObject = tableToObject;
    function wgetText(url) {
        return new Promise((resolve, reject) => {
            https
                .get(url, res => {
                let text = "";
                res.on("data", data => {
                    text += data.toString();
                });
                res.on("end", () => {
                    resolve(text);
                });
                res.on("error", reject);
            })
                .on("error", reject);
        });
    }
    htmlutil.wgetText = wgetText;
    async function wgetElement(url, ...followFilter) {
        const out = (0, node_html_parser_1.parse)(await wgetText(url));
        return follow(out, ...followFilter);
    }
    htmlutil.wgetElement = wgetElement;
})(htmlutil = exports.htmlutil || (exports.htmlutil = {}));
class HtmlSearcher {
    constructor(base) {
        this.base = base;
        this.index = -1;
        this.rules = [];
        this.queue = [];
    }
    current() {
        return this.base.childNodes[this.index];
    }
    nextIf(filter) {
        const oldidx = this.index;
        const element = this.next();
        if (!htmlutil.check(element, filter)) {
            this.index = oldidx;
            return null;
        }
        return element;
    }
    next() {
        for (;;) {
            const node = this.base.childNodes[++this.index];
            if (!node)
                throw HtmlSearcher.EOF;
            if (node.nodeType !== node_html_parser_1.NodeType.ELEMENT_NODE)
                continue;
            const element = node;
            for (let i = this.rules.length - 1; i >= 0; i--) {
                const rule = this.rules[i];
                if (htmlutil.check(element, rule.filter))
                    throw rule;
            }
            return element;
        }
    }
    search(filter) {
        for (;;) {
            const node = this.next();
            if (htmlutil.check(node, filter))
                return node;
        }
    }
    searchTableAsObject() {
        return htmlutil.tableToObject(this.search("table"));
    }
    searchHead() {
        for (;;) {
            const node = this.search(node => htmlutil.checks(node, { tag: "h1", class: "anchored-heading" }));
            const textNode = htmlutil.get(node, { type: node_html_parser_1.NodeType.TEXT_NODE });
            if (textNode === null) {
                console.error(`unexpected html: ${node.innerHTML}`);
                continue;
            }
            return textNode.rawText;
        }
    }
    async inside(target, fn) {
        this.enter(target);
        try {
            await fn();
        }
        catch (err) {
            if (err === HtmlSearcher.EOF)
                return;
            throw err;
        }
        this.leave();
    }
    onexit(final) {
        const last = this.rules[this.rules.length - 1];
        last.finally.push(final);
    }
    enter(target) {
        this.queue.push([this.base, this.index]);
        this.base = target;
        this.index = -1;
    }
    leave() {
        const last = this.queue.pop();
        if (!last)
            throw Error("Out of bounds");
        this.base = last[0];
        this.index = last[1];
    }
}
exports.HtmlSearcher = HtmlSearcher;
HtmlSearcher.EOF = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbHV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJodG1sdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBK0I7QUFDL0IsdURBQTZGO0FBRTdGLE1BQWEsUUFBUTtJQUNqQixZQUE0QixNQUF1QjtRQUF2QixXQUFNLEdBQU4sTUFBTSxDQUFpQjtRQUNuQyxZQUFPLEdBQW1DLEVBQUUsQ0FBQztJQURQLENBQUM7Q0FFMUQ7QUFIRCw0QkFHQztBQUVELElBQWlCLFFBQVEsQ0E0SnhCO0FBNUpELFdBQWlCLFFBQVE7SUFHckIsUUFBZSxDQUFDLENBQUMsY0FBYyxDQUFDLElBQVUsRUFBRSxJQUFZO1FBQ3BELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLEtBQUssTUFBTSxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQyxJQUFJLENBQUMsQ0FBQyxLQUFLLFlBQVksOEJBQVcsQ0FBQztnQkFBRSxTQUFTO1lBQzlDLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3ZCLE1BQU0sS0FBSyxDQUFDO2FBQ2Y7WUFDRCxDQUFDLEVBQUUsQ0FBQztTQUNQO0lBQ0wsQ0FBQztJQVRnQix1QkFBYyxpQkFTOUIsQ0FBQTtJQUNELFNBQWdCLEdBQUcsQ0FBQyxJQUFVLEVBQUUsR0FBVztRQUN2QyxRQUFRLE9BQU8sR0FBRyxFQUFFO1lBQ2hCLEtBQUssUUFBUTtnQkFDVCxLQUFLLE1BQU0sS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7b0JBQ2pDLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRTt3QkFDWCxPQUFPLEtBQUssQ0FBQztxQkFDaEI7b0JBQ0QsR0FBRyxFQUFFLENBQUM7aUJBQ1Q7Z0JBQ0QsTUFBTTtZQUNWLEtBQUssUUFBUTtnQkFDVCxHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUN4QixLQUFLLE1BQU0sS0FBSyxJ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