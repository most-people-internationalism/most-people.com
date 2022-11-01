import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import {
  createRouter,
  // createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'

import i18n from './plugins/i18n'
import './assets/main.scss'

import App from './app.vue'

const routes = generatedRoutes

const app = createApp(App)
const env = import.meta.env

app
  .use(i18n)
  .use(
    createRouter({
      history: createWebHashHistory(env.BASE_URL),
      routes,
    }),
  )
  .use(createPinia())
  .use(createHead())
  .mount('#app')
