import store from './store'
import { formatBytes } from './utils'
import { html } from '@arrow-js/core'

export default function () {
  return html`
    <ul class="results">
      ${() =>
        store.useMinify &&
        html`
          <li
            class="result minify"
            data-pin="${() =>
              store.pin && formatBytes(store.pinnedResults.minify)}"
          >
            <span>min:</span> ${() => formatBytes(store.min)}
          </li>
        `}
      ${() =>
        store.useGzip &&
        html`
          <li
            class="result gzip"
            data-pin="${() =>
              store.pin && formatBytes(store.pinnedResults.gzip)}"
          >
            <span>${() => (store.useMinify ? 'min-gzip' : 'gzip')}:</span>
            ${() => formatBytes(store.gzip)}
          </li>
        `}
      ${() =>
        store.useBrotli &&
        html`
          <li
            class="result brotli"
            data-pin="${() =>
              store.pin && formatBytes(store.pinnedResults.brotli)}"
          >
            <span>${() => (store.useMinify ? 'min-brotli' : 'brotli')}:</span>
            ${() => formatBytes(store.brotli)}
          </li>
        `}
    </ul>
  `
}
