const express = require('express');
const router = express.Router();
const { verifyGarage, verifyAuth } = require('../middlewares/verifyAuth');
const { checkAuth } = require('../middlewares/checkAuth');
const garageController = require('../controllers/garageController');

router.get('/', verifyAuth, verifyGarage, garageController.getGarage);
router.get('/:section/create', verifyGarage, garageController.addSection);
router.get('/station/edit/:id', verifyGarage, garageController.editStationSection);
router.get('/employee/edit/:id', verifyGarage, garageController.editEmployeeSection);
router.get('/coach/edit/:id', verifyGarage, garageController.editCoachSection);

router.post('/station/create', verifyGarage, garageController.handleStation);
router.post('/coach/create', verifyGarage, garageController.handleCoach);
router.post('/station/edit/:id', verifyGarage, garageController.handleStation);
// router.post('/employee/edit/id', verifyGarage, garageController.handleAddSection);

router.get('/:id/rating', checkAuth, garageController.showGarageRating);

router.get('/:id/info', checkAuth, garageController.showGarageDetail);

module.exports = router;
