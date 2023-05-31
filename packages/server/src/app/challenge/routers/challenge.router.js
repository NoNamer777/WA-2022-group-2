import express from 'express';
import { jwtAuthHeaderValidator } from '../../auth/index.js';
import { userChallengeController } from '../controllers/challenge.controller.js';
import { challengeSuggestionRouter } from './challenge_suggestion.router.js';

export const challengeRouter = express.Router();

challengeRouter.get('/', jwtAuthHeaderValidator, async (request, response) => {
  const challenges = await userChallengeController.getForUser(request.userId);

  response.send(challenges);
});

challengeRouter.use('/suggestion', challengeSuggestionRouter);
