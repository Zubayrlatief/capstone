<template>
  <div class="items-list">
    <NavBar />
    <h1>Item List</h1>

    <!-- Sorting Dropdown -->
    <div class="sorting-container">
      <label for="sortOrder">Sort by Price: </label>
      <select id="sortOrder" v-model="sortOrder" @change="sortItems">
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
    </div>

    <!-- Search Input -->
    <div class="search-container">
      <input
        type="text"
        placeholder="Search items by name..."
        v-model="searchQuery"
        @input="filterItems"
      />
    </div>

    <!-- Loading Spinner -->
    <div v-if="loading" class="loading-container">
      <LoadingSpinner />
    </div>

    <!-- Items Grid -->
    <div v-if="!loading && filteredItems.length" class="items-grid">
      <ItemCard
        v-for="item in filteredItems"
        :key="item.itemID"
        :item="item"
        @add-to-cart="handleAddToCart"
      />
    </div>

    <div v-else-if="!loading">
      <p>No items available</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ItemCard from '../components/ItemCard.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'ItemsList',
  components: {
    ItemCard,
    LoadingSpinner,
    NavBar
  },
  data() {
    return {
      loading: true,
      sortOrder: 'asc', // Default sort order
      searchQuery: '' // Search query
    };
  },
  computed: {
    ...mapGetters(['allItems']),
    filteredItems() {
      return this.sortedItems.filter(item =>
        item.prodName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    sortedItems() {
      return [...this.items].sort((a, b) => {
        if (this.sortOrder === 'asc') {
          return a.amount - b.amount;
        } else if (this.sortOrder === 'desc') {
          return b.amount - a.amount;
        }
        return 0;
      });
    },
    items() {
      return this.allItems;
    }
  },
  methods: {
    ...mapActions(['fetchItems', 'addToCart']),
    async loadItems() {
      try {
        await this.fetchItems();
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        this.loading = false;
      }
    },
    sortItems() {
      // Sorting is handled reactively by computed property sortedItems
    },
    filterItems() {
      // Filtering is handled reactively by computed property filteredItems
    },
    handleAddToCart(item) {
      this.$store.dispatch('addToCart', item); // Add item to cart via Vuex store
    }
  },
  created() {
    this.loadItems();
  }
};
</script>

<style scoped>
.items-list {
  padding: 20px;
}

.sorting-container {
  margin-bottom: 10px;
  text-align: center;
}

.search-container {
  margin-bottom: 20px;
  text-align: center;
}

.search-container input {
  padding: 8px;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.items-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.items-grid > * {
  flex: 1 1 300px;
}
</style>
