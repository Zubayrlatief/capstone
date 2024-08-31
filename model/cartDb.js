// cartDb.js
import { createPool } from 'mysql2/promise';
import { config } from 'dotenv';

config();

const pool = createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
});

// Get all items in the cart
const getItemsDb = async () => {
    try {
        const [data] = await pool.query('SELECT * FROM cart');
        return data;
    } catch (error) {
        console.error('Error fetching items from cart:', error);
        throw new Error('Failed to fetch items from the cart.');
    }
};

// Get a single item by product ID
const getItemDb = async (prodID) => {
    try {
        const [rows] = await pool.query('SELECT * FROM cart WHERE prodID = ?', [prodID]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    } catch (error) {
        console.error(`Error fetching item with product ID ${prodID} from cart:`, error);
        throw new Error('Failed to fetch the item from the cart.');
    }
};

// Insert a new item into the cart
const insertItemDb = async (userID, prodID, quantity, totalPrice) => {
    try {
        const [result] = await pool.query(
            'INSERT INTO cart (userID, prodID, quantity, totalPrice) VALUES (?, ?, ?, ?)',
            [userID, prodID, quantity, totalPrice]
        );
        console.log('Cart item inserted successfully with ID:', result.insertId);
        return result.insertId;
    } catch (error) {
        console.error('Error inserting item into cart:', error);
        throw new Error('Failed to insert item into the cart.');
    }
};

// Delete an item from the cart by product ID
const deleteItemDb = async (prodID) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM cart WHERE prodID = ?',
            [prodID]
        );

        if (result.affectedRows === 0) {
            console.log(`No item found with product ID ${prodID}.`);
            throw new Error('Item not found in the cart.');
        }

        console.log(`Item with product ID ${prodID} deleted successfully.`);
        return result.affectedRows;
    } catch (error) {
        console.error(`Error deleting item with product ID ${prodID}:`, error);
        throw new Error('Failed to delete item from the cart.');
    }
};

// Clear all items from the cart
const clearCartDb = async () => {
    try {
        const [result] = await pool.query('DELETE FROM cart');
        return result.affectedRows; // Return number of affected rows
    } catch (error) {
        console.error('Error clearing cart:', error);
        throw error;
    }
};

// Update an item in the cart
const updateItemDb = async (quantity, prodID) => {
    try {
        const [result] = await pool.query(
            'UPDATE cart SET quantity = ? WHERE prodID = ?',
            [quantity, prodID]
        );
        if (result.affectedRows === 0) {
            console.log(`No item updated for product ID ${prodID}. The item may not exist.`);
            return { affectedRows: 0 };
        }

        console.log('Item updated successfully.');
        return result;
    } catch (error) {
        console.error(`Error updating item with product ID ${prodID}:`, error);
        throw new Error('Failed to update item in the cart.');
    }
};

// Export functions
export { getItemsDb, getItemDb, insertItemDb, deleteItemDb, clearCartDb, updateItemDb };

