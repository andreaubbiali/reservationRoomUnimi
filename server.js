const express = require('express');

const session = require('express-session');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

var birds = require('./router/bird');


app.use(session({
    secret: 'secret',
    resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

const authenticationController = require('./controller/authenticationController');
app.post('/auth', authenticationController.auth);

app.use('/birds', birds);

app.listen(port);
console.log('Server started at http://localhost:' + port);