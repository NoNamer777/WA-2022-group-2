import express from 'express';
import { jwtAuthHeaderValidator } from '../../auth/index.js';
import { entityIdValidator } from '../../core/middleware/index.js';
import { userChallengeController } from '../controllers/user_challenge.controller.js';

export const userChallengeRouter = express.Router();

userChallengeRouter.delete(
  '/:userChallengeId',
  jwtAuthHeaderValidator(),
  entityIdValidator('userChallengeId', 'UserChallenge'),
  async (request, response, next) => {
    const userChallengeId = request.params.userChallengeId;
    const userId = request.userId;

    try {
      await userChallengeController.deleteById(userChallengeId, userId);
      response.status(200).send();
    } catch (error) {
      next(error);
    }
  }
);
