const { errorCode: { BAD_REQUEST } } = require('../constant');
const { carValidators, carIdValidator } = require('../validator');

module.exports = {
    checkIsIdCarValid: (req, res, next) => {
        try {
            const { carId } = req.params;

            const { error } = carIdValidator.createIdCarValidators.validate(carId);

            if (error) {
                throw new Error(error.details[0].message);
            }
            next();
        } catch (e) {
            res.status(BAD_REQUEST).json(e.message);
        }
    },

    isCarValid: (req, res, next) => {
        try {
            const { error } = carValidators.createCarValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }
            next();
        } catch (e) {
            res.status(BAD_REQUEST).json(e.message);
        }
    }
};
