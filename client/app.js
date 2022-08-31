const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const errorMiddleware = require('../server/middleware/errorMiddleware');

require("dotenv").config();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(bodyParser.json());
// app.use(express.static('public'));


const index = require('./routes/index');

app.use('/', index);

app.use(errorMiddleware.returnError);

module.exports = app;