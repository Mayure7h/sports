// const express = require('express');
// const mongoose = require('mongoose');

// const salesSchema = new mongoose.Schema({
//   salesId: String,
//   productId: String,
//   salesTimestamp: Date,
//   salesQuantity: Number,
//   salesUnitPrice: Number,
//   salesTotalAmount: Number
// });

// module.exports= mongoose.model('Sales', salesSchema);

// const mongoose = require('mongoose');
// const { Schema } = mongoose;


// const salesSchema = new Schema({
//     productId: { 
//         type: Schema.Types.ObjectId, 
//         ref: 'Product', 
//         required: true 
//     },
//     salesTimestamp: { 
//         type: Date, 
//         default: Date.now 
//     },
//     salesQuantity: { 
//         type: Number, 
//         required: true, 
//         min: 1 
//     },
//     salesUnitPrice: { 
//         type: Number, 
//         required: true, 
//         min: 0 
//     },
//     salesTotalAmount: { 
//         type: Number, 
//         required: true 
//     }
// });
// // Automatically calculate salesTotalAmount before saving
// salesSchema.pre('save', function (next) {
//   this.salesTotalAmount = this.salesQuantity * this.salesUnitPrice;
//   next();
// });

// module.exports = mongoose.model('Sales', salesSchema);

const mongoose = require('mongoose');
const { Schema } = mongoose;

const salesSchema = new Schema({
    productId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    },
    salesTimestamp: { 
        type: Date, 
        // default: Date.now 
        default: () => {
            // Convert current UTC time to IST (UTC+5:30)
            const now = new Date();
            const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
            return new Date(now.getTime() + istOffset);
        }
    },
    salesQuantity: { 
        type: Number, 
        required: true, 
        min: 1 
    },
    salesUnitPrice: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    salesTotalAmount: { 
        type: Number 
    }
});


module.exports = mongoose.model('Sales', salesSchema);
