import { compare } from "bcrypt"
import { loginUserDb } from "../model/usersDb.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


const checkUser = async(req,res,next)=>{
    const {emailAdd,userPass} = req.body
    console.log(emailAdd,userPass);
    
    let hashedPassword = (await loginUserDb(emailAdd)).userPass
    // let hashedPassword = (await loginUserDb(emailAdd))

    console.log(hashedPassword);

    compare(userPass, hashedPassword, (err,result)=> {
        console.log(err);
        
        if(result==true){
            let token = jwt.sign({emailAdd:emailAdd},process.env.SECRET_KEY,{expiresIn:'1h'})
            console.log(token);
            req.body.token = token
            next()
            return
        }
        else{
        res.send('Your password is incorrect')
    }
    })
}
export {checkUser}