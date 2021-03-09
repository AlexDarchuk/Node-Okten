const { userService } = require('../service');
const { errorCode } = require('../constant');
const { errorUser } = require('../error');
const { passwordHash } = require('../helper');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const { preferL = 'en' } = req.body;

            const users = await userService.findUsers(preferL, req.query);

            res.status(errorCode.OK).json(users);
        } catch (error) {
            res.status(errorCode.BAD_REQUEST).json(error.message);
        }
    },

    getOneUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const { preferL = 'en' } = req.body;

            const user = await userService.findUserById(userId, preferL);

            res.status(errorCode.OK).json(user);
        } catch (error) {
            res.status(errorCode.BAD_REQUEST).json(error.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const { password, preferL = 'en' } = req.body;

            const hashPassword = await passwordHash.hash(password);

            await userService.createUser({ ...req.body, password: hashPassword });

            await userService.createUser(req.body);

            res.status(errorCode.OK).json(errorUser.USERS_IS_CCREATED[preferL]);
        } catch (error) {
            res.status(errorCode.BAD_REQUEST).json(error.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { preferL = 'en' } = req.body;
            const { userId } = req.params;

            await userService.deleteUser(userId);

            res.status(errorCode.OK).json(errorUser.USER_IS_DELETE[preferL]);
        } catch (error) {
            res.status(errorCode.BAD_REQUEST).json(error.message);
        }
    }

};
