<template>
    <div class="cart-page">
      <h2>Your Cart</h2>
      <div v-if="cartItems.length === 0">Your cart is empty.</div>
      <div v-for="item in cartItems" :key="item.prodID" class="cart-item">
        <h4>{{ item.prodName }}</h4>
        <p>Quantity: {{ item.quantity }}</p>
        <button @click="removeItem(item.prodID)">Remove</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const cartItems = ref([]);
      const userID = 1; // Replace this with the actual user ID from authentication
  
      const fetchCart = async () => {
        try {
          const response = await axios.get(`http://localhost:5002/cart/${userID}`);
          console.log('Cart data:', response.data); // Add this line to check the response
          cartItems.value = response.data;
        } catch (error) {
          console.error('Error fetching cart data', error);
        }
      };
  
      const removeItem = async (prodID) => {
        try {
          await axios.delete(`http://localhost:5002/cart/${prodID}`, {
            data: { userID }
          });
          fetchCart();
        } catch (error) {
          console.error('Error removing item from cart', error);
        }
      };
  
      const clearCart = async () => {
        try {
          await axios.delete('http://localhost:5002/cart', {
            data: { userID }
          });
          fetchCart();
        } catch (error) {
          console.error('Error clearing cart');
        }
      };
  
      onMounted(() => {
        fetchCart();
      });
  
      return {
        cartItems,
        removeItem,
        clearCart,
      };
    },
  };
  </script>
  
  <style scoped>
  .cart-item {
    margin-bottom: 20px;
    /* Add your cart item styling here */
  }
  </style>
  