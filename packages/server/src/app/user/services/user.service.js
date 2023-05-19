import { BadRequestException, NotFoundException } from '../../core/models/index.js';
import { userRepository } from '../user.repository.js';

// TODO: Only allow Users managing their own access or allow access to the User data to Admins.
export class UserService {
  /** @return {UserService} */
  static instance() {
    if (UserService.#instance) return UserService.#instance;

    UserService.#instance = new UserService();
    return UserService.#instance;
  }

  /** @type {UserService} */
  static #instance;

  /** @return {Promise<UserEntity[]>} */
  async getAll() {
    return await userRepository.findAll();
  }

  /**
   * @param userId {number}
   * @param throwsError {boolean}
   * @return {Promise<UserEntity>}
   */
  async getById(userId, throwsError = true) {
    const userById = await userRepository.findOneBy({ id: userId });

    if (!userById && throwsError) {
      throw new NotFoundException(`Er is geen gebruiker gevonden met het ID: '${userId}'.`);
    }
    return userById;
  }

  /**
   * @param username {string}
   * @param throwsError {boolean}
   * @return {Promise<UserEntity>}
   */
  async getByUsername(username, throwsError = true) {
    const userByUsername = await userRepository.findOneBy({ username: username });

    if (!userByUsername && throwsError) {
      throw new NotFoundException(
        `Er is geen gebruiker gevonden met de gebruikersnaam: '${username}'.`
      );
    }
    return userByUsername;
  }

  /**
   * @param userData {UserEntity}
   * @return {Promise<UserEntity>}
   */
  async update(userData) {
    const userId = userData.id;

    if (!(await this.getById(userId, false))) {
      throw new NotFoundException(
        `Het wijzigen van gegevens voor gebruiker met ID: '${userId}' was niet succesvol omdat de gebruiker niet bestaat.`
      );
    }
    if (await this.getByUsername(userData.username, false)) {
      throw new BadRequestException(
        `Het wijzigen van gegevens voor gebruiker met ID: '${userId}' was niet succesvol. De gebruikersnaam '${userData.username}' is niet beschikbaar.`
      );
    }
    await userRepository.update(userData);
    return await this.getById(userId);
  }

  /**
   * @param userData {Omit<UserEntity, 'id'>}
   * @return {Promise<UserEntity>}
   */
  async create(userData) {
    if (await this.getByUsername(userData.username, false)) {
      throw new BadRequestException(
        `De gebruikersnaam '${userData.username}' is niet beschikbaar.`
      );
    }
    return await userRepository.create(userData);
  }

  /**
   * @param userId {number}
   * @return {Promise<void>}
   */
  async deleteById(userId) {
    if (!(await this.getById(userId, false))) {
      throw new NotFoundException(
        `Het verwijderen van User met ID: '${userId}' is mislukt omdat het niet bestaat.`
      );
    }
    await userRepository.deleteById(userId);
  }
}