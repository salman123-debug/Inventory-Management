// const upload = require('../middleware/multer');
const express = require('express');
const { registerUser, loginUser } = require('../controller/userController');
const router = express.Router();
const multer = require('multer');

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
router.post('/login', loginUser)

module.exports = router