// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import ItemsList from '@/views/ItemsList.vue';
import LandingPage from '@/views/LandingPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import AccountPage from '@/views/AccountPage.vue';
import AdminPage from '@/views/AdminPage.vue'; 
import PhilosophyPage from '@/views/PhilosophyPage.vue';
import ContactPage from '@/views/ContactPage.vue';
import CartPage from '@/views/CartPage.vue';
import CheckoutPage from '@/views/CheckoutPage.vue';
import ItemDetail from '@/views/ItemDetail.vue';

const routes = [
  {
    path: '/philosophy',
    name: 'Philosophy',
    component: PhilosophyPage
  },
  {
    path: '/items',
    name: 'ItemsList',
    component: ItemsList,
  },
  {
    path: '/items/:id',
    name: 'ItemDetail',
    component: ItemDetail,
    props: route => ({ id: route.params.id })
  },

  {
    path: '/',
    name: 'Home',
    component: LandingPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/account',
    name: 'AccountPage',
    component: AccountPage,
  },
  {
    path: '/admin',
    name: 'AdminPage',
    component: AdminPage,
    meta: { requiresAuth: true, admin: true } 
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/contact',
    name: 'ContactPage',
    component: ContactPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach(async (to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  const isAdmin = store.getters.isAdmin;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'Login' });
    } else if (to.matched.some(record => record.meta.isAdmin) && !isAdmin) {
      next({ name: 'Home' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
