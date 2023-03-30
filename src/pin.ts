import store from './store'
import { html } from '@arrow-js/core'

export default function pin() {
  return html`
    <button
      type="button"
      class="button pin"
      aria-label="Create a pin"
      data-active="${() => store.pin}"
      @click="${() => (store.pin = !store.pin)}"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 1200"
        fill="currentColor"
      >
        <path
          d="m720,396v-156c0-18,6-36,24-48,54-36,90-96,96-168,0-12-12-24-24-24h-432c-12,0-24,12-24,24,6,66,42,126,96,168,18,12,24,30,24,48v156c0,24-12,48-36,60-114,54-198,168-204,300,0,12,12,24,24,24h264c6,0,12,6,12,12l24,384c6,36,60,36,66,0l24-384c0-6,6-12,12-12h264c12,0,24-12,24-24-12-132-90-246-204-300-18-12-30-36-30-60Z"
        />
      </svg>
    </button>
  `
}
