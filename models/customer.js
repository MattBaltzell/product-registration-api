/** Customer for Product Registration */

const db = require('../db');
const bcrypt = require('bcrypt');
const { Product } = require('./product');
const { BCRYPT_WORK_FACTOR } = require('../config.js');
const ExpressError = require('../expressError');

/** Customer  */

class Customer {
  constructor(
    id,
    username,
    email,
    password,
    firstName,
    lastName,
    phone,
    company
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.company = company;
    this.notes;
    this.products = [];
  }

  /** register new customer */

  static async register({
    username,
    password,
    email,
    firstName,
    lastName,
    phone,
    company,
  }) {
    const hashed_pw = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const results = await db.query(
      `INSERT INTO customers (
        username,
        password, 
        email, 
        first_name, 
        last_name, 
        phone, 
        company,
        join_at) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP) 
        RETURNING username email, first_name, last_name, phone, company`,
      [username, hashed_pw, email, firstName, lastName, phone, company]
    );

    return results.rows[0];
  }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) {
    const results = await db.query(
      'SELECT password FROM customers WHERE username=$1',
      [username]
    );
    const customer = results.rows[0];

    if (customer) {
      return await bcrypt.compare(password, customer.password);
    }
  }

  /** Update last_login_at for customer */

  static async updateLoginTimestamp(username) {
    const results = await db.query(
      'UPDATE customers SET last_login_at=NOW() WHERE username=$1',
      [username]
    );
  }

  /** find customer by id. */

  static async get(username) {
    const results = await db.query(
      'SELECT id, username, first_name, last_name, email, phone, company, notes , join_at, last_login_at FROM customers WHERE username=$1',
      [username]
    );
    if (!results.rows[0]) {
      throw new ExpressError(`User not found`, 404);
    }
    return results.rows[0];
  }

  /** find all customers. */

  static async getAll() {
    const results = await db.query(
      'SELECT id, first_name, last_name, email, phone, company, notes FROM customers'
    );
    return results.rows;
  }

  /** given a customer id, find their registered products. */

  static async getCustomerProducts(username) {
    const results = await db.query(
      `SELECT p.sku, p.product_name, p.web_url
        FROM products AS p 
        JOIN registrations AS r
        ON p.id = r.product_id
        JOIN customers AS c
        ON r.username = c.username
        WHERE username = $1`,
      [username]
    );

    return results.rows;
  }
}

module.exports = Customer;
