import express from 'express';
import { checkSchema, matchedData } from 'express-validator';
import { jwtAuthHeaderValidator } from '../../auth/index.js';
import { entityIdValidator } from '../../core/middleware/index.js';
import { groupController } from '../controllers/group.controller.js';
import { groupSchema, newGroupSchema } from '../validators/group.validator.js';

export const groupRouter = express.Router();

groupRouter.get('/', jwtAuthHeaderValidator(), async (_, response) => {
  const allGroups = await groupController.getAll();

  response.send(allGroups);
});

groupRouter.get(
  '/:groupId',
  jwtAuthHeaderValidator(),
  entityIdValidator('groupId', 'Group'),
  async (request, response, next) => {
    const groupId = request.params.groupId;
    try {
      response.send(await groupController.getById(groupId));
    } catch (error) {
      next(error);
    }
  }
);

groupRouter.put(
  '/:groupId',
  jwtAuthHeaderValidator(),
  checkSchema(groupSchema, ['body']),
  entityIdValidator('groupId', 'Group'),
  async (request, response, next) => {
    const groupId = request.params.groupId;
    const groupData = matchedData(request);

    try {
      const updatedGroup = await groupController.update(groupId, groupData);

      response.send(updatedGroup);
    } catch (error) {
      next(error);
    }
  }
);

groupRouter.post(
  '/',
  jwtAuthHeaderValidator(),
  checkSchema(newGroupSchema, ['body']),
  async (request, response, next) => {
    const groupData = matchedData(request);

    try {
      const createdGroup = await groupController.create(groupData);

      response.status(201).send(createdGroup);
    } catch (error) {
      next(error);
    }
  }
);

groupRouter.delete(
  '/:groupId',
  jwtAuthHeaderValidator(),
  entityIdValidator('groupId', 'Group'),
  async (request, _response, next) => {
    const groupId = request.params.groupId;

    try {
      await groupController.deleteById(groupId);
      next();
    } catch (error) {
      next(error);
    }
  }
);
