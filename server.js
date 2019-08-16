const express = require('express');
const productRoutes = require('./routes/productRoutes')
const currencyRoutes = require('./routes/currencyRoutes')
const app = express();
const port = process.env.PORT || 3000;

productRoutes(app)
currencyRoutes(app)

let server = app.listen(port);

module.exports = server;




