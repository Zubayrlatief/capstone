<template>
  <div class="register container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <h2 class="text-center">Register</h2>
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" v-model="username" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" v-model="email" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" v-model="password" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Register</button>
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
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async register() {
      try {
        await axios.post('http://localhost:3000/users/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        this.$router.push('/login');
      } catch (error) {
        console.error('Registration error:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>
