const express = require('express');
const router = express.Router();
const { verifyAuth } = require('../middlewares/verifyAuth');
const loginController = require('../controllers/loginController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('./login/login', { layout: 'login_form' });
});

router.get('/coach', function (req, res, next) {
  res.render('./login/login_coach', { layout: 'login_form' });
});

router.post('/', loginController.userLogin);
router.post('/coach', verifyAuth, loginController.coachLogin);
router.post('/sendEmail', loginController.sendEmail);

module.exports = router;
