const webpack = require("webpack")
const path = require("path")
const nodeEnv = process.env.NODE_ENV
const nodeConfig = {
  mode: nodeEnv,
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
        test: /keccak-tiny\.wasm$/,
        type: "javascript/auto",
        loader: "wasm-loader",
      }
    ]
  }
}
const browserConfig = {
  mode: nodeEnv,
  target: 'web',
  context: path.resolve(__dirname, "."),
  entry: "./index-browser.js",
  output: {
    library: 'KECCAK',
    libraryTarget: 'var',
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /keccak-tiny\.wasm$/,
        type: "javascript/auto",
        loader: "wasm-loader",
      }
    ]
  }
}

module.exports = [ nodeConfig, browserConfig ]