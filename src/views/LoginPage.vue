<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <h2 class="text-center mb-4">Login</h2>
        <form @submit.prevent="loginUser">
          <div class="form-group mb-3">
            <label for="emailAdd">Email Address</label>
            <input v-model="emailAdd" type="email" id="emailAdd" class="form-control" placeholder="Email Address" required />
          </div>
          <div class="form-group mb-4">
            <label for="userPass">Password</label>
            <input v-model="userPass" type="password" id="userPass" class="form-control" placeholder="Password" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
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
      emailAdd: '',
      userPass: ''
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post('https://capstone-2-p8rd.onrender.com/users/login', {
          emailAdd: this.emailAdd,
          userPass: this.userPass
        });
        const token = response.data.token;
        localStorage.setItem('token', token); // Save the token for authenticated requests
        console.log('Logged in successfully');
      } catch (error) {
        console.error('Login failed:', error.response.data);
      }
    }
  }
};
</script>

<style>
.container {
  max-width: 400px;
  padding: 2rem;
  border-radius: 10px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
