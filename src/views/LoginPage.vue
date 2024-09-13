<template>
  <NavBar />
  <div class="login container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
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
  <FooterComp />
</template>

<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';
import FooterComp from '@/components/FooterComp.vue';

export default {
  components: {
    NavBar,
    FooterComp
  },
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
    const response = await axios.post('https://capstone-2-p8rd.onrender.com/users/login', {
      emailAdd: this.email,
      userPass: this.password,
    });

    const token = response.data.token;
    localStorage.setItem('token', token);
    this.$store.commit('setToken', token);

    // Fetch user info after login
    await this.$store.dispatch('fetchUser');

    this.message = 'Login successful!';
    this.success = true;
    this.$router.push('/items');
  } catch (error) {
    this.message = 'Login failed: ' + (error.response?.data || error.message);
    this.success = false;
  }
}

  },
};
</script>

<style scoped>
.container {
  max-width: 500px;
  background-color: #361c1c; /* Background color of the container */
  padding: 95px;
  border-radius: 8px; /* Rounded corners for the container */
}

h2 {
  color: white; /* Text color for the heading */
}

.form-label {
  color: white; /* Label text color */
}

.form-control {
  background-color: #4e2b2b; /* Input background color */
  color: white; /* Input text color */
  border: 1px solid #6e4c4c; /* Input border color */
}

.btn-primary {
  background-color: #f39c12; /* Button background color */
  border: none; /* Remove button border */
}

.btn-primary:hover {
  background-color: #e67e22; /* Button hover color */
}

.alert {
  padding: 15px;
  color: white; /* Text color in the alert box */
}

.alert-success {
  background-color: #28a745; /* Success alert background */
}

.alert-danger {
  background-color: #dc3545; /* Danger alert background */
}
</style>
