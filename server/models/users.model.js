/*jshint esversion: 8*/
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Favor de insertar el username de Usuario.']
    },
    firstName: {
        type: String,
        required: [true, 'Favor de insertar su username.']
    },
    lastName: {
        type: String,
        required: [true, 'Favor de insertar sus apellidos.']
    },
    email: {
        type: String,
        required: [true, 'Favor de insertar su email.']
    },
    password: {
        type: String,
        required: [true, 'Favor de insertar su Contraseña.']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Favor de insertar su Numero de Telefono.']
    },
    gender: {
        type: String,
        required: [true, 'Favor de insertar su Género.']
    },
    role: {
        type: String,
        default: "USER_ROLE"
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: "usuario"
});

module.exports = mongoose.model('Usuario', userSchema);