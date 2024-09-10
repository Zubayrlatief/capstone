import { getUsersDb, getUserDb, insertUserDb, deleteUserDb, updateUserDb, loginUserDb, } from '../model/usersDb.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const getUsers = async(req,res)=>{
    res.json(await getUsersDb())
}

//fetch//get
const getUser = async (req, res) => {
    try {
      const user = await getUserDb(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred while fetching the user',
        error: error.message,
      });
    }
};


// Register a new user
const insertUser = async (req, res) => {
    try {
        const { firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile } = req.body;

        // Check if the user already exists
        const userExists = await getUserDbByEmail(emailAdd);
        if (userExists) {
            console.log("Email already exists error triggered");
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(userPass, 10);

        // Insert the user into the database
        await insertUserDb(firstName, lastName, userAge, Gender, userRole, emailAdd, hashedPassword, userProfile);

        // Send success response
        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error registering user:', error.message);
        // Send error response with detailed message
        res.status(500).json({ message: 'An error occurred while registering the user', error: error.message });
    }
};


//delete
const deleteUser = async(req,res)=>{
    await deleteUserDb(req.params.id)
    res.send('user has been deleted')
}

//update
const updateUser = async (req, res) => {
    try {
        const { firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile } = req.body;
        const userID = req.params.id; 

        // Fetch the current user details
        const existingUser = await getUserDb(userID);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prepare updated values
        const updatedUser = {
            firstName: firstName || existingUser.firstName,
            lastName: lastName || existingUser.lastName,
            userAge: userAge || existingUser.userAge,
            Gender: Gender || existingUser.Gender,
            userRole: userRole || existingUser.userRole,
            emailAdd: emailAdd || existingUser.emailAdd,
            userProfile: userProfile || existingUser.userProfile
        };

        // Hash the new password if provided
        if (userPass) {
            updatedUser.userPass = await bcrypt.hash(userPass, 10);
        } else {
            updatedUser.userPass = existingUser.userPass;
        }

        // Update the user in the database
        await updateUserDb(userID, updatedUser);

        // Send success response
        res.status(200).send('Update was successful');
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'An error occurred while updating data', error: error.message });
    }
};


// Login user
const loginUser = async (req, res) => {
    try {
        const { emailAdd, password } = req.body;

        // Fetch user by email from the database
        const user = await loginUserDb(emailAdd);

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Verify the password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token (set expiration to 1 hour)
        const token = jwt.sign({ id: user.id, emailAdd: user.emailAdd }, process.env.SECRET_KEY, { expiresIn: '1h' });

        // Set the token in a cookie
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        // Send success response
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('An error occurred during login:', error);
        res.status(500).send('An error occurred during login');
    }
};


export {getUsers, getUser, insertUser, deleteUser, updateUser, loginUser}