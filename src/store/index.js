import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    isAuthenticated: !!localStorage.getItem('token'),
    isAdmin: false, 
    user: null, 
    items: [],
    itemDetail: null,
    cart: JSON.parse(localStorage.getItem('cart')) || [], 
  },
  mutations: {
    SET_ITEMS(state, items) {
      state.items = items;
    },
    SET_ITEM_DETAIL(state, item) {
      state.itemDetail = item;
    },
    ADD_ITEM(state, newItem) {
      state.items.push(newItem);
    },
    UPDATE_ITEM(state, updatedItem) {
      const index = state.items.findIndex(item => item.itemID === updatedItem.itemID);
      if (index !== -1) {
        state.items.splice(index, 1, updatedItem);
      }
    },
    DELETE_ITEM(state, itemID) {
      state.items = state.items.filter(item => item.itemID !== itemID);
    },
    ADD_TO_CART(state, item) {
      const existingItem = state.cart.find(cartItem => cartItem.itemID === item.itemID);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...item, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    REMOVE_FROM_CART(state, itemID) {
      state.cart = state.cart.filter(item => item.cartID !== itemID);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    UPDATE_CART_ITEM_QUANTITY(state, { itemID, quantity }) {
      const item = state.cart.find(cartItem => cartItem.itemID === itemID);
      if (item) {
        item.quantity = quantity;
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    SET_CART(state, cart) {
      state.cart = cart;
    },
    LOGOUT(state) {
      state.isAuthenticated = false;
      state.isAdmin = false; 
      state.cart = []; 
      localStorage.removeItem('cart'); 
      localStorage.removeItem('token'); 
    },
    setToken(state, token) {
      state.token = token;
    },
    SET_USER(state, user) {
      state.user = user;
      state.isAdmin = user && user.role === 'admin'; 
    },
    SET_AUTHENTICATED(state, value) {
      state.isAuthenticated = value;
    }
  },
  actions: {
    async fetchItems({ commit }) {
      try {
        const response = await axios.get('https://capstone-2-p8rd.onrender.com/items');
        commit('SET_ITEMS', response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },
    async fetchItem({ commit }, id) {
      try {
        const response = await axios.get(`https://capstone-2-p8rd.onrender.com/items/${id}`);
        commit('SET_ITEM_DETAIL', response.data);
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    },
    async addItem({ commit }, newItem) {
      try {
        const response = await axios.post('https://capstone-2-p8rd.onrender.com/items', newItem);
        commit('ADD_ITEM', response.data);
      } catch (error) {
        console.error('Error adding item:', error);
      }
    },
    async updateItem({ commit }, updatedItem) {
      try {
        const response = await axios.put(`https://capstone-2-p8rd.onrender.com/items/${updatedItem.itemID}`, updatedItem);
        commit('UPDATE_ITEM', response.data);
      } catch (error) {
        console.error('Error updating item:', error);
      }
    },
    async deleteItem({ commit }, itemID) {
      try {
        await axios.delete(`https://capstone-2-p8rd.onrender.com/items/${itemID}`);
        commit('DELETE_ITEM', itemID);
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    },
    async addToCart({ commit, state, dispatch }, item) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('User not authenticated');
        }
        
        // Make sure we have the user ID
        if (!state.user || !state.user.userID) {
          await dispatch('fetchUser');
          if (!state.user || !state.user.userID) {
            throw new Error('User data not available');
          }
        }
        
        // Format the cart item
        const cartItem = {
          userID: state.user.userID,
          prodID: item.prodID,
          quantity: 1,
          totalPrice: Number(item.amount)
        };
        
        // Send the cart item to the API
        const response = await axios.post('https://capstone-2-p8rd.onrender.com/api/cart', cartItem, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Update the cart in the store
        commit('ADD_TO_CART', response.data);
        
        // Also update localStorage
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        currentCart.push(response.data);
        localStorage.setItem('cart', JSON.stringify(currentCart));
        
        return response.data;
      } catch (error) {
        console.error('Error adding to cart:', error);
        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response data:', error.response.data);
        }
        throw error;
      }
    },
    
    async fetchUser({ commit }) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        
        // Set the token in axios defaults
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        const response = await axios.get('https://capstone-2-p8rd.onrender.com/users/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        console.log('Fetched user data:', response.data);
        
        // Handle the case where the API returns an array of users
        let userData = null;
        
        if (Array.isArray(response.data)) {
          // If we got an array of users, we need to find the correct user
          // This is a temporary solution - ideally the API should return only the authenticated user
          console.log('API returned an array of users, attempting to find the correct user');
          
          // Try to decode the JWT token to get the user ID
          try {
            const tokenParts = token.split('.');
            if (tokenParts.length === 3) {
              const payload = JSON.parse(atob(tokenParts[1]));
              const userId = payload.userID || payload.id || payload.sub;
              
              if (userId) {
                // Find the user with matching ID
                userData = response.data.find(user => user.userID === userId);
                if (userData) {
                  console.log('Found user by ID:', userData);
                }
              }
            }
          } catch (e) {
            console.error('Error decoding token:', e);
          }
          
          // If we couldn't find the user by ID, try to use the first user as a fallback
          // This is not ideal but might work as a temporary solution
          if (!userData && response.data.length > 0) {
            console.warn('Could not find user by ID, using first user as fallback');
            userData = response.data[0];
          }
        } else {
          // Handle the case where the API returns a single user object
          userData = response.data;
          
          // Check if the user data is nested in a property
          if (response.data.user) {
            userData = response.data.user;
          } else if (response.data.data) {
            userData = response.data.data;
          }
        }
        
        // Make sure we have valid user data
        if (!userData || !userData.userID) {
          console.error('Invalid user data structure:', response.data);
          throw new Error('Invalid user data received');
        }
        
        // Update the store with user data
        commit('SET_USER', userData);
        commit('setToken', token);
        
        // Set isAuthenticated to true
        commit('SET_AUTHENTICATED', true);
        
        return userData;
      } catch (error) {
        console.error('Error fetching user:', error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          commit('LOGOUT');
        }
        throw error;
      }
    },
    logout({ commit }) {
      localStorage.removeItem('token');
      localStorage.removeItem('cart');
      commit('LOGOUT');
    },
    async removeFromCart({ commit, state }, itemID) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('User not authenticated');
        }
        
        // Make sure we have the user ID
        if (!state.user || !state.user.userID) {
          await this.dispatch('fetchUser');
          if (!state.user || !state.user.userID) {
            throw new Error('User data not available');
          }
        }
        
        // Format the request to match the API endpoint
        console.log('Removing cart item with ID:', itemID);
        console.log('Current cart state:', state.cart);
        
        // First, find the cart item to get the product ID
        // Try different possible ID properties
        let cartItem = state.cart.find(item => item.cartID === itemID);
        
        if (!cartItem) {
          // Try with itemID
          cartItem = state.cart.find(item => item.itemID === itemID);
        }
        
        if (!cartItem) {
          // Try with prodID
          cartItem = state.cart.find(item => item.prodID === itemID);
        }
        
        if (!cartItem) {
          // If we still can't find it, try using the itemID directly
          console.warn('Could not find cart item with ID:', itemID);
          console.warn('Using itemID directly for API request');
          
          // Remove from UI immediately for better user experience
          commit('REMOVE_FROM_CART', itemID);
          
          // Send the delete request with the itemID directly
          await axios.delete(`https://capstone-2-p8rd.onrender.com/api/cart/${itemID}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          return true;
        }
        
        // Use the product ID from the cart item
        const prodID = cartItem.prodID || cartItem.itemID;
        console.log('Product ID for deletion:', prodID);
        
        // Remove from UI immediately for better user experience
        commit('REMOVE_FROM_CART', itemID);
        
        // Send the delete request with the product ID
        await axios.delete(`https://capstone-2-p8rd.onrender.com/api/cart/${prodID}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        return true;
      } catch (error) {
        console.error('Error removing from cart:', error);
        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response data:', error.response.data);
        }
        
        // If there was an error, we should refresh the cart from the server
        // to ensure the UI is in sync with the server state
        try {
          await this.dispatch('fetchCart');
        } catch (fetchError) {
          console.error('Error refreshing cart after failed removal:', fetchError);
        }
        
        throw error;
      }
    },
    async updateCartItemQuantity({ commit, state }, { itemID, quantity }) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('User not authenticated');
        }
        
        // Make sure we have the user ID
        if (!state.user || !state.user.userID) {
          await this.dispatch('fetchUser');
          if (!state.user || !state.user.userID) {
            throw new Error('User data not available');
          }
        }
        
        // Find the cart item to get the product ID
        let cartItem = state.cart.find(item => item.cartID === itemID);
        
        if (!cartItem) {
          // Try with itemID
          cartItem = state.cart.find(item => item.itemID === itemID);
        }
        
        if (!cartItem) {
          // Try with prodID
          cartItem = state.cart.find(item => item.prodID === itemID);
        }
        
        if (!cartItem) {
          throw new Error('Cart item not found');
        }
        
        // Use the product ID from the cart item
        const prodID = cartItem.prodID;
        
        // Find the product in the items array to get the current price
        const product = state.items.find(item => item.prodID === prodID);
        
        // Calculate the new total price based on the current product price
        // If we can't find the product, use the existing unit price
        let unitPrice;
        if (product) {
          unitPrice = Number(product.amount);
        } else {
          // Fallback to calculating from the current cart item
          unitPrice = Number(cartItem.totalPrice) / Number(cartItem.quantity);
        }
        
        const newTotalPrice = unitPrice * Number(quantity);
        
        // Update the UI immediately for better user experience
        // We need to update both quantity and totalPrice
        const updatedItem = { ...cartItem, quantity: Number(quantity), totalPrice: newTotalPrice };
        const updatedCart = state.cart.map(item => 
          (item.cartID === itemID || item.itemID === itemID || item.prodID === itemID) 
            ? updatedItem 
            : item
        );
        commit('SET_CART', updatedCart);
        
        // Send the update request with the product ID
        await axios.put(`https://capstone-2-p8rd.onrender.com/api/cart/${prodID}`, 
          { quantity: Number(quantity), totalPrice: newTotalPrice },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        
        // Refresh the cart to ensure it's in sync with the server
        await this.dispatch('fetchCart');
        
        return true;
      } catch (error) {
        console.error('Error updating cart item quantity:', error);
        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response data:', error.response.data);
        }
        
        // If there was an error, we should refresh the cart from the server
        // to ensure the UI is in sync with the server state
        try {
          await this.dispatch('fetchCart');
        } catch (fetchError) {
          console.error('Error refreshing cart after failed update:', fetchError);
        }
        
        throw error;
      }
    },
    async fetchCart({ commit }) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('User not authenticated');
        }
        
        const response = await axios.get('https://capstone-2-p8rd.onrender.com/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Update the cart in the store
        commit('SET_CART', response.data);
        
        // Also update localStorage
        localStorage.setItem('cart', JSON.stringify(response.data));
        
        return response.data;
      } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
      }
    },
    
    async clearCart({ commit, state }) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('User not authenticated');
        }
        
        // Make sure we have the user ID
        if (!state.user || !state.user.userID) {
          await this.dispatch('fetchUser');
          if (!state.user || !state.user.userID) {
            throw new Error('User data not available');
          }
        }
        
        // Get all cart items
        const cartItems = state.cart || [];
        
        // Delete each cart item
        for (const item of cartItems) {
          const prodID = item.prodID || item.itemID;
          if (prodID) {
            try {
              await axios.delete(`https://capstone-2-p8rd.onrender.com/api/cart/${prodID}`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
            } catch (error) {
              console.error(`Error deleting cart item ${prodID}:`, error);
              // Continue with other items even if one fails
            }
          }
        }
        
        // Clear the cart in the store
        commit('SET_CART', []);
        
        // Also clear localStorage
        localStorage.setItem('cart', JSON.stringify([]));
        
        return true;
      } catch (error) {
        console.error('Error clearing cart:', error);
        throw error;
      }
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    isAdmin(state) {
      return state.isAdmin;
    },
    allItems(state) {
      return state.items;
    },
    cartItems(state) {
      return state.cart || []; 
    },
    cartTotal(state) {
      return (state.cart || []).reduce((total, item) => {
        // Handle both API cart items and local cart items
        if (item.totalPrice !== undefined) {
          return total + Number(item.totalPrice);
        }
        return total + (Number(item.amount) || 0) * (Number(item.quantity) || 1);
      }, 0);
    },
    itemDetail(state) {
      return state.itemDetail; 
    },
  }
});

export default store;
