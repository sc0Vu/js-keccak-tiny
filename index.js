const KeccakTinyWasm = require('./lib/keccak-tiny.wasm')
const Keccak = require('./lib/keccak-tiny.js')
const Buffer = require('buffer/').Buffer
const isBuffer = require('is-buffer')

module.exports = function (options) {
  options = {
    instantiateWasm: function (info, successCallback) {
      return KeccakTinyWasm(info)
              .then(function (i) {
                return successCallback(i.instance)
              })
    }
  }
  return new Promise(function (resolve, reject) {
    Keccak(options).then(function (k) {
      let keccakTiny = {}
      Object.defineProperties(keccakTiny, {
        k: {
          writable: false,
          value: k
        },
        hashAlgos: {
          writable: false,
          value: {
            shake128: {
              length: 16,
              functionName: '_shake128'
            },
            shake256: {
              length: 32,
              functionName: '_shake256'
            },
            sha3_224: {
              length: 28,
              functionName: '_sha3_224'
            },
            sha3_256: {
              length: 32,
              functionName: '_sha3_256'
            },
            sha3_384: {
              length: 48,
              functionName: '_sha3_384'
            },
            sha3_512: {
              length: 64,
              functionName: '_sha3_512'
            },
            keccak224: {
              length: 28,
              functionName: '_keccak_224'
            },
            keccak256: {
              length: 32,
              functionName: '_keccak_256'
            },
            keccak384: {
              length: 48,
              functionName: '_keccak_384'
            },
            keccak512: {
              length: 64,
              functionName: '_keccak_512'
            }
          }
        }
      })
      keccakTiny.malloc = function (buf, len) {
        if (buf.length > len) {
          throw new Error('Buffer length should be bigger than length')
        }
        if (this.k._malloc === undefined) {
          throw new Error('Please initialize first')
        }
        const mbuf = this.k._malloc(len)
        if (buf.length > 0) {
          this.k.HEAP8.set(buf, mbuf)
        }
        return mbuf
      }
      keccakTiny.free = function (buf) {
        if (this.k._free === undefined) {
          throw new Error('Please initialize first')
        }
        this.k._free(buf)
      }
      keccakTiny.toBuffer = function (buf, len) {
        let res = new Buffer(len)
        for (var i=0; i<len; i++) {
          res[i] = this.k.getValue(buf + i, 'i8')
        }
        return res
      }
      keccakTiny.hash = function (hashAlgoName, msg) {
        if (typeof hashAlgoName !== 'string') {
          throw new Error('Hash algorithm name must be string.')
        }
        if (typeof this.hashAlgos[hashAlgoName] === undefined) {
          throw new Error('Unknown hash algorithm.')
        }
        if (isBuffer(msg) !== true) {
          throw new Error('Message must be buffer.')
        }
        let hashAlgo = this.hashAlgos[hashAlgoName]
        let hashFunc = this.k[hashAlgo.functionName]
        if (hashFunc === undefined) {
          throw new Error('Please initialize first')
        }
        let empty = Buffer.from([])
        let hashLen = hashAlgo.length
        let hashMem = this.malloc(empty, hashLen)
        let msgLen = msg.length
        let msgMem = this.malloc(msg, msgLen)
        let res = hashFunc(hashMem, hashLen, msgMem, msgLen)
        if (res === -1) {
          this.free(hashMem)
          this.free(msgMem)
          throw new Error('Hash failed.')
        }
        const hash = this.toBuffer(hashMem, hashLen)
        // free memory
        this.free(hashMem)
        this.free(msgMem)
        return hash
      }
      Object.keys(keccakTiny.hashAlgos).forEach(function (hashAlgoName) {
        keccakTiny[hashAlgoName] = function (msg) {
          let msgBuf = Buffer.from(msg)
          return keccakTiny.hash(hashAlgoName, msgBuf)
        }
      })
      resolve(keccakTiny)
    })
  })
}
