import { defineConfig } from "vite"

export default defineConfig({
  optimizeDeps: {
    exclude: ["brotli-wasm", "brotli-wasm/pkg.bundler/brotli_wasm_bg.wasm"],
  },
})