<template>
    <div v-if="item" class="item-detail">
      <h1>{{ item.prodName }}</h1>
      <img :src="item.prodURL" alt="Product Image" />
      <p>{{ item.description }}</p>
      <p>Price: {{ item.amount }}</p>
    </div>
    <div v-else-if="loading">Loading...</div>
    <div v-else>Error loading item details</div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    name: 'ItemDetail',
    data() {
      return {
        loading: true,
        error: null
      };
    },
    computed: {
      ...mapGetters(['itemDetail']),
      item() {
        return this.itemDetail;
      }
    },
    methods: {
      ...mapActions(['fetchItem']),
      async loadItem() {
        try {
          const itemID = this.$route.params.id; 
          await this.fetchItem(itemID); 
        } catch (error) {
          console.error("Error fetching item:", error);
          this.error = 'Failed to load item';
        } finally {
          this.loading = false;
        }
      }
    },  
    created() {
      this.loadItem();
    }
  };
  </script>
  
  <style scoped>
  .item-detail {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }
  .item-detail img {
    width: 100%;
    max-height: 400px;
    object-fit: contain;
  }
  </style>
  