<template>
  <div>
    <NavBar/>
    <div class="container mt-5">
      <h1 class="text-center mb-4">Admin Panel</h1>
      <button class="btn btn-primary mb-3" @click="fetchItems">Refresh Items</button>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.prodID">
            <td>{{ item.prodID }}</td>
            <td>{{ item.prodName }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.amount }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.category }}</td>
            <td>
              <button class="btn btn-warning btn-sm" @click="editItem(item.prodID)">Edit</button>
              <button class="btn btn-danger btn-sm" @click="deleteItem(item.prodID)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="currentItem !== null" class="mt-4">
        <h2>{{ currentItem.prodID ? 'Edit Item' : 'Add Item' }}</h2>
        <form @submit.prevent="saveItem">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input id="name" v-model="currentItem.prodName" class="form-control" placeholder="Name" required />
          </div>
          <div class="mb-3">
            <label for="quantity" class="form-label">Quantity</label>
            <input id="quantity" v-model="currentItem.quantity" type="number" class="form-control" placeholder="Quantity" required />
          </div>
          <div class="mb-3">
            <label for="amount" class="form-label">Amount</label>
            <input id="amount" v-model="currentItem.amount" type="number" step="0.01" class="form-control" placeholder="Amount" required />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea id="description" v-model="currentItem.description" class="form-control" placeholder="Description"></textarea>
          </div>
          <div class="mb-3">
            <label for="category" class="form-label">Category</label>
            <input id="category" v-model="currentItem.category" class="form-control" placeholder="Category" required />
          </div>
          <div class="mb-3">
      <label for="prodURL" class="form-label">Product URL</label>
      <input id="prodURL" v-model="currentItem.prodURL" class="form-control" placeholder="Product URL" />
    </div>

          <button type="submit" class="btn btn-success">Save</button>
        </form>
      </div>
    </div>
    <FooterComp/>
  </div>
</template>

<script>
import FooterComp from '@/components/FooterComp.vue';
import NavBar from '@/components/NavBar.vue';
import axios from 'axios';

export default {
  components: {
    FooterComp,
    NavBar
  },
  data() {
  return {
    items: [],
    currentItem: { prodID: null, prodName: '', quantity: '', amount: '', description: '', category: '', prodURL: '' },
  };
},
  methods: {
    async fetchItems() {
      try {
        const response = await axios.get('https://capstone-2-p8rd.onrender.com/items');
        this.items = response.data;
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },
    async deleteItem(id) {
      try {
        if (id) {
          const url = `https://capstone-2-p8rd.onrender.com/items/delete/${id}`;
          await axios.delete(url, {
            headers: { Authorization: `Bearer ${this.$store.state.token}` }
          });
          this.fetchItems(); // Refresh items after deletion
        } else {
          console.error('Item ID is undefined');
        }
      } catch (error) {
        console.error('Error deleting item:', error.response ? error.response.data : error.message);
      }
    },
    async editItem(id) {
  try {
    const response = await axios.get(`https://capstone-2-p8rd.onrender.com/items/${id}`);
    this.currentItem = response.data;
  } catch (error) {
    console.error('Error fetching item for edit:', error);
  }
},

async saveItem() {
  try {
    console.log('Saving item:', this.currentItem); 

    if (this.currentItem.prodID) {
      // Update existing item
      await axios.put(`https://capstone-2-p8rd.onrender.com/items/${this.currentItem.prodID}`, this.currentItem, {
        headers: { Authorization: `Bearer ${this.$store.state.token}` }
      });
    } else {
      // Add new item
      await axios.post('https://capstone-2-p8rd.onrender.com/items', this.currentItem, {
        headers: { Authorization: `Bearer ${this.$store.state.token}` }
      });
    }
    
    this.currentItem = null;
    this.fetchItems();
  } catch (error) {
    console.error('Error saving item:', error);
  }
}


  },
  mounted() {
    this.fetchItems();
  }
};

</script>

<style scoped>
.container {
  max-width: 1200px;
}
h1 {
  color: white;
}
.table {
  color: white;
}
.btn {
  margin-right: 10px;
}
</style>
