/*jshint esversion: 8*/
const mongoose = require('mongoose');
const { Schema } = mongoose;

const toDoListSchema = new Schema({
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
    collection: "toDoList"
});

module.exports = mongoose.model('ToDoList', toDoListSchema);