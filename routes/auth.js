const express = require('express');
const router = new express.Router();
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config.js');
const ExpressError = require('../expressError.js');
const Customer = require('../models/customer.js');

/** POST /login - login: {email, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

router.post('/login', async (req, res, next) => {
  try {
    // const { email, password } = req.body;
    // if (await Customer.authenticate(email, password)) {
    //   let token = jwt.sign({ email }, SECRET_KEY);
    //   Customer.updateLoginTimestamp(email);
    //   return res.json({ token });
    // } else {
    //   throw new ExpressError('Invalid email/password', 400);
    // }
  } catch (e) {
    next(e);
  }
});

/** POST /register - register Customer: registers, logs in, and returns token.
 *
 * {Customername, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

router.post('/register', async (req, res, next) => {
  try {
    const { email } = await Customer.register(req.body);
    let token = jwt.sign({ email }, SECRET_KEY);
    // Customer.updateLoginTimestamp(email);
    return res.send({ token });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
