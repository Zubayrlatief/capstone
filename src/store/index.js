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
      state.cart = state.cart.filter(item => item.itemID !== itemID);
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
    async addToCart({ commit }, item) {
      try {
        const response = await axios.post('https://capstone-2-p8rd.onrender.com/api/cart', item);
        commit('ADD_TO_CART', response.data);
      } catch (error) {
        console.error('Error adding to cart:', error.response ? error.response.data : error.message);
        throw error;
      }
    },
    
    async fetchUser({ commit }) {
      try {
        const response = await axios.get('https://capstone-2-p8rd.onrender.com/users/users/me');
        console.log('Fetched user data:', response.data); 
        commit('SET_USER', response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          commit('LOGOUT');
        }
      }
    },
    logout({ commit }) {
      localStorage.removeItem('token');
      localStorage.removeItem('cart');
      commit('LOGOUT');
    },
    async removeFromCart({ commit }, itemID) {
      try {
        await axios.delete(`https://capstone-2-p8rd.onrender.com/cart/${itemID}`);
        commit('REMOVE_FROM_CART', itemID);
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    },
    async updateCartItemQuantity({ commit }, { itemID, quantity }) {
      try {
        await axios.patch(`https://capstone-2-p8rd.onrender.com/cart/${itemID}`, { quantity });
        commit('UPDATE_CART_ITEM_QUANTITY', { itemID, quantity });
      } catch (error) {
        console.error('Error updating cart item quantity:', error);
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
      return (state.cart || []).reduce((total, item) => total + item.quantity * item.amount, 0);
    },
    itemDetail(state) {
      return state.itemDetail; 
    },
  }
});

export default store;
