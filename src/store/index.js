import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state() {
    return {
      items: [],
      cart: [], // Cart state
    };
  },
  mutations: {
    SET_ITEMS(state, items) {
      state.items = items;
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
        // Increment quantity if item is already in cart
        existingItem.quantity += 1;
      } else {
        // Add new item to cart with initial quantity
        state.cart.push({ ...item, quantity: 1 });
      }
    },
    REMOVE_FROM_CART(state, itemID) {
      state.cart = state.cart.filter(item => item.itemID !== itemID);
    },
    UPDATE_CART_ITEM_QUANTITY(state, { itemID, quantity }) {
      const item = state.cart.find(cartItem => cartItem.itemID === itemID);
      if (item) {
        item.quantity = quantity;
      }
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
    addToCart({ commit }, item) {
      commit('ADD_TO_CART', item);
    },
    removeFromCart({ commit }, itemID) {
      commit('REMOVE_FROM_CART', itemID);
    },
    updateCartItemQuantity({ commit }, { itemID, quantity }) {
      commit('UPDATE_CART_ITEM_QUANTITY', { itemID, quantity });
    }
  },
  getters: {
    allItems(state) {
      return state.items;
    },
    cartItems(state) {
      return state.cart;
    },
    cartTotal(state) {
      return state.cart.reduce((total, item) => total + item.quantity * item.amount, 0);
    }
  },
});

export default store;
