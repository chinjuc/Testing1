import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import AuthModel from '../Models/auth.js'

const router = express.Router();


router.post('/register', async(req,res)=>{
    const {email, password} = req.body;
    try {
        const hashed = await bcrypt.hash(password,10);
        const user = new AuthModel({email,password: hashed});
        await user.save();
        res.status(201).json({message: "login succesfully"})
    } catch (error) {
        res.status(500).json({error: "error Login"})
    }
})

router.post('/login', async(req,res)=>{
    const {email,password} = req.body
    console.log("login succesfully");   
    try {
        const user = await AuthModel.findOne({email});
        if(!user){
            res.status(400).json({error: "User Not Found"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            res.status(400).json({error : "invalid credentials"})
        }

        const token = jwt.sign(
            {userId :user._id},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        )
        console.log("Login succesfully");
        res.json({token})
    } catch (error) {
        console.log("err loged", error);     
        res.status(500).json({ message: "Server error" });
    }
})

export default router