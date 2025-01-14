
const express = require('express');
const multer = require('multer');
const { registerUser, loginUser, logoutUser, getUser, changePassword } = require('../controller/userController');
const { authenticate } = require('../middleware/auth');

const router = express()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    }, 
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage });


router.post('/register', upload.single('photo'), registerUser);
router.post('/login', loginUser);
router.post('/logout', authenticate,logoutUser);
router.get('/getuser', authenticate, getUser);
//password change
router.put('/changepassword', authenticate, changePassword);

module.exports = router