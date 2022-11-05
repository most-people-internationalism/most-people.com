import {
  createRouter,
  createWebHistory,
  // createWebHashHistory,
} from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'

const routes = generatedRoutes

const env = import.meta.env

const router = createRouter({
  history: createWebHistory(env.BASE_URL),
  routes,
})

export default router
