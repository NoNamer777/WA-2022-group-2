const HttpException = require('./http.exception');

class BadRequestException extends HttpException {
  constructor(message) {
    super(400, 'Bad Request', message);
  }
}

module.exports = BadRequestException;
