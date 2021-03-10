const router = require('express').Router();
const userRouter = require('./routers/user.router');
const carRouter = require('./routers/car.router');
const authRouter = require('./routers/auth.router');

router.use('/users', userRouter);
router.use('/cars', carRouter);
router.use('/auth', authRouter);

module.exports = router;
