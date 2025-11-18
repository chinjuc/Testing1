import express from 'express'
import UserModel from '../Models/user.js'


const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = new UserModel({ email, password })
        await user.save();
        res.status(200).json({ message: "created succesfully",user })
    } catch (error) {
        res.status(400).json({ error: "error message" })
    }
})

router.get('/', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(201).json({ message: "finded succesfully", users })
    } catch (error) {
        res.status(500).json({ error: "error message" })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const updateuser = await UserModel.findByIdAndUpdate(req.params.id,req.body, {new: true})
        res.status(200).json({ message: "sucess" ,updateuser})
    } catch (error) {
        res.status(400).json({ error: "err" })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const Deleteuser = await UserModel.findByIdAndDelete(req.params.id)
        if(!Deleteuser){
            return res.status(400).json({message: "user not found"})
        }
        res.status(200).json({ message: "User deleted",Deleteuser })

    } catch (error) {
        res.status(500).json({ error: "err" })

    }
})

export default router