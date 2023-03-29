import store from './store'
import { html } from '@arrow-js/core'

export default function () {
  // get theme from locolStorage or use system theme
  document.documentElement.setAttribute('data-theme', store.theme)

  store.$on('theme', () => {
    document.documentElement.setAttribute('data-theme', store.theme)
    localStorage.setItem('theme', store.theme)
  })

  return html`
    <span
      class="theme-toggle"
      data-active-theme="${() => store.theme}"
      @click="${() =>
        (store.theme = store.theme === 'light' ? 'dark' : 'light')}"
    >
      ${() => {
        if (store.theme === 'light') {
          return html`
            <svg
              class="light-mode"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M224 80V32c0-17.7 14.3-32 32-32s32 14.3 32 32V80c0 17.7-14.3 32-32 32s-32-14.3-32-32zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM0 256c0-17.7 14.3-32 32-32H80c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm432-32h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H432c-17.7 0-32-14.3-32-32s14.3-32 32-32zM256 512c-17.7 0-32-14.3-32-32V432c0-17.7 14.3-32 32-32s32 14.3 32 32v48c0 17.7-14.3 32-32 32zM73.4 438.6c-12.5-12.5-12.5-32.8 0-45.3l32-32c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-32 32c-12.5 12.5-32.8 12.5-45.3 0zm288-333.3l32-32c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-32 32c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3zm77.3 333.3c-12.5 12.5-32.8 12.5-45.3 0l-32-32c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l32 32c12.5 12.5 12.5 32.8 0 45.3zm-333.3-288l-32-32c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l32 32c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0z"
              />
            </svg>
          `
        } else {
          return html`
            <svg
              class="dark-mode"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path
                fill="currentColor"
                d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"
              />
            </svg>
          `
        }
      }}
    </span>
  `
}
