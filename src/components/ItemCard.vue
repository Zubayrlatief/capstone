<template>
  <div class="item-card">
    <img :src="item.prodURL" alt="Item Image" />
    <h2>{{ item.prodName }}</h2>
    <p>{{ formatAmount(item.amount) }}</p>
    <button @click.stop="addToCart(item)">Add to Cart</button>
    <button @click="viewItemDetails(item.prodID)">View Item</button>
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
  padding: 16px;
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
</style>
