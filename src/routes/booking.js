var express = require('express');
var router = express.Router();

/* GET booking. */
router.get('/', function (req, res, next) {
  res.render('booking', { layout: 'main' });
});

module.exports = router;
