const InternalServerErrorException = require('../models/errors/internal-server.exception')

class ErrorHandlerService {
  #defaultError = new InternalServerErrorException()

  // eslint-disable-next-line
  handleError(error, _request, response, next) {
    console.error(error.timestamp, error.error, '- ' + error.message)

    response.status(error.status || 500).send(error || this.#defaultError)
  }
}

module.exports = ErrorHandlerService
