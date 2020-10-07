# js-keccak-tiny
[![Build Status](https://travis-ci.org/sc0Vu/js-keccak-tiny.svg?branch=master)](https://travis-ci.org/sc0Vu/js-keccak-tiny)
[![codecov](https://codecov.io/gh/sc0Vu/js-keccak-tiny/branch/master/graph/badge.svg)](https://codecov.io/gh/sc0Vu/js-keccak-tiny)

Keccak tiny wasm binding in javascript.

# Keccak tiny

Keccak tiny is a c implementation of keccak, the original repository https://github.com/status-im/nim-keccak-tiny.

# Install

* install library

```BASH
$ npm install js-keccak-tiny
```

# Build with emscripten

You can build keccak-tiny wasm yourself with emscripten. To konw how to install or setup emscripten on your computer, please check their documentation https://emscripten.org/docs/getting_started/index.html. I build two version of keccak-tiny - nodejs and web. The only difference between two version is that there is no file system in web version.

```BASH
$ sh build.sh
```

After build wasm files, you should build javascript library again.

```BASH
$ npm run build
```

# Usage

* Hash message
```JS
// for nodejs
const keccakHashAsync = require('js-keccak-tiny/dist/node-bundle')

// for browser
const keccakHashAsync = require('js-keccak-tiny/dist/browser-bundle')

const msg = Buffer.from('It works!', 'utf8')

// initialize the library
keccakTiny = await keccakHashAsync()

let hash = keccakTiny.keccak256(msg)
// do something to hash...
```
# Benchmark

Computer: 2.2 GHz 6-Core Intel Core i7

```
$ node -v
v12.18.1

> keccak-benchmark@0.0.0 start /Users/peterlai/Desktop/Projects/js-keccak-tiny/benchmarks
> node index.js

Keccak tiny (current) x 558,114 ops/sec ±1.68% (89 runs sampled)
Pure JS (keccak) x 288,401 ops/sec ±0.55% (97 runs sampled)
Pure JS (sha3) x 13,370 ops/sec ±1.57% (90 runs sampled)
Pure JS (js-sha3) x 280,340 ops/sec ±0.41% (94 runs sampled)
Buffer 0bytes: fastest is Keccak tiny (current)
Keccak tiny (current) x 15.01 ops/sec ±1.04% (42 runs sampled)
Pure JS (keccak) x 4.21 ops/sec ±2.51% (15 runs sampled)
Pure JS (sha3) x 0.18 ops/sec ±4.71% (5 runs sampled)
Pure JS (js-sha3) x 4.26 ops/sec ±1.81% (15 runs sampled)
Buffer 10MiB: fastest is Keccak tiny (current)
```

# License

MIT
