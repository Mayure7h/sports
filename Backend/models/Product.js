// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   productId: String,
//   name: String,
//   price: Number,
//   stockQuantity: Number,
//   brand: String,
//   category: String
// });

// module.exports= mongoose.model('Product', productSchema);

// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const productSchema = new Schema({
//     category: { type: String, required: true },
//     brand: { type: String, required: true },
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     stockQuantity: { type: Number, required: true }
// });

// module.exports = mongoose.model('Product', productSchema);

import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
    category: { type: String, required: true },
    brand: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    image: { type: String, required: true },  // Product image URL
    rating: { type: Number, default: 0 }      // Product rating (optional)
});

const Product = mongoose.model("Product", productSchema);

export default Product; // ✅ Use ES module export

