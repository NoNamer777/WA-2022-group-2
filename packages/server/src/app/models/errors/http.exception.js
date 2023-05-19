class HttpException extends Error {
  timestamp;
  status;
  error;
  message;

  constructor(status, error, message) {
    super();
    this.timestamp = new Date();
    this.status = status;
    this.error = error;
    this.message = message;
  }
}

module.exports = HttpException;
