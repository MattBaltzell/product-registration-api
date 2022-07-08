const express = require('express');

const router = new express.Router();
const Customer = require('../models/customer');
const Product = require('../models/product');

/** Show all products */

router.get('/', async function (req, res, next) {
  try {
    const products = await Product.getAll();
    return res.send({ products });
  } catch (err) {
    return next(err);
  }
});

/** Get product by SKU */

router.get('/:sku', async (req, res, next) => {
  try {
    const product = await Product.getBySKU(req.params.sku);
    return res.send({ product });
  } catch (e) {
    return next(e);
  }
});

/** Add new product */

router.post('/', async (req, res, next) => {
  try {
    const product = await Product.add(req.body);
    return res.send({ product });
  } catch (e) {
    next(e);
  }
});

/** Edit a product */

router.put('/:sku', async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
});

/** Delete a product */

router.delete('/:sku', async (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
});

module.exports = router;
