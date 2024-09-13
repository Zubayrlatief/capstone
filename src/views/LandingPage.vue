<template>
  <NavBar/>
  <div class="container">
    <img
      src="https://zubayrlatief.github.io/capestone-hosted-images/landingpic.png"
      class="rounded"
      alt="..."
    />
    <div class="text-container">
      <h1 class="heading">HERMESS FITNESS</h1>
      <h4 class="heading">The legacy will last forever</h4>
    </div>
    <img
      src="https://zubayrlatief.github.io/capestone-hosted-images/landing%20pic%202.png"
      class="rounded"
      alt=""
    />
  </div>
  <FooterComp/>
</template>

<script>
import FooterComp from '@/components/FooterComp.vue';
import NavBar from '@/components/NavBar.vue';
export default {
  name: 'LandingPage',
  components: {
    NavBar,
    FooterComp
  },
}
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.container {
  background-color: #361c1c; /* Updated background color */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100vh; /* Full viewport height */
  box-sizing: border-box; /* Include padding in width and height */
  text-align: center; /* Center align text */
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

.heading {
  color: white;
  margin: 0 10px;
}

@media (max-width: 1200px) {
  .container img {
    max-width: 25%;
  }
}

@media (max-width: 992px) {
  .container img {
    max-width: 20%;
  }
}

@media (max-width: 768px) {
  .container img {
    max-width: 15%;
  }

  .heading {
    font-size: 1.5rem;
  }
}

@media (max-width: 576px) {
  .heading {
    font-size: 1.2rem;
  }

  .container img {
    max-width: 20%;
  }
}
</style>
