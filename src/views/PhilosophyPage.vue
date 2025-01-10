<template>
  <div class="page-container">
    <NavBar />
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6 d-flex justify-content-center align-items-center">
          <img
            src="https://zubayrlatief.github.io/capestone-hosted-images/landingpic.png"
            class="img-fluid rounded fade-effect"
            alt="About Image"
          />
        </div>

        <div class="col-md-6 text-center">
          <h2>PHILOSOPHY</h2>
          <h5>Our Mission at Hermess Fitness</h5>
          <p>
            Hermess Fitness believes in the ability to provide <br />
            Quality, Legacy, and Community. With a massive pool of aesthetic athletes, <br />
            we are a community first and a clothing brand second. <br />
            Our philosophy revolves around creating an inclusive environment <br />
            where individuals can achieve their personal best and grow alongside like-minded champions. <br />
            We are committed to innovation, ensuring that every product reflects excellence <br />
            and embodies the spirit of our community. <br />
            Whether you're a seasoned athlete or just starting your journey, <br />
            Hermess Fitness stands as a pillar of support, offering premium apparel <br />
            and fostering a sense of belonging and mutual encouragement. <br />
            Join us in redefining fitness, celebrating achievements, and building lasting legacies.<br />
            Apply to our Legacy community today and take the first step toward unlocking your true potential.
          </p>
          <div>
            <a href="/contact" class="btn btn-light">APPLY</a>
          </div>
        </div>
      </div>
    </div>
    <FooterComp />
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
};
</script>

<style scoped>
.page-container {
  background-color: #000; /* Black background */
  color: #fff; /* White text */
  min-height: 120vh; /* Increased container height */
  padding-bottom: 2rem;
}

.text-center {
  font-family: "Pirata One", system-ui;
  font-weight: 400;
  font-style: normal;
}

.container {
  padding: 4rem 0; /* Adds more vertical space */
}

.img-fluid {
  max-width: 80%; /* Slightly larger image */
  animation: fadeEffect 3s infinite alternate; /* Add fade animation */
}

h2, h5, p {
  color: #fff; /* Make all text white */
}

h2 {
  margin-bottom: 1.5rem;
}

p {
  font-size: 1.2rem;
  line-height: 1.8; /* Adjusted for better readability */
}

.btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
}

.btn-light {
  background-color: #fff;
  color: #4c0000;
  border: none;
}

.btn-light:hover {
  background-color: #f8f9fa;
}

/* Fade effect animation */
@keyframes fadeEffect {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.6;
  }
}

.fade-effect {
  transition: opacity 0.5s ease-in-out;
}

.fade-effect:hover {
  opacity: 1; /* Reset to full opacity on hover */
}

/* Media Queries for responsiveness */

/* For screens below 768px */
@media (max-width: 768px) {
  .container {
    padding: 3rem 1.5rem; /* Reduce container padding */
  }

  h2 {
    font-size: 1.5rem; /* Smaller heading */
  }

  p {
    font-size: 1.1rem; /* Smaller paragraph text */
    line-height: 1.6; /* Adjust line height for readability */
  }

  .img-fluid {
    max-width: 90%; /* Adjust image size */
  }
}

/* For screens below 480px */
@media (max-width: 480px) {
  h2 {
    font-size: 1.2rem; /* Even smaller heading for very small screens */
  }

  p {
    font-size: 0.9rem; /* Smaller paragraph text */
    line-height: 1.5; /* Adjust line height */
  }

  .img-fluid {
    max-width: 100%; /* Full width image for very small screens */
  }

  .btn {
    padding: 0.5rem 1rem; /* Smaller button padding */
    font-size: 0.9rem; /* Smaller button text */
  }
}
</style>
