import { Op } from 'sequelize';
import { UnauthorizedException } from '../../auth/models/errors/unauthorized-exception.js';
import { BadgeService, EarnedBadgeEntity, EarnedBadgeService } from '../../badge/index.js';
import { BadRequestException, NotFoundException } from '../../core/models/index.js';
import { UserEntity } from '../../user/index.js';
import { ChallengeDayEntity } from '../entities/challenge_day.entity.js';
import { challengeRepository } from '../repositories/challenge.repository.js';
import { userChallengeRepository } from '../repositories/user_challenge.repository.js';

export class UserChallengeService {
  /** @return {UserChallengeService} */
  static instance() {
    if (UserChallengeService.#instance) return UserChallengeService.#instance;

    UserChallengeService.#instance = new UserChallengeService();
    return UserChallengeService.#instance;
  }

  /** @type {UserChallengeService} */
  static #instance;
  /**
   * @param userChallengeData {Omit<UserChallengeEntity, 'id'>}
   * @return {Promise<UserChallengeEntity>}
   */
  async create(userChallengeData) {
    return await userChallengeRepository.create(userChallengeData);
  }

  /**
   * @param userChallengeId {number}
   * @param throwsError {boolean}
   * @return {Promise<UserChallengeEntity>}
   */
  async getById(userChallengeId, throwsError = true) {
    const userChallengeById = await userChallengeRepository.findOneBy({ id: userChallengeId });

    if (!userChallengeById && throwsError) {
      throw new NotFoundException(`No user challenge found with ID: '${userChallengeById}'.`);
    }
    return userChallengeById;
  }

  /**
   * @param challengeId {number}
   * @param throwsError {boolean}
   * @return {Promise<UserChallengeEntity[]>}
   */
  async getAllById(challengeId, throwsError = true) {
    const userChallengesById = await userChallengeRepository.findAllBy(
      {
        challenge_id: {
          [Op.eq]: challengeId
        }
      },
      [
        {
          model: ChallengeDayEntity
        },
        {
          model: UserEntity,
          attributes: ['username', 'profile_image_path']
        }
      ]
    );

    if (!userChallengesById && throwsError) {
      throw new NotFoundException(`Er is geen challenge gevonden met het ID: '${challengeId}'.`);
    }
    return userChallengesById;
  }

  /**
   * @param userChallengeIdParam {number}
   * @param userChallengeData {UserChallengeEntity}
   * @param userId {number}
   * @return {Promise<BadgeEntity>}
   */
  async complete(userChallengeIdParam, userChallengeData, userId) {
    const userChallengeId = parseInt(userChallengeData.id);
    if (userChallengeIdParam !== userChallengeId) {
      throw new BadRequestException(
        'Een challenge kan niet worden geüpdatet met de aangeboden gegevens'
      );
    }

    const userChallenge = await this.getById(userChallengeId);

    if (userId !== userChallenge.user_id) {
      throw new UnauthorizedException();
    }

    /* Complete challenge */
    userChallenge.completed = true;
    await userChallenge.save();

    // TODO: prevent creating new badge for the same challenge?

    /* Search and create unique badge for user */
    const alreadyEarnedBadges = await EarnedBadgeService.instance().getForUser(userId);
    const alreadyEarnedBadgeIds = alreadyEarnedBadges.map((earnedBadge) => earnedBadge.badge_id);
    const uniqueNewBadge = await BadgeService.instance().getRandomBadge(alreadyEarnedBadgeIds);

    const earnedBadge = new EarnedBadgeEntity();
    earnedBadge.date = new Date();
    earnedBadge.user_id = userId;
    earnedBadge.badge_id = uniqueNewBadge.id;
    earnedBadge.user_challenge_id = userChallenge.id;
    await earnedBadge.save();

    return await BadgeService.instance().getById(earnedBadge.badge_id);
  }

  /**
   * @param userChallengeId {number}
   * @param userId
   * @param throwsError
   * @return {Promise<void>}
   */
  async deleteById(userChallengeId, userId, throwsError = true) {
    const userChallengeById = await this.getById(userChallengeId);

    if (userChallengeById.user_id !== userId && throwsError) {
      throw new NotFoundException(
        `Het verwijderen van user challenge met ID: '${userChallengeId}' is mislukt omdat het niet bestaat.`
      );
    }
    await userChallengeRepository.deleteById(userChallengeId);

    const challengeId = userChallengeById.challenge_id;

    const remainingUserChallenges = await this.getAllById(challengeId);

    if (remainingUserChallenges.length === 0) {
      console.log(`Deleting orphan challenge with ID: '${userChallengeId}'.`);
      await challengeRepository.deleteById(challengeId);
    }
  }
}
