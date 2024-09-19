<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-black">
    <div class="container">
      <div class="d-flex w-100 justify-content-between align-items-center">
        <div class="d-flex">
          <a class="nav-item nav-link" href="/philosophy">Philosophy</a>
          <a class="nav-item nav-link" href="/items">Store</a>
          <template v-if="isAdmin">
            <a class="nav-item nav-link" href="/admin">Admin</a>
          </template>
        </div>
        <a class="navbar-brand mx-auto" href="/">
          <img src="https://zubayrlatief.github.io/capestone-hosted-images/H (1)(2).jpg" alt="Brand Logo" class="navbar-logo">
        </a>
        <div class="d-flex">
          <a class="nav-item nav-link" href="/cart">Cart</a>
          <template v-if="!isLoggedIn">
            <a class="nav-item nav-link" href="/register">Sign Up</a>
            <a class="nav-item nav-link" href="/login">Sign In</a>
          </template>
          <template v-else>
            <a :href="accountPageUrl" class="d-flex align-items-center">
              <img :src="userImage" alt="User" class="user-image" />
            </a>
            <button class="btn btn-outline-light" @click="logout">Logout</button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NavBar',
  computed: {
    ...mapGetters(['isAuthenticated', 'isAdmin']),
  isLoggedIn() {
    return this.isAuthenticated;
  },
  userImage() {
    return this.isLoggedIn ? 'https://zubayrlatief.github.io/capestone-hosted-images/logo.png' : '';
  },
  accountPageUrl() {
    return '/account';
  }
},
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login'); // Redirect to login page
    }
  }
};
</script>

<style scoped>
.navbar {
  background-color: black;
}

.navbar-brand, .nav-link {
  color: white !important; 
  text-decoration: none; 
}

.navbar-logo {
  max-height: 50px;
  max-width: 100px;
  object-fit: contain; 
}

.user-image {
  max-height: 40px;
  border-radius: 50%;
  margin-right: 10px; 
  cursor: pointer;
}

.container {
  max-width: 1200px; 
}

.d-flex {
  display: flex;
  align-items: center;
}

.w-100 {
  width: 100%;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.nav-item {
  margin: 0 15px; 
  position: relative;
}

.nav-link {
  position: relative;
  display: inline-block;
  padding: 10px;
  transition: color 0.3s, background-color 0.3s;
}

.nav-link:hover {
  color: #ff6347; 
  background-color: rgba(255, 255, 255, 0.2); 
  border-radius: 4px; 
}
</style>
