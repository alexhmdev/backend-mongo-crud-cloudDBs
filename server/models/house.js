const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');

//declarar esquema
let Schema = mongoose.Schema;


let huoseSchema = new Schema({
    _id:{
        type:Number,
     
    },
    address: {
        type: String

    },
    type: {
        type: String

    },
    price: {
        type: Number
    },
    rating: {
        type: Number

    },
    review: {
        type: String

    },
    info: {
        type: String

    }

   
});
//el esquema utilize el plugin
huoseSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe que ser único'
});

//crea una coleccion
module.exports = mongoose.model('House', huoseSchema);