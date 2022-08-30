const jwt = require('jsonwebtoken');

const Unauthorized = require('../errors/Unauthorized');
const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('Ошибка авторизации'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new Unauthorized('Ошибка авторизации'));
  }
  req.user = payload;
  return next();
};
