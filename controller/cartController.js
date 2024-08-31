// cartController.js
import { getItemsDb, insertItemDb, updateItemDb, deleteItemDb, clearCartDb } from '../model/cartDb.js';

// Fetch all items in the cart
export const fetchCart = async (req, res) => {
    try {
        const items = await getItemsDb();
        res.json(items);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'Failed to fetch cart items' });
    }
};

// Add an item to the cart
export const addToCart = async (req, res) => {
    const { userID, prodID, quantity, totalPrice } = req.body;
    if (!userID || !prodID || !quantity || !totalPrice) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const insertedId = await insertItemDb(userID, prodID, quantity, totalPrice);
        res.status(201).json({ message: 'Item added to cart successfully', id: insertedId });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'Failed to add item to cart' });
    }
};

// Update an item in the cart
export const updateCartItem = async (req, res) => {
    const { prodID } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined) {
        return res.status(400).json({ error: 'Quantity is required for update' });
    }

    try {
        const result = await updateItemDb(quantity, prodID);
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Item not found or no changes made' });
        } else {
            res.json({ message: 'Cart item updated successfully' });
        }
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ error: 'Failed to update cart item' });
    }
};

// Delete an item from the cart
export const deleteCartItem = async (req, res) => {
    const { prodID } = req.params;
    try {
        const affectedRows = await deleteItemDb(prodID);
        if (affectedRows === 0) {
            res.status(404).json({ error: 'Item not found' });
        } else {
            res.json({ message: `Item with ID ${prodID} deleted successfully from cart` });
        }
    } catch (error) {
        console.error('Error deleting item from cart:', error);
        res.status(500).json({ error: 'Failed to delete item from cart' });
    }
};

// Clear all items from the cart
export const clearCart = async (req, res) => {
    try {
        const affectedRows = await clearCartDb();
        if (affectedRows > 0) {
            res.json({ message: 'Cart cleared successfully' });
        } else {
            res.status(404).json({ error: 'No items to clear' });
        }
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ error: 'Failed to clear cart' });
    }
};