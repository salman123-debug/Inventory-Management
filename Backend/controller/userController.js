const User = require('../models/usermodel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');



// //generate JWT token
// const generateToken= async (id)=>{
//     try {
//         const user = await User.findById(id);
//         const accessToken = user.generateAccessToken();
//         user.accessToken = accessToken
//         await user.save({validateBeforeSave:false});
//         return accessToken
//     } catch (error) {
//         console.log(error);
//     }
// }

const generateAccessToken = async function () {
    return jwt.sign(
        {
            id: this._id,
            email: this.email,
            name: this.name

        },
        process.env.ACCESS_TOKEN,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

//register user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    //check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

   //photo upload
   const photo = req.file?req.file.filename:'';
   if(!photo){
    res.status(400);
   }

//password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // const hashedPassword = await userExists.isPasswordMathed(password);

    //create user
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        photo,
        phone
    });

    //generate token
    const token = generateAccessToken(user._id);
    //send http-only cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: new Date(Date.now() + 1000 * 86400), // 1 day
    });

   if (user) {
         res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            photo: user.photo,
            phone: user.phone,
            token: token
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }

})

//login user

const loginUser = asyncHandler(async (req, res) => {

    //req body -> data
    const { email, password } = req.body;

    // console.log(req.body);
    if (!email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    //check if user exists
    const user = await User.findOne({ email });
    if(!user){
        res.status(400);
        throw new Error('User not found');
    }

    // if(user.password !== password){
    //     res.status(400);
    //     throw new Error('Invalid password');
    // }

    // console.log(user);
    //check if password matches
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    // console.log(isPasswordMatched);
    if(!isPasswordMatched) {
        return res.status(401).json({ message: "Invalid password" });
    }

   

    //generate token
    const token =await generateAccessToken(user._id);
    
    const options ={
        httpOnly: true,
        secure:true
    }

    //send http-only cookie
    return res
    .cookie('token', token, options)
    .status(200)
    .json({
        _id: user.id,
        name: user.name,
        email: user.email,
        photo: user.photo,
        phone: user.phone,
        token: token
    });
})

//logout user

const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
});

//login user status

//
const getUser = asyncHandler(async (req, res) => {

    // res.send("get user api");
    const user = User.findById(req.user._id);
    if(user){
        const {_id,name,email,photo,phone} = user;
        res.status(200).json({message:"user fetched",
        _id,
        name,
        email,
        photo,
        phone
        });
    }
    else{
        res.status(404);
        throw new Error('User not found');
    }

});

module.exports = {registerUser,loginUser,logoutUser,getUser};
