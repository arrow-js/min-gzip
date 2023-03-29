import './style.css'
import store from './store'
import { html } from '@arrow-js/core'
import editor from './editor'
import results from './results'
import './compressors'

const setOption = (option: string) => (e: InputEvent) => {
  store[option] = (e.target as HTMLInputElement).checked
}

html`
  <div class="container">
    <header>
      <div class="form-element">
        <input
          type="checkbox"
          name="minify"
          id="minify"
          @input="${setOption('useMinify')}"
          checked="${() => store.useMinify}"
        />
        <label for="minify" id="minify">Minify</label>
      </div>
      <div class="form-element">
        <input
          type="checkbox"
          name="gzip"
          id="gzip"
          @input="${setOption('useGzip')}"
          checked="${() => store.useGzip}"
        />
        <label for="gzip" id="gzip">Gzip</label>
      </div>
      <div class="form-element">
        <input
          type="checkbox"
          name="brotli"
          id="brotli"
          @input="${setOption('useBrotli')}"
          checked="${() => store.useBrotli}"
        />
        <label for="brotli" id="brotli">Brotli</label>
      </div>
      ${results()}
    </header>
    <main>${editor()}</main>
  </div>
`(document.getElementById('app')!)
