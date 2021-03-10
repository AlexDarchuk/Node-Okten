const { emailActionsEnum } = require('../constant');
const { errorCode: { BAD_REQUEST, OK } } = require('../constant');
const { errorUser: { USERS_IS_CREATED, USER_IS_DELETE } } = require('../error');
const { userService, emailService } = require('../service');
const { passwordHash } = require('../helper');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const { preferL = 'en' } = req.body;

            const users = await userService.findUsers(preferL, req.query);

            res.status(OK).json(users);
        } catch (error) {
            res.status(BAD_REQUEST).json(error.message);
        }
    },

    getOneUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const { preferL = 'en' } = req.body;

            const user = await userService.findUserById(userId, preferL);

            res.status(OK).json(user);
        } catch (error) {
            res.status(BAD_REQUEST).json(error.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const { password, email, preferL = 'en' } = req.body;

            const hashPassword = await passwordHash.hash(password);

            await userService.createUser({ ...req.body, password: hashPassword });

            await emailService.sendMail(email, emailActionsEnum.WELCOME, { userName: email });

            res.status(OK).json(USERS_IS_CREATED[preferL]);
        } catch (error) {
            res.status(BAD_REQUEST).json(error.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { preferL = 'en' } = req.body;
            const { userId } = req.params;

            await userService.deleteUser(userId);

            res.status(OK).json(USER_IS_DELETE[preferL]);
        } catch (error) {
            res.status(BAD_REQUEST).json(error.message);
        }
    }

};
