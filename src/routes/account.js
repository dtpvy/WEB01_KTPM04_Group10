const express = require('express');
const router = express.Router();
const { verifyAuth } = require('../middlewares/verifyAuth');
const accountController = require('../controllers/accountController');

/* GET home page. */
router.get('/', verifyAuth, accountController.getProfile);

router.get('/logout', function (req, res, next) {
  res.render('./account/index', { layout: 'main' });
});

router.get('/edit', verifyAuth, accountController.editProfile);

router.post('/edit', verifyAuth, accountController.updateProfile);

router.post('/logout', accountController.logout);

router.post('/forget_password/:email', accountController.forgetPassword);
router.post('/coach/forget_password/:code', verifyAuth, accountController.forgetCoachPassword);

module.exports = router;
