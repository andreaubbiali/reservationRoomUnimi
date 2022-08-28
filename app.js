const express = require("express");
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');

require("dotenv").config();
require("./config/database").connect();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('public'));

// app.use(bodyParser.urlencoded({
//     extended: true
// }));

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

// // Handling Errors
// app.use((err, req, res, next) => {
//     // console.log(err);
//     err.statusCode = err.statusCode || 500;
//     err.message = err.message || "Internal Server Error";
//     res.status(err.statusCode).json({
//       message: err.message,
//     });
// });

module.exports = app;