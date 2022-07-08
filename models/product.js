const db = require('../db');
const ExpressError = require('../expressError');
const Customer = require('./customer');

class Product {
  constructor({
    id,
    sku,
    productName,
    productDescription,
    radioFreq,
    imgURL,
    webURL,
  }) {
    this.id = id;
    this.sku = sku;
    this.productName = productName;
    this.productDescription = productDescription;
    this.radioFreq = radioFreq;
    this.imgURL = imgURL;
    this.webURL = webURL;
  }

  static async getAll() {
    const results = await db.query(
      `SELECT sku, product_name, img_url, web_url
        FROM products
        ORDER BY product_name
      `
    );

    return results.rows;
  }

  /** Get product by SKU */
  static async getBySKU(productSKU) {
    const results = await db.query(
      `SELECT sku, product_name, product_description, radio_freq, img_url, web_url
        FROM products
        WHERE sku ILIKE $1`,
      [productSKU]
    );
    if (!results.rows[0]) {
      throw new ExpressError('SKU not found.', 400);
    }

    return results.rows[0];
  }

  /** Add new product */
  static async add({
    sku,
    productName,
    productDescription,
    radioFreq,
    imgURL,
    webURL,
  }) {
    const results = await db.query(
      `INSERT INTO products (
        sku, 
        product_name, 
        product_description, 
        radio_freq, 
        img_url, 
        web_url) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING sku,product_name,product_description,radio_freq,img_url,web_url`,
      [sku, productName, productDescription, radioFreq, imgURL, webURL]
    );

    return results.rows[0];
  }
}

module.exports = Product;
