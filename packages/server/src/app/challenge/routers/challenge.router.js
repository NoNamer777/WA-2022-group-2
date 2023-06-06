import express from 'express';
import { checkSchema, matchedData } from 'express-validator';
import { jwtAuthHeaderValidator } from '../../auth/index.js';
import { entityIdValidator } from '../../core/middleware/index.js';
import { challengeController } from '../controllers/challenge.controller.js';
import { challengeSchema, newChallengeSchema } from '../validators/challenge.validator.js';
import { challengeSuggestionRouter } from './challenge_suggestion.router.js';

export const challengeRouter = express.Router();

challengeRouter.use('/suggestion', challengeSuggestionRouter);

challengeRouter.get('/', jwtAuthHeaderValidator(), async (_, response) => {
  const allChallenges = await challengeController.getAll();

  response.send(allChallenges);
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

challengeRouter.put(
  '/:challengeId',
  jwtAuthHeaderValidator(),
  checkSchema(challengeSchema, ['body']),
  entityIdValidator('challengeId', 'Challenge'),
  async (request, response, next) => {
    const challengeId = request.params.challengeId;
    const challengeData = matchedData(request);

    try {
      const updatedChallenge = await challengeController.update(challengeId, challengeData);

      response.send(updatedChallenge);
    } catch (error) {
      next(error);
    }
  }
);

challengeRouter.post(
  '/',
  jwtAuthHeaderValidator(),
  checkSchema(newChallengeSchema, ['body']),
  async (request, response, next) => {
    const challengeData = matchedData(request);

    try {
      const createdChallenge = await challengeController.create(challengeData);

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
