const express = require("express");

const { addProduct, getAllProducts, getProductById, updateProductById, deleteProductById } = require("../controller/productController");

const router = express.Router();

const multer = require('multer');
const { protect } = require("../middleware/auth");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage });

//product routes
router.post('/addproduct',upload.single('productImage'), addProduct);
//get all products
router.get('/getallproducts', getAllProducts);
//get product by id
router.get('/getproduct/:id', getProductById);
//update product by id
router.put('/updateproduct/:id', updateProductById);
//delete product by id
router.delete('/deleteproduct/:id', deleteProductById);

module.exports = router