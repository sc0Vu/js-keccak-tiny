# js-keccak-tiny
[![Build Status](https://travis-ci.org/sc0Vu/js-keccak-tiny.svg?branch=master)](https://travis-ci.org/sc0Vu/js-keccak-tiny)
[![codecov](https://codecov.io/gh/sc0Vu/js-keccak-tiny/branch/master/graph/badge.svg)](https://codecov.io/gh/sc0Vu/js-keccak-tiny)

Keccak tiny implementation in javascript.

# Install

* install library

```BASH
$ npm install js-keccak-tiny
```

* copy `keccak-tiny.wasm` file to script directory, eg: if we load `/static/app.js` when develop application in `vue.js` framework, so the file should be copied to directory `/static`.

```BASH
$cp path_to_wasm/keccak-tiny.wasm /var/www/static/keccak-tiny.wasm
$cp path_to_wasm/keccak-tiny.wasm /usr/share/nginx/static/keccak-tiny.wasm
```

Source code to locate `wasm` file, looking for anothe way to solve this.
```JS
// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  } else {
    return scriptDirectory + path;
  }
}
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

const options = {
  locateFile: function (path) {
    return 'file path to *.wasm'
  }
}

const msg = Buffer.from('It works!', 'utf8')

// initialize the library
keccakTiny = await keccakHashAsync(options)

let hash = keccakTiny.keccak256(msg)
// do something to hash...
```

# License

MIT
