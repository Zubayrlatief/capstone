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
const getItemsDb = async () => {
    let [data] = await pool.query('SELECT * FROM items');
    return data;
};

// Get single items from ID
const getItemDb = async (prodID) => {
    try {
        const result = await pool.query('SELECT * FROM items WHERE prodID = ?', [prodID]);
        if (result.length === 0) {
            return null; // No item found
        }
        return result[0]; // Return the item object
    } catch (error) {
        console.error('Error fetching item:', error);
        throw error; // Propagate error to be handled by caller
    }
};



// Insert//add a single item
const insertItemDb = async (prodName, quantity, amount, description, Category, prodUrl) => {
    try {
        let [data] = await pool.query(`
            INSERT INTO items
            (prodName, quantity, amount, description, Category, prodUrl)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [prodName, quantity, amount, description, Category, prodUrl]);
        console.log("item inserted successfully.");
    } catch (error) {
        console.error("Error inserting item into the database:", error);
        throw error;
    }
};

//delete a item by id
const deleteItemDb = async (prodID) => {
    try {
        const result = await pool.query(`
            DELETE FROM items WHERE prodID = ?`, [prodID]);

        if (result.affectedRows === 0) {
            console.log(`No item found with ID ${prodID}.`);
            throw new Error('item not found');
        }

        console.log(`tem with ID ${prodID} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting item with ID ${prodID}:`, error);
        throw new Error('Failed to delete item');
    }
};

//update//patch a item
const updateItemDb = async (prodName, quantity, amount, description, category, prodUrl, id) => {
    try {
        console.log('Updating item with ID:', id);
        console.log('Values:', { prodName, quantity, amount, description, category, prodUrl });

        const result = await pool.query(`
            UPDATE items 
            SET prodName = ?, quantity = ?, amount = ?, description = ?, category = ?, prodUrl = ?
            WHERE prodID = ?
        `, [prodName, quantity, amount, description, category, prodUrl, id]);

        console.log('Updated:', result);
        if (result.affectedRows === 0) {
            console.log('No rows updated, id doesnt exsist');
        }
    } catch (error) {
        console.error('Error updating item:', error);
        throw error;
    }
};


export { getItemsDb, getItemDb, insertItemDb, deleteItemDb, updateItemDb };