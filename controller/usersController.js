import { getUsersDb, getUserDb, insertUserDb, deleteUserDb, updateUserDb,  getUserDbByEmail, } from '../model/usersDb.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Fetch users
const getUsers = async(req,res)=>{
    res.json(await getUsersDb())
}

// Fetch user
const getUser = async (req, res) => {
    try {
        const user = await getUsersDb(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching the user', error: error.message });
    }
};


// Register a  user
const insertUser = async (req, res) => {
    try {
        const { firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile } = req.body;

        const userExists = await getUserDbByEmail(emailAdd);
        if (userExists) {
            console.log("Email already exists error triggered");
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(userPass, 10);
        await insertUserDb(firstName, lastName, userAge, Gender, userRole, emailAdd, hashedPassword, userProfile);
        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ message: 'An error occurred while registering the user', error: error.message });
    }
};


// Delete
const deleteUser = async(req,res)=>{
    await deleteUserDb(req.params.id)
    res.send('user has been deleted')
}

// Update
const updateUser = async (req, res) => {
    try {
        const { firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile } = req.body;
        const userID = req.params.id; 

        const existingUser = await getUserDb(userID);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedUser = {
            firstName: firstName || existingUser.firstName,
            lastName: lastName || existingUser.lastName,
            userAge: userAge || existingUser.userAge,
            Gender: Gender || existingUser.Gender,
            userRole: userRole || existingUser.userRole,
            emailAdd: emailAdd || existingUser.emailAdd,
            userProfile: userProfile || existingUser.userProfile
        };
        if (userPass) {
            updatedUser.userPass = await bcrypt.hash(userPass, 10);
        } else {
            updatedUser.userPass = existingUser.userPass;
        }
        await updateUserDb(userID, updatedUser);
        res.status(200).send('Update was successful');
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating data', error: error.message });
    }
};


// Login user
const loginUser = async (req, res) => {
    try {
        res.status(200).send('Login successful');
    } catch (error) {
        res.status(500).send('An error occurred during login');
    }
};

// Fetch user by email
export const getUserByEmail = async (req, res) => {
    try {
        const email = decodeURIComponent(req.params.email);
        const user = await getUserDbByEmail(email); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching the user', error: error.message });
    }
};

// Delete user by email
export const deleteUserByEmail = async (req, res) => {
    try {
        const email = decodeURIComponent(req.params.email);
        const result = await deleteUserDbByEmail(email); 
        if (!result) {
            return res.status(404).json({ message: 'User not found or not deleted' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the user', error: error.message });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = await getUserDb(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching the user', error: error.message });
    }
};


export {getUsers, getUser, insertUser, deleteUser, updateUser, loginUser, getCurrentUser}