<template>
    <div class="page-container">
      <NavBar/>
      <div class="container mt-5">
        <div class="row">
          <!-- Image Column -->
          <div class="col-md-6 d-flex justify-content-center align-items-center">
            <img src="https://zubayrlatief.github.io/capestone-hosted-images/landingpic.png" class="img-fluid rounded" alt="About Image">
          </div>
    
          <!-- Text Column -->
          <div class="col-md-6">
            <h2 class="text-center">PHILOSOPHY</h2>
            <h5 class="text-center">Our Mission at Hermess Fitness</h5>
            <p class="text-center">
              Hermess Fitness believes in the ability to provide <br>
              Quality, Legacy, and Community. With a massive pool of aesthetic athletes, <br>
              we are a community first and a clothing brand second. We believe that everyone has
              the potential to be a champion, and we are here to help you unlock that potential.<br>
              
              Apply to our Legacy community
            </p>
            <div class="text-center">
              <a href="/contact" class="btn btn-light">APPLY</a>
            </div>
          </div>
        </div>
      </div>
      <FooterComp/>
    </div>
  </template>
  
  <script>
  import FooterComp from '@/components/FooterComp.vue';
  import NavBar from '@/components/NavBar.vue';
  
  export default {
    components: {
      NavBar,
      FooterComp
    },
  }
  </script>
  
  <style scoped>
  .page-container {
    background-color: #361c1c; /* Dark red background */
    color: #fff; /* White text color */
    min-height: 100vh; /* Full viewport height */
  }
  
  .container {
    padding: 2rem 0;
  }
  
  .img-fluid {
    max-width: 65%;
  }
  
  h2, h5, p {
    color: #000000; /* White text color */
  }
  
  h2 {
    margin-bottom: 1.5rem;
  }
  
  p {
    font-size: 1.2rem;
    line-height: 1.6;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  .btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 0.5rem;
  }
  
  .btn-light {
    background-color: #fff; /* White button background */
    color: #4c0000; /* Dark red text color */
    border: none; /* Remove border */
  }
  
  .btn-light:hover {
    background-color: #f8f9fa; /* Slightly lighter background on hover */
  }
  </style>
  