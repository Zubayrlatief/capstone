<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-black">
    <div class="container">
      <!-- Brand Logo -->
      <a class="navbar-brand" href="/">
        <img src="https://zubayrlatief.github.io/capestone-hosted-images/H (1)(2).jpg" alt="Brand Logo" class="navbar-logo">
      </a>

      <!-- Toggler Button for Burger Menu -->
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Collapsible Menu -->
      <div :class="['collapse', 'navbar-collapse', { show: isMenuOpen }]" id="navbarContent">
        <div class="navbar-nav ms-auto">
          <a class="nav-item nav-link" href="/philosophy">Philosophy</a>
          <a class="nav-item nav-link" href="/items">Store</a>
          <template v-if="isAdmin">
            <a class="nav-item nav-link" href="/admin">Admin</a>
          </template>
          
          <!-- Cart Dropdown -->
          <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="cartDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Cart <span class="badge bg-danger">{{ cartItemCount }}</span>
            </a>
            <div class="dropdown-menu dropdown-menu-end cart-dropdown" aria-labelledby="cartDropdown">
              <div v-if="cartItems.length === 0" class="dropdown-item text-center">
                Your cart is empty
              </div>
              <div v-else>
                <div v-for="item in cartItems.slice(0, 3)" :key="item.cartID || item.itemID" class="dropdown-item cart-item">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{{ getProductName(item.prodID) }}</strong>
                      <div>Qty: {{ item.quantity }} - R{{ formatPrice(getItemPrice(item)) }}</div>
                      <div class="text-muted">Subtotal: R{{ formatPrice(getItemTotal(item)) }}</div>
                    </div>
                    <button @click.stop="removeFromCart(item.cartID || item.itemID)" class="btn btn-sm btn-danger">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item text-center">
                  <div class="d-flex justify-content-between">
                    <span>Total:</span>
                    <span>R{{ formatPrice(calculateCartTotal()) }}</span>
                  </div>
                  <a href="/cart" class="btn btn-primary btn-sm mt-2 w-100">View Cart</a>
                </div>
              </div>
            </div>
          </div>
          
          <template v-if="!isLoggedIn">
            <a class="nav-item nav-link" href="/register">Sign Up</a>
            <a class="nav-item nav-link" href="/login">Sign In</a>
          </template>
          <template v-else>
            <a :href="accountPageUrl" class="d-flex align-items-center">
              <img :src="userImage" alt="User" class="user-image" />
            </a>
            <button class="btn btn-outline-light" @click="logout">Logout</button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import * as bootstrap from 'bootstrap';

export default {
  name: 'NavBar',
  data() {
    return {
      isMenuOpen: false,
      products: [],
      dropdownInstance: null
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'isAdmin', 'cartItems']),
    isLoggedIn() {
      return this.isAuthenticated;
    },
    userImage() {
      return this.isLoggedIn ? 'https://zubayrlatief.github.io/capestone-hosted-images/logo.png' : '';
    },
    accountPageUrl() {
      return '/account';
    },
    cartItemCount() {
      return this.cartItems.length;
    }
  },
  methods: {
    ...mapActions(['removeFromCart', 'fetchItems']),
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
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
        return item.totalPrice / item.quantity;
      }
      return item.amount || 0;
    },
    getItemTotal(item) {
      // Handle both API cart items and local cart items
      if (item.totalPrice !== undefined) {
        return Number(item.totalPrice);
      }
      return Number(item.amount || 0) * Number(item.quantity || 1);
    },
    calculateCartTotal() {
      let total = 0;
      this.cartItems.forEach(item => {
        total += this.getItemTotal(item);
      });
      return total;
    },
    async loadProducts() {
      try {
        await this.fetchItems();
        this.products = this.$store.getters.allItems;
      } catch (error) {
        console.error('Error loading products:', error);
      }
    },
    initDropdown() {
      // Initialize Bootstrap dropdown
      const dropdownElement = document.getElementById('cartDropdown');
      if (dropdownElement) {
        this.dropdownInstance = new bootstrap.Dropdown(dropdownElement);
      }
    }
  },
  async created() {
    await this.loadProducts();
  },
  mounted() {
    // Initialize dropdown after component is mounted
    this.$nextTick(() => {
      this.initDropdown();
    });
  }
};
</script>

<style scoped>
.navbar {
  background-color: black;
}

.navbar-brand,
.nav-link {
  color: white;
  font-size: large;
  font-family: "Pirata One", system-ui;
  text-shadow: 6px 6px 4px rgba(0, 0, 0, 0.8);
}

.navbar-logo {
  max-height: 50px;
  object-fit: contain;
}

.user-image {
  max-height: 40px;
  border-radius: 50%;
}

.cart-dropdown {
  min-width: 300px;
  max-height: 400px;
  overflow-y: auto;
  background-color: #222;
  color: white;
}

.cart-item {
  padding: 10px;
  border-bottom: 1px solid #444;
}

.cart-item:hover {
  background-color: #333;
}

.dropdown-item {
  color: white;
}

.dropdown-divider {
  border-top: 1px solid #444;
}

.badge {
  margin-left: 5px;
}

/* Ensure dropdown is visible */
.dropdown-menu.show {
  display: block;
}
</style>
