<template>
    <div class="contianer-1">
            <img class="img-2" src="https://zubayrlatief.github.io/capestone-hosted-images/landingpic.png" />
            <img class="img-1" src="https://zubayrlatief.github.io/capestone-hosted-images/landing pic 2.png">
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.container-1 {
  display: flex;
  justify-content: center;
  flex-direction: row;
  background-color: black; /* Background color set to black */
}

.img-1, .img-2 {
  margin: 10px; /* Optional: add some margin for spacing */
}

img {
  max-width: 100%; /* Optional: ensure images don't overflow */
  height: auto; /* Optional: maintain aspect ratio */
}
</style>