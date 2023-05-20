const HttpException = require('./http.exception');

class InternalServerErrorException extends HttpException {
  constructor(message) {
    super(500, 'Internal Server Error', message);
  }
}

module.exports = InternalServerErrorException;
