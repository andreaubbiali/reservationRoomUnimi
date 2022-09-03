const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
let urlEncoded = bodyParser.urlencoded({extended: false});

const roomCtrl = require('../controller/room');
const userCtrl = require('../controller/user');
const reservationCtrl = require('../controller/reservation');


/**
 * Render of ejs pages
 */

// GET home page.
router.get('/', function (req, res) {
    res.redirect('/login');
});

router.get('/login', function(req, res) {
    let jsonOutput = {
        error: null,
    }
    res.render('login', jsonOutput);
});

router.post('/login', urlEncoded, userCtrl.loginUser);

router.get('/register', function (req, res) {
    res.render('register');
});

router.get('/rooms', roomCtrl.getRoom);

router.get('/room/:id', roomCtrl.getRoomByID);

router.post('/book', urlEncoded, reservationCtrl.reserveRoom);

router.get('/reservations', reservationCtrl.getReservations);

router.post('/deleteReservation', urlEncoded, reservationCtrl.deleteReservation);

module.exports = router;