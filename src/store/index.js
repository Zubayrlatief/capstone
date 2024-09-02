import { createStore } from "vuex";
import axios from "axios"; // Import axios for HTTP requests
import { toast } from "vue3-toastify"; // Import toast for notifications
import "vue3-toastify/dist/index.css"; // Import CSS for toast notifications

const apiURL = "https://capstone-2-p8rd.onrender.com"; // Define your API base URL

export default createStore({
  state: {
    items: null,
    users: null,
    currentUser: null,
    product: null,
    cartItems: null,
    isLoading: false,
  },
  mutations: {
    setProducts(state, items) {
      state.items = items;
    },
    setProduct(state, value) {
      state.product = value;
    },
    setUsers(state, value) {
      state.users = value;
    },
    setCurrentUser(state, value) {
      state.currentUser = value;
    },
    setCartItems(state, value) {
      state.cartItems = value;
    },
    setLoading(state, value) {
      state.isLoading = value;
    },
  },
  actions: {
    // Fetch all products
    async fetchProducts({ commit }) {
      try {
        const { data } = await axios.get(`${apiURL}/items`); 
        commit("setProducts", data); 
        console.log(data);
        toast.success("Products fetched successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch products.");
      } finally {
        commit("setLoading", false);
      }
    },

    // Fetch a specific product by ID
    async fetchProduct({ commit }, productId) {
      commit("setLoading", true);
      try {
        const { data } = await axios.get(`${apiURL}/products/${productId}`);
        commit("setProduct", data);
        toast.success("Product fetched successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch product.");
      } finally {
        commit("setLoading", false);
      }
    },
    // Fetch all users
    async fetchUsers({ commit }) {
      commit("setLoading", true);
      try {
        const { data } = await axios.get(`${apiURL}/users`);
        commit("setUsers", data);
        toast.success("Users fetched successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch users.");
      } finally {
        commit("setLoading", false);
      }
    },
    // Register a new user
    async registerUser({ commit }, userData) {
      try {
        const { data } = await axios.post(`${apiURL}/users/register`, userData);
        commit("setCurrentUser", data);
        toast.success("Registration successful!");
      } catch (error) {
        console.error(error);
        toast.error("Registration failed. Please try again.");
      }
    },
    // Update user information
    async updateUser({ dispatch }, { userId, userData }) {
      try {
        await axios.patch(`${apiURL}/users/update/${userId}`, userData);
        dispatch("fetchUsers");
        toast.success("User updated successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to update user.");
      }
    },
    // Delete a user by ID
    async deleteUser({ dispatch }, userId) {
      try {
        await axios.delete(`${apiURL}/users/delete/${userId}`);
        dispatch("fetchUsers");
        toast.success("User deleted successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete user.");
      }
    },
    // Fetch all items in the cart
    async fetchCartItems({ commit }) {
      commit("setLoading", true);
      try {
        const { data } = await axios.get(`${apiURL}/cart`);
        commit("setCartItems", data);
        toast.success("Cart items fetched successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch cart items.");
      } finally {
        commit("setLoading", false);
      }
    },
    // Add an item to the cart
    async addItemToCart({ dispatch }, cartItem) {
      try {
        await axios.post(`${apiURL}/cart`, cartItem);
        dispatch("fetchCartItems");
        toast.success("Item added to cart successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to add item to cart.");
      }
    },
    // Update the quantity of a specific item in the cart
    async updateCartItem({ dispatch }, { prodID, quantity }) {
      try {
        await axios.patch(`${apiURL}/cart/${prodID}`, { quantity });
        dispatch("fetchCartItems");
        toast.success("Cart item updated successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to update cart item.");
      }
    },
    // Delete a specific item from the cart
    async deleteCartItem({ dispatch }, prodID) {
      try {
        await axios.delete(`${apiURL}/cart/${prodID}`);
        dispatch("fetchCartItems");
        toast.success("Item removed from cart successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to remove item from cart.");
      }
    },
    // Clear all items from the cart
    async clearCart({ dispatch }) {
      try {
        await axios.delete(`${apiURL}/cart`);
        dispatch("fetchCartItems");
        toast.success("Cart cleared successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to clear cart.");
      }
    },
    // Add a new product
    async addProduct({ dispatch }, product) {
      try {
        await axios.post(`${apiURL}/products/addProduct`, product);
        dispatch("fetchProducts");
        toast.success("Product added successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to add product.");
      }
    },
    // Update product information
    async updateProduct({ dispatch }, { productId, productData }) {
      try {
        await axios.put(`${apiURL}/products/update/${productId}`, productData);
        dispatch("fetchProducts");
        toast.success("Product updated successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to update product.");
      }
    },
    // Delete a product by ID
    async deleteProduct({ dispatch }, productId) {
      try {
        await axios.delete(`${apiURL}/products/delete/${productId}`);
        dispatch("fetchProducts");
        toast.success("Product deleted successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete product.");
      }
    },
  },
  getters: {
    recentProducts: (state) =>
      state.products ? state.products.slice(0, 5) : [],
    allUsers: (state) => state.users,
    currentProduct: (state) => state.product,
    currentUser: (state) => state.currentUser,
    cartItems: (state) => state.cartItems,
    isLoading: (state) => state.isLoading,
  },
  modules: {},
});
