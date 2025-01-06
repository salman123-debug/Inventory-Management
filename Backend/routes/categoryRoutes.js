const express = require("express");
const { addCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById } = require("../controller/categoryController");
const { authenticate } = require("../middleware/auth");

const router = express.Router();


//category routes
router.post('/addcategory',authenticate, addCategory);
//get all categories
router.get('/getallcategories',authenticate, getAllCategories);
//get category by id
router.get('/getcategory/:id',authenticate, getCategoryById);
//update category by id
router.put('/updatecategory/:id',authenticate, updateCategoryById);
//delete category by id
router.delete('/deletecategory/:id',authenticate, deleteCategoryById);

module.exports = router