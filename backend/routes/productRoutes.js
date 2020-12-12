import express from 'express';
import asyncHanlder from 'express-async-handler';
import Product from '../models/productModel.js';

const router = express.Router();

/**
 * @description Fetch all products
 * @route       GET /api/products
 * @access      Public
 */
router.get(
  '/',
  asyncHanlder(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

/**
 * @description Fetch a product
 * @route       GET /api/product/:id
 * @access      Public
 */
router.get(
  '/:id',
  asyncHanlder(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status('404');
      throw new Error('Product not found');
    }
  })
);

export default router;
