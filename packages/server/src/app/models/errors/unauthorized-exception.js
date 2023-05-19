import { HttpException } from './http.exception.js';

export class UnauthorizedException extends HttpException {
  constructor(message) {
    // Pass 'Unauthorized' as message as well so that we don't give any indication of what is going
    // wrong in the authorization/authentication flow
    super(401, 'Unauthorized', message || 'Unauthorized');
  }
}
