<template>
  <NavBar/>
  <div class="container">
    <img
      src="https://zubayrlatief.github.io/capestone-hosted-images/landingpic.png"
      class="rounded"
      alt="..."
    />
    <h1 class="heading">HERMESS FITNESS</h1>
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
  background-color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100vh; /* Full viewport height */
  box-sizing: border-box; /* Include padding in width and height */
}

.container img {
  max-width: 30%;
  height: auto;
}

.heading {
  color: white;
  text-align: center;
  flex: 1;
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
    flex: 2;
  }
}

@media (max-width: 576px) {
  .heading {
    font-size: 1.2rem;
    flex: 3;
  }

  .container img {
    max-width: 20%;
  }
}
</style>
