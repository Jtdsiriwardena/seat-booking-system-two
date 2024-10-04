const express = require('express');
const { bookSeat, getBookings, confirmBooking } = require('../controllers/bookingController');
const { getAllBookings } = require('../controllers/bookingController');
const { cancelBooking } = require('../controllers/bookingController');
const bookingController = require('../controllers/bookingController');
const { getConfirmedBookings } = require('../controllers/bookingController');

const router = express.Router();

router.post('/', bookSeat);


router.get('/', getBookings);


router.get('/all', getAllBookings);


router.get('/all', bookingController.getAllBookings);

router.get('/confirmed', getConfirmedBookings);


router.put('/:bookingId/confirm', confirmBooking);


router.delete('/:bookingId', cancelBooking);


// bookings.js

router.put('/:bookingId/attendance', bookingController.updateAttendance);


module.exports = router;
