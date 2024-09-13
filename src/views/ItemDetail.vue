<template>
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
  </template>
  
  <script>
  import FooterComp from '@/components/FooterComp.vue';
import ItemCard from '@/components/ItemCard.vue';
import NavBar from '@/components/NavBar.vue';
  import { mapActions, mapState } from 'vuex';
  
  export default {
    name: 'ItemDetail',
    components: {
      ItemCard,
      NavBar,
      FooterComp // Register ItemCard component
    },
    computed: {
      ...mapState(['itemDetail']) // Map itemDetail from Vuex store
    },
    methods: {
      ...mapActions(['fetchItem']),
    },
    created() {
      // Fetch item details when the component is created
      const itemID = this.$route.params.id; // Get item ID from route
      this.fetchItem(itemID);
    }
  };
  </script>
  
  <style scoped>
  .item-detail {
    padding: 20px;
    background-color: #361c1c;
    color: white;
  }
  </style>
  