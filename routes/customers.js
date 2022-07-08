const express = require('express');

const router = new express.Router();
const Customer = require('../models/customer');
const { Product } = require('../models/product');
const Registration = require('../models/registration');

const { ensureLoggedIn, ensureCorrectUser } = require('../middleware/auth');

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

router.get('/:username', ensureCorrectUser, async (req, res, next) => {
  try {
    const { username } = req.params;
    const customer = await Customer.get(username);
    const products = await Customer.getCustomerProducts(username);
    customer.products = products;
    return res.send({ customer });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
