import { createPool } from 'mysql2/promise';
import { config } from 'dotenv';
config();

const pool = createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
});

// Get all items
const getCartsDb = async () => {
    try {
        let [data] = await pool.query('SELECT * FROM cart');
        return data;
    } catch (error) {
        console.error('Error fetching all carts:', error);
        throw error; // Propagate error to be handled by caller
    }
};

// Get a single item by ID
const getCartDb = async (cartID) => {
    try {
        const [rows] = await pool.query('SELECT * FROM cart WHERE cartID = ?', [cartID]);
        if (rows.length === 0) {
            return null; // No item found
        }
        return rows[0]; // Return the item object
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error; // Propagate error to be handled by caller
    }
};

// Insert a single item
const insertCartDb = async (userID, prodID, quantity, totalPrice) => {
    try {
        const [result] = await pool.query(`
            INSERT INTO cart (userID, prodID, quantity, totalPrice)
            VALUES (?, ?, ?, ?)
        `, [userID, prodID, quantity, totalPrice]);
        console.log("Cart item inserted successfully.");
    } catch (error) {
        console.error("Error inserting item into the database:", error);
        throw error;
    }
};

// Delete an item by ID
const deleteCartDb = async (prodID) => {
    try {
        const [result] = await pool.query(`
            DELETE FROM cart WHERE prodID = ?
        `, [prodID]);

        if (result.affectedRows === 0) {
            console.log(`No item found with ID ${prodID}.`);
            throw new Error('Item not found');
        }

        console.log(`Item with ID ${prodID} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting item with ID ${prodID}:`, error);
        throw new Error('Failed to delete item');
    }
};

// Update an item
const updateCartDb = async (prodName, quantity, amount, description, category, prodUrl, id) => {
    try {
        console.log('Updating item with ID:', id);
        console.log('Values:', { prodName, quantity, amount, description, category, prodUrl });

        const [result] = await pool.query(`
            UPDATE cart 
            SET prodName = ?, quantity = ?, amount = ?, description = ?, category = ?, prodUrl = ?
            WHERE prodID = ?
        `, [prodName, quantity, amount, description, category, prodUrl, id]);

        console.log('Updated:', result);
        if (result.affectedRows === 0) {
            console.log('No rows updated, ID does not exist');
        }
    } catch (error) {
        console.error('Error updating item:', error);
        throw error;
    }
};

// Export functions
export { getCartsDb, getCartDb, insertCartDb, deleteCartDb, updateCartDb };
