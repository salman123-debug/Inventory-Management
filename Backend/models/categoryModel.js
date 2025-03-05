const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    username:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    categoryName: {
        type: String,
        required: true
    }
})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category