import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'

import './assets/main.scss'

import App from './app.vue'

const routes = generatedRoutes

const app = createApp(App)
const env = import.meta.env

app
  .use(
    createRouter({
      history: createWebHistory(env.BASE_URL),
      routes,
    }),
  )
  .use(createPinia())
  .use(createHead())
  .mount('#app')
