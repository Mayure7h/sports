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

const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    category: { type: String, required: true },
    brand: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    image: { type: String, required: true },           // New field for product image URL
    rating: { type: Number, default: 0 }                // New field for product rating (optional)
});

module.exports = mongoose.model('Product', productSchema);
