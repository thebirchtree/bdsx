"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubRelease = exports.GitHubClient = void 0;
const github = require("@actions/github");
const path = require("path");
const fsutil_1 = require("../fsutil");
class GitHubClient {
    constructor(githubToken) {
        this.api = github.getOctokit(githubToken).rest;
    }
    async createRelease(name, owner, repo, tag_name) {
        const resp = await this.api.repos.createRelease({
            name,
            owner,
            repo,
            tag_name,
        });
        return new GitHubRelease(this.api, resp, owner, repo);
    }
}
exports.GitHubClient = GitHubClient;
class GitHubRelease {
    constructor(api, release, owner, repo) {
        this.api = api;
        this.release = release;
        this.owner = owner;
        this.repo = repo;
    }
    async upload(file) {
        const content = await fsutil_1.fsutil.readFile(file, null);
        await this.api.repos.uploadReleaseAsset({
            url: this.release.data.upload_url,
            headers: {
                "content-length": content.length,
                "content-type": "application/octet-stream",
            },
            data: content,
            name: path.basename(file),
            owner: this.owner,
            repo: this.repo,
            release_id: this.release.data.id,
        });
    }
    async delete() {
        await this.api.repos.deleteRelease({
            owner: this.owner,
            repo: this.repo,
            release_id: this.release.data.id,
        });
    }
}
exports.GitHubRelease = GitHubRelease;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGlzaGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHVibGlzaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBDQUEwQztBQUcxQyw2QkFBNkI7QUFDN0Isc0NBQW1DO0FBRW5DLE1BQWEsWUFBWTtJQUdyQixZQUFZLFdBQW1CO1FBQzNCLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDbkQsQ0FBQztJQUVELEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBWSxFQUFFLEtBQWEsRUFBRSxJQUFZLEVBQUUsUUFBZ0I7UUFDM0UsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7WUFDNUMsSUFBSTtZQUNKLEtBQUs7WUFDTCxJQUFJO1lBQ0osUUFBUTtTQUNYLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFELENBQUM7Q0FDSjtBQWhCRCxvQ0FnQkM7QUFFRCxNQUFhLGFBQWE7SUFDdEIsWUFDcUIsR0FBd0IsRUFDeEIsT0FBc0UsRUFDdkUsS0FBYSxFQUNiLElBQVk7UUFIWCxRQUFHLEdBQUgsR0FBRyxDQUFxQjtRQUN4QixZQUFPLEdBQVAsT0FBTyxDQUErRDtRQUN2RSxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsU0FBSSxHQUFKLElBQUksQ0FBUTtJQUM3QixDQUFDO0lBRUosS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFZO1FBQ3JCLE1BQU0sT0FBTyxHQUFHLE1BQU0sZUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEQsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQztZQUNwQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVTtZQUNqQyxPQUFPLEVBQUU7Z0JBQ0wsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLE1BQU07Z0JBQ2hDLGNBQWMsRUFBRSwwQkFBMEI7YUFDN0M7WUFDRCxJQUFJLEVBQUUsT0FBYztZQUNwQixJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDekIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1NBQ25DLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTTtRQUNSLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO1lBQy9CLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtTQUNuQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUEvQkQsc0NBK0JDIn0=