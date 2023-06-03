import express from 'express';
import { checkSchema, matchedData } from 'express-validator';
import { jwtAuthHeaderValidator } from '../../auth/index.js';
import { entityIdValidator } from '../../core/middleware/index.js';
import { userGroupController } from '../../group/user_group.controller.js';
import { challengeController } from '../controllers/challenge.controller.js';
import { userChallengeController } from '../controllers/user_challenge.controller.js';
import { ChallengeDayEntity } from '../entities/challenge_day.entity.js';
import { UserChallengeEntity } from '../entities/user_challenge.entity.js';
import { challengeSchema, newChallengeSchema } from '../validators/challenge.validator.js';
import { challengeSuggestionRouter } from './challenge_suggestion.router.js';

export const challengeRouter = express.Router();

challengeRouter.use('/suggestion', challengeSuggestionRouter);

challengeRouter.get('/', jwtAuthHeaderValidator, async (_, response) => {
  const allChallenges = await challengeController.getAll();
  response.send(allChallenges);
});

challengeRouter.use('/suggestion', challengeSuggestionRouter);

challengeRouter.get(
  '/:challengeId',
  jwtAuthHeaderValidator,
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
  jwtAuthHeaderValidator,
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
  jwtAuthHeaderValidator,
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
  '/:userId/challenge',
  jwtAuthHeaderValidator,
  checkSchema(newChallengeSchema, ['body']),
  async (request, response, next) => {
    const challengeData = matchedData(request);

    try {
      /* Create challenge */
      const createdChallenge = await challengeController.create(challengeData);

      /* Fetch corresponding group data and create user challenges */
      const userChallenges = [];

      if (challengeData.group_id) {
        const userGroups = await userGroupController.getById(createdChallenge.dataValues.group_id);
        for (const userGroup of userGroups) {
          const userChallenge = await UserChallengeEntity.create({
            completed: false,
            user_id: userGroup.dataValues.user_id,
            challenge_id: createdChallenge.dataValues.id
          });
          userChallenges.push(userChallenge);
        }
      } else {
        const userChallenge = await UserChallengeEntity.create({
          completed: false,
          user_id: request.params.userId,
          challenge_id: createdChallenge.dataValues.id
        });
        userChallenges.push(userChallenge);
      }

      /* Create challenge days */
      let startDate = new Date(createdChallenge.dataValues.start_date);
      const endDate = new Date(createdChallenge.dataValues.end_date);

      for (const userChallenge of userChallenges) {
        while (startDate <= endDate) {
          await ChallengeDayEntity.create({
            date: startDate,
            earned: false,
            user_challenge_id: userChallenge.id
          });
          startDate.setDate(startDate.getDate() + 1);
        }
        startDate = new Date(createdChallenge.dataValues.start_date);
      }

      response.status(201).send(createdChallenge);
    } catch (error) {
      next(error);
    }
  }
);

challengeRouter.delete(
  '/:challengeId',
  jwtAuthHeaderValidator,
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
