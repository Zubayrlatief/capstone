<template>
   <div>
 <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light d-flex justify-content-center">
  <a class="navbar-brand" href="#"></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse d-flex justify-content-center" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">projects <span class="sr-only"></span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">testimonials</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">contact me</a>
      </li>
    </ul>
  </div>
</nav>
 <ItemsList/>
</div>
<Router-view></Router-view>
</template>

<script>
 import ItemsList from './components/ItemsList.vue'; // Ensure the path matches your folder structure

export default {
  components: {
    ItemsList, // Register the ItemList component
  },
};
</script>

<style>

</style>
