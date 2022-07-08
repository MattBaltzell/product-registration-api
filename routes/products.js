const express = require('express');

const router = new express.Router();
const Customer = require('../models/customer');
const { Product, ProductImage } = require('../models/product');

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
    const product = await Product.get(req.params.sku);
    const images = await ProductImage.get(product.id);
    product.images = images;
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
// Will need to add Auth middlewhere to ensure ADMIN ONLY access

router.delete('/:sku', async (req, res, next) => {
  try {
    const result = await Product.delete(req.params.sku);
    if (!result.sku) {
      throw new ExpressError(
        `Product with sku of ${sku} cannot be found.`,
        400
      );
    }
    return res.send({ message: 'Deleted.' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
