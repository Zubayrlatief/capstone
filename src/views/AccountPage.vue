<template>
  <div class="account-page container mt-5">
    <NavBar />
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
            <p><strong>Role:</strong> {{ user.userRole }}</p> <!-- Display user role -->
            <p><strong>Profile URL:</strong> <a :href="user.userProfile" target="_blank">{{ user.userProfile }}</a></p>
            <button class="btn btn-primary" @click="isEditing = true">Edit</button>
            <button class="btn btn-danger" @click="deleteAccount">Delete Account</button>
          </div>
        </div>

        <router-link to="/cart" class="btn btn-secondary">View Cart</router-link>
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
          <div class="mb-3">
            <label for="role" class="form-label">Role</label>
            <input type="text" v-model="user.userRole" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="profileUrl" class="form-label">Profile URL</label>
            <input type="text" v-model="user.userProfile" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Save Changes</button>
          <button type="button" class="btn btn-secondary w-100 mt-2" @click="isEditing = false">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export default {
  components: {
    NavBar,
    LoadingSpinner
  },
  data() {
    return {
      user: {},
      loading: true,
      isEditing: false,
    };
  },
  methods: {
    async fetchUserData() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const decoded = jwt_decode(token);
        if (!decoded.emailAdd) {
          throw new Error('Decoded token does not contain emailAdd');
        }

        const encodedEmail = encodeURIComponent(decoded.emailAdd);

        const response = await axios.get(`https://capstone-2-p8rd.onrender.com/users/email/${encodedEmail}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.user = response.data;
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        this.loading = false;
      }
    },

    async updateAccount() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        await axios.patch(`https://capstone-2-p8rd.onrender.com/users/${this.user.userID}`, this.user, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.isEditing = false;
      } catch (error) {
        console.error('Error updating account:', error);
      }
    },

    async deleteAccount() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        const decoded = jwt_decode(token);
        await axios.delete(`https://capstone-2-p8rd.onrender.com/users/email/${encodeURIComponent(decoded.emailAdd)}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        localStorage.removeItem('token');
        this.$router.push('/login');
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  },
  created() {
    this.fetchUserData();
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
.card {
  padding: 20px;
}
</style>
