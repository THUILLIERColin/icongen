const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const pkg = require("../package.json");

const DIST_DIR = path.resolve(__dirname, "..", "dist");
const FONT_NAME = process.env.FONT_NAME || (pkg.config && pkg.config.iconFontName) || "icongen";
const out = path.resolve(DIST_DIR, `${FONT_NAME}-v${pkg.version}.zip`);

if (!fs.existsSync(DIST_DIR)) {
  console.error("dist/ introuvable. Lance d'abord: npm run build");
  process.exit(1);
}

const output = fs.createWriteStream(out);
const archive = archiver("zip", { zlib: { level: 9 } });

output.on("close", () => console.log(`Zip: ${out} (${archive.pointer()} bytes)`));
archive.on("error", (err) => { throw err; });

archive.pipe(output);
archive.directory(DIST_DIR + "/", false);
archive.finalize();
