/*eslint-disable*/
import { createRouter, createWebHistory } from 'vue-router';
import ItemsList from '@/views/ItemsList.vue';
import LandingPage from '@/views/LandingPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';

const routes = [
  {
    path: '/items',
    name: 'ItemsList',
    component: ItemsList,
  },
  {
    path: '/',
    name: 'Home',
    component: LandingPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  }
  // Other routes...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
