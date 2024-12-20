const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Add name"]
    },
    email:{
        type:String,
        required:[true,"Please Add Email"],
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,"Please add a password"]
    },
    photo:{
        type:String,
        required:[true,"Please add a profile photo"]
    },
    phone:{
        type:Number,

    }
})

const User = mongoose.model('User',userSchema);

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordMathed = async function (password) {
    return await bcrypt.compare(password,this.password)
}

//token generate 

// userSchema.methods.generateAccessToken = async function () {
//     return jwt.sign(
//         {
//             id: this._id,
//             email: this.email,
//             name: this.name

//         },
//         process.env.ACCESS_TOKEN,
//         {
//             expiresIn: process.env.ACCESS_TOKEN_EXPIRY
//         }
//     )
// }

module.exports = User