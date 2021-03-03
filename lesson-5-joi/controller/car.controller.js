const carService = require('../service/car.service');
const { errorCode } = require('../constant');
const { errorCar } = require('../error');

module.exports = {
    getAllCars: async (req, res) => {
        try {
            const { preferL = 'en' } = req.body;

            const cars = await carService.findCars(preferL, req.query);

            res.status(errorCode.OK).json(cars);
        } catch (error) {
            res.status(errorCode.BAD_REQUEST).json(error.message);
        }
    },

    getOneCar: async (req, res) => {
        try {
            const { carId } = req.params;
            const { preferL = 'en' } = req.body;

            const car = await carService.findCarById(carId, preferL);

            res.status(errorCode.OK).json(car);
        } catch (error) {
            res.status(errorCode.BAD_REQUEST).json(error.message);
        }
    },

    createCar: async (req, res) => {
        try {
            const { preferL = 'en' } = req.body;

            await carService.createCar(req.body);

            res.status(errorCode.OK).json(errorCar.CAR_IS_CCREATED[preferL]);
        } catch (error) {
            res.status(errorCode.BAD_REQUEST).json(error.message);
        }
    },

    deleteCar: async (req, res) => {
        try {
            const { preferL = 'en' } = req.body;
            const { carId } = req.params;

            await carService.deleteCar(carId);

            res.status(errorCode.OK).json(errorCar.CAR_IS_DELETE[preferL]);
        } catch (error) {
            res.status(errorCode.BAD_REQUEST).json(error.message);
        }
    }

};
