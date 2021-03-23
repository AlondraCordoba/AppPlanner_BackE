const express = require('express');
const app = express();

app.use('/usuario', require('../controllers/users.controller'));
app.use('/login', require('../controllers/login.controller'));


module.exports = app;