//agrupa todos los archivos-rutas
const express = require('express');
const app = express();

app.use(require('./User'));

app.use('/customer',require('./customer'));


module.exports = app;