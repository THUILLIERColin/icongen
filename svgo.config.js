// svgo.config.js
module.exports = {
  multipass: true,
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {},
      },
    },
    "removeViewBox", // <-- on l’ajoute séparément
    { name: "removeDimensions", active: true },
    { name: "removeAttrs", params: { attrs: "(fill|stroke)" } },
    { name: "convertPathData", active: true },
  ],
};
