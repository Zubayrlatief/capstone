<template>
  <NavBar/>
  <div class="container mt-5">
    <h2 class="text-center">Register</h2>
    <form @submit.prevent="registerUser" class="needs-validation" novalidate>
      <div class="form-group mb-3">
        <label for="firstName">First Name</label>
        <input type="text" v-model="firstName" id="firstName" class="form-control" required />
        <div class="invalid-feedback">Please enter your first name.</div>
      </div>

      <div class="form-group mb-3">
        <label for="lastName">Last Name</label>
        <input type="text" v-model="lastName" id="lastName" class="form-control" required />
        <div class="invalid-feedback">Please enter your last name.</div>
      </div>

      <div class="form-group mb-3">
        <label for="userAge">Age</label>
        <input type="number" v-model="userAge" id="userAge" class="form-control" required />
        <div class="invalid-feedback">Please enter your age.</div>
      </div>

      <div class="form-group mb-3">
        <label for="gender">Gender</label>
        <select v-model="Gender" id="gender" class="form-control" required>
          <option value="" disabled>Select your gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <div class="invalid-feedback">Please select your gender.</div>
      </div>

      <div class="form-group mb-3">
        <label for="userRole">Role</label>
        <select v-model="userRole" id="userRole" class="form-control" required>
          <option value="" disabled>Select your role</option>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <div class="invalid-feedback">Please select your role.</div>
      </div>

      <div class="form-group mb-3">
        <label for="emailAdd">Email</label>
        <input type="email" v-model="emailAdd" id="emailAdd" class="form-control" required />
        <div class="invalid-feedback">Please enter a valid email address.</div>
      </div>

      <div class="form-group mb-3">
        <label for="userPass">Password</label>
        <input type="password" v-model="userPass" id="userPass" class="form-control" required />
        <div class="invalid-feedback">Please enter a password.</div>
      </div>

      <div class="form-group mb-3">
        <label for="userProfile">Profile URL</label>
        <input type="text" v-model="userProfile" id="userProfile" class="form-control" />
      </div>

      <button type="submit" class="btn btn-primary w-100">Register</button>

      <div v-if="message" class="alert mt-3" :class="{'alert-success': success, 'alert-danger': !success}">
        {{ message }}
      </div>
    </form>
  </div>
  <FooterComp/>
</template>

<script>
import FooterComp from '@/components/FooterComp.vue';
import NavBar from '@/components/NavBar.vue';
import axios from 'axios';

export default {
  components: {
    NavBar,
    FooterComp
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      userAge: null,
      Gender: '',
      userRole: '',
      emailAdd: '',
      userPass: '',
      userProfile: '',
      message: '',
      success: false,
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post('https://capstone-2-p8rd.onrender.com/users/register', {
          firstName: this.firstName,
          lastName: this.lastName,
          userAge: this.userAge,
          Gender: this.Gender,
          userRole: this.userRole,
          emailAdd: this.emailAdd,
          userPass: this.userPass,
          userProfile: this.userProfile,
        });
        this.message = response.data.message;
        this.success = true;
        //  REDIRECT TO LOHIN
        setTimeout(() => {
          this.$router.push('/login');
        }, 2000);
      } catch (error) {
        this.message = 'Registration failed: ' + (error.response?.data?.message || error.message);
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

.form-control {
  color: white;
  background-color: #343a40; 
  border-color: #495057; 
}

.form-control::placeholder {
  color: #6c757d; 
}

.btn-primary {
  background-color: #007bff; 
  border-color: #007bff;
}

.alert {
  color: white;
}

.alert-success {
  background-color: #28a745;
}

.alert-danger {
  background-color: #dc3545;
}

h2 {
  color: white;
}

label {
  color: white;
}
</style>
