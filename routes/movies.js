const router = require('express').Router();
const validations = require('../middlewares/validations');

const {
  createMovies,
  getMovies,
  deleteMovies,
} = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', validations.movies, createMovies);
router.delete('/movies/:movieId', validations.index, deleteMovies);

module.exports = router;
