const Forbidden = require('../errors/Forbidden');
const NotFound = require('../errors/NotFound');
const ValidationError = require('../errors/ValidationError');

const Movie = require('../models/movie');

module.exports.createMovies = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, thumbnail, nameRU, nameEN, movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.deleteMovies = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(new NotFound('Запрашиваемый фильм не найдена'))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        throw new Forbidden('Нет прав доступа');
      } else {
        return Movie.findByIdAndRemove(movie)
          .then(() => res.send({ data: movie }));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Невалидный id '));
      } else {
        next(err);
      }
    });
};
