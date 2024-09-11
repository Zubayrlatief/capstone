<template>
  <NavBar />
  <div class="account container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h2 class="text-center">My Account</h2>
        <div v-if="user" class="card p-4">
          <p><strong>Username:</strong> {{ user.username }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <!-- Add other fields as needed -->
          <div class="d-flex justify-content-between">
            <button @click="editAccount" class="btn btn-warning">Edit Account</button>
            <button @click="deleteAccount" class="btn btn-danger">Delete Account</button>
          </div>
        </div>
        <div v-else>
          <p class="text-center">Loading account details...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        const cookieString = document.cookie;
        console.log('Cookies:', cookieString); // Debugging line

        if (!cookieString) {
          console.error('No cookies found, please log in again.');
          this.$router.push('/login');
          return;
        }

        const tokenCookie = cookieString.split('; ').find(row => row.startsWith('token='));
        if (!tokenCookie) {
          console.error('Token not found in cookies, please log in again.');
          this.$router.push('/login');
          return;
        }

        const token = tokenCookie.split('=')[1];
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.id;

          const response = await axios.get(`https://capstone-2-p8rd.onrender.com/users/users/${userId}`, {
            withCredentials: true, // Ensure cookies are included
          });

          this.user = response.data;
        } else {
          console.error('Token is invalid, please log in again.');
          this.$router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        this.$router.push('/login');
      }
    },
    async editAccount() {
      try {
        await axios.patch(`https://capstone-2-p8rd.onrender.com/users/update/${this.user.id}`, {
          // Pass updated user data here
        }, {
          withCredentials: true, // Ensure cookies are included
        });
        // Handle successful update
      } catch (error) {
        console.error('Error updating account:', error);
      }
    },
    async deleteAccount() {
      try {
        await axios.delete(`https://capstone-2-p8rd.onrender.com/users/delete/${this.user.id}`, {
          withCredentials: true, // Ensure cookies are included
        });
        this.$router.push('/');
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    },
  },
};
</script>

<style scoped>
.account {
  margin-top: 2rem;
}

.card {
  padding: 1rem;
}
</style>
