<template>
    <div>
      <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-black">
        <div class="container">
          <div class="d-flex w-100 justify-content-between align-items-center">
            <!-- Left side: Philosophy and Products -->
            <div class="d-flex">
              <a class="nav-item nav-link" href="/philosophy">Philosophy</a>
              <a class="nav-item nav-link" href="/items">Store</a>
            </div>
  
            <!-- Centered Logo -->
            <a class="navbar-brand mx-auto" href="#">
              <img src="https://zubayrlatief.github.io/capestone-hosted-images/H (1)(2).jpg" alt="Brand Logo" class="navbar-logo">
            </a>
  
            <!-- Right side: Cart and Sign Up -->
            <div class="d-flex">
              <a class="nav-item nav-link" href="/cart">Cart</a>
              <a class="nav-item nav-link" href="/register">Sign Up</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NavBar'
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
  