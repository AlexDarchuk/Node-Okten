const router = require('express').Router();

const carController = require('../controller/car.controller');

router.get('/', carController.getAllCars);

router.get('/:carId', carController.getOneCar);

// router.post('/', carMiddleware.isCarValid, carController.createCar);

router.post('/', carController.createCar);

router.delete('/:carId', carController.deleteCar);

module.exports = router;
