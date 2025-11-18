import ConnectDb from "./Config/db.js";
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import UserRoutes from './routes/userroute.js'
import AuthRoutes from './routes/authroutes.js'
const app = express();

dotenv.config()
app.use(cors())
ConnectDb();
app.use(express.json())

app.get('/', (req,res)=>{
    res.send(
        "api.. is running")
})
app.use('/api/user', UserRoutes)
app.use('/api/auth', AuthRoutes)
const PORT = process.env.PORT || 3200

app.listen(PORT, ()=>console.log(`server running at port ${PORT}`))