import express from 'express';
import { checkSchema, matchedData } from 'express-validator';
import { jwtAuthHeaderValidator } from '../../auth/index.js';
import { badgeRouter } from '../../badge/routers/badge.router.js';
import { entityIdValidator } from '../../core/middleware/index.js';
import { badgeController } from '../controllers/badge.controller.js';
import { badgeSchema, newBadgeSchema } from '../validators/badge.validator.js';

export const badgeRouter = express.Router();

badgeRouter.get('/', jwtAuthHeaderValidator(), async (_, response) => {
  const allBadges = await badgeController.getAll();

  response.send(allBadges);
});

badgeRouter.get(
  '/:badgeId',
  jwtAuthHeaderValidator(),
  entityIdValidator('badgeId', 'Badge'),
  async (request, response, next) => {
    const badgeId = request.params.badgeId;
    try {
      response.send(await badgeController.getById(badgeId));
    } catch (error) {
      next(error);
    }
  }
);

badgeRouter.put(
  '/:badgeId',
  jwtAuthHeaderValidator(),
  checkSchema(badgeSchema, ['body']),
  entityIdValidator('badgeId', 'Badge'),
  async (request, response, next) => {
    const badgeId = request.params.badgeId;
    const badgeData = matchedData(request);

    try {
      const updatedBadge = await badgeController.update(badgeId, badgeData);

      response.send(updatedBadge);
    } catch (error) {
      next(error);
    }
  }
);

badgeRouter.post(
  '/',
  jwtAuthHeaderValidator(),
  checkSchema(newBadgeSchema, ['body']),
  async (request, response, next) => {
    const badgeData = matchedData(request);

    try {
      const createdBadge = await badgeController.create(badgeData);

      response.status(201).send(createdBadge);
    } catch (error) {
      next(error);
    }
  }
);

badgeRouter.delete(
  '/:badgeId',
  jwtAuthHeaderValidator(),
  entityIdValidator('badgeId', 'Badge'),
  async (request, _response, next) => {
    const badgeId = request.params.badgeId;

    try {
      await badgeController.deleteById(badgeId);
      next();
    } catch (error) {
      next(error);
    }
  }
);
