const express = require('express');
const router = new express.Router();
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config.js');
const ExpressError = require('../expressError.js');
const Customer = require('../models/customer.js');

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (await Customer.authenticate(username, password)) {
      let token = jwt.sign({ username }, SECRET_KEY);
      Customer.updateLoginTimestamp(username);
      return res.json({ token });
    } else {
      throw new ExpressError('Invalid username/password', 400);
    }
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
    const { username } = await Customer.register(req.body);
    let token = jwt.sign({ username }, SECRET_KEY);
    Customer.updateLoginTimestamp(username);
    return res.send({ token });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
