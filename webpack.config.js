const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js",
  },
  devServer: {
    port: 3000,
    static: [
      {
        directory: path.join(__dirname, "public/"),
      },
        // {
        //   directory: path.join(__dirname, "dist/"),
        //   publicPath: "http://localhost:3000/dist/",
        // },
    ],
    hot: "only",
    //open: true,
    // devMiddleware: {
    //   index: true,
    //   mimeTypes: { "text/html": ["phtml"] },
    // //   publicPath: "http://localhost:3000/",
    //   serverSideRender: true,
    //   writeToDisk: true,
    // },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
