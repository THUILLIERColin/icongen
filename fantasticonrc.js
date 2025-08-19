const fs = require("fs");
const path = require("path");
const pkg = require("./package.json");

const FONT_NAME = process.env.FONT_NAME || (pkg.config && pkg.config.iconFontName) || "icongen";
const CSS_PREFIX = process.env.CSS_PREFIX || (pkg.config && pkg.config.iconCssPrefix) || "icg";
const FONTS_URL = process.env.FONTS_URL || (pkg.config && pkg.config.fontsUrl) || "./";

const metaMapPath = path.resolve(__dirname, "meta", "codepoints.json");
let codepoints = {};
if (fs.existsSync(metaMapPath)) {
  try { codepoints = JSON.parse(fs.readFileSync(metaMapPath, "utf8")); } catch {}
}

module.exports = {
  inputDir: path.resolve(__dirname, "src", "icons"),
  outputDir: path.resolve(__dirname, "dist"),
  name: FONT_NAME,
  prefix: CSS_PREFIX,
  fontTypes: ["ttf", "woff", "woff2"],
  assetTypes: ["css", "html", "json"],
  fontsUrl: FONTS_URL,
  normalize: true,
  codepoints,
  formatOptions: { ttf: { ts: 0 } }
};
