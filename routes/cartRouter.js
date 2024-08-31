// cartRouter.js
import express from 'express';
import { fetchCart, addToCart, updateCartItem, deleteCartItem, clearCart } from '../controller/cartController.js';

const router = express.Router();

// FETCH CART - Get all items in the cart
router.get('/cart', fetchCart);

// ADD TO CART - Add an item to the cart
router.post('/cart', addToCart);

// UPDATE CART ITEM - Update quantity of an item in the cart
router.put('/cart/:prodID', updateCartItem);

// DELETE CART ITEM - Remove an item from the cart
router.delete('/cart/:prodID', deleteCartItem);

// CLEAR CART - Remove all items from the cart
router.delete('/cart', clearCart);

export default router;

