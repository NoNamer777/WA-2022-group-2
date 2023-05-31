import express from 'express';
import { jwtAuthHeaderValidator } from '../auth/index.js';
import { entityIdValidator } from '../core/middleware/index.js';
import { groupController } from './group.controller.js';

export const groupRouter = express.Router();

groupRouter.get(
  '/user/:userId/group',
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
