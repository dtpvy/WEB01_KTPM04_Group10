const express = require('express');
const router = express.Router();
const { verifyGarage, verifyAuth } = require('../middlewares/verifyAuth');
const garageController = require('../controllers/garageController');

router.get('/', verifyAuth, verifyGarage, garageController.getGarage);
router.get('/:section/create', verifyGarage, garageController.addSection);

router.get('/station/edit/:id', verifyGarage, garageController.editStationSection);
router.post('/station/create', verifyGarage, garageController.handleStation);
router.delete('/station/delete/:id', verifyGarage, garageController.deleteStationSection);
router.post('/station/edit/:id', verifyGarage, garageController.handleStation);

router.get('/coach/edit/:id', verifyGarage, garageController.editCoachSection);
router.post('/coach/create', verifyGarage, garageController.handleCoach);

router.get('/employee/edit/:id', verifyGarage, garageController.editEmployeeSection);
// router.post('/employee/edit/id', verifyGarage, garageController.handleAddSection);

router.get('/:id/rating', function (req, res, next) {
  res.render('./detail/rating', { layout: 'main' });
});

router.get('/:id/info', function (req, res, next) {
  res.render('./detail/detail', { layout: 'main' });
});

module.exports = router;
