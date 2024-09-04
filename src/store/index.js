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
  },
  actions: {
    async fetchItems({ commit }) {
      try {
        // Replace with your actual backend URL
        const response = await axios.get('https://capstone-2-p8rd.onrender.com/items');
        console.log('Fetched items:', response.data);
        commit('SET_ITEMS', response.data);
      } catch (error) {
        console.error('Request error:', error.response ? error.response.data : error.message);
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
