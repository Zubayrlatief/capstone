<template>
  <div class="item-card">
    <!-- Display item details -->
    <img :src="item.prodURL" alt="Item Image" />
    <h2>{{ item.prodName }}</h2>
    <p>{{ formatAmount(item.amount) }}</p>
    <button @click="addToCart(item)">Add to Cart</button>
  </div>
</template>

<script>
export default {
  name: 'ItemCard',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatAmount(amount) {
      if (typeof amount === 'number') {
        return amount.toFixed(2); // Format amount to 2 decimal places
      } else if (typeof amount === 'string') {
        return Number(amount).toFixed(2); // Convert string to number and format
      }
      return 'N/A'; // Default value if amount is neither number nor string
    },
    addToCart(item) {
      this.$emit('add-to-cart', item);
    }
  }
};
</script>

<style scoped>
/* Styles for ItemCard component */
.item-card {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
}
.item-card img {
  max-width: 100%;
  height: auto;
}
.item-card button {
  margin-top: 10px;
}
</style>
