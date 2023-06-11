import { Op } from 'sequelize';
import { UserEntity } from '../../user/index.js';
import { GroupEntity } from '../entities/group.entity.js';
import { UserGroupEntity } from '../entities/user-group.entity.js';

class UserGroupRepository {
  /**
   * @param groupId {number}
   * @return {Promise<UserGroupEntity[]>}
   */
  async findAllUsersOfGroup(groupId) {
    return await UserGroupEntity.findAll({
      where: {
        groupId: {
          [Op.eq]: groupId
        }
      },
      include: [UserEntity, GroupEntity],
      attributes: []
    });
  }
}

export const userGroupRepository = new UserGroupRepository();
