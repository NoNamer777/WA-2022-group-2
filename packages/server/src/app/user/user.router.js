import express from 'express';
import { checkSchema, matchedData } from 'express-validator';
import { jwtAuthHeaderValidator } from '../auth/index.js';
import { UnauthorizedException } from '../auth/models/errors/unauthorized-exception.js';
import { entityIdValidator } from '../core/middleware/index.js';
import { groupController } from '../group/group.controller.js';
import { userController } from './user.controller.js';
import { newUserSchema, userSchema } from './user.validator.js';

export const userRouter = express.Router();

userRouter.get('/', jwtAuthHeaderValidator, async (_, response) => {
  const allUsers = await userController.getAll();

  response.send(allUsers);
});

userRouter.get(
  '/:userId/group',
  jwtAuthHeaderValidator,
  entityIdValidator('userId', 'User'),
  async (request, response, next) => {
    try {
      const groups = await groupController.getAll(request.params.userId);
      response.send(groups);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get('/:userId/challenges', jwtAuthHeaderValidator, async (request, response) => {
  const userId = parseInt(request.params.userId);

  if (request.userId !== userId) {
    throw new UnauthorizedException();
  }

  const challenges = await userController.getForUser(userId);

  response.send(challenges);
});

userRouter.get(
  '/:userId',
  jwtAuthHeaderValidator,
  entityIdValidator('userId', 'User'),
  async (request, response, next) => {
    const userId = request.params.userId;
    try {
      response.send(await userController.getById(userId));
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
      const updatedUser = await userController.update(userId, userData);

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
      const createdUser = await userController.create(userData);

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
      await userController.deleteById(userId);
      next();
    } catch (error) {
      next(error);
    }
  }
);
