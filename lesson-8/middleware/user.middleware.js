const { errorCode: { BAD_REQUEST } } = require('../constant');
const { userValidators, userIdValidator } = require('../validator');

module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            const { userId } = req.params;

            const { error } = userIdValidator.createIdUserValidators.validate(userId);

            if (error) {
                throw new Error(error.details[0].message);
            }
            next();
        } catch (e) {
            res.status(BAD_REQUEST).json(e.message);
        }
    },

    isUserValid: (req, res, next) => {
        try {
            const { error } = userValidators.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }
            next();
        } catch (e) {
            res.status(BAD_REQUEST).json(e.message);
        }
    }
};
