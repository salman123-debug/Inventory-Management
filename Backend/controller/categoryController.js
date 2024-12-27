const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");

const addCategory = asyncHandler(async (req, res) => {
    const { categoryName } = req.body;
    const category = await Category.create({ categoryName });
    res.status(201).json(category);
});

//get all categories
const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.status(200).json(categories);
});

//get category by id
const getCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    res.status(200).json(category);
});

//update category by id
const updateCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { categoryName } = req.body;
    const category = await Category.findByIdAndUpdate(id, { categoryName }, { new: true });
    res.status(200).json(category);
});

//delete category by id
const deleteCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    res.status(200).json(category);
});

module.exports = {
    addCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById,
};