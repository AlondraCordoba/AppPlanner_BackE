/*jshint esversion: 8*/
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const eventsCalendarModel = require('./eventsCalendar.model');
const toDoListModel = require('./toDoList.model')

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
    eventsCalendar: [
        [eventsCalendarModel.schema]
    ],
    toDoList: [
        [toDoListModel.schema]
    ],
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