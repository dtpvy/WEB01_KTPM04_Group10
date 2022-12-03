var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('./account/index', { layout: 'main' });
});

router.get('/Edit-Profile', function (req, res, next) {
  res.render('./account/edit-Profile', { layout: 'main' });
});

module.exports = router;