const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Users = new Schema({
    _id: {
        type: Number,
        required:[true, 'User ID is required']
    },
    Nombre: {
        type: String,
        required: [true, 'Name is required']
    },
    Apellido: {
        type: String,
        required: [true, 'last name is required']
    },
    user: {
        type: String,
        required: [true, 'user is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    CC: {
        type: String,
        required: [true, 'credit card is required']
    },
    CC_Type: {
        type: String,
        required: [true, 'Card type is required']
    }
});

module.exports = mongoose.model('Users', Users);