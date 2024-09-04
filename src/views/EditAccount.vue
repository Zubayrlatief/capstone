<template>
  <div class="edit-account container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <h2 class="text-center">Edit Account</h2>
        <form @submit.prevent="updateAccount">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" v-model="user.username" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" v-model="user.email" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Save Changes</button>
        </form>
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
    async updateAccount() {
      try {
        await axios.put(`http://localhost:3000/users/update/${this.user.id}`, this.user);
        this.$router.push('/account');
      } catch (error) {
        console.error('Error updating account:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>
