const carService = require('../service/car.service');
const errorCodes = require('../constant/errorCodes.enum');
const errorMessages = require('../error/error.messages');

module.exports = {
    getAllCars: async (req, res) => {
        try {
            const { preferL = 'en' } = req.body;

            const cars = await carService.findCars(preferL, req.query);

            res.status(errorCodes.OK).json(cars);
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message);
        }
    },

    getOneCar: async (req, res) => {
        try {
            const { carId } = req.params;
            const { preferL = 'en' } = req.body;

            const car = await carService.findCarById(carId, preferL);

            res.status(errorCodes.OK).json(car);
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message);
        }
    },

    createCar: async (req, res) => {
        try {
            const { preferL = 'en' } = req.body;

            await carService.createCar(req.body);

            res.status(errorCodes.OK).json(errorMessages.USERS_IS_CCREATED[preferL]);
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message);
        }
    },

    deleteCar: async (req, res) => {
        try {
            const { preferL = 'en' } = req.body;
            const { carId } = req.params;

            await carService.deleteCar(carId);

            res.status(errorCodes.OK).json(errorMessages.USER_IS_DELETE[preferL]);
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message);
        }
    }

};
