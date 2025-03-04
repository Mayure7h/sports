
// const express = require('express');
// const router = express.Router();
// const Purchase = require('../models/purchase');
// const Product = require('../models/Product');

// // Add new purchase
// router.post('/', async (req, res) => {
//     const { productId, purchaseQuantity, purchaseUnitCost } = req.body;

//     try {
//         // Check if product exists
//         const product = await Product.findById(productId);
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         // Create purchase entry
//         const newPurchase = new Purchase({
//             productId,
//             purchaseQuantity,
//             purchaseUnitCost
//         });

//         await newPurchase.save();

//         // Update stock quantity in product
//         product.stockQuantity += purchaseQuantity;
//         await product.save();

//         res.status(201).json(newPurchase);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');

// Add a new purchase
router.post('/', async (req, res) => {
    const { productId, purchaseQuantity, purchaseUnitCost } = req.body;

    try {
        // Validate required fields
        if (!productId || !purchaseQuantity || !purchaseUnitCost) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Create purchase entry
        const newPurchase = new Purchase({
            productId,
            purchaseQuantity,
            purchaseUnitCost,
            purchaseTotalCost: purchaseQuantity * purchaseUnitCost,
            purchaseTimestamp,
        });

        await newPurchase.save();

        // Update stock quantity in product
        product.stockQuantity += purchaseQuantity;
        await product.save();

        res.status(201).json(newPurchase);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all purchases
router.get('/', async (req, res) => {
    try {
        const purchases = await Purchase.find().populate('productId');
        res.json(purchases);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all purchases for a specific product
router.get('/:productId', async (req, res) => {
    try {
        const purchases = await Purchase.find({ productId: req.params.productId }).populate('productId');

        if (!purchases.length) {
            return res.status(404).json({ message: 'No purchase records found for this product' });
        }

        res.json(purchases);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
