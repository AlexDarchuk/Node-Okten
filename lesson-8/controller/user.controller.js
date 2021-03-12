const path = require('path');
const uuid = require('uuid').v1;
const fs = require('fs-extra').promises;

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
            const { body: { password, email, preferL = 'en' }, avatar } = req;

            const hashPassword = await passwordHash.hash(password);

            const user = await userService.createUser({ ...req.body, password: hashPassword });

            if (avatar) {
                // const pathWithoutStatic = path.join('user', `${user._id}`, 'photos');
                // const photoDir = path.join(process.cwd(), 'static', pathWithoutStatic);
                // const fileExtension = avatar.name.split('.').pop();
                // const photoName = `${uuid()}.${fileExtension}`;
                // const finalPhotoPath = path.join(photoDir, photoName);
                //
                // await fs.mkdir(photoDir, { recursive: true });
                // await avatar.mv(finalPhotoPath);
                //
                // await userService.updateUserById(user._id, { avatar: finalPhotoPath });

                const { uploadPath, finalPhotoPath, photoDir } = _photoDirBuilder(avatar.name, 'photos', user._id);

                await fs.mkdir(photoDir, { recursive: true });
                await avatar.mv(finalPhotoPath);

                await userService.updateUserById(user._id, { avatar: uploadPath });
            }

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

function _photoDirBuilder(docName, itemType, itemId) {
    const pathWithoutStatic = path.join('user', `${itemId}`, itemType);
    const photoDir = path.join(process.cwd(), 'static', pathWithoutStatic);
    const fileExtension = docName.split('.').pop();
    const photoName = `${uuid()}.${fileExtension}`;
    const finalPhotoPath = path.join(photoDir, photoName);

    console.log('***************************************8');
    console.log(finalPhotoPath);
    console.log('***************************************8');

    const uploadPath = path.join(pathWithoutStatic, photoName);

    return { finalPhotoPath, uploadPath, photoDir };
}
