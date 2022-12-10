var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('./home/index', { layout: 'home' });
});

router.get('/search', function (req, res, next) {
  res.render('./home/search', { layout: 'main' });
});

module.exports = router;
