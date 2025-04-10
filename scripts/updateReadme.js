const fs = require("fs");
const path = require("path");

const REPO_ROOT = path.resolve(__dirname, "..");
const PROJECT_DIR = REPO_ROOT;
const README_PATH = path.join(REPO_ROOT, "README.md");

function getProjectFolders() {
    const allItems = fs.readdirSync(PROJECT_DIR, { withFileTypes: true });
    return allItems
        .filter(item => item.isDirectory() && !item.name.startsWith(".") && item.name !== "scripts" && item.name !== "node_modules")
        .map(dir => ({
            name: dir.name,
            path: path.join(PROJECT_DIR, dir.name),
            mtime: fs.statSync(path.join(PROJECT_DIR, dir.name)).mtime,
        }))
        .sort((a, b) => b.mtime - a.mtime)
        .slice(0, 3); // 3 most recent
}

function updateReadme() {
    const readme = fs.readFileSync(README_PATH, "utf8");

    const startTag = "<!-- projects-start -->";
    const endTag = "<!-- projects-end -->";

    const startIndex = readme.indexOf(startTag) + startTag.length;
    const endIndex = readme.indexOf(endTag);

    const projects = getProjectFolders();

    const table = [
        `| 🚧 Project | 📄 Description | ✅ Status |`,
        `|------------|----------------|-----------|`,
        ...projects.map(p =>
            `| [**${p.name}**](./${p.name}) | Description pending. | 🟡 Unknown |`
        )
    ].join("\n");

    const newReadme =
        readme.slice(0, startIndex) +
        "\n" +
        table +
        "\n" +
        readme.slice(endIndex);

    fs.writeFileSync(README_PATH, newReadme);
}

updateReadme();
