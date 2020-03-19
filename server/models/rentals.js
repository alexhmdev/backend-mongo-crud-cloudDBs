/* jshint esversion: 8 */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Customers = require('./customers');
const ListingAndReview = require('./listingAndReviews');

let Schema = mongoose.Schema;

let rentalSchema = new Schema({
    idCustomer: {
        type: String,
        ref: 'Customers',
        required: [true, 'Ingresar codigo del customer']
    },
    idListingAndReview: {
        type: String,
        ref: 'ListingAndReview',
        required: [true, 'Favor de ingresar el id de la casa']
    },
    fechaDeRenta: {
        type: Date,
        default: Date()
    },
    fechaDevolucion: {
        type: Date,
        required: [true, 'Favor de ingresar la fecha de devolucion']
    },
    rentada: {
        type: Boolean,
        default: true
    }
});

rentalSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser único y diferente'
});

module.exports = mongoose.model('Rental', rentalSchema);