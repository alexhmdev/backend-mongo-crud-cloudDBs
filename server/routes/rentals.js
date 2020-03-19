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

app.get('/obtener/rentadas', (req, res) => {
    ListingAndReview.find({ rentada: true }).populate('customers').populate('listingAndReviews')
    .then((resp)=>{
        return res.status(200).json({
            ok: true,
            msg: 'Obtenidas propiedades rentadas con exito',
            resp
        });
    }).catch((err)=>{
        return res.status(400).json({
            ok: false,
            msg: 'ocurrio un error intenta de nuevo'
        });
    });
});

app.get('/obtener/:desde', (req, res) => {
    let desde = req.params.desde || 0;
    desde = Number(desde);

    ListingAndReview.find({}).skip(desde).limit(10)
    .then((resp)=>{
        return res.status(200).json({
            ok: true,
            msg: 'Obtenidas propiedades rentadas con exito',
            resp
        });
    }).catch((err)=>{
        return res.status(400).json({
            ok: false,
            msg: 'ocurrio un error intenta de nuevo'
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
    ListingAndReview.find({},).sort([['price', 1]]).limit(30)
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

app.get('/obtenerPrecio/:minimo/:maximo/:desde', (req, res) => {
    let minimo = req.params.minimo || 0;
    minimo = Number(minimo); //forzar que el dato siempre sea numerico
    let maximo = req.params.maximo || 0;
    maximo = Number(maximo);
    let desde = req.params.desde || 0;
    desde = Number(desde);

    ListingAndReview.find({$and:[{price:{$gt:minimo--}},{price:{$lt:maximo++}}]},{price:1})
    .sort({price:1})
    .skip(desde)
    .limit(10)
    .then((resp)=>{
        return res.status(200).json({
            ok: true,
            msg: `Obteniendo resultados de precio minimo: ${minimo} maximo: ${maximo}`,
            count: resp.length,
            resp
        });
    }).catch((err)=>{
        return res.status(400).json({
            ok: false,
            msg: 'Ocurrio un error intenta de nuevo',
            err
        });
    });

});

module.exports = app;