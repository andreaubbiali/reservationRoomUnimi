const express = require('express');
const router = express.Router();

// GET home page.
router.get('/', function (req, res) {
    res.redirect('/login');
});

router.get('/login', function (req, res) {
    res.render('login');
});

router.get('/register', function (req, res) {
    res.render('register');
});

router.get('/room', function (req, res) {
    res.render('room');
});

module.exports = router;