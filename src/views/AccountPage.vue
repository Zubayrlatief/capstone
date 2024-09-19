<template>
  <div>
    <NavBar />
    <div class="account-page container mt-5">
      <h2 class="text-center">Account Details</h2>

      <div v-if="loading" class="text-center">
        <LoadingSpinner />
      </div>

      <div v-else>
        <div v-if="!isEditing">
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">Account Information</h5>
              <p><strong>Name:</strong> {{ user.firstName }} {{ user.lastName }}</p>
              <p><strong>Email:</strong> {{ user.emailAdd }}</p>
              <p><strong>Age:</strong> {{ user.userAge }}</p>
              <p><strong>Gender:</strong> {{ user.Gender }}</p>
              <p><strong>Role:</strong> {{ user.userRole }}</p>
              <p><strong>Profile URL:</strong> <a :href="user.userProfile" target="_blank">{{ user.userProfile }}</a></p>
              <button class="btn btn-primary" @click="isEditing = true">Edit</button>
              <button class="btn btn-primary" @click="deleteAccount">Delete Account</button>
            </div>
          </div>
          <router-link to="/cart" class="btn btn-secondary">View Cart</router-link>
          
          <router-link to="/admin" class="btn btn-secondary mt-2">Admin Page</router-link>
        </div>

        <div v-else>
          <h2 class="text-center">Edit Account</h2>
          <form @submit.prevent="updateAccount">
            <div class="mb-3">
              <label for="firstName" class="form-label">First Name</label>
              <input type="text" v-model="user.firstName" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="lastName" class="form-label">Last Name</label>
              <input type="text" v-model="user.lastName" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" v-model="user.emailAdd" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="age" class="form-label">Age</label>
              <input type="number" v-model="user.userAge" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="gender" class="form-label">Gender</label>
              <input type="text" v-model="user.Gender" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
          </form>
        </div>
      </div>
    </div>
    <FooterComp/>
  </div>
</template>


<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';
import FooterComp from '@/components/FooterComp.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

export default {
components: {
  NavBar,
  FooterComp,
  LoadingSpinner
},
data() {
  return {
    user: {},
    isEditing: false,
    loading: true,
    message: '',
    success: false,
  };
},
async created() {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('https://capstone-2-p8rd.onrender.com/users/users/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    this.user = response.data;
  } catch (error) {
    this.message = 'Error fetching user data: ' + (error.response?.data || error.message);
    this.success = false;
  } finally {
    this.loading = false;
  }
},
methods: {
  async updateAccount() {
  },
  async deleteAccount() {
  }
},
};
</script>

<style scoped>
.container {
max-width: 500px;
background-color: #361c1c;
padding: 95px;
border-radius: 8px;
}

h2 {
color: white; 
}

.form-label {
color: white; 
}

.form-control {
background-color: #4e2b2b;
color: white; 
border: 1px solid #6e4c4c; 
}

.btn-primary {
background-color: #f39c12; 
border: none;
}

.btn-primary:hover {
background-color: #e67e22; 
}

.alert {
padding: 15px;
color: white;
}

.alert-success {
background-color: #28a745;
}

.alert-danger {
background-color: #dc3545; 
}
</style>
