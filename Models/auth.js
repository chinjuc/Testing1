import mongoose from 'mongoose'



const AuthSchema  =mongoose.Schema(
    {
        email: {type: String, required:true},
        password:{type:String, required:true}
    }
)

const AuthModel = mongoose.model('authmodel',AuthSchema)

export default AuthModel