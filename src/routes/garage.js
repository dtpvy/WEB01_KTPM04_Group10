const express = require('express');
const router = express.Router();
const { verifyGarage } = require('../middlewares/verifyAuth');
const garageController = require('../controllers/garageController');

router.get('/', verifyGarage, garageController.getGarage);
router.get('/:section/create', verifyGarage, garageController.addSection);
router.get('/:section/edit/:id', verifyGarage, garageController.editSection);
router.post('/:section/create', verifyGarage, garageController.handleAddSection);

router.get('/:id/rating', function (req, res, next) {
  res.render('./detail/rating', { layout: 'main' });
});

router.get('/:id/info', function (req, res, next) {
  res.render('./detail/detail', { layout: 'main' });
});

module.exports = router;
