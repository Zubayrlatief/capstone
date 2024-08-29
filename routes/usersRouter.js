import express from 'express';
import { getUsers, getUser, insertUser, deleteUser, updateUser, loginUser } from '../controller/usersController.js';
import { checkUser } from '../middleware/authenticate.js'

const router = express.Router();

// FETCH ALL USERS
router.get('/', getUsers);

// FETCH USER BY ID
router.get('/users/:id', getUser);

// LOGIN FOR USER
router.post('/login', checkUser, loginUser);

// REGISTER A NEW USER
router.post('/register', insertUser);  // Changed this line

// UPDATE A USER BY ID 
router.patch('/update/:id', updateUser);

// DELETE USER BY ID 
router.delete('/delete/:id', deleteUser);


export default router;
