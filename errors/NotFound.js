class NotFound extends Error {
  constructor(message = 'Не найден') {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFound;
