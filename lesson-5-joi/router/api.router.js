const router = require('express').Router();
const userRouter = require('./routers/user.router');
const carRouter = require('./routers/car.router');

router.use('/users', userRouter);
router.use('/cars', carRouter);

module.exports = router;
