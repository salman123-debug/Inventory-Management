// const upload = require('../middleware/multer');
const express = require('express');
const { registerUser, loginUser, logoutUser, getUser } = require('../controller/userController');
const router = express.Router();
const multer = require('multer');
const  {protect}  = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage });


router.post('/register',upload.single('photo'), registerUser)
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/getuser',protect, getUser);

module.exports = router