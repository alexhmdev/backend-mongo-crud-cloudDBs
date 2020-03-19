/* jshint esversion: 8 */
const mongoose = require('mongoose');
const Customers = require('./customers');
const ListingAndReview = require('./listingAndReviews');

let Schema = mongoose.Schema;

let rentalSchema = new Schema({
    idCustomer: {
        type: Schema.Types.Number,
        ref: 'Customers',
        required: [true, 'Ingresar codigo del customer']
    },
    idListingAndReview: {
        type: Schema.Types.String,
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

module.exports = mongoose.model('Rental', rentalSchema);