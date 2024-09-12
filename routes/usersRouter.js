import express, { Router } from 'express';
import { getUsers, getUser, insertUser, deleteUser, updateUser, loginUser,  getUserByEmail, deleteUserByEmail, getCurrentUser } from '../controller/usersController.js';
import { checkUser, authenticateJWT } from '../middleware/authenticate.js'

const router = express.Router();

// FETCH ALL USERS
router.get('/', getUsers);

// FETCH USER BY ID
router.get('/users/:id', getUser);

// FETCH USER BY EMAIL
router.get('/users/email/:email', getUserByEmail);

// LOGIN FOR USER
router.post('/login', checkUser, loginUser);

// REGISTER A NEW USER
router.post('/register', insertUser);  // Changed this line

// UPDATE A USER BY ID 
router.patch('/update/:id', updateUser);

// DELETE USER BY ID 
router.delete('/delete/:id', deleteUser);

// DELETE USER BY EMAIL
router.delete('/users/email/:email', deleteUserByEmail);

// AUTHENTICATES TO GET USER
router.get('/users/me', authenticateJWT, getCurrentUser)

export default router;
