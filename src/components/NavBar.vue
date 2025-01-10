<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-black">
    <div class="container">
      <!-- Brand Logo -->
      <a class="navbar-brand" href="/">
        <img src="https://zubayrlatief.github.io/capestone-hosted-images/H (1)(2).jpg" alt="Brand Logo" class="navbar-logo">
      </a>

      <!-- Toggler Button for Burger Menu -->
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Collapsible Menu -->
      <div :class="['collapse', 'navbar-collapse', { show: isMenuOpen }]" id="navbarContent">
        <div class="navbar-nav ms-auto">
          <a class="nav-item nav-link" href="/philosophy">Philosophy</a>
          <a class="nav-item nav-link" href="/items">Store</a>
          <template v-if="isAdmin">
            <a class="nav-item nav-link" href="/admin">Admin</a>
          </template>
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
  data() {
    return {
      isMenuOpen: false,
    };
  },
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
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.navbar {
  background-color: black;
}

.navbar-brand,
.nav-link {
  color: white;
  font-size: large;
  font-family: "Pirata One", system-ui;
  text-shadow: 6px 6px 4px rgba(0, 0, 0, 0.8);
}

.navbar-logo {
  max-height: 50px;
  object-fit: contain;
}

.user-image {
  max-height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
}

.navbar-toggler {
  border: none;
}

.collapse.show {
  display: block !important;
}

@media (max-width: 480px) {
  .navbar-nav {
    flex-direction: column;
    gap: 10px;
  }

  .nav-item {
    margin: 5px 0;
  }
}
</style>
