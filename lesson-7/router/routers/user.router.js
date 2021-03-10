const router = require('express').Router();
const { userControler } = require('../../controller');

const { userMiddelewares, authMiddelewares } = require('../../middleware');

router.get('/', userMiddelewares.isUserValid, userControler.getAllUsers);

router.get('/:userId', userMiddelewares.checkIsIdValid, userControler.getOneUser);

router.post('/', userMiddelewares.isUserValid, userControler.createUser);

router.delete('/:userId', authMiddelewares.checkAccessTokenMiddleware, userControler.deleteUser);

module.exports = router;
