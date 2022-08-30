const express = require("express");
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const errorMiddleware = require('../server/middleware/errorMiddleware');

require("dotenv").config();
// require("./server/config/database").connect();

// app.set('view engine', 'ejs');

// app.use(express.json());
// app.use(bodyParser.json());
// // app.use(express.static('public'));


// const index = require('../server/router/index');
// const rooms = require('../server/router/room');
// const reservations = require('../server/router/reservation');
// const users = require('../server/router/user');

// app.use('/', index);

// // log only request below 
// app.use(logger('dev'));
// app.use('/api/rooms', rooms);
// app.use('/api/reservation', reservations);
// app.use('/api/user', users);


// // DO NOT TOUCH THE ORDER OF APP.USE
// app.use(errorMiddleware.returnError);

module.exports = app;