import { Op } from 'sequelize';
import { UserGroupEntity } from '../user_group/user_group.entity.js';
import { GroupEntity } from './group.entity.js';

class GroupRepository {
  /**
   * @return {Promise<GroupEntity[]>}
   */
  async findAll(userId) {
    return await GroupEntity.findAll({
      include: {
        model: UserGroupEntity,
        where: {
          user_id: {
            [Op.eq]: userId
          }
        },
        attributes: []
      }
    });
  }
}

export const groupRepository = new GroupRepository();
