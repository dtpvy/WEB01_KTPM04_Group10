var express = require('express');
var router = express.Router();

router.get('/:id/rating', function (req, res, next) {
  res.render('./detail/rating', { layout: 'main' });
});

router.get('/:id*', function (req, res, next) {
  res.render('./detail/detail', { layout: 'main' });
});

module.exports = router;
