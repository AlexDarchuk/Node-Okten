const router = require('express').Router();

const userController = require('../controller/user.controller');

router.get('/', userController.getAllUsers);

router.get('/:userId', userController.getOneUser);

router.post('/', userController.createUser);

router.delete('/:userId', userController.deleteUser);

module.exports = router;
