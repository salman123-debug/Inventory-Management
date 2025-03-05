const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    userName:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    productName: { 
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        // required: true
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product
    