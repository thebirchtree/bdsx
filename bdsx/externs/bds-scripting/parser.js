"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This script is the parser for bedrock scripting API documents.
 * but Bedrock scripting API is removed.
 */
const path = require("path");
const filewriter_1 = require("../../writer/filewriter");
const htmlutil_1 = require("./htmlutil");
async function writeTableKeyUnion(name, prefix, rows, key, value, writer) {
    await writer.write(`interface ${name}Map {\n`);
    const tabi = "    ";
    for (const row of rows) {
        const id = row[key].text;
        if (!id.startsWith(prefix)) {
            console.error(`   └ ${id}: Prefix is not ${prefix}`);
            continue;
        }
        const v = value(id);
        if (v === null)
            continue;
        await writer.write(`${tabi}${JSON.stringify(v)}:void;\n`);
    }
    await writer.write(`}\n`);
    await writer.write(`type ${name} = keyof ${name}Map;\n\n`);
}
const DOCURL_ADDONS = "https://bedrock.dev/docs/stable/Addons";
const OUT_ADDONS = path.join(__dirname, "../generated.addons.d.ts");
const TOP_COMMENT = `/**
 * Generated based on https://bedrock.dev/docs/stable/Addons
 * Please check bdsx/bds-scripting/parser.ts
 * Please DO NOT modify this directly.
 */
declare global {
`;
async function parseAddonsDoc() {
    console.log("# Parse Addons Document");
    const base = await htmlutil_1.htmlutil.wgetElement(DOCURL_ADDONS, "html", "body", "div", "div", "div", "div", "div");
    if (base === null) {
        console.error(`Addons: Target element not found`);
        return;
    }
    const s = new htmlutil_1.HtmlSearcher(base);
    let blockParsed = false;
    const writer = new filewriter_1.FileWriter(OUT_ADDONS);
    await writer.write(TOP_COMMENT);
    try {
        for (;;) {
            const id = s.searchHead();
            switch (id) {
                case "Blocks": {
                    if (blockParsed)
                        break;
                    blockParsed = true;
                    const table = s.searchTableAsObject();
                    console.log(`${id} - ${table.length} items`);
                    await writeTableKeyUnion("BlockId", "minecraft:", table, "Name", v => v, writer);
                    break;
                }
                case "Entities": {
                    const table = s.searchTableAsObject();
                    console.log(`${id} - ${table.length} items`);
                    await writeTableKeyUnion("EntityId", "", table, "Identifier", v => `minecraft:${v}`, writer);
                    // await writeTableKeyUnion('EntityFullId', '', table, 'Identifier', row=>row.FullID.text, writer);
                    // await writeTableKeyUnion('EntityShortId', '', table, 'Identifier', row=>row.ShortID.text, writer);
                    break;
                }
                case "Items": {
                    const table = s.searchTableAsObject();
                    console.log(`${id} - ${table.length} items`);
                    await writeTableKeyUnion("ItemId", "", table, "Name", name => {
                        if (name.startsWith("item."))
                            return null;
                        return `minecraft:${name}`;
                    }, writer);
                    // await writeTableKeyUnion('ItemNumberId', '', table, 'Name', row=>row['ID'].text, writer);
                    break;
                }
                case "Entity Damage Source": {
                    const table = s.searchTableAsObject();
                    console.log(`${id} - ${table.length} items`);
                    await writeTableKeyUnion("MinecraftDamageSource", "", table, "DamageSource", v => v, writer);
                    break;
                }
                default:
                    console.log(`${id} - ignored`);
                    break;
            }
        }
    }
    catch (err) {
        if (err === htmlutil_1.HtmlSearcher.EOF)
            return;
        console.error(err && (err.stack || err));
    }
    finally {
        await writer.write("}\n");
        await writer.write("export {};\n");
        await writer.end();
    }
}
(async () => {
    await parseAddonsDoc();
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7OztHQUdHO0FBQ0gsNkJBQTZCO0FBQzdCLHdEQUFxRDtBQUNyRCx5Q0FBb0Q7QUFFcEQsS0FBSyxVQUFVLGtCQUFrQixDQUM3QixJQUFZLEVBQ1osTUFBYyxFQUNkLElBQTZCLEVBQzdCLEdBQVcsRUFDWCxLQUFvQyxFQUNwQyxNQUFrQjtJQUVsQixNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxJQUFJLFNBQVMsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQztJQUNwQixLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRTtRQUNwQixNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLG1CQUFtQixNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ3JELFNBQVM7U0FDWjtRQUNELE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxJQUFJO1lBQUUsU0FBUztRQUN6QixNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDN0Q7SUFDRCxNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxZQUFZLElBQUksVUFBVSxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUVELE1BQU0sYUFBYSxHQUFHLHdDQUF3QyxDQUFDO0FBRS9ELE1BQU0sVUFBVSxHQUFHLElB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