var express = require('express');
var router = express.Router();
const controller = require('../controllers/bookingController');

/* GET booking. */
router.get('/', function (req, res, next) {
  controller.default(req, res);
});

module.exports = router;
