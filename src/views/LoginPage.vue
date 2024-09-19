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
  <FooterComp/>
  
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

    // FETCH INFO AFTER LOGIN
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
