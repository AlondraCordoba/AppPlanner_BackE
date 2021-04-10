const express = require('express');
const app = express();

app.use('/usuario', require('../controllers/users.controller'));
app.use('/login', require('../controllers/login.controller'));
app.use('/eventsCalendar', require('../controllers/eventsCalendar.controller'));
app.use('/toDoList', require('../controllers/toDoList.controller'));


module.exports = app;