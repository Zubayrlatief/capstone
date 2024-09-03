import { createRouter, createWebHistory } from 'vue-router'
import ItemsPage from '@/components/ItemPage.vue'
import ShoppingCart from '@/components/ShoppingCart.vue'
import ItemsDetails from '@/components/ItemsDetails.vue'

const routes = [
  {
    path: '/items',
    name: 'items',
    component: ItemsPage
  },
  {
    path: '/cart',
    name: 'cart',
    component: ShoppingCart
  },
  {
    path: '/items/:id',
    name: 'item',
    component: ItemsDetails
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
