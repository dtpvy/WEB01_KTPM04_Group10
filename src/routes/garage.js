const express = require('express');
const router = express.Router();
const { verifyGarage, verifyAuth } = require('../middlewares/verifyAuth');
const { checkAuth } = require('../middlewares/checkAuth');
const garageController = require('../controllers/garageController');

router.get('/', verifyAuth, verifyGarage, garageController.getGarage);
router.get('/:section/create', verifyGarage, garageController.addSection);

router.get('/station/edit/:id', verifyGarage, garageController.editStationSection);
router.post('/station/create', verifyGarage, garageController.handleStation);
router.delete('/station/delete/:id', verifyGarage, garageController.deleteStationSection);
router.post('/station/edit/:id', verifyGarage, garageController.handleStation);

router.get('/coach/edit/:id', verifyGarage, garageController.editCoachSection);
router.post('/coach/create', verifyGarage, garageController.handleCoach);
router.post('/coach/edit/:id', verifyGarage, garageController.handleCoach);
router.delete('/coach/delete/:id', verifyGarage, garageController.deleteCoachSection);

router.get('/employee/edit/:id', verifyGarage, garageController.editEmployeeSection);
// router.post('/employee/edit/id', verifyGarage, garageController.handleAddSection);

router.post('/tour/create', verifyGarage, garageController.handleTour);
router.delete('/tour/delete/:id', verifyGarage, garageController.deleteTourSection);

router.get('/:id/rating', checkAuth, garageController.showGarageRating);
router.post('/:id/rating', verifyAuth, garageController.rateGarage);
router.get('/:id/info', checkAuth, garageController.showGarageDetail);

module.exports = router;
