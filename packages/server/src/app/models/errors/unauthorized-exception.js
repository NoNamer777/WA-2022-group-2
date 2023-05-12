const HttpException = require('./http.exception')

class UnauthorizedException extends HttpException {
  constructor() {
    // Pass 'Unauthorized' as message as well so that we don't give any indication of what is going
    // wrong in the authorization/authentication flow
    super(401, 'Unauthorized', 'Unauthorized')
  }
}

module.exports = UnauthorizedException
