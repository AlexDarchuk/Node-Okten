const router = require('express').Router();

const { authController } = require('../../controller');
const { authMiddelewares } = require('../../middleware');

router.post('/', authMiddelewares.isUserRegistered, authController.getUSerAuth);

module.exports = router;
