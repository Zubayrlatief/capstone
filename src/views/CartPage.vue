<template>
    <div class="cart container mt-5">
      <h2 class="text-center">Your Cart</h2>
  
      <!-- Tabular format -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.itemID">
            <td>{{ item.prodName }}</td>
            <td>{{ item.quantity }}</td>
            <td>\${{ item.amount.toFixed(2) }}</td>
            <td>\${{ (item.quantity * item.amount).toFixed(2) }}</td>
            <td>
              <button @click="updateQuantity(item.itemID, item.quantity - 1)" class="btn btn-warning btn-sm">-</button>
              <button @click="updateQuantity(item.itemID, item.quantity + 1)" class="btn btn-success btn-sm">+</button>
              <button @click="removeFromCart(item.itemID)" class="btn btn-danger btn-sm">Remove</button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">Total:</td>
            <td>\${{ cartTotal.toFixed(2) }}</td>
          </tr>
        </tfoot>
      </table>
  
      <!-- Card format -->
      <div class="row">
        <div class="col-md-4" v-for="item in cartItems" :key="item.itemID">
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">{{ item.prodName }}</h5>
              <p class="card-text">Quantity: {{ item.quantity }}</p>
              <p class="card-text">Price: \${{ item.amount.toFixed(2) }}</p>
              <p class="card-text">Total: \${{ (item.quantity * item.amount).toFixed(2) }}</p>
              <button @click="updateQuantity(item.itemID, item.quantity - 1)" class="btn btn-warning btn-sm">-</button>
              <button @click="updateQuantity(item.itemID, item.quantity + 1)" class="btn btn-success btn-sm">+</button>
              <button @click="removeFromCart(item.itemID)" class="btn btn-danger btn-sm">Remove</button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Checkout Button -->
      <div class="text-center mt-4">
        <router-link to="/checkout" class="btn btn-primary">Proceed to Checkout</router-link>
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
      ...mapActions(['removeFromCart', 'updateCartItemQuantity']),
      updateQuantity(itemID, quantity) {
        if (quantity <= 0) {
          this.removeFromCart(itemID);
        } else {
          this.updateCartItemQuantity({ itemID, quantity });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #dee2e6;
    border-radius: .25rem;
  }
  </style>
  