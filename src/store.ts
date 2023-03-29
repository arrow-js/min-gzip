import { reactive } from '@arrow-js/core'

const store = reactive({
  code: `/**
 * Enter some JavaScript or TypeScript code into the editor to see how it
 * compresses with gzip, brotli, and minification.
 */
`,
  gzip: 0,
  brotli: 0,
  min: 0,
  useGzip: true,
  useBrotli: false,
  useMinify: true,
})

export default store
