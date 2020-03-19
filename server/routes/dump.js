/* jshint esversion: 8 */
const express = require('express');
const _ = require('underscore');
const app = express();
const mongobackup = require('mongobackup');  // ya sabes el npm install mongobackup --save

app.get('/collections', (req, res) => {
    mongobackup.dump({
        host: 'localhost',
        db: 'sample_airbnb',
        out: './dump'
    });
    res.send(res.status(200).json({
        ok: true,
        msg: 'Se guardo correctamente el respaldo'
    }))


});


module.exports = app;