import { ChallengeService } from '../services/challenge.service.js';

class ChallengeController {
  /** @return {Promise<ChallengeEntity[]>} */
  async getAll() {
    console.info('ChallengeController - Getting all Challenges data');

    return await ChallengeService.instance().getAll();
  }

  /**
   * @param challengeIdParam {string}
   * @return {Promise<ChallengeEntity>}
   */
  async getById(challengeIdParam) {
    console.info(`ChallengeController - Getting data for Challenge with ID: '${challengeIdParam}'`);

    return await ChallengeService.instance().getById(parseInt(challengeIdParam));
  }

  /**
   * @param challengeIdParam {string}
   * @param challengeData {ChallengeEntity}
   * @return {Promise<ChallengeEntity>}
   */
  async update(challengeIdParam, challengeData) {
    console.info(
      `ChallengeController - Updating Challenge resource on path: '${challengeIdParam}'`
    );

    return await ChallengeService.instance().update(challengeData);
  }

  /**
   * @param challengeData {Omit<ChallengeEntity, 'id'>}
   * @return {Promise<ChallengeEntity>}
   */
  async create(challengeData) {
    console.info('ChallengeController - Creating a new Challenge resource');

    return await ChallengeService.instance().create(challengeData);
  }

  /**
   * @param challengeIdParam {string}
   * @return {Promise<void>}
   */
  async deleteById(challengeIdParam) {
    console.info(
      `ChallengeController - Removing Challenge resource with ID: '${challengeIdParam}'`
    );

    await ChallengeService.instance().deleteById(parseInt(challengeIdParam));
  }
}

export const challengeController = new ChallengeController();
