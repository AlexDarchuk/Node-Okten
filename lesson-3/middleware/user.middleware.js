const errorCodes = require('../constant/errorCodes.enum');
const errorMessages = require('../error/error.messages');

module.exports = {
    checkIsIdValid: (req, res, next) => {
        try {
            const userId = +req.params.userId;
            const { preferL = 'en' } = req.body;

            if (userId < 0 || !Number.isInteger(userId) || Number.isNaN(userId)) {
                throw new Error(errorMessages.NOT_VALID_ID[preferL]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    isUserValid: (req, res, next) => {
        try {
            const {
                nickname, password, email, preferL = 'en'
            } = req.body;

            if (!nickname || !password || !email) {
                throw new Error(errorMessages.SOME_FILED_IS_EMPTY[preferL]);
            }

            if (!email.includes('@') || !String(nickname) || password < 20) {
                throw new Error(errorMessages.THE_DATA_ENTERED_IS_NOT_GOOD[preferL]);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.massage);
        }
    }
};
