import './style.css'
import store from './store'
import { html, reactive, watch } from '@arrow-js/core'
import editor from './editor'
import results from './results'
import themeToggle from './themeToggle'
import './compressors'
import pin from './pin'

const setOption = (option: string) => (e: InputEvent) => {
  store[option] = (e.target as HTMLInputElement).checked
}

// add gitub star button after component loads
setTimeout(() => {
  const script = document.createElement('script')
  script.src = 'https://buttons.github.io/buttons.js'
  document.head.appendChild(script)
}, 100)

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

html`
  <div class="branding">
    <h1>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path
          fill="currentColor"
          d="M352 448V192H240c-26.5 0-48-21.5-48-48V32H64C46.3 32 32 46.3 32 64V448c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32zm-.5-288c-.7-2.8-2.1-5.4-4.2-7.4L231.4 36.7c-2.1-2.1-4.6-3.5-7.4-4.2V144c0 8.8 7.2 16 16 16H351.5zM0 64C0 28.7 28.7 0 64 0H220.1c12.7 0 24.9 5.1 33.9 14.1L369.9 129.9c9 9 14.1 21.2 14.1 33.9V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM64 80c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm32 48h32c7.1 0 13.4 4.7 15.4 11.6L158 318.9c1.3 4.6 2 9.3 2 14V336c0 26.5-21.5 48-48 48s-48-21.5-48-48v-3.1c0-4.7 .7-9.5 2-14l14.7-51.3c2-6.9 8.2-11.6 15.4-11.6zm.7 71.7c-.5 1.7-.7 3.5-.7 5.2V336c0 8.8 7.2 16 16 16s16-7.2 16-16v-3.1c0-1.8-.2-3.5-.7-5.2L115.9 288h-7.9L96.7 327.7z"
        />
      </svg>
      min-gzip
    </h1>
    <a href="https://arrow-js.com" target="_blank">by ArrowJS</a>

    <div class="github-star">
      <a
        class="github-button"
        href="https://github.com/arrow-js/min-gzip"
        data-color-scheme="no-preference: light; light: light; dark: light;"
        data-icon="octicon-star"
        aria-label="Star arrow-js/min-gzip on GitHub"
        >Star</a
      >
    </div>
  </div>
  <div class="container">
    <header>
      <div class="header-container">
        <div class="os-controls" role="none">
          <span></span>
          <span></span>
          <span></span>
        </div>
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
        ${results()} ${pin()} ${themeToggle()}
      </div>
    </header>
    <main>${await editor()}</main>
  </div>

  <footer>
    &copy; ${new Date().getFullYear()} | Built with
    <a href="https://arrow-js.com" target="_blank">ArrowJS</a>
  </footer>
`(document.getElementById('app')!)
