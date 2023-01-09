const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middlewares/checkAuth');
const indexControllers = require('../controllers/indexController');

router.get('/', checkAuth, indexControllers.homePage);

router.get('/search', function (req, res, next) {
  res.render('./home/search', { layout: 'main' });
});

module.exports = router;
