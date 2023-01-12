var express = require('express');
var router = express.Router();
const controller = require('../controllers/bookingController');
const { verifyAuth } = require('../middlewares/verifyAuth');

/* GET booking. */
router.get('/', function (req, res, next) {
  controller.default(req, res);
});

router.get('/create_order/:id', verifyAuth, controller.showBookingPage);
router.post('/create_order/:id', verifyAuth, controller.createOrder);
// router.get('/edit_order/:id', verifyAuth, controller.editOrderPage);
// router.get('/edit_order/:id', verifyAuth, controller.editOrder);

router.get('/booked_ticket/:id', verifyAuth, controller.showBookedTicket);

router.get('/cancel_ticket', function (req, res, next) {
  controller.showCancelTicket(req, res);
});

router.get('/search', function (req, res, next) {
  controller.showSearchingPage(req, res);
});

module.exports = router;
