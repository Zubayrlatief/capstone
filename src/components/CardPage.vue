<template>
    <div class="card">
      <div class="card-header">
        <slot name="cardHeader"></slot>
      </div>
      <div class="card-body">
        <slot name="cardBody"></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CardPage',
  };
  </script>
  
  <style scoped>
  .card {
    width: 18rem;
    border: 1px solid #49484a;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .card-header {
    background-color: #1e1f20;
    padding: 0.75rem;
    border-bottom: 1px solid #1f1e1e;
  }
  
  .card-body {
    padding: 1rem;
  }
  </style>