var express = require('express');
var router = express.Router();
const controller = require('../controllers/bookingController');

/* GET booking. */
router.get('/', function (req, res, next) {
  controller.default(req, res);
});

router.get('/create_order/:id', function (req, res, next) {
  controller.showBookingPage(req, res);
});

router.get('/booked_ticket/:id', function (req, res, next) {
  controller.showBookedTicket(req, res);
});

router.get('/cancel_ticket', function (req, res, next) {
  controller.showCancelTicket(req, res);
});

router.get('/search', function (req, res, next) {
  controller.showSearchingPage(req, res);
});

module.exports = router;
