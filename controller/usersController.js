import { getUsersDb, getUserDb, insertUserDb, deleteUserDb, updateUserDb } from '../model/usersDb.js'
import bcrypt from 'bcrypt';
const getUsers = async(req,res)=>{
    res.json(await getUsersDb())
}

//fetch//get
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


//insert//add
const insertUser = async (req, res) => {
    try {
        const {
            firstName, lastName, userAge, Gender,
            userRole, emailAdd, userPass, userProfile
        } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(userPass, 10);

        // Insert the user into the database
        await insertUserDb( firstName, lastName, userAge, Gender, userRole, emailAdd, hashedPassword, userProfile);

        // Send success response
        res.status(200).send('Data was inserted successfully');
    } catch (error) {
        // Handle errors
        res.status(500).send('An error occurred while inserting data');
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

const loginUser = async(req,res)=>{
    res.json({message:"login successful", token:req.body.token})
};

export {getUsers, getUser, insertUser, deleteUser, updateUser, loginUser}