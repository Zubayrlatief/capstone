// store/index.js

import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    items: [],
    loading: false,
    sortBy: 'name',
    searchQuery: '', // State to hold the search query
  },
  mutations: {
    SET_ITEMS(state, items) {
      state.items = items;
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading;
    },
    SET_SORT_BY(state, sortBy) {
      state.sortBy = sortBy;
    },
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query;
    },
    SORT_ITEMS(state) {
      if (state.sortBy === 'name') {
        state.items.sort((a, b) => a.prodName.localeCompare(b.prodName));
      } else if (state.sortBy === 'price') {
        state.items.sort((a, b) => a.amount - b.amount);
      }
    },
  },
  actions: {
    async fetchItems({ commit }) {
      commit('SET_LOADING', true);
      try {
        const response = await axios.get('https://capstone-2-p8rd.onrender.com/items');
        commit('SET_ITEMS', response.data);
        commit('SORT_ITEMS');
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    updateSortBy({ commit }, sortBy) {
      commit('SET_SORT_BY', sortBy);
      commit('SORT_ITEMS');
    },
    updateSearchQuery({ commit }, query) {
      commit('SET_SEARCH_QUERY', query);
    },
  },
  getters: {
    filteredItems: (state) => {
      if (!state.searchQuery) {
        return state.items;
      }
      return state.items.filter(item =>
        item.prodName.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
    isLoading: (state) => state.loading,
  },
});

export default store;
