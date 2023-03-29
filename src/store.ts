import { reactive } from '@arrow-js/core'
import { decompressUrlCode } from './utils'

const store = reactive({
  code:
    (await decompressUrlCode('editor')) ||
    `/**
 * Enter some JavaScript or TypeScript code into the editor to see how it
 * compresses with gzip, brotli, and minification.
 * 
 * Typescript typings are automatically removed before minification allowing
 * for accurate compression results.
 */
`,
  gzip: 0,
  brotli: 0,
  min: 0,
  useGzip: true,
  useBrotli: false,
  useMinify: true,
  theme:
    localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'),
})

export default store
