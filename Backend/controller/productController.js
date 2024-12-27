const Product = require('../models/productmodel');
const asyncHandler = require('express-async-handler');

const addProduct =asyncHandler(async (req, res) => {
  const {productName,category,price,description,quantity} = req.body;
  const productImage = req.file ? req.file.filename : '';

  const product = await new Product({
    
    productName,
    category,
    price,
    description,
    quantity,
    productImage
});
await product.save();
res.status(201).json({message:{message:"Product added successfully"},product});
}); 

//get all products
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.status(200).json(products);
});

//get product by id
const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
});

//update product by id
const updateProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
        productName,
        category,
        price,  
        description,
        quantity
    } = req.body;
    const productImage = req.file ? req.file.filename : '';
    const product = await Product.findByIdAndUpdate(id, {
        productName,
        category,
        price,        
        description,
        quantity,
        productImage
    }, { new: true });
    res.status(200).json(product);
});

//delete product by id
const deleteProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json(product);
});

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
}