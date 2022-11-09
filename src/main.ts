import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'

import i18n from './plugins/i18n'
import router from './plugins/router'
import './assets/main.scss'

import App from './app.vue'

const app = createApp(App)

app.use(i18n).use(router).use(createPinia()).use(createHead()).mount('#app')
