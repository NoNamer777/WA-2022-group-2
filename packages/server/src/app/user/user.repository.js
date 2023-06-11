import { UserEntity } from './user.entity.js';

class UserRepository {
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
    await UserEntity.update(updatedUserData.dataValues, { where: { id: updatedUserData.id } });
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

export const userRepository = new UserRepository();
