<template>
  <div class="container mt-4">
    <h1 class="mb-4">Item List</h1>

    <!-- Filter by Name Input -->
    <div class="mb-3">
      <input
        type="text"
        v-model="searchQuery"
        @input="updateSearch"
        class="form-control"
        placeholder="Filter items by name..."
      />
    </div>

    <!-- Sorting Options -->
    <div class="d-flex justify-content-end mb-3">
      <select v-model="selectedSort" @change="updateSorting" class="form-select w-auto">
        <option value="name">Sort by Name</option>
        <option value="price">Sort by Price</option>
      </select>
    </div>

    <!-- Spinner when loading -->
    <div v-if="isLoading" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <!-- Filtered Item List -->
    <div class="row" v-if="!isLoading && filteredItems.length">
      <div class="col-md-4" v-for="item in filteredItems" :key="item.itemID">
        <div class="card mb-4">
          <img :src="item.prodURL" :alt="item.prodName" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">{{ item.prodName }}</h5>
            <p class="card-text">{{ item.description }}</p>
            <p class="card-text"><strong>Price:</strong> ${{ item.amount }}</p>
            <p class="card-text"><strong>Category:</strong> {{ item.Category }}</p>
            <p class="card-text"><strong>Quantity:</strong> {{ item.quantity }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Fallback message when no items match the filter -->
    <p v-if="!isLoading && !filteredItems.length" class="text-center">No items match your filter.</p>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      selectedSort: 'name',
      searchQuery: '', // Local data for filtering
    };
  },
  computed: {
    ...mapState(['loading']),
    ...mapGetters(['filteredItems']), // Use the filtered items from the store
  },
  created() {
    this.fetchItems();
  },
  methods: {
    ...mapActions(['fetchItems', 'updateSortBy', 'updateSearchQuery']),
    updateSorting() {
      this.updateSortBy(this.selectedSort);
    },
    updateSearch() {
      this.updateSearchQuery(this.searchQuery);
    },
  },
};
</script>

<style scoped>
.card-img-top {
  height: 400px;
  object-fit: cover;
}
</style>
