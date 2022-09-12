const express = require("express");
const app = express();
// const bodyParser = require('body-parser');
const session = require('express-session');
const errorMiddleware = require('../server/middleware/errorMiddleware');

require("dotenv").config();

app.set('view engine', 'ejs');

// app.use(express.json());
// app.use(bodyParser.json());
// let urlEncoded = bodyParser.urlencoded({extended: false});

app.use(session({
    secret: "SecxretT",
    resave: false,
    saveUninitialized: false,
    // secure: true require HTTPS, maxAge in milliseconds
    cookie: { secure: false, maxAge: 3600000 }
}));

const index = require('./routes/index');

app.use('/', index);

app.use(errorMiddleware.returnError);

module.exports = app;