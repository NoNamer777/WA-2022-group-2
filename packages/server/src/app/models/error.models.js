class HttpException {
  timestamp
  status
  error
  message

  constructor(status, error, message) {
    this.timestamp = new Date()
    this.status = status
    this.error = error
    this.message = message
  }
}

class BadRequestException extends HttpException {
  constructor(message) {
    super(400, 'Bad Request', message)
  }
}

class NotFoundException extends HttpException {
  constructor(message) {
    super(404, 'Not Found', message)
  }
}

module.exports = {
  HttpException,
  BadRequestException,
  NotFoundException
}
