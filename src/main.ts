import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import generatedRoutes from 'virtual:generated-pages'
import viteSSR, { ClientOnly } from 'vite-ssr'

import i18n from './plugins/i18n'
import './assets/main.scss'

import App from './app.vue'

const routes = generatedRoutes

export default viteSSR(App, { routes }, async (ctx) => {
  const { app } = ctx

  const head = createHead()
  app.use(i18n).use(createPinia()).use(head)

  app.component(ClientOnly.name, ClientOnly)

  return { head }
})
