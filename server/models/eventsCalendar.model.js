/*jshint esversion: 8*/
const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventCalendarSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    blnActivo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: "eventosCalendar"
});

module.exports = mongoose.model('EventCalendar', eventCalendarSchema);