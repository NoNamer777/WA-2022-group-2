import express from 'express';
import { jwtAuthHeaderValidator } from '../../auth/index.js';
import { userChallengeController } from '../controllers/challenge.controller.js';

export const userChallengeRouter = express.Router();

userChallengeRouter.get('/', jwtAuthHeaderValidator, async (request, response) => {
  const challenges = await userChallengeController.getForUser(request.userId);

  response.send(challenges);
});
