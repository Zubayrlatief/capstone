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
  background-color: black; /* Fully black background */
}

.navbar-brand, .nav-link {
  color: white !important; /* Ensuring the text is visible against the black background */
  text-decoration: none; /* Remove underline from links */
}

.navbar-logo {
  max-height: 50px; /* Adjust the height of the logo */
  max-width: 100px; /* Adjust the width of the logo */
  object-fit: contain; /* Ensure the image fits nicely within the dimensions */
}

.user-image {
  max-height: 40px; /* Adjust the height of the user's image */
  border-radius: 50%; /* Optional: Make it a circle */
  margin-right: 10px; /* Space between image and logout button */
  cursor: pointer; /* Indicate that the image is clickable */
}

.container {
  max-width: 1200px; /* Optional: Limit container width */
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
  margin: 0 15px; /* Adjust spacing between nav items for better visual separation */
  position: relative; /* Ensure the pseudo-element is positioned correctly */
}

.nav-link {
  position: relative;
  display: inline-block;
  padding: 10px;
  transition: color 0.3s, background-color 0.3s; /* Smooth transition for color and background */
}

.nav-link:hover {
  color: #ff6347; /* Change text color on hover */
  background-color: rgba(255, 255, 255, 0.2); /* Light background on hover */
  border-radius: 4px; /* Optional: Add rounded corners */
}
</style>
