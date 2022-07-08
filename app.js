/** Express app. */

const express = require('express');
const cors = require('cors');
const { authenticateJWT } = require('./middleware/auth');

const app = express();
app.use(express.json());

// allow connections to all routes from any browser
app.use(cors());

// get auth token for all routes
app.use(authenticateJWT);

/** routes */

const authRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customers');
const productRoutes = require('./routes/products');
const imageRoutes = require('./routes/images');
const registrationRoutes = require('./routes/registrations');

app.use('/auth', authRoutes);
app.use('/customers', customerRoutes);
app.use('/products', productRoutes);
app.use('/images', imageRoutes);
app.use('/registrations', registrationRoutes);

/** 404 handler */

app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.send({ err });
});

module.exports = app;
