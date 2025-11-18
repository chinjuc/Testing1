import mongoose from "mongoose";


const ConnectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongodb connected succesfuly")
    } catch (error) {
        console.error("connectio error", error)
    }
}

export default ConnectDb