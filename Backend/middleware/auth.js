const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {    
    try {
        const token = req.cookies.token;
        if(!token){
            res.status(401);
            throw new Error('Not authorized, no token');
        }
        //verify token
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN);
        const user = await User.findById(verified.id);

        if(!user){
            res.status(401)
            throw new Error('User not found');
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401);
        throw new Error('Not authorized, failed token');
    }
    
})

module.exports = {protect};