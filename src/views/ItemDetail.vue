<template>
    <NavBar />
    <div v-if="itemDetail">
      <h1>{{ itemDetail.prodName }}</h1>
      <p>{{ itemDetail.description }}</p>
      <!-- Other item details -->
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <FooterComp />
  </template>
  
  <script>
  import FooterComp from '@/components/FooterComp.vue';
  import NavBar from '@/components/NavBar.vue';
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    components: {
      NavBar,
      FooterComp
    },
    name: 'ItemDetail',
    props: {
      id: {
        type: String,
        required: true
      }
    },
    computed: {
      ...mapGetters(['itemDetail']),
    },
    async created() {
      if (this.id) {
        try {
          await this.fetchItem(this.id);
        } catch (error) {
          console.error('Error fetching item details:', error);
        }
      } else {
        console.error('No item ID provided');
      }
    },
    methods: {
      ...mapActions(['fetchItem']),
    },
  };
  </script>
  