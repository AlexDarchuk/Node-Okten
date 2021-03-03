const router = require('express').Router();
const { carController } = require('../../controller');

const { carMiddelewares } = require('../../middleware');

router.get('/', carMiddelewares.isCarValid, carController.getAllCars);

router.get('/:carId', carMiddelewares.checkIsIdCarValid, carController.getOneCar);

// router.post('/', carMiddleware.isCarValid, carController.createCar);

router.post('/', carMiddelewares.isCarValid, carController.createCar);

router.delete('/:carId', carMiddelewares.checkIsIdCarValid, carController.deleteCar);

module.exports = router;
