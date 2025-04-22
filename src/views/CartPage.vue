<template>
  <NavBar />
  <div class="cart container mt-5">
    <h2 class="text-center">Your Cart</h2>
    <div v-if="cartItems.length === 0" class="text-center">
      <p>Your cart is empty</p>
      <router-link to="/items" class="btn btn-primary">Continue Shopping</router-link>
    </div>
    <div v-else>
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
          <tr v-for="item in cartItems" :key="item.cartID || item.itemID">
            <td>{{ getProductName(item.prodID) }}</td>
            <td>
              <div class="quantity-controls">
                <button @click="updateQuantity(item.cartID || item.itemID, item.quantity - 1)" class="btn btn-warning btn-sm">-</button>
                <span class="mx-2">{{ item.quantity }}</span>
                <button @click="updateQuantity(item.cartID || item.itemID, item.quantity + 1)" class="btn btn-success btn-sm">+</button>
              </div>
            </td>
            <td>R{{ formatPrice(getItemPrice(item)) }}</td>
            <td>R{{ formatPrice(getItemTotal(item)) }}</td>
            <td>
              <button @click="removeFromCart(item.cartID || item.itemID)" class="btn btn-danger btn-sm">Remove</button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end"><strong>Subtotal:</strong></td>
            <td>R{{ formatPrice(cartTotal) }}</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="3" class="text-end"><strong>Tax (10%):</strong></td>
            <td>R{{ formatPrice(cartTotal * 0.1) }}</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="3" class="text-end"><strong>Total:</strong></td>
            <td>R{{ formatPrice(cartTotal * 1.1) }}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <div class="text-center mt-4">
        <router-link to="/items" class="btn btn-secondary me-2">Continue Shopping</router-link>
        <router-link to="/checkout" class="btn btn-primary">Proceed to Checkout</router-link>
      </div>
    </div>
  </div>
  <FooterComp />
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
  data() {
    return {
      products: []
    };
  },
  computed: {
    ...mapGetters(['cartItems', 'cartTotal']),
    formattedCartTotal() {
      return this.formatPrice(this.cartTotal);
    }
  },
  methods: {
    ...mapActions(['removeFromCart', 'updateCartItemQuantity', 'fetchCart', 'fetchItems']),
    formatPrice(price) {
      if (price === undefined || price === null) return '0.00';
      return Number(price).toFixed(2);
    },
    getProductName(prodID) {
      const product = this.products.find(p => p.prodID === prodID);
      return product ? product.prodName : `Product ${prodID}`;
    },
    getItemPrice(item) {
      // Handle both API cart items and local cart items
      if (item.totalPrice !== undefined && item.quantity !== undefined && item.quantity > 0) {
        return Number(item.totalPrice) / Number(item.quantity);
      }
      return Number(item.amount) || 0;
    },
    getItemTotal(item) {
      // Handle both API cart items and local cart items
      if (item.totalPrice !== undefined) {
        return Number(item.totalPrice);
      }
      return Number(item.amount || 0) * Number(item.quantity || 1);
    },
    updateQuantity(itemID, quantity) {
      if (quantity <= 0) {
        this.removeFromCart(itemID);
      } else {
        // Find the cart item to get the correct ID
        const cartItem = this.cartItems.find(item => 
          item.cartID === itemID || item.itemID === itemID || item.prodID === itemID
        );
        
        if (cartItem) {
          // Use the most appropriate ID for the update
          const idToUse = cartItem.cartID || cartItem.itemID || cartItem.prodID;
          this.updateCartItemQuantity({ itemID: idToUse, quantity });
        } else {
          console.error('Cart item not found for ID:', itemID);
        }
      }
    },
    async loadProducts() {
      try {
        await this.fetchItems();
        this.products = this.$store.getters.allItems;
      } catch (error) {
        console.error('Error loading products:', error);
      }
    }
  },
  async created() {
    try {
      // Load products first
      await this.loadProducts();
      
      // Try to fetch cart from API if user is authenticated
      if (this.$store.getters.isAuthenticated) {
        await this.fetchCart();
      } else {
        // Fall back to localStorage if not authenticated
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        this.$store.commit('SET_CART', storedCart);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      // Fall back to localStorage on error
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      this.$store.commit('SET_CART', storedCart);
    }
  }
};
</script>

<style scoped>
.cart {
  min-height: 67vh;
  color: white;
}

.text-center {
  color: white;
}

.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center;
}

.table {
  color: white;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(255, 255, 255, 0.05);
}

.table th, .table td {
  border-color: rgba(255, 255, 255, 0.1);
}

.btn {
  margin: 0 2px;
}
</style>