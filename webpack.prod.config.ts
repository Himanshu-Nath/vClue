module.exports = {
  entry: ["webpack/hot/poll?100", "./src/server.ts"],
  target: "node",
  externals: [
    nodeExternals({
      whitelist: ["webpack/hot/poll?100"]
    })
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  mode: "development",
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "server.js"
  }
};