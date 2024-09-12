<template>
    <div class="checkout container mt-5">
      <h2 class="text-center">Checkout</h2>
      <div v-if="cartItems.length > 0">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartItems" :key="item.itemID">
              <td>{{ item.prodName }}</td>
              <td>{{ item.quantity }}</td>
              <td>\${{ item.amount.toFixed(2) }}</td>
              <td>\${{ (item.quantity * item.amount).toFixed(2) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end">Total:</td>
              <td>\${{ cartTotal.toFixed(2) }}</td>
            </tr>
          </tfoot>
        </table>
        <!-- Add checkout form here -->
        <div class="text-center mt-4">
          <button @click="placeOrder" class="btn btn-primary">Place Order</button>
        </div>
      </div>
      <div v-else class="text-center">
        <p>Your cart is empty.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters(['cartItems', 'cartTotal'])
    },
    methods: {
      ...mapActions(['clearCart']), // You may need to create a clearCart action
      placeOrder() {
        // Add order placement logic here
        alert('Order placed successfully!');
        this.clearCart(); // Optionally clear cart after order is placed
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  