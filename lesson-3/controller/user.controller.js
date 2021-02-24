const userService = require('../service/user.service');
const errorCodes = require('../constant/errorCodes.enum');
const errorMessages = require('../error/error.messages');

module.exports = {
    getAllUsers: (req, res) => {
        try {
            const users = userService.findUsers();
            res.json(users);
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message);
        }
    },

    getOneUser: (req, res) => {
       try {
            const {userId} = req.params;
            const user = userService.findUserById(userId);

            res.json(user);
       } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message);
       }
    },

    createUser: (req, res) => {
       try {
           const {preferL = 'en'} = req.body;

            userService.createUser(req.body);

            res.status(errorCodes.OK).json(errorMessages.USERS_IS_CCREATED[preferL]);
       } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message);
       }
    },

    deleteUser: (req, res) => {
        try {
            const {preferL = 'en'} = req.body;
            const {userId} = req.params;

            userService.deleteUser(userId);

            res.status(errorCodes.OK).json(errorMessages.USER_IS_DELETE[preferL]);
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message);
        }
    }

}