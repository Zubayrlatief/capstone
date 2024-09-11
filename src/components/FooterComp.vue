<template>
  <footer class="container-fluid py-5 text-light">
    <div class="row d-flex justify-content-between align-items-center">
      <div class="col-lg-4 d-flex align-items-center">
        <NuxtLink to="/" class="d-flex align-items-center text-light text-decoration-none">
          <img
            src="https://zubayrlatief.github.io/capestone-hosted-images/H (1)(2).jpg"
            alt="Company Logo"
            title="Company Logo"
            class="img"
          />
          <span class="h4 mb-0">HERMESS FITNESS</span>
        </NuxtLink>
      </div>
      <div class="col-lg-4 d-flex justify-content-center">
        <ul class="list-unstyled d-flex flex-wrap gap-4 mb-0">
          <li>
            <a class="text-light text-decoration-none" href="contact">Contact</a>
          </li>
          <!-- Add more nav links here -->
        </ul>
      </div>
      <div class="col-lg-4 text-center text-muted">
        &copy; {{ new Date().getFullYear() }} HERMESS FITNESS.
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComp',
};
</script>

<style scoped>
.img {
  height: 60px;
}

.container-fluid {
  background-color: black;
}
</style>
