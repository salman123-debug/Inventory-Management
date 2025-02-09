
const User = require('../models/usermodel');
const jwt = require('jsonwebtoken') 
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');


//generate token

const generateAccessToken =  (id)=>{
    return jwt.sign(
        {
            id
        },
        process.env.SECRET_KEY,
        {
            expiresIn:process.env.SECRET_KEY_EXPIRY
        }
    )
}

const generateRefreshToken =  (id) => {
    return jwt.sign(
        {
            id
        },
        process.env.REFRESH_SECRET_KEY,
        {
            expiresIn:process.env.REFRESH_SECRET_KEY_EXPIRY
        }
    )
}
 

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password, phone} = req.body;

    if(!name || !email || !password || !phone){
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
        throw new Error('Please upload a photo');
    }

    //hashed
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        photo,
        phone
    });

    res.status(201).json({user, message:"user created successfully"})
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
    // console.log(password)
   const isPasswordMatched = await bcrypt.compare(password, user.password);
    // console.log(isPasswordMatched);
    if(!isPasswordMatched) {
        res.status(400);
        throw new Error('Invalid credentials');
    }

    //generate token
    // console.log(user._id);
    // const {accessToken, refreshToken} = await generateAccessRefreshToken(user._id);
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false});

    return res
    .status(200)
    .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,})
    .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
    })
    .json({message:"Login successfull",accessToken,refreshToken,user});
})

//logout user

const logoutUser = asyncHandler(async (req, res) => {
    // console.log(req.user._id)
    await User.findByIdAndUpdate(req.user._id, { refreshToken: 1 });
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({message:"Logged out successfully"});
})

//refresh token

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken;
    if (!incomingRefreshToken) {
        res.status(401);
        throw new Error('Unauthorized');
    }
   try {
     const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_SECRET_KEY);
     const user = await User.findById(decoded?.id);
 
     if (!user) {
         res.status(401);
         throw new Error('Unauthorized');
     }
     if(incomingRefreshToken !== user?.refreshToken){
         res.status(401);
         throw new Error('Refresh token is expired or used');
     }
 
 
     const accessToken = generateAccessToken(user._id);
     const newRefreshToken = generateRefreshToken(user._id);
     // user.refreshToken = newRefreshToken;
     // await user.save({ validateBeforeSave: false });
 
     return res
     .status(200)
     .cookie('accessToken', accessToken, {
         httpOnly: true,
         secure: true,
     })
     .cookie('refreshToken', newRefreshToken, {
         httpOnly: true,
         secure: true,
     })
     .json({ accessToken, refreshToken:newRefreshToken },"Access token refreshed");
   } catch (error) {
    return res.status(400).json(error?.message || "invalid refresh token");
    // throw new Error("this is backend error",error)
   }
})

//get user

const getUser = asyncHandler(async (req,res) =>{
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
})

//change password

const changePassword = asyncHandler(async (req,res) => {
    const {currentPassword, newPassword} = req.body;
    console.log(req.body);
    const user = await User.findById(req.user._id);
    if(!currentPassword || !newPassword){
        res.status(400);
        throw new Error('Please add all fields');
    }

    if(!user){
        res.status(400);
        throw new Error('User not found');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // if(currentPassword === user.password){
        
    // }
    const isPasswordMatched = await bcrypt.compare(currentPassword, user.password);
    if(!isPasswordMatched) {
        res.status(400);
        throw new Error('Invalid credentials');
    }
    user.password = hashedPassword;
    await user.save({validateBeforeSave: false});
    res.status(200).json({message:"Password changed successfully"});
})



module.exports = {registerUser,loginUser,logoutUser,getUser,refreshAccessToken,changePassword};