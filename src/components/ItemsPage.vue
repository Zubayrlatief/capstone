<template>
  <div>
    <h1>Items</h1>
    <ul>
      <li v-for="item in $store.state.items" :key="item.prodID">
        {{ item.prodName }} - {{ item.amount }}
      </li>
    </ul>
    <div>No items available.</div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ItemsPage',
  setup() {
    const store = useStore();

    // Computed properties to access Vuex state
    const items = computed(() => store.state.products);
    const isLoading = computed(() => store.state.isLoading);

    // Fetch products when the component is mounted
    onMounted(() => {
      store.dispatch('fetchProducts');
    });

    return {
      items,
      isLoading,
    };
  },
};
</script>

<style scoped>
/* Add styles here if needed */
</style>
