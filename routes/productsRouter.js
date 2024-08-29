import express from 'express';
import { fetchProducts, fetchProduct, insertProduct, deleteProduct, updateProduct } from '../controller/productsController.js';

const router = express.Router();

// FETCH PRODUCTS
router.get('/', fetchProducts);

// FETCH PRODUCT BY ID
router.get('/:id', fetchProduct);

// ADD A PRODUCT
router.post('/addProduct', insertProduct);

// UPDATE A PRODUCT BY ID
router.patch('/update/:id', updateProduct);

// DELETE A PRODUCT BY ID
router.delete('/delete/:id', deleteProduct);

export default router;