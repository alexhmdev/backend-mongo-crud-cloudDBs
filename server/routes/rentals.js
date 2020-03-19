/* jshint esversion: 8 */
const express = require('express');
const _ = require('underscore');
const Rental = require('../models/rentals');
const ListingAndReview = require('../models/listingAndReviews');

const app = express();

app.post('/registrar', (req, res) => {
    let body = req.body;
    let renta = new Rental({
        idCustomer: body.idCustomer,
        idListingAndReview: body.idListingAndReview,
        fechaDevolucion: body.fechaDevolucion
    });

    renta.save((err, renDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        idCasa = renDB.idListingAndReview;


        ListingAndReview.findByIdAndUpdate(idCasa, { rentada: true }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                resp
            });
        });
    });
});

app.get('/obtenerRentadas', (req, res) => {
    ListingAndReview.find({ rentada: true })
        .exec((err, rentadas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                rentadas
            });
        });
});

app.get('/obtenerTipoPropiedad', (req, res) => {
    ListingAndReview.find({}, 'name property_type')
        .exec((err, casas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                casas
            });
        });
});

app.get('/obtenerPrecio', (req, res) => {
    ListingAndReview.find({}).sort([['price', 1]]).limit(30)
        .exec((err, casas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.status(200).json({
                ok: true,
                casas
            });

        });

});

module.exports = app;