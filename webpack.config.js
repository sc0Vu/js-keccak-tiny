const webpack = require("webpack")
const path = require("path")

const nodeConfig = {
  mode: "development",
  target: 'node',
  context: path.resolve(__dirname, "."),
  entry: "./index-node.js",
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, "dist"),
    filename: "node-bundle.js"
  },
  module: {
    rules: [
      {
        test: /keccak-tiny-node\.wasm$/,
        type: "javascript/auto",
        loader: "file-loader",
        options: {
          publicPath: "dist/"
        }
      }
    ]
  }
}
const browserConfig = {
  mode: "development",
  target: 'web',
  context: path.resolve(__dirname, "."),
  entry: "./index-browser.js",
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, "dist"),
    filename: "browser-bundle.js"
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /keccak-tiny-browser\.wasm$/,
        type: "javascript/auto",
        loader: "file-loader",
        options: {
          publicPath: "dist/"
        }
      }
    ]
  }
}

module.exports = [ nodeConfig, browserConfig ]