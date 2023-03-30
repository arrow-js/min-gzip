import store from './store'
import { html, reactive, watch } from '@arrow-js/core'

export default function options() {
  const data = reactive({
    showOptions: false,
  })

  const clickAway = (e: MouseEvent) => {
    if (e.target instanceof HTMLElement && !e.target.closest('.option-list')) {
      data.showOptions = false
    }
  }

  watch(() => {
    if (data.showOptions) {
      document.addEventListener('click', clickAway)
    } else {
      document.removeEventListener('click', clickAway)
    }
  })

  const setOption = (option: string) => (e: InputEvent) => {
    store[option] = (e.target as HTMLInputElement).checked
  }

  return html`
    <div class="options">
      <button
        class="button option-toggle"
        @click="${() => (data.showOptions = !data.showOptions)}"
      >
        <span>Options</span>
        <svg
          class="down-arrow"
          fill="currentColor"
          viewBox="0 0 1200 1200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m942.6 438.6c-11.266-11.359-26.602-17.75-42.602-17.75s-31.336 6.3906-42.602 17.75l-257.4 256.2-258-256.8c-23.527-23.363-61.539-23.227-84.898 0.30078-23.363 23.527-23.23 61.539 0.29688 84.898l300 300c11.422 11.012 26.738 17.055 42.602 16.801 15.742-0.066406 30.824-6.3164 42-17.398l300-300c23.035-23.168 23.305-60.508 0.60156-84z"
          />
        </svg>
        <svg
          class="kebab"
          fill="currentColor"
          viewBox="0 0 1200 1200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m693.33 270c0 51.547-40.293 93.332-90 93.332-49.703 0-90-41.785-90-93.332s40.297-93.332 90-93.332c49.707 0 90 41.785 90 93.332zm0 330c0 51.547-40.293 93.332-90 93.332-49.703 0-90-41.785-90-93.332s40.297-93.332 90-93.332c49.707 0 90 41.785 90 93.332zm0 330c0 51.547-40.293 93.332-90 93.332-49.703 0-90-41.785-90-93.332s40.297-93.332 90-93.332c49.707 0 90 41.785 90 93.332z"
          />
        </svg>
      </button>
      <ul class="option-list" data-show-options="${() => data.showOptions}">
        <li class="form-element">
          <input
            type="checkbox"
            name="minify"
            id="minify"
            @input="${setOption('useMinify')}"
            checked="${() => store.useMinify}"
          />
          <label for="minify" id="minify">Minify</label>
        </li>
        <li class="form-element">
          <input
            type="checkbox"
            name="gzip"
            id="gzip"
            @input="${setOption('useGzip')}"
            checked="${() => store.useGzip}"
          />
          <label for="gzip" id="gzip">Gzip</label>
        </li>
        <li class="form-element">
          <input
            type="checkbox"
            name="brotli"
            id="brotli"
            @input="${setOption('useBrotli')}"
            checked="${() => store.useBrotli}"
          />
          <label for="brotli" id="brotli">Brotli</label>
        </li>
      </ul>
    </div>
  `
}
