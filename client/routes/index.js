const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
let urlEncoded = bodyParser.urlencoded({extended: false});

const roomCtrl = require('../controller/room');
const userCtrl = require('../controller/user');
const reservationCtrl = require('../controller/reservation');
const adminCtrl = require('../controller/admin');
const {checkLogin} = require('../middleware/authMiddleware');


/**
 * Render of ejs pages
 */

// GET home page.
router.get('/', function (req, res) {
    res.redirect('/login');
});

// USER
router.get('/login', userCtrl.getLoginPage);
router.get('/register', userCtrl.getRegistrationPage);
router.post('/login', urlEncoded, userCtrl.loginUser);
router.get('/logout', userCtrl.logoutUser);

// ADMIN
router.get('/adminConsole', checkLogin, adminCtrl.adminConsole);

// ROOM
router.get('/rooms', checkLogin, roomCtrl.getRoom);
router.get('/room/:id', checkLogin, roomCtrl.getRoomByID);
router.post('/createRoom', checkLogin, urlEncoded, roomCtrl.createRoom);

router.post('/book', checkLogin, urlEncoded, reservationCtrl.reserveRoom);

// RESERVATION
router.get('/reservations', checkLogin, reservationCtrl.getReservations);
router.post('/filteredReservations', checkLogin, urlEncoded, reservationCtrl.getFilteredReservations)
router.post('/deleteReservation', checkLogin, urlEncoded, reservationCtrl.deleteReservation);

module.exports = router;