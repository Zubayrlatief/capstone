import { createStore } from 'vuex'; // Import createStore from vuex
import axios from 'axios';

const store = createStore({
  state() {
    return {
      items: [],
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
  },
  actions: {
    async fetchItems({ commit }) {
      try {
        const response = await axios.get('https://capstone-2-p8rd.onrender.com/items');
        console.log('Fetched items:', response.data);
        commit('SET_ITEMS', response.data);
      } catch (error) {
        console.error('Request error:', error.response ? error.response.data : error.message);
      }
    },
    async addItem({ commit }, newItem) {
      try {
        const response = await axios.post('https://capstone-2-p8rd.onrender.com/items', newItem);
        commit('ADD_ITEM', response.data);
      } catch (error) {
        console.error('Error adding item:', error.response ? error.response.data : error.message);
      }
    },
    async updateItem({ commit }, updatedItem) {
      try {
        const response = await axios.put(`https://capstone-2-p8rd.onrender.com/items/${updatedItem.itemID}`, updatedItem);
        commit('UPDATE_ITEM', response.data);
      } catch (error) {
        console.error('Error updating item:', error.response ? error.response.data : error.message);
      }
    },
    async deleteItem({ commit }, itemID) {
      try {
        await axios.delete(`https://capstone-2-p8rd.onrender.com/items/${itemID}`);
        commit('DELETE_ITEM', itemID);
      } catch (error) {
        console.error('Error deleting item:', error.response ? error.response.data : error.message);
      }
    },
  },
  getters: {
    allItems(state) {
      return state.items;
    },
  },
});

export default store;
