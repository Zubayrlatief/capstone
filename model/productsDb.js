import { createPool } from 'mysql2/promise';
import { config } from 'dotenv';
config();

const pool = createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
});

// Get all products
const getProductsDb = async () => {
    let [data] = await pool.query('SELECT * FROM products');
    return data;
};

// Get single product from ID
const getProductDb = async (prodID) => {
    try {
        const result = await pool.query('SELECT * FROM products WHERE prodID = ?', [prodID]);
        if (result.length === 0) {
            return null; // No product found
        }
        return result[0]; // Return the product object
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error; // Propagate error to be handled by caller
    }
};



// Insert//add a single product
const insertProductDb = async (prodName, quantity, amount, description, Category, prodUrl) => {
    try {
        let [data] = await pool.query(`
            INSERT INTO products 
            (prodName, quantity, amount, description, Category, prodUrl)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [prodName, quantity, amount, description, Category, prodUrl]);
        console.log("Product inserted successfully.");
    } catch (error) {
        console.error("Error inserting product into the database:", error);
        throw error;
    }
};

//delete a product by id
const deleteProductDb = async (prodID) => {
    try {
        const result = await pool.query(`
            DELETE FROM products WHERE prodID = ?`, [prodID]);

        if (result.affectedRows === 0) {
            console.log(`No product found with ID ${prodID}.`);
            throw new Error('User not found');
        }

        console.log(`product with ID ${prodID} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting product with ID ${prodID}:`, error);
        throw new Error('Failed to delete product');
    }
};

//update//patch a product
const updateProductDb = async (prodName, quantity, amount, description, category, prodUrl, id) => {
    try {
        console.log('Updating product with ID:', id);
        console.log('Values:', { prodName, quantity, amount, description, category, prodUrl });

        const result = await pool.query(`
            UPDATE products 
            SET prodName = ?, quantity = ?, amount = ?, description = ?, category = ?, prodUrl = ?
            WHERE prodID = ?
        `, [prodName, quantity, amount, description, category, prodUrl, id]);

        console.log('Update result:', result);
        if (result.affectedRows === 0) {
            console.log('No rows updated, possibly due to non-existing ID.');
        }
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};


export { getProductsDb, getProductDb, insertProductDb, deleteProductDb, updateProductDb };