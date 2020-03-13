/* jshint esversion: 8 */
const express = require('express');
const _ = require('underscore');
const Customer = require('../models/customer'); //subir nivel
const app = express();

app.post('/registrar', (req, res) => {
    let body = req.body;
    let customer = new Customer({
        //para poder mandar los datos a la coleccion
       
        _id: body._id,
        address: body.address,
        city: body.city,
        country: body.country,
        district: body.district,
        firstName: body.firstName,
        lastName: body.lastName

    });

    customer.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al registrar el nombre de la customer.',
                cont:err
            });
        }
        return res.status(200).json({
            ok: true,
            status:200,
            msg:"Se registro la customer correctamente",
            usrDB
        });
    });
});


//get
app.get('/obtener', (req, res) => {
    Customer.find({ estado: true, }) 
        .exec((err, customers) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status:400,
                    msg:"No se mostro el customer",
                    cont:err
                });
            }
            console.log(req.customer);
            return res.status(200).json({

                ok: true,
                status:200,
                msg:"Se obtuvieron los customers correctamente",
                count: customers.length,
                customers
            });
        });
});

//get id
app.get('/obtener/:id', (req, res) => {
    let id = req.params.id;
    Customer.find({ estado: true, _id: id }) 
        .exec((err, Customers) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status:400,
                    msg:"No se mostro el customer",
                    cont:err
                });
            }
            console.log(req.customer);
            return res.status(200).json({
                ok: true,
                status:400,
                msg:"Se mostro la customer correctamente por id",
                count: Customers.length,
                Customers
            });
        });
});

//get por nombre
app.get('/obtenerXnombre/:nombre', (req, res) => {
    let nombre = req.params.nombre;
    Customer.find({ estado: true, firstName: nombre }) 
        .exec((err, Customers) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status:400,
                    msg:"No se mostro el customer",
                    cont:err
                });
            }
            console.log(req.customer);
            return res.status(200).json({
                ok: true,
                status:200,
                msg:"Se mostro el customer correctamente por nombre",
                count: Customers.length,
                Customers
            });
        });
});

//get por pais country
app.get('/obtenerXpais/:pais', (req, res) => {
    let pais = req.params.pais;
    Customer.find({ estado: true, country: pais }) 
        .exec((err, Customers) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status:400,
                    msg:"No se mostro el customer",
                    cont:err
                });
            }
            console.log(req.customer);
            return res.status(200).json({
                ok: true,
                status:200,
                msg:"Se mostro el customer correctamente por country",
                count: Customers.length,
                Customers
            });
        });
});

//put
app.put('/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['address','city','country','district','firstName','lastName']); 
    Customer.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                status:400,
                msg:"No se actualizo el customer",
                err
            });
        }
        return res.status(200).json({
            ok: true,
            status:200,
            msg:"Se actualizo correctamente el customer",
            cont:usrDB
        });

    });
});

//delete
app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;
    Customer.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                status:400,
                msg:"No se elimino el customer",
                cont:err
            });
        }
        return res.status(200).json({
            ok: true,
            status:200,
            msg:"Se elimino correctamente customers",
            resp
        });
    });
});

module.exports = app;