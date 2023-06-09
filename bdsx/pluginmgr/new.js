"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = require("child_process");
const colors = require("colors");
const fs = require("fs");
const path = require("path");
const fsutil_1 = require("../fsutil");
if (process.argv[2] == null) {
    console.error(colors.red(`[BDSX-Plugins] Please provide an argument for the target path of the new plugin`));
    process.exit(-1);
}
const targetPath = path.resolve(process.argv[2]);
if (fs.existsSync(targetPath)) {
    console.error(colors.red(`[BDSX-Plugins] '${targetPath}' directory already exists`));
    console.error(colors.red(`[BDSX-Plugins] Please execute it with a new path`));
    process.exit(0);
}
function mkdirRecursiveSync(dirpath) {
    try {
        fs.mkdirSync(dirpath);
        return;
    }
    catch (err) {
        if (err.code === "EEXIST")
            return;
        if (["EACCES", "EPERM", "EISDIR"].indexOf(err.code) !== -1)
            throw err;
    }
    mkdirRecursiveSync(path.dirname(dirpath));
    fs.mkdirSync(dirpath);
}
mkdirRecursiveSync(targetPath);
const basename = path.basename(targetPath);
const targetdir = targetPath + path.sep;
// index.ts
{
    const clsname = camelize(basename);
    const exampleSource = `
import { events } from "bdsx/event";

console.log('[plugin:${clsname}] allocated');

events.serverOpen.on(()=>{
    console.log('[plugin:${clsname}] launching');
});

events.serverClose.on(()=>{
    console.log('[plugin:${clsname}] closed');
});

`;
    fs.writeFileSync(`${targetdir}index.ts`, exampleSource, "utf-8");
}
// package.json
{
    const mainPackageJson = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
    const bdsxPath = path.resolve("./bdsx");
    const srcdeps = mainPackageJson.devDependencies;
    const destdeps = {};
    const inherites = ["@types/node", "@typescript-eslint/eslint-plugin", "@typescript-eslint/parser", "eslint", "typescript"];
    for (const dep of inherites) {
        const version = srcdeps[dep];
        if (version == null) {
            console.error(colors.red(`[BDSX-Plugins] package.json/devDependencies does not have '${dep}'`));
        }
        else {
            destdeps[dep] = srcdeps[dep];
        }
    }
    destdeps.bdsx = `file:${path.relative(targetPath, bdsxPath).replace(/\\/g, "/")}`;
    const examplejson = {
        name: `@bdsx/${basename}`,
        version: "1.0.0",
        description: "",
        main: "index.js",
        keywords: [],
        author: "",
        license: "ISC",
        bdsxPlugin: true,
        scripts: {
            build: "tsc",
            watch: "tsc -w",
            prepare: "tsc || exit 0",
        },
        devDependencies: destdeps,
    };
    fsutil_1.fsutil.writeJsonSync(`${targetdir}package.json`, examplejson);
}
// tsconfig.json
{
    const tsconfig = JSON.parse(fs.readFileSync("./tsconfig.json", "utf-8"));
    delete tsconfig.exclude;
    tsconfig.compilerOptions.declaration = true;
    fsutil_1.fsutil.writeJsonSync(`${targetdir}tsconfig.json`, tsconfig);
}
// .npmignore
{
    const npmignore = `
*.ts
!*.d.ts
`;
    fs.writeFileSync(`${targetdir}.npmignore`, npmignore, "utf-8");
}
// .gitignore
{
    const gitignore = `
/node_modules
*.js
*.d.ts
`;
    fs.writeFileSync(`${targetdir}.gitignore`, gitignore, "utf-8");
}
// .eslintrc.json
{
    const eslint = {
        root: true,
        parser: "@typescript-eslint/parser",
        parserOptions: {
            ecmaVersion: 2017,
            sourceType: "module",
        },
        ignorePatterns: ["**/*.js"],
        plugins: ["@typescript-eslint", "import"],
        rules: {
            "no-restricted-imports": [
                "error",
                {
                    patterns: [
                        {
                            group: ["**/bdsx/*", "!/bdsx/*"],
                            message: "Please use the absolute path for bdsx libraries.",
                        },
                    ],
                },
            ],
        },
    };
    fsutil_1.fsutil.writeJsonSync(`${targetdir}.eslintrc.json`, eslint);
}
// README.md
{
    const readme = `
# ${basename} Plugin
The plugin for bdsx
`;
    fs.writeFileSync(`${targetdir}README.md`, readme, "utf-8");
}
function camelize(context) {
    const reg = /[a-zA-Z]+/g;
    let out = "";
    for (;;) {
        const matched = reg.exec(context);
        if (matched === null)
            return out;
        const word = matched[0];
        out += word.charAt(0).toLocaleUpperCase() + word.substr(1);
    }
}
const currentdir = process.cwd();
process.chdir(targetdir);
child_process.execSync("npm i", { stdio: "inherit" });
process.chdir(currentdir);
let rpath = path.relative(currentdir, targetdir).replace(/\\/g, "/");
if (!rpath.startsWith("."))
    rpath = `./${rpath}`;
child_process.execSync(`npm i "${rpath}"`, { stdio: "inherit" });
console.log(`[BDSX-Plugins] Generated at ${targetPath}`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQStDO0FBQy9DLGlDQUFpQztBQUNqQyx5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLHNDQUFtQztBQUVuQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFO0lBQ3pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxpRkFBaUYsQ0FBQyxDQUFDLENBQUM7SUFDN0csT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3BCO0FBQ0QsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakQsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0lBQzNCLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsVUFBVSw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7SUFDckYsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGtEQUFrRCxDQUFDLENBQUMsQ0FBQztJQUM5RSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ25CO0FBRUQsU0FBUyxrQkFBa0IsQ0FBQyxPQUFlO0lBQ3ZDLElBQUk7UUFDQSxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RCLE9BQU87S0FDVjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1YsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLFFBQVE7WUFBRSxPQUFPO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FB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