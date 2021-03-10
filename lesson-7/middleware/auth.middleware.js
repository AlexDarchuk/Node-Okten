const jwt = require('jsonwebtoken');
const { User, O_Auth } = require('../dataBase/models');
const { errorCode: { BAD_REQUEST }, AUTHORIZATION } = require('../constant');
const { errorUser: { BED_PASSWORD_OR_EMAIL } } = require('../error');
const { JWT_SECRET } = require('../config/config');

module.exports = {
    isUserRegistered: async (req, res, next) => {
        try {
            const { email } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                throw new Error(BED_PASSWORD_OR_EMAIL);
            }

            next();
        } catch (e) {
            res.status(BAD_REQUEST).json(e.message);
        }
    },

    checkAccessTokenMiddleware: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            if (!access_token) {
                throw new Error('Token is required');
            }

            const tokens = await O_Auth.findOne({ access_token });

            if (!tokens) {
                throw new Error('Not Valid token');
            }

            jwt.verify(access_token, JWT_SECRET, (err) => {
                if (err) {
                    throw new Error('Not valid token');
                }
            });

            console.log(access_token);
            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
