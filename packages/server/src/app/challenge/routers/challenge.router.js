import express from 'express';
import { checkSchema, matchedData } from 'express-validator';
import { jwtAuthHeaderValidator } from '../../auth/index.js';
import { UnauthorizedException } from '../../auth/models/errors/unauthorized-exception.js';
import { entityIdValidator } from '../../core/middleware/index.js';
import { challengeController } from '../controllers/challenge.controller.js';
import { challengeDayController } from '../controllers/challenge_day.controller.js';
import { challengeSuggestionController } from '../controllers/challenge_suggestion.controller.js';
import { userChallengeController } from '../controllers/user_challenge.controller.js';
import { challengeSchema, newChallengeSchema } from '../validators/challenge.validator.js';

export const challengeRouter = express.Router();

challengeRouter.get('/', jwtAuthHeaderValidator(), async (_, response) => {
  const allChallenges = await challengeController.getAll();
  response.send(allChallenges);
});

challengeRouter.get('/suggestion', jwtAuthHeaderValidator(), async (_, response) => {
  const selectedSuggestions = await challengeSuggestionController.getSelection();
  response.send(selectedSuggestions);
});

challengeRouter.get(
  '/:challengeId',
  jwtAuthHeaderValidator(),
  entityIdValidator('challengeId', 'Challenge'),
  async (request, response, next) => {
    const challengeId = request.params.challengeId;
    try {
      response.send(await challengeController.getById(challengeId));
    } catch (error) {
      next(error);
    }
  }
);

challengeRouter.get(
  '/:challengeId/members',
  jwtAuthHeaderValidator(),
  entityIdValidator('challengeId', 'Challenge'),
  async (request, response, next) => {
    const challengeId = request.params.challengeId;
    try {
      response.send(await userChallengeController.getAllById(challengeId));
    } catch (error) {
      next(error);
    }
  }
);

challengeRouter.put(
  '/:challengeId',
  jwtAuthHeaderValidator(),
  checkSchema(challengeSchema, ['body']),
  entityIdValidator('challengeId', 'Challenge'),
  async (request, response, next) => {
    const challengeId = request.params.challengeId;
    const challengeData = matchedData(request);
    const userId = request.userId;

    try {
      const updatedChallenge = await challengeController.update(challengeId, challengeData, userId);

      response.send(updatedChallenge);
    } catch (error) {
      next(error);
    }
  }
);

// TODO: do we need a validator here?
challengeRouter.put(
  '/day/:dayId',
  jwtAuthHeaderValidator(),
  entityIdValidator('challengeDayId', 'ChallengeDay'),
  async (request, response, next) => {
    const challengeDayId = request.params.dayId;
    const challengeDayData = request.body;
    const userId = request.userId;

    try {
      const updatedChallenge = await challengeDayController.update(
        challengeDayId,
        challengeDayData,
        userId
      );

      response.send(updatedChallenge);
    } catch (error) {
      next(error);
    }
  }
);

challengeRouter.post(
  '/:userId/challenge',
  jwtAuthHeaderValidator(),
  checkSchema(newChallengeSchema, ['body']),
  async (request, response, next) => {
    const challengeData = matchedData(request);
    const userId = parseInt(request.params.userId);
    if (request.userId !== userId) {
      throw new UnauthorizedException();
    }

    try {
      const createdChallenge = await challengeController.createChallenge(challengeData, userId);
      response.status(201).send(createdChallenge);
    } catch (error) {
      next(error);
    }
  }
);

challengeRouter.delete(
  '/:challengeId',
  jwtAuthHeaderValidator(),
  entityIdValidator('challengeId', 'Challenge'),
  async (request, _response, next) => {
    const challengeId = request.params.challengeId;

    try {
      await challengeController.deleteById(challengeId);
      next();
    } catch (error) {
      next(error);
    }
  }
);
