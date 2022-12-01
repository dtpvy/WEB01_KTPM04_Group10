var express = require('express');
var router = express.Router();
const controller = require('../controllers/bookingController');

/* GET booking. */
router.get('/', function (req, res, next) {
  controller.default(req, res);
});

router.get('/step_2', function (req, res, next) {
  controller.showStep2(req, res);
});

module.exports = router;
