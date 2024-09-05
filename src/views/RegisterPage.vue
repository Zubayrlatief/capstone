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
            <label for="Gender">Gender</label>
            <input v-model="Gender" type="text" id="Gender" class="form-control" placeholder="Gender" required />
          </div>
          <div class="form-group mb-3">
            <label for="userRole">Role</label>
            <input v-model="userRole" type="text" id="userRole" class="form-control" placeholder="Role" required />
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
      Gender: '',
      userRole: '',
      emailAdd: '',
      userPass: '',
      userProfile: ''
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
          userProfile: this.userProfile
        });
        console.log(response.data);
      } catch (error) {
        console.error(error.response.data);
      }
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
</style>
