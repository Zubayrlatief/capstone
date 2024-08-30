import express from 'express';
import {
    getItemsDb,
    getItemDb,
    insertItemDb,
    deleteItemDb,
    updateItemDb
} from './cartDb.js';

const router = express.Router();

// Get all items in the cart
router.get('/items', async (req, res) => {
    try {
        const items = await getItemsDb();
        res.json(items);
    } catch (error) {
        console.error('Error getting items:', error);
        res.status(500).json({ error: 'Failed to retrieve items' });
    }
});

// Get a single item by ID
router.get('/items/:prodID', async (req, res) => {
    const { prodID } = req.params;
    try {
        const item = await getItemDb(prodID);
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        console.error(`Error getting item with ID ${prodID}:`, error);
        res.status(500).json({ error: 'Failed to retrieve item' });
    }
});

// Add a new item to the cart
router.post('/items', async (req, res) => {
    const { prodName, quantity, amount, description, category, prodUrl } = req.body;
    try {
        await insertItemDb(prodName, quantity, amount, description, category, prodUrl);
        res.status(201).json({ message: 'Item added successfully' });
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).json({ error: 'Failed to add item' });
    }
});

// Delete an item by ID
router.delete('/items/:prodID', async (req, res) => {
    const { prodID } = req.params;
    try {
        await deleteItemDb(prodID);
        res.json({ message: `Item with ID ${prodID} deleted successfully` });
    } catch (error) {
        console.error(`Error deleting item with ID ${prodID}:`, error);
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

// Partially update an existing item
router.patch('/items/:prodID', async (req, res) => {
    const { prodID } = req.params;
    const { prodName, quantity, amount, description, category, prodUrl } = req.body;

    try {
        const result = await updateItemDb(prodName, quantity, amount, description, category, prodUrl, prodID);
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Item not found or no changes made' });
        } else {
            res.json({ message: 'Item updated successfully' });
        }
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ error: 'Failed to update item' });
    }
});

export default router;
