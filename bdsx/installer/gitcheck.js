"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitCheck = void 0;
const child_process = require("child_process");
const colors = require("colors");
const fsutil_1 = require("../fsutil");
const projectDir = fsutil_1.fsutil.projectPath;
const DEFAULT_OPTS = { cwd: projectDir, encoding: "ascii" };
let gitVersion;
var git;
(function (git) {
    function isRepository() {
        try {
            return child_process.execSync("git rev-parse --is-inside-work-tree", DEFAULT_OPTS).trim() === "true";
        }
        catch (err) {
            return false;
        }
    }
    git.isRepository = isRepository;
    function version() {
        if (gitVersion !== undefined)
            return gitVersion;
        try {
            let res = child_process.execSync("git --version", DEFAULT_OPTS).trim();
            const numidx = res.search(/\d/);
            if (numidx !== -1) {
                res = res.substr(numidx);
            }
            gitVersion = res.split(".");
        }
        catch (err) {
            gitVersion = null;
        }
        return gitVersion;
    }
    git.version = version;
    function checkVersion(major, minor) {
        const v = version();
        if (v === null)
            return false;
        let diff = +v[0] - major;
        if (diff !== 0)
            return diff > 0;
        diff = +v[1] - minor;
        return diff >= 0;
    }
    git.checkVersion = checkVersion;
    function currentBranch() {
        try {
            return child_process.execSync("git rev-parse --abbrev-ref HEAD", DEFAULT_OPTS).trim();
        }
        catch (err) {
            return null;
        }
    }
    git.currentBranch = currentBranch;
    function upstream() {
        try {
            const upstream = child_process.execSync("git rev-parse --abbrev-ref --symbolic-full-name @{u}", DEFAULT_OPTS).trim();
            return upstream === "" ? null : upstream;
        }
        catch (err) {
            return null;
        }
    }
    git.upstream = upstream;
    function remoteUpdate(remote) {
        child_process.execSync(`git remote update ${remote}`, {
            cwd: projectDir,
            stdio: "inherit",
        });
    }
    git.remoteUpdate = remoteUpdate;
    function mergeBaseSha1(upstream) {
        return child_process.execSync(`git merge-base HEAD ${upstream}`, DEFAULT_OPTS).trim();
    }
    git.mergeBaseSha1 = mergeBaseSha1;
    function remoteSha1(upstream) {
        return child_process.execSync(`git rev-parse ${upstream}`, DEFAULT_OPTS).trim();
    }
    git.remoteSha1 = remoteSha1;
    function remoteBranches() {
        const remote = child_process.execSync("git branch -r", DEFAULT_OPTS).trim();
        if (remote === "")
            return [];
        return remote.split("\n").map(name => name.split("->")[0].trim());
    }
    git.remoteBranches = remoteBranches;
})(git || (git = {}));
function warn(message) {
    console.error(colors.yellow("[BDSX/GIT] " + message));
}
async function gitCheck() {
    var _a;
    switch ((_a = process.env.BDSX_SKIP_GIT_CHECK) === null || _a === void 0 ? void 0 : _a.toLowerCase()) {
        case "y":
        case "yes":
        case "true":
            return;
    }
    if (git.version() === null) {
        warn("GIT not found");
        warn("We recommend using GIT for the BDSX project");
        return;
    }
    if (!git.isRepository()) {
        warn("The project is not a git repository");
        warn("We recommend using GIT for the BDSX project");
        return;
    }
    let upstream = git.upstream();
    if (upstream === null) {
        warn("The project has no upstream branch");
        const branchName = git.currentBranch();
        if (branchName === null) {
            warn("The branch not found");
            return;
        }
        else if (branchName === "master") {
            if (git.remoteBranches().indexOf("origin/master") === -1) {
                return; // no origin
            }
            upstream = "origin/master";
        }
        else {
            return;
        }
    }
    git.remoteUpdate(upstream.split("/")[0]);
    const mergeBase = git.mergeBaseSha1(upstream);
    if (mergeBase === "") {
        warn("Unrelated histories with upstream");
    }
    else {
        const remote = git.remoteSha1(upstream);
        if (mergeBase !== remote) {
            warn("The project is not up-to-date");
            warn("Use 'git pull' to update the project");
        }
    }
}
exports.gitCheck = gitCheck;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0Y2hlY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnaXRjaGVjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQ0FBK0M7QUFDL0MsaUNBQWlDO0FBQ2pDLHNDQUFtQztBQUVuQyxNQUFNLFVBQVUsR0FBRyxlQUFNLENBQUMsV0FBVyxDQUFDO0FBQ3RDLE1BQU0sWUFBWSxHQUFHLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsT0FBZ0IsRUFBRSxDQUFDO0FBRXJFLElBQUksVUFBdUMsQ0FBQztBQUU1QyxJQUFVLEdBQUcsQ0ErRFo7QUEvREQsV0FBVSxHQUFHO0lBQ1QsU0FBZ0IsWUFBWTtRQUN4QixJQUFJO1lBQ0EsT0FBTyxhQUFhLENBQUMsUUFBUSxDQUFDLHFDQUFxQyxFQUFFLFlBQVksQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLE1BQU0sQ0FBQztTQUN4RztRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1YsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBTmUsZ0JBQVksZUFNM0IsQ0FBQTtJQUNELFNBQWdCLE9BQU87UUFDbkIsSUFBSSxVQUFVLEtBQUssU0FBUztZQUFFLE9BQU8sVUFBVSxDQUFDO1FBRWhELElBQUk7WUFDQSxJQUFJLEdBQUcsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxZQUFZLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN2RSxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLElBQUksTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUNmLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzVCO1lBQ0QsVUFBVSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDL0I7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNWLFVBQVUsR0FBRyxJ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