const express = require("express");
const path = require('path');
const app = express();
const logger = require('morgan');

require("dotenv").config();
require("./config/database").connect();

// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.set('views', path.join(__dirname, '/public/views'));
app.use(express.static('public', {index:'/views/login.html'}));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'static')));


const authenticationController = require('./controller/authenticationController');
app.post('/api/login', authenticationController.login);
app.post('/api/register', authenticationController.register);

const rooms = require('./router/rooms');
const reservation = require('./router/reservations');

app.use('/api/rooms', rooms);
app.use("/api/reservation", reservation);

module.exports = app;