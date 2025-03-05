const express = require("express");

const { createProduct, getAllProducts, getProductById, deleteProductById, updateProductById } = require("../controller/productController");

const router = express.Router();

const multer = require('multer');
const { authenticate } = require("../middleware/auth");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage });
// console.log(upload)
//product routes

router.post('/addproduct',upload.single('productImage'), addProduct);
//get all products
router.get('/getallproducts', getAllProducts);

router.post('/addproduct',authenticate,upload.single('productImage'), createProduct);
// get all products
router.get('/getallproducts',authenticate, getAllProducts);

//get product by id
router.get('/getproduct/:id',authenticate, getProductById);
//update product by id
router.put('/updateproduct/:id',authenticate,upload.single('productImage'), updateProductById);
//delete product by id
router.delete('/deleteproduct/:id',authenticate, deleteProductById);

module.exports = router