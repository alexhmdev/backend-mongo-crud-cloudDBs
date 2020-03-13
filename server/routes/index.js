//agrupa todos los archivos-rutas
const express = require('express');
const app = express();

app.use(require('./User'));
app.use(require('./house'));

module.exports = app;