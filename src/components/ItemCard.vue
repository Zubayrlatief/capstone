<template>
  <div class="item-card">
    <img :src="item.prodURL" alt="Item Image" />
    <h2>{{ item.prodName }}</h2>
    <p>{{ formatAmount(item.amount) }}</p>
    <button @click.stop="addToCart(item)">
      Add to Cart
    </button>
    <button @click.stop="viewItemDetails(item.prodID)">
      View Item
    </button>
    <p v-if="!isAuthenticated" class="auth-message">
      Please sign in to add items to your cart.
    </p>
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
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    formatAmount(amount) {
      if (typeof amount === 'number') {
        return amount.toFixed(2);
      } else if (typeof amount === 'string') {
        return Number(amount).toFixed(2);
      }
      return 'N/A';
    },
    addToCart(item) {
      console.log('Item to add:', item);
      if (this.isAuthenticated) {
        this.$emit('add-to-cart', item);
      } else {
        alert('Please sign in to add items to your cart.');
      }
    },
    viewItemDetails(prodID) {
      this.$router.push(`/items/${prodID}`);
    }
  }
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
.auth-message {
  color: red;
  font-size: 0.9em;
}
</style>

