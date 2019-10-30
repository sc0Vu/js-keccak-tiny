# js-keccak-tiny
[![Build Status](https://travis-ci.org/sc0Vu/js-keccak-tiny.svg?branch=master)](https://travis-ci.org/sc0Vu/js-keccak-tiny)
[![codecov](https://codecov.io/gh/sc0Vu/js-keccak-tiny/branch/master/graph/badge.svg)](https://codecov.io/gh/sc0Vu/js-keccak-tiny)

Keccak tiny implementation in javascript.

# Install

* install library

```BASH
$ npm install js-keccak-tiny
```

# Build with emscripten

You can build keccak-tiny wasm yourself with emscripten. We build two version of keccak-tiny - node and web. The only difference is that there is no file system in web version.

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
// or
const keccakHashAsync = require('js-keccak-tiny').node

// for browser
const keccakHashAsync = require('js-keccak-tiny/dist/browser-bundle')
// or
const keccakHashAsync = require('js-keccak-tiny').browser

const msg = Buffer.from('It works!', 'utf8')

// initialize the library
keccakTiny = await keccakHashAsync()

let hash = keccakTiny.keccak256(msg)
// do something to hash...
```

# License

MIT
