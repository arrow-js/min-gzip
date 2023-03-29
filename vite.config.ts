import { defineConfig } from 'vite'
import topLevelAwait from 'vite-plugin-top-level-await'

export default defineConfig({
  optimizeDeps: {
    exclude: ['brotli-wasm', 'brotli-wasm/pkg.bundler/brotli_wasm_bg.wasm'],
  },
  plugins: [topLevelAwait()],
})
