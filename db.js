/** Database */

const pg = require('pg');

const db = new pg.Client('postgresql:///pliant-product-registration');

db.connect();

module.exports = db;
