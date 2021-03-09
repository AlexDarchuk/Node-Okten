const Car = require('../dataBase/models/Car');

module.exports = {
    findCars: () => Car.find(),

    findCarById: (carId) => Car.findById(carId),

    createCar: (carBody) => Car.create(carBody),

    deleteCar: (carId) => Car.findByIdAndRemove(carId)
};
