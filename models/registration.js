const db = require('../db');
const bcrypt = require('bcrypt');
const Customer = require('./customer');
const Product = require('./product');
const { BCRYPT_WORK_FACTOR } = require('../config.js');
const ExpressError = require('../expressError');

/** Customer of Pliant */

class Registration {
  static async create({ username, product_id, serial_no }) {
    const results = await db.query(
      `INSERT INTO registrations AS r (
              username, 
              product_id, 
              serial_no,
              registered_at)
              VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
              RETURNING username, product_id, serial_no, registered_at
              `,
      [username, product_id, serial_no]
    );
    console.log('here in fn!');
    if (!results.rows[0].username) {
      throw new ExpressError('User not found', 400);
    }
    if (!results.rows[0].product_id) {
      throw new ExpressError('Product not found', 400);
    }
    return results.rows[0];
  }
}

module.exports = Registration;
