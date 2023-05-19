const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const express = require('express');
const rateLimit = require('express-rate-limit');
const path = require('path');
const corsMiddleware = require('./middleware/cors-middleware');
const authRouter = require('./models/auth/auth.router');
const usersRouter = require('./models/user/user.router');
const ErrorHandlerService = require('./services/error-handler.service');

const app = express();

// On all routes, allow maximum 50 requests per minute
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false
});

// Load environment variables from a different directory
const envPath =
  process.env.SERVER_ENVIRONMENT_PATH ?? path.join(__dirname, '../../../../environment/.env');
dotenv.config({ path: envPath });

app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(corsMiddleware);
app.use(cookieParser());
app.use(limiter);

app.use('/api/user', usersRouter);
app.use('/auth', authRouter);

app.use(new ErrorHandlerService().handleError);

module.exports = app;
