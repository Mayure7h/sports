// const express = require('express');
// const mongoose = require('mongoose');

// const purchaseSchema = new mongoose.Schema({
//   purchaseId: String,
//   productId: String,
//   purchaseTimestamp: Date,
//   purchaseQuantity: Number,
//   purchaseUnitCost: Number,
//   purchaseTotalCost: Number
// });

// module.exports =  mongoose.model('Purchase', purchaseSchema);

import mongoose from "mongoose";
const { Schema } = mongoose;

const purchaseSchema = new Schema({
    productId: { 
        type: Schema.Types.ObjectId, 
        ref: "Product", 
        required: true 
    },
    purchaseTimestamp: { 
        type: Date, 
        default: () => {
            // Convert current UTC time to IST (UTC+5:30)
            const now = new Date();
            const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
            return new Date(now.getTime() + istOffset);
        }
    },
    purchaseQuantity: { 
        type: Number, 
        required: true, 
        min: 1 
    },
    purchaseUnitCost: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    purchaseTotalCost: { 
        type: Number, 
        required: true 
    }
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase; // ✅ Use ES module export
