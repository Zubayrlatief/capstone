<template>
  <div>
    <NavBar />
    <div class="item-detail">
      <h1 v-if="item">{{ item.prodName }}</h1>
      <img v-if="item" :src="item.prodURL" alt="Product Image" />
      <p v-if="item">{{ item.description }}</p>
      <p v-if="item">Price: {{ item.amount }}</p>
      <div v-else>
        <p>Loading item details...</p>
      </div>
    </div>
    <FooterComp />
  </div>
</template>

<script>
import FooterComp from '@/components/FooterComp.vue';
import NavBar from '@/components/NavBar.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ItemDetail',
  components: {
    NavBar,
    FooterComp
  },
  computed: {
    ...mapGetters(['itemDetail']),
    item() {
      return this.itemDetail;
    },
  },
  methods: {
    ...mapActions(['fetchItem']),
    async loadItem() {
      try {
        const itemID = this.$route.params.id; // Fetch the ID from the route
        await this.fetchItem(itemID); // Fetch item using Vuex action
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    },
  },
  created() {
    this.loadItem(); // Load item details when the component is created
  },
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
