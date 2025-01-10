<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
#app{
  background-color: #000000;
}


h1, h2, h3, h4, h5, h6 {
  font-family: "Pirata One", system-ui;
  font-weight: 400;
  font-style: normal;
  text-shadow: 6px 4px 4px rgba(0, 0, 0, 0.8); 
  color: #333; 
}

/* Optional: Add an outline effect for more emphasis */
h1, h2, h3, h4, h5, h6 {
  text-stroke: 1px #000; /* Creates a subtle outline around the text */
  letter-spacing: 1px; /* Adds spacing for a more dramatic effect */
}

</style>
