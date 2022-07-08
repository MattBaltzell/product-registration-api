const express = require('express');

const router = new express.Router();
const Customer = require('../models/customer');
const Product = require('../models/product');
const Registration = require('../models/registration');

/** Get list of all customers. */

router.get('/', async (req, res, next) => {
  try {
    const customers = await Customer.getAll();
    return res.send({ customers });
  } catch (err) {
    return next(err);
  }
});

/** Get customer info. */

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const customer = await Customer.get(id);
    customer.products = await Customer.getCustomerProducts(id);
    return res.send({ customer });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
