<template>
  <div class="login container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <h2 class="text-center">Login</h2>
        <form @submit.prevent="login">
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
          <button type="submit" class="btn btn-primary w-100">
            Login
          </button>
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
    };
  },
  methods: {
    async login() {
      try {
        console.log('Attempting to log in with:', {
          emailAdd: this.email,
          userPass: this.password,
        });

        const response = await axios.post(
          'https://capstone-2-p8rd.onrender.com/users/login',
          {
            emailAdd: this.email,
            userPass: this.password,
          }
        );

        console.log('Login successful:', response.data);
        this.$router.push('/account');
      } catch (error) {
        if (error.response) {
          console.error(
            'Login error:',
            error.response.data.message || error.response.data
          );
          alert(`Login failed: ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error during login:', error.message);
        }
      }
    },
  },
};
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>
