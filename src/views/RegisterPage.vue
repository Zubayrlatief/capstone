<template>
    <div class="register-container">
      <h1>Register</h1>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="formData.username"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="formData.confirmPassword"
            class="form-control"
            required
          />
        </div>
        <div v-if="error" class="error-message">
          <p>{{ error }}</p>
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    name: 'RegisterPage',
    data() {
      return {
        formData: {
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        },
        error: null
      };
    },
    methods: {
      ...mapActions(['signup']),
      async register() {
        this.error = null;
  
        if (this.formData.password !== this.formData.confirmPassword) {
          this.error = "Passwords do not match.";
          return;
        }
  
        try {
          await this.signup(this.formData);
          alert('Registration successful!');
          this.$router.push('/login'); // Redirect to login page after successful registration
        } catch (error) {
          this.error = error.response?.data?.message || "An error occurred during registration.";
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .register-container h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-control {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  .btn {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
    text-align: center;
  }
  </style>
  