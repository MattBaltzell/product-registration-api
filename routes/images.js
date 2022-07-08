const express = require('express');

const router = new express.Router();
const Customer = require('../models/customer');
const { Product, ProductImage } = require('../models/product');

/** Add new product image */

router.post('/', async (req, res, next) => {
  try {
    const image = await ProductImage.add(req.body);
    return res.send({ image });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
