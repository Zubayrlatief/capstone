// authenticate.js
import { compare } from "bcrypt";
import { loginUserDb } from "../model/usersDb.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const checkUser = async (req, res, next) => {
    const { emailAdd, userPass } = req.body;
    console.log("Email:", emailAdd, "Password:", userPass);

    try {
        const user = await loginUserDb(emailAdd);
        if (!user) {
            return res.status(400).send('User not found');
        }

        const hashedPassword = user.userPass;
        console.log("Hashed Password:", hashedPassword);

        // Compare the provided password with the hashed password
        const isMatch = await compare(userPass, hashedPassword);
        
        if (isMatch) {
            // Generate JWT token
            const token = jwt.sign({ id: user.id, emailAdd: emailAdd }, process.env.SECRET_KEY, { expiresIn: '1h' });
            console.log("Token:", token);
            // Send the token to the client
            res.status(200).json({ token });
        } else {
            res.status(401).send('Incorrect password');
        }
    } catch (err) {
        console.log("Error in checkUser middleware:", err);
        res.status(500).send('Internal Server Error');
    }
};

export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};
export { checkUser };

    // let hashedPassword = (await loginUserDb(emailAdd)).userPass
    // let hashedPassword = (await loginUserDb(emailAdd))

//     console.log(hashedPassword);

//     compare(userPass, hashedPassword, (err,result)=> {
//         console.log(err);
        
//         if(result==true){
//             let token = jwt.sign({emailAdd:emailAdd},process.env.SECRET_KEY,{expiresIn:'1h'})
//             console.log(token);
//             req.body.token = token
//             next()
//             return
//         }
//         else{
//         res.send('Your password is incorrect')
//     }
//     })
// }
