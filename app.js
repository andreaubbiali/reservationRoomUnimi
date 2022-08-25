const express = require("express");
const path = require('path');
const app = express();

require("dotenv").config();
require("./config/database").connect();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));


const authenticationController = require('./controller/authenticationController');
app.post('/login', authenticationController.login);
app.post('/register', authenticationController.register);

const birds = require('./router/bird');
app.use('/birds', birds);

app.use(express.static('public'))

module.exports = app;