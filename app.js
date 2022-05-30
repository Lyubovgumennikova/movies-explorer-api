const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('cors');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const errorHandler = require('./middlewares/errorHandler');
const validations = require('./middlewares/validations');
const NotFound = require('./errors/NotFound');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGODATA } = require('./config');
// Слушаем 3000 порт
const { PORT = 3000, MONGODB = MONGODATA } = process.env;

mongoose.connect(MONGODB, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  // useUnifiedTopology: true,
});

app.use(cors());
app.use(requestLogger); // подключаем логгер запросов

// app.get('/crash', (req, res, next) => {
//   next(new Error('Приложение упало ('));
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', validations.register, createUser);
app.post('/signin', validations.register, login);

app.use(auth);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/movies'));

app.use((req, res, next) => {
  next(new NotFound('Маршрут не найден'));
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
