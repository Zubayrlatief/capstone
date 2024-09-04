<template>
    <div class="item-card">
      <img :src="item.prodURL" alt="Item Image" class="item-image">
      <div class="item-info">
        <h2 class="item-name">{{ item.prodName }}</h2>
        <p class="item-description">{{ item.description }}</p>
        <p class="item-price">Price: ${{ item.amount }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ItemCard',
    props: {
      item: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .item-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin: 16px;
    max-width: 300px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .item-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .item-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .item-info {
    margin-top: 12px;
  }
  
  .item-name {
    font-size: 1.2em;
    margin: 0;
    color: #333;
  }
  
  .item-description {
    font-size: 1em;
    margin: 8px 0;
    color: #666;
  }
  
  .item-price {
    font-size: 1.1em;
    color: #333;
  }
  </style>
  