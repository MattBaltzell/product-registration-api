const db = require('../db');
const ExpressError = require('../expressError');
const Customer = require('./customer');

class Product {
  constructor({
    id,
    sku,
    productName,
    productFamily,
    productType,
    productDescription,
    radioFreq,
    webURL,
  }) {
    this.id = id;
    this.sku = sku;
    this.productName = productName;
    this.productFamily = productFamily;
    this.productType = productType;
    this.productDescription = productDescription;
    this.radioFreq = radioFreq;
    this.images = [];
    this.webURL = webURL;
  }

  static async getAll() {
    const results = await db.query(
      `SELECT product_name, sku, product_family, product_type, web_url
        FROM products
        ORDER BY product_name
      `
    );

    return results.rows;
  }

  /** Get product by SKU */
  static async get(productSKU) {
    const results = await db.query(
      `SELECT *
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
    productFamily,
    productType,
    productDescription,
    radioFreq,
    webURL,
  }) {
    const results = await db.query(
      `INSERT INTO products (
        sku, 
        product_name, 
        product_family,
        product_type,
        product_description, 
        radio_freq,  
        web_url ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING sku, product_name, product_family, product_type, product_description, radio_freq, web_url`,
      [
        sku,
        productName,
        productFamily,
        productType,
        productDescription,
        radioFreq,
        webURL,
      ]
    );

    return results.rows[0];
  }
}

class ProductImage {
  constructor(id, productId, url, altText) {
    this.id = id;
    this.productId = productId;
    this.url = url;
    this.altText = altText;
  }

  static async add({ productId, url, altText }) {
    const results = await db.query(
      `INSERT INTO product_images (
        product_id, 
        url, 
        alt_text ) 
        VALUES ($1, $2, $3) 
        RETURNING id, product_id, url, alt_text`,
      [productId, url, altText]
    );
    return results.rows[0];
  }

  static async get(productId) {
    const results = await db.query(
      `SELECT *
        FROM product_images
        WHERE product_id = $1
      `,
      [productId]
    );
    return results.rows;
  }

  static async delete(productId) {
    const results = await db.query(
      `DELETE
        FROM product_images
        WHERE id = $1
        RETURNING id
      `,
      [productId]
    );
    return results.rows[0];
  }
}

module.exports = { Product, ProductImage };
