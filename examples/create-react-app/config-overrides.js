/* config-overrides.js */
const { override, addLessLoader } = require("customize-cra");

module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@base-color": "#f44336" }
  })
);
