const { carService } = require('../service');
const { errorCode: { BAD_REQUEST, OK } } = require('../constant');
const { errorCar: { CAR_IS_CREATED, CAR_IS_DELETE } } = require('../error');

module.exports = {
    getAllCars: async (req, res) => {
        try {
            const { preferL = 'en' } = req.body;

            const cars = await carService.findCars(preferL, req.query);

            res.status(OK).json(cars);
        } catch (error) {
            res.status(BAD_REQUEST).json(error.message);
        }
    },

    getOneCar: async (req, res) => {
        try {
            const { carId } = req.params;
            const { preferL = 'en' } = req.body;

            const car = await carService.findCarById(carId, preferL);

            res.status(OK).json(car);
        } catch (error) {
            res.status(BAD_REQUEST).json(error.message);
        }
    },

    createCar: async (req, res) => {
        try {
            const { preferL = 'en' } = req.body;

            await carService.createCar(req.body);

            res.status(OK).json(CAR_IS_CREATED[preferL]);
        } catch (error) {
            res.status(BAD_REQUEST).json(error.message);
        }
    },

    deleteCar: async (req, res) => {
        try {
            const { preferL = 'en' } = req.body;
            const { carId } = req.params;

            await carService.deleteCar(carId);

            res.status(OK).json(CAR_IS_DELETE[preferL]);
        } catch (error) {
            res.status(BAD_REQUEST).json(error.message);
        }
    }

};
