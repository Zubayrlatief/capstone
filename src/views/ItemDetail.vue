<template>
  <div>

  
    <div v-if="item" class="item-detail">
      <h1>{{ item.prodName }}</h1>
      <img :src="item.prodURL" alt="Product Image" />
      <p>{{ item.description }}</p>
      <p>Price: {{ item.amount }}</p>
    </div>
  <div>

  
    <NavBar/>
    <div class="item-detail">
      <h1>Item Detail</h1>
  
      <!-- Check if itemDetail exists -->
      <div v-if="itemDetail">
        <!-- Use ItemCard to display the detailed view of the item -->
        <ItemCard :item="itemDetail" />
      </div>
  
      <div v-else>
        <p>Loading item details...</p>
      </div>
    </div>
    <FooterComp/>
  </div>
</div>
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
  