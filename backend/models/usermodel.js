import mongoose from 'mongoose'
import bcrypt from "bcryptjs"

const UserSchema =  mongoose.Schema(
    {
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:String,
        required:true,
        default:false
    }
},{
    timestamps:true
}
)

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.pre('save',async function(next){
    if(!this.isModified('password'))
    {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

// UserSchema.methods.comparePassword = async function(enteredpassword){
//     return await bcrypt.compare(enteredpassword,this.password)
// }

const user = mongoose.model('User',UserSchema)
export default user
