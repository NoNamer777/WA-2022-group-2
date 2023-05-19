import { HttpException } from './http.exception.js';

export class InternalServerErrorException extends HttpException {
  constructor(message) {
    super(500, 'Internal Server Error', message);
  }
}
