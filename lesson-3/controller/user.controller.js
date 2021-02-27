const userService = require('../service/user.service');
const errorCodes = require('../constant/errorCodes.enum');
const errorMessages = require('../error/error.messages');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const { preferL = 'en' } = req.body;

            const users = await userService.findUsers(preferL, req.query);

            res.status(errorCodes.OK).json(users);
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message);
        }
    },

    getOneUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const { preferL = 'en' } = req.body;

            const user = await userService.findUserById(userId, preferL);

            res.status(errorCodes.OK).json(user);
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const {
                email, nickname, password, preferL = 'en'
            } = req.body;
            const userBody = { email, nickname, password };

            await userService.createUser(userBody, preferL);

            res.status(errorCodes.OK).json(errorMessages.USERS_IS_CCREATED[preferL]);
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { preferL = 'en' } = req.body;
            const { userId } = req.params;

           await userService.deleteUser(userId);

            res.status(errorCodes.OK).json(errorMessages.USER_IS_DELETE[preferL]);
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message);
        }
    }

};
