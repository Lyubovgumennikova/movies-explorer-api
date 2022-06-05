const router = require('express').Router();
const validations = require('../middlewares/validations');

const {
  getUserMe,
  updateUser,
} = require('../controllers/users');

router.get('/users/me', getUserMe);
router.patch('/users/me', validations.profilUser, updateUser);

module.exports = router;
