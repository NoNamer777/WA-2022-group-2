import express from 'express';
import { checkSchema, matchedData } from 'express-validator';
import { jwtAuthHeaderValidator } from '../../auth/index.js';
import { entityIdValidator } from '../../core/middleware/index.js';
import { challengeDayController } from '../controllers/challenge-day.controller.js';
import { challengeSuggestionController } from '../controllers/challenge-suggestion.controller.js';
import { challengeController } from '../controllers/challenge.controller.js';
import { userChallengeController } from '../controllers/user-challenge.controller.js';
import { challengeSchema } from '../validators/challenge.validator.js';

export const challengeRouter = express.Router();

challengeRouter.get('/', jwtAuthHeaderValidator(), async (_, response) => {
  const allChallenges = await challengeController.getAll();
  response.send(allChallenges);
});

challengeRouter.get('/suggestion', jwtAuthHeaderValidator(), async (_, response) => {
  const selectedSuggestions = await challengeSuggestionController.getRandomSuggestions();
  response.send(selectedSuggestions);
});

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

challengeRouter.get(
  '/:challengeId/members',
  jwtAuthHeaderValidator(),
  entityIdValidator('challengeId', 'Challenge'),
  async (request, response, next) => {
    const challengeId = request.params.challengeId;

    try {
      response.send(await userChallengeController.getAllById(challengeId, request.userId));
    } catch (error) {
      next(error);
    }
  }
);
