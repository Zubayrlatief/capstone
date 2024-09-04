<template>
    <div class="account container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h2 class="text-center">My Account</h2>
          <div v-if="user" class="card p-4">
            <p><strong>Username:</strong> {{ user.username }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <div class="d-flex justify-content-between">
              <button @click="editAccount" class="btn btn-warning">Edit Account</button>
              <button @click="deleteAccount" class="btn btn-danger">Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: null,
      };
    },
    created() {
      this.fetchUser();
    },
    methods: {
      async fetchUser() {
        try {
          const response = await axios.get('http://localhost:3000/users/1'); // Replace 1 with dynamic user ID
          this.user = response.data;
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      },
      editAccount() {
        this.$router.push(`/account/edit/${this.user.id}`);
      },
      async deleteAccount() {
        try {
          await axios.delete(`http://localhost:3000/users/delete/${this.user.id}`);
          this.$router.push('/');
        } catch (error) {
          console.error('Error deleting account:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Additional styles can be added here if needed */
  </style>
  