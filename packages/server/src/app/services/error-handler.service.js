const InternalServerErrorException = require('../models/errors/internal-server.exception')

class ErrorHandlerService {
  #defaultError = new InternalServerErrorException()

  /* eslint-disable  no-unused-vars */
  handleError(error, _request, response, next) {
    if (!process.env.NODE_ENV) {
      console.error(error)
    }
    response.status(error.status || 500).send(error || this.#defaultError)
  }
}

module.exports = ErrorHandlerService
