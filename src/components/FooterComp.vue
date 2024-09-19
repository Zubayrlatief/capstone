<template>
  <footer class="container-fluid py-3 text-light">
    <div class="row d-flex justify-content-center align-items-center">

      <div class="col-lg-4 d-flex justify-content-center align-items-center">
        <a href="/" class="d-flex align-items-center text-light text-decoration-none">
          <img
            src="https://zubayrlatief.github.io/capestone-hosted-images/H (1)(2).jpg"
            alt="Company Logo"
            title="Company Logo"
            class="img"
          />
          <span class="h4 mb-0 ms-2">HERMESS FITNESS</span>
        </a>
      </div>
      
      <div class="col-lg-4 d-flex flex-column justify-content-center align-items-center">
        <a href="/contact" class="text-light mb-2">
          <i class="bi bi-envelope-fill" style="font-size: 1.5rem;"></i>
        </a>
        <div class="d-flex gap-3">
          <a href="https://www.instagram.com" target="_blank" class="text-light">
            <i class="bi bi-instagram"></i>
          </a>
          <a href="https://www.tiktok.com" target="_blank" class="text-light">
            <i class="bi bi-tiktok"></i>
          </a>
        </div>
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
  height: 50px;
}

.container-fluid {
  background-color: black;
}

.bi-envelope-fill, .bi-instagram, .bi-tiktok {
  font-size: 1.5rem;
}

footer {
  padding: 1.5rem 0;
}

@media (max-width: 768px) {
  .h4 {
    font-size: 1.2rem; 
  }

  .ms-2 {
    margin-left: 0.5rem; 
  }
}
</style>
