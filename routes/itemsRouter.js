import express from 'express';
import { fetchItems, fetchItem, insertItem, deleteItem, updateItem, } from '../controller/itemsController.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// FETCH ITEMSg
router.get('/', fetchItems);

// FETCH ITEM BY ID
router.get('/:id', fetchItem);

// ADD A ITEM
router.post('/items', adminAuth, insertItem);

// FULLY UPDATES A ITEM BY ID
router.put('/items/:id', adminAuth, updateItem)

// DELETE A ITEM BY ID
router.delete('/delete/:id', adminAuth, deleteItem);

export default router;