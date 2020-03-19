/* jshint esversion: 8 */
const express = require('express');
const app = express();

app.use('/customer',require('./customers'));
app.use('/dump',require('./dump'));
app.use('/rentals',require('./rentals'));
module.exports = app;