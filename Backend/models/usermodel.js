const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

    },
    refreshToken: {
        type: String,
    }
})

const User = mongoose.model('User',userSchema);

// userSchema.pre("save", async function (next) {
//     if(!this.isModified("password")) return next();

//     this.password = await bcrypt.hash(this.password, 10)
//     next()
// })

// userSchema.methods.isValidPassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
// }

// userSchema.methods.generateAccessToken = function () {
//     return jwt.sign(
//         { 
//         id: this._id,
//         email: this.email,
//         name: this.name
//         },
//         process.env.SECRET_KEY,
//         { 
//             expiresIn: process.env.SECRET_KEY_EXPIRY 
//         });
// }
// // console.log(process.env.SECRET_KEY_EXPIRY);

// userSchema.methods.generateRefreshToken = function () {
//     return jwt.sign(
//         { 
//         id: this._id
//         },
//         process.env.REFRESH_SECRET_KEY,
//         { 
//             expiresIn: process.env.REFRESH_SECRET_KEY_EXPIRY 
//         });
// }

module.exports = User