<template>
  <div class="item-card">
    <img :src="item.prodURL" alt="Item Image" />
    <h2>{{ item.prodName }}</h2>
    <p>R{{ formatAmount(item.amount) }}</p>
    <button id="bottone1" @click.stop="addToCart(item)"><h6>add to Cart</h6> </button>
    <button  id="bottone1"  @click="viewItemDetails(item.prodID)"><h6>View Item</h6></button>
    
    <!-- Add to Cart Notification -->
    <div v-if="showNotification" class="add-to-cart-notification">
      <div class="notification-content">
        <i class="bi bi-check-circle-fill"></i>
        <span>Added to cart!</span>
      </div>
    </div>
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
  data() {
    return {
      showNotification: false,
      notificationTimeout: null
    };
  },
  methods: {
    formatAmount(amount) {
      return typeof amount === 'number'
        ? amount.toFixed(2)
        : Number(amount).toFixed(2);
    },
    async addToCart(item) {
      if (this.$store.getters.isAuthenticated) {
        try {
          // Check if user data is available
          if (!this.$store.state.user || !this.$store.state.user.userID) {
            // Try to fetch user data if not available
            await this.$store.dispatch('fetchUser');
            
            // Check again after fetching
            if (!this.$store.state.user || !this.$store.state.user.userID) {
              alert('Unable to add to cart: User data not available. Please try logging in again.');
              return;
            }
          }
          
          await this.$store.dispatch('addToCart', item);
          
          // Show notification
          this.showNotification = true;
          
          // Clear any existing timeout
          if (this.notificationTimeout) {
            clearTimeout(this.notificationTimeout);
          }
          
          // Hide notification after 2 seconds
          this.notificationTimeout = setTimeout(() => {
            this.showNotification = false;
          }, 2000);
          
        } catch (error) {
          if (error.message === 'User not authenticated') {
            alert('Please sign in to add items to your cart.');
          } else {
            console.error('Add to cart error:', error);
            alert('Error adding item to cart. Please try again.');
          }
        }
      } else {
        alert('Please sign in to add items to your cart.');
      }
    },
    viewItemDetails(prodID) {
      this.$router.push(`/items/${prodID}`);
    },
  },
  beforeUnmount() {
    // Clear timeout when component is unmounted
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }
  }
};
</script>

<style scoped>
.item-card {
  border: 1px solid #631a1a;
  background-color: black;
  padding: 50px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  position: relative;
}
.item-card img {
  max-width: 100%;
  height: auto;
}
.item-card button {
  margin-top: 10px;
}

/* button styling */
#bottone1 {
  margin: 2%;
  padding-top: 10px;
 padding-left: 30px;
 padding-right: 33px;
 padding-bottom: 10px;
 border-radius: 6px;
 background: #fffbfb;
 border: none;
 font-family: inherit;
 text-align: center;
 cursor: pointer;
 transition: 0.4s;
}

#bottone1:hover {
 box-shadow: 7px 5px 56px -14px #bfbfbc;
}

#bottone1:active {
 transform: scale(0.97);
 box-shadow: 7px 5px 56px -10px #ffffff;
}

.add-to-cart-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.notification-content i {
  font-size: 1.2rem;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
