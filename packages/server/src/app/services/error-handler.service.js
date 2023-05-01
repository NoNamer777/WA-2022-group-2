const InternalServerErrorException = require('../models/errors/internal-server.exception')

class ErrorHandlerService {
  #defaultError = new InternalServerErrorException()

  handleError(error, _request, response) {
    if (!process.env.SERVER_PRODUCTION) {
      console.error(error)
    }
    response.status(error.status || 500).send(error || this.#defaultError)
  }
}

module.exports = ErrorHandlerService
