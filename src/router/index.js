import { createRouter, createWebHistory } from 'vue-router'
import ItemsPage from '../components/ItemsPage.vue'
import LandingPage from '../components/LandingPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: LandingPage
  },
  {
    path: '/items',
    name: 'items',
    component: ItemsPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
