<template>
  <NavBar />
  <div class="container">
    <img
      src="https://zubayrlatief.github.io/capestone-hosted-images/landingpic.png"
      class="rounded"
      alt="..."
    />
    <div class="text">
      <div id="p" class="a01">DIST</div>
      <div id="p" class="a02">OR</div>
      <div id="p" class="a03">TED</div>
      <div id="p" class="a04">REAL</div>
      <div id="p" class="a05">ITY</div>
      <div id="p" class="a06">--------------------</div>

      <div id="p" class="a01 s1">OUR</div>
      <div id="p" class="a02 s1">LEG</div>
      <div id="p" class="a03 s1">E</div>
      <div id="p" class="a04 s1">CY</div>
      <div id="p" class="a05 s1">CONT</div>
      <div id="p" class="a06 s1">INUES</div>
      <a href="/items">
        <button id="bottone1"><strong>Our latest drop</strong></button>
      </a>
    </div>
    <img
      src="https://zubayrlatief.github.io/capestone-hosted-images/landing%20pic%202.png"
      class="rounded"
      alt=""
    />
  </div>
  <FooterComp />
</template>

<script>
import FooterComp from "@/components/FooterComp.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "LandingPage",
  components: {
    NavBar,
    FooterComp,
  },
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.container {
  background-color: #000;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 75vh;
  box-sizing: border-box;
  text-align: center;
}

.container img {
  max-width: 30%;
  height: auto;
}

.text-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}

#p {
  text-align: center;
  animation: gradient 2.4s infinite ease-in-out;
  letter-spacing: 10px;
  white-space: nowrap;
  font-size: 20px;
  text-indent: 10px;
  font-family: "Pirata One", system-ui;
  font-weight: 400;
  font-style: normal;
  color: #333;
  padding: 0.2rem;
}

#bottone1 {
  background-color: #fff; /* White background */
  color: #4c0000; /* Dark red text */
  padding: 0.75rem 1.5rem; /* Adjusted padding */
  font-size: 1rem; /* Standard font size */
  border-radius: 0.5rem; /* Rounded corners */
  border: none; /* Remove border */
  transition: background-color 0.3s ease, color 0.3s ease; /* Smooth hover effect */

  margin-top: 30px;
}

#bottone1:hover {
  background-color: #f8f9fa; /* Lighter background on hover */
  color: #6c0000; /* Slightly darker red on hover */
  cursor: pointer; /* Change cursor to pointer */
}

@media (max-width: 768px) {
  /* Adjust container width and padding for a perfect fit */
  .container{
    padding: 0 15px; /* Adds slight padding to prevent edge overflow */
    width: 100%;
    box-sizing: border-box; /* Includes padding in width calculation */
  }

  /* Align elements properly within the container */
  .row {
    margin: 0 auto; /* Centers the row */
    padding: 10px 0; /* Adds vertical spacing */
  }

  /* Adjust column sizes for smaller screens */
  .col-lg-4 {
    width: 100%; /* Make each column take up full width */
    text-align: center; /* Center align content */
    margin-bottom: 1rem; /* Add spacing between rows */
  }

  /* Logo image adjustments */
  .img {
    height: 40px;
    margin: 0 auto; /* Center the logo */
  }

  /* Social icons adjustments */
  .gap-3 {
    gap: 0.8rem; /* Slightly reduce gap between icons */
  }

}

/* Media Queries for Responsiveness */
@media (max-width: 480px) {
  .container {
    flex-direction: column;
    height: auto;
    padding: 10px;
  }

  .container img {
    max-width: 100%;
    margin: 10px 0;
  }

  #p {
    font-size: 18px;
    letter-spacing: 6px;
  }

  #bottone1 {
    width: 60%;
    padding: 12px;
    font-size: 16px;

  }

  .text-container {
    text-align: center;
    padding: 20px 0;
  }
}
</style>
