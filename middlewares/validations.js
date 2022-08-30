const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');

const register = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string()
      .required()
      .custom((value, helper) => {
        if (!validator.isEmail(value)) {
          return helper.error('string.notEmail');
        }
        return value;
      })
      .messages({
        'any.required': 'Email не указан',
        'string.notEmail': 'Email не корректный',
      }),
    password: Joi.string().required().min(6).messages({
      'any.required': 'Пароль не указан',
      'string.min': 'Пароль должен быть больше 5-ти символов',
    }),
    name: Joi.string().min(2).max(30)
      .messages({
        'any.required': 'Имя пользователя не указано',
        'string.min': 'Имя пользователя должно быть больше 2-х символов',
        'string.max': 'Имя пользователя не должно быть больше 30-ти символов',
      }),
  }),
});

const profilUser = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30)
        .messages({
          'any.required': 'Имя пользователя не указано',
          'string.min': 'Имя пользователя должно быть больше 1-го символа',
          'string.max': 'Имя пользователя не должно быть больше 30-ти символов',
        }),
      email: Joi.string()
        .required()
        .custom((value, helper) => {
          if (!validator.isEmail(value)) {
            return helper.error('string.notEmail');
          }
          return value;
        })
        .messages({
          'any.required': 'Email не указан',
          'string.notEmail': 'Email не корректный',
        }),
    }),
});

const movies = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Поле image не соответствует формату ссылки');
      }),
      trailerLink: Joi.string().required().custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Поле trailerLink не соответствует формату ссылки');
      }),
      thumbnail: Joi.string().required().custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Поле thumbnail не соответствует формату ссылки');
      }),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
});

const index = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  register,
  profilUser,
  movies,
  index,
};
