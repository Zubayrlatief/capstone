<template>
  <div class="item-card">
    <img :src="item.prodURL" alt="Item Image" />
    <h2>{{ item.prodName }}</h2>
    <p>{{ formatAmount(item.amount) }}</p>
    <button id="bottone1" @click.stop="addToCart(item)"><h6>add to Cart</h6> </button>
    <button  id="bottone1"  @click="viewItemDetails(item.prodID)"><h6>View Item</h6></button>
  </div>
</template>

<script>
export default {
  name: 'ItemCard',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatAmount(amount) {
      return typeof amount === 'number'
        ? amount.toFixed(2)
        : Number(amount).toFixed(2);
    },
    addToCart(item) {
      if (this.$store.getters.isAuthenticated) {
        this.$store.dispatch('addToCart', item);
      } else {
        alert('Please sign in to add items to your cart.');
      }
    },
    viewItemDetails(prodID) {
      this.$router.push(`/items/${prodID}`);
    },
  },
};
</script>

<style scoped>
.item-card {
  border: 1px solid #631a1a;
  background-color: black;
  padding: 50px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
}
.item-card img {
  max-width: 100%;
  height: auto;
}
.item-card button {
  margin-top: 10px;
}

/* button styling */
#bottone1 {
  margin: 2%;
  padding-top: 10px;
 padding-left: 30px;
 padding-right: 33px;
 padding-bottom: 10px;
 border-radius: 6px;
 background: #fffbfb;
 border: none;
 font-family: inherit;
 text-align: center;
 cursor: pointer;
 transition: 0.4s;
}

#bottone1:hover {
 box-shadow: 7px 5px 56px -14px #bfbfbc;
}

#bottone1:active {
 transform: scale(0.97);
 box-shadow: 7px 5px 56px -10px #ffffff;
}

</style>
