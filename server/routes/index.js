/* jshint esversion: 8 */
const express = require('express');
const app = express();

app.use('/customer',require('./customer'));


module.exports = app;