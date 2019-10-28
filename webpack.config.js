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
        loader: "wasm-loader",
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
    library: 'KECCAK',
    libraryTarget: 'var',
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
        loader: "wasm-loader",
      }
    ]
  }
}

module.exports = [ nodeConfig, browserConfig ]