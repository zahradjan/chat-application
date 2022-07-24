// const path = require("path");
// // const webpack = require("webpack");
// // const Uglify = require("uglifyjs-webpack-plugin");

// // const uglifyOptions = {
// //   uglifyOptions: {
// //     mangle: false,
// //     compress: false,
// //   },
// // };

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "./bundle.js",
  },
  target: "web",
  devtool: "none",
  node: {
    Buffer: true,
  },
  resolve: {
    extensions: [".js"],
  },

  plugins: [
    // Uncomment for a minified build
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    //   }
    // }),
    // new Uglify(uglifyOptions),
  ],
};
