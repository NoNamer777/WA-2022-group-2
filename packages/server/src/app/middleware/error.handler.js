import { InternalServerErrorException } from '../models/errors/internal-server.exception.js';

const defaultError = new InternalServerErrorException();

// eslint-disable-next-line no-unused-vars
export const errorHandler = (error, _request, response, _next) => {
  console.error(error.timestamp, error.error, '- ' + error.message);

  response.status(error.status || defaultError.status).send(error || defaultError);
};
