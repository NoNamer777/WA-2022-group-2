import { Op } from 'sequelize';
import { UserGroupEntity } from '../entities/user_group.entity.js';

class UserGroupRepository {
  /**
   * @param groupId
   * @return {Promise<UserGroupEntity[]>}
   */
  async findAllBy(groupId) {
    return await UserGroupEntity.findAll({
      where: {
        group_id: {
          [Op.eq]: groupId.id
        }
      }
    });
  }
}

export const userGroupRepository = new UserGroupRepository();
