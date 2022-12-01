var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('./login/login', { layout: 'login_form' });
});

router.get('/coach', function (req, res, next) {
  res.render('./login/login_Coach', { layout: 'login_form', });
});


module.exports = router;
