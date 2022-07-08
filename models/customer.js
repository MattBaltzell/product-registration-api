/** Customer for Product Registration */

const db = require('../db');
const bcrypt = require('bcrypt');
const Product = require('./product');
const { BCRYPT_WORK_FACTOR } = require('../config.js');
const ExpressError = require('../expressError');

/** Customer of Pliant */

class Customer {
  constructor(id, email, password, firstName, lastName, phone, company) {
    this.id = id;
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
    email,
    password,
    firstName,
    lastName,
    phone,
    company,
  }) {
    const hashed_pw = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const results = await db.query(
      `INSERT INTO customers (
        email, 
        password, 
        first_name, 
        last_name, 
        phone, 
        company,
        join_at,
        last_login_at) 
        VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) 
        RETURNING email, first_name, last_name, phone, company`,
      [email, hashed_pw, firstName, lastName, phone, company]
    );

    return results.rows[0];
  }

  static async get(customerID) {
    const results = await db.query(
      'SELECT id, first_name, last_name, email, phone, company, notes FROM customers WHERE id=$1',
      [customerID]
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

  static async getCustomerProducts(customerId) {
    const results = await db.query(
      `SELECT p.sku, p.product_name, p.img_url, p.web_url
        FROM products AS p 
        JOIN registrations AS r
        ON p.id = r.product_id
        JOIN customers AS c
        ON r.customer_id = c.id
        WHERE customer_id = $1`,
      [customerId]
    );

    return results.rows;
  }
}

module.exports = Customer;
