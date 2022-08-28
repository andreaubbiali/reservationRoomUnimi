const express = require("express");
const path = require('path');
const app = express();
const logger = require('morgan');

require("dotenv").config();
require("./config/database").connect();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static('public'));

const index = require('./router/index');
const rooms = require('./router/room');
const reservations = require('./router/reservation');
const users = require('./router/user');

app.use('/', index);

// log only request below 
app.use(logger('dev'));
app.use('/api/rooms', rooms);
app.use('/api/reservation', reservations);
app.use('/api/user', users);

module.exports = app;