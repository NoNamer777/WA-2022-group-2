import express from 'express';
import { checkSchema, matchedData } from 'express-validator';
import { jwtAuthHeaderValidator } from '../../auth/index.js';
import { entityIdValidator } from '../../core/middleware/index.js';
import { earnedBadgeController } from '../controllers/earned-badge.controller.js';
import { earnedBadgeSchema, newEarnedBadgeSchema } from '../validators/earned-badge.validator.js';

export const earnedBadgeRouter = express.Router();

earnedBadgeRouter.get('/', jwtAuthHeaderValidator(), async (_, response) => {
  const allEarnedBadges = await earnedBadgeController.getAll();

  response.send(allEarnedBadges);
});

earnedBadgeRouter.get(
  '/:earnedBadgeId',
  jwtAuthHeaderValidator(),
  entityIdValidator('earnedBadgeId', 'EarnedBadge'),
  async (request, response, next) => {
    const earnedBadgeId = request.params.earnedBadgeId;
    try {
      response.send(await earnedBadgeController.getById(earnedBadgeId));
    } catch (error) {
      next(error);
    }
  }
);

earnedBadgeRouter.put(
  '/:earnedBadgeId',
  jwtAuthHeaderValidator(),
  checkSchema(earnedBadgeSchema, ['body']),
  entityIdValidator('earnedBadgeId', 'EarnedBadge'),
  async (request, response, next) => {
    const earnedBadgeId = request.params.earnedBadgeId;
    const earnedBadgeData = matchedData(request);

    try {
      const updatedEarnedBadge = await earnedBadgeController.update(earnedBadgeId, earnedBadgeData);

      response.send(updatedEarnedBadge);
    } catch (error) {
      next(error);
    }
  }
);

earnedBadgeRouter.post(
  '/',
  jwtAuthHeaderValidator(),
  checkSchema(newEarnedBadgeSchema, ['body']),
  async (request, response, next) => {
    const earnedBadgeData = matchedData(request);

    try {
      const createdEarnedBadge = await earnedBadgeController.create(earnedBadgeData);

      response.status(201).send(createdEarnedBadge);
    } catch (error) {
      next(error);
    }
  }
);

earnedBadgeRouter.delete(
  '/:earnedBadgeId',
  jwtAuthHeaderValidator(),
  entityIdValidator('earnedBadgeId', 'EarnedBadge'),
  async (request, _response, next) => {
    const earnedBadgeId = request.params.earnedBadgeId;

    try {
      await earnedBadgeController.deleteById(earnedBadgeId);
      next();
    } catch (error) {
      next(error);
    }
  }
);
