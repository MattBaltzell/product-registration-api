/** Database */

const pg = require('pg');

const db = new pg.Client('postgresql:///product-registration');

db.connect();

module.exports = db;
