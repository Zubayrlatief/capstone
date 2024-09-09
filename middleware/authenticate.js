import { compare } from "bcrypt";
import { loginUserDb } from "../model/usersDb.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

<<<<<<< HEAD

const checkUser = async(req,res,next)=>{
    const {emailAdd,userPass} = req.body
    console.log("Email:", emailAdd, "Password:", userPass);

    try {
        const user = await loginUserDb(emailAdd);
        if (!user) {
            return res.status(400).send('User not found');
        }

        const hashedPassword = user.userPass;
        console.log("Hashed Password:", hashedPassword);
        
        compare(userPass, hashedPassword, (err, result) => {
            if (err) {
                console.log("Error comparing passwords");
            }
        
            if (result) {
                const token = jwt.sign({ emailAdd: emailAdd }, process.env.SECRET_KEY, { expiresIn: "1h" });
                console.log("Token:", token);
                req.body.token = token;
                next();
            } else {
                res.status(401).send('Incorrect password');
            }
        });
    } catch (err) {
        console.log("Error in checkUser middleware:", err); // Corrected variable name
        res.status(500).send('Internal Server Error');
    }
    
    };
    
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
export {checkUser}
=======
const checkUser = async (req, res, next) => {
    const { emailAdd, userPass } = req.body;
    
    try {
        // Fetch the user from the database using the email
        const userRecord = await loginUserDb(emailAdd);
        if (!userRecord) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(userPass, userRecord.userPass);
        if (isMatch) {
            // Proceed to the next middleware to generate the token
            next();
        } else {
            return res.status(401).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};



// const checkUser = async (req, res, next) => {
//   const { emailAdd, userPass } = req.body;
//   console.log(emailAdd, userPass);

//   let hashedPassword = (await loginUserDb(emailAdd)).userPass;
//   // let hashedPassword = (await loginUserDb(emailAdd))

// //  console.log(hashedPassword);

// //   compare(userPass, hashedPassword, (err, result) => {
// //     console.log(err);

// //     if (result == true) {
// //       let token = jwt.sign({ emailAdd: emailAdd }, process.env.SECRET_KEY, {
// //         expiresIn: "1h",
// //       });
// //       console.log(token);
// //       req.body.token = token;
// //       next();
// //       return;
// //     } else {
// //       res.send("Your password is incorrect");
// //     }
// //   });
// // };
export { checkUser };
>>>>>>> af711ead917f67ae51bd55f1fb1b0e78bfe96042
