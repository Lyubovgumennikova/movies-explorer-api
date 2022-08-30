require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/index');

const app = express();
const errorHandler = require('./middlewares/errorHandler');
const NotFound = require('./errors/NotFound');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGODATA } = require('./config');

const { PORT = 3000, MONGODB = MONGODATA } = process.env;

mongoose.connect(MONGODB, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  // useUnifiedTopology: true,
});

app.use(cors());
app.use(requestLogger); // подключаем логгер запросов

app.get('/crash', (req, res, next) => {
  next(new Error('Приложение упало ('));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.use((req, res, next) => {
  next(new NotFound('Маршрут не найден'));
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
