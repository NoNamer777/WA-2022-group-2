const HttpException = require('./http.exception')

class NotFoundException extends HttpException {
  constructor(message) {
    super(404, 'Not Found', message)
  }
}

module.exports = NotFoundException
