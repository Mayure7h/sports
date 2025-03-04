// const express = require('express');
// const Sales = require('../models/Sales.js');

// const router = express.Router();

// // Get all sales
// router.get('/', async (req, res) => {
//   const sales = await Sales.find();
//   res.json(sales);
// });

// // Add a sales record
// router.post('/', async (req, res) => {
//   const newSale = new Sales(req.body);
//   await newSale.save();
//   res.json(newSale);
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Sales = require('../models/Sales');

// // Get all sales
// router.get('/', async (req, res) => {
//     try {
//         const sales = await Sales.find();
//         res.json(sales);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Get sales records for a specific product
// router.get('/:productId', async (req, res) => {
//     try {
//         const sales = await Sales.find({ productId: req.params.productId });

//         if (sales.length === 0) {
//             return res.status(404).json({ message: 'No sales records found for this product' });
//         }

//         res.json(sales);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Add a sales record
// router.post('/', async (req, res) => {
//     try {
//         const newSale = new Sales(req.body);
//         await newSale.save();
//         res.status(201).json(newSale);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Sales = require('../models/Sales');
const Product = require('../models/Product');

// Get all sales records
router.get('/', async (req, res) => {
    try {
        const sales = await Sales.find().populate('productId'); // Populate product details
        res.json(sales);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get sales records for a specific product
router.get('/:productId', async (req, res) => {
    try {
        const sales = await Sales.find({ productId: req.params.productId }).populate('productId');

        if (!sales.length) {
            return res.status(404).json({ message: 'No sales records found for this product' });
        }

        res.json(sales);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new sales record
router.post('/', async (req, res) => {
    try {
        const { productId, salesQuantity, salesUnitPrice } = req.body;

        // Validate required fields
        if (!productId || !salesQuantity || !salesUnitPrice) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if enough stock is available
        if (product.stockQuantity < salesQuantity) {
            return res.status(400).json({ message: 'Insufficient stock available' });
        }

        // Create and save new sales record
        const newSale = new Sales({
            productId,
            salesQuantity,
            salesUnitPrice,
            salesTotalAmount: salesQuantity * salesUnitPrice,
            salesTimestamp,
        });

        await newSale.save();

        // Deduct sold quantity from stock
        product.stockQuantity -= salesQuantity;
        await product.save();

        res.status(201).json(newSale);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
