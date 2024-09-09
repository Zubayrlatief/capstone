<template>
    <div class="admin-page container">
      <h1>Admin Panel</h1>
      
      <!-- Form for Creating/Updating Items -->
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="prodName" class="form-label">Product Name</label>
          <input type="text" class="form-control" id="prodName" v-model="item.prodName" required>
        </div>
        <div class="mb-3">
          <label for="quantity" class="form-label">Quantity</label>
          <input type="number" class="form-control" id="quantity" v-model="item.quantity" required>
        </div>
        <div class="mb-3">
          <label for="amount" class="form-label">Amount</label>
          <input type="number" class="form-control" id="amount" v-model="item.amount" required>
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea class="form-control" id="description" v-model="item.description"></textarea>
        </div>
        <div class="mb-3">
          <label for="category" class="form-label">Category</label>
          <input type="text" class="form-control" id="category" v-model="item.Category" required>
        </div>
        <div class="mb-3">
          <label for="prodURL" class="form-label">Product URL</label>
          <input type="text" class="form-control" id="prodURL" v-model="item.prodURL" required>
        </div>
        <button type="submit" class="btn btn-primary">{{ isEditing ? 'Update' : 'Create' }} Item</button>
      </form>
  
      <!-- List of Items with Delete Option -->
      <h2 class="mt-5">Manage Items</h2>
      <ul class="list-group">
        <li v-for="item in items" :key="item.itemID" class="list-group-item d-flex justify-content-between align-items-center">
          {{ item.prodName }}
          <div>
            <button @click="editItem(item)" class="btn btn-secondary btn-sm">Edit</button>
            <button @click="deleteItem(item.itemID)" class="btn btn-danger btn-sm">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { mapActions, mapState } from 'vuex';
  
  export default {
    data() {
      return {
        item: {
          prodName: '',
          quantity: 0,
          amount: 0,
          description: '',
          Category: '',
          prodURL: '',
        },
        isEditing: false,
        editItemID: null,
      };
    },
    computed: {
      ...mapState(['items']),
    },
    methods: {
      ...mapActions(['createItem', 'updateItem', 'deleteItem', 'fetchItems']),
      submitForm() {
        if (this.isEditing) {
          this.updateItem({ ...this.item, itemID: this.editItemID });
        } else {
          this.createItem(this.item);
        }
        this.resetForm();
      },
      resetForm() {
        this.item = {
          prodName: '',
          quantity: 0,
          amount: 0,
          description: '',
          Category: '',
          prodURL: '',
        };
        this.isEditing = false;
        this.editItemID = null;
      },
      editItem(item) {
        this.item = { ...item };
        this.isEditing = true;
        this.editItemID = item.itemID;
      },
      deleteItem(itemID) {
        this.deleteItem(itemID);
      },
    },
    created() {
      this.fetchItems();
    },
  };
  </script>
  
  <style scoped>
  .admin-page {
    max-width: 800px;
    margin: 0 auto;
  }
  </style>
  