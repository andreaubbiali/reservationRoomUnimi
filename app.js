const express = require("express");
const path = require('path');
const app = express();

require("dotenv").config();
require("./config/database").connect();

// app.set('view engine', 'ejs');

app.use(express.json());
app.set('views', path.join(__dirname, '/public/views'));
app.use(express.static('public', {index:'/views/login.html'}));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'static')));


const authenticationController = require('./controller/authenticationController');
app.post('/api/login', authenticationController.login);
app.post('/api/register', authenticationController.register);

const birds = require('./router/bird');
app.use('/api/birds', birds);


module.exports = app;