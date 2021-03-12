const router = require('express').Router();
const { userControler } = require('../../controller');

const { userMiddelewares, fileMiddleware, authMiddelewares } = require('../../middleware');

router.get('/',
    userMiddelewares.isUserValid,
    userControler.getAllUsers);

router.get('/:userId',
    userMiddelewares.checkIsIdValid,
    userControler.getOneUser);

router.post('/',
    fileMiddleware.checkFile,
    fileMiddleware.checkAvatar,
    userMiddelewares.isUserValid,
    userControler.createUser);

router.delete('/:userId',
    authMiddelewares.checkAccessTokenMiddleware,
    userControler.deleteUser);

module.exports = router;
