import { config } from 'dotenv';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import { readFile } from 'fs/promises';
import swaggerUi from 'swagger-ui-express';
import { parse } from 'yaml';
import { authRouter } from './auth/index.js';
import { JwtService } from './auth/services/jwt.service.js';
import { badgeRouter } from './badge/routers/badge.router.js';
import { challengeRouter } from './challenge/routers/challenge.router.js';
import { userChallengeRouter } from './challenge/routers/user-challenge.router.js';
import { corsMiddleware, errorHandler } from './core/middleware/index.js';
import { DatabaseService, MailService } from './core/services/index.js';
import { groupRouter } from './group/routers/group.router.js';
import { userRouter } from './user/index.js';

class App {
  /** @type {import('express').core.Express} */
  app = express();

  /**
   * On all routers, allow maximum 50 requests per minute
   * @type {import('express-rate-limit').RateLimitRequestHandler}
   */
  #limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
  });

  /** @return {Promise<void>} */
  async initialize() {
    config({
      path: process.env.ENV_PATH || './environment/.env'
    });

    this.app.disable('x-powered-by');
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(this.#limiter);

    this.app.use(corsMiddleware());

    this.app.use(express.static(process.env.ROOT_SERVER_PATH || 'packages/server/src/public'));

    await DatabaseService.instance().initialize();
    MailService.instance().initialize();
    JwtService.instance().initialize();

    const specFile = await readFile(
      (process.env.OPEN_API_DIR || './documentation/open-api/') + 'wasted-open-api-spec.yaml',
      { encoding: 'utf8' }
    );
    const apiSpecRouter = express.Router();

    apiSpecRouter.use('/', swaggerUi.serve);

    // Only serve the resources for showing the open API document in production environments
    if (process.env.NODE_ENV === 'production') {
      apiSpecRouter.use(express.static(process.env.OPEN_API_DIR));
    }
    apiSpecRouter.get('/', swaggerUi.setup(parse(specFile)));

    this.app.use('/api-spec', apiSpecRouter);

    this.app.use('/api/user', userRouter);
    this.app.use('/api/challenge', challengeRouter);
    this.app.use('/api/user-challenge', userChallengeRouter);
    this.app.use('/api/group', groupRouter);
    this.app.use('/api/badge', badgeRouter);
    this.app.use('/auth', authRouter);

    // Needs to be defined last in order to catch, log, and format all errors properly
    this.app.use(errorHandler);
  }
}

export const initializeApp = async () => {
  const app = new App();
  await app.initialize();

  return app;
};
