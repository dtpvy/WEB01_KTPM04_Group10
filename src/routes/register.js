var express = require('express');
var router = express.Router();

/* GET register page. */
router.get('/', function (req, res, next) {
  res.render('./register/register', { layout: 'login_form' });
});

router.get('/coach/', function (req, res, next) {
  res.render('./register/register_Coach', { layout: 'login_form' });
});
module.exports = router;