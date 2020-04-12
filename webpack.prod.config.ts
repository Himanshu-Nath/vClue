const common = require("./webpack.config.ts");
const merge = require("webpack-merge");

module.exports = merge(common, {
  watch: false,
  mode: "production"
});