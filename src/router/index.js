import { createRouter, createWebHistory } from 'vue-router';
import ItemsList from '@/views/ItemsList.vue';
import LandingPage from '@/views/LandingPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import AccountPage from '@/views/AccountPage.vue';
import EditAccount from '@/views/EditAccount.vue';
import AdminPage from '@/views/AdminPage.vue'; // Import the AdminPage component

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
    path: '/account/edit/:id',
    name: 'Edit',
    component: EditAccount,
  },
  {
    path: '/admin', // Add a route for the admin page
    name: 'AdminPage',
    component: AdminPage,
    meta: { requiresAuth: true, isAdmin: true }, // Add meta field for route guards
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add navigation guards to check for admin access
router.beforeEach((to, from, next) => {
  const isAuthenticated = false; // Replace with your actual authentication logic
  const isAdmin = false; // Replace with your actual admin check logic

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
