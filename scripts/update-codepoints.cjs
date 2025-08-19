const fs = require("fs");
const path = require("path");

const ICONS_DIR = path.resolve(__dirname, "..", "src", "icons");
const MAP_PATH = path.resolve(__dirname, "..", "meta", "codepoints.json");

const START = 0xe001;

const readJSON = (p) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : {});
const writeJSON = (p, obj) => fs.writeFileSync(p, JSON.stringify(obj, null, 2) + "\n", "utf8");

const files = fs.readdirSync(ICONS_DIR)
  .filter((f) => f.toLowerCase().endsWith(".svg"))
  .map((f) => path.basename(f, ".svg"));

const map = readJSON(MAP_PATH);
const used = new Set(Object.values(map));
let next = START;

function nextCodepoint() {
  while (used.has(next) || next < 0xe000 || next > 0xf8ff) next++;
  const cp = next; used.add(cp); next++; return cp;
}

files.sort((a, b) => a.localeCompare(b, "en"));

let added = 0;
for (const name of files) {
  if (!map[name]) { map[name] = nextCodepoint(); added++; }
}

const sorted = Object.fromEntries(Object.keys(map).sort().map((k) => [k, map[k]]));
fs.mkdirSync(path.dirname(MAP_PATH), { recursive: true });
writeJSON(MAP_PATH, sorted);

console.log(`Codepoints: ${files.length} icônes, ${added} nouvelles. Écrit meta/codepoints.json.`);
