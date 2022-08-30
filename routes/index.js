const router = require('express').Router();

const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const validations = require('../middlewares/validations');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFound = require('../errors/NotFound');

router.post('/signup', validations.register, createUser);
router.post('/signin', validations.register, login);

router.use(auth, userRouter);
router.use(auth, movieRouter);

router.use('/*', () => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});

module.exports = router;
