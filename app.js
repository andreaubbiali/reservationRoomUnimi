const express = require("express");
const path = require('path');
const app = express();
const logger = require('morgan');

require("dotenv").config();
require("./config/database").connect();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static('public'));


const authenticationController = require('./controller/authenticationController');
app.post('/api/login', authenticationController.login);
app.post('/api/register', authenticationController.register);

const index = require('./router/index');
const rooms = require('./router/rooms');
const reservation = require('./router/reservations');

// log only request below 
app.use(logger('dev'));
app.use('/', index);
app.use(logger('dev'));
app.use('/api/rooms', rooms);
app.use("/api/reservation", reservation);

module.exports = app;