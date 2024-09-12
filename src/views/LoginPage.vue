<template>
  <div class="login container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <h2 class="text-center">Login</h2>
        <form @submit.prevent="loginUser">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              v-model="email"
              class="form-control"
              id="email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              v-model="password"
              class="form-control"
              id="password"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
          <div v-if="message" class="alert mt-3" :class="{'alert-success': success, 'alert-danger': !success}">
            {{ message }}
          </div>
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
      email: '',
      password: '',
      message: '',
      success: false,
    };
  },
  methods: {
    async loginUser() {
      try {
        // Adjusted API endpoint and request body to match backend expectations
        const response = await axios.post('https://capstone-2-p8rd.onrender.com/users/login', {
          emailAdd: this.email,
          userPass: this.password,
        });
        
        const token = response.data.token;
        localStorage.setItem('token', token); // Store token in localStorage or cookies
        
        // Handle login success
        this.message = 'Login successful!';
        this.success = true;
        this.$router.push('/items'); // Redirect to the account page
      } catch (error) {
        this.message = 'Login failed: ' + (error.response?.data || error.message);
        this.success = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 500px;
}
</style>
