module.exports = {
  multipass: true,
  plugins: [
    { name: "preset-default", params: { overrides: { removeViewBox: false } } },
    { name: "removeDimensions", active: true },
    { name: "removeAttrs", params: { attrs: "(fill|stroke)" } },
    { name: "convertPathData", active: true }
  ]
};
