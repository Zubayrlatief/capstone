<template>
  <NavBar/>
    <div class="container mt-5">
      <h1 class="mb-4">Contact Us</h1>
      <form @submit.prevent="sendMessage">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">Message</label>
          <textarea
            id="message"
            v-model="form.message"
            class="form-control"
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" class="btn btn-dark">Send Message</button>
        <div v-if="errorMessage" class="mt-3 text-danger">{{ errorMessage }}</div>
        <div v-if="successMessage" class="mt-3 text-success">{{ successMessage }}</div>
      </form>
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
        form: {
          name: '',
          email: '',
          message: ''
        },
        errorMessage: '',
        successMessage: ''
      };
    },
    methods: {
      async sendMessage() {
        try {
          this.errorMessage = '';
          this.successMessage = '';
  
          // Validate form data
          if (!this.form.name || !this.form.email || !this.form.message) {
            this.errorMessage = 'All fields are required.';
            return;
          }
  
          const response = await axios.post('https://formspree.io/f/mqkrwkjj', this.form, {
            headers: {
              'Accept': 'application/json'
            }
          });
  
          if (response.data.ok) {
            this.successMessage = 'Message sent successfully!';
            this.form.name = '';
            this.form.email = '';
            this.form.message = '';
          } else {
            this.errorMessage = 'Failed to send message. Please try again later.';
          }
        } catch (error) {
          console.error('Error sending message:', error);
          this.errorMessage = 'Failed to send message. Please check your network connection and try again.';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
  }
  </style>
  