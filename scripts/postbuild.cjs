const fs = require("fs");
const path = require("path");

const distMap = path.resolve(__dirname, "..", "dist", "codepoints.json");
const metaMap = path.resolve(__dirname, "..", "meta", "codepoints.json");

if (fs.existsSync(distMap)) {
  const data = fs.readFileSync(distMap, "utf8");
  fs.writeFileSync(metaMap, data, "utf8");
  console.log("Mapping sync: dist/codepoints.json → meta/codepoints.json");
} else {
  console.warn("dist/codepoints.json manquant.");
}
