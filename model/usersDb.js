import {createPool} from 'mysql2/promise'
import {config} from 'dotenv'
config()

const pool =createPool({
     host: process.env.HOST,
     user: process.env.USER,
     database: process.env.DATABASE,
     password: process.env.PASSWORD
})

const getUsersDb = async ()=>{
    let [data] = await pool.query('SELECT * FROM users')
    return data
}
const getUserDb = async (id) =>{
    let [[data]] = await pool.query('SELECT * FROM users WHERE userID = ?',[id])
    return data
}
// Fetch user by email for login
const loginUserDb = async (emailAdd) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE emailAdd = ?', [emailAdd]);
        if (rows.length === 0) return null;  
        return rows[0];
    } catch (error) {
        console.error("Error fetching user from the database:", error);
        throw error;
    }
};


// Insert new user into the database during registration
const insertUserDb = async (firstName, lastName, emailAdd, userPass) => {
    try {
        await pool.query(`
            INSERT INTO users (firstName, lastName, emailAdd, userPass)
            VALUES (?, ?, ?, ?)
        `, [firstName, lastName, emailAdd, userPass]);
        console.log("User inserted successfully.");
    } catch (error) {
        console.error("Error inserting user into the database:", error);
        throw error; 
    }
};

// Getting user for error message 
const getUserDbByEmail = async (emailAdd) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE emailAdd = ?', [emailAdd]);
        return rows.length > 0 ? rows[0] : null; 
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error;
    }
};


//delete
const deleteUserDb = async (id) => {
    try {
        const result = await pool.query(`
            DELETE FROM users WHERE userID = ?`, [id]);

        if (result.affectedRows === 0) {
            console.log(`No user found with ID ${id}.`);
            throw new Error('User not found'); 
        }

        console.log(`User with ID ${id} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting user with ID ${id}:`, error);
        throw new Error('Failed to delete user'); 
    }
};
// const deleteUserDb = async(id) =>{
//     await pool.query(`
//     DELETE FROM users WHERE userID = ?`, [id])
// }

//update
const updateUserDb = async (userID, { firstName, lastName, emailAdd, userPass }) => {
    try {
        await pool.query(`
            UPDATE users
            SET firstName = ?,
                lastName = ?,
                emailAdd = ?,
                userPass = ?,
            WHERE userID = ?`,
            [firstName, lastName, emailAdd, userPass, userID]
        );
        console.log(`User with ID ${userID} updated successfully.`);
    } catch (error) {
        console.error(`Error updating user with ID ${userID}:`, error);
        throw new Error('Failed to update user'); 
    }
};



const deleteUserDbByEmail = async (emailAdd) => {
    try {
        const result = await pool.query('DELETE FROM users WHERE emailAdd = ?', [emailAdd]);
        if (result.affectedRows === 0) {
            console.log(`No user found with email ${emailAdd}.`);
            throw new Error('User not found'); 
        }
        console.log(`User with email ${emailAdd} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting user with email ${emailAdd}:`, error);
        throw new Error('Failed to delete user');
    }
};

export {getUsersDb, getUserDb, insertUserDb, deleteUserDb, updateUserDb, loginUserDb, getUserDbByEmail, deleteUserDbByEmail}
