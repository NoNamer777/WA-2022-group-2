const dotenv = require('dotenv');
const express = require('express');
const rateLimit = require('express-rate-limit');
const path = require('path');
const corsMiddleware = require('./middleware/cors-middleware');
const authRouter = require('./models/auth/auth.router');
const usersRouter = require('./models/user/user.router');
const ConfigService = require('./services/config.service');
const DatabaseService = require('./services/database.service');
const ErrorHandlerService = require('./services/error-handler.service');

class App {
  /** @type {import('express').Express} */
  app = express();

  /**
   * On all routes, allow maximum 50 requests per minute
   * @type {import('express-rate-limit').RateLimitRequestHandler}
   */
  #limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false
  });

  /** @return {Promise<void>} */
  async initialize() {
    dotenv.config({
      path: process.env.VITE_ENV_PATH || path.join(__dirname, '../../../../environment/.env')
    });

    this.app.disable('x-powered-by');
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(this.#limiter);

    await ConfigService.instance().initialize();

    this.app.use(new ErrorHandlerService().handleError);
    this.app.use(corsMiddleware());

    await DatabaseService.instance().initialize();

    this.app.use('/api/user', usersRouter);
    this.app.use('/auth', authRouter);
  }
}

module.exports = async () => {
  const app = new App();
  await app.initialize();

  return app;
};
