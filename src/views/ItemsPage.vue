<template>
    <div class="container">
      <div class="background-gradient"></div>
      <div class="row">
        <h2 class="display-2">Products</h2>
      </div>
      <div class="row justify-content-center my-2" v-if="allproducts.length">
        <div 
          v-for="(product, index) in allproducts" 
          :key="index" 
          class="col-lg-3 col-md-4 col-sm-6 mb-4"
          @click="goToProductDetails(product.prodID)">
          <CardPage>
            <template #cardHeader>
              <img 
                :src="product.prodURL" 
                loading="lazy" 
                class="img-fluid prod-img" 
                :alt="product.prodName" />
            </template>
            <template #cardBody>
              <div class="product-details">
                <p class="product-name">{{ product.prodName }}</p>
                <p class="product-price">R {{ product.amount }}</p>
              </div>
            </template>
          </CardPage>
        </div>
      </div>
      <div v-else>
        <Spinner />
      </div>
    </div>
  </template>
  
  <script>
  import CardPage from '../components/CardPage.vue';
  
  export default {
    name: 'ProductView',
    components: {
      CardPage
    },
    computed: {
      allproducts() {
        return this.$store.state.products;
      }
    },
    methods: {
      goToProductDetails(productId) {
        this.$router.push({ name: 'product', params: { id: productId } });
      }
    },
    mounted() {
      this.$store.dispatch('fetchProducts');
    }
  }
  </script>
  
  <style scoped>
  .background-gradient {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom right, #008080, #001F4D, #666e7a, #554671, #3f1d5a); 
    z-index: -2;
  }
  .container {
    padding: 20px;
  }
  .img-fluid {
    max-width: 100%;
    height: auto;
  }
  .prod-img {
    max-width: 100%; 
    height: 200px;
    object-fit: cover;
  }
  .product-details {
    text-align: center;
    margin-top: 10px;
  }
  .product-name {
    font-size: 1.1rem;
    font-weight: bold;
    color: #1b4774;
  }
  .product-price {
    font-size: 1.2rem;
    color: #280e39;
    margin-top: 5px;
  }
  @media (max-width: 768px) {
    .col-md-4 {
      max-width: 50%;
    }
    .col-sm-6 {
      max-width: 100%;
    }
  }
  </style>