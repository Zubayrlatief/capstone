<template>
  <div>
    <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-black">
      <div class="container">
        <div class="d-flex w-100 justify-content-between align-items-center">
          <!-- Left side: Philosophy and Store -->
          <div class="d-flex">
            <a class="nav-item nav-link" href="/philosophy">Philosophy</a>
            <a class="nav-item nav-link" href="/items">Store</a>
          </div>

          <!-- Centered Logo -->
          <a class="navbar-brand mx-auto" href="/">
            <img src="https://zubayrlatief.github.io/capestone-hosted-images/H (1)(2).jpg" alt="Brand Logo" class="navbar-logo">
          </a>

          <!-- Right side: Cart, Sign Up, Sign In, and User Image -->
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
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      isLoggedIn: false, // Default state
      userImage: '', // URL of user's image
      accountPageUrl: '/account' // URL for the account page
    };
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        this.isLoggedIn = true;
        // Fetch user data to get the image URL (assuming it's stored in user data)
        // Example:
        // const decoded = jwt_decode(token);
        // Use a dummy URL for testing
        this.userImage = 'https://zubayrlatief.github.io/capestone-hosted-images/logo.png'; // Replace with actual user image URL logic
        console.log('User Image URL:', this.userImage); // Debugging line
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.userImage = '';
      this.$router.push('/login'); // Redirect to login page
    }
  },
  created() {
    this.checkAuth();
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
