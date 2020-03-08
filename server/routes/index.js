//agrupa todos los archivos-rutas
const express = require('express');
const app = express();

app.use(require('./usuario'));
app.use(require('./login'));
app.use(require('./academia'));

module.exports = app;