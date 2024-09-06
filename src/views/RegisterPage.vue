<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-center mb-4">Register</h2>
        <form @submit.prevent="registerUser">
          <div class="form-group mb-3">
            <label for="firstName">First Name</label>
            <input v-model="firstName" type="text" id="firstName" class="form-control" placeholder="First Name" required />
          </div>
          <div class="form-group mb-3">
            <label for="lastName">Last Name</label>
            <input v-model="lastName" type="text" id="lastName" class="form-control" placeholder="Last Name" required />
          </div>
          <div class="form-group mb-3">
            <label for="userAge">Age</label>
            <input v-model="userAge" type="number" id="userAge" class="form-control" placeholder="Age" required />
          </div>
          <div class="form-group mb-3">
            <label for="emailAdd">Email Address</label>
            <input v-model="emailAdd" type="email" id="emailAdd" class="form-control" placeholder="Email Address" required />
          </div>
          <div class="form-group mb-3">
            <label for="userPass">Password</label>
            <input v-model="userPass" type="password" id="userPass" class="form-control" placeholder="Password" required />
          </div>
          <div class="form-group mb-4">
            <label for="userProfile">Profile</label>
            <input v-model="userProfile" type="text" id="userProfile" class="form-control" placeholder="Profile" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Register</button>
        </form>

        <!-- Success/Error Message -->
        <div v-if="message" class="alert" :class="{'alert-success': isSuccess, 'alert-danger': !isSuccess}" role="alert">
          {{ message }}
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
      firstName: '',
      lastName: '',
      userAge: '',
      emailAdd: '',
      userPass: '',
      userProfile: 'https://codjoelmayer.github.io/projectImages/images/profile-Image.png',
      message: '',       // To store success/error messages
      isSuccess: false   // To track if the registration was successful
    };
  },
  methods: {
    async registerUser() {
      try {
        await axios.post('https://capstone-2-p8rd.onrender.com/users/register', {
          firstName: this.firstName,
          lastName: this.lastName,
          userAge: this.userAge,
          emailAdd: this.emailAdd,
          userPass: this.userPass,
          userProfile: this.userProfile
        });
        
        // Display success message
        this.isSuccess = true;
        this.message = 'Registration successful! Redirecting to login...';

        // Optionally, clear form fields
        this.clearForm();

        // Redirect to the login page after a short delay (e.g., 2 seconds)
        setTimeout(() => {
          this.$router.push('/login'); // Make sure the route is set to your login page
        }, 2000);
      } catch (error) {
        // Handle error response from server
        this.isSuccess = false;

        // Check if error response exists and display the appropriate message
        if (error.response && error.response.data && error.response.data.message) {
          this.message = error.response.data.message;
        } else {
          this.message = 'Registration failed. Please try again.';
        }
        console.error(error.response.data);
      }
    },
    clearForm() {
      this.firstName = '';
      this.lastName = '';
      this.userAge = '';
      this.emailAdd = '';
      this.userPass = '';
      this.userProfile = '';
    }
  }
};
</script>




<style>
.container {
  max-width: 500px;
  padding: 2rem;
  border-radius: 10px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.alert {
  margin-top: 20px;
}
</style>
