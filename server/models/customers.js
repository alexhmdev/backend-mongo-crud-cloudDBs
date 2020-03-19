/* jshint esversion: 8 */
const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');
const AutoIncrement =require('mongoose-sequence')(mongoose);

//declarar esquema
let Schema = mongoose.Schema;


let customerSchema = new Schema({
    _id:{
        type:Number,
     
    },
    address: {
        type: String

    },
    city: {
        type: String
    },
    country: {
        type: String

    },
   
    district: {
        type: String

    },
    firstName: {
        type: String

    },
    lastName: {
        type: String
    },
    estado:{
        type: Boolean,
        default: true
    }
},{collection:'Customers'});
//el esquema utilize el plugin
customerSchema.plugin(uniquevalidator, {
    message: '{PATH} Debe que ser único'
});

({collection:"Customers"});
customerSchema.plugin(AutoIncrement,{_id:'_id'},{
    message:'{PATH} Debe de ser unico y diferente'
});

//crea una coleccion
module.exports = mongoose.model('Customer', customerSchema);