const express = require('express');
const _ = require('underscore');
const House = require('../models/house'); //subir nivel
const app = express();
const mongo = require('mongodb').MongoClient;


mongo.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
  if (err) {
    console.error(err)
    return
  }
  const db = client.db('sample_airbnb');
const House = db.collection('house');
app.get('/house', (req, res) => {
    House.find({}).toArray().then((resp)=>{
        return res.status(200).json({
            ok: true,
            cont: resp
        });
    }).catch((err)=>{
        return res.status(400).json({
            ok: false,
            cont: err,
        })
    })
});

app.post('/house/registrar', (req, res) => {
    let body = req.body;
   const house={
        _id: body._id,
        address: body.address,
        type: body.type,
        price: body.price,
        rating: body.rating,
        review: body.review,
        info: body.info,
    };
    House.insert(house).then((resp)=>{
        return res.status(200).json({
            ok: true,
            cont: resp
        });
    }).catch((err)=>{
        return res.status(400).json({
            ok: false,
            cont: err
        })
    })
});

app.get('/house/:id', (req, res) => {
    let id = req.params.id;
    House.find({ _id: id })
        .toArray((err, house) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.status(200).json({
                ok: true,
                count: house.length,
                house
            });
        });
});

app.put('/house/:id', (req, res) => {
    let id = req.params.id;
    let body= req.body;
    const house={
        address: body.address,
        type: body.type,
        price: body.price,
        rating: body.rating,
        review: body.review,
        info: body.info,
    };
   
    House.findOneAndUpdate({_id: id}, {$set: house}, { new: true, runValidators: true, context: 'query' }).then((resp)=>{
        return res.status(200).json({
            ok: true,
            cont: resp
        });
    }).catch((err)=> {
        return res.status(400).json({
            ok: false,
            cont: err
    });
});

app.delete('/house/:id', (req, res) => {
    let id = req.params.id;
    House.deleteOne({ _id: id }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        //comprueba si eliminó algo
        if (resp.deletedCount === 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    id,
                    msg: 'House no encontrado'
                }
            });
        }

        return res.status(200).json({
            ok: true,
            resp
        });
    });

    // update from - set 
    /*    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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
   }); */
})

});







  })
    module.exports = app;