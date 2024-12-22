const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');


const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            res.status(401);
            throw new Error('Not authorized, no token');
        }
        //verify token

        const verified = jwt.verify(token, process.env.ACCESS_TOKEN);

        console.log(verified);
        const user = await User.findById(verified.id).select('-password');
        if (!user) {
            res.status(401);
            throw new Error('User not found');
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401);
        throw new Error('Not authorized');
    }
})

module.exports = { protect }