const express = require('express');
const _ = require('underscore');
const mongo = require('mongodb').MongoClient
const app = express();


mongo.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
  if (err) {
    console.error(err)
    return
  }
  const db = client.db('sample_airbnb');
const User = db.collection('Users');
  app.get('/user',(req,res) => {
    User.find({}).toArray().then((resp)=>{
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

app.post('/user',(req,res)=>{
    const user = {
        _id: req.body._id,
        Nombre: req.body.Nombre,
        Apellido: req.body.Apellido,
        user: req.body.user,
        password: req.body.password,
        CC: req.body.CC,
        CC_Type: req.body.CC_Type
    };

    User.insert(user).then((resp)=>{
        return res.status(200).json({
            ok: true,
            cont: resp
        });
    }).catch((err)=>{
        return res.status(400).json({
            ok: true,
            cont: err
        })
    })
})
});




module.exports = app;