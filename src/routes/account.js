const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('./account/index', { layout: 'main' });
});

router.get('/logout', function (req, res, next) {
  res.render('./account/index', { layout: 'main' });
});

router.get('/edit', function (req, res, next) {
  res.render('./account/edit-profile', { layout: 'main' });
});

router.post('/logout', accountController.logout);

module.exports = router;
