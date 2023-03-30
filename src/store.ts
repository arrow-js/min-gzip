import { reactive, watch } from '@arrow-js/core'

const store = reactive({
  code: `/**
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
  pin: false,
  pinnedResults: {
    gzip: 0,
    brotli: 0,
    min: 0,
  },
  useGzip: true,
  useBrotli: true,
  useMinify: true,
  theme:
    localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'),
})

watch(
  () => store.pin,
  () => {
    if (store.pin) {
      Object.assign(store.pinnedResults, {
        gzip: store.gzip,
        brotli: store.brotli,
        min: store.min,
      })
    }
  }
)

export default store
