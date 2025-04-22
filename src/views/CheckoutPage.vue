<template>
  <NavBar />
  <div class="checkout container mt-5">
    <h2 class="text-center">Checkout</h2>
    
    <!-- Order Summary Section -->
    <div v-if="cartItems.length && !orderComplete" class="order-summary">
      <h3 class="mb-4">Order Summary</h3>
      <div class="table-responsive">
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
            <tr v-for="item in cartItems" :key="item.cartID || item.itemID">
              <td>{{ getProductName(item.prodID) }}</td>
              <td>{{ item.quantity }}</td>
              <td>R{{ formatPrice(getItemPrice(item)) }}</td>
              <td>R{{ formatPrice(getItemTotal(item)) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-end"><strong>Subtotal:</strong></td>
              <td>R{{ formatPrice(cartTotal) }}</td>
            </tr>
            <tr>
              <td colspan="3" class="text-end"><strong>Tax (10%):</strong></td>
              <td>R{{ formatPrice(cartTotal * 0.1) }}</td>
            </tr>
            <tr>
              <td colspan="3" class="text-end"><strong>Total:</strong></td>
              <td>R{{ formatPrice(cartTotal * 1.1) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      <!-- Payment Information Form -->
      <div class="payment-form mt-4">
        <h3 class="mb-4">Payment Information</h3>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="cardName" class="form-label">Name on Card</label>
            <input type="text" class="form-control" id="cardName" v-model="paymentInfo.cardName" required>
          </div>
          <div class="col-md-6 mb-3">
            <label for="cardNumber" class="form-label">Card Number</label>
            <input type="text" class="form-control" id="cardNumber" v-model="paymentInfo.cardNumber" placeholder="XXXX XXXX XXXX XXXX" required>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mb-3">
            <label for="expiryDate" class="form-label">Expiry Date</label>
            <input type="text" class="form-control" id="expiryDate" v-model="paymentInfo.expiryDate" placeholder="MM/YY" required>
          </div>
          <div class="col-md-4 mb-3">
            <label for="cvv" class="form-label">CVV</label>
            <input type="text" class="form-control" id="cvv" v-model="paymentInfo.cvv" placeholder="XXX" required>
          </div>
          <div class="col-md-4 mb-3">
            <label for="zipCode" class="form-label">ZIP Code</label>
            <input type="text" class="form-control" id="zipCode" v-model="paymentInfo.zipCode" required>
          </div>
        </div>
        
        <!-- Shipping Information -->
        <h3 class="mb-4 mt-4">Shipping Information</h3>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="address" class="form-label">Address</label>
            <input type="text" class="form-control" id="address" v-model="shippingInfo.address" required>
          </div>
          <div class="col-md-6 mb-3">
            <label for="city" class="form-label">City</label>
            <input type="text" class="form-control" id="city" v-model="shippingInfo.city" required>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="state" class="form-label">State/Province</label>
            <input type="text" class="form-control" id="state" v-model="shippingInfo.state" required>
          </div>
          <div class="col-md-6 mb-3">
            <label for="country" class="form-label">Country</label>
            <input type="text" class="form-control" id="country" v-model="shippingInfo.country" required>
          </div>
        </div>
        
        <div class="text-center mt-4">
          <button @click="completeCheckout" class="btn btn-success btn-lg" :disabled="isProcessing">
            <span v-if="isProcessing" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            {{ isProcessing ? 'Processing...' : 'Complete Purchase' }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Order Confirmation -->
    <div v-else-if="orderComplete" class="order-confirmation text-center">
      <div class="confirmation-icon mb-4">
        <i class="bi bi-check-circle-fill"></i>
      </div>
      <h2 class="mb-4">Thank You for Your Order!</h2>
      <p class="mb-4">Your order has been successfully placed and is on its way.</p>
      <p class="mb-4">Order confirmation has been sent to your email.</p>
      <div class="mt-4">
        <router-link to="/items" class="btn btn-primary">Continue Shopping</router-link>
      </div>
    </div>
    
    <!-- Empty Cart Message -->
    <div v-else class="empty-cart text-center">
      <p>Your cart is empty!</p>
      <router-link to="/items" class="btn btn-primary mt-3">Continue Shopping</router-link>
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
      orderComplete: false,
      isProcessing: false,
      products: [],
      paymentInfo: {
        cardName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        zipCode: ''
      },
      shippingInfo: {
        address: '',
        city: '',
        state: '',
        country: ''
      }
    };
  },
  computed: {
    ...mapGetters(['cartItems', 'cartTotal'])
  },
  methods: {
    ...mapActions(['clearCart', 'fetchItems']),
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
    async completeCheckout() {
      // Validate form fields
      if (!this.validateForm()) {
        alert('Please fill in all required fields correctly.');
        return;
      }
      
      this.isProcessing = true;
      
      try {
        // In a real application, you would send the payment information to a payment processor
        // For this demo, we'll just simulate a successful payment
        
        // Clear the cart
        await this.clearCart();
        
        // Show order confirmation
        this.orderComplete = true;
        
        // Reset form
        this.resetForm();
      } catch (error) {
        console.error('Error completing purchase:', error);
        alert('There was an error processing your order. Please try again.');
      } finally {
        this.isProcessing = false;
      }
    },
    validateForm() {
      // Basic validation
      return (
        this.paymentInfo.cardName.trim() !== '' &&
        this.paymentInfo.cardNumber.trim() !== '' &&
        this.paymentInfo.expiryDate.trim() !== '' &&
        this.paymentInfo.cvv.trim() !== '' &&
        this.paymentInfo.zipCode.trim() !== '' &&
        this.shippingInfo.address.trim() !== '' &&
        this.shippingInfo.city.trim() !== '' &&
        this.shippingInfo.state.trim() !== '' &&
        this.shippingInfo.country.trim() !== ''
      );
    },
    resetForm() {
      this.paymentInfo = {
        cardName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        zipCode: ''
      };
      this.shippingInfo = {
        address: '',
        city: '',
        state: '',
        country: ''
      };
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
    await this.loadProducts();
  }
};
</script>

<style scoped>
.checkout {
  min-height: 67vh;
  color: white;
}

.order-summary, .order-confirmation, .empty-cart {
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
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

.form-label {
  color: white;
}

.confirmation-icon {
  font-size: 5rem;
  color: #28a745;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}
</style>
