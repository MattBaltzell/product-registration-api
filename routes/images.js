const express = require('express');
const ExpressError = require('../expressError');

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

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await ProductImage.delete(req.params.id);
    if (!result.id) {
      throw new ExpressError(`Image with id of ${id} cannot be found.`, 400);
    }
    return res.send({ message: 'Deleted.' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
