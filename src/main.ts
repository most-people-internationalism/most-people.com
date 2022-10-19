import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './app.vue'

import './assets/main.scss'

import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'

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
  .mount('#app')
