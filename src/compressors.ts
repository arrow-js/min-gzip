import store from './store'
import { watch } from '@arrow-js/core'
import { minify } from 'terser'
import { transform } from 'sucrase'
import { gzip } from 'pako'
import brotliInit from 'brotli-wasm'

let nonce: number = 0
watch(
  async function compress(): Promise<
    [
      results: {
        min: number
        gzip: number
        brotli: number
      },
      nonce: number
    ]
  > {
    const results = { min: 0, gzip: 0, brotli: 0 }
    let code = store.code
    const localNonce = ++nonce
    try {
      code = transform(code, { transforms: ['typescript'] }).code
    } catch (error) {
      // squelch
    }
    const promises: Promise<void>[] = []
    if (store.useMinify) {
      promises.push(
        minify(code)
          .then((result) => {
            if (typeof result.code === 'string') {
              code = result.code
              results.min = code.length
            }
          })
          .catch(() => {
            // squelch
          })
      )
    }

    if (store.useGzip) {
      function runGzip() {
        const compressed = gzip(code)
        if (compressed) {
          results.gzip = compressed.length
        }
      }
      if (promises.length === 1) {
        promises.push(promises[0].then(runGzip))
      } else {
        runGzip()
      }
    }

    if (store.useBrotli) {
      promises.push(
        Promise.all(promises)
          .then(() => brotliInit)
          .then((brotli) => {
            const textEncoder = new TextEncoder()
            const compressed = brotli.compress(textEncoder.encode(code))
            results.brotli = compressed.length
          })
      )
    }
    return Promise.all(promises).then(() => [results, localNonce])
  },
  async (willBeResults) => {
    const [results, localNonce] = await willBeResults
    if (localNonce === nonce) {
      Object.assign(store, results)
    }
  }
)
