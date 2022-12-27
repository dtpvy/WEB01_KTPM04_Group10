const express = require('express');
const router = express.Router();
const { verifyAuth } = require('../middlewares/verifyAuth');
const registerController = require('../controllers/registerController');

/* GET register page. */
router.get('/', function (req, res, next) {
  res.render('./register/register', { layout: 'login_form' });
});

router.get('/coach', function (req, res, next) {
  res.render('./register/register_coach', { layout: 'login_form' });
});

router.post('/', registerController.userRegister);
router.post('/coach', verifyAuth, registerController.coachRegister);

module.exports = router;
