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

module.exports = HttpException
