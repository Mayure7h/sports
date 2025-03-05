// const express = require('express');
// const Product = require('../models/Product.js');

// const router = express.Router();

// // Get all products
// router.get('/', async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// });

// // Add a new product
// router.post('/', async (req, res) => {
//   const newProduct = new Product(req.body);
//   await newProduct.save();
//   res.json(newProduct);
// });

// module.exports = Product;

import express from "express";
import Product from "../models/Product.js"; // Ensure correct file extension for ES modules

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  const { category } = req.query;
  try {
    const query = category ? { category } : {};
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error });
  }
});

export default router; // Use ES module export

