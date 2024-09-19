import express from 'express';
import { fetchCart, addToCart, updateCartItem, deleteCartItem, clearCart } from '../controller/cartController.js';

const router = express.Router();

// FETCH CART
router.get('/cart', fetchCart);

// ADD TO CART 
router.post('/cart', addToCart);

// UPDATE CART ITEM
router.put('/cart/:prodID', updateCartItem);

// DELETE CART ITEM 
router.delete('/cart/:prodID', deleteCartItem);

// CLEAR CART 
router.delete('/cart', clearCart);

export default router;

