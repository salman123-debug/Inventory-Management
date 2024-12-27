const express = require("express");
const { addCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById } = require("../controller/categoryController");

const router = express.Router();


//category routes
router.post('/addcategory', addCategory);
//get all categories
router.get('/getallcategories', getAllCategories);
//get category by id
router.get('/getcategory/:id', getCategoryById);
//update category by id
router.put('/updatecategory/:id', updateCategoryById);
//delete category by id
router.delete('/deletecategory/:id', deleteCategoryById);

module.exports = router