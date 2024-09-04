
import { createRouter, createWebHistory } from 'vue-router';
import ItemsList from '@/views/ItemsList.vue';
import LandingPage from '@/views/LandingPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import AccountPage from '@/views/AccountPage.vue';
import EditAccount from '@/views/EditAccount.vue';

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
  },
  { 
    path: '/login',
    name: 'Login',
    component: LoginPage
   },
  { 
    path: '/account',
    name:  'AccountPage',
    component: AccountPage
  },
  { 
    path: '/account/edit/:id',
    name: 'Edit',
    component: EditAccount 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
