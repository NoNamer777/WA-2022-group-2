import express from 'express';
import { rateLimit } from 'express-rate-limit';
import { checkSchema, matchedData } from 'express-validator';
import { newUserSchema } from '../user/index.js';
import { authController } from './auth.controller.js';
import { loginSchema, resetPasswordSchema, usernameSchema } from './auth.validator.js';
import { confirmPasswordValidator } from './middleware/confirm-password.validator.js';
import { jwtAuthHeaderValidator } from './middleware/jwt-auth-header-validator.js';

export const authRouter = express.Router();

// On the login and register routes, allow maximum 10 requests per 5 minutes
const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false
});

authRouter.post(
  '/register',
  authLimiter,
  checkSchema(newUserSchema, ['body']),
  confirmPasswordValidator,
  async (request, response, next) => {
    try {
      const createdUser = await authController.register(matchedData(request));

      response.status(201).json(createdUser);
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post(
  '/auth/confirm-registration',
  jwtAuthHeaderValidator({ expectedTokenType: 'VerifyRegistration' }),
  async (request, response, next) => {
    try {
      await authController.confirmRegistration(request.userId);

      response.end();
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post(
  '/login',
  authLimiter,
  checkSchema(loginSchema, ['body']),
  async (request, response, next) => {
    try {
      const token = await authController.login(matchedData(request));

      response.header('Authorization', `Bearer ${token}`).send();
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post(
  '/request-password-reset',
  authLimiter,
  checkSchema(usernameSchema, ['body']),
  async (request, response, next) => {
    try {
      await authController.requestPasswordReset(request.body.username);

      response.end();
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post(
  '/reset-password',
  authLimiter,
  jwtAuthHeaderValidator({ expectedTokenType: 'PasswordReset' }),
  checkSchema(resetPasswordSchema, ['body']),
  confirmPasswordValidator,
  async (request, response, next) => {
    try {
      const userId = request.userId;
      const password = request.body['password'];

      await authController.resetPassword(userId, password);
      response.end();
    } catch (error) {
      next(error);
    }
  }
);
