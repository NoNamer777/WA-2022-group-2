const { UserEntity } = require('./user.entity');

class UserRepository {
  /** @return {UserRepository} */
  static instance() {
    if (UserRepository.#instance) return UserRepository.#instance;

    UserRepository.#instance = new UserRepository();
    return UserRepository.#instance;
  }

  /** @type {UserRepository} */
  static #instance;

  /** @return {Promise<UserEntity[]>} */
  async findAll() {
    return await UserEntity.findAll();
  }

  /**
   * @param whereClaus {import('sequelize').WhereOptions}
   * @return {Promise<UserEntity | null>}
   */
  async findOneBy(whereClaus) {
    return await UserEntity.findOne({ where: { ...whereClaus }, rejectOnEmpty: false });
  }

  /**
   * @param updatedUserData {UserEntity}
   * @return {Promise<void>}
   */
  async update(updatedUserData) {
    await UserEntity.update(updatedUserData, { where: { id: updatedUserData.id } });
  }

  /**
   * @param userData {Omit<UserEntity, 'id'>}
   * @return {Promise<UserEntity>}
   */
  create(userData) {
    return UserEntity.create(userData);
  }

  /**
   * @param userId {number}
   * @return {Promise<void>}
   */
  async deleteById(userId) {
    await UserEntity.destroy({ where: { id: userId } });
  }
}

module.exports = UserRepository;
