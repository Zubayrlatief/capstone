import {createPool} from 'mysql2/promise'
//promise- allows to handle asynchronys
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
        const result = await pool.query(`SELECT * FROM users WHERE emailAdd = ?`, [emailAdd]);
        return result[0]; // Assuming MySQL returns an array of results
    } catch (error) {
        console.error("Error fetching user from the database:", error);
        throw error;
    }
}; 

// Insert new user into the database during registration
const insertUserDb = async (firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile) => {
    try {
        await pool.query(`
            INSERT INTO users (firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile]);
        console.log("User inserted successfully.");
    } catch (error) {
        console.error("Error inserting user into the database:", error);
        throw error; 
    }
};

//delete
const deleteUserDb = async (id) => {
    try {
        // Execute the delete query
        const result = await pool.query(`
            DELETE FROM users WHERE userID = ?`, [id]);

        // Check if any rows were affected
        if (result.affectedRows === 0) {
            console.log(`No user found with ID ${id}.`);
            throw new Error('User not found'); // Optionally, throw an error to indicate no user was found
        }

        console.log(`User with ID ${id} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting user with ID ${id}:`, error);
        throw new Error('Failed to delete user'); // Optionally, throw an error to be caught by the calling function
    }
};
// const deleteUserDb = async(id) =>{
//     await pool.query(`
//     DELETE FROM users WHERE userID = ?`, [id])
// }

//update
const updateUserDb = async (userID, { firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile }) => {
    try {
        await pool.query(`
            UPDATE users
            SET firstName = ?,
                lastName = ?,
                userAge = ?,
                Gender = ?,
                userRole = ?,
                emailAdd = ?,
                userPass = ?,
                userProfile = ?
            WHERE userID = ?`,
            [firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile, userID]
        );
        console.log(`User with ID ${userID} updated successfully.`);
    } catch (error) {
        console.error(`Error updating user with ID ${userID}:`, error);
        throw new Error('Failed to update user'); // Optionally, throw an error to be handled by the calling function
    }
};


// console.log(await insertPeer('Matthew','23','purple','gatsby'))
// console.log(await getUsersDb());
// console.log(await getPeer(1));
export {getUsersDb, getUserDb, insertUserDb, deleteUserDb, updateUserDb, loginUserDb}
