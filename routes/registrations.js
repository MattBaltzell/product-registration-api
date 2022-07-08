const express = require('express');

const router = new express.Router();
const Customer = require('../models/customer');
const Product = require('../models/product');
const Registration = require('../models/registration');

/** Get all product registrations */

router.get('/', async (req, res, next) => {
  try {
    const registrations = await Registration.getAll();
    return res.send({ registrations });
  } catch (err) {
    return next(err);
  }
});

/** Get product registration by id */

router.get('/:id', async (req, res, next) => {
  try {
  } catch (e) {
    return next(err);
  }
});

/** Register new product to customer */

router.post('/', async (req, res, next) => {
  try {
    const registration = await Registration.create(req.body);
    return res.send({ registration });
  } catch (e) {
    return next(err);
  }
});

/** Get registered products by username */

router.get('/customer/:username', async (req, res, next) => {
  try {
    const products = await Registration.getCustomerProducts(
      req.params.username
    );
    return res.send({ products });
  } catch (e) {
    return next(err);
  }
});

module.exports = router;
