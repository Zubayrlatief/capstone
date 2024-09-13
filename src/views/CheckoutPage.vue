<template>
  <NavBar/>
  <div class="checkout container">
    <h2>Checkout</h2>
    <div v-if="cartItems.length">
      <ul>
        <li v-for="item in cartItems" :key="item.itemID">
          {{ item.prodName }} - Quantity: {{ item.quantity }} - Price: \${{ item.amount.toFixed(2) }}
        </li>
      </ul>
      <h3>Total Due: \${{ cartTotal.toFixed(2) }}</h3>
      <button @click="completeCheckout" class="btn btn-success">Complete Purchase</button>
    </div>
    <div v-else>
      <p>Your cart is empty!</p>
    </div>
  </div>
  <FooterComp/>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NavBar from '@/components/NavBar.vue';
import FooterComp from '@/components/FooterComp.vue';

export default {
  components: {
    NavBar,
    FooterComp
  },
  computed: {
    ...mapGetters(['cartItems', 'cartTotal'])
  },
  methods: {
    completeCheckout() {
      // Logic to complete the purchase
      alert('Purchase completed!');
      this.clearCart();
    },
    ...mapActions(['clearCart'])
  }
};
</script>

<style scoped>
.checkout {
  padding: 20px;
}
</style>
