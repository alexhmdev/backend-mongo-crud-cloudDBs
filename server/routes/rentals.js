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
        returnDate: body.returnDate
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

app.delete('/desrentar/:idCasa/:idRental', (req, res) => {
  let idCasa = req.params.idCasa;
  let idRental = req.params.idRental;
    ListingAndReview.findByIdAndUpdate(idCasa, { rentada: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Rental.findByIdAndUpdate(idRental, { rented: false }, { new: true, runValidators: true, context: 'query' }).then((resp)=>{
                return res.status(200).json({
                    ok: true,
                    resp
                });
            })
          
        });
       
    });


app.get('/obtener/rentadas', (req, res) => {
    ListingAndReview.find({ rentada: true })
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

    ListingAndReview.find({ rentada: false}).skip(desde).limit(10)
    .then((resp)=>{
        return res.status(200).json({
            ok: true,
            msg: 'Obtenidas propiedades rentadas con exito',
            count: resp.length,
            resp
        });
    }).catch((err)=>{
        return res.status(400).json({
            ok: false,
            msg: 'ocurrio un error intenta de nuevo'
        });
    });
});

app.get('/obtenerXpropiedad/:property_type/:desde', (req, res) => {
    let desde = req.params.desde;
    desde = Number(desde);
    ListingAndReview.find({"property_type": req.params.property_type})
    .skip(desde)
    .limit(10)
    .then((resp)=>{
        return res.status(200).json({
            ok: true,
            msg: 'Funciona correctamente',
            resp
        });
    }).catch((err)=>{
        return res.status(400).json({
            ok: false,
            msg: 'ocurrio un error',
            err
        });
    });
});

app.get('/propiedades',(req,res) => {
    ListingAndReview.distinct("property_type").then((resp)=>{
        return res.status(200).json({
            ok: true,
            msg: 'Obtenidas propiedades con exito',
            resp
        });
    }).catch((err)=>{
        return res.status(400).json({
            ok: false,
            msg: 'Algo salio mal',
            err
        });
    });
});

app.get('/obtenerXpropiedad/:propiedad',(req,res) => {
    ListingAndReview.find({"property_type":req.params.propiedad}).then((resp)=>{
        return res.status(200).json({
            ok: true,
            msg: 'Obtenidas propiedades con exito',
            resp
        });
    }).catch((err)=>{
        return res.status(400).json({
            ok: false,
            msg: 'Algo salio mal',
            err
        });
    });
});

app.get('/mostrar', (req, res) => {
   Rental.find({ rented: true}).populate('idCustomer').populate('idListingAndReview').then((resp)=>{
       return res.status(200).json({
           ok: true,
           msg: 'mostrando rentas',
           count: resp.length,
           resp
       });
   }).catch((err)=>{
       return res.status(400).json({
           ok: false,
           msg: 'Ocurrio un error',
           err
       });
   });

});

app.get('/obtenerPrecio/:minimo/:maximo/:desde', (req, res) => {
    let minimo = req.params.minimo || 0;
    minimo = Number(minimo);
    minimo--; //forzar que el dato siempre sea numerico
    let maximo = req.params.maximo || 0;
    maximo = Number(maximo);
    maximo++;
    let desde = req.params.desde || 0;
    desde = Number(desde);

    ListingAndReview.find({$and:[{price:{$gt:minimo}},{price:{$lt:maximo}}]})
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