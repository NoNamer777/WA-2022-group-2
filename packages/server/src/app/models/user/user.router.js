const UserController = require('./user.controller');
import express from 'express';
import { checkSchema, matchedData } from 'express-validator';
import { entityIdValidator } from '../../middleware/entity-id.validator.js';
import { jwtAuthHeaderValidator } from '../../middleware/jwt-auth-header-validator.js';
import { newUserSchema, userSchema } from '../../validation/user.validator.js';

export const userRouter = express.Router();

  const allUsers = await UserController.instance().getAll();
userRouter.get('/', jwtAuthHeaderValidator, async (_, response) => {

  response.send(allUsers);
});

userRouter.get(
  '/:userId',
  jwtAuthHeaderValidator,
  entityIdValidator('userId', 'User'),
  async (request, response, next) => {
    const userId = request.params.userId;
    try {
      response.send(await UserController.instance().getById(userId));
    } catch (error) {
      next(error);
    }
  }
);

userRouter.put(
  '/:userId',
  jwtAuthHeaderValidator,
  checkSchema(userSchema, ['body']),
  entityIdValidator('userId', 'User'),
  async (request, response, next) => {
    const userId = request.params.userId;
    const userData = matchedData(request);

    try {
      const updatedUser = await UserController.instance().update(userId, userData);

      response.send(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post(
  '/',
  jwtAuthHeaderValidator,
  checkSchema(newUserSchema, ['body']),
  async (request, response, next) => {
    const userData = matchedData(request);

    try {
      const createdUser = await UserController.instance().create(userData);

      response.status(201).send(createdUser);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.delete(
  '/:userId',
  jwtAuthHeaderValidator,
  entityIdValidator('userId', 'User'),
  async (request, _response, next) => {
    const userId = request.params.userId;

    try {
      await UserController.instance().deleteById(userId);
      next();
    } catch (error) {
      next(error);
    }
  }
);
