import express from 'express';
import { fetchItems, fetchItem, insertItem, deleteItem, updateItem, updateItem } from '../controller/itemsController.js';

const router = express.Router();

// FETCH ITEMSg
router.get('/', fetchItems);

// FETCH ITEM BY ID
router.get('/:id', fetchItem);

// ADD A ITEM
router.post('/items', insertItem);

// FULLY UPDATES A ITEM BY ID
router.put('/item/:id', updateItem)

// DELETE A ITEM BY ID
router.delete('/delete/:id', deleteItem);

export default router;