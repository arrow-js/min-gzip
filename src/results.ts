import store from './store'
import { html } from '@arrow-js/core'

export default function () {
  return html`
    <ul class="results">
      ${() =>
        store.useMinify &&
        html` <li class="result minify">min: ${() => store.min}B</li> `}
      ${() =>
        store.useGzip &&
        html` <li class="result gzip">gzip: ${() => store.gzip}B</li> `}
      ${() =>
        store.useBrotli &&
        html` <li class="result brotli">brotli: ${() => store.brotli}B</li> `}
    </ul>
  `
}
