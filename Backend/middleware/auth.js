const User = require('../models/usermodel')

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const authenticate = asyncHandler(async (req, res, next) => {
    try{
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log("authtoken",token);
        if (!token) {
            res.status(401);
            throw new Error("User not authenticated");
        };

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded.id);

        if (!user) {
            res.status(401);
            throw new Error("User not found");
        };

        req.user = user;
        next();
    }catch (error) {
        console.log(error);
    }
});

module.exports = {authenticate};